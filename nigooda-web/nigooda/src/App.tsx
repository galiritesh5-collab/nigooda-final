import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import FoodBarcodePage from "./pages/FoodBarcodePage";
import { useEffect, useState, useMemo } from "react";
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
import { API_URL } from "./config";
import DiscoverPage from "./pages/DiscoverPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CategoryPage from "./pages/CategoryPage";
import SubCategoryPage from "./pages/SubCategoryPage";
import AdminPage from "./pages/AdminPage";
import ProductPage from "./pages/ProductPage";
import WishlistPage from "./pages/WishlistPage";
import AboutUs from "./pages/footer/AboutUs";// NEW: auth context + route guard
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
// NEW: account-area pages
import Dashboard from "./pages/Dashboard";
import MyScans from "./pages/MyScans";
import BillingPlans from "./pages/BillingPlans";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import TermsConditions from "./pages/footer/TermsConditions";
import Disclaimer from "./pages/footer/Disclaimer";
import AffiliateDisclosure from "./pages/footer/AffiliateDisclosure";
import ContactUs from "./pages/footer/ContactUs";
import RefundPolicy from "./pages/footer/RefundPolicy";
import HowRatingsWork from "./pages/footer/HowRatingsWork";
import FAQ from "./pages/footer/FAQ";
import CookiePolicy from "./pages/footer/CookiePolicy";
import ScrollToTop from "./components/ScrollToTop";
import ScanReportPage from "./pages/ScanReportPage";

// NEW: localStorage cache key for product list
const PRODUCTS_CACHE_KEY = "products_cache";

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

  // FIX: store raw products separately so normalization
  // only runs once when data arrives, not on every render
  const [rawProducts, setRawProducts] =
    useState<any[]>([]);

  // Search query for navbar
  const [searchQuery, setSearchQuery] =
    useState("");

  /* ============================================================
     LOAD PRODUCTS FROM BACKEND (WITH LOCALSTORAGE CACHE)
     Server returns: flat array of variant objects (Product[])

     Flow:
       1. Try to read cached raw products from localStorage and
          show them immediately (instant paint on return visits).
       2. Fetch fresh products from the API in the background.
       3. On success: update state + refresh the cache.
       4. On failure: keep whatever is currently shown (cached or
          empty) — never clear the UI because of a failed fetch.
  ============================================================ */
  useEffect(() => {
    // Step 1: attempt to hydrate instantly from cache
    try {
      const cachedRaw = localStorage.getItem(PRODUCTS_CACHE_KEY);
      if (cachedRaw) {
        const cachedProducts = JSON.parse(cachedRaw);
        if (Array.isArray(cachedProducts)) {
          setRawProducts(cachedProducts);
        }
      }
    } catch {
      // Invalid/corrupted cache — ignore and continue to fetch fresh data
    }

    // Step 2: fetch fresh data from the API
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data: any) => {
        const rawArray = Array.isArray(data)
          ? data
          : (data.products || []);

        // FIX: store raw, normalize via useMemo below
        setRawProducts(rawArray);

        // Step 3: refresh the cache with the latest raw products
        try {
          localStorage.setItem(
            PRODUCTS_CACHE_KEY,
            JSON.stringify(rawArray)
          );
        } catch {
          // localStorage might be unavailable (e.g. quota exceeded,
          // private mode) — safe to ignore, caching is best-effort
        }
      })
      .catch(() => {
        // Step 4: API failed — keep whatever is currently displayed
        // (cached products if we had them, otherwise empty state).
        // Do NOT call setRawProducts([]) here, so the UI isn't cleared.
      });
  }, []);

  // FIX: normalize only when rawProducts changes,
  // not on every render triggered by other state updates
  const products = useMemo(
    () => rawProducts.map(normalizeProduct),
    [rawProducts]
  );

  useEffect(() => {
    setActiveCategory(null);
  }, [location.pathname]);

  return (

    <div className="min-h-screen font-sans text-slate-900 bg-slate-50">
      <ScrollToTop />

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

        {/* ── NEW PROTECTED ROUTES ── */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-scans"
          element={
            <ProtectedRoute>
              <MyScans />
            </ProtectedRoute>
          }
        />
        <Route
  path="/my-scans/:scanId"
  element={
    <ProtectedRoute>
      <ScanReportPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <BillingPlans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pricing"
          element={<BillingPlans />}
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

    <Route path="/about" element={<AboutUs />} />

<Route
  path="/privacy-policy"
  element={<PrivacyPolicy />}
/>

<Route
  path="/cookie-policy"
  element={<CookiePolicy />}
/>

<Route
  path="/terms-and-conditions"
  element={<TermsConditions />}
/>
<Route
  path="/disclaimer"
  element={<Disclaimer />}
/>
<Route
  path="/affiliate-disclosure"
  element={<AffiliateDisclosure />}
/>
<Route
  path="/contact-us"
  element={<ContactUs />}
/>
<Route
  path="/refund-policy"
  element={<RefundPolicy />}
/>
<Route
  path="/how-ratings-work"
  element={<HowRatingsWork />}
/>
<Route
  path="/faq"
  element={<FAQ />}
/>
  </Routes>
  

  <Footer />

</div>


);

};


const App = () => {

  return (
    // NEW: AuthProvider wraps the whole tree so auth state
    // (current user, login/logout) is available to Navbar,
    // ProtectedRoute, and every page below it.
    <AuthProvider>

      <WishlistProvider>

        <AppContent />

      </WishlistProvider>

    </AuthProvider>

  );

};

export default App;