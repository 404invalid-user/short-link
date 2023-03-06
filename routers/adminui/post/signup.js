const bcrypt = require("bcrypt")
const db = require('../../../database/index');
const {verify} = require('hcaptcha');

module.exports = async function (req, res) {
    if (process.env.ALLOW_SIGNUPS == 'false') {
        return res.status(403).json({ error: "signups not allowed", message: "signups have been disabled please ask an admin to make you an account" })
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const verifyPassword = req.body.verifyPassword;

    //basic validation
    if (!isValidUsername(username)) {
        return res.status(400).json({ error: "invalid username", message: "your usernmae must be atleast 3 characters long and no more than 30 and only contain a-z 0-9 - and _" })
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "invalid email", message: "please double check your email" })
    }
    if (isValidPassword(password)) {
        return res.status(400).json({ error: "password bad", message: "your password must be atleast 8 characters long no more than 100 and include a uppercase letter" })
    }

    if (verifyPassword !== password) {
        return res.status(400).json({ error: "passwords don't match", message: "your passwords must match " })
    }

    //make sure details arent used by another account
    const checkUsername = await db.lookupUserIdBy('username', username);
    if (checkUsername != null) {
        return res.status(400).json({ error: "username unavailable", message: "that username is unavailable please chose another one" })
    }
    const checkEmail = await db.lookupUserIdBy('email', email);
    if (checkEmail != null) {
        return res.status(400).json({ error: "email taken", message: "that email is used by another acount please login" })
    }

    const hashPw = await bcrypt.hash(password, 10);
    //make user account
    await db.create('User', {
        username: username,
        avatar: `https://sha1vatar.bruvland.com/${username}.png`,
        email: email,
        password: hashPw
    });

    return res.status(200).json({ error: null, success: "account created", message: "your account has been made please login then link your social accounts" })
}

function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9_-]{3,20}$/;
    return regex.test(username);
}
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function isValidPassword(password) {
    if (password.length < 8 || password.length > 100) {
        return false;
    }
    const regex = /^(?=.*[A-Z])/;
    return regex.test(password);
}