'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Options', [{
      key: 'currentPage',
      value: 'main', createdAt: new Date(), updatedAt: new Date()
    },
    {
      key: 'currentGameQuestionId',
      value: '0', createdAt: new Date(), updatedAt: new Date()
    }], {
      timeStamps: true
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
