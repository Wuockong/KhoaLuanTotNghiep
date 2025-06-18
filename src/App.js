import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LoginQR from "./pages/LoginQR";
import CreateCard from "./pages/CreateCard";
import LoginElderly from "./pages/LoginElderly";
import RegisterElderly from "./pages/RegisterElderly";
import MatchingNurses from "./pages/MatchingNurses";
import TestFormNurses from "./pages/TestAttempt/TestFormNurses";
import TransactionPage from "./pages/transactions/TransactionPage";
import ServiceLogForm from "./pages/ServiceLogForm";
import FeedbackPage from "./pages/FeedbackPage";
import AttemptDetail from "./pages/AttemptDetail";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />
      <Routes>
        {/* Trang mặc định: nếu đã đăng nhập thì vào dashboard, chưa thì vào login elderly */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login-elderly" />} />

        {/* Đăng nhập / đăng ký */}
        <Route path="/login-elderly" element={<LoginElderly />} />
        <Route path="/register-elderly" element={<RegisterElderly />} />
        <Route path="/login-nurse" element={<LoginQR />} />
        <Route path="/register-nurse" element={<CreateCard />} />

        {/* Trang chính */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Chức năng dành cho nurse */}
        {role === "nurse" && (
          <>
            <Route path="/test" element={<TestFormNurses />} />
            <Route path="/matching" element={<MatchingNurses />} />
            <Route path="/transaction" element={<TransactionPage />} />
            <Route path="/servicelog" element={<ServiceLogForm />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/attempt-detail" element={<AttemptDetail />} />
          </>
        )}

        {/* Mặc định chuyển về dashboard nếu không khớp */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
