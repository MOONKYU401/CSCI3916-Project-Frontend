import React, { useEffect, useState } from 'react';

function HourlyForecast({ city }) {
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHourly = async () => {
      if (!city) return;

      setLoading(true);
      try {
        const url = `https://weather-api-wksi.onrender.com/hourly?city=${city}`;
        const response = await fetch(url);
        const json = await response.json();

        if (json.success) {
          setHourly(json.hourly || []);
        } else {
          console.warn('No hourly data:', json.msg);
        }
      } catch (err) {
        console.error('Failed to fetch hourly data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHourly();
  }, [city]);

  if (loading) return <p>Loading hourly forecast...</p>;
  if (!hourly.length) return <p>No hourly data available.</p>;

  return (
    <div className="hourly-scroll">
      {hourly.map((hour, index) => (
        <div key={index} className="hour-card">
          <div>{hour.time}</div>
          <div>{hour.icon || '☁️'}</div>
          <div>{hour.temp}°</div>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;
