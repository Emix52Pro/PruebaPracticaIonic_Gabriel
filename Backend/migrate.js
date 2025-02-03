// migrate.js
const pool = require('./config/db');

const createTables = async () => {
  try {
    // Crear la tabla de usuarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(10) NOT NULL DEFAULT 'user'
      );
    `);

    // Crear la tabla de lugares
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lugares (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        imagen VARCHAR(255) NOT NULL
      );
    `);

    // Crear la tabla de comentarios
    await pool.query(`
      CREATE TABLE IF NOT EXISTS comentarios (
        id SERIAL PRIMARY KEY,
        comentario TEXT NOT NULL,
        user_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
        lugar_id INTEGER REFERENCES lugares(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tablas creadas o verificadas exitosamente.");
  } catch (error) {
    console.error("Error al crear las tablas:", error);
  }
};

createTables();
