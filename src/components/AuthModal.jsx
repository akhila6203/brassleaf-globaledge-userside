import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose, onSuccess, embedded = false }) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const result = await login({ email: form.get("email")?.trim(), password: form.get("password") });
    if (!result.ok) return setError(result.message);
    onSuccess?.();
  };

  const go = (path) => {
    onClose?.();
    navigate(path);
  };

  const panel = (
    <div className={`relative w-full bg-white p-5 text-left shadow-2xl sm:p-6 ${embedded ? "border border-slate-200 border-t-2 border-t-[#D9A537]" : "max-w-md rounded-2xl"}`} onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={onClose} aria-label="Close login" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-[#243346]"><X size={17} /></button>
      <h2 className="pr-8 text-xl font-black text-[#243346]">Login</h2>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#243346]">Username or email address <span className="text-red-500">*</span></label>
          <input name="email" type="text" required autoComplete="username" className="input-field h-11" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-bold text-[#243346]">Password <span className="text-red-500">*</span></label>
          <div className="relative">
            <input name="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" className="input-field h-11 !pr-11" />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D9A537]" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" onClick={() => go("/forgot-password")} className="text-sm font-semibold text-[#D9A537] underline underline-offset-2 hover:text-[#243346]">Lost your password?</button>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button type="submit" className="btn-gold h-11 w-full">Login</button>

        <div className="text-center">
          <button type="button" onClick={() => go("/profile?register=1")} className="text-sm font-semibold text-[#D9A537] underline underline-offset-2 hover:text-[#243346]">Create an Account</button>
        </div>
      </form>
    </div>
  );

  if (embedded) return <div className="fixed left-3 right-3 top-[82px] z-[250] pt-2 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:w-[350px] sm:max-w-[calc(100vw-24px)] sm:pt-3">{panel}</div>;
  return <div className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto bg-[#243346]/60 p-4 pt-24 backdrop-blur-sm" onClick={onClose}>{panel}</div>;
}
