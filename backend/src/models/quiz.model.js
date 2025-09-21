// models/quiz.model.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Module = require('./module.model')

class Quiz extends Model {}
Quiz.init(
  {
    title: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    moduleId:{
        type: DataTypes.INTEGER,
        references:{
            model:"modules",
            key:'id'
        },allowNull:false
    }
  },
  { sequelize, modelName: "Quiz", tableName: "quizzes" }
);

Module.hasMany(Quiz, { foreignKey: "moduleId" });
Quiz.belongsTo(Module, { foreignKey: "moduleId" });

module.exports = Quiz;
