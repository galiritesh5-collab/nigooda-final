import { useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

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
}

const ProductPage = ({ products }: { products: Product[] }) => {
  const { id } = useParams();
  const { toggleWishlist, isInWishlist } = useWishlist();

  /* ----------------------------
     FIND PRODUCT
  ---------------------------- */
  const product = useMemo(() => {
    return products.find((p) => String(p.id) === String(id));
  }, [products, id]);

  /* ----------------------------
     FIND VARIANTS
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

  if (!product || !activeVariant) {
    return (
      <div className="p-10 text-slate-500">
        Product not found.
      </div>
    );
  }

  const liked = isInWishlist(activeVariant.id);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12">

      {/* ================= LEFT SIDE ================= */}
      <div className="relative flex items-center justify-center">

        {/* ❤️ WISHLIST ICON (TOP RIGHT OF IMAGE) */}
        <button
          onClick={() => toggleWishlist(activeVariant.id)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
        >
          <Heart
            size={22}
            className={`transition ${
              liked ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>

        <img
          src={activeVariant["Main Image URL"]}
          alt={activeVariant["Name of Product"]}
          className="max-h-[500px] object-contain"
        />
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="space-y-5">

        <h1 className="text-2xl font-bold">
          {activeVariant["Name of Product"]}
        </h1>

        {activeVariant.Brand && (
          <p className="text-slate-600">
            Brand: {activeVariant.Brand}
          </p>
        )}

        {/* ⭐ Rating */}
        {activeVariant.Rating && (
          <p className="text-yellow-500">
            {"★".repeat(Math.round(activeVariant.Rating))}
            {"☆".repeat(5 - Math.round(activeVariant.Rating))}
          </p>
        )}

        {/* 💰 Price */}
        {activeVariant.Price && (
          <p className="text-2xl font-semibold">
            ₹{activeVariant.Price}
          </p>
        )}

        {/* ⚖ Weight */}
        {activeVariant["Weight / Size"] && (
          <p className="text-slate-600">
            Size: {activeVariant["Weight / Size"]}
          </p>
        )}

        {/* 🎨 VARIANTS */}
        {variants.length > 1 && (
          <div>
            <p className="font-medium mb-2">Select Variant:</p>
            <div className="flex gap-3 flex-wrap">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    activeVariant.id === variant.id
                      ? "border-black"
                      : "border-gray-300"
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
          </div>
        )}

        {/* 🛒 BUY NOW BUTTON */}
        <button className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition">
          Buy Now
        </button>

        {/* 📄 DESCRIPTION */}
        {activeVariant["Short Description"] && (
          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-2">
              Product Description
            </h3>
            <p className="text-sm text-slate-600">
              {activeVariant["Short Description"]}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductPage;