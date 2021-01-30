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
    FollowerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true,
      autoIncrement: false
    },
    FolloweeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    }
  }, {
    sequelize,
    modelName: 'Follow',
    timestamps: true,
    updatedAt: false
  });
  return Follow;
};