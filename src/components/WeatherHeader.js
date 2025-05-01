import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./WeatherHeader.css";

export default function WeatherHeader({ darkMode, setDarkMode, setCity }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [savedCities, setSavedCities] = useState([]);
  const [showSavedCities, setShowSavedCities] = useState(false);

  const { authData, logout } = useAuth();
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

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
        setError("No matching city found.");
        return;
      }

      handleSuggestionClick(data[0]);
    } catch (err) {
      setError("Error fetching city data.");
      console.error(err);
    }
  };

  const handleSuggestionClick = (city) => {
    setCity(`${city.name},${city.state ? city.state + "," : ""}${city.country}`);
    setInput("");
    setSuggestions([]);
    setError("");
    setShowSavedCities(false);
    navigate("/");
  };

  const handleSavedCityClick = async () => {
    if (!authData?.token) {
      alert("Please sign in to access saved cities.");
      navigate("/signin");
      return;
    }
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/history`, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
  
      const data = await res.json();
      console.log("🔁 savedCities raw response:", data);
  
      if (res.ok) {
        setSavedCities(data); 
        setShowSavedCities(true);
      } else {
        alert(data.error || "Failed to load saved cities.");
      }
    } catch (err) {
      console.error("Error loading cities:", err);
      alert("Network error while loading saved cities.");
    }
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setShowSavedCities(false);
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteCity = async (cityToDelete) => {
    if (!authData?.token) {
      alert("You must be signed in to delete saved cities.");
      return;
    }
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/history`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({ city: cityToDelete }), 
      });
  
      const result = await res.json();
  
      if (res.ok) {
        setSavedCities((prev) => prev.filter((c) => c !== cityToDelete));
      } else {
        alert(result.error || "Failed to delete city.");
      }
    } catch (err) {
      console.error("Error deleting city:", err);
      alert("Network error while deleting city.");
    }
  };
  
  return (
    <header className="weather-header">
      <div className="top-bar">
        <div className="logo">The Weather Channel</div>
  
        {/* Search */}
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
  
        {/* Controls */}
        <div className="nav-controls">
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Night Mode"}
          </button>
  
          <div className="dropdown-wrapper">
            <button onClick={handleSavedCityClick}>📍 Saved City</button>
            {showSavedCities && Array.isArray(savedCities) && savedCities.length > 0 && (
              <div className="saved-city-dropdown">
                {savedCities.map((city, idx) => (
                  <div key={idx} className="saved-city-item">
                    <span
                      onClick={() => handleCitySelect(city)}
                      style={{ cursor: "pointer" }}
                    >
                      {city}
                    </span>
                    <button
                      onClick={() => handleDeleteCity(city)}
                      style={{
                        marginLeft: "10px",
                        color: "red",
                        background: "none",
                        border: "none",
                        cursor: "pointer"
                      }}
                      title="Delete"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        {/* Auth */}
        <div className="nav-controls">
          {authData ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/signin"><button>Sign In</button></Link>
              <Link to="/signup"><button>Sign Up</button></Link>
            </>
          )}
        </div>
      </div>
  
      {/* Error */}
      {error && (
        <div style={{ color: "red", marginTop: "10px", textAlign: "center", fontSize: "16px" }}>
          {error}
        </div>
      )}
  
      {/* Tabs */}
      <nav className="weather-tabs">
        <button className="tab-btn" onClick={() => navigate("/")}>Home</button>
        <button className="tab-btn" onClick={() => navigate("/today")}>Today</button>
        <button className="tab-btn" onClick={() => navigate("/hourly")}>Hourly</button>
        <button className="tab-btn" onClick={() => navigate("/10day")}>10 Day</button>
      </nav>
    </header>
  );
  
}
