'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameQuestion = sequelize.define('GameQuestion', {
    question: DataTypes.STRING,
    displayQuestion: DataTypes.STRING,
    played: DataTypes.BOOLEAN
  }, {});
  GameQuestion.associate = function(models) {
    // associations can be defined here
  };
  return GameQuestion;
};
