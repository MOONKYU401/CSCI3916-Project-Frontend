import React, { useState } from "react";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    setMessage("");
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Account created!");
        navigate("/signin");
      } else {
        setMessage(data.error || "Sign up failed.");
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <div className="signin-container">
    <h2>Create Account</h2>
    <input
      type="text"
      name="username"
      placeholder="Username"
      value={form.username}
      onChange={handleChange}
      className="signin-input"
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      className="signin-input"
    />
    <button onClick={handleSignUp} className="signin-button">Sign Up</button>
    {message && <p className="signin-error">{message}</p>}
  </div>
);
}
