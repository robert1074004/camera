const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cameraSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model('Camera', cameraSchema)