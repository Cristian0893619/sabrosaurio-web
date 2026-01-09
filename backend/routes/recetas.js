const express = require('express');
const router = express.Router();
const Receta = require('../models/Receta');

// 1. OBTENER TODAS
router.get('/', async (req, res) => {
    try {
        const recetas = await Receta.find();
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// 2. CREAR UNA
router.post('/', async (req, res) => {
    const receta = new Receta(req.body);
    try {
        const nuevaReceta = await receta.save();
        res.status(201).json(nuevaReceta);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 3. ACTUALIZAR UNA (NUEVO)
router.put('/:id', async (req, res) => {
    try {
        // Buscamos por ID y actualizamos con los datos nuevos (req.body)
        // { new: true } significa "devuélveme la receta ya cambiada"
        const recetaActualizada = await Receta.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(recetaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// 4. BORRAR UNA
router.delete('/:id', async (req, res) => {
    try {
        await Receta.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Receta eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

module.exports = router;
