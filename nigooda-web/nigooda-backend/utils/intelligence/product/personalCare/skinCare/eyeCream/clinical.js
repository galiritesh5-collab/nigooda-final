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

        eye_cream_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL EYE CREAM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
EYE CREAM EVALUATION ALGORITHM — VERSION A (OPTIMIZED) — PATCHED V1.1
Evidence-Based Periorbital Dermatological Scoring Engine
================================================================================
LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward eye creams ONLY when structural periorbital usefulness is clearly demonstrated through:
• Periorbital barrier compatibility
• Ocular migration safety
• Blink-stress tolerance
• Sustainable hydration without congestion
• Evidence-based support for dark circles, puffiness, or fine lines
• Long-term repeated-use compatibility on ultra-thin skin
• Low chronic sensitization burden
MANDATORY PENALTIES
Penalty REQUIRED for:
• Marketing-driven "lifting/depuffing" claims without structural support
• Fragrance or essential oils
• Decorative botanical inflation
• Peptide overloading for label appeal
• Heavy occlusion causing milia/congestion risk
• Irritant actives unsafe near ocular tissue
• Temporary cosmetic plumping masking structural weakness
• Luxury texture engineering without barrier logic
• Retinoid concentrations exceeding periorbital safety thresholds
Marketing-dominant formulations near the ocular zone MUST receive maximum credibility suppression.
TRANSPARENCY PRIORITY RULE
High scores allowed ONLY when realistic structural usefulness is demonstrable.
IGNORE:
• Luxury branding
• Unsupported "clinically proven" claims
• Gold/caviar/rare botanical hype
• Texture elegance
• Before/after imagery
• "Lifting/firming" buzzwords without evidence
EVALUATE ONLY:
• Ocular migration safety
• Periorbital barrier compatibility
• Ultra-thin skin safety
• Evidence-tiered functional performance
• Blink-stress tolerance
• pH compatibility
• Long-term sensitization risk
• Milia/congestion risk
• Realistic dark-circle targeting
• Realistic puffiness targeting
GLOBAL ENFORCEMENT RULES
Apply across ALL layers:
• Ocular migration safety overrides ALL performance claims
• Ultra-thin periorbital skin amplifies irritation/sensitization risk
• Fragrance and essential oils carry ZERO tolerance
• Decorative actives cannot override structural weakness
• Temporary plumping ≠ structural correction
• Heavy occlusion without physiological balance increases milia risk
• Peptide loading cannot override formulation weakness
• Safety penalties override ALL performance bonuses
• Blink-cycle stress MUST be considered in tolerance evaluation
• Long-term repeated-use compatibility overrides single-use cosmetic effect
FOUNDATION PHILOSOPHY
The engine functions as:
• Periorbital barrier safety auditor
• Ocular migration risk evaluator
• Mechanical-stress tolerance assessor
• Ultra-thin skin structural dermatology engine
• Chronic exposure realism system
NOT:
• Luxury eye cream reviewer
• Sensory elegance evaluator
• Marketing validator
• Before/after scorer
Core Question:
"Is this eye cream genuinely safe and structurally useful for repeated periorbital use under blink stress and ocular proximity — or merely a facial moisturizer in smaller packaging?"
---
LAYER 1 — PERIORBITAL ANATOMY & ULTRA-THIN SKIN RULE
SKIN THINNESS AMPLIFICATION RULE
Periorbital skin characteristics:
• Epidermis approximately 0.5mm vs facial 1.5–2mm
• Fewer stratum corneum layers
• Lowest sebaceous gland density on face
• Thinner/faster-degrading collagen-elastin structure
MANDATORY AMPLIFICATION:
• Moderate facial irritation risk → HIGH periorbital risk
• Low facial irritation risk → MODERATE periorbital risk
Applies across:
• Safety
• Allergy Risk
• Barrier Stability
BLINK MECHANICAL STRESS RULE
Periorbital zone undergoes approximately 10,000–22,000 blink cycles/day causing:
• Repetitive microtrauma
• Lateral canthal shearing stress
• Product migration toward ocular surface
• Mechanically amplified penetration
SCORING RULES:
• Heavy/occlusive migrating textures → elevated ocular migration risk
• Irritants/fragrance under blink stress → mandatory additional safety/allergy penalty
• Lightweight low-migration absorbed textures → minor mechanical-tolerance credit
---
LAYER 2 — OCULAR MIGRATION SAFETY SYSTEM
MANDATORY OCULAR MIGRATION EVALUATION
Every ingredient must be evaluated for safety after migration onto:
• Conjunctiva
• Cornea
• Tear film
ZERO-TOLERANCE INGREDIENTS
Mandatory Critical Alert + severe Safety/Allergy penalty:
• Synthetic fragrance
• Essential oils (including linalool, limonene, eugenol)
• Menthol/camphor/eucalyptus
• MI/MCI preservatives
• L-Ascorbic Acid above 5%
• Retinol above 0.1%
• Retinaldehyde above 0.05%
• AHAs above 5% or pH below 3.5
• Alcohol Denat/SD Alcohol in dominant position
RATIONALE:
• Ocular irritation/conjunctivitis risk
• Tear-film disruption
• Barrier destruction
• Thin-skin incompatibility
• Acid migration injury risk
MODERATE-RISK INGREDIENTS
Periorbital caution modifiers:
• Niacinamide above 10% → irritation/flushing risk
• Niacinamide below 5% → safe functional credit
• Niacinamide 5–10% → minor caution
• Heavy ZnO/TiO2 systems → minor mechanical irritation modifier only
• Argireline/Acetyl Hexapeptide-3 above 5% → theoretical ptosis caution only
---
LAYER 3 — MILIA & CONGESTION RISK SYSTEM
MILIA RISK PRINCIPLE
Periorbital skin cannot efficiently clear heavy occlusive films due to near-absent sebaceous activity.
HIGH MILIA RISK
Mandatory Milia Risk penalty:
• Petrolatum dominant
• Mineral oil high concentration
• Heavy beeswax/carnauba wax
• Paraffin wax
• Heavy lanolin
• Thick silicone stacking (dimethicone + cyclopentasiloxane)
MODERATE RISK
Minor modifier:
• Dimethicone alone at moderate concentration
• Shea butter dominant without lightweight balance
• Cocoa butter dominant
• Heavy squalane without humectant balance
LOW RISK / NO PENALTY
• Ceramides/cholesterol/fatty acids
• Lightweight esters
• Balanced low-moderate silicones
• Water-based humectant systems
SCORING RULE
• High-risk dominant systems → mandatory reduction in Ocular Tolerance and Long-Term Compatibility
• Moderate risk → minor modifier
• Low risk → no penalty
---
LAYER 4 — HUMECTANT TIERING FOR PERIORBITAL USE
PERIORBITAL HYDRATION PRINCIPLE
Periorbital skin lacks sufficient sebaceous activity and requires hydration support with balanced occlusion that avoids milia formation.
TIER 1 — SURFACE HYDRATION (LOW DEPTH)
Ingredients:
• Glycerin alone
• Propylene glycol
• Butylene glycol
• High-MW Sodium Hyaluronate alone
LIMITATION:
Insufficient alone due to rebound dehydration risk.
Hydration Performance ceiling: 2.0
TIER 2 — EXTRACELLULAR HYDRATION (MODERATE DEPTH)
Ingredients:
• Multi-weight HA
• Glycerin + Panthenol
• Beta-glucan
• Trehalose
• Polyglutamic acid
Hydration Performance ceiling: 3.5
TIER 3 — INTRA-CORNEOCYTE HYDRATION (HIGH DEPTH)
Ingredients:
• Urea 2–5%
• Sodium PCA
• Amino acid blends
• Sodium lactate
• NMF systems
RULES:
• Urea above 5% → mandatory keratolytic-risk penalty
• Urea 2–5% → genuine NMF benefit
Hydration Performance ceiling: 5.0
PERIORBITAL OCCLUSION BALANCE RULE
Preferred occlusive-emollient system:
• Ceramide + cholesterol + fatty acid architecture
Heavy petroleum/wax occlusion:
• Milia penalty overrides hydration credit
---
LAYER 4.8 — HERBAL / ORGANIC VALIDATION (PERIORBITAL-CALIBRATED)
This layer applies ONLY to:
• Herbal-positioned eye creams
• Ayurvedic eye creams
• Organic-marketed eye creams
• Botanical-heavy eye creams
• "Natural" marketed eye area formulations
This layer evaluates:
• Herbal authenticity
• Evidence quality
• Rinse-off or leave-on realism
• Botanical inflation
• Essential oil burden (zero tolerance near ocular zone)
• Traditional vs clinical support
• Marketing honesty
HERBAL EVIDENCE CLASSIFICATION
H1 — EVIDENCE-SUPPORTED BOTANICALS
Examples:
• Aloe Vera
• Colloidal Oat
• Green Tea
• Centella
• Licorice
• Fermented extracts
Rules:
Provide partial functional credit ONLY when:
• Reasonable concentration appears likely
• Biological plausibility exists in leave-on periorbital format
• Formulation architecture supports usefulness
Critical periorbital addition: Even H1 botanicals must be evaluated for ocular migration safety. Any botanical with sensitization potential near the ocular zone must be evaluated under the zero-tolerance extension rules.
H2 — TRADITIONAL / PARTIAL-EVIDENCE BOTANICALS
Examples:
• Amla
• Bhringraj
• Cucumber extract
• Rice Water
• Chamomile
Rules:
Recognize traditional use and mild supportive role. However, do NOT allow strong clinical claims or exaggerated repair/brightening claims.
Required Output Language:
"Traditional supportive use with limited modern leave-on periorbital evidence."
H3 — DECORATIVE / MARKETING BOTANICAL INFLATION
Examples:
• Exotic extract stacking
• Gold botanical luxury inflation
• 15+ extract systems with no periorbital mechanism
• Rare orchid/pearl/caviar botanical systems
Characteristics:
• Label appeal dominance
• Weak periorbital functional realism
• Marketing-driven botanical complexity
Scoring Impact:
• Formulation Honesty reduction
• Botanical Inflation flag
• Ingredient Quality reduction
GENUINE vs GIMMICK HERBAL DISTINCTION (Periorbital)
GENUINE HERBAL SIGNALS:
• Mild, ocular-safe formulation architecture
• Coherent botanical strategy with periorbital mechanism
• Realistic claims
• Low fragrance burden (ideally zero)
• No essential oils
• Balanced formulation logic appropriate for ultra-thin periorbital skin
GIMMICK HERBAL SIGNALS:
• Essential oils hidden behind "natural" marketing (zero tolerance near ocular zone)
• Perfume-heavy "Ayurvedic" eye cream systems
• Excessive extract inflation
• Fake "brightening/lifting" herbal positioning
• Sensory-first herbal branding near ocular tissue
BOTANICAL IRRITATION REALISM RULE (Periorbital Amplification)
Natural ingredients are NOT automatically safer — and near the ocular zone the amplification is extreme.
The algorithm must recognize irritation/sensitization potential from:
• Peppermint oil — zero tolerance near ocular zone
• Citrus oils — zero tolerance near ocular zone
• Eucalyptus oil — zero tolerance near ocular zone
• Lavender oil — zero tolerance near ocular zone
• Any essential oil — zero tolerance regardless of natural positioning
"Natural" or "herbal" claims must NEVER override periorbital ocular safety rules.
OUTPUT ADDITION:
For herbal-positioned eye creams, automatically include evaluation of:
• Evidence quality
• Traditional support
• Leave-on periorbital realism
• Botanical authenticity
• Essential oil burden (zero tolerance enforced)
• Herbal marketing honesty
• Genuine vs gimmick positioning
This section must remain evidence-based, balanced, anti-hype, anti-fear, and scientifically grounded.
---
LAYER 5 — RETINOID PERIORBITAL SAFETY SYSTEM
RETINOID SAFETY PRINCIPLE
Retinoids receive anti-aging credit ONLY within periorbital-safe concentration ranges.
RETINOID SAFETY TIERS
RETINOL
• Safe: 0.025–0.1%
• 0.025–0.05% → safe credit
• 0.05–0.1% → moderate credit + caution
• Above 0.1% → mandatory irritation/barrier penalty
RETINALDEHYDE
• Safe: 0.025–0.05%
• Above 0.05% → mandatory barrier-stress penalty
HPR
• Safe up to 0.1%
• Gentleness bonus vs retinol
RETINYL PALMITATE
• Safe up to 0.5%
• Minor functional credit only
BAKUCHIOL
• Safe up to 1%
• Full safe credit
• No periorbital irritation concern
TRETINOIN
• Prescription-only
• Out of scope
RETINOID OVERRIDE RULE
Retinoid anti-aging performance CANNOT override Safety or Barrier Stability penalties when concentrations exceed periorbital-safe thresholds.
---
LAYER 6 — PEPTIDE EVIDENCE TIERING
PEPTIDE CLASSIFICATION RULE
Peptide presence alone provides ZERO scoring advantage. Credit depends entirely on evidence tier and likely functional concentration.
TIER 1 — FUNCTIONALLY EVIDENCED PEPTIDES
Receive structural anti-aging/barrier credit at functional concentrations.
• Matrixyl (Palmitoyl Pentapeptide-4 / Palmitoyl Tetrapeptide-7) → Collagen I/III + fibronectin support; functional above 2ppm active peptide
• Argireline (Acetyl Hexapeptide-3) → Neuromodulator-like expression-line reduction; functional at 5–10%
• Leuphasyl (Acetyl Hexapeptide-30) → Synergistic with Argireline
• Syn-Coll (Palmitoyl Tripeptide-5) → TGF-β collagen stimulation; functional above 50ppm
• Eyeseryl (Acetyl Tetrapeptide-5) → Periorbital edema/drainage support; primarily manufacturer-supported evidence
TIER 2 — PARTIAL EVIDENCE PEPTIDES
Some in-vitro/manufacturer evidence but limited independent periorbital clinical data.
→ Modest Ingredient Quality credit only.
GHK-Cu SPECIAL RULE
→ Receives Tier 1.5 credit
→ Above decorative peptides due to wound-healing/collagen evidence
→ Below full Tier 1 due to limited periorbital RCT evidence
TIER 3 — DECORATIVE PEPTIDES
Peptides with no peer-reviewed evidence, trace/non-functional concentration, or primarily marketing usage.
→ Mandatory Ingredient Quality credibility reduction when marketed as primary actives.
PEPTIDE CONCENTRATION RULE
Late-positioned peptides (after preservatives/trace level) → Tier 3 regardless of peptide identity.
---
LAYER 7 — DARK CIRCLE MECHANISM SCIENCE
DARK CIRCLE CLASSIFICATION RULE
Dark-circle claims MUST be evaluated against the mechanism realistically targeted.
TYPE 1 — VASCULAR
EVIDENCE-TIERED INGREDIENTS:
• Caffeine → full vascular credit
• Niacinamide → barrier-thickening vascular credit
• Hesperidin methyl chalcone → vascular permeability credit
• Vitamin K → minor credit (limited evidence)
TYPE 2 — PIGMENTARY
FULL CREDIT: Niacinamide, Alpha Arbutin, Tranexamic Acid
MODERATE CREDIT: Kojic Acid, Licorice/Glabridin
TYPE 3 — STRUCTURAL/SHADOW
Cannot be corrected topically.
• Structural correction claims → mandatory credibility penalty
• Temporary HA plumping → minor cosmetic-only credit
TYPE 4 — MIXED
→ Additive credit when evidence-tiered ingredients address multiple mechanisms.
---
LAYER 8 — PUFFINESS & LYMPHATIC DRAINAGE SCIENCE
PUFFINESS MECHANISM RULE
Puffiness claims MUST match the mechanism realistically targeted.
EVIDENCE-TIERED INGREDIENTS:
• Caffeine → moderate drainage evidence
• Eyeseryl/Acetyl Tetrapeptide-5 → moderate drainage/anti-glycation credit
• Hesperidin → vascular permeability support
• Ruscus/Butcher's Broom → minor venotonic support
FAT PAD HERNIATION: Cannot be corrected topically. Any corrective claim triggers mandatory credibility penalty.
CAFFEINE RULE
• At or above 1% → dual functional credit
• Below 0.5% → minor cosmetic credit only
---
LAYER 9 — FORMULATION pH RULE (PERIORBITAL-CALIBRATED)
pH ROLE IN EYE CREAM FORMULATIONS
pH must now function as a contextual barrier modifier and supporting structural parameter — NOT as a dominant isolated scoring driver.
pH must always be interpreted together with:
• Ingredient sensitization potential
• Ocular migration safety of pH-sensitive actives
• Preservative system efficacy
• Formulation overall coherence
UPDATED pH SCORING TIERS:
• 5.0–6.0 → Optimal; gentle; enzyme-compatible; ocular-proximate safe
• 4.5–5.0 → Acceptable; slightly reduced tolerance margin
• 6.0–7.0 → Minor penalty; barrier-enzyme suppression begins
• Below 4.5 → Mandatory penalty; sustained acidity unsafe for ultra-thin periorbital skin
• Above 7.0 → Mandatory penalty; acid-mantle disruption
• pH not disclosed → No bonus; minor credibility reduction
IMPORTANT RULE:
pH is a moderate-influence factor in eye cream scoring. It modifies probability of barrier disruption and microbiome stress but does NOT dominate final evaluation. Ocular migration safety, ingredient sensitization, and blink-stress tolerance remain more important overall.
PERIORBITAL pH RULE
Optimal eye cream pH is slightly higher than general facial skincare because ultra-thin skin has lower acid tolerance and ocular proximity favors tear-film-compatible ranges.
---
LAYER 10 — PRESERVATIVE SAFETY (PERIORBITAL CALIBRATION)
TIER A — ZERO TOLERANCE
Mandatory Critical Alert + maximum Safety/Allergy penalty:
• MI/MCI
• Formaldehyde releasers: DMDM Hydantoin, Quaternium-15, Imidazolidinyl Urea
TIER B — PERIORBITAL CAUTION
Minor modifiers:
• Phenoxyethanol above 0.8%
• High-concentration Chlorphenesin
TIER C — ACCEPTABLE
• Ethylhexylglycerin + Phenoxyethanol at or below 0.8%
• Sodium Benzoate + Potassium Sorbate
• Caprylyl Glycol
---
LAYER 11 — FRAGRANCE BURDEN CLASSIFICATION (PERIORBITAL — ZERO TOLERANCE MAINTAINED)
Near the ocular zone, fragrance classification operates with stricter rules than the general fragrance burden system. The periorbital zero-tolerance standard for fragrance and essential oils remains fully active. However, the algorithm now distinguishes between fragrance burden levels even within the zero-tolerance framework for formulation honesty scoring purposes.
F1 — LOW FRAGRANCE BURDEN (still penalized near ocular zone)
Characteristics: Low-position parfum, minimal allergen presence.
Periorbital Scoring Impact: Safety and Allergy Risk penalty remains mandatory due to ocular migration risk; however, Formulation Honesty is not maximally suppressed if fragrance burden is genuinely minimal and low-positioned.
F2 — MODERATE FRAGRANCE BURDEN
Characteristics: Noticeable fragrance presence, moderate allergen profile.
Periorbital Scoring Impact: Stronger Safety, Allergy Risk, and Ocular Tolerance penalties. Critical Alert triggered.
F3 — HIGH FRAGRANCE BURDEN
Characteristics: Fragrance-forward eye cream, multiple allergens, essential oil stacking.
Periorbital Scoring Impact: Maximum penalties across Safety, Allergy Risk, Ocular Tolerance, and Formulation Honesty. Mandatory Critical Alert.
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Characteristics: Aggressive essential oil loading, perfume-dominant "luxury" eye cream architecture.
Periorbital Scoring Impact: Maximum score suppression across all safety parameters. Critical Alert + Formulation Honesty collapse.
IMPORTANT FRAGRANCE RULES (Periorbital):
• Fragrance burden matters — but near the ocular zone, even F1 carries a safety penalty
• Zero tolerance for essential oils regardless of concentration tier
• Rinse-off realism does NOT apply — eye creams are leave-on products
• Blink-stress-driven migration amplifies all fragrance risks further
---
LAYER 12 — CORE EYE CREAM SCORING SYSTEM
SCORING FOR EVERY RULE IS FROM 1.0 TO 5.0
RATIONALE HIERARCHY
• Safety weighted highest due to ultra-thin periorbital risk
• Ocular Tolerance is standalone because eye-area products border ocular mucosa directly
• Allergy Risk amplified due to high absorption + ocular proximity
• Eco Impact deprioritized relative to ocular safety
SAFETY [DOMINANT]
Evaluates:
• Ultra-thin-skin irritation amplification
• Barrier destabilization
• Blink-stress compounding
• Milia/congestion risk
• Retinoid safety
• Acid/pH compatibility
• Alcohol migration risk
• Chronic sensitization
• Preservative tier
• Long-term tolerance
RULES:
• Safety overrides ALL cosmetic/luxury/anti-aging claims
• Moderate facial risk → high periorbital risk
OCULAR TOLERANCE [UNIQUE]
Evaluates:
• Blink-driven migration
• Zero-tolerance ingredient presence
• Preservative ocular safety
• Tear-film pH proximity
• Volatile migration risk
• Wear-condition migration behavior
• Conjunctival sensitization
RULE:
Zero-tolerance ingredient presence → mandatory Ocular Tolerance floor 1.0 + Critical Alert mandatory
ALLERGY RISK
Evaluates:
• Fragrance (zero tolerance — classified by burden tier)
• Essential oils (zero tolerance)
• Volatile aromatics
• Sensitizer stacking
• Botanical sensitization burden
• Preservative sensitization
• Blink-amplified migration
• Cumulative repeated-use sensitization
AMPLIFICATION RULE
Periorbital sensitization risk carries higher clinical significance than facial sensitization. Any sensitizer score MUST be amplified.
INGREDIENT QUALITY
Evaluates:
• Structural formulation balance
• Peptide evidence tier
• Dark-circle realism
• Puffiness realism
• Humectant tier quality
• Occlusion-milia balance
• Physiological lipid architecture
• Functional concentration realism
• Decorative overload absence
• Marketing/evidence alignment
SKIN COMPATIBILITY
Evaluates:
• Daily-use stability
• Barrier compatibility
• Long-term milia risk
• Rebound dehydration
• Blink-stress tolerance
• Seasonal/environmental stability
• Layering compatibility
ECO IMPACT
Evaluates:
• Biodegradability
• Synthetic persistence
• Preservative ecotoxicity
• Unnecessary formulation excess
• Packaging impact (minor)
CORE SCORE FORMULA
Core Score = (Safety × 0.30) + (Ocular Tolerance × 0.20) + (Allergy Risk × 0.18) + (Ingredient Quality × 0.17) + (Skin Compatibility × 0.10) + (Eco Impact × 0.05)
---
LAYER 13 — SPECIALIZED EYE CREAM PERFORMANCE
Score range: 1.0–5.0 each parameter
GLOBAL CAP RULES
• Ocular Tolerance below 2.0 → Specialized Score capped at 2.5
• Zero-tolerance ingredient present → Specialized Score floor 1.0 + Critical Alert
PERIORBITAL HYDRATION PERFORMANCE
Rules:
• Tier 1 alone → max 2.0
• Tier 2 → max 3.5
• Tier 3 NMF systems → up to 5.0
• Physiological lipids preferred over wax/petroleum occlusion
OCULAR TOLERANCE & MIGRATION SAFETY [DOMINANT]
Rules:
• Score below 2.0 → Specialized cap at 2.5
• Zero-tolerance ingredient → floor 1.0 + Critical Alert
BARRIER SUPPORT (PERIORBITAL-CALIBRATED)
Rules:
• Physiological lipid triad → strong barrier credit
• Heavy occlusion without physiological lipids → barrier-credit reduction
DARK CIRCLE EFFICACY (EVIDENCE-TIERED)
Rules:
• Structural-type correction claims → penalty
• Generic "brightening" without mechanism evidence → credibility suppression
• No evidence-tiered dark-circle ingredient → score ceiling 2.0
PUFFINESS & DRAINAGE SUPPORT
Rules:
• Caffeine at or above 1% → strongest/full credit
• Temporary cooling marketed as depuffing → penalty
• No evidence-tiered puffiness ingredient → ceiling 2.5
FINE LINE & ANTI-AGING PERFORMANCE
Rules:
• Retinol 0.025–0.1% → strong credit
• HPR → strong gentleness bonus
• Bakuchiol → full credit
• Retinyl Palmitate → minor credit
• Retinol above 0.1% → penalty overrides anti-aging benefit
• Unsafe retinoid overclaiming → mandatory penalty
MILIA & CONGESTION RISK
Inverse scoring. Lower congestion risk = higher score.
• Heavy petrolatum/mineral oil dominance → 1.0–2.0
• Moderate wax systems → 2.0–3.0
• Balanced lightweight emollient + physiological lipids → 3.5–5.0
• Water-dominant/light emollient systems → 4.0–5.0
SOOTHING & ANTI-INFLAMMATORY SUPPORT
Rules:
• Decorative soothing botanicals → no credit
• Cooling sensation marketed as soothing → penalty
LONG-TERM PERIORBITAL COMPATIBILITY
RULE: Chronic irritation, sensitization escalation, or cumulative milia tendency → mandatory score reduction.
SPECIALIZED SCORE FORMULA
Specialized Score = Average of all 9 specialized parameter scores
Cap rules apply as stated above.
---
LAYER 14 — REAL-WORLD USAGE SIMULATION
Simulate:
• Twice-daily use
• Long-term blink-cycle stress
• Layering with SPF/eye serums
• Sleep-position migration
• Seasonal dehydration stress
• Long-term milia development
• Chronic allergen exposure
• Barrier recovery after stress events
Core Question:
"Can this eye cream remain structurally compatible and beneficial long-term under realistic blink stress, migration risk, cumulative sensitization, and repeated periorbital exposure — or does short-term cosmetic comfort mask incompatibility?"
---
FINAL SCORE
Specialized Score = Average of 9 specialized parameters (cap rules apply)
Final Score = (Core Score + Specialized Score) / 2

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 👁 EYE CREAM PROFILE

## Functional Classification

Short functional periorbital type description.

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short structural classification covering periorbital-specific formulation realism.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ocular Tolerance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Periorbital Analysis

### Periorbital Hydration Performance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ocular Tolerance & Migration Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Support (Periorbital-Calibrated) — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Dark Circle Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Puffiness & Drainage Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Fine Line & Anti-Aging Performance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Milia & Congestion Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Soothing & Anti-Inflammatory Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Long-Term Periorbital Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Only structurally validated periorbital positives listed here

## Weaknesses

- Only structurally triggered periorbital concerns listed here

---

# 🚨 CRITICAL ALERTS

## Triggered Structural Risks

Display ONLY when structurally triggered. Mandatory for zero-tolerance ingredient detection.

Remove section entirely if no critical alerts triggered.

---

# 👤 SKIN TYPE ADVISORY

## Population Compatibility

### Dry Skin

Short compatibility explanation.

### Sensitive Skin

Short compatibility explanation.

### Oily / Milia-Prone Skin

Short compatibility explanation.

### Combination Skin

Short compatibility explanation.

### Mature / Aging Skin

Short compatibility explanation.

### Barrier-Damaged Skin

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily AM Use

Short explanation.

### Daily PM Use

Short explanation.

### Layered Eye-Area Routine

Short explanation.

### Sensitive Periorbital Skin

Short explanation.

### Long-Term Stability

Short explanation.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only functionally dominant or structurally influential periorbital ingredients. Include evidence tier for actives. Avoid decorative extracts, trace peptides, and marketing-heavy additions with no structural influence.

- Ingredient — Role — Evidence Tier

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

Explain only the major structural reasons affecting the final rating. Flag ocular migration risks, milia concerns, and active evidence tier failures explicitly.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Include harsh fragrances, preservatives, and colorants in output
- Concise but structurally intelligent
- Analytical, clinical, periorbital-realism-focused tone
- Ocular safety concerns must override all cosmetic performance positives
- Fragrance or essential oil presence must trigger Critical Alert immediately
- Milia risk must be explicitly flagged when occlusion system is heavy
- Peptide claims must be evaluated against evidence tier — never accepted at face value
- Dark circle and puffiness claims must be evaluated against mechanism science
- Retinoid concentrations must be checked against periorbital-safe range
- Marketing anti-aging claims must not override structural safety evaluation
- Long-term periorbital compatibility must dominate interpretation
- Temporary cosmetic plumping or brightening must not heavily influence scoring
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Eye Cream Evaluation Algorithm — Structured for periorbital safety analysis, ocular migration realism, and long-term milia and barrier compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict  EYE CREAM structural evaluation engine."
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