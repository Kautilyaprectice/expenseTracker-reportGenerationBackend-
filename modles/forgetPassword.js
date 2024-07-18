const { DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const ForgetPassword = sequelize.define('ForgetPassword', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = ForgetPassword;