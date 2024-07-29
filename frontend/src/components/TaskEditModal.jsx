import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTasks } from '../context/TaskContext';

const TaskEditModal = ({ task, isOpen, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { updateTask } = useTasks();

  const handleSave = async () => {
    await updateTask({ ...task, title, description });
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2 mr-2">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white rounded px-4 py-2">Save</button>
        </div>
      </div>
    </div>
  );
};

TaskEditModal.propTypes = {
  task: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskEditModal;
