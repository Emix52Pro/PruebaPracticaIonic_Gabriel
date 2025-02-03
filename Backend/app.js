require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Importa cors
const app = express();

// Configura cors: permite todas las solicitudes (o configura de manera más específica)
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const lugarRoutes = require('./routes/lugarRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Definir las rutas base
app.use('/api/auth', authRoutes);
app.use('/api/lugares', lugarRoutes);
app.use('/api', comentarioRoutes); // Rutas que usan prefijos '/lugares/:lugarId/comentarios' y '/comentarios/:id'
app.use('/api/usuarios', usuarioRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
