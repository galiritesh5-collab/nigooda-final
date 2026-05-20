import { useNavigate } from "react-router-dom";

const FoodScanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 py-16">

      <div className="max-w-4xl mx-auto text-center space-y-10">

        <h1 className="text-3xl font-bold text-slate-900">
          Scan Food or Drinks
        </h1>

        <p className="text-slate-600">
          Choose what you want to scan
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

          {/* FOOD */}
          <button
            onClick={() => navigate("/scan/input")}
            className="p-10 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-2">
              🍽 Food
            </h2>

            <p className="text-sm text-slate-600">
              Snacks, packaged foods, meals
            </p>
          </button>

          {/* DRINKS */}
          <button
            onClick={() => navigate("/scan/input")}
            className="p-10 rounded-2xl border bg-white shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold mb-2">
              🥤 Drinks
            </h2>

            <p className="text-sm text-slate-600">
              Juices, sodas, beverages
            </p>
          </button>

        </div>

      </div>

    </div>
  );
};

export default FoodScanPage;