// models/ContactInformation.js

const { DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('../utils/database');

const ContactInformation = sequelize.define('ContactInformation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  suffix: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  civilStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emergencyMobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  brgyDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  brgyCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  citymunDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  citymunCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  provDesc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  provCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  regDesc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regCode: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = ContactInformation;
