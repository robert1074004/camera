const cameraList = [{'相機':[{'name':'Canon 90D','image':'/images/Canon90D.jpg','price':1000,'id':0,},{'name':'Canon R5','image':'/images/CanonR5.jpg','price':1500,'id':1},{'name':'Canon 850D','image':'/images/Canon850D.jpg','price':500,'id':2}]}]


const express = require('express')
const app = express()
const port =3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://root:abc83213@learning.lmzd7.mongodb.net/camera?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const Camera = require('./models/camera')

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

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res) => {
    res.render('index',{cameraList:cameraList[0].相機})
})

app.get('/show/:categoryID',(req,res) => {
    const category = cameraList[0].相機[Number(req.params.categoryID)]
    res.render('show',{category})
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
    Camera.find()
          .lean()
          .then(cameras => { 
              let repeat = cameras.some(camera => camera.name === name || camera.account === account || camera.email === email || camera.password === password)
                if (repeat) {
                    res.redirect('/member_error/註冊的資料已被別人使用')
                } else {
                    return Camera.create({ name,account,email,password })     
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
    Camera.find()
          .lean()
          .then(cameras => { 
              let sucess = cameras.some(camera =>  camera.account === account && camera.password === password)
                if (sucess) {
                    res.redirect('/')
                } else {
                    res.redirect('/member_error/帳號或密碼錯誤')
                }
        }) 
         .catch(error => console.log(error))
})

app.get('/error/:categoryID',(req,res) => {
    const category = cameraList[0].相機[Number(req.params.categoryID)]
    res.render('error',{category})
})

app.get('/record/:categoryID',(req,res) => {
    const categoryid = req.params.categoryID
    const now = new Date()
    const myDate = new Date(req.query.time)
    if ((myDate-now)/(1000 * 60 * 60 * 24) < 1) {
        res.redirect('/error/'+categoryid)
    } else {
        const category = cameraList[0].相機[Number(req.params.categoryID)]
        res.render('record')
    }
    
})

app.get('/record',(req,res) => {
    res.render('record')
})

app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})