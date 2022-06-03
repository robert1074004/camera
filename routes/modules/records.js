const express = require('express')
const router = express.Router()
const records = require('../../models/record')
const Camera = require('../../models/camera')

router.get('/show/:category',(req,res) => {
    const category = req.params.category
    console.log(category)
    Camera.findOne({name:category})
          .lean()
          .then(camera => res.render('show',{camera}))   
})

router.post('/show/:category',(req,res) => {
    const errors = []
    const category = req.params.category
    const now = new Date()
    console.log(req.body.time)
    const time = req.body.time
    const userId = req.user._id
    const email = req.user.email
    const myDate = new Date(req.body.time)
    if ((myDate-now)/(1000 * 60 * 60 * 24) < 1) {
        errors.push({message:'日期選擇錯誤'})
       
    }
    records.findOne({name:category}).then(record => {
        if (record) {
            errors.push({message:'這個器材已經被預約了'})
        }
        if (errors.length) {
            Camera.findOne({name:category})
            .lean()
            .then(camera => res.render('show',{camera,errors}))
        } else {
            return records.create({name:category,email,time,userId})
            .then(() => res.redirect('/records/'))
            .catch(err => console.log(err))
        }
        
    })         
       
})

router.get('/',(req,res) => {
    const userId = req.user._id
    records.find({userId})
        .lean()
        .sort({_id:'asc'})
        .then(record => {console.log(record)
            res.render('record',{record})})
        .catch(error => console.error(error))
})

module.exports = router