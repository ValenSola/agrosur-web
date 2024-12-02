const mongoose = require('mongoose');
const mysql = require('mysql2/promise');

// Configuración MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Producto = require('./models/Producto');

// Configuración MySQL
const pool = mysql.createPool({
  host: 'https://ferozo.host',
  user: 'c1492252_agrosur',
  password: 'woBOlu89ba',
  database: 'c1492252_agrosur',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function migrarProductos() {
  try {
    const productos = await Producto.find(); // Obtiene todos los productos de MongoDB
    const connection = await pool.getConnection();

    for (const producto of productos) {
      await connection.query(
        'INSERT INTO productos (nombre, precio, categoria, descripcion, imagen) VALUES (?, ?, ?, ?, ?)',
        [producto.nombre, producto.precio, producto.categoria, producto.descripcion, producto.imagen]
      );
      console.log(`Producto ${producto.nombre} migrado a MySQL.`);
    }
    connection.release();
    console.log('Migración completada.');
  } catch (error) {
    console.error('Error durante la migración:', error.message);
  } finally {
    mongoose.connection.close();
    pool.end();
  }
}

migrarProductos();
