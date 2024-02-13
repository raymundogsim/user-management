// controllers/userController.js
require('dotenv').config()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../config');
const { User } = require('../models');
const { ContactInformation } = require('../models');
const { getAreaCodeDetails, getAreaName } = require('../utils/helpers');
const { validateLoginData, validateSignupData } = require('../utils/validators');
const { Op } = require('sequelize');
const moment = require('moment/moment');

const JWT_SECRET = process.env.JWT_SECRET;
exports.registerUser = async (req, res) => {
  try {
    const { errors, valid } = validateSignupData(req.body);
    if (!valid) {
      return res.status(400).json({
        message: 'Invalid Data',
        errors
      })
    }


    const { username, password, createdBy, userLevel, areaCode, isSuper, contact_information } = req.body;


    let oldUser = await User.findOne({ where: { username: username } });
    console.log(oldUser, username, 'OLD USER')
    if (oldUser) {
      return res.status(400).json({
        message: 'Username already taken!',
        errors: { username: 'Username already taken!' }
      })

    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      createdBy,
      isSuper,
      userLevel,
      areaCode,
    });

    if (contact_information) {

      const {
        firstName = null,
        lastName = null,
        middleName = null,
        gender = null,
        regCode = null,
        provCode = null,
        citymunCode = null,
        brgyCode = null
      } = contact_information;



      let regData = getAreaCodeDetails(regCode, 'areaCode')
      let provData = getAreaCodeDetails(provCode, 'areaCode')
      let cityMunData = getAreaCodeDetails(citymunCode, 'areaCode')
      let brgyData = getAreaCodeDetails(brgyCode, 'areaCode')

      let regDesc = regData ? regData.areaDescription : '';
      let provDesc = provData ? provData.areaDescription : '';
      let citymunDesc = cityMunData ? cityMunData.areaDescription : '';
      let brgyDesc = brgyData ? brgyData.areaDescription : '';






      let contactInfo = await ContactInformation.findOne({
        where: {
          firstName,
          lastName,
          middleName,
          gender,
          [userLevel]: areaCode
        }
      });

      if (contactInfo) {
        contactInfo = { ...contactInfo, ...contact_information, createdBy: newUser.id, regDesc, provDesc, citymunDesc, brgyDesc };
      } else {
        contactInfo = await ContactInformation.create({
          ...contact_information, createdBy: newUser.id, regDesc, provDesc, citymunDesc, brgyDesc
        });

      }

      newUser.contactId = contactInfo.id;

      newUser.save()
      contactInfo.save()
    }


    delete newUser.password;
    res.status(201).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', errors: {} });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { errors, valid } = validateLoginData(req.body);
    if (!valid) {
      return res.status(400).json({
        message: 'Invalid Data',
        errors
      })
    }

    let user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password', errors: {} });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password', errors: {} });
    }

    delete user.password
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);


    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', errors: {} });
  }
};

exports.updateUser = async (req, res) => {
  let id = req.params.id;
  try {

    const { contactId } = req.body;











    await User.update({
      contactId
    }, { where: { id } });


    res.status(201).json({ message: 'Updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getAuthenticatedUserDetails = async (req, res) => {
  try {
    // Fetch user details using req.user, which is set by the authentication middleware
    const userDetails = await User.findByPk(req.userId, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['username', 'userLevel', 'areaCode', 'createdBy']
      }, {
        model: ContactInformation,
        as: 'details'
      }],
      attributes: ['id', 'username', 'userLevel', 'areaCode', 'createdBy', 'contactId']
    });

    let areaCodeData = getAreaCodeDetails(userDetails.areaCode, 'areaCode');


    let regCode = areaCodeData.psgcCode.substr(0, 2);
    let provCode = areaCodeData.psgcCode.substr(0, 4);
    let citymunCode = areaCodeData.psgcCode.substr(0, 6);
    let brgyCode = areaCodeData.psgcCode.substr(0, 9)


    let areaData = {};
    areaData = { ...areaCodeData }
    let regData = getAreaCodeDetails(regCode, 'areaCode')
    let provData = getAreaCodeDetails(provCode, 'areaCode')
    let cityMunData = getAreaCodeDetails(citymunCode, 'areaCode')
    let brgyData = getAreaCodeDetails(brgyCode, 'areaCode')

    areaData.regDesc = regData ? regData.areaDescription : '';
    areaData.regCode = regData ? regData.areaCode : '';
    areaData.provDesc = provData ? provData.areaDescription : '';
    areaData.provCode = provData ? provData.areaCode : '';
    areaData.citymunDesc = cityMunData ? cityMunData.areaDescription : '';
    areaData.citymunCode = cityMunData ? cityMunData.areaCode : '';
    areaData.brgyDesc = brgyData ? brgyData.areaDescription : '';
    areaData.brgyCode = brgyData ? brgyData.areaCode : '';

    let { id, username, areaCode, userLevel, isSuper, details, contactId, createdBy } = userDetails.dataValues;





    res.json({ user: { id, username, areaCode, userLevel, isSuper, contactId, createdBy }, contactId, createdBy, profile: details, area: areaData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.verifyLicense = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) return res.status(400).json({ message: 'License Code is required!' })
    let areaCodeData = getAreaCodeDetails(code);

    if (!areaCodeData) {
      return res.status(400).json({ message: 'License Code not found!' })
    };





    let regCode = code.substr(0, 2);
    let provCode = code.substr(0, 4);
    let citymunCode = code.substr(0, 6);
    let brgyCode = code.substr(0, 9)




    console.log(regCode, provCode, citymunCode, brgyCode)
    console.log(areaCodeData)
    const user = await User.findOne({ where: { isSuper: true, areaCode: areaCodeData.areaCode } });
    if (user) {
      return res.status(401).json({ message: 'Code Already Taken!' });
    }

    let areaData = {};
    areaData = { ...areaCodeData }
    let regData = getAreaCodeDetails(regCode, 'areaCode')
    let provData = getAreaCodeDetails(provCode, 'areaCode')
    let cityMunData = getAreaCodeDetails(citymunCode, 'areaCode')
    let brgyData = getAreaCodeDetails(brgyCode, 'areaCode')

    areaData.regDesc = regData ? regData.areaDescription : '';
    areaData.provDesc = provData ? provData.areaDescription : '';
    areaData.citymunDesc = cityMunData ? cityMunData.areaDescription : '';
    areaData.brgyDesc = brgyData ? brgyData.areaDescription : '';

    console.log(areaData)
    res.status(200).json(areaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getCreatedUsers = async (req, res) => {
  try {
    let userId = req.userId;
    console.log(userId, res.user)
    let allUsers = await User.findAll({
      where: { [Op.and]: [{ createdBy: userId }, { isSuper: false }, { contactId: { [Op.ne]: null } }] },
      include: [{
        model: User,
        as: 'owner',
        attributes: ['username', 'userLevel', 'areaCode', 'createdBy']
      }, {
        model: ContactInformation,
        as: 'details'
      }],
      attributes: ['id', 'username', 'userLevel', 'areaCode', 'createdBy', 'contactId']
    })

    let newUsers = [];


    allUsers.forEach(a => {
      let { id, username, areaCode, userLevel, isSuper, details: { firstName, lastName, middleName, mobile, regCode, regDesc, provCode, provDesc, citymunCode, citymunDesc, brgyCode, brgyDesc, gender, civilStatus, birthDate, suffix, address } } = a.dataValues;
      console.log(getAreaName(userLevel))
      newUsers.push({ username, areaCode, userLevel, firstName, lastName, middleName, mobile, regCode, regDesc, provCode, provDesc, citymunCode, citymunDesc, brgyCode, brgyDesc, gender, civilStatus, birthDate, suffix, address, phone: mobile, name: `${lastName}, ${firstName} ${middleName}`, age: moment().diff(moment(birthDate), 'years'), access: isSuper ? 'admin' : getAreaName(userLevel), id: id })
    })
    res.status(200).json(newUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};