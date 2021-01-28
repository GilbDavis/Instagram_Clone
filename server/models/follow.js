'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {

    static associate(models) {
      Follow.belongsTo(models.User, {
        foreignKey: 'FollowerId'
      });

      Follow.belongsTo(models.User, {
        foreignKey: 'FolloweeId'
      });
    }
  };
  Follow.init({
  }, {
    sequelize,
    modelName: 'Follow',
    timestamps: true,
    updatedAt: false
  });
  return Follow;
};