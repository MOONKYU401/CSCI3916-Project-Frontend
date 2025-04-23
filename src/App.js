// App.js
import React, { useState } from 'react';
import TopNav from './components/TopNav';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentCity, setCurrentCity] = useState('Denver');

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
    setCurrentCity('User location'); // TODO: Replace with actual location from user profile or API
  };

  const handleSearch = (city) => {
    setCurrentCity(city);
    alert(`🔍 Weather search for "${city}" is not connected yet.`);
  };

  return (
    <div>
      <TopNav
        onLogin={handleLogin}
        onSearch={handleSearch}
        loggedIn={loggedIn}
        username={username}
      />
      <CurrentWeather city={currentCity} />
      <HourlyForecast />
      <DailyForecast />
    </div>
  );
}

export default App;
