import useAxiosInstance from "./axiosInstance";

const useMatchService = () => {
  const getAxios = useAxiosInstance();

  const getMatchesForUser = async (userId: string) => {
    const axios = await getAxios();
    const response = await axios.get(`/matches/${userId}`);
    return response.data;
  };

  const createMatch = async (user1Id: string, user2Id: string) => {
    const axios = await getAxios();
    const response = await axios.post("/matches", null, {
      params: { user1Id, user2Id },
    });
    return response.data;
  };

  return { getMatchesForUser, createMatch };
};

export default useMatchService;
