const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cameraSchema = new Schema({
    time: {
        type: String,
        required: true
    }
})