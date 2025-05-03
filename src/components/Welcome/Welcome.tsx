import React, { useState } from 'react';
import './Welcome.css';

interface WelcomeProps {
  onUsernameSubmit: (username: string) => void;
}

const Welcome = ({ onUsernameSubmit }: WelcomeProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username.trim());
      onUsernameSubmit(username.trim());
    }
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Eternal Awaken</h1>
      <p>Before you begin your journey, tell us your name, hunter.</p>
      <form onSubmit={handleSubmit} className="welcome-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="username-input"
          minLength={3}
          maxLength={20}
          required
        />
        <button type="submit" className="submit-button">
          Begin Journey
        </button>
      </form>
    </div>
  );
};

export default Welcome;