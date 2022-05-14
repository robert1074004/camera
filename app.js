const camera_list = [{'相機':[{'name':'Canon 90D','image':'/images/Canon90D.jpg','price':1000,'id':0},{'name':'Canon R5','image':'/images/CanonR5.jpg','price':1500,'id':1},{'name':'Canon 850D','image':'/images/Canon850D.jpg','price':500,'id':2}]}]

const express = require('express')
const app = express()
const port =3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:abc83213@learning.lmzd7.mongodb.net/camera?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error',() => {
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
})
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('index',{camera_list:camera_list[0].相機})
})

app.get('/show/:category',(req,res) => {
    const category = camera_list[0].相機[Number(req.params.category)]
    res.render('show',{category})
})

app.get('/sign_in',(req,res) => {
    res.render('sign_in')
})

app.get('/log_in',(req,res) => {
    res.render('log_in')
})

app.get('/record',(req,res) => {
    let now = new Date()
    let myDate = new Date(req.query.time)
    if ((myDate-now)/(1000 * 60 * 60 * 24) <= 1) {
        res.redirect('/')
    }
    res.render('record')
})

app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})