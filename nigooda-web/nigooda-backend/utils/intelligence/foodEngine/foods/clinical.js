
const openai = require("../../../../ai/openaiClient");
class ClinicalEngine {

  async run(data) {

    try {

      const ingredients =
        Array.isArray(data)
          ? data
          : (data.ingredients || []);

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        product_type:
          "FOOD",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "FOOD ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

NIGOODA MASTER FOOD INGREDIENT RATING ALGORITHM — VERSION 2.1
PART I — SYSTEM OBJECTIVE
Core Mission
Rate any food product's ingredient quality on a 1.0–5.0 scale that reflects the honest, formulation-based equivalent of food science: what will this product do to a person's internal biology under regular, real-world consumption?
Reward Criteria
Score high ONLY when formulations demonstrate:
Whole, minimally processed ingredients as the dominant composition
Absence of synthetic additives with known mechanistic concerns
Clean fat quality (balanced omega profile, low oxidation risk)
No sugar manipulation or multi-sugar splitting deception
Honest ingredient representation without marketing inflation
Absence of industrial ultra-processing indicators
Reasonable sodium burden
Safe preservation methods
Penalize Without Compromise
Apply mandatory reductions when formulations include:
Trans fats or hydrogenated/partially hydrogenated fats
Artificial petroleum-derived colorants
High fructose corn syrup or glucose-fructose syrup
Artificial sweeteners (aspartame, saccharin, acesulfame-K, sucralose)
Synthetic antioxidants (BHA, BHT, TBHQ)
Deep frying or extrusion-frying processing
Industrial ultra-processed ingredient patterns
Multiple sugar sources (sugar splitting)
Excess synthetic additive load
Refined flour/starch as primary base
Non-Negotiable Scoring Rules
Marketing language, brand positioning, and "natural" claims do NOT influence scores
Industrial ultra-processing patterns MUST reduce scores regardless of individual ingredient appearances
"Natural" products using poor fats or refined bases are NOT exempt from penalties
Luxury or premium positioning carries zero scoring weight
A product with clean ingredients but deep-fried processing cannot score elite
Sugar splitting (multiple sugar forms) MUST be detected and penalized
Synthetic colors in any product MUST trigger penalty regardless of product category

PART II — AI ENGINE SPECIFICATION
AI Role in This Algorithm
The AI reasoning engine replaces all static lookup tables with evidence-based contextual judgment. The AI does not invent scores — it applies scientific frameworks to each ingredient and the product as a whole.
AI Judging Principles
Principle 1 — Ingredient Origin and Processing Degree Rate ingredients by how far they are from their natural state. Whole fruits = 5.0. Fruit puree = 4.5. Fruit concentrate = 3.5. Fruit flavor = 2.0. Artificial fruit flavor = 1.0. The further from origin, the lower the score.
Principle 2 — Mechanistic Evidence, Not Regulatory Status "GRAS" or "approved" status does not equal high score. Rate based on peer-reviewed mechanistic evidence of concern (IARC classifications, WHO guidance, EFSA opinions, NEJM/Lancet studies). Regulatory approval is a floor, not a ceiling.
Principle 3 — Positional Context An ingredient appearing first in the list is present in the greatest quantity. Its quality score carries proportionally more weight. The AI adjusts weighting based on position context — top-position ingredients with less favorable profiles are more impactful than late-list ones; top-position quality ingredients are more beneficial than late-list ones.
Principle 4 — Category Interaction Ingredients do not exist in isolation. The AI evaluates how categories interact: a product with a clean oil but multiple sugar sources is weaker than its oil score alone suggests. A split quality profile must be reflected in the final score.
Principle 5 — Functional Role Honesty Every ingredient has a functional reason for being present. If the AI identifies decorative, sensory-manipulation, or marketing-driven ingredients with no nutritional function, this reduces Formulation Honesty score.
Principle 6 — Cumulative Consumption Context Foods are consumed daily or repeatedly. Unlike a one-time exposure, repeated consumption of mildly concerning ingredients produces cumulative metabolic burden. AI scoring reflects this chronic exposure model.

PART III — INGREDIENT ANALYSIS FRAMEWORK
Step 1 — Normalization
AI resolves all ingredient names to canonical forms:
E-numbers → full names (E621 → monosodium glutamate)
INS codes → full names (INS322 → lecithin)
Trade names → scientific names (Acesulfame-K → acesulfame potassium)
Synonyms → canonical (glucose-fructose syrup → high fructose corn syrup)
Unknown/unresolvable → flagged as "Unknown Ingredient," scored 3.0, marked for review
Step 2 — Category Assignment
AI assigns each ingredient to one or more of the following categories. Multi-category assignment is permitted (e.g., salt = Preservatives + Additives).
ID
Category
Scope
C1
Additives
Functional chemicals: preservatives, texture agents, flavor enhancers, shelf-life extenders
C2
Preservatives
Antimicrobial/antioxidant substances preventing spoilage
C3
Sugars & Sweeteners
All caloric and non-caloric sweetening agents
C4
Oils & Fats
All fat sources: vegetable, animal, refined, cold-pressed
C5
Flavors
Natural and artificial flavoring substances
C6
Colors
All colorants: plant-derived, mineral, synthetic
C7
Stabilizers / Emulsifiers
Gums, emulsifiers, thickeners, texture modifiers
C8
Extracts
Plant, food, or biological concentrates
C9
Animal-Based
Dairy, meat, egg, or other animal-derived ingredients
C10
Natural Whole Ingredients
Whole or minimally processed foods in recognizable form

Step 3 — AI Ingredient Scoring (1.0–5.0)
Score 5.0 — Optimal Whole, unrefined, nutritionally intact. Minimal or no industrial transformation. Strong positive or neutral metabolic profile. Examples: whole oats, extra virgin olive oil, turmeric, fresh milk, raw honey, legumes, whole spices, nuts, seeds.
Score 4.0–4.9 — Good Minimally processed. Nutritional value largely retained. Clean production method. Minor industrial transformation acceptable. Examples: rolled oats, stone-ground flour, cold-pressed oils (not EVOO), natural vanilla extract, full-fat yogurt, dried fruits (no additives).
Score 3.0–3.9 — Acceptable Moderately processed. Nutritional compromise but no strong evidence of active concern. Functional necessity acceptable. Examples: refined wheat flour, corn starch, modified starch (non-GMO context), caramel color Class I, xanthan gum, whey isolate, brown sugar.
Score 2.0–2.9 — Concerning Significant processing. Evidence of mild-to-moderate metabolic concern under regular consumption. Examples: white sugar, palmolein oil, glucose syrup, soybean oil (high omega-6 in high-heat context), sodium benzoate, caramel color IV, polysorbate 80, dextrose, maltodextrin.
Score 1.0–1.9 — Less Favorable Strong mechanistic evidence of nutritional or safety concern. IARC carcinogen classifications, WHO-mandated elimination, or significant regulatory concern. Examples: partially hydrogenated vegetable oil, HFCS, aspartame, tartrazine, sunset yellow, BHA, BHT, TBHQ, sodium nitrite, vanaspati.
AI Scoring Anchors — Scientific Framework
Scientific Signal
Score Impact
IARC Group 1 carcinogen
Hard floor: 1.0
IARC Group 2A probable carcinogen
Score ≤ 1.5
IARC Group 2B possible carcinogen
Score ≤ 2.0
WHO mandated elimination (trans fats)
Hard floor: 1.0
EU mandatory warning label
Score ≤ 2.0
EFSA re-evaluation with concern
Score ≤ 2.5
Gut microbiome disruption evidence (human studies)
Score ≤ 2.5
High glycemic index (GI > 70) without fiber mitigation
Score ≤ 2.5
Omega-6:Omega-3 ratio > 10:1 in high-heat cooking oil
Score ≤ 2.5
GRAS status, no mechanistic concern evidence
Score 3.0–3.5 baseline
Bioactive nutritional benefit documented
Score 4.0+ eligible
Whole food, unrefined
Score 4.5–5.0 eligible

Step 4 — Category Score Computation (AI-Judged)
Rather than a mechanical positional average, the AI computes each category score holistically:
Considers the full set of ingredients in the category
Weights earlier-listed ingredients as more impactful (larger quantity)
Accounts for ingredient interactions within the category
Reflects the overall quality character of the category, not just arithmetic mean
Outputs a single category score (1.0–5.0) with reasoning
Step 5 — Weighted Category Score (AI-Computed)
Category
Importance Weight
Rationale
C1 Additives
1.40
Strong evidence linking synthetic additives to health concerns
C2 Preservatives
1.30
Direct toxicity potential; antimicrobial chemical burden
C3 Sugars & Sweeteners
1.30
Leading diet risk factor: metabolic disease, obesity, glycation
C4 Oils & Fats
1.20
Inflammatory cascade risk; CVD association from poor oil quality
C5 Flavors
1.20
Mask poor base quality; reformulation signal
C6 Colors
1.30
Neurodevelopmental concerns; 4-MEI association
C7 Stabilizers / Emulsifiers
1.10
Emerging gut microbiome evidence
C8 Extracts
1.00
Generally positive; low direct concern
C9 Animal-Based
1.00
Neutral; quality-dependent
C10 Natural Whole Ingredients
0.90
Base food quality; beneficial anchor

Positional Category Boost (AI-Applied): If one or more ingredients from a category appear in the first quarter of the ingredient list, the category weight is amplified (up to 35% boost maximum). AI determines whether this boost applies based on identified position.
Weighted Ingredient Score Formula:
Weighted Ingredient Score = Σ(Category Score × Boosted Category Weight) ÷ Σ(Boosted Weights)

Only categories with at least one ingredient are included.

PART III-B — POSITION-BASED NUTRITIONAL CONTRIBUTION SYSTEM (New in v2.1)
Core Principle
Ingredient presence ≠ meaningful nutritional contribution. The engine must distinguish between dominant nutritional contributors and trace-level marketing ingredients.
Contribution Logic
If ingredient percentages are disclosed: → Use percentage-aware reasoning as the primary method for contribution strength estimation, formulation honesty analysis, and hero ingredient inflation detection.
If percentages are unavailable: → Fall back to ingredient-position inference using the following positional tiers:
Position in List
Nutritional Role Label
Top 25%
Major nutritional contributor
25–50%
Supporting contributor
50–75%
Limited contributor
Bottom 25%
Trace / minor contributor

Engine Rules
A fruit powder, spice, or herb appearing in the bottom 25% of the ingredient list MUST NOT be treated as a meaningful nutritional source — it is a trace-level marketing ingredient.
"Hero ingredient" claims on packaging must be cross-referenced with actual ingredient position. Late-list hero ingredients trigger a Formulation Honesty reduction.
Never estimate exact nutrient quantities unless officially disclosed on the label.
Allowed Contribution Phrasing
"Primary nutritional contributor"
"Supporting contributor"
"Limited contribution likely"
"Trace-level presence — nutritional impact minimal"

PART IV — PENALTY SYSTEM
Penalties apply after the Weighted Ingredient Score is computed. AI identifies which penalty types apply. Penalty magnitudes are defined ranges — not fixed exact numbers — that AI applies based on severity and context. Progressive decay prevents extreme floor-clamping.
Penalty Application Order (Fixed — must follow this sequence)
1. Critical Ingredient Penalties
2. Processing Method Penalties
3. Multiple Sugars Penalty
4. High Sodium Penalty
5. Refined Flour / Starch Base Penalty
6. Excess Additive Load Penalty
7. Industrial Ultra-Processing Pattern Penalty
8. Sugar-First Ingredient Penalty

Progressive Decay Multipliers
Penalty #1 × 1.00
Penalty #2 × 0.90
Penalty #3 × 0.80
Penalty #4 × 0.70
Penalty #5 × 0.60
Penalty #6 × 0.50
Penalty #7+ × 0.50

Penalty Category 1 — Critical Ingredient Penalties
Triggered by the presence of specific high-evidence-concern ingredients. AI identifies these from the normalized ingredient list.
Penalty Type
Trigger Ingredients
Severity Range
Scientific Basis
Trans fats
Hydrogenated oil, partially hydrogenated oil, vanaspati, interesterified fats
Severe (−1.0 to −1.2)
WHO mandated global elimination; associated with cardiovascular mortality
Synthetic antioxidants
BHA, BHT, TBHQ
High (−0.7 to −0.9)
Endocrine disruption concerns; carcinogenicity signals (NTP studies)
Artificial synthetic dyes
Tartrazine, Sunset Yellow, Allura Red, Brilliant Blue, Ponceau 4R, and all petroleum-derived dyes
Moderate-High (−0.6 to −0.8)
Associated with hyperactivity in children (McCann 2007, Lancet); EU mandatory warning labels
High fructose corn syrup
HFCS, glucose-fructose syrup
Moderate-High (−0.5 to −0.7)
Associated with hepatic lipogenesis and visceral fat accumulation
Artificial sweeteners
Aspartame, saccharin, acesulfame potassium, sucralose, cyclamate
Moderate (−0.5 to −0.7)
Gut microbiome disruption evidence; IARC 2B classification (aspartame)
Nitrates/Nitrites
Sodium nitrite, potassium nitrate
High (−0.7 to −0.9)
N-nitrosamine formation; IARC Group 2A association

Positional scaling: Penalties are amplified when the critical ingredient appears early in the ingredient list (larger quantity) and moderated when late in the list. AI applies scaling based on position context, capped at 1.25× amplification.
Penalty Category 2 — Processing Method Penalties
AI infers cooking and manufacturing methods from product type, ingredient patterns, and product name.
Processing Type
Examples
Severity Range
Scientific Basis
Deep frying
Chips, fried snacks, fried chicken
High (−0.7 to −0.9)
Acrylamide formation (IARC 2A); oxidized aldehydes at high heat
Extrusion + frying
Extruded fried snacks (Kurkure, Cheetos-type)
High (−0.8 to −1.0)
Compounded extrusion + frying concerns; acrylamide + AGE formation
Refined oil frying
Palmolein/soybean/corn oil in any frying context
Moderate (−0.2 to −0.4)
Oxidation products, aldehydes, AGEs at high heat — evaluated contextually per oil type
Industrial baking
Biscuits, crackers, industrial bread
Mild-Moderate (−0.2 to −0.4)
Nutrient loss; additive dependency; acrylamide risk at high temperature
High-heat extrusion (no frying)
Puffed snacks, breakfast cereals
Mild (−0.1 to −0.3)
Maillard reaction; protein quality reduction; heat-labile nutrient loss
Minimal/cold processing
Cold-pressed oils, fermented products, raw mixes
None
Nutritional integrity preserved

Penalty Category 3 — Multiple Sugars Penalty
Scientific Basis: Sugar splitting — listing multiple sugar forms separately so no single sugar appears prominently — is a documented deceptive labeling practice. The AI identifies when two or more ingredients belong to C3 Sugars & Sweeteners.
Detection: AI counts all C3 ingredients in the normalized ingredient list.
Severity:
Two sugar sources detected: Mild penalty (−0.3 to −0.5)
Three or more sugar sources, especially in top half of list: Moderate penalty (−0.5 to −0.7)
Maximum cap on this penalty type: −0.7
Penalty Category 4 — High Sodium Penalty
Scientific Basis: AHA recommends <2,300 mg sodium/day. WHO target <2,000 mg/day. Excess sodium is associated with significant global cardiovascular mortality.
Detection: AI identifies sodium-contributing ingredients: salt, sodium chloride, sodium bicarbonate, sodium phosphate, any "sodium" compound.
Severity based on position:
Top 25% of list: Moderate penalty (−0.3 to −0.5)
25–50% position: Mild-moderate penalty (−0.2 to −0.35)
50–75% position: Mild penalty (−0.1 to −0.25)
Bottom 25%: Minimal penalty (−0.05 to −0.15)
Penalty Category 5 — Refined Flour / Starch Base Penalty
Scientific Basis: Refined starches stripped of fiber, vitamins, and minerals during milling. High GI/GL associated with insulin resistance concerns. GI of refined flour approaches 70–90; white rice flour ~85.
Detection: AI identifies refined starch bases: refined wheat flour (maida), corn starch, potato starch, tapioca starch, modified starch, refined rice flour, white rice flour.
Severity based on position:
Top 25%: Moderate-High (−0.4 to −0.6)
25–50%: Moderate (−0.3 to −0.5)
50–75%: Mild-Moderate (−0.2 to −0.35)
Bottom 25%: Mild (−0.1 to −0.2)
Penalty Category 6 — Excess Additive Load Penalty
Scientific Basis: Cumulative exposure to multiple food additives may produce synergistic effects beyond any individual additive's NOAEL. The "cocktail effect" is an active food safety research area.
Detection: AI counts and weighs all C1 Additive ingredients, considering their positions.
Severity:
Moderate additive load (3–4 additives in notable positions): Mild penalty (−0.2 to −0.4)
High additive load (5+ additives, especially in top half): Moderate penalty (−0.4 to −0.6)
Penalty Category 7 — Industrial Ultra-Processing Pattern Penalty (formerly "Ultra-Processed Pattern Penalty")
Scientific Basis: Industrial ultra-processing patterns (internally evaluated per NOVA Group 4 framework — not referenced in output) are associated with obesity, type 2 diabetes, cardiovascular concerns, and all-cause mortality in large-scale observational studies.
AI Detection — Industrial Processing Signal Ingredients:
Artificial flavors and flavor enhancers (MSG, yeast extract, disodium inosinate/guanylate)
Modified starch (all forms)
Synthetic emulsifiers and stabilizers
Refined vegetable oils in processed context
Artificial sweeteners
Maltodextrin
Hydrolyzed proteins
Interesterified fats
Dextrose / glucose powder
Caramel color (especially Class III/IV)
AI evaluates the pattern of these ingredients together holistically, not just individual counts.
Severity:
Mild pattern (2–3 indicators): Mild penalty (−0.2 to −0.3)
Moderate pattern (4–5 indicators): Moderate penalty (−0.4 to −0.6)
Strong pattern (6+ indicators or dominant industrial architecture): High penalty (−0.6 to −0.9)
Output language for this penalty: Use "industrially formulated structure," "processing-heavy composition," "higher additive reliance," or "highly refined formulation" — never "ultra-processed" or "NOVA Group 4."
Penalty Category 8 — Sugar-First Ingredient Penalty
Scientific Basis: If sugar is listed first, it is the single largest ingredient by weight — a nutritionally less balanced formulation where sweetener outweighs all other components.
Detection: First ingredient in normalized list is any sugar source (sugar, glucose syrup, dextrose, corn syrup, invert sugar, HFCS, fructose, any sweetener).
Severity: Moderate-High flat penalty (−0.5 to −0.7), applied regardless of subsequent ingredients.

PART V — BONUS SYSTEM
Bonuses are applied AFTER all penalties. AI determines which bonuses are triggered.
Maximum total bonus: +0.8 (cap enforced)
Bonus Type
Trigger Condition
Magnitude
Positive Label
Whole food dominance
Majority (>50%) of ingredients are whole, unprocessed foods
+0.2 to +0.3
"Real whole food foundation"
Natural spices
One or more genuine spice ingredients identified
+0.05 to +0.1
"Contains natural spices"
No synthetic additives
Zero C1 synthetic additive ingredients
+0.15 to +0.2
"No synthetic additives"
No added sugars
Zero C3 ingredients
+0.15 to +0.2
"No added sugars detected"
Low ingredient complexity
Total ingredient count ≤ 5
+0.05 to +0.1
"Simple, clean formulation"
Premium healthy fat
Cold-pressed or EVOO-quality oil in top half of list
+0.05 to +0.1
"Quality fat source used"
Fermented ingredients
Fermented components with documented health benefit
+0.05 to +0.1
"Fermentation-based preservation"
High fiber ingredients
Legumes, bran, psyllium, or similar in significant position
+0.05 to +0.1
"Natural fiber source"


PART VI — FINAL RATING FORMULA
Step 1: AI computes Weighted Ingredient Score (1.0–5.0)

Step 2: AI identifies applicable penalties (Categories 1–8)
         Apply progressive decay in fixed order
         Total Adjusted Penalty = Σ(Penalty × Decay Multiplier)

Step 3: AI identifies applicable bonuses
         Total Bonus = Σ(Qualifying Bonuses), capped at +0.8

Step 4: Raw Final = Weighted Ingredient Score − Total Adjusted Penalty + Total Bonus

Step 5: Final Rating = max(1.0, min(5.0, Raw Final))

Rating Interpretation Scale
Rating
Stars
Label
Meaning
4.5–5.0
⭐⭐⭐⭐⭐
Excellent
Predominantly whole, clean ingredients; minimal or no industrial processing; safe preservation
3.5–4.4
⭐⭐⭐⭐
Good
Good ingredient quality; minor concerns; acceptable processing level
2.5–3.4
⭐⭐⭐
Moderate
Mixed quality; notable concerns; consume mindfully
1.5–2.4
⭐⭐
Poor
Lower ingredient quality; meaningful concerns under regular consumption
1.0–1.4
⭐
Low Quality
Multiple ingredient quality issues; highly refined formulation; less favorable ingredient profile detected

Consumption Recommendation Mapping
Rating
Recommendation
≥ 4.5
Freely consume as part of regular diet
3.5–4.4
Regular consumption acceptable
2.5–3.4
Consume occasionally — mindful portions
1.5–2.4
Consume rarely — meaningful formulation concern
< 1.5
Limit — less favorable ingredient and processing profile


PART VII — SPECIALIZED PERFORMANCE DIMENSIONS (Internal Computation)
Beyond the core rating, AI evaluates seven specialized dimensions (1.0–5.0 each). These are computed internally and surface in the output as 📊 KEY FORMULATION SCORES.
1. Ingredient Purity How clean is the ingredient list? Ratio of whole/minimal ingredients vs. synthetic additives. Absence of functional chemicals with no nutritional role. Shorter, simpler lists with recognizable ingredients score higher.
2. Nutritional Integrity Does the product's ingredient architecture support nutrient density? Whole grain vs. refined flour. Cold-pressed vs. refined oil. Whole fruit vs. fruit flavor. The degree to which processing has reduced the nutritional value of the original food matrix.
3. Glycemic Impact Based on ingredient composition — sugar type, fiber presence, starch quality. High-GI refined carbs without fiber mitigation score lower. Whole grain bases, legume bases, or low-sugar compositions score higher. Formulation-based inference only — not a substitute for clinical glycemic testing.
4. Inflammatory Potential Based on fat quality (omega-6:omega-3 balance evaluated contextually — not simplistic "seed oils bad" logic), presence of refined oils in high-heat contexts, trans fats, advanced glycation end products from high-heat processing, and pro-inflammatory additives.
5. Gut Health Compatibility Presence of prebiotic fibers, fermented ingredients, absence of gut-disruptive emulsifiers (polysorbate 80, CMC), and absence of broad-spectrum antimicrobial additives.
6. Cumulative Safety Risk Modeling repeated daily consumption over weeks and months. Minor individual concerns become more significant under chronic exposure. Additive cocktail burden. Repeated acrylamide or oxidized oil exposure. Cumulative glycation from refined sugar base.
7. Formulation Honesty Is the product what it appears to be? Are "hero ingredient" marketing claims supported by actual ingredient quantities and positions? Sugar splitting detection. Transparent, honest products score high.
For output, these seven dimensions are condensed into five labeled scores:
Ingredient Quality (from Ingredient Purity)
Processing Balance (from Processing Method + Cumulative Safety Risk)
Nutritional Integrity (from Nutritional Integrity + Glycemic Impact)
Additive Load (from Excess Additive Load + Gut Health Compatibility)
Formulation Honesty (from Formulation Honesty)

PART VIII — OUTPUT FORMAT (v2.2 Updated Structure)
# 🏷 PRODUCT
### [Product Name] · [Category]

# ⭐ FINAL RATING
### X.X / 5 — [Label]

[One concise, formulation-focused verdict sentence.]

---

# 📦 PRODUCT STRUCTURE

## Processing Style
[Minimal / Moderate / Highly Refined]

## Ingredient Count
[Very Low / Low / Moderate / High]

## Main Base
[dominant 1–3 ingredients]

---

# 📊 KEY FORMULATION SCORES

## Ingredient Quality → ⭐X.X
→ [Structural reason]

## Processing Balance → ⭐X.X
→ [Structural reason]

## Nutritional Integrity → ⭐X.X
→ [Structural reason]

## Additive Load → ⭐X.X
→ [Structural reason]

## Formulation Honesty → ⭐X.X
→ [Structural reason]

---

# 📊 INGREDIENT CATEGORY SCORES
### [SHOW ONLY CATEGORIES WITH DETECTED INGREDIENTS]
### [IF CATEGORY ABSENT → OMIT ENTIRELY]

## Sugars & Sweeteners | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Oils & Fats | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Flavors & Flavor Enhancers | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Colors | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Stabilizers & Emulsifiers | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Preservatives | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Natural Whole Ingredients | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Animal-Based Ingredients | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

---

# 🌿 NUTRITIONAL CONTRIBUTION SIGNALS
### [SHOW ONLY INGREDIENTS WITH MEANINGFUL NUTRITIONAL RELEVANCE]
### [DO NOT LIST EVERY INGREDIENT]
### [TRACE-LEVEL INGREDIENTS MUST BE LABELED HONESTLY]

## 🟢 [Top-quarter ingredient]
→ Primary nutritional contributor · [fiber/protein/mineral/whole-grain/etc contribution]

## 🟡 [Mid-position ingredient]
→ Supporting contributor · [moderate contribution likely]

## ⚪ [Late-position ingredient]
→ Limited contribution likely / Trace-level presence — nutritional impact minimal

---

# 🔍 MAIN FORMULATION INSIGHTS
### [MAXIMUM 4 BULLETS]
### [EACH BULLET MUST PROVIDE UNIQUE FORMULATION INTELLIGENCE]

- [Unique formulation insight]

- [Unique formulation insight]

- [Unique formulation insight]

- [Unique formulation insight]

---

# ✅ POSITIVE FORMULATION SIGNALS
### [SHOW ONLY MEANINGFUL POSITIVES]
### [DO NOT REWARD TOKEN INGREDIENTS OR BASIC INDUSTRIAL FUNCTIONALITY]

- [Meaningful formulation strength]

- [Meaningful formulation strength]

- [Meaningful formulation strength]

OR

No major formulation strengths beyond basic functionality.

---

# ⚠️ THINGS TO BE AWARE OF
### [MAXIMUM 4 BULLETS]
### [USE CALM EDUCATIONAL TONE]
### [NO FEAR LANGUAGE]

- [Meaningful formulation concern]

- [Meaningful formulation concern]

- [Meaningful formulation concern]

- [Meaningful formulation concern]

---

# 🛡 WHO SHOULD BE MINDFUL
### [SHOW ONLY 🔴 HIGH CONSIDERATION OR 🟡 MODERATE CONSIDERATION]
### [OMIT 🟢 GROUPS ENTIRELY]
### [ONLY SHOW GROUPS ACTUALLY RELEVANT TO THE PRODUCT]
### [OMIT ENTIRE SECTION IF NO MEANINGFUL CONSIDERATION EXISTS]

## 🧒 Children | 🔴 High consideration
→ [Reason]

## 🩸 Blood Sugar | 🟡 Moderate consideration
→ [Reason]

## ❤️ Heart Health | 🟡 Moderate consideration
→ [Reason]

## 🧂 Blood Pressure | 🟡 Moderate consideration
→ [Reason]

## 🤰 Pregnancy | 🟡 Moderate consideration
→ [Reason]

## 🫘 Kidney Function | 🟡 Moderate consideration
→ [Reason]

## ⚖️ Weight Balance | 🟡 Moderate consideration
→ [Reason]

## 🫘 Gut Sensitivity | 🟡 Moderate consideration
→ [Reason]

## 🏃 Sports Recovery | 🟡 Moderate consideration
→ [Reason]

---

# ⚠️ ALLERGEN ADVISORY

## Detected
[Milk] [Soy] [Wheat]

OR

## No major allergens detected.

---

# 🍽 CONSUMPTION GUIDANCE

## Best suited for:
[Occasional / Moderate / Regular / Flexible consumption]

## Better balance strategy:
[Practical improvement guidance]

## Smarter alternatives:
### [SHOW ONLY IF RATING < 3.5 OR GENUINELY USEFUL]
[same-category smarter alternatives]

## Frequency that limits concern:
[Realistic usage guidance]

---

# 📌 FINAL VERDICT

[One concise, product-specific formulation conclusion.]

---





PART IX — OUTPUT LANGUAGE RULES
(Keep existing v2.1 language framework largely unchanged.)
Forbidden Words
dangerous
toxic
harmful
unsafe
avoid completely
worst
severe warning
critical danger
ultra-processed
NOVA Group
NOVA 4
Required Replacements
Avoid
Use Instead
harmful ingredient
ingredient quality concern
dangerous
less favorable formulation
ultra-processed
highly refined formulation
toxic
less supportive nutritional structure
avoid completely
better suited for limited consumption

Evidence Framing
Use:
“associated with”
“may contribute to”
“less favorable evidence profile”
Avoid:
disease prediction
fear framing
absolute certainty language
Tone Benchmark
Every output should sound like:
a calm expert food scientist explaining formulation quality to an intelligent consumer.
Not:
a warning label,
influencer content,
fear-based wellness marketing,
or regulatory panic messaging.

APPENDIX — ABSOLUTE OUTPUT RULES (v2.2)
Before finalizing ANY output, verify:
No section repeats another section
Every formulation score includes a structural reason
Ingredient categories shown ONLY if present
No fake “5-star absent category” inflation
No fear-based language
No forbidden words
No NOVA terminology visible
No exact nutrient estimation without disclosure
Ingredient position influences nutritional interpretation
Trace-level ingredients not treated as meaningful
Hero ingredients cross-checked against actual position
Additives evaluated contextually
Oil evaluation remains nuanced
Positive signals must be genuinely earned
Better alternatives included only when useful
Final verdict must be formulation-specific
Tone remains calm and evidence-grounded
Output stays dense, scannable, and non-repetitive
No “Plain Language Summary” section
No “Ingredient Intelligence — Top Drivers” section
Scoring strictness preserved internally even when tone is moderated



INGREDIENTS:

${ingredients.join(", ")}

`;

    const response =
      await openai.chat.completions.create({

        model: "gpt-5.4-mini",

        temperature: 0.2,

        messages: [

          {
            role: "system",

            content:
              "You are a strict food formulation evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "FOOD TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();
