// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Solo administradores pueden gestionar usuarios
router.get('/', verifyToken, isAdmin, usuarioController.getUsuarios);
router.post('/', verifyToken, isAdmin, usuarioController.createUsuario);
router.put('/:id', verifyToken, isAdmin, usuarioController.updateUsuario);

module.exports = router;
