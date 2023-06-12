const bcrypt = require('bcryptjs')
const { imgurFileHandler } = require('../helpers/file-helpers')
const nodemailer = require('nodemailer')
const { User } = require('../models')
const userController = {
  SignUpPage: (req, res) => {
    res.render('sign_up')
  },
  SignUp: (req, res, next) => {
    const { name, email, password } = req.body
    const { file } = req
    const lower = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const upper = lower.map(i => i.toUpperCase())
    const number = '0123456789'.split('')
    const collection = lower.concat(upper, number)
    let Numbers = ''
    return Promise.all([User.findOne({ where: { email } }), bcrypt.hash(password, 10), imgurFileHandler(file)])
      .then(([user, hash, filePath]) => {
        if (user) throw new Error('此郵件已被註冊成功!')
        for (let i = 0; i < 5; i++) {
          Numbers += collection[Math.floor(Math.random() * collection.length)]
        }
        req.session.validator = { email, password: hash, name, filePath, validation: Numbers }
        return new Promise((resolve, reject) => {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.gmail,
              pass: process.env.gmail_pass
            },
            socketTimeout: 60000
          })
          const mailOptions = {
            from: process.env.gmail,
            to: email,
            subject: 'TWT器材租借站寄送註冊驗證碼',
            html: `<p>你的驗證碼是${req.session.validator.validation}，請在一天內輸入驗證碼以便註冊</p><a href='https://camera1074004.herokuapp.com/validate'>輸入驗證碼</a>`
          }

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              return reject(err)
            } else {
              return resolve(info)
            }
          })
        })
      })
      .then((info) => {
        req.flash('success_msg', '已寄送驗證碼到你的郵件')
        res.redirect('/validate')
      })
      .catch(err => next(err))
  },
  validatePage: (req, res) => {
    res.render('validatePage')
  },
  validate: (req, res, next) => {
    const { validation, name, email, password, filePath } = req.session.validator
    if (validation !== req.body.validation) {
      throw new Error('驗證碼輸入錯誤!')
    }
    return User.create({ name, email, password, image: filePath || 'https://i.imgur.com/Qo3mXjE.jpeg' })
      .then(() => {
        delete req.session.validator
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
  },
  editUserPage: (req, res) => {
    res.render('editUser')
  },
  editUser: (req, res, next) => {
    const { name, password } = req.body
    const { file } = req
    return Promise.all([User.findByPk(req.params.id), imgurFileHandler(file), bcrypt.hash(password, 10)])
      .then(([user, filePath, hash]) => {
        if (!user) throw new Error('此使者不存在')
        return user.update({ name, password: hash, image: filePath || user.toJSON().image })
      })
      .then(() => {
        req.flash('success_msg', '使用者資訊修改成功')
        res.redirect('back')
      })
      .catch(err => next(err))
  }
}

module.exports = userController
