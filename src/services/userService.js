import axiosClient from "../api/axiosClient";
import API_ENDPOINTS from "../api/endpoints";

/* =====================================================
   GET USERS
===================================================== */

export const getUsers = async (params = {}) => {
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.USERS,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "getUsers service error:",
      error
    );

    throw error;
  }
};

/* =====================================================
   GET SINGLE USER
===================================================== */

export const getUserById = async (id) => {
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.USER_BY_ID(id)
    );

    return response.data;
  } catch (error) {
    console.error(
      "getUserById service error:",
      error
    );

    throw error;
  }
};