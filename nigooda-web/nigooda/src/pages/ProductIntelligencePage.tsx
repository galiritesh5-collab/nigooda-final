import { useState } from "react";
import { useNavigate } from "react-router-dom";

const productData = {
  "Personal Care": [
    {
      title: "Skin Care",
      items: [
        "Face Wash / Cleanser",
        "Moisturizer",
        "Sunscreen",
        "Serum",
        "Toner",
        "Day Cream",
        "Night Cream",
        "Eye Cream",
        "Lip Balm",
        "Face Mask",
        "Exfoliator",
        "Spot Treatment",
        "Face Oil",
        "Essence / Mist",
        "Cleansing Oil / Balm",
      ],
    },

    {
      title: "Hair Care",
      items: [
        "Shampoo",
        "Conditioner",
        "Hair Oil",
        "Hair Serum",
        "Hair Mask",
        "Beard Oil",
        "Beard Wash",
        "Beard Growth Serum",
        "Hair Styling Product",
        "Hair Spray",
        "Heat Protection Spray",
        "Hair Color / Dye",
        "Hair Treatment (Growth / Anti-Dandruff / Scalp)",
      ],
    },

    {
      title: "Body Care",
      items: [
        "Soap",
        "Body Wash",
        "Body Lotion",
        "Body Cream",
        "Body Oil",
        "Body Sunscreen",
        "Body Scrub",
        "Body Powder",
        "Deodorant / Antiperspirant",
        "Body Mist",
        "Massage Oil",
      ],
    },

    {
      title: "Oral Care",
      items: [
        "Toothpaste",
        "Mouthwash",
        "Tooth Powder",
        "Teeth Whitening Product",
        "Gum Care Product",
      ],
    },

    {
      title: "Hygiene",
      items: [
        "Hand Wash",
        "Hand Sanitizer",
        "Intimate Wash",
        "Hand Cream",
        "Foot Care",
        "Antiseptic Liquid",
        "Hygiene Wipes",
        "Disinfectant Liquid",
      ],
    },

    {
      title: "Makeup & Cosmetics",
      items: [
        "Foundation",
        "Compact / Loose Powder",
        "Concealer",
        "Lipstick",
        "Lip Gloss / Tint",
        "Mascara",
        "Eyeliner / Kajal",
        "Eyeshadow",
        "Blush / Bronzer / Highlighter",
        "Makeup Primer",
        "Setting Spray",
        "Makeup Remover",
        "Nail Polish",
        "Nail Remover",
      ],
    },

    {
      title: "Baby Care",
      items: [
        "Baby Wash",
        "Baby Shampoo",
        "Baby Soap",
        "Baby Lotion",
        "Baby Cream",
        "Baby Oil",
        "Baby Powder",
        "Baby Rash Cream",
        "Baby Sunscreen",
        "Baby Wipes",
      ],
    },
  ],

  "Household Care": [
    {
      title: "Kitchen Care",
      items: [
        "Dish Wash Liquid",
        "Dish Wash Bar",
        "Dish Cleaning Tablets",
      ],
    },

    {
      title: "Laundry Care",
      items: [
        "Laundry Liquid",
        "Laundry Powder",
        "Fabric Softener",
        "Stain Remover",
      ],
    },

    {
      title: "Home Cleaning",
      items: [
        "Floor Cleaner",
        "Bathroom Cleaner",
        "Toilet Cleaner",
        "Multipurpose Cleaner",
        "Glass Cleaner",
      ],
    },

    {
      title: "Disinfectant & Sanitization",
      items: [
        "Disinfectant Liquid",
        "Surface Disinfectant",
        "Antibacterial Cleaner",
      ],
    },

    {
      title: "Air & Pest Control",
      items: [
        "Mosquito Repellent",
        "Insect Spray",
        "Air Freshener",
      ],
    },
  ],

  "Pet Care": [
    {
      title: "Pet Cleaning",
      items: [
        "Pet Shampoo",
        "Pet Conditioner",
        "Pet Soap",
        "Pet Wipes",
      ],
    },

    {
      title: "Pet Health & Treatment",
      items: [
        "Tick Treatment",
        "Flea Treatment",
        "Pet Ear Cleaner",
        "Pet Eye Cleaner",
        "Pet Dental Gel",
      ],
    },

    {
      title: "Pet Hygiene",
      items: [
        "Pet Deodorant",
        "Pet Grooming Spray",
        "Pet Sanitizer",
      ],
    },
  ],
};

const tabs = [
  "Personal Care",
  "Household Care",
  "Pet Care",
];

const ProductIntelligencePage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState("Personal Care");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1600px] mx-auto flex">

        {/* SIDEBAR */}

        <div className="w-[280px] bg-white border-r border-slate-200 min-h-screen p-6 hidden lg:block">

          <h2 className="text-xl font-bold text-slate-900 mb-8">
            Product Intelligence
          </h2>

          <div className="space-y-3">

            {tabs.map((tab) => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-200 font-medium ${
                  activeTab === tab
                    ? "bg-indigo-100 text-indigo-700"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                {tab}
              </button>

            ))}

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className="flex-1 p-8 md:p-10">

          {/* HERO */}

          <div className="mb-12">

            <span className="inline-flex px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
              Product Intelligence
            </span>

            <h1 className="mt-5 text-5xl font-bold text-slate-900">
              {activeTab}
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-3xl leading-relaxed">
              AI-powered ingredient analysis
              and intelligent safety ratings
              with modern AI workspace design.
            </p>

          </div>

          {/* SECTIONS */}

          <div className="space-y-6">

            {productData[
              activeTab as keyof typeof productData
            ].map((section) => (

              <div
                key={section.title}
                className="bg-white border border-slate-200 rounded-3xl p-6"
              >

                {/* SECTION TITLE */}

                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  {section.title}
                </h2>

                {/* CATEGORY GRID */}

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">

                  {section.items.map((item) => (

                    <button
                      key={item}
                      onClick={() => {
                        navigate(
                          `/analyze/${activeTab
                            .toLowerCase()
                            .replace(/\s+/g, "-")}/${section.title
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/&/g, "and")}/${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/\//g, "-")
                            .replace(/&/g, "and")
                            .replace(/[()]/g, "")}`
                        );
                      }}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 cursor-pointer text-left"
                    >

                      <p className="text-sm font-medium text-slate-800">
                        {item}
                      </p>

                    </button>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductIntelligencePage;