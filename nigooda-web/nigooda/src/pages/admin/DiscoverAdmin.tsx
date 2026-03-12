import { useEffect, useMemo, useState } from "react";

/* =========================
   TYPES
========================= */
type Product = {
  id: string | number;
  name?: string;
  Name?: string;
  Brand?: string;
  Status?: string;
  homeSections?: string[];
  isUnderrated?: boolean;
  isNewLaunch?: boolean;
  isTrending?: boolean;
  isBestForDailyUse?: boolean;
};

type DiscoverMap = {
  [sectionKey: string]: string[];
};

/* =========================
   CANONICAL DISCOVER SECTIONS
========================= */
const DISCOVER_SECTIONS = [
  { key: "underrated", label: "Underrated Finds" },
  { key: "new-launch", label: "New Launches" },
  { key: "trending", label: "Trending Now" },
  { key: "daily-use", label: "Best for Daily Use" },
];

/* =========================
   COMPONENT
========================= */
const DiscoverAdmin = ({
  products,
  refresh,
}: {
  products: Product[];
  refresh?: () => void;
}) => {
  const [discoverMap, setDiscoverMap] = useState<DiscoverMap>({});
  const [activeSection, setActiveSection] = useState(
    DISCOVER_SECTIONS[0].key
  );
  const [isDirty, setIsDirty] = useState(false);

  /* =========================
     BUILD DISCOVER MAP FROM BOOLEAN FLAGS
  ========================= */
  useEffect(() => {
    const map: DiscoverMap = {
      "underrated": [],
      "new-launch": [],
      "trending": [],
      "daily-use": [],
    };

    products.forEach((p) => {
      const id = String(p.id);

      if (p.isUnderrated) map["underrated"].push(id);
      if (p.isNewLaunch) map["new-launch"].push(id);
      if (p.isTrending) map["trending"].push(id);
      if (p.isBestForDailyUse) map["daily-use"].push(id);
    });

    setDiscoverMap(map);
  }, [products]);

  const productById = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((p) => map.set(String(p.id), p));
    return map;
  }, [products]);

  /* =========================
     SAVE
  ========================= */
  const handleSave = async () => {
    console.log("Saving discover changes...");
    console.log("Discover Map:", discoverMap);

    for (const product of products) {
      const id = String(product.id);

      const updates = {
        isNewLaunch: discoverMap["new-launch"]?.includes(id) || false,
        isBestForDailyUse: discoverMap["daily-use"]?.includes(id) || false,
        isTrending: discoverMap["trending"]?.includes(id) || false,
        isUnderrated: discoverMap["underrated"]?.includes(id) || false,
      };

      await fetch(`http://localhost:5000/products/${id}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    }

    setIsDirty(false);
    refresh?.();
    alert("Saved successfully");
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Discover Sections</h2>

      <div className="flex gap-3">
        {DISCOVER_SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              activeSection === s.key
                ? "bg-indigo-600 text-white"
                : "bg-slate-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ADD PRODUCT BY ID */}
      <div className="max-w-md space-y-2">
        <label className="text-xs font-semibold">
          Add Product by ID
        </label>

        <input
          type="text"
          placeholder="Enter product ID and press Enter"
          className="w-full border rounded px-3 py-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const id = e.currentTarget.value.trim();

              if (!id) return;

              const exists = products.find(
                (p) => String(p.id) === id
              );

              if (!exists) {
                alert("Product ID not found");
                return;
              }

              if (
                discoverMap[activeSection]?.includes(id)
              ) {
                alert("Already added");
                return;
              }

              setIsDirty(true);
              setDiscoverMap((prev) => ({
                ...prev,
                [activeSection]: [
                  ...(prev[activeSection] || []),
                  id,
                ],
              }));

              e.currentTarget.value = "";
            }
          }}
        />
      </div>

      {/* LIST */}
      <div className="border rounded bg-white">
        {(discoverMap[activeSection] || []).map(
          (id, index) => {
            const product = products.find(
              (p) => String(p.id) === id
            );

            return (
              <div
                key={id}
                className="flex justify-between items-center px-4 py-3 border-t"
              >
                <div>
                  <p className="text-sm font-medium">
                    {product?.["Name of Product"] ||
                      product?.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    ID: {id} • {product?.Brand}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => {
                      if (index === 0) return;
                      const updated = [
                        ...discoverMap[activeSection],
                      ];
                      [
                        updated[index - 1],
                        updated[index],
                      ] = [
                        updated[index],
                        updated[index - 1],
                      ];

                      setIsDirty(true);
                      setDiscoverMap((prev) => ({
                        ...prev,
                        [activeSection]: updated,
                      }));
                    }}
                  >
                    ↑
                  </button>

                  <button
                    onClick={() => {
                      const updated = [
                        ...discoverMap[activeSection],
                      ];
                      if (index === updated.length - 1) return;

                      [
                        updated[index + 1],
                        updated[index],
                      ] = [
                        updated[index],
                        updated[index + 1],
                      ];

                      setIsDirty(true);
                      setDiscoverMap((prev) => ({
                        ...prev,
                        [activeSection]: updated,
                      }));
                    }}
                  >
                    ↓
                  </button>

                  <button
                    onClick={() => {
                      setIsDirty(true);
                      setDiscoverMap((prev) => ({
                        ...prev,
                        [activeSection]:
                          prev[activeSection].filter(
                            (x) => x !== id
                          ),
                      }));
                    }}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          }
        )}

        {(discoverMap[activeSection] || []).length === 0 && (
          <p className="p-4 text-sm text-slate-500">
            No products added yet.
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          disabled={!isDirty}
          onClick={handleSave}
          className={`px-6 py-2 rounded ${
            isDirty
              ? "bg-indigo-600 text-white"
              : "bg-slate-300 text-slate-600"
          }`}
        >
          Save Discover Changes
        </button>
      </div>
    </div>
  );
};

export default DiscoverAdmin;