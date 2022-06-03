const express = require('express')
const router = express.Router()
const Camera = require('../../models/camera')






router.get('/error/:category',(req,res) => {
    const category = req.params.category
    Camera.findOne({name:category})
          .lean()
          .then(camera => res.render('error',{camera}))
})




module.exports = router