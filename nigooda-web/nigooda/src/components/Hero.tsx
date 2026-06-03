import { useNavigate } from "react-router-dom";

import IntelligenceCard from "./IntelligenceCard";

const Hero = () => {

  const navigate = useNavigate();

  const comingSoon = () => {
    alert(
      "🚧 Coming Soon!\nWe’re actively building this AI feature."
    );
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-white px-4 md:px-6 py-24">

      <div className="max-w-7xl mx-auto">

        {/* HERO HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-20">

          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
            AI-Powered Product Intelligence
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
            Understand Products
            <span className="block text-indigo-600">
              Beyond the Label
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Analyze ingredients, nutrition,
            additives, chemicals, and product
            safety with intelligent AI-powered
            ratings.
          </p>

        </div>

        {/* MAIN CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FOOD */}
          <IntelligenceCard
            icon="🥗"
            title="Food & Drink Intelligence"
            description="AI-powered analysis of ingredients, nutrition, additives, and food quality — with intelligent health ratings."
            tags={[
              "Food",
              "Drinks",
              "Nutrition",
              "Health Ratings",
            ]}
            buttonText="Analyze Product"
            color="emerald"
            onClick={() =>
              navigate("/food-drink")
            }
          />

          {/* PRODUCT */}
          <IntelligenceCard
            icon="🧴"
            title="Product Ingredient Intelligence"
            description="AI-powered ingredient analysis and intelligent safety ratings for personal, pet, baby, and home care products."
            tags={[
              "Personal Care",
              "Pet Care",
              "Household Care",
              "Safety Ratings",
            ]}
            buttonText="Analyze Product"
            color="indigo"
            onClick={() =>
              navigate("/product-intelligence")
            }
          />

          {/* STYLIST */}
          <IntelligenceCard
            icon="👗"
            title="Stylist AI"
            description="Upload your photo and get AI-powered outfit recommendations, styling inspiration, and fashion suggestions."
            tags={[
              "Fashion",
              "AI Styling",
              "Outfit Ideas",
              "Coming Soon",
            ]}
            buttonText="Coming Soon"
            color="rose"
            onClick={comingSoon}
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;