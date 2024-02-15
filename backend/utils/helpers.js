const areaCodes = require('../utils/brgy')
const objectToArray = (obj) => {
  const result = [];

  // for (const key in obj) {
  //   if (Object.hasOwnProperty.call(obj, key)) {
  //     result.push([key, obj[key]]);
  //   }
  // }


  return areaCodes;
}


const getAreaCodeDetails = (code, field = 'psgcCode') => {
  let codeData = areaCodes.find(a => a[field] == code);
  return codeData;
}

const getAreaName = (code) => {
  let areas = {
    regCode: 'Regional',
    provCode: 'Provincial',
    citymunCode: 'City/Municipality',
    brgyCode: 'Barangay'
  }

  return areas[code]
}


module.exports = {
  objectToArray,
  getAreaCodeDetails,
  getAreaName
}