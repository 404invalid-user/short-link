const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
 
})

// define the home page route
router.get('/login', (req, res) => {
 
})

// define the home page route
router.get('/reauth', (req, res) => {
 
})

// define the home page route
router.get('/signup', (req, res) => {
 
})

// define the home page route
router.post('/signup', (req, res) => {
 
})
// define the home page route
router.get('/auth/discord', (req, res) => {
 
})

// define the home page route
router.get('/auth/github', (req, res) => {
 
})


//users
router.get('/users', (req, res) => {
 
})


router.get('/users/:user', (req, res) => {
 
})

router.post('/users/new', (req, res) => {
 
})

router.patch('/users/:user', (req, res) => {
 
})
router.delete('/users/:user', (req, res) => {
 
})

//domains
router.get('/domains', (req, res) => {
 
})

router.get('/domains/:domain', (req, res) => {
 
})

router.post('/domains/new', (req, res) => {
 
})

router.patch('/domains/:domain', (req, res) => {
 
})
router.delete('/domains/:domain', (req, res) => {
 
})


module.exports = router;