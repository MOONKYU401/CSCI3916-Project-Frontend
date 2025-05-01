import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WeatherHeader.css";

export default function WeatherHeader({ darkMode, setDarkMode, setCity }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
      return;
    }
    if (!input.trim()) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.length === 0) {
        setError("⚠️ No matching city found.");
        return;
      }

      const matchedCity = data[0];
      setCity(`${matchedCity.name},${matchedCity.state ? matchedCity.state + ',' : ''}${matchedCity.country}`);
      setError("");
      setInput("");
      setSuggestions([]);
      navigate("/");
    } catch (err) {
      setError("❌ Error fetching city data.");
      console.error(err);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);
    setError("");

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
      );
      const data = await res.json();
      const usCities = data.filter((city) => city.country === "US");
      setSuggestions(usCities);
    } catch (err) {
      console.error("Autocomplete error", err);
    }
  };

  const handleSuggestionClick = (city) => {
    setCity(`${city.name},${city.state ? city.state + ',' : ''}${city.country}`);
    setInput("");
    setSuggestions([]);
    setError("");
    navigate("/");
  };

  return (
    <header className="weather-header">
      <div className="top-bar">
        <div className="logo">The Weather Channel</div>

        <form onSubmit={handleSearch} className="search-form" autoComplete="off" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search City"
            value={input}
            onChange={handleInputChange}
            className="search-input"
          />
          {suggestions.length > 0 && (
            <ul className="suggestion-dropdown">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(city)}
                >
                  {city.name}, {city.state ? city.state + ", " : ""}{city.country}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="nav-controls">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Night Mode"}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ color: "red", marginTop: "10px", textAlign: "center", fontSize: "16px" }}>{error}</div>
      )}

      <nav className="weather-tabs">
        <button className="tab-btn" onClick={() => navigate("/")}>Home</button>
        <button className="tab-btn" onClick={() => navigate("/today")}>Today</button>
        <button className="tab-btn" onClick={() => navigate("/hourly")}>Hourly</button>
        <button className="tab-btn" onClick={() => navigate("/10day")}>10 Day</button>
      </nav>
    </header>
  );
}