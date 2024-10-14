const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Check = sequelize.define('Check', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: { // Campo para identificar al usuario que realizó la compra
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Asegúrate de que coincida con el nombre de la tabla de usuarios
            key: 'id',
        },
    },
    totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    purchaseDetails: { // Campo para almacenar detalles de la compra en formato JSON
        type: DataTypes.JSON, // Almacenar los productos comprados como un objeto JSON
        allowNull: false,
    },
    purchaseDate: { // Fecha de la compra
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Asignar la fecha actual por defecto
    },
}, {
    timestamps: true,
    createdAt: 'createdDate',
    updatedAt: false,
});

module.exports = Check;
