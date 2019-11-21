const path = require('path');

module.exports = {
  development: {
    storage: path.join(__dirname, '..', '..', 'data', 'dev-db.sqlite3'),
    dialect: 'sqlite',
    operatorsAliases: false,
    seederStorage: 'sequelize'
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: process.env.CI_DB_HOSTNAME,
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql',
    // dialectOptions: {
    //     ssl:'Amazon RDS'
    // },
    operatorsAliases: false,
    seederStorage: 'sequelize'
  }
};
