'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Photo_tag.init({
    id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo_tag',
  });
  return Photo_tag;
};