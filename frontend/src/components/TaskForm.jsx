import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ columnId, addTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    addTask({ title: task.title, description: task.description, columnId }); 
    setTask({
      title: "",
      description: ""
    });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setTask(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={task.title}
        name="title"
        onChange={handleChange}
        placeholder="Title"
        className="p-2 border rounded mb-2 w-full"
        required
      />
      <textarea
        value={task.description}
        name="description"
        onChange={handleChange}
        placeholder="Description"
        className="p-2 border rounded mb-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  columnId: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
