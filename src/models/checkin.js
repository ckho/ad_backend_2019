'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    eventId: DataTypes.INTEGER
  }, {});
  Checkin.associate = function(models) {
    Checkin.belongsTo(models.User);
  };
  return Checkin;
};
