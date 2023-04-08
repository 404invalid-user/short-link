const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
 
});



router.get('/hcaptcha-sitekey', (req, res) => {
  return res.json({ key: process.env.HCAPTCHA_SITEKEY });
});

module.exports= router;