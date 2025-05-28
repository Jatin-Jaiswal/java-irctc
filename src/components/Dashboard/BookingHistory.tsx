
import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { CalendarIcon, MapPinIcon, TrashIcon } from 'lucide-react';

export const BookingHistory: React.FC = () => {
  const { user } = useAuth();

  const handleCancelBooking = (ticketId: string) => {
    console.log(`Cancelling ticket: ${ticketId}`);
    // Here you would make an API call to your Java backend
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">My Bookings</h2>
      
      {user?.tickets_booked?.length === 0 ? (
        <Card className="text-center py-12">
          <div className="text-gray-500">
            <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No bookings yet</p>
            <p className="text-sm">Start by searching for trains and booking your first ticket!</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {user?.tickets_booked?.map((ticket) => (
            <Card key={ticket.ticket_id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Ticket #{ticket.ticket_id.slice(0, 8)}...
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Route:</span>
                      <span className="font-medium">{ticket.source} → {ticket.destination}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{ticket.date_of_travel}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Train:</span>
                      <span className="font-medium">{ticket.train.train_no}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancelBooking(ticket.ticket_id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
