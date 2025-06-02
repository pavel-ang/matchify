import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { LocationDTO } from "../DTO/LocationDTO";
import { UserPreferencesDTO } from "../DTO/UserPreferencesDTO";

const useUserService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getAxiosInstance = async () => {
    const token = await getAccessTokenSilently();
    return axios.create({
      baseURL: "https://matchify.com/api",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const createOrUpdateUser = async (
    auth0Id: string,
    location: LocationDTO,
    preferences: UserPreferencesDTO
  ) => {
    const instance = await getAxiosInstance();
    await instance.post("/users", {
      user: { auth0Id, location, preferences },
    });
  };

  const updateUserFullName = async (
    auth0Id: string,
    fullName: string
  ) => {
    const instance = await getAxiosInstance();
    await instance.patch(`/users/${auth0Id}/full-name`, {
      fullName,
    });
  };

  const getUserById = async (id: string) => {
    const instance = await getAxiosInstance();
    const response = await instance.get(`/users/${id}`);
    return response.data;
  };

  const getAllUsers = async () => {
    const instance = await getAxiosInstance();
    const response = await instance.get("/users");
    return response.data;
  };

  return {
    createOrUpdateUser,
    updateUserFullName,
    getUserById,
    getAllUsers,
  };
};

export default useUserService;
