const { Equipment } = require('../models')

const adminController = {
  getEquipments: (req, res, next) => {
    Equipment.findAll({ raw: true })
      .then(equipments => res.render('admin/equipments', { equipments }))
      .catch(err => next(err))
  }
}

module.exports = adminController
