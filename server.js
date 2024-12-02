const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Producto = require('./models/Producto'); // Asegúrate de importar el modelo Producto

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Ruta para obtener productos por categoría (marca)
app.get('/productos/:marca', async (req, res) => {
  const { marca } = req.params; // Extrae la marca de los parámetros de la URL

  try {
    // Busca productos cuyo campo "categoria" coincida con la marca solicitada
    const productos = await Producto.find({ categoria: marca });

    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para esta categoría' });
    }

    res.json(productos); // Devuelve los productos encontrados
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
