
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const FoodDrinkPage = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("Food");

  return (

    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="mb-12">

          <span
            className={`inline-flex px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wide ${
              activeTab === "Food"
                ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                : "bg-sky-50 border-sky-100 text-sky-700"
            }`}
          >

            {activeTab} Intelligence

          </span>

          <h1 className="mt-5 text-5xl font-bold text-slate-900">

            {activeTab} Intelligence

          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">

            {activeTab === "Food"

              ? "AI-powered analysis of ingredients, nutrition, additives, and food quality with intelligent health ratings."

              : "AI-powered analysis of sugars, caffeine, additives, artificial ingredients, and drink quality with intelligent health ratings."}

          </p>

        </div>

        {/* TABS */}

        <div className="flex gap-4 mb-10">

          <button
            onClick={() =>
              setActiveTab("Food")
            }

            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              activeTab === "Food"

                ? "bg-emerald-600 text-white shadow-lg"

                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >

            Food

          </button>

          <button
            onClick={() =>
              setActiveTab("Drinks")
            }

            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              activeTab === "Drinks"

                ? "bg-sky-600 text-white shadow-lg"

                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >

            Drinks

          </button>

        </div>

        {/* ANALYZE WORKSPACE */}

        <div
          className={`bg-white border rounded-[32px] p-8 md:p-10 shadow-sm ${
            activeTab === "Food"

              ? "border-emerald-100"

              : "border-sky-100"
          }`}
        >

          <div className="max-w-3xl">

            <h2 className="text-3xl font-bold text-slate-900">

              Analyze Product Ingredients

            </h2>

            <p className="mt-4 text-slate-600 text-lg leading-relaxed">

              Upload ingredient labels, scan product
              packaging, or paste ingredients to
              generate AI-powered ingredient,
              additive, and nutrition analysis.

            </p>

          </div>

          {/* ACTION BUTTONS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

            {/* UPLOAD */}

            <button
              className={`group rounded-3xl border p-8 text-left hover:shadow-xl transition-all duration-300 ${
                activeTab === "Food"

                  ? "border-emerald-100 bg-emerald-50"

                  : "border-sky-100 bg-sky-50"
              }`}
            >

              <div className="text-4xl mb-5">
                📸
              </div>

              <h3 className="text-xl font-bold text-slate-900">

                Upload Image

              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">

                Upload ingredient labels or nutrition
                labels for AI-powered analysis.

              </p>

            </button>

            {/* SCAN */}

            <button
              className={`group rounded-3xl border p-8 text-left hover:shadow-xl transition-all duration-300 ${
                activeTab === "Food"

                  ? "border-emerald-100 bg-white"

                  : "border-sky-100 bg-white"
              }`}
            >

              <div className="text-4xl mb-5">
                🔍
              </div>

              <h3 className="text-xl font-bold text-slate-900">

                Scan Ingredients

              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">

                Scan ingredient labels directly using
                your device camera.

              </p>

            </button>

            {/* PASTE */}

            <button
              className={`group rounded-3xl border p-8 text-left hover:shadow-xl transition-all duration-300 ${
                activeTab === "Food"

                  ? "border-emerald-100 bg-white"

                  : "border-sky-100 bg-white"
              }`}
            >

              <div className="text-4xl mb-5">
                ✍️
              </div>

              <h3 className="text-xl font-bold text-slate-900">

                Paste Ingredients

              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">

                Paste ingredients manually for instant
                AI analysis and scoring.

              </p>

            </button>

          </div>

          {/* ANALYZE BUTTON */}

          <button

            onClick={() =>

              navigate(

                activeTab === "Food"

                  ? "/analyze/food/foods"

                  : "/analyze/food/drinks"

              )

            }

            className={`mt-10 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-200 ${
              activeTab === "Food"

                ? "bg-emerald-600 hover:bg-emerald-500"

                : "bg-sky-600 hover:bg-sky-500"
            }`}
          >

            Analyze Product

          </button>

        </div>

      </div>

    </div>

  );

};

export default FoodDrinkPage;

