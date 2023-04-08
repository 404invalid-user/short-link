const bcrypt = require("bcrypt");
const db = require('../../../database/index');
const { verify } = require('hcaptcha');
const logger = require('mcstatusbot-logger');

module.exports = async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let userid = await db.lookupUserBy('username', username);

    if (process.env.HCAPTCHA_SECRET != "NONE" && process.env.HCAPTCHA_SECRET != '' && process.env.HCAPTCHA_SECRET != 'disabled') {
        const hcaptchaResult = await verify(process.env.HCAPTCHA_SECRET, token)
        if (data.success === false) {
            return res.status(400).json({ error: "failed captcha", message: "you failed he captcha please try again" });
        }
    } else {
        logger.warn("login has been requested you have hcaptcha disabled accounts could be compromised it is highly recommended you set it up")
    }

    if (userid == null) userid = await db.lookupUserBy('email', username);
    if (userid == null) return res.status(400).json({ error: "account not found", message: "a account with those details could not be found" });

    const user = await db.lookup('User', userid);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        return res.status(400).json({ error: "account not found", message: "a account with those details could not be found" });
    }

    req.session.userid = user.id;
    return res.status(200).json({ error: null, success: "logged in", message: "you have been logged in redirecting now..." })

}