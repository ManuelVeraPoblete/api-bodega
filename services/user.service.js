const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.createUser = async (userData) => {
  const { username, password, nameuser, role } = userData;
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new Error('El nombre de usuario ya existe');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, nameuser, password: hashedPassword, role });
  return user;
};

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const { username, password, role, nameuser, status } = userData;

  user.username = username || user.username;
  user.nameuser = nameuser || user.nameuser;
  user.status = status || user.status;
  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }
  user.role = role || user.role;

  await user.save();
  return user;
};

exports.toggleUserStatus = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  user.status = user.status === "inactivo" ? "activo" : "inactivo";
  await user.save();
  return { message: 'Estado de usuario actualizado' };
};
