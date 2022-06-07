const express = require('express')
const router = express.Router()
const records = require('../../models/record')
const Camera = require('../../models/camera')

router.get('/show/:category',(req,res) => {
    const category = req.params.category
    Camera.findOne({name:category})
          .lean()
          .then(camera => {
              if (!camera.quantity) {
                return res.render('show',{camera,error:'目前無庫存'})
              }
              return res.render('show',{camera})
            })   
})

router.post('/show/:category',(req,res) => {
    const errors = []
    const category = req.params.category
    const now = new Date()
    const time = req.body.time
    const quantity = Number(req.body.quantity)
    const userId = req.user._id
    const email = req.user.email
    const myDate = new Date(req.body.time)
    if ((myDate-now)/(1000 * 60 * 60 * 24) < 1) {
        errors.push({message:'日期選擇錯誤'})
    }
    Camera.findOne({name:category}).then(camera => {
        if (!camera.quantity) {
            errors.push({message:'這個器材已經沒有庫存'})
        }
        if (errors.length) {
            Camera.findOne({name:category})
            .lean()
            .then(camera => res.render('show',{camera,errors}))
        } else {
            return records.create({name:category,email,time,userId,quantity})
            .then(() => Camera.findOne({name:category}).then(camera => {
                camera.quantity -= quantity
                return camera.save()
                .then(() => res.redirect('/records/'))
                .catch(err => console.log(err))
            }))
            .catch(err => console.log(err))
        }
        
    })         
       
})

router.get('/',(req,res) => {
    const userId = req.user._id
    records.find({userId})
        .lean()
        .sort({_id:'asc'})
        .then(record => 
            res.render('record',{record}))
        .catch(error => console.error(error))
})

module.exports = router