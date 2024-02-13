// models/refcitymun.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const RefCitymun = sequelize.define('refcitymuns', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  psgcCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  citymunDesc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  regDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  provCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  citymunCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    timestamps: false
});

module.exports = RefCitymun;
