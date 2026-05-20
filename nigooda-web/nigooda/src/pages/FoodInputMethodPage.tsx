import { useNavigate } from "react-router-dom";

const FoodInputMethodPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 py-16">

      <div className="max-w-4xl mx-auto text-center space-y-10">

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900">
          Choose Input Method
        </h1>

        <p className="text-slate-600">
          How would you like to scan ingredients?
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

          {/* TEXT INPUT */}
          <button
            onClick={() => navigate("/scan/text")}
            className="p-10 rounded-2xl border bg-white shadow-sm hover:shadow-md transition text-left"
          >
            <h2 className="text-xl font-bold mb-2">
              ✍️ Enter Ingredients
            </h2>

            <p className="text-sm text-slate-600">
              Type or paste ingredients manually.
            </p>
          </button>

          {/* IMAGE INPUT */}
          <button
            onClick={() => navigate("/scan/image")}
            className="p-10 rounded-2xl border bg-white shadow-sm hover:shadow-md transition text-left"
          >
            <h2 className="text-xl font-bold mb-2">
              📷 Upload Image
            </h2>

            <p className="text-sm text-slate-600">
              Scan label from a photo.
            </p>
          </button>

        </div>

      </div>

    </div>
  );
};

export default FoodInputMethodPage;