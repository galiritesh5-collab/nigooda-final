import { useWishlist } from "../context/WishlistContext";
import ProductSection from "../components/ProductSection";

const WishlistPage = ({ products }: { products: any[] }) => {
  const { wishlist } = useWishlist();

  const wishlistProducts = products.filter((p) =>
    wishlist.includes(p.id)
  );

  // group same as subcategory page
  const groups: Record<string, any[]> = {};

  wishlistProducts.forEach((p) => {
    const groupId =
      p["Variant Group ID"] && p["Variant Group ID"] !== "NA"
        ? p["Variant Group ID"]
        : `single-${p.id}`;

    if (!groups[groupId]) groups[groupId] = [];
    groups[groupId].push(p);
  });

  const grouped = Object.values(groups);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

      {grouped.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <ProductSection products={grouped} />
      )}
    </div>
  );
};

export default WishlistPage;
