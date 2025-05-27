import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCard from './pages/CreateCard';
import LoginQR from './pages/LoginQR';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateCard />} />
        <Route path="/login" element={<LoginQR />} />
      </Routes>
    </Router>
  );
}

export default App;