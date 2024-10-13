const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Storage = sequelize.define('Storage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    timestamps: true,
    createdAt: 'createdDate',
    updatedAt: false,
});

module.exports = Storage;
