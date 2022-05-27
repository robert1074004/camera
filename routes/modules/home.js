const express = require('express')
const router = express.Router()
const Camera = require('../../models/camera')

router.get('/',(req,res) => {
     Camera.find()
            .lean()
            .then(cameras =>  res.render('index',{cameras}))
            .catch(error => console.log('error'))
})



router.get('/member_error/:error',(req,res) => {
    const error = {error:req.params.error}
    res.render('member_error',{error})
})



router.get('/record',(req,res) => {
    res.render('record')
})

module.exports = router