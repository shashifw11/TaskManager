import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';


const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const navigate = useNavigate(); 

  const setToken = (token)=>{ 
      console.log("setToken" , token);
    Cookies.set('token', token, { expires: 1, path: '/'});
  }

  console.log({ "isRegister": isRegister, "isAuthenticated": isAuthenticated, "user": user })

  const login = async (loginData) => { 
    checkAuthStatus()
    try {
      const response = await axios.post('/api/auth/login', loginData);
      console.log("login-response", response)
      setToken(response.data.token)
      setUser(response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login error', error);
    }
  };
  
  const checkAuthStatus = async () => {
    const token = Cookies.get('token');  // initially there is no token stored in cookies so request send without token
    console.log("get-token-from-cookies", token);
    if (token) {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to authenticate token', error);
        Cookies.remove('token', { path: '/' });
      }
    } else {
      Cookies.remove('token', { path: '/' });
    }
    setLoading(false); // Set loading to false after checking auth status
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);


  const register = async (registerData) => {
    try {
      const response = await axios.post('/api/auth/register', registerData);
      console.log("register-response", response)
      setToken(response.data.token) 
      setUser(response.data.token);
      //setIsAuthenticated(true);
      setIsRegister(true)
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
    }
  };


  const logout = () => { 
    console.log("logout and token remove")
    Cookies.remove('token', { path: '/' });
    setUser(null);
    setIsAuthenticated(false);
    setIsRegister(false)
    navigate('/login');
  };

  if (loading) {
    return <div className = "flex items-center justify-center">Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};


