import React, { useEffect, useState } from 'react';

function DailyForecast({ city }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      if (!city) return;

      setLoading(true);
      try {
        const url = `https://csci3916-project-backend.onrender.com/forecast?city=${city}`;
        const response = await fetch(url);
        const json = await response.json();
        if (json.success) {
          setForecast(json.forecast || []);
        } else {
          console.warn('No forecast returned:', json.msg);
        }
      } catch (err) {
        console.error('Failed to fetch forecast:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  if (loading) return <p>Loading forecast...</p>;
  if (!forecast.length) return <p>No forecast available.</p>;

  return (
    <div className="daily-forecast">
      {forecast.map((day, index) => (
        <div key={index} className="day-row">
          <span>{day.day}</span>
          <span>{day.icon || '☁️'}</span>
          <span>{day.low}° / {day.high}°</span>
        </div>
      ))}
    </div>
  );
}

export default DailyForecast;
