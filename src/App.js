// App.js
import React, { useState } from 'react';
import TopNav from './components/TopNav';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import Register from './components/Register';

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentCity, setCurrentCity] = useState('Denver');
  const [showRegister, setShowRegister] = useState(false); // 👈 for toggling register form

  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
    setCurrentCity('User location'); // TODO: Replace with actual user location
    setShowRegister(false); // Hide register if open
  };

  const handleSearch = (city) => {
    setCurrentCity(city);
  };

  const handleSignupClick = () => {
    setShowRegister(true);
  };

  return (
    <div>
      <TopNav
        onLogin={handleLogin}
        onSearch={handleSearch}
        loggedIn={loggedIn}
        username={username}
        onSignupClick={handleSignupClick} // allow nav to trigger register
      />

      {showRegister && !loggedIn ? (
        <Register onRegisterSuccess={handleLogin} />
      ) : (
        <>
          <CurrentWeather city={currentCity} />
          <HourlyForecast />
          <DailyForecast />
        </>
      )}
    </div>
  );
}

export default App;
