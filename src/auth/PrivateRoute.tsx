import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import React, { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Wait here until Auth0 finishes loading
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
