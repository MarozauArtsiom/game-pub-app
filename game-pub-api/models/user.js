const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: Sequelize.STRING,
    role: Sequelize.STRING
});

module.exports = User;
