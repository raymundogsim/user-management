const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../utils/database');

const RefDivision = sequelize.define('refdivisions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entityCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    divisionCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    divisionDesc: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    businessUnitCode: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{ timestamps: false }
)

module.exports = RefDivision;