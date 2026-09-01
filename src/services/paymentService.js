import axiosClient from "../api/axiosClient";
import API_ENDPOINTS from "../api/endpoints";

/* =====================================================
   GET PAYMENTS
===================================================== */

export const getPayments = async (params = {}) => {
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.PAYMENTS,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "getPayments service error:",
      error
    );

    throw error;
  }
};