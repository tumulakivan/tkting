import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getStickerApplications } from "../services/authService";
import ProfilePicture from "../assets/profile-ph.jpg";

interface User {
  idNumber: string;
  firstName: string;
  lastName: string;
  type: string;
  password?: string;
  parkingSlot?: null;
}

interface StickerApplication {
  applicationId: number;
  carMake: string;
  carModel: string;
  carColor: string;
  submissionDate: string;
  status: number;
  user: User;
  parkingSticker: ParkingSticker | null;
}

interface ParkingSticker {
  stickerId: number;
  carMake: string;
  carModel: string;
  carColor: string;
  issueDate: string;
  expiryDate: string;
  status: number;
  user: User;
  stickerApplication: StickerApplication;
  parkingSlot?: null;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [pendingApplications, setPendingApplications] = useState<
    StickerApplication[]
  >([]);
  const [processedApplications, setProcessedApplications] = useState<
    StickerApplication[]
  >([]);
  const displayName = user ? `${user.firstName} ${user.lastName}` : "Guest";
  const userType = user?.type ? `(${user.type})` : "";

  const formatCarDetails = (details: {
    carColor: string;
    carMake: string;
    carModel: string;
  }) => {
    return `${details.carColor} ${details.carMake} ${details.carModel}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return "Declined";
      case 1:
        return "Approved";
      case 2:
        return "Pending";
      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status: number) => {
    switch (status) {
      case 0:
        return "status-declined";
      case 1:
        return "status-approved";
      case 2:
        return "status-pending";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applications = await getStickerApplications();

        // Filter applications to show only those belonging to the current user
        const userApplications = applications.filter(
          (app) => app.user?.idNumber === user?.idNumber
        );

        // Separate pending from processed applications
        const pending = userApplications.filter((app) => app.status === 2);
        const processed = userApplications.filter(
          (app) => app.status === 0 || app.status === 1
        );

        setPendingApplications(pending);
        setProcessedApplications(processed);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };

    if (user) {
      fetchApplications();
    }
  }, [user]);

  return (
    <div className="profile">
      <div className="profile-banner">
        <div className="dp-container">
          <div className="dp">
            <img src={ProfilePicture} alt="profile" />
          </div>
          <h1>
            {displayName} <span className="user-type">{userType}</span>
          </h1>
        </div>
      </div>
      <div className="profile-content">
        <div className="spec-container">
          <h2>Pending Applications</h2>
          <div className="applications-list">
            {pendingApplications.map((application) => (
              <div key={application.applicationId} className="application-item">
                <div className="application-header">
                  <span className="application-id">
                    #{application.applicationId}
                  </span>
                  <div className="car-details">
                    {formatCarDetails(application)}
                    <span className="submission-date">
                      Submitted: {formatDate(application.submissionDate)}
                    </span>
                  </div>
                </div>
                <div className="application-right">
                  <span
                    className={`status-badge ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {getStatusText(application.status)}
                  </span>
                </div>
              </div>
            ))}
            {pendingApplications.length === 0 && (
              <p className="no-applications">No pending applications</p>
            )}
          </div>
        </div>
        <div className="history-container">
          <h2>Parking Stickers</h2>
          <div className="applications-list">
            {processedApplications.map((application) => (
              <div key={application.applicationId} className="application-item">
                <div className="application-header">
                  <span className="application-id">
                    #{application.applicationId}
                  </span>
                  <div className="application-details">
                    <div className="car-details">
                      {formatCarDetails(application)}
                      <span className="submission-date">
                        Submitted: {formatDate(application.submissionDate)}
                      </span>
                    </div>
                    {application.parkingSticker && application.status === 1 && (
                      <div className="expiry-details">
                        <span className="expiry-date">
                          Expires:{" "}
                          {formatDate(application.parkingSticker.expiryDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="application-right">
                  <span
                    className={`status-badge ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {getStatusText(application.status)}
                  </span>
                </div>
              </div>
            ))}
            {processedApplications.length === 0 && (
              <p className="no-applications">No parking stickers</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
