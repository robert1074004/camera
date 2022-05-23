const cameraList = [{'name':'Canon 90D','image':'/images/Canon90D.jpg','price':1000,'category':'相機'},{'name':'Canon R5','image':'/images/CanonR5.jpg','price':1500,'category':'相機'},{'name':'Canon 850D','image':'/images/Canon850D.jpg','price':500,'category':'相機'}]

const Camera = require('../camera')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
    cameraList.forEach(camera => Camera.create({name:camera.name,image:camera.image,price:camera.price,category:camera.category}))
    console.log('done')
})