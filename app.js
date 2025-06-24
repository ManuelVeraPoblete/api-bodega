const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('BD conectada y sincronizada');
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
});
