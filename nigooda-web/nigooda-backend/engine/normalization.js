// engine/normalization.js

const fs = require("fs");
const path = require("path");



/* =========================================
   LOAD DB (CACHE)
========================================= */

const ingredientDBPath = path.join(
  __dirname,
  "../data/ingredientDB.json"
);

let ingredientDB = [];

try {

  const data = fs.readFileSync(
    ingredientDBPath,
    "utf8"
  );

  ingredientDB = JSON.parse(data);

}

catch {

  ingredientDB = [];

}



/* =========================================
   CLEAN SINGLE INGREDIENT
========================================= */

function cleanItem(item) {

  if (!item) return "";

  return item
    .toLowerCase()

    // remove brackets
    .replace(/\(.*?\)/g, "")

    // remove %
    .replace(/\d+(\.\d+)?%/g, "")

    // remove punctuation
    .replace(/[^\w\s]/g, "")

    // normalize spaces
    .replace(/\s+/g, " ")

    .trim();

}



/* =========================================
   ALIAS RESOLUTION
========================================= */

function resolveAlias(name) {

  for (let ing of ingredientDB) {

    if (ing.canonical_name === name) {

      return name;

    }

    if (
      ing.aliases &&
      ing.aliases.includes(name)
    ) {

      return ing.canonical_name;

    }

  }

  return name;

}



/* =========================================
   MAIN FUNCTION
========================================= */

function normalizeIngredients(input) {

  let list = [];



  /* CASE 1 — ARRAY */

  if (Array.isArray(input)) {

    list = input;

  }



  /* CASE 2 — STRING */

  else if (typeof input === "string") {

    list = input.split(/[,;\n•]/);

  }



  else {

    return [];

  }



  let normalized = [];



  for (let item of list) {

    let clean = cleanItem(item);

    clean = resolveAlias(clean);

    if (clean.length > 0) {

      normalized.push(clean);

    }

  }



  /* Remove duplicates */

  normalized = [...new Set(normalized)];



  return normalized;

}



module.exports = normalizeIngredients;