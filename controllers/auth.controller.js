const authService = require('../services/auth.service');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { token, user } = await authService.authenticateUser(username, password);
    res.json({ token, user });
  } catch (error) {
    if (error.message === 'Usuario inválido o inactivo' || error.message === 'Contraseña incorrecta') {
      return res.status(401).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};