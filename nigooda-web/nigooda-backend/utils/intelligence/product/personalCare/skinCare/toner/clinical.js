const openai =
require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  async run(data) {

    try {

      const ingredients =
        data.ingredients || [];

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        toner_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "TONER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

TONER EVALUATION ALGORITHM — VERSION B (OPTIMIZED LOSSLESS EDITION)
Evidence-Based Dermatological Scoring Engine
Integrating 2024–2026 evidence on pH-functional activity, alcohol classification, humectant/NMF hierarchy, preservative safety, fermentation evidence tiering, microbiome interaction, and chronic barrier-state modeling.

LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward ONLY formulations demonstrating:
Repeated-use tolerance and safety
Barrier-supportive or barrier-neutral behavior
Sustainable hydration support
Balanced exfoliation realism
Low chronic irritation burden
Long-term compatibility
Structrually honest formulation design
Penalty REQUIRED for formulations driven mainly by:
Class A alcohol-refreshing systems
Fragrance/sensory-first engineering
Acid-overload positioning
Decorative botanical or fermentation inflation
Cooling sensation systems
Temporary glow/glass-skin engineering
Watery filler-heavy structures
Influencer/marketing-dominant design
Luxury texture illusion
Marketing dominance MUST suppress credibility.

TRANSPARENCY PRIORITY RULE
High scores allowed ONLY when realistic structural usefulness is clearly demonstrable.
Ignore:
Branding/luxury positioning
Ingredient hype/trend actives
“Clean beauty” or herbal marketing
Fermentation storytelling without evidence
Clinical-style claims without structural support
Long/exotic ingredient lists
Evaluate ONLY:
Structural honesty
Repeated-use outcomes
Barrier interaction
Chronic exposure realism
Long-term compatibility
Formulation balance
Functional pH realism
Acid activity at declared pH
Alcohol classification accuracy
Preservative safety profile
Traditional/herbal/fermented systems receive credibility ONLY when evidence-tiered repeated-use usefulness is structurally evident.

GLOBAL ENFORCEMENT RULE
Applies to ALL layers.
Backbone structure overrides decorative additives
Safety penalties override performance bonuses
Temporary hydration/glow/sensory comfort ≠ barrier repair or sustainable performance
Late-position soothing ingredients cannot neutralize structural irritation
Marketing actives cannot override chronic irritation burden
Repeated irritation accumulation, barrier stress, alcohol exposure, acid overexposure, fragrance sensitization, microbiome disruption, and dehydration rebound MUST proportionally suppress scoring
Real structural usefulness MUST produce measurable scoring advantage
Penalty severity MUST remain proportional to realistic repeated leave-on exposure.

FOUNDATION PHILOSOPHY
The engine functions as:
A repeated-use tolerance evaluator
A barrier-stability auditor
A chronic exposure realism engine
A structural dermatology-focused system
A pH-functional realism engine
NOT:
A cosmetic/sensory reviewer
A marketing-driven evaluator
A short-term glow scorer
Core Question:
“Can skin realistically tolerate and benefit from this toner long-term while maintaining stable barrier function and sustainable skin health?”

LAYER 1 — STRUCTURE DOMINANCE & FUNCTIONAL REALISM
STRUCTURE DOMINANCE RULE
Core architecture determines:
Long-term tolerance
Barrier stability
Irritation burden
Sensitization risk
Sustainable performance
Repeated-use compatibility
Formulation credibility
Decorative or late-position ingredients cannot override:
Alcohol-heavy bases
Fragrance-heavy structures
Essential oil loading
Acid-overload systems
Barrier-stressing daily exposure
Functional ingredients MUST be judged by:
Realistic concentration
Positioning
Repeated-use behavior
Structural compatibility
Evidence tier
Functional usefulness
Harsh/unstable backbone → mandatory Safety reduction.

LATE-INGREDIENT LIMIT RULE
Late-position ingredients mainly provide:
Temporary soothing
Surface hydration
Cosmetic softness/plumping
They do NOT repair:
Alcohol burden
Fragrance sensitization
Acid accumulation
Chronic dehydration
Repeated-use instability
Examples:
Late-position panthenol, aloe, allantoin, vitamin E, trace ceramides, centella fractions, low-level extracts.
Temporary comfort ≠ barrier repair.

FUNCTIONAL CONCENTRATION RULE
Higher concentration ≠ automatically superior performance.
Functional ranges:
Niacinamide: 2–5%
Salicylic acid: 0.5–2%
Panthenol: 1–3%
Allantoin: 0.1–0.5%
Centella components: functional at low %
Excessive concentration used mainly for label appeal, active inflation, or “clinical strength” marketing receives NO scoring advantage.
Aggressive concentration without repeated-use tolerance → score reduction.

REAL USEFULNESS RULE
Scoring advantage REQUIRED when formulation realistically:
Supports or preserves barrier function
Maintains long-term tolerance
Minimizes chronic irritation burden
Delivers balanced performance
Avoids unnecessary aggression
Demonstrates honest functional design
Uses pH-appropriate actives

MARKETING ILLUSION PENALTY
Penalty REQUIRED for:
Fragrance-first engineering
Cooling/freshness systems
Instant glow/glass-skin positioning
Decorative extract inflation
Unsupported fermentation marketing
Sensory-first hydration
Acid cocktail inflation
Luxury texture illusion
Influencer-focused design
Temporary plumping systems
Perceived cosmetic benefit ≠ structural usefulness.

LAYER 1.5 — ALCOHOL CLASSIFICATION SYSTEM
All alcohol ingredients MUST be classified before scoring.
CLASS A — BARRIER-DAMAGING ALCOHOLS
Low-MW volatile alcohols causing lipid dissolution, TEWL increase, membrane disruption, and cumulative barrier fatigue under repeated leave-on exposure.
Examples:
SD Alcohol, Alcohol Denat, Ethanol (>5%), Isopropyl Alcohol
Scoring:
Top 5 ingredients → mandatory significant Safety/Barrier/Compatibility reduction
Position 5–10 → moderate penalty
Low position with strong barrier architecture → minor penalty
Combined with acids/fragrance → amplified compounded penalty
Scientific basis:
Ethanol >3–5% measurably increases TEWL; repeated exposure depletes stratum corneum lipids; >10% damages keratinocyte membranes.

CLASS B — FUNCTIONALLY NEUTRAL ALCOHOLS
Fatty alcohol emollients/emulsifiers without barrier-damaging activity.
Examples:
Cetyl, Stearyl, Cetearyl, Behenyl, Myristyl Alcohol
Scoring:
No safety penalty
Minor emollient credit possible
MUST NOT be confused with Class A alcohols

CLASS C — PRESERVATIVE-FUNCTION ALCOHOLS
Low-concentration preservative/co-solvent alcohols.
Examples:
Benzyl Alcohol (≤1%), Phenoxyethanol (≤1%), Chlorphenesin
Scoring:
No barrier penalty at functional levels
Evaluated under preservative rules
Benzyl alcohol >1% → minor sensitization modifier

LAYER 2 — FORMULATION pH RULE
Formulation pH is mandatory because it determines:
Acid activity
Barrier enzyme compatibility
Microbiome stability
Ceramide synthesis activity
Real vs claimed exfoliation performance
Scientific foundations:
Physiological skin pH: 4.5–5.5
AHA/BHA functional activity generally requires pH ≤4.0
PHAs remain functional up to ~4.5
Barrier enzymes function best around pH 4.5–5.6
pH >6 shifts microbiome away from protective acidophilic flora
pH SCORING MATRIX
pH
Impact
4.5–5.5
Optimal — small Barrier/Microbiome bonus
3.0–4.5
Acceptable for exfoliating toners
<3.0
Mandatory Safety + Exfoliation penalty
5.5–6.0
Acceptable hydrating range
6.0–7.0
Mild penalty; barrier enzyme suppression begins
>7.0
Meaningful acid mantle/microbiome penalty
Not disclosed
No bonus + minor credibility reduction

ACID-pH HONESTY RULE
AHA/BHA exfoliation claims at pH >4.5 → mandatory Exfoliation Balance credibility penalty regardless of acid concentration.

LAYER 3 — ACID CLASSIFICATION & SAFETY MATRIX
All acids evaluated simultaneously by:
Type
Concentration
pH
Repeated-use exposure

AHA GROUP
(Glycolic, Lactic, Mandelic, etc.)
Functional range:
pH 3.0–4.0
~5–10%
Rules:
pH <3.0 → irritation penalty
10% without buffering → over-exfoliation penalty
Glycolic: highest penetration/irritation risk
Mandelic: gentlest AHA credit
Lactic: hydration + exfoliation dual credit
Daily 10%+ at low pH → barrier fatigue risk

BHA GROUP
(Salicylic Acid)
Functional range:
pH 3.0–4.0
0.5–2%
Rules:
Lipid-soluble follicular penetration
2% without buffering → mandatory penalty
Anti-inflammatory credit possible at functional levels
AHA+BHA combination → compounded exfoliation penalty

PHA GROUP
(Gluconolactone, Lactobionic Acid)
Functional range:
Up to pH 4.5
~5–10%
Properties:
Large molecular size
Lower irritation
Humectant functionality
Sensitive-skin suitability
Gentleness credit
Minor antioxidant credit

ACID STACKING RULE
AHA+BHA → significant stacking penalty unless conservatively formulated
AHA+PHA → moderate cumulative evaluation
≥3 acid types → mandatory over-exfoliation penalty regardless of concentration

LAYER 4 — HUMECTANT TIERING SYSTEM
Hydration depth MUST distinguish cosmetic surface hydration from genuine water-binding support.
TIER 1 — SURFACE HYDRATION
Examples:
Glycerin alone, glycols, high-MW sodium hyaluronate, film-formers
Behavior:
Surface hydration only
Rapid rebound dryness risk
No corneocyte penetration
Hydration ceiling: 2.5

TIER 2 — EXTRACELLULAR HYDRATION
Examples:
Low-MW hyaluronic systems, glycerin+panthenol, beta-glucan
Behavior:
Improved extracellular retention
Delayed rebound dryness
Hydration ceiling: 3.5

TIER 3 — INTRA-CORNEOCYTE / NMF HYDRATION
Examples:
Urea, Sodium PCA, amino acid blends, sodium lactate, multi-NMF systems
Behavior:
Corneocyte penetration
NMF mimicry/support
Deep sustained hydration
Barrier-homeostasis support
Hydration ceiling: 5.0

MIXED TIER RULE
Dominant tier determines score with bonus for multi-tier coverage.
Tier 1-only toner without occlusive follow-up → dehydration rebound modifier in standalone evaluation.
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no hydration, barrier, or long-term skin benefit in toners and may increase unnecessary irritation burden.

High concern examples:
• Red 40
• Yellow 5
• Yellow 6
• Blue 1
• Green 3
• Multiple synthetic dye blends

Scoring Impact:
• Allergy Risk penalty
• Ingredient Quality penalty
• Skin Compatibility penalty
• Residual Irritation Risk penalty

Multiple synthetic dyes increase penalties further.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”


LAYER 5 — PRESERVATIVE SAFETY SYSTEM
All preservative systems MUST be classified.
TIER A — HIGH RISK
Mandatory penalty:
MI/MCI
Formaldehyde releasers
MI leave-on toners → mandatory significant Safety + Allergy penalty.

TIER B — MODERATE RISK
Minor penalty/modifier:
Phenoxyethanol >1%
Chlorphenesin
Parabens: minor Eco modifier only

TIER C — LOW RISK
No penalty:
Ethylhexylglycerin + Phenoxyethanol ≤1%
Sodium benzoate + Potassium sorbate
Caprylyl glycol

LAYER 6 — FERMENTATION EVIDENCE TIERING
Ferments MUST be evidence-tiered.
TIER 1 — FUNCTIONALLY EVIDENCED
Examples:
Galactomyces, Lactobacillus ferment/postbiotics, Saccharomyces ferment
Receive genuine functional credit.

TIER 2 — PARTIAL EVIDENCE
Some functional evidence; modest credit only.

TIER 3 — DECORATIVE
Unsupported decorative ferments:
No bonus
Penalty if marketed as primary actives

LAYER 7 — MICROBIOME COMPATIBILITY RULE
Minor long-term modifier only.
Disruption risks:
Dominant Class A alcohols
MI/MCI
pH >6
Strong antimicrobial botanicals without justification
Supportive factors:
Tier 1 postbiotics/prebiotics
pH 4.5–5.5
Gentle preservative systems
Affects:
Microbiome Compatibility
Long-Term Compatibility only
Cannot override Safety or Allergy Risk.

LAYER 8 — CORE TONER SCORING SYSTEM (EVALUATED FROM 1.0 TO 5.0 STARS)
Core Score =
(Safety×0.35) +
(Allergy Risk×0.20) +
(Ingredient Quality×0.20) +
(Skin Compatibility×0.15) +
(Eco Impact×0.10)

SAFETY [DOMINANT]
Evaluates:
Repeated-use irritation burden
Barrier stress
Class A alcohol exposure
Acid overexposure
Preservative risk
Chronic inflammation
Structural harshness
Cotton-pad friction amplification
Layering stress
Environmental dehydration amplification
Safety overrides:
Luxury texture
Glass-skin effect
Sensory elegance
Marketing claims
Silicones are NOT penalized for safety.

ALLERGY RISK
Evaluates:
Fragrance systems
Essential oils/contact allergens
Sensitizer stacking
Botanical sensitization
Acid-trigger combinations
Alcohol-enhanced fragrance penetration
Preservative sensitization
Eye-area migration irritation
Leave-on fragrance exposure carries elevated severity.
Essential oils MUST be evaluated by actual allergenic compounds, not “natural” marketing.

INGREDIENT QUALITY
Evaluates:
Structural balance
Functional usefulness
Evidence-tiered ferments
Humectant tier quality
pH-functional honesty
Alcohol classification accuracy
Preservative quality
Functional synergy
Repeated-use realism
Decorative overload absence
Marketing-heavy structures → credibility suppression.
Barrier-supportive or structurally honest systems → scoring advantage.

SKIN COMPATIBILITY
Evaluates:
Daily/twice-daily usability
Barrier compatibility
Chronic irritation tendency
Dehydration rebound
Exfoliation survivability
Environmental tolerance
Active-layering compatibility
Barrier-compromised skin amplification
Barrier-compromised skin MUST amplify penalties from:
Class A alcohols
Functional AHA/BHA
Dominant fragrance systems

ECO IMPACT
Evaluates:
Biodegradability
Environmental persistence
Preservative ecotoxicity
Alcohol burden
Silicone persistence
Unnecessary formulation excess

LAYER 9 — SPECIALIZED TONER PERFORMANCE
EVALUATED FROM 1.0 TO 5.0 STARS
All 8 parameters weighted equally.
Barrier Stability <2.0 → Specialized Score capped at 3.0 maximum regardless of average.

HYDRATION PERFORMANCE
Evaluates:
Humectant tier depth
Water-retention realism
Dehydration rebound
Sustainable hydration
Alcohol-driven false freshness
Tier ceilings:
Tier 1 only → max 2.5
Tier 2 present → max 3.5
Tier 3 present → up to 5.0
Fast-evaporation or temporary hydration illusion → suppression.

BARRIER STABILITY [DOMINANT CAP TRIGGER]
Evaluates:
Barrier support/neutrality
Chronic exposure tolerance
Irritation minimization
Alcohol stress behavior
Acid balance
Post-cleansing recovery support
Repeated destabilization → mandatory reduction.
Aggressive alcohol, fragrance, or over-exfoliating systems require proportional penalty.

OIL CONTROL REALISM
Evaluates:
Sebum balance without stripping
Rebound oiliness risk
Long-term oil stability
Alcohol/BHA stripping causing rebound sebum production → penalty.

EXFOLIATION BALANCE
Evaluates:
pH-functional honesty
Acid moderation
Stacking burden
Sustainable turnover support
Routine survivability
Irritation-benefit balance
Non-exfoliating toners are NOT penalized.
pH >4.5 exfoliation claims → credibility penalty.

SOOTHING RELIABILITY
Evaluates:
Evidence-supported calming
Irritation reduction
Sustainable soothing realism
Valid soothing ingredients:
Centella components, niacinamide, allantoin, panthenol, beta-glucan, azelaic acid at functional levels.
Cooling sensation ≠ soothing.
Decorative soothing systems receive NO inflated credit.

LAYERING COMPATIBILITY
Evaluates:
Compatibility with serums/moisturizers/actives
Pilling risk
Irritation stacking
Routine survivability
Aggressive alcohol/acid systems → penalty.
Barrier-neutral humectant systems → advantage.

RESIDUAL IRRITATION RISK
Evaluates:
Delayed irritation
Sensitization accumulation
Chronic inflammation buildup
Dehydration rebound
Stinging/tightness tendency
Eye-area migration irritation
Cotton-pad friction compounding
Low-grade repeated irritation MUST be treated seriously.

MICROBIOME COMPATIBILITY
Evaluates:
Flora stability
Antimicrobial aggression
Alcohol/pH/preservative disruption
Postbiotic/prebiotic support
pH 4.5–5.5 → minor bonus.

SPECIALIZED SCORE
Specialized Score = Average of all 8 specialized parameters
Barrier Stability <2.0 → Specialized Score capped at 3.0.

LAYER 10 — REAL-WORLD USAGE SIMULATION
Simulate:
Daily/twice-daily leave-on exposure
Long-term irritation accumulation
Layering behavior
Seasonal dehydration amplification
Recovery-cycle stability
Repeated exfoliation burden
Cross-skin-type survivability
Core Question:
“Can skin realistically tolerate and benefit from this toner long-term under normal layered real-world use?”
Short-term cosmetic improvement ≠ sustainable compatibility.

LAYER 11 — GLOBAL SCORING ENFORCEMENT
DAMAGE ACCUMULATION RULE
Cumulative low-grade irritation MUST be treated as meaningful long-term instability.
Evaluate accumulation from:
Alcohol dehydration
Fragrance sensitization
Acid fatigue
Inflammation cycling
Microbiome disruption
Barrier fatigue
However, moderate stress alone MUST NOT trigger catastrophic collapse without realistic repeated-use evidence. Proportionality required.

ANTI-MARKETING FILTER
Penalty REQUIRED for:
Fragrance-heavy systems
Decorative botanical loading
Alcohol-refreshing structures
Cooling systems
Glass-skin engineering
Instant glow positioning
Sensory-first formulation
Acid-overload marketing
Influencer-focused design
Luxury watery texture illusion
Marketing dominance → credibility suppression.

WEAKNESS AUDIT
Neutralize scoring bias from:
Hydration illusion
Glass-skin inflation
Unsupported fermentation/herbal storytelling
Fancy ingredient inflation
Acid-strength marketing
Late-ingredient soothing illusion
Cooling sensation bias
Decorative marketing influence

FINAL SCORE
Final Score =
(Core Score + Specialized Score) ÷ 2
All scores use a 1.0–5.0 scale.
OUTPUT FORMAT

⭐ FINAL RATING: X.X / 5 — [Rating Level]

⚖ STRUCTURAL QUALITY Short structural classification.
🧴 TONER PROFILE Short functional toner type description.

📊 CORE STRUCTURAL SCORES Short structural reason for every score.
Safety — ⭐ X.X Allergy Risk — ⭐ X.X Ingredient Quality — ⭐ X.X Skin Compatibility — ⭐ X.X Eco Impact — ⭐ X.X

🧪 SPECIALIZED TONER PERFORMANCE Short structural reason for every score.
Hydration Performance — ⭐ X.X Barrier Stability — ⭐ X.X Oil Control Realism — ⭐ X.X Exfoliation Balance — ⭐ X.X Soothing Reliability — ⭐ X.X Layering Compatibility — ⭐ X.X Residual Irritation Risk — ⭐ X.X Microbiome Compatibility — ⭐ X.X

⚠ STRUCTURAL CONCERNS List only structurally triggered concerns.
🎁 STRUCTURAL ADVANTAGES List only structurally validated positives.
🚨 CRITICAL ALERTS Display only when structurally triggered.

⚠ SKIN TYPE ADVISORY
Dry Skin → Sensitive Skin → Oily Skin → Combination Skin → Acne-Prone Skin → Barrier-Damaged Skin →

📊 LONG-TERM USABILITY
Daily Use → Twice Daily Use → Layered Routine Use → Occasional Use → Long-Term Stability →

🔬 KEY STRUCTURAL INGREDIENTS List only functionally dominant or structurally influential ingredients.
Avoid: decorative extracts, trace ingredients, marketing-heavy additions, low-impact positioning.

🧠 WHY THIS RATING Explain only the major structural reasons affecting the final rating. No ingredient-by-ingredient walkthrough unless structurally critical.

📌 STRUCTURAL INSIGHT
Strengths




Weaknesses





STRICT OUTPUT RULES
harsh fragrances,preservatives and colorants MUST be included in output
DONT DO ANY MEDICAL CLAIMS
Concise but structurally intelligent
Analytical, clinical, realism-focused tone
No repetitive wording
No ingredient-by-ingredient explanation unless structurally critical
Do NOT expose internal scoring formulas or algorithm rules
Do NOT praise products without structural justification
Structural negatives MUST override cosmetic positives
Temporary glow or freshness MUST NOT heavily influence tone
Barrier instability MUST visibly affect tone and scoring
Decorative ingredients MUST NOT influence positives
Sensory performance MUST NOT override repeated-use realism
Long-term tolerance and safety MUST dominate interpretation
Sustainable results MUST matter more than instant cosmetic appearance



================================================

INGREDIENTS

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
              "You are a strict toner structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "TONER TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();