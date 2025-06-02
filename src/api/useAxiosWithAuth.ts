import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useAxiosWithAuth = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [instance, setInstance] = useState(() =>
    axios.create({
      baseURL: "http://localhost:8080/api", // Adjust if needed
    })
  );

  useEffect(() => {
    const setup = async () => {
      try {
        const token = await getAccessTokenSilently();

        const authAxios = axios.create({
          baseURL: "http://localhost:8080/api", // same base
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInstance(authAxios);
      } catch (error) {
        console.error("Failed to set up Axios with Auth:", error);
      }
    };

    setup();
  }, [getAccessTokenSilently]);

  return instance;
};

export default useAxiosWithAuth;
