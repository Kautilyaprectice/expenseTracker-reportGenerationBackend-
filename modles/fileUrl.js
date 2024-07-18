const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const FileUrl = sequelize.define('fileUrl', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fileUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    downloadDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

module.exports = FileUrl;