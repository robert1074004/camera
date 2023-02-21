const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/equipments/create', adminController.createEquipment)

router.get('/equipments', adminController.getEquipments)

router.post('/equipments', adminController.postEquipment)

module.exports = router
