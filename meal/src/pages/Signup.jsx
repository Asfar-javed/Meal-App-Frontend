import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      navigate('/categories');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      {/* Left side with quote */}
      <div className="auth-left">
        <h1>Smart Meal Planner</h1>
        <p>
          “Eat smart, plan ahead. Your body will thank you later.”
        </p>
      </div>

      {/* Right side with form */}
      <div className="auth-right">
        <form className="auth-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>

          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  );
}
