
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const { addProperty } = useProperty();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState(1);
  
  // Available amenities
  const availableAmenities = [
    'Wi-Fi', 'Kitchen', 'Free parking', 'Fireplace', 'Air conditioning',
    'Heating', 'Pool', 'Hot tub', 'Washer', 'Dryer', 'TV', 'BBQ grill'
  ];
  
  // Handle amenity toggle
  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || user.userType !== 'host') {
      navigate('/login');
      return;
    }
    
    addProperty({
      title,
      description,
      location,
      pricePerNight: Number(pricePerNight),
      image: '/placeholder.svg',
      amenities,
      bedrooms
    });
    
    navigate('/host/properties');
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Adaugă Proprietate</h1>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titlu
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descriere
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field h-32 resize-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preț per noapte
            </label>
            <input
              type="number"
              required
              min="1"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disponibilitate
            </label>
            <select className="dropdown">
              <option>Alegeți facilități</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="dropdown"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableAmenities.map(amenity => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="h-4 w-4 text-primary rounded"
                  />
                  <span className="ml-2 text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
          
          <button type="submit" className="btn-primary">
            Adaugă proprietate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
