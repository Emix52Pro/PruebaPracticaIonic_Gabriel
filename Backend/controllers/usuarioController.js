// controllers/usuarioController.js
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAllUsers();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Crear un usuario (similar al registro, pero desde un endpoint de administración)
const createUsuario = async (req, res) => {
  const { username, password, role, profilePicture, estado } = req.body;
  try {
    const usuario = await Usuario.createUser(username, password, role, profilePicture, estado);
    res.status(201).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

// Actualizar un usuario (por ejemplo, para cambiar el estado o modificar otros campos)
const updateUsuario = async (req, res) => {
  const { id } = req.params;
  // Los campos a actualizar se reciben en el body
  const updateFields = req.body;
  try {
    const usuarioActualizado = await Usuario.updateUser(id, updateFields);
    if (!usuarioActualizado) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario,
};
