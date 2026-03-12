import React, { createContext, useContext, useEffect, useState } from "react";

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ✅ INITIALIZE DIRECTLY FROM LOCALSTORAGE (NO FLASH / NO RESET)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ SAVE TO LOCALSTORAGE WHENEVER CHANGED
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ FORCE STRING ID (VERY IMPORTANT)
  const toggleWishlist = (id: string) => {
    const stringId = String(id);

    setWishlist((prev) =>
      prev.includes(stringId)
        ? prev.filter((item) => item !== stringId)
        : [...prev, stringId]
    );
  };

  const isInWishlist = (id: string) => {
    return wishlist.includes(String(id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
};