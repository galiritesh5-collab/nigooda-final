import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { searchProducts } from "../utils/searchEngine";
import logo from "../assets/logo.png";
import { CATEGORIES } from "../constants";
import {
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth, googleProvider, createUserDocument } from "../lib/firebase"; // ← added createUserDocument
import {
  Leaf,
  Zap,
  Wheat,
  Package,
  Croissant,
  Soup,
  Candy,
  CakeSlice,
  ShoppingBasket,
  Coffee,
  GlassWater,
  Battery,
  Droplet,
  CupSoda,
  SprayCan,
  Shirt,
  User as UserIcon,
  PawPrint,
  Baby,
  Puzzle,
  Dumbbell,
  Home as HomeIcon,
  Monitor,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  SUBCATEGORY_ICONS,
  getSubcategoryColor,
} from "../utils/subcategoryIcons";

type Props = {
  activeCategory: string | null;
  onCategoryClick: (id: string) => void;
  onCloseCategory: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  products: any[];
};

const CATEGORY_ICON_RULES: {
  keywords: string[];
  icon: LucideIcon;
  color: string;
  bg: string;
}[] = [
  { keywords: ["food"],          icon: Leaf,     color: "#16A34A", bg: "#DCFCE7" },
  { keywords: ["drink"],         icon: CupSoda,  color: "#EA580C", bg: "#FFEDD5" },
  { keywords: ["personal care"], icon: SprayCan, color: "#DB2777", bg: "#FCE7F3" },
  { keywords: ["women"],         icon: Shirt,    color: "#7C3AED", bg: "#EDE9FE" },
  { keywords: ["men"],           icon: UserIcon, color: "#2563EB", bg: "#DBEAFE" },
  { keywords: ["pet"],           icon: PawPrint, color: "#0891B2", bg: "#CFFAFE" },
  { keywords: ["kid"],           icon: Baby,     color: "#D97706", bg: "#FEF3C7" },
  { keywords: ["toy"],           icon: Puzzle,   color: "#6D28D9", bg: "#EDE9FE" },
  { keywords: ["baby"],          icon: Baby,     color: "#F43F5E", bg: "#FFE4E6" },
  { keywords: ["fitness"],       icon: Dumbbell, color: "#DC2626", bg: "#FEE2E2" },
  { keywords: ["home"],          icon: HomeIcon, color: "#059669", bg: "#D1FAE5" },
  { keywords: ["electronic"],    icon: Monitor,  color: "#1D4ED8", bg: "#DBEAFE" },
];

const getCategoryMeta = (cat: { id?: string; label?: string }) => {
  const lower = `${cat.id || ""} ${cat.label || ""}`.toLowerCase();
  for (const rule of CATEGORY_ICON_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw)))
      return { icon: rule.icon, color: rule.color, bg: rule.bg };
  }
  return { icon: ShoppingBasket, color: "#64748B", bg: "#F1F5F9" };
};

const SUBCATEGORY_ICON_RULES: { keywords: string[]; icon: LucideIcon }[] = [
  { keywords: ["whole food", "protein"], icon: Leaf },
  { keywords: ["condiment"],             icon: Droplet },
  { keywords: ["snack"],                 icon: Package },
  { keywords: ["bread", "bakery"],       icon: Croissant },
  { keywords: ["instant", "soup"],       icon: Soup },
  { keywords: ["chocolate", "candy"],    icon: Candy },
  { keywords: ["dessert", "cupcake"],    icon: CakeSlice },
  { keywords: ["cereal", "wheat"],       icon: Wheat },
  { keywords: ["tea", "coffee"],         icon: Coffee },
  { keywords: ["soft drink"],            icon: GlassWater },
  { keywords: ["energy drink"],          icon: Battery },
];

const getSubcategoryIconLegacy = (label: string): LucideIcon => {
  const lower = label.toLowerCase();
  for (const rule of SUBCATEGORY_ICON_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) return rule.icon;
  }
  return ShoppingBasket;
};

const SubcategoryRow: React.FC<{
  item: string;
  categoryId: string;
  to: string;
  onClick: () => void;
  variant?: "dropdown" | "megamenu";
}> = ({ item, categoryId, to, onClick, variant = "dropdown" }) => {
  const Icon = SUBCATEGORY_ICONS[item];

  if (variant === "megamenu") {
    return (
      <Link
        to={to}
        onClick={onClick}
        className="group flex items-center gap-2 -mx-2 px-2 py-1.5 text-sm text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-50 transition-all duration-200 hover:translate-x-1"
      >
        {Icon ? (
          <Icon
            className={`w-4 h-4 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 ${getSubcategoryColor(categoryId)}`}
            strokeWidth={1.8}
          />
        ) : (
          <ShoppingBasket
            className="w-4 h-4 text-slate-400 shrink-0"
            strokeWidth={1.8}
          />
        )}
        {item}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-center gap-2.5 px-3 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all duration-200 hover:translate-x-1"
    >
      {Icon ? (
        <Icon
          className={`w-4 h-4 shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 ${getSubcategoryColor(categoryId)}`}
          strokeWidth={1.8}
        />
      ) : (
        <ShoppingBasket
          className="w-4 h-4 text-slate-400 shrink-0"
          strokeWidth={1.8}
        />
      )}
      <span>{item}</span>
    </Link>
  );
};

const Navbar: React.FC<Props> = ({
  activeCategory,
  onCategoryClick,
  onCloseCategory,
  searchQuery,
  setSearchQuery,
  products,
}) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const catRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setHoveredCatId(null), 150);
  };
  const openMenu = (catId: string, isWide: boolean) => {
    cancelClose();
    const el = catRefs.current[catId];
    if (el) {
      const rect = el.getBoundingClientRect();
      const menuWidth = isWide ? 860 : 220;
      const maxLeft = window.innerWidth - menuWidth - 16;
      const left = Math.max(16, Math.min(rect.left, maxLeft));
      setMenuPos({ left, top: rect.bottom + 8 });
    }
    setHoveredCatId(catId);
  };

  useEffect(() => {
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowDropdown(false);
    setIsAccountOpen(false);
    setHoveredCatId(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) setShowDropdown(false);
      if (accountRef.current && !accountRef.current.contains(target)) setIsAccountOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ← FIXED: now creates Firestore document after sign-in
  const handleGoogleSignIn = async () => {
    if (signingIn) return;
    try {
      setSigningIn(true);
      const result = await signInWithPopup(auth, googleProvider);
      await createUserDocument(result.user); // ← this is the only new line
    } catch (error: any) {
      if (error.code !== "auth/cancelled-popup-request") console.error(error);
    } finally {
      setSigningIn(false);
    }
  };

  const suggestions = searchProducts(products, search).slice(0, 5);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1500px] mx-auto px-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-6" style={{ height: "60px" }}>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logo}
              alt="Nigooda"
              className="h-8 w-auto transition-opacity duration-200 group-hover:opacity-70"
            />
          </Link>

          {/* SEARCH */}
          <div className="hidden md:block flex-1 max-w-[540px]">
            <div ref={dropdownRef} className="relative w-full">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                strokeWidth={2}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { navigate(`/search?q=${search}`); setShowDropdown(false); }
                }}
                placeholder="Search products, ingredients, brands..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F0FAF6] border border-[#D1EDE3] rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                aria-label="Search products, ingredients, brands"
              />

              {showDropdown && search && (
                <div className="absolute w-full bg-white shadow-xl shadow-slate-200/80 rounded-2xl mt-2 border border-slate-100 z-50 max-h-[400px] overflow-y-auto">
                  <div className="px-4 py-2.5 text-[10px] font-semibold text-slate-400 tracking-widest uppercase border-b border-slate-50">
                    Products
                  </div>
                  {suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => { navigate(`/product/${p.id}`); setShowDropdown(false); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors duration-150"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={p["Main Image URL"]}
                          alt={p["Name of Product"]}
                          className="w-8 h-8 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/40"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{p["Name of Product"]}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{p["Brand"]}</p>
                      </div>
                      <div className="text-sm font-semibold text-slate-700 shrink-0">₹{p["Price"]}</div>
                    </div>
                  ))}
                  <div
                    onClick={() => { navigate(`/search?q=${search}`); setShowDropdown(false); }}
                    className="px-4 py-3 text-center text-sm font-medium text-emerald-600 hover:bg-emerald-50 cursor-pointer border-t border-slate-50 transition-colors duration-150"
                  >
                    View all results →
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT NAV */}
          <div className="flex items-center gap-1 shrink-0">
            <Link to="/pricing" className="hidden md:block px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200">
              Pricing
            </Link>
            <Link to="/about" className="hidden md:block px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200">
              About
            </Link>

            <div className="hidden md:block w-px h-5 bg-slate-200 mx-2" />

            {(() => {
              if (!currentUser) {
                return (
                  <>
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={signingIn}
                      className="hidden md:flex items-center px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGoogleSignIn}
                      disabled={signingIn}
                      className="ml-1 px-4 py-2 bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-semibold rounded-[14px] transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(16,185,129,0.35)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_6px_16px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Get Started
                    </button>
                  </>
                );
              }

              const initials = currentUser.displayName?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) || "U";

              return (
                <>
                  <Link
                    to="/wishlist"
                    className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-200"
                  >
                    <span aria-hidden="true">❤️</span>
                    Wishlist
                  </Link>

                  <div ref={accountRef} className="relative ml-1">
                    <button
                      onClick={() => setIsAccountOpen(!isAccountOpen)}
                      className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-200"
                    >
                      {currentUser.photoURL ? (
  <img
    src={currentUser.photoURL}
    alt={currentUser.displayName || "User"}
    className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
    referrerPolicy="no-referrer"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />
) : (
                        <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-semibold">
                          {initials}
                        </div>
                      )}
                      <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[96px] truncate">
                        {currentUser.displayName?.split(" ")[0] || "User"}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isAccountOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/80 z-50 overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-50">
                          {currentUser.photoURL ? (
                            <img src={currentUser.photoURL} alt={currentUser.displayName || "User"} className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-100" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">{initials}</div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.displayName}</p>
                            <p className="text-xs text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                          </div>
                        </div>
                        <div className="p-1.5">
                          {[
                            { to: "/dashboard",  label: "Dashboard",       path: "M3 12l2-2m0 0l7-7 7 7m-9 2v8m0-8H5m7 0h7" },
                            { to: "/my-scans",   label: "My Scans",        path: "M9 17v-2m3 2v-4m3 4v-6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" },
                            { to: "/billing",    label: "Billing & Plans", path: "M17 9V7a5 5 0 00-10 0v2m-2 0h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" },
                          ].map(({ to, label, path }) => (
                            <Link key={to} to={to} onClick={() => setIsAccountOpen(false)}
                              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors duration-150"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
                              </svg>
                              {label}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-slate-50 p-1.5">
                          <button
                            onClick={async () => { setIsAccountOpen(false); await signOut(auth); navigate("/"); }}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-150"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl ml-1 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-100" />

        {/* CATEGORY BAR */}
        <div className="py-1.5">
          <div className="flex gap-0.5 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {CATEGORIES.map((cat) => {
              const isSimple = cat.type === "simple";
              const isTabbed = cat.type === "tabbed";
              const isOpen = hoveredCatId === cat.id;
              const isActive = location.pathname.startsWith(`/category/${cat.id}`);
              const meta = getCategoryMeta(cat);
              const CatIcon = meta.icon;

              return (
                <div
                  key={cat.id}
                  ref={(el) => { catRefs.current[cat.id] = el; }}
                  className="relative shrink-0"
                  onMouseEnter={() => { if (isSimple || isTabbed) openMenu(cat.id, isTabbed); }}
                  onMouseLeave={() => { if (isSimple || isTabbed) scheduleClose(); }}
                >
                  <button
                    onClick={() => navigate(`/category/${cat.id}`)}
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 whitespace-nowrap hover:-translate-y-0.5 ${
                      isActive
                        ? "border-slate-200 text-slate-900 shadow-sm"
                        : "bg-transparent border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-200"
                    }`}
                    style={isActive ? { backgroundColor: meta.bg, borderColor: `${meta.color}33` } : {}}
                  >
                    <span
                      className="flex items-center justify-center w-5 h-5 rounded-md transition-all duration-200 group-hover:scale-110"
                      style={{ backgroundColor: isActive ? "transparent" : meta.bg }}
                    >
                      <CatIcon
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: meta.color }}
                        strokeWidth={2}
                      />
                    </span>
                    <span style={isActive ? { color: meta.color } : {}}>{cat.label}</span>
                  </button>

                  {/* SIMPLE DROPDOWN */}
                  {isSimple && cat.items && isOpen && createPortal(
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      style={{ position: "fixed", left: menuPos.left, top: menuPos.top }}
                      className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/80 z-[9999] min-w-[220px] overflow-hidden hidden lg:block"
                    >
                      <div className="p-2 flex flex-col gap-0.5">
                        {cat.items.map((item) => (
                          <SubcategoryRow
                            key={item}
                            item={item}
                            categoryId={cat.id}
                            to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                            onClick={() => setHoveredCatId(null)}
                            variant="dropdown"
                          />
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}

                  {/* TABBED MEGA MENU */}
                  {isTabbed && isOpen && createPortal(
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      style={{ position: "fixed", left: menuPos.left, top: menuPos.top }}
                      className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/80 z-[9999] p-7 min-w-[860px] hidden lg:block"
                    >
                      {cat.id === "women" && (
                        <div className="grid grid-cols-5 gap-8">
                          {cat.tabs[0].groups.map((group) => (
                            <div key={group.title}>
                              <h4 className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-3">{group.title}</h4>
                              <ul className="space-y-0.5">
                                {group.items.map((item) => (
                                  <li key={item}>
                                    <SubcategoryRow
                                      item={item}
                                      categoryId={cat.id}
                                      to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                                      onClick={() => setHoveredCatId(null)}
                                      variant="megamenu"
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                      {cat.id === "men" && (
                        <div className="grid grid-cols-5 gap-8">
                          {cat.tabs.map((tab) =>
                            tab.groups.map((group) => (
                              <div key={group.title}>
                                <h4 className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase mb-3">{group.title}</h4>
                                <ul className="space-y-0.5">
                                  {group.items.map((item) => (
                                    <li key={item}>
                                      <SubcategoryRow
                                        item={item}
                                        categoryId={cat.id}
                                        to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                                        onClick={() => setHoveredCatId(null)}
                                        variant="megamenu"
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>,
                    document.body
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-[108px] bottom-0 bg-slate-900/30 backdrop-blur-sm z-[150] md:hidden">
          <div className="w-full bg-white border-b border-slate-100 flex flex-col max-h-[80vh] shadow-xl overflow-y-auto p-5 gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" strokeWidth={2} />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { navigate(`/search?q=${search}`); setShowDropdown(false); setIsMobileMenuOpen(false); }
                }}
                placeholder="Search products, ingredients..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F0FAF6] border border-[#D1EDE3] rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                aria-label="Search products, ingredients, brands"
              />
              {showDropdown && search && suggestions.length > 0 && (
                <div className="absolute w-full bg-white shadow-xl rounded-2xl mt-2 border border-slate-100 z-50 max-h-[200px] overflow-y-auto">
                  {suggestions.map((p) => (
                    <div key={p.id} onClick={() => { navigate(`/product/${p.id}`); setShowDropdown(false); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img src={p["Main Image URL"]} alt={p["Name of Product"]} className="w-7 h-7 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/32"; }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{p["Name of Product"]}</p>
                      </div>
                      <div className="text-xs font-semibold text-slate-700 shrink-0">₹{p["Price"]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              {[{ to: "/pricing", label: "Pricing" }, { to: "/about", label: "About Us" }, { to: "/wishlist", label: "Wishlist" }].map(({ to, label }) => (
                <Link key={to} to={to}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
                >
                  {label}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {!currentUser ? (
              <button
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                className="w-full py-3 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white font-semibold rounded-[14px] text-sm shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:from-emerald-400 hover:to-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {signingIn ? "Signing in…" : "Sign In / Get Started"}
              </button>
            ) : (
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                <p className="text-xs text-slate-400 px-4">
                  Logged in as <span className="font-semibold text-slate-700">{currentUser.displayName}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link to="/dashboard" className="py-2.5 text-center text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => { await signOut(auth); navigate("/"); }}
                    className="py-2.5 text-center text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;