// Task CRUD operations

const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await Task.create({ user: req.user.id, title, description });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };