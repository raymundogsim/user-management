// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const auditMiddleware = require('../middlewares/auditMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/auth', authMiddleware, userController.getAuthenticatedUserDetails);
router.get('/verify', userController.verifyLicense);
router.get('/all', authMiddleware, userController.getCreatedUsers);
router.put('/update/:id', authMiddleware, userController.updateUser);





module.exports = router;
