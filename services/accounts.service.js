const Account = require('../models/accounts.model');

// Crear cuenta contable
exports.createAccount = async (data) => {
  return await Account.create(data);
};

// Obtener todas las cuentas contables
exports.getAllAccounts = async () => {
  return await Account.findAll({ order: [['id', 'ASC']] });
};

// Obtener cuenta contable por ID
exports.getAccountById = async (id) => {
  const cuenta = await Account.findByPk(id);
  if (!cuenta) {
    throw new Error('Cuenta contable no encontrada');
  }
  return cuenta;
};

// Actualizar cuenta contable
exports.updateAccount = async (id, data) => {
  const cuenta = await Account.findByPk(id);
  if (!cuenta) {
    throw new Error('Cuenta contable no encontrada');
  }
  return await cuenta.update(data);
};

// Cambiar estado de la cuenta contable
exports.toggleAccountStatus = async (id) => {
  const cuenta = await Account.findByPk(id);
  if (!cuenta) {
    throw new Error('Cuenta contable no encontrada');
  }
  const newStatus = cuenta.estado === 'activa' ? 'inactiva' : 'activa';
  await cuenta.update({ estado: newStatus });
  return { message: `Estado de la cuenta contable cambiado a ${newStatus}` };
};