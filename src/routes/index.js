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
import PricePage from "../pages/PricePage";
import WithdrawPage from "../pages/WithdrawPage";
const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      {/* Trang mặc định */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/loginqr"} />}
      />
      {/* Trang đăng nhập bằng QR riêng biệt */}
      <Route
        path="/loginqr"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" />
          ) : (
            <LoginQR setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
      <Route
        path="/create-card"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <CreateCard />}
      />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/testform-nurses"
        element={isLoggedIn ? <TestFormNurses /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/matching-nurses"
        element={isLoggedIn ? <MatchingNurses /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/transaction"
        element={isLoggedIn ? <TransactionPage /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/feedback"
        element={isLoggedIn ? <FeedbackPage /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/service-log"
        element={isLoggedIn ? <ServiceLogForm /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/attempt/:id"
        element={isLoggedIn ? <AttemptDetail /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/contract-form"
        element={isLoggedIn ? <ContractForm /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/matching/create"
        element={isLoggedIn ? <MatchingPage /> : <Navigate to="/loginqr" />}
      />
      <Route
        path="/price"
        element={isLoggedIn ? <PricePage /> : <Navigate to="/loginqr" />}
      />{" "}
      <Route
        path="/withdraw"
        element={isLoggedIn ? <WithdrawPage /> : <Navigate to="/loginqr" />}
      />
    </Routes>
  );
};

export default AppRoutes;
