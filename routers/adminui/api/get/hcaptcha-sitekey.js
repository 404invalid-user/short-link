module.exports = function (req, res) {
    return res.json({ key: process.env.HCAPTCHA_SITEKEY });
}