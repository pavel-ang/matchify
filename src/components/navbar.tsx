import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/chat" style={{ marginRight: "1rem" }}>
        Chat
      </Link>
      <Link to="/profile" style={{ marginRight: "1rem" }}>
        Profile
      </Link>

      {isAuthenticated ? (
        <button
          onClick={() => logout({
            logoutParams: {
              returnTo: window.location.origin
            }
          })
          }
          style={{ marginLeft: "auto" }}
        >
          Logout
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()} style={{ marginLeft: "auto" }}>
          Login
        </button>
      )}
    </nav>
  );
};

export default Navbar;
