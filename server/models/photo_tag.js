'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo_tag extends Model {

    static associate(models) {
      Photo_tag.belongsTo(models.Photo, {
        foreignKey: 'PhotoId'
      });

      Photo_tag.belongsTo(models.Tag, {
        foreignKey: 'TagId'
      });
    }
  };
  Photo_tag.init({
  }, {
    sequelize,
    modelName: 'Photo_tag',
  });
  return Photo_tag;
};