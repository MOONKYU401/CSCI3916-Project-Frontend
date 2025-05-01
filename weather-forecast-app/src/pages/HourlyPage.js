// src/pages/HourlyPage.js
import React, { useEffect, useState } from "react";

export default function HourlyPage({ darkMode, city }) {
  const [hourlyData, setHourlyData] = useState([]);
  const API_KEY = "7e7356d8108a3783171e1c6dc965fe01";

  useEffect(() => {
    if (!city) return;

    const fetchHourly = async () => {
      const res = await fetch(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setHourlyData(data.list || []);
    };

    fetchHourly();
  }, [city]);

  if (!hourlyData || hourlyData.length === 0) {
    return <div className="page-wrapper">Loading hourly forecast for {city}...</div>;
  }

  return (
    <div className="page-wrapper" style={{ color: "var(--text-color)" }}>
      <h2>🕒 4-Day Hourly Forecast for {city}</h2>

      {hourlyData.map((hour, idx) => {
        const time = new Date(hour.dt * 1000);
        return (
          <div
            key={idx}
            style={{
              margin: "15px 0",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <h4>
              {time.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}{" "}
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </h4>
            <p>
              <strong>Temp:</strong> {Math.round(hour.main.temp)}°C (Feels like{" "}
              {Math.round(hour.main.feels_like)}°C)
            </p>
            <p><strong>Weather:</strong> {hour.weather[0].description}</p>
            <p><strong>Humidity:</strong> {hour.main.humidity}%</p>
            <p><strong>Clouds:</strong> {hour.clouds.all}%</p>
            <p><strong>Wind:</strong> {hour.wind.speed} m/s, {hour.wind.deg}°</p>
            <p><strong>Precipitation Probability:</strong> {Math.round(hour.pop * 100)}%</p>
          </div>
        );
      })}
    </div>
  );
}
