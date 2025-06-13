import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateCard from './pages/CreateCard';
import LoginQR from './pages/LoginQR';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import TestForm_Nurses from './pages/TestForm_Nurses';
import Matching_Nurses from './pages/Matching_Nurses';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('card_id'));

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem('card_id'));
    };
    window.addEventListener('storage', syncLoginState);
    return () => window.removeEventListener('storage', syncLoginState);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginQR setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <CreateCard />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/testform-nurses" element={<TestForm_Nurses/>} />
        <Route path="/matching-nurses" element={<Matching_Nurses/>} />

      </Routes>
    </Router>
  );
}

export default App;
