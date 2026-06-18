const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

function cleanString(value) {
  return String(value || "").trim().toLowerCase();
}

router.get("/recommendations", async (req, res) => {
  try {
    const {
      category,
      subcategory,
      ingredients,
      limit = 15,
    } = req.query;

    const ingredientList = String(
      ingredients || ""
    )
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const products = await Product.find({
      Status: "Live",
    }).lean();

    const scoredProducts = products.map((product) => {
      let score = 0;

      const tags = cleanString(product.Tags);

      // Category Match
      if (
        cleanString(product["Primary Category"]) ===
        cleanString(category)
      ) {
        score += 50;
      }

      // Subcategory Match
      if (
        cleanString(product["Sub-Category"]) ===
        cleanString(subcategory)
      ) {
        score += 100;
      }

      // Tag Match
      ingredientList.forEach((ingredient) => {
        if (
          tags.includes(
            cleanString(ingredient)
          )
        ) {
          score += 10;
        }
      });

      // Hidden Gem Boost
      if (product.isUnderrated) {
        score += 20;
      }

      return {
        ...product,
        recommendationScore: score,
      };
    });

    const filtered = scoredProducts
      .filter((p) => p.recommendationScore > 0)
      .sort(
        (a, b) =>
          b.recommendationScore -
          a.recommendationScore
      )
      .slice(0, Number(limit));

    const groupedMap = {};

    filtered.forEach((product) => {
      const groupId =
        product["Variant Group ID"] ||
        product.id;

      if (!groupedMap[groupId]) {
        groupedMap[groupId] = {
          groupId,
          displayProduct: product,
          variants: [],
        };
      }

      groupedMap[groupId].variants.push(
        product
      );
    });

    const groupedProducts =
      Object.values(groupedMap);

    res.json(groupedProducts);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        "Failed to load recommendations",
    });
  }
});

module.exports = router;