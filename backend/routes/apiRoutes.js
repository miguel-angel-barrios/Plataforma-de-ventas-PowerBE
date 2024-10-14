const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/auth');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const clientController = require('../controllers/clientController');
const checkController = require('../controllers/checkController'); // Controlador para las boletas
const salesmanController = require('../controllers/salesmanController');
const lineController = require('../controllers/lineController');
const userLogController = require('../controllers/userLogController');
const clientEmailController = require('../controllers/clientEmailController');
const clientAddressController = require('../controllers/clientAddressController');
const storageController = require('../controllers/storageController');
const paymentController = require('../controllers/paymentController');
const sucursalController = require('../controllers/sucursalController');
const productDetailController = require('../controllers/productDetailController');

// Rutas para autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rutas para productos
router.get('/products', authenticateJWT, productController.getProducts);
router.post('/products', authenticateJWT, productController.createProduct);
router.put('/products/:id', authenticateJWT, productController.updateProduct);
router.delete('/products/:id', authenticateJWT, productController.deleteProduct);

// Rutas para detalles de productos
router.get('/productdetails', authenticateJWT, productDetailController.getProductDetails);
router.post('/productdetails', authenticateJWT, productDetailController.createProductDetail);
router.put('/productdetails/:id', authenticateJWT, productDetailController.updateProductDetail);
router.delete('/productdetails/:id', authenticateJWT, productDetailController.deleteProductDetail);

// Rutas para clientes
router.get('/clients', authenticateJWT, clientController.getClients);
router.post('/clients', authenticateJWT, clientController.createClient);
router.put('/clients/:id', authenticateJWT, clientController.updateClient);
router.delete('/clients/:id', authenticateJWT, clientController.deleteClient);

// Rutas para cheques (boletas)
router.get('/checks', authenticateJWT, checkController.getAllChecks); // Obtener todas las boletas
router.post('/checks', authenticateJWT, checkController.createCheck); // Crear una nueva boleta
router.put('/checks/:id', authenticateJWT, checkController.updateCheck); // Actualizar una boleta
router.delete('/checks/:id', authenticateJWT, checkController.deleteCheck); // Eliminar una boleta

// Rutas para vendedores
router.get('/salesmen', authenticateJWT, salesmanController.getSalesmen);
router.post('/salesmen', authenticateJWT, salesmanController.createSalesman);
router.put('/salesmen/:id', authenticateJWT, salesmanController.updateSalesman);
router.delete('/salesmen/:id', authenticateJWT, salesmanController.deleteSalesman);

// Rutas para líneas
router.get('/lines', authenticateJWT, lineController.getLines);
router.post('/lines', authenticateJWT, lineController.createLine);
router.put('/lines/:id', authenticateJWT, lineController.updateLine);
router.delete('/lines/:id', authenticateJWT, lineController.deleteLine);

// Rutas para registros de usuario
router.get('/userlogs', authenticateJWT, userLogController.getUserLogs);
router.post('/userlogs', authenticateJWT, userLogController.createUserLog);
router.put('/userlogs/:id', authenticateJWT, userLogController.updateUserLog);
router.delete('/userlogs/:id', authenticateJWT, userLogController.deleteUserLog);

// Rutas para emails de clientes
router.get('/clientemails', authenticateJWT, clientEmailController.getClientEmails);
router.post('/clientemails', authenticateJWT, clientEmailController.createClientEmail);
router.put('/clientemails/:id', authenticateJWT, clientEmailController.updateClientEmail);
router.delete('/clientemails/:id', authenticateJWT, clientEmailController.deleteClientEmail);

// Rutas para direcciones de clientes
router.get('/clientaddresses', authenticateJWT, clientAddressController.getClientAddresses);
router.post('/clientaddresses', authenticateJWT, clientAddressController.createClientAddress);
router.put('/clientaddresses/:id', authenticateJWT, clientAddressController.updateClientAddress);
router.delete('/clientaddresses/:id', authenticateJWT, clientAddressController.deleteClientAddress);

// Rutas para almacenamiento
router.get('/storages', authenticateJWT, storageController.getStorages);
router.post('/storages', authenticateJWT, storageController.createStorage);
router.put('/storages/:id', authenticateJWT, storageController.updateStorage);
router.delete('/storages/:id', authenticateJWT, storageController.deleteStorage);

// Rutas para pagos
router.get('/payments', authenticateJWT, paymentController.getPayments);
router.post('/payments', authenticateJWT, paymentController.createPayment);
router.put('/payments/:id', authenticateJWT, paymentController.updatePayment);
router.delete('/payments/:id', authenticateJWT, paymentController.deletePayment);

// Rutas para sucursales
router.get('/sucursales', authenticateJWT, sucursalController.getSucursales);
router.post('/sucursales', authenticateJWT, sucursalController.createSucursal);
router.put('/sucursales/:id', authenticateJWT, sucursalController.updateSucursal);
router.delete('/sucursales/:id', authenticateJWT, sucursalController.deleteSucursal);

module.exports = router;
