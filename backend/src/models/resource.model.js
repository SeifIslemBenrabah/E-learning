const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");
const Module = require("./module.model");

class Resource extends Model {}

Resource.init(
  {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false, 
    },
    Link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Type: {
      type: DataTypes.ENUM("Website", "Playlist", "Book", "Youtube"),
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Module,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Resource",
    tableName: "resources",
  }
);

Resource.belongsTo(Module, { foreignKey: "moduleId" });
Module.hasMany(Resource, { foreignKey: "moduleId" });

module.exports = Resource;
