import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [list, setList] = useState({
    email: "",
    password: "",
  })

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setList((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = e => {
    e.preventDefault();
    login(list);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg border-4 border-blue-500">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="email"
          value={list.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <input
          type="password"
          value={list.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Login
        </button>
        <p className="flex items-center justify-center mt-5">
          Dont have an account?
          <span className="cursor-pointer text-blue-500 font-semibold" onClick={handleSignUp} >
            SignUp
          </span>
        </p>
        <div className="flex items-center justify-center mt-5">
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleGoogleLogin}>Login with Google</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
