import { useState, useMemo } from "react";

type Product = {
  id: string;
  Brand?: string;
  "Name of Product"?: string;
  "Main Image URL"?: string;
  "Primary Category"?: string;
  "Sub-Category"?: string;
  Price?: number;
  "Weight / Size"?: string;
  "Short Description"?: string;
  "Seller Website"?: string;
  "Variant Group ID"?: string;
  "Variant Name"?: string;
  Tags?: string;
  Status?: string;
  "Subcategory Sample Rank"?: number;
};

const ProductsAdmin = ({
  products,
  activeCategory,
  activeSubCategory,
  refresh,
  onDirtyChange,
}: {
  products: Product[];
  activeCategory: string | null;
  activeSubCategory: string;
  refresh: () => void;
  onDirtyChange: (dirty: boolean) => void;
}) => {
  const [savingId, setSavingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  /* ✅ SIMPLE FILTER (NO useMemo) */
  const filteredProducts = products.filter((p) => {
    const primary = (p["Primary Category"] || "").trim();
    const sub = (p["Sub-Category"] || "").trim();

    if (activeCategory && primary !== activeCategory.trim()) return false;
    if (activeSubCategory && sub !== activeSubCategory.trim()) return false;

    return true;
  });

  /* ✅ GROUP AFTER FILTER */
  const displayProducts = useMemo(() => {
    const groupedProducts = filteredProducts.reduce((acc, p) => {
      const groupId = String(p["Variant Group ID"] || "").trim();

      if (groupId === "") {
        acc[p.id] = [p];
      } else {
        if (!acc[groupId]) acc[groupId] = [];
        acc[groupId].push(p);
      }

      return acc;
    }, {} as Record<string, Product[]>);

    return Object.values(groupedProducts).flat();
  }, [filteredProducts]);

  /* =========================
     SELECT / DESELECT
  ========================= */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const allIds = displayProducts.map((p) => p.id);
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : allIds);
  };

  /* =========================
     BULK DELETE
  ========================= */
  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;

    if (!window.confirm(`Delete ${selectedIds.length} products permanently?`))
      return;

    onDirtyChange(true);

    await fetch("http://localhost:5000/products/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedIds }),
    });

    setSelectedIds([]);
    onDirtyChange(false);
    refresh();
  };

  /* =========================
     UPDATE / DELETE
  ========================= */
  const update = async (id: string, updates: Partial<Product>) => {
    setSavingId(id);
    onDirtyChange(true);

    await fetch(`http://localhost:5000/products/${id}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    setSavingId(null);
    onDirtyChange(false);
    refresh();
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this product permanently?")) return;

    onDirtyChange(true);

    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });

    onDirtyChange(false);
    refresh();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Products</h2>

      {selectedIds.length > 0 && (
        <div className="flex items-center gap-4 bg-red-50 border border-red-200 p-3 rounded">
          <div className="text-sm text-red-700">
            {selectedIds.length} selected
          </div>

          <button
            onClick={bulkDelete}
            className="px-4 py-1.5 bg-red-600 text-white rounded text-sm"
          >
            Delete Selected
          </button>

          <button
            onClick={() => setSelectedIds([])}
            className="text-sm underline"
          >
            Clear
          </button>
        </div>
      )}

      <div className="overflow-x-auto border bg-white">
        <table className="min-w-[1700px] text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={
                    displayProducts.length > 0 &&
                    displayProducts.every((p) =>
                      selectedIds.includes(p.id)
                    )
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Image</th>
              <th>Brand</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Description</th>
              <th>Website</th>
              <th>Variant Group</th>
              <th>Variant Name</th>
              <th>Tags</th>
              <th className="p-3 text-left w-24">Sample Rank</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {displayProducts.map((p) => (
              <tr
                key={`${p.id}-${activeCategory}-${activeSubCategory}`}
                className="border-t"
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p.id)}
                    onChange={() => toggleSelect(p.id)}
                  />
                </td>

                <td className="p-2 font-mono">{p.id}</td>

                <td className="p-2">
                  <img
                    src={p["Main Image URL"]}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <input
                    className="border mt-1 px-1 py-0.5 w-32"
                    defaultValue={p["Main Image URL"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Main Image URL": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-32"
                    defaultValue={p.Brand}
                    onBlur={(e) =>
                      update(p.id, { Brand: e.target.value })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-48"
                    defaultValue={p["Name of Product"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Name of Product": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-32"
                    defaultValue={p["Primary Category"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Primary Category": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-32"
                    defaultValue={p["Sub-Category"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Sub-Category": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    className="border px-2 py-1 w-24"
                    defaultValue={p.Price}
                    onBlur={(e) =>
                      update(p.id, {
                        Price: Number(e.target.value),
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-28"
                    defaultValue={p["Weight / Size"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Weight / Size": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <textarea
                    className="border px-2 py-1 w-64 h-20"
                    defaultValue={p["Short Description"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Short Description": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-40"
                    defaultValue={p["Seller Website"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Seller Website": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-32"
                    defaultValue={p["Variant Group ID"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Variant Group ID": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    className="border px-2 py-1 w-32"
                    defaultValue={p["Variant Name"]}
                    onBlur={(e) =>
                      update(p.id, {
                        "Variant Name": e.target.value,
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <textarea
                    className="border px-2 py-1 w-48 h-16"
                    defaultValue={p.Tags}
                    onBlur={(e) =>
                      update(p.id, { Tags: e.target.value })
                    }
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    min={1}
                    className="border px-2 py-1 rounded w-20"
                    defaultValue={p["Subcategory Sample Rank"] ?? ""}
                    placeholder="1–10"
                    onBlur={(e) =>
                      update(p.id, {
                        "Subcategory Sample Rank":
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      })
                    }
                  />
                </td>

                <td className="p-2">
                  <select
                    defaultValue={p.Status}
                    onChange={(e) =>
                      update(p.id, { Status: e.target.value })
                    }
                    className="border px-2 py-1"
                  >
                    <option value="Live">Live</option>
                    <option value="Draft">Draft</option>
                  </select>

                  {savingId === p.id && (
                    <div className="text-xs text-slate-500">
                      Saving…
                    </div>
                  )}
                </td>

                <td className="p-2">
                  <button
                    onClick={() => remove(p.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsAdmin;