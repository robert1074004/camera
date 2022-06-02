
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
const usePassport = require('./config/passport')
const app = express()
const port =3000
<<<<<<< HEAD

=======
>>>>>>> parent of d6154ac (feat: add user authentication in todo and home routers)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ override: true })
  }
require('./config/mongoose')

console.log(process.env)

app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')

<<<<<<< HEAD


=======
>>>>>>> parent of d6154ac (feat: add user authentication in todo and home routers)
app.use(session({
    secret:'ThisIsMySecret',
    resave:false,
    saveUninitialized:true
}))

<<<<<<< HEAD
const usePassport = require('./config/passport')

=======
>>>>>>> parent of d6154ac (feat: add user authentication in todo and home routers)
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))

usePassport(app)

app.use(routes)


app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})