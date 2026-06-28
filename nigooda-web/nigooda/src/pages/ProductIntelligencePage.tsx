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
        "Beard Growth Serum",
        "Hair Styling Product",
        "Hair Color / Dye",
      ],
    },

    {
      title: "Body Care",
      items: [
        "Soap / Body Wash",
        "Body Lotion",
        "Body Scrub",
        "Body Powder",
        "Deodorant / Antiperspirant",
      ],
    },

    {
      title: "Oral Care",
      items: [
        "Toothpaste / Tooth Powder",
        "Mouthwash",
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
        "Foot Care",
        "Antiseptic Liquid",
        "Hygiene Wipes",
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
        "Baby Wash / Soap",
        "Baby Shampoo",
        "Baby Lotion",
        "Baby Oil",
        "Baby Powder",
        "Baby Sunscreen",
        "Baby Wipes",
      ],
    },
  ],

  "Household Care": [
    {
      title: "Kitchen Care",
      items: [
        "Dishwash Cleaner",
      ],
    },

    {
      title: "Laundry Care",
      items: [
        "Laundry Soap",
        "Laundry Liquid / Powder",
      ],
    },

    {
      title: "Home Cleaning",
      items: [
        "Floor Cleaner",
        "Bathroom / Toilet Cleaner",
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
        "Pet Soap",
        "Pet Dental Gel",
      ],
    },

    {
      title: "Pet Health & Treatment",
      items: [
        "Tick / Flea Treatment",
      ],
    },

    {
      title: "Pet Hygiene",
      items: [
        "Pet Deodorant",
        "Pet Grooming Spray",
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

      {/* MOBILE TAB BAR — visible only below lg */}
      <div className="lg:hidden flex gap-2 overflow-x-auto px-4 pt-4 pb-2" style={{scrollbarWidth: 'none'}}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-white border border-slate-200 text-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto flex">

        {/* SIDEBAR */}

        <div className="w-[240px] bg-white border-r border-slate-200 min-h-screen p-4 hidden lg:block">

          <h2 className="text-base font-bold text-slate-900 mb-5">
            Product Intelligence
          </h2>

          <div className="space-y-1">

            {tabs.map((tab) => (

              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
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

        <div className="flex-1 p-4 md:p-7">

          {/* HERO */}

          <div className="mb-6">

            <span className="inline-flex px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wide">
              Product Intelligence
            </span>

            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900">
              {activeTab}
            </h1>

            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              AI-powered ingredient analysis and intelligent safety ratings
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
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm"
              >

                {/* SECTION TITLE */}

                <h2 className="text-base font-bold text-slate-900 mb-4">
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
    .replace(/\s*\/\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/&/g, "and")
    .replace(/[()]/g, "")}`
);

                      }}
                      className="rounded-xl border border-slate-200/80 bg-slate-50/50 px-5 py-4 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-sm active-press transition-all duration-200 cursor-pointer text-left"
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