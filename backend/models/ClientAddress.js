const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientAddress = sequelize.define('ClientAddress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdDate',
    updatedAt: false,
});

module.exports = ClientAddress;
