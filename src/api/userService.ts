import { useEffect, useState } from "react";
import useAxiosInstance from "./axiosInstance";

const useUserService = () => {
  const axios = useAxiosInstance();

  const createOrUpdateUser = async (auth0Id: string, location: any, preferences: any) => {
    const response = await axios.post("/users", {
      auth0Id,
      location,
      preferences,
    });
    return response.data;
  };

  const getUserById = async (id: string) => {
    const response = await axios.get(`/users/${id}`);
    return response.data;
  };

  const getAllUsers = async () => {
    const response = await axios.get("/users");
    return response.data;
  };

  return { createOrUpdateUser, getUserById, getAllUsers };
};

export default useUserService;
