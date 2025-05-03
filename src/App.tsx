import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Welcome from './components/Welcome/Welcome';
import Home from './pages/home/Home';
import Awaken from './pages/Awaken/Awaken';
import './App.css';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
  };

  //here, later on with server and online implementation, 
  //will have to login or register an account and then log in with that username on that account

  if (!username) {
    return <Welcome onUsernameSubmit={handleUsernameSubmit} />;
  }

  return (
    <Router>
      <div className="game-container">
        <Navbar />
        <Sidebar />
        <main className="game-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/awaken" element={<Awaken />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
