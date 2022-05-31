
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const port =3000
console.log(process.env)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
require('./config/mongoose')

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')

const usePassport = require('./config/passport')

app.use(session({
    secret:'ThisIsMySecret',
    resave:false,
    saveUninitialized:true
}))



app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))



usePassport(app)

app.use(routes)


app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})