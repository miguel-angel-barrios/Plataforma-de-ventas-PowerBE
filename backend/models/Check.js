const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Check = sequelize.define('Check', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdDate',
    updatedAt: false,
});

module.exports = Check;
