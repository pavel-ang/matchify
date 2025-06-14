import React from "react";

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

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onDislike }) => (
  <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
    <h3>{user.name}</h3>
    <p><strong>Location:</strong> {user.location.city}, {user.location.country}</p>
    {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
    {user.age !== undefined && <p><strong>Age:</strong> {user.age}</p>}
    {user.interests?.length ? (
      <p><strong>Interests:</strong> {user.interests.join(", ")}</p>
    ) : null}
    <button onClick={() => onLike(user.id)}>Like</button>
    <button onClick={() => onDislike(user.id)}>Dislike</button>
  </div>
);

export default UserCard;
