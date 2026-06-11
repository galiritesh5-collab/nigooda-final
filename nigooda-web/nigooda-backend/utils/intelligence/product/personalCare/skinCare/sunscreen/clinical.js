const openai =
require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  async run(data) {

    try {

      const ingredients =
        Array.isArray(data) ? data : (data.ingredients || []);

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        sunscreen_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL SUNSCREEN ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
SUNSCREEN EVALUATION ALGORITHM — VERSION B.1 (OPTIMIZED + PATCHED)
================================================================================
LAYER 0 — FOUNDATION ENGINE (EXTREME STRICT)
SYSTEM OBJECTIVE
Reward ONLY sunscreens demonstrating clear structural photoprotection superiority through:
• Strong UVA-I + UVA-II coverage
• Real photostability under UV exposure
• Stable wear film under sweat, heat, and sebum
• Low chronic irritation/barrier stress
• Strong repeated-use tolerance
• Practical reapplication behavior
• Low eye-area stress
• Honest, coherent UV architecture
• Stable long-term usability
Most commercial sunscreens SHOULD remain moderate/low scoring.
Elite ratings MUST remain rare and difficult to achieve.
Short-term cosmetic elegance NEVER overrides repeated-use suffering.
---
CORE EVALUATION PRIORITY
Evaluate ONLY:
• UVA depth and coverage quality
• Photostability quality/mechanism
• Film uniformity and wear stability
• Reapplication realism
• Repeated-use tolerance
• Irritation/barrier stress
• Eye-area compatibility
• Filter generation and safety profile
• Long-term chronic exposure tolerance
Ignore:
• SPF number alone
• PA++++ alone
• Dermatologist-tested claims
• Influencer popularity
• "Clean", "reef-safe", "mineral/natural" marketing
• Luxury texture claims
• Decorative antioxidants
• Fancy filter reputation without structural proof
---
GLOBAL ENFORCEMENT RULES
Apply across ALL layers:
• UVA depth + photostability dominate scoring
• Repeated-use tolerance dominates cosmetic elegance
• Chronic irritation accumulation outweighs first-use feel
• Film instability suppresses protection quality
• Heavy alcohol, fragrance, and menthol suppress long-term usability
• Eye discomfort suppresses repeated-use scoring
• Sensory-first engineering MUST reduce score
• Old-generation filters with known safety concerns reduce credibility
• Decorative antioxidants/botanicals NEVER compensate for weak UVA coverage, photostability failure, unstable UV systems, irritation burden, or poor film formation
• Minor additives CANNOT override core UV architecture weaknesses
---
STRUCTURE DOMINANCE RULE
Core UV architecture determines:
• UVA depth
• Photostability durability
• Wear stability
• Irritation burden
• Barrier stress
• Eye sting risk
• Reapplication comfort
• Long-term usability
---
PROTECTION LIMIT RULES
The following MUST trigger structural ceilings/moderation:
• SPF-focused systems without meaningful UVA architecture
• UVB-dominant protection lacking UVA depth
• Old-generation filter systems lacking photostability support
• Basic UVB protection alone
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients CANNOT repair:
• Weak UVA coverage
• Unstable filter systems
• Heavy alcohol stress
• Fragrance/menthol burden
• Eye sting behavior
• Poor wear film
• Structural photostability failure
---
MARKETING ILLUSION PENALTY
Penalty REQUIRED when formulation structure is driven mainly by:
• SPF inflation
• PA++++ inflation without UVA depth
• Fragrance elegance
• Alcohol-heavy thinning
• Menthol/cooling sensation
• Decorative antioxidant inflation
• Botanical distraction loading
• Luxury texture engineering
• "Clean/reef-safe/mineral" marketing without protection proof
• Influencer-oriented formulation design
• "Skincare sunscreen" hybrid inflation
---
FRAGRANCE BURDEN CLASSIFICATION SYSTEM (APPLIED FROM PATCH 2 PRINCIPLES)
Fragrance in sunscreens must be evaluated contextually by burden tier.
F1 — LOW FRAGRANCE BURDEN
Scoring Impact: minor modifier in UV-context; still more concerning than in moisturizers due to UV photoallergy amplification
F2 — MODERATE FRAGRANCE BURDEN
Scoring Impact: moderate Allergy Risk modifier; Safety modifier under UV-exposure context
F3 — HIGH FRAGRANCE BURDEN
Scoring Impact: strong Allergy Risk penalty; strong Safety penalty; Cumulative Irritation penalty
Note: UV exposure amplifies fragrance photoallergy and phototoxicity risk; penalties in sunscreens are approximately 2× stricter than equivalent non-UV skincare
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Scoring Impact: major Allergy Risk reduction; major Safety penalty; Barrier Compatibility penalty; Formulation credibility reduction
Photosensitizing oils (bergamot, citrus, St. John's Wort) receive mandatory strong penalty regardless of fragrance tier.
Essential oil burden rules apply. Essential oils are NOT automatically safer than synthetic fragrance.
---
TRANSPARENCY BONUS RULE
Apply ONLY a SMALL bonus for:
• Rational UVA/UVB architecture
• Strong filter synergy/pairing
• Real photostabilization mechanisms
• Repeated-use realism
• Low irritation burden
• Stable/coherent film-forming systems
• Modern Gen 3/4 filters
• Water-resistance certification
This bonus CANNOT override safety penalties, chronic irritation, filter instability, weak UVA architecture, or structural photoprotection failure.
---
LAYER 1 — UV FILTER GENERATION CLASSIFICATION RULE
All UV filters MUST be classified by generation before scoring.
GENERATION 1 — OUTDATED / HIGH-CONCERN FILTERS
Examples: PABA, Padimate-O, Oxybenzone (BP-3), Sulisobenzone (BP-4)
Scoring impact: Meaningful Safety + Allergy Risk penalty; Eco penalty for reef toxicity; Gen 1 dominant systems → significant structural ceiling; PABA presence → automatic major penalty
GENERATION 2 — LEGACY / PARTIAL-CONCERN FILTERS
Examples: Octinoxate, Octocrylene, Homosalate, Octisalate
Scoring impact:
• Octocrylene → moderate repeated-use Safety concern; benzophenone concern noted in output
• Octinoxate as primary UVA support → Effectiveness penalty
• High homosalate → minor Safety penalty
• Gen 2 dominant systems → moderate structural credibility limitation
GENERATION 3 — MODERN STANDARD FILTERS
Examples: Avobenzone, Mexoryl XL, DHHB/Uvinul A Plus, Benzophenone-4 at low UVB-boosting levels
Scoring impact:
• Avobenzone alone → moderate photostability penalty
• Avobenzone + proper stabilizer → strong UVA credit
• Mexoryl XL / DHHB → strong UVA credit
• Gen 3 systems → good structural credibility
GENERATION 4 — ELITE / MODERN PHOTOSTABLE FILTERS
Examples: Tinosorb S (BEMT), Tinosorb M (MBBT), Mexoryl SX, Mexoryl SX + XL combination, Uvinul T150, Bemotrizinol / Tinosorb A2B, Iscotrizinol / Uvasorb HEB
Scoring impact: Strong UVA + photostability credit; maximum photostability credit for Tinosorb S/M or Mexoryl SX+XL pairings; Gen 4 systems justify high Effectiveness + Ingredient Quality scores
Gen 4 filters STILL CANNOT override severe alcohol, fragrance, menthol, or irritation burdens
---
LAYER 2 — UVA DEPTH TIERING RULE
UVA DEPTH TIERS
Tier 1 — UVA-II Only (320–340nm)
Examples: Octisalate, low-dose octinoxate, some benzophenone systems
Scoring: UV Protection Reliability max 2.5; high-score eligibility prohibited
Tier 2 — Partial UVA-I + UVA-II (320–380nm)
Examples: Avobenzone alone, older moderate-UVA systems
Scoring: UV Protection Reliability max 3.5
Tier 3 — Full Broad-Spectrum UVA (320–400nm)
Examples: Tinosorb S/M, Mexoryl SX+XL, ZnO, DHHB/Uvinul A Plus, stabilized avobenzone systems
Scoring: Eligible up to 5.0
UVA:UVB RATIO RULE:
• UVAPF ≥ SPF/3 → no penalty
• Ratio <1:3 → mild Effectiveness penalty
• Ratio <1:5 → strong Effectiveness penalty
---
LAYER 3 — PHOTOSTABILITY MECHANISM RULE
PHOTOSTABILITY CLASSES
Class 1 — Inherently Unstable
Examples: Avobenzone alone, Octinoxate alone, Padimate-O
Scoring: Photostability max 2.0; Strong Effectiveness suppression
Class 2 — Partially Stabilized
Examples: Avobenzone + octocrylene; Avobenzone + octisalate; Avobenzone + homosalate
Scoring: Max 3.0
Class 3 — Well Stabilized
Examples: Avobenzone + DHHB; Avobenzone + Tinosorb M; Mexoryl SX + XL systems
Scoring: Good photostability credit; Max 4.0
Class 4 — Inherently Photostable
Examples: Tinosorb S, Tinosorb M, ZnO, TiO2, Uvinul T150, Bemotrizinol, Iscotrizinol
Scoring: Eligible up to 5.0; No stability penalty
---
LAYER 4 — MINERAL FILTER SCIENCE RULE
ZINC OXIDE (ZnO)
Characteristics: Broad UVA-I + UVA-II + UVB; excellent deep UVA-I; inherently photostable; strong safety profile
Scoring: Strong UVA + photostability credit; white cast may reduce Reapplication Practicality
TITANIUM DIOXIDE (TiO2)
Characteristics: Strong UVB + UVA-II; weak UVA-I depth; not sufficient alone for elite UVA protection; inherently photostable
Scoring: Moderate UVA credit only; TiO2-alone systems retain UVA-I weakness
MINERAL COMBINATION RULE:
• ZnO + TiO2 → strongest mineral broad-spectrum architecture
• ZnO ≥15% → Tier 3 UVA eligible
• TiO2 alone → Tier 2 only
• Mineral + deep UVA chemical filter → excellent hybrid architecture
NANOPARTICLE SCORING RULE:
• Non-nano minerals → no major safety concern; white cast practicality issue
• Coated nano ZnO/TiO2 → acceptable; minor safety concern flag
• Uncoated nano TiO2 → minor-moderate Safety penalty
"MINERAL/NATURAL HYPE" RULE:
Mineral filters are NOT automatically superior. TiO2-only mineral systems → UVA-I weakness; not elite eligible. Mineral marketing without meaningful ZnO support → marketing illusion penalty.
---
LAYER 5 — FILM FORMATION & SPF REALISM RULE
SPF REALISM RULE:
SPF testing uses 2mg/cm². Real-world application is typically 0.5–1mg/cm², drastically lowering actual protection.
WATER-RESISTANCE CERTIFICATION RULE:
• FDA/ISO 40 min → moderate durability credit
• FDA/ISO 80 min → strong durability credit
• No claim → neutral
• Unverified "water resistant" claims → no credit
FILM-FORMER RECOGNITION:
Positive film-formers include: Acrylates crosspolymers, Polyester-8, Dimethicone crosspolymer, Polyurethane-33, Acrylates copolymer.
---
LAYER 6 — IRRITATION & BARRIER BURDEN RULE
ALCOHOL BURDEN RULE:
• Top 3 ingredients → strong Safety + Barrier penalty
• Top 5 → moderate penalty
• Positions 6–10 → minor penalty
• Trace/late solvent use → negligible concern
FRAGRANCE BURDEN RULE:
UV exposure amplifies fragrance photoallergy and phototoxicity risk. Fragrance must be classified by F1–F4 tier. Photosensitizing oils receive mandatory strong penalty. Fragrance penalties in sunscreens are MORE severe than moisturizers due to UV interaction.
MENTHOL RULE:
• ≥0.5% → strong penalty
• 0.1–0.5% → mild penalty
• <0.1% → negligible concern
OCTOCRYLENE SPECIAL CONCERN RULE:
• <5% stabilizer role → minor Safety flag; note in output
• 5% or dominant use → meaningful Safety penalty
• Octocrylene-free systems → minor Safety bonus
UV FILTER IRRITATION STACKING RULE:
Multiple sensitizing filters (oxybenzone, octinoxate, benzophenone-4, PABA, padimate-O) → cumulative Allergy Risk penalty.
---
LAYER 7 — ECO-TOXICOLOGY RULE
ECO IMPACT FILTER SCORING:
• High Concern (oxybenzone, octinoxate) → Strong Eco penalty
• Moderate Concern (octocrylene, homosalate) → Moderate or minor-moderate Eco penalty
• Lower Concern (non-nano ZnO, Tinosorb S/M, Mexoryl SX/XL, non-nano TiO2, Uvinul T150, DHHB) → Minimal/no significant Eco penalty
---
LAYER 8 — CORE SCORING SYSTEM (EXTREME STRICT)
(Evaluated 1.0 to 5.0 stars)
SAFETY [DOMINANT]
Evaluates:
• Chronic irritation/barrier stress
• Alcohol burden
• Fragrance photoallergy amplification (F1–F4 tier)
• UV filter safety classification
• Octocrylene benzophenone concern
• Systemic absorption concerns
• Eye sting/migration risk
• Menthol burden
• Long-wear occlusive stress
• Reapplication cumulative burden
PHOTOSENSITIZATION RULE:
UV exposure amplifies fragrance/filter sensitization risk. Any fragrance, citrus essential oil, or sensitizing botanical in a leave-on UV product receives ~2× stricter Safety + Allergy penalties versus equivalent non-UV skincare.
---
EFFECTIVENESS
Evaluates:
• UVA depth tier
• UVB reliability
• Photostability class
• Mineral filter UVA quality
• Filter generation
• Film stability/SPF realism
• Water resistance
• Long-wear consistency
• Filter synergy/concentration adequacy
High Effectiveness REQUIRES:
• Tier 3 UVA minimum
• Photostability Class 3–4 minimum
• Adequate filter concentration
• Stable film under sweat/sebum
Weak UVA or instability MUST heavily suppress score regardless of SPF value.
---
ALLERGY RISK
Evaluates:
• Fragrance/allergens (F1–F4 classification)
• Photosensitizing oils
• UV filter sensitization potential
• Alcohol sensitization burden
• Menthol irritation stacking
• Preservative sensitivity
• Multiple trigger stacking
• Photocontact allergen filters
Multiple triggers MUST aggressively suppress score.
UV-context leave-on products receive stricter sensitization penalties than non-UV cosmetics.
---
ECO IMPACT
Evaluates:
• Reef/aquatic toxicity
• Biodegradability
• Persistence/bioaccumulation
• Aquatic wash-off burden
• Regulatory compliance
"Reef-safe" marketing alone NEVER increases score.
---
INGREDIENT QUALITY
Evaluates:
• Filter generation quality
• UVA architecture quality
• Photostabilization logic
• Mineral filter appropriateness
• Film-former quality
• Structural UV-system balance
• Functional filter synergy
• SPF concentration adequacy
• Absence of decorative overload
UV architecture quality — NOT ingredient count — determines this category.
---
SKIN COMPATIBILITY
Evaluates:
• Repeated-use tolerance
• Barrier compatibility
• Eye-area compatibility
• Reapplication comfort/buildup
• Long-wear irritation accumulation
• Acne/rosacea/sensitive-skin concerns
• White cast compliance
• Heat/sweat tolerance
WHITE CAST COMPLIANCE RULE:
For medium/deep skin tones: Severe white cast → reduced reapplication compliance → lower Skin Compatibility + Reapplication Practicality
Nano/tinted/no-cast systems → no penalty; Tinted mineral systems → partial penalty reduction
---
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)
---
LAYER 9 — SPECIALIZED SUNSCREEN PERFORMANCE (EXTREME STRICT)
Score Range: 1.0–5.0
UV PROTECTION RELIABILITY [DOMINANT]
Scoring ceilings:
• Tier 1 UVA only → max 2.5
• Tier 3 full UVA → eligible for maximum score
PHOTOSTABILITY PERFORMANCE [DOMINANT]
Scoring:
• Class 1 instability → max 2.0
• Class 4 stability → maximum credit
Antioxidants, soothing agents, or elegant texture CANNOT compensate for instability.
BARRIER COMPATIBILITY [DOMINANT]
Evaluates: Repeated-use UV-context tolerance, chronic irritation accumulation, alcohol burden, fragrance photoallergy risk (F1–F4), menthol irritation, eye migration/sting, long-wear comfort, dryness/barrier stress, heat/sweat tolerance, reapplication stress.
FILM FORMATION & WEAR STABILITY
Evaluates: Film uniformity, sweat/sebum migration resistance, patchiness risk, water resistance, film-former support, reapplication layering stability, heat/humidity durability.
REAPPLICATION PRACTICALITY
Evaluates: Multi-layering behavior, buildup risk, greasiness accumulation, pilling over skincare/makeup, eye migration, cosmetic fatigue, white cast under reapplication.
RESIDUAL IRRITATION RISK
Evaluates: Chronic dryness, persistent eye/facial discomfort, alcohol evaporation stress, octocrylene benzophenone concern, systemic absorption concerns, occlusive heat discomfort, long-term irritation accumulation.
SPECIALIZED SCORE = AVERAGE OF ALL SPECIALIZED SCORES
---
LAYER 10 — REAL-WORLD USAGE SIMULATION
Core question:
Can the sunscreen remain BOTH reliably protective AND tolerable during realistic long-term use?
---
ANTI-MARKETING FILTER
Penalty REQUIRED for:
• SPF inflation vs realistic application thickness
• PA++++ inflation without deep UVA structure
• Fragrance-heavy "lifestyle sunscreen" engineering
• Alcohol-heavy elegance thinning
• Decorative antioxidant/botanical stacking
• Luxury texture engineering without UV improvement
• Silicone-heavy matte systems without film stability
• "Clean sunscreen" marketing without structural superiority
• "Reef-safe" marketing without verified eco profile
• "Mineral" marketing using TiO2-only UVA-weak systems
• Influencer-oriented formulation design
• "Skincare sunscreen" hybrid inflation
---
WEAKNESS AUDIT
Neutralize:
• SPF inflation bias
• PA++++ inflation bias
• Mineral hype bias
• Antioxidant inflation bias
• Luxury texture inflation
• Fancy-filter reputation bias
• Late-ingredient rescue illusion
• Decorative botanical bias
• Influencer perception bias
• "Dermatologist-tested" inflation
• "Skincare sunscreen" hybrid inflation
• Fragrance presence = automatic major penalty assumption (corrected by F1–F4 contextual system)
• "Natural/mineral" = automatically safer assumption
• Essential oil = safer than synthetic fragrance assumption
---
FINAL SCORE RULE
Final Score = Average(Core Score, Specialized Score)
HIGH SCORE ELIGIBILITY RULE
Scores >4.0 REQUIRE:
• Tier 3 full-spectrum UVA
• Photostability Class 3–4 minimum
• Low chronic irritation burden
• Practical reapplication behavior
• Strong barrier compatibility
• Low fragrance/alcohol burden (F1 maximum for elite eligibility)
• Minimum Gen 3+ architecture (Gen 4 preferred)
• No Gen 1 dominant UV system
• Stable realistic film formation
The following MUST disqualify elite scoring:
• F3/F4 fragrance loading
• Heavy alcohol burden
• Severe white cast in realistic reapplication context
• Weak UVA coverage
• Unstable filters
• Gen 1 dominant systems

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 SUNSCREEN PROFILE

## Functional Classification

Short functional description.

Examples:
- Photostable modern broad-spectrum UV system
- Alcohol-heavy chemical sunscreen with moderate UVA
- Elite mineral-chemical hybrid sunscreen
- Fragrance-heavy daily sunscreen with weak UVA
- Outdated unstable filter system
- Gen 4 filter system with strong reapplication tolerance

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short evidence-based classification covering overall structural quality, UV architecture tier, filter generation, photostability class, UVA depth, and expected long-term use outcome.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## UV Architecture + Photostability Analysis

### UV Protection Reliability — ⭐X.X (UVA Tier: 1 / 2 / 3)

Short structural reason in plain language explaining why it scored this way.

### Photostability Performance — ⭐X.X (Class: 1 / 2 / 3 / 4)

Short structural reason in plain language explaining why it scored this way.

### Barrier Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Film Formation & Wear Stability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Reapplication Practicality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Residual Irritation Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Major evidence-based structural advantage
- Major evidence-based structural advantage
- Major evidence-based structural advantage

## Weaknesses

- Major evidence-based structural concern
- Major evidence-based structural concern
- Major evidence-based structural concern

---

# 🚨 CRITICAL ALERTS

## Triggered Structural Risks

Display ONLY when structurally triggered.

Examples:
- Oxybenzone or octinoxate as dominant filter — Gen 1 safety concern
- Octocrylene at high concentration — benzophenone degradation concern
- Class 1 photostability — significant protection degradation under UV
- Tier 1 UVA only — inadequate long-wavelength UVA protection
- Heavy alcohol + fragrance in UV-exposure context — high photoallergy risk
- Uncoated nano TiO2 — photocatalytic ROS concern

Remove section entirely if no critical alerts triggered.

---

# 👤 SKIN TYPE COMPATIBILITY

## Population Compatibility

### Dry Skin — ⭐X.X

Short compatibility explanation.

### Oily / Acne-Prone Skin — ⭐X.X

Short compatibility explanation.

### Sensitive / Rosacea-Prone Skin — ⭐X.X

Short compatibility explanation.

### Barrier-Damaged Skin — ⭐X.X

Short compatibility explanation.

### Deep / Medium Skin Tones (White Cast Realism) — ⭐X.X

Short compatibility explanation.

### Post-Procedure / Reactive Skin — ⭐X.X

Short compatibility explanation.

### Eye-Sensitive Users — ⭐X.X

Short compatibility explanation.

### High Outdoor Exposure Users — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Urban Use — ⭐X.X

Short explanation.

### Repeated Outdoor Reapplication — ⭐X.X

Short explanation.

### High Sweat / Sport Use — ⭐X.X

Short explanation.

### Humid / Hot Climate Use — ⭐X.X

Short explanation.

### Sensitive Skin Long-Term Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (1–7 Days)

- UV protection experience
- Texture and wear feel
- Eye comfort or irritation
- Skin compatibility first impression

## Medium-Term (2–8 Weeks)

- Photostability and protection consistency over daily use
- Cumulative irritation or tolerance development
- Barrier response and dryness or oiliness behavior
- Reapplication comfort and cosmetic fatigue

## Long-Term (2–12 Months)

- Chronic barrier stress and sensitivity progression
- Photoallergy or fragrance sensitization risk
- Cumulative UV-filter skin exposure outcome
- Real-world protection compliance (reapplication frequency, amount applied)
- Skin health trajectory under repeated UV-context exposure

## Realistic Dermatological Outcome

One concise conclusion covering UV protection reliability, photostability durability, barrier stress trajectory, and long-term compliance realism.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only structurally dominant ingredients affecting UV filter architecture (generation and tier noted), photostabilization system, film formation and wear, major irritation triggers, eco concern filters, and barrier-supportive or barrier-disrupting systems.

- Ingredient — Role — UV Filter generation/tier if applicable

---

# 🌿 HERBAL EVIDENCE ASSESSMENT

## Botanical Realism + Functional Contribution

*(Include ONLY for herbal, natural, botanical, essential-oil-focused, or plant-based products.)*

Short calm explanation covering:
- realistic herbal contribution
- whether herbs meaningfully support the formula
- essential oil burden if relevant
- repeated-use realism
- whether standard functional ingredients still perform most core work

---

# 🔍 THE TRUTH ABOUT "NATURAL" CLAIMS

## Marketing Reality + Consumer Transparency

*(Include ONLY for herbal, natural, botanical, essential-oil-focused, or plant-based products.)*

Short calm explanation covering:
- whether branding matches formulation reality
- whether natural positioning is overstated
- whether performance mainly comes from herbals or standard functional ingredients
- whether the product creates unrealistic safety assumptions

---

# 🧠 WHY THIS RATING

## Structural Summary

3–5 concise evidence-based sentences covering UV architecture quality (filter generation and UVA depth tier), photostability class and mechanism, irritation and sensitization burden, film stability and reapplication realism, eco-toxicology standing, and filter safety profile.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Include harsh fragrances, preservatives, and colorants in output
- No marketing influence on tone or scoring
- No SPF-number inflation — SPF alone does not determine quality
- No mineral hype — TiO2-only products will not receive elite UVA credit
- No luxury or texture bias
- No antioxidant or botanical inflation
- UV architecture, photostability, and barrier compatibility dominate scoring
- Structural negatives override cosmetic elegance — always
- Photostability weakness must visibly affect tone and scoring
- Barrier instability must visibly affect tone and scoring
- Weak UVA architecture must visibly affect tone and scoring
- Octocrylene benzophenone concern must be flagged when structurally relevant
- Gen 1 filter dominance must be flagged and penalized
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Sunscreen Evaluation Algorithm — Structured for UV architecture analysis, photostability realism, broad-spectrum coverage assessment, and long-term repeated-use photoprotection evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict SUNSCREEN structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "CLINICAL TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();