import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfileForm from './pages/ProfileForm';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<div className="container"><h2>Trang chủ Elderly</h2></div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
