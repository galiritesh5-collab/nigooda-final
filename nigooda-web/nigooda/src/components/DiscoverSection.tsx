import { useMemo } from "react";
import { Link } from "react-router-dom";
import ProductSection from "./ProductSection";

interface DiscoverSectionProps {
  title: string;
  description: string;
  sectionKey: string;
  products: any[];
}

const sectionThemes: Record<
  string,
  {
    bg: string;
    accent: string;
    label: string;
    labelColor: string;
    decorColor: string;
  }
> = {
  "new-launch": {
    bg: "bg-slate-100/50",
    accent: "border-slate-200/80 shadow-sm",
    label: "New Arrivals",
    labelColor: "text-amber-700 bg-amber-50/80 border border-amber-100/60",
    decorColor: "from-amber-100/30",
  },

  "daily-use": {
    bg: "bg-slate-100/50",
    accent: "border-slate-200/80 shadow-sm",
    label: "Daily Essentials",
    labelColor: "text-blue-700 bg-blue-50/80 border border-blue-100/60",
    decorColor: "from-blue-100/30",
  },

  trending: {
    bg: "bg-slate-100/50",
    accent: "border-slate-200/80 shadow-sm",
    label: "Trending",
    labelColor: "text-purple-700 bg-purple-50/80 border border-purple-100/60",
    decorColor: "from-purple-100/30",
  },

  underrated: {
    bg: "bg-slate-100/50",
    accent: "border-slate-200/80 shadow-sm",
    label: "Hidden Gems",
    labelColor: "text-emerald-700 bg-emerald-50/80 border border-emerald-100/60",
    decorColor: "from-emerald-100/30",
  },
};

const DiscoverSection = ({
  title,
  description,
  sectionKey,
  products,
}: DiscoverSectionProps) => {

  // Memoized filtering + grouping
  // Recomputes only when products or sectionKey changes
  const groupedForSection = useMemo(() => {
    const filtered = products.filter((p) => {
      if (sectionKey === "new-launch") {
        return Boolean(p.isNewLaunch);
      }

      if (sectionKey === "daily-use") {
        return Boolean(p.isBestForDailyUse);
      }

      if (sectionKey === "trending") {
        return Boolean(p.isTrending);
      }

      if (sectionKey === "underrated") {
        return Boolean(p.isUnderrated);
      }

      return false;
    });

    // ProductSection expects grouped arrays
    return filtered.slice(0, 8).map((p) => [p]);
  }, [products, sectionKey]);

  // Don't render empty sections
  if (groupedForSection.length === 0) return null;

  const theme =
    sectionThemes[sectionKey] ?? {
      bg: "bg-slate-50",
      accent: "border-slate-200/60",
      label: title,
      labelColor: "text-slate-700 bg-slate-100/80",
      decorColor: "from-slate-100/60",
    };

  return (
    <div className="px-3 md:px-6 mb-5">

      <div
        className={`relative rounded-3xl border ${theme.accent} ${theme.bg} overflow-hidden`}
      >

        {/* Decorative glow */}
        <div
          className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-radial ${theme.decorColor} to-transparent blur-3xl`}
        />

        {/* HEADER */}
        <div className="relative flex items-start justify-between px-5 md:px-8 pt-5 md:pt-6 pb-3">

          <div>

            <div
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase mb-4 ${theme.labelColor}`}
            >
              {theme.label}
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
              {title}
            </h2>

            <p className="text-sm text-slate-500 mt-1.5 max-w-lg">
              {description}
            </p>

          </div>

          <Link
            to={`/discover/${sectionKey}`}
            className="shrink-0 mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white/80 hover:bg-white rounded-xl px-4 py-2 transition-all duration-200 shadow-sm"
          >
            View All

            <span className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </Link>

        </div>

        {/* PRODUCTS */}
        <div className="pb-4 px-1">

          <ProductSection
            title=""
            products={groupedForSection}
          />

        </div>

      </div>

    </div>
  );
};

export default DiscoverSection;