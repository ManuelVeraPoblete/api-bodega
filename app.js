const express = require('express');
const morgan = require('morgan'); // <-- Aquí importas morgan
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');

// Middleware
app.use(morgan('dev')); // <-- Aquí colocas morgan para que muestre logs en consola
app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('BD conectada y sincronizada');
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
});
