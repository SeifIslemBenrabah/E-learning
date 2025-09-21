const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

class Admin extends Model {}

Admin.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      },
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins"
  }
);

User.hasOne(Admin, { foreignKey: 'userId' });
Admin.belongsTo(User, { foreignKey: 'userId' });

module.exports = Admin;
