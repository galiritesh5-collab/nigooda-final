import { useState } from "react";

type AnalyzeResponse = {
  normalized_ingredients: string[];
  penalties: Record<string, number>;
  final_rating: number;
};

const IngredientTextInput = () => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] =
    useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState("");

  // 🔹 Parse ingredients
  const parseIngredients = (text: string) => {
    return text
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // 🔹 Save history
  const saveToHistory = (data: AnalyzeResponse) => {
    try {
      const existing =
        JSON.parse(
          localStorage.getItem("scanHistory") || "[]"
        );

      const newEntry = {
        timestamp: new Date().toISOString(),
        ingredients:
          data.normalized_ingredients,
        rating: data.final_rating,
        penalties: data.penalties,
      };

      const updated = [newEntry, ...existing];

      localStorage.setItem(
        "scanHistory",
        JSON.stringify(updated.slice(0, 20))
      );
    } catch {
      console.warn("History save failed");
    }
  };

  // 🔹 Submit Handler
  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    const ingredients =
      parseIngredients(inputText);

    if (ingredients.length === 0) {
      setError("Enter at least one ingredient.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ingredients,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data =
        await response.json();

      setResult(data);

      saveToHistory(data);

    } catch (err) {
      console.error(err);
      setError(
        "Failed to analyze ingredients."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        Enter Ingredients
      </h1>

      {/* Textarea */}
      <textarea
        value={inputText}
        onChange={(e) =>
          setInputText(e.target.value)
        }
        placeholder="Enter ingredients separated by commas (e.g. Potato, Palm Oil, Salt)"
        className="w-full h-40 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-black"
      />

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-4 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 disabled:opacity-50"
      >
        {loading
          ? "Analyzing..."
          : "Analyze Ingredients"}
      </button>

      {/* Error */}
      {error && (
        <p className="text-red-500 mt-4">
          {error}
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-8 border rounded-xl p-6 bg-gray-50">

          {/* Rating */}
          <h2 className="text-2xl font-bold mb-2">
            Final Rating:
            <span className="ml-2 text-green-600">
              {result.final_rating}
            </span>
          </h2>

          {/* Ingredients */}
          <div className="mt-4">
            <h3 className="font-semibold">
              Normalized Ingredients:
            </h3>

            <ul className="list-disc ml-6 mt-2">
              {result.normalized_ingredients.map(
                (ing, index) => (
                  <li key={index}>
                    {ing}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Penalties */}
          {Object.keys(result.penalties)
            .length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">
                Penalties:
              </h3>

              <ul className="list-disc ml-6 mt-2">
                {Object.entries(
                  result.penalties
                ).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default IngredientTextInput;