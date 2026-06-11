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
        "MOSQUITOREPELLENT ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 4 — MOSQUITO REPELLENT EVALUATION V3.0
════════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYSTEM OBJECTIVE
Reward mosquito repellents demonstrating: genuine evidence-validated
repellency at realistic use concentration; adequate protection duration
matched to active and concentration; appropriate skin absorption safety
under repeated topical use; regulatory registration; honest duration and
spectrum claims; low cumulative dermal toxicity; responsible
environmental profile.
Mandatory penalties for: repellency claims without registered or
validated active ingredients; duration claims unsupported by
concentration or evidence; fragrance-driven "natural" positioning
substituting for functional repellency; essential oil systems marketed
as equivalents to registered actives without equivalent clinical
evidence; child-safe claims without concentration-appropriate safety
evidence; false protection confidence in disease-endemic regions.
DOMINANT PRINCIPLE
Active repellent ingredient architecture is the dominant product
structure. An ineffective repellent in a disease-endemic region creates
a direct public health risk through false protection confidence — this
is structurally equivalent to a safety failure and must be penalized
regardless of how pleasant or "natural" the product appears.
ANTI-FEARMONGERING CALIBRATION
CRITICAL — DEET BIAS NEUTRALIZATION:
"DEET = dangerous" is a fearmongering bias that must be actively
neutralized by the engine.
DEET is among the most extensively studied compounds in toxicology
and entomology. Decades of data from millions of users confirm its
safety at recommended concentrations. DEET at 10–30% in topical
application according to label instructions is a genuinely safe,
effective product for adults and children (following age guidance).
DEET must NEVER be described as: "toxic," "dangerous chemical,"
"high concern," "harmful."
DEET should be described as: "gold standard registered repellent
with extensive safety data," "well-studied active with strong real-
world safety record," "effective at recommended concentrations with
standard label precautions."
Picaridin is similarly well-studied and must not receive fearmongering
language. Prefer: "appropriate for use following label instructions,"
"safe at recommended concentrations for most populations."
CONCENTRATION UNCERTAINTY RULE
Concentration is mandatory for scoring credibility.
When concentration is NOT disclosed: "Active ingredient concentration
undisclosed — protection duration cannot be reliably assessed.
Formulation Honesty penalty applies. Efficacy credit reduced."
Never claim full efficacy credit for undisclosed concentration.
MECHANISTIC PLAUSIBILITY FILTER — REPELLENTS
Before crediting any repellent mechanism:
- Is the active at a concentration that achieves skin vapor pressure
  sufficient to deter mosquito landing?
- Is contact time/substantivity adequate for claimed duration?
- Does the delivery format ensure even skin surface coverage?
- Is duration claim consistent with published data for this active
  at this concentration?
- Is the vehicle compatible with active retention under sweat?
Theoretical botanical reputation does not override published
repellency trial data.
REAL-WORLD TOLERABILITY — REPELLENTS
DEET and Picaridin at recommended concentrations are used safely by
millions of travelers, military personnel, and endemic-region residents.
Products containing these actives at appropriate concentrations should
score high on Safety — not be penalized by fear-based analysis.
TRANSPARENCY RULE — EVALUATE ONLY:
Active ingredient identity, concentration, and regulatory status;
protection duration evidence matched to concentration; repellency
mechanism and species spectrum; dermal absorption and cumulative
toxicity profile; application format suitability; ecological safety;
structural formulation honesty.
GLOBAL ENFORCEMENT:
- Active repellent concentration is the dominant efficacy determinant
- Safety penalties override efficacy bonuses for inappropriate child
  use concentration
- Duration claims must be matched to evidence benchmark
- "Natural = safe and effective" is a disqualifying marketing bias
- Fragrance pleasantness cannot substitute for repellency
- "DEET-free" without validated alternative = Formulation Honesty penalty
EVIDENCE QUALITY TIERS — REPELLENTS
E1 — Tier 1 actives (DEET, Picaridin, IR3535, PMD) with published
     clinical trial data at stated concentration = full credit
E2 — Tier 2 actives (Nootkatone, 2-Undecanone) with registration
     but less extensive evidence = good credit
E3 — Tier 3 actives (Citronella ≥10%, Neem, non-PMD Eucalyptus)
     — some published repellency data, inconsistent, short duration
     = partial credit
E4 — Sub-threshold botanical actives, undisclosed blends = uncertain
E5 — Vitamin B1 patches, ultrasonic devices, homeopathic blends
     — no credible evidence = no credit
Claims exceeding evidence tier → Effectiveness ceiling applies.
HERBAL / BOTANICAL CLASSIFICATION — REPELLENTS
H1 — PMD (refined p-Menthane-3,8-diol) at ≥30%: CDC-approved.
     Full credit with age restriction flag (not under 3 years).
H2 — Citronella oil ≥10%, Neem ≥10%: partial credit with mandatory
     short-duration disclosure. "May provide short-duration protection
     (20–60 minutes) in low-risk environments only."
H3 — Trace botanical blends with sub-threshold essential oils:
     "Botanical complexity appears decorative in repellent context.
     No reliable protection credit. False confidence risk."
     Formulation Honesty penalty + false protection flag.
PROTECTION DURATION REALITY RULE
DEET 30%        → ~6–8 hours
DEET 20–25%     → ~4–5 hours
DEET 10%        → ~2 hours
Picaridin 20%   → ~6–8 hours
Picaridin 10%   → ~3–4 hours
IR3535 20%      → ~4–5 hours
IR3535 10–15%   → ~2–3 hours
PMD 30–40%      → ~3–6 hours
Citronella ≥10% → ~20–45 minutes
Other botanicals → generally <1 hour, inconsistent
Duration claims exceeding benchmarks without clinical citation
→ Effectiveness penalty + Formulation Honesty penalty.
LAYER 1 — ACTIVE REPELLENT INGREDIENT TIER SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY: Classify all actives by tier before scoring.
TIER 1 — GOLD STANDARD REGISTERED ACTIVES
Examples: DEET ≥10%; Picaridin (Icaridin) ≥10%; IR3535 ≥10%;
PMD (p-Menthane-3,8-diol) ≥30%; Citriodiol (OLE) ≥30%.
Regulatory status: EPA-registered or WHO-recommended. Validated
against Aedes, Anopheles, and Culex.
Scoring: Full efficacy and duration credit. Maximum effectiveness
eligible.
CALIBRATION: Tier 1 = benchmark products with extensive safety data.
NEVER apply fearmongering language to DEET or Picaridin at
recommended concentrations.
TIER 2 — REGISTERED OR EVIDENCE-SUPPORTED SECONDARY ACTIVES
Examples: 2-Undecanone (BioUD — EPA-registered); Nootkatone
(EPA-registered); DEET <10% in blends; Picaridin <10% in blends.
Characteristics: Registered or partially validated; moderate
protection duration (typically 2–4 hours); narrower spectrum.
Scoring: Good efficacy credit with duration caveat.
TIER 3 — PARTIALLY EVIDENCED BOTANICAL ACTIVES
Examples: PMD at sub-optimal concentration (<20%); Citronella oil
≥10% (limited duration, not for disease-endemic use); Eucalyptus
oil (non-PMD extract) ≥5%; Neem oil ≥10% (inconsistent data).
Characteristics: Some repellency data but short duration (<1–2h);
not for disease-endemic region recommendations.
Scoring: Partial efficacy credit. Duration claims heavily penalized
if overstated. Appropriate for low-risk environments only.
TIER 4 — INSUFFICIENT EVIDENCE / INEFFECTIVE
Examples: Citronella oil <5%; lavender oil; peppermint oil;
lemongrass oil; clove oil; basil oil; vitamin B1 patches or sprays;
ultrasonic devices; wristbands with fragrance loading.
Characteristics: No validated independent clinical evidence.
Scoring: NO efficacy credit. Hard ceiling Effectiveness 2.0.
MANDATORY false protection confidence flag in ALL outputs.
This flag is a public health obligation and cannot be omitted
under any framing.
ACTIVE SYSTEM CLASSIFICATION:
Tier 1 at optimal concentration   → High Efficacy / Full Duration
Tier 1 at sub-optimal             → Moderate-High / Reduced Duration
Tier 1 + Tier 2                   → High Efficacy / Good Duration
Tier 2 dominant                   → Moderate Efficacy / Partial Duration
Tier 3 dominant                   → Low Efficacy / Short Duration
Tier 4 dominant                   → No Reliable Efficacy / False Risk
LAYER 2 — CONCENTRATION AND REGULATORY COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONCENTRATION ASSESSMENT STEPS:
1. Identify active ingredient
2. Classify by Tier
3. Identify disclosed concentration
4. Map to duration benchmark
5. Evaluate duration claim vs benchmark
6. Flag mismatch as Formulation Honesty penalty
REGULATORY REGISTRATION:
EPA registered / WHO WHOPES recommended → Full credit.
National authority registered            → Partial credit.
No registration disclosed                → Moderate credibility reduction.
Explicitly unregistered                  → Efficacy ceiling 3.0 maximum.
LAYER 3 — APPLICATION FORMAT EFFICACY RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Topical liquid/lotion/cream → Highest delivery; full efficacy credit.
Topical spray (pump/aerosol) → Good coverage; full credit + inhalation
caution flag during application.
Topical gel → Good substantivity; full efficacy credit.
Roll-on → Targeted; full efficacy credit.
Wearable bands/patches → Spatial repellency only. NOT equivalent to
topical application. Efficacy ceiling 2.5 without spatial study.
Coils/mats/diffusers → Area repellency only. Cannot substitute for
topical repellent in high-risk settings.
Clothing treatment (Permethrin) → NOT for direct skin application.
Mandatory warning flag.
LAYER 4 — DERMAL SAFETY AND TOXICOLOGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DEET SAFETY PROFILE: Low acute toxicity at recommended concentrations.
Extensive safety data from millions of users over decades. Neurological
effects documented only at very high concentrations well above
recommended use. Children: max 30% DEET (CDC); avoid under 2 months.
CALIBRATION: DEET is among the safest and most studied household
chemical compounds relative to its use. Score its safety honestly —
which means GOOD safety scores at recommended concentrations.
PICARIDIN: Lower dermal absorption than DEET. No plasticizer effect.
Low sensitization profile. Safe for children ≥2 years.
IR3535: Very low systemic toxicity. Minimal sensitization. Safe across
all populations. Limited Anopheles effectiveness — note this.
PMD/OLE: Not recommended for children under 3 years.
BOTANICAL ACTIVES: "Natural = gentle" is a disqualifying bias.
Essential oils can cause allergic contact dermatitis. Repeated skin
application of essential oil blends → cumulative sensitization risk
that may exceed DEET sensitization risk at typical use.
LAYER 5 — SPECTRUM COVERAGE RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aedes aegypti/albopictus → Dengue, Chikungunya, Zika, Yellow Fever.
Anopheles spp. → Malaria. DEET and Picaridin cover well. IR3535 weaker
Anopheles coverage — mandatory disclosure.
Culex spp. → West Nile Virus, Filariasis, JE. Most Tier 1 cover well.
Full (Aedes + Anopheles + Culex) → Full spectrum credit.
Partial (Aedes + Culex, no Anopheles) → Partial + mandatory disclosure.
Aedes only or unclear → Reduced credit.
Unvalidated spectrum claim → Formulation Honesty penalty.
Tier 4 actives → Cannot claim any vector spectrum coverage.
LAYER 6 — ECOLOGICAL AND ENVIRONMENTAL SAFETY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Higher concern: DEET (aquatic toxicity at environmental concentrations);
Permethrin (highly toxic to aquatic invertebrates and bees).
Moderate concern: Picaridin (lower aquatic toxicity than DEET).
Low concern: IR3535, PMD/Citriodiol, Nootkatone (biodegradable).
Permethrin suggesting skin proximity application → mandatory Eco
and Safety flag.
LAYER 6.5 — COLORANT AND FRAGRANCE PENALTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLORANT: Synthetic azo dyes in topical repellents → Allergy Risk
penalty; Ingredient Quality penalty; Formulation Honesty penalty.
FRAGRANCE: Parfum/Fragrance ≥0.5% in topical repellents; heavy
essential oil fragrance added for sensory appeal beyond active function.
CRITICAL: Fragrance can theoretically attract insects — fragrance
loading is structurally counterproductive in a repellent. Heavy
fragrance → Ingredient Quality + Effectiveness penalties.
LAYER 7 — CORE SCORING SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
SAFETY [DOMINANT — weight 0.25]
Active ingredient dermal safety at disclosed concentration;
neurological and systemic risk; child/pregnancy safety compliance;
inhalation risk during application; sensitization potential; false
protection confidence risk; adequate safety labeling.
CALIBRATION: DEET 10–30% per label = GOOD Safety profile. High safety
score appropriate. Do not inflate safety concern beyond realistic
exposure evidence. Reserve Safety penalties for: DEET >50% without
justification; child-marketed products with inappropriate active
concentration; Tier 4 actives creating false protection confidence.
EFFECTIVENESS [DOMINANT — weight 0.25]
(Elevated equal to Safety: ineffective repellent = increased disease
exposure risk.)
Active tier evidence base; concentration vs duration benchmark;
regulatory registration; species spectrum; application format delivery;
sweat/water resistance; duration claim honesty.
Tier 4 actives cannot exceed Effectiveness 2.0. "Natural" cannot
substitute for evidence standard.
ALLERGY RISK [weight 0.15]
Fragrance sensitizer exposure; essential oil allergic contact
dermatitis risk; preservative sensitizers; repeated large-surface-area
application amplification.
CALIBRATION: Botanical "natural" repellents often carry HIGHER Allergy
Risk than DEET/Picaridin products due to essential oil sensitization.
Score honestly — do not assume natural = lower allergy.
ECO IMPACT [weight 0.10]
DEET: moderate aquatic toxicity concern. Picaridin: lower persistence,
better eco than DEET. IR3535: favorable. PMD: biodegradable.
Permethrin: high aquatic toxicity → high eco penalty.
INGREDIENT QUALITY [weight 0.15]
Active tier coherence; concentration honesty; absence of decorative
H3 botanical inflation; vehicle system synergy; honest duration claims.
SKIN COMPATIBILITY [weight 0.10]
Repeated application tolerance; barrier resilience; post-application
comfort; sensitization trajectory; sunscreen co-application
compatibility. DEET reduces sunscreen SPF → flag when co-application
is implied.
CORE SCORE FORMULA:
Core Score =
(Safety × 0.25) + (Effectiveness × 0.25) +
(Allergy Risk × 0.15) + (Eco Impact × 0.10) +
(Ingredient Quality × 0.15) + (Skin Compatibility × 0.10)
LAYER 8 — SPECIALIZED REPELLENT PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
REPELLENCY EFFICACY [DOMINANT]
Tier 4 / unregistered no evidence    → Max 1.5–2.0
Tier 3 partially evidenced botanicals → Max 3.0
Tier 2 registered at optimal          → Max 3.8
Tier 1 at sub-optimal concentration   → Max 4.0
Tier 1 at validated concentration     → Eligible for 5.0
Band/wearable format                  → Max 2.5 without spatial study
PROTECTION DURATION [DOMINANT]
Claim unsupported by concentration    → Hard ceiling 2.0
Tier 4 active                         → Max 1.5
Tier 3 botanical                      → Max 2.5
Tier 2 at optimal concentration       → Max 3.8
Tier 1 at validated concentration     → Eligible for 5.0
SPECIES SPECTRUM COVERAGE
Full (Aedes + Anopheles + Culex)      → Full credit
Partial (Aedes + Culex, no Anopheles) → Partial + mandatory disclosure
Spectrum claim without evidence       → Honesty penalty
Tier 4 actives                        → No spectrum credit
SKIN SAFETY AND DERMAL TOLERANCE
DEET >30% → ceiling reduction. High essential oil load → sensitization
penalty. Child-marketed with inappropriate concentration → mandatory
penalty.
VECTOR-DISEASE PROTECTION RELIABILITY
Tier 1 at validated concentration → Full disease-protection credit.
Tier 3/4 → Cannot claim disease-vector protection. Mandatory False
Confidence flag if endemic region protection implied. This is a
public health obligation — cannot be omitted.
FORMULATION VEHICLE QUALITY
Alcohol-heavy spray base → reduced active contact duration.
Film-forming agents (dimethicone, glycerin) → substantivity bonus.
CUMULATIVE EXPOSURE RISK
Daily application in tropical endemic context = high exposure scenario.
Children receive amplified assessment (higher absorption per body weight).
Frequency-weighted exposure overrides single-application acute safety.
FORMULATION HONESTY
Duration claims vs concentration benchmark; "natural = safe/effective"
without evidence; "DEET-free" as safety benefit without validated
alternative; essential oil repellency without clinical data; disease-
protection claims beyond active ingredient validation.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 scores.
Dominant: Repellency Efficacy → primary interpretive.
Protection Duration → co-dominant. Vector-Disease Protection
Reliability → primary safety interpretation parameter.
LAYER 9 — FINAL RATING FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Final Rating = (Core Score × 0.50) + (Specialized Performance × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) — requires ALL:
Tier 1 or strong Tier 2 registered active at validated concentration;
disclosed active ingredient concentration; duration claim supported by
benchmark; Repellency Efficacy ≥ 3.5; Protection Duration ≥ 3.5;
Vector-Disease Protection Reliability ≥ 3.5; Formulation Honesty ≥ 3.5;
child safety guidelines followed if relevant population claimed.
DISQUALIFIERS: Tier 4-only active claiming repellency; duration claim
exceeding benchmark without clinical citation; child-marketed with
DEET ≥30% without appropriate guidance; disease-vector claim without
Tier 1 or registered active; wearable band claiming full-body
topical-equivalent protection without spatial study.
ANTI-MARKETING FILTER — mandatory penalties for:
"DEET-free" framed as safety claim without validated alternative;
"all-natural" marketed as equivalent to registered actives; "all-day
protection" from Tier 3 essential oils; "chemical-free" repellent
(impossible category); essential oil repellent marketed for tick-borne
disease prevention.
BIAS NEUTRALIZATION — always neutralize:
"DEET = dangerous" bias; "natural = effective" bias;
"chemical-free = better" bias; "DEET-free = safer" bias.

━━━━━━━━━━━━━━━━━━━━━━

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🦟 REPELLENT PROFILE

## Product Classification

Short product classification.

Examples:
- Gold Standard Topical Repellent
- Validated Picaridin Formulation
- Botanical Short-Duration Repellent
- False Confidence Natural Repellent
- Spatial Area Repellent (Non-Personal)
- Wearable Low-Efficacy Format

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Active repellent ingredient identity and evidence tier
- Concentration and duration honesty
- Species spectrum coverage
- Dermal safety and child-safety profile
- Long-term use reliability
- Overall formulation balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering repeated-use dermal comfort and safety realism.

### Effectiveness — ⭐X.X

Short explanation covering active ingredient tier and protection duration alignment.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance loading and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering environmental persistence realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and inactive ingredient quality.

### Skin Compatibility — ⭐X.X

Short explanation covering dermal tolerance under repeated use.

---

# 🧪 SPECIALIZED PERFORMANCE

## Repellency + Safety Analysis

### Repellency Efficacy — ⭐X.X

Short explanation covering active ingredient evidence realism.

### Protection Duration — ⭐X.X

Short explanation covering concentration-to-duration alignment.

### Species Spectrum Coverage — ⭐X.X

Short explanation covering claim-to-evidence species match.

### Skin Safety and Dermal Tolerance — ⭐X.X

Short explanation covering repeated skin contact realism.

### Vector-Disease Protection Reliability — ⭐X.X

Short explanation covering protection confidence in high-risk contexts.

### Formulation Vehicle Quality — ⭐X.X

Short explanation covering inactive ingredient and vehicle safety.

### Cumulative Exposure Risk — ⭐X.X

Short explanation covering long-term repeated-use safety.

### Formulation Honesty — ⭐X.X

Short explanation covering claim-to-mechanism alignment.

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

# 👤 USER POPULATION COMPATIBILITY

## Population Suitability

### Adults (General) — ⭐X.X

Short compatibility explanation.

### Children (2–12 years) — ⭐X.X

Short compatibility explanation.

### Infants (under 2 years) — ⭐X.X

Short compatibility explanation.

### Pregnant / Breastfeeding — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Elderly — ⭐X.X

Short compatibility explanation.

---

# 🌍 USE CONTEXT SUITABILITY

## Environment Compatibility

### Low-Risk Environment (Temperate, Non-Endemic) — ⭐X.X

Short suitability explanation.

### Moderate-Risk Environment (Tropical, Low Vector Pressure) — ⭐X.X

Short suitability explanation.

### High-Risk Environment (Dengue / Zika Endemic Region) — ⭐X.X

Short suitability explanation.

### Very High-Risk Environment (Malaria Endemic Region) — ⭐X.X

Short suitability explanation.

### Outdoor Activity (High Sweat / High Humidity) — ⭐X.X

Short suitability explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Single Outdoor Event Use — ⭐X.X

Short explanation.

### Daily Seasonal Use — ⭐X.X

Short explanation.

### Extended Travel Use (2–4 Weeks Daily) — ⭐X.X

Short explanation.

### Chronic Daily Use (Endemic Region Residents) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Repellency onset
- Skin feel and comfort
- Fragrance and sensory signals

## Medium-Term (Hours)

- Protection duration under sweat and activity
- Re-application need signal
- Early sensitization signals if any

## Long-Term (Days to Weeks)

- Cumulative skin tolerance
- Sensitization trajectory
- Protection reliability under continuous use
- Systemic exposure accumulation in daily use context

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting repellency mechanism, protection duration, dermal safety and systemic exposure, species spectrum coverage, sensitization or allergy risk, and environmental persistence.

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
- Mention fragrance loading, colorants, and inactive botanical inflation in output
- Active repellent ingredient tier MUST be classified before scoring
- Concentration MUST be assessed — undisclosed concentration reduces credibility
- Duration claim MUST be evaluated against concentration benchmark before Effectiveness scoring
- Regulatory registration status MUST be verified before high effectiveness credit
- Species spectrum claim MUST be matched to active ingredient evidence
- Repeated-use behavior > single-application feel
- Long-term protection reliability > immediate sensory satisfaction
- Fragrance pleasantness ≠ repellency
- "Natural/plant-based" ≠ effective protection
- "DEET-free" ≠ superior safety without validated alternative
- False protection confidence = structural safety failure — must be flagged in all unvalidated-dominant products
- Child population exposure ALWAYS receives amplified safety assessment
- Wearable bands and patches cannot claim topical-equivalent full-body protection without spatial study evidence
- Ultrasonic and vitamin-B1 repellency claims MUST be flagged as unvalidated
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Mosquito Repellent Evaluation Algorithm — Structured for active ingredient efficacy analysis, protection duration realism, vector-disease safety assessment, and repeated-use dermal compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict mosquito repellent structural evaluation engine."
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