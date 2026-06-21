import { useParams, useNavigate } from "react-router-dom";
import ProductSection from "../components/ProductSection";

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

const getValidRank = (value: unknown): number | null => {
  if (value === undefined || value === null || value === "") return null;

  const rank = Number(value);

  if (Number.isNaN(rank) || rank <= 0) return null;

  return rank;
};

const CategoryLandingPage = ({ products }: { products: any[] }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const categoryProducts = products.filter((p) => {
    const categoryMatch =
      slugify(p["Primary Category"] || "") === categoryId;

    const rank = getValidRank(
      p["Subcategory Sample Rank"]
    );

    return categoryMatch && rank !== null;
  });

  const grouped: Record<string, any[]> = {};

  categoryProducts.forEach((p) => {
    const sub = p["Sub-Category"];

    if (!sub) return;

    if (!grouped[sub]) {
      grouped[sub] = [];
    }

    grouped[sub].push(p);
  });

  const rankedSubcategories: {
    sub: string;
    items: any[];
    rank: number;
  }[] = [];

  Object.entries(grouped).forEach(([sub, items]) => {
    const rank = getValidRank(
      items[0]?.["Subcategory Sample Rank"]
    );

    if (rank === null) return;

    rankedSubcategories.push({
      sub,
      items,
      rank,
    });
  });

  rankedSubcategories.sort(
    (a, b) => a.rank - b.rank
  );

  if (rankedSubcategories.length === 0) {
    return (
      <div className="p-8 text-slate-500">
        No ranked subcategories available yet.
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-16">
      {rankedSubcategories.map(({ sub, items }) => (
        <ProductSection
          key={sub}
          title={sub}
          products={items.slice(0, 8)}
          showViewAll
          onViewAll={() =>
            navigate(
              `/category/${categoryId}/${slugify(sub)}`
            )
          }
        />
      ))}
    </div>
  );
};

export default CategoryLandingPage;