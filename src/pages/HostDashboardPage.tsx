
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const HostDashboardPage = () => {
  const { user } = useAuth();
  
  if (!user || user.userType !== 'host') {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Access Denied</h1>
          <p>You must be logged in as a host to view this page.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Hostably</h1>
        <h2 className="text-2xl font-bold mb-8">Host Dashboard</h2>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <Link 
            to="/host/add-property" 
            className="w-full sm:w-1/2 border border-gray-300 rounded-md py-3 px-4 hover:bg-gray-50 transition-colors"
          >
            Adaugă proprietate
          </Link>
          
          <Link 
            to="/profile" 
            className="w-full sm:w-1/2 border border-gray-300 rounded-md py-3 px-4 hover:bg-gray-50 transition-colors"
          >
            Profil utilizator
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HostDashboardPage;
