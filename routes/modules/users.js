const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')



router.get('/sign_up',(req,res) => {
    res.render('sign_up')
})

router.post('/sign_up',(req,res) => {
    const {name,email,password,confirmPassword} = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
        errors.push({message:'所有欄位都是必填'})
    }
    if (password !== confirmPassword) {
        errors.push({message: '密碼與確認密碼不相符!'})
    }
    if (errors.length) {
        return res.render('sign_up',{
            errors,name,email,password,confirmPassword
        })
    }
    User.findOne({email}).then(user => {
        if (user) {
          errors.push({message:'這個 Email 已經註冊過了'})
          return res.render('sign_up',{
            errors,name,email,password,confirmPassword
          })
        } 
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password,salt))
            .then(hash => User.create({name,email,password:hash}))
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
        
    })
    .catch(err => console.log(err))
})

router.get('/log_in',(req,res) => {
    res.render('log_in')
    let empty = []
    req.session.messages = empty
})

router.post('/log_in',passport.authenticate('local',{
    successRedirect:'/SLRcamera',
    failureRedirect:'users/log_in',
    failureMessage:true
}))

router.get('/logout',(req,res) => {
    req.logout()
    req.flash('success_msg','你已經成功登出')
    res.redirect('/users/log_in')
})


module.exports = router