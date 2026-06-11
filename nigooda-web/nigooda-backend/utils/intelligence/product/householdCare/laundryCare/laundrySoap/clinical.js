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
        "LAUNDRYSOAP ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 5 — LAUNDRY DETERGENT EVALUATION V3.0
════════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYSTEM OBJECTIVE
Reward detergents demonstrating: effective soil removal with minimal
fiber degradation; appropriate surfactant architecture for fabric
safety; low residual irritation risk from fabric contact; physiological
and fiber-compatible pH; long-term aquatic ecosystem compatibility;
evidence-based formulation design; low cumulative sensitization risk
from residue exposure.
Mandatory penalties for: fragrance-first freshness architecture;
optical brightener marketing without disclosure; enzyme inflation claims
without functional justification; harsh surfactant systems marketed as
gentle on fabrics; eco-washing claims without surfactant biodegradability
evidence; unnecessary synthetic colorant loading.
DOMINANT PRINCIPLE
Surfactant architecture is the primary determinant of fabric integrity,
residual irritation risk, and aquatic load. Fragrance residue on fabric
= prolonged skin contact exposure — this is the primary Safety
evaluation model.
ANTI-FEARMONGERING CALIBRATION
CRITICAL: Standard anionic surfactants (LAS, SLES) are widely used in
global laundry products and tolerated by the vast majority of consumers.
LAS has been used in laundry products for decades without meaningful
adverse health outcomes at consumer use levels.
LAS receives honest Tier 1 classification reflecting higher fiber stress
and slower biodegradation — NOT a toxic/dangerous label. "Higher fiber
stress under repeated washing" is correct framing. NOT: "harsh toxic
chemical" or "dangerous to skin."
SLES in laundry context receives Tier 2 classification. Moderate
harshness at laundry concentrations. Mainstream acceptable.
Prefer calibrated wording: "higher fiber stress potential under
repeated wash cycles," "slower aquatic biodegradation compared to
APG systems," "optical brighteners add perceptual whiteness but are
not cleaning actives."
CONCENTRATION UNCERTAINTY RULE
Detergent ingredient lists often lack disclosed concentrations. Apply
probabilistic wording: "likely present at functional surfactant
concentration," "builder concentration appears standard for category,"
"fragrance load appears moderate based on ingredient positioning —
exact load uncertain."
Never assume exact concentration from INCI order alone.
MECHANISTIC PLAUSIBILITY FILTER — LAUNDRY
Before crediting any laundry ingredient:
- Is surfactant concentration likely adequate for soil removal at
  typical wash machine dilution?
- Is enzyme pH compatibility verified with the formula system?
- Is fragrance residue on fabric a realistic concern at likely
  concentration?
- Are botanical or cosmetic actives in fabric residue context
  providing meaningful benefit or purely decorative?
- Is optical brightener presence relevant to cleaning or purely
  to whiteness perception?
Real-world wash cycle behavior overrides label claims.
REAL-WORLD TOLERABILITY — LAUNDRY
Standard LAS-based economy powder detergents have been used safely by
global consumers for decades. These products genuinely clean clothes
and should score in the 2.8–3.5 range overall unless specific quality
failures are evidenced.
Moderate fragrance loads in mainstream detergents are tolerated by
the majority of consumers without sensitization under normal use.
Reserve high Allergy Risk penalties for: heavy fragrance + MIT/CMIT
combination; "long-lasting freshness" claims implying very high fabric
fragrance retention; known high-allergen fragrance components at likely
high concentrations. Not just: "it contains fragrance."
TRANSPARENCY RULE — EVALUATE ONLY:
Cleaning efficiency vs fabric integrity cost; surfactant harshness on
fibers and residual skin contact; pH compatibility with fibers and
skin residue; rinse-out performance and residual burden; repeated-use
fabric tolerance; aquatic ecosystem impact; structural formulation honesty.
GLOBAL ENFORCEMENT:
- Surfactant architecture is the dominant detergent structure
- Safety and eco penalties override functional bonuses
- Enzyme activity cannot compensate for harsh surfactant backbone
- Fragrance residue on fabric = prolonged skin sensitization exposure
- Optical brighteners are NOT cleaning performance
- Foam volume is NOT cleaning effectiveness
- Non-fiber-compatible pH reduces Fabric Integrity scoring
RESIDUE-ON-FABRIC CONTEXT RULE
Unlike rinse-off skincare, detergents leave residue in fabric fibers
remaining in contact with skin for hours after washing.
Full residue credit (low residue risk): highly water-soluble surfactants;
enzyme-only actives; carbonate/bicarbonate builders; citrate builders.
Partial residue concern: glycerin (mild residue, low concern);
low-fragrance systems.
High residue concern: heavy fragrance loads (high fabric retention);
optical brighteners (UV-reactive, persistent); quaternary ammonium
compounds (cationic, fabric-binding); silicone softeners in detergent.
EVIDENCE QUALITY TIERS — LAUNDRY
E1 — Protease + Amylase + Lipase at functional concentration,
     compatible pH = full stain removal credit
E2 — Single enzyme at functional concentration, compatible pH
     = partial stain removal credit
E3 — Botanical softening or care claims with limited wash-residue
     evidence = probabilistic wording
E4 — "Microbiome-friendly" laundry claims, probiotic detergent
     efficacy = uncertain
E5 — Enzyme marketing at clearly incompatible pH; "plant-powered
     deep clean" without functional surfactant = marketing-driven
HERBAL / BOTANICAL CLASSIFICATION — LAUNDRY
H1 — Enzyme actives (protease, amylase, lipase): functional cleaning
     actives — full credit at compatible pH.
H2 — Soda ash, sodium bicarbonate as builders: functional cleaning
     support — credit with pH caveat.
H3 — "With aloe vera," "with chamomile," "with rose water" in laundry
     detergent: purely decorative. Formulation Honesty penalty.
     "Botanical additives appear decorative in laundry context — no
     functional fabric care or cleaning credit."
LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER 1 — HIGHER FIBER STRESS
Examples: LAS/LABSA as primary; SLS/SDS as primary; SLES in high
concentration; Sodium C14-16 Olefin Sulfonate; soap-based (pH ≥9).
Characteristics: Higher fiber stress under repeated washing; color
fading risk; higher residual sensitization potential; slower aquatic
biodegradation; protein denaturation risk on wool/silk.
Scoring: Mandatory Fabric Integrity penalties. Residual Irritation
ceiling reduction.
CALIBRATION: LAS is effective for cleaning. Tier 1 = "higher fiber
stress" not "toxic." Economy powder detergents using LAS still clean
clothes effectively — score cleaning credit accurately.
TIER 2 — MODERATE
Examples: LAS in blended systems with nonionics; SLES in balanced
low-concentration laundry formulas; amine oxides as secondary; SLSA.
Characteristics: Moderate fiber stress; acceptable color tolerance
in blended systems; moderate aquatic load.
Scoring: Penalties reduced by nonionic blending. Mainstream acceptable.
TIER 3 — MILD
Examples: Alcohol Ethoxylates (AE/nonionic); Fatty Alcohol Ethoxylates;
Coco-Glucoside; Sodium Cocoyl Glycinate; Betaines in blend; APG
as secondary.
Characteristics: Low fiber stress; good color fastness; moderate
biodegradability; low residual sensitization.
Scoring: Good Fabric Integrity eligible.
TIER 4 — VERY MILD
Examples: APG as primary (Decyl Glucoside, Coco Glucoside); Methyl
Ester Sulfonates; Sodium Cocoyl Glutamate; amino acid-based surfactants;
enzyme-amplified low-surfactant systems.
Characteristics: Minimal fiber degradation; best color compatibility;
best aquatic biodegradability; lowest residual sensitization.
Scoring: Maximum Fabric Integrity eligible. Eco bonus eligible.
SYSTEM CLASSIFICATION:
Tier 1 alone        → Higher fiber stress (not toxic; still cleans)
Tier 1 + Tier 3/4   → Moderate-High
Tier 2 alone        → Moderate (mainstream acceptable)
Tier 2 + Tier 3/4   → Moderate-Low
Tier 3/4 dominant   → Low fiber stress
Tier 4 dominant     → Minimal fiber impact
LAYER 2 — DETERGENT pH RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pH 7.0–9.5   → Optimal cleaning window. Enzyme-compatible.
pH 9.5–10.5  → Effective cleaning. Moderate protein fiber risk.
pH 10.5–11.5 → High cleaning power. Significant protein fiber risk.
pH >11.5     → Aggressive. Severe protein fiber degradation. Major penalty.
pH <7.0      → Specialized. Minor penalty for standard laundry.
Unknown pH   → No bonus. Minor credibility reduction.
Soap systems (pH 9–10+ residue): major penalties for protein fiber
use and sensitive skin residue.
LAYER 3 — BUILDER AND CO-BUILDER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER A — PREFERRED: Sodium Citrate, Citric Acid, Sodium Bicarbonate,
Sodium Carbonate (controlled), Zeolite 4A, GLDA, MGDA.
Rapidly biodegradable; low aquatic persistence. Eco bonus eligible.
TIER B — ACCEPTABLE: EDTA, Sodium Silicate, Polycarboxylates,
Sodium Gluconate. Moderate persistence. Neutral-to-moderate impact.
TIER C — PROBLEMATIC: STPP (phosphate — aquatic eutrophication); NTA
(persistent). Major Eco penalty.
LAYER 4 — ENZYME SYSTEM EVALUATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL CREDIT:
Protease — protein stains (blood, grass, food) — optimal pH 7.0–10.5.
Amylase — starch/carbohydrate stains — optimal pH 6.5–9.5.
Lipase — fat/grease (oils, body sebum) — optimal pH 7.0–9.0.
Cellulase — cotton fiber refreshing, pilling, color revival.
PARTIAL CREDIT: Mannanase, Pectinase (specific soil types).
SCORING RULES:
Protease + Amylase + Lipase blend = strong multi-enzyme; full credit.
Single enzyme = partial combination credit.
Enzyme at incompatible pH → loses efficacy credit.
Non-bio formula → Cleaning Efficiency ceiling vs bio-equivalent.
Enzyme claims at pH >11 → lose partial efficacy credit.
LAYER 4.5 — OPTICAL BRIGHTENER RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OBAs/FWAs are NOT cleaning agents. Perceptual whiteness illusion only.
Receive: Allergy/Sensitization Risk penalty; Residual Irritation Risk
penalty; Formulation Honesty penalty when marketed as cleaning
performance; Eco Impact reduction. Must be disclosed under Concerns.
Exception: OBAs in clearly marketed "whitening" formulas for white
fabrics only, not marketed for sensitive skin, not marketed as
"natural" → reduced penalty.
LAYER 5 — FRAGRANCE AND PRESERVATIVE EVALUATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRAGRANCE — LAUNDRY MANDATORY EVALUATION:
Fragrance retained in fabric fibers contacts skin for 8–24 hours/day.
Heat from washing/drying concentrates fragrance in fabric. Sensitization
risk substantially higher than brief rinse-off personal care contact.
Low risk: Fragrance-free; <0.5% estimated with IFRA compliance;
naturally-derived low-allergen systems.
Moderate risk: 0.5–2% load; standard synthetic fragrance; essential
oil blends with moderate sensitizers.
High risk: >2% load; heavy musk/synthetic without IFRA disclosure;
Nitromusks (AHTN, HHCB — persistent, possible endocrine disruption);
high concentration known allergens (Linalool, Limonene, Eugenol,
Geraniol, Cinnamal); "long-lasting freshness" = residue accumulation
acknowledgment = penalty.
High fragrance scoring impact: Allergy/Sensitization + Residual
Irritation + Eco Impact + Formulation Honesty penalties (if "gentle"
or "sensitive" claim is made simultaneously).
PRESERVATIVES:
High concern: MIT (sensitizer at laundry residue concentrations);
CMIT/MIT blends (significant contact allergy driver) → MANDATORY
Allergy/Sensitization penalty. Flag under Concerns.
BIT (moderate-high sensitization) → penalty.
Moderate concern: Phenoxyethanol, Sodium Benzoate.
Low concern: Citric Acid, fermentation-derived.
LAYER 5.5 — COLORANT PENALTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Artificial colorants provide no cleaning or fabric care function.
High concern: Red 40, Yellow 5, Yellow 6, Blue 1, Brilliant Blue,
synthetic dye blends → Allergy/Sensitization penalty, Ingredient
Quality penalty, Eco Impact penalty, Formulation Honesty penalty.
Flag under Concerns.
LAYER 6 — CORE SCORING SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
SAFETY [DOMINANT — weight 0.25]
Surfactant residue irritation risk on skin via fabric contact;
repeated-cycle chemical accumulation; sensitization potential from
fragrance residue; preservative safety; OBA residue exposure;
colorant burden; long-term fabric contact tolerance.
CALIBRATION: A mainstream LAS/SLES-based detergent with moderate
fragrance and sodium benzoate preservative used by a healthy adult
= moderate real-world residue risk — not extreme Safety penalty.
Reserve extreme penalties for MIT/CMIT + heavy fragrance combinations,
or genuine structural failure cases.
CLEANING EFFECTIVENESS [weight 0.20]
Particulate soil removal; protein stain performance; fat/oil stain
performance; carbohydrate stain performance; surfactant-to-enzyme
synergy; hard water performance; low-temperature cleaning capability.
ALLERGY / SENSITIZATION RISK [weight 0.15]
Fragrance allergen load (fabric-retained exposure); MIT/CMIT priority
risk; OBA contact allergy; repeated-cycle residue sensitization;
colorant residue allergy.
CALIBRATION: Moderate fragrance at realistic concentration in a
mainstream product = moderate allergy risk, not extreme.
ECO IMPACT [ELEVATED — weight 0.15]
Surfactant aquatic biodegradability; phosphate eutrophication risk;
synthetic musk/fragrance aquatic persistence; OBA aquatic load;
concentrated formula efficiency; rinse effluent burden.
STPP (phosphate builders) → major Eco penalty.
Nitromusks → Eco + Safety penalty.
LAS → moderate biodegradation penalty — honest assessment, not
catastrophic language.
INGREDIENT QUALITY [weight 0.10]
Surfactant system coherence; builder quality; enzyme system relevance;
fragrance load vs function justification; structural transparency;
absence of H3 decorative botanical loading.
SKIN COMPATIBILITY VIA FABRIC RESIDUE [weight 0.075]
Residual surfactant sensitization through fabric contact;
fragrance/OBA/preservative residue tolerance for sensitive/atopic
skin; daily-wear residue accumulation; long-term skin tolerance.
FABRIC COMPATIBILITY [weight 0.075]
Fiber integrity under repeated wash cycles; color and dye stability;
protein fiber safety at wash pH; elastane/spandex degradation risk;
fabric texture preservation.
CORE SCORE FORMULA:
Core Score =
(Safety × 0.25) + (Cleaning Effectiveness × 0.20) +
(Allergy/Sensitization × 0.15) + (Eco Impact × 0.15) +
(Ingredient Quality × 0.10) + (Skin Compatibility/Residue × 0.075) +
(Fabric Compatibility × 0.075)
LAYER 7 — SPECIALIZED LAUNDRY PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
STAIN REMOVAL EFFICIENCY
Multi-category stain performance; cold wash (30°C) performance;
enzyme-driven vs chemical-driven removal; hard water performance.
Ceiling: Non-bio formulas cannot achieve maximum relative to bio.
FABRIC INTEGRITY [DOMINANT]
Fiber degradation risk; color fastness; protein fiber safety; elastane
tolerance; fabric texture preservation; pH-mediated fiber damage.
Ceilings:
Tier 1 + pH >10.5                  → Max 1.8
Tier 1 + pH 9.5–10.5               → Max 2.5
Tier 1 + Tier 3/4 blend            → Max 3.0
Tier 2 dominant                    → Max 3.2
Tier 2 + Tier 3/4                  → Max 3.8
Tier 3/4 dominant                  → Max 4.3
Tier 3/4 + optimal pH + Cellulase  → Eligible for 5.0
Soap systems (pH >10, protein fibers) → Hard ceiling 1.5
CALIBRATION: Tier 2 dominant (SLES/LAS-blend) at moderate pH = 3.2–3.8.
This is MAINSTREAM acceptable range. Not a low score.
RESIDUAL IRRITATION RISK
Fragrance retention in fabric fibers; surfactant residue; OBA residue;
MIT/CMIT residue burden; daily skin contact from laundered fabric;
rinse-out efficiency. MIT/CMIT residue = mandatory elevated penalty.
RINSE-OUT PERFORMANCE
Surfactant rinse-out efficiency; builder dissolution; enzyme clearance;
fragrance compound clearance; low-rinse cycle performance.
AQUATIC ECOSYSTEM IMPACT
Surfactant aquatic biodegradability (primary); phosphate eutrophication;
synthetic musk aquatic persistence; OBA load; polymer persistence;
overall rinse effluent burden.
DOSING EFFICIENCY
Wash effectiveness per unit dose; concentrated formula efficiency;
overdosing risk design; environmental load per wash cycle.
MICROBIOME / HYGIENE BALANCE
Antibacterial agent use; resistance contribution risk; appropriate vs
excessive disinfection claims; fabric odor control (enzymatic preferred
over fragrance masking). Broad-spectrum antimicrobials (Triclosan,
QUATs) in standard detergent = penalty.
FORMULATION HONESTY
Fragrance-driven "freshness" as hygiene surrogate; OBA "brightening"
as cleaning surrogate; eco-washing without surfactant/builder evidence;
"gentle/sensitive" with MIT load; "natural/plant-based" with Tier 1
backbone; H3 decorative botanical loading; enzyme claims at
incompatible pH.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 scores.
Dominant: Fabric Integrity → primary interpretive.
Residual Irritation Risk → primary skin safety.
Aquatic Ecosystem Impact → primary environmental.
LAYER 8 — FINAL RATING FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Final Rating = (Core Score × 0.50) + (Specialized Performance × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) — requires:
Tier 3 or Tier 4 dominant surfactant system; pH ≤ 10.5 (preferably
8.0–9.5); multi-enzyme system (Protease + Amylase + Lipase minimum);
Fabric Integrity ≥ 3.5; Residual Irritation Risk ≥ 3.0; no phosphate
builders; no MIT/CMIT; low fragrance load (<1% estimated) or
fragrance-free; no OBA marketed as cleaning performance; Formulation
Honesty ≥ 3.5; no unjustified broad-spectrum antimicrobial claims.
DISQUALIFIERS: Phosphate-containing builders (STPP); MIT/CMIT heavy
preservation; heavy fragrance marketed as "freshness performance";
OBA-only "whitening" marketed as stain removal; "natural" claims with
Tier 1 surfactant backbone.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 PRODUCT PROFILE

## Product Classification

Short product classification.

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason.

### Effectiveness — ⭐X.X

Short structural reason.

### Allergy Risk — ⭐X.X

Short structural reason.

### Eco Impact — ⭐X.X

Short structural reason.

### Ingredient Quality — ⭐X.X

Short structural reason.

### Skin Compatibility — ⭐X.X

Short structural reason.

---

# 🧪 SPECIALIZED PERFORMANCE

## Cleaning + Skin Safety Analysis

### Cleansing / Application Efficiency — ⭐X.X

Short structural reason.

### Barrier Preservation — ⭐X.X

Short structural reason.

### Target Area Integrity — ⭐X.X

Short structural reason.

### Hydration Support — ⭐X.X

Short structural reason.

### Residual Dryness / Irritation Risk — ⭐X.X

Short structural reason.

### Microbiome Compatibility — ⭐X.X

Short structural reason.

### Cumulative Irritation Risk — ⭐X.X

Short structural reason.

### Formulation Honesty — ⭐X.X

Short structural reason.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Structural advantage
- Structural advantage

## Concerns

- Structural weakness
- Structural weakness

---

# 👤 TARGET COMPATIBILITY

## Area Suitability

### Sensitive Areas — ⭐X.X

Short compatibility explanation.

### Oily Areas — ⭐X.X

Short compatibility explanation.

### Dry Areas — ⭐X.X

Short compatibility explanation.

### Normal Areas — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Alternate-Day Use — ⭐X.X

Short explanation.

### Weekly Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

Short description covering cleaning feel, lather, and initial skin response.

## Medium-Term

Short description covering skin tolerance, dryness trajectory, and barrier response.

## Long-Term

Short description covering cumulative skin compatibility, sensitization risk, and fabric behavior.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List major ingredients and their functions.

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

3–5 concise user-friendly evidence-based reasons explaining the final score.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Output must be clean and consistent with all section structures
- Repeated-use behavior > single-use feel
- Long-term skin and fabric outcome > immediate sensory satisfaction
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Laundry Soap Evaluation Algorithm — Structured for cleansing efficiency analysis, barrier preservation assessment, residual irritation risk evaluation, and long-term skin compatibility realism. All scoring is structural and evidence-informed.
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
              "You are a strict clinical formulation evaluation engine."
          },

          {
            role: "user",

            content:
              prompt
          }

        ]

      });

    console.log(
      "LAUNDRYSOAP TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();
