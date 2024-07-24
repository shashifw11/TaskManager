import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ columnId, addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addTask({ title, description, columnId });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="p-2 border rounded mb-2 w-full"
        required
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="p-2 border rounded mb-2 w-full"
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




