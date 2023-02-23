const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/equipments', adminController.getEquipments)

router.get('/equipment/create', adminController.createEquipment)

router.get('/equipment/:id/edit', adminController.editEquipment)

router.get('/equipment/:id', adminController.getEquipment)

router.post('/equipment', adminController.postEquipment)

router.put('/equipment/:id', adminController.putEquipment)

module.exports = router
