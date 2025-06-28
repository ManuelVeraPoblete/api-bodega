const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');

// Rutas CRUD para proveedores
router.post('/', supplierController.createSupplier);               // Crear
router.get('/', supplierController.getSuppliers);                  // Obtener todos
router.get('/:id', supplierController.getSupplierById);            // Obtener por ID
router.put('/:id', supplierController.updateSupplier);             // Actualizar
router.patch('/:id', supplierController.softDeleteSupplier);       // Activar/Inactivar (soft delete)

module.exports = router;
