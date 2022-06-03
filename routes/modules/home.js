const express = require('express')
const router = express.Router()
const Camera = require('../../models/camera')

router.get('/',(req,res) => {
     Camera.find()
            .lean()
            .then(cameras =>  res.render('index',{cameras}))
            .catch(error => console.log('error'))
})







module.exports = router