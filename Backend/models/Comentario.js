// models/Comentario.js
const pool = require('../config/db');

const getComentariosByLugarId = async (lugarId) => {
  const query = `
    SELECT c.id, c.comentario, c.puntuacion, u.username AS name 
    FROM comentarios c 
    JOIN usuarios u ON c.user_id = u.id 
    WHERE c.lugar_id = $1
  `;
  const { rows } = await pool.query(query, [lugarId]);
  return rows;
};

const createComentario = async (comentario, puntuacion, userId, lugarId) => {
  const query = `
    INSERT INTO comentarios (comentario, puntuacion, user_id, lugar_id)
    VALUES ($1, $2, $3, $4) RETURNING *
  `;
  const { rows } = await pool.query(query, [comentario, puntuacion, userId, lugarId]);
  return rows[0];
};

const updateComentario = async (id, comentario, puntuacion) => {
  const query = 'UPDATE comentarios SET comentario = $1, puntuacion = $2 WHERE id = $3 RETURNING *';
  const { rows } = await pool.query(query, [comentario, puntuacion, id]);
  return rows[0];
};

const deleteComentario = async (id) => {
  const query = 'DELETE FROM comentarios WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const getComentarioById = async (id) => {
  const query = 'SELECT * FROM comentarios WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getComentariosByLugarId,
  createComentario,
  updateComentario,
  deleteComentario,
  getComentarioById,
};
