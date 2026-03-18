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

// ----------------------------------------------------------------------
// MOCK PRODUCTS (UI ONLY)
// ----------------------------------------------------------------------

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Organic Ragi Cookies',
    brand: 'Early Foods',
    price: 299,
    image: 'https://picsum.photos/400/400?random=1',
    rating: 4.8,
    tags: ['Clean Label'],
  },
  {
    id: '2',
    name: 'Handwoven Ikat Tote',
    brand: 'Zouk',
    price: 1499,
    image: 'https://picsum.photos/400/400?random=2',
    rating: 4.9,
    tags: ['Vegan Leather'],
  },
  {
    id: '3',
    name: 'Ayurvedic Face Oil',
    brand: 'Blue Nectar',
    price: 895,
    image: 'https://picsum.photos/400/400?random=3',
    rating: 4.7,
    tags: ['100% Natural'],
  },
  {
    id: '4',
    name: 'Smart Plant Monitor',
    brand: 'SustEarth',
    price: 2499,
    image: 'https://picsum.photos/400/400?random=4',
    rating: 4.5,
    tags: ['Tech'],
  },
  {
    id: '5',
    name: 'Bamboo Toothbrush Set',
    brand: 'Rusabl',
    price: 199,
    image: 'https://picsum.photos/400/400?random=5',
    rating: 4.6,
    tags: ['Eco-friendly'],
  },
  {
    id: '6',
    name: 'Millet Muesli',
    brand: 'Monsoon Harvest',
    price: 350,
    image: 'https://picsum.photos/400/400?random=6',
    rating: 4.8,
    tags: ['Gluten Free'],
  },
];

// ----------------------------------------------------------------------
// STORES
// ----------------------------------------------------------------------

export const STORES = [
  {
    id: '1',
    name: 'The Whole Truth',
    description: '100% Clean Food. No Chemicals.',
    logo: 'https://picsum.photos/100/100?random=10',
  },
  {
    id: '2',
    name: 'Phool',
    description: 'Incense from recycled temple flowers.',
    logo: 'https://picsum.photos/100/100?random=11',
  },
  {
    id: '3',
    name: 'Vahdam Teas',
    description: "India's freshest tea to the world.",
    logo: 'https://picsum.photos/100/100?random=12',
  },
  {
    id: '4',
    name: 'Mokobara',
    description: 'Premium modern travel gear.',
    logo: 'https://picsum.photos/100/100?random=13',
  },
];