'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isWinner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isRegistered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isCheckedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isAwardee: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    upgrade: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    endpointArn: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
