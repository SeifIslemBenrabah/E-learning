const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

class Message extends Model {}
Message.init({
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  }
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages'
});

Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });

module.exports = Message;
