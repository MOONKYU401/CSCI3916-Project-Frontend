// TopNav.js
import React, { useState } from 'react';
import { loginUser, signupUser } from '../api';

function TopNav({ onSearch, onLogin, loggedIn, username }) {
  const [searchCity, setSearchCity] = useState('');
  const [showForm, setShowForm] = useState(null); // 'login' | 'signup' | null

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    location: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchCity);
    setSearchCity('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(formData.username, formData.password);
    if (res.success) {
      alert('Login successful!');
      onLogin(formData.username);
      setShowForm(null);
      setFormData({ username: '', password: '', name: '', location: '' });
    } else {
      alert(res.msg || 'Login failed.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  const res = await signupUser(
    formData.username,
    formData.password,
    formData.name,
    formData.location
  );

  console.log('Signup response:', res); // 🔍 Add this line

  if (res.success) {
    alert('Signup successful!');
    setShowForm(null);
    setFormData({ username: '', password: '', name: '', location: '' });
  } else {
    alert(res.msg || 'Signup failed.');
  }
  };

  return (
    <div
      className="top-nav"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem'
      }}
    >
      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          flex: 1,
          maxWidth: '50%',
          gap: '10px'
        }}
      >
        <input
          type="text"
          className="search-input"
          placeholder="Enter city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            flex: 1,
            padding: '8px',
            height: '40px',
            boxSizing: 'border-box'
          }}
        />
        <button
          className="login-btn"
          type="submit"
          style={{ height: '40px' }}
        >
          Search
        </button>
      </form>

      {/* Authentication */}
      {!loggedIn ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {!showForm ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowForm('login')} className="login-btn">Sign In</button>
              <button onClick={() => setShowForm('signup')} className="login-btn">Sign Up</button>
            </div>
          ) : showForm === 'login' ? (
            <form
              onSubmit={handleLogin}
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
            >
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ height: '40px' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ height: '40px' }}
              />
              <button type="submit" className="login-btn" style={{ height: '40px' }}>Login</button>
              <button type="button" onClick={() => setShowForm(null)} style={{ height: '40px' }}>Cancel</button>
            </form>
          ) : (
            <form
              onSubmit={handleSignup}
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
            >
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ height: '40px' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ height: '40px' }}
              />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ height: '40px' }}
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{ height: '40px' }}
              />
              <button type="submit" className="login-btn" style={{ height: '40px' }}>Register</button>
              <button type="button" onClick={() => setShowForm(null)} style={{ height: '40px' }}>Cancel</button>
            </form>
          )}
        </div>
      ) : (
        <div style={{ fontWeight: 'bold', paddingTop: '8px' }}>
          Welcome, {username}!
        </div>
      )}
    </div>
  );
}

export default TopNav;
