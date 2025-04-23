
import React from 'react';
import Navbar from '../components/Navbar';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import ReservationCard from '../components/ReservationCard';

const HostReservationsPage = () => {
  const { hostReservations } = useProperty();
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
        <h1 className="text-3xl font-bold mb-6">Rezervări primite</h1>
        
        {hostReservations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">You have no reservations yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {hostReservations.map(reservation => (
              <ReservationCard 
                key={reservation.id} 
                reservation={reservation} 
                showGuestInfo={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostReservationsPage;
