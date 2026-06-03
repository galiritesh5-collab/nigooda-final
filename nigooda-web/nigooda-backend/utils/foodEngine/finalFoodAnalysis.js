const FoodAI = require("./FoodAI");
const FoodDeterministic = require("./FoodDeterministic");
const openai =
  require("../../ai/openaiClient");
/*
===========================================================
NIGOODA FINAL FOOD ANALYSIS ENGINE
===========================================================

RESPONSIBILITIES

1. Connect FoodAI
2. Connect FoodDeterministic
3. Generate Ingredient Analysis Output
4. Generate Nutrition Analysis Output
5. Detect Pure Natural Products
6. Generate Final Frontend-Ready Response

===========================================================
*/

class FinalFoodAnalysis {
  /*
  ===========================================================
  MAIN PIPELINE
  ===========================================================
  */

  async run(productInput) {
    try {
      /*
      =======================================================
      STEP 1 — AI ENGINE
      =======================================================
      */

      const aiOutput =
        await FoodAI.run(productInput);

      /*
      =======================================================
      STEP 2 — DETERMINISTIC ENGINE
      =======================================================
      */

      const deterministicOutput =
        FoodDeterministic.run(aiOutput);
        /*
=======================================================
REMOVE NOVA
=======================================================
*/

delete deterministicOutput
  .nutrition?.["nova-group"];

      /*
      =======================================================
      STEP 3 — PURE PRODUCT DETECTION
      =======================================================
      */

      const pureProductAnalysis =
        this.detectPureProduct(
          deterministicOutput
        );

      /*
      =======================================================
      STEP 4 — INGREDIENT ANALYSIS
      =======================================================
      */

      const ingredientAnalysis =
        await this.generateIngredientAnalysis(
          deterministicOutput,
          pureProductAnalysis
        );

      /*
      =======================================================
      STEP 5 — NUTRITION ANALYSIS
      =======================================================
      */

      const nutritionAnalysis =
        await this.generateNutritionAnalysis(
          deterministicOutput
        );

      /*
      =======================================================
      FINAL RESPONSE
      =======================================================
      */

      return {
        product:
          deterministicOutput.product,

        nutrition:
          deterministicOutput.nutrition,

        ingredient_analysis:
          ingredientAnalysis,

        nutrition_analysis:
          nutritionAnalysis,

        raw_analysis:
          deterministicOutput,
      };
    } catch (error) {
      console.error(
        "FINAL FOOD ANALYSIS ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  PURE PRODUCT DETECTION
  ===========================================================
  */

  detectPureProduct(data) {
    const ingredients =
      data.ingredients || [];

    const finalRating =
      data.final_rating || 0;

    const ingredientCount =
      ingredients.length;

    const ultraProcessed =
      ingredients.some(
        (ingredient) =>
          ingredient.ultra_processed
      );

    const hasNegativeTraits =
      ingredients.some(
        (ingredient) =>
          ingredient.negative_traits
            ?.length > 0
      );

    const hasCriticalPenalties =
      data.penalties?.some(
        (penalty) =>
          penalty.penalty <= -0.6
      );

    /*
    =======================================================
    PURE PRODUCT RULE
    =======================================================
    */

    const isPureNatural =
      ingredientCount <= 3 &&
      finalRating >= 4.5 &&
      !ultraProcessed &&
      !hasNegativeTraits &&
      !hasCriticalPenalties;

    return {
      is_pure_natural:
        isPureNatural,
    };
  }

  /*
  ===========================================================
  INGREDIENT ANALYSIS GENERATION
  ===========================================================
  */

  async generateIngredientAnalysis(
    data,
    pureProductAnalysis
  ) {
    try {
      const prompt = `
You are the Nigooda Final Ingredient Analysis Engine.

You are given:
1. Final deterministic ingredient analysis
2. AI ingredient intelligence
3. Penalties
4. Bonuses
5. Risks
6. Processing analysis

==================================================

TASK

Generate a FINAL professional ingredient analysis.

==================================================

IMPORTANT RULES

- Use ONLY provided JSON data
- Do NOT invent ingredient facts
IMPORTANT:

Ingredients must be interpreted
within product context.

Example:
Rice meal inside extruded fried snacks
is NOT equivalent to intact whole grain rice.
- Do NOT calculate scores
- Do NOT change ratings
- Keep concise and professional
- Use markdown formatting
- Consumer-friendly tone
- Scientifically grounded
- No fearmongering

==================================================

PURE PRODUCT RULE

If:
"is_pure_natural": true

Then:

- Mention:
"Pure Product"

- Mention:
"Minimal ingredient processing"

- Mention:
"Naturally ingredient-focused"

- Still include:
advantages
consumption guidance
positives

==================================================

OUTPUT FORMAT

# Ingredient Analysis

## ⭐ Ingredient Rating
[final rating] / 5

## ⚖ Ingredient Quality
[Excellent / Very Good / Good / Moderate / Poor / Very Poor]
## 🏭 Processing Level
[level]

---

# 📊 Category Breakdown

Generate expandable-style category analysis.

For EACH category inside:
deterministic_analysis.category_scores

Generate:

- category name
- rating out of 5
- quality label
- short scientific reason

FORMAT:

## [Category Name]
⭐ [rating] / 5 — [quality]

Reason:
[short category explanation]

RULES:

1. Reasons MUST be based on:
- actual ingredients
- processing context
- penalties
- ingredient quality

2. Do NOT generate generic reasons.

3. Reasons should explain:
WHY the category received that rating.

4. Examples:

## Sugars
⭐ 2 / 5 — Poor

Reason:
Contains refined starch-derived carbohydrates and maltodextrin with high glycemic impact.

## Oils
⭐ 1.5 / 5 — Very Poor

Reason:
Contains refined palmolein oil used in deep-fried processing.

## Additives
⭐ 2.5 / 5 — Moderate

Reason:
Contains multiple acidity regulators and flavor enhancers indicating higher processing intensity.

5. Keep concise but meaningful.

6. Context matters:
Refined cereal ingredients inside ultra-processed snacks should reduce category quality.

7. Highly processed foods should NOT receive overly positive category reasoning.
---

# ⚠ Quality Concerns

Only triggered concerns.

Examples:
- Deep-fried processing
- Refined oils used
- Multiple sugar sources
- Ultra-processed pattern
- Maltodextrin present

---

# 🎁 Positive Factors

Only positive triggers.
IMPORTANT:

If:
- highly processed
- ultra processed
- multiple penalties exist
- final rating < 2.5

Then:
reduce positive emphasis.

Do NOT over-highlight tiny positives
inside unhealthy products.

Examples:
- Contains real whole ingredients
- Natural spices present
- Low ingredient complexity
- No additives detected

---

# 🚨 Critical Ingredient Alerts

Only if present.

---

# ⚠ Allergen Advisory

Only if present.

---

# ⚠ Safety Advisory

Prioritize:
- children
- hypertension
- diabetes
- heart health
- weight management

ONLY if scientifically relevant.
---

# 📊 Consumption Recommendation

Examples:
- Consume occasionally
- Suitable for moderate consumption
- Best in small portions

---

# 🔬 Key Ingredients

List key ingredients only.
Prioritize:
- dominant ingredients
- major refined bases
- oils
- sugars
- flavor enhancers
- major functional additives

Avoid insignificant micro-ingredients.

---

# 🧠 Why This Rating

Explain:
- major positive drivers
- major negative drivers

Keep concise.

---

# 📌 Product Insight

## Positives
- point
- point

## Concerns
- point
- point

==================================================

INPUT JSON

${JSON.stringify(
  {
    deterministic_analysis:
      data,

    pure_product_analysis:
      pureProductAnalysis,
  },
  null,
  2
)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o",

          temperature: 0.2,

          messages: [
            {
              role: "system",
              content:
                "You are a strict professional food ingredient analysis engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return response.choices[0]
        .message.content;
    } catch (error) {
      console.error(
        "INGREDIENT ANALYSIS ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  NUTRITION ANALYSIS GENERATION
  ===========================================================
  */

  async generateNutritionAnalysis(
    data
  ) {
    try {
      const prompt = `
You are an advanced food nutrition and scientific health analysis engine.

Your task is to analyze food products using:
- WHO ideal daily intake recommendations
- scientific nutrition principles
- evidence-based health reasoning

IMPORTANT OUTPUT RULES:
- Always use WHO IDEAL LIMITS only
- Never show calculations/formulas
- Never show reasoning steps
- Never mention AI assumptions
- Never include NOVA group analysis
- Never include overall product rating
- Keep output clean, professional, scientific, and consumer-friendly
- Use structured markdown formatting exactly

==================================================
OUTPUT FORMAT
==================================================

# Nutrition Analysis

## Serving Size
- [serving size]

---

# Daily Intake Percentage

Create a table:

| Nutrient | Amount | Daily Intake % |
|---|---|---|

Rules:
- Use WHO ideal limits wherever applicable
- Include only nutrients that have meaningful standardized intake percentages
- Do NOT calculate calories/energy percentages because they vary by person
- Do NOT include nutrients if data is unavailable
- Keep percentages simple and rounded

---

# Nutrition Breakdown

Create a table:

| Nutrient | Amount | Analysis |
|---|---|---|

Rules:
- Give concise scientific analysis
- Mention if nutrient is high/low/moderate
- Mention health relevance briefly
- Focus on nutritional quality

---

# Scientific Health Rating

Create a table:

| Category | Rating |
|---|---|

Possible categories:
- Sugar Load
- Metabolic Health
- Heart Health
- Weight Management
- Satiety
- Ingredient Quality
- Electrolyte Profile
- Protein Quality
- Fiber Quality
- Fat Quality

Rules:
- Ratings must be out of 5
- Use half ratings where appropriate
- Include only relevant categories based on product type

---

# Positives

Rules:
- Use bullet-style sections with ✅
- Mention scientifically beneficial aspects only
- Keep concise but meaningful

Format:

## ✅ [Title]
Short scientific explanation.

---

# Negatives

Rules:
- Use bullet-style sections with ❌
- Mention evidence-based concerns only
- Explain WHY nutritionally

Format:

## ❌ [Title]
Short scientific explanation.

---

# Final Verdict

Rules:
- Give balanced scientific conclusion
- Mention:
  - strongest positives
  - biggest nutritional concern
  - ideal consumption pattern
  - who should avoid/limit it
- Do NOT give overall score
- Keep professional and evidence-based

==================================================

INPUT JSON

${JSON.stringify(
  {
    product: data.product,

    nutrition: data.nutrition,

    ingredients: data.ingredients,

    processing_analysis:
      data.processing_analysis,
  },
  null,
  2
)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o",

          temperature: 0.2,

          messages: [
            {
              role: "system",
              content:
                "You are a strict scientific food nutrition analysis engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return response.choices[0]
        .message.content;
    } catch (error) {
      console.error(
        "NUTRITION ANALYSIS ERROR:",
        error.message
      );

      throw error;
    }
  }
}

module.exports =
  new FinalFoodAnalysis();