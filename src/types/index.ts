
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  userType: 'host' | 'renter';
}

export interface Property {
  id: string;
  title: string;
  location: string;
  description: string;
  pricePerNight: number;
  image: string;
  amenities: string[];
  hostId: string;
  hostName?: string;
  bedrooms?: number;
}

export interface Reservation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyLocation: string;
  propertyImage: string;
  startDate: string;
  endDate: string;
  guestCount: number;
  userId: string;
  userName?: string;
  totalPrice: number;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
