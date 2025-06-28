const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // tu conexión Sequelize

const Supplier = sequelize.define('supplier', {
  empresa: {type: DataTypes.STRING, allowNull: false },
  direccion : { type: DataTypes.STRING, allowNull: false, },
  rut: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING },
  telefono: { type: DataTypes.STRING },
  contacto: { type: DataTypes.STRING },
  estado: { type: DataTypes.STRING, defaultValue: 'activo' }
})
  

module.exports = Supplier;


