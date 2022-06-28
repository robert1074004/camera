const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
module.exports = app => {
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy({usernameField:'email'},(email,password,done) => {
        User.findOne({email})
                .then(user => {
                    if (!user) {
                        return done(null,false,{message:'此Email還未註冊!'})
                    }
                    return bcrypt.compare(password,user.password)
                        .then(isMatch => {
                            if (!isMatch) {
                                return done(null,false,{message:'Email或密碼有錯誤!'})
                            }
                            return done(null,user)
                        })
                })
                .catch(err => done(err,false))
    }))
    passport.serializeUser((user,done) => {
        done(null,user.id)
    })
    passport.deserializeUser((id,done) => {
        User.findById(id)
            .lean()
            .then(user => done(null,user))
            .catch(err => done(err,false))
    })
}