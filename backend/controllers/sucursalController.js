const Sucursal = require('../models/Sucursal');

// Obtener todas las sucursales
exports.getSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.findAll();
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva sucursal
exports.createSucursal = async (req, res) => {
    const { name, location } = req.body;
    try {
        const sucursal = await Sucursal.create({ name, location });
        res.status(201).json({ message: 'Sucursal creada', sucursal });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una sucursal
exports.updateSucursal = async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;
    try {
        const sucursal = await Sucursal.findByPk(id);
        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        await sucursal.update({ name, location });
        res.json({ message: 'Sucursal actualizada', sucursal });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una sucursal
exports.deleteSucursal = async (req, res) => {
    const { id } = req.params;
    try {
        const sucursal = await Sucursal.findByPk(id);
        if (!sucursal) {
            return res.status(404).json({ message: 'Sucursal no encontrada' });
        }
        await sucursal.destroy();
        res.json({ message: 'Sucursal eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
