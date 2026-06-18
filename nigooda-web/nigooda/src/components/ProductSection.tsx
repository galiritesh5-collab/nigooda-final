import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Heart } from "lucide-react";

/* =========================
   TYPES
========================= */
interface Product {
  id: string;
  Brand?: string;
  name?: string;
  Name?: string;
  "Name of Product"?: string;
  "Main Image URL"?: string;
  Price?: number;
  "Weight / Size"?: string;
  "Variant Group ID"?: string;
}

/* =========================
   PRODUCT CARD
   FIX: wrapped in React.memo so cards only re-render
   when their own variants array reference changes
========================= */
const ProductCard: React.FC<{
  variants: Product[];
  compact?: boolean;
}> = memo(({ variants, compact = false }) => {
  const safeVariants = variants.filter(Boolean);

  const [activeVariant, setActiveVariant] =
    React.useState<Product>(safeVariants[0]);

  React.useEffect(() => {
    setActiveVariant(safeVariants[0]);
  }, [variants]);

  if (!activeVariant) return null;

  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(activeVariant.id);

  return (
    <div
      className={`relative group bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 ${
        compact ? "p-3" : "p-3 md:p-4"
      }`}
    >
      {/* ❤️ WISHLIST BUTTON */}
      <button
        onClick={() => toggleWishlist(activeVariant.id)}
        className="absolute top-3 right-3"
      >
        <Heart
          size={18}
          className={`transition ${
            liked ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* MAIN IMAGE */}
      <Link to={`/product/${activeVariant.id}`}>
        <div
          className={`w-full flex items-center justify-center overflow-hidden rounded-xl ${
            compact ? "h-24 mb-2.5" : "h-40 md:h-48 mb-3"
          }`}
        >
          <img
            src={activeVariant["Main Image URL"]}
            // FIX: lazy load images — browser won't fetch off-screen images
            loading="lazy"
            decoding="async"
            className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
            alt={activeVariant["Name of Product"]}
          />
        </div>
      </Link>

      {/* PRODUCT NAME */}
      <h3
        className={`text-center line-clamp-2 text-slate-800 ${
          compact ? "text-xs font-semibold" : "text-sm font-bold leading-snug"
        }`}
      >
        {activeVariant["Name of Product"]}
      </h3>

      {/* BRAND */}
      {activeVariant.Brand && (
        <p className="text-center text-xs text-gray-500 mt-1">
          {activeVariant.Brand}
        </p>
      )}

      {/* WEIGHT / SIZE */}
      {activeVariant["Weight / Size"] && (
        <p className="text-center text-xs text-gray-500">
          {activeVariant["Weight / Size"]}
        </p>
      )}

      {/* PRICE */}
      {activeVariant.Price && (
        <p
          className={`text-center mt-3 text-indigo-600 ${
            compact ? "text-xs font-semibold" : "text-base font-bold"
          }`}
        >
          ₹{activeVariant.Price}
        </p>
      )}

      {/* 🔥 VARIANT THUMBNAIL SELECTOR */}
      {safeVariants.length > 1 && (
        <div className="flex justify-center gap-2 mt-3 flex-wrap">
          {safeVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariant(variant)}
              className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${
                activeVariant.id === variant.id
                  ? "border-black"
                  : "border-gray-300"
              }`}
            >
              <img
                src={variant["Main Image URL"]}
                alt=""
                // FIX: lazy load variant thumbnails too
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

ProductCard.displayName = "ProductCard";

/* =========================
   PRODUCT SECTION
   FIX: wrapped in React.memo so the whole section
   doesn't re-render unless its products prop changes
========================= */
const ProductSection = memo(({
  title,
  products,
  compact = false,
}: {
  title?: string;
  products: Product[][];
  compact?: boolean;
}) => {
  if (!products || !products.length) return null;

  return (
    <section className="px-3 md:px-5 py-4">
      {title && <h2 className="text-lg font-bold mb-3">{title}</h2>}

      <div
        className={`grid gap-3 ${
          compact
            ? "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        }`}
      >
        {products.map((variants) => (
          <ProductCard
            key={variants[0]?.["Variant Group ID"] || variants[0]?.id}
            variants={variants}
            compact={compact}
          />
        ))}
      </div>
    </section>
  );
});

ProductSection.displayName = "ProductSection";

export default ProductSection;