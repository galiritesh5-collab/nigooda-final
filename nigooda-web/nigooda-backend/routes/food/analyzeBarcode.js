const express = require("express");

const axios = require("axios");

const router = express.Router();

const FinalFoodAnalysis =
  require(
    "../../utils/foodEngine/finalFoodAnalysis"
  );

/* =====================================
   FIND FIRST VALID VALUE
===================================== */

function findFirst(...values) {

  for (const value of values) {

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {

      return value;

    }

  }

  return "";

}

/* =====================================
   CLEAN TEXT
===================================== */

function cleanText(value) {

  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/\s+/g, " ")
    .trim();

}

/* =====================================
   UNIVERSAL INGREDIENT EXTRACTION
===================================== */

function extractIngredients(product) {

  let ingredients = [];

  /* ===================================
     METHOD 1
     STRUCTURED INGREDIENTS
  =================================== */

  if (
    Array.isArray(product.ingredients)
  ) {

    ingredients =
      product.ingredients
        .map((item) => {

          if (
            typeof item === "string"
          ) {

            return cleanText(item);

          }

          if (
            item &&
            typeof item.text === "string"
          ) {

            return cleanText(
              item.text
            );

          }

          if (
            item &&
            typeof item.name === "string"
          ) {

            return cleanText(
              item.name
            );

          }

          if (
            item &&
            typeof item.id === "string"
          ) {

            return cleanText(
              item.id
            );

          }

          return null;

        })
        .filter(Boolean);

  }

  /* ===================================
     METHOD 2
     RAW INGREDIENT TEXT
  =================================== */

  if (ingredients.length === 0) {

    const rawText = findFirst(
      product.ingredients_text,
      product.ingredients_text_en,
      product.ingredients_text_with_allergens,
      product.ingredients_text_with_allergens_en
    );

    if (rawText) {

      ingredients =
        rawText
          .split(",")
          .map((item) =>
            cleanText(item)
          )
          .filter(Boolean);

    }

  }

  /* ===================================
     REMOVE DUPLICATES
  =================================== */

  ingredients =
    [...new Set(ingredients)];

  return ingredients;

}

/* =====================================
   UNIVERSAL NUTRITION EXTRACTION
===================================== */

function extractNutrition(product) {

  const nutriments =
    product.nutriments || {};

  const nutrition = {};

  for (const key in nutriments) {

    let value = null;

    let cleanKey = "";

    /* =================================
       PRIORITY 1
       PER SERVING
    ================================= */

    if (
      key.endsWith("_serving")
    ) {

      cleanKey =
        key.replace(
          "_serving",
          ""
        );

      value =
        nutriments[key];

    }

    /* =================================
       PRIORITY 2
       PER 100G
    ================================= */

    else if (
      key.endsWith("_100g")
    ) {

      cleanKey =
        key.replace(
          "_100g",
          ""
        );

      if (
        nutrition[cleanKey]
      ) {

        continue;

      }

      value =
        nutriments[key];

    }

    /* =================================
       SKIP OTHER FIELDS
    ================================= */

    else {

      continue;

    }

    /* =================================
       REMOVE USELESS VALUES
    ================================= */

    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === 0
    ) {

      continue;

    }

    nutrition[cleanKey] = value;

  }

  return nutrition;

}

/* =====================================
   ANALYZE BARCODE
===================================== */

async function analyzeBarcode(
  barcode
) {

  const response =
    await axios.get(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      {
        headers: {
          "User-Agent":
            "Nigooda/1.0"
        },

        timeout: 10000
      }
    );

  const product =
    response?.data?.product;

  if (!product) {

    throw new Error(
      "Product not found"
    );

  }

  /* =================================
     FINAL OUTPUT
  ================================= */

  const result = {

    barcode,

    product_name: cleanText(
      findFirst(
        product.product_name,
        product.product_name_en,
        product.generic_name
      )
    ),

    brand: cleanText(
      product.brands
    ),

    category: cleanText(
      product.categories
    ),

    serving_size: cleanText(
      findFirst(
        product.serving_size,

        product.serving_quantity &&
        product.serving_quantity_unit

          ? `${product.serving_quantity} ${product.serving_quantity_unit}`

          : ""
      )
    ),

    product_image: findFirst(
      product.image_front_url,
      product.image_url,

      product?.selected_images
        ?.front?.display?.en
    ),

    ingredients_text: cleanText(
      findFirst(
        product.ingredients_text,
        product.ingredients_text_en
      )
    ),

    ingredients:
      extractIngredients(
        product
      ),

    nutrition:
      extractNutrition(
        product
      )

  };

  return result;

}

/* =====================================
   ROUTE
===================================== */

router.post(
  "/analyze-barcode",

  async (req, res) => {

    try {

      const { barcode } =
        req.body;

      if (!barcode) {

        return res
          .status(400)
          .json({
            error:
              "Barcode required"
          });

      }

      const extractedProduct =
        await analyzeBarcode(
          barcode
        );

      /* ================================
         FINAL FOOD ANALYSIS
      ================================ */

      const finalAnalysis =
        await FinalFoodAnalysis.run({
          product: {
            name:
              extractedProduct.product_name,

            brand:
              extractedProduct.brand,

            category:
              extractedProduct.category,

            image:
              extractedProduct.product_image,
          },

          nutrition: {
            serving_size:
              extractedProduct.serving_size,

            ...extractedProduct.nutrition,
          },

          ingredients:
            extractedProduct.ingredients,
        });

      return res.json({
        success: true,

        barcode,

        analysis:
          finalAnalysis,
      });

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .json({
          error:
            error.message ||
            "Barcode analysis failed"
        });

    }

  }
);

module.exports = router;