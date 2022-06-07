const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    status : {
        type:String,
        default: 'reserve'
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        index:true,
        required:true
    },
    quantity:{
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('record', recordSchema)