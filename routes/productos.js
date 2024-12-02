const express = require('express');
const Producto = require('../models/Producto.js'); // Asegúrate de que estás importando el modelo correctamente
const { getProductosPorMarca } = require('../controllers/productosController');

const router = express.Router();

// Obtener todos los productos
router.get('/:marca', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});


// Ruta para obtener productos según la marca
router.get('/:marca', getProductosPorMarca);

module.exports = router;