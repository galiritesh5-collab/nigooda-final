import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { CATEGORIES } from "../constants";
import ProductSection from "../components/ProductSection";

/* -------------------------------
   UTILS
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
const CategoryPage = ({ products }: { products: any[] }) => {
  const { categoryId } = useParams();
  const [showSubCategories, setShowSubCategories] = useState(false);

  const category = CATEGORIES.find(
    (c) => c.id === categoryId
  );

  if (!category) {
    return (
      <div className="p-8 text-center text-slate-600">
        Category not found
      </div>
    );
  }

  /* -------------------------------
     FILTER PRODUCTS BY CATEGORY
  ----------------------------------*/
  const categoryProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p["Primary Category"] &&
          slugify(p["Primary Category"]) === slugify(categoryId || "")
      ),
    [products, categoryId]
  );

  /* -------------------------------
     GROUP BY SUBCATEGORY
  ----------------------------------*/
  const productsBySubCategory = useMemo(() => {
    const map: Record<string, any[]> = {};

    categoryProducts.forEach((p) => {
      const sub = p["Sub-Category"];
      if (!sub) return;

      if (!map[sub]) map[sub] = [];
      map[sub].push(p);
    });

    return map;
  }, [categoryProducts]);

  const subCategories = Object.keys(productsBySubCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
      {/* CATEGORY HEADER */}
      <div className="flex items-center justify-between select-none">
        <h1
          className="text-2xl font-bold uppercase tracking-wide cursor-pointer"
          onMouseDown={() => setShowSubCategories((v) => !v)}
          onTouchStart={() => setShowSubCategories((v) => !v)}
        >
          {category.label}
        </h1>

        <span className="text-sm text-slate-500">
          {showSubCategories ? "▲" : "▼"}
        </span>
      </div>

      {/* STICKY SUBCATEGORY BAR */}
      {showSubCategories && (
        <div className="sticky top-14 z-30 bg-white shadow-md rounded-xl px-3 py-3">
          <div className="flex gap-3 overflow-x-auto">
            {subCategories.map((sub) => (
              <Link
                key={sub}
                to={`/category/${categoryId}/${encodeURIComponent(sub)}`}
                className="
                  shrink-0
                  px-5
                  py-2.5
                  rounded-full
                  bg-slate-100
                  text-sm
                  font-medium
                  hover:bg-indigo-100
                  active:scale-95
                  transition
                "
              >
                {sub}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY PREVIEW SECTIONS */}
      {Object.entries(productsBySubCategory).map(
        ([subCategory, items]) => {
          const previewProducts = items
            .filter(
              (p) =>
                typeof p["Subcategory Sample Rank"] === "number"
            )
            .sort(
              (a, b) =>
                a["Subcategory Sample Rank"] -
                b["Subcategory Sample Rank"]
            )
            .slice(0, 8);

          return (
            <div key={subCategory} className="space-y-4">
              <div className="flex items-center justify-between">
                <Link
                  to={`/category/${categoryId}/${encodeURIComponent(
                    subCategory
                  )}`}
                  className="text-lg font-semibold hover:text-indigo-600"
                >
                  {subCategory}
                </Link>

                <Link
                  to={`/category/${categoryId}/${encodeURIComponent(
                    subCategory
                  )}`}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  View all →
                </Link>
              </div>

              {previewProducts.length > 0 && (
                <ProductSection
                  title=""
                  products={previewProducts}
                  compact
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
};

export default CategoryPage;