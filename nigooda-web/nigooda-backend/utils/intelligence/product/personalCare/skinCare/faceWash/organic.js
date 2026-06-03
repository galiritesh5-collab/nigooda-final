/*
=====================================================
ORGANIC / HERBAL FACE WASH ENGINE
=====================================================

RESPONSIBILITIES

1. Receive cleaned ingredients
2. Run herbal / ayurvedic structural analysis
3. Generate final structured output

=====================================================
*/

const openai =
  require("../../../../../../ai/openaiClient");

class OrganicEngine {

  /*
  =====================================================
  MAIN PIPELINE
  =====================================================
  */

  async run(data) {

    try {

      const ingredients =
        data.ingredients || [];

      /*
      ================================================
      FINAL ANALYSIS
      ================================================
      */

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      /*
      ================================================
      FINAL RESPONSE
      ================================================
      */

      return {

        cleanser_type:
          "ORGANIC_HERBAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "ORGANIC ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  /*
  =====================================================
  GPT ANALYSIS
  =====================================================
  */

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
FULL ALGORITHM — VERSION 1.1 (OPTIMIZED)
⚠ NATURAL HALO RULE
"Natural", "Organic", "Herbal", "Ayurvedic", "Plant-Based", and "Chemical-Free" are marketing terms, not quality indicators.
Core Principles:
• Natural ingredients may be beneficial or harmful
• Natural origin does not guarantee safety, gentleness, or efficacy
• "Chemical-free" claims are scientifically invalid
• Traditional use ≠ clinical evidence
• Synthetic ingredients may outperform natural alternatives in safety/efficacy
• Herbal formulas are scored on evidence quality, formulation structure, safety, functional performance, and rinse-off realism
• Herbal mythology, fear marketing, pseudoscience, or decorative botanical inflation receive penalties
GLOBAL OVERRIDE RULES
• Natural origin never overrides safety, pH, irritation, preservation, or surfactant penalties
• Plant-derived sensitizers are penalized equally to synthetic sensitizers
• Herbal additives cannot neutralize structural surfactant harshness or pH-mediated barrier disruption

LAYER 0 — HERBAL FOUNDATION
Natural Halo Penalties (Mandatory)
Apply penalties for:
• Unsupported "natural/organic" superiority claims
• "Chemical-free" marketing
• Undefined "no harmful chemicals" claims
• Plant origin presented as proof of safety
• Traditional/ancient medicine claims without controlled evidence
Natural ≠ Safe Penalties
Apply penalties for:
• High essential oil burden
• High-pH soap systems
• High-position sensitizing botanicals
• Unsafe preservative-free water formulas
• Phototoxic botanicals without disclosure

LAYER 1 — SURFACTANT CLASSIFICATION
Tier System
Tier
Type
Examples
1 (Harshest)
Anionic soap/SLS
SLS, SLES, soap salts
2
Moderate anionic
Sodium lauroyl sarcosinate
3
Mild amphoteric/nonionic
CAPB, glucosides
4 (Mildest)
Ultra-mild/amino acid
Sodium cocoyl glutamate, SLMI

Herbal Soap Rule
Saponified oils (coconut, olive, castor, castile) = Tier 1-equivalent surfactant systems with pH 9–10.
Soap Oil Composition Sub-Classification
Tier
Oil Composition
Barrier Preservation Ceiling
S1
>60% lauric/myristic
1.5
S2
Coconut 40–60% + oleic-dominant oils
2.0
S3
Coconut <40% + meaningful oleic/linoleic/ricinoleic content
2.5

Soap systems:
• Receive full soap-pH penalties
• Receive no "natural cleansing" bonus
• Are evaluated equivalently to synthetic soap systems
Saponin Exception
Soapnut/reetha/quillaja systems may receive Tier 3-equivalent credit only when:
• pH is controlled
• Surfactant concentration is appropriate
• Barrier disruption remains low
Otherwise evaluate based on measured/inferred pH.

LAYER 2 — pH SCORING
pH Range
Assessment
4.5–6.5
Ideal
6.5–7.5
Acceptable
7.5–9.0
Elevated — moderate barrier concern
9.0–10.0
High soap-range concern
>10.0
Severe penalty

Natural Soap pH Rule
Traditional herbal soaps/castile cleansers typically pH 9–10 and receive skin-type-stratified penalties.
Skin Type
Modifier
Sensitive/Eczema/Rosacea
Full penalty
Dry
High penalty
Normal
Moderate penalty
Oily/Seborrheic
Moderate-low penalty
Acne-prone
Moderate penalty

Herbal additives cannot override pH-mediated barrier disruption.
Herbal pH Inference Benefit
Acidic/fermented ingredients (fermented rice water, fruit acids, apple cider vinegar) may support lower pH only when:
• Combined with Tier 3–4 surfactants
• Overall irritation risk remains acceptable

LAYER 3 — RINSE-OFF ACTIVE EFFICACY
Herbal Active Categories
Category A — High Efficacy (Full Credit)
Examples:
• Willow bark salicylic acid
• Tea tree oil (0.5–2%)
• Sulfur
• Zinc derivatives
Rules:
• Demonstrated rinse-off functionality required
• Tea tree requires sensitization assessment
Category B — Partial Efficacy (Reduced Credit)
Examples:
• Neem
• Aloe vera
• Green tea
• Natural panthenol
• Vegetable glycerin
Rules:
• Limited residual/post-rinse benefit
• Partial effectiveness credit only
Category C — Decorative / Low Efficacy
Examples:
• Turmeric
• Saffron
• Plant collagen
• Rose water
• Bakuchiol
• Most "brightening/detox" herbs
Rules:
• Minimal rinse-off functionality
• Hero-claim marketing triggers Ingredient Quality + Formulation Honesty penalties
• Natural origin does not override rinse-off limitations
LAYER 4 — MICROBIOME ASSESSMENT
Herbal Antimicrobial Assessment
Moderate/High Disruption Risk:
• High tea tree oil
• Neem oil
• Eucalyptus oil
• Oregano oil
• Clove oil
• Thyme oil
• Cinnamon oil
Lower Disruption Risk:
• Low-concentration lavender oil
• Fermented plant extracts
• Plant prebiotics
• Aloe vera
Rules:
• Broad-spectrum antimicrobial activity reduces Microbiome Compatibility regardless of natural origin
• Concentration and exposure frequency influence disruption severity

LAYER 4.5 — HERBAL EVIDENCE CLASSIFICATION
Tier A — Strong Clinical Evidence (Full Credit)
Examples:
• Tea tree oil
• Willow bark salicylic acid
• Zinc
• Sulfur
• Aloe vera
• Panthenol
• Green tea polyphenols
Rules:
• Controlled evidence required
• Eligible for evidence-based active credit
• Rinse-off limitations still apply
Tier B — Moderate Evidence (Partial Credit)
Examples:
• Neem
• Centella asiatica
• Licorice
• Calendula
• Witch hazel
• Papaya enzyme
• Turmeric
Rules:
• Limited/incomplete evidence
• Partial performance credit only
Tier C — Weak / Traditional Evidence
Examples:
• Saffron
• Sandalwood
• Rose extract
• Multani mitti
• Shikakai
• Most Ayurvedic "hero herbs"
Rules:
• Traditional use ≠ clinical evidence
• No major effectiveness credit
• Hero-claim inflation penalties may apply
Tier D — High Risk / Problematic (Mandatory Penalties)
Examples:
• High-concentration tea tree oil
• Bergamot oil
• Lime/lemon peel oils
• Arnica
• Cinnamon oil
• Clove oil
• Oregano oil
• St. John's Wort
• Propolis
• Peppermint oil
Rules:
• Sensitizer/irritant/phototoxic penalties apply regardless of popularity or natural origin
NSF Benefit Notation (Soap-Based Formulas)
Oil
NSF Benefit
Neem
Minor antimicrobial/anti-inflammatory
Karanja
Minor anti-inflammatory/antifungal
Castor
Mild humectant/conditioning
Coconut
Minimal NSF credit
Flaxseed
Minor antioxidant
Sunflower
Minor antioxidant/barrier support

Rules:
• NSF retention contributes +0.1 to +0.2 Ingredient Quality
• NSF modifiers are additive only
• NSF benefits do NOT override soap-pH penalties

LAYER 4.6 — PRESERVATION ADEQUACY
Preservation Tiers
Adequate — No Penalty
Examples:
• Phenoxyethanol systems
• Ethylhexylglycerin blends
• Sodium benzoate/potassium sorbate systems
• Validated broad-spectrum systems
• COSMOS/Ecocert-approved systems
Questionable — Minor Penalty
Examples:
• Essential-oil-only preservation
• Weak single-preservative systems
• "Vitamin E + rosemary" preservation claims
Rules:
• Antioxidants are not preservatives
Inadequate — Safety Penalty
Examples:
• "Preservative-free" water formulas
• No clear preservation system
• Alcohol-only preservation claims
Anhydrous Exemption
Confirmed anhydrous formulas (no Aqua/Purified Water in INCI):
• Automatically classified as "Adequate"
• Receive no preservation penalty
• "Preservative-free" claim = honest
• +0.2 Formulation Honesty bonus
Water-containing formulas:
• Full preservation adequacy assessment applies
Paraben Rule
• Approved paraben concentrations are not automatically penalized
• "Paraben-free" marketing does not imply safer preservation
• Alternative preservatives require independent evaluation
LAYER 4.5 — COLORANT PENALTY RULE
Artificial/decorative colorants provide no cleansing, barrier, or long-term skin benefit and increase unnecessary irritation burden.
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
• Cumulative Irritation Risk penalty
• Formulation Honesty penalty
Multiple synthetic dyes increase penalties further.
Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.
OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)
Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”


LAYER 5 — CORE SCORING
Score range: 1.0 → 5.0
FOR EVERY RULE

Safety — Herbal Additions
Evaluate:
• Position-weighted essential oil sensitization burden
• Phototoxic botanicals
• Skin-type-stratified soap pH impact
• Preservation adequacy
• Botanical cross-reactivity risk
Effectiveness
• Scored on actual rinse-off functionality
• Category A/B/C hierarchy applies
• Natural origin does not increase effectiveness scores
Allergy Risk — Herbal Additions
Natural Fragrance Rule
• Essential oils used as fragrance are treated as fragrances
• "Natural fragrance" receives no allergy-risk advantage
• Oxidized essential oils increase sensitization risk
• Hidden allergen burden must be considered
• Essential oil penalties remain position-weighted
Eco Impact
• Standard environmental evaluation applies
• Consider biodegradable surfactants, packaging, and sourcing
Ingredient Quality — Herbal Additions
Evidence Tier
Quality Impact
Tier A actives
Full credit
Tier B actives
Partial credit
Tier C hero marketing
Penalty
Tier D ingredients
Penalty

Additional Rules:
• Decorative botanical overload reduces quality
• NSF modifiers: +0.1 to +0.2 for oils with documented beneficial NSF (neem, karanja, castor, olive)
Formulation Cleanliness Sub-Score
Absent Ingredient
Credit
No SLS/SLES
+0.2
No synthetic fragrance
+0.2
No synthetic preservatives (justified anhydrous formula)
+0.2
No PEGs
+0.1
No synthetic colorants
+0.1
No EDTA/chelating agents
+0.1

Maximum cleanliness bonus: +0.5 (capped)
Rules:
• Cleanliness bonuses do NOT override Tier D penalties or structural limitations
• Herbal complexity ≠ formulation quality
Skin Compatibility — Herbal Additions
Evaluate:
• Botanical sensitizer accumulation
• Essential oil exposure frequency
• Cross-reactivity risk
• Phototoxicity risk
• Long-term repeated-use tolerance
Core Score Formula
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)


LAYER 6 — SPECIALIZED PERFORMANCE


Cleansing Efficiency
Evaluate actual cleansing mechanism:
• Saponin systems = mild surfactant cleansing
• Clay cleansers = physical oil adsorption
• Botanical oil cleansers = oil-dissolves-oil cleansing
• Castile/soap = effective cleansing with barrier cost
Rules:
• Foam level does not determine cleansing quality
• Natural positioning does not improve scores

Barrier Preservation
Soap Tier
Barrier Preservation Ceiling
S3
2.5
S2
2.0
S1
1.5
Tier 3–4 non-soap
4.0–5.0

Rules:
• Herbal additives cannot override surfactant harshness ceilings
• Aloe, chamomile, and similar extracts cannot neutralize soap/SLS barrier stress

Hydration Support
Partial credit:
• Aloe vera
• Honey
• Vegetable glycerin
• Residual plant-oil conditioning
Rules:
• Hydration benefit remains limited in rinse-off systems
• Plant-derived humectants are scored equivalently to synthetic humectants

Residual Dryness Risk
Rules:
• S3 soap systems receive lower dryness penalties than S1
• High castor + high oleic oil content receive minor dryness-risk reduction credit
• Alkaline pH-driven dryness is evaluated independently of ingredient origin

Microbiome Compatibility
Rules:
• Broad-spectrum antimicrobial botanicals reduce compatibility
• Fermented/postbiotic ingredients may provide minor positive modifiers
• Follows Layer 4 microbiome rules

Cumulative Irritation Risk
Essential Oil Frequency Rule
EO Position
Concentration Estimate
Penalty Weight
Top 5
>2%
Full
Middle (6–15)
0.5–2%
70%
Bottom 20%
<0.5%
30%
Last 3
<0.2%
15% note-only

Rules:
• Daily EO exposure increases cumulative sensitization risk
• Phototoxic botanicals receive full penalty regardless of position

Formulation Honesty
Mandatory penalties:
• "Natural" used as proof of safety
• Tier C herbal hero marketing
• "Chemical-free" claims
• Traditional-use claims presented as clinical evidence
• Undisclosed EO sensitizer burden
• "Preservative-free" water formulas
• Decorative botanical overload without evidence
Positive modifiers:
• Anhydrous formula + honest "preservative-free" claim = +0.2
• Transparent EO disclosure in INCI = neutral/no penalty
SPECILAZED SCORE=AVERAGE OF ALL SPECILAZED SCORES 
Final Rating Formula
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
LAYER 7 — HIGH SCORE ELIGIBILITY
Adjusted Eligibility Tiers (v1.1)
Score Range
Meaning
>4.0
Requires Tier 3/4 non-soap surfactant system. Soap-based formulas cannot exceed this tier regardless of oil quality due to structural pH limitation.
3.5–4.0
Achievable for Tier S3 multi-oil soap systems with Tier B+ actives, no unjustified Tier D sensitizers, and honest formulation. Represents: "Good for what it is; significant limitations remain."
2.5–3.5
Typical range for well-formulated multi-oil herbal soap systems
2.0–2.5
Soap-based formulas with moderate concerns or limited herbal evidence
<2.0
Reserved for Tier D sensitizers, dishonest claims, harmful preservation, or abusive surfactant systems — not clean anhydrous multi-oil soap systems

High Score Requirements (>4.0 — Non-Soap Syndet Systems)
• At least one Tier A/B herbal active
• Tier 3–4 surfactant system
• pH ≤7.5 (preferably 4.5–6.5)
• No unjustified Tier D sensitizers
• Adequate preservation
• No Category C hero inflation
• No unsafe phototoxic botanicals
• Controlled essential oil burden
• Formulation Honesty ≥3.5
• Good microbiome compatibility

OUTPUT FORMAT
⭐ FINAL RATING
X.X / 5 — Rating Level

⚖ STRUCTURAL QUALITY
Short summary covering:
• Cleansing gentleness
• Barrier friendliness
• Herbal evidence quality
• Irritation/sensitization risk
• Long-term skin behavior

🌿 HERBAL/ORGANIC PROFILE
Short cleanser classification:
• Evidence-Based Herbal Cleanser
• Gentle Herbal Syndet
• Soap-Based Herbal Cleanser
• Marketing-Heavy Botanical Cleanser
• Essential Oil-Heavy Formula
• Clay-Based Oil Control Cleanser
• Fermented Herbal Cleanser
• Balanced Herbal Daily Cleanser

📊 CORE SCORES (GIVE SHORT STURCTURAL REASON FOR EVRY SCORING RULE LIKE WHY IT SCORED THAAT MUCH)
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X


🧪 SPECIALIZED PERFORMANCE (GIVE SHORT STURCTURAL REASON FOR EVRY SCORING RULE LIKE WHY IT SCORED THAAT MUCH)

Cleansing Efficiency — ⭐X.X
Barrier Preservation — ⭐X.X
Hydration Support — ⭐X.X
Residual Dryness Risk — ⭐X.X
Microbiome Compatibility — ⭐X.X
Cumulative Irritation Risk — ⭐X.X
Formulation Honesty — ⭐X.X

🌱 HERBAL EVIDENCE QUALITY
Evidence Strength:
Strong / Moderate / Weak / Marketing-Heavy
Hero Ingredients:
[List]
Inflation Penalty:
Yes / No


🌼 SENSITIZATION RISK
Essential Oil Burden:
Low / Moderate / High / Very High
Phototoxic Ingredients:
None / Present
Patch Test Recommended:
Yes / No

👍 STRENGTHS
• Main structural advantage
• Main structural advantage
• Main structural advantage
⚠ CONCERNS
• Main structural weakness
• Main structural weakness
• Main structural weakness

🔍 THE TRUTH ABOUT THE NATURAL CLAIMS
2–4 short evidence-based sentences separating:
• Real evidence
• Marketing exaggeration
• Functional vs decorative herbal ingredients
• Actual long-term skin impact

👤 SKIN TYPE COMPATIBILITY
Dry Skin — ⭐X.X
Oily Skin — ⭐X.X
Combination Skin — ⭐X.X
Sensitive Skin — ⭐X.X
Acne-Prone Skin — ⭐X.X

📅 LONG-TERM USABILITY
Daily Use — ⭐X.X
Twice Daily Use — ⭐X.X
Occasional Use — ⭐X.X

⏱ EXPECTED RESULTS
Immediate:
• Cleansing feel
• Tightness/hydration
• Irritation signals
Medium-Term:
• Barrier response
• Dryness/oiliness changes
• Tolerance development
Long-Term:
• Barrier stability
• Sensitization risk
• Microbiome stability
• Overall skin outcome

🔬 KEY INGREDIENTS
List only ingredients materially affecting:
• Cleansing behavior
• Barrier health
• Irritation risk
• Herbal effectiveness
• Long-term skin outcome

🧠 WHY THIS RATING
3–5 short evidence-based user-friendly sentences covering:
• Cleansing harshness/gentleness
• Barrier impact
• Herbal evidence quality
• Sensitization risk
• Marketing realism
• Long-term usability

📌 STRUCTURAL INSIGHT
Strengths:
[List]
Weaknesses:
[List]

STRICT OUTPUT RULES.

DONT DO MEDICAL CLAIMS 
Mention harsh colorants ,preservatives and fragrances in output
"Natural" label MUST NOT improve any score unless supported by evidence
"Organic" certification MUST NOT improve any score unless organic sourcing improves ingredient purity in a way that affects performance
Traditional use of an ingredient MUST be distinguished from clinical evidence
Essential oils MUST be evaluated for sensitization risk, not given automatic safety credit for being plant-derived
Soap-based "natural" formulas MUST receive identical pH penalties to synthetic soap
"Chemical-free" marketing claims MUST trigger Formulation Honesty penalty
Preservation adequacy is a mandatory safety evaluation — not optional
The "Truth About Natural Claims" output section is MANDATORY for all herbal/organic products
Phototoxic botanicals MUST be flagged regardless of how small their position in the INCI list
The output must be written to educate and protect the user — not to validate their preference for "natural" products
Honest output that credits genuine herbal science while exposing herbal mythology is the goal


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
              "You are a strict herbal cleanser structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });
      console.log(
  "organic TOKEN USAGE:",
  response.usage
);

    return response.choices[0]
      .message.content;

  }

}

module.exports =
  new OrganicEngine();