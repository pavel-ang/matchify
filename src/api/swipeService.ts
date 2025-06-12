import { useAuth0 } from "@auth0/auth0-react";

const useSwipeService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const token = await getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const baseUrl = `${window.location.origin}/api/swipe`;

  const sendSwipe = async (swipe: {
    swiperId: string;
    swipeeId: string;
    liked: boolean;
  }) => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers,
      body: JSON.stringify(swipe),
    });
    return await response.json();
  };

  const getSwipesBySwiperId = async (swiperId: string) => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}/from/${swiperId}`, { headers });
    return await response.json();
  };

  const getSwipesBySwipeeId = async (swipeeId: string) => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}/to/${swipeeId}`, { headers });
    return await response.json();
  };

  return { sendSwipe, getSwipesBySwiperId, getSwipesBySwipeeId };
};

export default useSwipeService;
