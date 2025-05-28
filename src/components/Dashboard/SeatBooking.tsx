
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Train } from '@/types';
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-react';

interface SeatBookingProps {
  train: Train;
  onBack: () => void;
}

export const SeatBooking: React.FC<SeatBookingProps> = ({ train, onBack }) => {
  const [selectedSeat, setSelectedSeat] = useState<{row: number, col: number} | null>(null);
  const [booking, setBooking] = useState(false);

  const handleSeatClick = (row: number, col: number) => {
    if (train.seats[row][col] === 0) {
      setSelectedSeat({ row, col });
    }
  };

  const handleBooking = async () => {
    if (!selectedSeat) return;
    
    setBooking(true);
    // Simulate API call to your Java backend
    setTimeout(() => {
      console.log(`Booking seat ${selectedSeat.row}-${selectedSeat.col} on train ${train.train_id}`);
      setBooking(false);
      // You would update the seat status here
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Search
        </Button>
        <h2 className="text-xl font-semibold text-gray-800">
          Select Seat - Train {train.train_no}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seat Map */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Seat Layout</h3>
          <div className="space-y-2">
            {train.seats.map((row, rowIndex) => (
              <div key={rowIndex} className="flex space-x-2">
                <span className="w-8 text-sm text-gray-500 flex items-center justify-center">
                  {rowIndex + 1}
                </span>
                {row.map((seat, colIndex) => (
                  <button
                    key={colIndex}
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                    className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center text-sm font-medium ${
                      seat === 1
                        ? 'bg-red-100 border-red-300 text-red-600 cursor-not-allowed'
                        : selectedSeat?.row === rowIndex && selectedSeat?.col === colIndex
                        ? 'bg-blue-500 border-blue-600 text-white'
                        : 'bg-green-100 border-green-300 text-green-600 hover:bg-green-200'
                    }`}
                    disabled={seat === 1}
                  >
                    {seat === 1 ? '✕' : colIndex + 1}
                  </button>
                ))}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 border border-blue-600 rounded"></div>
              <span>Selected</span>
            </div>
          </div>
        </Card>

        {/* Booking Summary */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Train</label>
              <p className="text-gray-800">{train.train_no} ({train.train_id})</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Route</label>
              <p className="text-gray-800">
                {train.stations.join(' → ')}
              </p>
            </div>
            
            {selectedSeat && (
              <div>
                <label className="text-sm font-medium text-gray-600">Selected Seat</label>
                <p className="text-gray-800">
                  Row {selectedSeat.row + 1}, Seat {selectedSeat.col + 1}
                </p>
              </div>
            )}
            
            <Button
              onClick={handleBooking}
              disabled={!selectedSeat || booking}
              className="w-full flex items-center justify-center space-x-2"
            >
              <CheckCircleIcon className="w-4 h-4" />
              <span>{booking ? 'Booking...' : 'Confirm Booking'}</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
