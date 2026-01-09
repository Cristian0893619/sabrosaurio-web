const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); 

const app = express();

app.use(cors());
app.use(express.json());

// --- CONEXIÓN INTELIGENTE ---
// Si existe una variable de entorno en la nube, úsala. Si no, usa la local.
const DB_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sabrosaurio';

mongoose.connect(DB_URI)
    .then(() => console.log('🟢 Conectado a MongoDB'))
    .catch(err => console.error('🔴 Error de Mongo:', err));

const rutasRecetas = require('./routes/recetas');
app.use('/api/recetas', rutasRecetas);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/sabrosaurio.html'));
});

// El puerto también debe ser dinámico para la nube
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});