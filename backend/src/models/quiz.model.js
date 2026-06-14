// models/quiz.model.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Cour = require('./cour.model');

class Quiz extends Model {}
Quiz.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courId: {
      type: DataTypes.INTEGER,
      references: {
        model: "cours",
        key: 'id'
      },
      allowNull: true
    }
  },
  { sequelize, modelName: "Quiz", tableName: "quizzes" }
);

Cour.hasMany(Quiz, { foreignKey: "courId" });
Quiz.belongsTo(Cour, { foreignKey: "courId" });

module.exports = Quiz;
