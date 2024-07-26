import React from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { useTasks } from '../context/TaskContext';
import PropTypes from 'prop-types';

const Column = ({ column }) => {
  
  const { tasks, addTask, moveTask } = useTasks();
   //console.log("column-task",tasks);
  const handleDrop = e => {
    const taskId = e.dataTransfer.getData('taskId');
    moveTask(taskId, column.id);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  return (
    <div
      className="w-1/3 bg-gray-200 p-4 rounded"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-xl font-bold mb-4">{column.name}</h2>

      <TaskForm columnId={column.id} addTask={addTask} />
      
      {tasks
        .filter(task => task.column === column.id)
        .map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Column;
