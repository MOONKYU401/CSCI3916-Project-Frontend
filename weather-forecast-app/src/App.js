import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherHome from "./pages/WeatherHome";
import TodayPage from "./pages/TodayPage";
import HourlyPage from "./pages/HourlyPage";
import TenDayPage from "./pages/TenDayPage";
import WeatherHeader from "./components/WeatherHeader";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("Denver");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Router>
      <WeatherHeader darkMode={darkMode} setDarkMode={setDarkMode} setCity={setCity} />
      <Routes>
        <Route path="/" element={<WeatherHome darkMode={darkMode} city={city} />} />
        <Route path="/today" element={<TodayPage darkMode={darkMode} city={city} />} />
        <Route path="/hourly" element={<HourlyPage darkMode={darkMode} city={city} />} />
        <Route path="/10day" element={<TenDayPage darkMode={darkMode} city={city} />} />
      </Routes>
    </Router>
  );
}

export default App;
