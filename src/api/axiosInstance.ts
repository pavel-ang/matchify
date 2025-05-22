import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

/**
 * Custom hook to return an Axios instance with Auth0 Bearer token.
 */
const useAxiosInstance = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [instance, setInstance] = useState(() =>
    axios.create({
      baseURL: "http://localhost:8080/api", // 🔁 Adjust if needed
    })
  );

  useEffect(() => {
    const setup = async () => {
      try {
        const token = await getAccessTokenSilently();

        const authAxios = axios.create({
          baseURL: "http://localhost:8080/api",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInstance(authAxios);
      } catch (err) {
        console.error("Token fetch failed", err);
      }
    };

    setup();
  }, [getAccessTokenSilently]);

  return instance;
};

export default useAxiosInstance;
