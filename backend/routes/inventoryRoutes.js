// routes/contactInformationRoutes.js

const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create', authMiddleware, inventoryController.createInventory);
router.get('/get', authMiddleware, inventoryController.getInventory);
router.put('/update/:id', authMiddleware, inventoryController.updateInventory);

module.exports = router;
