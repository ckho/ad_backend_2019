'use strict';
module.exports = (sequelize, DataTypes) => {
  const LuckyDrawGift = sequelize.define('LuckyDrawGift', {
    name: DataTypes.STRING,
    displayName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.STRING,
    drawed: DataTypes.BOOLEAN,
    winnerLen: DataTypes.INTEGER
  }, {});
  LuckyDrawGift.associate = function(models) {
    // associations can be defined here
  };
  return LuckyDrawGift;
};
