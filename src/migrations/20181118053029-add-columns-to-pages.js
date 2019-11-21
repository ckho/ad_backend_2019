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
        'Pages',
        'displayName',
        {
          type: Sequelize.STRING,
          defaultValue: false
        }
      ),
      queryInterface.addColumn(
        'Pages',
        'order',
        {
          type: Sequelize.INTEGER,
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
        'Pages',
        'displayName'
      ),
      queryInterface.removeColumn(
        'Pages',
        'order'
      )
    ];
  }
};
