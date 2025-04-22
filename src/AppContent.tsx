import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";
import Profile from "./components/Profile";
import VehicleRegistration from "./components/VehicleRegistration";
import Dashboard from "./components/Dashboard";

const AppContent: React.FC = () => {
  const location = useLocation();
  const dynamicHeightPages = ["/profile"];
  const isDynamicHeightPage = dynamicHeightPages.includes(location.pathname);
  return (
    <>
      <Header />
      {/* Change page height for profile page only */}
      <div className={`${isDynamicHeightPage ? "dynamic-content" : "content"}`}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/register" element={<VehicleRegistration />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default AppContent;
