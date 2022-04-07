'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('boards', [{
      title: 'test-title-1',
      description: 'test-description-1',
      viewCount: 23,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'test-title-2',
      description: 'test-description-2',
      viewCount: 12,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'test-title-3',
      description: 'test-description-3',
      viewCount: 12,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      title: 'test-title-4',
      description: 'test-description-4',
      viewCount: 12,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('boards', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
