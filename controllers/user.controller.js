const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// Crear usuario
exports.createUser = async (req, res) => {
  const { username, nameuser, password, role } = req.body;

  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(400).json({ message: 'El nombre de usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, nameuser, password: hashedPassword, role });

    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Obtener todos
exports.getUsers = async (_, res) => {
  const users = await User.findAll();
  res.json(users);
};

// Obtener por ID
exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'No encontrado' });
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'No encontrado' });

  const { username, password, role } = req.body;

  user.username = username || user.username;
  if (password) user.password = await bcrypt.hash(password, 10);
  user.role = role || user.role;

  await user.save();
  res.json(user);
};

// Soft delete
exports.softDeleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'No encontrado' });

  user.status = user.status === "inactivo" ? "activo" : "inactivo";
  
  await user.save();
  res.json({ message: 'Usuario desactivado' });
};
