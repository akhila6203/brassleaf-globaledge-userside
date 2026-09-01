import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axiosClient
  from "../api/axiosClient";

const AuthContext =
  createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [registered, setRegistered] =
    useState(false);

  const [bootstrapping, setBootstrapping] =
    useState(true);

  /*
   * ========================================
   * RESTORE LOGIN FROM HTTPONLY COOKIE
   * ========================================
   *
   * No localStorage.
   * No sessionStorage.
   */
  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const { data } =
          await axiosClient.get(
            "/auth/customer/me"
          );

        if (active) {
          setUser(
            data?.user ||
              null
          );
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setBootstrapping(
            false
          );
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  /* ========================================
     REGISTER
  ======================================== */

  const register =
    async ({
      firstName,
      lastName,
      email,
    }) => {
      if (
        !firstName ||
        !lastName ||
        !email
      ) {
        return {
          ok: false,
          message:
            "Please fill all fields.",
        };
      }

      try {
        const { data } =
          await axiosClient.post(
            "/auth/customer/register",
            {
              firstName,
              lastName,
              email,
            }
          );

        setRegistered(true);

        return {
          ok: true,

          message:
            data?.message ||
            "Account created. Check your email to set your password.",
        };
      } catch (error) {
        return {
          ok: false,

          message:
            error.response?.data
              ?.message ||
            error.message ||
            "Registration failed.",
        };
      }
    };

  /* ========================================
     LOGIN
  ======================================== */

  const login =
    async ({
      email,
      password,
    }) => {
      if (
        !email ||
        !password
      ) {
        return {
          ok: false,
          message:
            "Enter email and password.",
        };
      }

      try {
        const { data } =
          await axiosClient.post(
            "/auth/customer/login",
            {
              email,
              password,
            }
          );

        /*
         * No token storing.
         * Cookie already created by backend.
         */
        setUser(
          data?.user ||
            null
        );

        return {
          ok: true,
          user:
            data?.user,
        };
      } catch (error) {
        return {
          ok: false,

          message:
            error.response?.data
              ?.message ||
            error.message ||
            "Invalid email or password.",
        };
      }
    };

  /* ========================================
     LOGOUT
  ======================================== */

  const logout =
    async () => {
      try {
        await axiosClient.post(
          "/auth/customer/logout"
        );
      } catch {
        // Cookie may already be invalid.
      } finally {
        setUser(null);
      }
    };

  /* ========================================
     FORGOT PASSWORD
  ======================================== */

  const forgotPassword =
    async (email) => {
      if (!email) {
        return {
          ok: false,
          message:
            "Enter your email.",
        };
      }

      try {
        const { data } =
          await axiosClient.post(
            "/auth/customer/forgot-password",
            {
              email,
            }
          );

        return {
          ok: true,

          message:
            data?.message ||
            "Password reset link sent to your email.",
        };
      } catch (error) {
        return {
          ok: false,

          message:
            error.response?.data
              ?.message ||
            error.message ||
            "Unable to send reset link.",
        };
      }
    };

  /* ========================================
     SET PASSWORD / RESET PASSWORD
  ======================================== */

  const setPassword =
    async ({
      token,
      password,
      confirmPassword,
    }) => {
      if (
        !token ||
        !password ||
        !confirmPassword
      ) {
        return {
          ok: false,
          message:
            "Please fill all fields.",
        };
      }

      if (
        password !==
        confirmPassword
      ) {
        return {
          ok: false,
          message:
            "Passwords do not match.",
        };
      }

      try {
        const { data } =
          await axiosClient.post(
            "/auth/customer/set-password",
            {
              token,
              password,
              confirmPassword,
            }
          );

        return {
          ok: true,

          message:
            data?.message ||
            "Password updated successfully.",
        };
      } catch (error) {
        return {
          ok: false,

          message:
            error.response?.data
              ?.message ||
            error.message ||
            "Unable to set password.",
        };
      }
    };

  /* ========================================
     LOGGED-IN CHANGE PASSWORD
  ======================================== */

  const changePassword =
    async ({
      currentPassword,
      newPassword,
      confirmPassword,
    }) => {
      try {
        const { data } =
          await axiosClient.put(
            "/auth/customer/change-password",
            {
              currentPassword,
              newPassword,
              confirmPassword,
            }
          );

        return {
          ok: true,

          message:
            data?.message ||
            "Password changed successfully.",
        };
      } catch (error) {
        return {
          ok: false,

          message:
            error.response?.data
              ?.message ||
            error.message ||
            "Unable to change password.",
        };
      }
    };


    const checkCustomerEmail =
  async (email) => {
    try {
      const {
        data,
      } =
        await axiosClient.post(
          "/auth/customer/check-email",
          {
            email,
          }
        );

      return {
        ok: true,

        exists:
          !!data?.exists,
      };
    } catch (error) {
      return {
        ok: false,

        exists: false,

        message:
          error?.response
            ?.data
            ?.message ||
          "Unable to check email.",
      };
    }
  };

  const checkoutRegister =
  async ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    try {
      const {
        data,
      } =
        await axiosClient.post(
          "/auth/customer/checkout-register",
          {
            firstName,
            lastName,
            email,
            password,
          }
        );

      setUser(
        data?.user ||
        null
      );

      return {
        ok: true,

        user:
          data?.user ||
          null,
      };
    } catch (error) {
      return {
        ok: false,

        status:
          error?.response
            ?.status,

        message:
          error?.response
            ?.data
            ?.message ||
          "Unable to create account.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        registered,

        bootstrapping,

        isAuthenticated:
          !!user,

        register,
        login,
        logout,

        forgotPassword,
        setPassword,

        changePassword,

        checkCustomerEmail,
checkoutRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth =
  () =>
    useContext(AuthContext);
  



  
  // import {
//   createContext,
//   useContext,
//   useState,
// } from "react";

// import axiosClient
//   from "../api/axiosClient";

// const AuthContext =
//   createContext(null);

// export function AuthProvider({
//   children,
// }) {
//   const [user, setUser] =
//     useState(null);

//   const [token, setToken] =
//     useState(null);

//   const [registered, setRegistered] =
//     useState(false);

//   /* =====================================================
//      REGISTER
//   ===================================================== */

//   const register =
//     async ({
//       firstName,
//       lastName,
//       email,
//     }) => {
//       if (
//         !firstName ||
//         !lastName ||
//         !email
//       ) {
//         return {
//           ok: false,
//           message:
//             "Please fill all fields.",
//         };
//       }

//       try {
//         const { data } =
//           await axiosClient.post(
//             "/auth/customer/register",
//             {
//               firstName,
//               lastName,
//               email,
//             }
//           );

//         setRegistered(true);

//         return {
//           ok: true,

//           message:
//             data?.message ||
//             "Account created. Check your email to set your password.",
//         };
//       } catch (error) {
//         return {
//           ok: false,

//           message:
//             error.response?.data?.message ||
//             error.apiMessage ||
//             error.message ||
//             "Registration failed.",
//         };
//       }
//     };

//   /* =====================================================
//      LOGIN
//   ===================================================== */

//   const login =
//     async ({
//       email,
//       password,
//     }) => {
//       if (
//         !email ||
//         !password
//       ) {
//         return {
//           ok: false,
//           message:
//             "Enter email and password.",
//         };
//       }

//       try {
//         const { data } =
//           await axiosClient.post(
//             "/auth/customer/login",
//             {
//               email,
//               password,
//             }
//           );

//         setUser(
//           data?.user ||
//           { email }
//         );

//         setToken(
//           data?.token ||
//           null
//         );

//         if (data?.token) {
//           axiosClient.defaults.headers.common.Authorization =
//             `Bearer ${data.token}`;
//         }

//         return {
//           ok: true,
//           user: data?.user,
//         };
//       } catch (error) {
//         return {
//           ok: false,

//           message:
//             error.response?.data?.message ||
//             error.apiMessage ||
//             error.message ||
//             "Invalid email or password.",
//         };
//       }
//     };

//   /* =====================================================
//      LOGOUT
//   ===================================================== */

//   const logout = () => {
//     setUser(null);
//     setToken(null);

//     delete axiosClient
//       .defaults
//       .headers
//       .common
//       .Authorization;
//   };

//   /* =====================================================
//      FORGOT PASSWORD
//   ===================================================== */

//   const forgotPassword =
//     async (email) => {
//       if (!email) {
//         return {
//           ok: false,
//           message:
//             "Enter your email.",
//         };
//       }

//       try {
//         const { data } =
//           await axiosClient.post(
//             "/auth/customer/forgot-password",
//             {
//               email,
//             }
//           );

//         return {
//           ok: true,

//           message:
//             data?.message ||
//             "Password reset link sent to your email.",
//         };
//       } catch (error) {
//         return {
//           ok: false,

//           message:
//             error.response?.data?.message ||
//             error.apiMessage ||
//             error.message ||
//             "Unable to send reset link.",
//         };
//       }
//     };

//   /* =====================================================
//      SET / RESET PASSWORD
//   ===================================================== */

//   const setPassword =
//     async ({
//       token,
//       password,
//       confirmPassword,
//     }) => {
//       if (
//         !token ||
//         !password ||
//         !confirmPassword
//       ) {
//         return {
//           ok: false,
//           message:
//             "Please fill all fields.",
//         };
//       }

//       if (
//         password !==
//         confirmPassword
//       ) {
//         return {
//           ok: false,
//           message:
//             "Passwords do not match.",
//         };
//       }

//       try {
//         const { data } =
//           await axiosClient.post(
//             "/auth/customer/set-password",
//             {
//               token,
//               password,
//               confirmPassword,
//             }
//           );

//         return {
//           ok: true,

//           message:
//             data?.message ||
//             "Password created successfully.",
//         };
//       } catch (error) {
//         return {
//           ok: false,

//           message:
//             error.response?.data?.message ||
//             error.apiMessage ||
//             error.message ||
//             "Unable to set password.",
//         };
//       }
//     };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         registered,

//         isAuthenticated:
//           !!user,

//         register,
//         login,
//         logout,
//         forgotPassword,
//         setPassword,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth =
//   () =>
//     useContext(AuthContext);
  
  
  
