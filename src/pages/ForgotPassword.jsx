import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const location = useLocation();
  const prefilledEmail = location.state?.email || "";
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const f = new FormData(e.currentTarget);
    const result = await forgotPassword(f.get("email")?.trim());
    if (!result.ok) setError(result.message);
    else setMessage(result.message);
  };

  return (
    <main className="bg-white">
      <div className="container-site py-12 sm:py-16">
        <div className="mx-auto max-w-xl border border-slate-200 bg-[#f7f8fa] p-6 shadow-sm sm:p-10">
          <h1 className="text-3xl font-black text-[#243346]">Lost your password?</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">Enter your registered email address. You will receive the existing password-reset instructions.</p>
          <form onSubmit={submit} className="mt-7 space-y-5">
            <div><label className="mb-2 block text-sm font-bold text-[#243346]">Email address <span className="text-red-500">*</span></label><input name="email" type="email" required defaultValue={prefilledEmail} className="input-field h-12 rounded-sm" /></div>
            {error && <p className="bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            {message && <p className="bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
            <button className="btn-gold h-12 w-full rounded-sm">Reset password</button>
          </form>
          <Link to={location.state?.returnTo || "/profile"} className="mt-5 inline-block text-sm font-bold text-[#243346] hover:text-[#D9A537]">← Back to login</Link>
        </div>
      </div>
    </main>
  );
}
