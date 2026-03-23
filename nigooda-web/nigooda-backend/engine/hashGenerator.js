// engine/hashGenerator.js

const crypto = require("crypto");



// 🧠 Generate Ingredient Hash

function generateIngredientHash(ingredients) {

  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  // Step 1 — Sort ingredients
  // (ensures order doesn't affect hash)

  const sortedIngredients =
    [...ingredients].sort();



  // Step 2 — Join into string

  const joinedString =
    sortedIngredients.join("|");



  // Step 3 — Create hash

  const hash =
    crypto
      .createHash("md5")
      .update(joinedString)
      .digest("hex");



  return hash;
}



module.exports =
generateIngredientHash;