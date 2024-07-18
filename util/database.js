const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'Kautilya@1', {
    host: 'localhost',
    dialect: 'mysql'

});

module.exports = sequelize;