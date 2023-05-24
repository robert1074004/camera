const bcrypt = require('bcryptjs')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { User } = require('../models')
const userController = {
  SignUpPage: (req, res) => { res.render('sign_up') },
  SignUp: (req, res, next) => {
    const { name, email, password } = req.body
    const { file } = req
    return Promise.all([imgurFileHandler(file), bcrypt.hash(password, 10)])
      .then(([filePath, hash]) => {
        return User.findOrCreate({
          where: { email },
          defaults: {
            name,
            email,
            password: hash,
            image: filePath || 'https://i.imgur.com/Qo3mXjE.jpeg'
          }
        })
      })
      .then(users => {
        if (!users[1]) throw new Error('此郵件已被註冊成功!')
        req.flash('success_msg', '註冊成功!')
        res.redirect('/log_in')
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
