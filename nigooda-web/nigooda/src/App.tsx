import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import { WishlistProvider } from "./context/WishlistContext";

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

const AppContent = () => {
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const searchedProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const terms = searchQuery.toLowerCase().split(" ").filter(Boolean);

    return products.filter((product) => {
      const name = product.name.toLowerCase();
      const tagText = product.tags.join(" ");

      return terms.some(
        (term) =>
          name.includes(term) ||
          tagText.includes(term)
      );
    });
  }, [searchQuery, products]);

  useEffect(() => {
    const loadProducts = () => {
      fetch("http://localhost:5000/products")
        .then((res) => res.json())
        .then((data) => {
          const normalized = data.map((p: any) => {
            const rawTags = p.tags || p.Tags || "";

            let cleanTags: string[] = [];

            if (Array.isArray(rawTags)) {
              cleanTags = rawTags.map((t: string) =>
                t.toLowerCase().trim()
              );
            } else if (typeof rawTags === "string") {
              cleanTags = rawTags
                .toLowerCase()
                .split(",")
                .map((t: string) => t.trim());
            }

            return {
              ...p,
              name: p["Name of Product"] || p.Name || p.name || "",
              homeSections: p.homeSections,
              tags: cleanTags,
            };
          });

          setProducts(normalized);
        })
        .catch(() => setProducts([]));
    };

    loadProducts();
    const interval = setInterval(loadProducts, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setActiveCategory(null);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans text-slate-900">
      <Navbar
        activeCategory={activeCategory}
        onCategoryClick={(id) =>
          setActiveCategory(activeCategory === id ? null : id)
        }
        onCloseCategory={() => setActiveCategory(null)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        products={products}
      />

      <div className="h-24" />

      {activeCategory && location.pathname === "/" && (
        <ExpandedCategoryPanel categoryId={activeCategory} />
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
          path="/discover/:sectionKey"
          element={<DiscoverPage products={products} />}
        />

        <Route
          path="/search"
          element={<SearchResultsPage products={products} />}
        />

        <Route
          path="/category/:categoryId"
          element={<CategoryPage products={products} />}
        />

        <Route
          path="/category/:categoryId/:subCategory"
          element={<SubCategoryPage products={products} />}
        />

        <Route
          path="/product/:id"
          element={<ProductPage products={products} />}
        />

        <Route
          path="/wishlist"
          element={<WishlistPage products={products} />}
        />

        <Route path="/admin" element={<AdminPage />} />
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