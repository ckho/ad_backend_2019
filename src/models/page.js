'use strict';
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    name: DataTypes.STRING,
    displayName: DataTypes.STRING,
    order: DataTypes.INTEGER
  }, {});
  Page.associate = function(models) {
    // associations can be defined here
  };
  return Page;
};
