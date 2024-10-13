const Payment = require('../models/Payment');

// Obtener todos los pagos
exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo pago
exports.createPayment = async (req, res) => {
    const { method, amount } = req.body;
    try {
        const payment = await Payment.create({ method, amount });
        res.status(201).json({ message: 'Pago creado', payment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un pago
exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { method, amount } = req.body;
    try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        await payment.update({ method, amount });
        res.json({ message: 'Pago actualizado', payment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un pago
exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }
        await payment.destroy();
        res.json({ message: 'Pago eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
