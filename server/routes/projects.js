const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const authenticateToken = require('../authenticateToken'); 

router.get('/', projectsController.getProjects);
router.post('/', projectsController.createProject);
router.get('/:projectId', projectsController.getProject);

module.exports = router;