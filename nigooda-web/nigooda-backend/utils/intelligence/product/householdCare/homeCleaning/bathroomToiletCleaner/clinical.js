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
        "BATHROOMTOILETCLEANER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 2 — TOILET / BATHROOM CLEANER EVALUATION V3.0
════════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYSTEM OBJECTIVE
Reward bathroom cleaners demonstrating: effective pathogen and soil
removal at appropriate contact time; surface-safe acid/base
architecture; genuine disinfection or sanitization where claimed;
responsible surfactant and solvent selection; low cumulative
inhalation and skin exposure risk; eco-responsible formulation;
honest efficacy claims backed by active chemistry.
Mandatory penalties for: fragrance-first "clean" perception without
functional actives; decorative botanical claims lacking efficacy;
harsh acid/bleach systems marketed as "daily safe" without guidance;
broad-spectrum antimicrobial overuse without justification;
disinfection claims without registered active ingredients;
marketing-driven sensory engineering over functional chemistry.
DOMINANT PRINCIPLE
Active ingredient chemistry is the dominant cleaner structure.
Safety penalties override functional bonuses.
Fragrance cannot compensate for absent efficacy chemistry.
ANTI-FEARMONGERING CALIBRATION
The engine distinguishes irritation vs toxicity, hazard vs exposure,
optimization vs danger.
CRITICAL CALIBRATION — BATHROOM CLEANER CONTEXT:
Strong acid descalers (citric acid, HCl-based) used as directed are
genuinely effective products. Occasional correct use does NOT equal
catastrophic hazard. Hazard language must be proportionate to
realistic use frequency and instructions.
Bleach-based bathroom cleaners are widely used globally without
adverse effects when used as directed. Bleach spray in a ventilated
bathroom used weekly is very different from chronic daily enclosed
exposure. Assess proportionally — not catastrophically.
"Moderate ecological concern" for standard QAC disinfectants used
weekly is NOT severe environmental damage.
Prefer: "requires adequate ventilation during use," "not recommended
for daily use at full concentration," "surface compatibility
limitation on natural stone."
CONCENTRATION UNCERTAINTY RULE
When active concentration is unknown, mandatory probabilistic wording:
"likely present at functional level," "concentration unclear — may
perform adequately," "active concentration undisclosed — efficacy
cannot be fully verified."
Never assume exact active concentration from INCI order alone.
MECHANISTIC PLAUSIBILITY FILTER
Before crediting any active in a bathroom cleaner:
- Is contact time sufficient for claimed disinfection or descaling?
- Is pH appropriate for the target soil type?
- Is active concentration likely above minimum inhibitory concentration?
- Is the delivery format compatible with required dwell time?
Theoretical antimicrobial reputation does not override contact-time
and concentration reality.
REAL-WORLD TOLERABILITY — BATHROOM CLEANERS
Strong acid descalers used once weekly in a ventilated bathroom
by an adult following label instructions represent low chronic risk.
Bleach-based toilet bowl cleaners used weekly according to label
instructions are tolerated by the vast majority of households globally.
Weekly use is NOT chronic high-risk exposure.
Reserve extreme safety penalties for:
- Aerosol strong acids or bleach used in enclosed spaces with no
  ventilation guidance
- Products claiming daily use safety with Tier 1 active chemistry
- Products with no safety labeling at all
TRANSPARENCY RULE — EVALUATE ONLY:
Active ingredient chemistry and verified efficacy; acid/base suitability
for target surface and soil type; contact time realism; inhalation and
dermal exposure risk; eco persistence and biodegradability;
structural formulation honesty.
GLOBAL ENFORCEMENT:
- Active ingredient architecture is dominant cleaner structure
- Safety penalties override functional bonuses
- Disinfection claims require registered actives
- pH is a mandatory structural modifier
- Foam volume does not equal cleaning power
- Scent intensity does not equal disinfection
- Enzyme-only systems cannot claim disinfection without actives
- "Natural" does not equal safe or effective
CONTACT TIME REALITY RULE
Full credit: QACs at validated concentration; sodium hypochlorite
≥0.1% active; hydrogen peroxide ≥0.5%; citric acid ≥5% for
limescale; HCl (effective descaler — safety penalties apply to
spray format); NaOH (effective for soap scum — safety penalties).
Partial credit: enzyme blends (soil digestion, not disinfection);
surfactant-only systems; mild organic acids at sub-optimal level.
Decorative/minimal: essential oils below antimicrobial thresholds
(E3–E4 evidence); botanical extracts without validated efficacy
(E4–E5); "probiotic" cleaners (E4–E5); baking soda in diluted liquid.
EVIDENCE QUALITY TIERS — BATHROOM CLEANER
E1 — Validated registered actives (bleach, QAC, citric acid ≥5%,
     H2O2 ≥0.5%) = full disinfection or descaling credit
E2 — Moderate (lactic acid ≥5%, some enzyme blends for soil)
E3 — Limited (essential oils at functional thresholds)
E4 — Uncertain (sub-threshold essential oils, botanical extracts)
E5 — Marketing-driven ("probiotic" disinfection, implausible claims)
HERBAL / BOTANICAL CLASSIFICATION — BATHROOM CONTEXT
H1 — Tea Tree Oil at validated concentration: limited disinfection
     credit. "May provide mild antimicrobial support — not equivalent
     to registered disinfectant actives."
H2 — Traditional botanicals (neem, eucalyptus): some antimicrobial
     plausibility; no disinfection credit.
H3 — Decorative botanical stacking in functional cleaner: Formulation
     Honesty penalty. "Botanical ingredients appear decorative in
     this context — functional disinfection relevance not supported."
Write Algorithm 2 remaining layers
bash
cat >> /mnt/user-data/outputs/NIGOODA_MASTER_ALGORITHMS_V3.txt << 'EOF'
LAYER 1 — ACTIVE INGREDIENT CHEMISTRY TIER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY: Classify all active ingredients by tier before scoring.
TIER 1 — STRONG EFFICACY / HIGHER HAZARD
Examples: Sodium hypochlorite (bleach) ≥1%; HCl ≥5%; NaOH ≥2%;
Phosphoric acid ≥10%; Hydrogen peroxide ≥6%.
Characteristics: High disinfection and descaling efficacy; meaningful
inhalation and skin irritation risk in spray format; surface
compatibility restrictions.
Scoring: Full efficacy credit. Mandatory Safety and Inhalation
penalties. Surface Compatibility ceiling reduction for sensitive
materials.
CALIBRATION: Tier 1 products are genuinely effective and widely used
safely. Safety penalty = honest acknowledgment of inhalation risk
in enclosed bathroom spaces — NOT catastrophic framing.
TIER 2 — MODERATE EFFICACY / MODERATE HAZARD
Examples: QACs at standard use concentration; H2O2 1–3%; Citric
acid 5–15%; Lactic acid ≥5%; Phosphoric acid 3–8%; Sodium carbonate.
Characteristics: Good disinfection or descaling at correct dwell time;
moderate skin and eye irritation; lower inhalation risk than Tier 1.
Scoring: Good efficacy credit. Moderate Safety penalties.
TIER 3 — MILD EFFICACY / LOW HAZARD
Examples: Citric acid 1–5%; Lactic acid 1–4%; Alcohol 60–80% spray
formats; mild surfactant blends; enzyme blends; H2O2 <1%.
Characteristics: Good soil removal and deodorizing; low disinfection
efficacy unless validated; low inhalation and skin risk.
Scoring: Good safety scores eligible. Cannot claim disinfection
without supporting evidence.
TIER 4 — MINIMAL / DECORATIVE EFFICACY
Examples: Essential oils below antimicrobial thresholds; botanical
extracts without validated efficacy; baking soda in diluted liquid;
"probiotic" cultures; very low-concentration organic acids (<1%).
Characteristics: Negligible disinfection or descaling; marketing-driven.
Scoring: No major efficacy credit. If positioned as primary actives:
Effectiveness penalty + Formulation Honesty penalty.
ACTIVE SYSTEM CLASSIFICATION:
Tier 1 dominant        → High Efficacy / Higher Hazard
Tier 1 + Tier 2/3      → High Efficacy / Moderate-High Hazard
Tier 2 dominant        → Moderate Efficacy / Moderate Hazard
Tier 2 + Tier 3        → Moderate Efficacy / Low-Moderate Hazard
Tier 3 dominant        → Mild Efficacy / Low Hazard
Tier 4 dominant        → Decorative / No Efficacy Credit
LAYER 2 — FORMULATION pH RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pH 1–3 (Strong Acid): Excellent descaling. Mandatory Safety and
Inhalation penalties. Surface compatibility ceiling reduction.
Ventilation guidance required.
pH 3–5 (Mild Acid): Good descaling. Moderate safety penalty.
pH 5–8 (Near Neutral): Low efficacy for limescale. Best safety.
Maximum surface compatibility.
pH 8–10 (Mild Alkali): Good for soap scum and organic soil.
Low-moderate safety penalty.
pH 10–13 (Strong Alkali): High organic soil efficacy. Mandatory
Safety and Inhalation penalties.
Unknown pH: No surface compatibility bonus. Minor credibility reduction.
LAYER 3 — SURFACE COMPATIBILITY RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Target surfaces: ceramic/porcelain toilet bowl; ceramic/porcelain tiles;
natural stone; grout; chrome/stainless fixtures; plastic fittings;
acrylic baths; glass shower screens; silicone sealant.
HIGH RISK COMBINATIONS: Strong acids + natural stone (etching); strong
acids + chrome (pitting); bleach at high concentration + metal
fixtures (discoloration); strong alkali + acrylic (crazing); abrasives
+ acrylic/glass (scratching).
LOW RISK COMBINATIONS: Mild acids (citric, lactic) + ceramics;
neutral pH surfactant cleaners + all surfaces; QAC disinfectants
at use dilution + ceramics/plastics.
LAYER 4 — INHALATION AND EXPOSURE RISK RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HIGH INHALATION RISK: High VOC fragrance loads (>1% parfum or heavy
essential oil); bleach/hypochlorite spray formats; acid spray formats;
aerosol propellants with VOC solvents; pine oil/terpene-heavy.
MODERATE: Moderate fragrance; gel/foam hypochlorite (lower vapor
than spray); alcohol-based sprays.
LOW: Fragrance-free or low-fragrance; gel or liquid formats with
low vapor pressure actives; enzyme-based; oxygen-based cleaners.
Rules: Spray format always increases inhalation penalty vs gel/liquid.
Fragrance-heavy cleaners → Inhalation Risk + Allergy Risk penalties.
No ventilation warning on high-VOC products → Formulation Honesty.
LAYER 5 — MICROBIOME AND ECOSYSTEM RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HIGH DISRUPTION RISK: QAC-dominant formulations (persistent);
Triclosan; Chlorhexidine in rinse-off household products; bleach at
high concentrations; pine oil at high concentrations (ecotoxic).
MODERATE: Standard QAC disinfectants at use dilution; H2O2
(decomposes rapidly); citric acid and lactic acid (biodegradable).
LOW: Enzyme-based systems; glucoside and amino acid surfactants;
oxygen-based bleach (sodium percarbonate); fragrance-free systems.
LAYER 5.5 — COLORANT AND FRAGRANCE PENALTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLORANT: Synthetic azo dyes → Inhalation Risk penalty, Ingredient
Quality penalty, Eco Impact penalty, Formulation Honesty penalty.
FRAGRANCE: Parfum/Fragrance above 0.5% in spray format; heavy pine
oil, lemon, floral terpene loads → Inhalation Risk penalty, Allergy
Risk penalty, Cumulative Irritation Risk penalty, Formulation Honesty.
LAYER 6 — CORE SCORING SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
SAFETY [DOMINANT — weight 0.25]
Active ingredient hazard at use concentration; inhalation risk in
enclosed bathroom environment; skin and eye irritation; corrosive
risk; mixing hazard warnings (bleach + acid, bleach + ammonia);
child and pet exposure risk; adequate safety labeling.
CALIBRATION: Weekly bathroom cleaning with a standard bleach-based
toilet cleaner used per label = moderate Safety concern, not extreme.
Spray format in enclosed space without ventilation guidance = higher
concern. Score proportionally. Weekly bleach use ≠ chronic danger.
EFFECTIVENESS [weight 0.20]
Active chemistry match to soil type; pH appropriateness; disinfection
claim validity; contact time realism; surfactant contribution;
rinse-off performance.
ALLERGY RISK [weight 0.15]
Fragrance complexity and load; essential oil sensitizers (limonene,
linalool, citral, eugenol); QAC sensitization potential; preservative
sensitizers; VOC inhalation allergy burden.
ECO IMPACT [weight 0.10]
Surfactant biodegradability; active persistence in wastewater; QAC
ecological accumulation; aquatic toxicity; packaging impact.
INGREDIENT QUALITY [weight 0.15]
Active chemistry coherence; concentration realism; absence of H3
decorative botanical inflation; surfactant and pH architectural
synergy; honest disinfection claim support; structural transparency.
SKIN COMPATIBILITY [weight 0.15]
Residual skin irritation risk; PPE compliance guidance; inhalation
exposure risk from format; repeated-use dermal sensitization;
post-rinse surface safety for skin contact.
CORE SCORE FORMULA:
Core Score =
(Safety × 0.25) + (Effectiveness × 0.20) +
(Allergy Risk × 0.15) + (Eco Impact × 0.10) +
(Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)
LAYER 7 — SPECIALIZED CLEANER PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
LIMESCALE AND MINERAL REMOVAL
Requires acid pH (preferably <5) for genuine descaling. Neutral or
alkaline formulations cannot claim limescale removal. Mild organic
acids (citric, lactic) receive partial credit vs HCl.
Ceiling rule: Neutral or alkaline formulations → Max 2.0.
PATHOGEN AND DISINFECTION EFFICACY [DOMINANT]
Ceilings:
No registered/validated active           → Max 1.5
Tier 4 actives only                      → Max 2.0
Tier 3 at sub-threshold concentration    → Max 2.5
Tier 3 at validated concentration        → Max 3.0
Tier 2 at validated concentration        → Max 4.0
Tier 1 with safety guidance              → Eligible for 5.0
Disinfection claim without evidence      → Hard ceiling 2.0
CALIBRATION: Disinfection ≠ cleaning. A product can clean well
and disinfect poorly — score each dimension honestly.
SOAP SCUM AND ORGANIC SOIL REMOVAL
Alkaline pH (>8) preferred for soap scum dissolution. Surfactant
system and chelating agent both contribute.
SURFACE SAFETY PROFILE
Material compatibility across bathroom surfaces; risk of etching/
discoloration/degradation; adequate surface-specific warnings.
INHALATION AND VOC RISK [DOMINANT PENALTY PARAMETER]
Total VOC burden; spray format amplification; enclosed bathroom
ventilation reality; acute irritation potential; chronic sensitization.
Bleach spray: mandatory inhalation penalty. Acid vapor spray:
mandatory inhalation penalty.
CUMULATIVE EXPOSURE RISK
Weekly or daily use frequency amplification; repeated skin contact;
fragrance/VOC accumulation; sensitization trajectory; mixing hazard
awareness. Products claiming "daily use" with Tier 1 chemistry
receive amplified Safety penalties.
FORMULATION HONESTY
Disinfection claims without registered actives; "natural/plant-based"
without functional evidence; fragrance-driven "clean" marketing;
H3 decorative botanical loading; probiotic disinfection claims;
"kills 99.9%" without validated registered active.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 scores.
Dominant: Pathogen/Disinfection Efficacy → primary interpretive.
Inhalation and VOC Risk → primary penalty parameter.
LAYER 8 — FINAL RATING FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Final Rating = (Core Score × 0.50) + (Specialized Performance × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) — requires:
Tier 2 or Tier 1 validated active with adequate safety guidance;
pH appropriate to primary claimed function; Pathogen Efficacy ≥ 3.5
(if disinfection claimed); Inhalation and VOC Risk ≥ 3.0; no
disinfection inflation without registered actives; Formulation
Honesty ≥ 3.5; Surface Compatibility guidance present.
DISQUALIFIERS: Disinfection claim without registered/validated active;
no mixing hazard warnings for bleach/acid products; heavy fragrance
in spray without ventilation guidance; Tier 4-only active marketed
as functional disinfectant.

━━━━━━━━━━━━━━━━━━━━━━
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 CLEANER PROFILE

## Product Classification

Short cleaner classification.

Examples:
- Validated Acid Descaler
- Balanced Disinfectant Cleaner
- Fragrance-Driven Surface Wipe
- Enzyme-Based Maintenance Cleaner
- Harsh Bleach Spray

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Active chemistry strength
- Disinfection honesty
- pH appropriateness
- Inhalation and safety profile
- Long-term use behavior
- Overall formulation balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering inhalation and repeated-use safety realism.

### Effectiveness — ⭐X.X

Short explanation covering cleaning and disinfection realism.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering environmental persistence realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and active quality.

### Skin Compatibility — ⭐X.X

Short explanation covering contact and repeated-exposure comfort.

---

# 🧪 SPECIALIZED PERFORMANCE

## Cleaning + Safety Analysis

### Limescale and Mineral Removal — ⭐X.X

Short structural reason.

### Pathogen and Disinfection Efficacy — ⭐X.X

Short structural reason.

### Soap Scum and Organic Soil Removal — ⭐X.X

Short structural reason.

### Surface Safety Profile — ⭐X.X

Short structural reason.

### Inhalation and VOC Risk — ⭐X.X

Short structural reason.

### Cumulative Exposure Risk — ⭐X.X

Short structural reason.

### Formulation Honesty — ⭐X.X

Short structural reason.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Concerns

- Main structural weakness
- Main structural weakness
- Main structural weakness

---

# 🚿 SURFACE COMPATIBILITY

## Material Suitability

### Ceramic / Porcelain Toilet — ⭐X.X

Short compatibility explanation.

### Ceramic / Porcelain Tiles — ⭐X.X

Short compatibility explanation.

### Natural Stone (Marble / Granite) — ⭐X.X

Short compatibility explanation.

### Chrome / Steel Fixtures — ⭐X.X

Short compatibility explanation.

### Acrylic / Plastic Surfaces — ⭐X.X

Short compatibility explanation.

### Grout — ⭐X.X

Short compatibility explanation.

### Glass — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### 2–3× Weekly Use — ⭐X.X

Short explanation.

### Weekly Use — ⭐X.X

Short explanation.

### Occasional Deep Clean — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Soil and limescale removal
- Disinfection performance
- Odor and VOC signals

## Medium-Term

- Surface material response
- Stain and scale recurrence
- Sensitization signals

## Long-Term

- Surface integrity
- Disinfection resistance risk
- Inhalation exposure accumulation
- Overall bathroom hygiene outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting active cleaning or disinfection chemistry, surface safety behavior, inhalation and skin hazard, environmental persistence, and long-term performance.

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

3–5 concise user-friendly evidence-based statements.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Mention harsh colorants, high fragrance loads, and strong actives in output
- No foam-volume bias
- Active ingredient tier MUST be classified before scoring
- pH compatibility MUST be assessed for all formulations
- Contact time realism MUST be evaluated before Effectiveness scoring
- Disinfection claims MUST be verified against active ingredient presence
- Repeated-use behavior > single-use feel
- Long-term surface and exposure outcome > immediate sensation
- Scent freshness ≠ disinfection or cleaning power
- Foam richness ≠ cleaning power
- "Natural/plant-based" ≠ safe or effective
- Enclosed bathroom context ALWAYS amplifies inhalation and sensitization risk
- Mixing hazard warnings (bleach + acid; bleach + ammonia) MUST be flagged if absent
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Bathroom & Toilet Cleaner Evaluation Algorithm — Structured for active chemistry analysis, disinfection realism, surface compatibility assessment, and chronic inhalation safety evaluation. All scoring is structural and evidence-informed.

---
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
              "You are a strict bathroom & toilet cleaner structural evaluation engine."
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