'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameResponse = sequelize.define('GameResponse', {
    imageUrl: DataTypes.STRING,
    groupName: DataTypes.STRING,
    message: DataTypes.STRING,
    uploadTime: DataTypes.STRING
  }, {});
  GameResponse.associate = function(models) {
    GameResponse.belongsTo(models.GameQuestion);
  };
  return GameResponse;
};
