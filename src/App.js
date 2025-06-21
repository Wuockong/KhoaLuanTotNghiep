import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LoginQR from "./pages/LoginQR";
import CreateCard from "./pages/CreateCard";
import LoginElderly from "./pages/LoginElderly";
import RegisterElderly from "./pages/RegisterElderly";
import MatchingNurses from "./pages/MatchingNurses";
import TestFormNurses from "./pages/TestAttemptSwitcher";
import TransactionPage from "./pages/TransactionSwitcher";
import ServiceLogForm from "./pages/ServiceLogForm";
import FeedbackPage from "./pages/FeedbackPage";
import AttemptDetail from "./pages/AttemptDetail";
import ProfileFormElderly from "./pages/ProfileFormElderly";
import ProfileFormNurse from "./pages/Nurses/ProfileFormNurse";
import AccountElderly from "./pages/ProfileElderly";

// Các trang mới cho elderly
import Profile from "./pages/Elderly/Profile";
import Survey from "./pages/Elderly/Survey";
import Payment from "./pages/Elderly/Payment";
import History from "./pages/Elderly/History";
import Ratings from "./pages/Elderly/Ratings";
import Feedback from "./pages/Elderly/Feedback";
import Disputes from "./pages/Elderly/Disputes";
import MatchingPage1 from "./pages/Elderly/MatchingPage1";
import MatchingActions from './pages/Elderly/MatchingActions';
import EmergencyAlertForm from "./components/EmergencyAlertForm";
//import MatchingPage from "./pages/MatchingPage";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login-elderly" />}
        />

        {/* Đăng nhập / đăng ký */}
        <Route path="/login-elderly" element={<LoginElderly />} />
        <Route path="/register-elderly" element={<RegisterElderly />} />
        <Route path="/login-nurse" element={<LoginQR />} />
        <Route path="/register-nurse" element={<CreateCard />} />
        <Route path="/profile-elderly" element={<ProfileFormElderly />} />
        <Route path="/nurse" element={<ProfileFormNurse />} />

        {/* Trang chính */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account-elderly" element={<AccountElderly />} />
         <Route path="/alert" element={<EmergencyAlertForm />} />


        {/* Các trang mới cho elderly */}
        {role === "elderly" && (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/history" element={<History />} />
            <Route path="/ratings" element={<Ratings />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/disputes" element={<Disputes />} />
            <Route path="/matching" element={<MatchingPage1 />} />
            <Route path="/matching/actions" element={<MatchingActions />} />

          </>
        )}

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
