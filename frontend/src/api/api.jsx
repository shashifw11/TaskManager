// import axios from 'axios';

// const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// //baseURL: 'http://localhost:5000/api'

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem('profile')) {
//     req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//   }
//   return req;
// });

// export const login = (formData) => API.post('/auth/login', formData);
// export const register = (formData) => API.post('/auth/register', formData);

// export const fetchTasks = () => API.get('/tasks');
// export const createTask = (newTask) => API.post('/tasks', newTask);
// export const updateTask = (id, updatedTask) => API.patch(`/tasks/${id}`, updatedTask);
// export const deleteTask = (id) => API.delete(`/tasks/${id}`);
