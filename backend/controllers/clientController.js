const Client = require('../models/Client');

// Obtener todos los clientes
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const client = await Client.create({ firstName, lastName });
        res.status(201).json({ message: 'Cliente creado', client });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un cliente
exports.updateClient = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        await client.update({ firstName, lastName });
        res.json({ message: 'Cliente actualizado', client });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        await client.destroy();
        res.json({ message: 'Cliente eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
