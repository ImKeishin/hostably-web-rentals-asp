
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property, Reservation, Review } from '../types';
import { useAuth } from './AuthContext';

interface PropertyContextType {
  properties: Property[];
  userProperties: Property[];
  userReservations: Reservation[];
  hostReservations: Reservation[];
  reviews: Review[];
  addProperty: (property: Omit<Property, 'id' | 'hostId' | 'hostName'>) => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'userId' | 'userName'>) => void;
  addReview: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'date'>) => void;
  getPropertyById: (id: string) => Property | undefined;
}

const PropertyContext = createContext<PropertyContextType | null>(null);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Initialize with mock data
    setProperties([
      {
        id: '1',
        title: 'Cozy Cabin',
        location: 'Asheville, North Carolina',
        description: 'Escape to this cozy cabin nestled in the woods. Enjoy the tranquility of nature with all the comforts of home. Perfect for a relaxing retreat.',
        pricePerNight: 150,
        image: '/lovable-uploads/8ca4da0f-517a-4c99-acf9-897f9b715285.png',
        amenities: ['Wi-Fi', 'Kitchen', 'Free parking', 'Fireplace'],
        hostId: 'host1',
        bedrooms: 2
      },
      {
        id: '2',
        title: 'Beachfront Apartment',
        location: 'Ocean City',
        description: 'Wake up to stunning ocean views in this modern beachfront apartment. Steps from the sand and close to all amenities.',
        pricePerNight: 180,
        image: '/placeholder.svg',
        amenities: ['Wi-Fi', 'Kitchen', 'Beachfront', 'Pool'],
        hostId: 'host1',
        bedrooms: 1
      },
      {
        id: '3',
        title: 'Mountain Retreat',
        location: 'Aspen',
        description: 'Spectacular mountain views await you at this luxurious retreat. Perfect for outdoor enthusiasts and nature lovers.',
        pricePerNight: 250,
        image: '/placeholder.svg',
        amenities: ['Wi-Fi', 'Kitchen', 'Fireplace', 'Hot tub'],
        hostId: 'host1',
        bedrooms: 3
      },
      {
        id: '4',
        title: 'City Studio',
        location: 'Downtown',
        description: 'Stylish studio apartment in the heart of downtown. Walking distance to restaurants, shops, and attractions.',
        pricePerNight: 125,
        image: '/placeholder.svg',
        amenities: ['Wi-Fi', 'Kitchen', 'Gym access', 'City view'],
        hostId: 'host1',
        bedrooms: 1
      },
      {
        id: '5',
        title: 'Seaside Retreat',
        location: 'California',
        description: 'Beautiful seaside property with amazing ocean views. Perfect for family getaways.',
        pricePerNight: 200,
        image: '/placeholder.svg',
        amenities: ['Wi-Fi', 'Kitchen', 'Free parking'],
        hostId: 'host1',
        bedrooms: 3
      },
      {
        id: '6',
        title: 'Mountain Getaway',
        location: 'Colorado',
        description: 'Escape to the mountains in this beautiful cabin with stunning views.',
        pricePerNight: 175,
        image: '/placeholder.svg',
        amenities: ['Wi-Fi', 'Kitchen', 'Heating'],
        hostId: 'host1',
        bedrooms: 4
      }
    ]);

    setReservations([
      {
        id: '1',
        propertyId: '1',
        propertyTitle: 'Cozy Cabin',
        propertyLocation: 'Lakeview',
        propertyImage: '/placeholder.svg',
        startDate: '2024-06-01T00:00:00.000Z',
        endDate: '2024-06-05T00:00:00.000Z',
        guestCount: 2,
        userId: 'renter1',
        userName: 'Johnny Doe',
        totalPrice: 750
      },
      {
        id: '2',
        propertyId: '2',
        propertyTitle: 'Beachfront Apartment',
        propertyLocation: 'Ocean City',
        propertyImage: '/placeholder.svg',
        startDate: '2024-06-01T00:00:00.000Z',
        endDate: '2024-06-05T00:00:00.000Z',
        guestCount: 2,
        userId: 'renter1',
        userName: 'Johnny Doe',
        totalPrice: 900
      },
      {
        id: '3',
        propertyId: '3',
        propertyTitle: 'Mountain Retreat',
        propertyLocation: 'Aspen',
        propertyImage: '/placeholder.svg',
        startDate: '2024-06-01T00:00:00.000Z',
        endDate: '2024-06-05T00:00:00.000Z',
        guestCount: 4,
        userId: 'renter1',
        userName: 'Johnny Doe',
        totalPrice: 1250
      },
      {
        id: '4',
        propertyId: '1',
        propertyTitle: 'Cozy Cabin',
        propertyImage: '/placeholder.svg',
        propertyLocation: 'Asheville, North Carolina',
        startDate: '2024-10-12T00:00:00.000Z',
        endDate: '2024-10-15T00:00:00.000Z',
        guestCount: 2,
        userId: 'mark123',
        userName: 'Mark Wilson',
        totalPrice: 450
      },
      {
        id: '5',
        propertyId: '3',
        propertyTitle: 'Mountain Retreat',
        propertyImage: '/placeholder.svg',
        propertyLocation: 'Aspen',
        startDate: '2024-11-05T00:00:00.000Z',
        endDate: '2024-11-10T00:00:00.000Z',
        guestCount: 3,
        userId: 'sarah456',
        userName: 'Sarah Brown',
        totalPrice: 1250
      },
      {
        id: '6',
        propertyTitle: 'City Apartment',
        propertyId: '4',
        propertyImage: '/placeholder.svg',
        propertyLocation: 'Downtown',
        startDate: '2024-11-20T00:00:00.000Z',
        endDate: '2024-11-25T00:00:00.000Z',
        guestCount: 1,
        userId: 'david789',
        userName: 'David Smith',
        totalPrice: 625
      },
      {
        id: '7',
        propertyTitle: 'Seaside Bungalow',
        propertyId: '5',
        propertyImage: '/placeholder.svg',
        propertyLocation: 'California',
        startDate: '2024-12-02T00:00:00.000Z',
        endDate: '2024-12-07T00:00:00.000Z',
        guestCount: 2,
        userId: 'emily101',
        userName: 'Emily Johnson',
        totalPrice: 1000
      }
    ]);
  }, []);

  // Filter properties and reservations for the current user
  const userProperties = user?.userType === 'host' ? properties.filter(p => p.hostId === user.id) : [];
  const userReservations = user?.userType === 'renter' ? reservations.filter(r => r.userId === user.id) : [];
  const hostReservations = user?.userType === 'host' ? reservations.filter(r => {
    const property = properties.find(p => p.id === r.propertyId);
    return property && property.hostId === user.id;
  }) : [];

  const addProperty = (property: Omit<Property, 'id' | 'hostId' | 'hostName'>) => {
    if (!user) return;
    
    const newProperty: Property = {
      ...property,
      id: Math.random().toString(36).substring(2, 9),
      hostId: user.id,
      hostName: user.name
    };
    
    setProperties(prev => [...prev, newProperty]);
  };

  const addReservation = (reservation: Omit<Reservation, 'id' | 'userId' | 'userName'>) => {
    if (!user) return;
    
    const newReservation: Reservation = {
      ...reservation,
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      userName: user.name
    };
    
    setReservations(prev => [...prev, newReservation]);
  };

  const addReview = (review: Omit<Review, 'id' | 'userId' | 'userName' | 'date'>) => {
    if (!user) return;
    
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substring(2, 9),
      userId: user.id,
      userName: user.name,
      date: new Date().toISOString()
    };
    
    setReviews(prev => [...prev, newReview]);
  };

  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  return (
    <PropertyContext.Provider 
      value={{ 
        properties, 
        userProperties, 
        userReservations, 
        hostReservations,
        reviews,
        addProperty, 
        addReservation,
        addReview,
        getPropertyById
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
