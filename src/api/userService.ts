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
    const axios = await getAxios();
    const response = await axios.get(`/users/${id}`);
    return response.data;
  };

  const getAllUsers = async () => {
    const axios = await getAxios();
    const response = await axios.get("/users");
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
