const {DataTypes,Model} = require('sequelize')
const sequelize = require('../config/db')
const Module = require('./module.model')

class Cour extends Model {}
Cour.init(
    {
    Name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    Description:{
        type: DataTypes.STRING
    },
    moduleId:{
        type: DataTypes.INTEGER,
        references:{
            model:"modules",
            key:'id'
        },allowNull:false
    }
    },{
        sequelize,
        modelName:"Cour",
        tableName:"cours"
    }
);
Cour.belongsTo(Module,{foreignKey:"moduleId"})
Module.hasMany(Cour,{foreignKey:"moduleId"})
module.exports =Cour