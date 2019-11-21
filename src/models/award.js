'use strict';
module.exports = (sequelize, DataTypes) => {
  const Award = sequelize.define('Award', {
    name: DataTypes.STRING
  }, {});
  Award.associate = function(models) {
    // associations can be defined here
  };
  return Award;
};