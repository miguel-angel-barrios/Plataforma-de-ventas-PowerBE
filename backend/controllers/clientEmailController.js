const ClientEmail = require('../models/ClientEmail');

// Obtener todos los emails de clientes
exports.getClientEmails = async (req, res) => {
    try {
        const emails = await ClientEmail.findAll();
        res.json(emails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo email de cliente
exports.createClientEmail = async (req, res) => {
    const { clientId, email } = req.body;
    try {
        const clientEmail = await ClientEmail.create({ clientId, email });
        res.status(201).json({ message: 'Email de cliente creado', clientEmail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un email de cliente
exports.updateClientEmail = async (req, res) => {
    const { id } = req.params;
    const { clientId, email } = req.body;
    try {
        const clientEmail = await ClientEmail.findByPk(id);
        if (!clientEmail) {
            return res.status(404).json({ message: 'Email de cliente no encontrado' });
        }
        await clientEmail.update({ clientId, email });
        res.json({ message: 'Email de cliente actualizado', clientEmail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un email de cliente
exports.deleteClientEmail = async (req, res) => {
    const { id } = req.params;
    try {
        const clientEmail = await ClientEmail.findByPk(id);
        if (!clientEmail) {
            return res.status(404).json({ message: 'Email de cliente no encontrado' });
        }
        await clientEmail.destroy();
        res.json({ message: 'Email de cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
