const accountService = require('../services/accounts.service');

// Crear cuenta contable
exports.createAccount = async (req, res) => {
  try {
    const cuenta = await accountService.createAccount(req.body);
    res.status(201).json(cuenta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las cuentas contables
exports.getAccounts = async (_, res) => {
  try {
    const cuentas = await accountService.getAllAccounts();
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener cuenta contable por ID
exports.getAccountById = async (req, res) => {
  try {
    const cuenta = await accountService.getAccountById(req.params.id);
    res.json(cuenta);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar cuenta contable
exports.updateAccount = async (req, res) => {
  try {
    const cuenta = await accountService.updateAccount(req.params.id, req.body);
    res.json(cuenta);
  } catch (error) {
    if (error.message === 'Cuenta contable no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

// Cambiar estado de la cuenta contable
exports.softDeleteAccount = async (req, res) => {
  try {
    const result = await accountService.toggleAccountStatus(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Cuenta contable no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
