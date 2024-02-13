// models/refbrgy.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const RefBrgy = sequelize.define('refbrgies', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brgyCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brgyDesc: {
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
  citymunCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
    timestamps: false
});

module.exports = RefBrgy;
