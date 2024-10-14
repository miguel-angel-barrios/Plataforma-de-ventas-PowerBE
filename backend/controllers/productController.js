const Product = require('../models/Product');

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    const { name, description, category, subCategory, price } = req.body; // Incluimos 'description'
    try {
        const product = await Product.create({ name, description, category, subCategory, price }); // Guardamos 'description' en la base de datos
        res.status(201).json({ message: 'Producto creado', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, category, subCategory, price } = req.body; // Incluimos 'description'
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await product.update({ name, description, category, subCategory, price }); // Actualizamos 'description'
        res.json({ message: 'Producto actualizado', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await product.destroy();
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
