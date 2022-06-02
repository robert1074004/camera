const mongoose = require('mongoose')


mongoose.connect("mongodb+srv://root:abc1074004@learning.lmzd7.mongodb.net/camera?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })



const db = mongoose.connection

db.on('error',() => {
    console.log(process.env.MONGODB_URI)
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
})

module.exports = db