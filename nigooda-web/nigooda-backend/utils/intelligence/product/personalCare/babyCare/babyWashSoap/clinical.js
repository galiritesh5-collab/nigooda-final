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
        "BABYWASHSOAP ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 1 — BABY WASH / BABY SOAP EVALUATION
STANDALONE — FULLY SELF-CONTAINED
═══════════════════════════════════════════════════════════════════════════════
────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE
────────────────────────────────────────────────────────────────────────────
SYSTEM OBJECTIVE
Reward baby cleansers that demonstrate effective gentle cleansing with minimal
barrier disruption, surfactant architecture appropriate for immature infant skin,
preservation of the developing skin barrier, microbiome compatibility, evidence-based
formulation design, lowest achievable sensitization risk, and eye safety.
Mandatory penalties apply for: harsh surfactant as primary agent, fragrance at any
tier level (F1–F3), high-concern essential oils, high-sensitization preservatives,
allergen-heavy botanical loading, rinse-off active inflation, traditional soap bars,
unjustified broad-spectrum antimicrobials, and colorants.
INFANT SKIN BIOLOGICAL CONTEXT
• Neonatal stratum corneum 30–40% thinner than adult — permeability is higher
• TEWL significantly higher in neonates
• Skin surface area to body weight ratio ~3× adult — systemic absorption elevated
• Microbiome in active establishment during first 6–12 months
• First 6–12 months = critical immune sensitization window — allergen exposure
 during this period can establish lifelong contact allergy
• ~20% of infants have atopic predisposition — all formulas evaluated as if
 the infant could be atopic
RINSE-OFF EXPOSURE REALISM:
Contact time is 30–90 seconds. Most cleanser is removed during rinsing.
Risk from any ingredient depends on concentration, rinse efficiency, aromatic burden,
residue potential, and usage frequency — not presence alone.
This realism reduces but does not eliminate concern for secondary ingredients.
pH EVALUATION RULE (EMBEDDED):
pH cannot be determined from an ingredient list alone. pH is NOT scored unless the
manufacturer explicitly states it on the label or product page. When pH is unknown:
no bonus, no penalty — neutral treatment.
Exception: Traditional soap (saponified oils as primary base — Sodium Cocoate,
Sodium Palmate) is inherently alkaline pH 9–10 by process chemistry. This constitutes
alkaline architecture by definition and is penalized accordingly regardless of any
stated or unstated pH value.
────────────────────────────────────────────────────────────────────────────
LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM
────────────────────────────────────────────────────────────────────────────
TIER 1 — HARSH / UNACCEPTABLE IN BABY WASH
• SLS (Sodium Lauryl Sulfate)
• SLES as primary surfactant (Sodium Laureth Sulfate)
• ALS (Ammonium Lauryl Sulfate)
• LAS (Linear Alkylbenzene Sulfonates)
• Sodium C14-16 Olefin Sulfonate
• Traditional saponified soap systems (Sodium Cocoate, Sodium Palmate as base)
Scoring: Maximum Safety penalty; Barrier Preservation ceiling 1.5; automatic
Formulation Honesty failure if marketed as "gentle" or "baby-safe."
TIER 2 — MODERATE / HIGH CONCERN AS PRIMARY
• Sodium Lauroyl Methyl Isethionate
• Disodium Laureth Sulfosuccinate (as primary)
• SLES in blended systems (secondary role only)
• SCI (Sodium Cocoyl Isethionate) as sole primary
Scoring: Significant Safety penalty as primary; moderate as secondary in Tier 3/4 system.
TIER 3 — MILD / ACCEPTABLE WITH TIER 4 SUPPORT
• CAPB (Cocamidopropyl Betaine) — well-studied; safe at cosmetic concentrations;
 sensitization potential exists in a small population but is not grounds for major
 penalty at standard concentrations; note in Allergy Risk only
• Lauryl Betaine
• Sodium Cocoamphoacetate
• Disodium Cocoamphodiacetate
• Sodium Cocoyl Glycinate
• Sodium Lauroyl Sarcosinate
Scoring: Eligible for acceptable Barrier Preservation; CAPB note in Allergy Risk only.
TIER 4 — VERY MILD / IDEAL FOR BABY WASH
• Decyl Glucoside
• Coco Glucoside
• Lauryl Glucoside
• Sodium Cocoyl Glutamate
• Disodium Cocoyl Glutamate
• Sodium Cocoyl Alaninate
• Sodium Lauroyl Glutamate
• Amino acid / glucoside blends
• PEG-80 Sorbitan Laurate
Scoring: Maximum Barrier Preservation eligible; highest Safety score eligibility;
transparency and Formulation Honesty bonus.
TIER 5 — ULTRA-MILD AMPHOTERICS (BABY GOLD STANDARD)
• Cocamidopropyl Hydroxysultaine
• Sodium Lauroamphoacetate / Disodium Lauroamphodiacetate
• PEG-80 Sorbitan Laurate (in primary role)
Scoring: Maximum ocular safety credit; tear-free structural substantiation bonus.
SURFACTANT SYSTEM CLASSIFICATION:
• Tier 1 alone                    → UNACCEPTABLE
• Tier 1 + Tier 3/4               → HIGH CONCERN
• Tier 2 alone                    → HIGH CONCERN
• Tier 2 + Tier 3/4               → MODERATE CONCERN
• Tier 3/4 dominant               → ACCEPTABLE
• Tier 4 dominant                 → IDEAL
• Tier 4 + Tier 5                 → OPTIMAL
• Traditional soap base           → UNACCEPTABLE regardless of other ingredients
────────────────────────────────────────────────────────────────────────────
LAYER 2 — FORMAT TYPE MODIFIER
────────────────────────────────────────────────────────────────────────────
Identify format before scoring:
• Liquid wash/gel             — standard evaluation
• Traditional bar soap        — saponified base = alkaline architecture; maximum concern
• Syndet bar                  — evaluate surfactant tier; not assumed alkaline unless saponified
• Foam wash                   — diluted system; evaluate actual INCI; dilution may reduce concern
• Bath soak / bath milk       — highly diluted; evaluate fragrance/colorants for full-body
                               immersion context
• Newborn-specific claim      — must have Tier 4 dominant system, F0 fragrance, minimal
                               preservative; any newborn claim on Tier 1/2 or fragranced
                               formula = major Formulation Honesty penalty
────────────────────────────────────────────────────────────────────────────
LAYER 3 — FRAGRANCE AND ESSENTIAL OIL TIER SYSTEM (EMBEDDED — RINSE-OFF)
────────────────────────────────────────────────────────────────────────────
FRAGRANCE TIERING PRINCIPLE:
Fragrance is penalized by load tier, not flat-collapsed. A mildly fragranced excellent
formula must NOT be scored the same as a perfume-heavy weak formula. Discrimination
between tiers is required. Rinse-off context moderates but does not eliminate risk.
FRAGRANCE MATERIAL DISCRIMINATION:
The following are NOT equivalent and must not be treated identically:
 • Synthetic fragrance oil (dominant aromatic system)
 • Essential oil (concentrated bioactive aromatic)
 • Aromatic plant extract (dilute, solvent-extracted)
 • Floral water / hydrosol (trace aromatic, aqueous)
 • Trace aromatic compound (incidental)
Each requires contextual assessment of load, format, and evidence.
F0 — FRAGRANCE-FREE:
No synthetic fragrance, no masking fragrance, no essential oils, no aromatic extracts
functioning as fragrance delivery.
Bonus: Allergy Risk optimal; Formulation Honesty bonus; highest score eligibility.
F1 — TRACE / LOW FRAGRANCE LOAD:
Trigger: Fragrance listed very late in INCI; single mild aromatic component; low aromatic
complexity; no allergen-rich essential oils; no strong sensory positioning.
Penalties: Moderate Allergy Risk penalty; small microbiome penalty; mild newborn
suitability reduction.
Preserves: Recognition of excellent surfactant architecture; barrier differentiation.
Score guidance: Still eligible for 3.0–3.8 range if structural architecture is excellent.
Output language: "Low-level fragrance slightly reduces ideal neonatal suitability.
Structure remains relatively mild."
F2 — MODERATE FRAGRANCE SYSTEM:
Trigger: Standard parfum system; multiple aromatic compounds; fragrance mid-deck in INCI.
Penalties: Significant sensitization penalty; moderate microbiome penalty; moderate
ocular concern in wash context.
Score guidance: 2.4–3.2 range.
F3 — HIGH-RISK FRAGRANCE / ESSENTIAL OIL SYSTEM:
Trigger: Perfume-heavy architecture; high-concern essential oils present; allergen-rich
fragrance systems; strong sensory marketing positioning.
Penalties: Severe sensitization penalty; major newborn suitability penalty; major
microbiome concern; major Formulation Honesty penalty.
Score guidance: 1.0–2.8 range.
ESSENTIAL OIL CONCERN TIERS:
HIGH CONCERN — SEVERE PENALTIES (triggers F3 classification):
• Peppermint / Menthol: respiratory risk in infants under 2 years — well-documented
 contraindication per AAP and EU regulatory bodies
• Eucalyptus (1,8-cineole): respiratory and CNS toxicity documented in young children
• Tea Tree (Melaleuca alternifolia): systemic toxicity concern at absorbed infant doses
• Cinnamon bark/leaf: potent sensitizer and mucous membrane irritant — consensus evidence
• Clove (eugenol): strong sensitizer — documented contact allergy risk
• Citrus phototoxic oils (bergapten-containing varieties): phototoxicity documented
MODERATE CONCERN — MODERATE PENALTIES:
• Lavender EO (Lavandula angustifolia): linalool and linalyl acetate are documented contact
 sensitizers. Endocrine disruption concern exists in literature but evidence at cosmetic
 concentrations is debated — penalize for sensitization potential only. NOT equivalent
 to peppermint or eucalyptus severity. Lavender EO ≠ lavender extract.
• Chamomile EO (the essential oil form, not extract): sesquiterpene content; some
 cross-reactivity with Asteraceae; moderate concern at meaningful concentrations.
 Chamomile extract ≠ chamomile EO.
• Vanilla oil at high concentrations: mild sensitization potential.
LOW-CONCERN TRACE AROMATIC EXTRACTS:
• Very low concentration plant extracts not functioning as fragrance delivery
• Minimal Allergy Risk note only; no structural penalty in rinse-off context
• Rinse-off exposure realism: trace aromatics in rinse-off have very low real-world
 sensitization burden
IMPORTANT BOTANICAL ACCURACY:
Common botanical extracts — chamomile extract (non-oil), calendula extract, aloe vera,
colloidal oatmeal, green tea extract, centella asiatica, panthenol, allantoin, bisabolol —
are well-studied and generally safe in infant-appropriate concentrations. These must NOT
be penalized based on theoretical allergen risk without specific evidence of harm at
the concentrations and format used. Chamomile extract is not chamomile essential oil.
Context and form matter.
────────────────────────────────────────────────────────────────────────────
LAYER 3.5 — HERBAL AUTHENTICITY AND BOTANICAL COMPLEXITY SYSTEM (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
HERBAL PHILOSOPHY:
Neither anti-herbal extremism nor pro-natural bias. Coherent evidence-aware herbal
systems receive contextual recognition. Decorative botanical inflation is penalized.
Natural ≠ safe; synthetic ≠ unsafe.
H1 — EVIDENCE-SUPPORTED SUPPORTIVE BOTANICALS:
Examples: Colloidal Oatmeal, Aloe Vera, Calendula extract, Panthenol, Bisabolol,
Allantoin, Green Tea extract, Centella asiatica, Ferment lysates.
Credit allowed ONLY IF: fragrance burden is F0 or F1; surfactants are Tier 3 or 4;
essential oils are restrained; architecture is infant-compatible.
Botanical realism (rinse-off): In rinse-off context these provide minor supportive
roles — small comfort improvement, mild irritation reduction as secondary contributors.
They cannot create major therapeutic outcomes, override harsh cleansing systems,
neutralize fragrance penalties, or replace leave-on barrier care.
Output language: "Contains supportive botanicals within a coherent mild cleansing
structure — minor secondary contribution rather than primary active system."
H2 — TRADITIONAL / PARTIAL-EVIDENCE HERBALS:
Examples: Neem, Turmeric, Amla, Reetha, Shikakai, Hibiscus, Rice Water,
Fenugreek, Bhringraj.
Recognize traditional cleansing history and cultural relevance; acknowledge mild
supportive plausibility. Avoid strong therapeutic assumptions. No detoxifying,
immune-boosting, or chemical-free framing.
Output: "Traditional botanical with limited strong infant rinse-off evidence;
culturally coherent with modest clinical contribution."
H3 — BOTANICAL INFLATION / MARKETING STACKING:
Triggers: 10–30+ extracts; luxury Ayurvedic overload; "superfood baby wash";
floral extract stacking; sensory botanical marketing.
Apply: Formulation Honesty penalty; Ingredient Quality reduction; unnecessary exposure
burden penalty; sensitization complexity escalation.
Output: "Botanical complexity appears primarily marketing-driven. Large herbal stack
contributes minimal real infant rinse-off benefit."
BOTANICAL COMPLEXITY TIERING:
• 1–4 supportive extracts (H1) in coherent formula → mild credit; no major penalty
• 4–8 extracts, moderate positioning           → small Ingredient Quality reduction only
• 10–20+ extracts, stacking                    → sensitization complexity + honesty + burden penalties
COHERENT HERBAL BABY WASH SIGNALS (POSITIVE):
Tier 4 dominant surfactants; F0 or F1 fragrance; restrained botanical count; low EO
burden; realistic positioning; microbiome-compatible architecture.
→ Eligible for mild Ingredient Quality and Formulation Honesty support.
GIMMICK HERBAL BABY WASH SIGNALS (NEGATIVE):
SLS/SLES-heavy "Ayurvedic" system; perfume-heavy herbal wash; EO-driven baby wash;
soap-based "natural" cleanser; excessive extract stacking; fragrance hidden under botanicals.
→ Honesty penalty; allergy escalation; microbiome concern escalation.
────────────────────────────────────────────────────────────────────────────
LAYER 4 — PRESERVATIVE SAFETY RULE (EMBEDDED — RINSE-OFF CONTEXT)
────────────────────────────────────────────────────────────────────────────
EXPOSURE CONTEXT: Rinse-off. Contact duration 30–90 seconds. Most product removed.
Preservative risk is real but rinse-off dilution moderates severity vs leave-on.
PREFERRED / LOW CONCERN:
• Phenoxyethanol ≤1%        — widely used; accepted by EU and FDA at standard
                              cosmetic concentrations; flag at high concentrations only
• Ethylhexylglycerin        — used as booster at low levels; well-tolerated; low concern
• Sodium Benzoate           — low concern at appropriate concentration
• Potassium Sorbate         — low concern; broad safety record
• Benzyl Alcohol            — low-to-moderate in rinse-off; caution for neonates specifically
• Methylparaben             — significantly lower concern than long-chain parabens;
                              accepted by EU and FDA in rinse-off; mild flag only
• Ethylparaben              — same as Methylparaben; mild flag only; do NOT penalize
                              at same level as Propylparaben/Butylparaben
MODERATE CONCERN:
• Phenoxyethanol >1.0%             — elevated concern at high concentrations
• MIT (Methylisothiazolinone) alone — sensitization risk documented; EU has restricted
                                     in rinse-off at high concentrations; moderate penalty
• Chlorphenesin                    — limited infant data; moderate concern
HIGH CONCERN / AVOID:
• MCI/MI blend                     — strong sensitizer; restricted in EU rinse-off; high concern
• DMDM Hydantoin                   — formaldehyde-releasing; IARC carcinogen; maximum concern
• Imidazolidinyl Urea              — formaldehyde-releasing; maximum concern
• Diazolidinyl Urea                — formaldehyde-releasing; maximum concern
• Quaternium-15                    — formaldehyde-releasing; maximum concern
• Propylparaben / Butylparaben     — endocrine disruption concern at repeated systemic
                                     infant doses; EU flags concern even in rinse-off
                                     for infants; significant penalty
• Triclosan                        — multiple regulatory bans; microbiome disruption;
                                     endocrine concern; maximum penalty
• Benzalkonium Chloride            — antimicrobial; microbiome disruption; not appropriate
                                     for routine infant cleansers
────────────────────────────────────────────────────────────────────────────
LAYER 4.5 — COLORANT PENALTY RULE
────────────────────────────────────────────────────────────────────────────
Colorants in baby cleansers serve zero functional purpose.
Any synthetic azo dye (Red 40, Yellow 5, Yellow 6, Blue 1, Green 3, etc.) → Maximum
Allergy Risk, Ingredient Quality, and Formulation Honesty penalty.
Natural pigments (Iron Oxides, Titanium Dioxide) at trace structural levels → minimal penalty.
────────────────────────────────────────────────────────────────────────────
LAYER 4.6 — ANTIMICROBIAL AGENT RULE
────────────────────────────────────────────────────────────────────────────
Broad-spectrum antimicrobials in routine baby wash without clinical indication:
• Disrupt active infant microbiome colonization
• No evidence base for routine use in healthy infant bathing
• "Antibacterial baby wash" without clinical indication = Formulation Honesty failure
Targeted use (e.g., Zinc pyrithione for seborrheic dermatitis) receives contextual credit.
────────────────────────────────────────────────────────────────────────────
LAYER 4.7 — STRUCTURAL EXCELLENCE PROTECTION RULE (EMBEDDED)
────────────────────────────────────────────────────────────────────────────
If a formula has: Tier 4 dominant surfactant; F0 or F1 fragrance; mild preservative
system; no colorants; no high-risk antimicrobials; good barrier-supportive architecture
→ MAINTAIN structural differentiation in scoring.
One moderate flaw (mild fragrance F1, modest botanical complexity H2, minor preservative
note) reduces score but does NOT collapse elite architecture recognition.
Does NOT protect formulas with disqualifying ingredients (Tier 1 surfactants, F3 EOs,
formaldehyde releasers, etc.).
PENALTY LANGUAGE CALIBRATION:
Replace catastrophic language with calibrated language.
Use: "less than ideal", "not optimal for highly sensitive infants", "acceptable but
not minimalist", "moderate sensitization concern", "better suited for older infants",
"reasonable but not elite structurally."
Avoid: "developmental failure", "major structural concern", "significant infant risk"
for moderate formulas.
────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM
────────────────────────────────────────────────────────────────────────────
INGREDIENT ACCURACY RULE:
Every penalty must be grounded in peer-reviewed evidence specific to the product
category, concentration range, and application context. Commonly used, well-tolerated
ingredients must not be penalized on the basis of theoretical risk, isolated studies,
or popular concern without scientific consensus. If an ingredient is widely accepted
as safe by major regulatory bodies (EU, FDA, AAP) at standard cosmetic concentrations,
it receives neutral-to-positive treatment.
SAFETY [DOMINANT — 0.30 weight]:
• Surfactant harshness for immature infant stratum corneum
• Barrier disruption risk
• Systemic absorption of all ingredients via immature barrier
• Fragrance/EO risk — by F tier
• Preservative safety at infant dose
• Cumulative sensitization and inflammatory burden
• Antimicrobial agent safety
• Ocular safety
• Exposure realism applied — concentration, rinse efficiency, aromatic burden
EFFECTIVENESS [0.15 weight]:
• Milk residue, vernix, sweat, and soil removal
• Barrier function maintenance throughout cleansing
• Ocular safety in cleansing context
• Basic cleansing without barrier cost = high effectiveness
ALLERGY RISK [0.20 weight]:
• Fragrance allergens — by F tier
• Essential oil sensitization — by EO concern tier
• Preservative sensitization risk
• Botanical allergen load — by H tier
• CAPB sensitization potential (note only; not major penalty at standard concentrations)
• Colorant allergenicity
• Immune sensitization window amplification
• Exposure realism modifier applied
ECO IMPACT [0.10 weight]:
• Surfactant biodegradability
• Preservative ecological load
• Triclosan persistence (maximum eco penalty)
• Colorant environmental load
INGREDIENT QUALITY [0.15 weight]:
• Surfactant system coherence for infant skin
• Preservative system minimalism and safety
• Fragrance/EO absence or load by tier
• Rinse-off active honesty
• Structural transparency
• Herbal authenticity — H tier applied
• H1 coherent botanicals in appropriate architecture → mild quality support
• H3 stacking → quality reduction
SKIN COMPATIBILITY [0.10 weight]:
• Infant skin tolerance under daily use
• Developing barrier resilience
• Atopic dermatitis compatibility
• Microbiome stability
• Long-term developing barrier behavior
CORE SCORE FORMULA:
Core Score = (Safety × 0.30) + (Effectiveness × 0.15) + (Allergy Risk × 0.20) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.10)
────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED BABY CLEANSER PERFORMANCE
────────────────────────────────────────────────────────────────────────────
CLEANSING EFFICIENCY:
Milk residue, vernix, sweat, soil, diaper area cleansing.
Tier 1 systems cannot achieve maximum score.
BARRIER PRESERVATION [DOMINANT]:
Ceilings by surfactant tier:
• Tier 1                    → Max 1.5
• Tier 1 + Tier 3/4         → Max 2.2
• Tier 2 dominant           → Max 2.5
• Tier 2 + Tier 3/4         → Max 3.0
• Tier 3 dominant           → Max 3.8
• Tier 3/4                  → Max 4.5
• Tier 4 dominant           → Max 4.7
• Tier 4 + Tier 5           → Eligible for 5.0
• Traditional soap base     → Hard ceiling 1.0
Structural Excellence Protection: Tier 4 + F1 retains meaningful differentiation
from Tier 2/3 systems. F1 applies moderate reduction but does not collapse ceiling.
INFANT SKIN HYDRATION SUPPORT:
TEWL reduction, residual humectant benefit (glycerin, panthenol, allantoin),
avoidance of excessive lipid stripping.
RESIDUAL DRYNESS RISK:
Post-bath skin dryness trajectory, NMF disruption risk.
OCULAR SAFETY [BABY-SPECIFIC]:
• Tier 4/5 dominant + F0    → Full ocular safety credit
• "Tear-free" on Tier 1/2 dominant → Formulation Honesty failure + Ocular penalty
Tier scoring: Tier 4/5 = 4.5–5.0; Tier 3 = 3.5–4.5; Tier 2 blend = 2.5–3.5; Tier 1 = 1.0–2.0.
INFANT MICROBIOME COMPATIBILITY:
• Critical colonization window (0–6 months) amplifies disruption impact
• Broad-spectrum antimicrobials without indication → maximum microbiome penalty
• F1 → small microbiome penalty; F2 → moderate; F3 → major
• H1 coherent system → minimal microbiome impact
CUMULATIVE SENSITIZATION AND IRRITATION RISK:
• Daily bathing × developmental window = highest cumulative risk multiplier
• Fragrance tier determines penalty magnitude — F1 ≠ F3
• Exposure realism must modulate — concentration and rinse efficiency matter
• H1 in coherent formula → minimal additional cumulative concern
• H3 stacking → elevated sensitization complexity
FORMULATION HONESTY:
• "Tear-free" without structural support                  → penalty
• "Newborn-safe" without Tier 4 + F0 + minimal preservative → penalty
• "Hypoallergenic" with documented allergens              → penalty
• "Antibacterial" without clinical indication             → penalty
• H3 botanical marketing                                  → honesty penalty
• H1 in genuinely coherent formula                        → honesty support
SPECIALIZED PERFORMANCE SCORE = Average of all 7 specialized scores.
────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING FORMULA AND CALIBRATION
────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
SCORE DISTRIBUTION TARGETS (calibration guide — failure if most formulas compress):
 1.0–1.8   → Truly poor / high-risk systems
 1.8–2.5   → Weak formulations
 2.5–3.3   → Moderate / acceptable with concerns
 3.3–4.0   → Good, structurally sound formulas with limitations
 4.0–4.6   → Excellent fragrance-free / near-fragrance-free mild systems
 4.6–5.0   → Exceptional neonatal-grade systems
HIGH SCORE ELIGIBILITY (>4.0):
• Tier 3 or Tier 4 dominant surfactant (Tier 4 strongly preferred)
• F0 fragrance classification
• Barrier Preservation ≥ 3.8
• Cumulative Sensitization Risk ≥ 3.5
• No colorants
• Low-concern preservative only
• No broad-spectrum antimicrobials without indication
• Formulation Honesty ≥ 3.5
• Ocular Safety ≥ 3.5 (if tear-free claimed)
FRAGRANCE SCORE CEILINGS (proportional, exposure-aware):
• F0                                        → Eligible for 4.0–5.0
• F1 + excellent Tier 4 architecture        → Maximum ~3.8
• F2                                        → Maximum 3.2
• F3 or high-concern EO                     → Maximum 2.8
ABSOLUTE DISQUALIFIERS (hard cap at ≤2.5):
• Tier 1 dominant surfactant + newborn/baby-safe claim
• Traditional soap base marketed for newborns
• Formaldehyde-releasing preservatives
• High-concern EOs (peppermint, eucalyptus, cinnamon, clove) in baby wash
• Synthetic colorants + newborn claim
STRICT SCORING RULES:
Surfactant tier MUST be classified before scoring.
Fragrance tier (F0/F1/F2/F3) MUST be classified before scoring.
EO concern tier MUST be classified before scoring.
Herbal tier (H1/H2/H3) MUST be classified before Allergy Risk and Ingredient Quality.
pH is NOT scored from ingredient list alone — neutral treatment unless stated.
Structural Excellence Protection MUST be applied to Tier 4 dominant formulas.
Score distribution targets MUST guide calibration — compression into 2.5–3.0 is a failure.
Every penalty must be grounded in evidence specific to the concentration, format,
and application context.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
════════════════════════════════════════════════════
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🍼 BABY CLEANSER PROFILE

## Product Classification

Short classification.

Examples:
- Optimal Gentle Baby Wash (Fragrance-Free)
- Acceptable Mild Baby Wash (Blended Surfactant)
- Structurally Inappropriate Baby Wash (Harsh Surfactant Dominant)
- Traditional Soap Bar — Not Recommended for Infant Use
- Gentle Syndet Baby Bar
- Emollient Baby Bath Milk
- Medicated Baby Wash (Cradle Cap / Seborrheic Dermatitis)
- Fragrance-Containing Baby Wash — Concern

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Surfactant mildness relative to infant skin requirements
- Barrier friendliness for developing neonatal/infant skin
- pH compatibility with developing acid mantle
- Fragrance and preservative safety assessment
- Long-term developmental skin safety behavior
- Overall formulation appropriateness for infant use

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering infant safety realism.

### Effectiveness — ⭐X.X

Short explanation covering cleansing realism.

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

## Infant Cleansing + Safety Analysis

### Cleansing Efficiency — ⭐X.X

Short structural reason.

### Barrier Preservation — ⭐X.X

Short structural reason.

### Infant Skin Hydration Support — ⭐X.X

Short structural reason.

### Residual Dryness Risk — ⭐X.X

Short structural reason.

### Ocular Safety — ⭐X.X

Short structural reason.

### Infant Microbiome Compatibility — ⭐X.X

Short structural reason.

### Cumulative Sensitization and Irritation Risk — ⭐X.X

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

*(Any fragrance, harsh preservative, harsh surfactant, colorant, high pH, or inappropriate antimicrobial MUST appear under Concerns.)*

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

### Premature / Very Sensitive Skin — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use from Birth — ⭐X.X

Short explanation.

### Daily Use from 3 Months — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing feel
- Post-wash infant skin comfort (tightness/softness)
- Ocular reaction signals
- Any immediate skin reactivity

## Medium-Term

- Barrier response — skin hydration stability
- Any emerging dryness, eczema trigger, or reactivity pattern
- Tolerance development across repeated washing

## Long-Term

- Barrier stability during developmental window
- Sensitization establishment risk
- Microbiome colonization trajectory
- Atopic disease contribution or protection
- Overall infant skin outcome under daily use

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting surfactant cleansing system, barrier behavior at infant skin level, irritation and sensitization risk, fragrance and preservative load, active performance (if any), long-term developmental skin outcome, microbiome compatibility, and ocular safety relevance.

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
- Mention any fragrance, essential oil, harsh preservative, colorant, or antimicrobial in output
- No foam-volume bias
- No "natural = safe" bias — natural soap is pH 9–10 and structurally harmful for infants
- No "hypoallergenic" label bias — evaluate actual allergen load
- Surfactant harshness tier MUST be classified before scoring
- pH compatibility MUST be assessed — neonatal pH context is mandatory
- Format type MUST be identified before scoring
- Fragrance presence at ANY level MUST be flagged under Concerns
- Preservative system MUST be classified by concern level before scoring
- Ocular Safety MUST be assessed — mandatory baby-specific parameter
- Age Range Suitability section is mandatory in every output
- Skin Condition Suitability section is mandatory in every output
- Developmental exposure window amplification MUST be applied to all safety assessments
- Systemic absorption amplification MUST be applied to all ingredient safety assessments
- Repeated-use behavior > single-use feel
- Long-term developmental outcome > immediate parental sensory satisfaction
- Post-wash infant skin dryness = structural failure signal — not "clean skin"
- Foam richness ≠ cleansing power
- Traditional/natural soap ≠ safe for infants (pH 9–10 is maximum structural concern for neonates)
- Fragrance ≠ gentleness
- "Baby" label ≠ safety guarantee — evaluate structure
- "Tear-free" claim MUST be structurally substantiated or flagged as Formulation Honesty failure
- "Hypoallergenic" claim MUST be evaluated against actual allergen load
- "Newborn-safe" claim MUST be evaluated against required surfactant, pH, and fragrance-free criteria
- Antibacterial claims on routine baby wash MUST receive Formulation Honesty and microbiome penalty
- Warm bath water context must be factored into barrier disruption assessments
- Any disqualifying ingredient MUST automatically cap score at 3.0
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Baby Wash/Soap Evaluation Algorithm — Structured for surfactant mildness analysis, neonatal pH compatibility assessment, ocular safety profiling, and long-term developmental barrier outcome evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict baby wash/soap structural evaluation engine."
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