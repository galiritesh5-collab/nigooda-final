import { useNavigate } from "react-router-dom";
import IntelligenceCard from "./IntelligenceCard";

const Hero = () => {
  const navigate = useNavigate();

  const comingSoon = () => {
    alert("🚧 Coming Soon!\nWe're actively building this AI feature.");
  };

  return (
    <section className="relative overflow-hidden bg-[#fafafa] px-4 md:px-8 pt-24 md:pt-28 pb-10 md:pb-14">

      {/* FLOATING BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-gradient-radial from-slate-100 to-transparent opacity-80 blur-3xl" />
        <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-radial from-emerald-50 to-transparent opacity-60 blur-3xl" />
        <div className="absolute top-40 -right-24 w-[300px] h-[300px] rounded-full bg-gradient-radial from-violet-50 to-transparent opacity-50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* HERO HEADER — asymmetric left-heavy */}
        <div className="max-w-3xl mb-8 md:mb-10">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-500 tracking-widest uppercase">
              AI-Powered Product Intelligence
            </span>
          </div>

          <h1 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[0.95] text-slate-900">
            Understand
            <br />
            Products
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-400">
              Beyond the Label
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed max-w-xl font-normal">
            Analyze ingredients, nutrition, additives, and product safety
            with intelligent AI-powered ratings — before you buy.
          </p>

        </div>

        {/* INTELLIGENCE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* FOOD */}
          <IntelligenceCard
            icon="🥗"
            title="Food & Drink Intelligence"
            description="AI-powered analysis of ingredients, nutrition, additives, and food quality — with intelligent health ratings."
            tags={["Food", "Drinks", "Nutrition", "Health Ratings"]}
            buttonText="Analyze Product"
            color="emerald"
            onClick={() => navigate("/analyze/food/foods")}
          />

          {/* PRODUCT */}
          <IntelligenceCard
            icon="🧴"
            title="Product Ingredient Intelligence"
            description="AI-powered ingredient analysis and intelligent safety ratings for personal, pet, baby, and home care products."
            tags={["Personal Care", "Pet Care", "Household Care", "Safety Ratings"]}
            buttonText="Analyze Product"
            color="indigo"
            onClick={() => navigate("/product-intelligence")}
          />

          {/* STYLIST */}
          <IntelligenceCard
            icon="👗"
            title="Stylist AI"
            description="Upload your photo and get AI-powered outfit recommendations, styling inspiration, and fashion suggestions."
            tags={["Fashion", "AI Styling", "Outfit Ideas", "Coming Soon"]}
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