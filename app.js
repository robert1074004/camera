const express = require('express')
const app = express()
const port =3000
const exphbs = require('express-handlebars')

const camera_list = [{name:"相機",image:"/images/相機.jpg",price:1000,categoryFirst:"canon 90D",categorySecond:"canon 80D",categoryThird:"canon 60D"},{name:"腳架",image:"/images/腳架.jpg",price:500,categoryFirst:"腳架1",categorySecond:"腳架2",categoryThird:"腳架3"},{name:"攝影機",image:"/images/攝影機.jpg",price:1500,categoryFirst:"攝影機1",categorySecond:"攝影機2",categoryThird:"攝影機3"},{name:"記憶卡",image:"/images/記憶卡.jpg",price:100,categoryFirst:"記憶卡1",categorySecond:"記憶卡2",categoryThird:"記憶卡3"}]

app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('index',{camera_list:camera_list})
})

app.get('/show_select',(req,res) => {
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