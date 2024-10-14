const Check = require('../models/Check');

// Obtener todas las boletas del usuario autenticado
exports.getAllChecks = async (req, res) => {
    try {
        const userId = req.user.id; // Obtener el ID del usuario del token
        const checks = await Check.findAll({ where: { userId } }); // Filtrar las boletas por userId
        res.json(checks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo cheque
exports.createCheck = async (req, res) => {
    const { totalAmount, purchaseDetails } = req.body;
    const userId = req.user.id; // Obtiene el userId del token

    try {
        const check = await Check.create({ userId, totalAmount, purchaseDetails }); // Guarda el cheque en la base de datos
        res.status(201).json({ message: 'Cheque creado', check });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Actualizar una boleta
exports.updateCheck = async (req, res) => {
    const { id } = req.params;
    const { totalAmount } = req.body;
    try {
        const check = await Check.findByPk(id);
        if (!check) {
            return res.status(404).json({ message: 'Boleta no encontrada' });
        }
        await check.update({ totalAmount });
        res.json({ message: 'Boleta actualizada', check });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una boleta
exports.deleteCheck = async (req, res) => {
    const { id } = req.params;
    try {
        const check = await Check.findByPk(id);
        if (!check) {
            return res.status(404).json({ message: 'Boleta no encontrada' });
        }
        await check.destroy();
        res.json({ message: 'Boleta eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
