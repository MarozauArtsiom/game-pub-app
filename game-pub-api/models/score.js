const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Score = sequelize.define('score', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    score: Sequelize.INTEGER,
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'user', // 'user' refers to table name
            key: 'id', // 'id' refers to column name in user table
        }
    },
    gameId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'game', // 'game' refers to table name
            key: 'id', // 'id' refers to column name in game table
        }
    }
});

module.exports = Score;
