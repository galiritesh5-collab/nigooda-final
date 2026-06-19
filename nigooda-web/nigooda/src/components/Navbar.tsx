import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { searchProducts } from "../utils/searchEngine";
import logo from "../assets/logo.png";
import { CATEGORIES } from "../constants";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, type User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
type Props = {
  activeCategory: string | null;
  onCategoryClick: (id: string) => void;
  onCloseCategory: () => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  products: any[];
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
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // ── CATEGORY MEGA-MENU HOVER STATE ──
  // The dropdowns are rendered through a portal (see below) so they are not
  // clipped by the horizontally-scrolling category bar, and are positioned
  // with `fixed` coordinates computed from the trigger button's rect.
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const catRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => {
      setHoveredCatId(null);
    }, 150);
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
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
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
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setShowDropdown(false);
      }
      if (accountRef.current && !accountRef.current.contains(target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const suggestions = searchProducts(products, search).slice(0, 5);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100/80 shadow-[0_1px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1500px] mx-auto px-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16 gap-6">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logo}
              alt="Nigooda"
              className="h-9 w-auto group-hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          {/* SEARCH */}
          <div className="hidden md:block flex-1 max-w-[560px]">
            <div ref={dropdownRef} className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/search?q=${search}`);
                    setShowDropdown(false);
                  }
                }}
                placeholder="Search products, ingredients, brands..."
                className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] transition-all duration-200"
                aria-label="Search products, ingredients, brands"
              />

              {showDropdown && search && (
                <div className="absolute w-full bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10 rounded-2xl mt-2 border border-slate-100 z-50 max-h-[400px] overflow-y-auto">
                  <div className="px-4 py-2.5 text-[10px] font-semibold text-slate-400 tracking-widest uppercase border-b border-slate-50">
                    Products
                  </div>

                  {suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors duration-150"
                    >
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={p["Main Image URL"]}
                          alt={p["Name of Product"]}
                          className="w-9 h-9 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/48"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{p["Name of Product"]}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{p["Brand"]}</p>
                      </div>
                      <div className="text-sm font-semibold text-slate-900 shrink-0">₹{p["Price"]}</div>
                    </div>
                  ))}

                  <div
                    onClick={() => { navigate(`/search?q=${search}`); setShowDropdown(false); }}
                    className="px-4 py-3 text-center text-sm font-medium text-slate-500 hover:bg-slate-50 cursor-pointer border-t border-slate-50 transition-colors duration-150"
                  >
                    View all results →
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT NAV — ordered: Pricing · About · [divider] · Wishlist · Auth · Get Started */}
          <div className="flex items-center gap-0.5 shrink-0">

            {/* NAV LINKS */}
            <Link
              to="/pricing"
              className="hidden md:block px-3.5 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-150"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="hidden md:block px-3.5 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-150"
            >
              About
            </Link>

            {/* DIVIDER */}
            <div className="hidden md:block w-px h-5 bg-slate-200 mx-2" />

            {/* ──────────────────────────────────────────
                AUTH SECTION
                currentUser comes from Firebase's
                onAuthStateChanged listener (declared above).
                currentUser = null  → logged out state
                currentUser = {...} → logged in state
            ────────────────────────────────────────── */}
           {(() => {
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  /* ── LOGGED OUT ── */
  if (!currentUser) {
    return (
      <>
        <button
          onClick={handleGoogleSignIn}
          className="hidden md:flex items-center px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all duration-150"
        >
          Sign In
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="ml-1 px-4 py-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-sm whitespace-nowrap"
        >
          Get Started
        </button>
      </>
    );
  }
              /* ── LOGGED IN ── */
              // Derive initials fallback from displayName
              const initials = currentUser.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2);

              return (
                <div ref={accountRef} className="relative ml-1">

                  {/* AVATAR TRIGGER */}
                  <button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all duration-150"
                  >
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-semibold tracking-wide">
                        {initials}
                      </div>
                    )}
                    <span className="hidden md:block text-sm font-medium text-slate-700 max-w-[96px] truncate">
                      {currentUser.displayName.split(" ")[0]}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* ACCOUNT DROPDOWN */}
                  {isAccountOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white/98 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden">

                      {/* USER IDENTITY HEADER */}
                      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-50">
                        {currentUser.photoURL ? (
                          <img
                            src={currentUser.photoURL}
                            alt={currentUser.displayName}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                            {initials}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.displayName}</p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                        </div>
                      </div>

                      {/* MENU ITEMS */}
                      <div className="p-1.5">

                        <Link
                          to="/dashboard"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors duration-150"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m0-8H5m7 0h7" />
                          </svg>
                          Dashboard
                        </Link>

                        <Link
                          to="/my-scans"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors duration-150"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          My Scans
                        </Link>

                        <Link
                          to="/billing"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors duration-150"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 9V7a5 5 0 00-10 0v2m-2 0h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2z" />
                          </svg>
                          Billing & Plans
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors duration-150"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l.7 2.152a1 1 0 00.95.69h2.263c.969 0 1.371 1.24.588 1.81l-1.83 1.33a1 1 0 00-.364 1.118l.7 2.152c.3.922-.755 1.688-1.538 1.118l-1.83-1.33a1 1 0 00-1.176 0l-1.83 1.33c-.783.57-1.838-.197-1.538-1.118l.7-2.152a1 1 0 00-.364-1.118l-1.83-1.33c-.784-.57-.38-1.81.588-1.81h2.263a1 1 0 00.95-.69l.7-2.152z" />
                          </svg>
                          Settings
                        </Link>

                      </div>

                      {/* LOGOUT */}
                      <div className="border-t border-slate-50 p-1.5">
                        <button
                          onClick={async () => {
                            setIsAccountOpen(false);
                            await signOut(auth);
                            navigate("/");
                          }}
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
              );
            })()}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:outline-none rounded-xl ml-1 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>

        {/* CATEGORY BAR */}
        <div className="pb-1.5 relative z-10">
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {CATEGORIES.map((cat) => {
              const isSimple = cat.type === "simple";
              const isTabbed = cat.type === "tabbed";
              const isOpen = hoveredCatId === cat.id;

              return (
                <div
                  key={cat.id}
                  ref={(el) => { catRefs.current[cat.id] = el; }}
                  className="relative py-1 shrink-0"
                  onMouseEnter={() => {
                    if (isSimple || isTabbed) openMenu(cat.id, isTabbed);
                  }}
                  onMouseLeave={() => {
                    if (isSimple || isTabbed) scheduleClose();
                  }}
                >
                  <button
                    onClick={() => navigate(`/category/${cat.id}`)}
                    className="px-4 py-1.5 rounded-full text-[13px] font-medium border border-slate-200/70 bg-white/70 backdrop-blur-sm text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 whitespace-nowrap transition-all duration-200 shadow-sm"
                  >
                    {cat.label}
                  </button>

                  {/* SIMPLE DROPDOWN — rendered via portal so it can't be
                      clipped by the overflow-x-auto category scroller and
                      always renders above all page content. */}
                  {isSimple && cat.items && isOpen && createPortal(
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      style={{ position: "fixed", left: menuPos.left, top: menuPos.top }}
                      className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-2xl shadow-black/10 z-[9999] min-w-[220px] overflow-hidden hidden lg:block"
                    >
                      <div className="p-1.5">
                        {cat.items.map((item) => (
                          <Link
                            key={item}
                            to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                            onClick={() => setHoveredCatId(null)}
                            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors duration-150"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>,
                    document.body
                  )}

                  {/* TABBED MEGA-MENU — same portal approach. */}
                  {isTabbed && isOpen && createPortal(
                    <div
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      style={{ position: "fixed", left: menuPos.left, top: menuPos.top }}
                      className="bg-white/95 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-2xl shadow-black/10 z-[9999] p-7 min-w-[860px] hidden lg:block"
                    >
                      {cat.id === "women" && (
                        <div className="grid grid-cols-5 gap-8">
                          {cat.tabs[0].groups.map((group) => (
                            <div key={group.title}>
                              <h4 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-3">{group.title}</h4>
                              <ul className="space-y-2">
                                {group.items.map((item) => (
                                  <li key={item}>
                                    <Link
                                      to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                                      onClick={() => setHoveredCatId(null)}
                                      className="text-sm text-slate-700 hover:text-slate-900 hover:font-medium transition-all duration-150"
                                    >
                                      {item}
                                    </Link>
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
                                <h4 className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-3">{group.title}</h4>
                                <ul className="space-y-2">
                                  {group.items.map((item) => (
                                    <li key={item}>
                                      <Link
                                        to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                                        onClick={() => setHoveredCatId(null)}
                                        className="text-sm text-slate-700 hover:text-slate-900 hover:font-medium transition-all duration-150"
                                      >
                                        {item}
                                      </Link>
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
        <div className="fixed inset-x-0 top-[116px] bottom-0 bg-slate-900/40 backdrop-blur-sm z-[150] md:hidden">
          <div className="w-full bg-white border-b border-slate-100 flex flex-col max-h-[80vh] shadow-xl overflow-y-auto p-5 gap-5">
            {/* SEARCH */}
            <div className="relative w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/search?q=${search}`);
                    setShowDropdown(false);
                    setIsMobileMenuOpen(false);
                  }
                }}
                placeholder="Search products, ingredients..."
                className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-full text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.04)] transition-all duration-200"
                aria-label="Search products, ingredients, brands"
              />

              {showDropdown && search && suggestions.length > 0 && (
                <div className="absolute w-full bg-white shadow-xl rounded-2xl mt-2 border border-slate-100 z-50 max-h-[200px] overflow-y-auto">
                  {suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setShowDropdown(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={p["Main Image URL"]}
                          alt={p["Name of Product"]}
                          className="w-7 h-7 object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/32"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{p["Name of Product"]}</p>
                      </div>
                      <div className="text-xs font-semibold text-slate-900 shrink-0">₹{p["Price"]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-1">
              <Link
                to="/pricing"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
              >
                Pricing
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
              >
                About Us
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
              >
                Wishlist
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* ACTIONS */}
            {!currentUser ? (
              <button
                onClick={async () => {
                  const provider = new GoogleAuthProvider();
                  try {
                    await signInWithPopup(auth, provider);
                  } catch (e) {
                    console.error(e);
                  }
                }}
                className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl text-sm text-center shadow-sm hover:bg-slate-800 transition"
              >
                Sign In / Get Started
              </button>
            ) : (
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                <p className="text-xs text-slate-400 px-4">
                  Logged in as <span className="font-semibold text-slate-700">{currentUser.displayName}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    to="/dashboard"
                    className="py-2.5 text-center text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut(auth);
                      navigate("/");
                    }}
                    className="py-2.5 text-center text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-xl"
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