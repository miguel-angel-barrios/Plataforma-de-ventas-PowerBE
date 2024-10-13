const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserLog = sequelize.define('UserLog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdDate',
    updatedAt: false,
});

module.exports = UserLog;
