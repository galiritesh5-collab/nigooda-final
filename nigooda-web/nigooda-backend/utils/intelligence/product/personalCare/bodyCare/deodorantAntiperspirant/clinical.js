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
        "DEODORANTANTIPERSPIRANT ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 3 — DEODORANT & ANTIPERSPIRANT EVALUATION ENGINE  |  Version 3.0
================================================================================
Scientific Anchors: Darbre et al. (2004) — aluminum and breast tissue; Callewaert
et al. (2014, 2021) — axillary microbiome; Natsch et al. (2006) — thioalcohol odour
pathway; Troccaz et al. (2015) — Staphylococcus and odour; FDA CFR 21 Part 350 —
antiperspirant drug products; Basketter et al. (2010) — fragrance sensitization in
deodorants; Emter & Natsch (2008) — axillary secretion biochemistry.
────────────────────────────────────────────────────────────────────────────────
ALGORITHM 3 — MANDATORY SCORING & EVALUATION RULES
(Self-contained; no external global rules section required)
────────────────────────────────────────────────────────────────────────────────
Universal Scoring Principles
- NO MEDICAL CLAIMS anywhere in output
- No marketing influence on scoring
- Structural and safety weakness overrides sensory satisfaction
- Repeated chronic-use behavior takes priority over single-application feel
- Long-term skin outcome takes priority over immediate sensation
- Post-application burning or stinging = structural failure signal
- Natural/botanical/organic positioning does not automatically confer safety
- Ingredient count does not indicate quality
Algorithm-Specific Mandatory Rules — Deodorant & Antiperspirant
- Active system tier MUST be classified before scoring — Antiperspirant /
  Deodorant-Mechanistic / Deodorant-Masking
- Alcohol content MUST be assessed as leave-on burden — post-shave amplification
  must be noted
- Aluminum-free products receive 1.0 on Sweat Control Efficacy — no exceptions
- Fragrance-only primary mechanism cannot achieve > 2.0 Odour Control Efficacy
- Post-shave application context must be explicitly considered in safety assessment
- Baking soda (sodium bicarbonate) systems: mandatory barrier disruption and
  irritation penalty — repeated axillary irritation and contact dermatitis
  association well-documented. Expressed through barrier harshness and irritation
  trajectory, not pH language.
Bias Neutralisation — Deodorant & Antiperspirant
- Aluminum-free = safer deodorant automatic assumption — depends on what replaces it
- Baking soda = gentle natural deodorant illusion — documented axillary contact
  dermatitis risk; structurally harmful under repeated use
- Fragrance freshness = deodorant efficacy illusion — masking ≠ mechanistic control
- "Crystal" / mineral alum = safe for all users illusion — concentration context
  required
- "Clean/natural" = microbiome-friendly illusion without supporting architecture
Fragrance Concentration Confidence Logic (R3 Applied)
- Axillary leave-on application: IFRA Category 1 (axillary/intimate leave-on) — the
  strictest IFRA limits — apply
- Post-shave application multiplies sensitization load by estimated 3-5x — this is a
  zone-specific amplification that overrides concentration uncertainty mitigation
- For products not specifically marketed for post-shave: moderate uncertainty
  mitigation applies; use "Potential sensitization concern" when concentration
  certainty is low
- Heavy penalties require convergent multiple indicators including leave-on status
  and IFRA Category 1 zone
Essential Oil Risk Calibration (R2 Applied)
- Axillary leave-on context = elevated essential oil concern
- Post-shave amplification maintains strong concern for any sensitizing essential oil
  regardless of concentration confidence
- For non-post-shave products: trace-level essential oils may receive contextual
  concern rather than automatic maximum penalty if no additional indicators present
- Phototoxic oils: flag for arms/underarm sun-exposed context
Colorant Hazard Language (R1 Applied)
- Azo dye penalties retained but classified as mechanistic and precautionary
  toxicology concern
- Leave-on axillary context elevates precautionary weighting
────────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE & SYSTEM OBJECTIVE
────────────────────────────────────────────────────────────────────────────────
Reward deodorants and antiperspirants demonstrating:
- Effective mechanistic odour control — targeting odour-producing bacterial
  biochemistry (not fragrance masking)
- Effective sweat control when antiperspirant is claimed — aluminum salt at
  functional duct-plugging concentration
- Axillary skin barrier preservation under repeated daily leave-on application
- Microbiome-selective antimicrobial activity
- Low cumulative sensitization risk under daily leave-on axillary exposure
- Honest performance positioning — deodorant vs antiperspirant distinction reflected
  in ingredient architecture
Mandatory penalties for:
- Fragrance-as-primary-odour-control misrepresentation
- Aluminum-free products claiming antiperspirant sweat reduction equivalence
- Baking soda systems: documented repeated axillary irritation and contact dermatitis
  association — mandatory disruption and irritation penalty regardless of "natural"
  positioning
- High alcohol (>15%) leave-on axillary application
- Broad-spectrum antimicrobials without microbiome selectivity justification
- Decorative botanical loading presented as odour control mechanism
▸ Fragrance freshness is not odour control. Mechanistic action against odour
  biochemistry is the only acceptable primary efficacy standard.
────────────────────────────────────────────────────────────────────────────────
LAYER 1 — AXILLARY ODOUR SCIENCE & ACTIVE SYSTEM CLASSIFICATION
────────────────────────────────────────────────────────────────────────────────
Scientific Background: Axillary odour arises from bacterial enzymatic transformation
of odourless secretions. Primary pathways:
(1) Thioalcohol pathway — S. haemolyticus cleaves cysteine conjugates to release
    potent thioalcohols (3M3SH; perception threshold ~0.0001 ng/L — Natsch et al. 2006)
(2) E3 carboxylic acid pathway — Corynebacterium spp. and S. epidermidis convert
    HMHA into 3-methyl-2-hexenoic acid (3M2H — Troccaz et al. 2015)
(3) Steroid pathway — androstenone/androstenol release by bacterial deconjugation
Effective deodorant actives must address at least one of these biochemical pathways.
ANTIPERSPIRANT ACTIVES (Aluminum-Based)
Mechanism: Aluminum salts react with eccrine sweat to form aluminum hydroxide gel
plugs in sweat duct lumen, physically reducing eccrine output. Concentration required:
≥12% Aluminum Chlorohydrate (ACH) or ≥10% Aluminum Zirconium Tetrachlorohydrex Gly
(AZT). Clinical-strength: Aluminum Chloride 15-20%.
AZT demonstrates statistically superior sweat reduction vs equivalent ACH across
wash studies. Cumulative application for maximum effect (typically 4-7 days).
Safety context: Systematic reviews (Namer et al. 2008; SCCS 2020) found insufficient
evidence for causal breast cancer link at cosmetic-use concentrations.
Scoring Impact:
- Functional dose (≥12% ACH or ≥10% AZT) → Full antiperspirant efficacy credit
- Underdosed aluminum (<8%) → Partial credit — Formulation Honesty penalty if
  antiperspirant claim made
- Aluminum chloride (clinical) → Full efficacy + elevated irritation assessment
TARGETED ANTIMICROBIAL DEODORANT ACTIVES
Triethyl Citrate (TEC): Inhibits bacterial lipase enzyme activity. Bacteriostatic.
Selective — lower commensal disruption. Low sensitization. Full credit.
Zinc Ricinoleate: Adsorbs/encapsulates volatile odour molecules. Odour adsorption
mechanism (not bactericidal). Partial functional credit.
Capryloyl Glycine: Mild bacteriostatic toward S. haemolyticus. Low sensitization.
Partial credit.
Ethylhexylglycerin: Disrupts bacterial biofilm. Lower potency; synergistic. Partial
credit.
ODOUR ADSORPTION / NEUTRALISATION
Zinc Ricinoleate, Activated Charcoal (partial evidence), Cyclodextrins (encapsulate
odour molecules — partial functional credit), Magnesium Hydroxide/Oxide (indirect
mechanism; moderate efficacy).
▸ Baking Soda (Sodium Bicarbonate) Warning: Well-documented cause of axillary
  irritant contact dermatitis (typically 3-6 week delayed presentation) with repeated
  use. Repeated axillary irritation and contact dermatitis association observed with
  sodium bicarbonate dominant systems. Cannot achieve high Skin Compatibility scores.
  Mandatory barrier disruption and irritation penalty regardless of "natural"
  positioning.
PREBIOTIC / MICROBIOME-MODULATING ACTIVES
Prebiotic substrates (Inulin, FOS), Postbiotic ferment lysates. Favour
non-odour-producing commensals over S. haemolyticus. Partial credit — evidence
growing (Callewaert et al. 2021) but not yet equivalent to established actives.
FRAGRANCE-ONLY / MASKING SYSTEMS
Fragrance alone, essential oils, alcohol + fragrance combinations. Cannot receive
mechanistic odour control credit. Maximum Odour Control Efficacy score: 2.0.
▸ Fragrance-only deodorant = masking product. Formulation Honesty penalty mandatory
  if product claims mechanistic odour control.
────────────────────────────────────────────────────────────────────────────────
LAYER 2 — ALCOHOL ASSESSMENT (LEAVE-ON AXILLARY CONTEXT)
────────────────────────────────────────────────────────────────────────────────
Alcohol Concentration         Assessment                        Scoring Impact
No alcohol / <1%              Preferred for sensitive/post-shave No penalty
1-5% (non-primary role)       Minor concern — post-shave dryness Minor note
5-15% (spray/roll-on)         Moderate barrier disruption risk   Moderate Safety penalty
>15% (spray primary carrier)  Significant disruption — mandatory Strong Safety + Barrier
                               concern                            Preservation penalty
────────────────────────────────────────────────────────────────────────────────
LAYER 3 — AXILLARY MICROBIOME SCIENCE
────────────────────────────────────────────────────────────────────────────────
Axillary Taxa             Odour Contribution     Target for Deodorant?
S. haemolyticus           HIGH — 3M3SH           Primary target — selective reduction
Corynebacterium spp.      HIGH — 3M2H            Secondary target
S. epidermidis            LOW                    Preserve — protective commensal
Cutibacterium acnes       MILD                   Preserve — microbiome stabiliser
Micrococcus spp.          MINIMAL                Preserve
Ideal selectivity: preferential reduction of S. haemolyticus and Corynebacterium
while preserving S. epidermidis and Cutibacterium. Broad-spectrum agents eliminating
all taxa create recolonisation vacuum for high-odour species (paradoxical odour
worsening documented in chlorhexidine studies).
Microbiome Disruption Risk Classification:
- HIGH DISRUPTION: Chlorhexidine gluconate (>0.5%); Benzalkonium chloride (>0.1%);
  Triclosan (FDA OTC ban 2017); Strong essential oils (tea tree >2% leave-on);
  Sodium bicarbonate dominant systems (repeated barrier disruption pathway)
- MODERATE DISRUPTION: Alcohol >15%; Moderate QAC compounds
- LOW DISRUPTION: Triethyl Citrate (bacteriostatic, selective); Zinc Ricinoleate
  (adsorption — non-antimicrobial); Capryloyl Glycine; Aluminum salts (primarily
  physical mechanism); Prebiotic systems
────────────────────────────────────────────────────────────────────────────────
LAYER 4 — FRAGRANCE AND SENSITIZER RISK (AXILLARY LEAVE-ON)
────────────────────────────────────────────────────────────────────────────────
Fragrance in axillary leave-on products represents the highest sensitization-to-
exposure ratio in body care: axillary skin is thinner, more occluded, more permeable;
post-shaving removes stratum corneum, dramatically increasing penetration; daily 1-2x
application accumulates chronic sensitization load; heat and humidity increase
percutaneous absorption.
IFRA Category 1 (axillary/intimate leave-on) — the strictest IFRA limits — apply.
Confidence-weighted interpretation (R3): Post-shave application amplification
(3-5x estimated) overrides trace-level concentration uncertainty mitigation.
For non-post-shave products: use "Potential sensitization concern" language when
concentration certainty is limited.
Key sensitizers in deodorant fragrance: Farnesol (IFRA restricted), Linalool and
oxidation products, Limonene and oxidation products, Benzyl alcohol, Geraniol,
Citronellol, Eugenol, Oakmoss/treemoss extracts (Class 1B — IFRA prohibited in
leave-on).
▸ Post-shave application multiplies all sensitization and irritation risk by
  estimated factor of 3-5x vs unshaved application.
────────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) +
             (Eco Impact × 0.10) + (Ingredient Quality × 0.15) +
             (Skin Compatibility × 0.15)
SAFETY [Weight: 0.25]
Evaluates: Aluminum concentration and irritation trajectory; alcohol content and
axillary barrier impact; baking soda repeated-use barrier disruption and contact
dermatitis risk; post-shave application suitability; sensitization potential;
cumulative inflammatory burden; leave-on axillary skin permeability amplification.
EFFECTIVENESS [Weight: 0.20]
Core Question: Does the product mechanistically control odour and/or sweat?
Evaluates: Odour control mechanism (masking < adsorption < bacteriostatic <
microbiome-selective); antiperspirant efficacy if claimed; active dose sufficiency;
duration under heat and activity; architecture alignment.
▸ Fragrance masking alone cannot achieve elite effectiveness.
ALLERGY RISK [Weight: 0.15]
Evaluates: Leave-on axillary fragrance sensitization (IFRA Category 1, confidence-
weighted with post-shave amplification); essential oil sensitizers (context-calibrated
per R2); preservative sensitizers; aluminum sensitization (uncommon but documented);
repeated daily exposure accumulation.
ECO IMPACT [Weight: 0.10]
Evaluates: Aerosol propellant burden (HFC/HFO — GWP; VOC emissions); aluminum salt
environmental persistence; surfactant biodegradability; synthetic fragrance musk
bioaccumulation (PBT); packaging format. Roll-on and stick preferred over aerosol.
INGREDIENT QUALITY [Weight: 0.15]
Evaluates: Active system mechanistic coherence; odour control mechanism credibility;
alcohol architecture; functional synergy; transparency; absence of decorative loading.
SKIN COMPATIBILITY [Weight: 0.15]
Evaluates: Daily axillary tolerance including post-shave; barrier resilience under
repeated leave-on; contact dermatitis risk (baking soda mandatory documentation);
microbiome stability; long-term sensitization trajectory; cumulative inflammatory
burden.
────────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED PERFORMANCE SCORES  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
ODOUR CONTROL EFFICACY
Evaluates: Mechanistic tier; duration under heat and activity; coverage across
biochemical pathways; performance consistency.
CEILING RULE: Fragrance-only masking → Max 2.0 regardless of fragrance complexity.
SWEAT CONTROL EFFICACY
Evaluates: Aluminum duct-plugging mechanism; aluminum salt type (AZT > ACH);
concentration adequacy (≥12% ACH / ≥10% AZT); duration of sweat reduction.
HARD RULE: Aluminum-free products → 1.0 on Sweat Control Efficacy. No exceptions.
Products claiming antiperspirant function without adequate aluminum receive
Formulation Honesty penalty.
AXILLARY BARRIER PRESERVATION [DOMINANT]
Evaluates: Alcohol-related disruption; baking soda barrier disruption and irritation
trajectory (documented axillary contact dermatitis association); aluminum salt
irritation contribution; post-shave skin trauma; recovery capacity between
applications; long-term axillary skin health trajectory.
System Configuration                           Axillary Barrier Preservation Ceiling
High alcohol >15% dominant                     Max 2.5
Sodium bicarbonate dominant system             Max 2.5
Aluminum chloride clinical strength            Max 3.5 (irritation trade-off)
Moderate alcohol 5-15%                         Max 3.5
Alcohol-free, barrier-compatible               Up to 4.5
Alcohol-free, optimised, skin-conditioning     Eligible for 5.0
LONG-TERM SKIN TOLERANCE
Evaluates: Cumulative daily sensitization risk; microbiome stability trajectory;
baking soda contact dermatitis progression (typically 3-6 week delayed); alcohol
dryness accumulation; fragrance sensitization trajectory; recovery capacity.
NOTE: Short-term comfort does not equal long-term tolerance.
MICROBIOME COMPATIBILITY
Evaluates: Commensal preservation; antimicrobial selectivity; broad-spectrum
disruption risk; prebiotic credibility; sodium bicarbonate microbiome destabilisation
via repeated irritation pathway.
High-score eligibility requires TEC-based or zinc-ricinoleate-based mechanism,
or prebiotic system, or aluminum (physical — lower direct antimicrobial disruption).
CUMULATIVE IRRITATION RISK
Evaluates: Daily leave-on accumulation; fragrance sensitization chronology; essential
oil sensitization trajectory; aluminum repeated-use tolerance; baking soda cumulative
barrier and irritation damage; post-shave amplification factor.
AMPLIFICATION RULE: Post-shave application frequency × 3-5x estimated sensitization
and irritation load vs non-shaved.
FORMULATION HONESTY
Evaluates: Fragrance-as-odour-control misrepresentation; antiperspirant claims
without functional aluminum; "microbiome-friendly" without supporting architecture;
baking soda risks under-disclosed; "clean/natural" deodorant without mechanistic
actives; crystal/mineral alum claims without concentration context.
Specialized Score Calculation:
Specialized Performance Score = Average of all 7 specialized scores.
Dominant parameters: Axillary Barrier Preservation (primary), Cumulative Irritation
Risk (primary penalty), Odour Control Efficacy (primary functional).
────────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING & HIGH SCORE CRITERIA
────────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
High Score Eligibility (> 4.0):
- Mechanistic odour control active (targeted bacteriostatic minimum — TEC, zinc
  ricinoleate, capryloyl glycine)
- Alcohol-free or very low alcohol (<2%)
- No sodium bicarbonate dominant system (documented repeated-use irritation — must
  be absent for score > 4.0)
- Axillary Barrier Preservation ≥ 3.5
- Cumulative Irritation Risk ≥ 3.0
- No heavy fragrance as primary odour mechanism
- Formulation Honesty ≥ 3.5
- No broad-spectrum antimicrobial dominance
Hard Disqualifiers:
- Fragrance-only primary mechanism claiming deodorancy
- Sodium bicarbonate dominant formulation claiming gentle/natural status
- Antiperspirant claims without adequate aluminum dose (<8% ACH equivalent)
- High alcohol (>15%) with post-shave-optimised marketing
- Chlorhexidine or triclosan as primary antimicrobial active
body loation

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
================================================

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Gentle Mechanistic Deodorant
- Effective OTC Antiperspirant
- Harsh Baking Soda Deodorant
- Fragrance-Heavy Masking Deodorant
- Balanced Aluminum-Free Deodorant

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering active system type (antiperspirant / deodorant / masking), odor and sweat control mechanism, axillary barrier friendliness, pH compatibility, long-term skin behavior, and overall formulation balance.

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

## Axillary Skin Analysis

### Odor Control Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Sweat Control Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Axillary Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Long-Term Skin Tolerance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Microbiome Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cumulative Irritation Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Formulation Honesty — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Weaknesses

- Main structural weakness
- Main structural weakness
- Main structural weakness

---

# 👤 SKIN TYPE / CONDITION COMPATIBILITY

## Population Compatibility

### Normal Axillary Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Axillary Skin — ⭐X.X

Short compatibility explanation.

### Post-Shave Application — ⭐X.X

Short compatibility explanation.

### Hyperhidrosis / Heavy Sweating — ⭐X.X

Short compatibility explanation.

### Baking Soda Reactors — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Twice Daily Use — ⭐X.X

Short explanation.

### Post-Shave Daily Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Odor control feel
- Stinging and irritation signals
- Application comfort

## Medium-Term (2–4 Weeks)

- Sensitization development
- Skin tolerance changes
- Dryness or irritation accumulation
- Odor control consistency

## Long-Term (Months)

- Microbiome stability
- Contact dermatitis risk (baking soda products)
- Fragrance sensitization development
- Overall axillary skin outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting odor and sweat control mechanism, axillary barrier behavior, irritation and sensitization risk, active performance sufficiency, long-term skin outcome, pH impact (flag baking soda), and alcohol content (flag if >5%).

- Ingredient — Role
- Ingredient — Role

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

3–5 concise user-friendly evidence-based statements explaining the final rating.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Mention harsh colorants, preservatives, fragrances, and baking soda in output
- No fragrance-freshness bias
- Structural weakness overrides cosmetic feel
- Active system tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Alcohol content must be assessed as leave-on burden
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-use stinging = structural failure signal
- Fragrance freshness ≠ odor control efficacy
- Natural or baking soda ≠ safe (pH 9+ is structurally harmful to axillary skin)
- Aluminum-free ≠ antiperspirant (sweat control requires aluminum)
- No white marks ≠ better formulation quality
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Deodorant / Antiperspirant Evaluation Algorithm — Structured for axillary skin compatibility analysis, odor and sweat control mechanism realism, and long-term repeated-use safety evaluation. All scoring is structural and evidence-informed.
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
              "You are a strict deodorant/antiperspirant structural evaluation engine."
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