import { useEffect, useMemo, useState } from "react";
import DiscoverAdmin from "./admin/DiscoverAdmin";
import ProductsAdmin from "./admin/ProductsAdmin";
import CategorySelector from "./admin/CategorySelector";

/* =========================
   CONSTANTS
========================= */
const ALL_CATEGORIES = [
  "Food",
  "Drinks",
  "Personal Care",
  "Women",
  "Men",
  "Pets",
  "Kids",
  "Toys & Learning",
  "Baby Care",
  "Fitness & Wellness",
  "Home, Decor & Kitchen",
  "Electronics & Smart Products",
];

/* =========================
   TYPES
========================= */
type Product = {
  id: string;
  Brand?: string;
  "Name of Product"?: string;
  "Primary Category"?: string;
  "Sub-Category"?: string;
  Price?: number;
  Status?: string;
  "Variant Group ID"?: string;
  "Variant Name"?: string;
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<"discover" | "products">("discover");
  const [isProductsDirty, setIsProductsDirty] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "done" | "error"
  >("idle");

  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState("");

  /* =========================
     FETCH PRODUCTS
  ========================= */
  const fetchProducts = () => {
    fetch("http://localhost:5000/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  };

  /* ✅ NEW — FETCH ON PAGE LOAD (for Discover tab) */
  useEffect(() => {
    fetchProducts();
  }, []);

  /* ✅ FETCH ON CATEGORY CHANGE */
  useEffect(() => {
    if (activeCategory) {
      fetchProducts();
    }
  }, [activeCategory]);

  /* =========================
     UPLOAD
  ========================= */
  const handleUpload = async () => {
    if (!file || !activeCategory) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", activeCategory);

    try {
      setIsUploading(true);
      setUploadStatus("uploading");

      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setUploadStatus("done");
      setFile(null);
      fetchProducts();
    } catch {
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  /* =========================
     SUBCATEGORIES
  ========================= */
  const subCategories = useMemo(() => {
    if (!activeCategory) return [];

    return Array.from(
      new Set(
        products
          .filter(
            (p) =>
              p["Primary Category"]?.trim() === activeCategory.trim()
          )
          .map((p) => p["Sub-Category"]?.trim())
          .filter(Boolean)
      )
    );
  }, [products, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">
      <h1 className="text-3xl font-bold">Admin</h1>

      {/* TABS */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("discover")}
          className={`px-4 py-2 rounded ${
            activeTab === "discover"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Discover
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded ${
            activeTab === "products"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Products
        </button>
      </div>

      {/* UPLOAD */}
      <div className="border rounded-xl p-6 bg-white space-y-4">
        <h2 className="text-lg font-semibold">
          Bulk Upload Products (by Category)
        </h2>

        <select
          value={activeCategory || ""}
          onChange={(e) => {
            setProducts([]);
            setActiveCategory(e.target.value);
            setActiveSubCategory("");
          }}
          className="border px-3 py-2 rounded w-64"
        >
          <option value="">Select Category</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="file"
          accept=".xlsx,.json"
          onChange={(e) =>
            e.target.files && setFile(e.target.files[0])
          }
        />

        <button
          disabled={!file || !activeCategory || isUploading}
          onClick={handleUpload}
          className="px-5 py-2 bg-indigo-600 text-white rounded"
        >
          {isUploading ? "Uploading…" : "Upload"}
        </button>

        {/* ✅ DOWNLOAD BUTTON ADDED */}
        <button
          onClick={() =>
            window.open("http://localhost:5000/download-products", "_blank")
          }
          className="bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Download Products (Excel)
        </button>

        {uploadStatus === "done" && (
          <div className="text-green-600">✅ Uploaded Successfully</div>
        )}
        {uploadStatus === "error" && (
          <div className="text-red-600">❌ Upload Failed</div>
        )}
      </div>

      {/* PRODUCTS */}
      {activeTab === "products" && activeCategory && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => {
                setActiveCategory(null);
                setActiveSubCategory("");
                setProducts([]);
              }}
              className="text-sm underline"
            >
              ← Back
            </button>

            <h2 className="text-lg font-semibold">
              {activeCategory}
            </h2>

            <select
              value={activeSubCategory}
              onChange={(e) =>
                setActiveSubCategory(e.target.value)
              }
              className="border px-3 py-2 rounded"
            >
              <option value="">All Subcategories</option>
              {subCategories.map((sc) => (
                <option key={sc}>{sc}</option>
              ))}
            </select>
          </div>

          <ProductsAdmin
            key={`${activeCategory}-${activeSubCategory}`}
            products={products}
            activeCategory={activeCategory}
            activeSubCategory={activeSubCategory}
            refresh={fetchProducts}
            onDirtyChange={setIsProductsDirty}
          />
        </>
      )}

      {activeTab === "discover" && (
        <DiscoverAdmin products={products} refresh={fetchProducts} />
      )}
    </div>
  );
};

export default AdminPage;