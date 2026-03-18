const Hero = () => {
  const comingSoon = () => {
    alert("🚧 Coming Soon!\nWe’re actively building this AI feature.");
  };

  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white px-4 md:px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* TAGLINE */}
        <div className="max-w-4xl mx-auto text-center space-y-5">

          <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 uppercase tracking-wider">
            The Future of Shopping
          </span>

          {/* HERO HEADING */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">

            Discover Better.{" "}
            <span className="text-indigo-600">Scan Smarter.</span>

            <br />

            <span className="text-slate-500 font-light">
              Style Smarter with AI.
            </span>

          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find underrated products, scan ingredients, and get
            AI-powered recommendations — all in one place.
          </p>

        </div>

        {/* AI FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">

          {/* FOOD AI */}
          <div className="rounded-2xl p-8 border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Food Rating AI
            </h3>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Detect hidden sugars, additives, and preservatives instantly.
            </p>

            <button
              onClick={comingSoon}
              className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold shadow-sm hover:bg-emerald-500 hover:shadow-md transition"
            >
              Scan Product
            </button>

          </div>


          {/* INGREDIENT AI */}
          <div className="rounded-2xl p-8 border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Ingredient Analysis
            </h3>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Analyze labels for baby care, pet care & home essentials.
            </p>

            <button
              onClick={comingSoon}
              className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-500 hover:shadow-md transition"
            >
              Analyze Label
            </button>

          </div>


          {/* STYLIST AI */}
          <div className="rounded-2xl p-8 border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300">

            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Stylist AI
            </h3>

            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Upload your photo and get AI-powered outfit suggestions.
            </p>

            <button
              onClick={comingSoon}
              className="w-full py-2.5 rounded-lg bg-rose-600 text-white font-semibold shadow-sm hover:bg-rose-500 hover:shadow-md transition"
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