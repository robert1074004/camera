const express = require('express')
const app = express()
const port =3000
const exphbs = require('express-handlebars')

const camera_list = [{'相機':[{'name':'Canon 90D','image':'/images/Canon90D.jpg','price':1000},{'name':'Canon R5','image':'/images/CanonR5.jpg','price':1500},{'name':'Canon 850D','image':'/images/Canon850D.jpg','price':500}]}]

app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('index',{camera_list:camera_list[0].相機})
})

app.get('/show_select',(req,res) => {
    console.log(req.query.length)
    res.render('show_select')
})

app.get('/sign_in',(req,res) => {
    res.render('sign_in')
})

app.get('/log_in',(req,res) => {
    res.render('log_in')
})

app.get('/record',(req,res) => {
    res.render('record')
})

app.listen(port,() => {
    console.log(`Express is running on http://localhost:${port}`)
})