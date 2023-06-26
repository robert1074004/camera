const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { User } = require('../models')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://camera1074004.herokuapp.com/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  const data = profile._json
  if (!data) {
    return done(null, false, req.flash('error_msg', '查無此人的資料!'))
  }
  User.findOrCreate({
    where: { email: data.email },
    defaults: {
      name: data.name,
      email: data.email,
      image: data.picture
    }
  })
    .then((user) => {
      return done(null, user[0])
    })
    .catch(err => done(err, false))
}))

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
