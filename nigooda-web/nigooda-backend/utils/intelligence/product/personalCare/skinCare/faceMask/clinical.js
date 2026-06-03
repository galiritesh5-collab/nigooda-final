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

        face_pack_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL FACE PACK ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

FACE MASK / FACE PACK EVALUATION ALGORITHM — VERSION A

LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward face masks ONLY when clear structural usefulness is demonstrated through:
Mask-type-appropriate occlusion behavior
Barrier-compatible active delivery
Realistic post-mask skin outcome
Repeated-use tolerance calibrated to frequency
Honest formulation design matched to mask exposure type
Low rebound dehydration or irritation tendency
Structural compatibility between mask type, active concentration, and skin exposure duration
Penalty is REQUIRED when formulations are driven mainly by:
Marketing-focused "detox" or "glow" claims without structural support
Clay over-stripping presented as purification
Fragrance or essential oil presence amplified by occlusion enhancement
Active inflation unsafe under occlusive penetration conditions
Sheet mask essence designed for sensory pleasure over structural usefulness
Sleeping mask occlusion without barrier-supportive architecture
Peel-off masks with aggressive adhesion stripping
Temporary brightening masking structural dehydration
Luxury texture engineering without functional occlusion logic
Ingredient concentrations unsafe under mask occlusion enhancement
Marketing-dominant mask structures relying on temporary sensation or cosmetic glow MUST face credibility suppression.

TRANSPARENCY PRIORITY RULE
High scores allowed ONLY when realistic mask-type structural usefulness is clearly demonstrable.
Ignore:
"Detox" and purification marketing
Glow, glass skin, or instant radiance claims
Rare mineral or clay branding
Luxury packaging and sensory texture
Celebrity or influencer endorsement positioning
Clinical-style claims without peer-reviewed mask-specific evidence
Fermentation or botanical storytelling without functional evidence
Evaluate ONLY:
Mask type structural compatibility
Occlusion-penetration safety of active concentrations
Realistic post-mask skin outcome
Rebound dehydration or barrier stress risk
Rinse-off vs leave-on exposure calibration
Repeated-use frequency tolerance
Honest active delivery realism
Substrate safety (for sheet masks)
Clay mineral safety and dehydration risk (for clay masks)

GLOBAL ENFORCEMENT RULE
Applies across ALL evaluation layers.
Mask type determines exposure duration and occlusion intensity — these override ingredient face-value evaluation
Active concentrations MUST be re-evaluated under occlusion enhancement (2–10x penetration increase)
Clay over-stripping cannot be neutralized by late-position humectants
Fragrance in masks is amplified by occlusion — penalty amplified accordingly
Temporary post-mask glow does NOT equal structural skin improvement
Rebound dehydration post-clay or post-peel MUST suppress scoring
Rinse-off exposure reduces but does NOT eliminate sensitization risk
Sleeping mask leave-on rules approach leave-on product strictness
Safety penalties override ALL post-mask cosmetic appearance claims
Repeated weekly or twice-weekly use MUST be factored into cumulative exposure scoring

FOUNDATION PHILOSOPHY
The engine MUST behave like:
An occlusion-penetration safety auditor
A mask-type exposure realism evaluator
A barrier rebound and dehydration risk assessor
A structural dermatology engine calibrated to mask exposure dynamics
A repeated weekly-use tolerance system
NOT like:
A post-mask glow reviewer
A sensory texture evaluator
A marketing-claim validator
A single-use cosmetic result scorer
Core Question: "Does this mask deliver genuine structural skin benefit under its specific occlusion type and exposure duration — or does it create a temporary cosmetic illusion while increasing rebound dehydration, barrier stress, or sensitization risk?"

LAYER 1 — MASK TYPE CLASSIFICATION SYSTEM
Critical rule: Mask type MUST be identified before any ingredient or scoring evaluation. The same ingredient behaves differently under different mask exposure conditions. Scoring without type classification produces unreliable results.

TYPE 1 — CLAY / KAOLIN / MUD MASKS
Occlusion behavior: Initial mild occlusion during wet phase → transitions to active dehydration as clay dries → significant TEWL increase post-removal if over-dried
Exposure duration: Typically 10–20 minutes
Penetration enhancement: Low-moderate during wet phase; reduced during dry phase
Primary mechanism: Adsorption of sebum, surface debris, and excess water from stratum corneum surface
Key risks:
Over-drying and TEWL increase from extended application
Rebound dehydration if humectant system is weak
Disruption of acid mantle through alkaline mineral content (many clays have natural pH 7–9)
Fragrance amplification during initial wet-occlusion phase
Scoring calibration: Clay masks evaluated primarily on clay mineral quality, humectant rebalancing system, pH management, dehydration rebound risk, and post-rinse barrier recovery support.

TYPE 2 — SHEET MASKS (Cotton, Hydrogel, Bio-cellulose, Tencel)
Occlusion behavior: Moderate to high occlusion depending on substrate — bio-cellulose highest, cotton lowest
Exposure duration: Typically 15–30 minutes
Penetration enhancement: 2–5x vs leave-on for cotton; up to 10x for bio-cellulose (Lim et al. 2023)
Primary mechanism: Forced essence delivery under occlusion pressure; hydration loading; active penetration under skin-contact pressure
Substrate-specific risk:
Bio-cellulose: highest penetration enhancement → ingredient concentration safety most critical
Hydrogel: high adhesion, high cooling effect, moderate penetration enhancement
Cotton: lowest penetration enhancement → some fragrance or mild irritant risk remains
Tencel (lyocell): biodegradable, moderate occlusion, mid-range penetration
Key risks:
Fragrance and essential oil amplification under occlusion — highest risk category among mask types
Active concentration unsafe under enhanced penetration (AHAs, retinol, niacinamide at high %)
Post-mask rebound dehydration from over-hydration followed by rapid TEWL normalization
Essence pH and active compatibility under occlusion pressure
Scoring calibration: Sheet masks evaluated on essence structural quality, substrate safety, active concentration occlusion-safety, post-mask barrier behavior, and sensitizer amplification risk.

TYPE 3 — SLEEPING MASKS / OVERNIGHT MASKS
Occlusion behavior: Sustained moderate-to-high occlusion for 6–8 hours
Exposure duration: 6–8 hours continuous
Penetration enhancement: Sustained enhancement over full night — comparable to 3–5x leave-on serum exposure
Primary mechanism: Extended-duration barrier support, humectant loading, occlusive moisture trapping, sustained active delivery
Key risks:
Most leave-on-like of all mask types — sensitization and irritation risks approach leave-on product levels
Fragrance and essential oil exposure over 6–8 hours → maximum sensitization risk
Heavy occlusion → milia risk on repeated use (especially in sebaceous-deficient or congestion-prone skin)
Sustained active delivery → retinoid, acid, or niacinamide (high %) concentration must meet leave-on safety standards
Pillow friction mechanical irritation during sleep
Scoring calibration: Sleeping masks evaluated under near leave-on strictness. Milia risk, fragrance tolerance at extended exposure, active concentration leave-on safety, and occlusion-barrier balance are primary evaluation axes.

TYPE 4 — CREAM / GEL WASH-OFF MASKS
Occlusion behavior: Mild occlusion during application period
Exposure duration: 5–15 minutes typically
Penetration enhancement: Low — shorter contact time limits enhancement
Primary mechanism: Hydration loading, surface-level active delivery, cleansing support, soothing support
Key risks:
Lower penetration risk than sheet or sleeping masks
Fragrance still amplified by mild occlusion
Rinse-off limits sustained sensitization vs leave-on
Active pH and concentration still matters for contact-duration safety
Scoring calibration: Moderate strictness. Evaluated on formulation balance, active moderation, humectant quality, and post-rinse skin feel realism.

TYPE 5 — PEEL-OFF MASKS
Occlusion behavior: Film-forming occlusion during drying → physical mechanical stripping on removal
Exposure duration: 20–30 minutes (drying time)
Penetration enhancement: Moderate during wet film phase
Primary mechanism: Film-forming polymer adhesion → physical removal of surface keratinocytes, sebaceous material, and surface debris on peeling
Key risks:
Mechanical stripping of viable keratinocytes — TEWL increase post-peel
Polyvinyl alcohol (PVA) or similar film-formers → barrier disruption on removal
Fragrance trapped under film during drying phase
Risk of epidermal damage on aggressive peeling, hair follicle trauma
Repeated use → cumulative barrier stripping
Scoring calibration: Strictest mechanical-chemical stripping evaluation. Rebound barrier disruption, film-former safety, repeated-use TEWL risk, and fragrance amplification under film are primary axes.

LAYER 2 — OCCLUSION-PENETRATION ENHANCEMENT RULE
MANDATORY PENETRATION RECALIBRATION
Every active ingredient concentration MUST be re-evaluated through the mask type's penetration enhancement factor before scoring safety or effectiveness.
Enhancement factors by mask type:
Mask Type
Penetration Enhancement Factor
Clay mask (wet phase)
1.5–2x
Cotton sheet mask
2–3x
Hydrogel sheet mask
3–4x
Tencel sheet mask
2–3x
Bio-cellulose sheet mask
5–10x
Cream/gel wash-off
1.2–1.5x
Sleeping mask (6–8hr)
3–5x sustained
Peel-off (film phase)
2–3x

Application rule: If an ingredient is safe at X% in a regular leave-on product, its effective exposure in a bio-cellulose sheet mask is 5–10X. This must trigger concentration safety re-evaluation for every meaningful active.
Specific active recalibration examples:
AHA at 5% pH 3.5 in a bio-cellulose sheet mask → effective exposure equivalent to 25–50% AHA → mandatory severe safety penalty
Niacinamide at 10% in a sleeping mask → sustained overnight delivery → flushing/irritation risk amplification → moderate penalty
Retinol at 0.3% in a sleeping mask → sustained 6-hour delivery → periorbital and sensitized-skin incompatibility → mandatory caution
Fragrance in ANY bio-cellulose mask → occlusion amplification → maximum sensitization penalty

LAYER 3 — CLAY MINERAL SCIENCE & DEHYDRATION RULE
CLAY MINERAL CLASSIFICATION
Not all clays behave equally. Classification before scoring is mandatory.
Kaolin (China Clay):
Mildest adsorptive clay — lower sebum adsorption capacity, gentler dehydration
Natural pH approximately 6–7 — relatively acid-mantle compatible
Lowest irritation risk among clays
Receives gentleness credit
Bentonite:
High swelling capacity and adsorptive power
Natural pH 8–10 — alkaline disruption of acid mantle is a real risk
Stronger dehydration potential — over-application risk
Receives moderate dehydration penalty if used without pH correction
Combined with strong humectant system → partially mitigated
French Green Clay (Illite):
High mineral content, high adsorption
Natural pH approximately 7.5–8.5
Strong dehydration and over-stripping potential
Receives dehydration penalty equivalent to bentonite
Montmorillonite:
Very high adsorptive and swelling capacity
Used in therapeutic dermatology at controlled concentrations
pH typically 8–10
Highest dehydration and barrier disruption risk among common clays
Mandatory rebound dehydration evaluation
Rhassoul Clay (Ghassoul):
Lower adsorptive capacity than bentonite
pH approximately 7–8
Milder dehydration profile
Minor gentleness credit vs bentonite
Clay pH correction rule: Clay masks with alkaline clays (bentonite, montmorillonite, green clay) and no pH-adjustment system → acid mantle disruption penalty. Masks demonstrating pH adjustment toward 5.0–6.0 through acidic buffers or organic acids receive pH correction credit partially offsetting alkaline clay penalty.
CLAY REBOUND DEHYDRATION RULE
Clay masks create a dehydration arc:
Initial wet-phase mild occlusion (slight hydration benefit)
Drying phase — progressive TEWL increase as clay adsorbs stratum corneum water
Post-removal phase — rebound TEWL increase lasting 20–60 minutes (Williams & Schmitt 1995)
Mandatory scoring impact: Clay masks WITHOUT meaningful humectant rebalancing systems (glycerin, hyaluronic acid, panthenol, or NMF-component humectants in the formula) → mandatory Moisture Retention and Barrier Recovery score reduction.
Clay masks with strong Tier 2–3 humectant systems partially offset the rebound dehydration penalty.
Extended-contact clay masks (over 20 minutes recommended) → additional dehydration penalty regardless of humectant presence.

LAYER 4 — SHEET MASK SUBSTRATE SAFETY SYSTEM
SUBSTRATE CLASSIFICATION & SCORING
Bio-cellulose:
Derived from bacterial fermentation — highest skin adhesion, highest penetration enhancement
Biodegradable — eco credit
Highest risk amplifier for any irritant, sensitizer, or high-concentration active in essence
Requires strictest essence ingredient evaluation
Penetration enhancement: 5–10x → mandatory active recalibration
Hydrogel:
Synthetic polymer matrix — high adhesion, high cooling effect
Moderate-high penetration enhancement: 3–4x
Non-biodegradable typically → eco penalty
Generally safe substrate — evaluation falls on essence quality
Tencel (Lyocell):
Plant-derived cellulose — biodegradable → eco credit
Moderate adhesion and penetration: 2–3x
Lower skin adhesion than bio-cellulose → lower risk amplification
Good environmental profile
Cotton:
Most common, least expensive substrate
Lowest adhesion and penetration enhancement: 2–3x
Non-biodegradable unless organic cotton specified
Lowest risk amplifier — essence quality still primary evaluation
Microfiber / Synthetic blends:
Variable penetration enhancement
Generally non-biodegradable → eco penalty
Evaluate essence quality primarily
Substrate eco scoring rule:
Bio-cellulose, Tencel, organic cotton → positive eco modifier
Standard synthetic hydrogel, microfiber → eco penalty
Single-use plastic backing → additional eco penalty
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no cleansing, detoxifying, soothing, or long-term skin benefit in face masks/face packs and may increase unnecessary irritation burden.

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

Bright/color-heavy clay masks or gel masks receive stronger penalties when coloration is mainly sensory or marketing-driven.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”


LAYER 5 — ACTIVE CONCENTRATION OCCLUSION SAFETY
AHA/BHA IN MASKS — STRICT RECALIBRATION
AHAs in sheet masks or sleeping masks:
Standard facial leave-on safe range: 5–10% at pH 3.0–4.0
Under bio-cellulose mask occlusion at 5–10x enhancement → effective exposure far exceeds safe leave-on range
AHA above 5% in any sheet mask → mandatory over-exfoliation and safety penalty
AHA above 2% in bio-cellulose sheet mask → mandatory penalty
AHA in sleeping mask above 3% → leave-on nocturnal exposure → mandatory penalty
AHA in clay or wash-off mask at standard 5–10% → moderate caution (lower penetration enhancement, rinse-off)
BHA (Salicylic Acid) in masks:
Safe leave-on range: 0.5–2%
In sheet masks above 1% → occlusion-enhanced penetration risk → penalty
In sleeping masks above 0.5% → sustained overnight delivery → penalty
In clay wash-off masks at 1–2% → acceptable (low enhancement + rinse-off)
Retinol in masks:
In sleeping masks above 0.05% → sustained occlusive delivery → penalty
In sheet masks → discouraged; any concentration requires caution flag
In clay/wash-off masks → rinse-off limits risk; moderate caution at functional %
Niacinamide in masks:
Generally safe even under occlusion at 2–10%
Above 10% in sleeping masks → flushing risk amplification → minor penalty
Functional credit at 2–5% in any mask type for barrier support and brightening
Vitamin C (L-Ascorbic Acid) in sheet masks:
Low pH requirement (below 3.5) for stability + high penetration enhancement under occlusion → irritation risk amplification
L-AA above 10% in bio-cellulose mask → mandatory penalty
Stable derivatives (Ascorbyl Glucoside, Sodium Ascorbyl Phosphate) → lower irritation, safer under occlusion → moderate credit

LAYER 6 — FRAGRANCE & SENSITIZER AMPLIFICATION RULE
MASK FRAGRANCE AMPLIFICATION
Fragrance in masks is not equivalent to fragrance in regular skincare. Occlusion dramatically enhances fragrance penetration and sensitization potential.
Fragrance occlusion amplification factors:
Mask Type
Fragrance Amplification
Clay mask
Moderate (wet phase occlusion)
Cotton sheet mask
High
Bio-cellulose sheet mask
Maximum
Sleeping mask
Maximum (6–8hr)
Wash-off cream mask
Moderate
Peel-off mask
High (trapped under film)

Scoring rule:
Fragrance in any sheet mask → mandatory significant Allergy Risk and Safety penalty
Fragrance in bio-cellulose sheet mask → mandatory maximum Allergy Risk penalty + Critical Alert
Fragrance in sleeping mask → treat as leave-on product fragrance → mandatory significant penalty
Fragrance in clay wash-off mask → moderate penalty (rinse-off reduces but doesn't eliminate risk)
Essential oils in any mask type → same penalty tier as synthetic fragrance minimum
Cooling agents (menthol, eucalyptus) in masks → additional sensitization and irritation penalty under occlusion
Sensitizer stacking in masks: Multiple sensitizers (fragrance + essential oil + botanical sensitizer) under occlusion → compounded cumulative penalty that cannot be offset by any soothing ingredient.

LAYER 7 — PEEL-OFF MASK MECHANICAL STRIPPING RULE
FILM-FORMER SAFETY EVALUATION
Peel-off masks function through film-forming polymers that adhere to skin surface and mechanically remove surface material on peeling.
Common film-formers:
Polyvinyl Alcohol (PVA):
Most common peel-off polymer
Moderate adhesion — moderate mechanical stripping
Generally non-irritating to skin
Non-biodegradable → eco penalty
Mechanical stripping of surface keratinocytes → TEWL increase on removal
Polyvinylpyrrolidone (PVP):
Lighter film, lower adhesion
Gentler stripping than PVA
Minor eco penalty
Natural film-formers (gelatin, alginate, carrageenan):
Lower adhesion than synthetic polymers
Gentler mechanical stripping
Better biodegradability → eco credit
Receive gentleness credit vs PVA-dominant systems
Charcoal + PVA combination:
Common "pore-cleansing" marketing
No peer-reviewed evidence that charcoal improves skin outcomes beyond surface adsorption
Aggressive adhesion on removal → higher stripping risk → mandatory credibility penalty for overclaiming
Stripping severity rule:
Strong synthetic film-former dominant systems → mandatory Barrier Recovery and Repeated-Use Tolerance score reduction
Peel-off masks claiming "pore shrinking" → mandatory overclaiming penalty (pores do not permanently change size from mechanical stripping)
Repeated weekly peel-off use → cumulative TEWL and barrier disruption risk → Long-Term Compatibility penalty

LAYER 8 — HUMECTANT TIERING (MASK-CALIBRATED)

THREE-TIER HYDRATION DEPTH FOR MASKS
Humectant quality is especially critical in clay and peel-off masks where rebound dehydration is a structural risk.
Tier 1 — Surface hydration (Low depth) Ingredients: Glycerin alone, Butylene glycol, Propylene glycol, High-MW Sodium Hyaluronate alone
Mask-specific limitation: Tier 1 alone cannot adequately compensate for clay or peel-off rebound dehydration. Post-mask TEWL increase requires deeper humectant support.
Score ceiling: Hydration Support max 2.5 in clay/peel-off masks; max 3.0 in sheet/sleeping masks
Tier 2 — Extracellular hydration (Moderate depth) Ingredients: Multi-weight Hyaluronic Acid, Glycerin + Panthenol, Beta-glucan, Trehalose, Polyglutamic acid
Mask-specific value: Meaningfully better post-mask hydration retention. Partially offsets clay rebound.
Score ceiling: Hydration Support max 3.5 in any mask type
Tier 3 — Intra-corneocyte hydration (High depth) Ingredients: Urea (2–10%), Sodium PCA, Amino acid blends, Sodium lactate, Multi-NMF component systems
Mask-specific value: Best rebound dehydration prevention in clay masks. Genuine intra-corneocyte water binding that persists post-rinse.
Score ceiling: Hydration Support up to 5.0
Sleeping mask occlusion rule: Sleeping masks benefit most from Tier 2–3 humectants sealed under extended occlusion — this is where NMF-component humectants produce their strongest sustained hydration outcomes.

LAYER 9 — FORMULATION pH RULE (MASK-CALIBRATED)
(Based on Schmid-Wendtner & Korting 2006; Surber et al. 2018; clay mineral pH science)
pH SCORING MODIFIER FOR MASKS
pH impact is mask-type-specific:
Clay masks:
Natural clay pH is frequently alkaline (7–10)
Alkaline pH suppresses ceramide synthesis enzymes and shifts acid mantle
Clay masks without pH adjustment to below 6.5 → mandatory acid mantle disruption penalty
pH 5.0–6.0 adjusted clay masks → optimal; partial offsetting of alkaline clay risk
Sheet mask essences:
Same pH rules as toner/serum — pH 4.5–5.5 optimal
AHA-containing essences must be evaluated for pH-acid functional honesty (AHA inactive above pH 4.5)
Alkaline sheet mask essences → barrier enzyme suppression penalty
Sleeping masks:
Same as leave-on moisturizer pH rules
pH 4.5–5.5 optimal
Above 7.0 → mandatory penalty
Wash-off mask pH:
Somewhat lower priority given rinse-off nature
Still evaluated — extreme pH (below 3.0 or above 8.0) → mandatory safety penalty

LAYER 10 — MICROBIOME INTERACTION RULE
(Based on Frontiers Microbiology 2025; PMC12561040 2025; Ann Dermatol 2025)
Note: Microbiome-targeted cosmetic evidence remains preliminary. Minor modifier only — does not override structural safety scores.
Mask-specific microbiome considerations:
Clay masks: Strong adsorption may temporarily disrupt surface microbiome flora. Repeated weekly use without recovery period → minor cumulative microbiome stress modifier.
Sheet masks: Essence pH and antimicrobial preservatives may affect surface microbiome during occlusion window. Bio-cellulose sustained contact → slightly higher microbiome interaction than cotton.
Sleeping masks: Sustained 6–8 hour occlusion → most significant microbiome interaction window. Antimicrobial preservatives or essential oils at this duration → minor additional modifier.
Microbiome-supportive credits:
Postbiotic or probiotic ingredients (Lactobacillus ferment, prebiotics) with Tier 1 evidence
pH 4.5–5.5 formulations (protective acidophilic flora support)
Gentle preservative systems (Tier C from Layer 10 of base rules)
Application: Modifier applies only to Skin Compatibility and Long-Term Tolerance scores. Minor influence only.

LAYER 11 — PRESERVATIVE SAFETY (MASK-CALIBRATED)
MASK PRESERVATIVE EVALUATION
Preservative risk must be calibrated to mask type and exposure duration.
Rinse-off masks (clay, wash-off cream, peel-off):
Shorter contact reduces sensitization risk vs leave-on
MI/MCI still unacceptable even in rinse-off — contact sensitization occurs at trace concentrations
Formaldehyde releasers still unacceptable — mandatory penalty
Sheet masks:
Occlusion enhances preservative penetration and sensitization risk
MI/MCI in sheet mask essence → maximum penalty (occlusion-enhanced contact sensitization)
Phenoxyethanol above 0.8% under bio-cellulose occlusion → minor penalty
Sleeping masks:
Full leave-on preservative strictness applies
Same standards as moisturizer algorithm
PRESERVATIVE TIERS (Same structure as toner algorithm)
Tier A (Zero Tolerance): MI, MCI, formaldehyde releasers → mandatory penalty in any mask type
Tier B (Caution): Phenoxyethanol above 0.8% in sheet/sleeping masks → minor modifier
Tier C (Acceptable): Ethylhexylglycerin blend, sodium benzoate + potassium sorbate, caprylyl glycol → no penalty

LAYER 12 — CORE FACE MASK SCORING SYSTEM(EVALUATED FROM 1.0 TO 5.0 STARS)

SAFETY [DOMINANT]
Evaluates:
Occlusion-enhanced active concentration safety (Layer 2 recalibration mandatory)
Clay mineral dehydration and rebound risk
Peel-off mechanical stripping severity
Fragrance amplification under mask occlusion type
AHA/BHA occlusion-safety recalibration
Retinol occlusion-safety calibration
Alkaline pH acid mantle disruption risk
Repeated weekly-use cumulative exposure burden
Preservative safety tier under occlusion
Sleeping mask leave-on safety equivalence
Sensitizer compounding under occlusion
Safety overrides ALL post-mask glow, texture, or cosmetic appearance claims.

EFFECTIVENESS
Core question: Does this mask genuinely deliver structural skin benefit appropriate to its mask type and exposure duration — or is the outcome primarily cosmetic illusion?
Evaluates:
Humectant tier quality and post-mask hydration realism (Layer 8)
Active delivery realism under occlusion enhancement
Barrier recovery post-mask vs barrier disruption
Clay mineral quality and appropriate adsorption function
Honest dark spot, brightening, or anti-aging claim evaluation (evidence-tiered)
Post-mask skin outcome realism
Repeated-use structural benefit accumulation
Active concentration functional honesty (not penalized for low concentration if appropriately dosed)
Temporary post-mask glow, temporary pore appearance reduction, or temporary softness MUST NOT achieve high effectiveness scores without structural mechanism support.

ALLERGY RISK
Evaluates:
Fragrance presence and occlusion type amplification factor (Layer 6)
Essential oil presence under occlusion
Volatile aromatic compounds
Sensitizer stacking under mask occlusion
Botanical sensitization burden
Preservative sensitization tier
Repeated weekly sensitization accumulation
Contact duration-appropriate risk calibration
Fragrance under bio-cellulose occlusion → maximum allergy risk score suppression. Multiple sensitizers under any occlusion → compounded mandatory penalty.

SKIN COMPATIBILITY
Evaluates:
Mask-type-appropriate barrier interaction
Clay rebound dehydration tolerance
Post-peel barrier recovery stability
Sheet mask post-occlusion TEWL normalization behavior
Sleeping mask extended occlusion milia risk
Repeated weekly-use skin tolerance
Active-layering compatibility before and after masking
Skin type appropriateness of occlusion level

ECO IMPACT
Evaluates:
Single-use substrate environmental burden (sheet masks, peel-off films)
Substrate biodegradability tier (Layer 4 substrate classification)
Packaging excess and plastic use
Synthetic polymer environmental persistence (PVA, PVP, synthetic hydrogel)
Preservative ecotoxicity
Ingredient biodegradability
Water formulation excess
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)


LAYER 13 — SPECIALIZED FACE MASK PERFORMANCE
Evaluates realistic face mask behavior calibrated to mask type and exposure conditions.
Score Range: 1.0–5.0 for each parameter
Cap rule: If Safety scores below 2.0 → Specialized Score capped at 3.0. Critical Alert ingredients (MI, formaldehyde releasers, extreme pH) → mandatory floor of 1.5 on affected specialized scores.

HYDRATION & MOISTURE SUPPORT
Evaluates humectant tier quality calibrated to mask type:
Tier 1 only in clay mask → max 2.0 (insufficient rebound prevention)
Tier 2 in clay mask → max 3.0 (partially offsets rebound)
Tier 3 in clay mask → up to 4.0 (meaningful rebound prevention)
Tier 2–3 in sleeping mask → up to 5.0 (optimal occlusion + humectant combination)
Post-mask hydration persistence realism
Dehydration rebound risk assessment

BARRIER RECOVERY & PROTECTION
Evaluates post-mask barrier behavior:
Physiological lipid architecture presence (ceramide + cholesterol + fatty acid) → barrier repair credit
Non-physiological occlusion balance (milia risk in sleeping masks)
Post-clay-mask barrier recovery support
Post-peel-off barrier disruption extent
Anti-inflammatory support for barrier homeostasis
Repeated-use barrier stability over weekly use cycles
Barrier disruption without recovery architecture → mandatory score reduction.

ACTIVE DELIVERY REALISM
Evaluates whether actives are present at concentrations that are:
Functionally meaningful within the mask exposure window
Safe under the specific mask type's penetration enhancement factor
Honest in their delivery mechanism claims
Evidence-tiered for their claimed outcomes
Over-concentrated actives unsafe under occlusion → dual penalty: safety score AND active delivery realism score (unsafe delivery is not effective delivery) Under-concentrated actives present only for label appeal → credibility penalty

CLEANSING & PURIFICATION REALISM (Clay/Peel Masks)
Evaluates for clay and peel-off masks specifically:
Clay mineral adsorption quality appropriate to skin type
Sebum regulation realism without over-stripping
"Pore cleansing" claim evaluation — surface debris removal valid; permanent pore-size reduction claim → mandatory penalty
"Detox" claim evaluation — skin does not detoxify through topical adsorption; detox marketing → mandatory credibility penalty
Post-cleansing skin balance — tight/stripped feeling is not equivalent to clean
Charcoal efficacy realism — surface adsorption only; exaggerated claims → penalty
Non-clay masks (sheet, sleeping) → this parameter scored on N/A basis (2.5 neutral) or omitted from average.

EXFOLIATION BALANCE (AHA/BHA/Enzyme Masks)
Evaluates for masks containing exfoliating actives:
Acid type, concentration, and pH matrix under mask-specific occlusion enhancement
Enzyme exfoliants (papain, bromelain) — gentler mechanism, lower occlusion risk
Over-exfoliation risk under occlusion
Repeated weekly exfoliation mask compatibility
Post-exfoliation barrier recovery support in same formulation
Acid stacking risk assessment
Non-exfoliating masks → 2.5 neutral score.

SOOTHING & ANTI-INFLAMMATORY PERFORMANCE
Evaluates:
Evidence-tiered soothing ingredients at functional concentrations
Centella asiatica components (madecassoside, asiaticoside) → strong credit
Niacinamide anti-inflammatory pathway → credit
Allantoin, panthenol, beta-glucan → functional soothing credit
Kaolin-based masks with soothing actives → combination credit (gentle adsorption + soothing)
Decorative soothing botanicals without periorbital evidence → no credit
Cooling sensation claimed as soothing → penalty (menthol under occlusion → irritation amplification)

POST-MASK SKIN STABILITY
Evaluates realistic skin behavior after mask removal:
TEWL normalization trajectory — rapid rebound vs stable recovery
Rebound dehydration tendency (clay, peel-off)
Post-occlusion sebum normalization (sleeping mask)
pH recovery after alkaline clay exposure
Inflammatory rebound from over-exfoliation
Sustainable post-mask skin state vs cosmetic illusion stability
Recovery behavior after repeated weekly masking cycles
Masks producing temporary post-application cosmetic improvement followed by structural rebound → score suppression.

REPEATED-USE TOLERANCE
Evaluates cumulative behavior under realistic masking frequency (weekly or twice-weekly):
Cumulative clay dehydration arc over repeated sessions
Cumulative barrier stripping from repeated peel-off use
Sensitization escalation from fragrance under repeated occlusion
Acid overexposure accumulation from weekly exfoliating masks
Milia development tendency from weekly sleeping mask use
Long-term barrier stability vs cumulative stress
Single-use tolerance insufficient. Repeated-use realism mandatory.

ENVIRONMENTAL IMPACT REALISM
Evaluates mask-type-specific eco behavior:
Single-use sheet mask substrate biodegradability (detailed in Layer 4)
Packaging waste relative to product volume
Synthetic polymer content (PVA, PVP, hydrogel polymer)
Preservative ecotoxicity under aquatic rinse-off
Ingredient sustainability and sourcing transparency
Carbon and water footprint relative to product type
Bio-cellulose or Tencel substrate → eco credit Standard synthetic hydrogel or non-biodegradable sheet → eco penalty Recyclable or minimal packaging → minor positive modifier

SPECIALIZED SCORE FORMULA
Specialized Score = Average of applicable specialized parameter scores
Cap rule: Safety core score below 2.0 → Specialized Score capped at 3.0 regardless of average.
N/A parameter rule: Cleansing & Purification Realism scores 2.5 neutral for non-clay/non-peel masks. Exfoliation Balance scores 2.5 neutral for non-exfoliating masks. These neutral scores are included in the average to avoid inflating specialized scores by omission.

LAYER 14 — REAL-WORLD USAGE SIMULATION
Simulate:
Weekly or twice-weekly masking frequency
Cumulative exposure over 4–8 weeks of regular use
Pre-mask skin state variation (post-cleansing, compromised barrier, post-sun exposure)
Post-mask routine layering (toner, serum, moisturizer applied after)
Clay mask over-application duration risk
Sheet mask residue behavior and post-removal routine compatibility
Sleeping mask seasonal variation (high-humidity vs dry climate milia and occlusion behavior)
Peel-off mask repeated mechanical stripping accumulation
Routine active stacking on mask days (retinol + exfoliating mask on same night → compounded risk)
Core Question: "Does this mask deliver genuine cumulative structural skin benefit under realistic weekly-use conditions — or does it create temporary cosmetic illusion while increasing rebound dehydration, barrier stress, sensitization, or environmental burden?"


FINAL SCORE
Final Score = (Core Score + Specialized Score) ÷ 2
All scores on 1.0–5.0 scale.

OUTPUT FORMAT

⭐ FINAL RATING: X.X / 5 — [Rating Level]

⚖ STRUCTURAL QUALITY Short structural classification.
🎭 FACE MASK/FACE PACK Mask type + functional profile description.

📊 CORE STRUCTURAL SCORES Short structural reason for every score.
Safety — ⭐ X.X Effectiveness — ⭐ X.X Allergy Risk — ⭐ X.X Skin Compatibility — ⭐ X.X Eco Impact — ⭐ X.X

🧪 SPECIALIZED FACE MASK/FACE PACK PERFORMANCE Short structural reason for every score.
Hydration & Moisture Support — ⭐ X.X Barrier Recovery & Protection — ⭐ X.X Active Delivery Realism — ⭐ X.X Cleansing & Purification Realism — ⭐ X.X Exfoliation Balance — ⭐ X.X Soothing & Anti-Inflammatory Performance — ⭐ X.X Post-Mask Skin Stability — ⭐ X.X Repeated-Use Tolerance — ⭐ X.X Environmental Impact Realism — ⭐ X.X

⚠ STRUCTURAL CONCERNS List only structurally triggered concerns.
🎁 STRUCTURAL ADVANTAGES List only structurally validated positives.
🚨 CRITICAL ALERTS Display only when structurally triggered — mandatory for zero-tolerance ingredient detection, dangerous occlusion-active combinations, or extreme pH.

⚠ SKIN TYPE ADVISORY
Dry Skin → Sensitive Skin → Oily / Acne-Prone Skin → Combination Skin → Mature / Aging Skin → Barrier-Damaged Skin →

📊 USAGE FREQUENCY ADVISORY
Weekly Use → Twice-Weekly Use → Daily Use → Occasional Use → Long-Term Repeated Use →

🔬 KEY STRUCTURAL INGREDIENTS List only functionally dominant or structurally influential ingredients. Note mask-type occlusion safety tier for any active.
Avoid: decorative extracts, trace actives, marketing-heavy additions, late-position ingredients without structural influence.

🧠 WHY THIS RATING Explain only the major structural reasons affecting the final rating. Explicitly flag occlusion-penetration safety failures, rebound dehydration risks, fragrance amplification concerns, clay alkalinity issues, and active overclaiming.

📌 STRUCTURAL INSIGHT
Strengths




Weaknesses





STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS
INCLUDE HARSH PRESERATIVES,FRAGRANCES AND COLROANTS IN THE OUTPUT
Concise but structurally intelligent
Analytical, clinical, mask-science-focused tone
No repetitive wording
No ingredient-by-ingredient explanation unless structurally critical
Do NOT expose internal scoring formulas or algorithm rules
Do NOT praise products without structural mask-science justification
Occlusion-enhanced active safety MUST be evaluated — never accept label concentration at face value
Fragrance under occlusion MUST trigger amplified penalty
Clay rebound dehydration MUST be explicitly evaluated
"Detox" or "pore-shrinking" claims MUST trigger credibility penalty
Temporary post-mask glow MUST NOT heavily influence scoring
Post-mask barrier stability MUST matter more than immediate post-application feel
Eco Impact for single-use masks MUST be explicitly evaluated
Repeated-use cumulative burden MUST dominate over single-use tolerance
Marketing appearance claims MUST be evaluated against mechanism science



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
              "You are a strict clinical face pack structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "CLINICAL FACE PACK TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();