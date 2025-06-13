// src/routes/index.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateCard from "../pages/CreateCard";
import LoginQR from "../pages/LoginQR";
import Dashboard from "../pages/Dashboard";
import TestFormNurses from "../pages/TestFormNurses";
// import MatchingNurses from "../pages/MatchingNurses";
import AttemptDetail from "../pages/AttemptDetail";
import ServiceLogForm from "../pages/ServiceLogForm";
const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginQR setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/register"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <CreateCard />}
      />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route path="/testform-nurses" element={<TestFormNurses />} />
      {/* <Route path="/matching-nurses" element={<MatchingNurses />} /> */}
      <Route path="/attempt/:id" element={<AttemptDetail />} />
      <Route path="/service-log" element={<ServiceLogForm />} />
    </Routes>
  );
};

export default AppRoutes;
