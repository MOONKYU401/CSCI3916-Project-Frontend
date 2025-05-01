import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WeatherHome.css";

export default function WeatherHome({ city }) {
  const [current, setCurrent] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  const API_KEY = "7e7356d8108a3783171e1c6dc965fe01";

  useEffect(() => {
    const mode = document.documentElement.getAttribute("data-theme");
    setIsDark(mode === "dark");

    const observer = new MutationObserver(() => {
      const newMode = document.documentElement.getAttribute("data-theme");
      setIsDark(newMode === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!city) return;
    const fetchWeatherData = async () => {
      try {
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        const currentData = await currentRes.json();

        const hourlyRes = await fetch(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        const hourlyData = await hourlyRes.json();

        const dailyRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/daily?q=${encodeURIComponent(city)}&cnt=3&appid=${API_KEY}&units=metric`
        );
        const dailyData = await dailyRes.json();

        setCurrent(currentData);
        setHourly(hourlyData.list.slice(0, 4));
        setDaily(dailyData.list);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
      }
    };

    fetchWeatherData();
  }, [city]);

  if (!current || hourly.length === 0 || daily.length === 0)
    return <div className="weather-home">Loading...</div>;

  const weather = {
    main: current.weather[0].main,
    city: current.name,
    region: current.sys.country,
    time: new Date(current.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }),
    temp: Math.round(current.main.temp),
    feelsLike: Math.round(current.main.feels_like),
    description: current.weather[0].description,
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    uv: "-",
    dewPoint: "-",
    pressure: current.main.pressure,
    visibility: current.visibility / 1000,
    sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString(),
    moonPhase: "-",
  };

  const backgroundImage =
    weather.main === "Clouds"
      ? "/images/cloudy.jpg"
      : weather.main === "Rain"
      ? "/images/rain.jpg"
      : "/images/clear.jpg";

  return (
    <div className="weather">
      <div
        className="weather-container"
        style={{
          backgroundImage: isDark ? "none" : `url(${backgroundImage})`,
          backgroundSize: isDark ? "auto" : "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <div className="weather-grid">
          <div className="weather-box weather-main">
            <h2>⛅ Current Weather for {city}</h2>
            <p className="time">{weather.time}</p>
            <h1>{weather.temp}°</h1>
            <p>{weather.description}</p>
            <p>Feels Like: {weather.feelsLike}°</p>
          </div>

          <div className="weather-box weather-details">
            <div className="detail-row">
              <div className="detail-section">
                <h4>🌡️ Temperature Info</h4>
                <p><strong>Humidity:</strong> {weather.humidity}%</p>
                <p><strong>Dew Point:</strong> {weather.dewPoint}°</p>
                <p><strong>UV Index:</strong> {weather.uv} of 11</p>
              </div>
              <div className="detail-section">
                <h4>🌀 Atmospheric Info</h4>
                <p><strong>Pressure:</strong> {weather.pressure} in</p>
                <p><strong>Visibility:</strong> {weather.visibility} km</p>
                <p><strong>Wind:</strong> {weather.windSpeed} m/s</p>
              </div>
            </div>

            <div className="detail-section">
              <h4>🌅 Astronomical Info</h4>
              <div className="sun-info">
                <p><strong>Sunrise:</strong> {weather.sunrise} 🌅</p>
                <p><strong>Sunset:</strong> {weather.sunset} 🌇</p>
              </div>
              <p><strong>Moon Phase:</strong> {weather.moonPhase}</p>
            </div>
          </div>
        </div>

        <div className="forecast-wrapper">
          <div className="weather-box forecast-box">
            <h3>🌤️ Next 4 Hours</h3>
            <div className="forecast-grid">
              {hourly.map((hour, index) => (
                <div key={index} className="forecast-card">
                  <p><strong>{new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></p>
                  <p>{Math.round(hour.main.temp)}°C</p>
                  <p>{hour.weather[0].main}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="weather-box forecast-box">
            <h3>📅 3-Day Forecast</h3>
            <div className="forecast-grid">
              {daily.map((day, index) => (
                <div key={index} className="forecast-card">
                  <p><strong>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong></p>
                  <p>🌡️ {Math.round(day.temp.day)}°C</p>
                  <p>{day.weather[0].main}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
