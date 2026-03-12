const normalize = require("./geminiNormalizeIngredients");
const resolveIngredient = require("./resolveIngredient");

async function processIngredients(text){

const ingredients = await normalize(text);

const results = [];

for(const ing of ingredients){

const data = await resolveIngredient(ing);

results.push(data);

}

return results;

}

module.exports = processIngredients;