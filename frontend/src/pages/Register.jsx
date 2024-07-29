import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL;


const Register = () => {
  const [list, setList] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: ""
  })

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setList((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault();
    register(list);
  };

  const handleGoogleSignup = () => {
   window.location.href = `${API_BASE_URL}/auth/google`;
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 border">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border-4 border-blue-500 lg:w-[40%] md:[50%] sm:[80%] w-[80%] shadow-md">
        <h2 className="text-xl mb-4">Register</h2>
        <input
          type="text"
          value={list.firstName}
          name="firstName"
          onChange={handleChange}
          placeholder="First Name"
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <input
          type="text"
          name="lastName"
          value={list.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={list.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={list.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <input
          type="password"
          name="conformPassword"
          value={list.conformPassword}
          onChange={handleChange}
          placeholder="Conform Password"
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          SignUp
        </button>
        <p className="flex items-center justify-center mt-5" >Already have an account? {" "}
          <span className="cursor-pointer text-blue-500 font-semibold" onClick={handleLogin}>
            Login
          </span>
        </p>
        <div className="flex items-center justify-center mt-5">
          <button 
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleGoogleSignup}
          >SignUp with Google</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
