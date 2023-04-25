const express = require('express')
const router = express.Router()

const equipmentController = require('../../controllers/equipment-controller')
const { recordValidator, formError } = require('../../middleware/validator')

router.get('/records', equipmentController.getRecords)

router.get('/:category', equipmentController.getCategories)

router.get('/show/:id', equipmentController.getEquipment)

router.post('/show/:id', recordValidator, formError, equipmentController.postRecord)

module.exports = router
