import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Map from '../components/Map';

interface Stop {
  name: string;
  lat: number;
  lng: number;
  estimatedTime: string;
}

interface Event {
  name: string;
  date: string;
  stops: Stop[];
  description: string;
  price: string;
}

export default function RoutesPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const weekendRoute = {
    name: "Weekend Party Route",
    duration: "8 hours",
    schedule: "Fridays & Saturdays",
    price: "$5 per pickup, $30 for the night",
    stops: [
      { name: "Allendale", lat: 42.9720, lng: -85.9533, estimatedTime: "8:00 PM" },
      { name: "Joey's", lat: 42.9634, lng: -85.6681, estimatedTime: "8:30 PM" },
      { name: "The B.O.B.", lat: 42.9666, lng: -85.6695, estimatedTime: "9:00 PM" },
      { name: "O'Toole's", lat: 42.9637, lng: -85.6688, estimatedTime: "9:30 PM" }
    ]
  };

  const currentRoute = selectedEvent || weekendRoute;
  const mapMarkers = currentRoute.stops.map(stop => ({
    lat: stop.lat,
    lng: stop.lng,
    title: `${stop.name} - ${stop.estimatedTime}`
  }));

  return (
    <div className="min-h-screen pt-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {currentRoute.name}
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            Hop on our continuous loop between Allendale and Downtown GR's hottest spots!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Route Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20"
          >
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold mb-3">Route Info</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>8PM - 4AM</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span>{currentRoute.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span>Continuous loop service</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-3">Stops</h2>
                <div className="space-y-2">
                  {currentRoute.stops.map((stop, index) => (
                    <div key={stop.name} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{stop.name}</p>
                        <p className="text-xs text-gray-400">{stop.estimatedTime}</p>
                      </div>
                      {index < currentRoute.stops.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-purple-500" />
                      )}
                    </div>
                  ))}
                  <div className="flex justify-center mt-1">
                    <ArrowRight className="w-3 h-3 text-purple-500 rotate-[270deg]" />
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center"
            >
              <Link
                to="/signup"
                className="inline-block px-4 py-2 bg-purple-600 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                Get Updates
              </Link>
            </motion.div>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2 rounded-lg overflow-hidden h-[500px]"
          >
            <Map 
              center={{ lat: 42.9634, lng: -85.7681 }}
              markers={mapMarkers}
              followBus={true}
              zoom={12}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}