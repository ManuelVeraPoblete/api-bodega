const Supplier = require('../models/supplier.model');

// Crear proveedor
exports.createSupplier = async (req, res) => {
  const { empresa, rut, email, telefono, contacto, estado, direccion } = req.body;

  try {
    const existing = await Supplier.findOne({ where: { rut } });
    if (existing) {
      return res.status(400).json({ message: 'El RUT del proveedor ya existe' });
    }

    const supplier = await Supplier.create({
      empresa,
      rut,
      email,
      telefono,
      contacto,
      estado: estado || 'activo',
      direccion
    });

    res.status(201).json(supplier);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Obtener todos los proveedores
exports.getSuppliers = async (_, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Obtener proveedor por ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    supplier ? res.json(supplier) : res.status(404).json({ message: 'Proveedor no encontrado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Actualizar proveedor
exports.updateSupplier = async (req, res) => {
  try {
    console.log("entre  ", req)
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Proveedor no encontrado' });

    const { empresa, rut, email, telefono, contacto, estado, direccion } = req.body;

    supplier.empresa = empresa || supplier.empresa;
    supplier.rut = rut || supplier.rut;
    supplier.email = email || supplier.email;
    supplier.telefono = telefono || supplier.telefono;
    supplier.contacto = contacto || supplier.contacto;
    supplier.estado = estado || supplier.estado;
    supplier.direccion = direccion || supplier.direccion;

    await supplier.save();
    res.json(supplier);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// Activar/Inactivar proveedor (soft delete)
exports.softDeleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Proveedor no encontrado' });

    supplier.estado = supplier.estado === 'inactivo' ? 'activo' : 'inactivo';
    await supplier.save();

    res.json({ message: `Proveedor ${supplier.estado === 'activo' ? 'activado' : 'desactivado'}` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
