
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Please Log In</h1>
          <p>You must be logged in to view your profile.</p>
          <Link to="/login" className="text-blue-600 hover:underline">Log in here</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto border rounded-lg p-6 bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Profilul meu</h1>
          
          <div className="space-y-4">
            <div className="flex">
              <span className="w-24 font-medium text-gray-600">Nume:</span>
              <span>{user.name}</span>
            </div>
            
            <div className="flex">
              <span className="w-24 font-medium text-gray-600">Email:</span>
              <span>{user.email}</span>
            </div>
            
            <div className="flex">
              <span className="w-24 font-medium text-gray-600">Din:</span>
              <span>{new Date(user.createdAt).toLocaleDateString('ro-RO')}</span>
            </div>
            
            {user.phone && (
              <div className="flex">
                <span className="w-24 font-medium text-gray-600">Număr de telefon:</span>
                <span>{user.phone}</span>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <Link 
              to={user.userType === 'host' ? '/host/properties' : '/'}
              className="btn-primary block text-center"
            >
              {user.userType === 'host' ? 'Vezi proprietățile mele' : 'Vezi rezervările mele'}
            </Link>
          </div>
          
          {user.userType === 'host' && (
            <div className="mt-4">
              <Link 
                to="/host/reservations"
                className="block text-center border border-primary text-primary rounded-md py-2 hover:bg-primary/5"
              >
                Vezi rezervările primite
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
