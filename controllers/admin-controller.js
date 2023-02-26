const { Equipment } = require('../models')
const { User } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')
const adminController = {
  getEquipments: (req, res, next) => {
    Equipment.findAll({ raw: true })
      .then(equipments => {
        equipments = equipments.map(equipment => ({
          ...equipment,
          index: equipments.indexOf(equipment) + 1
        }))
        res.render('admin/equipments', { equipments })
      })
      .catch(err => next(err))
  },
  createEquipment: (req, res, next) => {
    res.render('admin/create-equipment')
  },
  postEquipment: (req, res, next) => {
    const userId = req.user.id
    const { name, category, price, quantity, description } = req.body
    if (!name.trim() || !category.trim() || !price.trim() || !quantity.trim()) {
      throw new Error('Some fields must be required !')
    }
    const { file } = req
    localFileHandler(file)
      .then(filePath => {
        return Equipment.create({ name, category, price, quantity, description, image: filePath || null, userId })
      })
      .then(() => {
        req.flash('success_msg', 'Equipment was successfully created')
        res.redirect('/admin/equipments')
      })
      .catch(err => next(err))
  },
  getEquipment: (req, res, next) => {
    Equipment.findByPk(req.params.id)
      .then((equipment) => {
        if (!equipment) throw new Error("Equipment didn't exist!")
        equipment = equipment.toJSON()
        Promise.all([User.findByPk(equipment.userId, { raw: true })])
          .then(([user]) => {
            equipment.userName = user.name
          })
          .catch(err => next(err))
        res.render('admin/equipment', { equipment })
      })
      .catch(err => next(err))
  },
  editEquipment: (req, res, next) => {
    Equipment.findByPk(req.params.id)
      .then((equipment) => {
        if (!equipment) throw new Error("Equipment didn't exist!")
        equipment = equipment.toJSON()
        res.render('admin/edit-equipment', { equipment })
      })
  },
  putEquipment: (req, res, next) => {
    const userId = req.user.id
    const { name, category, price, quantity, description } = req.body
    if (!name.trim() || !category.trim() || !price.trim() || !quantity.trim()) {
      throw new Error('Some fields must be required !')
    }
    const { file } = req
    Promise.all([Equipment.findByPk(req.params.id), localFileHandler(file)])
      .then(([equipment, filePath]) => {
        if (!equipment) throw new Error("Equipment didn't exist!")
        return equipment.update({ name, category, price, quantity, description, image: filePath || equipment.image, userId })
      })
      .then(() => {
        req.flash('success_msg', 'Equipment was successfully edited')
        res.redirect('/admin/equipments')
      })
      .catch(err => next(err))
  },
  deleteEquipment: (req, res, next) => {
    Equipment.findByPk(req.params.id)
      .then((equipment) => {
        if (!equipment) throw new Error("Equipment didn't exist!")
        return equipment.destroy()
      })
      .then(() => {
        req.flash('success_msg', 'Equipment was successfully deleted')
        res.redirect('/admin/equipments')
      })
  }
}

module.exports = adminController
