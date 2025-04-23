
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

const WriteReviewPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { getPropertyById, addReview } = useProperty();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  // Find the property
  const property = propertyId ? getPropertyById(propertyId) : undefined;
  
  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Please Log In</h1>
          <p>You must be logged in to write a review.</p>
        </div>
      </div>
    );
  }
  
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
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addReview({
      propertyId: property.id,
      rating,
      comment
    });
    
    navigate('/');
  };
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto border rounded-lg p-6 bg-white">
          <h1 className="text-3xl font-bold mb-6 text-center">Scrie un review</h1>
          <h2 className="text-xl font-medium mb-6 text-center">{property.title}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Adaugă un comentariu"
                className="input-field h-32 resize-none"
              />
            </div>
            
            <button type="submit" className="btn-primary">
              Trimite review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewPage;
