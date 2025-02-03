// seed.js
require('dotenv').config();
const pool = require('./config/db');

const seed = async () => {
  try {
    // 1. Insertar usuarios (con profile_picture y estado)
    const usuarioInsertQuery = `
      INSERT INTO usuarios (username, password, role, profile_picture, estado) VALUES
      ('admin', '$2b$10$J0yVbWSt/HrJJkW7K4gN6e5y.Z2HJ0pppYkQ3sK2BpGGxYxhd0vOq', 'admin', 'https://example.com/admin.png', 'activo'),
      ('usuario1', '$2b$10$J0yVbWSt/HrJJkW7K4gN6e5y.Z2HJ0pppYkQ3sK2BpGGxYxhd0vOq', 'user', 'https://example.com/usuario1.png', 'activo'),
      ('usuario2', '$2b$10$J0yVbWSt/HrJJkW7K4gN6e5y.Z2HJ0pppYkQ3sK2BpGGxYxhd0vOq', 'user', 'https://example.com/usuario2.png', 'activo'),
      ('usuario3', '$2b$10$J0yVbWSt/HrJJkW7K4gN6e5y.Z2HJ0pppYkQ3sK2BpGGxYxhd0vOq', 'user', 'https://example.com/usuario3.png', 'activo'),
      ('usuario4', '$2b$10$J0yVbWSt/HrJJkW7K4gN6e5y.Z2HJ0pppYkQ3sK2BpGGxYxhd0vOq', 'user', 'https://example.com/usuario4.png', 'activo');
    `;
    await pool.query(usuarioInsertQuery);
    console.log("Usuarios insertados.");

    // 2. Insertar lugares
    const lugaresInsertQuery = `
      INSERT INTO lugares (titulo, imagen) VALUES
      ('Quito', 'https://blog.uber-cdn.com/cdn-cgi/image/width=2160,quality=80,onerror=redirect,format=auto/wp-content/uploads/2018/09/EC_X-lugares-para-visitar-en-Quito-que-no-pueden-faltar-en-tu-lista.jpg'),
      ('Cuenca', 'https://media.viajando.travel/p/390bed37b6d8f81002fd8d0e4ca39a49/adjuntos/236/imagenes/000/671/0000671562/1200x675/smart/cuencawebp.png'),
      ('Galapagos', 'https://www.costacruceros.es/content/dam/costa/costa-magazine/articles-magazine/islands/galapagos-islands/5-isole-galapagos-694x390.jpg.image.694.390.low.jpg'),
      ('Guayaquil', 'https://www.exoticca.com/_next/image?url=https%3A%2F%2Fuploads.exoticca.com%2Fglobal%2Fdestination%2Fpoi%2Fguayaquil.png&w=3840&q=75');
    `;
    await pool.query(lugaresInsertQuery);
    console.log("Lugares insertados.");

    /*  
      3. Insertar comentarios para cada lugar  
      Se asume que:
      - Para "Quito" (lugar_id = 1):
          • 'Muy buen lugar' lo hace usuario1 (id = 2)
          • 'Interesante' lo hace usuario2 (id = 3)
      - Para "Cuenca" (lugar_id = 2):
          • 'Muy buen lugar' lo hace usuario3 (id = 4)
          • 'Interesante' lo hace usuario4 (id = 5)
      - Para "Galapagos" (lugar_id = 3):
          • 'Muy buen lugar' lo hace usuario1 (id = 2)
          • 'Interesante' lo hace usuario2 (id = 3)
      - Para "Guayaquil" (lugar_id = 4):
          • 'Muy buen lugar' lo hace usuario3 (id = 4)
          • 'Interesante' lo hace usuario4 (id = 5)
    */
    const comentariosInsertQuery = `
      INSERT INTO comentarios (comentario, user_id, lugar_id) VALUES
      ('Muy buen lugar', 2, 1),
      ('Interesante', 3, 1),
      ('Muy buen lugar', 4, 2),
      ('Interesante', 5, 2),
      ('Muy buen lugar', 2, 3),
      ('Interesante', 3, 3),
      ('Muy buen lugar', 4, 4),
      ('Interesante', 5, 4);
    `;
    await pool.query(comentariosInsertQuery);
    console.log("Comentarios insertados.");

    process.exit(0);
  } catch (error) {
    console.error("Error al insertar datos de prueba:", error);
    process.exit(1);
  }
};

seed();
