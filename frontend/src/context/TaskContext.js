import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); 
  const {isAuthenticated} = useAuth() 

   console.log("tasks",tasks);
   console.log("isAuthenticated",isAuthenticated);

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
        setTasks([...tasks, response.data]);
      } else {
        setTasks([]); 
      }
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      setTasks([]);
    }
  };

  useEffect(() => {
    if(isAuthenticated){ // this is runs only when authirization is done and first mount is happen and get all the task to that user from database and display in task section.
      console.log("fetch task Runs");
      fetchTasks();
    }
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

  const deleteTask = async (id) => { 
    console.log("TaskContext-deleteId", id);
    const token = Cookies.get('token', { path: '/' });
    if (!token) {
      console.error('No token found in cookies');
      return;
    }
    try {
      await axios.delete(`/api/tasks/${id}`, {  
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };
  

  const updateTask = async (updatedTask) => {
    const token = Cookies.get('token');
    try {
      const response = await axios.put(`/api/tasks/${updatedTask._id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.map(task => (task._id === updatedTask._id ? response.data : task)));
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, columns, addTask, moveTask , updateTask , deleteTask}}>
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
