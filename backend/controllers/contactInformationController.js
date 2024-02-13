// controllers/contactInformationController.js

const ContactInformation = require('../models/ContactInformation');
const { Op } = require("sequelize");
const { validateContactData } = require('../utils/validators');
const { getAreaCodeDetails, getAreaName } = require('../utils/helpers');
const moment = require('moment/moment');

exports.createContactInformation = async (req, res) => {

  try {
    let userId = req.userId;

    const { errors, valid } = validateContactData(req.body);
    if (!valid) {
      return res.status(400).json({
        message: 'Invalid Data',
        errors
      })
    }



    // Extract fields from request body
    const { firstName, lastName, gender, birthDate, address, mobile, brgyCode, citymunCode, provCode, regCode, suffix, civilStatus, emergencyMobile } = req.body;
    // Create contact information





    let regData = getAreaCodeDetails(regCode, 'areaCode')
    let provData = getAreaCodeDetails(provCode, 'areaCode')
    let cityMunData = getAreaCodeDetails(citymunCode, 'areaCode')
    let brgyData = getAreaCodeDetails(brgyCode, 'areaCode')

    let regDesc = regData ? regData.areaDescription : '';
    let provDesc = provData ? provData.areaDescription : '';
    let citymunDesc = cityMunData ? cityMunData.areaDescription : '';
    let brgyDesc = brgyData ? brgyData.areaDescription : '';




    const newContactInformation = await ContactInformation.create({
      firstName,
      lastName,
      gender,
      birthDate,
      address,
      mobile,
      createdBy: userId,
      brgyCode,
      citymunCode,
      provCode,
      regCode,
      createdBy: userId,
      regDesc,
      provDesc,
      citymunDesc,
      brgyDesc,
      suffix, civilStatus, emergencyMobile
    });
    res.status(201).json(newContactInformation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.updateContactInformation = async (req, res) => {
  let id = req.params.id;
  try {
    let userId = req.userId;

    const { errors, valid } = validateContactData(req.body);
    if (!valid) {
      return res.status(400).json({
        message: 'Invalid Data',
        errors
      })
    }



    // Extract fields from request body
    const { firstName, lastName, gender, birthDate, address, mobile, brgyCode, citymunCode, provCode, regCode, suffix, civilStatus, emergencyMobile } = req.body;
    // Create contact information





    let regData = getAreaCodeDetails(regCode, 'areaCode')
    let provData = getAreaCodeDetails(provCode, 'areaCode')
    let cityMunData = getAreaCodeDetails(citymunCode, 'areaCode')
    let brgyData = getAreaCodeDetails(brgyCode, 'areaCode')

    let regDesc = regData ? regData.areaDescription : '';
    let provDesc = provData ? provData.areaDescription : '';
    let citymunDesc = cityMunData ? cityMunData.areaDescription : '';
    let brgyDesc = brgyData ? brgyData.areaDescription : '';




    const newContactInformation = await ContactInformation.update({
      firstName,
      lastName,
      gender,
      birthDate,
      address,
      mobile,
      brgyCode,
      citymunCode,
      provCode,
      regCode,
      regDesc,
      provDesc,
      citymunDesc,
      brgyDesc,
      suffix, civilStatus, emergencyMobile
    }, { where: { id } });
    res.status(201).json(newContactInformation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getContactInformations = async (req, res) => {
  try {
    let { userLevel, areaCode } = req.user;
    let newContacts = [];

    console.log(userLevel, areaCode)
    const contactInformations = await ContactInformation.findAll({ where: { [Op.and]: [{ [userLevel]: areaCode }, { isDeleted: false }] } });


    contactInformations.forEach(a => {
      let { id, firstName, lastName, middleName, mobile, regCode, regDesc, provCode, provDesc, citymunCode, citymunDesc, brgyCode, brgyDesc, gender, civilStatus, birthDate, suffix, address } = a.dataValues;
      newContacts.push({ firstName, lastName, middleName, mobile, regCode, regDesc, provCode, provDesc, citymunCode, citymunDesc, brgyCode, brgyDesc, gender, civilStatus, birthDate, suffix, address, phone: mobile, name: `${lastName}, ${firstName} ${middleName}`, age: moment().diff(moment(birthDate), 'years'), id: id })


    })



    res.status(200).json(newContacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
