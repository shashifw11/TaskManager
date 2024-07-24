import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, login, register, logout, isAuthenticated , isRegister } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };
  
  const isActive = (path) => location.pathname === path;

  return (
    
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg">Task Manager</Link>
        <div>
          {isAuthenticated  || isRegister ? (
            <button
              className="text-white bg-red-500 px-4 py-1 rounded-md"
              onClick={logout}
            >
              Logout
            </button>
          ) : ( 
            <>
              <button
                className={`mr-2 px-8 py-2 rounded-md ${isActive('/login') ? 'bg-white text-blue-500' : 'text-white'}`}
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className={`mr-5 px-6 py-2 rounded-md ${isActive('/register') ? 'bg-white text-blue-500' : 'text-white'}`}
                onClick={handleSignUp}
              >
                SignUp
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
