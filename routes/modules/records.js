const express = require('express')
const router = express.Router()
const records = require('../../models/record')

router.get('/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    const now = new Date()
    console.log(typeof(req.query.time))
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