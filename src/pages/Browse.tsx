import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useSwipeService from "../api/swipeService";
import useUserService from "../api/userService";
import UserCard from "../components/UserCard";

interface User {
  id: string;
  name: string; // no longer optional
  location: {
    city: string;
    country: string;
  };
}


const Browse = () => {
  const { user } = useAuth0();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const { getAllUsers } = useUserService();
  const { sendSwipe } = useSwipeService();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetched = await getAllUsers();
        const mappedUsers = fetched.map((u: any) => ({
  id: u.id || u._id || u.auth0Id,
  name: u.name || u.fullName || "Unnamed",  // <- always resolves to string
  location: u.location ?? { city: "Unknown", country: "Unknown" },
}));
        setUsers(mappedUsers);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const handleLike = async (id: string) => {
    if (!user?.sub) return;
    try {
      await sendSwipe({ swiperId: user.sub, swipeeId: id, liked: true });
      alert("Liked the user!");
    } catch (err) {
      console.error(err);
      alert("Failed to like the user.");
    }
  };

  const handleDislike = async (id: string) => {
    if (!user?.sub) return;
    try {
      await sendSwipe({ swiperId: user.sub, swipeeId: id, liked: false });
      alert("Disliked the user.");
    } catch (err) {
      console.error(err);
      alert("Failed to dislike the user.");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Browse Users</h2>
      {users
        .filter((u) => u.id !== user?.sub)
        .map((u) => (
          <UserCard
            key={u.id}
            user={u}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        ))}
    </div>
  );
};

export default Browse;
