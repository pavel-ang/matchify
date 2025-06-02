import useAxiosInstance from "./axiosInstance";

const useSwipeService = () => {
  const axios = useAxiosInstance();

  const sendSwipe = async (swipe: {
    swiperId: string;
    swipeeId: string;
    liked: boolean;
  }) => {
    if (!axios) return null;
    const response = await axios.post("/swipe", swipe);
    return response.data;
  };

  const getSwipesBySwiperId = async (swiperId: string) => {
    if (!axios) return null;
    const response = await axios.get(`/swipe/from/${swiperId}`);
    return response.data;
  };

  const getSwipesBySwipeeId = async (swipeeId: string) => {
    if (!axios) return null;
    const response = await axios.get(`/swipe/to/${swipeeId}`);
    return response.data;
  };

  return { sendSwipe, getSwipesBySwiperId, getSwipesBySwipeeId };
};

export default useSwipeService;
