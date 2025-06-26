const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// 🌐 Configuración de CORS
app.use(cors({
  origin: 'http://localhost:8080', // Frontend en React
  credentials: true
}));

// 🧠 Parseo de JSON
app.use(express.json());

// 📦 Rutas de tu API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 🌐 Ruta base (útil para probar si está viva la API)
app.get('/', (req, res) => {
  res.json({ message: 'API de Bodega operativa' });
});

// 🚀 Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor backend escuchando en http://localhost:${PORT}`);
});
