const supplierService = require('../services/supplier.service');

// Crear proveedor
exports.createSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los proveedores
exports.getSuppliers = async (_, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener proveedor por ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    res.json(supplier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Actualizar proveedor
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await supplierService.updateSupplier(req.params.id, req.body);
    res.json(supplier);
  } catch (error) {
    if (error.message === 'Proveedor no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

// Activar/Inactivar proveedor (soft delete)
exports.softDeleteSupplier = async (req, res) => {
  try {
    const result = await supplierService.toggleSupplierStatus(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Proveedor no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};