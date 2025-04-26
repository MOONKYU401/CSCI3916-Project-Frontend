// Register.js
import React, { useState } from 'react';
import { signupUser } from '../api';
import { Form, Button } from 'react-bootstrap';

function Register({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    location: ''
  });

  const updateDetails = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const register = async (e) => {
    e.preventDefault();
  
    console.log("📤 Sending signup data:", formData);
  
    try {
      const res = await signupUser(
        formData.username,
        formData.password,
        formData.name,
        formData.location
      );
  
      console.log("✅ Server response:", res);
  
      if (res.success) {
        alert("Registration successful!");
        onRegisterSuccess && onRegisterSuccess(formData.username);
      } else {
        alert(res.msg || "Registration failed.");
      }
    } catch (error) {
      console.error("❌ Signup error:", error);
      alert("Signup crashed: " + error.message);
    }
  };
  

  return (
    <div className="register-container">
      <Form onSubmit={register} className="register-form bg-dark text-light p-4 rounded">
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={updateDetails}
          />
        </Form.Group>

        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={formData.username}
            onChange={updateDetails}
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={updateDetails}
            autoComplete="current-password"
          />
        </Form.Group>

        <Form.Group controlId="location" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your location"
            value={formData.location}
            onChange={updateDetails}
          />
        </Form.Group>

        <Button type="submit" variant="primary">Register</Button>
      </Form>
    </div>
  );
}

export default Register;
