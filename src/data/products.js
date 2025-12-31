export const products = [
  {
    id: 1,
    name: "Moisturizing Cream",
    price: 45.00,
    salePrice: null,
    category: "cream",
    tagline: null,
    shortDescription: "A daily face cream that hydrates, repairs, and protects, leaving skin smooth, balanced, and healthy-looking.",
    fullDescription: "This essential moisturizing cream delivers long-lasting hydration while helping repair and protect the skin barrier. Formulated with Niacinamide, Vitamin E, Pro-Vitamin B5, and Centella Asiatica, it soothes irritation, improves skin texture, and restores comfort. Enriched with Shea Butter, the cream deeply nourishes without feeling heavy or greasy. Perfect for daily use, it absorbs quickly and leaves the skin soft, resilient, and visibly healthier.",
    result: "Hydrated, smooth, and energized skin—day after day.",
    benefits: [
      "Long-lasting hydration",
      "Strengthens and repairs the skin barrier",
      "Helps reduce redness and dark spots",
      "Improves skin texture and radiance",
      "Comfort without heaviness"
    ],
    ingredients: [
      {
        name: "Niacinamide (Vitamin B3)",
        benefit: "Brightens, smooths, and regulates oil"
      },
      {
        name: "Vitamin E",
        benefit: "Protects against environmental stress"
      },
      {
        name: "Pro-Vitamin B5",
        benefit: "Repairs and soothes the skin"
      },
      {
        name: "Centella Asiatica",
        benefit: "Supports regeneration and firmness"
      },
      {
        name: "Shea Butter",
        benefit: "Deep nourishment and barrier repair"
      }
    ],
    howToUse: "Apply an even layer to clean, dry skin. Massage gently until fully absorbed. Use morning and evening.",
images: [
  "./product-1/5321c6e261786b63516f5ab5b4c153ceeff66113f7f4eaa52c378d9e5b404565_lg.webp",
  "./product-1/7cb1b4404be5df6181f598982b717f2400e0f68706d12721ef3def9d548ea095_lg.webp",
  "./product-1/7ccba30e83a73740d74d4d9327820ee1967f8d02ddd2ec919426b210e5046b66_lg.webp",
  "./product-1/9407c2977cb0b3d25598761856673853644ef80db96f4d828a3649568b137632_lg.webp"
],
    stock: true
  },
  {
    id: 2,
    name: "Cleansing Gel",
    price: 45.00,
    salePrice: null,
    category: "cleanser",
    tagline: "CLEAN. CALM. FRESH.",
    shortDescription: "A gentle yet powerful daily cleanser that removes impurities, excess oil, and buildup—without stripping the skin. Designed to cleanse, calm, and refresh.",
    fullDescription: "This essential cleansing gel is formulated to deeply cleanse the skin while respecting its natural balance. Powered by Niacinamide (Vitamin B3), Vitamin E, and Pro-Vitamin B5, it helps strengthen the skin barrier, reduce redness, and maintain optimal hydration. Its soft, light foam effectively removes dirt, excess sebum, and even makeup, leaving the skin feeling clean, comfortable, and refreshed—never tight or dry. Suitable for all skin types, including sensitive and acne-prone skin.",
    result: "Clean, calm, and fresh skin—ready for hydration.",
    benefits: [
      "Deeply cleanses without irritation",
      "Helps reduce redness and excess oil",
      "Strengthens the skin barrier",
      "Maintains hydration and comfort",
      "Leaves skin fresh and balanced"
    ],
    ingredients: [
      {
        name: "Niacinamide (Vitamin B3)",
        benefit: "Evens skin tone, regulates sebum, and strengthens the skin barrier"
      },
      {
        name: "Vitamin E",
        benefit: "Antioxidant protection and hydration"
      },
      {
        name: "Pro-Vitamin B5 (Panthenol)",
        benefit: "Soothes, repairs, and moisturizes"
      },
      {
        name: "Arnica Extract",
        benefit: "Calms irritation and improves skin comfort"
      },
      {
        name: "Gentle Cleansing Agents",
        benefit: "Effective cleansing with minimal stripping"
      }
    ],
    howToUse: "Apply to damp skin. Massage gently in circular motions, avoiding the eye area. Rinse thoroughly with lukewarm water. Use morning and evening as the first step of your routine.",
    images: [
      "./product-2/577e9648da4fc6545a9a0521999454811da157e534c0b1c439c67789d27a02ab_lg.webp",
      "./product-2/87a7177559f80c0756d917149c72e667de44e3ab4fbd96d1676ae2d7236fe8ab_lg.webp"
    ],
    stock: true
  },
  {
    id: 3,
    name: "The Essential Pack",
    price: 90.00,
    salePrice: 79.00,
    category: "bundle",
    tagline: "Everything your skin needs. Nothing it doesn't.",
    shortDescription: "The Essential Pack combines the two fundamentals of an effective skincare routine: cleanse and hydrate. Designed for men who value simplicity, performance, and consistency.",
    fullDescription: "Start with the Essential Cleansing Gel to remove impurities and rebalance the skin. Follow with the Essential Moisturizing Cream to hydrate, repair, and protect. Together, they create a complete daily routine that delivers visible results with minimal effort.",
    result: "Cleaner skin, better texture, lasting comfort.",
    benefits: [
      "Simple 2-step routine",
      "Suitable for all skin types",
      "Ideal for daily use",
      "Designed for long-term skin health"
    ],
    ingredients: [
      {
        name: "Essential Cleansing Gel",
        benefit: "200 ml - Deep cleansing and balance"
      },
      {
        name: "Essential Moisturizing Cream",
        benefit: "50 ml - Hydration and protection"
      }
    ],
    howToUse: "Step 1: Cleanse with Essential Cleansing Gel. Step 2: Hydrate with Essential Moisturizing Cream. Use morning and evening.",
    images: [
      "./product-3/577e9648da4fc6545a9a0521999454811da157e534c0b1c439c67789d27a02ab_lg.webp",
      "./product-3/9407c2977cb0b3d25598761856673853644ef80db96f4d828a3649568b137632_lg.webp",
      "./product-3/d43f646db0d13a17bdbad6c9098c9e45b39b415d3bccf1c20f2712fad9814b94_lg.webp"
    ],
    stock: true,
    packContents: [
      "Essential Cleansing Gel (200 ml)",
      "Essential Moisturizing Cream (50 ml)"
    ]
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getRelatedProducts = (currentProductId, limit = 2) => {
  return products.filter(product => product.id !== parseInt(currentProductId)).slice(0, limit);
};
