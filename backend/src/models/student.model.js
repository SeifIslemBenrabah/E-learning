const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Promo = require('./promo.model');

class Student extends Model {}

Student.init(
  {
    studentId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    promoId: {
      type: DataTypes.INTEGER,
      references: {
        model: Promo,
        key: 'id'
      },
      allowNull: false
    },
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
    modelName: "Student",
    tableName: "students"
  }
);

Student.belongsTo(Promo, { foreignKey: "promoId" });
Promo.hasMany(Student, { foreignKey: "promoId" });

Student.belongsTo(User, { foreignKey: "userId" });
User.hasOne(Student, { foreignKey: "userId" });

module.exports = Student;
