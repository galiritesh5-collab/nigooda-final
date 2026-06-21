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
  const [discoverMode, setDiscoverMode] = useState(false);

  const { categoryId, subCategory } = useParams();

  const decodedSubCategory = decodeURIComponent(subCategory || "").trim();

  /* --------------------------------
     FILTER PRODUCTS
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
  ----------------------------------*/
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    if (sortOption === "priceLowHigh") {
      sorted.sort(
        (a, b) =>
          (Number(a["Price"]) || 0) -
          (Number(b["Price"]) || 0)
      );
    } else if (sortOption === "priceHighLow") {
      sorted.sort(
        (a, b) =>
          (Number(b["Price"]) || 0) -
          (Number(a["Price"]) || 0)
      );
    } else if (sortOption === "rating") {
      sorted.sort(
        (a, b) =>
          (Number(b["Rating"]) || 0) -
          (Number(a["Rating"]) || 0)
      );
    }

    return sorted;
  }, [filteredProducts, sortOption]);

  /* --------------------------------
     GROUP VARIANTS
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

    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        const aName = (a["Variant Name"] || "").toLowerCase();
        const bName = (b["Variant Name"] || "").toLowerCase();
        return aName.localeCompare(bName);
      });
    });

    const groupArray = Object.values(groups);

    /* --------------------------------
       DISCOVER MODE
    ----------------------------------*/
    if (discoverMode) {
      return [...groupArray].sort(() => Math.random() - 0.5);
    }

    /* --------------------------------
       SORT GROUPS
    ----------------------------------*/
    if (sortOption === "priceLowHigh") {
      groupArray.sort(
        (a, b) =>
          (Number(a[0]["Price"]) || 0) -
          (Number(b[0]["Price"]) || 0)
      );
    } else if (sortOption === "priceHighLow") {
      groupArray.sort(
        (a, b) =>
          (Number(b[0]["Price"]) || 0) -
          (Number(a[0]["Price"]) || 0)
      );
    } else if (sortOption === "rating") {
      groupArray.sort((a, b) => {
        const ratingA = Math.max(
          ...a.map((p) => Number(p["Rating"]) || 0)
        );

        const ratingB = Math.max(
          ...b.map((p) => Number(p["Rating"]) || 0)
        );

        return ratingB - ratingA;
      });
    }

    return groupArray;
  }, [sortedProducts, sortOption, discoverMode]);

  /* --------------------------------
     RENDER
  ----------------------------------*/
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 space-y-4">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-lg font-semibold text-slate-900">
          {decodedSubCategory}
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDiscoverMode(!discoverMode)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              discoverMode
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            ✨ Discover New
          </button>

          <select
            value={sortOption}
            onChange={(e) => {
              setDiscoverMode(false);
              setSortOption(e.target.value);
            }}
            className="border border-slate-200 px-3 py-1.5 rounded-lg text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
          >
            <option value="default">Default</option>
            <option value="rating">Rating: High → Low</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
          </select>
        </div>
      </div>

      {groupedProducts.length === 0 ? (
        <div className="py-12 text-center text-slate-500">
          <p className="text-base">
            "{decodedSubCategory}" has no products yet.
          </p>
          <p className="text-sm mt-1">
            Products may still be loading or this subcategory has no items.
          </p>
        </div>
      ) : (
        <ProductSection
          key={`${decodedSubCategory}-${discoverMode}-${sortOption}`}
          title=""
          products={groupedProducts}
        />
      )}
    </div>
  );
};

export default SubCategoryPage;