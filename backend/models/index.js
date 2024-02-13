const User = require('./User');
const ContactInformation = require('./ContactInformation');
const AuditLog = require('./AuditLog');
const RefBrgy = require('./Brgy');
const RefRegion = require('./Regions');
const RefCitymun = require('./CityMun');
const RefProvince = require('./Province');

// Define Relationships
User.belongsTo(ContactInformation, { foreignKey: 'contactId', as: 'details' });
ContactInformation.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
User.belongsTo(User, { foreignKey: 'createdBy', as: 'owner' });

module.exports = {
  User,
  ContactInformation,
  AuditLog,
  RefRegion, RefProvince, RefCitymun, RefBrgy
};