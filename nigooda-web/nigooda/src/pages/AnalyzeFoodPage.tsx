import { useState } from "react";

import { useNavigate } from "react-router-dom";

const AnalyzeFoodPage = () => {

  const navigate =
    useNavigate();

  const [ingredients,
    setIngredients] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleAnalyze =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "http://localhost:5000/api/analyze-food",
            {
              method: "POST",

              headers: {
                "Content-Type":
                "application/json",
              },

              body:
              JSON.stringify({

                pastedIngredients:
                  ingredients,

              }),
            }
          );

        const data =
          await response.json();

        navigate(
          "/product-analysis-result",
          {
            state: {
              analysisResult:
                data.result
            }
          }
        );

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-slate-200">

        <h1 className="text-4xl font-bold text-slate-900">
          Analyze Food Product
        </h1>

        <p className="mt-4 text-slate-600">
          Paste ingredients for AI-powered analysis.
        </p>

        <textarea
          value={ingredients}

          onChange={(e) =>
            setIngredients(
              e.target.value
            )
          }

          placeholder="Paste ingredients here..."

          className="w-full h-56 mt-8 rounded-2xl border border-slate-300 p-5 outline-none resize-none"
        />

        <button
          onClick={handleAnalyze}

          disabled={
            loading ||
            !ingredients
          }

          className="mt-8 px-8 py-4 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50"
        >

          {loading
            ? "Analyzing..."
            : "Analyze Product"}

        </button>

      </div>

    </div>

  );

};

export default AnalyzeFoodPage;