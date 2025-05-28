
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Train } from '@/types';
import { SearchIcon, ClockIcon, MapPinIcon } from 'lucide-react';

interface TrainSearchProps {
  onTrainSelect: (train: Train) => void;
}

export const TrainSearch: React.FC<TrainSearchProps> = ({ onTrainSelect }) => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!source || !destination) return;
    
    setLoading(true);
    // Simulate API call to your Java backend
    setTimeout(() => {
      // Mock data based on your trains.json structure
      const mockTrains: Train[] = [
        {
          train_id: 'train1',
          train_no: '12345',
          seats: [[0, 0, 1, 0], [1, 0, 0, 1], [0, 1, 0, 0]],
          station_times: {
            [source]: '10:00',
            [destination]: '14:30'
          },
          stations: [source, destination]
        }
      ];
      setTrains(mockTrains);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Search Trains</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="From"
            placeholder="Source station"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <Input
            label="To"
            placeholder="Destination station"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <div className="flex items-end">
            <Button
              onClick={handleSearch}
              disabled={loading || !source || !destination}
              className="w-full flex items-center justify-center space-x-2"
            >
              <SearchIcon className="w-4 h-4" />
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Search Results */}
      {trains.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Available Trains</h3>
          {trains.map((train) => (
            <Card key={train.train_id} className="hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Train {train.train_no}
                    </h4>
                    <span className="text-sm text-gray-500">({train.train_id})</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{source}</span>
                    </div>
                    <span>→</span>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{destination}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>
                      {train.station_times[source]} - {train.station_times[destination]}
                    </span>
                  </div>
                </div>
                
                <Button onClick={() => onTrainSelect(train)}>
                  Select Train
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
