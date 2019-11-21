'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.addColumn(
        'GameQuestions',
        'displayQuestion',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'GameQuestions',
        'played',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      ),
    ];
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [
      queryInterface.removeColumn(
        'GameQuestions',
        'displayQuestion'
      ),
      queryInterface.removeColumn(
        'GameQuestions',
        'drawed'
      )
    ];
  }
};
