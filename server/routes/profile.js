const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const authenticateToken = require('../authenticateToken');

router.get('/', authenticateToken, profileController.getProfile);
router.put('/:id', authenticateToken, profileController.updateProfile);

module.exports = router;