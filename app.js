

const express = require('express')
const app = express()
const port =3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:abc83213@learning.lmzd7.mongodb.net/camera?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const User = require('./models/user')
const Camera = require('./models/camera')

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

app.get('/',(req,res) => {
    Camera.find()
          .lean()
          .then(cameras =>  res.render('index',{cameras}))
          .catch(error => console.log('error'))
})

app.get('/show/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    Camera.findById(categoryid)
          .lean()
          .then(camera => res.render('show',{camera}))   
})

app.get('/sign_in',(req,res) => {
    res.render('sign_in')
})

app.get('/member_error/:error',(req,res) => {
    const error = {error:req.params.error}
    res.render('member_error',{error})
})

app.post('/sign_in',(req,res) => {
    const {name,account,email,password} = req.body
    if (name.trim() === '' || account.trim() === '' || email.trim() === '' || password.trim() === '' ) {
        res.redirect('/member_error/註冊的資料不得為空白')
    }
    User.find()
          .lean()
          .then(users => { 
              let repeat = users.some(user => user.name === name || user.account === account || user.email === email || user.password === password)
                if (repeat) {
                    res.redirect('/member_error/註冊的資料已被別人使用')
                } else {
                    return User.create({ name,account,email,password })     
                        .then(() => res.redirect('/')) 
                        .catch(error => console.log(error))
                }
        }) 
         .catch(error => console.log(error))
})

app.get('/log_in',(req,res) => {
    res.render('log_in')
})

app.post('/log_in',(req,res) => {
    const {account,password} = req.body
    User.find()
          .lean()
          .then(users => { 
              let sucess = users.some(user =>  user.account === account && user.password === password)
                if (sucess) {
                    res.redirect('/')
                } else {
                    res.redirect('/member_error/帳號或密碼錯誤')
                }
        }) 
         .catch(error => console.log(error))
})

app.get('/error/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    Camera.findById(categoryid)
          .lean()
          .then(camera => res.render('error',{camera}))
})

app.get('/record/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    const now = new Date()
    const myDate = new Date(req.query.time)
    if ((myDate-now)/(1000 * 60 * 60 * 24) < 1) {
        res.redirect('/error/'+categoryid)
    } else {
        Camera.findById(categoryid)
          .lean()
          .then(camera => res.render('record'))   
    }   
})

app.get('/record',(req,res) => {
    res.render('record')
})

app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})