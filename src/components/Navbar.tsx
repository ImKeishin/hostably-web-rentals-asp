
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="px-4 py-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">Hostably</Link>
        
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              {user.userType === 'host' && (
                <Link to="/host/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              )}
              <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                Profile
              </Link>
              <button 
                onClick={logout} 
                className="border border-gray-300 rounded-md px-4 py-1.5 hover:bg-gray-100 transition-colors"
              >
                {user.userType === 'renter' ? 'Deconectare' : 'Logout'}
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-primary text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
