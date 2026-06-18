import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductSection from "../components/ProductSection";

/* -------------------------------
   SLUGIFY — consistent with CategoryPage
----------------------------------*/
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/,/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

/* -------------------------------
   PAGE
----------------------------------*/
const SubCategoryPage = ({ products }: { products: any[] }) => {
  const [sortOption, setSortOption] = useState("default");

  const { categoryId, subCategory } = useParams();

  // Decode URL safely
  const decodedSubCategory = decodeURIComponent(subCategory || "").trim();

  /* --------------------------------
     FILTER PRODUCTS
     FIX: useMemo already present — kept as-is
  ----------------------------------*/
  const filteredProducts = useMemo(() => {
    if (!products || !categoryId || !decodedSubCategory) return [];

    return products.filter((p) => {
      const categorySlug = slugify(
        (p["Primary Category"] || "").toString().trim()
      );

      const productSubCategory = (p["Sub-Category"] || "")
        .toString()
        .trim();

      return (
        categorySlug === categoryId &&
        productSubCategory === decodedSubCategory
      );
    });
  }, [products, categoryId, decodedSubCategory]);

  /* --------------------------------
     SORT AFTER FILTER
     FIX: useMemo already present — kept as-is
  ----------------------------------*/
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    if (sortOption === "priceLowHigh") {
      sorted.sort((a, b) => Number(a["Price"]) - Number(b["Price"]));
    } else if (sortOption === "priceHighLow") {
      sorted.sort((a, b) => Number(b["Price"]) - Number(a["Price"]));
    } else if (sortOption === "rating" || sortOption === "popular") {
      sorted.sort((a, b) => Number(b["Rating"]) - Number(a["Rating"]));
    }

    return sorted;
  }, [filteredProducts, sortOption]);

  /* --------------------------------
     GROUP VARIANTS
     FIX: useMemo already present — kept as-is
  ----------------------------------*/
  const groupedProducts = useMemo(() => {
    const groups: Record<string, any[]> = {};

    sortedProducts.forEach((p) => {
      const groupId = (p["Variant Group ID"] || "").trim();

      if (groupId) {
        if (!groups[groupId]) groups[groupId] = [];
        groups[groupId].push(p);
      } else {
        groups[`single-${p.id}`] = [p];
      }
    });

    // Sort variants within each group alphabetically by variant name
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        const aName = (a["Variant Name"] || "").toLowerCase();
        const bName = (b["Variant Name"] || "").toLowerCase();
        return aName.localeCompare(bName);
      });
    });

    const groupArray = Object.values(groups);

    // Sort groups by first product's sort criteria
    if (sortOption === "priceLowHigh") {
      groupArray.sort(
        (a, b) => Number(a[0]["Price"]) - Number(b[0]["Price"])
      );
    } else if (sortOption === "priceHighLow") {
      groupArray.sort(
        (a, b) => Number(b[0]["Price"]) - Number(a[0]["Price"])
      );
    } else if (sortOption === "rating" || sortOption === "popular") {
      groupArray.sort(
        (a, b) => Number(b[0]["Rating"]) - Number(a[0]["Rating"])
      );
    }

    return groupArray;
  }, [sortedProducts, sortOption]);

  /* --------------------------------
     RENDER
  ----------------------------------*/
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 space-y-4">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-slate-900">{decodedSubCategory}</h1>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-slate-200 px-3 py-1.5 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <option value="default">Default</option>
          <option value="popular">Popularity</option>
          <option value="rating">Rating</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>
      </div>

      {groupedProducts.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <p className="text-base">“{decodedSubCategory}” has no products yet.</p>
          <p className="text-sm mt-1">
            Products may still be loading or this subcategory has no items.
          </p>
        </div>
      ) : (
        <ProductSection
          key={decodedSubCategory}
          title=""
          products={groupedProducts}
        />
      )}
    </div>
  );
};

export default SubCategoryPage;