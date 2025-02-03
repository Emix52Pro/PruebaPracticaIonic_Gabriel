// models/Lugar.js
const pool = require('../config/db');

const getAllLugares = async () => {
  const query = `
    SELECT l.*, COALESCE((
      SELECT ROUND(AVG(puntuacion)::numeric, 2)
      FROM comentarios
      WHERE lugar_id = l.id
    ), 0) AS promedio_rating
    FROM lugares l
  `;
  const { rows } = await pool.query(query);
  return rows;
};

const getLugarById = async (id) => {
  const query = `
    SELECT l.*, COALESCE((
      SELECT ROUND(AVG(puntuacion)::numeric, 2)
      FROM comentarios
      WHERE lugar_id = l.id
    ), 0) AS promedio_rating
    FROM lugares l
    WHERE l.id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const createLugar = async (titulo, imagen) => {
  const query = 'INSERT INTO lugares (titulo, imagen) VALUES ($1, $2) RETURNING *';
  const { rows } = await pool.query(query, [titulo, imagen]);
  return rows[0];
};

const updateLugar = async (id, titulo, imagen) => {
  const query = 'UPDATE lugares SET titulo = $1, imagen = $2 WHERE id = $3 RETURNING *';
  const { rows } = await pool.query(query, [titulo, imagen, id]);
  return rows[0];
};

const deleteLugar = async (id) => {
  const query = 'DELETE FROM lugares WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getAllLugares,
  getLugarById,
  createLugar,
  updateLugar,
  deleteLugar,
};
