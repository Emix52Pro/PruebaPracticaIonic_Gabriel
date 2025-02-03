// routes/comentarioRoutes.js
const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Rutas para listar y crear comentarios en un lugar
router.get('/lugares/:lugarId/comentarios', verifyToken, comentarioController.getComentarios);
router.post('/lugares/:lugarId/comentarios', verifyToken, comentarioController.createComentario);

// Rutas para actualizar y eliminar un comentario
router.put('/comentarios/:id', verifyToken, comentarioController.updateComentario);
router.delete('/comentarios/:id', verifyToken, comentarioController.deleteComentario);

module.exports = router;
