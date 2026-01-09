const mongoose = require('mongoose');

const RecetaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: String,
    precio: Number,
    imagen: String,
    tiempo: String,
    dificultad: String,
    ingredientes: String,
    preparacion: String,
    // --- NUEVO CAMPO ---
    utensilios: String 
});

module.exports = mongoose.model('Receta', RecetaSchema);
