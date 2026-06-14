import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import FoodBarcodePage from "./pages/FoodBarcodePage";
import { useEffect, useState } from "react";
import ProductIntelligencePage from "./pages/ProductIntelligencePage";
import AnalyzeProductPage from "./pages/AnalyzeProductPage";
import ProductAnalysisResultPage from "./pages/ProductAnalysisResultPage";
import FoodAnalysisResultPage from "./pages/FoodAnalysisResultPage";
import { WishlistProvider } from "./context/WishlistContext";
import AnalyzeFoodPage from "./pages/AnalyzeFoodPage";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExpandedCategoryPanel from "./components/ExpandedCategoryPanel";
import DiscoverSection from "./components/DiscoverSection";

import DiscoverPage from "./pages/DiscoverPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";

/* ============================================================
   NORMALIZE A SINGLE FLAT PRODUCT FROM THE SERVER
   The server returns a flat array of variant objects.
   We normalize each one into a consistent shape.
============================================================ */
function normalizeProduct(p: any) {
  // Handle tags — may be array or comma-separated string
  const rawTags = p.tags || p.Tags || "";
  let cleanTags: string[] = [];

  if (Array.isArray(rawTags)) {
    cleanTags = rawTags.map((t: string) =>
      t.toLowerCase().trim()
    );
  } else if (typeof rawTags === "string" && rawTags) {
    cleanTags = rawTags
      .toLowerCase()
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);
  }

  return {
    // Spread all raw fields first
    ...p,

    // Canonical name field
    name: p["Name of Product"] || p.Name || p.name || "",

    // Normalize tags to lowercase string array
    tags: cleanTags,

    // Explicitly preserve boolean discover flags
    // Use Boolean() to handle "true"/"false" strings and numbers
    isNewLaunch: Boolean(p.isNewLaunch),
    isBestForDailyUse: Boolean(p.isBestForDailyUse),
    isTrending: Boolean(p.isTrending),
    isUnderrated: Boolean(p.isUnderrated),
  };
}

const AppContent = () => {

  const location = useLocation();

  const [activeCategory, setActiveCategory] =
    useState<string | null>(null);

  const [products, setProducts] =
    useState<any[]>([]);

  // Search query for navbar
  const [searchQuery, setSearchQuery] =
    useState("");

  /* ============================================================
     LOAD PRODUCTS FROM BACKEND
     Server returns: flat array of variant objects (Product[])
     FIX: iterate flat array directly (not as group.variants)
  ============================================================ */
  useEffect(() => {

    const loadProducts = () => {

      fetch("http://localhost:5000/products")

        .then((res) => res.json())

        .then((data: any) => {
          // data is a flat array — normalize each item directly
          const rawArray = Array.isArray(data)
            ? data
            : (data.products || []);

          const normalized = rawArray.map(normalizeProduct);

          setProducts(normalized);
        })

        .catch(() => setProducts([]));

    };

    loadProducts();

    // Poll every 5 seconds (reduced from 3 to lighten load)
  

  }, []);

  useEffect(() => {
    setActiveCategory(null);
  }, [location.pathname]);

  return (

    <div className="min-h-screen font-sans text-slate-900">

      <Navbar
        activeCategory={activeCategory}
        onCategoryClick={(id) =>
          setActiveCategory(
            activeCategory === id ? null : id
          )
        }
        onCloseCategory={() => setActiveCategory(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={products}
      />

      <div className="h-24" />

      {activeCategory &&
        location.pathname === "/" && (

          <ExpandedCategoryPanel
            categoryId={activeCategory}
          />

      )}

      <Routes>

        <Route
          path="/"
          element={
            <>

              <Hero />

              <DiscoverSection
                title="New Launches"
                description="Fresh drops from premium brands."
                sectionKey="new-launch"
                products={products}
              />

              <DiscoverSection
                title="Best for Daily Use"
                description="Essentials that upgrade your routine."
                sectionKey="daily-use"
                products={products}
              />

              <DiscoverSection
                title="Trending Now"
                description="What everyone is buying this week."
                sectionKey="trending"
                products={products}
              />

              <DiscoverSection
                title="Underrated Finds"
                description="Hidden gems worth discovering."
                sectionKey="underrated"
                products={products}
              />

            </>
          }
        />

        <Route
          path="/analyze/food/:type"
          element={<AnalyzeFoodPage />}
        />

        <Route
          path="/product-intelligence"
          element={<ProductIntelligencePage />}
        />

        <Route
          path="/food-analysis-result"
          element={<FoodAnalysisResultPage />}
        />

        <Route
          path="/product-analysis-result"
          element={<ProductAnalysisResultPage />}
        />

        <Route
          path="/analyze/:category"
          element={<AnalyzeProductPage />}
        />

        <Route
          path="/analyze/:category/:section/:product"
          element={<AnalyzeProductPage />}
        />

        <Route
          path="/discover/:sectionKey"
          element={
            <DiscoverPage products={products} />
          }
        />

        <Route
          path="/scan/barcode"
          element={<FoodBarcodePage />}
        />

        <Route
          path="/search"
          element={
            <SearchResultsPage products={products} />
          }
        />

        <Route
          path="/category/:categoryId"
          element={
            <CategoryPage products={products} />
          }
        />

        <Route
          path="/food-barcode"
          element={<FoodBarcodePage />}
        />

        <Route
          path="/category/:categoryId/:subCategory"
          element={
            <SubCategoryPage products={products} />
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProductPage products={products} />
          }
        />

        <Route
          path="/wishlist"
          element={
            <WishlistPage products={products} />
          }
        />

        <Route
          path="/admin"
          element={<AdminPage />}
        />

      </Routes>

    </div>

  );

};

const App = () => {

  return (

    <WishlistProvider>

      <AppContent />

    </WishlistProvider>

  );

};

export default App;
