const { Equipment } = require('../models')

const adminController = {
  getEquipments: (req, res, next) => {
    Equipment.findAll({ raw: true })
      .then(equipments => res.render('admin/equipments', { equipments }))
      .catch(err => next(err))
  },
  createEquipment: (req, res, next) => {
    res.render('admin/create-equipment')
  },
  postEquipment: (req, res, next) => {
    const { name, category, price, quantity } = req.body
    if (!name.trim() || !category.trim() || !price.trim() || !quantity.trim()) {
      throw new Error('Some fields must be required !')
    }
    Equipment.create({ name, category, price, quantity })
      .then(() => {
        req.flash('success_msg', 'Equipment was successfully created')
        res.redirect('/admin/equipments')
      })
      .catch(err => next(err))
  },
  editEquipment: (req, res, next) => {
    const id = req.params.id
    Equipment.findByPk(id)
      .then((equipment) => {
        equipment = equipment.toJSON()
        res.render('admin/edit-equipment', { equipment })
      })
  },
  putEquipment: (req, res, next) => {
    const id = req.params.id
    const { name, category, price, quantity } = req.body
    if (!name.trim() || !category.trim() || !price.trim() || !quantity.trim()) {
      throw new Error('Some fields must be required !')
    }
    Equipment.findByPk(id)
      .then((equipment) => {
        if (!equipment) throw new Error("Equipment didn't exist!")
        return equipment.update({ name, category, price, quantity })
      })
      .then(() => {
        req.flash('success_msg', 'Equipment was successfully edited')
        res.redirect('/admin/equipments')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
