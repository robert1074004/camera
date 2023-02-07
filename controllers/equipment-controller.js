const Camera = require('../models/camera')
const records = require('../models/record')
const equipmentController = {
  getCategories: (req, res) => {
    const category = req.params.category
    Camera.find({
      category
    })
      .lean()
      .then(cameras => res.render('index', {
        cameras
      }))
      .catch(error => console.log('error', error))
  },
  getEquipment: (req, res) => {
    const name = req.params.name
    Camera.findOne({
      name
    })
      .lean()
      .then(camera => {
        if (!camera.quantity) {
          return res.render('show', {
            camera,
            error: '目前無庫存'
          })
        }
        return res.render('show', {
          camera
        })
      })
  },
  postRecord: (req, res) => {
    const errors = []
    const name = req.params.name
    const time = req.body.time.split('T')[0]
    const email = req.user.email
    const now = new Date()
    const quantity = Number(req.body.quantity)
    const userId = req.user._id
    const myDate = new Date(req.body.time)
    if ((myDate - now) / (1000 * 60 * 60 * 24) < 1) {
      errors.push({
        message: '日期選擇錯誤'
      })
    }
    Camera.findOne({
      name
    }).then(camera => {
      if (!camera.quantity) {
        errors.push({
          message: '這個器材已經沒有庫存'
        })
      }
      if (errors.length) {
        Camera.findOne({
          name
        })
          .lean()
          .then(camera => res.render('show', {
            camera,
            errors
          }))
      } else {
        return records.create({
          name,
          email,
          time,
          userId,
          quantity
        })
          .then(() => Camera.findOne({
            name
          }).then(camera => {
            camera.quantity -= quantity
            return camera.save()
              .then(() => res.redirect('/equipments/records'))
              .catch(err => console.log(err))
          }))
          .catch(err => console.log(err))
      }
    })
  },
  getRecords: (req, res) => {
    const userId = req.user._id
    records.find({
      userId
    })
      .lean()
      .sort({
        _id: 'asc'
      })
      .then(record => {
        res.render('record', {
          record
        })
      })
      .catch(error => console.error(error))
  }
}

module.exports = equipmentController
