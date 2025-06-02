import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import ChatPage from "./pages/Chat";
import MatchesPage from "./pages/Matches";
import BrowsePage from "./pages/Browse";
import Navbar from "./components/navbar";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />
        }/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={
          <PrivateRoute><ProfilePage /></PrivateRoute>
        }/>
        <Route path="/chat" element={
          <PrivateRoute><ChatPage /></PrivateRoute>
        }/>
        <Route path="/matches" element={
          <PrivateRoute><MatchesPage /></PrivateRoute>
        }/>
        <Route path="/browse" element={
          <PrivateRoute><BrowsePage /></PrivateRoute>
        }/>
      </Routes>
    </Router>
  );
};

export default App;
