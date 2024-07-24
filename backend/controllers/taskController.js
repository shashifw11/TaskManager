const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = new Task({ title, description, status, userId: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
