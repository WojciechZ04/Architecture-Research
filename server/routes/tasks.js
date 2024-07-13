const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');
const authenticateToken = require('../authenticateToken');

router.get('/', tasksController.getTasks);
router.post('/', tasksController.createTask);
router.delete('/:projectId/:taskId', tasksController.deleteTask)

module.exports = router;