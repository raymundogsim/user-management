const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

const isPassword8 = (string) => {

    if (String(string).length < 8) return true;
    else return false;
};


const isEmpty = (string) => {
    if (!string) return true;
    if (String(string).trim() === '') return true;
    else return false;
};

const isMobile = (string) => {
    if (!string) return false;
    if (String(string).trim() === '') return false;
    // console.log(String(string).trim().charAt(0) === '0' && String(string).trim().length === 11)
    console.log(String(string).trim().charAt(0) === '9' && String(string).trim().length === 10)
    console.log(String(string).trim().length === 11)

    if ((String(string).trim().charAt(0) === '9' && String(string).trim().length === 10)) return true;
    else return false;
};


const validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.username)) errors.username = 'Username must not be empty';
    if (isEmpty(data.password)) errors.password = 'Password must be empty';
    if (isPassword8(data.password)) errors.password = 'Password must be 8 characters';
    if (isEmpty(data.userLevel)) errors.userLevel = 'User level must not be empty';
    if (isEmpty(data.areaCode)) errors.areaCode = 'Area Code must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

const validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.username)) errors.username = 'Username must not be empty';
    if (isEmpty(data.password)) errors.password = 'Password must be empty';
    if (isPassword8(data.password)) errors.password = 'Password must be 8 characters';
    // if (isEmpty(data.refId)) errors.refId = 'Referrer ID is Required';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};


const validateContactData = (data) => {
    let errors = {};

    if (isEmpty(data.firstName)) errors.firstName = 'First Name must be empty';
    if (isEmpty(data.lastName)) errors.lastName = 'Last Name must be empty';
    if (isEmpty(data.gender)) errors.gender = 'Gender must be empty';
    if (isEmpty(data.birthDate)) errors.birthDate = 'Birth Date must be empty';
    if (isEmpty(data.civilStatus)) errors.civilStatus = 'Civil Status must be empty';
    if (isEmpty(data.mobile)) errors.mobile = 'Mobile must be empty';
    if (!isMobile(data.mobile)) errors.mobile = 'Mobile must be valid. ex: 9xxxxxxxxx.';
    if (isEmpty(data.regCode)) errors.regCode = 'Region must be empty';
    if (isEmpty(data.provCode)) errors.provCode = 'Province must be empty';
    if (isEmpty(data.citymunCode)) errors.citymunCode = 'City/Municipality must be empty';
    if (isEmpty(data.brgyCode)) errors.brgyCode = 'Barangay must be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};


const validateInventoryData = (data) => {
    let errors = {};

    if (isEmpty(data.itemName)) errors.itemName = 'Item Name must be empty';
    if (isEmpty(data.itemDesc)) errors.itemDesc = 'Item Description must be empty';
    if (isEmpty(data.itemCategory)) errors.itemCategory = 'itemCategory must be empty';
    if (isEmpty(data.businessUnitName)) errors.businessUnitName = 'BusinessUnit must be empty';
    console.log(data, "validatorForInventory")
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
};


module.exports = {
    validateSignupData,
    validateLoginData,
    validateContactData,
    validateInventoryData
}