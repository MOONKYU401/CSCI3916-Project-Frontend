// DailyForecast.js
import React from 'react';

const dummyDays = [
  { day: 'Today', high: 20, low: 7, icon: '☁️' },
  { day: 'Thu', high: 22, low: 9, icon: '🌤️' },
  { day: 'Fri', high: 15, low: 8, icon: '🌧️' },
  { day: 'Sat', high: 25, low: 9, icon: '🌤️' },
  { day: 'Sun', high: 27, low: 10, icon: '☀️' }
];

function DailyForecast() {
  return (
    <div className="daily-forecast">
      {dummyDays.map((day, index) => (
        <div key={index} className="day-row">
          <span>{day.day}</span>
          <span>{day.icon}</span>
          <span>{day.low}° / {day.high}°</span>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
