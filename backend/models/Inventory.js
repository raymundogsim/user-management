const { DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../utils/database');


const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  itemDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  itemCategory: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recSold: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recPurchased: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recTransferred: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recToBranch: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recLoss: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  recLossType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  BusinessUnitName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Inventory;
