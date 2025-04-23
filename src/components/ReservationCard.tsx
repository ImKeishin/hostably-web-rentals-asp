
import React from 'react';
import { Link } from 'react-router-dom';
import { Reservation } from '../types';
import { format } from 'date-fns';

interface ReservationCardProps {
  reservation: Reservation;
  showGuestInfo?: boolean;
}

const ReservationCard = ({ reservation, showGuestInfo = false }: ReservationCardProps) => {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
  
  // Format dates for display in Romanian format
  const startDate = formatDate(reservation.startDate);
  const endDate = formatDate(reservation.endDate);
  
  return (
    <div className="border rounded-lg overflow-hidden bg-white mb-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-gray-200 h-40">
          {reservation.propertyImage ? (
            <img 
              src={reservation.propertyImage} 
              alt={reservation.propertyTitle}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="flex items-center justify-center h-full">
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
        
        <div className="p-4 w-full md:w-3/4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{reservation.propertyTitle}</h3>
            <p className="text-gray-600 mb-2">{reservation.propertyLocation}</p>
            <p className="text-gray-600 mb-2">
              {startDate} – {endDate}
            </p>
            
            {showGuestInfo && reservation.userName && (
              <p className="text-gray-600 mb-2">Guest: {reservation.userName}</p>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <Link 
              to={`/property/${reservation.propertyId}/review`}
              className="border border-primary text-primary rounded-md px-4 py-2 hover:bg-primary/5"
            >
              Scrie un review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
