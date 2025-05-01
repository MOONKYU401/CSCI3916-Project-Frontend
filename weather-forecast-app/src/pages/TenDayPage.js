// src/pages/TenDayPage.js
import React, { useEffect, useState } from "react";
import "./TodayPage.css";
export default function TenDayPage({ darkMode, city }) {
  const [forecast, setForecast] = useState([]);
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchForecast = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=10&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      setForecast(data.list);
    };
    fetchForecast();
  }, []);

  if (forecast.length === 0) return <div className="page-wrapper">Loading...</div>;

  return (
    <div className="page-wrapper" style={{ color: "var(--text-color)" }}>
      <h2>📅 10-Day Weather Forecast for {city}</h2>

      {forecast.map((day, idx) => {
        const date = new Date(day.dt * 1000);
        const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        return (
          <div
            key={idx}
            style={{
              borderBottom: "1px solid #ccc",
              margin: "20px 0",
              paddingBottom: "10px",
            }}
          >
            <h4>
              {date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </h4>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img src={iconUrl} alt="icon" width={50} />
              <div>
                <p><strong>{day.weather[0].main}</strong> — {day.weather[0].description}</p>
                <p><strong>Day Temp:</strong> {Math.round(day.temp.day)}°C (min: {Math.round(day.temp.min)}°C, max: {Math.round(day.temp.max)}°C)</p>
                <p><strong>Feels like:</strong> {Math.round(day.feels_like.day)}°C</p>
                <p><strong>Rain:</strong> {day.rain ? `${day.rain} mm` : '0 mm'}</p>
                <p><strong>Precipitation Probability:</strong> {Math.round(day.pop * 100)}%</p>
                <p><strong>Humidity:</strong> {day.humidity}%</p>
                <p><strong>Pressure:</strong> {day.pressure} hPa</p>
                <p><strong>Wind:</strong> {day.speed} m/s, {day.deg}°, gusts: {day.gust || 'N/A'} m/s</p>
                <p><strong>Cloud Cover:</strong> {day.clouds}%</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
