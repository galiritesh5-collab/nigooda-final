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

        serum_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL SERUM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

SERUM EVALUATION ALGORITHM —
LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward ONLY when structural usefulness is realistically demonstrated through:
Stable active system with credible delivery architecture
Barrier-compatible formulation design
Repeated-use tolerance sustainability
Low chronic irritation burden
Evidence-based active balance
Long-term skin compatibility
Structurally honest formulation
Stable solvent/vehicle system
Realistic dermatological outcome potential
Core evaluation question:
“Can skin realistically tolerate and benefit from this serum long-term?”
NOT:
“Does this serum appear cosmetically impressive?”
Penalty REQUIRED when formulation is primarily driven by:
Marketing-heavy active loading
Ingredient illusion systems
Decorative botanical loading
Sensory-first engineering
Cosmetic-only glow systems
Unstable active systems
Excessive active stacking without tolerance architecture
Irritation-driven brightening
Silicone masking systems
Fragrance-supported experience
Alcohol-heavy penetration systems
Hype-focused formulation design
Marketing-dominant structures MUST reduce score.

TRANSPARENCY PRIORITY RULE
High scores allowed ONLY when structural usefulness is realistically demonstrable.
Ignore:
Branding/luxury positioning
Ingredient hype/trend positioning
Long INCI lists used for label appeal
“Clinical strength” marketing
Peptide inflation claims
Niacinamide percentage marketing
Vitamin C concentration hype
Decorative “glass skin” or “barrier repair” claims
Decorative botanical extracts
Clean beauty positioning
Evaluate ONLY:
Structural honesty
Stability and delivery realism
Repeated-use tolerance
Barrier interaction behavior
Realistic skin outcome potential
Chronic irritation burden
pH compatibility
Long-term compatibility architecture
Traditional/herbal systems receive credibility ONLY when realistic compatibility and formulation balance are clearly evident.
Unverifiable usefulness → elite score prohibited.

GLOBAL ENFORCEMENT RULE
Applies across ALL layers.
Core structure overrides minor additives
Effectiveness cannot override instability, irritation burden, sensitization risk, or barrier stress
Late-position ingredients cannot neutralize fragrance-heavy, alcohol-heavy, acid-overloaded, or unstable systems
Hydration ≠ repair
Glow ≠ skin health
Comfort ≠ long-term compatibility
Decorative systems MUST reduce credibility
Repeated-use realism overrides short-term cosmetic performance
Concentration alone does NOT prove effectiveness
pH incompatibility between actives = structural formulation failure

STRUCTURE DOMINANCE RULE
Core architecture determines:
Irritation/sensitization risk
Barrier interaction behavior
Penetration profile
Active stability
Repeated-use tolerance
Long-term compatibility
Functional usefulness
Minor additives cannot override unstable or irritation-heavy core systems.
Functional support ingredients genuinely improving stability, buffering, tolerance, or barrier resilience MUST NOT be treated as decorative.
Ingredient value MUST be judged by:
Realistic concentration
Functional role
Stability requirements
Repeated-use behavior
Realistic contribution
NOT ingredient popularity.

LATE-INGREDIENT LIMIT RULE
Late-position ingredients mainly provide:
Surface comfort
Temporary hydration
Soothing
Texture refinement
They do NOT repair structural weakness.
Examples:
Late-position panthenol, aloe vera, vitamin E, allantoin, bisabolol, centella extracts, decorative peptides.
They cannot neutralize:
Alcohol-heavy systems
Fragrance exposure
Essential oil burden
Acid overloading
Unstable actives
Chronic barrier stress
Comfort ≠ structural repair.

FUNCTIONAL CONCENTRATION RULE
Higher concentration does NOT automatically improve quality.
Evidence-supported functional ranges:
Niacinamide: 2–5%; 10%+ = diminishing returns/flush risk
Salicylic acid: 0.5–2%; >2% leave-on increases irritation without proportional benefit
Glycolic acid: effectiveness depends on pH, not percentage alone
Retinol: 0.025–1%; tolerance-gated, not concentration-gated
L-Ascorbic acid: 10–20% at pH ≤3.5 optimal; >20% increases instability/reactivity
Ceramides: effective at low concentration
Peptides: concentration irrelevant if peptide lacks evidence
Excessive concentration used mainly for marketing visibility MUST NOT receive extra scoring advantage.
Aggressive concentration without tolerance balance MUST reduce compatibility confidence.
Functional realism overrides percentage marketing.

REPEATED-USE REALISM RULE
Serums MUST be evaluated through cumulative exposure behavior.
Simulate:
Irritation accumulation
Barrier fatigue
Delayed sensitization
Chronic penetration stress
Inflammation buildup from stacking
Rebound irritation
Long-term tolerance sustainability
Active stacking burden
Short-term glow may still receive major penalties when long-term irritation risk is elevated.
Repeated-use instability MUST suppress elite ratings.

LAYER 1 — VITAMIN C STABILITY CLASSIFICATION RULE
(Based on Telang 2013; Pinnell 2001; Lin 2003; Al-Niaimi 2017)
MANDATORY PRE-SCORING
All vitamin C forms MUST be classified before effectiveness/stability scoring.
Scientific basis:
Vitamin C effectiveness depends on biologically available L-ascorbic acid delivery. Stability is governed by oxidation, pH, packaging, and conversion efficiency of derivatives.

CLASS 1 — L-Ascorbic Acid (LAA)
Most biologically active form
Optimal pH: 2.5–3.5
Above pH 4.0 absorption declines sharply
Above pH 5.0 oxidation accelerates
Optimal concentration: 10–20%
20% increases instability/reactivity
High oxidation risk from air/light exposure
Stable appearance: clear/pale yellow
Orange/brown = oxidation/reduced efficacy
Preferred systems: anhydrous/water-minimized + opaque/airless packaging
Scoring:
High effectiveness credit ONLY when pH ≤3.5 AND packaging is stability-appropriate
pH >4.0 or open/clear packaging → major Active Stability reduction
Compatibility:
pH 2.5–3.5 inherently increases acidity burden
Sensitive/barrier-damaged skin requires Safety and Barrier Compatibility reduction

CLASS 2 — Ascorbyl Glucoside (AA2G)
Stable water-soluble derivative
pH stability: 5.0–7.0
Moderate conversion efficiency
Effective around 2%
Lower bioavailability than LAA but more stable
Scoring:
Moderate effectiveness
Strong stability credit
Sensitive-skin compatible

CLASS 3 — Sodium Ascorbyl Phosphate (SAP)
Stable water-soluble derivative
pH stability: 5.5–7.0
Moderate conversion efficiency
Antimicrobial/acne-supportive properties
Scoring:
Moderate effectiveness
Strong stability
Acne-prone compatibility bonus

CLASS 4 — ATIP / THDC
(Ascorbyl Tetraisopalmitate / Tetrahexyldecyl Ascorbate)
Oil-soluble
Excellent anhydrous stability
Good penetration
Good conversion efficiency
Scoring:
Good effectiveness
Strong stability
Dry/mature skin compatibility

CLASS 5 — Magnesium Ascorbyl Phosphate (MAP)
Water-soluble
Gentle/stable
pH stability: 6.0–7.0
Moderate conversion efficiency
Effective around 10%
Scoring:
Moderate effectiveness
Sensitive-skin compatible
Lower irritation than LAA

OXIDATION PENALTY RULE
Open-jar packaging, LAA pH >4.5, or orange/brown discoloration → reduce Active Stability by 1.0–1.5 points.

LAYER 2 — RETINOID CLASSIFICATION & CONVERSION HIERARCHY
(Based on Mukherjee 2006; Spierings 2021; Zasada 2019)
MANDATORY RETINOID PRE-SCORING
All retinoid serums MUST classify retinoid form before effectiveness and irritation scoring.
Scientific basis:
Retinoids act via retinoic acid receptor binding. Cosmetic retinoids require conversion steps; more conversion steps reduce effectiveness ceiling and irritation intensity.
Conversion hierarchy:
Form
Conversion
Irritation
Speed
Effectiveness Ceiling
Retinoic acid
0
Highest
Fastest
Gold standard
Retinaldehyde
1
High
Fast
Near-prescription
Retinol
2
Moderate
Moderate
Established
HPR
Direct agonist
Low
Moderate
Strong cosmetic
Retinyl esters
3+
Lowest
Slowest
Weakest


RETINOID SCORING RULES
Retinaldehyde
High effectiveness credit
Elevated irritation burden
Mandatory tolerance architecture:
ceramides, panthenol, niacinamide, etc.
Retinol
Good effectiveness at ≥0.1%
<0.025% = marginal effectiveness
Moderate irritation burden
Oxidation-sensitive; open-jar packaging reduces Active Stability
Optimal stability pH: 5.0–6.0
HPR (Granactive Retinoid)
Good effectiveness
Lower irritation than retinol
Barrier Compatibility credit
Sensitive-skin suitable with support architecture
Retinyl Esters
Low effectiveness due to weak conversion
Suitable mainly for maintenance use
Marketing inflation penalty if positioned equivalent to retinol
Low irritation → Skin Compatibility credit

RETINOID STACKING PENALTY
Multiple retinoids in one formulation → reduce Ingredient Quality (usually marketing-driven, not conversion-enhancing).

RETINOID-ACID INTERACTION PENALTY
Retinoid + active AHA/BHA in same formulation → mandatory Safety and Barrier Compatibility reduction due to over-exfoliation risk.

LAYER 3 — ACID EXFOLIANT pH-DOSE FRAMEWORK
(Based on Kornhauser 2010; Smith 1996; Tang 2018; Stiller 1996)
ACID CLASSIFICATION REQUIREMENT
All acid serums require pH and acid classification before effectiveness/safety scoring.
Scientific basis:
Exfoliation efficacy depends on free acid concentration, governed by BOTH pH and percentage.
For glycolic acid:
pH 3.0 ≈ 88% free acid
pH 4.0 ≈ 41%
pH 4.5 ≈ 18%
Effectiveness and irritation scale with free acid availability, not label percentage alone.

ACID CLASSES
AHAs
Glycolic acid: deepest penetration/highest irritation
Lactic acid: gentler + humectant/NMF component
Mandelic acid: slow penetration/lowest irritation
Malic, tartaric, citric: supportive weaker exfoliants
BHAs
Salicylic acid:
lipophilic, comedolytic, anti-inflammatory
Optimal concentration: 0.5–2%
Optimal pH: 3.0–4.0
PHAs
Gluconolactone, lactobionic acid
Large molecules/slower penetration
Gentle, humectant, antioxidant
Minimal barrier stress
Sensitive-skin suitable

pH-DOSE SAFETY TIERS
pH
Irritation Risk
Scoring Impact
<3.0
Very high
Safety + Barrier penalty
3.0–3.5
High but validated
Tolerance support required
3.5–4.0
Moderate
Acceptable; sensitive-skin caution
4.0–4.5
Low-moderate
Well tolerated
>4.5
Minimal exfoliation
Reduce Effectiveness


ACID STACKING RULE
PHA + low BHA → acceptable
AHA + low BHA → repeated-use risk
High AHA + high BHA at pH <3.5 → mandatory Safety and Barrier Compatibility reduction

ACID-RETINOID COMBINATION PENALTY
Active acid + active retinoid in same product → reduce Safety and Long-Term Tolerance.

NMF-AHA BONUS
Lactic acid in formulation-dominant position receives small dual-function bonus due to exfoliation + NMF humectant role.

LAYER 4 — PENETRATION ENHANCER & SOLVENT CLASSIFICATION
(Based on Williams 2004; Karande 2004; Benson 2005)
VEHICLE SYSTEM EVALUATION
Vehicle systems determine:
Bioavailability
Barrier interaction
Penetration profile
Irritation potential
Penetration enhancers improve delivery by disrupting SC lipids/proteins but simultaneously increase irritation/barrier disruption risk.
Classification REQUIRED before delivery efficiency and barrier compatibility scoring.

PENETRATION ENHANCER CLASSES
CLASS A — Alcohol Solvents
(SD alcohol, denatured alcohol, ethanol dominant >5%)
Mechanism:
Lipid extraction
Protein denaturation
Effects:
Rapid delivery
Rapid evaporation
Tightening sensation
Risks:
Barrier disruption
Dryness
Microbiome stress
Irritation accumulation
Scoring:
Reduce Safety, Barrier Compatibility, and Long-Term Tolerance proportionally to dominance.

CLASS B — Glycol Solvents
(Propylene glycol, butylene glycol, pentylene glycol, propanediol, caprylyl glycol)
Mechanism:
Hydration-mediated penetration enhancement
Profile:
Generally well tolerated
Low-moderate barrier interaction
Notes:
High propylene glycol may sensitize
Pentylene/propanediol better tolerated
Scoring:
Minor safety concern only when dominant.

CLASS C — Fatty Acid Enhancers
(Oleic, linoleic, lauric acid)
Mechanism:
SC lipid fluidization
Scoring:
Oleic dominant → barrier disruption concern
Linoleic dominant → barrier-supportive credit

CLASS D — Surfactant Enhancers
(SLES, polysorbates in leave-on systems)
High disruption potential
Penalize Safety if dominant

CLASS E — Terpenes & Essential Oils
(Menthol, limonene, linalool, eugenol)
Mechanism:
Lipid fluidization penetration enhancement
Dual risk:
Penetration enhancement
Sensitization
Scoring:
Mandatory Safety and Allergy Risk reduction when dominant.

SOLVENT SYSTEM SCORING RULE
Water-dominant + glycol support → baseline
Glycol-dominant → moderate penetration/good tolerance
Alcohol-dominant → elevated barrier disruption penalty
Oil-dominant → assess comedogenicity + fatty acid behavior
Silicone-dominant → low penetration/low irritation; assess eco impact
LAYER 5 — PEPTIDE EVIDENCE TIERING RULE
(Based on Gorouhi 2009; Pai 2021; Robinson 2018)
PEPTIDE CLASS EVALUATION
Scientific basis:
Peptide efficacy varies substantially by peptide class, delivery realism, and evidence quality. Some peptides possess meaningful clinical support; many are primarily marketing constructs. Classification is REQUIRED before scoring peptide-containing serums.

EVIDENCE TIERS
TIER 1 — Strong Clinical Evidence
(Meaningful effectiveness credit)
Palmitoyl pentapeptide-4 (Matrixyl):
collagen I/III + fibronectin stimulation
Copper tripeptide-1 (GHK-Cu):
wound healing, collagen synthesis, anti-inflammatory activity
Matrixyl 3000:
palmitoyl tripeptide-1 + hexapeptide-12; collagen + HA support
Acetyl hexapeptide-3/8 (Argireline):
documented neurotransmitter-modulating activity; topical effect limited but supported
Scoring:
Tier 1 peptides in formulation-dominant position → moderate effectiveness credit.

TIER 2 — Moderate Evidence
(Moderate credit; inflation risk noted)
Palmitoyl tetrapeptide-7
Tripeptide-1
Mixed palmitoyl oligopeptide systems
Scoring:
Minor-moderate credit with potential marketing inflation flag.

TIER 3 — Weak / In Vitro / Unverified Evidence
(Minimal credit; high inflation risk)
Includes:
Proprietary peptides lacking independent peer-reviewed evidence
Peptides listed mainly for label appeal
Tier 1 peptides heavily underdosed or positioned after 20+ ingredients
Scoring:
Negligible effectiveness credit
Ingredient Quality reduction when used primarily for marketing inflation
Multiple Tier 3/unverifiable peptides in one formula → active stacking inflation penalty.

LAYER 6 — NIACINAMIDE SCIENCE RULE
(Based on Bissett 2005; Hakozaki 2002; Tanno 2000; CIR 2020)
NIACINAMIDE EVALUATION FRAMEWORK
Scientific basis:
Niacinamide is a well-supported multi-pathway active, but concentration marketing frequently exceeds evidence-supported usefulness.

EVIDENCE-SUPPORTED CONCENTRATION RANGES
2%:
measurable melanin-transfer inhibition + barrier support
4–5%:
optimal evidence-supported range for barrier reinforcement, sebum control, anti-inflammatory activity, and pigmentation improvement
10%:
some supporting evidence but increased flush/redness risk with diminishing returns
10%:
no meaningful additional evidence-supported benefit; likely marketing-driven

pH COMPATIBILITY
Stable across pH 4.0–7.0
At pH <3.0, niacinamide may convert to niacin (nicotinic acid), increasing flushing risk
Niacinamide + high-concentration LAA at low pH → compatibility reduction due to possible nicotinic acid conversion

FORMULATION POSITION RULE
Top-5 placement at functional concentration → functional concentration credit
High-percentage claims with ingredient listed after 15+ ingredients → label-inflation signal; reduce Ingredient Quality

LAYER 7 — ACTIVE INTERACTION & STACKING FRAMEWORK
(Based on Kornhauser 2010; Leyden 2017; formulation chemistry principles)
ACTIVE COMBINATION EVALUATION
Purpose:
Determine whether active combinations create:
Synergy
Neutral coexistence
Cumulative irritation/barrier stress

SYNERGISTIC COMBINATIONS
(Positive modifier)
Niacinamide + retinol:
irritation buffering + compatible pH synergy
Lactic acid + hyaluronic acid:
exfoliation + hydration replenishment
LAA + vitamin E + ferulic acid:
established antioxidant synergy; ferulic stabilizes LAA and enhances photoprotection
Salicylic acid + niacinamide:
anti-inflammatory + comedolytic complementarity
Ceramides + peptides:
barrier support + collagen support; low interaction risk

NEUTRAL COMBINATIONS
(No modifier)
Hyaluronic acid + glycerin
PHA + panthenol
Most peptide combinations lacking documented interaction evidence

CONFLICTING / STRESS-AMPLIFYING COMBINATIONS
(Negative modifier)
LAA + niacinamide at pH <3.5:
nicotinic acid conversion risk → compatibility reduction
Active AHA/BHA + retinoid:
cumulative desquamation overload → Safety and Barrier Compatibility reduction
Multiple low-pH AHAs:
additive acid burden beyond individual contribution
Fragrance + alcohol-heavy base:
amplified sensitization pathway
Essential oil enhancers + active acids:
increased irritant penetration → Safety reduction

STACKING PENALTY SCALE
2 conflicting actives:
moderate Safety + Long-Term Tolerance penalty
3+ conflicting actives:
significant penalty + Critical Alert flag
High active density without tolerance-buffering support
(ceramides, panthenol, niacinamide, allantoin in relevant positions)
→ reduce Barrier Compatibility and Long-Term Tolerance.

LAYER 8 — MICROBIOME INTERACTION MODIFIER
(Based on Frontiers Microbiology 2025; Ann Dermatol 2025; Wiley IJCS 2026)
NOTE:
Microbiome evidence remains preliminary.
This layer is a MINOR modifier ONLY and cannot independently override Safety, Allergy Risk, or Barrier Compatibility.

MICROBIOME DISRUPTION RISKS
High-position MI/MCI or formaldehyde-releasing preservatives
Dominant SD alcohol/denatured alcohol systems
Strong antimicrobial botanicals in dominant positions
Repeated leave-on exposure below pH 3.5

MICROBIOME-SUPPORTIVE FACTORS
Clinically supported fermented ingredients
Prebiotic saccharides supporting commensals
Postbiotic bacterial lysates
Application:
Minor positive/negative modifier to Long-Term Skin Compatibility ONLY.
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no serum performance, barrier, or long-term skin benefit and may increase unnecessary irritation burden.

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


LAYER 9 — CORE SCORING SYSTEM
EVALUATED FROM 1.0 STAR TO 5.0 STAR


SAFETY [DOMINANT]
Evaluates:
Irritation burden from acids, retinoids, alcohol, and enhancers
Barrier disruption risk
Sensitization risk
Penetration-enhanced irritant delivery
Instability/degradation exposure
Chronic inflammation risk
Repeated-use barrier stress
Interaction-driven irritation amplification
Rules:
Hidden low-level cumulative irritation MUST reduce Safety
Penetration enhancers amplify BOTH active and irritant delivery
Fragrance/essential oils + penetration enhancers = multiplied irritation risk
Safety overrides:
Cosmetic elegance
Sensory appeal
Luxury positioning
Ingredient hype
Marketing claims
Short-term glow

EFFECTIVENESS
Core question:
Can the serum realistically provide sustainable long-term functional benefit?
Evaluates:
Active stability and delivery realism
Vitamin C/retinoid/acid classification quality
pH-active compatibility
Evidence-supported concentration realism
Synergy vs conflict
Vehicle compatibility
Repeated-use consistency
Realistic functional contribution
Ignore:
Branding
Marketing claims
“Clinical” positioning
Viral popularity
Ingredient hype
Unstable, oxidized, poorly formulated, or hype-driven systems MUST receive effectiveness suppression.

ALLERGY RISK
Evaluates:
Fragrance allergens
Sensitizing essential oils
Penetration-enhanced sensitizer delivery
Botanical sensitizer loading
Preservative sensitization risk
Differentiation between irritation and sensitization
Repeated-exposure sensitization accumulation
Eye-area migration risk
Rules:
Multiple sensitizers + penetration enhancement → mandatory strong reduction
Leave-on exposure substantially increases sensitization importance

ECO IMPACT
Evaluates:
Biodegradability
Silicone persistence
Microplastic potential
Petroleum dependency
Ecological accumulation
Moderate strictness:
Minor eco advantages cannot override major structural weaknesses.

INGREDIENT QUALITY
Evaluates:
Structural honesty
Synergy vs stacking inflation
Stability architecture
Absence of decorative loading
Rational concentration logic
Vehicle-active compatibility
Preservative quality
pH-active compatibility
Rules:
Decorative-heavy, hype-heavy, or marketing-driven systems reduce score
Complexity alone does NOT improve quality
More actives ≠ better formulation
Active Stacking Quality Rule:
Multiple trendy actives stacked mainly for label appeal reduce Ingredient Quality.
Only documented synergy or neutral coexistence receives full credit.

SKIN COMPATIBILITY
Evaluates:
Daily usability
Long-term tolerance
Barrier compatibility
Sensitive-skin usability
Acne-prone suitability
Chronic irritation sustainability
Tolerance resilience
Microbiome modifier (Layer 8)
Rules:
Hydration ≠ compatibility
Short-term comfort ≠ long-term tolerance
Aggressive active systems CANNOT achieve elite compatibility without strong tolerance-buffering architecture
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)
LAYER 10 — SPECIALIZED PERFORMANCE
Evaluates real repeated-use serum behavior under long-term exposure conditions.
Score Range:
1.0 → 5.0

ACTIVE DELIVERY EFFICIENCY
Evaluates:
Vehicle-dependent delivery realism
Penetration system effectiveness
pH-dependent bioavailability
Free-acid availability for exfoliants
Vitamin C class delivery realism
Retinoid conversion efficiency
Delivery stability over product lifespan
Penetration enhancement vs irritation tradeoff
Rules:
Underpowered delivery → reduced functional usefulness
Excessively aggressive delivery → increased irritation burden
Aggressive penetration systems MUST reduce tolerance confidence even when effectiveness is high
Vitamin C delivery hierarchy:
LAA > stable water-soluble derivatives > oil-soluble derivatives
(applied relative to target skin context)

BARRIER COMPATIBILITY [DOMINANT]
Evaluates:
Barrier resilience during repeated active exposure
Penetration enhancer/barrier interaction
Irritation-buffering architecture
Acid stress proportional to pH + free acid level
Retinoid irritation proportional to conversion hierarchy
Long-term resilience maintenance
Inflammation-control architecture
Relevant tolerance-support ingredients:
Ceramides, niacinamide, panthenol, allantoin, bisabolol in meaningful positions.
Rules:
Repeated barrier stress or cumulative irritation → mandatory reduction
Short-term glow cannot override chronic barrier burden
Barrier Compatibility remains the dominant serum parameter
Tolerance Architecture Bonus:
Active exfoliant/retinoid systems containing meaningful barrier-supportive co-ingredients in non-late positions receive a small Barrier Compatibility bonus.

ACTIVE STABILITY
Evaluates:
Vitamin C class-specific stability
Retinoid oxidation resistance
Acid stability across pH range
Packaging suitability
Real-world open-container stability
pH maintenance across lifespan
Packaging Rules:
Airless/opaque preferred for LAA and retinol
Standard packaging acceptable for stable derivatives

OXIDATION RISK PENALTY
LAA in transparent/open-jar packaging → major stability reduction
Retinol in transparent pump/jar → moderate stability reduction
Brown/orange discoloration, separation, rancidity → maximum stability reduction
Unstable active systems MUST:
Reduce Effectiveness confidence
Trigger Critical Alert

IRRITATION ACCUMULATION RISK
Evaluates:
Chronic acid exposure burden
Retinoid irritation trajectory
Alcohol/penetration-enhancer stress
Sensitizer accumulation
Preservative irritation burden
Interaction-amplified irritation
Long-term inflammatory accumulation
Rules:
Low visible irritation ≠ low long-term stress
Repeated irritation accumulation → mandatory reduction

CUMULATIVE BURDEN CALCULATION
Burden weights accumulate additively.
High burden:
Alcohol-dominant systems
MI/MCI preservatives
Significant burden:
Fragrance in leave-on products
Essential oils in functional positions
Moderate-high burden:
Active pH below 3.0
Moderate burden:
Multiple stacked acids
Retinaldehyde/high-concentration retinol
Final irritation risk reflects cumulative burden sum.

LONG-TERM TOLERANCE
Evaluates:
Daily usability sustainability
Realistic adaptation trajectory
6–12 month compatibility
Repeated-use comfort stability
Tolerance-instability risk
Long-term microbiome compatibility
Rules:
Short-term elegance ≠ long-term tolerance
Retinoid/acid adaptation is clinically real and should not be scored as permanent intolerance
Fragrance sensitization is NOT adaptive and worsens with repeated exposure
These scenarios MUST be distinguished.

SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all specialized parameters.
All parameters carry equal numerical weight.
Interpretive dominance:
Barrier Compatibility remains the dominant specialized parameter.

LAYER 10.5 — REAL-WORLD USAGE SIMULATION
Simulate:
Daily serum exposure
Weekly irritation accumulation
Oxidation progression during open-container use
Barrier recovery vs active stress cycles
Long-term tolerance adaptation or sensitization
Endogenous response to repeated exposure
Long-term microbiome stability
Core question:
Can skin realistically tolerate and benefit from this serum long-term?
One-time cosmetic performance is insufficient.

LAYER 11 — ANTI-MARKETING FILTER
Penalty REQUIRED for:
Excess fragrance loading
Luxury sensory masking of structural weakness
Decorative botanical inflation
Texture-first engineering over delivery quality
Active marketing without stability architecture
“Glass skin” / “barrier repair” claims lacking repair architecture
Unstable vitamin C without stability disclosure
Retinyl esters marketed equivalent to retinol
Tier 3 peptide inflation
Niacinamide percentage marketing beyond evidence-supported usefulness
Active stacking mainly for label appeal
Influencer-focused design lacking structural rationale
Marketing dominance → visible score reduction.
Marketing excitement ≠ structural usefulness.

HIGH SCORE ELIGIBILITY RULE
Scores >4.0 require structural excellence across:
Stable active system with correct pH + packaging architecture
Low chronic irritation burden
Evidence-supported active concentrations
Strong Barrier Compatibility with tolerance architecture
Rational active combinations
Long-term tolerance sustainability
Honest formulation design
Structurally justified vehicle system
The following MUST disqualify elite scoring:
Meaningful fragrance loading
Unstable active systems
Conflicting active combinations
Alcohol-dominant systems without tolerance support
Excessive active stacking
OUTPUT FORMAT
⭐ FINAL RATING X.X / 5 — Rating Level
⚖ STRUCTURAL QUALITY
Short evidence-based classification of the serum's overall active architecture quality, stability profile, vehicle system, irritation burden, and expected long-term skin outcome.
🧴 SERUM PROFILE
Short functional serum classification. Examples:
Stable Antioxidant Serum (LAA class, appropriate pH)
Unstable Vitamin C Marketing Serum
Retinoid Tolerance Serum (HPR-based, low irritation)
Aggressive Acid Exfoliant Serum
Balanced Niacinamide Barrier Serum
Peptide-Supported Barrier Serum (Tier 1 evidence)
Decorative Botanical Serum (marketing-dominant)
Alcohol-Heavy Penetration Serum
Fragrance-Heavy Luxury Serum
Balanced Multi-Active Serum
📊 CORE SCORES (Short structural reason for every score)
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
🧪 SPECIALIZED PERFORMANCE (Short structural reason for every score)
Active Delivery Efficiency — ⭐X.X
Barrier Compatibility — ⭐X.X
Active Stability — ⭐X.X
Irritation Accumulation Risk — ⭐X.X
Long-Term Tolerance — ⭐X.X

👍 STRENGTHS
Major evidence-based structural advantage
Major evidence-based structural advantage
Major evidence-based structural advantage
⚠ CONCERNS
Major structural concern with evidence basis
Major structural concern with evidence basis
Major structural concern with evidence basis
🚨 CRITICAL ALERTS (Only when structurally triggered)
Examples:
Oxidized/unstable vitamin C system — reduced efficacy and free radical risk
Active acid + retinoid combination — over-exfoliation risk under daily use
High-concentration alcohol base — repeated barrier disruption risk
MI/MCI preservative in leave-on — documented sensitizer; EU restricted
Fragrance + penetration enhancer — amplified sensitization delivery
Multiple conflicting actives — chronic irritation accumulation risk
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X
Oily Skin → ⭐X.X
Combination Skin → ⭐X.X
Sensitive Skin → ⭐X.X
Acne-Prone Skin → ⭐X.X
Barrier-Damaged Skin → ⭐X.X
📅 LONG-TERM USABILITY
Daily Use → ⭐X.X
Twice Daily Use → ⭐X.X
Long-Term Use (6–12 months) → ⭐X.X
Sensitive Skin Use → ⭐X.X
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 Days)
Active delivery and absorption feel
Initial skin response (irritation, brightness, tightening)
Tolerance indicators
Medium-Term (2–8 Weeks)
Visible active outcome (pigmentation, texture, firmness, acne)
Barrier response and adaptation
Oil balance and congestion trends
Tolerance development trajectory
Long-Term (2–12 Months)
Barrier resilience or stress accumulation
Active system stability under real-world use
Sensitization risk trajectory
Cumulative irritation or skin health improvement
Microbiome stability
Realistic dermatological outcome trajectory
Realistic Dermatological Outcome
One concise conclusion covering: active system effectiveness, irritation burden under repeated use, expected long-term skin trajectory, and whether outcome is cosmetic-driven or structurally beneficial.
🔬 KEY STRUCTURAL INGREDIENTS
List only functionally dominant ingredients affecting:
Active delivery system (class and stability noted)
Barrier compatibility architecture
Irritation and penetration behavior
Sensitization risk
Long-term tolerance factors
Vehicle and solvent system
🧠 WHY THIS RATING
3–5 concise evidence-based sentences focusing on:
Active system quality and stability architecture
Irritation and barrier burden assessment
Active combination assessment (synergy or conflict)
Vehicle and penetration system evaluation
Long-term tolerance realism
📌 STRUCTURAL INSIGHT
Strengths
X
X
X
Weaknesses
X
X
X
⚠ STRICT OUTPUT RULES
Maintain strict dermatological evaluation principles:
DONT DO ANY MEDICAL CLAIMS
Harsh fragrances,preservatives and colorants should come in output
No marketing influence
No luxury/sensory bias
No branding influence
No ingredient-count bias
Structural weakness overrides cosmetic feel
Fragrance burden must be reflected in scoring
Repeated-use behavior > first-use feel
Long-term outcome > immediate sensation
Short-term glow ≠ structural improvement
Stability-compromised actives ≠ effective actives
Vitamin C class and stability architecture MUST be assessed before effectiveness scoring
Retinoid conversion hierarchy MUST be applied before irritation and effectiveness scoring
Acid free-acid bioavailability MUST be evaluated with pH context, not concentration alone
Active interaction assessment is MANDATORY for any multi-active formulation
Vehicle system MUST be classified before barrier compatibility scoring
Peptide tier classification MUST be applied before any peptide effectiveness credit


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
              "You are a strict clinical serum structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "CLINICAL SERUM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();