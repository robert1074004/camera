const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://root:abc83213@learning.lmzd7.mongodb.net/camera?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })


const db = mongoose.connection

db.on('error',() => {
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
})

module.exports = db