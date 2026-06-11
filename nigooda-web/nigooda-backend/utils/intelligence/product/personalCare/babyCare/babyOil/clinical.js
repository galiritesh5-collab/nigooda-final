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
        "BABYOIL ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 3 — BABY OIL EVALUATION
STANDALONE — FULLY SELF-CONTAINED
═══════════════════════════════════════════════════════════════════════════════
────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE
────────────────────────────────────────────────────────────────────────────
LEAVE-ON PRODUCT — ALL PENALTIES AMPLIFIED.
Baby oil is leave-on for hours over large body surface area. Systemic absorption
via immature barrier is the maximum topical exposure scenario in routine infant care.
Fragrance and sensitizer tiering applies with leave-on amplification — penalties at
each tier are more severe than in rinse-off context.
Reward: genuine emollient/occlusive barrier support; oil composition appropriate for
neonatal SC lipid architecture; ingredient minimalism; sensitization minimalism.
OIL-SPECIFIC BIOLOGY:
Linoleic acid-rich oils (high-linoleic sunflower, safflower) support barrier lipid
architecture — linoleic acid is a ceramide precursor documented to support neonatal skin.
Oleic acid-dominant oils (olive oil, conventional/high-oleic sunflower) have documented
evidence of barrier disruption in neonatal skin in controlled studies (e.g., Cooke et al.
2016, Arch Dermatol). This is specific peer-reviewed neonatal evidence, not general concern.
NOT appropriate as primary baby oil. State this factually, not catastrophically.
Mineral oil is purely occlusive — reduces TEWL by sealing but provides no bioactive lipid
integration into the SC. This is a neutral structural fact, not an indictment.
Petroleum-grade refinement for cosmetics is safe; the limitation is occlusion-only.
INFANT SKIN BIOLOGICAL CONTEXT:
• SC ~30% thinner at birth; systemic absorption substantially higher
• Skin surface area / body weight ratio ~3× adult
• Leave-on for hours; diaper/clothing occlusion possible; full-body application
• Microbiome colonization active; immune sensitization window open
pH EVALUATION RULE (EMBEDDED):
Pure anhydrous oils have no measurable aqueous pH — not scored.
Emulsion-format baby oils: pH evaluated only if explicitly stated by manufacturer.
No pH inference from ingredient lists.
LEAVE-ON EXPOSURE REALISM (EMBEDDED):
No rinsing. Prolonged skin contact (hours). Possible diaper/clothing occlusion.
Full body surface area application. All ingredient risks amplified vs rinse-off.
Even trace fragrance in leave-on is more concerning than the same in a rinse-off product.
Concentration and aromatic burden still modulate penalty severity within tiers.
FRAGRANCE MATERIAL DISCRIMINATION:
Fragrance oil | Essential oil | Aromatic extract | Floral water | Trace aromatic component
— are NOT equivalent. Each requires contextual assessment. Leave-on context amplifies all.
ALLERGEN OIL INCI DECODING (MANDATORY FOR PARENT COMPREHENSION):
Arachis hypogaea   = Peanut Oil
Triticum Vulgare   = Wheat Germ Oil
Sesamum Indicum    = Sesame Oil
Brassica juncea    = Mustard Oil
Always decode to plain language in output.
────────────────────────────────────────────────────────────────────────────
LAYER 1 — OIL COMPOSITION TIER SYSTEM
────────────────────────────────────────────────────────────────────────────
TIER 1 — CONTRAINDICATED / AVOID IN INFANT USE:
• Peanut Oil (Arachis hypogaea) — documented food allergen sensitization via skin
 in early infancy; "outside-in sensitization" mechanism well-established in
 dermatology literature; absolute disqualification
• Wheat Germ Oil — gluten-related protein sensitization risk via skin; absolute avoid
• Sesame Oil — major food allergen (US top-9); documented skin sensitization; avoid
• Mustard Oil (Brassica juncea) — documented barrier disruption and erucic acid toxicity
 in neonatal studies; strongly contraindicated; traditional use does not override
 peer-reviewed neonatal evidence
Scoring: Score cap at 2.0 regardless of other quality. INCI decoded to plain language.
TIER 2 — HIGH CONCERN:
• Mineral Oil (Paraffinum Liquidum) — petroleum-derived; cosmetic grade is safe and
 non-irritating; TEWL reduction via occlusion; limitation is no bioactive barrier
 lipid integration; eco concern for petroleum sourcing; note limitation factually
• Petrolatum (non-pharmaceutical cosmetic grade) — same context; note grade uncertainty
• Olive Oil (Olea europaea) — documented barrier disruption in neonatal skin in
 peer-reviewed studies; oleic acid content disrupts tight junctions in neonatal SC;
 specific evidence, not general concern; NOT appropriate as primary baby oil
• Whole Coconut Oil — lauric acid antimicrobial properties; some comedogenicity;
 limited barrier evidence vs linoleic-rich oils; acceptable in moderate use for
 healthy older infants; flag comedogenicity for scalp/face
PETROLATUM GRADE NOTE:
USP/pharmaceutical grade white petrolatum → Tier 4 (highly refined; non-sensitizing;
non-comedogenic; effective occlusive; evidence-supported for eczema management).
Cosmetic grade petrolatum → Tier 2 (less refined; grade uncertainty if unstated).
TIER 3 — MODERATE CONCERN / ACCEPTABLE WITH CAVEATS:
• Sweet Almond Oil (Prunus amygdalus dulcis) — mild emollient; tree nut origin; allergen
 risk specifically relevant for atopic infants with nut sensitization; widely used without
 documented harm in healthy infants; flag for atopic infants
• Avocado Oil — moderate oleic acid; acceptable in blended formulations at lower proportion
• Jojoba Oil (Simmondsia chinensis) — technically a liquid wax ester; good skin
 compatibility; non-comedogenic; very low sensitization; widely used safely
• Grapeseed Oil — good linoleic acid content; light texture; generally well-tolerated
• Apricot Kernel Oil — moderate oleic acid; tree nut origin; flag for atopic infants
TIER 4 — LOW CONCERN / PREFERRED:
• Sunflower Seed Oil HIGH LINOLEIC — linoleic acid ~65–75%; documented barrier-supportive
 in neonatal studies; low allergen concern; preferred neonatal emollient.
 CRITICAL: Verify high-linoleic vs high-oleic variety. Standard commercial sunflower
 is often high-oleic (Tier 2–3). When variety not stated → classify Tier 3 and flag.
• Safflower Oil HIGH LINOLEIC — very high linoleic ~78%; excellent barrier support
• Fractionated Coconut Oil (Caprylic/Capric Triglyceride) — medium-chain only;
 lauric acid removed; non-comedogenic; stable; distinct from whole coconut oil
• Pharmaceutical grade White Petrolatum (USP) — effective occlusive; well-studied;
 used in clinical eczema management; non-sensitizing; non-comedogenic
• Squalane (plant-derived) — mimics skin's own squalene; excellent compatibility;
 non-comedogenic; very low sensitization
• Hemp Seed Oil — high linoleic; good compatibility; low allergen
────────────────────────────────────────────────────────────────────────────
LAYER 2 — FORMAT AND APPLICATION TYPE MODIFIER
────────────────────────────────────────────────────────────────────────────
Full-body massage oil       → Largest surface area; maximum systemic absorption.
Diaper area protectant      → Occluded; absorption amplified.
Scalp / cradle cap oil      → Comedogenicity relevant; sebaceous zone.
Bath oil                    → Partially rinse-off; reduced leave-on concern.
Premature / NICU massage    → Highest safety requirement; only Tier 4 + F0 appropriate.
────────────────────────────────────────────────────────────────────────────
LAYER 3 — FRAGRANCE AND ESSENTIAL OIL RULE (LEAVE-ON AMPLIFIED)
────────────────────────────────────────────────────────────────────────────
FRAGRANCE TIERING PRINCIPLE (LEAVE-ON AMPLIFIED):
No rinsing. Prolonged contact. Diaper/clothing occlusion possible. Full-body surface.
All fragrance tiers carry heavier penalties than the equivalent tier in rinse-off.
F0 — Required for High Score Eligibility (>4.0) in leave-on baby oil.
F1 — Leave-on amplification: trace fragrance in leave-on is more serious than in
    rinse-off; moderate-significant penalty; Structural Excellence Protection still
    prevents collapse; cap ~3.5; output: "Even low-level fragrance carries elevated
    sensitization concern in prolonged leave-on infant application."
F2 — Score cap 3.0
F3 — Score cap 2.5
ESSENTIAL OIL TIERS (LEAVE-ON, AMPLIFIED):
HIGH CONCERN — Severe penalties; score cap 2.5 (more severe than rinse-off):
• Peppermint/Menthol — respiratory/CNS risk at absorbed infant leave-on dose
• Eucalyptus — respiratory toxicity; documented at infant doses
• Tea Tree — systemic toxicity documented
• Cinnamon — potent sensitizer; occlusive leave-on amplifies risk
• Clove — strong sensitizer
• Phototoxic citrus oils
MODERATE CONCERN — Moderate penalties; score cap 3.0:
• Lavender EO — linalool/linalyl acetate sensitization at repeated leave-on doses.
 Lavender EO ≠ lavender extract ≠ lavender water. Assess contextually.
• Chamomile EO (not extract) — Asteraceae cross-reactivity at leave-on doses.
TRACE AROMATIC MATERIALS: Even low-concern trace aromatics receive moderate penalty
in leave-on context — no rinsing means cumulative dermal exposure is real.
────────────────────────────────────────────────────────────────────────────
LAYER 3.5 — HERBAL AND BOTANICAL OIL AUTHENTICITY (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
HERBAL PHILOSOPHY: Coherent evidence-aware herbal systems receive recognition.
Decorative botanical inflation receives penalties. Natural ≠ safe; synthetic ≠ unsafe.
All botanical assessment is concentration-aware, leave-on-aware, and evidence-strength-aware.
H1 (EVIDENCE-SUPPORTED — LEAVE-ON OIL CONTEXT):
Squalane, high-linoleic sunflower oil, calendula-infused Tier 4 base (properly processed),
tocopherol at functional antioxidant concentration, bisabolol.
These are functionally coherent in the leave-on oil context; credit awarded.
Tocopherol at trace/decorative level → no antioxidant credit.
H2 (TRADITIONAL / PARTIAL-EVIDENCE):
Neem, bhringraj, castor oil (minor role) — traditional use recognized; moderate caution
for infant leave-on; flag for limited leave-on infant safety data.
H3 (BOTANICAL INFLATION):
5+ decorative botanical oils; exotic extract stacking; aromatic botanical blends
positioned as "therapeutic" for infants; EO blends as "herbal benefits."
→ Formulation Honesty penalty; sensitization complexity penalty.
OXIDATIVE STABILITY RULE:
High-linoleic oils (rosehip, hemp, sea buckthorn) oxidize rapidly.
Tocopherol at functional antioxidant concentration = structural necessity + quality bonus.
Tocopherol at trace decorative level = no credit. Rancid/oxidized oils → Safety penalty.
────────────────────────────────────────────────────────────────────────────
LAYER 4 — PRESERVATIVE RULE (LEAVE-ON — AMPLIFIED)
────────────────────────────────────────────────────────────────────────────
Pure anhydrous oils → preservative-free; note as leave-on safety advantage.
Tocopherol = antioxidant stabilizer, NOT antimicrobial preservative; low concern;
quality bonus at functional concentration.
Emulsion formats → Full leave-on preservative evaluation:
HIGH CONCERN — score cap 2.5:
MIT, MCI/MI blend, Formaldehyde releasers (DMDM Hydantoin, Imidazolidinyl Urea,
Diazolidinyl Urea, Quaternium-15), Triclosan, Benzalkonium Chloride.
MODERATE CONCERN — flag prominently:
Phenoxyethanol >0.5% in leave-on neonatal use; Long-chain parabens (Propylparaben,
Butylparaben) — EU restricted in infant leave-on; flag prominently.
Methylparaben / Ethylparaben → lower concern than long-chain parabens; mild flag only.
LOW CONCERN / ACCEPTABLE:
Phenoxyethanol ≤0.5%, Caprylyl Glycol, 1,2-Hexanediol,
Sodium Levulinate/Sodium Anisate, Potassium Sorbate, Ethylhexylglycerin (booster).
────────────────────────────────────────────────────────────────────────────
LAYER 4.5 — COMEDOGENICITY AND SKIN ZONE MODIFIER
────────────────────────────────────────────────────────────────────────────
LOW COMEDOGENIC (face/scalp safe):
Squalane, Fractionated Coconut Oil, High-linoleic Sunflower, High-linoleic Safflower,
Jojoba, Hemp Seed Oil.
MODERATE COMEDOGENIC (body ok; caution face/scalp):
Sweet Almond, Apricot Kernel, Grapeseed, Avocado (low proportion).
HIGH COMEDOGENIC (avoid face/scalp in infants):
Whole Coconut Oil, Olive Oil, Castor Oil (high proportions).
Scoring: High comedogenic oil in facial/scalp application → Skin Compatibility penalty.
────────────────────────────────────────────────────────────────────────────
LAYER 4.6 — STRUCTURAL EXCELLENCE PROTECTION RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
If formula has: Tier 4 dominant oils; F0; no Tier 1 allergen oils; preservative-free
anhydrous or low-concern preservative; no colorants → maintain structural differentiation.
One moderate flaw (small Tier 3 oil proportion, minor H2 botanical complexity) reduces
score but does NOT collapse elite architecture recognition.
PENALTY LANGUAGE: Calibrated. "Less than ideal for neonates", "structurally limited",
"acceptable for older infants but not neonatal gold standard." Not catastrophic.
INGREDIENT ACCURACY RULE: Widely accepted safe oils and ingredients must NOT receive
irrational penalties. Every penalty grounded in evidence specific to ingredient,
concentration, and application context.
────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM
────────────────────────────────────────────────────────────────────────────
SAFETY [0.35 weight]:
Oil composition safety; systemic absorption via leave-on immature barrier;
fragrance/EO by tier with leave-on amplification; preservative at leave-on dose;
colorant burden; comedogenic risk by zone.
EFFECTIVENESS [0.15 weight]:
Emollient function; TEWL reduction; barrier support chemistry;
massage medium quality; cradle cap softening.
ALLERGY RISK [0.25 weight]:
Fragrance/EO sensitization by tier + leave-on amplification; allergen protein oils;
botanical allergen by H tier; preservative sensitization.
ECO IMPACT [0.05 weight]:
Oil source sustainability; mineral oil eco concern; biodegradability.
INGREDIENT QUALITY [0.15 weight]:
Oil tier appropriateness; oxidative stability; preservative minimalism;
fragrance tier quality impact; H tier applied; ingredient minimalism.
SKIN COMPATIBILITY [0.05 weight]:
Tolerance across zones; barrier resilience; microbiome compatibility;
comedogenicity by zone.
CORE SCORE FORMULA:
Core Score = (Safety × 0.35) + (Effectiveness × 0.15) + (Allergy Risk × 0.25) +
            (Eco Impact × 0.05) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.05)
────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED BABY OIL PERFORMANCE
────────────────────────────────────────────────────────────────────────────
EMOLLIENT EFFICACY:
Tier 4 high-linoleic → highest credit; Mineral oil → moderate (occlusive softening only,
no lipid integration); Squalane → high; Rancid oils → zero.
BARRIER SUPPORT [DOMINANT]:
• Tier 1 allergen oil                         → Allergen disqualification governs (cap 2.0)
• Mineral oil (Tier 2)                        → Occlusive only; Max 3.0
• Olive oil (Tier 2)                          → Barrier disruption concern; Max 2.5
• Tier 3 dominant                             → Max 3.5
• High-linoleic Tier 4                        → Max 4.5
• Tier 4 + pharmaceutical petrolatum          → Eligible for 5.0
• Pharmaceutical petrolatum alone             → Max 4.0
TEWL REDUCTION EFFICACY:
Occlusive (mineral oil, petrolatum) → strong TEWL reduction;
Tier 4 high-linoleic → TEWL reduction via occlusion AND barrier lipid support.
SENSITIZATION RISK [HIGH WEIGHT]:
By fragrance tier + leave-on amplification; by EO concern tier; allergen proteins;
by H tier; repeated daily leave-on × developmental window = maximum sensitizer load.
SYSTEMIC ABSORPTION SAFETY [BABY OIL-SPECIFIC]:
• Infant surface area/weight ratio × immature barrier = maximum topical systemic absorption
• Fragrance compounds in leave-on → significant systemic exposure; penalized by tier
• High-concern EOs (peppermint, eucalyptus, tea tree) → documented toxicity at infant
 absorbed dose; maximum penalty
• Diaper area occlusion → amplified absorption; flag when applicable
INFANT MICROBIOME COMPATIBILITY:
Whole coconut oil lauric acid has antimicrobial properties that may alter commensal
microbiome under leave-on full-body conditions — flag for routine use; not catastrophic
for targeted spot use.
FORMULATION HONESTY:
Mineral oil + fragrance = common commercial "baby oil" — the most commercially available
and most structurally limited type; state this accurately without catastrophizing.
Allergen oil INCI names must be decoded to plain language.
H3 inflation → honesty penalty; H1 coherent Tier 4 + F0 → honesty support.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 specialized scores.
────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING FORMULA AND CALIBRATION
────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
SCORE DISTRIBUTION TARGETS:
 1.0–1.8   → Truly poor / allergen-containing / high-risk
 1.8–2.5   → Weak / structurally limited systems
 2.5–3.3   → Moderate / acceptable with significant caveats
 3.3–4.0   → Good structural quality with limitations
 4.0–4.6   → Excellent — Tier 4 dominant, F0, low sensitization
 4.6–5.0   → Exceptional neonatal-grade systems
HIGH SCORE ELIGIBILITY (>4.0):
Tier 4 dominant; F0 (absolute for leave-on); no Tier 1 allergen oils; no colorants;
preservative-free anhydrous or low-concern preservative; oxidative stability addressed;
Formulation Honesty ≥ 3.5; Sensitization Risk ≥ 3.5; Barrier Support ≥ 3.5.
SCORE CAPS (leave-on amplified — stricter than rinse-off):
• Tier 1 allergen oil (peanut/wheat/sesame/mustard) → Cap at 2.0
• MIT or formaldehyde-releasing preservative        → Cap at 2.5
• Any fragrance (F1+) in leave-on baby oil          → Cap at 3.5 (F1); 3.0 (F2); 2.5 (F3)
• High-concern EO leave-on                          → Cap at 2.5
• Moderate-concern EO leave-on (lavender EO)        → Cap at 3.0
• Synthetic colorants                               → Cap at 3.0
baby loation

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🫙 BABY OIL PROFILE

## Product Classification

Short classification.

Examples:
- Optimal Gentle Baby Oil (Fragrance-Free, High-Linoleic)
- Acceptable Baby Oil (Blended, Fragrance-Free)
- Traditional Mineral Baby Oil — High Concern (Mineral Oil + Fragrance)
- Barrier-Disruptive Baby Oil (Olive Oil Dominant)
- Allergen-Risk Baby Oil (Tree Nut Oil Dominant)
- Fragrance-Free Emollient Oil (Minor Allergen Note)
- Medicated Baby Oil (Cradle Cap / Targeted Application)
- Premium Fragrance-Free High-Linoleic Baby Oil

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Oil composition and fatty acid profile suitability for infant skin
- Barrier support vs. disruption potential
- Fragrance and essential oil safety assessment (leave-on context)
- Preservative system safety
- Systemic absorption concern level
- Overall formulation appropriateness for infant leave-on use

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering infant leave-on safety realism.

### Effectiveness — ⭐X.X

Short explanation covering emollient and barrier support realism.

### Allergy Risk — ⭐X.X

Short explanation covering allergen oil and fragrance potential.

### Eco Impact — ⭐X.X

Short explanation covering environmental realism.

### Ingredient Quality — ⭐X.X

Short explanation covering oil composition and formulation quality.

### Skin Compatibility — ⭐X.X

Short explanation covering infant skin comfort and long-term usability.

---

# 🧪 SPECIALIZED PERFORMANCE

## Infant Oil Safety + Efficacy Analysis

### Emollient Efficacy — ⭐X.X

Short structural reason.

### Barrier Support — ⭐X.X

Short structural reason.

### TEWL Reduction Efficacy — ⭐X.X

Short structural reason.

### Sensitization Risk — ⭐X.X

Short structural reason.

### Systemic Absorption Safety — ⭐X.X

Short structural reason.

### Infant Microbiome Compatibility — ⭐X.X

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

*(Any fragrance, Tier 1 allergen oil, high-concern preservative, colorant, or barrier-disruptive oil MUST appear under Concerns with plain-language explanation. Allergen oil Latin INCI names must be decoded to common name for parent comprehension.)*

---

# 👶 AGE RANGE SUITABILITY

## Age Compatibility

### Newborn (0–4 weeks) — ⭐X.X

Short compatibility explanation.

### Young Infant (1–6 months) — ⭐X.X

Short compatibility explanation.

### Older Infant (6–12 months) — ⭐X.X

Short compatibility explanation.

### Toddler (1–3 years) — ⭐X.X

Short compatibility explanation.

### Premature / NICU Infant — ⭐X.X

Short compatibility explanation.

---

# 🗺 APPLICATION ZONE SUITABILITY

## Zone Compatibility

### Full Body Massage — ⭐X.X

Short compatibility explanation.

### Face / Periorbital Area — ⭐X.X

Short compatibility explanation.

### Scalp (Cradle Cap / Dry Scalp) — ⭐X.X

Short compatibility explanation.

### Diaper Area — ⭐X.X

Short compatibility explanation.

### Skin Folds (Neck, Axilla, Groin) — ⭐X.X

Short compatibility explanation.

---

# 🧬 SKIN CONDITION SUITABILITY

## Condition Compatibility

### Healthy Skin — ⭐X.X

Short compatibility explanation.

### Atopic / Eczema-Prone Skin — ⭐X.X

Short compatibility explanation.

### Dry / Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Cradle Cap / Seborrheic Dermatitis — ⭐X.X

Short compatibility explanation.

### Neonatal Acne / Milia — ⭐X.X

Short compatibility explanation.

### Premature / Very Sensitive Skin — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Full-Body Use from Birth — ⭐X.X

Short explanation.

### Daily Full-Body Use from 3 Months — ⭐X.X

Short explanation.

### Occasional / Targeted Use — ⭐X.X

Short explanation.

### Post-Bath Daily Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Post-application skin feel and texture
- Absorption rate and residue level
- Any immediate skin reactivity signal

## Medium-Term

- Barrier response — TEWL trends, skin hydration stability
- Any emerging dryness, eczema trigger, reactivity, or comedone formation
- Sensitization signal (contact allergy development)

## Long-Term

- Barrier development support or disruption over months of daily use
- Sensitization establishment risk trajectory
- Microbiome colonization outcomes under sustained oil application
- Atopic disease contribution or protection
- Overall infant skin development outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting oil composition and fatty acid profile, barrier support or disruption chemistry, sensitization and allergen risk (decode Latin INCI names to common names), systemic absorption concern, preservative and antioxidant system, fragrance and essential oil presence, and long-term developmental skin outcome.

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

3–5 concise user-friendly evidence-based statements explaining the final rating. Must address oil composition quality and fragrance/sensitization status as primary points.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Fragrance at ANY level MUST be flagged under Concerns — leave-on context; no exceptions
- Tier 1 allergen oils MUST be flagged with plain-language common name under Concerns
- Oleic acid-dominant oils MUST have barrier disruption concern flagged in output
- Mineral oil as primary MUST be noted with occlusive-only limitation
- All oil INCI Latin names for potential allergens MUST be decoded to common English names — parents must be able to understand what is in the product
- Preservative system MUST be classified by leave-on infant concern level before scoring
- Comedogenicity MUST be assessed relative to application zone
- Systemic Absorption Safety MUST be assessed — mandatory baby oil-specific parameter
- Age Range Suitability section is mandatory in every output
- Application Zone Suitability section is mandatory in every output
- Skin Condition Suitability section is mandatory in every output
- Leave-on amplification MUST be applied to all safety, allergy, and absorption assessments
- Developmental exposure window amplification MUST be applied to all sensitization assessments
- Repeated-use behavior > single-use feel
- Long-term developmental outcome > immediate post-application softness
- Post-application infant skin irritation = structural failure signal — not normal
- Fragrance ≠ gentleness; pleasant oil scent ≠ safe for infant leave-on use
- "Natural" oil ≠ safe — olive oil, mustard oil, and allergen-protein oils are natural and harmful
- Olive oil barrier disruption evidence MUST override traditional-use framing in every output
- Mustard oil neonatal barrier damage evidence MUST override cultural-use framing in every output
- Mineral oil petroleum origin and purely occlusive nature MUST be stated
- Allergen-protein oils = automatic score cap at 2.0 — no exceptions
- High-concern fragrance essential oils (tea tree, eucalyptus, peppermint) = score cap at 2.5
- Synthetic fragrance or lavender essential oil = score cap at 3.0
- Formulation minimalism is always noted as a quality signal when present
- Preservative-free anhydrous formulations MUST be noted as a leave-on safety advantage
- Sunflower oil variety (high-linoleic vs. high-oleic) MUST be identified before scoring — if unknown, flag for verification
- Petrolatum grade (USP/pharmaceutical vs. cosmetic grade) MUST be identified before classification — if unknown, flag for verification
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Baby Oil Evaluation Algorithm — Structured for oil composition safety analysis, barrier support vs. disruption assessment, infant systemic absorption evaluation, and long-term developmental skin outcome realism. All scoring is structural and evidence-informed.

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
              "You are a strict baby oil structural evaluation engine."
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