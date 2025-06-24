const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'user' },
  status: { type: DataTypes.STRING, defaultValue: 'activo' },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  lastLogin: { type: DataTypes.DATE, allowNull: true },
});

module.exports = User;
