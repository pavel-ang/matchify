import React from "react";

interface Match {
  name: string;
  location: {
    city: string;
    country: string;
  };
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => (
  <div>
    <h3>{match.name}</h3>
    <p>{match.location.city}, {match.location.country}</p>
  </div>
);

export default MatchCard;
