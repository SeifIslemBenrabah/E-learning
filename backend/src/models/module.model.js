const {DataTypes,Model} = require('sequelize')
const sequelize = require('../config/db')
const Grade = require('./grade.model');
const Teacher = require('./teacher.model');

class Module extends Model {}
Module.init(
    {
        Name:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        Description:{
            type: DataTypes.STRING
        },
        gradeId: {
            type: DataTypes.INTEGER,
            references: {
              model: Grade,
              key: 'id'
            }, allowNull: false
         },
        teacherId:{
            type: DataTypes.INTEGER,
            references: {
               model: "teachers",
              key: 'id'
            }, allowNull: false
        }
    },
    {
      sequelize,
      modelName: "Module",
      tableName: "modules"
    }
);
Module.belongsTo(Grade, { foreignKey: "gradeId" });
Grade.hasMany(Module, { foreignKey: "gradeId" });

module.exports = Module;