const { Equipment } = require('../models')
const { Record } = require('../models')
const equipmentController = {
  getCategories: (req, res, next) => {
    const category = req.params.category
    Equipment.findAll({
      where: { category }, raw: true
    })
      .then(equipments => res.render('index', {
        equipments
      }))
      .catch(err => next(err))
  },
  getEquipment: (req, res, next) => {
    Equipment.findByPk(req.params.id, { raw: true })
      .then(equipment => {
        if (!equipment.quantity) throw new Error('這個器材目前無庫存')
        res.render('show', {
          equipment
        })
      })
      .catch(err => next(err))
  },
  postRecord: (req, res, next) => {
    const { date, quantity } = req.body
    const userEmail = req.user.email
    const userName = req.user.name
    const now = new Date()
    const myDate = new Date(date)
    if ((myDate - now) / (1000 * 60 * 60 * 24) < 1) throw new Error('日期選擇錯誤!')
    if (!date.trim() || !quantity) throw new Error('某欄位有誤!')
    Equipment.findByPk(req.params.id)
      .then((equipment) => {
        const { name, category, price } = equipment.toJSON()
        console.log(name)
        Promise.all([equipment.decrement('quantity', { by: quantity }), Record.create({ userName, userEmail, date, category, quantity, equipmentName: name, totalPrice: quantity * price })])
          .then(() => {
            req.flash('success_msg', '租借成功!')
            res.redirect('/record')
          })
          .catch(err => next(err))
      })
  }
  // getRecords: (req, res) => {
  //   const userId = req.user._id
  //   records.find({
  //     userId
  //   })
  //     .lean()
  //     .sort({
  //       _id: 'asc'
  //     })
  //     .then(record => {
  //       res.render('record', {
  //         record
  //       })
  //     })
  //     .catch(error => console.error(error))
  // }
}

module.exports = equipmentController
