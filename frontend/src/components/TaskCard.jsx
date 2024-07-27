import React , {useState} from 'react';
import PropTypes from 'prop-types';
import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import TaskEditModal from './TaskEditModal';

const TaskCard = ({ task }) => {

  const navigate = useNavigate();

  console.log("task", task);

  const { deleteTask } = useTasks();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDragStart = e => {
    e.dataTransfer.setData('taskId', task._id);
  };

  function capitalizeFirstLetter(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
 
  const handleDelete = () => {
    console.log("taskCard-delete", task._id)
    deleteTask(task._id);
  };

  const handleView = () => {
    if (task._id) {
      navigate(`/${task._id}`);
    }
  } 

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };
  
  return (
    <div
      className="p-2 rounded mb-2 shadow bg-blue-200 h-40 flex flex-col justify-between"
      draggable
      onDragStart={handleDragStart}
    >
      <div>
        <h3 className="text-xl font-semibold">{capitalizeFirstLetter(task.title)}</h3>
        <p>{capitalizeFirstLetter(task.description)}</p>
        <p>CreatedAt : { new Date(task.createdAt).toLocaleString()}</p>
       
      </div>

      <div className="flex justify-end">
        <button onClick={handleDelete} className="bg-red-500 text-white cursor-pointer rounded-md py-1 px-2 ml-2 mr-1">Delete</button>
        <button onClick = {handleEdit} className="bg-blue-300 text-white cursor-pointer rounded-md py-1 px-2 ml-2 mr-1">Edit</button>
        <button onClick={handleView} className="bg-blue-500 text-white cursor-pointer rounded-md py-1 px-2 ml-2 mr-1">View Details</button>
      </div>
      <TaskEditModal task={task} isOpen={isEditModalOpen} onClose={closeModal} />
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt:PropTypes.string.isRequired
  }).isRequired,
};

export default TaskCard;
