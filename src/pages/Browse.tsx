import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import useSwipeService from "../api/swipeService";
import useUserService from "../api/userService";
import UserCard from "../components/UserCard";

interface User {
  id: string;
  name: string;
  location: {
    city: string;
    country: string;
  };
}

const Browse = () => {
  const { user } = useAuth0();
  const [users, setUsers] = useState<User[]>([]);
  const { getAllUsers } = useUserService(); 
  const { sendSwipe } = useSwipeService();  

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, [getAllUsers]);

  const handleLike = (id: string) => {
    if (user?.sub) {
      sendSwipe({ swiperId: user.sub, swipeeId: id, liked: true });
    }
  };

  const handleDislike = (id: string) => {
    if (user?.sub) {
      sendSwipe({ swiperId: user.sub, swipeeId: id, liked: false });
    }
  };

  return (
    <div>
      <h2>Browse Users</h2>
      {users.map((u) => (
        <UserCard key={u.id} user={u} onLike={handleLike} onDislike={handleDislike} />
      ))}
    </div>
  );
};

export default Browse;
