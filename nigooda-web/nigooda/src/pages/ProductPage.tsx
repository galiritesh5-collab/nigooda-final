import { useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Heart, ExternalLink, Globe2, ChevronDown, Tag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import AnalysisMarkdown from "../components/AnalysisMarkdown";

interface Product {
  id: string;
  Brand?: string;
  "Name of Product"?: string;
  "Main Image URL"?: string;
  Price?: number;
  "Weight / Size"?: string;
  Rating?: number;
  "Variant Group ID"?: string;
  "Short Description"?: string;
  "Primary Category"?: string;
  "Seller Website"?: string;
  "Buy Link"?: string;
  "Referral Code"?: string;
  analysisEngine?: string;
  analysisIngredients?: string;
  analysisReport?: string;
}

/* ----------------------------
   UI-ONLY HELPER (display only, no API/logic impact)
   Ensures external links always open correctly,
   even if stored without a protocol.
---------------------------- */
const withProtocol = (url?: string) => {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
};

/* ----------------------------
   UI-ONLY HELPER (display only, no API/logic impact)
   Converts line-broken ingredient text into a
   clean comma-separated string.
---------------------------- */
const toCommaSeparated = (text?: string) => {
  if (!text) return "";
  return text
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(", ");
};

/* ----------------------------
   UI-ONLY HELPER (display only, no API/logic impact)
   Categories that should show the Compatibility Notice.
---------------------------- */
const COMPATIBILITY_CATEGORIES = ["personal care", "pets", "household care"];

/* ----------------------------
   UI-ONLY HELPER (display only, no API/logic impact)
   Categories that should show the compact "AI Product
   Analysis" transition card before the report.
---------------------------- */
const FOOD_DRINK_CATEGORIES = ["food", "drinks"];

const ProductPage = ({ products }: { products: Product[] }) => {
  const { id } = useParams();
  const { toggleWishlist, isInWishlist } = useWishlist();

  /* ----------------------------
     FIND PRODUCT
     FIX: useMemo already present — kept as-is
  ---------------------------- */
  const product = useMemo(() => {
    return products.find((p) => String(p.id) === String(id));
  }, [products, id]);

  /* ----------------------------
     FIND VARIANTS
     FIX: useMemo already present — kept as-is
  ---------------------------- */
  const variants = useMemo(() => {
    if (!product) return [];

    const groupId = product["Variant Group ID"];

    if (!groupId || groupId === "NA") {
      return [product];
    }

    return products.filter(
      (p) => p["Variant Group ID"] === groupId
    );
  }, [product, products]);

  const [activeVariant, setActiveVariant] =
    useState<Product | undefined>(product);

  useEffect(() => {
    setActiveVariant(product);
  }, [product]);

  /* ----------------------------
     UI-ONLY EXPAND/COLLAPSE STATE
     (no backend/API impact)
  ---------------------------- */
  const [showFullIngredients, setShowFullIngredients] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    setShowFullIngredients(false);
    setShowFullDescription(false);
  }, [activeVariant]);

  if (!product || !activeVariant) {
    return (
      <div className="p-10 text-slate-500">
        Product not found.
      </div>
    );
  }

  const liked = isInWishlist(activeVariant.id);

  /* ----------------------------
     SMALL UI HELPERS (display only)
  ---------------------------- */
  const ingredientsText = toCommaSeparated(activeVariant.analysisIngredients);
  const ingredientsPreview =
    ingredientsText.length > 180
      ? `${ingredientsText.slice(0, 180)}...`
      : ingredientsText;

  const descriptionFull = activeVariant["Short Description"] || "";
  const descriptionPreview =
    descriptionFull.length > 160
      ? `${descriptionFull.slice(0, 160)}...`
      : descriptionFull;

  const buyLinkHref = withProtocol(activeVariant["Buy Link"]);
  const sellerWebsiteHref = withProtocol(activeVariant["Seller Website"]);

  const showCompatibilityNotice = COMPATIBILITY_CATEGORIES.includes(
    (activeVariant["Primary Category"] || "").trim().toLowerCase()
  );

  const showFoodDrinkTransition = FOOD_DRINK_CATEGORIES.includes(
    (activeVariant["Primary Category"] || "").trim().toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">

        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-4">

          {/* PRODUCT IMAGE — large & dominant */}
          <div className="flex items-center justify-center bg-slate-50 rounded-2xl p-6">
            <img
              src={activeVariant["Main Image URL"]}
              alt={activeVariant["Name of Product"]}
              loading="lazy"
              decoding="async"
              className="max-h-[360px] md:max-h-[440px] object-contain w-full"
            />
          </div>

          {/* 🎨 VARIANT THUMBNAILS — directly below image */}
          {variants.length > 1 && (
            <div className="flex gap-3 flex-wrap justify-center">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                    activeVariant.id === variant.id
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  {/* FIX: lazy load variant thumbnails */}
                  <img
                    src={variant["Main Image URL"]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* 🛒 BUY NOW + ❤️ WISHLIST */}
          <div className="flex items-center gap-3">
            <a
              href={buyLinkHref || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!buyLinkHref}
              onClick={(e) => {
                if (!buyLinkHref) e.preventDefault();
              }}
              className={`flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold text-base shadow-sm hover:shadow active-press transition ${
                !buyLinkHref ? "opacity-40 cursor-not-allowed pointer-events-none" : ""
              }`}
            >
              Buy Now
              <ExternalLink size={17} />
            </a>

            <button
              onClick={() => toggleWishlist(activeVariant.id)}
              className="flex-1 flex items-center justify-center gap-2 border border-slate-200 bg-white py-3.5 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50 hover:border-slate-300 active-press transition"
            >
              <Heart
                size={18}
                className={`transition ${
                  liked ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
              Wishlist
            </button>
          </div>

          {/* 🎁 REFERRAL CODE CARD */}
          {activeVariant["Referral Code"] && (
            <div className="rounded-2xl bg-emerald-50/50 border border-emerald-100 px-5 py-4 shadow-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                  <Tag size={16} />
                  Referral Code
                </span>
                <span className="text-base font-bold text-emerald-700 tracking-wide">
                  {activeVariant["Referral Code"]}
                </span>
              </div>
              <p className="text-xs text-emerald-700 mt-1">
                Save before checkout and get exclusive discounts!
              </p>
            </div>
          )}

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-4">

          {/* ⭐ RATING BADGE */}
          {activeVariant.Rating && (
            <div className="inline-flex items-center gap-1 bg-amber-50/80 border border-amber-200/60 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              ⭐ {activeVariant.Rating}
            </div>
          )}

          {/* PRODUCT NAME */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {activeVariant["Name of Product"]}
          </h1>

          {/* BRAND — secondary, still visible */}
          {activeVariant.Brand && (
            <p className="text-sm text-slate-500">
              by <span className="text-indigo-600 font-medium">{activeVariant.Brand}</span>
            </p>
          )}

          {/* PRICE — dominant */}
          {activeVariant.Price && (
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 pt-1">
              ₹{activeVariant.Price}
            </p>
          )}

          {/* SIZE — secondary to price */}
          {activeVariant["Weight / Size"] && (
            <p className="text-sm text-slate-500">
              Size: {activeVariant["Weight / Size"]}
            </p>
          )}

          {/* 🧪 INGREDIENTS CARD */}
          {ingredientsText && (
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm px-6 py-5">
              <h3 className="font-semibold text-slate-900 mb-2">
                Ingredients
              </h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                {showFullIngredients ? ingredientsText : ingredientsPreview}
              </p>
              {ingredientsText.length > 180 && (
                <button
                  onClick={() => setShowFullIngredients((v) => !v)}
                  className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline mt-3"
                >
                  {showFullIngredients ? "Show Less" : "Show More"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      showFullIngredients ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>
          )}

          {/* 📄 DESCRIPTION CARD — same design system as Ingredients */}
          {descriptionFull && (
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm px-6 py-5">
              <h3 className="font-semibold text-slate-900 mb-2">
                Description
              </h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                {showFullDescription ? descriptionFull : descriptionPreview}
              </p>
              {descriptionFull.length > 160 && (
                <button
                  onClick={() => setShowFullDescription((v) => !v)}
                  className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline mt-3"
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      showFullDescription ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>
          )}

          {/* 🌐 SELLER WEBSITE CTA CARD — premium brand exploration */}
          {sellerWebsiteHref && (
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/30 via-white to-white shadow-sm px-6 py-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100/50 flex items-center justify-center">
                  <Globe2 size={22} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Discover more products from {activeVariant.Brand || "this brand"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
                    Explore the complete collection and latest products directly from the official website.
                  </p>
                </div>
              </div>

              <a
                href={sellerWebsiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 active-press shadow-sm"
              >
                Visit Official Website
                <ExternalLink size={16} />
              </a>
            </div>
          )}

        </div>
      </div>

      {/* 🍽️ AI PRODUCT ANALYSIS TRANSITION — compact, FOOD & DRINKS only */}
      {showFoodDrinkTransition && activeVariant.analysisReport && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
          <h3 className="font-semibold text-slate-900 text-sm mb-1">
            AI Product Analysis
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Explore Nigooda's AI-powered evaluation of ingredients, formulation quality,
            processing methods, and overall product assessment below.
          </p>
        </div>
      )}

      {/* 🎯 COMPATIBILITY NOTICE — conditional by category, above report */}
      {showCompatibilityNotice && activeVariant.analysisReport && (
        <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-5">
          <h3 className="font-semibold text-indigo-900 mb-2">
            🎯 Compatibility Matters
          </h3>
          <p className="text-sm text-indigo-800 leading-relaxed">
            An overall product rating reflects general product quality and evaluation criteria.
            Individual suitability can vary significantly based on personal needs, sensitivities,
            goals, environment, and usage requirements.
          </p>
          <p className="text-sm text-indigo-800 leading-relaxed mt-2">
            For the most relevant assessment, review the Compatibility Scores and personalized
            insights included in this analysis.
          </p>
        </div>
      )}

      {/* 📊 ANALYSIS REPORT */}
      {activeVariant.analysisReport && (
        <div className="mt-8">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-slate-200">

              <h2 className="text-2xl font-bold text-slate-900">
                Product Intelligence Report
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                AI-generated ingredient and formulation analysis
              </p>

            </div>

            <div className="p-6">
              <AnalysisMarkdown
                markdown={activeVariant.analysisReport}
              />
            </div>

            {/* AI TRANSPARENCY NOTE — shown for all categories, end of report */}
            <div className="px-6 pb-6">
              <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Nigooda ratings and analyses are generated using AI-powered evaluation systems
                  and are intended for informational purposes only. Ratings and insights may
                  evolve over time as products change, new information becomes available, and
                  our analysis models continue to improve.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ProductPage;