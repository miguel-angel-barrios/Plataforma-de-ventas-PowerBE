const Line = require('../models/Line');

// Obtener todas las líneas
exports.getLines = async (req, res) => {
    try {
        const lines = await Line.findAll();
        res.json(lines);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva línea
exports.createLine = async (req, res) => {
    const { checkId, productId, quantity, amount } = req.body;
    try {
        const line = await Line.create({ checkId, productId, quantity, amount });
        res.status(201).json({ message: 'Línea creada', line });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una línea
exports.updateLine = async (req, res) => {
    const { id } = req.params;
    const { checkId, productId, quantity, amount } = req.body;
    try {
        const line = await Line.findByPk(id);
        if (!line) {
            return res.status(404).json({ message: 'Línea no encontrada' });
        }
        await line.update({ checkId, productId, quantity, amount });
        res.json({ message: 'Línea actualizada', line });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una línea
exports.deleteLine = async (req, res) => {
    const { id } = req.params;
    try {
        const line = await Line.findByPk(id);
        if (!line) {
            return res.status(404).json({ message: 'Línea no encontrada' });
        }
        await line.destroy();
        res.json({ message: 'Línea eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
