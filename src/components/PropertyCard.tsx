
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  showBookButton?: boolean;
  showReviewButton?: boolean;
}

const PropertyCard = ({ property, showBookButton = true, showReviewButton = false }: PropertyCardProps) => {
  return (
    <div className="property-card">
      <div className="property-image">
        {property.image ? (
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.location}</p>
        <p className="font-bold mb-4">${property.pricePerNight} per night</p>
        
        <div className="flex space-x-2">
          {showBookButton && (
            <Link 
              to={`/property/${property.id}`} 
              className="btn-primary text-center"
            >
              View Details
            </Link>
          )}
          
          {showReviewButton && (
            <Link 
              to={`/property/${property.id}/review`} 
              className="border border-primary text-primary rounded-md px-4 py-2 text-center w-full hover:bg-primary/5"
            >
              Scrie un review
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
