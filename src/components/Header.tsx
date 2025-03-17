import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const hide = ["/"];
  const navigate = useNavigate();
  const { theme } = useTheme();

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
            <p onClick={() => navigate("/profile")}>Profile</p>
          </div>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
