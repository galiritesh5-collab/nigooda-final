import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  brand?: string;
  price?: string | number;
  ["Main Image URL"]?: string;
  ["Name of Product"]?: string;
  Brand?: string;
  Price?: number;
  ["Weight / Size"]?: string;
};

type Props = {
  variants: Product[];
  compact?: boolean;
};

const ProductCard = ({ variants, compact = false }: Props) => {
  const navigate = useNavigate();

  const safeVariants = Array.isArray(variants) ? variants : [];

  if (!safeVariants || safeVariants.length === 0) return null;

  // since you don't have variant switcher → use first variant
  const product = safeVariants[0];

  // ✅ UPDATED IMAGE (removed localhost logic)
  const image = product["Main Image URL"] || "/placeholder.png";

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className={`bg-white border rounded-xl cursor-pointer hover:shadow-md transition
      ${compact ? "p-3" : "p-4"}`}
    >
      {/* IMAGE */}
      <div className="w-full flex justify-center">
        <img
          src={image}
          alt={product["Name of Product"]}
          className={`object-contain mb-3
          ${compact ? "h-32" : "h-48"}`}
        />
      </div>

      {/* BRAND */}
      <p className="text-[11px] text-slate-500 mb-1">
        {product.Brand}
      </p>

      {/* PRODUCT NAME */}
      <h3
        className={`font-medium leading-snug line-clamp-2 ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {product["Name of Product"]}
      </h3>

      {/* WEIGHT / SIZE */}
      <p className="text-[11px] text-slate-500 mt-1">
        {product["Weight / Size"]}
      </p>

      {/* PRICE */}
      {product.Price > 0 && (
        <p className="mt-1 font-semibold text-sm text-slate-900">
          ₹{product.Price}
        </p>
      )}
    </div>
  );
};

export default ProductCard;