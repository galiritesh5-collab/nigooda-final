
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

  // Filter products for this section using boolean flags
  const filteredProducts = products.filter((p) => {
    if (sectionKey === "new-launch") return Boolean(p.isNewLaunch);
    if (sectionKey === "daily-use") return Boolean(p.isBestForDailyUse);
    if (sectionKey === "trending") return Boolean(p.isTrending);
    if (sectionKey === "underrated") return Boolean(p.isUnderrated);
    return false;
  });

  // Don't render section if no products
  if (filteredProducts.length === 0) return null;

  // Group into variant arrays for ProductSection
  // (since backend returns flat, we wrap each product in [p] for now)
  const groupedForSection: any[][] = filteredProducts
    .slice(0, 8)
    .map((p) => [p]);

  return (
    <div className="mb-16">

      <div className="flex items-end justify-between px-4 md:px-6 xl:px-8 mb-6">

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>

          <p className="text-base text-slate-500 mt-1">
            {description}
          </p>
        </div>

        <Link
          to={`/discover/${sectionKey}`}
          className="group flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View All

          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>

      </div>

      <ProductSection
        title=""
        products={groupedForSection}
      />

    </div>
  );
};

export default DiscoverSection;
