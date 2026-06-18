// CREATE NEW FILE
// pages/Settings.jsx

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const initials = (currentUser?.displayName || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20 md:pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1">Account</p>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm mb-4">
          <h2 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-5">
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xl font-semibold shadow-sm">
                {initials}
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-slate-900">{currentUser?.displayName}</p>
              <p className="text-sm text-slate-400 mt-0.5">{currentUser?.email}</p>
              <span className="inline-block mt-2 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 tracking-wide uppercase">
                Google Account
              </span>
            </div>
          </div>

          {/* FIELD ROWS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5">Full Name</p>
                <p className="text-sm font-medium text-slate-800">{currentUser?.displayName || "—"}</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5">Email Address</p>
                <p className="text-sm font-medium text-slate-800">{currentUser?.email || "—"}</p>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">Verified</span>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-sm mb-4">
          <h2 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-4">Security</h2>
          <div className="space-y-2">

            {/* Change password placeholder */}
            <button
              disabled
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-slate-100 bg-slate-50/60 cursor-not-allowed opacity-60"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm font-medium text-slate-600">Change Password</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">Coming Soon</span>
            </button>

          </div>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white border border-red-100 rounded-2xl p-5 md:p-6 shadow-sm mb-4">
          <h2 className="text-xs font-semibold text-red-400 tracking-widest uppercase mb-4">Danger Zone</h2>
          <div className="space-y-2">

            {/* Delete account placeholder */}
            <button
              disabled
              className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-red-100 bg-red-50/40 cursor-not-allowed opacity-60"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="text-sm font-medium text-red-500">Delete Account</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-400">Coming Soon</span>
            </button>

          </div>
        </div>

        {/* SIGN OUT */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-red-500 hover:bg-red-50 hover:border-red-100 transition-all duration-200 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>

      </div>
    </div>
  );
};

export default Settings;