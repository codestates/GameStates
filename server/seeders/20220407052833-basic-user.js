'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('users', [{
      role: 0,
      email: 'example1@example.com',
      password: '',
      nickname: '잠만보',
      postCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 0,
      email: 'example2@example.com',
      password: '',
      nickname: '파이리',
      postCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 0,
      email: 'example3@example.com',
      password: '',
      nickname: '꼬북이',
      postCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      role: 0,
      email: 'example4@example.com',
      password: '',
      nickname: '피카츄',
      postCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
