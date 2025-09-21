const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Module = require('./module.model');

class Teacher extends Model {}

Teacher.init(
  {
    type: {
      type: DataTypes.ENUM('Td/Tp', 'Cour'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
       defaultValue: 'Active'
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
    modelName: "Teacher",
    tableName: "teachers"
  }
);

User.hasOne(Teacher, { foreignKey: 'userId' });
Teacher.belongsTo(User, { foreignKey: 'userId' });
// Main teacher relation
Teacher.hasMany(Module, { foreignKey: "teacherId" });
Module.belongsTo(Teacher, { as: "mainTeacher", foreignKey: "teacherId" });

// Co-teachers relation (many-to-many)
Teacher.belongsToMany(Module, { through: "Module_CoTeachers" });
Module.belongsToMany(Teacher, { through: "Module_CoTeachers" });


module.exports = Teacher;
