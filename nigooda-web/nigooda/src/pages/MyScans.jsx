// CREATE NEW FILE
// pages/MyScans.jsx

import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const MyScans = () => {
  const { currentUser } = useAuth();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const fetchScans = async () => {
      try {
        const scansRef = collection(db, "users", currentUser.uid, "scans");
        const q = query(scansRef, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setScans(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchScans();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-slate-400 tracking-widest uppercase mb-1">History</p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Scans</h1>
          <p className="text-slate-500 text-sm mt-2">{scans.length} product{scans.length !== 1 ? "s" : ""} analyzed</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          </div>
        ) : scans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 text-3xl">🔍</div>
            <p className="text-base font-semibold text-slate-800 mb-1">No scans yet</p>
            <p className="text-sm text-slate-400 max-w-xs">Start analyzing products to build your personal scan history.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* IMAGE */}
                  <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                    {scan.image ? (
                      <img
                        src={scan.image}
                        alt={scan.productName}
                        className="w-14 h-14 object-contain"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/64"; }}
                      />
                    ) : (
                      <span className="text-2xl">🧴</span>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{scan.productName || "Unknown Product"}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{scan.brand || "Unknown Brand"}</p>
                      </div>
                      <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                        scan.score >= 7
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : scan.score >= 4
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : "bg-red-50 text-red-600 border border-red-100"
                      }`}>
                        {scan.score}/10
                      </span>
                    </div>

                    {/* SUMMARY */}
                    {scan.summary && (
                      <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-2">{scan.summary}</p>
                    )}

                    {/* DATE */}
                    <p className="text-[10px] font-medium text-slate-300 mt-2.5 tracking-wide">
                      {scan.createdAt?.toDate?.()?.toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      }) ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyScans;