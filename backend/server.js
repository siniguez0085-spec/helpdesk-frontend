require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const ticketRoutes = require('./routes/tickets');

const app = express();

// Conexion a la base de datos
connectDB();

// Middlewares
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json()); // parsea el body de las peticiones como JSON

// Ruta de salud, util para verificar el despliegue en Render/Railway
app.get('/', (req, res) => {
  res.json({ mensaje: 'API Help Desk activa', estado: 'ok' });
});

// Rutas principales de la API REST
app.use('/api/tickets', ticketRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor Help Desk escuchando en http://localhost:${PORT}`);
});
