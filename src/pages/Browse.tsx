// Browse.tsx
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useSwipeService from "../api/swipeService";
import useUserService from "../api/userService";
import UserCard from "../components/UserCard";

interface User {
  id: string;
  name: string;
  gender?: string;
  age?: number;
  interests?: string[];
  location: {
    city: string;
    country: string;
  };
}

const Browse = () => {
  const { user, isLoading: authLoading } = useAuth0();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { browseUsers } = useUserService();
  const { sendSwipe } = useSwipeService();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetched = await browseUsers();
        const mappedUsers = fetched.map((u: any) => ({
          id: u.userId || u.id || u.auth0Id,
          name: u.fullName || u.name || "Unnamed",
          gender: u.gender ?? "Unknown",
          age: u.age ?? 0,
          interests: u.interests ?? [],
          location: u.location ?? { city: "Unknown", country: "Unknown" },
        }));
        setUsers(mappedUsers);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchUsers();
    }
  }, [authLoading]);

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

  if (authLoading || loading) return <p>Loading users...</p>;

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
