// CurrentWeather.js
import React, { useEffect, useState } from 'react';
import { fetchWeatherByUsername } from '../api'; // make sure this exists

function CurrentWeather({ city, username }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      try {
        // Option 1: Use username if logged in
        if (username) {
          const data = await fetchWeatherByUsername(username);
          setWeatherData(data);
        } else {
          // Option 2: use default city weather
          const response = await fetch(
            `https://csci3916-project-backend.onrender.com/weather?city=${city}`
          );
          const json = await response.json();
          setWeatherData(json.weather || null);
        }
      } catch (err) {
        console.error('Failed to fetch weather:', err);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city, username]);

  if (loading) return <p>Loading current weather...</p>;
  if (!weatherData) return <p>Weather not available.</p>;

  return (
    <div className="weather-now">
      <h2>{weatherData.location?.toUpperCase()}</h2>
      <div className="temp">{weatherData.temperature}°C</div>
      <div className="description">{weatherData.condition || 'N/A'}</div>
    </div>
  );
}

export default CurrentWeather;
