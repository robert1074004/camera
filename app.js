

const express = require('express')
const app = express()
const port =3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
mongoose.connect('mongodb+srv://root:abc83213@learning.lmzd7.mongodb.net/camera?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection

db.on('error',() => {
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
})
app.engine('hbs',exphbs({defaultLayout:'main',extname:'.hbs'}))
app.set('view engine','hbs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))

app.use(routes)


app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})