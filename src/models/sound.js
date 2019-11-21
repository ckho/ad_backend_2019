'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sound = sequelize.define('Sound', {
    name: DataTypes.STRING
  }, {});
  Sound.associate = function(models) {
    // associations can be defined here
  };
  return Sound;
};