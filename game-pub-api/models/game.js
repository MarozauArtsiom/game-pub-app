const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Game = sequelize.define('game', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    imageUrl: Sequelize.STRING,
    url: Sequelize.STRING,
    description: Sequelize.STRING,
    name: Sequelize.STRING,
    author: Sequelize.STRING,
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user', // 'user' refers to table name
            key: 'id', // 'id' refers to column name in user table
        }
    }
});

module.exports = Game;
