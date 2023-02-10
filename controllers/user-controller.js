const bcrypt = require('bcryptjs')
const User = require('../models/user')
const userController = {
  SignUpPage: (req, res) => { res.render('sign_up') },
  SignUp: (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) throw new Error('所有欄位都是必填資訊!')
    if (password !== confirmPassword) throw new Error('密碼與確認密碼不相符!')
    User.findOne({ email })
      .then(user => {
        if (user) throw new Error('此郵件已被註冊成功!')
        return bcrypt.hash(password, 10)
      })
      .then(hash => {
        return User.create({ name, email, password: hash })
      })
      .then(() => {
        req.flash('success_msg', '註冊成功!')
        res.redirect('/')
      })
      .catch(err => next(err))
  },
  logInPage: (req, res) => {
    res.render('log_in')
  },
  logIn: (req, res) => {
    req.flash('success_msg', '成功登入!')
    res.redirect('/equipments/SLRcamera')
  },
  logout: (req, res) => {
    req.flash('success_msg', '成功登出!')
    req.logout()
    res.redirect('/login')
  }
}

module.exports = userController
