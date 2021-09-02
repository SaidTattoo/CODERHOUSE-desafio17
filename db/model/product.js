const { Schema , model } = require('mongoose')

const productoSchema = new Schema({
    title: String,
    price: Number,
    thumbnail: String,
})

module.exports = model('Producto', productoSchema)