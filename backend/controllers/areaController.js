// areaController.js

const { RefRegion, RefProvince, RefCitymun, RefBrgy } = require('../models');

exports.getAreaData = async (req, res) => {
  try {
    const regions = await RefRegion.findAll();
    res.json(regions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getRegions = async (req, res) => {
  try {
    const regions = await RefRegion.findAll();
    res.json(regions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getProvincesByRegion = async (req, res) => {
  const { regCode } = req.params;
  try {
    const provinces = await RefProvince.findAll({ where: { regCode } });
    res.json(provinces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getCityMunsByProvince = async (req, res) => {
  const { provCode } = req.params;
  try {
    const cityMuns = await RefCitymun.findAll({ where: { provCode } });
    res.json(cityMuns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getBrgiesByCitymun = async (req, res) => {
  const { citymunCode } = req.params;
  try {
    const brgies = await RefBrgy.findAll({ where: { citymunCode } });
    res.json(brgies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
