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

// router.get('/cameratripod',(req,res) => {
//      Camera.find({category:'腳架'})
//             .lean()
//             .then(cameras =>  res.render('index',{cameras}))
//             .catch(error => console.log('error'))
// })

// router.get('/camera',(req,res) => {
//      Camera.find({category:'攝影機'})
//             .lean()
//             .then(cameras =>  res.render('index',{cameras}))
//             .catch(error => console.log('error'))
// })







module.exports = router