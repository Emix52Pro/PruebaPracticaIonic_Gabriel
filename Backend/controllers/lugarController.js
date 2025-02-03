// controllers/lugarController.js
const Lugar = require('../models/Lugar');

const getLugares = async (req, res) => {
  try {
    const lugares = await Lugar.getAllLugares();
    res.json(lugares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener lugares' });
  }
};

const getLugarById = async (req, res) => {
  const { id } = req.params;
  try {
    const lugar = await Lugar.getLugarById(id);
    if (!lugar) return res.status(404).json({ message: 'Lugar no encontrado' });
    res.json(lugar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el lugar' });
  }
};

const createLugar = async (req, res) => {
  const { titulo, imagen } = req.body;
  try {
    const lugar = await Lugar.createLugar(titulo, imagen);
    res.status(201).json(lugar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear lugar' });
  }
};

const updateLugar = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen } = req.body;
  try {
    const lugar = await Lugar.updateLugar(id, titulo, imagen);
    if (!lugar) return res.status(404).json({ message: 'Lugar no encontrado' });
    res.json(lugar);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar lugar' });
  }
};

const deleteLugar = async (req, res) => {
  const { id } = req.params;
  try {
    const lugar = await Lugar.deleteLugar(id);
    if (!lugar) return res.status(404).json({ message: 'Lugar no encontrado' });
    res.json({ message: 'Lugar eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar lugar' });
  }
};

module.exports = {
  getLugares,
  getLugarById,
  createLugar,
  updateLugar,
  deleteLugar,
};
