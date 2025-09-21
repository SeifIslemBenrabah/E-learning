const sequelize = require("../config/db");
const {DataTypes,Model} = require('sequelize')
const Cour = require('./cour.model')

class File extends Model {}
File.init(
    {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        link:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        courId:{
            type:DataTypes.INTEGER,
            references:{
                model:Cour,
                key:'id'
            },
            allowNull:false
        }
    },
    {
        sequelize,
        modelName:'File',
        tableName:"files"
    }
)

Cour.hasMany(File,{foreignKey:'courId'})
File.belongsTo(Cour,{foreignKey:'courId'})
module.exports = File