const openai =
require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  async run(data) {

    try {

      const ingredients =
        data.ingredients || [];

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

EYE CREAM EVALUATION ALGORITHM — VERSION A (OPTIMIZED)
Evidence-Based Periorbital Dermatological Scoring Engine
━━━━━━━━━━━━━━━━━━
LAYER 0 — FOUNDATION ENGINE (STRICT)
━━━━━━━━━━━━━━━━━━
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
• Marketing-driven “lifting/depuffing” claims without structural support
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
• Unsupported “clinically proven” claims
• Gold/caviar/rare botanical hype
• Texture elegance
• Before/after imagery
• “Lifting/firming” buzzwords without evidence
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
“Is this eye cream genuinely safe and structurally useful for repeated periorbital use under blink stress and ocular proximity — or merely a facial moisturizer in smaller packaging?”
━━━━━━━━━━━━━━━━━━
LAYER 1 — PERIORBITAL ANATOMY & ULTRA-THIN SKIN RULE
━━━━━━━━━━━━━━━━━━
SKIN THINNESS AMPLIFICATION RULE
Periorbital skin characteristics:
• Epidermis ≈0.5mm vs facial 1.5–2mm
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
(Based on Doane 1981; Tsubota & Nakamori 1993)
Periorbital zone undergoes ~10,000–22,000 blink cycles/day causing:
• Repetitive microtrauma
• Lateral canthal shearing stress
• Product migration toward ocular surface
• Mechanically amplified penetration
SCORING RULES:
• Heavy/occlusive migrating textures → elevated ocular migration risk
• Irritants/fragrance under blink stress → mandatory additional safety/allergy penalty
• Lightweight low-migration absorbed textures → minor mechanical-tolerance credit
━━━━━━━━━━━━━━━━━━
LAYER 2 — OCULAR MIGRATION SAFETY SYSTEM
━━━━━━━━━━━━━━━━━━
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
• L-Ascorbic Acid >5%
• Retinol >0.1%
• Retinaldehyde >0.05%
• AHAs >5% or pH <3.5
• Alcohol Denat/SD Alcohol in dominant position
RATIONALE:
• Ocular irritation/conjunctivitis risk
• Tear-film disruption
• Barrier destruction
• Thin-skin incompatibility
• Acid migration injury risk
MODERATE-RISK INGREDIENTS
Periorbital caution modifiers:
• Niacinamide >10% → irritation/flushing risk
• Niacinamide <5% → safe functional credit
• Niacinamide 5–10% → minor caution
• Heavy ZnO/TiO2 systems → minor mechanical irritation modifier only
• Argireline/Acetyl Hexapeptide-3 >5% → theoretical ptosis caution only
━━━━━━━━━━━━━━━━━━
LAYER 3 — MILIA & CONGESTION RISK SYSTEM
━━━━━━━━━━━━━━━━━━
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
━━━━━━━━━━━━━━━━━━
LAYER 4 — HUMECTANT TIERING FOR PERIORBITAL USE
━━━━━━━━━━━━━━━━━━
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
• Urea >5% → mandatory keratolytic-risk penalty
• Urea 2–5% → genuine NMF benefit
Hydration Performance ceiling: 5.0
PERIORBITAL OCCLUSION BALANCE RULE
Preferred occlusive-emollient system:
• Ceramide + cholesterol + fatty acid architecture
Heavy petroleum/wax occlusion:
• Milia penalty overrides hydration credit
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no eye-area repair, hydration, or long-term skin benefit and may increase unnecessary irritation burden.

High concern examples:
• Red 40
• Yellow 5
• Yellow 6
• Blue 1
• Green 3
• Multiple synthetic dye blends

Scoring Impact:
• Allergy Risk penalty
• Ingredient Quality penalty
• Skin Compatibility penalty

Multiple synthetic dyes increase penalties further.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”

━━━━━━━━━━━━━━━━━━
LAYER 5 — RETINOID PERIORBITAL SAFETY SYSTEM
━━━━━━━━━━━━━━━━━━
RETINOID SAFETY PRINCIPLE
Retinoids receive anti-aging credit ONLY within periorbital-safe concentration ranges.
RETINOID SAFETY TIERS
RETINOL
• Safe: 0.025–0.1%
• 0.025–0.05% → safe credit
• 0.05–0.1% → moderate credit + caution
• >0.1% → mandatory irritation/barrier penalty
RETINALDEHYDE
• Safe: 0.025–0.05%
• >0.05% → mandatory barrier-stress penalty
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
━━━━━━━━━━━━━━━━━━
LAYER 6 — PEPTIDE EVIDENCE TIERING
━━━━━━━━━━━━━━━━━━
PEPTIDE CLASSIFICATION RULE
Peptide presence alone provides ZERO scoring advantage. Credit depends entirely on evidence tier and likely functional concentration.
TIER 1 — FUNCTIONALLY EVIDENCED PEPTIDES
Receive structural anti-aging/barrier credit at functional concentrations.
• Matrixyl (Palmitoyl Pentapeptide-4 / Palmitoyl Tetrapeptide-7)
→ Collagen I/III + fibronectin support
→ Functional above 2ppm active peptide
→ Barrier-repair + anti-aging credit
• Argireline (Acetyl Hexapeptide-3)
→ Neuromodulator-like expression-line reduction
→ Functional at 5–10%
→ Fine-line credit with caution at high concentrations
• Leuphasyl (Acetyl Hexapeptide-30)
→ Synergistic with Argireline
→ Additional expression-line credit when combined
• Syn-Coll (Palmitoyl Tripeptide-5)
→ TGF-β collagen stimulation
→ Functional credit >50ppm
• Eyeseryl (Acetyl Tetrapeptide-5)
→ Periorbital edema/drainage support
→ Puffiness-reduction credit
→ Evidence primarily manufacturer-supported
TIER 2 — PARTIAL EVIDENCE PEPTIDES
Some in-vitro/manufacturer evidence but limited independent periorbital clinical data.
→ Modest Ingredient Quality credit only
→ No full functional bonus
Examples:
• Copper peptides (GHK-Cu)
• Signal peptides with mainly in-vitro evidence
GHK-Cu SPECIAL RULE
→ Receives Tier 1.5 credit
→ Above decorative peptides due to wound-healing/collagen evidence
→ Below full Tier 1 due to limited periorbital RCT evidence
TIER 3 — DECORATIVE PEPTIDES
Peptides with:
• No peer-reviewed evidence
• Trace/non-functional concentration
• Primarily marketing usage
→ Mandatory Ingredient Quality credibility reduction when marketed as primary actives.
PEPTIDE CONCENTRATION RULE
Ingredient name alone does NOT confirm functional concentration.
Late-positioned peptides (after preservatives/trace level) → Tier 3 regardless of peptide identity.
━━━━━━━━━━━━━━━━━━
LAYER 7 — DARK CIRCLE MECHANISM SCIENCE
━━━━━━━━━━━━━━━━━━
(Based on Roh & Ro 2019; Sheth & Pandya 2011; Vrcek 2016)
DARK CIRCLE CLASSIFICATION RULE
Dark-circle claims MUST be evaluated against the mechanism realistically targeted.
TYPE 1 — VASCULAR
Cause:
Visible superficial vasculature through ultra-thin skin.
Blue/purple appearance.
EVIDENCE-TIERED INGREDIENTS:
• Caffeine → full vascular credit
• Niacinamide → barrier-thickening vascular credit
• Hesperidin methyl chalcone → vascular permeability credit
• Vitamin K → minor credit (limited evidence)
Random botanical brighteners → no vascular credit.
TYPE 2 — PIGMENTARY
Cause:
Melanin deposition/post-inflammatory pigmentation.
Brown appearance.
FULL CREDIT:
• Niacinamide
• Alpha Arbutin
• Tranexamic Acid
MODERATE CREDIT:
• Kojic Acid
• Licorice/Glabridin
Generic “brightening” botanicals without tyrosinase evidence → no credit.
TYPE 3 — STRUCTURAL/SHADOW
Cause:
Tear trough hollowing/orbital fat loss.
Cannot be corrected topically.
RULES:
• Structural correction claims → mandatory credibility penalty
• Temporary HA plumping → minor cosmetic-only credit
• Must be clearly treated as non-corrective
TYPE 4 — MIXED
Combination vascular + pigmentary.
→ Additive credit when evidence-tiered ingredients address multiple mechanisms.
━━━━━━━━━━━━━━━━━━
LAYER 8 — PUFFINESS & LYMPHATIC DRAINAGE SCIENCE
━━━━━━━━━━━━━━━━━━
(Based on Wollina 2017; Baucher/Sederma; Hexsel 2021)
PUFFINESS MECHANISM RULE
Puffiness claims MUST match the mechanism realistically targeted.
CAUSE 1 — LYMPHATIC FLUID ACCUMULATION
Evidence-tiered ingredients:
• Caffeine → moderate drainage evidence
• Eyeseryl/Acetyl Tetrapeptide-5 → moderate drainage/anti-glycation credit
• Hesperidin → vascular permeability support
• Ruscus/Butcher’s Broom → minor venotonic support
CAUSE 2 — FAT PAD HERNIATION
Cannot be corrected topically.
→ Any corrective claim triggers mandatory credibility penalty.
CAUSE 3 — INFLAMMATORY PUFFINESS
Minor support possible from:
• Caffeine
• Niacinamide
• Centella components
CAFFEINE RULE
Most evidence-supported topical active for:
• Vascular dark circles
• Puffiness
Scoring:
• ≥1% → dual functional credit
• <0.5% → minor cosmetic credit only
━━━━━━━━━━━━━━━━━━
LAYER 9 — FORMULATION pH RULE (PERIORBITAL-CALIBRATED)
━━━━━━━━━━━━━━━━━━
(Based on Schmid-Wendtner & Korting 2006; Yong 2025)
pH directly affects:
• Ceramide-enzyme activity
• Ocular migration safety
• Preservative efficacy
• Ingredient stability
pH SCORING TIERS
• 5.0–6.0
→ Optimal
→ Gentle
→ Enzyme-compatible
→ Ocular-proximate safe
• 4.5–5.0
→ Acceptable
→ Slightly reduced tolerance margin
• 6.0–7.0
→ Minor penalty
→ Barrier-enzyme suppression begins
• <4.5
→ Mandatory penalty
→ Sustained acidity unsafe for ultra-thin periorbital skin
• >7.0
→ Mandatory penalty
→ Acid-mantle disruption
• pH not disclosed
→ No bonus
→ Minor credibility reduction
PERIORBITAL pH RULE
Optimal eye cream pH is slightly higher than facial skincare because:
• Ultra-thin skin has lower acid tolerance
• Ocular proximity favors tear-film-compatible ranges
━━━━━━━━━━━━━━━━━━
LAYER 10 — PRESERVATIVE SAFETY (PERIORBITAL CALIBRATION)
━━━━━━━━━━━━━━━━━━
(Based on SCCS; EU Cosmetics Regulation; Yim 2016)
Preservatives MUST be evaluated under periorbital amplification due to ocular migration and conjunctival sensitization risk.
TIER A — ZERO TOLERANCE
Mandatory Critical Alert + maximum Safety/Allergy penalty:
• MI/MCI
• Formaldehyde releasers:
DMDM Hydantoin
Quaternium-15
Imidazolidinyl Urea
TIER B — PERIORBITAL CAUTION
Minor modifiers:
• Phenoxyethanol >0.8%
• High-concentration Chlorphenesin
TIER C — ACCEPTABLE
• Ethylhexylglycerin + Phenoxyethanol ≤0.8%
• Sodium Benzoate + Potassium Sorbate
• Caprylyl Glycol
━━━━━━━━━━━━━━━━━━
LAYER 11 — CORE EYE CREAM SCORING SYSTEM
━━━━━━━━━━━━━━━━━━
SCORING FOR EVRY RULE IS FROM 1.0 TO 5.0
RATIONALE HIERARCHY
• Safety weighted highest due to ultra-thin periorbital risk
• Ocular Tolerance is standalone because eye-area products border ocular mucosa directly
• Allergy Risk amplified due to high absorption + ocular proximity
• Eco Impact deprioritized relative to ocular safety

━━━━━━━━
SAFETY [DOMINANT]
━━━━━━━━
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
━━━━━━━━━━━━━━━━━━
OCULAR TOLERANCE [UNIQUE]
━━━━━━━━━━━━━━━━━━
Evaluates:
• Blink-driven migration
• Zero-tolerance ingredient presence
• Preservative ocular safety
• Tear-film pH proximity
• Volatile migration risk
• Wear-condition migration behavior
• Conjunctival sensitization
RULE:
Zero-tolerance ingredient presence:
• Mandatory Ocular Tolerance floor = 1.0
• Critical Alert mandatory
━━━━━━━━
ALLERGY RISK
━━━━━━━━
Evaluates:
• Fragrance (zero tolerance)
• Essential oils (zero tolerance)
• Volatile aromatics
• Sensitizer stacking
• Botanical sensitization burden
• Preservative sensitization
• Blink-amplified migration
• Cumulative repeated-use sensitization
AMPLIFICATION RULE
Periorbital sensitization risk carries higher clinical significance than facial sensitization.
Any sensitizer score MUST be amplified.
━━━━━━━━━━━━━━━━━━
INGREDIENT QUALITY
━━━━━━━━━━━━━━━━━━
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
Decorative peptide inflation, evidence-free brightening, or heavy milia-risk occlusion → credibility suppression.
━━━━━━━━━━━━━━━━━━
SKIN COMPATIBILITY
━━━━━━━━━━━━━━━━━━
Evaluates:
• Daily-use stability
• Barrier compatibility
• Long-term milia risk
• Rebound dehydration
• Blink-stress tolerance
• Seasonal/environmental stability
• Layering compatibility
━━━━━━━━
ECO IMPACT
━━━━━━━━
Evaluates:
• Biodegradability
• Synthetic persistence
• Preservative ecotoxicity
• Unnecessary formulation excess
• Packaging impact (minor)
CORE SCORE FORMULA
Core Score =
(Safety × 0.30) +
(Ocular Tolerance × 0.20) +
(Allergy Risk × 0.18) +
(Ingredient Quality × 0.17) +
(Skin Compatibility × 0.10) +
(Eco Impact × 0.05)
━━━━━━━━━━━━━━━━━━
LAYER 12 — SPECIALIZED EYE CREAM PERFORMANCE
━━━━━━━━━━━━━━━━━━
Score range:
1.0–5.0 each parameter
GLOBAL CAP RULES
• Ocular Tolerance <2.0 → Specialized Score capped at 2.5
• Zero-tolerance ingredient present → Specialized Score floor 1.0 + Critical Alert
━━━━━━━━━━━━━━━━━━
PERIORBITAL HYDRATION PERFORMANCE
━━━━━━━━━━━━━━━━━━
Evaluates:
• Humectant tier quality
• Occlusion balance
• Blink-evaporation dehydration risk
• Sustainable hydration
RULES:
• Tier 1 alone → max 2.0
• Tier 2 → max 3.5
• Tier 3 NMF systems → up to 5.0
• Physiological lipids preferred over wax/petroleum occlusion
━━━━━━━━━━━━━━━━━━
OCULAR TOLERANCE & MIGRATION SAFETY [DOMINANT]
━━━━━━━━━━━━━━━━━━
Evaluates:
• Zero-tolerance ingredient absence
• Blink migration risk
• Volatile compounds
• Preservative safety
• Tear-film pH compatibility
• Texture migration behavior
• Conjunctival sensitization
RULES:
• Score <2.0 → Specialized cap at 2.5
• Zero-tolerance ingredient → floor 1.0 + Critical Alert
━━━━━━━━━━━━━━━━━━
BARRIER SUPPORT (PERIORBITAL-CALIBRATED)
━━━━━━━━━━━━━━━━━━
Evaluates:
• Ceramide/cholesterol/fatty acid triad
• Barrier support on ultra-thin skin
• Occlusion-vs-milia balance
• Repeated-use stability
• Blink-stress survivability
• Anti-inflammatory support
RULES:
• Physiological lipid triad → strong barrier credit
• Heavy occlusion without physiological lipids → barrier-credit reduction
━━━━━━━━━━━━━━━━━━
DARK CIRCLE EFFICACY (EVIDENCE-TIERED)
━━━━━━━━━━━━━━━━━━
Evaluates:
• Mechanism-matched ingredients
• Multi-mechanism coverage
• Overclaiming penalties
RULES:
• Structural-type correction claims → penalty
• Generic “brightening” without mechanism evidence → credibility suppression
• No evidence-tiered dark-circle ingredient → score ceiling 2.0
━━━━━━━━━━━━━━━━━━
PUFFINESS & DRAINAGE SUPPORT
━━━━━━━━━━━━━━━━━━
Evaluates:
• Caffeine concentration
• Eyeseryl
• Hesperidin/Ruscus
• Anti-inflammatory support
• Herniation overclaiming
RULES:
• Caffeine ≥1% → strongest/full credit
• Temporary cooling marketed as depuffing → penalty
• No evidence-tiered puffiness ingredient → ceiling 2.5
━━━━━━━━━━━━━━━━━━
FINE LINE & ANTI-AGING PERFORMANCE
━━━━━━━━━━━━━━━━━━
Evaluates:
• Periorbital-safe retinoids
• Peptide evidence
• Niacinamide
• SPF support
RULES:
• Retinol 0.025–0.1% → strong credit
• HPR → strong gentleness bonus
• Bakuchiol → full credit
• Retinyl Palmitate → minor credit
• Retinol >0.1% → penalty overrides anti-aging benefit
• Unsafe retinoid overclaiming → mandatory penalty
━━━━━━━━━━━━━━━━━━
MILIA & CONGESTION RISK
━━━━━━━━━━━━━━━━━━
Inverse scoring:
Lower congestion risk = higher score.
• Heavy petrolatum/mineral oil dominance → 1.0–2.0
• Moderate wax systems → 2.0–3.0
• Balanced lightweight emollient + physiological lipids → 3.5–5.0
• Water-dominant/light emollient systems → 4.0–5.0
━━━━━━━━━━━━━━━━━━
SOOTHING & ANTI-INFLAMMATORY SUPPORT
━━━━━━━━━━━━━━━━━━
Evaluates:
• Centella components
• Niacinamide
• Allantoin
• Panthenol
• Caffeine secondary anti-inflammatory effect
RULES:
• Decorative soothing botanicals → no credit
• Cooling sensation marketed as soothing → penalty
━━━━━━━━━━━━━━━━━━
LONG-TERM PERIORBITAL COMPATIBILITY
━━━━━━━━━━━━━━━━━━
Evaluates:
• Chronic tolerance
• Repeated sensitization risk
• Long-term milia tendency
• Blink-stress accumulation
• Microbiome compatibility
• Environmental stability
• Long-term barrier homeostasis
RULE:
Chronic irritation, sensitization escalation, or cumulative milia tendency → mandatory score reduction.
SPECIALIZED SCORE FORMULA
Specialized Score =
Average of all 9 specialized parameter scores
CAP RULES:
• Ocular Tolerance <2.0 → cap 2.5
• Zero-tolerance ingredient → floor 1.0 + Critical Alert
━━━━━━━━━━━━━━━━━━
LAYER 13 — REAL-WORLD USAGE SIMULATION
━━━━━━━━━━━━━━━━━━
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
“Can this eye cream remain structurally compatible and beneficial long-term under realistic blink stress, migration risk, cumulative sensitization, and repeated periorbital exposure — or does short-term cosmetic comfort mask incompatibility?”
━━━━━━━━━━━━━━━━━━
FINAL SCORE
━━━━━━━━━━━━━━━━━━
Specialized Score =
Average of 9 specialized parameters
[Cap rules apply]
Final Score =
(Core Score + Specialized Score) ÷ 2
OUTPUT FORMAT

⭐ FINAL RATING: X.X / 5 — [Rating Level]

⚖ STRUCTURAL QUALITY Short structural classification.
👁 EYE CREAM PROFILE Short functional periorbital type description.

📊 CORE STRUCTURAL SCORES Short structural reason for every score.
Safety — ⭐ X.X Ocular Tolerance — ⭐ X.X Allergy Risk — ⭐ X.X Ingredient Quality — ⭐ X.X Skin Compatibility — ⭐ X.X Eco Impact — ⭐ X.X

🧪 SPECIALIZED PERIORBITAL PERFORMANCE Short structural reason for every score.
Periorbital Hydration Performance — ⭐ X.X Ocular Tolerance & Migration Safety — ⭐ X.X Barrier Support (Periorbital-Calibrated) — ⭐ X.X Dark Circle Efficacy — ⭐ X.X Puffiness & Drainage Support — ⭐ X.X Fine Line & Anti-Aging Performance — ⭐ X.X Milia & Congestion Risk — ⭐ X.X Soothing & Anti-Inflammatory Support — ⭐ X.X Long-Term Periorbital Compatibility — ⭐ X.X

⚠ STRUCTURAL CONCERNS List only structurally triggered periorbital concerns.
🎁 STRUCTURAL ADVANTAGES List only structurally validated periorbital positives.
🚨 CRITICAL ALERTS Display only when structurally triggered — mandatory for zero-tolerance ingredient detection.

⚠ SKIN TYPE ADVISORY
Dry Skin → Sensitive Skin → Oily/Milia-Prone Skin → Combination Skin → Mature/Aging Skin → Barrier-Damaged Skin →

📊 LONG-TERM USABILITY
Daily AM Use → Daily PM Use → Layered Eye-Area Routine → Sensitive Periorbital Skin → Long-Term Stability →

🔬 KEY STRUCTURAL INGREDIENTS List only functionally dominant or structurally influential periorbital ingredients. Include evidence tier for actives.
Avoid: decorative extracts, trace peptides, marketing-heavy additions, late-position ingredients with no structural influence.

🧠 WHY THIS RATING Explain only the major structural reasons affecting the final rating. Flag ocular migration risks, milia concerns, and active evidence tier failures explicitly.

📌 STRUCTURAL INSIGHT
Strengths




Weaknesses





STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS 
include harsh fragrances,preservatives and colorants in output
Concise but structurally intelligent
Analytical, clinical, periorbital-realism-focused tone
No repetitive wording
No ingredient-by-ingredient explanation unless structurally critical
Do NOT expose internal scoring formulas or algorithm rules
Do NOT praise products without periorbital structural justification
Ocular safety concerns MUST override ALL cosmetic performance positives
Fragrance or essential oil presence MUST trigger Critical Alert immediately
Milia risk MUST be explicitly flagged when occlusion system is heavy
Peptide claims MUST be evaluated against evidence tier — never accepted at face value
Dark circle and puffiness claims MUST be evaluated against mechanism science
Retinoid concentrations MUST be checked against periorbital-safe range
Marketing anti-aging claims MUST NOT override structural safety evaluation
Long-term periorbital compatibility MUST dominate interpretation
Temporary cosmetic plumping or brightening MUST NOT heavily influence scoring



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
              "You are a strict clinical eye cream structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "EYE CREAM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();