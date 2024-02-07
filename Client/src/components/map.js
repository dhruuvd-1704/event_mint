import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import * as OpenCage from 'opencage-api-client';

const SiteMap = () => {
  const centerPosition = [51.505, -0.09]; // Replace with the default coordinates of your site location
  const [userPosition, setUserPosition] = useState(null);
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    // Use the browser's geolocation API to get the current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);

          // Reverse geocode to get the address
          try {
            const response = await OpenCage.geocode({ q: `${latitude},${longitude}`, key: '6d93ea42fa824637910b14dea27574fa' });
            const firstResult = response.results[0];
            if (firstResult && firstResult.formatted) {
              setUserAddress(firstResult.formatted);
            }
          } catch (error) {
            console.error('Error getting user address:', error.message);
          }
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const markers = [
    { position: [51.505, -0.09], id: 1 },
    // Add more markers with their positions and unique IDs
  ];

  const customIcon = new L.divIcon({
    className: 'custom-marker-icon',
    html: '<div style="font-size: 20px; transform: rotate(45deg);">&#x25B2;</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  const userIcon = new L.divIcon({
    className: 'user-marker-icon',
    html: '<div style="color: green; font-size: 20px; transform: rotate(45deg);">&#x25B2;</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <div style={{ height: '100vh' }}>
      <MapContainer
        key={centerPosition.toString()}
        center={centerPosition}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={customIcon}
          >
            <Popup>Your Site Location {marker.id}</Popup>
          </Marker>
        ))}

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            {userAddress && <Popup>{userAddress}</Popup>}
          </Marker>
        )}

      </MapContainer>
    </div>
  );
};

export default SiteMap;

