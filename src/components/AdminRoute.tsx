import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    // Redirect non-admin users to home page
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
