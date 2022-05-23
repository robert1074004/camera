const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const cameras = require('./modules/cameras')
const users = require('./modules/users')
router.use('/',home)
router.use('/cameras',cameras)
router.use('/users',users)
module.exports = router