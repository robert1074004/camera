const express = require('express')
const router = express.Router()
const Camera = require('../../models/camera')

router.get('/:category',(req,res) => {
     const category = req.params.category
     Camera.find({category})
            .lean()
            .then(cameras =>  res.render('index',{cameras}))
            .catch(error => console.log('error'))
})






module.exports = router