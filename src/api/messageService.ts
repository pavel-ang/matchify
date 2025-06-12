import { useAuth0 } from "@auth0/auth0-react";

const useMessageService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const token = await getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const baseUrl = "http://message-service-service:8084/api/messages";

  const getChatHistory = async (user1Id: string, user2Id: string) => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}/${user1Id}/${user2Id}`, {
      headers,
    });
    return await response.json();
  };

  const sendMessage = async (message: {
    senderId: string;
    receiverId: string;
    content: string;
  }) => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers,
      body: JSON.stringify(message),
    });
    return await response.json();
  };

  return { getChatHistory, sendMessage };
};

export default useMessageService;
