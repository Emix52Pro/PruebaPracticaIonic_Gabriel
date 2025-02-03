// controllers/authController.js
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'tu_clave_secreta';

// Función para registrar un usuario (ejemplo básico; adáptala según tus necesidades)
const register = async (req, res) => {
  const { username, password, role, profilePicture } = req.body;
  try {
    const newUser = await Usuario.createUser(username, password, role, profilePicture);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Login: verifica credenciales y devuelve token
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Usuario.findUserByUsername(username);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    
    // Verificamos que el usuario esté activo
    if (user.estado !== 'activo') {
      return res.status(403).json({ message: 'Usuario inactivo. No puede acceder al programa.' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    
    const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Logout: dado que JWT es sin estado, simplemente se le indica al cliente eliminar el token.
const logout = (req, res) => {
  // Si se implementa una blacklist, aquí se agregaría el token a la misma.
  res.json({ message: 'Sesión cerrada correctamente' });
};

module.exports = {
  register,
  login,
  logout,
};
