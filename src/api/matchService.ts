import { useAuth0 } from "@auth0/auth0-react";

const useMatchService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const token = await getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const baseUrl = "https://match-service-service:8083/api/matches";

  const getMatchesForUser = async (userId: string) => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}/${userId}`, { headers });
    return await response.json();
  };

  const createMatch = async (user1Id: string, user2Id: string) => {
    const headers = await getHeaders();
    const url = `${baseUrl}?user1Id=${encodeURIComponent(user1Id)}&user2Id=${encodeURIComponent(user2Id)}`;
    const response = await fetch(url, {
      method: "POST",
      headers,
    });
    return await response.json();
  };

  return { getMatchesForUser, createMatch };
};

export default useMatchService;
