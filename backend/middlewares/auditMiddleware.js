// middlewares/auditMiddleware.js

const {AuditLog} = require('../models');

const auditMiddleware = (action, entity, entityId, userId, additionalInfo) => {
  return async (req, res, next) => {
    try {
      // Check if entityId and additionalInfo are provided
      const auditData = {
        action,
        entity,
        entity_id: entityId,
        user_id: userId,
        additional_info: additionalInfo,
      };

      if (!entityId) delete auditData.entity_id;
      if (!additionalInfo) delete auditData.additional_info;

      // Create audit log
      await AuditLog.create(auditData);
      next();
    } catch (error) {
      console.error('Error creating audit log:', error);
      next(error);
    }
  };
};

module.exports = auditMiddleware;
