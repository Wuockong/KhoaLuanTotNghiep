// src/App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ import

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("card_id")
  );

  useEffect(() => {
    const syncLoginState = () => {
      setIsLoggedIn(!!localStorage.getItem("card_id"));
    };
    window.addEventListener("storage", syncLoginState);
    return () => window.removeEventListener("storage", syncLoginState);
  }, []);

  return (
    <Router>
      {" "}
      <AuthProvider>
        {" "}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </AuthProvider>
    </Router>
  );
}

export default App;
