const express = require('express')
const router = express.Router()
const Camera = require('../../models/camera')



router.get('/show/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    Camera.findById(categoryid)
          .lean()
          .then(camera => res.render('show',{camera}))   
})


router.get('/error/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    Camera.findById(categoryid)
          .lean()
          .then(camera => res.render('error',{camera}))
})

router.get('/record/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    const now = new Date()
    const myDate = new Date(req.query.time)
    if ((myDate-now)/(1000 * 60 * 60 * 24) < 1) {
        res.redirect('/cameras/error/'+categoryid)
    } else {
        Camera.findById(categoryid)
          .lean()
          .then(camera => res.render('record'))   
    }   
})


module.exports = router