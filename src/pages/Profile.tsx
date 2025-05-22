import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated || !user) return <p>Please log in</p>;

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>
      <img src={user.picture} alt="Profile" style={{ borderRadius: "50%", width: 100 }} />
    </div>
  );
};

export default Profile;
