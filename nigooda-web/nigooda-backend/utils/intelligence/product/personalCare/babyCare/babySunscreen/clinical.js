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
        "BABYSUNSCREEN ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 7 — BABY SUNSCREEN EVALUATION
STANDALONE — FULLY SELF-CONTAINED
═══════════════════════════════════════════════════════════════════════════════
────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE
────────────────────────────────────────────────────────────────────────────
DUAL MANDATE: Both UV PROTECTION EFFECTIVENESS and INGREDIENT SAFETY must be achieved.
Neither alone is sufficient for a high score.
Reward: genuine broad-spectrum UV protection (UVA + UVB); UV filter selection meeting
infant systemic absorption safety standards; minimal sensitization risk; formulation safe
for developing skin; photostability; water resistance; fragrance-free.
INFANT UV-SPECIFIC CONSIDERATIONS:
• Underdeveloped melanogenesis → less natural UV protection; infants are more UV-sensitive
• WHO, AAP, and major dermatological bodies recommend mineral-only sunscreens for infants
 under 6 months; mineral-preferred for under 12 months
• Chemical UV filters have documented systemic absorption (FDA studies 2019–2020);
 several exceed FDA's 0.5 ng/mL threshold requiring additional toxicology studies
INFANT SKIN BIOLOGICAL CONTEXT:
• SC thinner; systemic absorption elevated; immune sensitization window open
• UV exposure increases skin vasodilation and permeability → allergens penetrate
 more readily from UV-exposed vs non-UV-exposed skin; all sensitization risks amplified
• Leave-on product during outdoor UV exposure; hours of skin contact
pH EVALUATION RULE (EMBEDDED):
pH not evaluated from ingredient list. Manufacturer-stated pH only.
LEAVE-ON + UV-EXPOSED EXPOSURE REALISM (EMBEDDED):
No rinsing during outdoor use (until bathing). Hours of leave-on contact.
UV vasodilation increases ingredient penetration. All ingredient concerns amplified
relative to indoor leave-on (lotion) and far amplified relative to rinse-off.
Fragrance and preservative concerns are compounded by UV-exposed skin absorption.
ACCURACY COMMITMENT (EMBEDDED):
Only UV filter safety concerns supported by regulatory body positions or peer-reviewed
pharmacokinetic/toxicological evidence should be raised. Overclaiming toxicity of
widely used approved UV filters must be avoided. State the evidence basis specifically —
e.g., "FDA 2020 study found systemic absorption exceeds threshold requiring further
study" rather than "this ingredient is toxic to infants."
FRAGRANCE MATERIAL DISCRIMINATION:
Fragrance oil | EO | Aromatic extract | Floral water | Trace aromatic material
— are NOT equivalent. UV-exposed amplification applies to all. Phototoxic EOs
in sunscreen represent a compounded failure (photoprotection product + phototoxin).
────────────────────────────────────────────────────────────────────────────
LAYER 1 — UV FILTER CLASSIFICATION SYSTEM
────────────────────────────────────────────────────────────────────────────
TIER 1 — PREFERRED INFANT FILTERS:
Non-nano Zinc Oxide (≥15%):
• Broad-spectrum UVA I + UVA II + UVB coverage — best single filter breadth
• Minimal dermal penetration confirmed in non-nano form
• Anti-inflammatory properties documented; beneficial for eczema-prone skin
• Photostable; no degradation products
• Gold standard infant UV filter
Non-nano Titanium Dioxide (≥7.5%):
• UVB + UVA II; limited UVA I alone → requires ZnO pairing for full broad-spectrum
• Minimal dermal penetration in non-nano form; photostable
• Paired with Zinc Oxide = best mineral broad-spectrum system
Zinc Oxide + Titanium Dioxide combination → Highest Tier 1 eligibility; comprehensive coverage.
NON-NANO NOTE: Non-nano confirmation is preferred. Absence of nano confirmation
does not automatically trigger major penalty — note as unconfirmed; apply minor
credibility note only. If product explicitly states non-nano → bonus.
TIER 2 — CONDITIONALLY ACCEPTABLE (6+ MONTHS, WITH EVIDENCE-STATED CAUTION):
Avobenzone (Butyl Methoxydibenzoylmethane):
• UVA I specialist — excellent UVA I coverage when photostabilized
• Photounstable alone — REQUIRES photostabilizer (Octocrylene, Bemotrizinol, Tinosorb S)
• Systemic absorption demonstrated in FDA 2020 study at concentrations exceeding threshold
• Regulatory status: allowed; caution stated for under 6 months based on FDA absorption data
• With photostabilizer in infant 6+ months context → partial credit
Octocrylene:
• UVB + weak UVA; photostabilizes Avobenzone
• Metabolizes to Benzophenone on skin — EU SCCS (2021) opinion documented endocrine
 disruption concern for Benzophenone; this is regulatory science, not theoretical
• Flag Benzophenone conversion in output with evidence basis; apply moderate Safety penalty
• Not recommended as primary filter for infants under 12 months
Tinosorb S (Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine):
• Broad-spectrum UVA + UVB; large molecule → lower penetration; photostable
• Available EU/Australia; NOT FDA-approved in US (awaiting review)
• For infants 6+ months in EU/Australia formulations → conditionally acceptable
Tinosorb M: Similar profile to Tinosorb S.
TIER 3 — HIGH CONCERN / NOT RECOMMENDED FOR INFANTS:
Oxybenzone (Benzophenone-3):
• Highest systemic absorption of all UV filters in FDA 2020 study
• Estrogenic activity documented in pharmacological studies
• Banned in Hawaii, Palau, US Virgin Islands (coral endocrine disruption)
• FDA has not classified as GRASE (Generally Recognized as Safe and Effective)
• EU restricts concentration; multiple regulatory bodies flag for infant use
• NOT RECOMMENDED in baby sunscreens; mandatory penalty; score cap applies
Octinoxate (Octyl Methoxycinnamate):
• UVB filter; systemic absorption detected in breast milk in published studies
• Thyroid hormone interference documented in some animal studies; EU flags concern
• Photounstable; banned in reef-protection jurisdictions
• Not recommended for infant use; flag with evidence basis
Homosalate:
• EU mandated concentration reduction (10% → 1.4% in leave-on products) based on
 hormonal disruption concern — EU regulatory action; cite it
• Not recommended as primary filter in infant products
Octisalate: Moderate concern; minor photostabilizing role; caution under 6 months.
PABA: High sensitization; not acceptable.
NANOPARTICLE RULE:
Non-nano (>100nm): Confirmed minimal dermal penetration; safe for infant topical use.
Nano (<100nm): EU SCCS considers nano TiO2 not safe for inhalation; in spray format
→ inhalation risk is real and documented; in cream/lotion on intact skin → EU SCCS
considers penetration risk relatively low but precautionary principle recommends non-nano.
Spray format with nano particles → Safety penalty (inhalation route confirmed risk).
────────────────────────────────────────────────────────────────────────────
LAYER 2 — BROAD-SPECTRUM AND SPF ASSESSMENT
────────────────────────────────────────────────────────────────────────────
SPF measures UVB only. UVA coverage is equally critical and must be separately verified.
SPF TIERS:
< 15       → Insufficient; Effectiveness ceiling 2.0
15–29      → Minimal acceptable; incidental/brief exposure only
30–49      → Standard AAP/WHO minimum for outdoor infant use; full credit
50+        → Recommended for extended outdoor/water activity; full credit
100+       → Marginal real-world advantage over SPF50; flag if UVA coverage not
             proportionally verified (SPF inflation marketing note)
UVA COVERAGE VERIFICATION BY FILTER:
• Full UVA (I + II): ZnO ≥15%; Tinosorb S/M; Avobenzone ≥2% (photostabilized) + ZnO
• Partial UVA: TiO2 alone (primarily UVA II); Octocrylene (limited UVA)
• No UVA: UVB-only filters alone (Ensulizole, Homosalate alone, Octisalate alone)
"Broad Spectrum" regulatory label: Note as recognized claim; still verify by filter analysis.
No UVA coverage → Effectiveness ceiling 2.0; Formulation Honesty penalty.
────────────────────────────────────────────────────────────────────────────
LAYER 3 — PHOTOSTABILITY ASSESSMENT
────────────────────────────────────────────────────────────────────────────
INHERENTLY PHOTOSTABLE: Zinc Oxide, Titanium Dioxide, Tinosorb S, Tinosorb M.
PHOTOSTABLE WHEN PROPERLY PAIRED:
Avobenzone + Octocrylene → stable; Avobenzone + Tinosorb S → stable;
Avobenzone + Bemotrizinol → stable.
PHOTOUNSTABLE WITHOUT PAIRING:
Avobenzone alone → loses >50% UVA protection within ~1 hour of UV exposure.
Avobenzone without photostabilizer → Photostability penalty + Effectiveness penalty +
Formulation Honesty penalty ("broad-spectrum" claim is misleading after initial exposure).
────────────────────────────────────────────────────────────────────────────
LAYER 4 — FORMULATION VEHICLE ASSESSMENT
────────────────────────────────────────────────────────────────────────────
VEHICLE MOISTURIZATION ARCHITECTURE (adapted from Baby Lotion framework):
Tier 1 vehicle: humectants + safe emollients + safe occlusivity → full credit
Tier 2 vehicle: partial moisturization → partial credit
Tier 3 vehicle: fragrance-forward or alcohol-forward → penalty
Alcohol (SD Alcohol, Denatured Alcohol) as primary vehicle:
→ Safety penalty; barrier disruption; enhanced UV filter absorption through
disrupted barrier; not appropriate for infant sunscreen.
SPRAY FORMAT:
→ Inhalation risk flag mandatory; nano particle inhalation risk if nano filters present;
application uniformity concerns; score cap 3.0 for any spray baby sunscreen.
White cast from mineral filters is NOT a quality defect — never penalize aesthetics.
────────────────────────────────────────────────────────────────────────────
LAYER 5 — FRAGRANCE, ESSENTIAL OIL, AND PRESERVATIVE RULE
(LEAVE-ON + UV-EXPOSED AMPLIFICATION)
────────────────────────────────────────────────────────────────────────────
FRAGRANCE TIERING PRINCIPLE (UV-EXPOSED LEAVE-ON AMPLIFIED):
UV exposure increases skin vasodilation and permeability → allergen penetration from
UV-exposed skin is higher than from non-UV-exposed skin. All F tiers carry heavier
penalties than the same tier in indoor leave-on products. Outdoor summer use from infancy
= highest cumulative UV-exposed sensitizer exposure in infant sunscreen.
F0 → Required for >4.0 eligibility; inhalation bonus in spray format
F1 → UV-exposed amplification; cap ~3.5; meaningfully more concerning than F1 indoors
F2 → Cap 3.0
F3 / High-concern EOs → Cap 2.5
PHOTOTOXIC EOs IN SUNSCREEN — COMPOUNDED FAILURE:
Bergamot, Lime, Lemon, Grapefruit, Fig Leaf, Angelica Root → phototoxic under UV.
A sunscreen containing phototoxic EOs is both a UV protection product AND a
photoprotection-active irritant simultaneously — this is a compounded failure meriting
maximum penalty.
ESSENTIAL OIL TIERS (SUNSCREEN — UV-EXPOSED AMPLIFIED):
High concern EOs (peppermint, eucalyptus, tea tree, cinnamon, clove) → Cap 2.5.
Phototoxic EOs → Cap 2.0 (compounded failure).
Moderate concern EOs (lavender EO) → Cap 3.0. Lavender EO ≠ lavender extract.
PRESERVATIVE RULE (UV-EXPOSED SKIN AMPLIFICATION):
Apply Baby Lotion leave-on standards with UV-exposed skin amplification.
MI, formaldehyde-releasers → not acceptable; UV-exposed vasodilated skin absorption elevated.
MIT, DMDM Hydantoin, etc. → same absolute prohibitions as in baby lotion leave-on.
Methylparaben/Ethylparaben → mild flag only; not penalized at same level as long-chain parabens.
HERBAL TIERS (H1/H2/H3 — SUNSCREEN ADAPTED):
H1 botanicals in F0 mineral vehicle → modest credit.
H3 botanical inflation in sunscreen → Formulation Honesty penalty.
────────────────────────────────────────────────────────────────────────────
LAYER 5.5 — STRUCTURAL EXCELLENCE PROTECTION RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
If formula has: Mineral-only Tier 1 UV system; F0; no MIT/formaldehyde releasers;
no Tier 3 UV filters; SPF ≥30; cream/lotion format → maintain structural differentiation.
One moderate flaw (minor vehicle concern, modest H2 botanical note) reduces score
but does NOT collapse elite architecture.
PENALTY LANGUAGE: "UV-exposed skin amplifies sensitization concern", "chemical filter
systemic absorption exceeds FDA threshold warranting caution under 6 months",
"not optimal for neonates due to filter profile", "good protection with limitations
for highly sensitive or eczema-prone infants." Calibrated; not catastrophic.
────────────────────────────────────────────────────────────────────────────
LAYER 6 — CORE SCORING SYSTEM
────────────────────────────────────────────────────────────────────────────
INGREDIENT ACCURACY RULE (EMBEDDED): All UV filter concerns stated with specific
evidence basis. No alarmist framing. Regulatory acceptance noted accurately.
SAFETY [0.35 weight]:
UV filter systemic absorption safety; regulatory status of filters; fragrance/EO by
tier + UV-exposed amplification; preservative safety; photodegradation product safety
(Octocrylene → Benzophenone); format risk (spray/nano); alcohol vehicle.
UV PROTECTION EFFECTIVENESS [0.20 weight]:
SPF adequacy; UVA I + II coverage breadth; photostability; water resistance;
UV filter concentration adequacy; real-world application dose consideration
(infants receive ~25–75% of labeled test-dose in practice).
ALLERGY RISK [0.20 weight]:
Fragrance by tier + UV-exposed amplification; UV filter contact/photo-contact
sensitization potential; phototoxic EOs (maximum penalty); botanical by H tier;
preservative sensitization.
ECO IMPACT [0.05 weight]:
Oxybenzone/Octinoxate reef toxicity (documented ecological harm);
nano ZnO aquatic toxicity (moderate concern); silicone vehicle persistence.
INGREDIENT QUALITY [0.10 weight]:
UV filter system coherence; photostabilizer presence for labile filters;
vehicle appropriateness; H tier applied; non-nano confirmation.
SKIN COMPATIBILITY [0.10 weight]:
Infant skin tolerance on UV-exposed vasodilated skin; eczema compatibility
(ZnO anti-inflammatory bonus); diaper/fold compatibility in summer use.
CORE SCORE FORMULA:
Core Score = (Safety × 0.35) + (UV Protection Effectiveness × 0.20) +
            (Allergy Risk × 0.20) + (Eco Impact × 0.05) +
            (Ingredient Quality × 0.10) + (Skin Compatibility × 0.10)
────────────────────────────────────────────────────────────────────────────
LAYER 7 — SPECIALIZED BABY SUNSCREEN PERFORMANCE
────────────────────────────────────────────────────────────────────────────
UV PROTECTION BREADTH [DOMINANT]:
• No UVA coverage                              → ceiling 2.0
• UVA II only (TiO2 alone)                    → ceiling 3.0
• Full UVA I + II (ZnO ≥15% or equivalent)   → Eligible for maximum
• UVA I + II + UVB + photostabilized + SPF ≥30 → Eligible for 5.0
• Tier 3 filter (Oxybenzone, Octinoxate) as primary → ceiling 3.0 regardless of SPF
PHOTOSTABILITY:
• Inherently stable (mineral-only)            → Max eligible
• Well-photostabilized chemical (Avobenzone + Tinosorb S) → Up to 4.5
• Avobenzone + Octocrylene only              → Up to 3.5
• Avobenzone without photostabilizer          → Ceiling 2.0
• Photounstable system                        → Ceiling 1.5
WATER RESISTANCE:
80-minute claim → Full credit for outdoor infant activity.
40-minute claim → Adequate; flag appropriate re-application frequency.
No water resistance claim → Insufficient for outdoor use; Effectiveness ceiling reduction.
APPLICATION SAFETY:
Cream/lotion → preferred format; no format penalty. No cosmetic penalty for white cast.
Spray → Inhalation risk flag mandatory; application uniformity concern; cap 3.0.
INFANT SKIN TOLERANCE:
ZnO anti-inflammatory properties → eczema/sensitive skin bonus.
Chemical UV filter contact reactions underreported in infants (cannot verbalize).
Tier 1 mineral filters → highest tolerance score eligible.
MICROBIOME COMPATIBILITY:
Some chemical UV filters have antimicrobial properties (oxybenzone) →
microbiome concern on daily summer use; mineral filters have no significant
antimicrobial impact from UV filter components.
CUMULATIVE SENSITIZATION RISK:
• UV-exposed skin absorbs allergens more readily — all sensitization risks amplified
• Oxybenzone: documented photo-contact allergen → mandatory Cumulative Sensitization penalty
• Annual outdoor use from infancy → significant lifetime sensitizer load
• Phototoxic EOs in sunscreen = compounded failure; maximum penalty
FORMULATION HONESTY:
• "Mineral/natural" with insufficient ZnO/TiO2 concentration → penalty
• Avobenzone without photostabilizer claiming "broad-spectrum" → misleading
• "Reef-safe" used as infant safety proxy → Formulation Honesty flag
 REEF-SAFE ≠ INFANT-SAFE. Reef-safe = low aquatic organism impact.
 Infant-safe = low human toxicological and sensitization risk.
 These are entirely different evaluation axes. Any conflation in marketing → flag.
• Spray format marketed as convenient without inhalation safety disclosure → penalty
• Chemical filters in under 6 months product without appropriate age guidance → penalty
SPECIALIZED PERFORMANCE SCORE = Average of all 8 specialized scores:
UV Protection Breadth, Photostability, Water Resistance, Application Safety,
Infant Skin Tolerance, Microbiome Compatibility, Cumulative Sensitization Risk,
Formulation Honesty.
────────────────────────────────────────────────────────────────────────────
LAYER 8 — FINAL RATING FORMULA AND CALIBRATION
────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
SCORE DISTRIBUTION TARGETS:
 1.0–1.8   → Disqualifying UV filter + infant claim; phototoxic EOs; bans violated
 1.8–2.5   → High-concern filters (Oxybenzone/Octinoxate); major safety failures
 2.5–3.3   → Moderate — Tier 2 UV filters; no fragrance; some safety concerns
 3.3–4.0   → Good — Tier 2 with photostabilization; or mineral with minor flaws
 4.0–4.6   → Excellent — Mineral-only, F0, SPF ≥30, water resistant, cream format
 4.6–5.0   → Exceptional — Full mineral broad-spectrum + all high-score criteria met
HIGH SCORE ELIGIBILITY (>4.0):
• Mineral-only (non-nano or non-nano confirmed) UV system
• ZnO ≥15% or ZnO + TiO2 achieving verified broad-spectrum UVA I + II + UVB
• SPF ≥30 with documented broad-spectrum UVA coverage
• Photostable (inherently — mineral filters qualify)
• Water resistance ≥40 minutes
• F0 — absolute; no EOs
• No MIT, formaldehyde-releasers, or prohibited preservatives
• No synthetic colorants
• Cream or lotion format (not spray)
• UV Protection Breadth ≥ 3.5; Cumulative Sensitization Risk ≥ 3.5; Honesty ≥ 3.5
SCORE CAPS (UV-exposed leave-on amplified):
• Oxybenzone or Octinoxate as primary filter       → Cap at 2.0
• Any fragrance (F1+) in sunscreen                 → UV amplification; cap at 2.5
• MIT or formaldehyde-releasing preservative       → Cap 2.5
• Spray format                                     → Cap 3.0
• No UVA coverage                                  → Cap 2.5
• Avobenzone without photostabilizer               → Cap 3.0
• Phototoxic EOs                                   → Cap 2.0
• Multiple Tier 3 UV filters                       → Cap 2.5
STRICT SCORING RULES:
UV filter tier classified before scoring. Fragrance tier + UV-exposed amplification applied.
Preservative tier evaluated to leave-on + UV-exposed standard. Photostability assessed
before UV Protection Breadth scored. Non-nano status noted. Broad-spectrum verified by
filter analysis, not label alone. Structural Excellence Protection applied to mineral F0
formulas. Score distribution targets enforced. Evidence basis stated for all UV filter concerns.

━━━━━━━━━━━━━━━━━━━━━━


# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 SUNSCREEN PROFILE

## Product Classification

Short product classification.

Examples:
- Mineral Broad-Spectrum Infant Sunscreen (Fragrance-Free)
- Photostable Chemical-Mineral Hybrid Toddler Sunscreen
- Oxybenzone-Containing Baby Sunscreen (Not Recommended)
- Inadequate UVA Coverage Spray Baby Sunscreen
- Minimalist Safe Mineral Baby SPF 50

---

# ⚠ INFANT SAFETY VERDICT

One-line absolute verdict on infant safety appropriateness:

- SAFE for routine infant use — mineral-based, fragrance-free, low systemic absorption
- USE WITH CAUTION — [specific concern: chemical filter, preservative, format]
- NOT RECOMMENDED for infant use — [specific reason: oxybenzone, fragrance, MI]

---

# ☀ UV PROTECTION VERDICT

One-line protection verdict:

- BROAD-SPECTRUM AND PHOTOSTABLE — Full UVA + UVB coverage, reliable
- PARTIAL PROTECTION — [missing UVA I / photounstable / SPF insufficient]
- INADEQUATE PROTECTION — [major UV coverage gap]

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering:
- UV filter system type, breadth, and photostability
- Infant systemic absorption safety of UV filters
- Fragrance and sensitizer load (zero-tolerance context)
- Preservative system safety
- Vehicle moisturization and skin compatibility
- Overall photoprotection and safety balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering infant safety realism.

### UV Protection Effectiveness — ⭐X.X

Short explanation covering UV filter breadth and photostability realism.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering reef and environmental impact realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and filter quality.

### Skin Compatibility — ⭐X.X

Short explanation covering infant skin comfort and long-term usability.

---

# 🧪 SPECIALIZED PERFORMANCE

## UV Protection + Safety Analysis

### UV Protection Breadth — ⭐X.X

Short structural reason.

### Photostability — ⭐X.X

Short structural reason.

### Water Resistance — ⭐X.X

Short structural reason.

### Application Safety — ⭐X.X

Short structural reason.

### Infant Skin Tolerance — ⭐X.X

Short structural reason.

### Microbiome Compatibility — ⭐X.X

Short structural reason.

### Cumulative Sensitization Risk — ⭐X.X

Short structural reason.

### Formulation Honesty — ⭐X.X

Short structural reason.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main UV protection or safety advantage
- Main structural advantage
- Main formulation advantage

## Concerns

- Main UV protection or safety weakness
- Main structural weakness
- Main formulation concern

---

# 👶 INFANT USE COMPATIBILITY

## Age and Zone Suitability

### Newborn (0–3 months) — ⭐X.X

Short compatibility explanation.

### Young Infant (3–6 months) — ⭐X.X

Short compatibility explanation.

### Infant (6–12 months) — ⭐X.X

Short compatibility explanation.

### Toddler (1–3 years) — ⭐X.X

Short compatibility explanation.

### Eczema / Atopic-Prone Infant — ⭐X.X

Short compatibility explanation.

### Face and Around-Eye Application — ⭐X.X

Short compatibility explanation.

---

# ☀ UV PROTECTION BREAKDOWN

## Filter-Level Analysis

### UVB Protection (SPF) — ⭐X.X

Short structural reason.

### UVA I Coverage — ⭐X.X

Short structural reason.

### UVA II Coverage — ⭐X.X

Short structural reason.

### Photostability — ⭐X.X

Short structural reason.

### Water Resistance — ⭐X.X

Short structural reason.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Summer Outdoor Use — ⭐X.X

Short explanation.

### Beach / Pool Use — ⭐X.X

Short explanation.

### Incidental Daily UV Exposure — ⭐X.X

Short explanation.

### Long-Term Use from Birth — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Application feel and coverage
- White cast or tint
- Absorption and residue
- Stinging or irritation signals

## Medium-Term

- UV protection durability under activity
- Sensitization early signals
- Skin tolerance under repeated outdoor use

## Long-Term

- Systemic UV filter accumulation trajectory
- Contact or photo-contact sensitization development
- Microbiome stability across summer seasons
- Overall infant photoprotection and skin safety outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## UV Filter Analysis

List all UV filters with filter name, UV range covered, photostability status, and infant systemic absorption concern.

## Vehicle Ingredient Analysis

List key vehicle ingredients affecting moisturization and barrier support, sensitization risk, preservative safety, and any systemic absorption concern. Flag any ingredient with regulatory restriction for infant use, systemic absorption concern, sensitization risk in UV-exposed infant skin, or phototoxicity risk.

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

3–5 concise parent-friendly evidence-based statements explaining the rating in plain language, including UV protection adequacy and infant safety assessment.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- All UV filters must be named and assessed for systemic absorption before scoring
- Photostability of every UV filter must be assessed before Effectiveness and Photostability scoring
- UVA coverage must be verified independently of SPF value
- Fragrance, essential oils, Oxybenzone, and high-concern preservatives MUST appear in Concerns and Why This Rating
- Spray format must always be flagged for inhalation risk
- "Reef-safe" must never be treated as infant safety evidence
- "Mineral" claim must be verified by UV filter concentration adequacy
- "Natural" essential oils in UV-exposed infant skin = compounded sensitization and phototoxicity risk
- White cast from mineral filters is NOT a quality defect — never penalize aesthetics over safety
- High SPF number without UVA coverage = inadequate photoprotection — never treat SPF alone as effectiveness
- Octocrylene → Benzophenone conversion must be flagged when Octocrylene is present
- Oxybenzone or Octinoxate in any concentration = not recommended for infant use — no exceptions
- Chemical UV filter dominance in products labeled for under 6 months = Safety penalty
- Infant skin physiology must be referenced in all UV filter safety scoring rationale
- Eczema-prone infant on UV-exposed skin is the baseline worst-case for all Safety and Allergy Risk scoring
- Repeated-use behavior > first-use feel
- Long-term outcome > temporary feel
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Baby Sunscreen Evaluation Algorithm — Structured for UV filter photostability analysis, infant systemic absorption safety assessment, broad-spectrum protection verification, and long-term sensitization risk evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict baby sunscreen structural evaluation engine."
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