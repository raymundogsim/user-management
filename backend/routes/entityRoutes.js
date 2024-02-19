// areaRoutes.js

const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityController');

router.get('/bu', entityController.getBusinessUnitData);
router.get('/division/:businessUnitCode', entityController.getDivisionData);
router.get('/section/:divisionCode', entityController.getSectionData);



module.exports = router;
