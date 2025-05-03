import React, { useState } from 'react';
import './Sidebar.css';

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12l9-9 9 9M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
  </svg>
);

const CharacterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const InventoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2" />
    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
    <path d="M12 7v14" />
    <path d="M8 12h8" />
  </svg>
);

const GatesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="8" ry="10" />
    <path d="M12 4C15 8 9 12 12 20" />
    <path d="M12 4C9 8 15 12 12 20" />
    <path d="M6 12C9 11 15 13 18 12" />
    <path d="M8 8.5C10 11 14 13 16 15.5" />
    <path d="M8 15.5C10 13 14 11 16 8.5" />
    <path d="M7 12C11 12 13 12 17 12" />
  </svg>
);

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav 
      className={`sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="sidebar-nav">
        <li className="sidebar-item active">
          <span className="sidebar-icon"><HomeIcon /></span>
          <span className="sidebar-text">Home</span>
        </li>
        <li className="sidebar-item">
          <span className="sidebar-icon"><CharacterIcon /></span>
          <span className="sidebar-text">Character</span>
        </li>
        <li className="sidebar-item">
          <span className="sidebar-icon"><InventoryIcon /></span>
          <span className="sidebar-text">Inventory</span>
        </li>
        <li className="sidebar-item">
          <span className="sidebar-icon"><GatesIcon /></span>
          <span className="sidebar-text">Gates</span>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;