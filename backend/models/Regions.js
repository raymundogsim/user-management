// models/refregion.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const RefRegion = sequelize.define('refregions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  psgcCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  regDesc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  regCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    timestamps: false
});

module.exports = RefRegion;
