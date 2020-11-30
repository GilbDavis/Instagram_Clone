'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      Tag.hasMany(models.Photo_tag, {
        foreignKey: 'TagId'
      });
    }
  };
  Tag.init({
    tagName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};