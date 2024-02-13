// models/refprovince.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const RefProvince = sequelize.define('refprovinces', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  psgcCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  provDesc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  regCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  provCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    timestamps: false
});

module.exports = RefProvince;
