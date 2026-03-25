// engine/hashGenerator.js

const crypto = require("crypto");

function generateIngredientHash(
  ingredients
) {

  if (!ingredients) {

    return null;

  }

  const sorted =
    [...ingredients].sort();

  const joined =
    sorted.join("|");

  const hash =
    crypto
      .createHash("md5")
      .update(joined)
      .digest("hex");

  return hash;

}

module.exports =
  generateIngredientHash;