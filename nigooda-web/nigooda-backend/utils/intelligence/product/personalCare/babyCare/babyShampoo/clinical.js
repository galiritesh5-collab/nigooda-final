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
        "BABYSHAMPOO ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 2 — BABY SHAMPOO / INFANT HAIR CLEANSER EVALUATION
STANDALONE — FULLY SELF-CONTAINED
═══════════════════════════════════════════════════════════════════════════════
────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE
────────────────────────────────────────────────────────────────────────────
SYSTEM OBJECTIVE
Reward baby shampoos demonstrating ultra-gentle cleansing, surfactant architecture
appropriate for infant scalp, ocular compatibility (ocular safety is co-dominant with
systemic safety), microbiome compatibility for developing infant microbiome,
evidence-based formulation, absence of developmental safety concerns, and long-term
repeated-use tolerance.
Rinse-off context applies: 30–60 seconds scalp contact. Exposure realism must
modulate all secondary ingredient penalties accordingly.
INFANT SKIN BIOLOGICAL CONTEXT:
• Neonatal scalp stratum corneum is thinner than adult; permeability is higher
• Ocular mucosa is immature — surfactant ocular compatibility is critical
• Microbiome colonization is active — scalp commensal balance matters
• ~20% of infants have atopic predisposition — evaluate for atopic scenario
pH EVALUATION RULE (EMBEDDED):
pH is not evaluated from the ingredient list alone. Only scored if manufacturer
explicitly states it. Traditional saponified soap base (Sodium Cocoate, Sodium Palmate
as primary) = inherently alkaline pH 9–10 by process chemistry — flagged as alkaline
architecture regardless of stated or unstated pH. All other formulas: neutral treatment
if pH unstated.
EXPOSURE REALISM (EMBEDDED):
Contact time 30–60 seconds on scalp. Significant rinse-off dilution occurs. Risk from
secondary ingredients depends on concentration, rinse efficiency, and aromatic burden —
not presence alone. This realism moderates but does not eliminate secondary penalties.
FRAGRANCE MATERIAL DISCRIMINATION:
The following are NOT equivalent and must be assessed contextually:
 Synthetic fragrance oil | Essential oil | Aromatic plant extract |
 Floral water/hydrosol | Trace aromatic compound
Each requires individual assessment of load, format, and evidence weight.
────────────────────────────────────────────────────────────────────────────
LAYER 1 — SURFACTANT HARSHNESS AND OCULAR SAFETY TIER SYSTEM
────────────────────────────────────────────────────────────────────────────
TIER 1 — HARSH / OCULAR INCOMPATIBLE:
SLS, SLES as primary, ALS, LAS, Sodium C14–16 Olefin Sulfonate, Saponified soap base,
Cocamide DEA (nitrosamine concern — documented by IARC and EU CosIng).
Scoring: Severe Safety + Ocular Safety penalty; Barrier Preservation ceiling 1.5;
Developmental Safety flag.
TIER 2 — MODERATE / OCULAR BORDERLINE:
SCI, Sodium Lauroyl Methyl Isethionate, Disodium Laureth Sulfosuccinate (primary),
SLES in blended systems (secondary only), TEA-based surfactants.
Scoring: Moderate Safety and Ocular Safety penalties; reduced Barrier Preservation;
eligible only as secondary in Tier 3–4 system.
TIER 3 — MILD / OCULAR COMPATIBLE:
CAPB (Cocamidopropyl Betaine) — well-studied mild surfactant; safe at standard cosmetic
concentrations; sensitization potential affects Allergy Risk only (not Safety), and only
at elevated concentrations or in atopic-predisposed individuals — note only, do not
over-penalize; Lauryl Betaine; Sodium Cocoamphoacetate; Disodium Cocoamphodiacetate;
Sodium Cocoyl Glycinate; Sodium Methyl Cocoyl Taurate; Sodium Cocoyl Apple Amino Acids.
Scoring: Good Barrier Preservation and Ocular Safety eligible; CAPB note in Allergy Risk only.
TIER 4 — VERY MILD / BEST OCULAR COMPATIBILITY:
Sodium Cocoyl Glutamate, Disodium Cocoyl Glutamate, Sodium Lauroyl Glutamate,
Coco Glucoside, Decyl Glucoside, Lauryl Glucoside, Sodium Cocoyl Alaninate,
Potassium Cocoyl Glycinate.
OCULAR-OPTIMIZED — GOLD STANDARD FOR BABY SHAMPOO:
Sodium Lauroamphoacetate, Disodium Lauroamphodiacetate, PEG-80 Sorbitan Laurate,
Polysorbate 20 (excellent ocular profile in blended systems), Cocamidopropyl Hydroxysultaine.
Scoring: Maximum Barrier Preservation and Ocular Safety; transparency and honesty bonus.
SURFACTANT SYSTEM CLASSIFICATION:
• Tier 1 alone                     → Severe — disqualifying for baby shampoo
• Tier 1 + Tier 3/4                → Moderate-High concern
• Tier 2 alone                     → Moderate — below standard
• Tier 2 + Tier 3/4                → Moderate-Low — marginal
• Tier 3/4 dominant                → Low — appropriate
• Tier 4 / Ocular-optimized        → Very Low — best in class
• Any Tier 1 in baby product       → Mandatory hard penalty regardless of blending
────────────────────────────────────────────────────────────────────────────
LAYER 2 — DEVELOPMENTAL SAFETY RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
HIGH CONCERN — MANDATORY PENALTY:
Preservatives:
• Long-chain parabens (Propylparaben, Butylparaben) — endocrine disruption concern at
 repeated systemic infant doses; EU restriction in leave-on is relevant; in rinse-off
 the risk is reduced but still flagged for neonatal products
• Methylparaben / Ethylparaben — significantly lower concern; accepted in rinse-off by
 EU and FDA; apply mild note only — do NOT penalize at same level as long-chain parabens
• Formaldehyde releasers (DMDM Hydantoin, Imidazolidinyl Urea, Diazolidinyl Urea,
 Quaternium-15, Bronopol) — formaldehyde is documented sensitizer and IARC carcinogen
• MIT (Methylisothiazolinone) — EU restricted in rinse-off at relevant concentrations;
 documented sensitization; flag in baby products with moderate penalty
• MCI/MI blend — high sensitizer; restricted in EU rinse-off; high concern
Fragrance / Essential Oils — by tier (F0/F1/F2/F3 — see Layer 3)
Synthetic Colorants — maximum penalty (zero functional purpose in baby shampoo)
Synthetic Musks (Galaxolide, Tonalide) — bioaccumulation concern; flag
MODERATE CONCERN:
• Phenoxyethanol >1.0% — flag; acceptable at standard concentrations ≤1%
• Benzyl Alcohol in neonates specifically — rinse-off concern for very young infants
• CAPB — note in Allergy Risk only at standard concentrations
LOW CONCERN / ACCEPTABLE:
Sodium Benzoate (low), Potassium Sorbate, Ethylhexylglycerin (booster),
Phenoxyethanol ≤1%, Caprylyl Glycol, Dehydroacetic Acid.
Methylparaben / Ethylparaben at standard cosmetic concentrations → mild note only.
────────────────────────────────────────────────────────────────────────────
LAYER 3 — FRAGRANCE, ESSENTIAL OIL, AND HERBAL SYSTEM (EMBEDDED — RINSE-OFF SCALP)
────────────────────────────────────────────────────────────────────────────
FRAGRANCE TIERING PRINCIPLE:
Fragrance is penalized by load tier, not flat-collapsed. Rinse-off context moderates
but does not eliminate risk. Discrimination between tiers is required.
F0 → Highest score eligibility; Formulation Honesty bonus
F1 → Eligible for 3.0–3.8; Structural Excellence Protection applies; moderate
    sensitization note; small microbiome penalty
F2 → Maximum 3.2
F3 or High-concern EO → Maximum 2.8
ESSENTIAL OIL CONCERN TIERS (SCALP/SHAMPOO CONTEXT):
HIGH CONCERN — SEVERE PENALTIES (triggers F3):
• Peppermint / Menthol: respiratory risk in infants — well-documented AAP/EU contraindication
• Eucalyptus (1,8-cineole): respiratory and CNS toxicity in young children
• Tea Tree: systemic toxicity at infant absorbed doses
• Cinnamon bark/leaf: potent sensitizer
• Clove: strong sensitizer
• Phototoxic citrus oils: phototoxicity documented
MODERATE CONCERN — MODERATE PENALTIES:
• Lavender EO: sensitization potential (linalool/linalyl acetate); NOT equivalent
 to peppermint severity. Lavender EO ≠ lavender extract ≠ lavender water.
• Chamomile EO (not extract): Asteraceae cross-reactivity; moderate concern.
 Chamomile extract ≠ chamomile EO.
• Vanilla oil at high concentration: mild sensitization.
LOW-CONCERN TRACE AROMATICS: Minimal note only; rinse-off realism applies.
BOTANICAL ACCURACY RULE FOR SHAMPOO:
• Chamomile extract (not oil) — well-studied soothing agent; widely accepted; no
 major penalty; flag Asteraceae cross-reactivity only as a note for highly atopic infants
• Calendula extract — anti-inflammatory; widely used safely; minor note for atopic only
• Panthenol — provitamin B5; extremely well-tolerated; no penalty; bonus for soothing
• Glycerin — humectant; universally safe; functional credit
• Aloe vera — well-studied soothing ingredient; safe at cosmetic concentrations; no penalty
HERBAL TIERS (H1/H2/H3 — EMBEDDED):
H1 coherent botanicals in Tier 3/4 + F0/F1 formula → mild Ingredient Quality and
Formulation Honesty credit; minor secondary soothing role in rinse-off context.
H2 traditional botanicals → cultural recognition; modest clinical contribution note.
H3 stacking → Formulation Honesty + Ingredient Quality penalties; sensitization complexity.
────────────────────────────────────────────────────────────────────────────
LAYER 4 — MICROBIOME IMPACT RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
HIGH DISRUPTION RISK:
Broad-spectrum antimicrobials (Triclosan, Chlorhexidine, Benzalkonium Chloride);
SLS-dominant systems; strong antimicrobial EO blends (tea tree, thyme, oregano);
high-concentration preservative systems.
LOW DISRUPTION RISK:
Tier 3–4 surfactant at appropriate concentration; minimal preservatives; F0 or F1.
────────────────────────────────────────────────────────────────────────────
LAYER 4.5 — STRUCTURAL EXCELLENCE PROTECTION RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
If formula has: Tier 3/4 or Ocular-optimized surfactant; F0 or F1 fragrance; mild
preservative system; no colorants; no high-concern EOs → MAINTAIN structural
differentiation. One moderate flaw (F1, modest H2 complexity, minor preservative note)
reduces score meaningfully but does NOT collapse elite architecture recognition.
PENALTY LANGUAGE: Use calibrated language ("less than ideal", "moderate concern",
"not optimal for neonates"). Avoid catastrophic framing for moderate formulas.
────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM
────────────────────────────────────────────────────────────────────────────
INGREDIENT ACCURACY RULE (EMBEDDED):
Every penalty must be grounded in evidence specific to ingredient, concentration, and
context. Widely accepted safe ingredients (glycerin, panthenol, allantoin, aloe vera,
calendula extract, chamomile extract, colloidal oatmeal, CAPB at standard concentrations)
must NOT receive penalties without specific evidence of harm. Major regulatory body
acceptance = neutral-to-positive treatment.
SAFETY [0.20 weight]:
Surfactant harshness; ocular compatibility; barrier disruption; developmental ingredient
safety by tier; sensitization potential; exposure realism applied.
EFFECTIVENESS [0.15 weight]:
Scalp/hair cleansing; cradle cap management (medicated only); cleansing-to-barrier balance.
OCULAR SAFETY [0.20 weight — CO-DOMINANT WITH SAFETY]:
Surfactant ocular compatibility; "tear-free" structural credibility; EO ocular burden by tier.
Tier 4/Ocular-optimized + F0 → 4.5–5.0; Tier 4 + F1 → 3.8–4.5; Tier 3 → 3.5–4.5;
Tier 2 blend → 2.5–3.5; Tier 1 present → 1.0–2.0.
ALLERGY RISK [0.15 weight]:
Fragrance by tier; EO by concern tier; botanical by H tier; CAPB note at standard
concentrations; developmental window amplification; exposure realism applied.
ECO IMPACT [0.10 weight]:
Biodegradability; environmental persistence of preservatives and colorants.
INGREDIENT QUALITY [0.10 weight]:
Surfactant coherence; developmental safety of preservatives; active honesty;
H tier applied; H1 in coherent formula → mild support; H3 → reduction.
SKIN COMPATIBILITY [0.10 weight]:
Daily bath tolerance; atopic compatibility; microbiome stability; repeated-use behavior.
CORE SCORE FORMULA:
Core Score = (Safety × 0.20) + (Effectiveness × 0.15) + (Ocular Safety × 0.20) +
            (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.10) +
            (Skin Compatibility × 0.10)
────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED BABY SHAMPOO PERFORMANCE
────────────────────────────────────────────────────────────────────────────
CLEANSING EFFICIENCY:
Scalp sebum, milk, food, cradle cap removal. Tier 1 ceiling applies.
BARRIER PRESERVATION [DOMINANT]:
• Tier 1                        → Max 1.5
• Tier 1 + Tier 3/4             → Max 2.5
• Tier 2                        → Max 2.8
• Tier 2 + Tier 3/4             → Max 3.2
• Tier 3/4                      → Max 4.3
• Tier 4 / Ocular-optimized     → Eligible for 5.0
• Traditional soap              → Hard ceiling 1.5
Structural Excellence Protection: Tier 4 + F1 → maximum ~4.0–4.3; meaningful
differentiation from Tier 2/3 systems is maintained.
SCALP HYDRATION SUPPORT:
Residual humectant benefit; post-wash moisture retention; excessive sebum stripping avoidance.
RESIDUAL DRYNESS RISK:
Post-wash scalp tightness trajectory; lipid depletion under repeated daily washing;
atopic dermatitis aggravation potential.
MICROBIOME COMPATIBILITY:
Commensal preservation; F-tier microbiome impact applied.
CUMULATIVE IRRITATION RISK:
Daily use amplification; fragrance by tier; preservative sensitization; botanical
allergen by H tier; exposure realism applied.
F1 in excellent Tier 4 formula → moderate cumulative concern; NOT equivalent to F3.
FORMULATION HONESTY:
"Tear-free" without structural support → penalty; H3 stacking → penalty;
H1 in coherent Tier 4 + F0 → honesty bonus; developmental concern ingredients
marketed as safe without qualification → penalty.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 specialized scores.
────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING FORMULA AND CALIBRATION
────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
SCORE DISTRIBUTION TARGETS:
 1.0–1.8   → Truly poor / high-risk
 1.8–2.5   → Weak formulations
 2.5–3.3   → Moderate / acceptable with concerns
 3.3–4.0   → Good, structurally sound with limitations
 4.0–4.6   → Excellent, near-fragrance-free mild systems
 4.6–5.0   → Exceptional neonatal-grade
HIGH SCORE ELIGIBILITY (>4.0):
Tier 3 or Tier 4/Ocular-optimized dominant; zero formaldehyde releasers, long-chain
parabens, MIT/MCI; F0; zero synthetic colorants; Barrier Preservation ≥ 3.8;
Ocular Safety ≥ 3.8; Cumulative Irritation Risk ≥ 3.5; Formulation Honesty ≥ 3.5.
FRAGRANCE CEILINGS:
F0 → 4.0–5.0; F1 + Tier 4 → ~3.8 max; F2 → 3.2 max; F3 / High-concern EO → 2.8 max.
DISQUALIFIERS:
Tier 1 surfactant + baby/gentle claim; traditional soap base; formaldehyde releasers;
peppermint/eucalyptus/tea tree/cinnamon in baby shampoo.
STRICT SCORING RULES:
Surfactant tier classified before scoring. Fragrance tier classified before scoring.
EO concern tier classified before scoring. Herbal tier classified before Allergy Risk
and Ingredient Quality. pH not scored from ingredient list. Structural Excellence
Protection applied to Tier 4 dominant formulas. Score distribution targets enforced.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🍼 SHAMPOO PROFILE

## Product Classification

Short classification.

Examples:
- Gold Standard Infant Cleanser
- Gentle Tear-Free Baby Shampoo
- Moderate Daily Baby Cleanser
- Developmental Safety Concern Shampoo
- Marketing-Driven Baby Cleanser

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering:
- Surfactant mildness and ocular compatibility
- Developmental safety profile
- Barrier friendliness for infant skin
- pH compatibility
- Long-term infant use behavior
- Overall formulation balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering infant safety realism.

### Effectiveness — ⭐X.X

Short explanation covering cleansing realism.

### Ocular Safety — ⭐X.X

Short explanation covering tear-free and eye contact tolerance.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering environmental realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and surfactant quality.

### Skin Compatibility — ⭐X.X

Short explanation covering infant skin comfort and long-term usability.

---

# 🧪 SPECIALIZED PERFORMANCE

## Infant Scalp + Safety Analysis

### Cleansing Efficiency — ⭐X.X

Short structural reason.

### Barrier Preservation — ⭐X.X

Short structural reason.

### Scalp Hydration Support — ⭐X.X

Short structural reason.

### Residual Dryness Risk — ⭐X.X

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

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Concerns

- Main structural weakness
- Main structural weakness
- Main structural weakness

---

# 👶 INFANT / TODDLER COMPATIBILITY

## Age and Condition Suitability

### Newborn (0–3 months) — ⭐X.X

Short compatibility explanation.

### Infant (3–12 months) — ⭐X.X

Short compatibility explanation.

### Toddler (1–3 years) — ⭐X.X

Short compatibility explanation.

### Eczema-Prone Infant — ⭐X.X

Short compatibility explanation.

### Cradle Cap Management — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Every Other Day Use — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing feel and scalp response
- Ocular tolerance (splash/contact)
- Irritation signals

## Medium-Term

- Barrier response and scalp condition
- Cradle cap impact (if applicable)
- Tolerance development

## Long-Term

- Scalp barrier stability
- Sensitization trajectory
- Microbiome colonization support
- Overall infant skin outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleansing system, ocular safety, barrier behavior, developmental safety, irritation risk, active performance, and long-term infant skin outcome.

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

3–5 concise caregiver-friendly evidence-based reasons.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Always flag: harsh colorants, developmental safety concerns, fragrance, preservatives
- Ocular safety MUST be classified before final scoring
- Surfactant harshness tier MUST be classified before scoring
- pH compatibility MUST be assessed for all formulations
- Developmental safety screen MUST be completed before scoring
- Repeated infant daily-use behavior > single-use impression
- Long-term infant outcome > immediate caregiver sensory satisfaction
- Post-wash scalp tightness = structural failure signal, not "clean feeling"
- Foam richness ≠ cleansing power or gentleness
- "Natural" essential oils ≠ safe for infants
- "Tear-free" label ≠ structural ocular safety without surfactant verification
- "Clinically tested" or "pediatrician approved" ≠ formulation quality
- Formaldehyde releasers, parabens, MIT/MCI must always be flagged explicitly
- Caregiver trust is a responsibility — marketing deception is penalized more severely in baby products
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Baby Shampoo Evaluation Algorithm — Structured for surfactant mildness analysis, ocular safety profiling, infant scalp barrier assessment, and long-term developmental skin outcome evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict baby shampoo structural evaluation engine."
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
