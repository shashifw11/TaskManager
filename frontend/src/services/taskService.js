// import axios from 'axios';

// export const getTasks = async () => {
//     const response = await axios.get('/api/tasks', {
//         headers: {
//             'x-auth-token': localStorage.getItem('token'),
//         },
//     });
//     return response.data;
// };

// export const createTask = async (taskData) => {
//     const response = await axios.post('/api/tasks', taskData, {
//         headers: {
//             'x-auth-token': localStorage.getItem('token'),
//         },
//     });
//     return response.data;
// };

// export const updateTask = async (taskId, taskData) => {
//     const response = await axios.put(`/api/tasks/${taskId}`, taskData, {
//         headers: {
//             'x-auth-token': localStorage.getItem('token'),
//         },
//     });
//     return response.data;
// };

// export const deleteTask = async (taskId) => {
//     const response = await axios.delete(`/api/tasks/${taskId}`, {
//         headers: {
//             'x-auth-token': localStorage.getItem('token'),
//         },
//     });
//     return response.data;
// };
