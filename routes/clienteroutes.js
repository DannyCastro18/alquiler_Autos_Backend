const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clientecontroller');

// Ruta para el login de clientes
// router.post('/login', clienteController.loginCliente);

// Ruta para registrar un nuevo cliente
router.post('/registro', clienteController.registrarCliente);

// Ruta para obtener todos los clientes
router.get('/', clienteController.verclientes);

module.exports = router;
