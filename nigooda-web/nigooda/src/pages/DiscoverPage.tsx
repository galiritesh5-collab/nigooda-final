import { useParams } from "react-router-dom";
import ProductSection from "../components/ProductSection";
import { useMemo } from "react";

type DiscoverPageProps = {
  products: any[];
};

const SECTION_META: Record<
  string,
  { title: string; description: string }
> = {
  underrated: {
    title: "Underrated Finds",
    description:
      "Unique products you won't find on generic marketplaces.",
  },
  "new-launch": {
    title: "New Launches",
    description: "Fresh drops from premium brands.",
  },
  trending: {
    title: "Trending Now",
    description: "What everyone is buying this week.",
  },
  "daily-use": {
    title: "Best for Daily Use",
    description: "Essentials that upgrade your routine.",
  },
};

const DiscoverPage = ({ products }: DiscoverPageProps) => {
  const { sectionKey } = useParams<{ sectionKey: string }>();

  const meta = sectionKey ? SECTION_META[sectionKey] : undefined;

  if (!sectionKey || !meta) {
    return (
      <div className="px-6 py-10">
        <h1 className="text-2xl font-semibold">
          Section not found
        </h1>
      </div>
    );
  }

  // FIX: useMemo so filter only reruns when products or sectionKey changes
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      switch (sectionKey) {
        case "new-launch":  return Boolean(p.isNewLaunch);
        case "daily-use":   return Boolean(p.isBestForDailyUse);
        case "trending":    return Boolean(p.isTrending);
        case "underrated":  return Boolean(p.isUnderrated);
        default:            return false;
      }
    });
  }, [products, sectionKey]);

  // FIX: separate useMemo so grouping doesn't rerun unless filter output changes
  const groupedProducts: any[][] = useMemo(
    () => filteredProducts.map((p) => [p]),
    [filteredProducts]
  );

  return (
    <div className="px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{meta.title}</h1>
        <p className="text-slate-500 mt-1">{meta.description}</p>
        <p className="text-sm text-slate-400 mt-2">
          {filteredProducts.length} products
        </p>
      </div>

      {groupedProducts.length === 0 ? (
        <div className="py-24 text-center text-slate-400">
          <p className="text-lg">No products in this section yet.</p>
          <p className="text-sm mt-1">
            Add products via the Admin → Discover panel.
          </p>
        </div>
      ) : (
        <ProductSection
          title=""
          products={groupedProducts}
        />
      )}
    </div>
  );
};

export default DiscoverPage;