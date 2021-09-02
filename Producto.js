// const db = require('./db/db')
const productModel = require('./db/model/product')
class Producto {
    constructor(){

    }
    async guardar(producto){
        await productModel.create(producto)
        let productos = await productModel.find()
        let productosParse =  JSON.parse(JSON.stringify(productos))
        return productosParse
    }
    async listar(){
        let productos =  await productModel.find()
        let productosParse =  JSON.parse(JSON.stringify(productos))
        return productosParse
    }
    async buscarPorId(id){
        let producto = await productModel.findById(id)
        return producto
    }
    async eliminar(id){
          await productModel.findByIdAndDelete(id)
          let productos = await productModel.find()
          let productosParse =  JSON.parse(JSON.stringify(productos))
          return productosParse
    }
    async editar(id, {title, price, thumbnail}){
        await productModel.findByIdAndUpdate(id, {title, price, thumbnail})
        let productos = await productModel.find()
        let productosParse =  JSON.parse(JSON.stringify(productos))
        return productosParse
    }
}
module.exports = Producto;