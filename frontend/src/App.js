import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { ToastContainer, toast } from 'react-toastify';
import './styles/tailwind.css'; 
import TaskDetails from './components/TaskDetails/TaskDetails';


const App = () => {
  return (
    
    <AuthProvider>
      <TaskProvider>
       <Navbar/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path = "/:id" element = {<TaskDetails/>}/>
             <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
       </TaskProvider>
    </AuthProvider>
  );
};

export default App;



