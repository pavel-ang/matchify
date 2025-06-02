import useAxiosInstance from "./axiosInstance";

const useMatchService = () => {
  const axios = useAxiosInstance();

  const getMatchesForUser = async (userId: string) => {
    if (!axios) return null;
    const response = await axios.get(`/matches/${userId}`);
    return response.data;
  };

  const createMatch = async (user1Id: string, user2Id: string) => {
    if (!axios) return null;
    const response = await axios.post("/matches", null, {
      params: { user1Id, user2Id },
    });
    return response.data;
  };

  return { getMatchesForUser, createMatch };
};

export default useMatchService;
