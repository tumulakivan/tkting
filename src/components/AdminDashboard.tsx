import React, { useEffect, useState } from "react";
import {
  getStickerApplications,
  updateApplicationStatus,
} from "../services/authService";

interface User {
  idNumber: string;
  firstName: string;
  lastName: string;
  type: "Student" | "Staff" | "Admin";
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

const AdminDashboard: React.FC = () => {
  const [applications, setApplications] = useState<StickerApplication[]>([]);
  const [error, setError] = useState<string>("");

  const formatCarDetails = (app: StickerApplication) => {
    return `${app.carColor} ${app.carMake} ${app.carModel}`;
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

  const handleApprove = async (application: StickerApplication) => {
    try {
      const updatedApplication = {
        ...application,
        status: 1,
      };
      const response = await updateApplicationStatus(
        application.applicationId,
        updatedApplication
      );
      // Update the local state with the response from the backend
      setApplications(
        applications.map((app) =>
          app.applicationId === application.applicationId ? response : app
        )
      );
      setError("");
    } catch (error) {
      setError("Failed to approve application. Please try again.");
      console.error("Failed to approve application:", error);
    }
  };

  const handleDecline = async (application: StickerApplication) => {
    try {
      const updatedApplication = { ...application, status: 0 };
      await updateApplicationStatus(
        application.applicationId,
        updatedApplication
      );
      // Update the local state to reflect the change
      setApplications(
        applications.map((app) =>
          app.applicationId === application.applicationId
            ? updatedApplication
            : app
        )
      );
      setError("");
    } catch (error) {
      setError("Failed to decline application. Please try again.");
      console.error("Failed to decline application:", error);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getStickerApplications();
        setApplications(data);
        setError("");
      } catch (error) {
        setError("Failed to fetch applications. Please refresh the page.");
        console.error("Failed to fetch applications:", error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-content">
        <div className="applications-section">
          <h2>Sticker Applications</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="applications-list">
            {applications.map((application) => (
              <div key={application.applicationId} className="application-item">
                <div className="application-header">
                  <span className="application-id">
                    #{application.applicationId}
                  </span>
                  <div className="application-details">
                    <div className="user-details">
                      {`${application.user.firstName} ${application.user.lastName} `}
                      <span className="user-type">
                        ({application.user.type})
                      </span>
                    </div>
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
                  {application.status === 2 && (
                    <div className="action-buttons">
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(application)}
                      >
                        Approve
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() => handleDecline(application)}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <p className="no-applications">No applications found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
