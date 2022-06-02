
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const port =3000

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ override: true })
  }
require('./config/mongoose')

console.log(process.env)

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')



app.use(session({
    secret:'ThisIsMySecret',
    resave:false,
    saveUninitialized:true
}))

const usePassport = require('./config/passport')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))



usePassport(app)

app.use(routes)


app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})