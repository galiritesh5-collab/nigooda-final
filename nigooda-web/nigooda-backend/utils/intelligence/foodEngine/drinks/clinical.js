
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

AQUA Algorithm v1.0
Analytical Quality Universal Assessment — Beverages
Evidence-Based Drink Formulation Rating Engine
Science base: 2010–2026 | Global Beverage Application | Evidence-Grounded · Marketing-Immune · Consumption-Realistic · Communication-Calibrated

PART I — SYSTEM OBJECTIVE
Core Mission
Rate any beverage's formulation quality on a 1.0–5.0 scale that reflects honest, evidence-based assessment of what the drink will do to a person's internal biology under real-world, habitual consumption — accounting for the unique physiological context of liquid delivery, which differs fundamentally from solid food.
Why Beverages Require a Separate Algorithm
Beverages are not food in liquid form. They interact with human biology differently:
Rapid gastric transit: Liquids reach the small intestine within 15–30 minutes. Dissolved sugars and additives enter systemic circulation faster than in solid food.
Bypassed mastication signals: Drinking does not trigger the same cephalic-phase satiety hormones as chewing. Liquid calories are poorly registered by appetite-regulating systems (NEJM, 2000; Appetite, 2011).
Dental surface exposure: Acids, sugars, and carbonation create direct enamel contact. Beverages hold ingredients against tooth surfaces longer than food (Journal of Dentistry, 2015).
Osmolality effects: Drink composition affects cellular hydration, renal load, and gastrointestinal absorption rate in ways irrelevant to solid food.
Caffeine pharmacokinetics: Dissolved caffeine reaches peak plasma concentration in 30–60 minutes — faster than any solid caffeine source.
pH and mucosal exposure: Every sip coats the esophagus, stomach lining, and oral cavity — ingredients in solution have direct mucosal contact at every point of transit.
Daily volume behavior: A single drink is rarely one serving. People consume 1–3 L of beverages daily; habit-forming beverages (coffee, tea, soft drinks, juices) may be consumed multiple times per day, creating chronic additive and sugar exposure not replicated in snack foods.
Reward Criteria
Score high ONLY when formulations demonstrate:
Water or whole-food liquid bases as dominant component
Natural, unsweetened, or minimally sweetened composition
No synthetic colorants or artificial flavor manipulation
Low enamel erosion potential (pH ≥ 4.5 preferred; ≥ 3.5 minimum)
Appropriate caffeine transparency and safe levels
No sugar manipulation or multi-sugar splitting
Absence of functional additive architecture disguised as a "drink"
Osmolality appropriate to stated purpose (hydration vs. energy vs. sports)
Clean preservation method (no synthetic antimicrobials as primary mechanism)
Honest ingredient representation without marketing inflation
Penalize Without Compromise
Apply mandatory reductions when formulations include:
Added sugar as primary or dominant ingredient
High fructose corn syrup / glucose-fructose syrup
Artificial sweeteners (aspartame, acesulfame-K, saccharin, sucralose, cyclamate)
Synthetic colorants (all petroleum-derived dyes)
pH ≤ 3.0 (extreme enamel erosion risk)
Excessive caffeine without disclosure (>200 mg per standard serving)
Synthetic preservatives (sodium benzoate in acidic drinks = benzene formation risk)
Multiple sugar sources (sugar splitting)
Synthetic flavor architecture masking poor base quality
Industrial ultra-processing pattern indicators
Excessive sodium in non-sports-recovery contexts
Non-Negotiable Scoring Rules
Liquid sugar delivery is penalized more severely than equivalent solid sugar — faster absorption, no satiety signal, no fiber mitigation
Acid-pH content MUST be evaluated for enamel erosion potential regardless of "natural" sourcing
Caffeine content MUST be assessed as a pharmacological agent, not a neutral ingredient
Marketing claims ("hydrating," "energizing," "functional," "wellness") do NOT influence scores
Carbonation alone is neutral — what is dissolved in the carbonated water is what matters
Juice claims require cross-referencing with ingredient list: fruit concentrate ≠ whole fruit juice

PART II — AI ENGINE SPECIFICATION
AI Role in This Algorithm
The AI reasoning engine applies drink-specific physiological frameworks to evaluate each ingredient and the beverage as a complete formulation. The AI does not invent scores — it applies documented scientific evidence.
AI Judging Principles
Principle 1 — Liquid Delivery Amplification In solution, ingredients are bioavailable faster and more completely than in solid matrices. All concern-level ingredients carry higher effective weight in beverages than in equivalent food applications. The AI applies a liquid-delivery context amplifier when scoring concerning ingredients in dissolved form.
Principle 2 — Sugar Type and Dissolution Rate Not all sugars are equal in beverage context. Fructose in solution reaches the liver directly without first-pass muscle uptake. HFCS in carbonated acidic drinks has heightened hepatic lipogenesis association. Sucrose in carbonated context (lower pH) undergoes partial hydrolysis to free fructose + glucose during shelf life. The AI accounts for sugar type and the beverage pH environment together.
Principle 3 — pH and Enamel Science Critical erosion threshold: pH 5.5 (hydroxyapatite dissolution begins). Severe erosion threshold: pH 4.0. The AI scores pH profile from ingredient acids (phosphoric acid, citric acid, malic acid, tartaric acid, carbonic acid) and positions this as a direct health dimension, not just a flavor note.
Principle 4 — Caffeine Pharmacology Caffeine is a psychoactive substance with documented dose-response effects. Safe upper limit: 400 mg/day adults (EFSA, FDA); 200 mg/day pregnant individuals; 3 mg/kg/day children and adolescents. AI scores caffeine level by per-serving quantity and flags products marketed to or likely consumed by vulnerable groups.
Principle 5 — Osmolality Appropriateness Beverages have an intended hydration function. Osmolality determines whether a drink promotes, is neutral to, or impairs cellular hydration:
Hypotonic (<270 mOsm/kg): Rapid absorption — optimal for hydration
Isotonic (270–330 mOsm/kg): Matched to blood plasma — effective for rehydration
Hypertonic (>330 mOsm/kg): Draws water from tissues into GI tract — net dehydrating effect
Sugar-heavy drinks, energy drinks, and sweetened juices are typically hypertonic. The AI evaluates osmolality appropriateness against the product's stated purpose.
Principle 6 — Chronic Consumption Context Beverages that are habit-forming (caffeinated, sweetened, carbonated) are consumed daily or multiple times daily. The algorithm models cumulative chronic exposure — not a single-serving pharmacological event.
Principle 7 — Positional Context Ingredients earlier in the list are present in greater quantity. For beverages, water position is expected and does not reduce ingredient quality. The AI evaluates what follows water — that is where the formulation character is revealed.

PART III — INGREDIENT ANALYSIS FRAMEWORK
Step 1 — Normalization
AI resolves all ingredient names to canonical forms:
E-numbers → full names (E211 → sodium benzoate; E150d → caramel color Class IV)
INS codes → full names
Trade names → scientific names (Ace-K → acesulfame potassium)
Synonyms → canonical (glucose-fructose syrup → high fructose corn syrup; cane sugar → sucrose)
Descriptor resolution: "natural flavor" → flagged as unresolved flavor source; scored 2.5
Unknown/unresolvable → flagged as "Unknown Ingredient," scored 3.0, marked for review
Step 2 — Category Assignment
AI assigns each ingredient to one or more of the following drink-specific categories:
ID
Category
Scope
D1
Sugars & Sweeteners
All caloric and non-caloric sweetening agents: sucrose, HFCS, glucose, fructose, maltose, honey, agave, stevia, monk fruit, aspartame, acesulfame-K, sucralose, cyclamate, saccharin, erythritol, xylitol
D2
Acids & pH Agents
All acidulants affecting beverage pH: citric acid, phosphoric acid, malic acid, tartaric acid, lactic acid, acetic acid, ascorbic acid (as acidulant), carbonic acid (from carbonation)
D3
Flavors
Natural and artificial flavoring substances; flavor complexes; masking agents
D4
Colors
Colorants: plant-derived (beetroot, turmeric), caramel classes, petroleum-derived synthetic dyes
D5
Preservatives
Sodium benzoate, potassium sorbate, sodium metabisulfite, dimethyl dicarbonate (DMDC)
D6
Additives & Functional Agents
Emulsifiers, clouding agents, stabilizers, anti-foam agents, carbonation adjuncts
D7
Caffeine & Stimulants
Caffeine (declared or from guarana/yerba mate), taurine, L-theanine, ginseng, B-vitamins in stimulant context
D8
Electrolytes & Minerals
Sodium chloride, potassium chloride, magnesium sulfate, calcium phosphate — evaluate by amount and context
D9
Vitamins & Fortification
Added vitamins; evaluate whether fortification is meaningful or cosmetic
D10
Natural Whole Ingredients
Whole fruit, cold-pressed juice, brewed tea/coffee, milk, coconut water, herbal infusions, fruit pulp
D11
CO₂ / Carbonation
Carbonation itself — neutral agent; context-evaluated

Multi-category assignment permitted (e.g., phosphoric acid = D2 + D6; ascorbic acid = D2 + D9).
Step 3 — AI Ingredient Scoring (1.0–5.0)
Score 5.0 — Optimal Whole, unrefined, nutritionally intact liquid ingredient. Minimal industrial transformation. Clean metabolic and dental profile. Examples: plain water, cold-pressed whole juice (not concentrate), full-leaf brewed tea, whole milk, 100% coconut water, kombucha (naturally fermented), kefir.
Score 4.0–4.9 — Good Minimally processed. Nutritional value largely retained. Acceptable production method. Examples: tea/coffee extract (not instant), natural mineral water, fruit puree, lemon juice (not concentrate), honey, coconut sugar, natural stevia leaf extract (high-purity rebaudioside A), milk proteins, natural fruit infusion.
Score 3.0–3.9 — Acceptable Moderately processed. Nutritional compromise but no strong evidence of active concern under moderate consumption. Examples: fruit concentrate, citric acid (from fermentation), natural flavors (verified), xanthan gum, erythritol, brown sugar, coconut water concentrate, ascorbic acid (as vitamin C, not primary acidulant), carbonation.
Score 2.0–2.9 — Concerning Significant processing. Evidence of mild-to-moderate concern under regular consumption — particularly relevant in solution given faster bioavailability. Examples: sucrose (in >12g/serving quantity), glucose syrup, maltodextrin, citric acid (high-dose dental erosion context), natural caramel color (Class I/II), taurine (in high-stimulant stack context), modified starch (as clouding agent), polysorbate 80.
Score 1.0–1.9 — Less Favorable Strong mechanistic evidence of concern. Includes IARC-classified agents, WHO mandated eliminations, or ingredients with significant documented metabolic or dental burden in beverage context. Examples: HFCS, aspartame, acesulfame-K, saccharin, sucralose, tartrazine, Sunset Yellow, Allura Red, sodium benzoate (especially in acidic drinks), phosphoric acid (high-dose, enamel erosion + bone mineral density concern), caramel color Class IV (4-MEI content), brominated vegetable oil (BVO).
AI Scoring Anchors — Drink-Specific Scientific Framework
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
EU mandatory warning label (synthetic dyes, aspartame)
Score ≤ 2.0
pH erosion risk — drink pH ≤ 3.0 (phosphoric/citric)
Score ≤ 1.8
pH erosion risk — drink pH 3.0–3.5
Score ≤ 2.5
pH erosion risk — drink pH 3.5–4.5
Score ≤ 3.0
pH acceptable — drink pH ≥ 4.5
No acid penalty
Sugar load >25g/serving (liquid delivery)
Score ≤ 2.0
Sugar load 12–25g/serving
Score ≤ 2.5
Caffeine >200mg/serving
Score ≤ 2.0
Caffeine 100–200mg/serving (no label warning)
Score ≤ 2.5
Sodium benzoate in acidic beverage (pH < 4.0)
Score ≤ 1.8 (benzene precursor)
Gut microbiome disruption evidence (human studies)
Score ≤ 2.5
Osmolality mismatch for stated hydration purpose
Score ≤ 2.5
GRAS status, no mechanistic concern
Score 3.0–3.5 baseline
Documented bioactive benefit (antioxidants, probiotics)
Score 4.0+ eligible
Whole food liquid, unrefined
Score 4.5–5.0 eligible

Step 4 — Category Score Computation (AI-Judged)
Rather than mechanical averaging, the AI computes each category score holistically:
Considers all ingredients in the category
Weights earlier-listed ingredients as more impactful (larger quantity, faster systemic impact)
Accounts for synergistic interactions (e.g., sodium benzoate + citric acid in same product = benzene precursor context)
Outputs a single category score (1.0–5.0) with reasoning
Step 5 — Weighted Category Score (AI-Computed)
Category
Importance Weight
Rationale
D1 Sugars & Sweeteners
1.50
Highest beverage health burden globally; liquid sugar delivers faster with no satiety response
D2 Acids & pH Agents
1.40
Direct enamel erosion risk; esophageal and gastric mucosal contact; unique to beverages
D3 Flavors
1.20
Mask poor base quality; reformulation signal; "natural flavor" opacity
D4 Colors
1.30
Neurodevelopmental concerns; 4-MEI association; zero nutritional function
D5 Preservatives
1.35
Sodium benzoate-benzene formation in acidic beverage context; gut flora disruption
D6 Additives & Functional Agents
1.15
Clouding agents, emulsifiers — gut microbiome evidence
D7 Caffeine & Stimulants
1.30
Pharmacological agent; dose-response toxicity; vulnerability population risk
D8 Electrolytes & Minerals
1.00
Context-dependent; beneficial in sports recovery; excess sodium flagged
D9 Vitamins & Fortification
0.90
Cosmetic fortification common; low-dose vitamins in ultra-sweet base ≠ health food
D10 Natural Whole Ingredients
0.85
Positive anchor; beneficial; but low weight as base (water) is neutral expectation
D11 Carbonation
0.80
Largely neutral; mild acid contribution noted

Positional Category Boost (AI-Applied): If one or more ingredients from a category appear in the first 25% of the ingredient list (excluding water), the category weight is amplified up to 35% boost maximum. AI determines whether this boost applies based on identified position.
Weighted Ingredient Score Formula:
Weighted Ingredient Score = Σ(Category Score × Boosted Category Weight) ÷ Σ(Boosted Weights)

Only categories with at least one ingredient are included.

PART III-B — BEVERAGE-SPECIFIC CONTRIBUTION SYSTEM
Core Principle
In beverages, "presence" of a beneficial ingredient ≠ meaningful functional contribution. A drink claiming to contain elderberry, green tea, or turmeric must be evaluated for whether the ingredient appears in a quantity that delivers the documented bioactive dose — or whether it is a trace-level marketing flavoring.
Drink-Specific Contribution Logic
If ingredient percentages or quantities are disclosed: → Use quantity-aware reasoning as the primary method. Cross-reference with documented effective doses (e.g., green tea extract requires ≥150–200 mg EGCG for antioxidant effect; probiotic claim requires ≥1 billion CFU).
If percentages are unavailable (position inference):
Position in Drink Ingredient List (post-water)
Contribution Role
Top 25% (post-water)
Major formulation contributor
25–50%
Supporting contributor
50–75%
Limited contribution likely
Bottom 25%
Trace / marketing-level presence

Engine Rules
A fruit juice, herb extract, or vitamin appearing in the bottom 25% of the ingredient list MUST NOT be treated as a meaningful functional source — it is trace-level.
"Infused with," "enhanced with," "contains real" claims on packaging must be cross-referenced with actual ingredient position.
Vitamin C added to a heavily sweetened drink does not make it a health drink — the AI evaluates the total formulation, not the decorated positive.
Probiotic claims require CFU disclosure; without it, probiotic benefit is unverifiable.
"Electrolyte drink" claims require meaningful sodium/potassium/magnesium presence — trace mineral additions do not constitute functional electrolyte replenishment.
Allowed Contribution Phrasing
"Primary formulation contributor"
"Supporting contributor in functional context"
"Limited contribution likely"
"Trace-level presence — functional impact minimal"
"Marketing-positioned ingredient — position insufficient for claimed benefit"

PART IV — PENALTY SYSTEM
Penalties apply after the Weighted Ingredient Score is computed. AI identifies which penalty types apply and applies progressive decay in fixed sequence.
Penalty Application Order (Fixed — must follow this sequence)
Critical Ingredient Penalties
Acid / pH Erosion Penalties (Drink-Specific)
Caffeine Load Penalty (Drink-Specific)
Multiple Sugars / Sugar Splitting Penalty
Liquid Sugar Load Penalty (Drink-Specific)
High Sodium Penalty (Context-Adjusted)
Excess Additive Load Penalty
Industrial Formulation Pattern Penalty
Sugar-First / Sweetener-First Ingredient Penalty
Progressive Decay Multipliers
Penalty Sequence
Decay Multiplier
Penalty #1
× 1.00
Penalty #2
× 0.90
Penalty #3
× 0.80
Penalty #4
× 0.70
Penalty #5
× 0.60
Penalty #6
× 0.50
Penalty #7+
× 0.50


Penalty Category 1 — Critical Ingredient Penalties
Penalty Type
Trigger Ingredients
Severity Range
Scientific Basis
Trans fats
Hydrogenated oil in beverage base
Severe (−1.0 to −1.2)
WHO mandated elimination
Synthetic dyes
Tartrazine, Sunset Yellow, Allura Red, Brilliant Blue, Ponceau 4R, Quinoline Yellow, all petroleum dyes
Moderate-High (−0.6 to −0.8)
EU mandatory warning; McCann 2007 (Lancet); hyperactivity association
HFCS
High fructose corn syrup, glucose-fructose syrup
Moderate-High (−0.6 to −0.8)
Hepatic lipogenesis; visceral fat; amplified in liquid delivery context
Artificial sweeteners
Aspartame, saccharin, acesulfame-K, sucralose, cyclamate
Moderate (−0.5 to −0.7)
Gut microbiome disruption; IARC 2B (aspartame); dysregulated glycemic response
Sodium benzoate in acidic context
Sodium benzoate in any drink with pH < 4.0 or presence of ascorbic acid/citric acid
High (−0.7 to −0.9)
Benzene formation from benzoate + ascorbic acid in acidic solution confirmed by FDA; IARC Group 1 carcinogen (benzene)
Synthetic antioxidants
BHA, BHT, TBHQ in beverage or flavor base
High (−0.7 to −0.9)
Endocrine disruption; carcinogenicity signals (NTP)
Brominated vegetable oil
BVO
High (−0.8 to −1.0)
FDA revoked GRAS 2023; bromate accumulation in tissue
Caramel Color Class IV
E150d, caramel color (sulfite-ammonia process)
Moderate (−0.5 to −0.7)
4-MEI formation; IARC 2B; California Prop 65 listing

Positional scaling: Penalties amplified when critical ingredient appears early in the post-water ingredient list. Capped at 1.25× amplification.

Penalty Category 2 — Acid / pH Erosion Penalty (Drink-Specific — No Equivalent in Food Algorithm)
Scientific Basis: Dental enamel begins dissolving (demineralization) at pH 5.5. At pH < 4.0, erosion is clinically significant with regular exposure. Phosphoric acid is particularly erosive due to its chelating effect on calcium. Citric acid complexes with calcium in saliva, reducing its protective buffering capacity. Erosive potential is compounded by sugar presence (bacterial acid production on top of direct chemical erosion).
Critical pH reference levels:
Cola drinks: pH 2.4–2.6 (phosphoric acid base)
Sports drinks: pH 2.9–3.7 (citric acid base)
Energy drinks: pH 2.9–3.3
Orange juice: pH 3.5–4.0
Coffee: pH 4.5–5.0
Sparkling water: pH 4.5–5.5
Still water: pH 6.5–8.5
Detection: AI infers pH range from acid type and position in ingredient list. If beverage pH is officially stated, that value is used directly.
Inferred/Stated pH
Acid Type
Severity
≤ 3.0 (phosphoric acid dominant)
Phosphoric
High (−0.7 to −0.9)
≤ 3.0 (citric/malic dominant)
Citric/Malic
Moderate-High (−0.5 to −0.7)
3.0–3.5
Any acid
Moderate (−0.3 to −0.5)
3.5–4.5
Any acid
Mild (−0.1 to −0.25)
> 4.5
Any acid
None

Compounding rule: If both high sugar load AND pH ≤ 3.5 are present, add additional −0.15 to acid penalty (dual erosion mechanism: chemical + bacterial acid from sugar fermentation).

Penalty Category 3 — Caffeine Load Penalty (Drink-Specific)
Scientific Basis: Caffeine is a methylxanthine psychoactive compound. EFSA (2015) established safe upper limits: 400 mg/day adults; 200 mg/day pregnant women; 3 mg/kg/day children and adolescents. At high doses: cardiovascular stress, anxiety, sleep disruption, dependency formation. Energy drinks marketing caffeine to adolescents is an active regulatory concern (WHO, 2014).
Detection: AI identifies caffeine from: declared caffeine, guarana (approximately 40–80 mg caffeine per gram), yerba mate, green tea extract, kola nut. If not declared, infer from ingredient class.
Caffeine Per Serving
Severity
> 200 mg
High (−0.6 to −0.8)
150–200 mg
Moderate-High (−0.4 to −0.6)
80–150 mg
Mild-Moderate (−0.2 to −0.4)
< 80 mg
No penalty (within generally safe single-dose range for adults)

Population amplification: If product design, packaging, or naming clearly targets children/adolescents or is a "energy" product, AI applies 1.2× amplification on this penalty regardless of stated serving size.

Penalty Category 4 — Multiple Sugars / Sugar Splitting Penalty
Scientific Basis: Sugar splitting in beverages — listing multiple sugar forms separately so no single sugar appears prominently in the ingredient list — is a documented deceptive labeling practice. In beverages, combined sugar effect is additive and systemic delivery is rapid.
Detection: AI counts all D1 caloric sweetener ingredients in the normalized ingredient list.
Detection
Severity
Two caloric sugar sources
Mild (−0.3 to −0.5)
Three or more sugar sources, especially in top half
Moderate (−0.5 to −0.7)
Maximum cap
−0.7


Penalty Category 5 — Liquid Sugar Load Penalty (Drink-Specific — No Equivalent in Food Algorithm)
Scientific Basis: Liquid sugar uniquely bypasses satiety mechanisms. Systematic review (NEJM, 2012) confirms sugar-sweetened beverages independently associated with obesity, type 2 diabetes, and cardiovascular disease even after controlling for total caloric intake. Liquid fructose drives de novo hepatic lipogenesis without the insulin response that would occur with equivalent solid sugar (AJCN, 2008).
Detection: AI estimates total caloric sweetener load from ingredient positions and any disclosed nutritional data.
Estimated Sugar Per Serving
Severity
> 25g
High (−0.7 to −0.9)
15–25g
Moderate-High (−0.5 to −0.7)
8–15g
Mild-Moderate (−0.2 to −0.4)
< 8g
No penalty

Note: If sugar is confirmed as naturally occurring whole-fruit sugar (not added) and accompanied by intact fruit fiber, penalty is moderated by 50%.

Penalty Category 6 — Sodium Penalty (Context-Adjusted for Beverage Type)
Scientific Basis: Sodium in beverages is evaluated against the drink's stated purpose. In sports recovery drinks, moderate sodium is functional (electrolyte replacement). In soft drinks, juices, or flavored waters, sodium is either a flavor enhancer or a hidden preservative — neither justified in terms of health benefit.
Position & Context
Severity
Top 25%, non-sports drink context
Moderate (−0.3 to −0.5)
25–50%, non-sports drink context
Mild-Moderate (−0.2 to −0.35)
Any position, sports drink (disclosed electrolyte purpose, ≤ 600mg/L)
No penalty
Any position, sodium > 600mg/L (all contexts)
Mild penalty regardless of context (−0.2 to −0.3)


Penalty Category 7 — Excess Additive Load Penalty
Scientific Basis: Cumulative exposure to multiple food additives may produce synergistic effects ("cocktail effect") beyond any individual additive's established safety threshold. In beverages consumed daily and in volume, additive cocktail burden is particularly relevant.
Detection: AI counts and weighs all D6 Additive ingredients, considering positions.
Additive Load
Severity
Moderate (3–4 additives in notable positions)
Mild (−0.2 to −0.4)
High (5+ additives, especially in top half post-water)
Moderate (−0.4 to −0.6)


Penalty Category 8 — Industrial Formulation Pattern Penalty
Scientific Basis: Beverages built primarily on water + artificial flavors + synthetic sweeteners + synthetic colors + preservatives + stabilizers represent a "drink-shaped chemical architecture" with no meaningful whole-food base. Large-scale observational data links regular consumption of such drinks with metabolic dysregulation beyond what individual ingredients explain.
AI Detection — Industrial Beverage Signal Ingredients:
Artificial flavors as primary flavor source
Flavor enhancers (yeast extract, disodium inosinate/guanylate in drink context)
Artificial sweeteners as primary sweetening agent
Synthetic colors (any petroleum dye)
Synthetic preservatives (sodium benzoate, potassium sorbate, DMDC)
Modified starch as clouding/stability agent
Phosphoric acid (non-cola context)
Caramel color Class III/IV
Synthetic emulsifiers
Artificial vitamins added to mask poor base quality
Pattern Strength
Severity
Mild (2–3 indicators)
Mild (−0.2 to −0.3)
Moderate (4–5 indicators)
Moderate (−0.4 to −0.6)
Strong (6+ indicators or dominant industrial architecture)
High (−0.6 to −0.9)

Output language for this penalty: Use "additive-heavy formulation structure," "water-plus-chemistry architecture," "flavor-and-sweetener engineered composition," or "processing-reliant beverage." Never use "ultra-processed" or "NOVA."

Penalty Category 9 — Sugar-First / Sweetener-First Ingredient Penalty
Scientific Basis: If sugar or a sweetener is the first non-water ingredient, it is the dominant dissolved component. A beverage where sweetener outweighs everything else is nutritionally a sweetened water delivery system.
Detection: First non-water ingredient in normalized list is any caloric sweetener (sugar, glucose syrup, HFCS, dextrose, corn syrup, invert sugar, fructose, honey, agave) or the product contains no water and leads with sugar.
Severity: Moderate-High flat penalty (−0.5 to −0.7), applied regardless of subsequent ingredients.

PART V — BONUS SYSTEM
Bonuses applied AFTER all penalties. AI determines which bonuses are triggered.
Maximum total bonus: +0.8 (cap enforced)
Bonus Type
Trigger Condition
Magnitude
Positive Label
Whole liquid base
Primary base is whole fruit, cold-pressed juice, brewed tea, whole milk, or coconut water (not concentrate)
+0.2 to +0.3
"Whole food liquid base"
Zero added sugar
No caloric sweetener added; any sweetness from whole fruit matrix only
+0.2 to +0.25
"No added sugars"
No synthetic additives
Zero D4/D5/D6 synthetic additive ingredients
+0.15 to +0.2
"No synthetic additives"
Beneficial pH
Beverage pH ≥ 5.0 (non-erosive range)
+0.1 to +0.15
"Tooth-friendly pH profile"
Functional probiotic content
Verified live cultures ≥ 1 billion CFU with clinical backing
+0.1 to +0.15
"Live culture benefit"
Natural botanical
Genuine herbal infusion, spice, or botanicals in top 50% of post-water list
+0.05 to +0.1
"Natural botanical component"
Low ingredient complexity
Total ingredient count ≤ 4 (post-water)
+0.05 to +0.1
"Simple, clean formulation"
Appropriate osmolality
Sports drink with isotonic or hypotonic osmolality appropriate to stated purpose
+0.05 to +0.1
"Hydration-appropriate formulation"
Balanced caffeine + L-theanine
Caffeine < 100mg + natural L-theanine present (brewed tea context) — synergistic calming effect documented
+0.05 to +0.1
"Balanced caffeine-theanine profile"


PART VI — FINAL RATING FORMULA
Step 1: AI computes Weighted Ingredient Score (1.0–5.0)
Step 2: AI identifies applicable penalties (Categories 1–9) Apply progressive decay in fixed order. Total Adjusted Penalty = Σ(Penalty × Decay Multiplier)
Step 3: AI identifies applicable bonuses. Total Bonus = Σ(Qualifying Bonuses), capped at +0.8
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
Whole-food liquid base; minimal or no industrial additives; safe pH; clean formulation
3.5–4.4
⭐⭐⭐⭐
Good
Good ingredient quality; minor concerns; acceptable processing; regular consumption supported
2.5–3.4
⭐⭐⭐
Moderate
Mixed quality; notable concerns; consume mindfully and in moderate quantity
1.5–2.4
⭐⭐
Poor
Lower quality formulation; meaningful concerns under regular consumption
1.0–1.4
⭐
Low Quality
Multiple ingredient quality issues; less favorable formulation detected

Consumption Recommendation Mapping
Rating
Recommendation
≥ 4.5
Freely consume as part of regular diet
3.5–4.4
Regular consumption acceptable
2.5–3.4
Consume occasionally — mindful quantities
1.5–2.4
Consume rarely — meaningful formulation concern
< 1.5
Limit — less favorable ingredient and processing profile


PART VII — SPECIALIZED BEVERAGE PERFORMANCE DIMENSIONS
Beyond the core rating, the AI evaluates seven beverage-specific dimensions (1.0–5.0 each). These compute internally and surface in output as 📊 KEY FORMULATION SCORES.
1. Ingredient Purity
How clean is the formulation after water? Ratio of whole/natural ingredients to synthetic additives and functional chemicals. Shorter post-water lists with recognizable, unrefined ingredients score higher.
2. Dental Safety Profile (Drink-Specific)
Evaluation of acid type, acid concentration (position in ingredient list), pH inference, sugar co-presence, and buffering capacity. Direct enamel erosion risk modeling. This dimension has no equivalent in food algorithms.
3. Metabolic Impact
Based on sugar type, glycemic profile of sweeteners, fructose load in liquid delivery context, osmolality appropriateness, and insulin response pattern. Artificial sweetener gut microbiome disruption also incorporated here.
4. Caffeine & Stimulant Safety
Caffeine quantity per serving, stimulant stack complexity (caffeine + taurine + guarana + ginseng), transparency of caffeine declaration, appropriateness for stated consumer audience.
5. Gut & Microbiome Compatibility
Presence of synthetic preservatives (microbiome disruption evidence), artificial sweetener microbiome effects, gut-disruptive emulsifiers, probiotic content (positive), and prebiotic fiber presence.
6. Cumulative Safety Risk
Modeling repeated daily consumption over weeks and months. Additive cocktail burden in liquid delivery. Chronic acid exposure. Repeated synthetic dye exposure. Cumulative glycation from sugar base.
7. Formulation Honesty
Is the drink what it appears to be? Are functional claims (electrolyte, probiotic, immune, energy) supported by actual ingredient position and quantity? Hero ingredient detection. Sugar splitting identification. Vitamin decoration check.
For output, these seven dimensions are condensed into five labeled scores:
Ingredient Purity (from Ingredient Purity)
Dental & Acid Safety (from Dental Safety Profile — drink-specific)
Metabolic & Sugar Impact (from Metabolic Impact + Caffeine Safety)
Additive & Preservative Load (from Gut & Microbiome Compatibility + Cumulative Safety Risk)
Formulation Honesty (from Formulation Honesty)

PART VIII — OUTPUT FORMAT (v2.2)
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
[pH 2.4–2.8 / pH 4.5–5.0 / Not inferable]

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
### [NEVER INFLATE SCORES FOR ABSENT CATEGORIES]

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
→ Primary formulation contributor · [sweetness/acidity/caffeine/hydration/flavor/functional benefit]

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

- [Meaningful drink formulation strength]

- [Meaningful drink formulation strength]

OR

No major formulation strengths beyond basic beverage functionality.

---

# ⚠️ THINGS TO BE AWARE OF
### [MAXIMUM 4 BULLETS]
### [USE CALM EDUCATIONAL TONE]
### [NO FEAR LANGUAGE]
### [EACH BULLET MUST RAISE A NEW CONCERN]

- [Meaningful drink formulation concern]

- [Meaningful drink formulation concern]

- [Meaningful drink formulation concern]

- [Meaningful drink formulation concern]

---

# 🛡 WHO SHOULD BE MINDFUL
### [SHOW ONLY 🔴 HIGH CONSIDERATION OR 🟡 MODERATE CONSIDERATION]
### [OMIT 🟢 GROUPS ENTIRELY]
### [ONLY SHOW GROUPS ACTUALLY RELEVANT TO THE DRINK]
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
Forbidden Words
dangerous · toxic · harmful · unsafe · avoid completely · worst · severe warning · critical danger · ultra-processed · NOVA Group · NOVA 4 · rots your teeth · poisons · chemical cocktail
Required Replacements
Original Language
AQUA Replacement
dangerous / toxic
less favorable formulation
harmful ingredient
ingredient quality concern
avoid completely
better suited for limited consumption
severe warning
worth being mindful of
rots teeth / destroys enamel
associated with enamel erosion risk under regular consumption
ultra-processed
processing-reliant / additive-engineered composition
NOVA Group 4
industrial formulation pattern / additive-heavy architecture
chemical cocktail
synthetic additive architecture

Evidence Framing Requirements
Use "associated with" rather than "causes"
Use "may contribute to" rather than "leads to"
Use "enamel erosion risk" rather than "destroys teeth"
Reserve strong language for WHO-mandated elimination items — even then, frame calmly
Caffeine is a "pharmacologically active compound" — not "drug" in consumer-facing output
Never predict disease outcomes from individual products
Communicate cumulative concerns as gradual physiological considerations, not emergencies
Tone Benchmark
Every output should read as if written by a calm, expert beverage scientist and nutritionist speaking to an intelligent adult consumer — not a health warning, not a fear campaign, not a brand advertisement.

PART X — BEVERAGE CATEGORY REFERENCE TABLE
This algorithm applies universally across all beverage categories with the following category-specific calibrations:
Category
Primary Concerns
Key Scoring Dimension
Carbonated soft drinks
Sugar load, phosphoric acid, synthetic dyes, HFCS
D1, D2, D4
Energy drinks
Caffeine stack, sugar/sweetener, synthetic dyes, acid
D7, D1, D4
Fruit juices & nectars
Concentrate vs. whole, added sugar, hero ingredient honesty
D1, D10
Flavored waters
Artificial sweetener, synthetic flavor, pH
D1, D3
Sports & electrolyte drinks
Osmolality, sodium appropriateness, sweetener type
D1, D8
Dairy beverages
Fat quality, sugar content, additive load
D1, D10
Plant-based milks
Fortification honesty, additive load, sugar content
D1, D6, D9
Tea & coffee (RTD)
Sugar added, flavor honesty, caffeine transparency
D1, D3, D7
Kombucha & fermented
Culture viability, sugar content, alcohol trace
D1, D10
Functional / wellness drinks
Hero ingredient position audit, vitamin decoration check
D9, D10
Alcoholic beverages
Out of scope for nutritional rating; flag and decline




PART XI — ANTI-MARKETING FILTER
The following signals MUST NOT improve scores and MUST be actively neutralized:
"Natural" positioning: Natural flavor ≠ nutritional quality. Lemon "natural flavor" may derive from a chemical extraction process with no measurable lemon.
"No artificial colors" claims: Using caramel color Class IV (4-MEI source) while claiming "no artificial colors" is a labeling gray zone — evaluate actual ingredient, not claim.
"Zero sugar" claims: Replaced with artificial sweeteners — evaluate sweetener burden, not sugar reduction achievement.
"Electrolyte enhanced": Trace electrolyte addition does not constitute meaningful hydration support — check position and quantity.
"Vitamin C added": Adding ascorbic acid to a sweetened drink does not make it nutritious — ascorbic acid in acidic context also contributes to enamel erosion and benzene formation risk with benzoate.
"Probiotic" claims: Without declared live CFU count ≥ 1 billion, probiotic benefit is unverifiable.
"100% juice" framing: Evaluate whether "100% juice" means cold-pressed whole fruit or reconstituted from concentrate with added flavors.
"Sports drink" positioning: Does not exempt from sugar load penalty — evaluate actual formulation vs. osmolality requirement for the stated activity context.
"Ayurvedic" or "herbal" positioning: Cultural or traditional framing carries zero scoring weight.
Premium pricing: Zero scoring impact.
"No preservatives" claim: May use high acid, high sugar, or high carbonation as functional preservation — evaluate the actual mechanism.

PART XII — BIAS NEUTRALIZATION FILTER
Neutralize all of the following before final scoring:
Natural = safe halo: Citric acid, malic acid, and phosphoric acid are all "natural" in origin — none is neutral in dental or metabolic context at high doses.
Low calorie = healthy halo: Artificially sweetened drinks carry their own penalty burden regardless of caloric reduction.
Juice = healthy halo: Juice without fiber is essentially sugar water — evaluate sugar load and delivery speed.
Green / wellness packaging halo: Packaging design carries zero scoring weight.
Sparkling water = neutral halo: Carbonation creates mild acid (carbonic acid, pH ~4.5–5.5); flavored sparkling waters may have additional acids added.
"Hydrating" claim: All liquids hydrate; hypertonic sweetened beverages are net dehydrating for cells — evaluate osmolality.
Famous brand bias: Brand recognition has zero scoring weight.
"Cold brew" or "artisan" positioning: Production style does not offset ingredient quality concerns.
"Functional" category positioning: Functional beverage category has highest marketing inflation — apply most rigorous hero ingredient position audit.
Sugar-free halo: Sugar-free using artificial sweeteners trades one concern profile for another — evaluate both, not just the sugar absence.

PART XIII — DRINK-SPECIFIC SCIENTIFIC APPENDIX
A. Enamel Erosion Risk Reference
Acid
Typical pKa
Erosion Mechanism
Phosphoric acid
2.15 (pKa1)
Strong inorganic acid; chelates calcium from enamel; bone mineral density concern at chronic intake
Citric acid
3.13 (pKa1)
Chelates salivary calcium (removes buffering protection); highly erosive despite being "natural"
Malic acid
3.40
Similar to citric; lower chelation effect
Tartaric acid
2.99
Moderate erosion; common in grape-based drinks
Carbonic acid (CO₂)
6.35 (weak)
Mildly erosive; most of erosion risk in carbonated drinks comes from added acids, not carbonation itself

B. Liquid Sugar Absorption Timeline
Sugar Type
Absorption Pathway
Peak Plasma Time
Glucose (liquid)
Direct intestinal absorption
30–45 minutes
Fructose (liquid)
Liver first-pass; no insulin trigger
45–60 minutes; hepatic only
Sucrose (liquid, acidic)
Partial hydrolysis to free fructose + glucose during shelf life
Mixed profile
HFCS (55% fructose)
Free fructose + glucose mixture; immediate liver exposure
30–45 minutes

C. Caffeine Dose Reference
Amount
Context
< 80 mg/serving
Within safe single-dose range for most adults
80–150 mg/serving
Moderate; equivalent to 1–2 cups brewed coffee
150–200 mg/serving
High single dose; not recommended for adolescents
> 200 mg/serving
Exceeds EFSA single-dose guidance for sensitive adults
> 400 mg/day cumulative
Exceeds EFSA daily safe limit for healthy adults

D. Artificial Sweetener Microbiome Evidence Summary (as of 2024)
Sweetener
Key Evidence
Saccharin
Glucose intolerance via microbiome shift in human RCT (Nature, 2022, Suez et al.)
Sucralose
Reduced Lactobacillus and Bifidobacterium; altered gut barrier in rodent and limited human studies
Acesulfame-K
Microbiome composition changes; insulin-response disruption signals
Aspartame
IARC 2B (possibly carcinogenic); gut flora alteration signals
Stevia (rebaudioside A)
Mixed evidence; currently no strong gut disruption signal at typical doses
Erythritol
Cardiovascular association in high-dose consumption (NEJM, 2023, Hazen et al.); warrants monitoring
Monk fruit (luo han guo)
Insufficient long-term evidence; currently low-concern profile


APPENDIX — ABSOLUTE OUTPUT RULES (MASTER CHECKLIST v2.2)
Before finalizing ANY output, verify:
[ ] No section repeats another section
[ ] Every formulation score includes a structural reason (1 sentence, architecture-specific)
[ ] Ingredient categories shown ONLY if detected — no absent-category inflation
[ ] No fear-based, alarmist, or shaming language used anywhere
[ ] No forbidden words present in any section
[ ] NOVA / ultra-processed terminology absent from all visible output
[ ] No Plain Language Summary section — removed in v2.2
[ ] Dental / acid evaluation is contextual — phosphoric acid ≠ citric acid ≠ carbonic acid in severity
[ ] No exact nutrient quantities estimated without official disclosure
[ ] Trace-level post-water ingredients not credited as meaningful contributors
[ ] Hero ingredient claims cross-referenced with actual post-water position
[ ] Positive signals must be genuinely earned — no consolation rewards
[ ] Better alternatives included only when rating < 3.5 OR genuinely useful
[ ] Final verdict is drink-specific — no generic conclusions
[ ] Evidence framing uses "associated with" / "may contribute to" language
[ ] Caffeine evaluated as pharmacologically active compound with dose-response context
[ ] Osmolality appropriateness evaluated against stated drink purpose
[ ] Scoring remains strict internally; only tone is calibrated externally
[ ] Output stays dense, scannable, and non-repetitive across all zones
[ ] Alcoholic beverages flagged as out of scope and declined gracefully

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
