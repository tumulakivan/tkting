import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const hide = ["/register"];
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="header">
      <h1 className="title" onClick={() => navigate("/home")}>
        <span
          className={`${theme === "dark" ? "title-motif-dark" : "title-motif"}`}
        >
          T
        </span>
        kting
      </h1>
      <div className="sub-header">
        {!hide.includes(location.pathname) && (
          <div className="navbar">
            <p onClick={() => navigate("/about")}>About Us</p>
            {location.pathname !== "/" && (
              <>
                {!isAdmin && (
                  <p onClick={() => navigate("/profile")}>Profile</p>
                )}
                {!isAdmin && (
                  <p onClick={() => navigate("/parking")}>Parking Map</p>
                )}
                {isAdmin && (
                  <p onClick={() => navigate("/admin")}>Admin Dashboard</p>
                )}
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
