const ClientAddress = require('../models/ClientAddress');

// Obtener todas las direcciones de clientes
exports.getClientAddresses = async (req, res) => {
    try {
        const addresses = await ClientAddress.findAll();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva dirección de cliente
exports.createClientAddress = async (req, res) => {
    const { clientId, address } = req.body;
    try {
        const clientAddress = await ClientAddress.create({ clientId, address });
        res.status(201).json({ message: 'Dirección de cliente creada', clientAddress });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una dirección de cliente
exports.updateClientAddress = async (req, res) => {
    const { id } = req.params;
    const { clientId, address } = req.body;
    try {
        const clientAddress = await ClientAddress.findByPk(id);
        if (!clientAddress) {
            return res.status(404).json({ message: 'Dirección de cliente no encontrada' });
        }
        await clientAddress.update({ clientId, address });
        res.json({ message: 'Dirección de cliente actualizada', clientAddress });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una dirección de cliente
exports.deleteClientAddress = async (req, res) => {
    const { id } = req.params;
    try {
        const clientAddress = await ClientAddress.findByPk(id);
        if (!clientAddress) {
            return res.status(404).json({ message: 'Dirección de cliente no encontrada' });
        }
        await clientAddress.destroy();
        res.json({ message: 'Dirección de cliente eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
