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
        "BODYLOTION ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 4 — BODY LOTION & MOISTURIZER EVALUATION ENGINE  |  Version 3.0
================================================================================
Scientific Anchors: Elias (2012) — skin barrier science; Lodén (2003) — moisturizer
mechanisms; Kraft & Lynde (2005) — moisturizer review; Cork et al. (2009) — filaggrin
and barrier; van Smeden et al. (2014) — ceramide composition; Leyden et al. (2017) —
microbiome and moisturizers; Darlenski et al. (2009) — skin hydration measurement;
Loden (2005) — urea moisturizers.
────────────────────────────────────────────────────────────────────────────────
ALGORITHM 4 — MANDATORY SCORING & EVALUATION RULES
(Self-contained; no external global rules section required)
────────────────────────────────────────────────────────────────────────────────
Universal Scoring Principles
- NO MEDICAL CLAIMS anywhere in output
- No marketing influence on scoring
- Structural and safety weakness overrides sensory satisfaction
- Repeated chronic-use behavior takes priority over single-application feel
- Long-term skin outcome takes priority over immediate sensation
- Post-application burning or persistent irritation = structural failure signal
- Natural/botanical/organic positioning does not automatically confer safety
- Ingredient count does not indicate quality
Algorithm-Specific Mandatory Rules — Body Lotion & Moisturizer
- Moisturisation architecture tier MUST be classified before scoring —
  humectant/emollient/occlusion balance
- Leave-on active efficacy MUST be classified — Category C actives cannot receive
  primary efficacy credit
- MI (Methylisothiazolinone) in leave-on = hard Safety ceiling and disqualifier
- Silky feel ≠ hydration depth — silicone-dominant systems cannot claim Barrier
  Restoration
- Collagen in body lotion ≠ skin collagen restoration — molecular weight precludes
  penetration
- Ceramide marketing ≠ ceramide functional delivery without formulation position
  evidence
- Microbiome-balancing claims require: absence of broad-spectrum antimicrobials and
  controlled fragrance load — both required or Formulation Honesty penalty applies
Bias Neutralisation — Body Lotion & Moisturizer
- Silky/smooth feel = hydration depth illusion — evaluate architecture, not texture
- Collagen and peptide body care = skin repair illusion — penetration physics do not
  support claims
- Fragrance = moisturisation perception illusion
- Botanical richness = formulation quality illusion
- Ingredient-count quality illusion
- Ceramide marketing without formula position evidence = clinical efficacy illusion
- "Deep hydration" claim in humectant-deficient system = formulation honesty failure
Fragrance Concentration Confidence Logic (R3 Applied)
- Full-body daily leave-on application: IFRA Category 5 (leave-on, body) limits apply
- Full-body surface area exposure (1.7 m2 average adult) means even moderate
  concentration fragrance creates significant cumulative allergen dose
- Heavy fragrance penalties require convergent multiple indicators: top-5 INCI,
  multiple listed allergens, parfum-heavy architecture, undisclosed allergen blend,
  leave-on full-body context
- When concentration certainty is moderate: use "Potential sensitization concern"
  with leave-on amplification note
- The full-body leave-on scale does not reduce the threshold for concern — it
  elevates it
Essential Oil Risk Calibration (R2 Applied)
- Full-body leave-on application represents elevated essential oil concern
- Phototoxic oils (bergamot non-BCF, lime peel, angelica) receive mandatory
  phototoxicity flags for sun-exposed body areas (arms, legs, chest) regardless
  of concentration confidence
- Non-phototoxic essential oils: trace-level in full-body lotion may receive
  contextual concern rather than maximum penalty, unless stacked with other
  sensitizers, at high INCI position, or with undisclosed storage conditions
- Strong sensitization penalties require high-position loading, stacked sensitizers,
  or absence of stabilisation evidence
Colorant Hazard Language (R1 Applied)
- Azo dye concern retained as mechanistic and precautionary toxicology concern
- Full-body leave-on exposure elevates precautionary weighting
- Penalties retained; certainty language reflects concern classification
────────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE & SYSTEM OBJECTIVE
────────────────────────────────────────────────────────────────────────────────
Reward body lotions demonstrating:
- Genuine barrier restoration via functionally balanced moisturisation: humectancy +
  emolliency + occlusion — all three mechanisms addressed
- Physiologically appropriate ingredient concentrations for leave-on full-body
  application
- Long-term safety under repeated daily leave-on exposure across large body surface
  area
- Microbiome and barrier compatibility under chronic use
- Evidence-based active ingredient deployment with realistic leave-on efficacy credit
- Low cumulative sensitization risk — fragrance, preservatives, essential oils
  evaluated at full-body leave-on exposure levels
Mandatory penalties for:
- Fragrance-driven moisturisation perception — sensory satisfaction ≠ hydration
  science
- Silicone-dominant systems marketed as barrier restoration without humectant depth
  or barrier lipid content
- Collagen or high-MW hyaluronic acid "skin repair" claims
- Decorative active loading without concentration, vehicle, or stability evidence
- High-concern preservatives in leave-on (MI, formaldehyde-releasers)
- Essential oil sensitization load under full-body daily leave-on application
  (context and concentration-calibrated per R2)
▸ Basic skin-feel improvement alone cannot achieve high scores.
────────────────────────────────────────────────────────────────────────────────
LAYER 1 — MOISTURISATION ARCHITECTURE TIER SYSTEM
────────────────────────────────────────────────────────────────────────────────
MANDATORY: Moisturisation architecture must be classified before scoring.
Scientific Basis for Three-Component Architecture
Humectants: Glycerin at ≥3% reduces TEWL by 25-30% (Darlenski et al. 2009). Urea
at ≥5% demonstrates keratolytic and NMF-augmenting function. Emollients: Fill
intercellular lipid gaps. Occlusives: Form physical film. Petrolatum: TEWL reduction
~98%. Dimethicone: ~20-40%. Shea butter: ~30-50% (Kraft & Lynde 2005).
COMPREHENSIVE MOISTURISATION ARCHITECTURE
All three mechanisms functionally represented:
- Humectant: Glycerin ≥3% OR Urea ≥5% OR Sodium Hyaluronate (appropriate MW mix)
  OR Sodium PCA ≥2% OR Lactic Acid ≥5%
- Emollient: Shea Butter, Squalane, Fatty Alcohols (Cetyl, Cetearyl), Plant Oils,
  Caprylic/Capric Triglyceride
- Occlusive: Petrolatum OR Dimethicone OR Beeswax OR Lanolin OR Mineral Oil at
  functional concentration
- Barrier-restorative bonus: Ceramides (NP, AP, EOP, NS) + Cholesterol + Fatty Acids
  (C20-C22) — trilayer-matched system
Scoring Impact: Eligible for maximum Barrier Restoration; prerequisite for score > 4.0.
PARTIAL MOISTURISATION ARCHITECTURE
One moisturisation component missing or inadequate. Moderate hydration achievable;
underperforms in low humidity. Acceptable short-term comfort.
Scoring Impact: Moderate Barrier Restoration ceiling (max 3.4).
SUPERFICIAL / SENSORY-DOMINANT ARCHITECTURE
Silicone-first, fragrance-forward, thin water-dominant, or decorative
botanical-heavy systems.
Scoring Impact: Low Barrier Restoration ceiling (max 2.0); Formulation Honesty
penalties for barrier repair claims.
Moisturisation Architecture Classification:
Architecture                                   Classification     Barrier Restoration Ceiling
Humectant + Emollient + Occlusive              Comprehensive      4.0-5.0
Comprehensive + Ceramide trilayer system       Comprehensive      Eligible for 5.0
                                               Elite
Two of three components functional             Partial            3.0-3.4
One component only                             Partial Low        2.5-2.8
Silicone-dominant / fragrance-dominant         Superficial        Max 2.0
Water-dominant, minimal moisturisation         Superficial        Max 1.5
OUTPUT NOTE: Do not use tier number labels in consumer output. Describe as:
"complete moisturisation architecture with humectant, emollient, and occlusive
balance," "partial moisturisation — emollient only without occlusive depth,"
"silicone-dominant sensory system with limited barrier support," etc.
────────────────────────────────────────────────────────────────────────────────
LAYER 2 — LEAVE-ON ACTIVE EFFICACY CLASSIFICATION
────────────────────────────────────────────────────────────────────────────────
CATEGORY A — HIGH EFFICACY (FULL CREDIT)
Active                     Effective Concentration    Evidence Basis
Glycerin                   ≥3%                        TEWL reduction; NMF augmentation
Urea                       ≥5% (moist); ≥10% (kerat)  Multiple RCTs; xerosis evidence
Lactic Acid                ≥5%                        AHA keratolysis; NMF analogue
Ceramides (functional)     0.5-2% trilayer system     Barrier restoration RCT evidence
Panthenol                  ≥1%                        Wound healing; barrier support
Niacinamide                ≥2%                        Ceramide synthesis upregulation
Squalane                   2-10%                      Skin-identical lipid; non-comedogenic
Shea Butter, Plant Oils    2-15%                      Emollient and partial occlusive
Petrolatum, Dimethicone    ≥2%                        Occlusive film; TEWL reduction
Hyaluronic Acid (mixed MW) 0.1-2%                     Surface and shallow epidermal
                                                       hydration
CATEGORY B — PARTIAL EFFICACY
Low-concentration Glycerin (<3%), Allantoin, Sodium PCA, Beta-Glucan, Low
Niacinamide (<2%), Dimethicone as sole occlusive without barrier lipids.
CATEGORY C — DECORATIVE / LOW EFFICACY IN BODY LOTION
Collagen: MW 300,000-400,000 Da — negligible penetration through intact stratum
corneum. Cannot function as skin structural collagen replacement.
Vitamin C (L-Ascorbic Acid): Highly unstable in aqueous emulsions; penetration at
body lotion concentration insufficient for cellular photoprotection.
Retinoids: Require specific vehicle for efficacy; body lotion concentrations rarely
achieve pharmaceutical-grade effect.
Peptides: Penetration and concentration generally insufficient without specific
penetration enhancers; limited evidence base for body lotion application.
▸ Category C active marketing as primary efficacy claim triggers Ingredient Quality
  and Formulation Honesty penalties.
────────────────────────────────────────────────────────────────────────────────
LAYER 3 — MICROBIOME AND BARRIER COMPATIBILITY
────────────────────────────────────────────────────────────────────────────────
Leave-on full-body application = highest daily microbiome exposure burden in body
care. The body skin microbiome provides colonisation resistance and immune modulation.
High microbiome disruption risk: Broad-spectrum antimicrobials; heavy alcohol systems
(>5% denatured alcohol in leave-on); daily high-fragrance load at full-body
application scale.
Low disruption risk: Prebiotic/postbiotic support; targeted actives without broad
antimicrobial spectrum; fragrance within IFRA Category 5 limits.
▸ Microbiome-balancing claims require: absence of broad-spectrum antimicrobials
  and controlled fragrance load. All required or Formulation Honesty penalty applies.
────────────────────────────────────────────────────────────────────────────────
LAYER 4 — FRAGRANCE, PRESERVATIVE & SENSITIZER RISK (LEAVE-ON FULL BODY)
────────────────────────────────────────────────────────────────────────────────
Full-body daily leave-on = highest fragrance exposure scenario in body care.
Systemic sensitization load from fragrance allergens at full body surface area
(1.7 m2) at 8-16g lotion per application represents significant cumulative allergen
dose.
High-Concern Fragrance Components (IFRA Category 5 — Leave-on Body):
- Eugenol: ~0.5% limit; high sensitization; clove/cinnamon bark
- Isoeugenol: ~0.02% limit; IFRA Class A restricted; very high sensitizer
- Cinnamal: ~0.01% limit; critical sensitizer
- Oakmoss/Treemoss: ~0.001% limit; Class A — effectively excluded
- Linalool and limonene oxidation products: Class 1B sensitizers — storage-dependent
- Benzyl Cinnamate, Benzyl Benzoate, Peru Balsam derivatives: restricted
Phototoxic Essential Oils (Full Body Application Safety Flag — R2 Maintained):
- Bergamot Oil (non-bergapten-free/non-BCF): phototoxicity risk on UV-exposed body
  areas (arms, legs, chest) — mandatory flag regardless of concentration confidence
- Lime Peel Oil (cold-pressed): high psoralen content — phototoxic at body lotion
  concentrations on sun-exposed skin
- Angelica Root Oil: angelicin — phototoxicity concern maintained
- NOTE: Bergapten-free bergamot (BCF) does not carry this concern
Non-phototoxic essential oils in full-body lotion context (R2 Applied):
- Trace-level essential oils: contextual concern notation if no other compounding
  factors
- High-position loading or stacked sensitizers: maintained strong concern
High-Concern Preservatives in Leave-on Body Lotion:
- CRITICAL PENALTY: Methylisothiazolinone (MI) — EU Regulation 1223/2009 prohibits
  MI in leave-on; documented epidemic of contact sensitization 2010-2016
- STRONG CONCERN: Formaldehyde-releasers (DMDM Hydantoin, Imidazolidinyl Urea,
  Diazolidinyl Urea, Quaternium-15) — CLP/GHS Category 1B sensitizers
- MODERATE CONCERN: Parabens — ongoing regulatory discussion
- LOW CONCERN: Phenoxyethanol + ethylhexylglycerin; 1,2-Hexanediol; Caprylyl Glycol;
  Sodium Levulinate/Sodium Anisate — preferred systems
────────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) +
             (Eco Impact × 0.10) + (Ingredient Quality × 0.15) +
             (Skin Compatibility × 0.15)
SAFETY [Weight: 0.25]
Evaluates: Sensitization potential from fragrance (confidence-weighted), essential
oils (R2-calibrated), preservatives (MI/formaldehyde-releasers = hard Safety ceiling);
phototoxicity risk for sun-exposed body areas; repeated leave-on full-body exposure
burden; cumulative inflammatory load; systemic absorption risk.
EFFECTIVENESS [Weight: 0.20]
Evaluates: Moisturisation depth across all three components; barrier restoration
plausibility (ceramide trilayer alignment); functional active efficacy (urea,
ceramides, niacinamide, lactic acid); repeated-use accumulation; structural honesty.
CEILING: Superficial/sensory-dominant architecture cannot achieve > 3.0 Effectiveness.
ECO IMPACT [Weight: 0.10]
Evaluates: Emollient biodegradability; cyclopentasiloxane (D5) — EU REACH PBT
substance; mineral oil/petrolatum sustainability; synthetic musk bioaccumulation;
palm-derived ingredient sustainability (RSPO); formulation concentration efficiency.
ALLERGY RISK [Weight: 0.15]
Evaluates: Fragrance load (IFRA Category 5, confidence-weighted, full-body scale);
essential oil sensitization (R2-calibrated with phototoxicity flags); preservative
sensitization; colorant concern (R1 mechanistic/precautionary); cumulative exposure.
INGREDIENT QUALITY [Weight: 0.15]
Evaluates: Moisturisation architecture coherence; botanical evidence tier alignment;
leave-on active honesty; formulation synergy.
SKIN COMPATIBILITY [Weight: 0.15]
Evaluates: Repeated-use tolerance; post-application irritation; greasiness/absorption
balance; microbiome stability; comedogenicity profile; long-term sensitization
trajectory.
────────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED PERFORMANCE SCORES  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
MOISTURISATION DEPTH
Evaluates: Water-binding capacity; multi-layer hydration; environmental humidity
resilience; humectant + occlusive synergy.
CEILING: Superficial/sensory-dominant architecture → Max 2.0. Humectant alone →
Max 3.0 without occlusive support.
BARRIER RESTORATION [DOMINANT]
Evaluates: Ceramide and structural lipid replenishment; TEWL reduction; repeated-use
cumulative barrier improvement; long-term xerosis prevention.
Architecture                                         Barrier Restoration Ceiling
Superficial/sensory-dominant                         Max 2.0
Partial — humectant only or occlusives only           Max 2.8
Partial + some comprehensive elements                Max 3.4
Comprehensive without ceramides/barrier lipids        Max 4.0
Comprehensive with ceramide + cholesterol + FA
trilayer                                             Eligible for 5.0
HYDRATION LONGEVITY
Evaluates: Hours of sustained hydration; resistance to TEWL under environmental
stress; occlusive film durability; humectant substantivity; re-application frequency.
SKIN FEEL AND TOLERANCE
Evaluates: Greasiness vs absorption balance; post-application stickiness; finish
quality; repeated-use tactile tolerance; absence of post-application irritation.
COMEDOGENICITY RISK
Evaluates: Comedogenic potential for body application (back, chest, shoulders —
common acne-prone zones).
High risk: Coconut Oil, Isopropyl Myristate, Isopropyl Palmitate, Cocoa Butter
(moderate-high), Wheat Germ Oil.
Low risk: Squalane, Jojoba Oil, Dimethicone, Sunflower Oil, Glycerin, Urea,
Panthenol.
MICROBIOME COMPATIBILITY
Evaluates: Commensal microbiome preservation under daily full-body leave-on; broad-
spectrum antimicrobial selectivity; long-term balance across large surface area.
CUMULATIVE IRRITATION RISK
Evaluates: Daily fragrance/essential oil leave-on at full-body scale; preservative
sensitization accumulation; colorant irritation; sensitization trajectory over
weeks/months.
NOTE: Full-body leave-on application = highest daily sensitization burden in
skincare — even low-concentration sensitizers become clinically significant at full-
body repeated application.
FORMULATION HONESTY
Evaluates: Fragrance-driven moisturisation perception; silicone "soft skin" marketing
without architecture; collagen/peptide repair claims without penetration evidence;
ceramide marketing without formula position evidence; "deep hydration" claims in
humectant-deficient systems; sensory-first architecture presented as barrier science.
Specialized Score Calculation:
Specialized Performance Score = Average of all 8 specialized scores.
Dominant: Barrier Restoration (primary), Cumulative Irritation Risk (primary penalty).
────────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING & HIGH SCORE CRITERIA
────────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
High Score Eligibility (> 4.0):
- Comprehensive moisturisation architecture (all three components functional)
- Barrier Restoration ≥ 3.5
- Cumulative Irritation Risk ≥ 3.0
- No dominant fragrance/essential oil loading exceeding IFRA Category 5 limits
- No decorative active inflation (Category C actives as primary claims)
- Formulation Honesty ≥ 3.5
- No high-concern preservatives (MI in leave-on = hard disqualifier)
Hard Disqualifiers:
- Methylisothiazolinone (MI) in leave-on formulation
- Dominant phototoxic essential oils (non-BCF bergamot, lime peel) at body lotion
  concentrations
- Superficial/sensory-dominant moisturisation architecture with barrier repair
  marketing claims
- Heavy synthetic fragrance at top-5 INCI position with undisclosed allergen blend
  and convergent heavy fragrance indicators confirmed

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 LOTION PROFILE

## Functional Classification

Short lotion classification.

Examples:
- Comprehensive Barrier-Restorative Lotion
- Balanced Humectant-Emollient Lotion
- Silicone-Dominant Sensory Lotion
- Fragrance-Heavy Partial Moisturizer
- Minimalist Functional Body Lotion

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering moisturization architecture balance, barrier restoration potential, fragrance and sensitizer load, pH compatibility, long-term daily-use behavior, and overall formulation balance.

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

## Moisturization + Barrier Analysis

### Moisturization Depth — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Restoration — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Hydration Longevity — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Feel and Tolerance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Comedogenicity Risk — ⭐X.X

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

### Eczema / Atopic-Prone — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Twice Daily Use — ⭐X.X

Short explanation.

### Seasonal Heavy Use (Winter/Dry Climate) — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Skin feel post-application
- Absorption quality
- Irritation signals

## Medium-Term

- Hydration durability
- Barrier response
- Sensitization early signals

## Long-Term

- Barrier stability and restoration
- Dryness and xerosis management
- Microbiome stability
- Fragrance and preservative sensitization trajectory
- Overall skin outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting moisturization architecture, barrier behavior, irritation and sensitization risk, active ingredient performance, and long-term skin outcome.

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
- Mention harsh fragrance components, high-concern preservatives, and colorants in output
- No silicone-slip or fragrance-feel bias
- Structural moisturization weakness overrides cosmetic elegance
- Moisturization architecture tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Leave-on active efficacy must be classified before Effectiveness scoring
- Repeated leave-on behavior > single-application feel
- Long-term outcome > immediate sensation
- Post-application burning or tightening = structural incompatibility signal
- Silky feel ≠ hydration depth
- Natural essential oils ≠ safe at leave-on concentrations
- Collagen in body lotion ≠ skin collagen restoration
- Ceramide marketing ≠ ceramide functional delivery without formulation evidence
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Body Lotion Evaluation Algorithm — Structured for moisturization architecture analysis, barrier restoration realism, and long-term daily-use skin comfort evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict body lotion structural evaluation engine."
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