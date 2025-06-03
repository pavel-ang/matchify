import useAxiosInstance from "./axiosInstance";

const useMessageService = () => {
  const getAxios = useAxiosInstance();

  const getChatHistory = async (user1Id: string, user2Id: string) => {
    const axios = await getAxios();
    const response = await axios.get(`/messages/${user1Id}/${user2Id}`);
    return response.data;
  };

  const sendMessage = async (message: {
    senderId: string;
    receiverId: string;
    content: string;
  }) => {
    const axios = await getAxios();
    const response = await axios.post("/messages", message);
    return response.data;
  };

  return { getChatHistory, sendMessage };
};

export default useMessageService;
