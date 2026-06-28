import { useEffect, useState } from "react";
import {
collection,
query,
orderBy,
getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const MyScans = () => {
const { currentUser } = useAuth();
const navigate = useNavigate();

const [scans, setScans] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
if (!currentUser) return;

const fetchScans = async () => {
  try {
    const scansRef = collection(
      db,
      "users",
      currentUser.uid,
      "scans"
    );

    const q = query(
      scansRef,
      orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    setScans(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
    );
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};

fetchScans();


}, [currentUser]);

return ( <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 md:px-8"> <div className="max-w-5xl mx-auto">


    <div className="mb-10">
      <p className="text-sm font-semibold text-slate-400 tracking-widest uppercase mb-1">
        History
      </p>

      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
        My Scans
      </h1>

      <p className="text-slate-500 text-sm mt-2">
        {scans.length} scan
        {scans.length !== 1 ? "s" : ""}
        {" "}saved
      </p>
    </div>

    {loading ? (

      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>

    ) : scans.length === 0 ? (

      <div className="flex flex-col items-center justify-center py-24 text-center">

        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 text-3xl">
          🔍
        </div>

        <p className="text-base font-semibold text-slate-800 mb-1">
          No scans yet
        </p>

        <p className="text-sm text-slate-400 max-w-xs">
          Start analyzing products to build your personal scan history.
        </p>

      </div>

    ) : (

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {scans.map((scan) => {

          const ingredientCount =
            scan.ingredients
              ?.split(",")
              ?.filter(Boolean)
              ?.length || 0;

          const productType =
            (scan.productType || "Analysis")
              .replace(/-/g, " ")
              .replace(
                /\b\w/g,
                (c) => c.toUpperCase()
              );

          return (

            <div
              key={scan.id}
              onClick={() =>
                navigate(
                  `/my-scans/${scan.id}`
                )
              }
              className="cursor-pointer bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >

              <div className="flex items-center justify-between mb-4">

                <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">

                  {productType}

                </span>

              </div>

              <p className="text-lg font-bold text-slate-900">

                {ingredientCount} Ingredients

              </p>

              <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-3">

                {scan.ingredients
                  ? scan.ingredients.slice(
                      0,
                      120
                    )
                  : "No ingredients available"}

                {scan.ingredients?.length > 120
                  ? "..."
                  : ""}

              </p>

              <div className="mt-4 pt-4 border-t border-slate-100">

                <p className="text-[11px] font-medium text-slate-400 tracking-wide">

                  {scan.createdAt?.toDate?.()?.toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  ) ?? "—"}

                </p>

              </div>

            </div>

          );
        })}

      </div>

    )}

  </div>
</div>

);
};

export default MyScans;
