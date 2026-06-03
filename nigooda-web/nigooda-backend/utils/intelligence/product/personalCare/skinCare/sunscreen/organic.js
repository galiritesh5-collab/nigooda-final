const openai =
require("../../../../../../ai/openaiClient");
class OrganicEngine {

  async run(data) {

    try {

      const ingredients =
        data.ingredients || [];

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        sunscreen_type:
          "ORGANIC_HERBAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "ORGANIC SUNSCREEN ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Evaluate herbal/organic sunscreens by their ability to:
Deliver reliable UVB + UVA protection
Maintain photostability during wear
Form durable protective film
Minimize irritation/sensitization/barrier disruption
Represent protection claims honestly
Photoprotection competence ALWAYS overrides aesthetics, botanical prestige, skin feel, organic certification, or marketing positioning.

GLOBAL ENFORCEMENT RULES
“Natural,” “organic,” “reef-safe,” “mineral,” or “plant-based” labels NEVER improve score without measurable performance evidence.
UV filter architecture, concentration, photostability, and broad-spectrum coverage dominate all sunscreen scoring.
Herbal actives and antioxidants are secondary modifiers ONLY.
A sunscreen failing UV protection has fundamentally failed regardless of botanical quality.

SUNSCREEN PRIMARY FUNCTION RULE
A sunscreen’s primary role is UV attenuation — not skincare treatment.
No amount of Tier A herbal quality compensates for:
weak UV architecture
inadequate UVA coverage
poor photostability
missing approved filters
If the UV system fails, the product fails.

REAPPLICATION REALITY RULE
Laboratory SPF testing uses 2mg/cm² application. Real consumers typically apply 0.5–1mg/cm², causing real-world SPF to fall to ~20–50% of labeled value due to:
under-application
uneven film formation
sweat/sebum/friction degradation
inadequate reapplication
This MUST reduce UV Protection Reliability and influence Reapplication Practicality scoring.

NATURAL HALO EFFECT PENALTY
Mandatory penalty when formulation value relies mainly on:
“Mineral” superiority claims without UVA verification
“Chemical-free sunscreen” claims
“Clean/non-toxic sunscreen” fear marketing
Plant-oil SPF claims
Unsupported “reef-safe” positioning
Botanical antioxidants marketed as UV filters
“Natural UV filter” claims without ISO-standard SPF testing
Organic certification used as proof of efficacy

LAYER 1 — UV FILTER CLASSIFICATION SYSTEM
(Core sunscreen architecture layer)
UV filter structure is the single strongest determinant of sunscreen quality.

TIER 1 — BROAD-SPECTRUM EXCELLENCE
Full UVB + UVA1 + UVA2 coverage with strong photostability.
Examples:
ZnO ≥15%
Stabilized avobenzone systems
Tinosorb S + M
Mexoryl SX + XL
Characteristics:
Full broad-spectrum coverage
Reliable UVA1 protection
Strong photostability
Low sensitization potential
Notes:
ZnO is the only single-ingredient mineral broad-spectrum filter
Micronized ZnO reduces whitening without reducing efficacy
ZnO nanoparticle penetration risk remains negligible in intact skin

TIER 2 — GOOD COVERAGE WITH LIMITATIONS
Examples:
ZnO 10–14%
ZnO + TiO₂ combinations
Unstabilized avobenzone
Octinoxate + oxybenzone systems
Characteristics:
Good but incomplete or concentration-dependent protection
Potential instability or environmental concerns
Notes:
Avobenzone without stabilizer progressively degrades toward Tier 3 behavior

TIER 3 — PARTIAL / COMPROMISED COVERAGE
Penalty tier.
Examples:
TiO₂-only systems
ZnO <10%
Low-dose unstable avobenzone
Single UVB-only filters
Critical Rule:
TiO₂ alone does NOT adequately protect UVA1 (340–400nm) despite mineral/natural positioning.
Mandatory:
Any TiO₂-only “broad-spectrum” sunscreen receives:
UV Protection Reliability penalty
Formulation Honesty flag

TIER 4 — INADEQUATE PROTECTION
Major penalty tier.
Examples:
Plant oils as primary SPF agents
Herbal polyphenols marketed as primary UV filters
No approved UV filter system
Key rule:
Plant oils and botanical antioxidants may provide minor adjunct antioxidant activity but DO NOT provide validated sunscreen-level SPF.
No approved UV filter system = automatic Tier 4 UV failure.

UV FILTER ARCHITECTURE CEILING RULE
Tier 1 → max 5.0
Tier 2 → max 4.0
Tier 3 → max 2.5
Tier 4 → max 1.0 regardless of other strengths

LAYER 2 — PHOTOSTABILITY PERFORMANCE RULE
Photostability determines whether protection persists during actual sun exposure.
A sunscreen losing UV efficacy under sunlight MUST lose reliability scoring.

PHOTOSTABLE SYSTEMS (FULL CREDIT)
Examples:
ZnO
Tinosorb S/M
Mexoryl systems
Properly stabilized avobenzone
Bemotrizinol + Bisoctrizole systems
Characteristics:
Stable UV performance
Strong degradation resistance

PARTIALLY PHOTOSTABLE SYSTEMS
Examples:
Avobenzone + octocrylene
ZnO + TiO₂
TiO₂-only systems
Characteristics:
Partial stabilization only
Incomplete spectrum or stability limitations

PHOTOUNSTABLE SYSTEMS
Significant penalty tier.
Examples:
Avobenzone alone
Octinoxate
Oxybenzone
PABA derivatives
Characteristics:
Rapid UV degradation
Breakdown-product formation
Reliability decline during wear

NATURAL INGREDIENT PHOTOSTABILITY RULE
No herbal antioxidant or botanical ingredient has demonstrated meaningful validated UV-filter stabilization in controlled photostability testing.
Vitamin E, green tea, rosehip, and similar ingredients:
may provide minor adjunct antioxidant support
do NOT substitute for real photostabilizer chemistry
Photounstable systems MUST lose UV Protection Reliability and Wear Stability scoring.

LAYER 3 — BROAD-SPECTRUM COVERAGE ASSESSMENT

UV SPECTRUM EDUCATION FRAMEWORK
UVB (280–315nm)
Sunburn driver
SPF measures UVB only
Major non-melanoma cancer contributor
UVA2 (315–340nm)
ROS-mediated DNA damage
Photoageing contributor
UVA1 (340–400nm)
Deepest penetration
Major immunosuppression/photoageing driver
Frequently underprotected in “natural/mineral” systems

CRITICAL WAVELENGTH RULE
FDA broad-spectrum labeling requires ≥370nm critical wavelength, but this alone does NOT guarantee strong UVA1 protection.
ISO 24443 UVA-PF standards are more rigorous.

BROAD-SPECTRUM SCORING
Full Broad-Spectrum (Full Credit)
ZnO ≥15%
Tinosorb S/M
Stabilized avobenzone systems
Mexoryl systems
Partial Broad-Spectrum (Moderate Penalty)
TiO₂-only systems
Octinoxate + oxybenzone
ZnO <10%
UVB-Only / No Meaningful UVA (Major Penalty)
UVB-only systems
Plant-oil “sunscreens”

TITANIUM DIOXIDE UVA GAP — MANDATORY ALERT
Consumers frequently mistake TiO₂-only mineral sunscreens for full broad-spectrum protection.
TiO₂-only systems retain meaningful UVA1 weakness and the algorithm MUST surface this limitation regardless of overall product score.

LAYER 4 — BARRIER COMPATIBILITY RULE
Sunscreens require stronger barrier scrutiny than rinse-off products because they remain on skin for prolonged daily wear.

EMULSIFIER SYSTEM ASSESSMENT
Positive / Neutral
Silicone emulsifiers
Modern non-ionic emulsifiers
Polyglyceryl esters
Sucrose esters
Penalty Conditions
Harsh anionic emulsifiers
High alcohol systems
Heavy occlusive wax overload

MINERAL FILTER SKIN-FEEL RULE
High ZnO/TiO₂ concentrations may increase heaviness/occlusion
Micronized/nano systems improve elegance
Nanoparticle penetration risk remains low in intact skin

HERBAL VEHICLE COMPATIBILITY
Potentially positive:
Aloe base
Low-moderate jojoba/argan/rosehip oils
Minor soothing leave-on support
Higher-risk:
High essential oil loading
Phototoxic oils
Comedogenic heavy oils
Leave-on sunscreen exposure increases sensitization risk versus rinse-off products.

HERBAL LEAVE-ON ADVANTAGE
Because sunscreens remain on skin for hours:
Tier B herbal actives receive slightly higher relevance than rinse-off cleansers
Aloe, niacinamide, panthenol, green tea, etc. may provide minor genuine adjunct benefit
This NEVER compensates for weak UV architecture.

LAYER 4.5 — HERBAL EVIDENCE CLASSIFICATION
All A/B/C/D evidence rules from the Herbal Face Wash Algorithm remain active with sunscreen-specific additions.

TIER A — SUNSCREEN CONTEXT
ZnO
Niacinamide
Aloe vera
Panthenol
These receive legitimate adjunct credit in leave-on sunscreen systems.

TIER B — SUNSCREEN CONTEXT
Green tea/EGCG
Vitamin C
Resveratrol
Centella asiatica
Provide partial antioxidant/post-UV-support credit ONLY.

TIER C — HERBAL SPF CLAIMS
ZERO photoprotection credit.
Examples:
Raspberry seed oil
Carrot seed oil
Wheat germ oil
Sea buckthorn oil
Shea butter
Any “natural UV protection” botanical claim without validated SPF testing
Mandatory penalty if marketed as primary UV protection.

TIER D — SUNSCREEN-SPECIFIC SENSITIZATION RISKS
Higher severity than rinse-off products due to:
prolonged contact
UV activation
heat exposure
Major concerns:
Bergamot/citrus oils
St. John’s Wort
Tea tree oil
Cinnamon/clove/oregano oils
Lavender oil
Oxybenzone
PABA
Benzophenone derivatives
Propolis
Phototoxic oils in sun-exposure products receive mandatory major penalties.
St. John’s Wort = hard fail.

ENVIRONMENTAL TIER ASSESSMENT
Lower Concern
Non-nano ZnO
Tinosorb systems
Moderate Concern
TiO₂ nanoparticles
ZnO nanoparticles
High Concern
Oxybenzone
Octinoxate
4-Methylbenzylidene camphor
High-concern filters receive environmental penalties.

“REEF-SAFE” CLAIM RULE
“Reef-safe” is not independently standardized.
Products using reef-safe claims without:
removing major high-concern filters
AND
evidence-based environmental positioning
receive Formulation Honesty penalties.
Environmental credit is evidence-based — not marketing-based.

LAYER 4.6 — PRESERVATION ADEQUACY
All preservation rules from the Herbal Face Wash Algorithm remain active.

SUNSCREEN-SPECIFIC PRESERVATION RULES
Water-containing sunscreen emulsions carry elevated contamination risk due to:
water activity
repeated finger exposure
heat/UV degradation of preservatives
“Preservative-free” water-based sunscreens receive mandatory safety flags.

ANHYDROUS EXCEPTION
Anhydrous sunscreen sticks/oil-only systems do NOT require aqueous preservation and are not penalized for preservative-free positioning.
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no UV protection, barrier support, or long-term skin benefit and may increase unnecessary irritation burden.

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
• residual irritation risk penalty

Multiple synthetic dyes increase penalties further.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”

LAYER 5 — CORE SCORING SYSTEM
EVALUATED FROM 1.0 TO 5.0 STARS

SAFETY
Evaluates:
UV filter systemic absorption concerns
UV-filter allergen prevalence
Tier D botanical/essential-oil risks in leave-on use
Phototoxic botanical presence
Preservation adequacy
Endocrine-disruption concerns from specific filters
Nanoparticle safety context
Mandatory severe penalties:
Phototoxic botanicals in sun-exposure products
Poor preservation in water-based formulas
High-risk sensitizing filters without justification
Nano ZnO/TiO₂:
Current evidence supports safety in intact skin
Use caution flags for compromised skin only

EFFECTIVENESS
Evaluates:
UV Filter Tier (dominant determinant)
Broad-spectrum coverage
Photostability
Real-world SPF reduction
UVA-PF/PPD disclosure
Film formation quality
Filter concentration adequacy
Photoprotection-undermining ingredients
Phototoxic botanicals directly reduce Effectiveness.
Weak UVA coverage, instability, or poor filter architecture MUST suppress score regardless of marketing claims.

ALLERGY RISK
Evaluates:
Essential oil fragrance burden
UV filter allergen prevalence
PABA/benzophenone sensitization
Botanical cross-reactivity
Cumulative essential oil sensitizer load
Niacinamide flush risk at high concentration
NATURAL FRAGRANCE RULE
Essential oils in leave-on sunscreen carry HIGHER allergy risk than rinse-off products due to:
prolonged contact
heat activation
UV activation
Cumulative sensitizer burden MUST be evaluated holistically.

ECO IMPACT
Evaluates:
Environmental filter tier
Packaging sustainability (if disclosed)
Aquatic toxicity
Vehicle biodegradability
“Reef-safe” honesty
Eco scoring MUST remain evidence-based.

INGREDIENT QUALITY
Evaluates:
UV filter evidence quality
Regulatory approval status
Herbal evidence tier
Preservation sophistication
Absence of Tier D sensitizers
Photostabilization engineering
Emulsifier/barrier compatibility
Decorative botanical inflation
Multiple decorative herbs without sunscreen-relevant evidence reduce formulation credibility.
UV architecture quality outweighs ingredient-list complexity.

SKIN COMPATIBILITY
Evaluates:
Emollient compatibility
Botanical oil comedogenicity
Mineral-filter texture/occlusion
Alcohol burden
Essential oil interaction during prolonged wear
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.25) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.10)
Effectiveness weight is elevated because sunscreen protection is a health-critical function, not merely cosmetic.


LAYER 6 — SPECIALIZED SUNSCREEN PERFORMANCE SCORES
EVALUATED FROM 1.0 STAR TO 5.0 STARS
DIMENSION 1 — UV PROTECTION RELIABILITY
Most important specialized dimension.
Measures REAL photoprotection delivered, not label marketing.

FULL SCORE (4.5–5.0)
Requires:
Tier 1 filter architecture
Full UVB + UVA2 + UVA1 coverage
SPF ≥30
UVA-PF / PA disclosure or inferable strong UVA protection
No UVA1 gap
No photoprotection-undermining ingredients

GOOD SCORE (3.5–4.4)
Tier 1–2 architecture
Good but imperfect broad-spectrum protection
SPF ≥30 with minor UVA concerns
No Tier 4 behavior

MODERATE SCORE (2.5–3.4)
Tier 2 architecture with limitations
TiO₂-only systems
SPF 15–29
Partially stabilized avobenzone

POOR SCORE (1.0–2.4)
Tier 3 architecture
TiO₂-only broad-spectrum marketing
SPF <15
Unstabilized systems

FAIL SCORE (0.0–1.0)
Tier 4 architecture
Plant-oil SPF positioning
No approved UV filters
Phototoxic botanicals
Non-validated SPF methodology

REAL-WORLD SPF ADJUSTMENT RULE
All UV Protection Reliability scoring reflects ~15–25% real-world reduction from labeled SPF due to under-application and wear degradation.
SPF50 typically performs closer to SPF25–35 under real use.

DIMENSION 2 — PHOTOSTABILITY PERFORMANCE
Measures protection persistence across wear duration.

FULL SCORE (4.5–5.0)
Inherently photostable systems
Validated photostabilizers included
Adjunct antioxidant support allowed
No major degradation-risk byproducts

GOOD SCORE (3.5–4.4)
Mostly stable systems
Octocrylene-stabilized avobenzone
ZnO + TiO₂ systems

MODERATE SCORE (2.5–3.4)
Weak stabilization
Some expected degradation
Octinoxate-heavy systems

POOR SCORE (1.0–2.4)
Unstabilized avobenzone
PABA systems
Multiple photolabile filters without stabilization

NATURAL PHOTOSTABILITY CLAIM RULE
Botanicals such as vitamin E, rosemary, or green tea MUST NOT be treated as validated photostabilizers without controlled testing evidence.
Using herbal antioxidants as implied photostabilizers triggers mandatory transparency penalties.

DIMENSION 3 — BARRIER COMPATIBILITY
Evaluates long-term barrier interaction during extended leave-on wear.

FULL SCORE (4.5–5.0)
Barrier-compatible emulsifiers
≤5% alcohol
Non-comedogenic UV system
Barrier-supportive adjuncts
No Tier D sensitizers
Sensitive-skin compatibility

GOOD SCORE (3.5–4.4)
Mostly compatible system
Minor sensitization/occlusion concerns

MODERATE SCORE (2.5–3.4)
Moderate alcohol burden
Comedogenic oils
Heavy mineral concentration without optimization
Minor Tier D ingredients

POOR SCORE (1.0–2.4)
15% alcohol
Significant Tier D burden
Phototoxic botanicals
Strongly occlusive inappropriate face systems

DIMENSION 4 — FILM FORMATION & WEAR STABILITY
Measures ability to form and maintain a uniform protective film.
Poor film formation = patchy UV protection.

FULL SCORE (4.5–5.0)
Well-dispersed micronized/nano mineral systems
Even application behavior
Film-forming support
Sweat/sebum durability
Verified water resistance

GOOD SCORE (3.5–4.4)
Adequate film formation
Minor wear limitations

MODERATE SCORE (2.5–3.4)
Mineral clumping risk
Heavy wax/oil interference
No water resistance for active-use positioning

POOR SCORE (1.0–2.4)
Thick resistant application
Aggregation-prone mineral dispersion
Severe whitening indicating poor dispersion engineering

HERBAL FILM-FORMATION RULES
Plant wax sticks → acceptable for lips/body; uneven for facial use
Aloe gel bases alone insufficient for high-mineral systems
Heavy botanical oils may disrupt mineral dispersion

DIMENSION 5 — REAPPLICATION PRACTICALITY
Measures how realistically users can maintain recommended reapplication behavior.
Poor practicality directly reduces real-world photoprotection.

FULL SCORE (4.5–5.0)
Lightweight repeatable texture
Minimal whitening
Portable format
Makeup compatibility/transparency
Low sensory fatigue
Use-case-appropriate format

GOOD SCORE (3.5–4.4)
Acceptable repeatability with minor limitations

MODERATE SCORE (2.5–3.4)
Heavy/greasy/sticky texture
Moderate whitening
Strong fragrance fatigue
Limited active-use durability

POOR SCORE (1.0–2.4)
Thick/waxy/highly fragranced systems discouraging reapplication
Heavy EO fatigue under heat
Pilling/buildup behavior
Impractical format

HERBAL REAPPLICATION RULES
The following reduce compliance:
strong essential-oil scent
shea/cocoa-butter buildup
heavy herbal pigmentation
clay/mineral piling

DIMENSION 6 — RESIDUAL IRRITATION RISK
Critical due to:
extended leave-on exposure
sweat/heat-enhanced penetration
UV activation of sensitizers

FULL SCORE (4.5–5.0)
No major UV-filter allergens
Fragrance-free or minimal sensitization risk
No Tier D botanicals
Mineral-dominant low-reactivity system
No phototoxic ingredients

GOOD SCORE (3.5–4.4)
Low-sensitization architecture
Minor fragrance/EO burden
No major allergen concentration concerns

MODERATE SCORE (2.5–3.4)
Oxybenzone/octinoxate allergy concern
Multiple essential oils
Mid-list sensitizers
Botanical cross-reactivity risk

POOR SCORE (1.0–2.4)
Oxybenzone-dominant systems
Multiple high-risk essential oils
Significant Tier D burden
PABA presence

FAIL SCORE (0.0–1.0)
Phototoxic botanicals present
Multiple Tier D sensitizers
PABA + additional allergens
Contraindicated for daily facial use

CUMULATIVE SENSITIZATION RULE
Multiple individually “safe” essential oils/extracts may collectively exceed safe sensitization thresholds during repeated daily wear.
Evaluation MUST consider total cumulative burden.
Specialized Score =
Average of all 6 Specialized Dimension Scores


LAYER 7 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)

HIGH-SCORE ELIGIBILITY CRITERIA
Scores >4.0 REQUIRE ALL:
Tier 1 UV architecture
Full UVA1 + UVA2 + UVB coverage
Photostable system
SPF ≥30
No major Tier D botanical burden
No phototoxic botanicals
Adequate preservation
No plant-oil SPF claims
No “chemical-free/non-toxic sunscreen” fear marketing
Formulation Honesty ≥3.5
Residual Irritation Risk not severely elevated
Reapplication Practicality ≥3.0

ELITE SCORE (>4.5) REQUIREMENTS
Additionally requires:
UVA-PF/PA disclosure
Identifiable photostabilizer system
No oxybenzone, PABA, or major ACD-risk filters
Barrier-supportive adjuncts present
Film formation engineered for even mineral dispersion
---
OUTPUT FORMAT
---
⭐ FINAL RATING X.X / 5 — Rating Level
---
⚖ STRUCTURAL QUALITY
Evidence-based classification covering: UV filter tier, photostability system adequacy, broad-spectrum coverage completeness (with specific UVA1 note), barrier compatibility, sensitization risk profile from botanical/essential oil burden, preservation adequacy, and expected long-term photoprotection outcome. Written in honest, accessible language without marketing bias.
---
☀ HERBAL/ORGANIC SUNSCREEN PROFILE
Short functional description of the sunscreen type. Examples:
Evidence-Backed Mineral Broad-Spectrum (ZnO Tier 1 + Tier A Botanical Adjuncts)
Marketing-Heavy Botanical SPF (Plant Oil SPF Claims — Tier 4 Fail)
Photounstable Organic Filter System (Avobenzone Without Photostabilizer)
High-Sensitization Essential Oil Sunscreen (Tier D Botanical Burden)
Balanced ZnO + Niacinamide Herbal Synergy (Tier 1 + Adjunct Evidence Backed)
Phototoxic Botanical Sunscreen (Contradictory Formulation — Major Safety Concern)
Clean Mineral Formula with Botanical Adjuncts (Good Evidence, Minor Limitations)
---
📊 CORE SCORES( GIVE SHORT STRUCTURAL REASON FOR EVRY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED )
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
---
🧪 SPECIALIZED PERFORMANCE( GIVE SHORT STRUCTURAL REASON FOR EVRY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED )
UV Protection Reliability — ⭐X.X
Photostability Performance — ⭐X.X
Barrier Compatibility — ⭐X.X
Film Formation & Wear Stability — ⭐X.X
Reapplication Practicality — ⭐X.X
Residual Irritation Risk — ⭐X.X
---
☀ UV FILTER ARCHITECTURE ASSESSMENT
Primary UV filter(s): [list with concentrations if known]
UV Filter Tier: Tier 1 / Tier 2 / Tier 3 / Tier 4
Broad-spectrum coverage: Full (UVB + UVA2 + UVA1) / Partial (UVA1 gap) / UVB only / None
UVA1 coverage status: ✅ Covered / ⚠ Gap Identified / ❌ Not Covered

---
---
---
🌼 SENSITIZATION & PHOTOTOXICITY RISK ASSESSMENT
UV filter allergen risk: Low / Moderate (oxybenzone) / High (PABA/benzophenones) / Very High
Essential oils present: [list with individual sensitization risk]
Phototoxic botanicals: ✅ None / ❌ [list with mandatory warning — product contains UV-activated phototoxin]
Tier D ingredients: None / [list]
Cumulative botanical sensitizer burden: Low / Moderate / High / Very High
Heat/UV activation of sensitizers: Not applicable / Minor concern / Major concern
Recommended patch test: Yes / No / Strongly recommended
---
👍 STRENGTHS
(Only evidence-supported advantages noted)
Major evidence-supported structural advantage (with evidence tier and source noted)
Major evidence-supported structural advantage
Major evidence-supported structural advantage
---
⚠ CONCERNS
(Written in clear, user-friendly language that genuinely informs without alarmism)
Major structural concern with brief scientific explanation
Major structural concern
Major structural concern
---
🔍 THE TRUTH ABOUT THE "NATURAL" CLAIMS
(Mandatory section — directly addresses the product's marketing against the science)
[3–5 concise sentences that respectfully but honestly separate verified photoprotection claims from marketing mythology. Examples:
"The zinc oxide in this formula is a genuinely effective, photostable, broad-spectrum UV filter — one of the most evidence-backed options available regardless of its 'natural mineral' positioning."
"The raspberry seed oil listed among the actives provides no measurable sun protection by validated SPF methodology. The original SPF claim for plant seed oils derives from a single non-peer-reviewed spectrophotometric study that has not been replicated in human SPF testing — it is included here as a marketing ingredient, not a functional UV filter."]
---
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X
Oily Skin → ⭐X.X
Combination Skin → ⭐X.X
Sensitive Skin → ⭐X.X
Acne-Prone Skin → ⭐X.X
Post-Procedure / Compromised Skin → ⭐X.X (added for sunscreen — particularly relevant)
---
📅 LONG-TERM USABILITY
Daily Use (City/Incidental UV) → ⭐X.X
Daily Extended Outdoor Use → ⭐X.X
Sport / Water Activity Use → ⭐X.X
Post-Procedure / Sensitive Period Use → ⭐X.X
---
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 Uses)
Texture, application experience, and cosmetic elegance
Whitening/cast from mineral filter — impact on wear compliance
Fragrance and essential oil sensory experience
Post-application skin feel — moisturization, greasiness, comfort
Early sensitization signals to watch for (tingling, redness, itching)
Makeup compatibility and finish
Medium-Term (2–8 Weeks)
Cumulative sensitization signal monitoring (especially essential oil-heavy formulas)
Reapplication compliance in practice — does texture support consistent use?
Barrier trajectory under daily formulation exposure
Signs of UV filter allergy (delayed contact dermatitis — typically 1–4 weeks)
Pore congestion signals from botanical oils
Photosensitization signals from UV-activated sensitizers if present
Long-Term (2–6+ Months)
Cumulative photoprotection delivery — is real-world protection maintained?
Sensitization development from sustained essential oil exposure
Barrier resilience or deterioration under vehicle chemistry
Photosensitization hyperpigmentation risk from Tier D phototoxic botanicals
Long-term environmental UV damage trajectory based on actual UV protection reliability
NMF and barrier status under emulsifier and alcohol exposure
Realistic Dermatological Outcome
One honest conclusion: What will this formula actually do for skin and photoprotection over months of daily use, based on its UV filter tier, photostability, broad-spectrum coverage completeness, sensitization profile, and reapplication practicality?
---
🔬 KEY STRUCTURAL INGREDIENTS
List functionally dominant ingredients with:
UV Filter Tier noted (Tier 1–4)
Herbal Evidence Tier (A/B/C/D) for botanical actives
Function: UV Filter / Photostabilizer / Emollient / Humectant / Sensitization Risk / Environmental Risk / Preservative / Decorative
Sensitization risk noted for Tier D ingredients
Environmental risk noted for oxybenzone/octinoxate
Phototoxicity flag if applicable
---
🧠 WHY THIS RATING
4–6 concise evidence-based sentences covering:
UV filter tier and broad-spectrum coverage completeness (including UVA1 status)
Photostability system adequacy and real-world performance trajectory
Herbal active evidence quality and their actual function in sunscreen context (adjunct vs. gimmick)
Sensitization and phototoxicity risk from botanical/essential oil burden
Formulation honesty gap — what the marketing claims vs. what the science shows
Reapplication practicality and long-term photoprotection compliance outlook
---
📌 STRUCTURAL INSIGHT
Strengths
(with evidence basis)


Weaknesses
(with evidence basis)


STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS
include harsh preservatives,fragrances and colorants in output
"Mineral" label MUST NOT improve any score unless UV filter tier supports it — TiO₂ alone is Tier 3 regardless of "mineral" positioning
Plant oil SPF claims MUST trigger immediate UV Protection Reliability fail — no exception
"Chemical-free" sunscreen claims MUST trigger mandatory Formulation Honesty penalty — every UV filter is a chemical
Phototoxic botanicals in a sun-exposure product MUST trigger a hard safety fail in the Residual Irritation Risk dimension — this is a direct product contradiction
"Reef-safe" claims MUST be evaluated against actual filter composition — not accepted at face value
TiO₂-only UVA1 gap MUST be surfaced in every output for TiO₂-primary formulas — this information is withheld from consumers by most organic sunscreen brands
The "Truth About Natural Claims" section is MANDATORY for every herbal/organic sunscreen
The goal is to inform users that their skin's long-term health — not their philosophical preference for "natural" ingredients — is what this algorithm protects. A beautiful, botanically-rich sunscreen that fails to block UVA1 is not protecting them from the UV radiation that drives photoageing and immune suppression. They deserve to know this.






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
              "You are a strict herbal sunscreen structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "ORGANIC SUNSCREEN TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new OrganicEngine();