// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'tu_clave_secreta';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Se espera el formato "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No se proporcionó token' });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido o expirado' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Se requiere rol de administrador' });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
};
