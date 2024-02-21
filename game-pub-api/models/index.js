const Game = require('./game');
const User = require('./user');
const Approval = require('./approval');
const Score = require('./score');

// Associations
Game.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Game, { foreignKey: 'userId' });

Approval.belongsTo(User, { foreignKey: 'approvedBy' });
User.hasMany(Approval, { foreignKey: 'approvedBy' });

Approval.belongsTo(Game, { foreignKey: 'gameId' });
Game.hasMany(Approval, { foreignKey: 'gameId' });

Score.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Score, { foreignKey: 'userId' });

Score.belongsTo(Game, { foreignKey: 'gameId' });
Game.hasMany(Score, { foreignKey: 'gameId' });

module.exports = { Game, User, Approval, Score };
