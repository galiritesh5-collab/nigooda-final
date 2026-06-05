const openai = require("../../ai/openaiClient");

/*
===========================================================
NIGOODA FOOD AI ENGINE
===========================================================
AI RESPONSIBILITIES:
1. Ingredient Normalization
2. Ingredient Category Mapping
3. Ingredient Rating Intelligence
4. Processing Detection
5. Bonus Detection
6. Risk Analysis
===========================================================
NOT RESPONSIBLE FOR:
- positional weights / weighted averages
- category boost calculations
- deterministic penalties / final score
- mathematical formulas
- key ingredient extraction / product insights
===========================================================
*/

class FoodAI {
  async run(productInput) {
    try {
      const normalizedIngredients = await this.normalizeIngredients(productInput.ingredients);
      const categorizedIngredients = await this.mapIngredientCategories(normalizedIngredients);
      const enrichedIngredients = await this.generateIngredientIntelligence(categorizedIngredients);
      const processingAnalysis = await this.analyzeProcessing({
        product: productInput.product,
        nutrition: productInput.nutrition,
        ingredients: enrichedIngredients,
      });
      const bonuses = await this.detectBonuses({
        product: productInput.product,
        ingredients: enrichedIngredients,
      });
      const riskAnalysis = await this.generateRiskAnalysis({
        nutrition: productInput.nutrition,
        ingredients: enrichedIngredients,
        processing_analysis: processingAnalysis,
      });

      return {
        product: productInput.product,
        nutrition: productInput.nutrition,
        ingredients: enrichedIngredients,
        processing_analysis: processingAnalysis,
        bonuses,
        risk_analysis: riskAnalysis,
      };
    } catch (error) {
      console.error("FOOD AI ENGINE ERROR:", error.message);
      throw error;
    }
  }

  parseJSON(content) {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error("INVALID JSON RESPONSE:", content);
      throw new Error("AI returned invalid JSON.");
    }
  }

  // ─── STEP 1: NORMALIZATION ───────────────────────────────────────────────────

  async normalizeIngredients(rawIngredients) {
    try {
      const prompt = `You are the Nigooda Ingredient Normalization Engine.

TASK: Normalize food ingredients.

RULES:
1. Convert to lowercase
2. Remove: punctuation, percentages, brackets, symbols
3. Resolve: spelling variations, aliases, INS codes, E-numbers
   Examples: E621→msg, INS322→lecithin, E150d→caramel color iv
4. Preserve ingredient order
5. Add aliases only if useful
6. DO NOT: assign categories, ratings, tags, risks, penalties

RETURN ONLY VALID JSON.

OUTPUT FORMAT:
{
  "ingredients": [
    { "normalized_name": "maltodextrin", "aliases": ["corn maltodextrin"] }
  ]
}

RAW INGREDIENTS:
${JSON.stringify(rawIngredients, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a strict ingredient normalization engine." },
          { role: "user", content: prompt },
        ],
      });

      const parsed = this.parseJSON(response.choices[0].message.content);
      return parsed.ingredients || [];
    } catch (error) {
      console.error("NORMALIZATION ERROR:", error.message);
      throw error;
    }
  }

  // ─── STEP 2: CATEGORY MAPPING ────────────────────────────────────────────────

  async mapIngredientCategories(normalizedIngredients) {
    try {
      const prompt = `You are the Nigooda Ingredient Category Mapping Engine.

TASK: Map ingredients into ingredient families.

AVAILABLE CATEGORIES:
additives | preservatives | sugars | oils | flavors | colors | stabilizers | extracts | animal | whole_ingredients

RULES:
1. One ingredient may belong to multiple categories
2. Preserve all previous fields
3. Add: "mapped_categories"
4. DO NOT: assign ratings, scores, tags, risks, penalties

RETURN ONLY VALID JSON.

OUTPUT FORMAT:
{
  "ingredients": [
    { "normalized_name": "maltodextrin", "aliases": ["corn maltodextrin"], "mapped_categories": ["sugars"] }
  ]
}

INGREDIENTS:
${JSON.stringify(normalizedIngredients, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a strict ingredient category mapping engine." },
          { role: "user", content: prompt },
        ],
      });

      const parsed = this.parseJSON(response.choices[0].message.content);
      return parsed.ingredients || [];
    } catch (error) {
      console.error("CATEGORY MAPPING ERROR:", error.message);
      throw error;
    }
  }

  // ─── STEP 3: INGREDIENT INTELLIGENCE ─────────────────────────────────────────

  async generateIngredientIntelligence(categorizedIngredients) {
    try {
      const prompt = `You are the Nigooda Ingredient Intelligence Engine.

TASK: Generate reusable ingredient intelligence objects.

SCHEMA RULES:
Required: normalized_name, categories, rating_reason, tags
Optional (preferred): aliases, penalty_triggers, processing_indicators, safety_risks, negative_traits, ultra_processed

CATEGORY RATING FORMAT:
"categories": { "sugars": 2 }
key = ingredient family | value = quality rating 1–5 (1=worst, 5=best)

RATING FACTORS: refinement, industrial processing, glycemic impact, additive severity, oil quality, whole food quality

UNKNOWN INGREDIENT: score=3, tag="unknown_ingredient"

CATEGORY RATING RULES:

ADDITIVES: 5=natural functional | 4=low-risk food-grade | 3=neutral | 2=synthetic mild concerns | 1=high-risk/controversial
PRESERVATIVES: 5=natural methods | 4=low-dose mild | 3=moderate | 2=synthetic sensitivity risk | 1=strong chemical
SUGARS: 5=whole-food sweeteners | 4=minimally refined | 3=traditional | 2=refined/starch-derived | 1=artificial sweeteners
OILS: 5=cold-pressed healthy | 4=good refined | 3=neutral refined | 2=high omega-6/industrial | 1=trans/hydrogenated
FLAVORS: 4=natural | 3=nature-identical | 2=artificial | 1=synthetic aroma chemicals
COLORS: 5=natural plant | 4=mineral-based safe | 3=caramel class I | 2=caramel III/IV | 1=synthetic petroleum dyes
STABILIZERS: 5=natural plant-based | 4=food-grade gums | 3=neutral synthetic | 2=controversial emulsifiers | 1=high-risk
EXTRACTS: 5=whole nutritional | 4=standard natural | 3=diluted/artificial
ANIMAL: 5-4=clean dairy | 3=processed dairy | 2=animal fat/gelatin | 1=highly processed derivatives
WHOLE INGREDIENTS:
  5=intact whole foods (whole oats, whole lentils, whole nuts)
  4=lightly processed (rolled oats, stone-ground grains)
  3=refined/structurally processed (rice meal, corn meal, refined cereal base)
  2=heavily refined starch matrices (extruded cereal solids, processed snack base)
  IMPORTANT: Never below 3 UNLESS processing context strongly reduces quality.

CONTEXTUAL DEGRADATION: If ingredient exists inside extruded/deep-fried/ultra-processed foods → reduce whole ingredient scores.
Examples: rice meal inside chips/snacks → 2–3 | whole grain oats → 5 | whole lentils → 5

TAGS: detection signals e.g. refined_sugar, ultra_processed, high_glycemic, fried_food_component, additive, refined_oil

PENALTY TRIGGERS (only directly relevant):
- multiple_sugar_candidate | ultra_processed_indicator | high_sugar_risk | refined_oil | trans_fat_source
- artificial_color | artificial_sweetener | additive_load_candidate | refined_carb_base | flavor_enhancer
Flavor enhancers (e627, e631, msg, disodium inosinate, disodium guanylate) → trigger: flavor_enhancer + additive_load_candidate + ultra_processed_indicator
Multiple additives/emulsifiers/flavor enhancers/processing acids → trigger: additive_load_candidate
Refined cereal in fried/extruded/ultra-processed foods → trigger: refined_carb_base

PROCESSING INDICATORS: oil_refining | extrusion | industrial_processing | deep_fried | milling

SAFETY RISKS (scientifically relevant only):
Valid groups: Children | Diabetes | Hypertension | Heart Health | Pregnancy | Kidney Disease | Weight Loss

NEGATIVE TRAITS: highly_refined | ultra_processed | fried_food_oil

ULTRA PROCESSED: boolean only

IMPORTANT RULES:
1. Preserve previous fields
2. Keep schema compact
3. If highly_processed OR ultra_processed OR multiple penalties → reduce positive emphasis; do NOT over-highlight tiny positives inside unhealthy products
4. Always include even if empty: "penalty_triggers": {} "processing_indicators": [] "safety_risks": {} "negative_traits": []

OUTPUT FORMAT:
{
  "ingredients": [
    {
      "normalized_name": "maltodextrin",
      "aliases": ["corn maltodextrin"],
      "mapped_categories": ["sugars"],
      "categories": { "sugars": 2 },
      "rating_reason": "Refined starch-derived carbohydrate with high glycemic impact",
      "tags": ["refined_sugar", "processed_carb", "high_glycemic", "ultra_processed"],
      "penalty_triggers": { "multiple_sugar_candidate": true, "ultra_processed_indicator": true },
      "processing_indicators": ["industrial_processing"],
      "safety_risks": { "Diabetes": ["High glycemic refined carbohydrate"] },
      "negative_traits": ["highly_refined", "ultra_processed"],
      "ultra_processed": true
    }
  ]
}

INGREDIENTS:
${JSON.stringify(categorizedIngredients, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a strict reusable ingredient intelligence engine.Return ONLY valid JSON." },
          { role: "user", content: prompt },
        ],
      });

      const parsed = this.parseJSON(response.choices[0].message.content);
      return parsed.ingredients || [];
    } catch (error) {
      console.error("INGREDIENT INTELLIGENCE ERROR:", error.message);
      throw error;
    }
  }

  // ─── STEP 4: PROCESSING ANALYSIS ─────────────────────────────────────────────

  async analyzeProcessing(productData) {
    try {
      const prompt = `You are the Nigooda Processing Analysis Engine.

TASK: Generate product-level processing analysis.

Detect: deep_fried | extruded_fried_snack | refined_oil_frying | industrial_processing | moderately_processed
Generate: processing level + processing types
DO NOT calculate penalties.

RETURN ONLY VALID JSON.

OUTPUT FORMAT:
{
  "level": "highly_processed",
  "types": ["extruded_fried_snack", "deep_fried", "refined_oil_frying"]
}

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a strict processing analysis engine." },
          { role: "user", content: prompt },
        ],
      });

      return this.parseJSON(response.choices[0].message.content);
    } catch (error) {
      console.error("PROCESSING ANALYSIS ERROR:", error.message);
      throw error;
    }
  }

  // ─── STEP 5: BONUS DETECTION ──────────────────────────────────────────────────

  async detectBonuses(productData) {
    try {
      const prompt = `You are the Nigooda Bonus Detection Engine.

TASK: Detect meaningful natural positive factors.

VALID BONUS TYPES:
natural_spices | whole_seeds | fermented_ingredients | whole_foods | low_ingredient_complexity | no_additives | no_added_sugars

RULES:
1. ONLY meaningful positives
2. DO NOT calculate bonus values
3. Return ONLY valid JSON

OUTPUT FORMAT:
{
  "bonuses": [{ "type": "natural_spices" }]
}

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a strict food bonus engine." },
          { role: "user", content: prompt },
        ],
      });

      const parsed = this.parseJSON(response.choices[0].message.content);
      return parsed.bonuses || [];
    } catch (error) {
      console.error("BONUS DETECTION ERROR:", error.message);
      throw error;
    }
  }

  // ─── STEP 6: RISK ANALYSIS ────────────────────────────────────────────────────

  async generateRiskAnalysis(productData) {
    try {
      const prompt = `You are the Nigooda Risk Analysis Engine.

TASK: Generate product-wide risk analysis.

Generate: quality_concerns | critical_alerts | allergens | safety_risks

RETURN ONLY VALID JSON.

OUTPUT FORMAT:
{
  "quality_concerns": [],
  "critical_alerts": [],
  "allergens": [],
  "safety_risks": {}
}

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.1,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a strict food risk analysis engine." },
          { role: "user", content: prompt },
        ],
      });

      return this.parseJSON(response.choices[0].message.content);
    } catch (error) {
      console.error("RISK ANALYSIS ERROR:", error.message);
      throw error;
    }
  }
}

module.exports = new FoodAI();
