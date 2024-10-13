const UserLog = require('../models/UserLog');

// Obtener todos los registros de usuario
exports.getUserLogs = async (req, res) => {
    try {
        const logs = await UserLog.findAll();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo registro de usuario
exports.createUserLog = async (req, res) => {
    const { userId, action } = req.body;
    try {
        const log = await UserLog.create({ userId, action });
        res.status(201).json({ message: 'Registro de usuario creado', log });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un registro de usuario
exports.updateUserLog = async (req, res) => {
    const { id } = req.params;
    const { userId, action } = req.body;
    try {
        const log = await UserLog.findByPk(id);
        if (!log) {
            return res.status(404).json({ message: 'Registro de usuario no encontrado' });
        }
        await log.update({ userId, action });
        res.json({ message: 'Registro de usuario actualizado', log });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un registro de usuario
exports.deleteUserLog = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await UserLog.findByPk(id);
        if (!log) {
            return res.status(404).json({ message: 'Registro de usuario no encontrado' });
        }
        await log.destroy();
        res.json({ message: 'Registro de usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
