import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherHome from "./pages/WeatherHome";
import TodayPage from "./pages/TodayPage";
import HourlyPage from "./pages/HourlyPage";
import TenDayPage from "./pages/TenDayPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./context/AuthContext";
import WeatherHeader from "./components/WeatherHeader";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("Denver");
  const [unit, setUnit] = useState("metric"); 

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <WeatherHeader
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setCity={setCity}
          unit={unit}
          setUnit={setUnit}
        />
        <Routes>
          <Route path="/" element={<WeatherHome darkMode={darkMode} city={city} unit={unit} />} />
          <Route path="/today" element={<TodayPage darkMode={darkMode} city={city} unit={unit} />} />
          <Route path="/hourly" element={<HourlyPage darkMode={darkMode} city={city} unit={unit} />} />
          <Route path="/10day" element={<TenDayPage darkMode={darkMode} city={city} unit={unit} />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
