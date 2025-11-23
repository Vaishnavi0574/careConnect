import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "./store/useAuthStore";
import ProtectedRoute from "./ProtectedRoute";

import "./App.css";
import "./index.css";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Upgrade from "./Pages/Upgrade";
import UrgentRequest from "./Pages/UrgentRequest";
import SignUp from "./Pages/SignUp";

function App() {
  const { loadUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      console.log("🟦 Loading user on app mount...");
      await loadUser();
      setLoading(false);
    };
    initAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/newrequest/urgent"
          element={
            <ProtectedRoute>
              <UrgentRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/newrequest/nonurgent"
          element={
            <ProtectedRoute>
              <UrgentRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upgrade"
          element={
            <ProtectedRoute>
              <Upgrade />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
