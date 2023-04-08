require('dotenv').config();
const express = require('express');
const logger = require('mcstatusbot-logger');

const cookieParser = require("cookie-parser");

const routerAdminUI = require('./routers/adminsettings');
const routerAdminAPI = require('./routers/adminsettingsapi');
const routerShortLink = require('./routers/shortlink');
const db = require('./database/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

async function main() {
    await db.connect();
    app.set('trust proxy', 1) // trust first proxy
    app.use(db.setupExpressSession);
   
    app.get('/adminsettings/api/a', (req, res) => {
        return res.json({ key: "the key is deez nuts" });
      });
    app.use('/adminsettings', routerAdminUI);
    app.use('/adminsettings/api', routerAdminAPI);
    app.get('/adminsettings/api/hcaptcha-sitekey', (req, res) => {
        return res.json({ key: process.env.HCAPTCHA_SITEKEY });
      });
      
    app.use('/', routerShortLink);

    app.listen(process.env.PORT, () => {
        logger.success(`${process.env.NAME} url shortner is running on 0.0.0.0:${process.env.PORT}`);
    })

}

main();