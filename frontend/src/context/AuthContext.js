import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  console.log({ "isRegister": isRegister, "isAuthenticated": isAuthenticated, "user": user })

  const login = async (loginData) => {
    try {
      const response = await axios.post('/api/auth/login', loginData);
      console.log("login-response", response)
      // Cookies.set('token', response.data.token);
      Cookies.set('token', response.data.token, { path: '/' });
      setUser(response.data.user);
      setIsAuthenticated(true);
      window.alert("login successfull") ; 
      navigate('/');
    } catch (error) {
      console.error('Login error', error);
    }
  };
  
  const checkAuthStatus = async () => {
    const token = Cookies.get('token'); 
     console.log("token",token);
    if (token) {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setIsAuthenticated(true);
        navigate('/');
      } catch (error) {
        console.error('Failed to authenticate token', error);
        window.alert(error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);


  const register = async (registerData) => {
    try {
      const response = await axios.post('/api/auth/register', registerData);
      console.log("register-response", response)
      // Cookies.set('token', response.data.user);
      Cookies.set('token', response.data.token, { path: '/' });
      setUser(response.data.token);
      setIsAuthenticated(true);
      setIsRegister(true)
      navigate('/');
    } catch (error) {
      console.error('Registration error', error);
    }
  };


  const logout = () => {
    // Cookies.remove('token');
    Cookies.remove('token', { path: '/' });
    setUser(null);
    setIsAuthenticated(false);
    setIsRegister(false)
    navigate('/login');
  };

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


