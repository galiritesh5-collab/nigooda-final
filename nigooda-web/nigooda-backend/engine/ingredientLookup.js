// engine/ingredientLookup.js

const fs = require("fs");
const path = require("path");

const classifyIngredientAI =
require("../ai/ingredientAI");



// DB PATH

const ingredientDBPath = path.join(
  __dirname,
  "../data/ingredientDB.json"
);



// 🧠 Load DB

function loadIngredientDB() {

  try {

    const data =
      fs.readFileSync(
        ingredientDBPath,
        "utf8"
      );

    return JSON.parse(data);

  } catch {

    return [];

  }

}



// 🧠 Save DB

function saveIngredientDB(db) {

  fs.writeFileSync(
    ingredientDBPath,
    JSON.stringify(db, null, 2)
  );

}



// 🧠 Generate New Ingredient ID

function generateIngredientID(db) {

  const newNumber =
    db.length + 1;

  return `ING_${String(newNumber)
    .padStart(6, "0")}`;
}



// 🧠 Find Ingredient in DB

function findIngredient(name, db) {

  for (let ingredient of db) {

    if (
      ingredient.canonical_name === name
    ) {

      return ingredient;

    }

    if (
      ingredient.aliases &&
      ingredient.aliases.includes(name)
    ) {

      return ingredient;

    }

  }

  return null;

}



// 🧠 Create New Ingredient via AI

async function createIngredient(name, db) {

  console.log(
    "🧠 Unknown ingredient → AI:",
    name
  );

  const aiResult =
    await classifyIngredientAI(name);



  // Add system fields

  const newIngredient = {

    ingredient_id:
      generateIngredientID(db),

    canonical_name:
      aiResult.canonical_name,

    aliases:
      aiResult.aliases || [],

    categories:
      aiResult.categories || {},

    risk_level:
      aiResult.risk_level || "low",

    safety_flags:
      aiResult.safety_flags || [],

    allergens:
      aiResult.allergens || [],

    penalty_flags:
      aiResult.penalty_flags || {},

    derived_flags:
      aiResult.derived_flags || {},

    processing_flags:
      aiResult.processing_flags || {},

    nutrition_flags:
      aiResult.nutrition_flags || {},

    notes:
      aiResult.notes || "",

    source_refs:
      aiResult.source_refs || [],

    confidence_score:
      aiResult.confidence_score || 0.8,

    usage_frequency: 1,

    status:
      "ai_generated",

    created_at:
      new Date(),

    last_updated:
      new Date()

  };



  db.push(newIngredient);

  saveIngredientDB(db);



  return newIngredient;

}



// 🧠 MAIN LOOKUP FUNCTION

async function lookupIngredient(name) {

  let db =
    loadIngredientDB();



  let ingredient =
    findIngredient(name, db);



  if (ingredient) {

    // Increase usage count

    ingredient.usage_frequency += 1;

    saveIngredientDB(db);

    return ingredient;

  }



  // Not found → create via AI

  ingredient =
    await createIngredient(
      name,
      db
    );



  return ingredient;

}



module.exports =
lookupIngredient;