import axios from "axios";

const axiosClient =
  axios.create({
    baseURL:
      import.meta.env
        .VITE_API_BASE_URL ||
      "/api",

    /*
     * CRITICAL:
     * Sends HttpOnly login cookie.
     */
    withCredentials: true,

    headers: {
      "Content-Type":
        "application/json",

      Accept:
        "application/json",
    },

    timeout: 15000,
  });

axiosClient.interceptors.response.use(
  (response) =>
    response,

  (error) => {
    if (
      import.meta.env.DEV &&
      error.response?.status !==
        404
    ) {
      console.error(
        "API Error:",
        error.response?.status,
        error.response?.data
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default axiosClient;



// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   timeout: 15000,
// });

// axiosClient.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const apiMessage =
//       error.response?.data?.error ||
//       error.response?.data?.message ||
//       null;

//     if (import.meta.env.DEV && status !== 404) {
//       if (error.response) {
//         console.error("API Error:", status, error.response.data);
//       } else if (error.request) {
//         console.error(
//           "API unreachable. Start brassleaf backend: cd brassleaf/backend && npm start"
//         );
//       }
//     }

//     return Promise.reject(
//       new Error(apiMessage || error.message || "Request failed")
//     );
//   }
// );

// export default axiosClient;
