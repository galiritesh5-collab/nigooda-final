import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Food from "../renderers/Food";
import Drink from "../renderers/Drink";
import RecommendedProducts from "../components/RecommendedProducts";

const FoodAnalysisResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as any;

  const rawResult = state?.analysisResult;

  const analysisData =
    rawResult?.result || rawResult;

  const ingredients =
    analysisData?.ingredients || [];

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

  const rendererType =
    state?.rendererType ||
    state?.category ||
    state?.domain;

  const backRoute =
    state?.backRoute ||
    (rendererType === "drinks"
      ? "/analyze/food/drinks"
      : "/analyze/food/foods");

  console.log("rendererType:", rendererType);

  const rendererRegistry: Record<
    string,
    React.ReactNode
  > = {
    food: <Food markdown={markdown} />,
    drinks: <Drink markdown={markdown} />,
  };

  const ActiveRenderer = rendererType
    ? rendererRegistry[rendererType]
    : null;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
         <button
  onClick={() =>
    navigate(backRoute, {
      replace: true,
    })
  }
>
  <ArrowLeft className="w-4 h-4" />
  Back
</button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Food Analysis
          </h1>

          <p className="text-gray-500">
            AI-generated food intelligence report
          </p>
        </div>

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

        <RecommendedProducts
          category="Food"
          ingredients={ingredients}
        />

      </div>
    </div>
  );
};

export default FoodAnalysisResultPage;