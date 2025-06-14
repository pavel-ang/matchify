import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useNotificationService from "../api/notificationService";

interface Location {
  city: string;
  country: string;
}

interface User {
  id: string;
  name: string;
  gender?: string;
  age?: number;
  interests?: string[];
  location: Location;
}

interface UserCardProps {
  user: User;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onDislike }) => {
  const { user: authUser } = useAuth0();
  const { sendNotification } = useNotificationService(); // ✅ use hook here

  const handleLike = async () => {
    onLike(user.id);

    if (authUser?.sub) {
      try {
        await sendNotification(user.id, authUser.sub, "like");
      } catch (err) {
        console.error("Failed to send notification:", err);
      }
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
      <h3>{user.name}</h3>
      <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
      {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
      {user.age !== undefined && <p><strong>Age:</strong> {user.age}</p>}
      {user.interests?.length ? (
        <p><strong>Interests:</strong> {user.interests.join(", ")}</p>
      ) : null}
      <button onClick={handleLike}>Like</button>
      <button onClick={() => onDislike(user.id)}>Dislike</button>
    </div>
  );
};

export default UserCard;
