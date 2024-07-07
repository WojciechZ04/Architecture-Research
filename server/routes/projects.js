const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const authenticateToken = require('../authenticateToken'); 

router.get('/', projectsController.getProjects);

module.exports = router;