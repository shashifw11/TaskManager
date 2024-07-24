import React from 'react';
import PropTypes from 'prop-types';

const TaskCard = ({ task }) => {
  const handleDragStart = e => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div
      className="bg-white p-2 rounded mb-2 shadow"
      draggable
      onDragStart={handleDragStart}
    >
      <h3 className="text-lg">{task.title}</h3>
      <p>{task.description}</p>
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
