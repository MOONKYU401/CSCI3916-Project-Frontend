import React, { useEffect, useState } from "react";

export default function TodayPage({ darkMode, city }) {
  const [data, setData] = useState(null);
  const API_KEY = "7e7356d8108a3783171e1c6dc965fe01";

  useEffect(() => {
    if (!city) return;
    const fetchData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      const json = await res.json();
      setData(json);
    };
    fetchData();
  }, [city]);

  if (!data) return <div className="page-wrapper">Loading...</div>;

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  const time = new Date(data.dt * 1000).toLocaleTimeString();

  return (
    <div className="page-wrapper" style={{ color: "var(--text-color)" }}>
      <h2>Today Weather Forecast for {city}</h2>
      <p>Local Time: {time}</p>

      <div style={{ marginTop: "20px" }}>
        <h3>🌡️ Current Conditions</h3>
        <p><strong>Temperature:</strong> {Math.round(data.main.temp)}°C</p>
        <p><strong>Feels Like:</strong> {Math.round(data.main.feels_like)}°C</p>
        <p><strong>Condition:</strong> {data.weather[0].description}</p>
        <p><strong>Cloud Coverage:</strong> {data.clouds.all}%</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>🌀 Atmospheric Info</h3>
        <p><strong>Pressure:</strong> {data.main.pressure} hPa</p>
        <p><strong>Humidity:</strong> {data.main.humidity}%</p>
        <p><strong>Visibility:</strong> {data.visibility / 1000} km</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>🌬️ Wind</h3>
        <p><strong>Speed:</strong> {data.wind.speed} m/s</p>
        <p><strong>Direction:</strong> {data.wind.deg}°</p>
        <p><strong>Gust:</strong> {data.wind.gust} m/s</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>🌅 Astronomical Info</h3>
        <p><strong>Sunrise:</strong> {sunrise}</p>
        <p><strong>Sunset:</strong> {sunset}</p>
      </div>
    </div>
  );
}
