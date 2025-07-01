const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

exports.authenticateUser = async (username, password) => {
  const foundUser = await User.findOne({ where: { username } });

  if (!foundUser || foundUser.status !== 'activo') {
    throw new Error('Usuario inválido o inactivo');
  }

  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (!validPassword) {
    throw new Error('Contraseña incorrecta');
  }

  foundUser.lastLogin = new Date();
  await foundUser.save();

  const token = jwt.sign(
    { id: foundUser.id, role: foundUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    token,
    user: {
      id: foundUser.id,
      nameuser: foundUser.nameuser,
      username: foundUser.username,
      role: foundUser.role,
      status: foundUser.status
    }
  };
};
