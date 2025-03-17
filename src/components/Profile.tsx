import React from "react";
import ProfilePicture from "../assets/profile-ph.jpg";

const Profile: React.FC = () => {
  return (
    <div className="profile">
      <div className="profile-banner">
        <div className="dp-container">
          <div className="dp">
            <img src={ProfilePicture} alt="profile" />
          </div>
          <h1>Ivan Tumulak</h1>
        </div>
      </div>
      <div className="profile-content">
        <div className="spec-container">
          <p>Parking Statistics here</p>
        </div>
        <div className="history-container">
          <p>Parking History</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
