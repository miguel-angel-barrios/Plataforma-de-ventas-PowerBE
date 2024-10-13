const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClientEmail = sequelize.define('ClientEmail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdDate',
    updatedAt: false,
});

module.exports = ClientEmail;
