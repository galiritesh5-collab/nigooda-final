import { useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import ProductSection from "../components/ProductSection";

/* -------------------------------
   SLUGIFY (CATEGORY ONLY)
----------------------------------*/
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");

/* -------------------------------
   PAGE
----------------------------------*/
const SubCategoryPage = ({ products: initialProducts }: { products: any[] }) => {

  const [products, setProducts] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(false);
  const [refreshSeed, setRefreshSeed] = useState(0);

  const { categoryId, subCategory } = useParams();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch(`http://localhost:5000/products?refresh=${Date.now()}`);
      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Decode URL safely
  const decodedSubCategory = decodeURIComponent(subCategory || "").trim();

  /* --------------------------------
     FILTER PRODUCTS FIRST
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

    if (sortOption === "default") {
      let shuffled = [...filteredProducts];

      if (refreshSeed > 0) {
        shuffled.sort(() => Math.random() - 0.5);
      }

      return shuffled;
    }

    let sorted = [...filteredProducts];

    if (sortOption === "priceLowHigh") {
      sorted.sort((a, b) => Number(a["Price"]) - Number(b["Price"]));
    }

    if (sortOption === "priceHighLow") {
      sorted.sort((a, b) => Number(b["Price"]) - Number(a["Price"]));
    }

    if (sortOption === "rating") {
      sorted.sort((a, b) => Number(b["Rating"]) - Number(a["Rating"]));
    }

    if (sortOption === "popular") {
      sorted.sort((a, b) => Number(b["Rating"]) - Number(a["Rating"]));
    }

    // shuffle when refresh clicked
    if (refreshSeed > 0) {
      sorted.sort(() => Math.random() - 0.5);
    }

    return sorted;

  }, [filteredProducts, sortOption, refreshSeed]);

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

    /* SORT GROUPS BASED ON FIRST PRODUCT */
    if (sortOption === "priceLowHigh") {
      groupArray.sort(
        (a, b) => Number(a[0]["Price"]) - Number(b[0]["Price"])
      );
    }

    if (sortOption === "priceHighLow") {
      groupArray.sort(
        (a, b) => Number(b[0]["Price"]) - Number(a[0]["Price"])
      );
    }

    if (sortOption === "rating") {
      groupArray.sort(
        (a, b) => Number(b[0]["Rating"]) - Number(a[0]["Rating"])
      );
    }

    if (sortOption === "popular") {
      groupArray.sort(
        (a, b) => Number(b[0]["Rating"]) - Number(a[0]["Rating"])
      );
    }

    return groupArray;

  }, [sortedProducts]);

  /* --------------------------------
     RENDER
  ----------------------------------*/
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

      <div className="flex justify-between items-center mb-6">

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="default">Default</option>
          <option value="popular">Popularity</option>
          <option value="rating">Rating</option>
          <option value="priceLowHigh">Price: Low → High</option>
          <option value="priceHighLow">Price: High → Low</option>
        </select>

        <button
          onClick={() => {
            setSortOption("default");
            setRefreshSeed(prev => prev + 1);
          }}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Reload Products
        </button>

      </div>

      {groupedProducts.length === 0 ? (
        <p className="text-slate-500">No products found.</p>
      ) : (
        <ProductSection
          key={decodedSubCategory}
          title={decodedSubCategory}
          products={groupedProducts}
        />
      )}
    </div>
  );
};

export default SubCategoryPage;