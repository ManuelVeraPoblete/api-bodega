const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importación de rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const supplierRoutes = require('./routes/supplier.routes'); // 👈 Importa las rutas de suppliers

const app = express();

// 🌐 Configuración de CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://192.168.1.13:8080'
  ],
  credentials: true
}));

// 🧠 Parseo de JSON
app.use(express.json());

// 📦 Rutas de tu API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes); // 👈 Habilita el CRUD de suppliers

// 🌐 Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'API de Bodega operativa' });
});

// 🚀 Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor backend escuchando en http://localhost:${PORT}`);
});
