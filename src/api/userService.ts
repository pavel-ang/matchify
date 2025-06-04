import useAxiosInstance from "./axiosInstance";
import { LocationDTO } from "../DTO/LocationDTO";
import { UserPreferencesDTO } from "../DTO/UserPreferencesDTO";

const useUserService = () => {
  const getAxios = useAxiosInstance();

  const createOrUpdateUser = async (
    auth0Id: string,
    location: LocationDTO,
    preferences: UserPreferencesDTO
  ) => {
    const axios = await getAxios();
    await axios.post("/users", {
      user: { auth0Id, location, preferences },
    });
  };

  const updateUserFullName = async (
    auth0Id: string,
    fullName: string
  ) => {
    const axios = await getAxios();
    await axios.patch(`/users/${auth0Id}/full-name`, {
      fullName,
    });
  };

  const getUserById = async (id: string) => {
  const getAxios = useAxiosInstance();
  const axios = await getAxios();

  const url = `https://matchify.info/api/users/${id}`;
  console.log("Fetching user by ID from:", url);

  const response = await axios.get(url);
  console.log("User response:", response.data);

  return response.data;
};

const getAllUsers = async () => {
  const getAxios = useAxiosInstance();
  const axios = await getAxios();

  const url = "https://matchify.info/api/users";
  console.log("Fetching all users from:", url);

  const response = await axios.get(url);
  console.log("All users response:", response.data);

  return response.data;
};
  const deleteUser = async () => {
  const instance = await getAxios();
  await instance.delete("/users/me");
};

  return {
    createOrUpdateUser,
    updateUserFullName,
    getUserById,
    getAllUsers,
    deleteUser,
  };
};

export default useUserService;
