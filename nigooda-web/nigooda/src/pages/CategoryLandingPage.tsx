import { useParams, useNavigate } from "react-router-dom";
import ProductSection from "../components/ProductSection";

/* 🔥 TEMP DEBUG — DO NOT SKIP */
console.log("CATEGORY PAGE PRODUCTS:", products);

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, "-");

const CategoryLandingPage = ({ products }: { products: any[] }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  /* 🔥 TEMP DEBUG — DO NOT SKIP */
  console.log("CATEGORY ID FROM URL:", categoryId);

  const categoryProducts = products.filter(
    (p) =>
      slugify(p["Primary Category"] || "") === categoryId
  );

  const grouped: Record<string, any[]> = {};

  categoryProducts.forEach((p) => {
    const sub = p["Sub-Category"];
    if (!sub) return;
    if (!grouped[sub]) grouped[sub] = [];
    grouped[sub].push(p);
  });

  if (!Object.keys(grouped).length) {
    return (
      <div className="p-8 text-slate-500">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="px-6 py-8 space-y-16">
      {Object.entries(grouped).map(([sub, items]) => (
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
