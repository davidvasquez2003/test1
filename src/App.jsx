import { useState } from 'react';
import './index.css';

export default function App() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  const checkIn = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoords(newCoords);
        setError(null);

        if ('Notification' in window) {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification('Check-In Successful!', {
                body: `Latitude: ${newCoords.latitude}, Longitude: ${newCoords.longitude}`,
              });
            }
          });
        }
      },
      (err) => {
        setError('Failed to get location: ' + err.message);
      }
    );
  };

  return (
    <div className="container">
      <h1>Truck Driver Check-In</h1>
      <div className="button-group">
        <button onClick={checkIn} className="blue-btn">
          Check In
        </button>
      </div>

      {coords && (
        <div className="info">
          <p>Latitude: {coords.latitude}</p>
          <p>Longitude: {coords.longitude}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
