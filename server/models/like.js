'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: 'UserId'
      });

      Like.belongsTo(models.Photo, {
        foreignKey: 'PhotoId'
      });
    }
  };
  Like.init({
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: false
    },
    PhotoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    }
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: true,
    updatedAt: false
  });
  return Like;
};