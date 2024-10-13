const Check = require('../models/Check');

// Obtener todos los cheques
exports.getAllChecks = async (req, res) => {
    try {
        const checks = await Check.findAll();
        res.json(checks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo cheque
exports.createCheck = async (req, res) => {
    const { totalAmount } = req.body;
    try {
        const check = await Check.create({ totalAmount });
        res.status(201).json({ message: 'Cheque creado', check });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un cheque
exports.updateCheck = async (req, res) => {
    const { id } = req.params;
    const { totalAmount } = req.body;
    try {
        const check = await Check.findByPk(id);
        if (!check) {
            return res.status(404).json({ message: 'Cheque no encontrado' });
        }
        await check.update({ totalAmount });
        res.json({ message: 'Cheque actualizado', check });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un cheque
exports.deleteCheck = async (req, res) => {
    const { id } = req.params;
    try {
        const check = await Check.findByPk(id);
        if (!check) {
            return res.status(404).json({ message: 'Cheque no encontrado' });
        }
        await check.destroy();
        res.json({ message: 'Cheque eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
