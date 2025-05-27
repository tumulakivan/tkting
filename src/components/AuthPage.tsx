import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../services/authService";

const AuthPage: React.FC = () => {
  const { login } = useAuth();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    try {
      const { token, user } = await loginUser(idNumber, password);
      login(token, user);
      navigate("/home");
    } catch (error) {
      if (error instanceof Error && error.message === "User not found") {
        setError("User not found. Please check your ID number.");
      } else if (
        error instanceof Error &&
        error.message === "Invalid password"
      ) {
        setError("Invalid password. Please try again.");
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
      console.error("Login failed.", error);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="form">
          <h1>Sign In</h1>
          <form className="inputs" onSubmit={handleSubmit}>
            <label htmlFor="user-input">ID Number</label>
            <input
              className="user-input"
              id="user-input"
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
            />
            <label htmlFor="pass-input">Password</label>
            <input
              className="user-input"
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <button className="auth-btn" type="submit">
              Sign In
            </button>
          </form>
          <p onClick={() => navigate("/register")}>
            Don't have an account yet?
          </p>
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
