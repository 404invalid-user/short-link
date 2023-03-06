const fs = require('fs');
const util = require('util');
const Redis = require('ioredis');
const { Sequelize } = require('sequelize');
const processlog = require('mcstatusbot-logger');
const session = require("express-session")
let RedisStore = require("connect-redis")(session)

const redisDetails = process.env.REDIS.split(':');
let redisClient;
const sequelize = new Sequelize(process.env.DATABASE_URI)
const schemas = {
    Domain: require('../schemas/Domain'),
    DomainAccessUser: require('../schemas/DomainAccessUser'),
    Link: require('../schemas/Link'),
    LinkAccessList: require('../schemas/LinkAccessList'),
    LinkAccessUser: require('../schemas/LinkAccessUser'),
    LinkClick: require('../schemas/LinkClick'),
    User: require('../schemas/User'),
};



/**
 * connect to the databases
 */
module.exports.connect = async () => {
    processlog.info('starting db service');

    //connect to database
    try {
        await sequelize.authenticate();
        processlog.success('Connection has been established successfully.');
    } catch (error) {
        processlog.crash(error.stack || error);
        processlog.crash('Unable to connect to the database');
        process.exit();
    }

    //connect to redis cache

    try {
        redisClient = await new Redis({
            password: redisDetails.length == 3 ? redisDetails[0] : null,
            host: redisDetails.length == 3 ? redisDetails[1] : redisDetails[0],
            port: redisDetails.length == 3 ? redisDetails[2] : redisDetails[1]
        });

        module.exports.redishscanStream = redisClient.hscanStream;
    } catch (error) {
        processlog.crash(error.stack || error);
        processlog.crash("could not connect to redis");
        process.exit();
    }


    redisClient.hget = util.promisify(redisClient.hget);
    redisClient.hgetall = util.promisify(redisClient.hgetall);

    // Flush redis db
    await redisClient.flushdb(async (err, succeeded) => {
        processlog.info(`Flushing Redis -  ${err ? err : succeeded}`);
        // Cache it only after redis gets flushed
        processlog.info('Started caching the databases');

        //loop though all scheams and cache them after flush
        for (const [key] of Object.entries(schemas)) {
            await schemas[key].findAll().then((results) => {
                for (const record of results) {
                    redisClient.hset(key, record.id, JSON.stringify(record));
                }
            });
        }


        return true;
    });
    return true;
}

/**
 * fall back to database if cant find in cache
 */
async function dbFallback(table, id) {
    // db fallback
    processlog.info(`${id} just fellback to db while looking for the ${table} table!`);
    let checkDB = await schemas[table].findOne({ where: { id: key } });
    if (checkDB == null) return null;
    checkDB = checkDB.dataValues;
    if (checkDB == null || checkDB == undefined) return null;
    await redisClient.hset(table, id, JSON.stringify(checkDB));

    const cacheValue = await redisClient.hget(table, id);
    return cacheValue;
}




/**
 * lookup a document in the cache and fallback to mongo if its not there
 * @param {String} table - the table you want to lookup data in
 * @param {String} id - the id of the data you want to lookup
 * @returns {Object} 
 */
module.exports.lookup = async (table, key) => {
    if (schemas[table] == null || schemas[table] == undefined) {
        processlog.error(`${table} is not a valid table name`);
        return null;
    }
    let cacheValue = await redisClient.hget(table, key);
    let result = null;

    if (!cacheValue) cacheValue = await dbFallback(table, key);
    if (cacheValue == null) return null;

    result = JSON.parse(cacheValue);
    result['save'] = async function () {
        let dbresult = await schemas[table].findOne({ where: { id: key } });
        dbresult = dbresult.dataValues;
        let toUpdate = {};

        for (const o in result) {
            if (result.hasOwnProperty(o)) {
                if (o !== 'save') {
                    if (dbresult[o] != result[o]) {
                        toUpdate[o] = result[o];
                    }
                }
            }
        }
        //update data in database
        try {
            await schemas[table].update(toUpdate, { where: { id } });
        } catch (err) {
            processlog.error(err.stack || err);
            return false;
        }

        //update data in cache
        await redisClient.hdel(table, key);
        await redisClient.hset(table, key, JSON.stringify(dbresult));
        return true;
    }

    return result;
}

/**
 * lookup a document in the cache and fallback to mongo if its not there
 * @param {String} type - the type email or password
 * @param {String} str - the string
 * @returns {Object} 
 */
module.exports.lookupUserIdBy = async (type, str) => {
    if (type != 'username' && type != 'email') throw "Error: type must be username or email"
    let userid = null;
    const stream = redisClient.hscanStream('User', {
        count: 100
    });
    stream.on('data', (results) => {
        for (let i = 0; i < results.length; i += 2) {
            const id = results[i];
            const value = JSON.parse(results[i + 1]);
            if (type == 'username' && value.username == str) {
                userid = id;
                stream.end();
                resolve(serverid)
            }
            if (type == 'email' && value.email == str) {
                userid = id;
                stream.end();
                resolve(serverid)
            }
        }
    });
    stream.on('end', () => resolve(userid));
    stream.on('error', (err) => reject(err));
}


/**
 * create a new document in the database and cache it
 * @param {String} table - the table that you want to create data in
 * @param {String} id - the id you would like to use 
 * @param {Object} data - rest of the data
 * @returns 
 */
module.exports.create = async (table, id, data) => {
    if (schemas[table] == null || schemas[table] == undefined) throw "Error: " + table + " is not a valid table name";
    let createData;
    if (id != undefined) {
        data.id = id;
    }
    createData = await schemas[table].create(data);
    await redisClient.hset(table, createData.dataValues.id, JSON.stringify(createData.dataValues));
    return true;
}

/**
 * get the length or count of a tabe
 * @param {String} table - the table name
 * @returns {Int16Array} 
 */
module.exports.getLength = async (table) => {
    if (schemas[table] == null || schemas[table] == undefined) throw "Error: " + table + " is not a valid table name";
    return await schemas[table].count();
}

/**
 * get all documents in the cached table
 * @param {String} table 
 * @returns {Array}
 */
module.exports.getAll = async (table) => {
    if (schemas[table] == null || schemas[table] == undefined) throw "Error: " + table + " is not a valid table name";
    const items = await redisClient.hgetall(table);
    return Reflect.ownKeys(items).map((key) => JSON.parse(items[key]));
}


/**
 * delete a document from the cache and database
 * @param {String} table 
 * @param {String} id 
 * @returns {Boolean}
 */
module.exports.delete = async (table, id) => {
    if (schemas[table] == null || schemas[table] == undefined) throw "Error: " + table + " is not a valid table name";
    try {
        await schemas[collection].destroy({ where: { id } });
    } catch (err) {
        processlog.error(err.stack || err);
        throw "Error: could not delete from database"
    }
    try {
        await redisClient.hdel(table, id);
    } catch (err) {
        processlog.error(err.stack || err);
        throw "Error: could not delete from cache"
    }
    return true;
}
/** setup and use express-session
 * 
 */
module.exports.setupExpressSession = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 2147483647 },
    store: new RedisStore({
        client: new Redis({
            password: redisDetails.length == 3 ? redisDetails[0] : null,
            host: redisDetails.length == 3 ? redisDetails[1] : redisDetails[0],
            port: redisDetails.length == 3 ? redisDetails[2] : redisDetails[1]
        })
    }),
})