import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { submitStickerApplication } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [error, setError] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be logged in to submit an application");
      return;
    }

    try {
      const applicationData = {
        carMake,
        carModel,
        carColor,
      };

      console.log("Sending application data:", applicationData);
      await submitStickerApplication(applicationData, user.idNumber);
      // Clear form after successful submission
      setCarMake("");
      setCarModel("");
      setCarColor("");
      // TODO: Add success message or redirect
    } catch (error) {
      setError("Failed to submit application. Please try again.");
      console.error("Submission failed.", error);
    }
  };

  // Don't render the form if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="form-wrapper register-wrapper">
      <div className="form">
        <h1>Sticker Parking Application</h1>
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="credentials-section">
            <label htmlFor="car-make-input">Car Make</label>
            <input
              className="user-input"
              id="car-make-input"
              type="text"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
              required
            />
            <label htmlFor="car-model-input">Car Model</label>
            <input
              className="user-input"
              id="car-model-input"
              type="text"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
            />
            <label htmlFor="car-color-input">Car Color</label>
            <input
              className="user-input"
              id="car-color-input"
              type="text"
              value={carColor}
              onChange={(e) => setCarColor(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          <button className="auth-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
