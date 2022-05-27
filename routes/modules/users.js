const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')



router.get('/sign_up',(req,res) => {
    res.render('sign_up')
})

router.post('/sign_up',(req,res) => {
    const {name,email,password,confirmPassword} = req.body
    // if (name.trim() === '' || account.trim() === '' || email.trim() === '' || password.trim() === '' ) {
    //     res.redirect('/member_error/註冊的資料不得為空白')
    // }
    User.findOne({email}).then(user => {
        if (user) {
            console.log('User already exists.')
            res.render('sign_up',{name,email,password,confirmPassword})
        } else {
            return User.create({
                name,
                email,
                password
            })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})

router.get('/log_in',(req,res) => {
    res.render('log_in')
})

router.post('/log_in',passport.authenticate('local',{
    successRedirect:'/',
    faliureRedirect:'/users/log_in'
}))


module.exports = router