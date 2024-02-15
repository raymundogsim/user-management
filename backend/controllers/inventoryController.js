// controllers/InventoryInformationController.js

const Inventory = require('../models/Inventory');
const { Op } = require("sequelize");
const { validateInventoryData } = require('../utils/validators');
const { getAreaCodeDetails, getAreaName } = require('../utils/helpers');
const moment = require('moment/moment');




exports.createInventory = async (req, res) => {
  try {
    let { id } = req.user;

    const { errors, valid } = validateInventoryData(req.body);
    if (!valid) {
      return res.status(400).json({
        message: 'Invalid Data',
        errors
      })
    }
    // Extract fields from request body
    const { itemName, itemDesc, itemCategory, recSold, recPurchased, recTransferred, recToBranch, recLoss, recLossType, username, businessUnitName } = req.body;
 
    const newInventory = await Inventory.create({
      itemName,
      itemDesc,
      itemCategory,
      recSold,
      recPurchased,
      recTransferred,
      recToBranch,
      recLoss,
      recLossType,
      username,
      businessUnitName
    });
    res.status(201).json(newInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.updateInventory = async (req, res) => {
  let id = req.params.id;
  try {
    let userId = req.userId;
    const { errors, valid } = validateInventoryData(req.body);
    if (!valid) {
      return res.status(400).json({
        message: 'Invalid Data',
        errors
      })
    }
    // Extract fields from request body
    const { itemName, itemDesc, itemCategory, recSold, recPurchased, recTransferred, recToBranch, recLoss, recLossType, username, isDeleted, businessUnitName } = req.body;
    // Create Inventory information

    let regData = getAreaCodeDetails(regCode, 'areaCode')
    let provData = getAreaCodeDetails(provCode, 'areaCode')
    let cityMunData = getAreaCodeDetails(citymunCode, 'areaCode')
    let brgyData = getAreaCodeDetails(brgyCode, 'areaCode')

    let regDesc = regData ? regData.areaDescription : '';
    let provDesc = provData ? provData.areaDescription : '';
    let citymunDesc = cityMunData ? cityMunData.areaDescription : '';
    let brgyDesc = brgyData ? brgyData.areaDescription : '';

    const newInventory = await Inventory.update({
      itemName,
      itemDesc,
      itemCategory,
      recSold,
      recPurchased,
      recTransferred,
      recToBranch,
      recLoss,
      recLossType,
      username,
      businessUnitName
    }, { where: { id } });
    res.status(201).json(newInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getInventory = async (req, res) => {
  try {
    let { id } = req.user;
    let newInventory = [];

    const inventory = await Inventory.findAll();

    inventory.forEach(a => {
      let { id, itemName, itemDesc, itemCategory, recSold, recPurchased, recTransferred, recToBranch, recLoss, recLossType, username, businessUnitName } = a.dataValues;
      newInventory.push({ itemName, itemDesc, itemCategory, recSold, recPurchased, recTransferred, recToBranch, recLoss, recLossType, name: `${itemName}, ${itemDesc}, ${itemCategory}, ${recSold}, ${recPurchased}, ${recTransferred}, ${recToBranch}, ${recLoss}, ${recLossType}, ${username}, ${businessUnitName}`, id: id })
    })
    console.log(inventory, "sulod han inventory")

    res.status(200).json(newInventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
