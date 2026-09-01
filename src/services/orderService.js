import axiosClient from "../api/axiosClient";
import API_ENDPOINTS from "../api/endpoints";

/* =====================================================
   GET ORDERS
===================================================== */

export const getOrders = async (params = {}) => {
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.ORDERS,
      {
        params,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "getOrders service error:",
      error
    );

    throw error;
  }
};

/* =====================================================
   GET SINGLE ORDER
===================================================== */

export const getOrderById = async (id) => {
  try {
    const response = await axiosClient.get(
      API_ENDPOINTS.ORDER_BY_ID(id)
    );

    return response.data;
  } catch (error) {
    console.error(
      "getOrderById service error:",
      error
    );

    throw error;
  }
};