
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { useProperty } from '../context/PropertyContext';
import { Property } from '../types';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { properties } = useProperty();
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  
  // Filter properties based on search query
  useEffect(() => {
    const results = properties.filter(property => {
      const searchLower = query.toLowerCase();
      return (
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower)
      );
    });
    
    setFilteredProperties(results);
  }, [query, properties]);
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        
        <h1 className="text-3xl font-bold mb-6">Results</h1>
        
        {filteredProperties.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No properties found matching "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
