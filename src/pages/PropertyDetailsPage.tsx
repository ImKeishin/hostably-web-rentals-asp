
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const PropertyDetailsPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { getPropertyById, addReservation } = useProperty();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Form state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  
  // Find the property
  const property = propertyId ? getPropertyById(propertyId) : undefined;
  
  if (!property) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Property not found</h1>
          <p>The property you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }
  
  // Handle reservation
  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    const days = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    addReservation({
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      propertyImage: property.image,
      startDate: new Date(checkIn).toISOString(),
      endDate: new Date(checkOut).toISOString(),
      guestCount: guests,
      totalPrice: property.pricePerNight * days
    });
    
    navigate('/');
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative h-80 rounded-lg overflow-hidden mb-6">
            {property.image ? (
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          
          <div className="md:flex">
            <div className="md:w-2/3 md:pr-8">
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{property.location}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{property.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Amenities</h2>
                <ul className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold mb-6">${property.pricePerNight} <span className="text-base font-normal">per night</span></h2>
                
                <form onSubmit={handleReservation}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="input-field pr-10"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="input-field pr-10"
                      />
                      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="dropdown"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <button type="submit" className="btn-primary">
                    Rezervă
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
