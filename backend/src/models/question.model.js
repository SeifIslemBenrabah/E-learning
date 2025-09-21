// models/question.model.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Quiz = require("./quiz.model");

class Question extends Model {}
Question.init(
  {
    text: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  },
  { sequelize, modelName: "Question", tableName: "questions" }
);

Quiz.hasMany(Question, { foreignKey: "quizId" });
Question.belongsTo(Quiz, { foreignKey: "quizId" });

module.exports = Question;
