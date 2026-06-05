const FoodAI = require("./FoodAI");
const FoodDeterministic = require("./FoodDeterministic");
const openai =
require("../../ai/openaiClient");
/*
===========================================================
NIGOODA FINAL FOOD ANALYSIS ENGINE
===========================================================
RESPONSIBILITIES:
1. Connect FoodAI
2. Connect FoodDeterministic
3. Generate Ingredient Analysis Output
4. Generate Nutrition Analysis Output
5. Detect Pure Natural Products
6. Generate Final Frontend-Ready Response
===========================================================
*/

class FinalFoodAnalysis {
  // ─── MAIN PIPELINE ───────────────────────────────────────────────────────────

  async run(productInput) {
    try {
      const aiOutput = await FoodAI.run(productInput);
      const deterministicOutput = FoodDeterministic.run(aiOutput);

      delete deterministicOutput.nutrition?.["nova-group"];

      const pureProductAnalysis  = this.detectPureProduct(deterministicOutput);
      const ingredientAnalysis   = await this.generateIngredientAnalysis(deterministicOutput, pureProductAnalysis);
      const nutritionAnalysis    = await this.generateNutritionAnalysis(deterministicOutput);

      return {

  productType:
    "FOOD",

  analysis: `

${ingredientAnalysis}

---

${nutritionAnalysis}

`,

  raw_analysis:
    deterministicOutput,

};
    } catch (error) {
      console.error("FINAL FOOD ANALYSIS ERROR:", error.message);
      throw error;
    }
  }

  // ─── PURE PRODUCT DETECTION ───────────────────────────────────────────────────

  detectPureProduct(data) {
    const ingredients     = data.ingredients || [];
    const finalRating     = data.final_rating || 0;
    const ingredientCount = ingredients.length;
    const ultraProcessed  = ingredients.some((i) => i.ultra_processed);
    const hasNegativeTraits   = ingredients.some((i) => i.negative_traits?.length > 0);
    const hasCriticalPenalties= data.penalties?.some((p) => p.penalty <= -0.6);

    const isPureNatural =
      ingredientCount <= 3 &&
      finalRating >= 4.5 &&
      !ultraProcessed &&
      !hasNegativeTraits &&
      !hasCriticalPenalties;

    return { is_pure_natural: isPureNatural };
  }

  // ─── INGREDIENT ANALYSIS ──────────────────────────────────────────────────────

  async generateIngredientAnalysis(data, pureProductAnalysis) {
    try {
      const prompt = `You are the Nigooda Final Ingredient Analysis Engine.

You are given: final deterministic ingredient analysis, AI ingredient intelligence, penalties, bonuses, risks, processing analysis.

TASK: Generate a FINAL professional ingredient analysis.

RULES:
- Use ONLY provided JSON data — do NOT invent ingredient facts
- Ingredients must be interpreted within product context (e.g. rice meal inside extruded fried snacks ≠ intact whole grain rice)
- Do NOT calculate scores or change ratings
- Keep concise and professional | consumer-friendly tone | scientifically grounded | no fearmongering
- Use markdown formatting

PURE PRODUCT RULE:
If "is_pure_natural": true → mention: "Pure Product", "Minimal ingredient processing", "Naturally ingredient-focused" — still include advantages, consumption guidance, positives.

OUTPUT FORMAT:

# Ingredient Analysis

## ⭐ Ingredient Rating
[final rating] / 5

## ⚖ Ingredient Quality
[Excellent / Very Good / Good / Moderate / Poor / Very Poor]

## 🏭 Processing Level
[level]

---

# 📊 Category Breakdown

For EACH category in deterministic_analysis.category_scores:

## [Category Name]
⭐ [rating] / 5 — [quality]

Reason:
[Short explanation based on actual ingredients, processing context, penalties — NOT generic. Explain WHY that rating was given.]

RULES:
- Context matters: refined cereal inside ultra-processed snacks → reduce category quality
- Highly processed foods should NOT receive overly positive category reasoning

---

# ⚠ Quality Concerns
Only triggered concerns.

---

# 🎁 Positive Factors
Only positive triggers.
IMPORTANT: If highly/ultra processed OR multiple penalties OR final rating < 2.5 → reduce positive emphasis. Do NOT over-highlight tiny positives inside unhealthy products.

---

# 🚨 Critical Ingredient Alerts
Only if present.

---

# ⚠ Allergen Advisory
Only if present.

---

# ⚠ Safety Advisory
Prioritize: children, hypertension, diabetes, heart health, weight management. Only if scientifically relevant.

---

# 📊 Consumption Recommendation

---

# 🔬 Key Ingredients
Prioritize: dominant ingredients, major refined bases, oils, sugars, flavor enhancers, major functional additives. Avoid insignificant micro-ingredients.

---

# 🧠 Why This Rating
Explain major positive and negative drivers. Keep concise.

---

# 📌 Product Insight

## Positives
- point

## Concerns
- point

INPUT JSON:
${JSON.stringify({ deterministic_analysis: data, pure_product_analysis: pureProductAnalysis }, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0.2,
        messages: [
          { role: "system", content: "You are a strict professional food ingredient analysis engine." },
          { role: "user", content: prompt },
        ],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("INGREDIENT ANALYSIS ERROR:", error.message);
      throw error;
    }
  }

  // ─── NUTRITION ANALYSIS ───────────────────────────────────────────────────────

  async generateNutritionAnalysis(data) {
    try {
      const prompt = `You are an advanced food nutrition and scientific health analysis engine.

Analyze food products using WHO ideal daily intake recommendations and evidence-based health reasoning.

OUTPUT RULES:
- Use WHO IDEAL LIMITS only
- Never show calculations, formulas, reasoning steps, AI assumptions
- Never include NOVA group analysis or overall product rating
- Clean, professional, scientific, consumer-friendly
- Structured markdown formatting

OUTPUT FORMAT:

# Nutrition Analysis

## Serving Size
- [serving size]

---

# Daily Intake Percentage

| Nutrient | Amount | Daily Intake % |
|---|---|---|

Rules:
- Use WHO ideal limits
- Include only nutrients with meaningful standardized intake percentages
- Do NOT calculate energy/calorie percentages (vary by person)
- Do NOT include nutrients if data unavailable
- Simple rounded percentages

---

# Nutrition Breakdown

| Nutrient | Amount | Analysis |
|---|---|---|

Rules:
- Concise scientific analysis per nutrient
- Note if high/low/moderate + health relevance briefly

---

# Scientific Health Rating

| Category | Rating |
|---|---|

Possible categories: Sugar Load | Metabolic Health | Heart Health | Weight Management | Satiety | Ingredient Quality | Electrolyte Profile | Protein Quality | Fiber Quality | Fat Quality

Rules:
- Ratings out of 5 (half ratings allowed)
- Include only relevant categories for this product type

---

# Positives

## ✅ [Title]
Short scientific explanation.

---

# Negatives

## ❌ [Title]
Short scientific explanation (explain WHY nutritionally).

---

# Final Verdict

- Strongest positives
- Biggest nutritional concern
- Ideal consumption pattern
- Who should avoid/limit it
- Do NOT give overall score
- Professional and evidence-based

INPUT JSON:
${JSON.stringify({ product: data.product, nutrition: data.nutrition, ingredients: data.ingredients, processing_analysis: data.processing_analysis }, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0.2,
        messages: [
          { role: "system", content: "You are a strict scientific food nutrition analysis engine." },
          { role: "user", content: prompt },
        ],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("NUTRITION ANALYSIS ERROR:", error.message);
      throw error;
    }
  }
}

module.exports = new FinalFoodAnalysis();
