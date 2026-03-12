import { Link } from "react-router-dom";
import ProductSection from "./ProductSection";

interface DiscoverSectionProps {
  title: string;
  description: string;
  sectionKey: string;
  products: any[];
}

const DiscoverSection = ({
  title,
  description,
  sectionKey,
  products,
}: DiscoverSectionProps) => {
  // Step 1: filter flat products first
  const filteredFlatProducts = products.filter((p) => {
    if (sectionKey === "new-launch") return p.isNewLaunch;
    if (sectionKey === "daily-use") return p.isBestForDailyUse;
    if (sectionKey === "trending") return p.isTrending;
    if (sectionKey === "underrated") return p.isUnderrated;
    return false;
  });

  // Step 2: convert to variant format (temporary simple grouping)
  const groupedProducts = filteredFlatProducts.map((p) => [p]);

  if (groupedProducts.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between px-6 mb-3">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-slate-600">{description}</p>
        </div>

        <Link
          to={`/discover/${sectionKey}`}
          className="text-sm font-medium text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <ProductSection
        title=""
        products={groupedProducts.slice(0, 8)}
      />
    </div>
  );
};

export default DiscoverSection;