import { useState } from "react";
import { API_URL } from "../config";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

const AnalyzeFoodPage = () => {

  const navigate =
    useNavigate();

  const { type } =
    useParams();

  const isDrinks =
    type === "drinks";

  const [selectedImage,
    setSelectedImage] =
    useState<File | null>(null);

  const [ingredients,
    setIngredients] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  /* ====================================
     CONVERT IMAGE TO BASE64
  ==================================== */

  const convertToBase64 = (
    file: File
  ) => {

    return new Promise<string>(
      (resolve, reject) => {

        const reader =
          new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () =>
          resolve(
            reader.result as string
          );

        reader.onerror = (error) =>
          reject(error);

      }
    );

  };

  /* ====================================
     ANALYZE
  ==================================== */

  const handleAnalyze =
    async () => {

      try {

        setLoading(true);

        let imageBase64 = "";

        if (selectedImage) {

          imageBase64 =
            await convertToBase64(
              selectedImage
            );

        }

        const endpoint =
          isDrinks
            ? "analyze-drinks"
            : "analyze-foods";

        const response =
          await fetch(
            `${API_URL}/api/${endpoint}`,
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

                  imageBase64,

                  type,

                }),
            }
          );

        const rawResponse =
          await response.text();

        console.log(
          "RAW RESPONSE:",
          rawResponse
        );

        let data;

        try {

          data =
            JSON.parse(
              rawResponse
            );

        }

        catch {

          throw new Error(
            "Backend returned invalid JSON."
          );

        }

        if (!response.ok) {

          throw new Error(
            data.error ||
            "Analysis failed"
          );

        }

        navigate(
  "/food-analysis-result",
  {
    state: {
      analysisResult: data.result,

      rendererType:
        isDrinks
          ? "drinks"
          : "food",
    },
  }
);

      }

      catch (error) {

        console.error(
          "FOOD ANALYSIS ERROR:",
          error
        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="max-w-5xl mx-auto">

        {/* TOP SWITCHER */}

        <div className="flex gap-4 mb-10">

          <button
            onClick={() =>
              navigate(
                "/analyze/food/foods"
              )
            }

            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              !isDrinks

                ? "bg-emerald-600 text-white shadow-lg"

                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >

            Foods

          </button>

          <button
            onClick={() =>
              navigate(
                "/analyze/food/drinks"
              )
            }

            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              isDrinks

                ? "bg-sky-600 text-white shadow-lg"

                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >

            Drinks

          </button>

        </div>

        {/* HERO */}

        <div className="mb-12">

          <span
            className={`inline-flex px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wide ${
              isDrinks

                ? "bg-sky-50 border-sky-100 text-sky-700"

                : "bg-emerald-50 border-emerald-100 text-emerald-700"
            }`}
          >

            {isDrinks
              ? "Drink Intelligence"
              : "Food Intelligence"}

          </span>

          <h1 className="mt-5 text-5xl font-bold text-slate-900">

            {isDrinks
              ? "Analyze Drink Product"
              : "Analyze Food Product"}

          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">

            {isDrinks

              ? "Analyze sugars, caffeine, additives, sweeteners, hydration quality, and ultra-processed drink ingredients using AI-powered intelligence."

              : "Analyze ingredients, additives, oils, sugars, processing quality, and food safety using AI-powered intelligence."}

          </p>

        </div>

        {/* MAIN CARD */}

        <div
          className={`bg-white border rounded-[32px] p-8 md:p-10 shadow-sm ${
            isDrinks

              ? "border-sky-100"

              : "border-emerald-100"
          }`}
        >

          {/* ACTIONS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* IMAGE */}

            <div
              className={`rounded-3xl border p-8 hover:shadow-xl transition-all duration-300 ${
                isDrinks

                  ? "border-sky-100 bg-sky-50"

                  : "border-emerald-100 bg-emerald-50"
              }`}
            >

              <div className="text-5xl mb-5">
                📸
              </div>

              <h2 className="text-2xl font-bold text-slate-900">

                Upload Label

              </h2>

              <p className="mt-3 text-slate-600 leading-relaxed">

                Upload ingredient labels or nutrition
                labels for OCR-powered extraction.

              </p>

              <input
                type="file"
                accept="image/*"
                className="mt-6"
                onChange={(e) => {

                  if (
                    e.target.files?.[0]
                  ) {

                    setSelectedImage(
                      e.target.files[0]
                    );

                  }

                }}
              />

            </div>

            {/* PASTE */}

            <div className="rounded-3xl border border-slate-200 bg-white p-8 hover:shadow-xl transition-all duration-300">

              <div className="text-5xl mb-5">
                ✍️
              </div>

              <h2 className="text-2xl font-bold text-slate-900">

                Paste Ingredients

              </h2>

              <p className="mt-3 text-slate-600 leading-relaxed">

                Paste ingredients manually for
                AI-powered analysis.

              </p>

            </div>

          </div>

          {/* TEXTAREA */}

          <div className="mt-10">

            <textarea
              value={ingredients}

              onChange={(e) =>
                setIngredients(
                  e.target.value
                )
              }

              placeholder={
                isDrinks

                  ? "Paste drink ingredients here..."

                  : "Paste food ingredients here..."
              }

              className={`w-full h-56 rounded-3xl border p-6 text-slate-700 resize-none focus:outline-none focus:ring-4 ${
                isDrinks

                  ? "border-sky-200 focus:ring-sky-100"

                  : "border-emerald-200 focus:ring-emerald-100"
              }`}
            />

            <button
              onClick={handleAnalyze}

              disabled={
                loading ||
                (
                  !ingredients &&
                  !selectedImage
                )
              }

              className={`mt-6 px-8 py-4 rounded-2xl text-white font-semibold transition-all duration-200 disabled:opacity-50 ${
                isDrinks

                  ? "bg-sky-600 hover:bg-sky-500"

                  : "bg-emerald-600 hover:bg-emerald-500"
              }`}
            >

              {loading
                ? "Analyzing..."
                : "Analyze Product"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default AnalyzeFoodPage;
