const Producto = require('../models/Producto.js');

const getProductosPorMarca = async (req, res) => {
  const { marca } = req.params;
  try {
    const productos = await Producto.find({ marca: marca.toLowerCase() });
    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para esta marca' });
    }
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los productos por marca' });
  }
};

module.exports = { getProductosPorMarca };
