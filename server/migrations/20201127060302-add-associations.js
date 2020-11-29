'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Photos',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
      .then(() => {
        return Promise.all([
          queryInterface.addColumn(
            'Comments',
            'UserId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          ),
          queryInterface.addColumn(
            'Comments',
            'PhotoId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Photos',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          )
        ]);
      })

      .then(() => {
        return Promise.all([
          queryInterface.addColumn(
            'Likes',
            'UserId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          ),
          queryInterface.addColumn(
            'Likes',
            'PhotoId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Photos',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          )
        ]);
      })
      .then(() => {
        return queryInterface.addConstraint('Likes', { fields: ['UserId', 'PhotoId'], type: 'primary key', name: 'likes_pk' });
      })
      .then(() => {
        return Promise.all([
          queryInterface.addColumn(
            'Follows',
            'FollowerId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users',
                key: 'id'
              },
              onUpdate: "CASCADE",
              onDelete: 'SET NULL'
            }
          ),
          queryInterface.addColumn(
            'Follows',
            'FolloweeId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Users',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          )
        ]);
      })
      .then(() => {
        return queryInterface.addConstraint('Follows', { fields: ['FollowerId', 'FolloweeId'], type: 'primary key', name: 'followes_pk' });
      })
      .then(() => {
        return Promise.all([
          queryInterface.addColumn(
            'Photo_tags',
            'PhotoId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Photos',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          ),
          queryInterface.addColumn(
            'Photo_tags',
            'TagId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Tags',
                key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          )
        ]);
      })
      .then(() => {
        return queryInterface.addConstraint('Photo_tags', { fields: ['PhotoId', 'TagId'], type: 'primary key', name: 'photo_tags_pk' });
      })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Photos',
      'UserId'
    )
      .then(() => {
        return Promise.all([
          queryInterface.removeColumn('Comments', 'UserId'),
          queryInterface.removeColumn('Comments', 'PhotoId')
        ]);
      })
      .then(() => {
        return queryInterface.removeConstraint('Likes', 'likes_pk');
      })
      .then(() => {
        return queryInterface.removeConstraint('Follows', 'followes_pk');
      })
      .then(() => {
        return queryInterface.removeConstraint('Photo_tags', 'photo_tags_pk');
      });
  }
};
