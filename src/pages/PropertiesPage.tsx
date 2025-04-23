
import React from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useProperty } from '../context/PropertyContext';

const PropertiesPage = () => {
  const { properties } = useProperty();
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Properties</h1>
        <SearchBar />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
