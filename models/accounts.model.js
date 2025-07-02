const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Account = sequelize.define('accounts', {
  codigo: {type: DataTypes.STRING(10), unique: true, allowNull: false},
  nombre: {type: DataTypes.STRING(100),allowNull: false},
  descripcion: {type: DataTypes.TEXT},
  tipo: {type: DataTypes.STRING(20),validate: {isIn: [['Activo', 'Gasto', 'Pasivo']]}},
  subtipo: {type: DataTypes.STRING(50)},
  estado: {type: DataTypes.STRING(10),validate: {isIn: [['activa', 'inactiva']]}}}, 
  { tableName: 'accounts', timestamps: false
});

module.exports = Account;