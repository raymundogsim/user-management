const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../utils/database');

const RefSection = sequelize.define('refsections', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entityCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sectionCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sectionDesc: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    DivisionCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    businessUnitCode: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
{ timestamps: false }
)

module.exports = RefSection;