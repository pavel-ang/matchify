import { useAuth0 } from "@auth0/auth0-react";
import {useEffect} from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();

useEffect(() => {
  getAccessTokenSilently().then(token => {
    console.log("Access Token:", token);
  });
}, []);

  if (!isAuthenticated || !user) return <p>Please log in</p>;

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>
      <img src={user.picture} alt="profile" />
    </div>
  );
  
};

export default Profile;
