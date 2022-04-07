'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('comments', [{
      description: 'comment-1',
      boardId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'comment-2',
      boardId: 2,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'comment-3',
      boardId: 1,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      description: 'comment-4',
      boardId: 1,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('comments', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
