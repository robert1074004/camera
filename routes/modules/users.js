const express = require('express')
const router = express.Router()
const User = require('../../models/user')



router.get('/sign_up',(req,res) => {
    res.render('sign_up')
})

router.post('/sign_up',(req,res) => {
    const {name,account,email,password} = req.body
    if (name.trim() === '' || account.trim() === '' || email.trim() === '' || password.trim() === '' ) {
        res.redirect('/member_error/註冊的資料不得為空白')
    }
    User.find()
          .lean()
          .then(users => { 
              let repeat = users.some(user => user.name === name || user.account === account || user.email === email || user.password === password)
                if (repeat) {
                    res.redirect('/member_error/註冊的資料已被別人使用')
                } else {
                    return User.create({ name,account,email,password })     
                        .then(() => res.redirect('/')) 
                        .catch(error => console.log(error))
                }
        }) 
         .catch(error => console.log(error))
})

router.get('/log_in',(req,res) => {
    res.render('log_in')
})

router.post('/log_in',(req,res) => {
    const {account,password} = req.body
    User.find()
          .lean()
          .then(users => { 
              let sucess = users.some(user =>  user.account === account && user.password === password)
                if (sucess) {
                    res.redirect('/')
                } else {
                    res.redirect('/member_error/帳號或密碼錯誤')
                }
        }) 
         .catch(error => console.log(error))
})


module.exports = router