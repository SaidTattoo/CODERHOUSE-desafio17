const { Schema , model } = require('mongoose')

const MensajeSchema = new Schema({
    usuario: String,
    mensaje: String,
    fecha: String,
})

module.exports = model('Mensaje', MensajeSchema)