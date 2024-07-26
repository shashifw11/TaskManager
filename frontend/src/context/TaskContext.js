import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); 
   console.log("tasks",tasks);

  const columns = [
    { id: 'todo', name: 'To Do' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'done', name: 'Done' },
  ];

  const fetchTasks = async () => {
   const token = Cookies.get('token', { path: '/' }) 
   console.log("Token from Cookies: fetch task", token);
    try {
      const response = await axios.get('/api/tasks',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && response.data.length > 0) {
        setTasks(response.data);
      } else {
        setTasks([]); 
      }
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const addTask = async (task) => {
   const token = Cookies.get('token', { path: '/' }) 
   if (!token) {
    console.error('No token found in cookies');
    return;
  }
    try {
      const response = await axios.post('/api/tasks', task,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      //console.log("Addtask-response",response);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Failed to add task', error);
    }
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
