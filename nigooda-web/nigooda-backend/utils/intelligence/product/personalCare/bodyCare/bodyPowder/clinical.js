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
        "BODYPOWDER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 2 — BODY POWDER & DUSTING POWDER EVALUATION ENGINE  |  Version 3.0
================================================================================
Scientific Anchors: Langseth et al. (2008) — talc and ovarian cancer; Fiume et al.
(2015) — CIR talc safety assessment; Cunha et al. (2020) — cornstarch and Candida;
Larese Filon et al. (2016) — dermal absorption from powders; IARC Monograph 93
(2010); FDA talc testing guidance (2020); Mauer et al. (2000) — inhalation
toxicology; De Groot (2008) — fragrance contact allergy.
────────────────────────────────────────────────────────────────────────────────
ALGORITHM 2 — MANDATORY SCORING & EVALUATION RULES
(Self-contained; no external global rules section required)
────────────────────────────────────────────────────────────────────────────────
Universal Scoring Principles
- NO MEDICAL CLAIMS anywhere in output
- No marketing influence on scoring
- Structural and safety weakness overrides cosmetic elegance and sensory satisfaction
- Repeated chronic-use behavior takes priority over single-application feel
- Long-term skin outcome takes priority over immediate sensation
- Post-application burning, stinging, or persistent irritation = structural failure
- Fragrance freshness does not equal moisture-control performance
- Natural/botanical/organic positioning does not automatically confer safety
- Ingredient count does not indicate quality — evaluate architecture coherence
Algorithm-Specific Mandatory Rules — Body Powder
- Base carrier tier MUST be classified before scoring begins
- Inhalation risk MUST be assessed independently for every powder — cannot be
  offset by absorption performance
- Candida risk MUST be evaluated for cornstarch-dominant systems in any occluded or
  intimate zone
- Application zone MUST be determined and flagged before scoring — zone amplifies
  all risk scores
- Talc ≠ safe in intimate or infant use regardless of asbestos certification
- "Natural cornstarch" ≠ safe in intertriginous or intimate zones
- Inhalation risk is a non-offsettable safety penalty — superior absorption cannot
  raise a critical inhalation safety score
Talc Risk Calibration (R4 Applied)
- Talc safety language must distinguish precautionary toxicological interpretation
  from universally established causal consensus
- Cosmetic-grade asbestos-free talc for non-intimate general body use may be
  considered lower-risk within current regulatory frameworks; scoring should
  explicitly state when applying a "precautionary chronic exposure weighting"
- Intimate/perineal use concerns remain elevated — precautionary concern justified
  and IARC Group 2B classification stands for genital use
- Infant inhalation concerns remain critical and unreduced
- Asbestos contamination concern and discussion are retained
- Intimate-zone penalties are retained
- Inhalation assessment is retained
- Only over-certainty language is reduced — not the penalties themselves
Bias Neutralisation — Body Powder
- Fragrance = freshness/safety illusion — actively neutralise
- Fine powder = premium quality illusion — fine particle = elevated inhalation risk
- "Natural" base = safe assumption — evaluate structural chemistry regardless
- Talc "pure/certified" = safe for all zones illusion — zone matters
- "Clinically tested" = zone-neutral safety illusion
Fragrance Concentration Confidence Logic (R3 Applied)
- Leave-on powder format means IFRA Category 5 (leave-on body) limits apply
- Heavy fragrance penalties require convergent multiple indicators
- Intimate zone amplification is maintained regardless of confidence level —
  any fragrance in intimate zone receives elevated concern
- Fragrance in intertriginous zone: occlusion amplifies penetration — stronger
  penalties than general body leave-on
- When fragrance load certainty is moderate: use "Potential sensitization concern"
  with leave-on amplification note
Essential Oil Risk Calibration (R2 Applied)
- Leave-on powder context = elevated essential oil concern vs rinse-off
- Phototoxicity flags mandatory for furocoumarin oils on exposed body zones
- Even trace-level essential oils in intimate/intertriginous powder context warrant
  concern — zone amplification overrides trace-level mitigation logic
- General body leave-on: trace-level essential oils receive contextual concern;
  strong penalties require high-position loading or compounding factors
Colorant Hazard Language (R1 Applied)
- Azo dye concern classified as "mechanistic and precautionary toxicology concern"
- Intertriginous/intimate zone amplification increases precautionary weighting
- Penalties retained; certainty language recalibrated
────────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE & SYSTEM OBJECTIVE
────────────────────────────────────────────────────────────────────────────────
Reward body powders demonstrating:
- Effective moisture absorption with minimal skin barrier disruption or excessive
  desiccation
- Safe base carrier architecture — talc-free or verified asbestos-free cosmetic-grade
  talc used only on appropriate body zones
- Long-term safety under chronic daily leave-on exposure
- Microbiome compatibility in intertriginous and intimate zones
- Evidence-based antimicrobial selectivity where claimed
- Low cumulative inhalation risk — assessed independently of absorption performance
Mandatory penalties for:
- Talc with unverified asbestos-free certification status
- Talc in intimate, genital, or infant application zones regardless of certification —
  IARC Group 2B classification for genital use
- Cornstarch-dominant systems marketed for intertriginous or intimate use without
  Candida risk disclosure
- Boric acid inclusion — systemic absorption risk, especially through compromised or
  infant skin
- Heavy fragrance loading in leave-on powder
- Fine particle systems with uncharacterised inhalation risk
- Antimicrobial claims lacking selective evidence
▸ Inhalation risk is a standalone, non-offsettable safety parameter.
────────────────────────────────────────────────────────────────────────────────
LAYER 1 — BASE CARRIER SAFETY TIER SYSTEM
────────────────────────────────────────────────────────────────────────────────
MANDATORY: All base carriers must be classified by safety tier before scoring.
HIGH CONCERN BASE CARRIERS
Talc (Mg3Si4O10(OH)2) — Epidemiology: Multiple meta-analyses (Langseth et al. 2008;
Berge et al. 2018) show RR 1.24-1.31 for ovarian cancer with perineal talc use.
IARC classifies genital use talc as Group 2B (possibly carcinogenic). Primary
mechanism: inflammatory granuloma formation, retrograde migration via reproductive
tract. Asbestos contamination: FDA testing 2019-2020 found asbestiform fibres in
multiple commercial products; cosmetic-grade certification reduces but does not
eliminate contamination risk.
CALIBRATION (R4 APPLIED): The talc concern for genital/perineal use, infant use,
and inhalation risk is maintained as a precautionary elevated concern with regulatory
basis. For non-intimate general body zones, verified cosmetic-grade asbestos-free
talc may be considered lower-risk within current regulatory frameworks — scoring
must state this is applying a "precautionary chronic exposure weighting" when applied
to non-intimate general body use.
Also in high concern category: Boric acid (systemic absorption risk; toxic borate
accumulation), Heavy zinc oxide systems (non-barrier-justified concentrations).
Scoring Impact:
- Mandatory Safety penalty — floor at 1.5-2.0
- Intimate/infant zone: Safety floor at 1.0
- Inhalation Risk ceiling: 1.5 (unverified talc) / 2.5 (verified, general body only)
- Skin Barrier Safety ceiling: 2.0
- Cannot claim zone-neutral safety
- Scoring note required: state when applying precautionary chronic exposure weighting
MODERATE CONCERN BASE CARRIERS
Verified cosmetic-grade asbestos-free talc (general body only), Cornstarch dominant
in intertriginous/intimate zones, Fine particle silica (uncharacterised respirable
fraction).
Cornstarch microbiological risk: cornstarch is a fermentable polysaccharide substrate
supporting Candida albicans biofilm formation in warm, moist occluded environments
(Cunha et al. 2020). Risk is zone-specific: negligible on dry general body skin,
clinically relevant in groin, axilla, sub-mammary zones.
Scoring Impact:
- Moderate Safety penalty
- Candida Risk flag mandatory for intertriginous/intimate use
- Inhalation Risk ceiling: 2.5-3.5 depending on particle size
- Skin Barrier Safety ceiling: 2.5 (intertriginous) / 3.2 (general body)
MODERATE SAFETY BASE CARRIERS
Cornstarch (general non-occluded body areas only), Arrowroot powder, Rice starch,
Oat starch, Kaolin (light-grade minor component). Arrowroot and rice starch have
lower fermentable glucose availability than cornstarch, reducing Candida support.
LOW CONCERN / PREFERRED BASE CARRIERS
Tapioca starch (lowest Candida association; minimal fermentable substrate),
Magnesium carbonate (excellent moisture absorption; alkalinity assessment required),
Calcium carbonate (fine grade — mild alkalinity; assessment required),
Spherical silica (low-respirable-fraction, controlled particle size), Coarse-fraction
cosmetic-grade mica (minor component role), Bamboo powder (food-grade derived,
low inhalation risk when coarse-ground), Kaolin/clay (ultra-fine body-safe certified).
Scoring Impact:
- Eligible for maximum Safety scores on appropriate zones
- Transparency bonus eligible
OUTPUT NOTE: Do not use tier number labels in consumer-facing output. Describe as:
"high-concern talc base," "preferred low-risk tapioca starch base," "moderate-risk
starch system in occluded zone," etc.
────────────────────────────────────────────────────────────────────────────────
LAYER 2 — INHALATION RISK ASSESSMENT
────────────────────────────────────────────────────────────────────────────────
MANDATORY for every powder evaluation. Cannot be offset by any other score.
Scientific Basis
Talc inhalation: Talcosis (pulmonary granulomatosis) from occupational inhalation
is well-documented (Mauer et al. 2000). Respirable fraction (<4 micron aerodynamic
diameter) can deposit in alveoli. While cosmetic exposure is lower than occupational,
chronic daily application to large body areas accumulates meaningful inhalation burden.
Starch powders: Fine cornstarch/rice starch particulates can cause hypersensitivity
pneumonitis in sensitised individuals (rare).
Infant risk: Infants have higher minute ventilation per kg body weight and immature
airway defences — any powder applied near infant airways represents critical
inhalation risk regardless of base carrier.
Inhalation Risk Score Ceilings:
System                                                 Inhalation Risk Score Ceiling
Fine particle talc — unverified or intimate/infant     Max 1.5
Fine particle talc — verified, general body only       Max 2.5
Cornstarch / starch fine powder — loose format         Max 3.5
Low-concern base — coarse-particle, large-fraction     Max 4.5
Pressed/stick format (any base) — minimal airborne     +0.5 bonus vs loose equivalent
Infant/pediatric proximity — any base type             Max 2.0 regardless of base
────────────────────────────────────────────────────────────────────────────────
LAYER 3 — CANDIDA AND MICROBIOME RISK
────────────────────────────────────────────────────────────────────────────────
Mechanism: Warm, moist intertriginous skin creates conditions for Candida biofilm
formation when fermentable substrate is available. Powder in these zones provides
sustained substrate supply. Cornstarch-dominant powders in these zones are a
recognised clinical risk factor for cutaneous candidiasis.
Risk Classification:
- HIGH RISK: Cornstarch dominant + intertriginous or intimate zone; Broad-spectrum
  antimicrobials disrupting Lactobacillus species
- MODERATE RISK: Mixed starch systems in intertriginous zones; Magnesium carbonate
  at high alkalinity in occluded zones
- LOW RISK: Tapioca starch, arrowroot, rice starch on general body; Kaolin/clay
  systems; Non-occluded zones
▸ Cornstarch in intertriginous/intimate zones triggers mandatory Candida Risk flag.
────────────────────────────────────────────────────────────────────────────────
LAYER 4 — FRAGRANCE AND SENSITIZER RISK IN LEAVE-ON POWDER
────────────────────────────────────────────────────────────────────────────────
Body powders are leave-on products with prolonged skin contact, inhalation of
volatile fragrance compounds, and intertriginous/intimate zone amplification.
Fragrance penalties in powder are higher than in rinse-off cleansers.
Fragrance Risk Amplifiers Specific to Powder Format
- Fine particle powder aerosolisation disperses fragrance volatiles — inhalation
  adds respiratory sensitization pathway
- Leave-on contact (hours to all-day) — full IFRA Category 5 (leave-on, body)
  limits apply
- Intertriginous zone occlusion dramatically increases fragrance allergen penetration
- Intimate/genital zone: mucosal-adjacent tissue with highest dermal absorption rates —
  all fragrance at this zone receives critical penalty regardless of concentration
  confidence
- Daily use frequency: chronic repeated sensitization accumulation
Concentration Confidence Logic (R3 Applied in Powder Context):
- Intimate and intertriginous zones: zone-based amplification overrides concentration
  uncertainty mitigation — elevated concern applies regardless of confidence level
- General body zone: moderate or contextual penalties when concentration certainty
  is low; use "Potential sensitization concern" language
- Convergent indicators still required for maximum-certainty heavy fragrance penalty
  on general body zones
High Concern Fragrance Components in Powder:
- Undisclosed Fragrance / Parfum blend — unknown allergen mixture
- EU 26 listed allergens — linalool, limonene, geraniol, eugenol, isoeugenol,
  cinnamal, citral, coumarin, farnesol, benzyl alcohol, amyl cinnamal
- Polycyclic musks (galaxolide/HHCB, tonalide/AHTN) — PBT concern; bioaccumulation;
  endocrine disruption potential at intimate zone leave-on exposure
- Nitro musks — Musk ambrette and musk tibetene banned; others restricted
- Phthalate-associated fragrances — endocrine concern with intimate zone leave-on
────────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
NOTE: Safety (0.30) and Allergy Risk (0.20) carry elevated weight — powder is
leave-on with inhalation risk and intimate zone exposure, calibrated against CEI
principles for full-body leave-on applications.
Core Score = (Safety × 0.30) + (Effectiveness × 0.15) + (Allergy Risk × 0.20) +
             (Eco Impact × 0.10) + (Ingredient Quality × 0.10) +
             (Skin Compatibility × 0.15)
SAFETY [Weight: 0.30 — DOMINANT]
Evaluates: Base carrier classification; inhalation risk (non-offsettable); zone
amplification; fragrance sensitization (leave-on); systemic absorption risk (boric
acid, phthalate-associated fragrance in intimate zone); antimicrobial safety;
cumulative chronic-use trajectory. Precautionary chronic exposure weighting noted
explicitly in output when applicable.
EFFECTIVENESS [Weight: 0.15]
Evaluates: Moisture absorption capacity (mechanism — water-of-crystallisation,
adsorption, absorption); friction reduction; sebum absorption; odour management
(targeted antimicrobial vs fragrance masking); anti-chafing durability; uniformity;
long-term functionality under sweat load.
ALLERGY RISK [Weight: 0.20]
Evaluates: Fragrance exposure amplified by leave-on format (confidence-weighted
with zone amplification); essential oil sensitizers (context-calibrated per R2);
preservative sensitizers; botanical allergens; colorant sensitization (mechanistic
and precautionary concern — R1 applied); inhalation-route sensitization; IFRA
Category 5 compliance; intimate/intertriginous zone amplification.
ECO IMPACT [Weight: 0.10]
Evaluates: Ingredient sourcing sustainability; talc mining environmental burden;
starch renewable sourcing; synthetic musk bioaccumulation; packaging waste; mica
and silica microplastic risk.
INGREDIENT QUALITY [Weight: 0.10]
Evaluates: Base carrier coherence and safety credibility; fragrance honesty;
active functionality in powder format; structural transparency.
SKIN COMPATIBILITY [Weight: 0.15]
Evaluates: Daily-use tolerance in target zones; barrier and mucosal compatibility;
Candida and microbiome compatibility; occlusion vs breathability; long-term
tolerance under repeated leave-on exposure.
────────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED PERFORMANCE SCORES  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
MOISTURE ABSORPTION EFFICIENCY
Mechanism matters: Starch powders absorb via water-of-crystallisation and hydrogen
bonding. Talc adsorbs surface moisture only (low efficacy). Magnesium carbonate
absorbs via crystalline water integration. Saturation tolerance (caking at saturation
= formulation failure) assessed. High-concern base systems cannot achieve maximum
Moisture Absorption Efficiency regardless of marketing claims.
FRICTION REDUCTION AND ANTI-CHAFE PERFORMANCE
Lubricity hierarchy: Talc historically highest lubricity (platelet crystal geometry)
but unacceptable safety cost for many zones. Silica spheres and coarse mica provide
mechanical rolling-ball friction reduction. Starch powders provide moderate lubricity
via surface coating. Raw lubricity cannot override base carrier safety classification.
SKIN BARRIER SAFETY [DOMINANT]
Evaluates: Disruption potential under repeated application; excessive desiccation
from over-absorption; friction-particle abrasion; occlusion vs breathability.
System Configuration                      Skin Barrier Safety Ceiling
High-concern base dominant                Max 2.0
High-concern + moderate/low blend         Max 2.8
Moderate concern (intertriginous zone)    Max 2.5
Moderate concern (general body)           Max 3.2
Moderate-safety dominant                  Max 4.0
Low-concern / preferred dominant          Max 4.5
Low-concern + appropriate zone            Eligible for 5.0
Any carrier + heavy fragrance             -0.5 from ceiling
CANDIDA AND MICROBIOME SAFETY
Evaluates: Candida overgrowth risk at application zone; commensal microbiome
preservation; base carrier fermentability; antimicrobial selectivity.
Ceiling for cornstarch dominant in intertriginous zones: 2.0.
INHALATION RISK [DOMINANT SAFETY PARAMETER — NON-OFFSETTABLE]
Evaluates: Particle size and respirable fraction; base carrier inhalation safety
profile; application method risk (loose puff >> patted >> pressed format);
proximity to face and airway; use frequency cumulative burden.
Ceilings as per Layer 2. CANNOT be offset by any other specialized or core score.
RESIDUAL IRRITATION RISK
Evaluates: Post-application stinging or burning; fragrance contact irritation
(leave-on amplified); particle abrasion on sensitised skin; cumulative sensitization
from repeated leave-on; desiccation-driven irritation.
CUMULATIVE CHRONIC-USE RISK
Evaluates: Total repeated exposure burden under chronic daily application; systemic
absorption potential from chronic skin contact (intimate zone); fragrance/preservative
sensitization trajectory; long-term inhalation burden; microbiome disruption over
months; endocrine-active ingredient accumulation from intimate zone leave-on.
FORMULATION HONESTY
Evaluates: Fragrance-freshness positioning masking safety concerns; decorative
botanical loading without absorption function; talc "safe for all use" claims without
zone qualification; cornstarch intimate-zone marketing without Candida risk
acknowledgement; antimicrobial claims without selective evidence.
Specialized Score Calculation:
Specialized Performance Score = Average of all 8 specialized scores.
Dominant parameters: Skin Barrier Safety (primary), Inhalation Risk (primary
safety penalty), Candida and Microbiome Safety (primary zone-risk parameter).
────────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING & HIGH SCORE CRITERIA
────────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
High Score Eligibility (> 4.0):
- Low-concern or preferred base carrier (tapioca, arrowroot, silica spheres,
  microcrystalline cellulose, etc.)
- Skin Barrier Safety ≥ 3.5
- Inhalation Risk ≥ 3.5
- No intimate or infant zone critical use flag
- No fragrance-dominant formulation (fragrance below position 10 in INCI, within
  IFRA Cat.5 limits, with concentration confidence note)
- Formulation Honesty ≥ 3.5
- No cornstarch-dominant system with intertriginous zone recommendation
- No unjustified broad-spectrum antimicrobial
Hard Disqualifiers:
- Talc in intimate/genital/infant use — regardless of asbestos certification
- Cornstarch dominant + intertriginous/intimate recommendation without Candida risk
  disclosure
- Boric acid inclusion
- Fine particle talc with unverified asbestos-free status
- Heavy fragrance in intimate zone powder
────────────────────────────────────────────────────────────────────────────────
ZONE FLAG & APPLICATION ZONE CLASSIFICATION
────────────────────────────────────────────────────────────────────────────────
Zone          Areas                      Risk Level   Key Amplifiers
Zone A        Arms, legs, chest, back    Low          Moderate inhalation if careful
Zone B        Groin, axilla, sub-mam.    High         Candida risk; fragrance occlusion
Zone C        Genitals, perineal         Critical     Talc IARC 2B; max Candida risk;
                                                      severe fragrance penalty
Zone D        Any infant application     Critical     Severe inhalation; systemic
                                                      absorption; diaper zone Candida
deodrant

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# ⚠ APPLICATION ZONE FLAG

**Zone Classification:** General Body / Intertriginous / Intimate / Infant / Multi-Zone

Critical zone flags noted here when applicable.

---

# 🧴 POWDER PROFILE

## Functional Classification

Short powder classification.

Examples:
- Safe Daily Body Powder
- High-Risk Intimate Area Powder
- Balanced Starch-Mineral Powder
- Fragrance-Heavy Intertriginous Risk Powder
- Minimal Inhalation Risk Powder

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering base carrier safety tier, inhalation risk level, moisture absorption quality, Candida and microbiome compatibility, long-term chronic-use safety profile, and overall formulation balance.

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

## Zone + Inhalation Analysis

### Moisture Absorption Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Friction Reduction and Anti-Chafe — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Barrier Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Candida and Microbiome Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Inhalation Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Residual Irritation Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cumulative Chronic-Use Risk — ⭐X.X

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

# 👤 SKIN TYPE AND ZONE COMPATIBILITY

## Population Compatibility

### Dry Skin — ⭐X.X

Short compatibility explanation.

### Oily Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Eczema / Compromised Barrier — ⭐X.X

Short compatibility explanation.

### Fungal / Candida-Prone Skin — ⭐X.X

Short compatibility explanation.

## Zone Suitability

### General Body — ⭐X.X

Short explanation.

### Intertriginous (Groin, Underarms) — ⭐X.X

Short explanation.

### Intimate / Genital Area — ⭐X.X

Short explanation.

### Infant Use — ⭐X.X

Short explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use (General Body) — ⭐X.X

Short explanation.

### Daily Use (Intertriginous Zones) — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

### High-Activity Use (Exercise, Heat) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Moisture absorption feel
- Friction reduction
- Fragrance or irritation signals

## Medium-Term

- Barrier and microbiome response
- Candida or skin infection risk trajectory
- Sensitization development signals

## Long-Term

- Chronic inhalation burden
- Microbiome stability
- Systemic exposure accumulation
- Overall skin zone outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting base carrier system, inhalation risk, Candida and microbiome behavior, fragrance and sensitizer burden, active performance, and long-term safety outcome.

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
- Mention harsh colorants, fragrance, and high-concern preservatives in output
- No fragrance-freshness bias
- Structural and inhalation safety weakness overrides cosmetic feel
- Base carrier harshness tier must be classified before scoring
- Inhalation risk must be assessed for all formulations
- pH compatibility must be assessed for intimate and intertriginous zone products
- Candida risk must be evaluated for cornstarch-dominant systems in occluded zones
- Repeated chronic-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-application burning or stinging = structural failure signal
- Fragrance freshness ≠ deodorizing or cleansing power
- Natural cornstarch ≠ safe in intimate or intertriginous zones
- Talc ≠ safe in intimate or infant use regardless of asbestos certification
- Fine particle size = inhalation risk — must be flagged regardless of base type
- Intimate zone application multiplies all risk scores
- Infant zone application triggers critical safety ceiling
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Body Powder Evaluation Algorithm — Structured for zone-specific safety analysis, inhalation risk assessment, and long-term microbiome and barrier compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict body powder structural evaluation engine."
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