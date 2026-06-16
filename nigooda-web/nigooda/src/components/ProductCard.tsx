import React from "react";
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
========================= */
const ProductCard: React.FC<{
  variants: Product[];
  compact?: boolean;
}> = ({ variants, compact = false }) => {
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
      className={`relative group bg-white rounded-2xl hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/8 transition-all duration-300 overflow-hidden ${
        compact ? "p-3" : "p-4"
      }`}
    >
      {/* WISHLIST */}
      <button
        onClick={() => toggleWishlist(activeVariant.id)}
        className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
      >
        <Heart
          size={13}
          className={`transition ${liked ? "fill-red-500 text-red-500" : "text-slate-400"}`}
        />
      </button>

      {/* IMAGE */}
      <Link to={`/product/${activeVariant.id}`}>
        <div
          className={`w-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/80 ${
            compact ? "h-28 mb-3" : "h-52 mb-4"
          }`}
        >
          <img
            src={activeVariant["Main Image URL"]}
            className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            alt={activeVariant["Name of Product"]}
          />
        </div>
      </Link>

      {/* INFO */}
      <div className="px-0.5">
        {/* BRAND */}
        {activeVariant.Brand && (
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
            {activeVariant.Brand}
          </p>
        )}

        {/* PRODUCT NAME */}
        <h3
          className={`line-clamp-2 text-slate-800 font-medium leading-snug ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {activeVariant["Name of Product"]}
        </h3>

        {/* WEIGHT / SIZE */}
        {activeVariant["Weight / Size"] && (
          <p className="text-[11px] text-slate-400 mt-1">
            {activeVariant["Weight / Size"]}
          </p>
        )}

        {/* PRICE */}
        {activeVariant.Price && (
          <p
            className={`mt-2 font-semibold text-slate-900 ${
              compact ? "text-xs" : "text-sm"
            }`}
          >
            ₹{activeVariant.Price}
          </p>
        )}
      </div>

      {/* VARIANT THUMBNAILS */}
      {safeVariants.length > 1 && (
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {safeVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariant(variant)}
              className={`w-8 h-8 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                activeVariant.id === variant.id
                  ? "border-slate-900 shadow-sm"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <img
                src={variant["Main Image URL"]}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================
   PRODUCT SECTION
========================= */
const ProductSection = ({
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
    <section className="px-4 md:px-6 py-6">
      {title && (
        <h2 className="text-xl font-bold text-slate-900 mb-5 tracking-tight">{title}</h2>
      )}

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
};

export default ProductSection;