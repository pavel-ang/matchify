import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage: React.FC = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  return (
    <div>
      {isLoading ? "Loading..." : "Redirecting to Auth0..."}
    </div>
  );
};

export default LoginPage;
