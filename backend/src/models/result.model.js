const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./student.model")
const Quiz = require("./quiz.model");

class Result extends Model {}
Result.init(
  {
    score: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: "Result", tableName: "results" }
);

Student.hasMany(Result, { foreignKey: "studentId" });
Result.belongsTo(Student, { foreignKey: "studentId" });

Quiz.hasMany(Result, { foreignKey: "quizId" });
Result.belongsTo(Quiz, { foreignKey: "quizId" });

module.exports = Result;
