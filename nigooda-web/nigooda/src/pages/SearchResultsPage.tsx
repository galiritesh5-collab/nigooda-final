import { useLocation, useNavigate } from "react-router-dom"; // ✅ UPDATED
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../utils/searchEngine";

const SearchResultsPage = ({ products }: { products: any[] }) => {
  const query = new URLSearchParams(useLocation().search).get("q") || "";
  const navigate = useNavigate(); // ✅ ADDED

  const results = searchProducts(products, query);

  return (
    <div className="pt-28 px-6">
      <h1 className="text-2xl font-bold mb-6">
        Search Results for "{query}"
      </h1>

      {results.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((p) => {
            const image =
              p.image ||
              p.imageUrl ||
              p["Image URL"] ||
              p["Main Image"] ||
              p["image"];

            return (
              <ProductCard
                key={p.id}
                variants={[p]}
                compact
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;