const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const passport = require('./config/passport')
const flash = require('connect-flash')
const app = express()
const SESSION_SECRET = 'secret'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
console.log(process.env.MONGODB_URI)
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Express is running on http://localhost:${process.env.PORT}`)
})
