const Salesman = require('../models/Salesman');

// Obtener todos los vendedores
exports.getSalesmen = async (req, res) => {
    try {
        const salesmen = await Salesman.findAll();
        res.json(salesmen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo vendedor
exports.createSalesman = async (req, res) => {
    const { userId, name } = req.body;
    try {
        const salesman = await Salesman.create({ userId, name });
        res.status(201).json({ message: 'Vendedor creado', salesman });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un vendedor
exports.updateSalesman = async (req, res) => {
    const { id } = req.params;
    const { userId, name } = req.body;
    try {
        const salesman = await Salesman.findByPk(id);
        if (!salesman) {
            return res.status(404).json({ message: 'Vendedor no encontrado' });
        }
        await salesman.update({ userId, name });
        res.json({ message: 'Vendedor actualizado', salesman });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un vendedor
exports.deleteSalesman = async (req, res) => {
    const { id } = req.params;
    try {
        const salesman = await Salesman.findByPk(id);
        if (!salesman) {
            return res.status(404).json({ message: 'Vendedor no encontrado' });
        }
        await salesman.destroy();
        res.json({ message: 'Vendedor eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
