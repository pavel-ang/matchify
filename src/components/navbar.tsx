import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell"; // Adjust the path if needed

const Navbar = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <nav
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {isAuthenticated && (
        <>
          <Link to="/browse">Browse</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/profile">Profile</Link>
        </>
      )}

      {/* Spacer to push logout and bell to the right */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
        {isAuthenticated && <NotificationBell />}
        {isAuthenticated ? (
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Logout
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
