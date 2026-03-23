// src/constants.tsx

// ----------------------------------------------------------------------
// CATEGORY DATA
// ----------------------------------------------------------------------

export const CATEGORIES = [
  {
    id: 'food',
    label: 'FOOD',
    type: 'simple',
    items: [
      'Snacks',
      'Chocolates',
      'Diabetic / Low Sugar Food',
      'Cereals & Grains',
      'Instant Food Mix',
      'Bread & Bakery',
      'Whole Foods',
      'Dairy',
      'Condiments & Sauces',
      'Protein & Energy Bars',
      'Sweets / Desserts',
      'Mouth Fresheners',
    ],
  },
  {
    id: 'drinks',
    label: 'DRINKS',
    type: 'simple',
    items: [
      'Soft Drinks',
      'Juices',
      'Energy & Sports Drinks',
      'Tea and Coffee',
      'Drink Mixes & Concentrates',
    ],
  },
  {
    id: 'personal-care',
    label: 'PERSONAL CARE',
    type: 'simple',
    items: ['Skin Care', 'Hair Care', 'Body Care', 'Hygiene Care', 'Oral Care'],
  },
  {
    id: 'women',
    label: 'WOMEN',
    type: 'tabbed',
    tabs: [
      {
        id: 'women-fashion',
        label: 'Women – Fashion',
        groups: [
          {
            title: 'Clothing / Apparel',
            items: [
              'Kurtas & Kurti Sets',
              'Nightwear / Sleepwear',
              'Western Wear',
              'Ethnic Wear',
              'Bottom Wear',
              'Innerwear & Loungewear',
              'Winter Wear',
              'Sweaters',
              'Jackets',
              'Shrugs',
            ],
          },
          {
            title: 'Jewellery',
            items: [
              'Fashion Jewellery',
              'Traditional / Ethnic Jewellery',
              'Silver Jewellery',
            ],
          },
          {
            title: 'Footwear',
            items: [
              'Flats',
              'Heels',
              'Sandals',
              'Casual Shoes',
              'Ethnic Footwear (Juttis, Mojris)',
            ],
          },
          {
            title: 'Accessories',
            items: [
              'Handbags & Clutches',
              'Wallets & Purses',
              'Belts',
              'Scarves / Stoles / Dupattas',
              'Sunglasses',
              'Watches',
              'Hair Accessories',
            ],
          },
        ],
      },
      {
        id: 'women-personal-care',
        label: 'Women – Personal Care',
        groups: [
          {
            title: 'Personal Care',
            items: ['Makeup', 'Grooming'],
          },
        ],
      },
    ],
  },
  {
    id: 'men',
    label: 'MEN',
    type: 'tabbed',
    tabs: [
      {
        id: 'men-fashion',
        label: 'Men – Fashion',
        groups: [
          {
            title: 'Clothing',
            items: [
              'T-Shirts',
              'Shirts',
              'Kurtas',
              'Bottom Wear',
              'Jeans',
              'Trousers',
              'Track Pants',
              'Ethnic Wear',
              'Winter Wear',
              'Innerwear & Sleepwear',
            ],
          },
          {
            title: 'Footwear',
            items: [
              'Casual Shoes',
              'Formal Shoes',
              'Sports Shoes',
              'Sandals & Slippers',
              'Ethnic Footwear',
            ],
          },
          {
            title: 'Accessories',
            items: [
              'Belts',
              'Wallets',
              'Watches',
              'Caps & Hats',
              'Sunglasses',
              'Socks',
            ],
          },
        ],
      },
      {
        id: 'men-personal-care',
        label: 'Men – Personal Care',
        groups: [
          {
            title: 'Grooming',
            items: [
              'Beard Care',
              'Shaving & Hair Removal',
              'Hair Styling',
              'Trimmers & Grooming Tools',
            ],
          },
          {
            title: 'Personal Care',
            items: [
              'Bath & Body',
              'Face Care',
              'Hair Care',
              'Deodorants & Perfumes',
              'Oral Care',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pets',
    label: 'PETS',
    type: 'simple',
    items: ['Pet Food', 'Accessories', 'Pet Care'],
  },
  {
    id: 'kids',
    label: 'KIDS',
    type: 'simple',
    items: ['Kids Clothing', 'Kids Care'],
  },
  {
    id: 'toys-and-learning',
    label: 'TOYS & LEARNING',
    type: 'simple',
    items: ['Toys', 'Educational & STEM Learning'],
  },
  {
    id: 'baby-care',
    label: 'BABY CARE',
    type: 'simple',
    items: [
      'Baby Food',
      'Baby Personal Care',
      'Baby Health & Hygiene',
      'Baby Accessories',
    ],
  },
  {
    id: 'fitness-and-wellness',
    label: 'FITNESS & WELLNESS',
    type: 'simple',
    items: ['Supplements', 'Fitness Equipment'],
  },
  {
    id: 'home-decor-and-kitchen',
    label: 'HOME, DECOR & KITCHEN',
    type: 'simple',
    items: ['Home Decor', 'Kitchen Essentials', 'Lifestyle Essentials'],
  },
  {
    id: 'electronics-and-smart-products',
    label: 'ELECTRONICS & SMART PRODUCTS',
    type: 'simple',
    items: ['Smart Gadgets', 'Electronics'],
  },
];

