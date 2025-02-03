// controllers/comentarioController.js
const Comentario = require('../models/Comentario');

const getComentarios = async (req, res) => {
  const { lugarId } = req.params;
  try {
    const comentarios = await Comentario.getComentariosByLugarId(lugarId);
    res.json(comentarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};

const createComentario = async (req, res) => {
  const { lugarId } = req.params;
  const { comentario, puntuacion } = req.body;
  if (puntuacion < 1 || puntuacion > 5) {
    return res.status(400).json({ message: 'La puntuación debe estar entre 1 y 5' });
  }
  try {
    const nuevoComentario = await Comentario.createComentario(comentario, puntuacion, req.userId, lugarId);
    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
};

const updateComentario = async (req, res) => {
    const { id } = req.params;
    const { comentario, puntuacion } = req.body;
  
    // Validar que la puntuación esté en el rango permitido (1 a 5)
    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ message: 'La puntuación debe estar entre 1 y 5' });
    }
    
    try {
      const comentarioDB = await Comentario.getComentarioById(id);
      if (!comentarioDB)
        return res.status(404).json({ message: 'Comentario no encontrado' });
      
      // Solo el propietario del comentario o un admin pueden modificarlo
      if (comentarioDB.user_id !== req.userId && req.userRole !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para modificar este comentario' });
      }
      
      const updatedComentario = await Comentario.updateComentario(id, comentario, puntuacion);
      res.json(updatedComentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar comentario' });
    }
  };

const deleteComentario = async (req, res) => {
    const { id } = req.params;
    try {
      const comentarioDB = await Comentario.getComentarioById(id);
      if (!comentarioDB)
        return res.status(404).json({ message: 'Comentario no encontrado' });
      
      // Solo el propietario del comentario o un admin pueden eliminarlo
      if (comentarioDB.user_id !== req.userId && req.userRole !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario' });
      }
      
      await Comentario.deleteComentario(id);
      res.json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar comentario' });
    }
  };

module.exports = {
  getComentarios,
  createComentario,
  updateComentario,
  deleteComentario,
};
