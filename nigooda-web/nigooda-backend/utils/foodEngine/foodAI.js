const openai =
  require("../../ai/openaiClient");

/*
===========================================================
NIGOODA FOOD AI ENGINE
===========================================================

AI RESPONSIBILITIES ONLY

1. Ingredient Normalization
2. Ingredient Category Mapping
3. Ingredient Rating Intelligence
4. Processing Detection
5. Bonus Detection
6. Risk Analysis

===========================================================

THIS FILE DOES:
- semantic intelligence
- ingredient understanding
- category classification
- ingredient quality analysis
- processing intelligence
- risk intelligence

THIS FILE DOES NOT:
- positional weights
- weighted averages
- category boost calculations
- deterministic penalties
- final score calculations
- mathematical formulas
- key ingredient extraction
- product insights generation

===========================================================
*/

class FoodAI {
  /*
  ===========================================================
  MAIN EXECUTION PIPELINE
  ===========================================================
  */

  async run(productInput) {
    try {
      /*
      =======================================================
      STEP 1 — NORMALIZATION
      GPT-4o-mini
      =======================================================
      */

      const normalizedIngredients =
        await this.normalizeIngredients(
          productInput.ingredients
        );

      /*
      =======================================================
      STEP 2 — CATEGORY MAPPING
      GPT-4o-mini
      =======================================================
      */

      const categorizedIngredients =
        await this.mapIngredientCategories(
          normalizedIngredients
        );

      /*
      =======================================================
      STEP 3 — INGREDIENT RATING INTELLIGENCE
      GPT-4o
      =======================================================
      */

      const enrichedIngredients =
        await this.generateIngredientIntelligence(
          categorizedIngredients
        );

      /*
      =======================================================
      STEP 4 — PROCESSING ANALYSIS
      GPT-4o-mini
      =======================================================
      */

      const processingAnalysis =
        await this.analyzeProcessing({
          product: productInput.product,
          nutrition: productInput.nutrition,
          ingredients: enrichedIngredients,
        });

      /*
      =======================================================
      STEP 5 — BONUS DETECTION
      GPT-4o-mini
      =======================================================
      */

      const bonuses =
        await this.detectBonuses({
          product: productInput.product,
          ingredients: enrichedIngredients,
        });

      /*
      =======================================================
      STEP 6 — RISK ANALYSIS
      GPT-4o-mini
      =======================================================
      */

      const riskAnalysis =
        await this.generateRiskAnalysis({
          nutrition: productInput.nutrition,
          ingredients: enrichedIngredients,
          processing_analysis:
            processingAnalysis,
        });

      /*
      =======================================================
      FINAL AI OUTPUT
      =======================================================

      Deterministic engine later adds:
      - positions
      - positional weights
      - weighted category scores
      - penalties
      - bonus values
      - final rating
      - key ingredients
      - insights

      =======================================================
      */

      return {
        product: productInput.product,

        nutrition: productInput.nutrition,

        ingredients: enrichedIngredients,

        processing_analysis:
          processingAnalysis,

        bonuses,

        risk_analysis: riskAnalysis,
      };
    } catch (error) {
      console.error(
        "FOOD AI ENGINE ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  SAFE JSON PARSER
  ===========================================================
  */

  parseJSON(content) {
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error(
        "INVALID JSON RESPONSE:"
      );

      console.error(content);

      throw new Error(
        "AI returned invalid JSON."
      );
    }
  }

  /*
  ===========================================================
  STEP 1 — INGREDIENT NORMALIZATION
  GPT-4o-mini
  ===========================================================

  ONLY:
  - cleanup
  - alias resolution
  - INS decoding
  - E-number decoding
  - normalization

  ===========================================================
  */

  async normalizeIngredients(rawIngredients) {
    try {
      const prompt = `
You are the Nigooda Ingredient Normalization Engine.

TASK:
Normalize food ingredients.

RULES:

1. Convert all ingredients to lowercase.

2. Remove:
- punctuation
- percentages
- brackets
- unnecessary symbols

3. Resolve:
- spelling variations
- aliases
- INS codes
- E-numbers

EXAMPLES:

E621 -> msg
INS322 -> lecithin
E150d -> caramel color iv

4. Preserve ingredient order.

5. Add aliases only if useful.

6. DO NOT:
- assign categories
- assign ratings
- generate tags
- generate risks
- calculate penalties
- generate intelligence

RETURN ONLY VALID JSON.

OUTPUT FORMAT:

{
  "ingredients": [
    {
      "normalized_name": "maltodextrin",

      "aliases": [
        "corn maltodextrin"
      ]
    }
  ]
}

RAW INGREDIENTS:
${JSON.stringify(rawIngredients, null, 2)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o-mini",

          temperature: 0.1,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You are a strict ingredient normalization engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const parsed =
        this.parseJSON(
          response.choices[0].message.content
        );

      return parsed.ingredients || [];
    } catch (error) {
      console.error(
        "NORMALIZATION ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  STEP 2 — CATEGORY MAPPING
  GPT-4o-mini
  ===========================================================

  ONLY:
  - ingredient family classification

  ===========================================================
  */

  async mapIngredientCategories(
    normalizedIngredients
  ) {
    try {
      const prompt = `
You are the Nigooda Ingredient Category Mapping Engine.

TASK:
Map ingredients into ingredient families.

AVAILABLE CATEGORIES:

- additives
- preservatives
- sugars
- oils
- flavors
- colors
- stabilizers
- extracts
- animal
- whole_ingredients

RULES:

1. One ingredient may belong to multiple categories.

2. Preserve all previous fields.

3. Add:
"mapped_categories"

4. DO NOT:
- assign ratings
- assign scores
- generate tags
- generate risks
- generate penalties
- generate intelligence

RETURN ONLY VALID JSON.

OUTPUT FORMAT:

{
  "ingredients": [
    {
      "normalized_name": "maltodextrin",

      "aliases": [
        "corn maltodextrin"
      ],

      "mapped_categories": [
        "sugars"
      ]
    }
  ]
}

INGREDIENTS:
${JSON.stringify(
  normalizedIngredients,
  null,
  2
)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o-mini",

          temperature: 0.1,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You are a strict ingredient category mapping engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const parsed =
        this.parseJSON(
          response.choices[0].message.content
        );

      return parsed.ingredients || [];
    } catch (error) {
      console.error(
        "CATEGORY MAPPING ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  STEP 3 — INGREDIENT RATING INTELLIGENCE
  GPT-4o
  ===========================================================

  THIS IS THE HEART OF THE ENGINE

  ===========================================================
  */

  async generateIngredientIntelligence(
    categorizedIngredients
  ) {
    try {
      const prompt = `
You are the Nigooda Ingredient Intelligence Engine.

TASK:
Generate reusable ingredient intelligence objects.

==================================================

CORE SCHEMA RULES

Required:
- normalized_name
- categories
- rating_reason
- tags

Optional but preferred:
- aliases
- penalty_triggers
- processing_indicators
- safety_risks
- negative_traits
- ultra_processed

==================================================

CATEGORY RULES

Format:

"categories": {
  "sugars": 2
}

RULES:
- key = ingredient family
- value = ingredient quality rating (1–5)

==================================================

RATING LOGIC

1 = worst
5 = best

Factors:
- refinement
- industrial processing
- glycemic impact
- additive severity
- oil quality
- artificial processing
- whole food quality

==================================================

UNKNOWN INGREDIENT RULE

If ingredient is unknown:

- assign default score = 3
- add tag:
"unknown_ingredient"

==================================================

CATEGORY-WISE RATING RULES

4.1 ADDITIVES
5 = natural functional additives
4 = low-risk food-grade additives
3 = neutral additives
2 = synthetic additives with mild concerns
1 = high-risk controversial additives

4.2 PRESERVATIVES
5 = natural preservation methods
4 = low-dose mild preservatives
3 = moderate preservatives
2 = synthetic preservatives
1 = strong chemical preservatives

4.3 SUGARS
5 = whole-food sweeteners
4 = minimally refined sugars
3 = traditional sugars
2 = refined sugars / maltodextrin
1 = artificial sweeteners

4.4 OILS
5 = cold-pressed healthy fats
4 = good refined oils
3 = neutral oils
2 = industrial refined oils
1 = trans fats / hydrogenated fats

4.5 FLAVORS
4 = natural flavoring substances
3 = nature-identical flavors
2 = artificial flavors
1 = synthetic aroma chemicals

4.6 COLORS
5 = natural plant colors
4 = mineral-based safe colors
3 = caramel class I
2 = caramel III / IV
1 = artificial dyes

4.7 STABILIZERS
5 = natural stabilizers
4 = food-grade gums
3 = neutral synthetic stabilizers
2 = controversial emulsifiers
1 = high-risk emulsifiers

4.8 EXTRACTS
5 = whole nutritional extracts
4 = standard natural extracts
3 = diluted/artificial extracts

4.9 ANIMAL
5-4 = clean dairy
3 = processed dairy
2 = animal fat/gelatin
1 = highly processed derivatives

4.10 WHOLE INGREDIENTS

5 = intact whole foods
Examples:
whole oats
whole lentils
whole nuts

4 = lightly processed whole ingredients
Examples:
rolled oats
stone-ground grains

3 = refined or structurally processed ingredients
Examples:
rice meal
corn meal
refined cereal base

2 = heavily refined starch matrices
Examples:
extruded cereal solids
processed snack base

IMPORTANT:

Whole Ingredients can NEVER go below 3
UNLESS processing context strongly reduces ingredient quality.

CONTEXTUAL DEGRADATION RULE:

If ingredient exists primarily inside:
- extruded snacks
- deep fried snacks
- ultra-processed foods
- refined snack matrices

Then:
reduce whole ingredient scores.

Examples:

rice meal inside chips/snacks:
2–3

corn meal inside extruded snacks:
2–3

whole grain oats:
5

whole lentils:
5

==================================================

TAGS RULES

Tags are detection signals.

Examples:
- refined_sugar
- ultra_processed
- high_glycemic
- fried_food_component
- additive
- preservative
- refined_oil

==================================================

PENALTY TRIGGER RULES

ONLY include triggers directly relevant
to that ingredient.

VALID TRIGGERS:

- multiple_sugar_candidate
- ultra_processed_indicator
- high_sugar_risk
- refined_oil
- trans_fat_source
- artificial_color
- artificial_sweetener
- additive_load_candidate
- refined_carb_base
- flavor_enhancer
Flavor enhancers like:
- e627
- e631
- msg
- disodium inosinate
- disodium guanylate

SHOULD trigger:
- flavor_enhancer
- additive_load_candidate
- ultra_processed_indicator
If product contains:
- multiple additives
- multiple emulsifiers
- multiple flavor enhancers
- multiple processing acids

Then:
trigger:
"additive_load_candidate"
Refined cereal ingredients used in:
- fried snacks
- extruded snacks
- ultra-processed foods

SHOULD trigger:
"refined_carb_base"
==================================================

PROCESSING INDICATORS

Examples:
- oil_refining
- extrusion
- industrial_processing
- deep_fried
- milling

==================================================

SAFETY RISKS

ONLY scientifically relevant risks.

VALID GROUPS:
- Children
- Diabetes
- Hypertension
- Heart Health
- Pregnancy
- Kidney Disease
- Weight Loss

==================================================

NEGATIVE TRAITS

Examples:
- highly_refined
- ultra_processed
- fried_food_oil

==================================================

ULTRA PROCESSED RULE

Boolean only.

"ultra_processed": true

==================================================

IMPORTANT RULES

1. Preserve previous fields.

2. Keep schema compact.

3. Avoid:
- duplicate category analysis
- confidence scores
- timestamps
- verbose explanations
4)If:
- highly_processed
OR
- ultra_processed
OR
- multiple penalties exist

Then:
reduce positive emphasis.

Do NOT over-highlight tiny positives
inside unhealthy products.

5). Return ONLY valid JSON.

OUTPUT FORMAT:

{
  "ingredients": [
    {
      "normalized_name": "maltodextrin",

      "aliases": [
        "corn maltodextrin"
      ],

      "mapped_categories": [
        "Sugars"
      ],

      "categories": {
        "sugars": 2
      },

      "rating_reason":
        "Refined starch-derived carbohydrate with high glycemic impact",

      "tags": [
        "refined_sugar",
        "processed_carb",
        "high_glycemic",
        "ultra_processed"
      ],

      "penalty_triggers": {
        "multiple_sugar_candidate": true,
        "ultra_processed_indicator": true
      },

      "processing_indicators": [
        "industrial_processing"
      ],

      "safety_risks": {
        "Diabetes": [
          "High glycemic refined carbohydrate"
        ]
      },

      "negative_traits": [
        "highly_refined",
        "ultra_processed"
      ],

      "ultra_processed": true
    }
  ]
}
  Always include these fields even if empty:

"penalty_triggers": {}
"processing_indicators": []
"safety_risks": {}
"negative_traits": []

INGREDIENTS:
${JSON.stringify(
  categorizedIngredients,
  null,
  2
)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o",

          temperature: 0.1,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You are a strict reusable ingredient intelligence engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const parsed =
        this.parseJSON(
          response.choices[0].message.content
        );

      return parsed.ingredients || [];
    } catch (error) {
      console.error(
        "INGREDIENT INTELLIGENCE ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  STEP 4 — PROCESSING ANALYSIS
  GPT-4o-mini
  ===========================================================
  */

  async analyzeProcessing(productData) {
    try {
      const prompt = `
You are the Nigooda Processing Analysis Engine.

TASK:
Generate product-level processing analysis.

RULES:

Detect:
- deep_fried
- extruded_fried_snack
- refined_oil_frying
- industrial_processing
- moderately_processed

Generate:
- processing level
- processing types

DO NOT calculate penalties.

RETURN ONLY VALID JSON.

OUTPUT FORMAT:

{
  "level": "highly_processed",

  "types": [
    "extruded_fried_snack",
    "deep_fried",
    "refined_oil_frying"
  ]
}

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o-mini",

          temperature: 0.1,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You are a strict processing analysis engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return this.parseJSON(
        response.choices[0].message.content
      );
    } catch (error) {
      console.error(
        "PROCESSING ANALYSIS ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  STEP 5 — BONUS DETECTION
  GPT-4o-mini
  ===========================================================
  */

  async detectBonuses(productData) {
    try {
      const prompt = `
You are the Nigooda Bonus Detection Engine.

TASK:
Detect meaningful natural positive factors.

VALID BONUS TYPES:

- natural_spices
- whole_seeds
- fermented_ingredients
- whole_foods
- low_ingredient_complexity
- no_additives
- no_added_sugars

RULES:

1. ONLY meaningful positives.

2. DO NOT calculate bonus values.

3. Return ONLY valid JSON.

OUTPUT FORMAT:

{
  "bonuses": [
    {
      "type": "natural_spices"
    }
  ]
}

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o-mini",

          temperature: 0.1,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You are a strict food bonus engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const parsed =
        this.parseJSON(
          response.choices[0].message.content
        );

      return parsed.bonuses || [];
    } catch (error) {
      console.error(
        "BONUS DETECTION ERROR:",
        error.message
      );

      throw error;
    }
  }

  /*
  ===========================================================
  STEP 6 — RISK ANALYSIS
  GPT-4o-mini
  ===========================================================
  */

  async generateRiskAnalysis(productData) {
    try {
      const prompt = `
You are the Nigooda Risk Analysis Engine.

TASK:
Generate product-wide risk analysis.

Generate:
- quality_concerns
- critical_alerts
- allergens
- safety_risks

RETURN ONLY VALID JSON.

OUTPUT FORMAT:

{
  "quality_concerns": [],
  "critical_alerts": [],
  "allergens": [],
  "safety_risks": {}
}

PRODUCT DATA:
${JSON.stringify(productData, null, 2)}
`;

      const response =
        await openai.chat.completions.create({
          model: "gpt-4o-mini",

          temperature: 0.1,

          response_format: {
            type: "json_object",
          },

          messages: [
            {
              role: "system",
              content:
                "You are a strict food risk analysis engine.",
            },

            {
              role: "user",
              content: prompt,
            },
          ],
        });

      return this.parseJSON(
        response.choices[0].message.content
      );
    } catch (error) {
      console.error(
        "RISK ANALYSIS ERROR:",
        error.message
      );

      throw error;
    }
  }
}

module.exports = new FoodAI();

