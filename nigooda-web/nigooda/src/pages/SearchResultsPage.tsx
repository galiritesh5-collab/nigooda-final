import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../utils/searchEngine";
import { useMemo } from "react";

const SearchResultsPage = ({ products }: { products: any[] }) => {
  // Read query from URL ?q=...
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  // FIX: useMemo so search only reruns when products or query changes
  const results = useMemo(
    () => searchProducts(products, query),
    [products, query]
  );

  return (
    <div className="pt-28 px-6 pb-16">

      <h1 className="text-2xl font-bold mb-2">
        Search Results for "{query}"
      </h1>

      <p className="text-sm text-slate-500 mb-8">
        {results.length} product{results.length !== 1 ? "s" : ""} found
      </p>

      {results.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
          </svg>
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try a different search term</p>
        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((p) => (
            <ProductCard
              key={p.id}
              variants={[p]}
              compact
            />
          ))}
        </div>

      )}
    </div>
  );
};

export default SearchResultsPage;