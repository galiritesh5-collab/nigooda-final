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
        "BODYSCRUB ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 5 — BODY SCRUB & EXFOLIATOR EVALUATION ENGINE  |  Version 3.0
================================================================================
Scientific Anchors: Grove et al. (1982) — mechanical exfoliation and barrier;
Fluhr et al. (2001) — surfactant barrier science; Lodén (2003) — post-exfoliation
recovery; Rawlings & Matts (2005) — stratum corneum desquamation; FDA (2012) —
microplastic ban; Niculescu & Grumezescu (2022) — microplastic environmental impact;
Berardesca & Maibach (1996) — skin sensitivity and exfoliation; Leyden & Rawlings
(2002) — AHA exfoliation science.
────────────────────────────────────────────────────────────────────────────────
ALGORITHM 5 — MANDATORY SCORING & EVALUATION RULES
(Self-contained; no external global rules section required)
────────────────────────────────────────────────────────────────────────────────
Universal Scoring Principles
- NO MEDICAL CLAIMS anywhere in output
- No marketing influence on scoring
- Structural and safety weakness overrides sensory satisfaction
- Repeated chronic-use behavior takes priority over single-application feel
- Long-term skin outcome takes priority over immediate sensation
- Post-application burning, stinging, redness, or tightness = structural failure —
  never interpret as "working"
- Natural/botanical/organic positioning does not automatically confer safety
- Ingredient count does not indicate quality
Algorithm-Specific Mandatory Rules — Body Scrub & Exfoliator
- Particle harshness tier MUST be classified before scoring begins
- Double Disruption MUST be assessed when surfactant + abrasive co-system is present
- Rinse-off active efficacy MUST be classified — Category C actives receive no
  meaningful credit
- Emollient architecture MUST be assessed before Barrier Preservation and
  Moisturisation scoring
- Walnut/apricot kernel powder = high-hazard particle classification regardless of
  "natural" positioning
- Microplastic particles = automatic Eco Impact ceiling 2.0
- Post-use tightness or redness = barrier disruption signal, NOT efficacy
  confirmation
- Grit richness ≠ exfoliation quality
- Full-body marketing claims scored against Zone C (most sensitive general body skin)
Bias Neutralisation — Body Scrub & Exfoliator
- High grit = exfoliation quality illusion — grit is a micro-trauma risk metric
- Post-use tightness = deep cleansing/effective exfoliation illusion — it is barrier
  disruption
- "Natural" particle (walnut, apricot) = safe exfoliant illusion — evaluate geometry
  and hardness
- Foam richness = cleansing power illusion
- Ingredient-count quality illusion
- Fragrance freshness = exfoliation efficacy illusion
Fragrance Concentration Confidence Logic (R3 Applied)
- Post-exfoliation skin is hyperabsorptive — fragrance penetration significantly
  elevated vs standard rinse-off
- This hyperabsorptive window amplifies sensitization risk — post-exfoliation
  context elevates fragrance concern even for moderate INCI positioning
- Heavy fragrance penalties still require convergent multiple indicators, but
  post-exfoliation context lowers the threshold for "elevated concern"
- Use "Potential sensitization concern — post-exfoliation hyperabsorption context"
  when concentration certainty is limited
Essential Oil Risk Calibration (R2 Applied)
- Post-exfoliation hyperabsorption context elevates essential oil concern vs standard
  rinse-off — even moderate essential oil loads warrant concern notation
- Phototoxic oils: mandatory flag for furocoumarin oils given body zone sun exposure
  risk post-exfoliation
- Strong penalties still require high-position loading, stacked sensitizers, or
  compounding factors; but post-exfoliation context is a compounding factor in itself
- Oxidation-prone essential oil blends without stabilisation evidence: maintained
  concern flag; not automatically worst-case
Colorant Hazard Language (R1 Applied)
- Azo dye concern retained as mechanistic and precautionary toxicology concern
- Post-exfoliation context elevates precautionary weighting due to temporarily
  elevated skin permeability
- Penalties retained; certainty language recalibrated
────────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE & SYSTEM OBJECTIVE
────────────────────────────────────────────────────────────────────────────────
Reward body scrubs demonstrating:
- Effective mechanical exfoliation without epidermal micro-laceration or capillary
  trauma
- Safe abrasive particle architecture — smooth geometry, appropriate hardness,
  adequate dissolution or controlled size
- Barrier preservation under physical exfoliation stress — emollient/occlusive
  compensation for post-exfoliation lipid loss
- Appropriate surfactant architecture when cleansing is combined — mild/very mild
  surfactants mandatory in double-disruption context
- Microbiome compatibility under combined mechanical and chemical exfoliation stress
- Low cumulative micro-trauma risk under repeated use
- Evidence-based rinse-off active deployment with realistic contact-time credit
- Environmental responsibility — biodegradable particle systems; no microplastics
Mandatory penalties for:
- Jagged, irregular, high-hardness particle architecture (walnut shell, apricot
  kernel) — high-hazard particle classification
- Double disruption: high-hazard abrasive + harsh surfactant co-system
- Foam-first or fragrance-first sensory engineering masking structural particle
  harshness
- Plastic microbeads — environmental disqualifier
- Rinse-off active inflation in post-exfoliation context
- Post-exfoliation tightness or redness as "deep exfoliation working" narrative
▸ Post-use tightness or redness is a barrier disruption signal, not an efficacy
  indicator.
▸ Grit intensity does not determine exfoliation quality.
────────────────────────────────────────────────────────────────────────────────
LAYER 1 — PARTICLE ABRASIVE TIER SYSTEM
────────────────────────────────────────────────────────────────────────────────
MANDATORY: All abrasive particles must be classified by safety tier before scoring.
Scientific Basis
Key particle characteristics: (1) Geometry — spherical/smooth vs irregular/angular;
(2) Hardness — Mohs scale; (3) Size; (4) Dissolution behaviour; (5) Concentration.
Walnut shell (Juglans regia) Mohs hardness ~3-4; irregular angular geometry; multiple
clinical dermatology case reports of facial laceration and granulomatous inflammation.
High-hazard classification is evidence-based.
HIGH-HAZARD / HARSH PARTICLES
Examples: Walnut Shell Powder (Juglans regia), Apricot Kernel Powder (Prunus
armeniaca), Peach Kernel Powder, Pumice (Mohs 6; irregular), Crushed nut/seed shells,
Large undissolved salt crystals (≥2mm directly on skin), Plastic microbeads
(polyethylene, polypropylene, nylon — EU Regulation 2023/2055 restricts).
Mechanism: Irregular particle edges create micro-lacerations at histologically
detectable depth; capillary trauma; chronic low-grade inflammation from repeated use.
Scoring Impact:
- Mandatory Safety penalty — floor at 1.5
- Barrier Preservation ceiling: 1.5 (particle alone) / 1.0 (+ harsh surfactant)
- Over-Exfoliation Risk ceiling: 2.0
- Cumulative Irritation Risk ceiling: 2.0
- Hard disqualifier for > 4.0 score
- Cannot be labelled "gentle exfoliation" — Formulation Honesty penalty mandatory
MODERATE-RISK PARTICLES
Examples: Coarse sea salt (non-dissolving large crystals), Coarse brown sugar (partial
dissolution), Bamboo powder, Rice bran.
Moderate abrasion without severe laceration risk; higher risk on thin-skin zones.
Scoring Impact: Moderate Safety penalty; Barrier Preservation ceiling 2.8.
MILD / LOW-TRAUMA PARTICLES
Examples: Fine sea salt, Fine sugar (partially dissolving), Jojoba Beads (spherical
wax ester — rolling-ball action; non-lacerating; biodegradable), Finely milled oat
powder, Finely milled rice flour, Poppy seeds.
Jojoba Bead Special Classification: Perfectly spherical geometry = rolling-ball
action. Low micro-trauma regardless of hardness. Biodegradable.
Scoring Impact: Eligible for good Barrier Preservation (up to 4.0 with emollient
support).
VERY MILD / SAFE PARTICLES
Examples: Finely milled dissolving sugar (complete dissolution), Finely milled brown
sugar (high dissolution rate), Microcrystalline cellulose spheres (biodegradable;
spherical), Synthetic silica spheres (controlled size; spherical; body-safe certified),
Very fine kaolin or clay-based exfoliants.
Scoring Impact: Eligible for maximum Barrier Preservation; lowest cumulative
micro-trauma risk; environmental bonus for biodegradable systems.
OUTPUT NOTE: Do not use tier number labels in consumer-facing output. Describe as:
"high-abrasion irregular exfoliating particles," "moderately abrasive coarse crystal
system," "gentle spherical jojoba bead exfoliant," "very mild dissolving sugar
particles," etc.
────────────────────────────────────────────────────────────────────────────────
LAYER 1.5 — BODY ZONE SENSITIVITY MODIFIER
────────────────────────────────────────────────────────────────────────────────
Zone                  Areas                        Minimum Particle Safety  Notes
Zone A (Thick)        Soles, elbows, knees, back   Moderate acceptable      High keratin
Zone B (Standard)     Arms, legs, torso             Mild recommended         Moderate with caution
Zone C (Sensitive)    Décolleté, inner arms,        Mild-very mild mandatory  Thin epidermis;
                      bikini-adjacent, abdomen                               capillary proximity
Zone D (Face/Neck)    Face, neck                    Body scrubs NOT          Auto-fail face
                                                     appropriate              application
▸ Full-body marketing claims must be scored against Zone C.
────────────────────────────────────────────────────────────────────────────────
LAYER 2 — DOUBLE DISRUPTION RULE
────────────────────────────────────────────────────────────────────────────────
MANDATORY ASSESSMENT: Mechanical exfoliation increases TEWL, elevates barrier
permeability, and removes NMF. Adding harsh surfactants amplifies lipid depletion
synergistically.
Combination                                       Double Disruption    BP Ceiling
High-hazard particle + harsh surfactant           SEVERE               1.0
High-hazard particle + moderate surfactant        MODERATE-HIGH        1.5
Moderate particle + harsh surfactant              MODERATE-HIGH        2.0
Moderate particle + moderate surfactant           MODERATE             2.5
Mild particle + harsh surfactant                  MODERATE             2.8
Mild particle + mild surfactant                   LOW                  4.0
Very mild particle + very mild surfactant/oil     MINIMAL              Eligible for 5.0
▸ Even mild surfactants cannot fully neutralise high-hazard abrasive disruption.
────────────────────────────────────────────────────────────────────────────────
LAYER 3 — SURFACTANT HARSHNESS TIER SYSTEM (SCRUB CONTEXT)
────────────────────────────────────────────────────────────────────────────────
Same surfactant classification as Algorithm 1, Layer 1, with double-disruption
modifier applied.
HARSH SURFACTANTS: SLS, ALS, Sodium C14-16 Olefin Sulfonate
MODERATE SURFACTANTS: SLES, SLI, Disodium Laureth Sulfosuccinate
MILD SURFACTANTS: CAPB, Sodium Cocoamphoacetate, Sodium Lauroyl Sarcosinate
VERY MILD SURFACTANTS: Decyl Glucoside, Coco Glucoside, Sodium Cocoyl Glutamate
OIL-ONLY SCRUBS: Emollient architecture assessed. Post-exfoliation oil residue =
Barrier Preservation credit. Non-comedogenic oil selection = Skin Compatibility credit.
────────────────────────────────────────────────────────────────────────────────
LAYER 4 — EMOLLIENT AND BARRIER SUPPORT SYSTEM
────────────────────────────────────────────────────────────────────────────────
Post-exfoliation skin is temporarily compromised and hyperabsorptive. Emollient/
occlusive components influence immediate post-exfoliation barrier behaviour.
Emollient Tier A — High Barrier Support:
Shea Butter, Cocoa Butter, Mango Butter, Jojoba Oil, Sweet Almond Oil, Sunflower
Seed Oil (high linoleic — barrier-compatible FA profile), Squalane, Ceramide blends,
Caprylic/Capric Triglyceride.
Emollient Tier B — Moderate Barrier Support:
Coconut Oil (effective but comedogenic concern), Argan Oil, Rosehip Oil, Avocado Oil,
Mineral Oil, Petrolatum.
Emollient Tier C — Minimal Barrier Support:
Decorative botanical extracts without meaningful concentration; fragrance-dominant
oil blends; trace-level additions as marketing items.
▸ Meaningful emollient loading (typically ≥3% of formula) required for credit.
  Trace oil additions in surfactant-water base do not qualify.
────────────────────────────────────────────────────────────────────────────────
LAYER 5 — RINSE-OFF ACTIVE EFFICACY (SCRUB CONTACT TIME)
────────────────────────────────────────────────────────────────────────────────
Body scrub contact time: approximately 60-120 seconds. Post-exfoliation skin is
temporarily hyperabsorptive — slightly increases penetration of lipophilic actives
but does not meaningfully change pharmacokinetics of hydrophilic macromolecules.
Active Category       Examples                         Rinse-off Scrub Credit
Category A (Full)     Salicylic Acid (BHA), Lactic      Full credit — lipophilic or
                      Acid (AHA-complement), Urea        small molecule; enhanced
                      (keratolytic partial)              post-exfoliation penetration
Category B (Partial)  Glycerin, Panthenol, Allantoin,   Partial credit — brief
                      Natural enzymes (papain,           substantive benefit
                      bromelain — enzymatic exfol.)
Category C (Decor.)   Vitamin C, Retinoids, Peptides,   No major efficacy credit —
                      Collagen, Hyaluronic Acid,         contact time insufficient
                      Antioxidant botanicals
▸ Category C actives as primary efficacy claims trigger Ingredient Quality and
  Formulation Honesty penalties.
────────────────────────────────────────────────────────────────────────────────
LAYER 6 — ENVIRONMENTAL IMPACT RULE
────────────────────────────────────────────────────────────────────────────────
Body scrubs generate direct particle rinse-off into waterways.
MICROPLASTIC CLASSIFICATION: Polyethylene, Polypropylene, Nylon (Polyamide) beads —
non-biodegradable synthetic microplastics. EU Regulation 2023/2055 restricts use
(October 2023). US FDA Microbead-Free Waters Act (2015): banned rinse-off microbeads.
Products containing these materials: automatic Eco Impact ceiling 2.0.
Biodegradable systems (OECD 301B/302B): Sugar (complete biodegradation <3 days),
Jojoba beads (≥90% in 28 days), Microcrystalline cellulose (>90% in 28 days),
Sea salt (inorganic — freshwater accumulation separately assessed).
▸ Microplastic or non-biodegradable synthetic bead systems: Eco Impact ceiling
  maximum 2.0.
────────────────────────────────────────────────────────────────────────────────
LAYER 7 — CORE SCORING SYSTEM  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) +
             (Eco Impact × 0.10) + (Ingredient Quality × 0.15) +
             (Skin Compatibility × 0.15)
SAFETY [Weight: 0.25]
Evaluates: Particle classification and micro-trauma risk; double disruption
architecture; surfactant harshness if present; barrier disruption trajectory under
repeated use; sensitization potential (fragrance/colorants amplified post-exfoliation
— R1 and R3 applied); cumulative inflammatory load.
▸ Post-use redness, micro-tears, or tightness = Safety penalty triggers.
EFFECTIVENESS [Weight: 0.20]
Core Question: Can the scrub effectively exfoliate dead cells while maintaining skin
stability under repeated use?
Evaluates: Stratum corneum renewal support; zone exfoliation performance; rinse-off
active efficacy; cleansing performance; emollient post-exfoliation contribution.
ALLERGY RISK [Weight: 0.15]
Elevated vs standard rinse-off: post-exfoliation hyperabsorptive skin increases
allergen penetration; fragrance and colorant allergens absorbed in this window have
lower sensitization threshold. Concentration confidence logic applied with
post-exfoliation context amplification note.
ECO IMPACT [Weight: 0.10]
Particle biodegradability is primary eco concern in body scrubs. Microplastics =
automatic 2.0 ceiling. Surfactant biodegradability also assessed.
INGREDIENT QUALITY [Weight: 0.15]
Evaluates: Particle system coherence and safety logic; surfactant coherence; emollient
quality; rinse-off active honesty; formulation synergy; structural transparency.
SKIN COMPATIBILITY [Weight: 0.15]
Evaluates: Repeated-use tolerance at recommended frequency (1-3x weekly for most);
post-exfoliation barrier resilience; sensitivity zone compatibility; microbiome
stability; long-term tolerance.
────────────────────────────────────────────────────────────────────────────────
LAYER 8 — SPECIALIZED PERFORMANCE SCORES  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
EXFOLIATION EFFICIENCY
Evaluates: Dead skin cell removal; stratum corneum renewal; zone efficacy (calluses,
KP); chemical exfoliation complement (AHAs, BHAs, enzymes); dissolution behaviour.
NOTE: Dissolving particles achieving effective exfoliation with progressively lower
trauma = structural advantage.
CEILING: High-hazard irregular particle systems cannot achieve maximum Exfoliation
Efficiency — micro-trauma risk overrides raw abrasive intensity.
BARRIER PRESERVATION [DOMINANT]
Evaluates: TEWL disruption risk; lipid preservation and emollient compensation;
barrier recovery speed; repeated-use resilience.
System Configuration                         Barrier Preservation Ceiling
High-hazard particle + harsh surfactant       Max 1.0
High-hazard particle dominant                 Max 1.5
High-hazard particle + mild/very mild         Max 2.0
Moderate particle dominant                    Max 2.8
Moderate particle + mild/very mild            Max 3.2
Mild particle dominant                        Max 3.8
Mild particle + high barrier support emollient Max 4.2
Very mild particle + high barrier emollient   Max 5.0
MOISTURISATION / EMOLLIENT SUPPORT
Evaluates: Post-exfoliation skin hydration; residual emollient film; humectant
contribution; reduction of post-exfoliation dehydration.
NOTE: Moisturisation in scrubs is inherently limited by rinse-off design. Oil-based
scrubs leaving emollient residue receive structural credit that aqueous scrub systems
cannot achieve.
OVER-EXFOLIATION RISK
Evaluates: Risk of epidermal damage under repeated use at recommended frequency;
particle hazard classification under long-term use accumulation; barrier thinning
trajectory; inflammatory accumulation; micro-tear and capillary damage risk.
RULE: Daily use of high-hazard or moderate-risk particle scrubs is structurally
inadvisable — floor at 1.0-1.5 for high-hazard particles used daily.
MICROBIOME COMPATIBILITY
Evaluates: Commensal preservation under mechanical + chemical stress (dual-pathway
disruption assessed separately); surfactant disruption risk; antimicrobial selectivity.
NOTE: Mechanical disruption physically displaces surface microbiome — a distinct
pathway additional to chemical disruption; dual-pathway penalty applied.
CUMULATIVE IRRITATION RISK
Evaluates: Repeated particle micro-trauma; fragrance accumulation in post-exfoliation
hyperabsorptive state (R3 amplification applied); essential oil penetration risk
post-exfoliation (R2 context applied); preservative sensitization; colorant
penetration (R1 concern, elevated post-exfoliation); chronic inflammatory burden from
combined abrasion + chemical exposure; frequency-weighted mechanical and chemical
exposure over weeks/months.
FORMULATION HONESTY
Evaluates: Grit-dependent exfoliation perception marketing; fragrance-driven smooth
skin claims; decorative botanical loading; rinse-off active inflation; "deep
exfoliation"/"skin renewal" claims without particle safety support; environmental
claims without biodegradable particle evidence; "natural" particle claims (walnut,
apricot) used to neutralise high-hazard classification — among the most egregious
Formulation Honesty failures in body care.
Specialized Score Calculation:
Specialized Performance Score = Average of all 7 specialized scores.
Dominant: Barrier Preservation (primary), Cumulative Irritation Risk (primary
penalty), Over-Exfoliation Risk (secondary penalty).
────────────────────────────────────────────────────────────────────────────────
LAYER 9 — FINAL RATING & HIGH SCORE CRITERIA
────────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
High Score Eligibility (> 4.0):
- Mild or very mild dominant particle system (spherical, smooth, or dissolving)
- Mild or very mild surfactant (if surfactant present) OR oil-based emollient system
- Barrier Preservation ≥ 3.5
- Cumulative Irritation Risk ≥ 3.0
- Over-Exfoliation Risk ≥ 3.0
- No rinse-off active inflation
- No microplastic particle system
- Formulation Honesty ≥ 3.5
- Biodegradable particle system (preferred for Eco Impact eligibility)
Hard Disqualifiers:
- High-hazard irregular particle systems (walnut, apricot kernel, irregular nut/seed
  shell powders) regardless of concentration or claims
- Plastic microbeads of any type
- Double disruption: high-hazard particle + harsh surfactant
- Heavy fragrance loading (top-3 INCI) with convergent indicators in post-exfoliation
  context

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 SCRUB PROFILE

## Functional Classification

Short scrub classification.

Examples:
- Safe Daily-Zone Gentle Scrub
- Balanced Oil-Based Body Scrub
- Hazardous Mechanical Scrub
- Aggressive Salt Scrub — Zone-Limited Use Only
- Mild Sugar + AHA Exfoliation Scrub

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering particle system safety, barrier friendliness, emollient support, pH compatibility, long-term skin behavior, and overall formulation balance.

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

## Exfoliation + Barrier Analysis

### Exfoliation Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Moisturization / Emollient Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Over-Exfoliation Risk — ⭐X.X

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

# 👤 SKIN TYPE COMPATIBILITY

## Population Compatibility

### Dry Skin — ⭐X.X

Short compatibility explanation.

### Oily Skin — ⭐X.X

Short compatibility explanation.

### Combination Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Acne-Prone Skin (Body) — ⭐X.X

Short compatibility explanation.

### KP-Prone Skin — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Usage Frequency Safety

### Daily Use — ⭐X.X

Short explanation.

### 3× Weekly — ⭐X.X

Short explanation.

### 1–2× Weekly — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Exfoliation feel and skin texture
- Post-use tightness or softness
- Irritation and redness signals

## Medium-Term

- Skin smoothness trajectory
- Barrier response
- Dryness and sensitivity changes
- Tolerance development

## Long-Term

- Barrier stability
- Over-exfoliation risk
- Microbiome stability
- Overall skin outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting particle and abrasive system, surfactant system (if present), emollient and barrier behavior, irritation risk, active performance, long-term skin outcome, and environmental impact.

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
- Mention harsh colorants, preservatives, and fragrances in output
- No grit-volume bias — grit intensity ≠ exfoliation quality
- Structural weakness overrides cosmetic feel
- Particle harshness tier must be classified before scoring
- Double disruption must be assessed when surfactant and particle co-system is present
- pH compatibility must be assessed for all formulations
- Emollient architecture must be classified before barrier and moisturization scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-use tightness or redness = structural failure signal
- Natural nut and seed powders ≠ safe (walnut and apricot kernel are structural hazards)
- Coffee scrub trend ≠ automatic safety — evaluate particle geometry
- Salt = mineral-rich marketing does not override salt crystal dissolution risk
- Microplastic particles = automatic Eco Impact ceiling 2.0
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Body Scrub Evaluation Algorithm — Structured for particle safety analysis, barrier disruption realism, and long-term exfoliation compatibility evaluation. All scoring is structural and evidence-informed.

---
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
              "You are a strict body scrub structural evaluation engine."
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