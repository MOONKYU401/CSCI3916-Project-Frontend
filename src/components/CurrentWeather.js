// CurrentWeather.js
import React from 'react';

function CurrentWeather({ data }) {
  console.log('CurrentWeather received:', data);

  if (!data) return <p>Loading...</p>; //test

  return (
    <div className="weather-now">
      <h2>{data.location?.toUpperCase()}</h2>
      <div className="temp">{data.temperature}°C</div>
      <div className="description">{data.condition || 'N/A'}</div>
    </div>
  );
}

export default CurrentWeather;
