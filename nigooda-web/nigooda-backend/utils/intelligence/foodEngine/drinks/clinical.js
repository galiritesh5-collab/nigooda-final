
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
          "DRINK",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "DRINK ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

AQUA Algorithm v2.0 — Optimized
Analytical Quality Universal Assessment — Beverages
Evidence-Based Drink Formulation Rating Engine | 2010–2026 | Marketing-Immune · Consumption-Realistic

---

PART I — SYSTEM OBJECTIVE

Core Mission
Rate any beverage's formulation quality on a 1.0–5.0 scale reflecting honest, evidence-based assessment of what the drink does to internal biology under habitual consumption — accounting for liquid delivery physiology, which differs fundamentally from solid food.

Why Beverages Differ from Food
Liquids reach the small intestine within 15–30 minutes. Dissolved sugars and additives enter systemic circulation faster with no mastication satiety signal. Acids coat enamel, esophagus, and gastric mucosa on every sip. Caffeine reaches peak plasma in 30–60 minutes. People consume 1–3 L of beverages daily — habit-forming drinks create chronic additive and sugar exposure not replicated in snack foods.

Reward Criteria: Water or whole-food liquid base dominant · Natural or minimally sweetened · No synthetic colorants · pH ≥ 4.5 preferred · Appropriate caffeine transparency · No sugar splitting · Clean preservation · Honest ingredient representation.

Penalize Without Compromise: Added sugar as dominant ingredient · HFCS · Artificial sweeteners · Synthetic dyes · pH ≤ 3.0 · Caffeine > 200 mg undisclosed · Sodium benzoate in acidic context · Sugar splitting · Synthetic flavor masking poor base · Industrial formulation patterns · Excess sodium in non-sports contexts.

Non-Negotiable Rules
- Liquid sugar penalized more severely than solid sugar — faster absorption, no satiety signal, no fiber mitigation
- Acid pH evaluated for enamel erosion regardless of "natural" sourcing
- Caffeine assessed as a pharmacological agent, not a neutral ingredient
- Marketing claims ("hydrating," "functional," "wellness") do NOT influence scores
- Carbonation alone is neutral — what is dissolved matters
- Juice claims must be cross-referenced with ingredient list: concentrate ≠ whole juice

---

PART II — AI ENGINE SPECIFICATION

AI Judging Principles
P1 — Liquid Delivery Amplification: Ingredients in solution are bioavailable faster and more completely. All concern-level ingredients carry higher effective weight in beverages than equivalent food applications. Apply liquid-delivery amplifier to concerning ingredients in dissolved form.
P2 — Sugar Type and pH Interaction: Fructose in solution reaches liver directly. HFCS in acidic carbonated drinks has heightened hepatic lipogenesis association. Sucrose in acidic context undergoes partial hydrolysis to free fructose + glucose during shelf life. Evaluate sugar type and beverage pH together.
P3 — pH and Enamel Science: Enamel demineralization begins at pH 5.5. Severe erosion threshold: pH 4.0. Score acid profile from phosphoric, citric, malic, tartaric, carbonic acids as a direct health dimension.
P4 — Caffeine Pharmacology: Safe upper limits — 400 mg/day adults (EFSA/FDA); 200 mg/day pregnant; 3 mg/kg/day children/adolescents. Flag products likely consumed by vulnerable groups.
P5 — Osmolality Appropriateness: Hypotonic (<270 mOsm/kg) = rapid absorption, optimal hydration. Isotonic (270–330) = effective rehydration. Hypertonic (>330) = net dehydrating. Evaluate osmolality against stated purpose.
P6 — Chronic Consumption Context: Model cumulative chronic exposure for habit-forming drinks, not single-serving pharmacological events.
P7 — Positional Context: Water position is expected and neutral. What follows water reveals formulation character. Earlier post-water ingredients = greater quantity = more impact.

---

PART III — INGREDIENT ANALYSIS FRAMEWORK

Step 1 — Normalization
Resolve all ingredient names to canonical forms: E-numbers → full names (E211 → sodium benzoate; E150d → caramel color Class IV) · INS codes → full names · Trade names → scientific names (Ace-K → acesulfame potassium) · Synonyms → canonical (glucose-fructose syrup → high fructose corn syrup; "natural flavor" → flagged as unresolved, scored 2.5) · Unknown → flagged, scored 3.0, marked for review.

Step 2 — Category Assignment (Multi-category permitted)

ID | Category | Scope
D1 | Sugars & Sweeteners | All caloric and non-caloric sweeteners: sucrose, HFCS, glucose, fructose, maltose, honey, agave, stevia, monk fruit, aspartame, acesulfame-K, sucralose, cyclamate, saccharin, erythritol, xylitol
D2 | Acids & pH Agents | All acidulants: citric, phosphoric, malic, tartaric, lactic, acetic, ascorbic (as acidulant), carbonic (from carbonation)
D3 | Flavors | Natural and artificial flavoring; flavor complexes; masking agents
D4 | Colors | Plant-derived, caramel classes, petroleum-derived synthetic dyes
D5 | Preservatives | Sodium benzoate, potassium sorbate, sodium metabisulfite, DMDC
D6 | Additives & Functional Agents | Emulsifiers, clouding agents, stabilizers, anti-foam, carbonation adjuncts
D7 | Caffeine & Stimulants | Caffeine (declared or from guarana/yerba mate), taurine, L-theanine, ginseng, B-vitamins in stimulant context
D8 | Electrolytes & Minerals | Sodium chloride, potassium chloride, magnesium sulfate, calcium phosphate — evaluate by amount and context
D9 | Vitamins & Fortification | Added vitamins; evaluate whether fortification is meaningful or cosmetic
D10 | Natural Whole Ingredients | Whole fruit, cold-pressed juice, brewed tea/coffee, milk, coconut water, herbal infusions, fruit pulp
D11 | CO₂ / Carbonation | Neutral agent; mild acid contribution noted

Step 3 — AI Ingredient Scoring (1.0–5.0)

5.0 — Optimal: Whole, unrefined, nutritionally intact liquid ingredient. Minimal transformation. Clean metabolic and dental profile. Examples: plain water, cold-pressed whole juice, full-leaf brewed tea, whole milk, 100% coconut water, naturally fermented kombucha, kefir.

4.0–4.9 — Good: Minimally processed. Nutritional value largely retained. Examples: tea/coffee extract, natural mineral water, fruit puree, lemon juice (not concentrate), honey, coconut sugar, high-purity stevia (rebaudioside A), natural fruit infusion.

3.0–3.9 — Acceptable: Moderately processed. No strong evidence of active concern under moderate consumption. Examples: fruit concentrate, citric acid (fermentation-derived), natural flavors (verified), xanthan gum, erythritol, brown sugar, coconut water concentrate, ascorbic acid (as vitamin C), carbonation.

2.0–2.9 — Concerning: Significant processing. Mild-to-moderate concern under regular consumption — amplified in solution. Examples: sucrose (>12g/serving quantity), glucose syrup, maltodextrin, citric acid (high-dose dental erosion context), caramel color Class I/II, taurine (in high-stimulant stack), modified starch, polysorbate 80.

1.0–1.9 — Less Favorable: Strong mechanistic concern. IARC-classified agents, WHO-mandated eliminations, significant metabolic or dental burden in beverage context. Examples: HFCS, aspartame, acesulfame-K, saccharin, sucralose, tartrazine, Sunset Yellow, Allura Red, sodium benzoate (in acidic drinks), phosphoric acid (high-dose), caramel color Class IV, BVO.

AI Scoring Anchors

Scientific Signal | Score Impact
IARC Group 1 carcinogen | Hard floor: 1.0
IARC Group 2A probable carcinogen | ≤ 1.5
IARC Group 2B possible carcinogen | ≤ 2.0
WHO mandated elimination | Hard floor: 1.0
EU mandatory warning label | ≤ 2.0
pH erosion risk — pH ≤ 3.0 (phosphoric/citric) | ≤ 1.8
pH erosion risk — pH 3.0–3.5 | ≤ 2.5
pH erosion risk — pH 3.5–4.5 | ≤ 3.0
pH acceptable — pH ≥ 4.5 | No acid penalty
Sugar load > 25g/serving (liquid) | ≤ 2.0
Sugar load 12–25g/serving | ≤ 2.5
Caffeine > 200mg/serving | ≤ 2.0
Caffeine 100–200mg/serving (no label warning) | ≤ 2.5
Sodium benzoate in acidic drink (pH < 4.0) | ≤ 1.8 (benzene precursor)
Gut microbiome disruption (human studies) | ≤ 2.5
Osmolality mismatch for stated purpose | ≤ 2.5
GRAS, no mechanistic concern | 3.0–3.5 baseline
Documented bioactive benefit | 4.0+ eligible
Whole food liquid, unrefined | 4.5–5.0 eligible

Step 4 — Category Score Computation (AI-Judged)
Holistic evaluation — not mechanical averaging. Weights earlier post-water ingredients as more impactful. Accounts for synergistic interactions (sodium benzoate + citric acid = benzene precursor context). Outputs single category score (1.0–5.0) with reasoning.

Step 5 — Weighted Category Score

Category | Weight | Rationale
D1 Sugars & Sweeteners | 1.50 | Highest beverage health burden; liquid sugar delivers faster with no satiety response
D2 Acids & pH Agents | 1.40 | Direct enamel erosion risk; mucosal contact; unique to beverages
D3 Flavors | 1.20 | Mask poor base quality; "natural flavor" opacity
D4 Colors | 1.30 | Neurodevelopmental concerns; 4-MEI association; zero nutritional function
D5 Preservatives | 1.35 | Sodium benzoate-benzene formation in acidic context; gut flora disruption
D6 Additives & Functional Agents | 1.15 | Clouding agents, emulsifiers — gut microbiome evidence
D7 Caffeine & Stimulants | 1.30 | Pharmacological agent; dose-response toxicity; vulnerability population risk
D8 Electrolytes & Minerals | 1.00 | Context-dependent; beneficial in sports recovery; excess sodium flagged
D9 Vitamins & Fortification | 0.90 | Cosmetic fortification common; low-dose vitamins in sweet base ≠ health drink
D10 Natural Whole Ingredients | 0.85 | Positive anchor; low weight because water is neutral expectation
D11 Carbonation | 0.80 | Largely neutral; mild acid contribution noted

Positional Category Boost: If one or more ingredients from a category appear in the first 25% of the post-water list, category weight is amplified up to 35% maximum. AI determines boost applicability based on position.

Weighted Ingredient Score = Σ(Category Score × Boosted Category Weight) ÷ Σ(Boosted Weights)
Only categories with at least one ingredient are included.

---

PART III-B — BEVERAGE CONTRIBUTION SYSTEM

Core Principle: Presence of a beneficial ingredient ≠ meaningful functional contribution. A drink claiming elderberry, green tea, or turmeric must be evaluated for whether the ingredient appears in a quantity that delivers the documented bioactive dose.

If percentages/quantities disclosed → use quantity-aware reasoning as primary method. Cross-reference with documented effective doses (green tea extract requires ≥150–200 mg EGCG; probiotics require ≥1 billion CFU).

If position only:
Position (post-water) | Contribution Role
Top 25% | Major formulation contributor
25–50% | Supporting contributor
50–75% | Limited contribution likely
Bottom 25% | Trace / marketing-level presence

Engine Rules
- Bottom-25% ingredients MUST NOT be treated as meaningful functional sources
- "Hero ingredient" claims must be cross-referenced with actual position
- Vitamin C in a heavily sweetened base does not make it a health drink — evaluate total formulation
- Probiotic claims require CFU disclosure; without it, benefit is unverifiable
- "Electrolyte drink" claims require meaningful sodium/potassium/magnesium presence — trace additions do not constitute functional replenishment

For major contributors (top 25% post-water): in addition to functional role, note expected vitamins and minerals the ingredient naturally delivers (e.g., "coconut water → potassium, magnesium, sodium"; "orange juice → vitamin C, folate, potassium"; "milk → calcium, vitamin D, B12, phosphorus"). Only from the ingredient's natural matrix — never invent or estimate fortification values.

Allowed Contribution Phrasing
"Primary formulation contributor · [role] · naturally provides [vitamins/minerals if applicable]"
"Supporting contributor · [moderate contribution likely]"
"Limited contribution likely"
"Trace-level presence — functional impact minimal"
"Marketing-positioned ingredient — position insufficient for claimed benefit"

---

PART IV — PENALTY SYSTEM

Penalties apply after Weighted Ingredient Score is computed. Fixed application order. Progressive decay prevents extreme floor-clamping.

Penalty Application Order (Fixed)
1. Critical Ingredient Penalties
2. Acid / pH Erosion Penalty
3. Caffeine Load Penalty
4. Multiple Sugars / Sugar Splitting Penalty
5. Liquid Sugar Load Penalty
6. High Sodium Penalty
7. Excess Additive Load Penalty
8. Industrial Formulation Pattern Penalty
9. Sugar-First / Sweetener-First Ingredient Penalty

Progressive Decay Multipliers
Penalty #1 × 1.00 | #2 × 0.90 | #3 × 0.80 | #4 × 0.70 | #5 × 0.60 | #6 × 0.50 | #7+ × 0.50

Penalty 1 — Critical Ingredient Penalties
Positional scaling: Penalties amplified when critical ingredient appears early in post-water list. Capped at 1.25× amplification.

Trigger | Severity | Basis
Trans fats (hydrogenated oil in beverage base) | −1.0 to −1.2 | WHO mandated elimination
Synthetic dyes (tartrazine, Sunset Yellow, Allura Red, Brilliant Blue, Ponceau 4R, all petroleum dyes) | −0.6 to −0.8 | EU mandatory warning; McCann 2007 Lancet hyperactivity
HFCS / glucose-fructose syrup | −0.6 to −0.8 | Hepatic lipogenesis; amplified in liquid delivery
Artificial sweeteners (aspartame, saccharin, acesulfame-K, sucralose, cyclamate) | −0.5 to −0.7 | Gut microbiome disruption; IARC 2B (aspartame)
Sodium benzoate in acidic context (pH < 4.0 or with ascorbic/citric acid) | −0.7 to −0.9 | Benzene formation confirmed by FDA; benzene = IARC Group 1
Synthetic antioxidants (BHA, BHT, TBHQ) | −0.7 to −0.9 | Endocrine disruption; NTP carcinogenicity signals
BVO (brominated vegetable oil) | −0.8 to −1.0 | FDA GRAS revoked 2023; bromate tissue accumulation
Caramel Color Class IV (E150d) | −0.5 to −0.7 | 4-MEI formation; IARC 2B; California Prop 65

Penalty 2 — Acid / pH Erosion (Drink-Specific)
Enamel demineralization begins at pH 5.5. At pH < 4.0, erosion is clinically significant with regular exposure. Phosphoric acid chelates calcium from enamel. Citric acid complexes with salivary calcium, reducing buffering protection.
pH Reference: Cola ~2.4–2.6 · Sports drinks ~2.9–3.7 · Energy drinks ~2.9–3.3 · OJ ~3.5–4.0 · Coffee ~4.5–5.0 · Sparkling water ~4.5–5.5 · Still water ~6.5–8.5. If pH officially stated, use it; otherwise AI infers from acid type and position.

Inferred/Stated pH | Acid Type | Severity
≤ 3.0 | Phosphoric | −0.7 to −0.9
≤ 3.0 | Citric/Malic | −0.5 to −0.7
3.0–3.5 | Any | −0.3 to −0.5
3.5–4.5 | Any | −0.1 to −0.25
> 4.5 | Any | None

Compounding rule: If both high sugar load AND pH ≤ 3.5 are present, add −0.15 to acid penalty (dual erosion: chemical + bacterial acid from sugar fermentation).

Penalty 3 — Caffeine Load (Drink-Specific)
EFSA safe limits: 400 mg/day adults; 200 mg/day pregnant; 3 mg/kg/day children/adolescents. AI identifies caffeine from declared sources, guarana (~40–80 mg/g), yerba mate, green tea extract, kola nut.

Caffeine Per Serving | Severity
> 200 mg | −0.6 to −0.8
150–200 mg | −0.4 to −0.6
80–150 mg | −0.2 to −0.4
< 80 mg | No penalty

Population amplification: If product clearly targets children/adolescents or is an "energy" product, apply 1.2× amplification regardless of stated serving size.

Penalty 4 — Multiple Sugars / Sugar Splitting
Two caloric sugar sources: −0.3 to −0.5 | Three or more (especially top half): −0.5 to −0.7 | Cap: −0.7

Penalty 5 — Liquid Sugar Load (Drink-Specific)
Liquid sugar bypasses satiety mechanisms. Sugar-sweetened beverages independently associated with obesity, T2 diabetes, and CVD even after controlling for total caloric intake. Liquid fructose drives hepatic lipogenesis without insulin response.
If sugar is confirmed naturally occurring whole-fruit sugar with intact fiber, penalty moderated by 50%.

Estimated Sugar/Serving | Severity
> 25g | −0.7 to −0.9
15–25g | −0.5 to −0.7
8–15g | −0.2 to −0.4
< 8g | No penalty

Penalty 6 — Sodium (Context-Adjusted)
In sports recovery, moderate sodium is functional (electrolyte replacement). In soft drinks, juices, or flavored waters, sodium is flavor enhancement or hidden preservation.

Position & Context | Severity
Top 25%, non-sports drink | −0.3 to −0.5
25–50%, non-sports drink | −0.2 to −0.35
Any position, sports drink (≤ 600mg/L, disclosed purpose) | No penalty
> 600mg/L, any context | −0.2 to −0.3

Penalty 7 — Excess Additive Load
Moderate (3–4 additives in notable positions): −0.2 to −0.4 | High (5+ additives, especially top half post-water): −0.4 to −0.6

Penalty 8 — Industrial Formulation Pattern
Beverages built primarily on water + artificial flavors + synthetic sweeteners + synthetic colors + preservatives + stabilizers represent an additive-engineered composition with no meaningful whole-food base. Large-scale observational data links regular consumption with metabolic dysregulation beyond what individual ingredients explain.

Detection signals: Artificial flavors as primary flavor · Artificial sweeteners as primary sweetener · Synthetic colors · Sodium benzoate / potassium sorbate / DMDC · Modified starch as clouding agent · Phosphoric acid (non-cola context) · Caramel color Class III/IV · Synthetic emulsifiers · Vitamins added to mask poor base.

Mild (2–3 signals): −0.2 to −0.3 | Moderate (4–5): −0.4 to −0.6 | Strong (6+ or dominant industrial architecture): −0.6 to −0.9

Output language: Use "additive-heavy formulation structure," "water-plus-chemistry architecture," "flavor-and-sweetener engineered composition." Never use "ultra-processed" or "NOVA."

Penalty 9 — Sugar-First / Sweetener-First Ingredient
If any caloric sweetener (sugar, HFCS, glucose syrup, dextrose, invert sugar, fructose, honey, agave) is the first non-water ingredient — or the product leads with sugar with no water base — the beverage is essentially sweetened water.
Severity: Flat −0.5 to −0.7, regardless of subsequent ingredients.

---

PART V — BONUS SYSTEM

Bonuses applied AFTER all penalties. Maximum total bonus: +0.8 (cap enforced).

Bonus | Trigger | Magnitude | Label
Whole liquid base | Primary base is whole fruit, cold-pressed juice, brewed tea, whole milk, or coconut water (not concentrate) | +0.2 to +0.3 | "Whole food liquid base"
Zero added sugar | No caloric sweetener added; sweetness from whole fruit matrix only | +0.2 to +0.25 | "No added sugars"
No synthetic additives | Zero D4/D5/D6 synthetic additive ingredients | +0.15 to +0.2 | "No synthetic additives"
Beneficial pH | Beverage pH ≥ 5.0 | +0.1 to +0.15 | "Tooth-friendly pH profile"
Functional probiotic | Verified live cultures ≥ 1 billion CFU | +0.1 to +0.15 | "Live culture benefit"
Natural botanical | Genuine herbal infusion or spice in top 50% of post-water list | +0.05 to +0.1 | "Natural botanical component"
Low ingredient complexity | Total count ≤ 4 post-water | +0.05 to +0.1 | "Simple, clean formulation"
Appropriate osmolality | Sports drink with isotonic/hypotonic osmolality matching stated purpose | +0.05 to +0.1 | "Hydration-appropriate formulation"
Balanced caffeine + L-theanine | Caffeine < 100mg + natural L-theanine (brewed tea context) | +0.05 to +0.1 | "Balanced caffeine-theanine profile"

---

PART VI — FINAL RATING FORMULA

Step 1: AI computes Weighted Ingredient Score (1.0–5.0)
Step 2: AI identifies applicable penalties (1–9). Apply progressive decay in fixed order. Total Adjusted Penalty = Σ(Penalty × Decay Multiplier)
Step 3: AI identifies applicable bonuses. Total Bonus = Σ(Qualifying Bonuses), capped at +0.8
Step 4: Raw Final = Weighted Ingredient Score − Total Adjusted Penalty + Total Bonus
Step 5: Final Rating = max(1.0, min(5.0, Raw Final))

Rating Scale
4.5–5.0 ⭐⭐⭐⭐⭐ Excellent — Whole-food liquid base; minimal additives; safe pH; clean formulation
3.5–4.4 ⭐⭐⭐⭐ Good — Good ingredient quality; minor concerns; regular consumption supported
2.5–3.4 ⭐⭐⭐ Moderate — Mixed quality; notable concerns; consume mindfully
1.5–2.4 ⭐⭐ Poor — Lower quality formulation; meaningful concerns under regular consumption
1.0–1.4 ⭐ Low Quality — Multiple ingredient quality issues; less favorable formulation

Consumption Mapping
≥ 4.5 → Freely consume as part of regular diet
3.5–4.4 → Regular consumption acceptable
2.5–3.4 → Consume occasionally — mindful quantities
1.5–2.4 → Consume rarely — meaningful formulation concern
< 1.5 → Limit — less favorable ingredient and processing profile

---

PART VII — SPECIALIZED BEVERAGE DIMENSIONS (Internal Computation)

Seven dimensions computed internally, surfaced as 📊 KEY FORMULATION SCORES.

1. Ingredient Purity: Ratio of whole/natural to synthetic additives post-water. Simpler, recognizable lists score higher.
2. Dental Safety Profile (Drink-Specific): Acid type, acid concentration (position), pH inference, sugar co-presence, buffering capacity. Direct enamel erosion risk modeling. No food algorithm equivalent.
3. Metabolic Impact: Sugar type, glycemic profile, fructose load in liquid delivery, osmolality appropriateness, insulin response pattern. Artificial sweetener gut microbiome disruption included.
4. Caffeine & Stimulant Safety: Quantity per serving, stimulant stack complexity (caffeine + taurine + guarana + ginseng), declaration transparency, appropriateness for stated consumer.
5. Gut & Microbiome Compatibility: Synthetic preservatives, artificial sweetener microbiome effects, gut-disruptive emulsifiers, probiotic content (positive), prebiotic fiber presence.
6. Cumulative Safety Risk: Repeated daily consumption model — additive cocktail burden in liquid delivery, chronic acid exposure, synthetic dye accumulation, cumulative glycation.
7. Formulation Honesty: Claims vs. actual ingredient position. Electrolyte, probiotic, immune, energy claims cross-checked. Hero ingredient position audit. Sugar splitting detection. Vitamin decoration check.

For output, condensed into five labeled scores:
Ingredient Purity → from (1)
Dental & Acid Safety → from (2) [drink-specific]
Metabolic & Sugar Impact → from (3) + (4)
Additive & Preservative Load → from (5) + (6)
Formulation Honesty → from (7)

---

PART VIII — OUTPUT FORMAT

# 🥤 DRINK
### [Product Name] · [Drink Category]

# ⭐ FINAL RATING
### X.X / 5 — [Label]

[One concise, formulation-focused verdict sentence.]

---

# 📦 DRINK STRUCTURE

## Processing Style
[Minimal / Moderate / Highly Refined]

## Ingredient Count
[Very Low / Low / Moderate / High] (post-water)

## Primary Base
[dominant 1–3 non-water ingredients]

## Estimated pH
[pH range or Not inferable]

## Caffeine
[None / Low (<80 mg) / Moderate (80–150 mg) / High (>150 mg)]

## Carbonated
[Yes / No]

---

# 📊 KEY FORMULATION SCORES

## Ingredient Purity → ⭐X.X
→ [Structural reason]

## Dental & Acid Safety → ⭐X.X
→ [Structural reason]

## Metabolic & Sugar Impact → ⭐X.X
→ [Structural reason]

## Additive & Preservative → ⭐X.X
→ [Structural reason]

## Formulation Honesty → ⭐X.X
→ [Structural reason]

---

# 📊 INGREDIENT CATEGORY SCORES
### [SHOW ONLY CATEGORIES WITH DETECTED INGREDIENTS]
### [IF CATEGORY ABSENT → OMIT ENTIRELY]

## Sugars & Sweeteners | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Acids & pH Agents | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Flavors | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Preservatives | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Color Systems | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Caffeine & Stimulant Systems | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Electrolyte & Mineral Systems | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Functional Additives | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Botanical & Herbal Components | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Dairy Components | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Fruit Components | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

## Natural Whole Ingredients | ⭐X.X | [Dominant Ingredient(s)] | [Quality Signal]

---

# 🌿 FORMULATION CONTRIBUTION SIGNALS
### [SHOW ONLY INGREDIENTS WITH MEANINGFUL FORMULATION OR FUNCTIONAL RELEVANCE]
### [DO NOT LIST EVERY INGREDIENT]
### [TRACE-LEVEL "HERO INGREDIENTS" MUST BE LABELED HONESTLY]

## 🟢 [Top-quarter post-water ingredient]
→ Primary formulation contributor · [sweetness/acidity/caffeine/hydration/flavor/functional role] · naturally provides [vitamins/minerals from ingredient's own matrix, e.g., "vitamin C, potassium, folate" for orange juice; "calcium, vitamin D, B12" for milk; "potassium, magnesium" for coconut water — only from natural matrix, never inferred from added fortification]

## 🟡 [Mid-position ingredient]
→ Supporting contributor · [moderate contribution likely]

## ⚪ [Late-position ingredient]
→ Limited contribution likely / Trace-level presence — functional impact minimal

OR

## ⚪ [Late-position "hero ingredient"]
→ Trace-level presence — may serve marketing rather than functional purpose

---

# 🔍 MAIN FORMULATION INSIGHTS
### [MAXIMUM 4 BULLETS]
### [EACH BULLET MUST PROVIDE UNIQUE FORMULATION INTELLIGENCE]

- [Unique drink formulation insight]

- [Unique acid/pH insight]

- [Unique sweetener/caffeine/additive insight]

- [Unique formulation-engineering insight]

---

# ✅ POSITIVE FORMULATION SIGNALS
### [SHOW ONLY MEANINGFUL POSITIVES]
### [DO NOT REWARD BASIC INDUSTRIAL FUNCTIONALITY]

- [Meaningful drink formulation strength]

OR

No major formulation strengths beyond basic beverage functionality.

---

# ⚠️ THINGS TO BE AWARE OF
### [MAXIMUM 4 BULLETS]
### [CALM EDUCATIONAL TONE — NO FEAR LANGUAGE]

- [Meaningful drink formulation concern]

- [Meaningful drink formulation concern]

- [Meaningful drink formulation concern]

- [Meaningful drink formulation concern]

---

# 🛡 WHO SHOULD BE MINDFUL
### [SHOW ONLY 🔴 HIGH CONSIDERATION OR 🟡 MODERATE CONSIDERATION]
### [OMIT 🟢 GROUPS ENTIRELY]
### [ONLY SHOW GROUPS ACTUALLY RELEVANT TO THIS DRINK]
### [OMIT ENTIRE SECTION IF NO MEANINGFUL CONSIDERATION EXISTS]

## 🧒 Children | 🔴 High consideration
→ [Reason]

## 🦷 Dental Health | 🟡 Moderate consideration
→ [Reason]

## 🩸 Blood Sugar | 🟡 Moderate consideration
→ [Reason]

## ❤️ Heart Health | 🟡 Moderate consideration
→ [Reason]

## 🧂 Blood Pressure | 🟡 Moderate consideration
→ [Reason]

## 🤰 Pregnancy | 🟡 Moderate consideration
→ [Reason]

## ⚖️ Weight Balance | 🟡 Moderate consideration
→ [Reason]

## 😴 Sleep Quality | 🟡 Moderate consideration
→ [Reason]

## 🫘 Kidney Function | 🟡 Moderate consideration
→ [Reason]

## 🦠 Gut Health | 🟡 Moderate consideration
→ [Reason]

## 🏃 Sports Recovery | 🟡 Moderate consideration
→ [Reason]

---

# ⚠️ ALLERGEN ADVISORY

## Detected
[Milk] [Soy] [Gluten] [Tree Nuts] [Peanuts] [Eggs] [Sesame] [Fish] [Sulfites]

OR

## No major allergens detected.

---

# 🍽 CONSUMPTION GUIDANCE

## Best suited for:
[Occasional / Moderate / Regular / Flexible consumption]

## Better balance strategy:
[Practical drink-specific improvement guidance]

## Smarter alternatives:
### [SHOW ONLY IF RATING < 3.5 OR GENUINELY USEFUL]
[2–3 realistic higher-quality alternatives from same drink category]

## Frequency that limits concern:
[Realistic usage guidance without alarmism]

---

# 📌 FINAL VERDICT

[One concise, drink-specific formulation conclusion.]

---

PART IX — OUTPUT LANGUAGE RULES

Forbidden Words: dangerous · toxic · harmful · unsafe · avoid completely · worst · severe warning · critical danger · ultra-processed · NOVA Group · NOVA 4 · rots your teeth · poisons · chemical cocktail

Required Replacements
dangerous/toxic → less favorable formulation | harmful ingredient → ingredient quality concern | avoid completely → better suited for limited consumption | rots teeth → associated with enamel erosion risk under regular consumption | ultra-processed → processing-reliant / additive-engineered composition

Evidence Framing: Use "associated with" not "causes" · Use "may contribute to" not "leads to" · Use "enamel erosion risk" not "destroys teeth" · Caffeine = "pharmacologically active compound" · Never predict disease outcomes from individual products · Communicate cumulative concerns as gradual physiological considerations.

Tone Benchmark: Calm, expert beverage scientist speaking to an intelligent adult consumer — not a health warning, not a fear campaign, not a brand advertisement. Alcoholic beverages are out of scope — flag and decline gracefully.

---

APPENDIX — ABSOLUTE OUTPUT RULES

Before finalizing ANY output, verify:
[ ] No section repeats another section
[ ] Every formulation score includes a structural reason
[ ] Ingredient categories shown ONLY if detected — no absent-category inflation
[ ] No fear-based or alarmist language
[ ] No forbidden words
[ ] No NOVA / ultra-processed terminology in visible output
[ ] Dental/acid evaluation is contextual — phosphoric ≠ citric ≠ carbonic in severity
[ ] No exact nutrient quantities estimated without official disclosure
[ ] Trace-level post-water ingredients not credited as meaningful contributors
[ ] Hero ingredient claims cross-referenced with actual post-water position
[ ] Vitamin/mineral callouts in Contribution Signals drawn only from natural matrix of the ingredient — not from added fortification
[ ] Positive signals must be genuinely earned
[ ] Better alternatives included only when rating < 3.5 OR genuinely useful
[ ] Final verdict is drink-specific
[ ] Caffeine evaluated with dose-response context
[ ] Osmolality evaluated against stated drink purpose
[ ] Scoring remains strict internally; only tone is calibrated externally
[ ] Output stays dense, scannable, and non-repetitive
[ ] No "Plain Language Summary" section
AQUA Algorithm v1.1 — Full AI Intelligence Engine Science base: 2010–2026 | Global Beverage Application | Evidence-Grounded · Marketing-Immune · Consumption-Realistic · Communication-Calibrated
Companion to NIGOODA Food Algorithm v2.2 — shares evidence framework and output structure; all beverage-specific science (pH erosion, caffeine pharmacology, osmolality, liquid sugar kinetics) is original to AQUA.



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
              "You are a strict drink formulation evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "DRINK TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();
