const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  contactId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isSuper: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userLevel: {
    type: DataTypes.ENUM('brgyCode', 'citymunCode', 'provCode', 'regCode'),
    allowNull: false,
  },
  areaCode: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Define associations after both models have been defined


module.exports = User;