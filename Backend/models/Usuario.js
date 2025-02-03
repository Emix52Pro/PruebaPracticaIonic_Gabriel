// models/Usuario.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Función para crear un usuario. Se incluye el parámetro opcional "estado".
const createUser = async (username, password, role = 'user', profilePicture = null, estado = 'activo') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO usuarios (username, password, role, profile_picture, estado)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username, role, profile_picture, estado
  `;
  const { rows } = await pool.query(query, [username, hashedPassword, role, profilePicture, estado]);
  return rows[0];
};

const findUserByUsername = async (username) => {
  const query = `SELECT * FROM usuarios WHERE username = $1`;
  const { rows } = await pool.query(query, [username]);
  return rows[0];
};

// Función para actualizar un usuario (por ejemplo, modificar profile_picture, role o estado)
const updateUser = async (id, fields) => {
  // Se asume que "fields" es un objeto con las columnas a actualizar, por ejemplo: { profile_picture, role, estado }
  // Creamos dinámicamente la sentencia SQL para actualizar los campos.
  const keys = Object.keys(fields);
  const setString = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
  const values = Object.values(fields);
  
  const query = `
    UPDATE usuarios
    SET ${setString}
    WHERE id = $${keys.length + 1}
    RETURNING id, username, role, profile_picture, estado
  `;
  const { rows } = await pool.query(query, [...values, id]);
  return rows[0];
};

const getAllUsers = async () => {
  // Para el listado de usuarios, por ejemplo, no devolvemos el password
  const query = 'SELECT id, username, role, profile_picture, estado FROM usuarios';
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = {
  createUser,
  findUserByUsername,
  updateUser,
  getAllUsers,
};
