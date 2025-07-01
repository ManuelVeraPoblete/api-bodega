const Supplier = require('../models/supplier.model');

exports.createSupplier = async (supplierData) => {
  const { rut } = supplierData;
  const existingSupplier = await Supplier.findOne({ where: { rut } });
  if (existingSupplier) {
    throw new Error('El RUT del proveedor ya existe');
  }
  const supplier = await Supplier.create(supplierData);
  return supplier;
};

exports.getAllSuppliers = async () => {
  const suppliers = await Supplier.findAll();
  return suppliers;
};

exports.getSupplierById = async (id) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) {
    throw new Error('Proveedor no encontrado');
  }
  return supplier;
};

exports.updateSupplier = async (id, supplierData) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) {
    throw new Error('Proveedor no encontrado');
  }

  const { empresa, rut, email, telefono, contacto, estado, direccion } = supplierData;

  supplier.empresa = empresa || supplier.empresa;
  supplier.rut = rut || supplier.rut;
  supplier.email = email || supplier.email;
  supplier.telefono = telefono || supplier.telefono;
  supplier.contacto = contacto || supplier.contacto;
  supplier.estado = estado || supplier.estado;
  supplier.direccion = direccion || supplier.direccion;

  await supplier.save();
  return supplier;
};

exports.toggleSupplierStatus = async (id) => {
  const supplier = await Supplier.findByPk(id);
  if (!supplier) {
    throw new Error('Proveedor no encontrado');
  }

  supplier.estado = supplier.estado === 'inactivo' ? 'activo' : 'inactivo';
  await supplier.save();
  return { message: `Proveedor ${supplier.estado === 'activo' ? 'activado' : 'desactivado'}` };
};
