const { User, Equipment, Record } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
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
    imgurFileHandler(file)
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
            if (!user) throw new Error("User didn't exist!")
            equipment.userName = user.name
            res.render('admin/equipment', { equipment })
          })
          .catch(err => next(err))
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
    Promise.all([Equipment.findByPk(req.params.id), imgurFileHandler(file)])
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
  },
  getUsers: (req, res, next) => {
    User.findAll({ raw: true })
      .then((users) => {
        users = users.map(user => ({
          ...user,
          index: users.indexOf(user) + 1
        }))
        res.render('admin/users', { users })
      })
      .catch(err => next(err))
  },
  patchUser: (req, res, next) => {
    User.findByPk(req.params.id)
      .then((user) => {
        if (!user) throw new Error("User didn't exist !")
        if (user.toJSON().email === 'abc50113@yahoo.com.tw') throw new Error("You can't edit this admin!")
        if (user.toJSON().isAdmin) {
          return user.update({ isAdmin: false })
        }
        return user.update({ isAdmin: true })
      })
      .then(() => {
        req.flash('success_msg', 'User was successfully edited')
        res.redirect('/admin/users')
      })
      .catch(err => next(err))
  },
  getRecords: (req, res, next) => {
    Record.findAll({ raw: true })
      .then((records) => {
        records = records.map(record => ({
          ...record,
          index: records.indexOf(record) + 1
        }))
        res.render('admin/records', { records })
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
