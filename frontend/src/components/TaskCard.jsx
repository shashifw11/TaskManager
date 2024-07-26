import React from 'react';
import PropTypes from 'prop-types';

const TaskCard = ({ task }) => {
  const handleDragStart = e => {
    e.dataTransfer.setData('taskId', task.id);
  };

  function capitalizeFirstLetter(word) {
    if (!word) return ''; 
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div
      className="p-2 rounded mb-2 shadow bg-blue-200 h-40 flex flex-col justify-between"
      draggable
      onDragStart={handleDragStart}
    >
      <div>
      <h3 className="text-xl font-semibold">{capitalizeFirstLetter(task.title)}</h3>
      <p>{capitalizeFirstLetter(task.description)}</p>
      <p>CreatedAt</p>
      </div>
      
      <div className="flex justify-end">
        <button className = "bg-red-500 text-white cursor-pointer rounded-md py-1 px-2 ml-2 mr-1">Delete</button>
        <button className = "bg-blue-300 text-white cursor-pointer rounded-md py-1 px-2 ml-2 mr-1">Edit</button>
        <button className = "bg-blue-500 text-white cursor-pointer rounded-md py-1 px-2 ml-2 mr-1">View Details</button>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
