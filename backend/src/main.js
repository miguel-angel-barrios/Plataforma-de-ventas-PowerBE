const express = require('express');
const cors = require('cors');
const sequelize = require('../config/database'); // Importa la configuración de la base de datos
const dotenv = require('dotenv');
const apiRoutes = require('../routes/apiRoutes'); // Importa las rutas de la API

// Configuración de dotenv
dotenv.config();

// Crea la aplicación Express
const app = express();

// Configura middleware
app.use(cors());
app.use(express.json()); // Para poder manejar JSON en las solicitudes

// Usa las rutas
app.use('/api', apiRoutes); // Prefijo para las rutas de la API

// Prueba la conexión a la base de datos
sequelize.authenticate()
    .then(async () => {
        console.log('Conexión a la base de datos establecida con éxito.');

        // Sincroniza los modelos de Sequelize
        try {
            await sequelize.sync(); // Usar force: true solo en desarrollo
            console.log('Modelos sincronizados.');
        } catch (error) {
            console.error('Error al sincronizar los modelos:', error);
        }

        // Configura el puerto y arranca el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

