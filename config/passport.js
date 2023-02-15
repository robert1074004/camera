const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models')

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, (req, email, password, done) => {
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return done(null, false, req.flash('error_msg', '帳號或密碼輸入錯誤!'))
      }
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('error_msg', '帳號或密碼輸入錯誤!'))
          }
          return done(null, user)
        })
    })
    .catch(err => done(err, false))
}))
passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      user = user.toJSON()
      done(null, user)
    })
    .catch(err => done(err, false))
})

module.exports = passport
