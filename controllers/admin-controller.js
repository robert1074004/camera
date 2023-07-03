const { User, Equipment, Record } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const nodemailer = require('nodemailer')
const adminController = {
  getEquipments: (req, res, next) => {
    const category = req.query.category
    Equipment.findAll({ where: { ...category ? { category } : {} }, raw: true })
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
  },
  patchRecord: (req, res, next) => {
    Record.findByPk(req.params.id)
      .then((record) => {
        if (!record) throw new Error("Record didn't exist !")
        if (record.toJSON().status === '已借出') {
          return record.update({ status: '已被預約' })
        }
        return record.update({ status: '已借出' })
      })
      .then(() => {
        req.flash('success_msg', "Record's status is successfully edited")
        res.redirect('back')
      })
      .catch(err => next(err))
  },
  deleteRecord: (req, res, next) => {
    Promise.all([Record.findByPk(req.params.id), Equipment.findOne({ where: { name: req.body.equipmentName } })])
      .then(([record, equipment]) => {
        if (!record) throw new Error("Record didn't exist !")
        return Promise.all([record.destroy(), equipment.increment('quantity')])
      })
      .then(() => {
        req.flash('success_msg', 'Record is successfully deleted !')
        res.redirect('back')
      })
      .catch(err => next(err))
  },
  postEmail: (req, res, next) => {
    Record.findByPk(req.params.id, { raw: true })
      .then((record) => {
        if (!record) throw new Error("Record didn't exist !")
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.gmail,
            pass: process.env.gmail_pass
          },
          socketTimeout: 60000
        })

        const mailOptions = {
          from: process.env.gmail,
          to: record.userEmail,
          subject: `你租借的器材${record.equipmentName}已到期，請盡速歸還`,
          html: `<p>你租借的器材${record.equipmentName}已到期，請盡速歸還，詳情請先登入帳號查看</p><a href='https://camera1074004.herokuapp.com/equipments/SLRcamera'>官方網站</a>`
        }
        return new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              return reject(err)
            } else {
              return resolve(info)
            }
          })
        })
      })
      .then((info) => {
        req.flash('success_msg', '寄信成功!')
        res.redirect('back')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
