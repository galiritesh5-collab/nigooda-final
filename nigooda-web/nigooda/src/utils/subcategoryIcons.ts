import {
  // Food & Drink
  Cookie,
  Candy,
  Heart,
  Wheat,
  Soup,
  Croissant,
  Leaf,
  Milk,
  BottleWine,
  Zap,
  Cake,
  Droplets,
  Salad,
  Egg,
  Utensils,
  Flame,
  CupSoda,
  Citrus,
  Coffee,
  FlaskConical,
  GlassWater,
  // Personal Care & Grooming
  Sparkles,
  Scissors,
  Shield,
  Smile,
  SprayCan,
  Droplet,
  FlaskRound,
  Waves,
  HeartPulse,
  // Fashion
  Shirt,
  Gem,
  Footprints,
  Handbag,
  Watch,
  Wind,
  Layers,
  Crown,
  Umbrella,
  Glasses,
  Ribbon,
  Tag,
  Wallet,
  Sun,
  Package,
  // Pets / Kids / Baby
  PawPrint,
  Bone,
  Baby,
  Bandage,
  // Toys / Learning
  ToyBrick,
  GraduationCap,
  // Fitness / Wellness
  Pill,
  Dumbbell,
  // Home / Kitchen
  Lamp,
  ChefHat,
  Home,
  // Electronics
  Smartphone,
  Laptop,
  // Misc
  ShoppingBag,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Subcategory → Lucide icon mapping
// Every key must match a subcategory string exactly as it appears in
// src/constants.tsx.  No fallback ShoppingBasket will appear as long as
// every subcategory has an entry here.
// ---------------------------------------------------------------------------
export const SUBCATEGORY_ICONS: Record<string, any> = {
  // ── FOOD ──────────────────────────────────────────────────────────────────
  "Snacks":                        Cookie,
  "Chocolates":                    Candy,
  "Diabetic / Low Sugar Food":     Heart,
  "Cereals & Grains":              Wheat,
  "Instant Food Mix":              Soup,
  "Bread & Bakery":                Croissant,
  "Whole Foods":                   Leaf,
  "Dairy":                         Milk,
  "Condiments & Sauces":           BottleWine,
  "Protein & Energy Bars":         Zap,
  "Sweets / Desserts":             Cake,
  "Mouth Fresheners":              Leaf,       // Mint → Leaf (Mint is not in lucide-react)
  "Salads & Fresh":                Salad,
  "Eggs & Poultry":                Egg,
  "Cooking Essentials":            Utensils,
  "Masalas & Spices":              Flame,
  "Oils & Ghee":                   Droplets,

  // ── DRINKS ────────────────────────────────────────────────────────────────
  "Soft Drinks":                   CupSoda,
  "Juices":                        Citrus,
  "Energy & Sports Drinks":        Zap,
  "Tea and Coffee":                Coffee,
  "Drink Mixes & Concentrates":    FlaskConical,
  "Water & Hydration":             GlassWater,

  // ── PERSONAL CARE ─────────────────────────────────────────────────────────
  "Skin Care":                     Sparkles,
  "Hair Care":                     Scissors,
  "Body Care":                     SprayCan,
  "Hygiene Care":                  Shield,
  "Oral Care":                     Smile,
  "Face Care":                     Sparkles,
  "Deodorants & Perfumes":         Droplet,
  "Feminine Care":                 FlaskRound,
  "Bath & Body":                   Waves,

  // ── WOMEN — Clothing ──────────────────────────────────────────────────────
  "Kurtas & Kurti Sets":           Shirt,
  "Nightwear / Sleepwear":         Wind,
  "Western Wear":                  Layers,
  "Ethnic Wear":                   Crown,
  "Bottom Wear":                   Shirt,
  "Innerwear & Loungewear":        Wind,
  "Winter Wear":                   Umbrella,
  "Sweaters":                      Wind,
  "Jackets":                       Wind,
  "Shrugs":                        Layers,

  // ── WOMEN — Jewellery ─────────────────────────────────────────────────────
  "Fashion Jewellery":             Gem,
  "Traditional / Ethnic Jewellery": Gem,
  "Silver Jewellery":              Gem,

  // ── WOMEN — Footwear ──────────────────────────────────────────────────────
  "Flats":                         Footprints,
  "Heels":                         Footprints,
  "Sandals":                       Footprints,
  "Casual Shoes":                  Footprints,
  "Ethnic Footwear (Juttis, Mojris)": Footprints,

  // ── WOMEN — Bags & Accessories ────────────────────────────────────────────
  "Handbags & Clutches":           Handbag,
  "Wallets & Purses":              Handbag,
  "Belts":                         Tag,
  "Scarves / Stoles / Dupattas":   Ribbon,
  "Sunglasses":                    Glasses,
  "Watches":                       Watch,
  "Hair Accessories":              Scissors,

  // ── WOMEN — Beauty ────────────────────────────────────────────────────────
  "Makeup":                        Sparkles,
  "Grooming":                      Scissors,

  // ── MEN — Clothing ────────────────────────────────────────────────────────
  "T-Shirts":                      Shirt,
  "Shirts":                        Shirt,
  "Kurtas":                        Shirt,
  "Jeans":                         Shirt,
  "Trousers":                      Shirt,
  "Track Pants":                   Shirt,
  "Innerwear & Sleepwear":         Wind,

  // ── MEN — Footwear ────────────────────────────────────────────────────────
  "Formal Shoes":                  Footprints,
  "Sports Shoes":                  Footprints,
  "Sandals & Slippers":            Footprints,
  "Ethnic Footwear":               Footprints,

  // ── MEN — Accessories ─────────────────────────────────────────────────────
  "Wallets":                       Wallet,
  "Caps & Hats":                   Sun,
  "Socks":                         Package,

  // ── MEN — Grooming ────────────────────────────────────────────────────────
  "Beard Care":                    Scissors,
  "Shaving & Hair Removal":        Scissors,
  "Hair Styling":                  Scissors,
  "Trimmers & Grooming Tools":     Scissors,

  // ── PETS ──────────────────────────────────────────────────────────────────
  "Pet Food":                      Bone,
  "Pet Care":                      PawPrint,
  "Accessories":                   ShoppingBag,

  // ── KIDS ──────────────────────────────────────────────────────────────────
  "Kids Clothing":                 Shirt,
  "Kids Care":                     Baby,

  // ── TOYS & LEARNING ───────────────────────────────────────────────────────
  "Toys":                          ToyBrick,
  "Educational & STEM Learning":   GraduationCap,

  // ── BABY CARE ─────────────────────────────────────────────────────────────
  "Baby Food":                     Baby,
  "Baby Personal Care":            HeartPulse,
  "Baby Health & Hygiene":         Bandage,
  "Baby Accessories":              Baby,

  // ── FITNESS & WELLNESS ────────────────────────────────────────────────────
  "Supplements":                   Pill,
  "Fitness Equipment":             Dumbbell,

  // ── HOME, DECOR & KITCHEN ─────────────────────────────────────────────────
  "Home Decor":                    Lamp,
  "Kitchen Essentials":            ChefHat,
  "Lifestyle Essentials":          Home,

  // ── ELECTRONICS ───────────────────────────────────────────────────────────
  "Smart Gadgets":                 Smartphone,
  "Electronics":                   Laptop,
};

// ---------------------------------------------------------------------------
// Returns a Tailwind text-color class for the given category ID so subcategory
// icons inherit the category's accent color in the Navbar.
// ---------------------------------------------------------------------------
export const getSubcategoryColor = (categoryId: string): string => {
  const colors: Record<string, string> = {
    "food":                           "text-green-500",
    "drinks":                         "text-orange-500",
    "personal-care":                  "text-pink-500",
    "women":                          "text-purple-500",
    "men":                            "text-blue-500",
    "pets":                           "text-cyan-500",
    "kids":                           "text-amber-500",
    "toys-and-learning":              "text-violet-500",
    "baby-care":                      "text-rose-500",
    "fitness-and-wellness":           "text-red-500",
    "home-decor-and-kitchen":         "text-emerald-500",
    "electronics-and-smart-products": "text-sky-500",
  };

  return colors[categoryId] ?? "text-gray-500";
};