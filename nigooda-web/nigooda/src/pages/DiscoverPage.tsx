import { useParams } from "react-router-dom";
import ProductSection from "../components/ProductSection";

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
    description:
      "Fresh drops from premium Indian brands.",
  },
  trending: {
    title: "Trending Now",
    description:
      "What everyone is buying this week.",
  },
  "daily-use": {
    title: "Best for Daily Use",
    description:
      "Essentials that upgrade your routine.",
  },
};

const DiscoverPage = ({ products }: DiscoverPageProps) => {
  const { sectionKey } = useParams<{ sectionKey: string }>();

  if (!sectionKey || !SECTION_META[sectionKey]) {
    return (
      <div className="px-6 py-10">
        <h1 className="text-2xl font-semibold">
          Section not found
        </h1>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    switch (sectionKey) {
      case "new-launch":
        return p.isNewLaunch === true;
      case "daily-use":
        return p.isBestForDailyUse === true;
      case "trending":
        return p.isTrending === true;
      case "underrated":
        return p.isUnderrated === true;
      default:
        return false;
    }
  });

  return (
    <div className="px-6 py-10">
      <ProductSection
        title={SECTION_META[sectionKey].title}
        subtitle={SECTION_META[sectionKey].description}
        products={filteredProducts}
        showViewAll={false}
      />
    </div>
  );
};

export default DiscoverPage;