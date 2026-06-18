import { useState, useRef } from "react";
import { API_URL } from "../config";
import {
  BrowserMultiFormatReader,
} from "@zxing/browser";

const FoodBarcodePage = () => {

  const [barcode, setBarcode] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  const videoRef =
    useRef<HTMLVideoElement>(null);

  /* =================================
     MANUAL SEARCH
  ================================= */

  const handleSearch = async () => {

    if (!barcode.trim()) {

      setError(
        "Enter barcode"
      );

      return;

    }

    try {

      setError("");

      setLoading(true);

      const response =
        await fetch(
          `${API_URL}/api/food/analyze-barcode`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              barcode,
            }),
          }
        );

      if (!response.ok) {

        throw new Error(
          "Failed to analyze product"
        );

      }

      const data =
        await response.json();

      setResult(
        data.analysis
      );

    } catch (err) {

      console.error(err);

      setError(
        "Product analysis failed"
      );

    } finally {

      setLoading(false);

    }

  };

  /* =================================
     CAMERA SCANNER
  ================================= */

  const startScanner =
    async () => {

      try {

        const codeReader =
          new BrowserMultiFormatReader();

        const devices =
          await BrowserMultiFormatReader
            .listVideoInputDevices();

        if (
          devices.length === 0
        ) {

          alert(
            "No camera found"
          );

          return;

        }

        const selectedDeviceId =
          devices[0].deviceId;

        codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          async (
            result,
            err
          ) => {

            if (result) {

              const scannedBarcode =
                result.getText();

              setBarcode(
                scannedBarcode
              );

              codeReader.reset();

              try {

                setLoading(
                  true
                );

                const response =
                  await fetch(
                    `${API_URL}/api/food/analyze-barcode`,
                    {
                      method:
                        "POST",

                      headers:
                        {
                          "Content-Type":
                            "application/json",
                        },

                      body: JSON.stringify(
                        {
                          barcode:
                            scannedBarcode,
                        }
                      ),
                    }
                  );

                if (
                  !response.ok
                ) {

                  throw new Error(
                    "Failed to analyze product"
                  );

                }

                const data =
                  await response.json();

                setResult(
                  data.analysis
                );

              } catch (
                error
              ) {

                console.error(
                  error
                );

                setError(
                  "Failed to analyze product"
                );

              } finally {

                setLoading(
                  false
                );

              }

            }

          }
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Camera scan failed"
        );

      }

    };

  /* =================================
     COMING SOON
  ================================= */

  const comingSoon = () => {

    alert(
      "🚧 Coming Soon!"
    );

  };

  return (

    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white px-4 py-6 md:py-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-7">

          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">

            NIGOODA AI

          </span>

          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-slate-900">

            Scan Food Products

          </h1>

          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">

            Analyze ingredients,
            additives, sugars,
            preservatives, and
            nutrition instantly
            using AI-powered
            food intelligence.

          </p>

        </div>

        {/* CAMERA */}

        <div className="mb-10">

          <video
            ref={videoRef}
            className="
              w-full
              max-w-xl
              mx-auto
              rounded-3xl
              border
              bg-black
            "
          />

        </div>

        {/* OPTIONS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* CAMERA */}

          <button
            onClick={startScanner}
            className="bg-white border rounded-2xl p-5 text-left shadow-sm hover:shadow-lg transition"
          >

            <div className="text-3xl mb-3">

              📷

            </div>

            <h2 className="text-lg font-bold text-slate-900">

              Scan Barcode

            </h2>

            <p className="mt-3 text-slate-600 leading-7">

              Use your camera
              to instantly scan
              product barcodes.

            </p>

          </button>

          {/* IMAGE */}

          <button
            onClick={comingSoon}
            className="bg-white border rounded-2xl p-5 text-left shadow-sm hover:shadow-lg transition"
          >

            <div className="text-3xl mb-3">

              🖼️

            </div>

            <h2 className="text-lg font-bold text-slate-900">

              Upload Barcode

            </h2>

            <p className="mt-3 text-slate-600 leading-7">

              Upload barcode
              image from gallery.

            </p>

          </button>

          {/* MANUAL */}

          <div className="bg-white border rounded-2xl p-5 shadow-sm">

            <div className="text-3xl mb-3">

              🔢

            </div>

            <h2 className="text-lg font-bold text-slate-900">

              Enter Barcode

            </h2>

            <p className="mt-3 text-slate-600 leading-7">

              Enter barcode
              manually for
              instant analysis.

            </p>

            <input
              type="text"
              value={barcode}
              onChange={(e) =>
                setBarcode(
                  e.target.value
                )
              }
              placeholder="Enter barcode"
              className="mt-6 w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              onClick={
                handleSearch
              }
              disabled={loading}
              className="mt-4 w-full py-4 rounded-2xl bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition disabled:opacity-50"
            >

              {loading
                ? "Analyzing..."
                : "Analyze Product"}

            </button>

            {error && (

              <p className="mt-4 text-red-500 text-sm">

                {error}

              </p>

            )}

          </div>

        </div>

        {/* RESULT */}

        {result && (

          <div className="mt-6 space-y-5">

            {/* PRODUCT */}

            <div className="bg-white border rounded-2xl shadow-sm p-5">

              <h2 className="text-xl font-bold text-slate-900">

                {result.product?.name}

              </h2>

              <p className="mt-2 text-slate-500">

                {result.product?.brand}

              </p>

              <p className="mt-2 text-slate-600">

                {result.product?.category}

              </p>

            </div>

            {/* INGREDIENT ANALYSIS */}

            <div className="bg-white border rounded-2xl shadow-sm p-5">

              <h2 className="text-lg font-bold mb-4">

                Ingredient Analysis

              </h2>

              <div className="whitespace-pre-wrap text-slate-700 text-sm leading-7">

                {result.ingredient_analysis}

              </div>

            </div>

            {/* NUTRITION ANALYSIS */}

            <div className="bg-white border rounded-2xl shadow-sm p-5">

              <h2 className="text-lg font-bold mb-4">

                Nutrition Analysis

              </h2>

              <div className="whitespace-pre-wrap text-slate-700 text-sm leading-7">

                {result.nutrition_analysis}

              </div>

            </div>

            {/* RAW DEBUG */}

            <div className="bg-slate-900 text-white rounded-2xl p-5 overflow-auto">

              <h2 className="text-base font-bold mb-3">

                Raw Analysis Debug

              </h2>

              <pre className="text-sm whitespace-pre-wrap">

                {JSON.stringify(
                  result.raw_analysis,
                  null,
                  2
                )}

              </pre>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default FoodBarcodePage;