import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MatchCard from "../components/MatchCard";
import useMatchService from "../api/matchService";
import { Link } from "react-router-dom";

interface Match {
  user1Id: string;
  user2Id: string;
  location: {
    city: string;
    country: string;
  };
  name: string;
}

const Matches = () => {
  const { user } = useAuth0();
  const [matches, setMatches] = useState<Match[]>([]);
  const { getMatchesForUser } = useMatchService();

  useEffect(() => {
    if (user?.sub) {
      getMatchesForUser(user.sub).then(setMatches);
    }
  }, [user, getMatchesForUser]);

  return (
    <div>
      <h2>Your Matches</h2>
      {matches.map((match, index) => (
        <Link key={index} to={`/chat/${match.user2Id}`}>
          <MatchCard match={match} />
        </Link>
      ))}
    </div>
  );
};

export default Matches;
