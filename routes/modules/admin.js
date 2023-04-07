const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const upload = require('../../middleware/multer')

router.post('/record/email/:id', adminController.postEmail)

router.delete('/record/:id', adminController.deleteRecord)

router.patch('/record/:id', adminController.patchRecord)

router.get('/records', adminController.getRecords)

router.get('/users', adminController.getUsers)

router.patch('/user/:id', adminController.patchUser)

router.get('/equipments', adminController.getEquipments)

router.get('/equipment/create', adminController.createEquipment)

router.get('/equipment/:id/edit', adminController.editEquipment)

router.get('/equipment/:id', adminController.getEquipment)

router.post('/equipment', upload.single('image'), adminController.postEquipment)

router.put('/equipment/:id', upload.single('image'), adminController.putEquipment)

router.delete('/equipment/:id', adminController.deleteEquipment)

module.exports = router
