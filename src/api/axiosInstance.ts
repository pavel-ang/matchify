import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useAxiosInstance = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createAxiosInstance = async () => {
    const token = await getAccessTokenSilently();

    return axios.create({
      baseURL: "https://matchify.info/api",
      headers: {
        Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
      },
    });
  };

  return createAxiosInstance;
};

export default useAxiosInstance;
