const Storage = require('../models/Storage');

// Obtener todos los almacenes
exports.getStorages = async (req, res) => {
    try {
        const storages = await Storage.findAll();
        res.json(storages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo almacén
exports.createStorage = async (req, res) => {
    const { location } = req.body;
    try {
        const storage = await Storage.create({ location });
        res.status(201).json({ message: 'Almacén creado', storage });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un almacén
exports.updateStorage = async (req, res) => {
    const { id } = req.params;
    const { location } = req.body;
    try {
        const storage = await Storage.findByPk(id);
        if (!storage) {
            return res.status(404).json({ message: 'Almacén no encontrado' });
        }
        await storage.update({ location });
        res.json({ message: 'Almacén actualizado', storage });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un almacén
exports.deleteStorage = async (req, res) => {
    const { id } = req.params;
    try {
        const storage = await Storage.findByPk(id);
        if (!storage) {
            return res.status(404).json({ message: 'Almacén no encontrado' });
        }
        await storage.destroy();
        res.json({ message: 'Almacén eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
