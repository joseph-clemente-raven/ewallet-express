'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Define custom icons to avoid default icon issues
const originIcon = new L.Icon({
  iconRetinaUrl: 'origin.png',
  iconSize: [20, 20],
});

const destinationIcon = new L.Icon({
  iconRetinaUrl: 'origin.png',
  iconSize: [50, 50],
});

const userIcon = new L.Icon({
  iconRetinaUrl: 'location.gif',
  iconSize: [50, 50],
});

const logisticIcon = new L.Icon({
  iconRetinaUrl: 'driver.gif',
  iconSize: [50, 50],
});

const Map = () => {
  const [userLocation, setUserLocation] = useState(null); // Default to Manila
  const [route, setRoute] = useState([]); // For the polyline
  const [isCommuting, setIsCommuting] = useState(false);
  const [startLocation, setStartLocation] = useState([null]); // Store start location when commuting starts
  const [fareFee, setFareFee] = useState(0);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null); // Store the map instance

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          setLoading(false);
        },
        error => {
          setLoading(false);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
  
      return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    }
  }, [isCommuting]);
  
  // Update map center when userLocation changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(userLocation);
    }
  }, [userLocation]);

  // Function to calculate the fare based on distance
  const calculateFare = (distance) => {
    const baseFare = 13; // Minimum fare in pesos
    const extraDistance = Math.max(0, distance - 1); // Distance after the first kilometer
    return baseFare + extraDistance; // Fare: 13 pesos + 1 peso per additional km
  };

  // Function to start commuting
  const startCommuting = () => {
    if (userLocation) {
      setIsCommuting(true);
      setStartLocation(userLocation); // Save user's current location as the start point
    }
  };

  useEffect(() => {
    if (isCommuting && startLocation && userLocation) {
      // Fetch the route from openrouteservice API
      fetch(
        `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf624838f8fcc6d8164fbea6ed47296b12e22b&start=${startLocation[1]},${startLocation[0]}&end=${userLocation[1]},${userLocation[0]}`
      )
        .then(response => response.json())
        .then((data) => {
          const coordinates = data.features[0].geometry.coordinates.map(
            (coord) => [coord[1], coord[0]]
          );
          setRoute(coordinates);

          // Calculate distance from the route's summary
          const distance = data.features[0].properties.segments[0].distance / 1000; // in kilometers
          const fare = calculateFare(distance); // Calculate fare based on the distance
          setFareFee(fare.toFixed(2)); // Set fare with 2 decimal places
        })
        .catch(error => {
          console.error('Error fetching route:', error);
        });
    }
  }, [isCommuting, startLocation, userLocation]);

  // Function to end commuting
  const endCommuting = () => {
    setIsCommuting(false);

    // Alert the fare fee, origin, and destination
    alert(
      `Trip ended.\nFare Fee: ₱${fareFee}\nOrigin: Lat: ${startLocation[0].toFixed(4)}, Lon: ${startLocation[1].toFixed(4)}\nDestination: Lat: ${userLocation[0].toFixed(4)}, Lon: ${userLocation[1].toFixed(4)}`
    );
  };

  return (
    <div className='h-screen w-full relative'>
      <div className='w-full bottom-6 absolute flex flex-col py-2 items-center justify-center z-10'>
        <div className='mt-4'>  
          <p className='text-center text-2xl font-bold'>Fare Fee: ₱{fareFee}</p>
        </div>
        <div className='w-[90vw] sm:w-1/2 bg-white py-2 rounded-md flex flex-col sm:flex-row justify-start sm:justify-between items-center px-4'>
          <div className='text-left w-full sm:w-auto'>
            {userLocation && (
              <>
                <p className='font-bold'>Current Location:</p>
                <p>{`Lat: ${userLocation[0].toFixed(4)}, Lon: ${userLocation[1].toFixed(4)}`}</p>
              </>
            )}
          </div>
          {!isCommuting ? (
            <button
              onClick={startCommuting}
              className='bg-blue-500 text-white px-4 py-1 rounded-md'
            >
              Start Commuting
            </button>
          ) : (
            <>
              <div className='w-full sm:w-auto'>
                <p className='font-bold text-green-600'>Commute Started</p>
                {startLocation && (
                  <p>Start Location: Lat: {startLocation[0].toFixed(4)}, Lon: {startLocation[1].toFixed(4)}</p>
                )}
              </div>
              <button
                onClick={endCommuting}
                className='bg-red-500 text-white px-4 py-1 rounded-md mt-2'
              >
                End Commute
              </button>
            </>
          )}
        </div>
      </div>

      {
        loading &&
        <div className='w-full flex flex-col h-screen justify-center items-center'>  
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          <p>Fetching current location...</p>
        </div>
      }

      {
        userLocation &&
        <MapContainer
          center={userLocation}
          zoom={20}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
          whenCreated={mapInstance => {
            mapRef.current = mapInstance; // Store the map instance for controlling it later
          }}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Show markers and polyline only when commuting */}
          {(isCommuting && startLocation) ? (
            <>
              {/* Start location marker */}
              <Marker icon={originIcon} position={startLocation}>
                <Popup>Start Location</Popup>
              </Marker>

              {/* Current user location marker */}
              <Marker icon={logisticIcon} position={userLocation}>
                <Popup>Your Current Location</Popup>
              </Marker>

              {/* Polyline connecting the start location and current user location */}
              <Polyline positions={route} color='blue' />
            </>
          )
          :
            <Marker icon={userIcon} position={userLocation}>
              <Popup>Your Current Location</Popup>
            </Marker>
        
        }
        </MapContainer>
      }
    </div>
  );
};

export default Map;