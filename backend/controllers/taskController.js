const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description, columnId} = req.body; 
    //console.log("taskCreate-req.body", req.body); //working after AUthMiddleware work completed
    //console.log("req.user.id",req.user.id);
    try {
        const task = new Task({ title, description, column:columnId, userId: req.user.id }); 
      // console.log("createdTask" , task);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getTasks = async (req, res) => { 
    console.log("taskget-req.body", req.body);
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body; 
    console.log("taskUpdate-req.body", req.body);
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
    console.log("req.params.id",req.params.id); 
    try { 
        const task = await Task.findById(req.params.id); 
          console.log("delete-task",task);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        const response =  await Task.findByIdAndDelete(req.params.id);
         console.log("delete-response", response);

        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};