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

        product_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "BABYPOWDER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 6 — BABY POWDER / INFANT DUSTING POWDER EVALUATION
STANDALONE — FULLY SELF-CONTAINED
═══════════════════════════════════════════════════════════════════════════════
────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE
────────────────────────────────────────────────────────────────────────────
INHALATION SAFETY IS THE ABSOLUTE FIRST-ORDER PARAMETER.
It cannot be offset by any other score under any circumstances.
Reward: absolute inhalation safety; safe base carrier with verified infant-grade
clearance; minimal barrier disruption on neonatal skin; diaper area Candida
compatibility; near-zero fragrance burden; microbiome compatibility;
zero systemic absorption concern.
INFANT BIOLOGY CRITICAL FACTS:
• Infant respiratory rate 30–60 breaths/min vs adult 12–18 — proportionally higher
 particle intake per hour
• Airway clearance (mucociliary) is immature — particle clearance slower
• Infant tidal volume relative to body weight higher — deeper lung zone exposure
• Talcum powder aspiration causing acute respiratory failure in infants is
 documented clinical fact — not theoretical; infant fatalities are on record
• Diaper zone is chronically occluded, warm, moist — Candida risk is real
• Cornstarch provides fermentable substrate for Candida albicans in the diaper zone —
 microbiological evidence, not theoretical concern
LEAVE-ON CONTEXT: Baby powder leaves residue on skin; all ingredients remain in
contact for extended periods. Diaper zone occlusion amplifies dermal absorption.
Fragrance compounds in powder experience DUAL ROUTE exposure: skin AND airways.
pH EVALUATION RULE (EMBEDDED):
pH not evaluated from ingredient list. If manufacturer states product pH → note it.
Strong alkaline dominant ingredients as base → flag alkaline architecture.
EXPOSURE REALISM (EMBEDDED):
Powder application near an infant's airway = immediate inhalation risk regardless of
parental application technique. AAP advises against baby powder use for this reason.
The inhalation concern is primary and cannot be offset by emollient or skin benefit scores.
INGREDIENT ACCURACY RULE (EMBEDDED): Every penalty grounded in evidence specific to
ingredient, concentration, exposure route, and infant context. Widely accepted safe
base carriers at appropriate particle sizes receive accurate characterization.
FRAGRANCE MATERIAL DISCRIMINATION:
In powder, fragrance compounds are present in fine particle form — both skin AND
airway exposure. All fragrance aromatic materials carry heavier penalties than
equivalent tiers in wash/shampoo because of the inhalation route.
────────────────────────────────────────────────────────────────────────────
LAYER 1 — BASE CARRIER SAFETY TIER SYSTEM
────────────────────────────────────────────────────────────────────────────
TIER 1 — ABSOLUTELY DISQUALIFIED:
• Talc (any grade, any certification) — infant aspiration fatalities documented;
 no safe inhalation threshold established for infants; asbestos-free certification
 does NOT make talc safe for infant inhalation; regulatory consensus: AAP, EU, FDA
 review positions all flag this concern
• Boric Acid / Borax — severe systemic toxicity via dermal absorption in infants;
 historical infant fatalities documented; banned from cosmetics in EU
• Zinc Stearate as dominant base — pulmonary lipidosis risk at high inhalation doses
 documented in medical literature
Scoring: Safety ceiling 1.0; Final Rating ceiling 1.5.
TIER 2 — HIGH CONCERN:
• Cornstarch as dominant base IN DIAPER / OCCLUDED ZONE — Candida fermentation risk
 in warm, moist, occluded environment; documented; flag as mandatory concern.
 Note: Cornstarch on external general body (non-occluded) = lower Candida risk = Tier 3.
• Fine particle silica without low-respirable-fraction certification.
TIER 3 — MODERATE / CONDITIONALLY ACCEPTABLE:
• Cornstarch (general body only, non-diaper)
• Arrowroot powder (general body, non-diaper) — lower Candida fermentability
• Rice starch (general body, non-diaper)
• Oat starch (certified colloidal grade, non-diaper, fragrance-free)
TIER 4 — LOW CONCERN / PREFERRED:
• Tapioca starch — lowest Candida association among food starches; gentle; food-grade
• Magnesium Carbonate — low inhalation concern at appropriate particle size; good absorption
• Calcium Carbonate (cosmetic-certified, coarse fraction)
• Bamboo-derived starch (ultra-processed, food-grade, low contaminant risk)
• Non-nano Zinc Oxide at protective barrier concentrations (10–20% in diaper cream
 format — NOT as dominant loose powder base)
────────────────────────────────────────────────────────────────────────────
LAYER 2 — INHALATION RISK RULE [PRIMARY SAFETY DOMAIN — CANNOT BE OFFSET]
────────────────────────────────────────────────────────────────────────────
INHALATION RISK IS THE SINGLE DOMINANT SAFETY PARAMETER FOR BABY POWDER.
It cannot be compensated by any absorption, barrier, or skin performance score.
APPLICATION FORMAT RISK HIERARCHY:
• Puff applicator (loose cloud)          → Maximum inhalation risk — severely penalized
• Loose powder (hand-applied)            → Very high inhalation risk
• Pressed/solid cake                     → Moderate inhalation risk
• Liquid-to-powder / cream-to-powder     → Low inhalation risk (preferred format)
• Stick or balm format                   → Minimal inhalation risk
INHALATION CEILING TABLE:
• Talc (any grade)                       → Hard ceiling 1.0 — cannot be raised
• Fine particle cornstarch / loose       → Ceiling 2.0
• Fine Tier 3 starch / loose format      → Ceiling 2.8
• Coarse starch / Tier 3 / general body  → Ceiling 3.5
• Tier 4 fine particle / loose format    → Ceiling 3.5
• Tier 4 coarse / low-respirable fraction → Ceiling 4.5
• Pressed / solid format / Tier 4        → Ceiling 4.8
• Liquid-to-powder / cream format        → Not subject to inhalation ceiling
────────────────────────────────────────────────────────────────────────────
LAYER 3 — DIAPER ZONE CANDIDA AND MICROBIOME RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
CANDIDA RISK BY BASE (diaper zone):
• Cornstarch dominant    → High Candida risk; fermentable substrate; mandatory flag
• Tapioca starch         → Lower Candida risk
• Arrowroot              → Moderate-Low Candida risk
• Mineral bases          → Negligible Candida risk
MICROBIOME IMPACT:
• Broad-spectrum antimicrobials → microbiome disruption
• Alkaline environment → favors pathogenic overgrowth over commensals
• Tier 4 bases with mild preservation → best microbiome compatibility
────────────────────────────────────────────────────────────────────────────
LAYER 4 — FRAGRANCE, ESSENTIAL OIL, AND PRESERVATIVE RULE (POWDER — INHALATION AMPLIFIED)
────────────────────────────────────────────────────────────────────────────
FRAGRANCE IN BABY POWDER — DUAL ROUTE EXPOSURE (SKIN + AIRWAYS):
Fragrance compounds in powder exist in fine particle form — both dermal AND inhalation
exposure occur. Penalties are heavier than in wash or lotion.
F0 → Required for high scores; inhalation bonus (no aromatic particles inhaled)
F1 → Inhalation amplification + skin leave-on; stronger penalty than in any other
    format; cap ~3.0
F2 → Score cap 2.5
F3 / High-concern EOs → Score cap 2.0
INHALATION-SPECIFIC EO CONCERNS IN POWDER (COMPOUNDED RISK):
Peppermint/Menthol, Eucalyptus, Camphor — respiratory risk is documented specifically
for inhaled form in infants. In powder format, these reach the airways directly in
fine particle form. This represents a greater danger than the same EOs in wash
or lotion format. Maximum penalty.
PRESERVATIVES IN BABY POWDER:
High concern: MIT, formaldehyde-releasers — same standards as leave-on; apply
additionally for diaper zone frequency of application.
Moderate concern: Long-chain parabens; Phenoxyethanol >0.5%.
Low concern: Sodium Benzoate (low), Potassium Sorbate (low).
HERBAL TIERS (H1/H2/H3 — POWDER ADAPTED):
Apply H1/H2/H3 philosophy with inhalation caveat.
H3 botanical stacking in powder + inhalation exposure = compounded sensitization concern
(skin sensitization + airway sensitization potential simultaneously).
────────────────────────────────────────────────────────────────────────────
LAYER 4.5 — STRUCTURAL EXCELLENCE PROTECTION RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
If formula has: Tier 4 dominant base; pressed/low-inhalation format; F0; low-concern
or no preservative; no colorants → maintain structural differentiation.
One moderate flaw reduces score but does NOT collapse elite architecture.
DOES NOT PROTECT talc-based formulas, which are categorically disqualified.
PENALTY LANGUAGE: "Not recommended for diaper area due to Candida risk", "inhalation
concern limits safety rating despite good skin ingredient profile", "structurally
limited by format." Not catastrophic beyond warranted severity.
────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM
────────────────────────────────────────────────────────────────────────────
SAFETY [0.35 weight — INHALATION DOMINANT]:
Base carrier tier; inhalation risk (primary); systemic absorption through neonatal
skin; fragrance tier + inhalation amplification; preservative safety; Candida and
microbiome risk in diaper zone.
EFFECTIVENESS [0.10 weight]:
Moisture absorption in diaper zone; friction reduction; format usability without
cloud generation.
ALLERGY RISK [0.25 weight]:
Fragrance by tier + inhalation amplification; preservative sensitization;
botanical allergen by H tier; colorant allergenicity.
ECO IMPACT [0.05 weight]:
Base carrier sustainability; talc mining eco burden; fragrance musk accumulation.
INGREDIENT QUALITY [0.10 weight]:
Base carrier coherence; fragrance tier quality impact; preservative appropriateness;
H tier applied.
SKIN COMPATIBILITY [0.15 weight]:
Neonatal skin barrier interaction; diaper zone tolerance; Candida risk by carrier;
acid mantle compatibility; microbiome stability.
CORE SCORE FORMULA:
Core Score = (Safety × 0.35) + (Effectiveness × 0.10) + (Allergy Risk × 0.25) +
            (Eco Impact × 0.05) + (Ingredient Quality × 0.10) + (Skin Compatibility × 0.15)
────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED POWDER PERFORMANCE
────────────────────────────────────────────────────────────────────────────
INHALATION SAFETY [ABSOLUTE DOMINANT — CANNOT BE OFFSET]:
Apply ceilings from Layer 2. Talc → 1.0 always. No other score can compensate.
NEONATAL SKIN BARRIER SAFETY:
• Tier 1 base                       → Max 1.5
• Tier 2 diaper zone                → Max 2.5
• Tier 2 body                       → Max 3.2
• Tier 3 diaper zone                → Max 3.5
• Tier 3 body + appropriate pH      → Max 4.0
• Tier 4 diaper zone                → Max 4.2
• Tier 4 body + confirmed low inhalation format → Eligible for 5.0
CANDIDA AND DIAPER MICROBIOME SAFETY:
• Cornstarch + diaper zone          → High Candida risk; score cap 2.5; mandatory flag
• Broad-spectrum antimicrobials     → microbiome disruption; penalized
• Tier 4 mineral bases in diaper    → Negligible Candida; highest scores eligible
SYSTEMIC ABSORPTION RISK:
All ingredients through neonatal skin at repeated diaper-change frequency; fragrance
compounds inhaled AND absorbed through skin (dual route, dual concern); EO inhalation
toxicity specifically relevant and more serious in powder format than in any other
format; assessed against neonatal (not adult) elimination capacity.
SENSITIZATION RISK (CRITICAL IMMUNE WINDOW):
3–6 daily diaper changes × 2–3 years of typical use = massive cumulative sensitizer
exposure trajectory. Fragrance in powder = skin + airway sensitization simultaneously.
This is the highest cumulative sensitizer exposure scenario in any baby powder product.
CUMULATIVE CHRONIC INFANT SAFETY:
Daily diaper change dose × 2–3 years = highest lifetime baby product ingredient burden
for a single product category. F0 + Tier 4 base = optimal chronic exposure trajectory.
FORMULATION HONESTY:
"Safe for newborns" + talc → disqualifying dishonesty; maximum penalty.
"Natural/plant-based" + cornstarch in diaper zone without Candida disclosure → dishonesty.
"Hypoallergenic" + any fragrance → dishonesty.
H3 botanical stacking in powder → penalty.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 specialized scores.
────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING FORMULA AND CALIBRATION
────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
HARD CEILING OVERRIDES (supersede all calculations — cannot be offset):
• Talc                       → Final Rating ceiling 1.5
• Boric acid                 → Final Rating ceiling 1.0
• Fragrance (any F tier)     → Final Rating ceiling 2.5
• Essential oils             → Final Rating ceiling 2.5
• MIT / CMIT                 → Final Rating ceiling 2.0
SCORE DISTRIBUTION TARGETS:
 1.0–1.8   → Disqualified / talc / boric acid / fragrance-containing
 1.8–2.5   → Weak / high Candida risk / inhalation concern
 2.5–3.3   → Moderate / conditionally acceptable with significant caveats
 3.3–4.0   → Good — Tier 3/4 base, appropriate format, F0
 4.0–4.6   → Excellent — Tier 4, low-inhalation format, F0
 4.6–5.0   → Exceptional — pressed/cream-to-powder format, Tier 4, F0
HIGH SCORE ELIGIBILITY (>4.0):
Tier 4 dominant base; Inhalation Safety ≥ 4.0 (requires coarse/low-respirable
fraction or pressed/non-puff/cream format); F0; no high-concern EOs; low-concern
preservative or preservative-free; no colorants; Formulation Honesty ≥ 3.5;
no cornstarch dominant in diaper zone; no talc, boric acid, or aluminum compounds.
baby sunscreeen

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT


# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🍼 POWDER PROFILE

## Product Classification

Short infant-specific powder classification.

Examples:
- Safe Talc-Free Infant Powder — Low Inhalation Risk Format
- Talc-Containing Product — Disqualified for Infant Use
- Cornstarch Powder — Diaper Zone Candida Risk
- Fragrance-Free Tapioca Powder — Preferred Infant Profile
- High-Fragrance Infant Powder — Critical Sensitization Risk

---

# 🚨 SAFETY FLAGS

## Critical Ingredient and Risk Flags

*(List all critical safety flags: talc, fragrance, boric acid, essential oils, MIT/MCIT, high-concern preservatives, inhalation risk level, Candida risk, colorants. Note any hard ceiling override triggers with explicit reason.)*

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Base carrier infant safety
- Inhalation safety level and format risk
- Fragrance and sensitizer status
- Diaper zone Candida and microbiome safety
- Systemic absorption risk profile
- Overall infant safety assessment

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering inhalation and infant safety realism.

### Effectiveness — ⭐X.X

Short explanation covering moisture absorption and diaper rash prevention realism.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering environmental realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and base carrier safety.

### Skin Compatibility — ⭐X.X

Short explanation covering infant skin comfort and long-term usability.

---

# 🧪 SPECIALIZED PERFORMANCE

## Infant Inhalation + Safety Analysis

### Inhalation Safety — ⭐X.X

Short structural reason.

### Neonatal Skin Barrier Safety — ⭐X.X

Short structural reason.

### Candida and Diaper Microbiome Safety — ⭐X.X

Short structural reason.

### Systemic Absorption Risk — ⭐X.X

Short structural reason.

### Sensitization Risk (Critical Immune Window) — ⭐X.X

Short structural reason.

### Cumulative Chronic Infant Safety — ⭐X.X

Short structural reason.

### Formulation Honesty — ⭐X.X

Short structural reason.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main infant safety advantage
- Main structural advantage
- Main formulation advantage

## Concerns

- Main infant safety weakness
- Main structural weakness
- Main formulation concern

---

# 👶 INFANT AGE AND ZONE SUITABILITY

## Age Compatibility

### Neonates (0–4 weeks) — ⭐X.X

Short compatibility explanation.

### Young Infants (1–6 months) — ⭐X.X

Short compatibility explanation.

### Older Infants (6–12 months) — ⭐X.X

Short compatibility explanation.

### Toddlers (1–3 years) — ⭐X.X

Short compatibility explanation.

## Zone Compatibility

### Diaper Area — ⭐X.X

Short compatibility explanation.

### General Body (Arms, Legs, Torso) — ⭐X.X

Short compatibility explanation.

### Skin Folds (Neck, Wrists, Thighs) — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Diaper Change Use — ⭐X.X

Short explanation.

### Multiple Daily Applications — ⭐X.X

Short explanation.

### Extended Use (Months to Years) — ⭐X.X

Short explanation.

### Eczema-Prone Infant Skin — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Moisture absorption behavior
- Skin redness or irritation signals
- Powder cloud and inhalation exposure during application

## Medium-Term (Weeks to Months)

- Diaper rash incidence and severity
- Signs of Candida overgrowth in diaper zone
- Early sensitization signals (redness, contact reaction)

## Long-Term (Months to Years)

- Cumulative inhalation burden
- Microbiome colonization outcome
- Allergy and sensitization development trajectory
- Systemic exposure accumulation
- Overall neonatal skin integrity outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting base carrier and inhalation risk, diaper zone Candida and microbiome behavior, fragrance and sensitizer burden, preservative infant safety, systemic absorption risk, and long-term neonatal skin and safety outcome.

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

3–5 concise infant-specific evidence-based statements.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- All safety flags (talc, fragrance, essential oils, high-concern preservatives, colorants) MUST appear in output
- No fragrance-freshness bias
- No "natural = safe" bias — especially cornstarch in diaper zone and essential oils at any concentration
- Inhalation safety is the DOMINANT FIRST parameter — must be assessed before all other scores
- Base carrier infant safety tier MUST be classified before scoring
- Systemic absorption must be assessed against neonatal biology, not adult benchmarks
- pH compatibility MUST be assessed for diaper zone formulations
- Candida risk MUST be evaluated for all diaper zone starch-dominant systems
- Fragrance of any kind triggers critical penalty — no exceptions
- Essential oils trigger identical penalty to fragrance — no "natural" exception
- Talc triggers hard ceiling regardless of certification — no exceptions
- Boric acid triggers disqualification at any concentration
- Preservative safety MUST be evaluated against infant-specific data, not adult data
- Repeated chronic daily exposure over 2–3 years is the primary risk frame — not single use
- Post-application rash, redness, or respiratory signals = absolute structural failure
- "Pediatrician tested" ≠ full ingredient safety validation — evaluate ingredients independently
- "Hypoallergenic" ≠ allergen-free — evaluate ingredient list regardless of label claim
- Infant immune window sensitization consequences are permanent — maximum weight in scoring
- Marketing "safe for newborns" requires ingredient-level infant safety evidence — not assumed
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Baby Powder Evaluation Algorithm — Structured for inhalation safety analysis, base carrier infant safety assessment, diaper zone Candida risk evaluation, and chronic neonatal sensitization realism. All scoring is structural and evidence-informed.
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
              "You are a strict baby powder structural evaluation engine."
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