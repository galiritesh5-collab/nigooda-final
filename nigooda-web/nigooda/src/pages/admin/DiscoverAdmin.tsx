import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../config";

/* =========================
   TYPES
========================= */
type Product = {
  id: string | number;
  name?: string;
  "Name of Product"?: string;
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  /* =========================
     BUILD DISCOVER MAP FROM BOOLEAN FLAGS
     Runs whenever products are reloaded
  ========================= */
  useEffect(() => {
    // Only rebuild if not dirty (user hasn't made unsaved changes)
    if (isDirty) return;

    const map: DiscoverMap = {
      underrated: [],
      "new-launch": [],
      trending: [],
      "daily-use": [],
    };

    products.forEach((p) => {
      const id = String(p.id);

      if (p.isUnderrated)      map["underrated"].push(id);
      if (p.isNewLaunch)       map["new-launch"].push(id);
      if (p.isTrending)        map["trending"].push(id);
      if (p.isBestForDailyUse) map["daily-use"].push(id);
    });

    setDiscoverMap(map);
  }, [products, isDirty]);

  // FIX: useMemo so lookup map is not rebuilt on every render
  const productById = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((p) => map.set(String(p.id), p));
    return map;
  }, [products]);

  /* =========================
     SAVE — bulk endpoint (one request, no race condition)
  ========================= */
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      // Build a list of updates for ALL products
      const updates = products.map((product) => {
        const id = String(product.id);
        return {
          id,
          isNewLaunch:       discoverMap["new-launch"]?.includes(id) || false,
          isBestForDailyUse: discoverMap["daily-use"]?.includes(id)  || false,
          isTrending:        discoverMap["trending"]?.includes(id)    || false,
          isUnderrated:      discoverMap["underrated"]?.includes(id)  || false,
        };
      });

      // Send ONE bulk request instead of N individual requests
      const res = await fetch(
        `${API_URL}/products/bulk-update-discover`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updates }),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      setIsDirty(false);
      setSaveStatus("success");
      refresh?.();

    } catch (err) {
      console.error("Save failed:", err);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Discover Sections</h2>

      {/* SECTION TABS */}
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
            <span className="ml-2 text-xs opacity-70">
              ({(discoverMap[s.key] || []).length})
            </span>
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
                alert(`Product ID "${id}" not found in loaded products`);
                return;
              }

              if (discoverMap[activeSection]?.includes(id)) {
                alert("Already added to this section");
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

      {/* PRODUCT LIST */}
      <div className="border rounded bg-white">
        {(discoverMap[activeSection] || []).length === 0 && (
          <p className="p-4 text-sm text-slate-500">
            No products added to this section yet.
          </p>
        )}

        {(discoverMap[activeSection] || []).map(
          (id, index) => {
            const product = productById.get(id);
            const name =
              product?.["Name of Product"] ||
              product?.name ||
              product?.Name ||
              `Unknown (${id})`;

            return (
              <div
                key={id}
                className="flex justify-between items-center px-4 py-3 border-t"
              >
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-slate-500">
                    ID: {id} • {product?.Brand}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  {/* Move Up */}
                  <button
                    disabled={index === 0}
                    onClick={() => {
                      if (index === 0) return;
                      const updated = [...discoverMap[activeSection]];
                      [updated[index - 1], updated[index]] = [
                        updated[index],
                        updated[index - 1],
                      ];
                      setIsDirty(true);
                      setDiscoverMap((prev) => ({
                        ...prev,
                        [activeSection]: updated,
                      }));
                    }}
                    className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    ↑
                  </button>

                  {/* Move Down */}
                  <button
                    disabled={index === (discoverMap[activeSection]?.length ?? 0) - 1}
                    onClick={() => {
                      const updated = [...discoverMap[activeSection]];
                      if (index === updated.length - 1) return;
                      [updated[index + 1], updated[index]] = [
                        updated[index],
                        updated[index + 1],
                      ];
                      setIsDirty(true);
                      setDiscoverMap((prev) => ({
                        ...prev,
                        [activeSection]: updated,
                      }));
                    }}
                    className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    ↓
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => {
                      setIsDirty(true);
                      setDiscoverMap((prev) => ({
                        ...prev,
                        [activeSection]: prev[activeSection].filter(
                          (x) => x !== id
                        ),
                      }));
                    }}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end items-center gap-4">
        {saveStatus === "success" && (
          <span className="text-green-600 text-sm">✅ Saved successfully</span>
        )}
        {saveStatus === "error" && (
          <span className="text-red-600 text-sm">❌ Save failed. Try again.</span>
        )}

        <button
          disabled={!isDirty || isSaving}
          onClick={handleSave}
          className={`px-6 py-2 rounded font-medium ${
            isDirty && !isSaving
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-slate-300 text-slate-600 cursor-not-allowed"
          }`}
        >
          {isSaving ? "Saving…" : "Save Discover Changes"}
        </button>
      </div>
    </div>
  );
};

export default DiscoverAdmin;