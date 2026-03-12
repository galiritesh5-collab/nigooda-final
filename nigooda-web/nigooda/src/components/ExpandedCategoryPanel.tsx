import React from "react";

interface ExpandedCategoryPanelProps {
  category: {
    name: string;
    items: string[];
  };
}

const ExpandedCategoryPanel: React.FC<ExpandedCategoryPanelProps> = ({
  category,
}) => {
  if (!category || !category.items?.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6 pointer-events-none">
      {/* CATEGORY TITLE */}
      <h3 className="text-lg font-semibold text-slate-900">
        {category.name}
      </h3>

      {/* SUBCATEGORIES */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {category.items.map((item) => (
          <button
            key={item}
            className="
              pointer-events-auto
              whitespace-nowrap
              px-6
              py-3
              rounded-xl
              border
              border-slate-200
              text-sm
              font-medium
              text-slate-700
              hover:bg-indigo-50
              hover:border-indigo-400
              transition
              flex-shrink-0
            "
          >
            {item}
          </button>
        ))}
      </div>

      <div className="border-b border-slate-200 mt-4" />
    </div>
  );
};

export default ExpandedCategoryPanel;
