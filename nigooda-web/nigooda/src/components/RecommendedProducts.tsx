import React, { useEffect, useState } from "react";
import ProductSection from "./ProductSection";
import { API_URL } from "../config";

interface Props {
  category?: string;
  subcategory?: string;
  ingredients?: string[];
}

const RecommendedProducts: React.FC<Props> = ({
  category,
  subcategory,
  ingredients = [],
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  async function loadRecommendations() {
    try {
      const params = new URLSearchParams();

      if (category) {
        params.append("category", category);
      }

      if (subcategory) {
        params.append("subcategory", subcategory);
      }

      if (ingredients.length) {
        params.append(
          "ingredients",
          ingredients.join(",")
        );
      }

      params.append("limit", "15");

      const response = await fetch(
        `${API_URL}/api/recommendations?${params}`
      );

      const data = await response.json();

      setProducts(data || []);
    } catch (err) {
      console.error(
        "Failed loading recommendations",
        err
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading recommendations...
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  const groupedProducts = products.map(
    (group: any) => group.variants
  );

  return (
    <div className="mt-12 border-t pt-10">

      <h2 className="text-3xl font-black text-gray-900 mb-2">
        Recommended Products
      </h2>

      <p className="text-gray-500 mb-6">
        Similar products you may like
      </p>

      <ProductSection
        products={groupedProducts}
      />

      <div className="flex justify-center mt-6">
        <button
          className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition"
        >
          View All
        </button>
      </div>

    </div>
  );
};

export default RecommendedProducts;