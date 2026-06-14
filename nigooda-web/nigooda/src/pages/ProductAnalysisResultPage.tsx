
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import OralCare from "../renderers/OralCare";
import HairCare from "../renderers/HairCare";
import BabyCare from "../renderers/BabyCare";
import HygieneCare from "../renderers/HygieneCare";
import HouseholdCare from "../renderers/HouseholdCare";
import PetCare from "../renderers/PetCare";
import BodyCare from "../renderers/BodyCare";
import SkinCare from "../renderers/SkinCare";

const ProductAnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as any;

  /**
   * ANALYSIS RESULT
   */

  const rawResult = state?.analysisResult;

  let markdown = "";

  if (rawResult?.analysis) {
    markdown = rawResult.analysis;
  } else if (rawResult?.result?.analysis) {
    markdown = rawResult.result.analysis;
  } else if (rawResult?.result) {
    markdown = rawResult.result;
  } else if (typeof rawResult === "string") {
    markdown = rawResult;
  }

  /**
   * EXPLICIT RENDERER TYPE
   *
   * CRITICAL:
   * DO NOT DETECT RENDERERS FROM MARKDOWN.
   * DO NOT USE lowerMarkdown.includes(...)
   * DO NOT USE weighted scoring systems.
   *
   * Renderer selection MUST come directly
   * from product domain metadata.
   */

  
const rendererType =
  state?.rendererType ||
  state?.category ||
  state?.domain;

console.log("rendererType:", rendererType);



  /**
   * RENDERER REGISTRY
   */

  const rendererRegistry: Record<string, React.ReactNode> = {
    oralcare: <OralCare markdown={markdown} />,
    haircare: <HairCare markdown={markdown} />,
    babycare: <BabyCare markdown={markdown} />,
    hygienecare: <HygieneCare markdown={markdown} />,
    householdcare: <HouseholdCare markdown={markdown} />,
    petcare: <PetCare markdown={markdown} />,
    bodycare: <BodyCare markdown={markdown} />,
    skincare: <SkinCare markdown={markdown} />,
  };

  /**
   * ACTIVE RENDERER
   */

 
const ActiveRenderer = rendererType
  ? rendererRegistry[rendererType]
  : null;



  return (
    <div className="min-h-screen bg-[#F7F8FC] px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* BACK */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/product-intelligence")}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Product Analysis
          </h1>

          <p className="text-gray-500">
            AI-generated intelligence report
          </p>
        </div>

        {/* ANALYSIS RENDERER */}
       
<div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-2 md:p-4 overflow-hidden">

  {ActiveRenderer ? (
    ActiveRenderer
  ) : (
    <div className="p-10 text-center">

      <h2 className="text-2xl font-black text-red-500 mb-3">
        Renderer Not Found
      </h2>

      <p className="text-gray-500">
        Unknown rendererType:
      </p>

      <div className="mt-3 inline-flex items-center px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 font-bold">
        {String(rendererType)}
      </div>

    </div>
  )}

</div>



      </div>
    </div>
  );
};

export default ProductAnalysisResultPage;
