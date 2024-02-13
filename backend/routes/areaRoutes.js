// areaRoutes.js

const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

router.get('/regions', areaController.getRegions);
router.get('/provinces/:regCode', areaController.getProvincesByRegion);
router.get('/citymuns/:provCode', areaController.getCityMunsByProvince);
router.get('/brgies/:citymunCode', areaController.getBrgiesByCitymun);



module.exports = router;
