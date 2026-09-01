
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SetPassword() {
  const { setPassword } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /*
   * Same component can support:
   *
   * /set-password
   * /reset-password
   */
  const isResetPassword =
    location.pathname === "/reset-password";

  /*
   * Token comes from email URL
   *
   * Example:
   *
   * /set-password?token=xxxxxxxx
   */
  const token = params.get("token");

  /*
   * Go to same login page used by
   * ForgotPassword.jsx
   */
  const goToLogin = () => {
    navigate("/profile", {
      replace: true,
    });
  };

  /*
   * Submit password
   */
  const submit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setMessage("");

    const form = new FormData(e.currentTarget);

    const password =
      form.get("password")?.toString() || "";

    const confirmPassword =
      form.get("confirmPassword")?.toString() || "";

    /*
     * Validate token
     */
    if (!token) {
      setError(
        "Password link is invalid or missing. Please use the link sent to your email."
      );

      return;
    }

    /*
     * Validate password
     */
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }

    /*
     * Validate confirm password
     */
    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Password and confirm password do not match."
      );

      return;
    }

    setLoading(true);

    try {
      /*
       * Existing AuthContext function
       *
       * This sends password data
       * to your backend.
       */
      const result = await setPassword({
        token,
        password,
        confirmPassword,
      });

      /*
       * Backend error
       */
      if (!result?.ok) {
        setError(
          result?.message ||
            "Unable to set password. Please try again."
        );

        return;
      }

      /*
       * Password successfully saved
       */
      setSuccess(true);

      setMessage(
        result?.message ||
          (isResetPassword
            ? "Password reset successfully. Please login using your new password."
            : "Password created successfully. Please login using your new password.")
      );

      /*
       * Automatically go back to
       * login page after success
       */
      setTimeout(() => {
        goToLogin();
      }, 1500);
    } catch (err) {
      console.error("Set password error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <div className="container-site py-12 sm:py-16">

        <div className="mx-auto max-w-xl border border-slate-200 bg-[#f7f8fa] p-6 shadow-sm sm:p-10">

          {/* =========================
              SUCCESS VIEW
          ========================== */}

          {success ? (
            <div>

              <h1 className="text-3xl font-black text-[#243346]">
                {isResetPassword
                  ? "Password reset successfully!"
                  : "Password created successfully!"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {isResetPassword
                  ? "Your password has been updated successfully. You can now login using your new password."
                  : "Your account password has been created successfully. You can now login using your email address and new password."}
              </p>

              {message && (
                <p className="mt-6 bg-green-50 px-3 py-3 text-sm leading-6 text-green-700">
                  {message}
                </p>
              )}

              <button
                type="button"
                onClick={goToLogin}
                className="btn-gold mt-7 h-12 w-full rounded-sm"
              >
                Login Now
              </button>

              <button
                type="button"
                onClick={goToLogin}
                className="mt-5 inline-block text-sm font-bold text-[#243346] transition hover:text-[#D9A537]"
              >
                ← Back to login
              </button>

            </div>
          ) : (
            <>
              {/* =========================
                  TITLE
              ========================== */}

              <h1 className="text-3xl font-black text-[#243346]">
                {isResetPassword
                  ? "Reset your password"
                  : "Set your password"}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {isResetPassword
                  ? "Enter your new password below. After successfully resetting your password, you can login using your email address and new password."
                  : "Create a password for your account. After successfully setting your password, you can login using your registered email address and new password."}
              </p>

              {/* =========================
                  FORM
              ========================== */}

              <form
                onSubmit={submit}
                className="mt-7 space-y-5"
              >

                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-bold text-[#243346]"
                  >
                    {isResetPassword
                      ? "New password"
                      : "Password"}

                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder={
                        isResetPassword
                          ? "Enter new password"
                          : "Enter password"
                      }
                      className="input-field h-12 w-full rounded-sm !pr-12"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#243346]"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Password must contain at least 8 characters.
                  </p>

                </div>

                {/* CONFIRM PASSWORD */}

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-bold text-[#243346]"
                  >
                    Confirm password

                    <span className="text-red-500">
                      {" "}*
                    </span>
                  </label>

                  <div className="relative">

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      required
                      minLength={8}
                      autoComplete="new-password"
                      placeholder="Confirm password"
                      className="input-field h-12 w-full rounded-sm !pr-12"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#243346]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* ERROR MESSAGE */}

                {error && (
                  <p className="bg-red-50 px-3 py-2 text-sm leading-6 text-red-700">
                    {error}
                  </p>
                )}

                {/* SUCCESS MESSAGE */}

                {message && (
                  <p className="bg-green-50 px-3 py-2 text-sm leading-6 text-green-700">
                    {message}
                  </p>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold h-12 w-full rounded-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Please wait..."
                    : isResetPassword
                    ? "Reset password"
                    : "Set password"}
                </button>

              </form>

              {/* =========================
                  BACK TO LOGIN
              ========================== */}

              <Link
                to="/profile"
                className="mt-5 inline-block text-sm font-bold text-[#243346] transition hover:text-[#D9A537]"
              >
                ← Back to login
              </Link>
            </>
          )}

        </div>
      </div>
    </main>
  );
}





// import { Eye, EyeOff, LockKeyhole } from "lucide-react";
// import { useState } from "react";
// import {
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";
// // import { Link, useSearchParams } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function SetPassword() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const { setPassword } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [done, setDone] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     const form = new FormData(e.currentTarget);
//     const result = await setPassword({
//       token: params.get("token"),
//       password: form.get("password"),
//       confirmPassword: form.get("confirmPassword"),
//     });
//     if (!result.ok) return setError(result.message);
//     setMessage(result.message);
//     setDone(true);
//   };

//   return (
//     <main className="min-h-[70vh] bg-[#f7f8fa] px-4 py-12 sm:py-16">
//       <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
//         <div className="bg-[#243346] px-6 py-8 text-white">
//           <div className="mb-4 inline-flex rounded-xl bg-white p-2">
//             <LockKeyhole className="text-[#D9A537]" size={23} />
//           </div>
//           <p className="text-sm font-bold uppercase tracking-[.18em] text-[#D9A537]">Brass Leaf Uniforms</p>
//           <h1 className="mt-2 text-3xl font-black">Set Password</h1>
//           <p className="mt-2 text-sm text-slate-300">Create your password to continue to your account.</p>
//         </div>

//         <form onSubmit={submit} className="p-6 sm:p-8">
//           <label className="mb-1.5 block text-sm font-bold text-[#243346]">Password</label>
//           <div className="relative">
//             <input name="password" required type={showPassword ? "text" : "password"} className="input-field h-11 w-full !px-4 !pr-12" placeholder="Enter password" />
//             <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           <label className="mb-1.5 mt-5 block text-sm font-bold text-[#243346]">Confirm Password</label>
//           <div className="relative">
//             <input name="confirmPassword" required type={showConfirm ? "text" : "password"} className="input-field h-11 w-full !px-4 !pr-12" placeholder="Confirm password" />
//             <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
//               {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
//           {message && <p className="mt-4 rounded-xl bg-green-50 px-3 py-2.5 text-sm text-green-700">{message}</p>}

//           {!done ? (
//             <button type="submit" className="btn-gold mt-5 w-full justify-center">Set Password</button>
//           ) : (
//             <button
//                 type="button"
//                 onClick={() =>
//                   navigate("/", {
//                     state: {
//                       openLogin: true,
//                     },
//                   })
//                 }
//                 className="btn-gold mt-5 flex w-full justify-center"
//               >
//                 Open Login
//               </button>
//             // <Link to="/" className="btn-gold mt-5 flex w-full justify-center">Open Login</Link>
//           )}
//         </form>
//       </div>
//     </main>
//   );
// }
