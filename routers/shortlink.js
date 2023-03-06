const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    next();
})
// define the home page route
router.get('/:link', (req, res) => {

console.log("rounte "+req.params.link+"==============================")
    //res.send("your viewd links " + req.session.viwedLinks);
    console.log(req.session.seenLinks)
    if (req.session.seenLinks) {
        console.log("we have links")
        if (req.session.seenLinks.filter(l => l.domain == req.hostname && l.link == req.params.link).length >=1) {
            console.log("we have viwed this link")
        } else {
            req.session.seenLinks.push({ domain: req.hostname, link: req.params.link })
            
        }
    } else {
        console.log("we dont haev links")
        req.session.seenLinks = [{ domain: req.hostname, link: req.params.link }]
    }
    res.send(req.session.seenLinks)
    console.log("end rounte==============================\n\n")
})
// define the about route
router.get('/about', (req, res) => {
    res.send('About birds')
})

module.exports = router