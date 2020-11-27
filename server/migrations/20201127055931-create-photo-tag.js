'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Photo_tags');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Photo_tags');
  }
};