// routes/contactInformationRoutes.js

const express = require('express');
const router = express.Router();
const contactInformationController = require('../controllers/contactInformationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, contactInformationController.createContactInformation);
router.get('/', authMiddleware, contactInformationController.getContactInformations);
router.put('/update/:id', authMiddleware, contactInformationController.updateContactInformation);

module.exports = router;
