const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: String,
    descripcion: String,
    imagen: String,
    categoria: String
});

module.exports = mongoose.model('Producto', productoSchema);
