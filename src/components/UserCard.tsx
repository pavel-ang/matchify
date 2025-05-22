import React from "react";

interface User {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
}

interface UserCardProps {
  user: User;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onLike, onDislike }) => (
  <div>
    <h3>{user.name}</h3>
    <p>{user.location.city}, {user.location.country}</p>
    <button onClick={() => onLike(user.id)}>Like</button>
    <button onClick={() => onDislike(user.id)}>Dislike</button>
  </div>
);

export default UserCard;
