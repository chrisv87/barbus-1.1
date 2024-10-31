import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers: Array<{ lat: number; lng: number; title: string }>;
  followBus?: boolean;
}

const Map: React.FC<MapProps> = ({ center, zoom = 12, markers, followBus = true }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          version: "weekly",
          libraries: ["geometry"]
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [{ "color": "#242f3e" }]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [{ "color": "#242f3e" }]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{ "color": "#746855" }]
            }
          ]
        });

        // Create markers and path
        const bounds = new google.maps.LatLngBounds();
        
        markers.forEach((marker) => {
          const position = new google.maps.LatLng(marker.lat, marker.lng);
          
          new google.maps.Marker({
            position,
            map,
            title: marker.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#a855f7",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }
          });

          bounds.extend(position);
        });

        // Connect markers with lines
        if (markers.length > 1) {
          const path = markers.map(marker => ({ lat: marker.lat, lng: marker.lng }));
          
          new google.maps.Polyline({
            path,
            geodesic: true,
            strokeColor: "#a855f7",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            map
          });
        }

        // Fit map to show all markers
        map.fitBounds(bounds);
      } catch (err) {
        console.error('Error loading map:', err);
        setError("Failed to load map. Please try again later.");
      }
    };

    initMap();
  }, [center, zoom, markers]);

  if (error) {
    return (
      <div className="w-full h-[500px] rounded-lg bg-gray-900 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div ref={mapRef} className="w-full h-[500px] rounded-lg bg-gray-900" />
  );
};

export default Map;