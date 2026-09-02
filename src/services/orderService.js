import axiosClient from "../api/axiosClient";

export const CUSTOMER_ORDERS = "/customer/orders";

export async function fetchCustomerOrders() {
  const { data } = await axiosClient.get(CUSTOMER_ORDERS);
  return data?.orders || data?.items || [];
}

export async function fetchCustomerOrder(orderId) {
  const { data } = await axiosClient.get(`${CUSTOMER_ORDERS}/${orderId}`);
  return data?.order || data;
}

export async function createCustomerOrder(payload) {
  const { data } = await axiosClient.post(CUSTOMER_ORDERS, payload);
  return data?.order || data;
}

export async function cancelCustomerOrder(orderId) {
  const { data } = await axiosClient.post(
    `${CUSTOMER_ORDERS}/${orderId}/cancel`
  );
  return data?.order || data;
}

export async function initiateOrderPayment(orderId) {
  const { data } = await axiosClient.post(
    `${CUSTOMER_ORDERS}/${orderId}/payment/initiate`
  );
  return data?.payment || data;
}

export async function fetchPaytmConfig() {
  const { data } = await axiosClient.get("/customer/payments/paytm/config");
  return data;
}
