// CREATE NEW FILE
// pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { currentUser, userData } = useAuth();
  const [recentScans, setRecentScans] = useState([]);
  const [loadingScans, setLoadingScans] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const fetchScans = async () => {
      try {
        const scansRef = collection(db, "users", currentUser.uid, "scans");
        const q = query(scansRef, orderBy("createdAt", "desc"), limit(5));
        const snap = await getDocs(q);
        setRecentScans(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingScans(false);
      }
    };
    fetchScans();
  }, [currentUser]);

  const planLabel = userData?.plan === "pro" ? "Pro" : userData?.plan === "starter" ? "Starter" : "Free";
  const planColor = userData?.plan === "pro" ? "text-violet-600 bg-violet-50 border-violet-100" : userData?.plan === "starter" ? "text-blue-600 bg-blue-50 border-blue-100" : "text-slate-600 bg-slate-50 border-slate-200";

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-slate-400 tracking-widest uppercase mb-1">Overview</p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, {currentUser?.displayName?.split(" ")[0]} 👋
          </h1>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

          {/* Credits */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1">Credits Remaining</p>
            <p className="text-3xl font-bold text-slate-900">{userData?.credits ?? "—"}</p>
            <p className="text-xs text-slate-400 mt-1">scans available</p>
          </div>

          {/* Plan */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1">Current Plan</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xl font-bold ${userData?.plan === "pro" ? "text-violet-700" : userData?.plan === "starter" ? "text-blue-700" : "text-slate-900"}`}>
                {planLabel}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${planColor}`}>
                Active
              </span>
            </div>
          </div>

          {/* Total Scans */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-1">Total Scans</p>
            <p className="text-3xl font-bold text-slate-900">{userData?.totalScans ?? 0}</p>
            <p className="text-xs text-slate-400 mt-1">lifetime analyses</p>
          </div>

        </div>

        {/* RECENT SCANS */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm mb-6 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
            <h2 className="text-base font-semibold text-slate-900">Recent Scans</h2>
            <Link to="/my-scans" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors">
              View all →
            </Link>
          </div>

          {loadingScans ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
            </div>
          ) : recentScans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 text-2xl">🔍</div>
              <p className="text-sm font-medium text-slate-700 mb-1">No scans yet</p>
              <p className="text-xs text-slate-400">Analyze your first product to see results here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors duration-150">
                  <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                    {scan.image ? (
                      <img src={scan.image} alt={scan.productName} className="w-9 h-9 object-contain" onError={(e) => { e.target.src = "https://via.placeholder.com/44"; }} />
                    ) : (
                      <span className="text-lg">🧴</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{scan.productName}</p>
                    <p className="text-xs text-slate-400">{scan.brand}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${scan.score >= 7 ? "bg-emerald-50 text-emerald-700" : scan.score >= 4 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"}`}>
                      Score {scan.score}/10
                    </span>
                    <span className="text-xs text-slate-400">
                      {scan.createdAt?.toDate?.()?.toLocaleDateString("en-IN") ?? "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* UPGRADE CTA */}
        {userData?.plan === "free" && (
          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-violet-900 mb-0.5">Unlock more with Pro</p>
              <p className="text-xs text-violet-600">Get 100 scans, priority AI, and advanced reports.</p>
            </div>
            <Link
              to="/billing"
              className="shrink-0 px-5 py-2.5 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm"
            >
              Upgrade Plan →
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;