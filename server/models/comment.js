'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'UserId'
      });

      Comment.belongsTo(models.Photo, {
        foreignKey: 'PhotoId'
      });
    }
  };
  Comment.init({
    comment_text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};