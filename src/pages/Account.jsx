import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Profile from "./Profile";

export default function Account() {
  // const { isAuthenticated, login, register } = useAuth();
  const {
  isAuthenticated,
  bootstrapping,
  login,
  register,
} = useAuth();
  const location = useLocation();
  const registerRef = useRef(null);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(location.search).get("register") === "1") {
      setTimeout(() => registerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    }
  }, [location.search]);

  if (bootstrapping) {
  return (
    <main className="bg-white">
      <div className="container-site py-16">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm font-semibold text-slate-500">
            Loading your account...
          </p>
        </div>
      </div>
    </main>
  );
}

  if (isAuthenticated) return <Profile />;

  const doLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    const f = new FormData(e.currentTarget);
    const result = await login({ email: f.get("email")?.trim(), password: f.get("password") });
    if (!result.ok) setLoginError(result.message);
  };

  const doRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setRegisterMessage("");
    const f = new FormData(e.currentTarget);
    const result = await register({ firstName: f.get("firstName")?.trim(), lastName: f.get("lastName")?.trim(), email: f.get("email")?.trim() });
    if (!result.ok) setRegisterError(result.message);
    else setRegisterMessage(result.message);
  };

  return (
    <main className="bg-white">
      <div className="container-site py-10 sm:py-14 lg:py-16">
        <h1 className="text-3xl font-black text-[#243346] sm:text-4xl">My Account</h1>

        <div className="mt-3 flex items-center gap-1 text-sm">
          <Link to="/" className="text-slate-400 transition hover:text-[#D9A537]">Home</Link>
          <span className="text-slate-300">›</span>
          <span className="font-medium text-[#243346]">My Account</span>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-0">
          <section className="bg-[#f6f6f6] p-6 sm:p-10 lg:mr-10">
            <h2 className="text-xl font-black text-[#243346]">Login</h2>
            <form onSubmit={doLogin} className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#243346]">Username or email address <span className="text-red-500">*</span></label>
                <input name="email" required className="input-field h-12 rounded-sm" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#243346]">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input name="password" type={showLoginPassword ? "text" : "password"} required className="input-field h-12 rounded-sm !pr-11" />
                  <button type="button" onClick={() => setShowLoginPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>
              <div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-semibold text-[#D9A537] underline underline-offset-2">Lost your password?</Link></div>
              {loginError && <p className="bg-red-50 px-3 py-2 text-sm text-red-700">{loginError}</p>}
              <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="accent-[#D9A537]" /> Remember me</label>
              <button type="submit" className="btn-gold h-12 w-full rounded-sm">Log in</button>
              <div className="text-center"><button type="button" onClick={() => registerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })} className="text-sm font-semibold text-[#D9A537] underline underline-offset-2 hover:text-[#243346]">Create an Account</button></div>
            </form>
          </section>

          <section ref={registerRef} className="border-slate-200 p-6 sm:p-10 lg:border-l lg:pl-16">
            <h2 className="text-xl font-black text-[#243346]">Register</h2>
            <form onSubmit={doRegister} className="mt-5 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="mb-2 block text-sm font-medium text-[#243346]">First name <span className="text-red-500">*</span></label><input name="firstName" required className="input-field h-12 rounded-sm" /></div>
                <div><label className="mb-2 block text-sm font-medium text-[#243346]">Last name <span className="text-red-500">*</span></label><input name="lastName" required className="input-field h-12 rounded-sm" /></div>
              </div>
              <div><label className="mb-2 block text-sm font-medium text-[#243346]">Email address <span className="text-red-500">*</span></label><input name="email" type="email" required className="input-field h-12 rounded-sm" /></div>
              <p className="text-xs leading-5 text-slate-500">After registration, your existing account flow will send password setup instructions to your email.</p>
              {registerError && <p className="bg-red-50 px-3 py-2 text-sm text-red-700">{registerError}</p>}
              {registerMessage && <p className="bg-green-50 px-3 py-2 text-sm text-green-700">{registerMessage}</p>}
              <button type="submit" className="btn-gold h-12 w-full rounded-sm">Register</button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}



// import { Eye, EyeOff } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Profile from "./Profile";

// export default function Account() {
//   const { isAuthenticated, login, register } = useAuth();
//   const location = useLocation();
//   const registerRef = useRef(null);
//   const [loginError, setLoginError] = useState("");
//   const [registerError, setRegisterError] = useState("");
//   const [registerMessage, setRegisterMessage] = useState("");
//   const [showLoginPassword, setShowLoginPassword] = useState(false);

//   useEffect(() => {
//     if (new URLSearchParams(location.search).get("register") === "1") {
//       setTimeout(() => registerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
//     }
//   }, [location.search]);

//   if (isAuthenticated) return <Profile />;

//   const doLogin = async (e) => {
//     e.preventDefault();
//     setLoginError("");
//     const f = new FormData(e.currentTarget);
//     const result = await login({ email: f.get("email")?.trim(), password: f.get("password") });
//     if (!result.ok) setLoginError(result.message);
//   };

//   const doRegister = async (e) => {
//     e.preventDefault();
//     setRegisterError("");
//     setRegisterMessage("");
//     const f = new FormData(e.currentTarget);
//     const result = await register({ firstName: f.get("firstName")?.trim(), lastName: f.get("lastName")?.trim(), email: f.get("email")?.trim() });
//     if (!result.ok) setRegisterError(result.message);
//     else setRegisterMessage(result.message);
//   };

//   return (
//     <main className="bg-white">
//       <div className="container-site py-10 sm:py-14 lg:py-16">
//         <h1 className="text-3xl font-black text-[#243346] sm:text-4xl">My Account</h1>

//         <div className="mt-3 flex items-center gap-1 text-sm">
//           <Link to="/" className="text-slate-400 transition hover:text-[#D9A537]">Home</Link>
//           <span className="text-slate-300">›</span>
//           <span className="font-medium text-[#243346]">My Account</span>
//         </div>

//         <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-2 lg:gap-0">
//           <section className="bg-[#f6f6f6] p-6 sm:p-10 lg:mr-10">
//             <h2 className="text-xl font-black text-[#243346]">Login</h2>
//             <form onSubmit={doLogin} className="mt-5 space-y-5">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-[#243346]">Username or email address <span className="text-red-500">*</span></label>
//                 <input name="email" required className="input-field h-12 rounded-sm" />
//               </div>
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-[#243346]">Password <span className="text-red-500">*</span></label>
//                 <div className="relative">
//                   <input name="password" type={showLoginPassword ? "text" : "password"} required className="input-field h-12 rounded-sm !pr-11" />
//                   <button type="button" onClick={() => setShowLoginPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
//                 </div>
//               </div>
//               <div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-semibold text-[#D9A537] underline underline-offset-2">Lost your password?</Link></div>
//               {loginError && <p className="bg-red-50 px-3 py-2 text-sm text-red-700">{loginError}</p>}
//               <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="accent-[#D9A537]" /> Remember me</label>
//               <button type="submit" className="btn-gold h-12 w-full rounded-sm">Log in</button>
//               <div className="text-center"><button type="button" onClick={() => registerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })} className="text-sm font-semibold text-[#D9A537] underline underline-offset-2 hover:text-[#243346]">Create an Account</button></div>
//             </form>
//           </section>

//           <section ref={registerRef} className="border-slate-200 p-6 sm:p-10 lg:border-l lg:pl-16">
//             <h2 className="text-xl font-black text-[#243346]">Register</h2>
//             <form onSubmit={doRegister} className="mt-5 space-y-5">
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div><label className="mb-2 block text-sm font-medium text-[#243346]">First name <span className="text-red-500">*</span></label><input name="firstName" required className="input-field h-12 rounded-sm" /></div>
//                 <div><label className="mb-2 block text-sm font-medium text-[#243346]">Last name <span className="text-red-500">*</span></label><input name="lastName" required className="input-field h-12 rounded-sm" /></div>
//               </div>
//               <div><label className="mb-2 block text-sm font-medium text-[#243346]">Email address <span className="text-red-500">*</span></label><input name="email" type="email" required className="input-field h-12 rounded-sm" /></div>
//               <p className="text-xs leading-5 text-slate-500">After registration, your existing account flow will send password setup instructions to your email.</p>
//               {registerError && <p className="bg-red-50 px-3 py-2 text-sm text-red-700">{registerError}</p>}
//               {registerMessage && <p className="bg-green-50 px-3 py-2 text-sm text-green-700">{registerMessage}</p>}
//               <button type="submit" className="btn-gold h-12 w-full rounded-sm">Register</button>
//             </form>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }
