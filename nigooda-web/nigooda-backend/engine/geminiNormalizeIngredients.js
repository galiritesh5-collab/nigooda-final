const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function normalizeIngredients(text){

const model = genAI.getGenerativeModel({
model:"gemini-1.5-flash"
});

const prompt = `
You are a food ingredient parser.

Extract ingredients from this label and normalize them.

Rules:
- remove percentages
- remove brackets
- convert to canonical ingredient names
- split combined ingredients
- return lowercase
- do not explain

Label:
${text}

Return JSON:

{
 "ingredients":[]
}
`;

const result = await model.generateContent(prompt);

const response = result.response.text().replace(/```json|```/g,"");

const data = JSON.parse(response);

return data.ingredients;

}

module.exports = normalizeIngredients;