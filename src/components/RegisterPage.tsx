import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userType, setUserType] = useState("Student");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userData = {
        firstName,
        lastName,
        userName: idNumber,
        password,
        idNumber,
        type: userType,
      };

      await registerUser(userData);
      // On successful registration, navigate to login page
      navigate("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed.", error);
    }
  };

  return (
    <>
      <div className="form-wrapper register-wrapper">
        <div className="form">
          <form className="inputs" onSubmit={handleSubmit}>
            <div className="credentials-section">
              <label htmlFor="id-input">ID Number</label>
              <input
                className="user-input"
                id="id-input"
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
              <label htmlFor="pass-input">Password</label>
              <input
                className="user-input"
                id="pass-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirm-pass-input">Confirm Password</label>
              <input
                className="user-input"
                id="confirm-pass-input"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="divider"></div>

            <div className="details-section">
              <label htmlFor="first-name-input">First Name</label>
              <input
                className="user-input"
                id="first-name-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <label htmlFor="last-name-input">Last Name</label>
              <input
                className="user-input"
                id="last-name-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <label htmlFor="user-type-select">User Type</label>
              <select
                className="user-input"
                id="user-type-select"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="Student">Student</option>
                <option value="Staff">Staff</option>
              </select>
            </div>

            {error && <p className="error-message">{error}</p>}
            <button className="auth-btn" type="submit">
              Register
            </button>
            <p onClick={() => navigate("/")}>Already have an account?</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
