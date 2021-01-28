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
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Photo',
    timestamps: true,
    updatedAt: false
  });
  return Photo;
};