const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const RefBusinessUnit = sequelize.define('refbusinessunits', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entityCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    businessUnitCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    businessUnitDesc: {
        type: DataTypes.TEXT,
        allowNull: true
    }
},
{ timestamps: false }
)

module.exports = RefBusinessUnit;