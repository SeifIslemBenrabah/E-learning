const {DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class Grade extends Model {}

Grade.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        specialty:{
            type: DataTypes.ENUM('ISI','SIW','IA')
        }
    },
    {
        sequelize,
        modelName: "Grade", 
        tableName: "grades"
      }
)
module.exports = Grade;