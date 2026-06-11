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
        "BABYWIPES ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 5 — BABY WIPES EVALUATION
STANDALONE — FULLY SELF-CONTAINED
═══════════════════════════════════════════════════════════════════════════════
────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE
────────────────────────────────────────────────────────────────────────────
LEAVE-ON PRODUCT — 6–10× DAILY — MAXIMUM CUMULATIVE EXPOSURE SCENARIO.
Baby wipes are leave-on; every ingredient remains on skin indefinitely; diaper
occlusion amplifies all absorption in the primary application zone; no rinsing
dilutes any ingredient. Repeated 6–10× daily means even mildly concerning
ingredients reach clinically relevant cumulative exposure over time.
Reward: effective cleansing with minimal barrier disruption; leave-on safety of all
ingredients; microbiome compatibility; minimal sensitization burden.
INFANT SKIN BIOLOGICAL CONTEXT:
• SC is thinner and more permeable — leave-on ingredients are absorbed
• Diaper zone is occluded, warm, humid — amplified systemic absorption
• Microbiome colonization active — commensal disruption has long-term consequences
• Immune sensitization window is open — repeated leave-on allergen exposure
 carries highest sensitization risk in infant skincare
• Urine ammonia increases alkalinity in diaper zone; fecal enzymes are active
 on often-partially disrupted skin
LEAVE-ON EXPOSURE REALISM (EMBEDDED):
No rinsing. Residue remains on skin for hours. 6–10 applications daily.
Diaper zone: occluded + warm = enhanced absorption.
All ingredient risks are amplified relative to rinse-off products.
Even mildly concerning secondary ingredients reach meaningful cumulative burden
under this frequency of use.
pH EVALUATION RULE (EMBEDDED):
pH not evaluated from ingredient list alone. If manufacturer states pH → note it.
Neutral treatment if unknown. Diaper zone wipes with soap bases → alkaline architecture flag.
FRAGRANCE MATERIAL DISCRIMINATION:
Fragrance oil | Essential oil | Aromatic extract | Floral water | Trace aromatic compound
— are NOT equivalent. Each assessed contextually. Diaper zone and leave-on amplification
applies to all. "Natural" essential oils in leave-on infant wipes are NOT safer than
synthetic fragrance — they carry equivalent or greater sensitization burden.
────────────────────────────────────────────────────────────────────────────
LAYER 1 — SURFACTANT TIER SYSTEM (LEAVE-ON INFANT ADJUSTED)
────────────────────────────────────────────────────────────────────────────
TIER 1 — UNACCEPTABLE FOR INFANT LEAVE-ON:
SLS, SLES as primary, ALS, Traditional soap systems, Benzalkonium Chloride as primary.
Scoring: Major Safety penalty; Barrier Preservation ceiling 1.5.
TIER 2 — BORDERLINE / CAUTION:
SLES in dilute blended (secondary only), SCI at low concentration, Polysorbate 20 at
moderate concentration, some ethoxylated surfactants (1,4-dioxane manufacturing quality
concern — this is a manufacturing quality issue, not inherent to the ingredient; reputable
manufacturers test for this; apply note, not major penalty unless specific contamination
evidence exists).
Scoring: Safety penalty proportional to concentration and system dominance.
TIER 3 — ACCEPTABLE FOR INFANT LEAVE-ON:
CAPB (Cocamidopropyl Betaine) — sensitization potential in Allergy Risk at standard
concentrations; NOT a major Safety penalty; do not over-penalize — CAPB is widely used
in paediatric-appropriate formulations; Sodium Cocoamphoacetate; Disodium Cocoamphodiacetate;
Sodium Cocoyl Glycinate (dilute); Polysorbate 20 at low concentration.
Scoring: Moderate Barrier Preservation; CAPB flag in Allergy Risk only.
TIER 4 — PREFERRED FOR INFANT LEAVE-ON:
Decyl Glucoside, Coco Glucoside, Lauryl Glucoside, Sodium Cocoyl Glutamate (dilute),
Polyglyceryl-based surfactants, PEG-free glucoside systems, Poloxamer 188 (dilute micellar).
Scoring: Maximum Barrier Preservation eligible; transparency bonus.
TIER 5 — WATER-DOMINANT / MINIMAL OR NO SURFACTANT:
Purified water only or minimal micellar agent. Maximum Safety; moderate Effectiveness.
────────────────────────────────────────────────────────────────────────────
LAYER 2 — PRESERVATIVE SAFETY TIER SYSTEM (LEAVE-ON — DIAPER AMPLIFIED)
────────────────────────────────────────────────────────────────────────────
DIAPER ZONE AMPLIFICATION PRINCIPLE: Preservative tier treated one level stricter
in occluded diaper zone due to enhanced absorption and chronic exposure.
TIER 1 — HIGH CONCERN / AVOID:
MIT, CMIT/MIT blend, DMDM Hydantoin, Imidazolidinyl Urea, Diazolidinyl Urea,
Quaternium-15, Bronopol, IPBC, Triclosan, Benzyl Alcohol >0.5% in leave-on infant wipes.
Scoring: Mandatory major Safety penalty; MIT in any leave-on infant product = auto penalty.
TIER 2 — MODERATE CONCERN:
Long-chain parabens (Propylparaben, Butylparaben) — EU restricted in infant leave-on;
Phenoxyethanol >0.5% in leave-on infant (ANSM warning); Sodium Benzoate + Citric Acid
combination (benzene formation is a manufacturing/stability concern — note proportionately,
not as major penalty unless specific evidence of problematic proportions).
Methylparaben / Ethylparaben → mild flag only; do NOT penalize at same level as long-chain parabens.
Scoring: Moderate penalty; diaper zone amplification applies.
TIER 3 — ACCEPTABLE WITH MONITORING:
Phenoxyethanol ≤0.5% (non-diaper zone); Low-concentration Sodium Benzoate in buffered
system; Ethylhexylglycerin low; Caprylyl Glycol low; 1,2-Hexanediol.
TIER 4 — PREFERRED:
Sodium Levulinate + Sodium Anisate; Gluconolactone; Glyceryl Caprylate; Potassium Sorbate.
TIER 5 — SELF-PRESERVING:
Multi-hurdle pH/osmotic system; Formulation Honesty bonus if validated.
────────────────────────────────────────────────────────────────────────────
LAYER 3 — FRAGRANCE AND ESSENTIAL OIL RULE (LEAVE-ON + DIAPER ZONE AMPLIFIED)
────────────────────────────────────────────────────────────────────────────
FRAGRANCE TIERING PRINCIPLE (LEAVE-ON + DIAPER AMPLIFIED):
No rinsing. 6–10× daily. Diaper zone: occluded, warm, moist.
Fragrance compounds remain on skin indefinitely. Diaper zone escalates all F tiers.
"Natural" EOs in leave-on infant wipes ≠ safer than synthetic fragrance.
F0 → Maximum scores eligible; Formulation Honesty bonus; inhalation zero concern
F1 (general body wipes)  → Leave-on amplification; moderate-significant penalty; cap ~3.5
F1 (diaper zone wipes)   → Escalated to F2-level treatment; cap ~3.0
F2 (general body)        → Score cap 3.0
F2 (diaper zone)         → Escalated to F3-level treatment; Score cap 2.5
F3 (any zone)            → Score cap 2.5
ESSENTIAL OIL TIERS (WIPES, LEAVE-ON DIAPER AMPLIFIED):
HIGH CONCERN — score cap 2.5 in any leave-on infant wipe:
Peppermint/Menthol (respiratory/CNS risk), Eucalyptus (respiratory toxicity),
Tea Tree (systemic toxicity), Cinnamon (potent sensitizer), Clove (sensitizer).
MODERATE CONCERN — score cap 3.0:
Lavender EO — sensitization at repeated leave-on doses; more serious in occluded diaper
context. Lavender EO ≠ lavender extract. Assess contextually.
Chamomile EO (not extract) — Asteraceae cross-reactivity; moderate concern in leave-on.
HERBAL TIERS (H1/H2/H3 — LEAVE-ON WIPE ADAPTED):
H1 (EVIDENCE-SUPPORTED — LEAVE-ON WIPE CONTEXT):
Panthenol, Allantoin, Bisabolol, Aloe Vera (functional concentration, F0 formula),
Glycerin. Have real leave-on contact time; meaningful secondary credit when architecture
is Tier 4 surfactant + F0 + Tier 3/4 preservative.
Diaper zone caveat: Chamomile and calendula in diaper zone → additional allergen risk
flag even when H1 classified; chronic occluded repeated exposure increases sensitization
risk beyond general body use. Acknowledge benefit while flagging diaper zone caveat.
H2 traditional botanicals → limited clinical contribution; modest recognition.
H3 stacking → Formulation Honesty + sensitization complexity penalties.
────────────────────────────────────────────────────────────────────────────
LAYER 4 — ALCOHOL RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
DRYING ALCOHOLS — Disqualifying as primary cleansing agent:
Ethanol, Isopropyl Alcohol, Denatured Alcohol → Not appropriate as primary cleansing
agent in infant wipes; Barrier Preservation ceiling 1.0.
FATTY ALCOHOLS — Emollients; no penalty:
Cetyl Alcohol, Stearyl Alcohol, Cetearyl Alcohol → Conditioning/emollient function;
functional credit. Must be classified correctly — "alcohol" on ingredient list
requires drying vs fatty determination before any scoring is applied.
────────────────────────────────────────────────────────────────────────────
LAYER 5 — DIAPER ZONE OCCLUSION MODIFIER (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
Diaper zone is warm, sealed, humid; urine ammonia increases alkalinity; fecal enzymes
active on often-disrupted skin. All leave-on ingredient concerns amplified.
Modifiers:
• Fragrance tier        → escalated by one tier in diaper zone
• Preservative tier     → one level stricter classification in diaper zone
• Surfactant harshness  → one level stricter assessment in diaper zone
• Botanical allergens   → amplified leave-on penetration in occluded zone
────────────────────────────────────────────────────────────────────────────
LAYER 6 — LEAVE-ON ACTIVE EFFICACY CLASSIFICATION
────────────────────────────────────────────────────────────────────────────
CATEGORY A (FULL CREDIT): Panthenol, Allantoin, Glycerin, Zinc Oxide (barrier format
at appropriate ≥10% concentration), Bisabolol (non-EO sourced). Well-studied, evidence-
supported, safe in leave-on infant wipe context.
CATEGORY B (PARTIAL CREDIT): Aloe Vera (functional concentration, F0 formula → partial
credit); Chamomile extract (non-EO; F0; non-diaper zone → mild credit; note Asteraceae
for atopic infants); Calendula (F0; low allergen processing; non-diaper zone → mild credit);
Vitamin E at functional antioxidant concentration.
CATEGORY C (NO CREDIT / CONCERN): EO botanicals marketed as actives; peptides; collagen;
Vitamin C (instability concern in wipe format); Retinoids (absolutely not in infant wipes).
────────────────────────────────────────────────────────────────────────────
LAYER 7 — MICROBIOME IMPACT RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
HIGH DISRUPTION:
Triclosan, Benzalkonium Chloride, Chlorhexidine in routine wipes; strong antimicrobial
EOs; broad-spectrum preservative systems.
LOW DISRUPTION:
Tier 4/5 surfactant at appropriate concentration; Tier 3/4 preservative; F0.
"Antibacterial" routine wipes without clinical justification → Formulation Honesty penalty.
────────────────────────────────────────────────────────────────────────────
LAYER 8 — WIPE SUBSTRATE ASSESSMENT
────────────────────────────────────────────────────────────────────────────
S1 SOFT / LOW FRICTION (preferred): 100% cotton, smooth spunlace, viscose/rayon blend.
S2 MODERATE FRICTION: Standard polyester blends — acceptable for general body use.
S3 HIGH FRICTION / TEXTURED: Not appropriate for routine infant use; Barrier penalty.
Eco: Non-biodegradable synthetic substrates → significant Eco Impact penalty.
────────────────────────────────────────────────────────────────────────────
LAYER 9 — STRUCTURAL EXCELLENCE PROTECTION RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
If formula has: Tier 4/5 surfactant; F0; Tier 3/4 preservative; no colorants; no drying
alcohol → MAINTAIN structural differentiation.
One moderate flaw (Tier 3 preservative minor note; modest H2 botanical complexity)
reduces score but does NOT collapse elite architecture recognition.
PENALTY LANGUAGE: "Less than ideal for diaper zone use", "moderate cumulative concern
under repeated leave-on exposure", "acceptable but not optimal for highly sensitive
neonates." Not catastrophic.
────────────────────────────────────────────────────────────────────────────
LAYER 10 — CORE SCORING SYSTEM
────────────────────────────────────────────────────────────────────────────
SAFETY [0.30 weight]:
Surfactant leave-on tier; preservative tier with diaper escalation; fragrance tier
+ diaper escalation; alcohol classification; cumulative 6–10× daily exposure;
sensitization window; systemic absorption via immature barrier.
EFFECTIVENESS [0.15 weight]:
Urine/fecal soil removal; surfactant cleansing contribution; substrate physical
cleansing; functional leave-on ingredient credit (Category A/B).
ALLERGY RISK [0.20 weight]:
Fragrance by tier + diaper escalation; EO by concern tier; botanical by H tier with
diaper zone caveat; CAPB note; preservative sensitization; repeated leave-on amplification.
ECO IMPACT [0.10 weight]:
Substrate biodegradability (primary concern for wipes); ingredient biodegradability;
"flushable" claim vs actual evidence.
INGREDIENT QUALITY [0.10 weight]:
Surfactant coherence; preservative selection quality; F0 = highest quality;
H tier applied; active concentration realism; H1 coherent → support; H3 → reduction.
SKIN COMPATIBILITY [0.15 weight]:
Infant tolerance under repeated leave-on use; post-wipe barrier; diaper rash
exacerbation potential; microbiome stability.
CORE SCORE FORMULA:
Core Score = (Safety × 0.30) + (Effectiveness × 0.15) + (Allergy Risk × 0.20) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.10) + (Skin Compatibility × 0.15)
────────────────────────────────────────────────────────────────────────────
LAYER 11 — SPECIALIZED WIPE PERFORMANCE
────────────────────────────────────────────────────────────────────────────
CLEANSING EFFECTIVENESS:
Urine + fecal removal; substrate contribution; surfactant cleansing vs leave-on cost balance.
Tier 1 surfactant ceiling applies.
BARRIER PRESERVATION [DOMINANT]:
• Tier 1                              → Max 1.5
• Tier 1 + MIT                        → Max 1.0
• Tier 2                              → Max 2.5
• Tier 2 + Tier 3/4                   → Max 3.0
• Tier 3                              → Max 3.5
• Tier 4                              → Max 4.2
• Tier 4 + emollient (Cat A) + pH    → Eligible for 5.0
• Tier 5 + humectant                  → Max 4.5
• Tier 5 pure water                   → Max 4.0
SKIN SOOTHING AND CONDITIONING:
H1 at functional concentration in F0 Tier 4 formula → genuine leave-on secondary credit;
trace botanicals at inadequate concentrations → no credit.
DIAPER DERMATITIS RISK:
Fragrance in diaper zone (any F tier) → mandatory penalty; MIT contact allergy →
mandatory penalty; alkaline architecture → structural concern; standalone parameter
reflecting the distinct risk of chronic repeated diaper zone exposure.
MICROBIOME COMPATIBILITY:
Antimicrobial ingredient impact; developmental window penalty; 6–10× daily frequency amplification.
CUMULATIVE IRRITATION RISK:
6–10× daily × leave-on × developmental window = extreme cumulative burden.
F-tier determines severity; H1 in F0 → minimal; H3 stacking → elevated complexity.
The frequency of wipe use makes this parameter of greater relative importance than
in other infant skincare categories.
FORMULATION HONESTY:
"Unscented" ≠ "fragrance-free" — verify INCI for masking fragrance; flag discrepancy.
"Water wipes" = near-pure water composition required to support claim — verify INCI.
H3 botanical stacking → penalty; H1 coherent + F0 + Tier 4 → honesty bonus.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 specialized scores.
────────────────────────────────────────────────────────────────────────────
LAYER 12 — FINAL RATING FORMULA AND CALIBRATION
────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
SCORE DISTRIBUTION TARGETS:
 1.0–1.8   → Truly poor / disqualifying ingredients
 1.8–2.5   → Weak / concerning systems
 2.5–3.3   → Moderate / acceptable with significant caveats
 3.3–4.0   → Good structural quality with limitations
 4.0–4.6   → Excellent — Tier 4/5 + F0 + Tier 3/4 preservative
 4.6–5.0   → Exceptional neonatal-grade
HIGH SCORE ELIGIBILITY (>4.0):
Tier 4/5 surfactant; Tier 4/5 preservative; F0 verified; Barrier Preservation ≥ 3.5;
Cumulative Irritation Risk ≥ 3.5; Diaper Dermatitis Risk ≥ 3.5; no Tier 1/2 preservatives;
no drying alcohol; no colorants; Formulation Honesty ≥ 3.5.
SCORE CAPS (leave-on + diaper zone amplified):
F0 → 4.0–5.0 eligible
F1 general body → ~3.5 max; F1 diaper zone → ~3.0 max
F2 body → 3.0; F2 diaper zone → 2.5
F3 → 2.5
MIT / formaldehyde-releasers → 2.5
Drying alcohol primary → 1.5
Tier 1 surfactant → 2.5
STRICT SCORING RULES:
Surfactant tier classified before scoring. Fragrance tier + diaper zone modifier applied.
Preservative tier + diaper zone escalation applied. Alcohol classification verified
(drying vs fatty) before any scoring. H tier classified before Allergy Risk and
Ingredient Quality. Structural Excellence Protection applied where appropriate.
Score distribution targets enforced.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🍼 WIPE PROFILE

## Product Classification

Short wipe classification.

Examples:
- Ultra-Pure Water-Dominant Safe Wipe
- Gentle Micellar Leave-On Wipe — Fragrance-Free
- Moderate-Risk Preserved Wipe — Diaper Zone Caution
- High-Risk Fragrance + MIT Combination — Not Recommended
- Botanical-Marketed Low-Concern Wipe

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Surfactant leave-on safety
- Preservative system safety
- Fragrance status
- Barrier friendliness
- pH compatibility
- Overall infant formulation safety balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering infant leave-on safety realism.

### Effectiveness — ⭐X.X

Short explanation covering cleansing realism.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering substrate and ingredient environmental realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and ingredient safety.

### Skin Compatibility — ⭐X.X

Short explanation covering infant skin comfort and long-term usability.

---

# 🧪 SPECIALIZED PERFORMANCE

## Infant Leave-On Safety Analysis

### Cleansing Effectiveness — ⭐X.X

Short structural reason.

### Barrier Preservation — ⭐X.X

Short structural reason.

### Skin Soothing and Conditioning — ⭐X.X

Short structural reason.

### Diaper Dermatitis Risk — ⭐X.X

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

# 👶 AGE GROUP SUITABILITY

## Age Compatibility

### Newborn (0–4 weeks) — ⭐X.X

Short compatibility explanation.

### Young Infant (1–6 months) — ⭐X.X

Short compatibility explanation.

### Older Infant (6–12 months) — ⭐X.X

Short compatibility explanation.

### Toddler (1–3 years) — ⭐X.X

Short compatibility explanation.

---

# 🗺 USE ZONE SUITABILITY

## Zone Compatibility

### Diaper Zone — ✅ / ⚠ / ❌

Short compatibility note.

### Face and Hands — ✅ / ⚠ / ❌

Short compatibility note.

### General Body — ✅ / ⚠ / ❌

Short compatibility note.

### Sensitive Skin Zones — ✅ / ⚠ / ❌

Short compatibility note.

---

# 📅 USAGE FREQUENCY SAFETY

## Frequency Compatibility

### 6–10× Daily (Typical Diaper Changes) — ⭐X.X

Short explanation.

### 3–5× Daily — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing performance
- Post-wipe skin feel
- Redness / irritation signals

## Medium-Term (Weeks)

- Barrier resilience under repeated use
- Diaper rash frequency impact
- Skin sensitivity development

## Long-Term (Months)

- Barrier stability trajectory
- Sensitization risk accumulation
- Microbiome colonization impact
- Overall infant skin health outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting surfactant/cleansing system, preservative system, fragrance/essential oil burden, soothing/conditioning function, barrier behavior, irritation/sensitization risk, long-term infant skin outcome, and environmental impact (substrate + ingredients).

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

3–5 concise user-friendly evidence-based statements with specific focus on leave-on infant safety context.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Mention all preservatives with infant safety concerns in output
- Mention fragrance / essential oils with allergy risk in output
- Mention harsh colorants in output
- No "gentle label" bias — structural safety evidence only
- Surfactant leave-on infant tier MUST be classified before scoring
- Preservative infant safety tier MUST be classified before scoring
- Fragrance status MUST be assessed before Allergy Risk scoring
- Diaper zone occlusion MUST be applied as a modifier before diaper zone scores
- pH compatibility MUST be assessed for all formulations
- Leave-on active efficacy MUST be classified before Effectiveness scoring
- Repeated high-frequency leave-on behavior > single-use feel
- Long-term infant skin outcome > immediate cosmetic performance
- Post-use redness or tightness = structural failure signal, not "effective cleansing"
- "Natural" essential oils ≠ safe in leave-on infant products — sensitization risk is equivalent to or higher than synthetic fragrance
- "Tested" label claims ≠ structural safety
- "Fragrance-free" must be verified — "unscented" may contain masking fragrance
- Infant skin immaturity amplifies ALL irritation and sensitization scoring penalties
- Diaper zone occlusion amplifies ALL ingredient leave-on safety concerns
- MIT in any concentration in infant leave-on product = major automatic Safety penalty
- Alcohol (ethanol/isopropanol) as primary cleansing agent = disqualifying
- Microplastic / non-biodegradable substrate = major Eco Impact penalty
- "Antibacterial" in routine infant wipes = scrutiny and likely Formulation Honesty penalty
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Baby Wipes Evaluation Algorithm — Structured for leave-on surfactant safety analysis, preservative system infant assessment, diaper zone occlusion impact evaluation, and long-term sensitization risk realism. All scoring is structural and evidence-informed.

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
              "You are a strict baby wipes structural evaluation engine."
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