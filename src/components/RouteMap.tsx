import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Stop {
  location: string;
  type: string;
  coordinates?: { lat: number; lng: number };
}

interface RouteMapProps {
  stops: Stop[];
  className?: string;
}

const GRAND_RAPIDS_CENTER = { lat: 42.9634, lng: -85.6681 };

// Replace these with actual coordinates for your stops
const STOP_COORDINATES = {
  "Allendale": { lat: 42.9720, lng: -85.9533 },
  "Joey's": { lat: 42.9634, lng: -85.6681 },
  "The B.O.B.": { lat: 42.9666, lng: -85.6695 },
  "O'Toole's": { lat: 42.9637, lng: -85.6688 }
};

const RouteMap: React.FC<RouteMapProps> = ({ stops, className = "w-full h-[400px]" }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly"
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: GRAND_RAPIDS_CENTER,
        zoom: 12,
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

      mapInstanceRef.current = map;

      // Add markers for each stop
      const bounds = new google.maps.LatLngBounds();
      const path: google.maps.LatLng[] = [];

      stops.forEach((stop, index) => {
        const coordinates = STOP_COORDINATES[stop.location as keyof typeof STOP_COORDINATES];
        if (!coordinates) return;

        const marker = new google.maps.Marker({
          position: coordinates,
          map,
          title: `${stop.location} (${stop.type})`,
          label: `${index + 1}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#a855f7",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }
        });

        bounds.extend(coordinates);
        path.push(new google.maps.LatLng(coordinates.lat, coordinates.lng));

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `<div class="p-2">
            <p class="font-semibold">${stop.location}</p>
            <p class="text-sm text-gray-600">${stop.type}</p>
          </div>`
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });

      // Draw route line
      new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: "#a855f7",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map
      });

      map.fitBounds(bounds);
    });
  }, [stops]);

  return <div ref={mapRef} className={className} />;
};

export default RouteMap;