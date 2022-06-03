const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })



const db = mongoose.connection

db.on('error',() => {
    console.log('mongodb error!')
    console.log(process.env.MONGODB_URI)
})

db.once('open',() => {
    console.log('mongodb connected!')
})

module.exports = db