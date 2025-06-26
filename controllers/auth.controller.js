const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await User.findOne({ where: { username } });

   
    if (!foundUser || foundUser.status !== 'activo') {
      return res.status(401).json({ message: 'Usuario inválido o inactivo' });
    }

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    foundUser.lastLogin = new Date();
    await foundUser.save();

    const token = jwt.sign(
      { id: foundUser.id, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: foundUser.id,
        nameuser: foundUser.nameuser,
        username: foundUser.username,
        role: foundUser.role,
        status: foundUser.status
      }
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error });
  }
};
