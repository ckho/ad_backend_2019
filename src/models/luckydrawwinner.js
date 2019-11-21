'use strict';
module.exports = (sequelize, DataTypes) => {
  const LuckyDrawWinner = sequelize.define('LuckyDrawWinner', {
    removed: DataTypes.BOOLEAN
  }, {});
  LuckyDrawWinner.associate = function(models) {
    LuckyDrawWinner.belongsTo(models.User);
    LuckyDrawWinner.belongsTo(models.LuckyDrawGift);
  };
  return LuckyDrawWinner;
};
