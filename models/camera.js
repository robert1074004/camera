const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cameraSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Camera', cameraSchema)
