// engine/normalization.js

const fs = require("fs");
const path = require("path");


// Load ingredient database for alias lookup

const ingredientDBPath = path.join(
  __dirname,
  "../data/ingredientDB.json"
);

function loadIngredientDB() {

  try {

    const data = fs.readFileSync(
      ingredientDBPath,
      "utf8"
    );

    return JSON.parse(data);

  } catch (error) {

    return [];

  }

}



// 🧠 STEP 1 — Split Ingredients

function splitIngredients(text) {

  return text
    .split(/[,;\n•]/)
    .map(item => item.trim());

}



// 🧠 STEP 2 — Remove Brackets

function removeBrackets(text) {

  return text.replace(/\(.*?\)/g, "");

}



// 🧠 STEP 3 — Remove Percentages

function removePercentages(text) {

  return text.replace(
    /\d+(\.\d+)?%/g,
    ""
  );

}



// 🧠 STEP 4 — Remove Punctuation

function removePunctuation(text) {

  return text.replace(
    /[^\w\s]/g,
    ""
  );

}



// 🧠 STEP 5 — Normalize Spaces

function normalizeSpaces(text) {

  return text
    .replace(/\s+/g, " ")
    .trim();

}



// 🧠 STEP 6 — Resolve Aliases

function resolveAlias(name) {

  const db = loadIngredientDB();

  for (let ingredient of db) {

    if (
      ingredient.canonical_name === name
    ) {

      return name;

    }

    if (
      ingredient.aliases &&
      ingredient.aliases.includes(name)
    ) {

      return ingredient.canonical_name;

    }

  }

  return name;

}



// 🧠 MAIN NORMALIZATION FUNCTION

function normalizeIngredients(rawText) {

  if (!rawText) return [];

  let ingredients =
    splitIngredients(rawText);

  let normalized = [];

  for (let item of ingredients) {

    item = item.toLowerCase();

    item = removeBrackets(item);

    item = removePercentages(item);

    item = removePunctuation(item);

    item = normalizeSpaces(item);

    item = resolveAlias(item);

    if (item.length > 0) {

      normalized.push(item);

    }

  }



  // 🧠 Remove duplicates

  normalized =
    [...new Set(normalized)];



  return normalized;

}



// Export function

module.exports = normalizeIngredients;