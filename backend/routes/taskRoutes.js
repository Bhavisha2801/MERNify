// Routes for tasks
const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;