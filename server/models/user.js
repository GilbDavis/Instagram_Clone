'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Photo, {
        foreignKey: 'UserId'
      });

      User.hasMany(models.Follow, {
        foreignKey: 'FollowerId'
      });

      User.hasMany(models.Follow, {
        foreignKey: 'FolloweeId'
      });

      User.hasMany(models.Comment, {
        foreignKey: 'UserId'
      });

      User.hasMany(models.Like, {
        foreignKey: 'UserId'
      });
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};