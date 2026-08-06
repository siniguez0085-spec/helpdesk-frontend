const mongoose = require('mongoose');

/**
 * Establece la conexion con MongoDB usando la cadena definida en MONGO_URI.
 * Se detiene el proceso si la conexion falla, ya que la API no puede
 * funcionar sin base de datos.
 */
async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdesk';
    await mongoose.connect(uri);
    console.log(`MongoDB conectado correctamente -> ${mongoose.connection.name}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
