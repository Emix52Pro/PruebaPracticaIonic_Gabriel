// routes/lugarRoutes.js
const express = require('express');
const router = express.Router();
const lugarController = require('../controllers/lugarController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// GET: accesible para cualquier usuario autenticado
router.get('/', verifyToken, lugarController.getLugares);
router.get('/:id', verifyToken, lugarController.getLugarById);

// POST, PUT, DELETE: solo para administradores
router.post('/', verifyToken, isAdmin, lugarController.createLugar);
router.put('/:id', verifyToken, isAdmin, lugarController.updateLugar);
router.delete('/:id', verifyToken, isAdmin, lugarController.deleteLugar);

module.exports = router;
