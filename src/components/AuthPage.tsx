import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (user.trim() === "" || password.trim() === "") {
      alert("All fields are required.");
      return;
    } else {
      navigate("/home", { state: { user } });
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="form">
          <h1>Sign In</h1>
          <div className="inputs">
            <label htmlFor="user-input">Username</label>
            <input
              className="user-input"
              id="user-input"
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <label htmlFor="pass-input">Password</label>
            <input
              className="user-input"
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="auth-btn" onClick={handleSignIn}>
            Sign In
          </button>
          <p>Don't have an account yet?</p>
        </div>
        <div className="graphic-wrapper">
          <h1>Welcome.</h1>
          <h2>Ready to park?</h2>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
