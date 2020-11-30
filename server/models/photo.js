'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {

    static associate(models) {
      Photo.belongsTo(models.User, {
        foreignKey: 'UserId'
      });

      Photo.hasMany(models.Photo_tag, {
        foreignKey: 'PhotoId'
      });

      Photo.hasMany(models.Like, {
        foreignKey: 'PhotoId'
      });

      Photo.hasMany(models.Comment, {
        foreignKey: 'PhotoId'
      });
    }
  };
  Photo.init({
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};