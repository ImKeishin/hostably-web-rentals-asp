
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { properties } = useProperty();
  const { user } = useAuth();
  
  // Display relevant content based on user type
  const renderContent = () => {
    if (!user) {
      return (
        <div>
          <h1 className="text-3xl font-bold mb-6">Find your next perfect stay</h1>
          <SearchBar />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 6).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      );
    }
    
    if (user.userType === 'renter') {
      return <RenterDashboard />;
    }
    
    // Redirect hosts to their dashboard
    return <Link to="/host/dashboard" className="btn-primary">Go to Host Dashboard</Link>;
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

// Component for renter dashboard
const RenterDashboard = () => {
  const { userReservations } = useProperty();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Rezervările tale</h1>
      <SearchBar />
      
      {userReservations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You don't have any reservations yet.</p>
          <Link to="/properties" className="btn-primary inline-block">Find a place to stay</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {userReservations.map(reservation => (
            <div key={reservation.id} className="property-card">
              <div className="flex flex-col sm:flex-row">
                <div className="property-image sm:w-64 h-48">
                  {reservation.propertyImage ? (
                    <img 
                      src={reservation.propertyImage}
                      alt={reservation.propertyTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                        <rect width="24" height="24" fill="white"/>
                        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 10C8.82843 10 9.5 9.32843 9.5 8.5C9.5 7.67157 8.82843 7 8 7C7.17157 7 6.5 7.67157 6.5 8.5C6.5 9.32843 7.17157 10 8 10Z" fill="currentColor"/>
                        <path d="M20 14.6546C20 14.538 19.9978 14.4242 19.9935 14.314M10.7259 13.0777C13.2346 13.0777 15.4312 14.6796 16 16.9999L5.00012 16.9999C5.56902 14.6796 7.76553 13.0777 10.2741 13.0777H10.7259Z" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M4 17L20 17" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-bold">{reservation.propertyTitle}</h3>
                  <p className="text-gray-600">{reservation.propertyLocation}</p>
                  <p className="text-gray-600 mt-2">
                    {new Date(reservation.startDate).toLocaleDateString('ro-RO')} – {new Date(reservation.endDate).toLocaleDateString('ro-RO')}
                  </p>
                  
                  <div className="mt-4 text-right">
                    <Link 
                      to={`/property/${reservation.propertyId}/review`}
                      className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary/5"
                    >
                      Scrie un review
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
