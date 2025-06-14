import { useAuth0 } from "@auth0/auth0-react";
import { LocationDTO } from "../DTO/LocationDTO";
import { UserPreferencesDTO } from "../DTO/UserPreferencesDTO";

const useUserService = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getHeaders = async () => {
    const token = await getAccessTokenSilently();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const baseUrl = "/api/users";

  const createOrUpdateUser = async (
    auth0Id: string,
    location: LocationDTO,
    preferences: UserPreferencesDTO
  ) => {
    const headers = await getHeaders();
    await fetch(`${baseUrl}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ user: { auth0Id, location, preferences } }),
    });
  };

  const updateUserFullName = async (auth0Id: string, fullName: string) => {
    const headers = await getHeaders();
    await fetch(`${baseUrl}/${auth0Id}/full-name`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ fullName }),
    });
  };

  const updateSearchFilter = async (
    preferredGender: string,
    interests: string[],
    minAge: number,
    maxAge: number
  ) => {
    const headers = await getHeaders();
    await fetch(`${baseUrl}/preferences`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        preferredGender,
        interests,
        minAge,
        maxAge,
      }),
    });
  };

  const updateUserAttributes = async (
    gender: string,
    age: number,
    interests: string[]
  ) => {
    const headers = await getHeaders();
    await fetch(`${baseUrl}/attributes`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        gender,
        age,
        interests,
      }),
    });
  };

  const getUserById = async (id: string) => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}/${id}`, { headers });
    return await response.json();
  };
const getFullUserData = async () => {
  const headers = await getHeaders();
  const response = await fetch(`${baseUrl}/me/full`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch full user data");
  }

  return await response.json();
};

  const getAllUsers = async () => {
    const headers = await getHeaders();
    const response = await fetch(baseUrl, { headers });
    return await response.json();
  };

  const browseUsers = async () => {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}/browse`, {
      method: "GET",
      headers,
    });
    return await response.json();
  };

  const deleteUser = async () => {
    const headers = await getHeaders();
    await fetch(`${baseUrl}/me`, { method: "DELETE", headers });
  };

  return {
    createOrUpdateUser,
    updateUserFullName,
    updateSearchFilter,
    updateUserAttributes,
    getUserById,
    getAllUsers,
    deleteUser,
    browseUsers,
    getFullUserData,
  };
};

export default useUserService;
