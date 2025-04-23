// HourlyForecast.js
import React from 'react';

const dummyHours = [
  { time: 'Now', temp: 17 },
  { time: '2 PM', temp: 18 },
  { time: '3 PM', temp: 19 },
  { time: '4 PM', temp: 20 },
  { time: '5 PM', temp: 20 }
];

function HourlyForecast() {
  return (
    <div className="hourly-scroll">
      {dummyHours.map((hour, index) => (
        <div key={index} className="hour-card">
          <div>{hour.time}</div>
          <div>☁️</div>
          <div>{hour.temp}°</div>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;
