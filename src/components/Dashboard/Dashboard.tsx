
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TrainSearch } from './TrainSearch';
import { BookingHistory } from './BookingHistory';
import { SeatBooking } from './SeatBooking';
import { Train } from '@/types';
import { 
  TrainIcon, 
  HistoryIcon, 
  LogOutIcon, 
  UserIcon,
  SearchIcon,
  TicketIcon
} from 'lucide-react';

type ActiveTab = 'search' | 'bookings' | 'seat-booking';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);

  const handleTrainSelect = (train: Train) => {
    setSelectedTrain(train);
    setActiveTab('seat-booking');
  };

  const navigationItems = [
    { id: 'search' as ActiveTab, label: 'Search Trains', icon: SearchIcon },
    { id: 'bookings' as ActiveTab, label: 'My Bookings', icon: TicketIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <TrainIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Railway Booking</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <UserIcon className="w-5 h-5" />
                <span className="font-medium">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOutIcon className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {activeTab === 'search' && (
            <TrainSearch onTrainSelect={handleTrainSelect} />
          )}
          
          {activeTab === 'bookings' && (
            <BookingHistory />
          )}
          
          {activeTab === 'seat-booking' && selectedTrain && (
            <SeatBooking 
              train={selectedTrain} 
              onBack={() => setActiveTab('search')}
            />
          )}
        </div>
      </div>
    </div>
  );
};
