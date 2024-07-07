const express = require('express');
const router = express.Router();
const organizationsController = require('../controllers/organizations');
const authenticateToken = require('../authenticateToken');

router.get('/', authenticateToken, organizationsController.getOrganizations);
router.post('/', organizationsController.createOrganization);
router.get('/:id', organizationsController.getOrganization);

module.exports = router;