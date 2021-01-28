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
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: true,
    updatedAt: false
  });
  return Like;
};