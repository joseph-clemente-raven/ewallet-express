'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Image from 'next/image';
import { imgSetup } from '@/helper';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/hooks/useContext';
import Link from 'next/link';

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
  const { fareFee, balance, setFareFee } = useGlobalContext();
  const [route, setRoute] = useState([]); // For the polyline
  const [isCommuting, setIsCommuting] = useState(false);
  const [startLocation, setStartLocation] = useState([null]); // Store start location when commuting starts
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null); // Store the map instance
  const navigate = useRouter()

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        position => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          if(!userLocation){
            startCommuting(newLocation) 
          }
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


  // Function to calculate the fare based on distance in meters
  const calculateFare = (distanceInMeters) => {
    const baseFare = 13; // Minimum fare in pesos
    const extraDistance = Math.max(0, distanceInMeters - 1); // Calculate extra distance beyond 1 meter
    const fare = baseFare + extraDistance; // Fare: 13 pesos + 1 peso per additional meter
    return fare;
  };

  // Function to start commuting
  const startCommuting = (location) => {
    setIsCommuting(true);
    setStartLocation(location); // Save user's current location as the start point
  };

  useEffect(() => {
    if (isCommuting && startLocation && userLocation) {
      // Fetch the route from the OpenRouteService API
      fetch(
        `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf624838f8fcc6d8164fbea6ed47296b12e22b&start=${startLocation[1]},${startLocation[0]}&end=${userLocation[1]},${userLocation[0]}`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates.map(
              coord => [coord[1], coord[0]]
            );
            setRoute(coordinates);
  
            // Get distance in meters from the route's summary
            const distanceInMeters = data.features[0].properties.segments[0].distance; // Distance in meters
            const fare = calculateFare(distanceInMeters); // Calculate fare based on distance in meters
            setFareFee(fare.toFixed(2)); // Set fare with 2 decimal places
          } else {
            console.warn('No route features found in response data.');
          }
        })
        .catch(error => {
          console.error('Error fetching route:', error);
        });
    }
  }, [isCommuting, startLocation, userLocation]);

  // Function to end commuting
  const endCommuting = () => {
    navigate.push('/payment-method')
  };

  return (
    <div className='h-screen w-full relative'>
      <div className={`w-full top-3 absolute mx-0 flex flex-row items-center justify-center z-10`}>
        <div className={`${isCommuting ? 'ml-8 w-[84%] sm:w-1/2' : 'left-4 w-[90%] sm:w-1/2'} py-2 px-6 bg-white flex items-center justify-between shadow-xl`}>
          <Link href={'/dashboard'}>
            <Image src={`${imgSetup}user.png`} className='rounded-full border-2 border-primary' alt='user' height={45} width={45} objectFit='contain' />
          </Link>
          <div className='relative text-right'>
            <p className='text-xs'>Balance</p>
            <p className='font-bold text-2xl text-primary'>₱{balance.toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className='w-full bottom-6 absolute flex flex-col py-2 items-center justify-center z-10'>
        <div className='mb-2 bg-secondary rounded-full py-1 px-4 shadow-xl'>  
          <p className='text-center text-2xl text-primary font-bold'>Fare Fee: ₱{fareFee}</p>
        </div>
        <div className='w-[90vw] shadow-xl lg:w-[80vw] xl:w-1/2 bg-white py-2 rounded-md flex flex-col sm:flex-row justify-start sm:justify-between items-center px-4'>
          <div className='text-left w-full sm:w-auto'>
            {userLocation && (
              <>
                <p className='font-bold'>Your Current Location:</p>
                <p>{`Latitude: ${userLocation[0].toFixed(4)}, Longitude: ${userLocation[1].toFixed(4)}`}</p>
              </>
            )}
          </div>
          {isCommuting && (
          //   <button
          //     onClick={startCommuting}
          //     className='bg-blue-500 text-white px-4 py-1 rounded-md'
          //   >
          //     Start Your Trip
          //   </button>
          // ) : (
            <>
              <div className='w-full sm:w-auto'>
                <p className='font-bold text-green-600'>Trip Started</p>
                {startLocation && (
                  <p>Starting Point: Latitude: {startLocation[0].toFixed(4)}, Longitude: {startLocation[1].toFixed(4)}</p>
                )}
              </div>
              <button
                onClick={endCommuting}
                className='bg-red-500 text-white px-4 py-1 rounded-md mt-2'
              >
                End Your Trip
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