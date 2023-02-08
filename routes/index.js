const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const equipments = require('./modules/equipments')
const equipmentController = require('../controllers/equipment-controller')
const userController = require('../controllers/user-controller')
const { authenticator } = require('../middleware/auth')

router.use('/admin', authenticator, admin)
router.use('/equipments', authenticator, equipments)
router.get('/sign_up', userController.SignUpPage)
router.post('/sign_up', userController.SignUp)
router.get('/aboutUs', authenticator, (req, res) => { res.render('aboutUs') })
router.get('/:category', authenticator, equipmentController.getCategories)
router.get('/', authenticator, (req, res) => res.redirect('/:category'))

module.exports = router
