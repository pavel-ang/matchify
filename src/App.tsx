import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import ChatPage from "./pages/Chat";
import MatchesPage from "./pages/Matches";
import BrowsePage from "./pages/Browse";
import Navbar from "./components/navbar";
import PrivateRoute from "./auth/PrivateRoute";

// Layout for authenticated pages
const AuthenticatedLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// Handles routing + loading state
const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/profile" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated routes with layout */}
      <Route
        element={
          <PrivateRoute>
            <AuthenticatedLayout />
          </PrivateRoute>
        }
      >
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Route>
    </Routes>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
