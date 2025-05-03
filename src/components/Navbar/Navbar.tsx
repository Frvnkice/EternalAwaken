import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const NotificationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

const AccountIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M12 12c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" />
  </svg>
);

const getRankColor = (rank: string | null) => {
  switch (rank) {
    case 'E':
      return 'rank-e';
    case 'D':
      return 'rank-d';
    case 'C':
      return 'rank-c';
    case 'B':
      return 'rank-b';
    case 'A':
      return 'rank-a';
    case 'S':
      return 'rank-s';
    case 'Reawakened':
      return 'rank-reawakened';
    default:
      return 'rank-none';
  }
};

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const username = localStorage.getItem('username');
  const rank = localStorage.getItem('rank');
  const navigate = useNavigate();

  const handleAwakenClick = () => {
    navigate('/awaken');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-title">Eternal Awaken</Link>
        <div className="navbar-divider"></div>
        <button 
          className={`navbar-tab ${rank ? 'reevaluation' : ''}`}
          onClick={handleAwakenClick}
        >
          {rank ? 'Re-evaluation' : 'Awaken'}
        </button>
      </div>
      <div className="navbar-right">
        <div className="notification-icon">
          <NotificationIcon />
        </div>
        <div className={`rank-badge ${getRankColor(rank)}`}>
          {rank ? `${rank} Rank` : 'No Rank'}
        </div>
        <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
          <span className="navbar-username">{username}</span>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <AccountIcon />
                <span>Account</span>
              </div>
              <div className="dropdown-item">
                <SettingsIcon />
                <span>Settings</span>
              </div>
              <div className="dropdown-item logout">
                <LogoutIcon />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;