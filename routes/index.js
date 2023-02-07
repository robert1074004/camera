const express = require('express')
const router = express.Router()

const admin = require('./modules/admin')
const users = require('./modules/users')
const equipments = require('./modules/equipments')
const equipmentController = require('../controllers/equipment-controller')
const { authenticator } = require('../middleware/auth')  

router.use('/admin', authenticator, admin)
router.use('/equipments', authenticator, equipments)  
router.use('/users', users)
router.get('/aboutUs', (req, res) => { res.render('aboutUs') })
router.get('/:category', authenticator, equipmentController.getCategories)
router.use('/', authenticator,(req, res) => res.redirect('/:category')) 

module.exports = router