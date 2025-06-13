import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CreateCard from "../pages/CreateCard";
import LoginQR from "../pages/LoginQR";
import Dashboard from "../pages/Dashboard";
import TestFormNurses from "../pages/TestFormNurses";
import MatchingNurses from "../pages/MatchingNurses";
import AttemptDetail from "../pages/AttemptDetail";
import ServiceLogForm from "../pages/ServiceLogForm";
import ContractForm from "../pages/ContractForm";
import MatchingPage from "../pages/MatchingPage";
import FeedbackPage from "../pages/FeedbackPage";
import TransactionPage from "../pages/TransactionPage";

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      {/* Trang đăng nhập mặc định */}
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

      {/* Tạo QR */}
      <Route
        path="/create-card"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <CreateCard />}
      />

      {/* Trang dashboard sau khi login */}
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
      />

      {/* Các trang chức năng cần login */}
      <Route
        path="/testform-nurses"
        element={isLoggedIn ? <TestFormNurses /> : <Navigate to="/" />}
      />
      <Route
        path="/matching-nurses"
        element={isLoggedIn ? <MatchingNurses /> : <Navigate to="/" />}
      />
      <Route
        path="/transaction"
        element={isLoggedIn ? <TransactionPage /> : <Navigate to="/" />}
      />
      <Route
        path="/feedback"
        element={isLoggedIn ? <FeedbackPage /> : <Navigate to="/" />}
      />
      <Route
        path="/service-log"
        element={isLoggedIn ? <ServiceLogForm /> : <Navigate to="/" />}
      />

      {/* Các route khác giữ nguyên */}
      <Route
        path="/attempt/:id"
        element={isLoggedIn ? <AttemptDetail /> : <Navigate to="/" />}
      />
      <Route
        path="/contract-form"
        element={isLoggedIn ? <ContractForm /> : <Navigate to="/" />}
      />
      <Route
        path="/matching/create"
        element={isLoggedIn ? <MatchingPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default AppRoutes;
