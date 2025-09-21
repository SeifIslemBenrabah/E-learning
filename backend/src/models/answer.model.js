// models/answer.model.js
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Question = require("./question.model");

class Answer extends Model {}
Answer.init(
  {
    text: { type: DataTypes.STRING, allowNull: false },
    isCorrect: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: "Answer", tableName: "answers" }
);

Question.hasMany(Answer, { foreignKey: "questionId" });
Answer.belongsTo(Question, { foreignKey: "questionId" });

module.exports = Answer;
