import React from 'react';
import  { createContext, useContext, useState , useEffect} from "react" ;
import axios from 'axios';
import PropTypes from 'prop-types';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const columns = [
    { id: 'todo', name: 'To Do' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'done', name: 'Done' },
  ];

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     const response = await axios.get('/api/tasks'); 
  //       console.log("add-task" , response);
  //     setTasks(response.data);
  //   };
  //   fetchTasks();
  // }, [tasks]);

  const addTask = async (task) => {
    const response = await axios.post('/api/tasks', task);
    setTasks([...tasks, response.data]);
  };

  const moveTask = (taskId, columnId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, columnId } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, columns, addTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTasks = () => {
  return useContext(TaskContext);
};


