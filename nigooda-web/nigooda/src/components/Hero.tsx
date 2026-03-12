const Hero = () => {
  const comingSoon = () => {
    alert("🚧 Coming Soon!\nWe’re actively building this AI feature.");
  };

  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white px-4 md:px-6 py-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* TAGLINE */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-600 uppercase tracking-wider">
            The Future of Shopping
          </span>

          {/* ✅ Tailwind v4 Hero Heading */}
          <h1 className="text-4xl font-bold text-slate-900 leading-tight">
            Discover Better.{" "}
            <span className="text-indigo-600">Scan Smarter.</span>
            <br />
            <span className="text-slate-500 font-light">
              Style Smarter with AI.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find underrated products, scan ingredients, and get AI-powered
            recommendations — all in one place.
          </p>
        </div>

        {/* AI FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FOOD AI */}
          <div className="rounded-2xl p-8 border bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Food Rating AI</h3>
            <p className="text-slate-600 text-sm mb-6">
              Detect hidden sugars, additives, and preservatives instantly.
            </p>
            <button
              onClick={comingSoon}
              className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition"
            >
              Scan Product
            </button>
          </div>

          {/* INGREDIENT AI */}
          <div className="rounded-2xl p-8 border bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Ingredient Analysis</h3>
            <p className="text-slate-600 text-sm mb-6">
              Analyze labels for baby care, pet care & home essentials.
            </p>
            <button
              onClick={comingSoon}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
            >
              Analyze Label
            </button>
          </div>

          {/* STYLIST AI */}
          <div className="rounded-2xl p-8 border bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold mb-3">Stylist AI</h3>
            <p className="text-slate-600 text-sm mb-6">
              Upload your photo and get AI-powered outfit suggestions.
            </p>
            <button
              onClick={comingSoon}
              className="w-full py-3 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-500 transition"
            >
              Start Styling
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
