const cameraList = [{'name':'Canon90D','image':'/images/Canon90D.jpg','price':1000,'category':'相機'},{'name':'CanonR5','image':'/images/CanonR5.jpg','price':1500,'category':'相機'},{'name':'Canon850D','image':'/images/Canon850D.jpg','price':500,'category':'相機'},{'name':'鋁合金腳架-1','image':'/images/鋁合金腳架-1.webp','price':500,'category':'腳架'},{'name':'鋁合金腳架-2','image':'/images/鋁合金腳架-2.webp','price':500,'category':'腳架'},{'name':'鋁合金腳架-3','image':'/images/鋁合金腳架-3.jpg','price':500,'category':'腳架'},{'name':'PSC_AG-DVX200','image':'/images/PSC_AG-DVX200.jpg','price':500,'category':'攝影機'},{'name':'SONY_CX405','image':'/images/SONY_CX405.jpg','price':500,'category':'攝影機'},{'name':'SONY_HXR-NX80','image':'/images/SONY_HXR-NX80.jpg','price':500,'category':'攝影機'}]

const Camera = require('../camera')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
    cameraList.forEach(camera => Camera.create({name:camera.name,image:camera.image,price:camera.price,category:camera.category}))
    console.log('done')
})