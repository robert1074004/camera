const mongoose = require('mongoose')

<<<<<<< HEAD
mongoose.connect("mongodb+srv://root:abc1074004@learning.lmzd7.mongodb.net/camera?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
=======
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
>>>>>>> parent of d6154ac (feat: add user authentication in todo and home routers)


const db = mongoose.connection

db.on('error',() => {
    console.log(process.env.MONGODB_URI)
    console.log('mongodb error!')
})

db.once('open',() => {
    console.log('mongodb connected!')
})

module.exports = db