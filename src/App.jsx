import { useEffect, useState } from 'react';
import './index.css';

export default function App() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  // Ask for location permission and fetch coordinates
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError('Failed to get location: ' + err.message);
      }
    );
  };

  // Request notification permission and push notification
  const sendNotification = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Hello from your test app!', {
          body: 'This is a test I repeat its a test!!.',
        });
      } else {
        alert('Notification permission denied.');
      }
    });
  };

  useEffect(() => {
    // Optional: auto-trigger on load
    getLocation();
  }, []);

  return (
    <div className="container">
      <h1>PWA Notification + Location Demo</h1>
      <div className="button-group">
        <button onClick={getLocation} className="blue-btn">
          Get Location
        </button>
        <button onClick={sendNotification} className="green-btn">
          Send Notification
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
