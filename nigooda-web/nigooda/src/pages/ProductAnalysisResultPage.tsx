import { useLocation, useNavigate } from "react-router-dom";

import DynamicRenderer from "../components/product-intelligence/DynamicRenderer";

const ProductAnalysisResultPage = () => {

  const location = useLocation();

  const navigate = useNavigate();

const result = {
  productType: "FACE MASK",
  finalRating: 2.4,

  sections: [

    {
      type: "score_grid",
      title: "Core Scores",

      items: [

        {
          label: "Safety",
          score: 2.8,
          reason: "Possible irritation with prolonged contact."
        },

        {
          label: "Effectiveness",
          score: 2.6,
          reason: "Limited delivery realism."
        }

      ]
    },

    {
      type: "text_block",
      title: "Truth About Claims",

      content:
        "Turmeric provides mild supportive benefits but most glow claims are exaggerated."
    },

    {
      type: "strengths_weaknesses",

      strengths: [
        "Simple ingredient profile",
        "Low eco burden"
      ],

      weaknesses: [
        "Can stain skin",
        "Limited hydration support"
      ]
    }

  ]
};
  if (!result) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        No analysis result found
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* HERO */}

        <div className="bg-white border rounded-3xl p-8 mb-8">

          <div className="flex items-center justify-between flex-wrap gap-4">

            <div>

              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Product Intelligence
              </p>

              <h1 className="text-4xl font-bold mt-2">
                {result.productType}
              </h1>

            </div>

            <div className="text-5xl font-bold text-indigo-600">
              ⭐ {result.finalRating}
            </div>

          </div>

        </div>

        {/* DYNAMIC AI CARDS */}

      <DynamicRenderer
  sections={result.sections}
/>

        {/* ANALYZE AGAIN */}

        <div className="mt-10 flex justify-center">

          <button
            onClick={() => navigate("/product-intelligence")}
            className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
          >
            Analyze Another Product
          </button>

        </div>

      </div>

    </div>

  );
};

export default ProductAnalysisResultPage;