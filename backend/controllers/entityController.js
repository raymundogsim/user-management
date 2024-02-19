
const { RefBusinessUnit, RefDivision, RefSection } = require('../models')


exports.getEntityData = async (req, res) => {
    try {
        const businessunits = await RefBusinessUnit.findAll();
        res.json(businessunits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getBusinessUnitData = async (req, res) => {
    try {
        const businessUnitss = await RefBusinessUnit.findAll();
        res.json(businessUnitss);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getDivisionData = async (req, res) => {
    try {
        const divisions = await RefDivision.findAll();
        res.json(divisions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}


exports.getSectionData = async (req, res) => {
    try {
        const sections = await RefSection.findAll();
        res.json(sections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}