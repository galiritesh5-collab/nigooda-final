
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import PaymentModal from "../components/PaymentModal";
const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    scans: 5,
    features: ["5 AI scans", "Basic health score", "Ingredient breakdown"],
    color: "slate",
    popular: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: 139,
    scans: 50,
    features: [
      "50 AI scans",
      "Detailed health ratings",
      "Additive analysis",
      "PDF reports",
    ],
    color: "blue",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 229,
    scans: 100,
    features: [
      "100 AI scans",
      "Everything in Starter",
      "Priority AI",
      "Advanced ingredient insights",
      "Scan history export",
    ],
    color: "violet",
    popular: true,
  },
];

const colorMap = {
  slate: {
    badge: "bg-slate-100 text-slate-600",
    btn: "bg-slate-900 hover:bg-slate-700",
    border: "border-slate-200",
    ring: "",
  },
  blue: {
    badge: "bg-blue-50 text-blue-600",
    btn: "bg-blue-600 hover:bg-blue-700",
    border: "border-blue-100",
    ring: "",
  },
  violet: {
    badge: "bg-violet-50 text-violet-700",
    btn: "bg-violet-600 hover:bg-violet-700",
    border: "border-violet-200",
    ring: "ring-2 ring-violet-200",
  },
};

const BillingPlans = () => {
  const { currentUser, userData } = useAuth();

  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setLoadingPayments(false);
      return;
    }

    const fetchPayments = async () => {
      try {
        const ref = collection(db, "users", currentUser.uid, "payments");
        const q = query(ref, orderBy("createdAt", "desc"));

        const snap = await getDocs(q);

        setPayments(
          snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingPayments(false);
      }
    };

    fetchPayments();
  }, [currentUser]);

  const handleUpgrade = async (plan) => {
    if (!currentUser) {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (e) {
        console.error("Sign in failed:", e);
      }
      return;
    }
    if (plan.id === "free" || plan.id === userData?.plan) return;

    setSelectedPlan(plan);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20 md:pt-24 pb-12 md:pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-2">
            Pricing
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Billing & Plans
          </h1>

          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Choose the right plan for your needs. Upgrade anytime.
          </p>
        </div>

        {/* CURRENT STATUS */}
        {currentUser && (
          <div className="bg-white border border-slate-100 rounded-2xl p-5 mb-10 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4.5 h-4.5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">
                  Current Status
                </p>

                <p className="text-sm font-semibold text-slate-900 capitalize">
                  {userData?.plan || "Free"} Plan ·{" "}
                  {userData?.credits ?? 0} credits remaining
                </p>
              </div>

            </div>
          </div>
        )}

        {/* PLAN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          {PLANS.map((plan) => {
            const c = colorMap[plan.color];
            const isCurrent = userData?.plan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative bg-white border ${c.border} ${c.ring} rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow duration-200`}
              >

                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-violet-600 text-white text-[10px] font-bold rounded-full tracking-wide uppercase shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>

                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${c.badge} tracking-wide uppercase`}
                  >
                    {plan.name}
                  </span>

                  <div className="mt-4 flex items-end gap-1">

                    {plan.price === 0 ? (
                      <span className="text-3xl font-bold text-slate-900">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold text-slate-900">
                          ₹{plan.price}
                        </span>

                        <span className="text-sm text-slate-400 mb-0.5">
                          /month
                        </span>
                      </>
                    )}

                  </div>

                  <p className="text-xs text-slate-400 mt-1">
                    {plan.scans} AI scans included
                  </p>

                </div>

                <ul className="space-y-2 flex-1">

                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-emerald-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      {f}

                    </li>
                  ))}

                </ul>

                <button
                  onClick={() => handleUpgrade(plan)}
                  disabled={isCurrent || plan.id === "free"}
                  className={`w-full py-2.5 rounded-xl text-white text-sm font-medium transition-all duration-200 shadow-sm ${
                    isCurrent
                      ? "bg-slate-100 text-slate-400 cursor-default"
                      : plan.id === "free"
                      ? "bg-slate-100 text-slate-400 cursor-default"
                      : `${c.btn} hover:shadow-md`
                  }`}
                >
                  {isCurrent
                    ? "Current Plan"
                    : plan.id === "free"
                    ? "Default Plan"
                    : !currentUser
                    ? "Sign in to Upgrade"
                    : `Upgrade to ${plan.name}`}
                </button>

              </div>
            );
          })}

        </div>

        {/* PAYMENT HISTORY */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-50">
            <h2 className="text-base font-semibold text-slate-900">
              Payment History
            </h2>
          </div>

          {loadingPayments ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
            </div>
          ) : payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center px-6">
              <p className="text-sm text-slate-400">
                No payments yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">

              {payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-6 py-4"
                >

                  <div>
                    <p className="text-sm font-medium text-slate-800 capitalize">
                      {p.plan} Plan
                    </p>

                    <p className="text-xs text-slate-400">
                      {p.createdAt?.toDate?.()?.toLocaleDateString("en-IN") ?? "—"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-900">
                      ₹{p.amount}
                    </p>

                    <p className="text-xs text-emerald-600">
                      Pending Verification
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

      </div>

      <PaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        plan={selectedPlan}
      />
    </div>
  );
};

export default BillingPlans;
