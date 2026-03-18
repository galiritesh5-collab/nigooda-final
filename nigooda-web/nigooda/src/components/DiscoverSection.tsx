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
    <div className="mb-16">
      <div className="flex items-end justify-between px-4 md:px-6 xl:px-8 mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
          <p className="text-base text-slate-500 mt-1">{description}</p>
        </div>

        <Link
          to={`/discover/${sectionKey}`}
          className="group flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
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