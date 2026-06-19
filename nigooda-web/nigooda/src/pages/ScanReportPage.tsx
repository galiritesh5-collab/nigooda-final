import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import AnalysisMarkdown from "../components/AnalysisMarkdown";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const ScanReportPage = () => {
  const { scanId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [scan, setScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScan = async () => {
      try {
        if (!currentUser || !scanId) return;

        const scanRef = doc(
          db,
          "users",
          currentUser.uid,
          "scans",
          scanId
        );

        const snap = await getDoc(scanRef);

        if (snap.exists()) {
          setScan({
            id: snap.id,
            ...snap.data(),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadScan();
  }, [currentUser, scanId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Scan not found
      </div>
    );
  }

  const title =
    (scan.productType || "Analysis")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c: string) =>
        c.toUpperCase()
      );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">

      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate("/my-scans")}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Scans
        </button>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">

          <div className="mb-8">

            <span className="inline-flex px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">

              {title}

            </span>

            <p className="text-xs text-slate-400 mt-3">

              {scan.createdAt?.toDate?.()?.toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}

            </p>

          </div>

          <div className="prose prose-slate max-w-none">
<AnalysisMarkdown
  markdown={scan.analysisReport}
/>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ScanReportPage;