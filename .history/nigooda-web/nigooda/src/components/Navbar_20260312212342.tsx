import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { searchProducts } from "../utils/searchEngine";
import logo from "../assets/logo.png";
import { CATEGORIES } from "../constants";

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

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setShowDropdown(false);
      }

      if (
        accountRef.current &&
        !accountRef.current.contains(target)
      ) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const suggestions = searchProducts(products, search).slice(0, 5);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-[1500px] mx-auto px-4">

        <div className="flex items-center justify-between h-14 gap-4">

          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="Nigooda"
              className="h-10 w-auto -mt-[2px] group-hover:scale-105 transition"
            />
          </Link>

          <div className="hidden md:block w-[640px] mx-2">

            <div ref={dropdownRef} className="relative w-full">

              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
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
                placeholder="Search products..."
                className="w-full pl-12 pr-5 py-2.5 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {showDropdown && search && (
                <div className="absolute w-full bg-white shadow-xl rounded-2xl mt-3 border z-50 max-h-[400px] overflow-y-auto">

                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 border-b bg-slate-50">
                    Products
                  </div>

                  {suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-indigo-50 cursor-pointer transition"
                    >
                      <img
                        src={p["Main Image URL"]}
                        alt={p["Name of Product"]}
                        className="w-12 h-12 object-contain rounded-lg border bg-white"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/48";
                        }}
                      />

                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800 line-clamp-1">
                          {p["Name of Product"]}
                        </p>

                        <p className="text-xs text-slate-500">
                          {p["Brand"]}
                        </p>
                      </div>

                      <div className="text-sm font-semibold text-indigo-600">
                        ₹{p["Price"]}
                      </div>
                    </div>
                  ))}

                  <div
                    onClick={() => {
                      navigate(`/search?q=${search}`);
                      setShowDropdown(false);
                    }}
                    className="p-3 text-center text-indigo-600 font-medium hover:bg-indigo-50 cursor-pointer border-t"
                  >
                    View all results →
                  </div>

                </div>
              )}

            </div>
          </div>

          <div className="flex items-center gap-6">

            <div ref={accountRef} className="relative flex flex-col items-center cursor-pointer">

              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex flex-col items-center text-sm font-medium text-slate-700 hover:text-indigo-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5.121 17.804A9 9 0 1118.879 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Profile
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 bg-white border rounded-xl shadow-xl overflow-hidden z-50">

                  <button className="block w-full text-left px-4 py-3 text-sm hover:bg-indigo-50">
                    Profile
                  </button>

                  <button className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                    Logout
                  </button>

                </div>
              )}

            </div>

            <Link to="/wishlist" className="flex flex-col items-center text-sm font-medium text-slate-700 hover:text-indigo-600">

              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 010-6.364z"/>
              </svg>

              Wishlist

            </Link>

            <Link to="/about" className="flex flex-col items-center text-sm font-medium text-slate-700 hover:text-indigo-600">

              <span className="text-lg mb-1">ℹ︎</span>

              About

            </Link>

          </div>
        </div>

        <div className="py-0.5 relative z-10">
          <div className="flex gap-3 pb-1 relative">

            {CATEGORIES.map((cat) => {
              const isSimple = cat.type === "simple";
              const isTabbed = cat.type === "tabbed";

              return (
                <div key={cat.id} className="relative py-2 group">

                    <button
                      onClick={() => navigate(`/category/${cat.id}`)}
                      className="px-3 py-[4px] rounded-lg text-sm font-semibold border bg-white hover:border-indigo-500 whitespace-nowrap flex-shrink-0"
                    >
                      {cat.label}
                    </button>

                    {isSimple && cat.items && (
                      <div className="absolute left-0 top-full mt-1 bg-white border rounded-xl shadow-lg z-[200] min-w-[260px] hidden group-hover:block">
                        {cat.items.map((item) => (
                          <Link
                            key={item}
                            to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                            className="block px-4 py-2 text-sm hover:bg-indigo-50"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    )}

                    {isTabbed && (
                      <div className="absolute left-0 top-full mt-1 bg-white border rounded-2xl shadow-xl z-[200] p-6 min-w-[900px] hidden group-hover:block">

                        {cat.id === "women" && (
                          <div className="grid grid-cols-5 gap-8">
                            {cat.tabs[0].groups.map((group) => (
                              <div key={group.title}>
                                <h4 className="font-semibold mb-3">
                                  {group.title}
                                </h4>
                                <ul className="space-y-2">
                                  {group.items.map((item) => (
                                    <li key={item}>
                                      <Link
                                        to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                                        className="text-sm text-slate-700 hover:text-indigo-600"
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
                                  <h4 className="font-semibold mb-3">
                                    {group.title}
                                  </h4>
                                  <ul className="space-y-2">
                                    {group.items.map((item) => (
                                      <li key={item}>
                                        <Link
                                          to={`/category/${cat.id}/${encodeURIComponent(item)}`}
                                          className="text-sm text-slate-700 hover:text-indigo-600"
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

                      </div>
                    )}

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;