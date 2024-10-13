const ProductDetail = require('../models/ProductDetail');

// Obtener todos los detalles de productos
exports.getProductDetails = async (req, res) => {
    try {
        const productDetails = await ProductDetail.findAll();
        res.json(productDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo detalle de producto
exports.createProductDetail = async (req, res) => {
    const { productId, color, size, brand, weight } = req.body;
    try {
        const productDetail = await ProductDetail.create({ productId, color, size, brand, weight });
        res.status(201).json({ message: 'Detalle de producto creado', productDetail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un detalle de producto
exports.updateProductDetail = async (req, res) => {
    const { id } = req.params;
    const { productId, color, size, brand, weight } = req.body;
    try {
        const productDetail = await ProductDetail.findByPk(id);
        if (!productDetail) {
            return res.status(404).json({ message: 'Detalle de producto no encontrado' });
        }
        await productDetail.update({ productId, color, size, brand, weight });
        res.json({ message: 'Detalle de producto actualizado', productDetail });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un detalle de producto
exports.deleteProductDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const productDetail = await ProductDetail.findByPk(id);
        if (!productDetail) {
            return res.status(404).json({ message: 'Detalle de producto no encontrado' });
        }
        await productDetail.destroy();
        res.json({ message: 'Detalle de producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
