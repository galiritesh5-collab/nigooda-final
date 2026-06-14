import { useState } from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

const AnalyzeProductPage = () => {

  const navigate = useNavigate();

  const {
    category,
    section,
    product,
  } = useParams();

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [ingredientsText, setIngredientsText] =
    useState("");

  const [analysisResult, setAnalysisResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const formatLabel = (
    value?: string
  ) => {

    if (!value) return "";

    return value
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) =>
        c.toUpperCase()
      );

  };

  const categoryLabel =
    formatLabel(category);

  const sectionLabel =
    formatLabel(section);

  const productLabel =
    formatLabel(product);

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
     HANDLE ANALYZE
  ==================================== */

  const handleAnalyze =
    async () => {

      try {

        console.log(
          "BUTTON CLICKED"
        );

        setLoading(true);

        let imageBase64 = "";

        if (selectedImage) {

          imageBase64 =
            await convertToBase64(
              selectedImage
            );

        }

        console.log(
          "SENDING REQUEST"
        );

const endpointMap: Record<string, string> = {

  // SKIN CARE

  "face-wash-cleanser":
    "analyze-facewash",

  moisturizer:
    "analyze-moisturizer",

  sunscreen:
    "analyze-sunscreen",

  toner:
    "analyze-toner",

  serum:
    "analyze-serum",

  "day-cream":
    "analyze-daycream",

  "night-cream":
    "analyze-nightcream",

  "eye-cream":
    "analyze-eyecream",

  "lip-balm":
    "analyze-lipbalm",

  "face-mask":
    "analyze-faceMask",

  // HAIR CARE

  shampoo:
    "analyze-shampoo",

  conditioner:
    "analyze-conditioner",

  "hair-styling-product":
    "analyze-hairStylingProduct",

  "hair-color-dye":
    "analyze-hairColorDye",

  "hair-oil":
    "analyze-hairOil",

  "hair-mask":
    "analyze-hairMask",

  "hair-serum":
    "analyze-hairSerum",

  "beard-growth-serum":
    "analyze-beardGrowthSerum",

  // BODY CARE

  "soap-body-wash":
    "analyze-soapBodyWash",

  "body-lotion":
    "analyze-bodyLotion",

  "body-scrub":
    "analyze-bodyScrub",

  "body-powder":
    "analyze-bodyPowder",

  "deodorant-antiperspirant":
    "analyze-deodorantAntiperspirant",

  "toothpaste-tooth-powder":
    "analyze-toothpasteToothPowder",

  mouthwash:
    "analyze-mouthwash",

  "teeth-whitening-product":
    "analyze-teethWhiteningProduct",

  "gum-care-product":
    "analyze-gumCareProduct",

  "hand-wash":
    "analyze-handWash",

  "hand-sanitizer":
    "analyze-handSanitizer",

  "intimate-wash":
    "analyze-intimateWash",

  "foot-care":
    "analyze-footCare",

  "antiseptic-liquid":
    "analyze-antisepticLiquid",

  "hygiene-wipes":
    "analyze-hygieneWipes",

  // BABY CARE

  "baby-wash-soap":
    "analyze-babyWashSoap",

  "baby-shampoo":
    "analyze-babyShampoo",

  "baby-lotion":
    "analyze-babyLotion",

  "baby-oil":
    "analyze-babyOil",

  "baby-powder":
    "analyze-babyPowder",

  "baby-sunscreen":
    "analyze-babySunscreen",

  "baby-wipes":
    "analyze-babyWipes",

  // HOME CARE

  "dishwash-cleaner":
    "analyze-dishwashCleaner",

  "laundry-soap":
    "analyze-laundrySoap",

  "laundry-liquid-powder":
    "analyze-laundryLiquidPowder",

  "floor-cleaner":
    "analyze-floorCleaner",

  "bathroom-toilet-cleaner":
    "analyze-bathroomToiletCleaner",

  "mosquito-repellent":
    "analyze-mosquitoRepellent",

  "insect-spray":
    "analyze-insectSpray",

  "air-freshener":
    "analyze-airFreshener",

  // PET CARE

  "pet-shampoo":
    "analyze-petShampoo",

  "pet-soap":
    "analyze-petSoap",

  "pet-dental-gel":
    "analyze-petDentalGel",

  "tick-flea-treatment":
    "analyze-tickFleaTreatment",

  "pet-deodorant":
    "analyze-petDeodorant",

  "pet-grooming-spray":
    "analyze-petGroomingSpray",

};
        const endpoint =
          endpointMap[
            product || ""
          ];

        if (!endpoint) {

          throw new Error(
            "Unsupported product type"
          );

        }

        const response =
          await fetch(
            `http://localhost:5000/api/${endpoint}`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                category,

                section,

                product,

                pastedIngredients:
                  ingredientsText,

                imageBase64,

              }),
            }
          );

        console.log(
          "RESPONSE RECEIVED"
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
    JSON.parse(rawResponse);

}

catch {

  throw new Error(
    "Backend returned invalid JSON. Check backend terminal."
  );

}

        console.log(data);

        if (!response.ok) {

          throw new Error(
            data.error ||
            "Analysis failed"
          );

        }
navigate(
  "/product-analysis-result",
  {
    state: {
      analysisResult: data.result,

      rendererType:
        section === "skin-care"
          ? "skincare"

          : section === "hair-care"
          ? "haircare"

          : section === "baby-care"
          ? "babycare"

          : section === "hygiene-care"
          ? "hygienecare"

          : section === "home-care"
          ? "householdcare"

          : section === "pet-care"
          ? "petcare"

          : section === "body-care"
          ? "bodycare"

          : section === "oral-care"
          ? "oralcare"

          : undefined,
    }
  }
);


       

      }

      catch (error) {

        console.error(
          "FRONTEND ERROR:",
          error
        );

      }

      finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="max-w-6xl mx-auto">

        {/* TOP SECTION */}

        <div className="mb-12">

          <span className="inline-flex px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
            AI Product Analysis
          </span>

          <h1 className="mt-5 text-5xl font-bold text-slate-900">

            {category === "food" &&
              "Analyze Food Ingredients"}

            {category === "drinks" &&
              "Analyze Drink Ingredients"}

            {category !== "food" &&
             category !== "drinks" &&
              "Analyze Product Ingredients"}

          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
            Upload ingredient labels, scan
            packaging, or paste ingredients to
            generate AI-powered ingredient,
            additive, chemical, and safety
            analysis.
          </p>

        </div>

        {/* MAIN ANALYSIS CARD */}

        <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-10 shadow-sm">

          {/* CONTEXT */}

          <div className="flex flex-wrap gap-3 mb-8">

            {categoryLabel && (
              <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                {categoryLabel}
              </span>
            )}

            {sectionLabel && (
              <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                {sectionLabel}
              </span>
            )}

            {productLabel && (
              <span className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium">
                {productLabel}
              </span>
            )}

          </div>

          {/* ACTIONS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* UPLOAD */}

            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-8 hover:shadow-xl transition-all duration-300">

              <div className="text-5xl mb-5">
                📸
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Upload Image
              </h2>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Upload ingredient labels or
                packaging images for OCR-based
                ingredient extraction.
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

            {/* SCAN */}

            <button className="rounded-3xl border border-slate-200 bg-white p-8 text-left hover:shadow-xl transition-all duration-300">

              <div className="text-5xl mb-5">
                🔍
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Scan Ingredients
              </h2>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Scan ingredient labels directly
                using your device camera.
              </p>

            </button>

            {/* PASTE */}

            <button className="rounded-3xl border border-slate-200 bg-white p-8 text-left hover:shadow-xl transition-all duration-300">

              <div className="text-5xl mb-5">
                ✍️
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Paste Ingredients
              </h2>

              <p className="mt-3 text-slate-600 leading-relaxed">
                Paste ingredients manually for
                AI-powered analysis and safety
                scoring.
              </p>

            </button>

          </div>

          {/* INPUT AREA */}

          <div className="mt-10">

            <textarea
              value={ingredientsText}
              onChange={(e) =>
                setIngredientsText(
                  e.target.value
                )
              }
              placeholder="Paste ingredients here..."
              className="w-full h-52 rounded-3xl border border-slate-200 p-6 text-slate-700 resize-none focus:outline-none focus:ring-4 focus:ring-indigo-100"
            />

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-6 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-200 disabled:opacity-50"
            >
              {loading
                ? "Analyzing..."
                : "Analyze Ingredients"}
            </button>

            {
              analysisResult && (

                <div className="mt-10 bg-slate-900 text-green-400 rounded-3xl p-6 overflow-auto">

                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">

                    {
                      typeof analysisResult ===
                      "string"

                        ? analysisResult

                        : JSON.stringify(
                            analysisResult,
                            null,
                            2
                          )
                    }

                  </pre>

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>

  );

};

export default AnalyzeProductPage;