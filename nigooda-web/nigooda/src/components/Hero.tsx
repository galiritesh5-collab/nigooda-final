import { useNavigate } from "react-router-dom";
import IntelligenceCard from "./IntelligenceCard";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#F4F8F6] px-4 md:px-8 pt-24 md:pt-28 pb-10 md:pb-14">

      {/* FLOATING BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-gradient-radial from-emerald-100/40 to-transparent opacity-95 blur-[120px]" />
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-radial from-emerald-100/30 to-transparent opacity-70 blur-[100px]" />
        <div className="absolute top-40 -right-24 w-[400px] h-[400px] rounded-full bg-gradient-radial from-teal-100/30 to-transparent opacity-60 blur-[90px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* HERO HEADER */}
        <div className="max-w-3xl mb-8 md:mb-10">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DDE7E2] shadow-sm mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-[#0F766E] tracking-widest uppercase">
              AI-Powered Product Intelligence
            </span>
          </div>

          <h1 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.03em] leading-[0.95] text-slate-900">
            Understand
            <br />
            Products
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-[#14B8A6] to-[#34D399]">
              Beyond the Label
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
            Analyze ingredients, nutrition, additives, and product safety
            with intelligent AI-powered ratings — before you buy.
          </p>

        </div>

        {/* INTELLIGENCE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">

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
            tags={[
              "Personal Care",
              "Pet Care",
              "Household Care",
              "Safety Ratings",
            ]}
            buttonText="Analyze Product"
            color="emerald"
            onClick={() => navigate("/product-intelligence")}
          />

        </div>

      </div>
    </section>
  );
};

export default Hero;