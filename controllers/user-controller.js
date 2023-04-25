const bcrypt = require('bcryptjs')
const { User } = require('../models')
const userController = {
  SignUpPage: (req, res) => { res.render('sign_up') },
  SignUp: (req, res, next) => {
    const { name, email, password } = req.body
    User.findOne({ where: { email } })
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
    res.redirect('/log_in')
  }
}

module.exports = userController
