const express = require('express')
const router = express.Router()

const equipmentController = require('../../controllers/equipment-controller')

router.get('/records', equipmentController.getRecords)

router.get('/:category', equipmentController.getCategories)

router.get('/show/:id', equipmentController.getEquipment)

router.post('/show/:id', equipmentController.postRecord)

module.exports = router
