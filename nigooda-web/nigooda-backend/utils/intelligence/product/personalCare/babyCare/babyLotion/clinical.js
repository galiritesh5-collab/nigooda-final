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
        "BABYLOTION ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 4 — BABY LOTION / INFANT MOISTURIZER EVALUATION
STANDALONE — FULLY SELF-CONTAINED
═══════════════════════════════════════════════════════════════════════════════
────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE
────────────────────────────────────────────────────────────────────────────
LEAVE-ON PRODUCT — LEAVE-ON AMPLIFICATION APPLIES.
Baby lotion is applied twice daily or more, to the full body, from birth. It is the
primary vehicle for sustained leave-on ingredient exposure in infant skincare.
Reward: gentle effective moisturization for immature skin; minimal sensitization;
barrier support for underdeveloped SC; preservative safety; fragrance-free gold standard;
formulation appropriate for worst-case scenarios (broken skin, diaper area, skin folds).
INFANT SKIN PHYSIOLOGY:
• SC ~30% thinner at birth; systemic absorption substantially higher
• NMF production lower in newborns
• Microbiome colonization active — disruption has long-term consequences
• Immune sensitization window — leave-on lotion is the PRIMARY sensitization vehicle
• Skin folds increase ingredient penetration under occlusion
• ~20% of infants have atopic predisposition — evaluate worst-case atopic scenario
LEAVE-ON EXPOSURE REALISM (EMBEDDED):
No rinsing. Hours of skin contact. Twice-daily standard from birth. Concentration and
aromatic burden still modulate penalty severity within tiers, but leave-on direction
= amplified upward vs rinse-off. F1 in leave-on lotion is more concerning than F1 in
baby wash. Even trace aromatic levels in leave-on receive moderate penalty.
pH EVALUATION RULE (EMBEDDED):
pH is not evaluated from ingredient list alone. Only scored if manufacturer explicitly
states it. Neutral treatment if unknown.
FRAGRANCE MATERIAL DISCRIMINATION:
Fragrance oil | Essential oil | Lavender extract | Lavender EO | Chamomile extract |
Chamomile EO | Floral water — are NOT equivalent. Each requires contextual assessment.
Lavender extract ≠ lavender EO. Chamomile extract ≠ chamomile EO.
Trace aromatic components at very low concentrations in leave-on still warrant a
penalty — but must be proportionate to the load, not catastrophized.
INGREDIENT ACCURACY RULE (EMBEDDED):
Widely accepted safe ingredients — glycerin, dimethicone, petrolatum (USP), panthenol,
ceramides, allantoin, squalane, hyaluronic acid, niacinamide, bisabolol, aloe vera,
calendula extract, chamomile extract, colloidal oatmeal, shea butter (fragrance-free)
— must NOT receive safety penalties. Penalties require documented evidence specific to
the ingredient, concentration, and application context. Regulatory acceptance by EU,
FDA, or AAP at standard concentrations = neutral-to-positive treatment.
DIMETHICONE ACCURACY NOTE: Dimethicone is an inert silicone polymer with an excellent
safety record; non-irritating, non-comedogenic, widely used in paediatric dermatology.
Must NOT be penalized as harmful. Eco concern for silicone environmental persistence
may be noted appropriately.
────────────────────────────────────────────────────────────────────────────
LAYER 1 — MOISTURIZATION ARCHITECTURE TIER SYSTEM
────────────────────────────────────────────────────────────────────────────
TIER 1 — COMPREHENSIVE INFANT MOISTURIZATION:
All three mechanisms addressed:
• Functional humectants: Glycerin ≥3%, Panthenol, Hyaluronic Acid, Sodium PCA
• Gentle emollients: High-linoleic Sunflower Oil, Squalane, Shea Butter
 (fragrance-free), Ceramides, Sweet Almond Oil (flag atopic concern), Jojoba
• Effective occlusivity: Petrolatum (USP), Dimethicone
Scoring: Maximum Barrier Support; transparency bonus when F0 + minimal preservative.
TIER 2 — PARTIAL MOISTURIZATION:
One mechanism missing or inadequate. Score ceiling applies.
TIER 3 — SUPERFICIAL / SENSORY-DOMINANT:
Fragrance-forward; minimal functional moisturization; alcohol-dominant; ceiling 2.0
for Barrier Support; disqualified from High Score Eligibility.
────────────────────────────────────────────────────────────────────────────
LAYER 2 — FRAGRANCE, ESSENTIAL OIL, AND HERBAL SYSTEM (LEAVE-ON AMPLIFIED)
────────────────────────────────────────────────────────────────────────────
FRAGRANCE TIERING PRINCIPLE (LEAVE-ON AMPLIFIED):
No rinsing. Twice-daily full-body application from birth. F tiers carry heavier penalties
than equivalent tiers in rinse-off. Discrimination between tiers remains essential.
F0 → Required for >4.0 eligibility; Allergy Risk optimal; Formulation Honesty bonus
F1 → Leave-on amplification; moderate-significant penalty; cap ~3.5; structural
    excellence protection still prevents collapse; output: "Even trace fragrance
    in twice-daily full-body leave-on application represents meaningful cumulative
    sensitizer exposure during the immune priming window."
F2 → Score cap 3.0
F3 / High-concern EO → Score cap 2.5
ESSENTIAL OIL TIERS (LEAVE-ON, LOTION-SPECIFIC):
HIGH CONCERN — score cap 2.5:
Peppermint/Menthol, Eucalyptus, Tea Tree, Cinnamon, Clove, Phototoxic citrus oils.
Documented systemic toxicity concerns at absorbed infant leave-on doses.
MODERATE CONCERN — score cap 3.0:
• Lavender EO — linalool/linalyl acetate documented sensitizers; endocrine concern
 debated at cosmetic concentrations but sensitization penalty applies. NOT equivalent
 to peppermint severity. Lavender EO ≠ lavender extract. Assess contextually.
 Lavender extract at trace concentration is not equivalent to lavender EO.
• Chamomile EO — Asteraceae cross-reactivity; moderate concern in leave-on.
 Chamomile extract ≠ chamomile EO.
TRACE AROMATICS IN LEAVE-ON: Even low-concern trace levels in leave-on receive
moderate penalty due to sustained contact. Proportionate to concentration and
aromatic burden — not catastrophized.
HERBAL TIERS (H1/H2/H3 — LEAVE-ON ADAPTED):
H1 (EVIDENCE-SUPPORTED — LEAVE-ON LOTION CONTEXT):
Colloidal Oatmeal (FDA-recognized skin protectant; excellent safety; do not penalize),
Panthenol, Allantoin, Bisabolol, Aloe Vera (functional concentration, F0 formula),
Calendula extract (low allergen processing), Centella asiatica, Ceramides, Glycerin.
In leave-on context, H1 botanicals have more contact time and may provide a more
meaningful secondary soothing role than in rinse-off. Credit in coherent architecture.
Output: "Evidence-supported ingredient providing meaningful secondary barrier support
in prolonged leave-on contact."
H2 (TRADITIONAL / PARTIAL-EVIDENCE):
Traditional botanicals recognized with modest clinical plausibility. No strong
therapeutic claims. Note limited leave-on infant safety data where applicable.
H3 (BOTANICAL INFLATION):
Stacking of decorative extracts; luxury botanical marketing in leave-on lotion.
→ Formulation Honesty + Ingredient Quality penalties; elevated sensitization complexity.
Leave-on H3 stacking carries higher allergen concern than H3 in rinse-off due to
sustained skin contact.
────────────────────────────────────────────────────────────────────────────
LAYER 3 — PRESERVATIVE SAFETY RULE (LEAVE-ON LOTION)
────────────────────────────────────────────────────────────────────────────
ABSOLUTELY NOT ACCEPTABLE in baby leave-on lotion:
• MIT (Methylisothiazolinone)      — EU banned in leave-on; strong sensitizer
• MCI/MI blend                    — same
• DMDM Hydantoin                  — formaldehyde-releasing; IARC Group 1 carcinogen
• Imidazolidinyl Urea             — formaldehyde-releasing
• Diazolidinyl Urea               — formaldehyde-releasing
• Quaternium-15                   — formaldehyde-releasing
• Bronopol                        — formaldehyde-releasing
• Methyldibromo Glutaronitrile    — EU-banned in leave-on
• Triclosan                       — multiple bans; endocrine concern
• Benzalkonium Chloride           — antimicrobial; inappropriate for routine infant leave-on
HIGH CAUTION:
• Long-chain parabens (Propylparaben, Butylparaben) — EU restricted in infant leave-on
 near diaper area; endocrine concern at repeated systemic infant doses; flag prominently
• Phenoxyethanol >0.4% — ANSM (French regulatory body) issued specific advisory for
 infant leave-on products; flag at concentrations above this threshold
• Methylparaben / Ethylparaben — lower concern than long-chain parabens; EU CosIng and
 FDA accept them in cosmetics generally; apply mild flag, NOT same penalty as propylparaben
LOW CONCERN / ACCEPTABLE:
Ethylhexylglycerin (low concentration), Caprylyl Glycol, 1,2-Hexanediol,
Sodium Levulinate + Sodium Anisate, Sodium Benzoate (low), Potassium Sorbate (low).
────────────────────────────────────────────────────────────────────────────
LAYER 4 — SYSTEMIC ABSORPTION SAFETY (LEAVE-ON LOTION)
────────────────────────────────────────────────────────────────────────────
HIGH SYSTEMIC CONCERN (flag prominently):
• Camphor               — CNS toxicity on dermal absorption; many countries ban
                         from infant products; flag
• Menthol / Peppermint  — respiratory and CNS risk
• Eucalyptus            — respiratory risk in infants under 2 years
• Boric Acid            — systemic toxicity; banned in EU cosmetics
• Salicylic Acid        — salicylate systemic absorption; not appropriate for routine infant use
• High-concentration Denatured / SD Alcohol — systemic absorption; barrier disruption
ACCURACY NOTE: Common moisturizing ingredients (glycerin, dimethicone, petrolatum,
shea butter, ceramides, hyaluronic acid, niacinamide, allantoin, panthenol, squalane)
have excellent safety records and extensive regulatory clearance. None should receive
safety penalties. Penalties require documented evidence specific to ingredient,
concentration, and application context — not general internet concern.
────────────────────────────────────────────────────────────────────────────
LAYER 4.5 — STRUCTURAL EXCELLENCE PROTECTION RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
If formula has: Tier 1 moisturization architecture; F0; no MIT/formaldehyde releasers;
preservative from low-concern list; no colorants; no camphor/menthol/eucalyptus
→ MAINTAIN structural differentiation.
One moderate flaw (F1 fragrance, modest H2 botanical complexity, Phenoxyethanol noted)
reduces score but does NOT collapse elite architecture recognition.
PENALTY LANGUAGE: "Less than ideal for neonates", "moderate sensitization concern
under twice-daily full-body leave-on use", "not optimal for highly sensitive infants",
"structurally sound but fragrance burden reduces neonatal suitability." Not catastrophic.
────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM
────────────────────────────────────────────────────────────────────────────
SAFETY [0.35 weight — INFANT OVERRIDE]:
Fragrance/EO by tier + leave-on amplification; preservative safety at leave-on dose;
systemic absorption concern; regulatory status; repeated daily leave-on accumulation;
camphor/menthol/eucalyptus flags.
EFFECTIVENESS [0.15 weight]:
Moisturization depth; humectant/emollient/occlusive balance; barrier support for
eczema-prone; functional ingredient honesty; concentration realism.
ALLERGY RISK [0.20 weight]:
By fragrance tier + leave-on amplification; by EO concern tier; by H tier;
preservative sensitization; developmental sensitization window; food cross-reactivity
for relevant botanicals (oat — note for established oat allergy only; do not over-penalize).
ECO IMPACT [0.05 weight]:
Preservative environmental load; silicone persistence; musk accumulation; palm sustainability.
INGREDIENT QUALITY [0.10 weight]:
Moisturization architecture coherence; concentration realism; H tier applied;
fragrance tier quality impact; preservative appropriateness.
SKIN COMPATIBILITY [0.15 weight]:
Daily full-body infant tolerance; eczema/AD compatibility; diaper area compatibility;
microbiome compatibility; long-term sensitization trajectory.
CORE SCORE FORMULA:
Core Score = (Safety × 0.35) + (Effectiveness × 0.15) + (Allergy Risk × 0.20) +
            (Eco Impact × 0.05) + (Ingredient Quality × 0.10) + (Skin Compatibility × 0.15)
────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED BABY LOTION PERFORMANCE
────────────────────────────────────────────────────────────────────────────
BARRIER SUPPORT [DOMINANT]:
• Tier 3 moisturization                          → ceiling 1.5 (sensory-dominant, minimal barrier)
• Tier 2                                         → Max 2.8
• Tier 2 + partial Tier 1                        → Max 3.5
• Tier 1 without ceramides/barrier lipids        → Max 4.0
• Tier 1 + ceramide/high-linoleic/petrolatum     → Eligible for 5.0
• Fragrance impact (leave-on): F1 → Max 3.5; F2 → Max 3.0; F3 → Max 2.5
• MIT or formaldehyde-releaser                   → Hard ceiling 2.0
MOISTURIZATION DEPTH:
Water-binding; humectant quality; post-application duration.
Petrolatum seals but does not actively hydrate — humectant pairing needed for optimal score.
INFANT SKIN TOLERANCE:
Post-application irritation absence; skin fold / occlusion tolerance; absence of contact
reactions from fragrance or preservatives.
DIAPER AREA COMPATIBILITY:
Safety on barrier-compromised diaper zone; F0 required for meaningful diaper area
compatibility score; fragrance in diaper area → additional penalty on top of standard F-tier.
ECZEMA AND ATOPIC SKIN COMPATIBILITY:
Barrier restoration for AD-prone skin; ceramide support; F0 required; emollient therapy
in AD is evidence-based (NICE, AAP guidelines). ZnO anti-inflammatory if included.
MICROBIOME COMPATIBILITY:
Commensal preservation; broad-spectrum antimicrobials penalty; daily full-body leave-on
= maximal microbiome exposure context; F-tier microbiome impact applied.
CUMULATIVE SENSITIZATION RISK:
Twice-daily full-body from birth = highest cumulative sensitizer exposure in infant
skincare. F-tier severity amplified by leave-on vs rinse-off. H1 in F0 → minimal
additional risk. H3 stacking → elevated complexity and sensitization burden.
FORMULATION HONESTY:
H3 botanical inflation → penalty; H1 in Tier 1 + F0 → honesty bonus;
"natural" EOs positioned as "gentle" in leave-on → penalty; preservative greenwashing
(claiming preservative-free when preservatives are present under alternative names) → penalty.
SPECIALIZED PERFORMANCE SCORE = Average of all 8 specialized scores.
────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING FORMULA AND CALIBRATION
────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
SCORE DISTRIBUTION TARGETS:
 1.0–1.8   → Truly poor / disqualifying ingredients
 1.8–2.5   → Weak / superficial / concerning systems
 2.5–3.3   → Moderate / acceptable with significant caveats
 3.3–4.0   → Good architecture with limitations
 4.0–4.6   → Excellent — Tier 1 moisturization, F0, low-concern preservative
 4.6–5.0   → Exceptional neonatal-grade — comprehensive barrier + ceramide + F0
HIGH SCORE ELIGIBILITY (>4.0):
Tier 1 moisturization; F0; no MI/formaldehyde releasers; preservative from low-concern
list; no colorants; Barrier Support ≥ 3.5; Cumulative Sensitization Risk ≥ 3.5;
Systemic absorption concerns absent; Formulation Honesty ≥ 3.5; appropriate for
eczema-prone skin and diaper area.
SCORE CAPS (leave-on amplified):
F1 → Max ~3.5; F2 → Max 3.0; F3 / High-concern EO → Max 2.5;
MI/formaldehyde-releaser → Max 2.5; Camphor/Menthol/Eucalyptus → Max 2.5;
Tier 3 moisturization → Max 2.5.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🍼 LOTION PROFILE

## Product Classification

Short lotion classification.

Examples:
- Comprehensive Gentle Infant Barrier Lotion
- Fragrance-Free Balanced Baby Moisturizer
- Fragrance-Containing Cosmetic Baby Lotion (Not Recommended)
- Minimalist Safe Infant Emollient
- Botanical-Heavy Parent-Oriented Baby Lotion

---

# ⚠ INFANT SAFETY VERDICT

One-line absolute verdict on infant safety appropriateness:

- SAFE for routine infant use
- USE WITH CAUTION — [specific concern]
- NOT RECOMMENDED for infant use — [specific reason]

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Moisturization architecture balance for infant skin
- Fragrance and sensitizer load (zero-tolerance context)
- Preservative system safety
- pH compatibility with developing skin
- Overall formulation appropriateness for infant use

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering infant safety realism.

### Effectiveness — ⭐X.X

Short explanation covering moisturization and barrier support realism.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering environmental realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and ingredient safety.

### Skin Compatibility — ⭐X.X

Short explanation covering infant skin comfort and long-term usability.

---

# 🧪 SPECIALIZED PERFORMANCE

## Infant Barrier + Safety Analysis

### Barrier Support — ⭐X.X

Short structural reason.

### Moisturization Depth — ⭐X.X

Short structural reason.

### Infant Skin Tolerance — ⭐X.X

Short structural reason.

### Diaper Area Compatibility — ⭐X.X

Short structural reason.

### Eczema / Atopic Skin Compatibility — ⭐X.X

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

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Concerns

- Main structural weakness
- Main structural weakness
- Main structural weakness

---

# 👶 INFANT USE COMPATIBILITY

## Age and Zone Suitability

### Newborn (0–3 months) — ⭐X.X

Short compatibility explanation.

### Young Infant (3–12 months) — ⭐X.X

Short compatibility explanation.

### Toddler (1–3 years) — ⭐X.X

Short compatibility explanation.

### Eczema / Atopic-Prone Infant — ⭐X.X

Short compatibility explanation.

### Diaper Area Use — ⭐X.X

Short compatibility explanation.

### Skin Fold Use — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use (1× daily) — ⭐X.X

Short explanation.

### Twice Daily Use — ⭐X.X

Short explanation.

### Long-Term Use from Birth — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Post-application skin feel
- Absorption and residue
- Irritation or redness signals

## Medium-Term

- Barrier support accumulation
- Dryness/eczema response
- Early sensitization signals (redness, rash, contact reaction)

## Long-Term

- Barrier stability and maturation support
- Allergy and sensitization trajectory
- Microbiome stability
- Overall infant skin health outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting moisturization architecture, barrier support for infant skin, sensitization and irritation risk, systemic absorption concern, preservative safety, and long-term infant skin outcome. Flag any ingredient with regulatory restriction for infant use, systemic absorption concern, or sensitization risk specific to infant vulnerability.

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

3–5 concise parent-friendly evidence-based statements explaining the rating in plain language.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Fragrance, essential oils, and high-concern preservatives MUST be mentioned in Concerns and Why This Rating
- Systemic absorption concerns MUST be flagged for all relevant ingredients
- No "natural = safe" bias — this is especially critical for baby products
- No fragrance-feel or sensory bias
- Infant skin physiology MUST be referenced in score reasoning
- Eczema-prone infant is the baseline worst-case skin type for all scoring
- Diaper area is the baseline worst-case application zone for all safety scoring
- Safety scoring is the highest-weight parameter — no exception
- Post-application infant distress signals = structural failure, not "sensitivity to active ingredients"
- Parent sensory satisfaction ≠ infant skin compatibility
- "Clinically tested" ≠ clinically proven
- "Pediatrician-approved" ≠ structural safety evidence
- "Hypoallergenic" ≠ allergen-free
- "Organic" ≠ safe for infant leave-on use
- Camphor, Menthol, and Eucalyptus in any concentration = infant safety failure
- Fragrance in any concentration in baby leave-on = infant safety failure
- Repeated-use behavior > first-use feel
- Long-term outcome > temporary feel
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Baby Lotion Evaluation Algorithm — Structured for infant barrier support analysis, sensitization risk assessment, leave-on safety profiling, and long-term developmental skin outcome evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict baby loation structural evaluation engine."
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