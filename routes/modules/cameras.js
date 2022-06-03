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




module.exports = router