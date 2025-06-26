const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users', {
  username: { type: DataTypes.STRING, allowNull: false },
  nameuser: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
  status: { type: DataTypes.STRING, defaultValue: 'activo' },
  lastlogin: { type: DataTypes.DATE, allowNull: true },
});

module.exports = User;
