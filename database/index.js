if (process.env.REDIS.toLowerCase() == 'disabled') {
    module.exports = require('./drivers/nocache');
} else {
    module.exports = require('./drivers/caching');
}