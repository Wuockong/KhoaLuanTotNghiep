// src/routes/index.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Dashboard from "../pages/Dashboard";
import LoginQR from "../pages/LoginQR";
import LoginElderly from "../pages/LoginElderly";
import RegisterElderly from "../pages/RegisterElderly";
import CreateCard from "../pages/CreateCard";
import TestFormNurses from "../pages/TestFormNurses";
import MatchingNurses from "../pages/MatchingNurses";
import AttemptDetail from "../pages/AttemptDetail";
import ServiceLogForm from "../pages/ServiceLogForm";
import ContractForm from "../pages/ContractForm";
import MatchingPage from "../pages/MatchingPage";
import FeedbackPage from "../pages/FeedbackPage";
import TransactionPage from "../pages/TransactionPage";
import PricePage from "../pages/PricePage";
import WithdrawPage from "../pages/WithdrawPage";

const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login-elderly" element={<LoginElderly />} />
        <Route path="/register-elderly" element={<RegisterElderly />} />
        <Route path="/loginqr" element={<LoginQR />} />
        <Route path="/register-nurse" element={<CreateCard />} />
        <Route path="/" element={<Navigate to="/login-elderly" />} />
        <Route path="*" element={<Navigate to="/login-elderly" />} />
      </Routes>
    );
  }

  if (user.role === "elderly") {
    return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <div className="container">
              <h2>Trang chủ Elderly</h2>
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    );
  }

  if (user.role === "nurse") {
    return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/testform-nurses" element={<TestFormNurses />} />
        <Route path="/matching-nurses" element={<MatchingNurses />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/service-log" element={<ServiceLogForm />} />
        <Route path="/attempt/:id" element={<AttemptDetail />} />
        <Route path="/contract-form" element={<ContractForm />} />
        <Route path="/matching/create" element={<MatchingPage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    );
  }

  // Fallback: nếu user có role lạ, chuyển về login-elderly
  return <Navigate to="/login-elderly" />;
};

export default AppRoutes;
