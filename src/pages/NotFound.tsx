
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
          <Link to="/" className="inline-block bg-primary text-white px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
