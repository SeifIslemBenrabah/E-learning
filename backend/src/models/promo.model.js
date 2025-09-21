const {DataTypes,Model} = require('sequelize')
const sequelize = require('../config/db')
const Grade = require('./grade.model')

 class Promo extends Model {}

 Promo.init(
    {
        promoName: {
            type:DataTypes.STRING ,
            allowNull: false
        },
        gradeId: {
            type: DataTypes.INTEGER,
            references: {
              model: Grade,
              key: 'id'
            }, allowNull: false
        }
    },
    {
        sequelize,
        modelName: "Promo",
        tableName: "promos"
    }
 );

 Promo.belongsTo(Grade, { foreignKey: "gradeId" });
 Grade.hasOne(Promo, { foreignKey: "gradeId" });
 module.exports = Promo;