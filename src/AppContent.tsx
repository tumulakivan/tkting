import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ParkingMap from "./components/ParkingMap";
import AboutUs from "./components/AboutUs";

const AppContent: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const dynamicHeightPages = ["/profile", "/about"];
  const isDynamicHeightPage = dynamicHeightPages.includes(location.pathname);

  return (
    <>
      <Header />
      <div className={`${isDynamicHeightPage ? "dynamic-content" : "content"}`}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/home"
            element={isAdmin ? <Navigate to="/admin" replace /> : <Home />}
          />
          <Route
            path="/profile"
            element={isAdmin ? <Navigate to="/admin" replace /> : <Profile />}
          />
          <Route path="/parking" element={<ParkingMap />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppContent;
