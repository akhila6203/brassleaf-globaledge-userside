import axiosClient from "../api/axiosClient";
import API_ENDPOINTS from "../api/endpoints";

/* =====================================================
   GET CUSTOMERS
===================================================== */

export const getCustomers = async (params = {}) => {
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.CUSTOMERS,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "getCustomers service error:",
      error
    );

    throw error;
  }
};

/* =====================================================
   GET CUSTOMER
===================================================== */

export const getCustomerById = async (id) => {
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.CUSTOMER_BY_ID(id)
    );

    return response.data;
  } catch (error) {
    console.error(
      "getCustomerById service error:",
      error
    );

    throw error;
  }
};