
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const HostPropertiesPage = () => {
  const { userProperties } = useProperty();
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Properties</h1>
          <Link 
            to="/host/add-property" 
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            + Add Property
          </Link>
        </div>
        
        {userProperties.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't added any properties yet.</p>
            <Link to="/host/add-property" className="btn-primary inline-block">Add Your First Property</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userProperties.map(property => (
              <div key={property.id} className="border rounded-lg overflow-hidden bg-white">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-64 h-48 bg-gray-200 flex items-center justify-center">
                    {property.image ? (
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  
                  <div className="p-4 flex-grow">
                    <h3 className="text-xl font-bold">{property.title}</h3>
                    <p className="text-gray-600 mb-2">{property.location}, {property.bedrooms} bedrooms</p>
                    <p className="text-gray-600">{property.amenities.join(', ')}</p>
                    
                    <div className="flex justify-end mt-4">
                      <button className="border rounded-md px-4 py-1.5 hover:bg-gray-50 transition-colors">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostPropertiesPage;
