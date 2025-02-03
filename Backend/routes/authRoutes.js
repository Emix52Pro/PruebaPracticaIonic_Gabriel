// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');  // Para proteger logout

// Registro de usuario (disponible para nuevos registros)
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout (requiere que se envíe el token para "cerrar sesión")
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
