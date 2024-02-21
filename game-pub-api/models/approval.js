const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Approval = sequelize.define('approval', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    status: Sequelize.ENUM('idle', 'yes', 'no'),
    timestamp: Sequelize.DATE,
    approvedBy: {
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

module.exports = Approval;
