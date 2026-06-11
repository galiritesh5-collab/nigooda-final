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

        night_cream_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL NIGHT CREAM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
NIGHT CREAM EVALUATION ALGORITHM — VERSION B.1 (PATCHED)
Evidence-Based Dermatological Scoring Engine — Overnight Recovery Specialist
================================================================================
LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward ONLY formulations demonstrating:
• Stable overnight hydration with genuine NMF depth
• Barrier-supportive physiological lipid architecture
• Effective use of the overnight recovery window
• Sustained 7–8h moisture retention
• Recovery support grounded in physiology, not marketing
• Repeated-use stability under prolonged occlusion
• Long-term compatibility with minimal irritation, congestion, or barrier stress
Penalty REQUIRED when formulations rely mainly on:
• Marketing hydration/recovery claims without structural support
• Temporary softness/richness illusion
• Decorative botanical/peptide inflation
• Texture-first moisturization
• Heavy occlusive masking presented as repair
• Luxury texture engineering
• Artificial nourishment perception
• Active inflation without overnight rationale
• Fragrance-heavy overnight elegance
• Petroleum-occlusive dependence without physiological lipid architecture
• Retinoid/AHA use lacking pH or stability safeguards
Basic moisturization alone CANNOT achieve high scores.
Marketing-dominant systems MUST receive meaningful limitation.
---
OVERNIGHT EXPOSURE RULE (MANDATORY)
All evaluation MUST simulate:
• 7–8h continuous leave-on exposure
• Bedding/pillow occlusive pressure
• Elevated sleep temperature (+0.5–1°C)
• Reduced evaporation vs daytime
• Continued sebum production under occlusion
• Repeated nightly accumulation over months
• Absence of UV/sweat/pollution stress
• Circadian repair biology context
Heavy, greasy, suffocating, unstable, or irritation-prone structures MUST lose compatibility credibility under prolonged overnight exposure.
Extended contact amplifies both benefits of well-designed formulations and harms from irritants, sensitizers, and occlusive overload.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding
• Luxury texture
• Natural positioning
• Trend actives
• Fancy naming
• Inflated ingredient lists
• "Morning radiance" marketing
• Decorative repair/renewal claims
• "Sleeping mask" luxury framing
Evaluate ONLY:
• NMF-tier hydration depth
• Physiological lipid quality
• Overnight occlusion calibration
• Circadian compatibility
• Repeated-use tolerance
• Long-term response
• Structural honesty
• pH compatibility (contextual)
• Overnight active rationale/safety
Temporary comfort without structural support → high score prohibited.
---
GLOBAL ENFORCEMENT RULE
Applies across ALL layers:
• Core architecture overrides additives
• Marketing-focused actives cannot override weak structure
• Late-position ingredients cannot neutralize weak systems
• Richness/softness ≠ barrier repair
• Basic sealing ≠ high score justification
• Heavy occlusion without sophistication MUST reduce credibility
• Non-physiological lipids CANNOT receive repair credit
• Safety/compatibility penalties override cosmetic bonuses
• Decorative recovery systems MUST reduce credibility
• Fragrance-heavy overnight exposure MUST face meaningful limitation
• True barrier sophistication MUST outperform basic occlusive systems
• Retinoids lacking pH/stability safeguards MUST trigger formulation integrity flag
---
COSMETIC ELEGANCE FILTER
Rich texture, silicone softness, "nourishing" weight, or luxury feel MUST NOT be interpreted as strong hydration, barrier repair, skin recovery, long-term improvement, or barrier sophistication.
"Morning radiance" used to describe cosmetic occlusion MUST be penalized as marketing inflation.
---
STRUCTURE DOMINANCE RULE
Core structure determines:
• Barrier stability
• Hydration durability
• Overnight occlusion calibration
• Recovery support
• Irritation risk
• Congestion potential
• Long-term compatibility
• Functional overnight performance
Minor additives cannot override unstable structure.
---
BASIC MOISTURIZATION LIMIT RULE
Glycerin, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility.
Simple sealing without barrier sophistication or recovery support → moderate ceiling.
Applies equally to premium and budget systems.
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients CANNOT neutralize: weak barrier structure, fragrance-heavy systems, occlusive imbalance, comedogenic overload, repeated irritation exposure, alcohol-heavy structures, retinoid instability, basic occlusive dependence.
---
REAL USEFULNESS RULE
Clear score improvement REQUIRED when formulation:
• Supports barrier resilience through physiological lipids
• Improves hydration depth (Tier 2 minimum, Tier 3 preferred)
• Exploits overnight recovery biology
• Maintains sustainable overnight hydration
• Shows repeated-use compatibility under prolonged occlusion
• Rationally balances humectants/emollients/occlusives
• Contains physiological lipids at pH 4.5–5.5 (contextually assessed)
• Uses retinoids/AHAs/peptides appropriately with safeguards
---
MARKETING ILLUSION PENALTY
Penalty REQUIRED for formulations driven mainly by luxury sensory engineering, decorative botanical/peptide inflation, fragrance-focused overnight elegance, texture/richness-first moisturization, artificial nourishment perception, heavy occlusive masking, petroleum-occlusive dependence, "overnight miracle" active inflation.
Traditional, herbal, minimalist, or lipid-focused systems MUST NOT be penalized when real structural usefulness is evident.
---
FRAGRANCE BURDEN CLASSIFICATION SYSTEM (PATCH 2 PRINCIPLES APPLIED)
Fragrance in night creams must be evaluated contextually by burden tier. Night creams represent the highest fragrance-risk category due to 7–8h leave-on exposure during the peak cell-renewal window.
F1 — LOW FRAGRANCE BURDEN
Characteristics: low irritation probability; overnight context elevates concern above daytime leave-on
Scoring Impact: minor modifier; note added
F2 — MODERATE FRAGRANCE BURDEN
Characteristics: moderate repeated-exposure sensitization probability; overnight amplification applies
Scoring Impact: moderate Allergy Risk modifier; Long-Term Compatibility modifier
F3 — HIGH FRAGRANCE BURDEN
Characteristics: elevated sensitization probability; fragrance-dependent product identity
Scoring Impact: strong Allergy Risk penalty; Safety penalty; Long-Term Compatibility penalty; overnight amplification mandatory
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Characteristics: high repeated-use irritation probability; sensory-first formulation imbalance
Scoring Impact: major Allergy Risk reduction; major Safety penalty; Overnight Recovery Support penalty; maximum Formulation credibility reduction
Minimum −0.8 Allergy Risk for high-allergen fragrance at overnight leave-on concentrations.
Important Rules:
• Fragrance burden matters more than fragrance existence
• Overnight leave-on exposure represents the strictest fragrance evaluation context in all skincare
• Essential oils are NOT automatically safer than synthetic fragrance
• Repeated nightly sensitization over years is the primary consideration
• Fragrance-free night creams receive Allergy Risk bonus
---
HERBAL / BOTANICAL VALIDATION (APPLIED FROM LAYER 4.8 PRINCIPLES)
For herbal-positioned, Ayurvedic, botanical-heavy, or "natural" marketed night creams, evaluate:
• Evidence quality of botanicals (H1/H2/H3 classification)
• Overnight leave-on exposure realism
• Essential oil burden under prolonged contact
• Genuine vs gimmick herbal positioning
• Marketing honesty vs structural reality
Natural ingredients are NOT automatically safer. Essential oil and botanical sensitizer burden under 7–8h overnight leave-on carries the highest sensitization risk of any skincare category.
---
LAYER 1 — PHYSIOLOGICAL vs NON-PHYSIOLOGICAL LIPID RULE
NON-PHYSIOLOGICAL LIPIDS
Definition: Surface occlusives reducing TEWL without stimulating endogenous lipid synthesis.
Examples: Mineral oil, petrolatum, paraffin, vegetable oils, lanolin, beeswax, synthetic waxes, silicones, squalane, isolated fatty alcohols
Scoring:
• Receive moderate protection credit
• NOT eligible for repair credit
• No penalty merely for presence
• Penalize ONLY when dominant without physiological lipid architecture OR excessively congestive/suffocating overnight
• Non-physiological occlusion is acceptable as supplementary support, not replacement for physiological repair
---
PHYSIOLOGICAL LIPIDS
Definition: Lipids supporting endogenous intercellular repair.
Examples: Ceramides, Cholesterol, Free fatty acids, Phytosphingosine, Sphingosine
Scoring:
• Eligible for full repair credit
• Reward structural presence
• Require co-lipids for maximum benefit
• Optimal ratio approximates 3:1:1
Overnight context: Repair activity is maximally effective during sleep due to stable temperature, reduced TEWL variability, and absence of UV degradation.
---
OLEIC ACID CAUTION RULE
High oleic acid concentration disrupts lamellar bilayers, increases TEWL, and weakens barrier integrity.
High-oleic oils (olive, sweet almond, argan, high-oleic sunflower) MUST NOT receive full physiological fatty-acid credit.
Preferred: linoleic acid, palmitic acid, stearic acid.
---
SQUALANE CLASSIFICATION
Squalane receives partial occlusive credit and minor breathability benefit.
Receives NO barrier repair credit.
Non-comedogenic advantage under overnight occlusion is a compatibility positive.
---
LIPID RATIO BONUS RULE
Recognition tiers:
• Ceramide alone → moderate repair credit
• Ceramide + one co-lipid → good repair credit
• Full triad → strong repair credit + lipid ratio bonus
Overnight amplification: Full physiological triad at pH 4.5–5.5 during 7–8h exposure represents maximum achievable topical barrier-repair conditions.
---
LAYER 2 — FORMULATION pH RULE (OVERNIGHT-AMPLIFIED)
pH importance is amplified overnight because exposure duration is maximized without UV/sweat perturbation. Formulation pH becomes the dominant pH influence throughout the entire exposure period.
pH must be interpreted contextually alongside lipid architecture and formulation design. pH is a moderate-influence factor, not a dominant final evaluation driver.
Low pH alone must NOT create elite scoring if the formulation is structurally weak.
Higher pH in a well-designed physiological lipid system does NOT automatically produce catastrophic scoring. However, prolonged overnight suppression of ceramide synthesis enzymes at high pH is a meaningful structural concern.
pH TIERS
4.5–5.5 → Contextual bonus to Barrier Repair, Hydration Depth, Overnight Recovery
5.5–6.0 → Neutral
6.0–7.0 → Mild-to-moderate contextual penalty (overnight amplification applies)
>7.0 → Significant contextual repair suppression penalty (full overnight duration)
Unknown → No bonus + −0.1 Ingredient Quality/Transparency
RETINOID pH INTERACTION RULE
Retinoid stability optimal at pH 5.5–7.0. Ceramide enzyme function optimal at pH 4.5–5.5. Best compromise: pH 5.5. Ceramide + retinoid systems at pH 4.0 or pH 7.5+ → formulation integrity flag.
---
LAYER 3 — NMF COMPONENT RECOGNITION RULE (OVERNIGHT-AMPLIFIED)
Overnight is the highest-leverage window for NMF support because TEWL is reduced, temperature is stable, enzymatic conversion is optimized, contact time is maximized, and evaporation is minimized.
TIER 1 — SURFACE HYDRATION
Examples: Glycerin alone, film humectants, occlusion-only systems
Result: Temporary softness; wasted overnight hydration opportunity; no unique overnight benefit
Tier 1 only → max 2.5
TIER 2 — EXTRACELLULAR HYDRATION
Examples: HA + glycerin, balanced glycerin + occlusion, betaine
Result: Better extracellular retention; improved overnight HA performance
Tier 2 → max 3.5
TIER 3 — INTRA-CORNEOCYTE HYDRATION
Examples: Urea, Sodium PCA, amino acids, lactate systems, urocanic acid, multi-NMF systems
Result: Deep sustained hydration; maximum effectiveness overnight; optimal enzymatic/NMF support
Tier 3 present → eligible up to 5.0
HYDRATION DEPTH SCORING:
• Tier 1 only → max 2.5
• Tier 2 → max 3.5
• Tier 3 present → eligible up to 5.0
• Multi-tier systems → dominant tier + breadth bonus
NMF-OCCLUSION INTERFERENCE PENALTY:
Petrolatum/wax-heavy systems lacking Tier 3 NMF support MUST proportionally reduce Hydration Depth and Moisture Retention Stability. Overnight amplification applies because nightly NMF suppression is more damaging than daytime-only suppression.
---
LAYER 4 — CIRCADIAN BIOLOGY & OVERNIGHT PHYSIOLOGY RULE
CIRCADIAN OPPORTUNITY MODIFIER
Nighttime skin biology creates a distinct recovery environment:
• Epidermal proliferation peaks midnight–4am
• DNA repair peaks nocturnally
• Cortisol drops
• Growth hormone peaks 11pm–1am
• Temperature rises 0.5–1°C
• TEWL follows overnight biphasic pattern
TIER A — CIRCADIAN-OPTIMIZED (+BONUS)
Characteristics: Fragrance-free or very low F1 fragrance; physiological lipid support; Tier 3 NMF humectants; functional peptides/retinoids; pH 4.5–5.5
Supports: nocturnal lipid synthesis, fibroblast activity, enzymatic repair, anti-inflammatory recovery window
TIER B — CIRCADIAN-NEUTRAL
Structurally sound but not specifically optimized. No bonus or penalty.
TIER C — CIRCADIAN-ANTAGONISTIC (PENALTY)
Examples: Fragrance-heavy systems (F3/F4), high alcohol, heavy occlusion without NMF support, irritant stacking under prolonged exposure
These waste or counteract the overnight repair window.
APPLICATION RULE:
Applies ONLY to Overnight Recovery Support and Long-Term Skin Compatibility.
Maximum: +0.3 bonus; −0.3 penalty.
Does NOT independently affect Safety or Allergy Risk.
---
LAYER 5 — RETINOID & OVERNIGHT-ACTIVE COMPATIBILITY RULE
CATEGORY A — OVERNIGHT-OPTIMIZED ACTIVES (REWARD)
RETINOIDS
Examples: Retinol, Retinaldehyde, Retinyl esters, Granactive retinoid
Requirements for structural credit:
• pH 5.5–7.0
• opaque/airless packaging
• no full-strength AHA combination
• ≥0.025% retinol equivalent (Retinol <0.01% equivalent = decorative only)
Correctly formulated retinoid:
• +0.2 Barrier Repair Strength
• +0.2 Overnight Recovery Support
• +0.1 Ingredient Quality
FUNCTIONAL AHAs
Functional thresholds: Glycolic acid ≥5% at pH ≤3.8; Lactic acid ≥5% at pH ≤3.8
Not combined with full-strength retinoids.
Retinoid + full-strength AHA → irritation amplification flag; reduce Safety and Long-Term Compatibility.
FUNCTIONAL PEPTIDES
Examples: Matrixyl (palmitoyl pentapeptide-4) ≥3 ppm; GHK-Cu ≥0.5%; Acetyl hexapeptide-3 ≥10 ppm
Below threshold = decorative only.
Correctly concentrated: +0.1 Overnight Recovery Support; +0.1 Ingredient Quality.
---
CATEGORY B — INCORRECTLY DEPLOYED / DESTABILIZED ACTIVES (PENALIZE)
Retinol in transparent jar lacking UV protection: −0.2 Ingredient Quality
Unstabilized LAA at night: no penalty; no bonus; lower overnight priority
Non-functional AHAs (<3% or pH >4.5): decorative/pH-adjuster only; no active credit
"Retinol" listed late without concentration disclosure: assume decorative
Niacinamide ≥10% + Vitamin C: compatibility flag; possible niacin flush risk under prolonged contact
---
CATEGORY C — ACTIVE-RELATED SAFETY CONCERNS (PENALIZE)
Sensitizing essential oils (lavender oil, tea tree oil >1%, citrus oils): elevated Allergy Risk under overnight amplification
High alcohol (SD alcohol >5% dominant): −0.2 Safety; −0.2 Overnight Recovery Support
Formaldehyde-releasing preservatives (DMDM hydantoin, Imidazolidinyl urea) at upper list: −0.3 Allergy Risk; extended overnight exposure amplifies sensitization risk.
ACTIVE MODIFIER APPLICATION:
Maximum active bonus = +0.5. Maximum active penalty = −0.6.
Active bonuses CANNOT override weak barrier architecture, poor pH, or non-physiological lipid dependence.
---
LAYER 6 — MICROBIOME DISRUPTION RULE (OVERNIGHT-AMPLIFIED)
Minor modifier ONLY. Does NOT override structural barrier scoring, Safety, or Allergy Risk.
Overnight context increases microbiome exposure duration to preservatives, alcohol, antimicrobial botanicals, and pH disruption. Dysbiosis risk is therefore higher than equivalent daytime exposure.
Disruption risk factors:
• Methylisothiazolinone/Methylchloroisothiazolinone
• DMDM hydantoin/formaldehyde releasers
• High alcohol concentration
• pH >6.0
• Strong antimicrobial botanicals
Support factors:
• Prebiotics
• Functional postbiotics
• Lactobacillus ferment systems
• pH 4.5–5.5
Applies ONLY to Long-Term Skin Compatibility.
Maximum: −0.3 disruption; +0.15 support.
---
LAYER 7 — CORE SCORING SYSTEM (1.0 TO 5.0 STARS)
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)
SAFETY [DOMINANT]
Evaluates: Irritation under prolonged overnight exposure, barrier destabilization during 7–8h contact, occlusion-related congestion/suffocation, repeated nightly sensitization, fragrance burden (F1–F4 classification with overnight amplification), retinoid irritation without barrier co-architecture, functional AHA irritation, preservative sensitization, structural suffocation, chronic inflammatory tendency during cortisol-free repair window.
OVERNIGHT FRAGRANCE SEVERITY RULE:
Night cream fragrance represents the highest fragrance-risk category because of longest leave-on duration, peak cell-renewal exposure, cortisol-free anti-inflammatory window, and repeated nightly use over years.
Fragrance-heavy (F3/F4) night creams MUST receive the strongest fragrance-related penalties of any skincare category.
RETINOID SAFETY RULE:
• Retinol ≥0.3% WITHOUT barrier co-architecture → irritation amplification flag; −0.2 Safety
• Retinol ≥0.3% WITH physiological lipid support → no additional penalty
• Retinaldehyde ≥0.05% WITHOUT barrier support → minor irritation flag
PETROLATUM & SILICONE SAFETY CLARIFICATION:
NOT penalized for intrinsic safety. Penalize ONLY for barrier-repair inflation or NMF-occlusion interference when dominant without NMF support.
---
EFFECTIVENESS
Core Question: Can the formulation realistically support hydration, barrier recovery, NMF generation, and long-term stability under repeated overnight use?
Evaluates: Hydration depth (Layer 3), barrier-support realism (Layer 1), circadian compatibility (Layer 4), overnight moisture retention, overnight-active rationale (Layer 5), occlusion calibration, repeated-use consistency, long-term support, pH compatibility (contextual modifier — Layer 2)
HIGH EFFECTIVENESS REQUIRES:
• Tier 2 minimum hydration
• Tier 3 preferred
• Balanced overnight occlusion
• Stable barrier structure
• Circadian compatibility
• Physiological lipid support
• pH 4.5–6.0 (contextually assessed)
Basic occlusion alone CANNOT achieve high effectiveness.
Richness/nourishment marketing MUST NOT inflate Effectiveness.
---
ALLERGY RISK
Evaluates: Fragrance (F1–F4 classification with overnight amplification), essential oils, botanical sensitizers, preservative sensitivity, irritation stacking, retinoid-AHA irritation amplification, repeated nightly sensitization, microbiome disruption potential (minor modifier).
OVERNIGHT ALLERGY AMPLIFICATION RULE:
7–8h exposure lowers effective sensitization thresholds. Borderline daytime sensitizers may become meaningful overnight sensitizers under repeated exposure.
HIGH-ALLERGEN FRAGRANCE PENALTY:
Examples: Linalool, Limonene, Cinnamal, Eugenol, Citral, Isoeugenol
Leave-on overnight exposure: severe Allergy Risk penalty; minimum −0.8
FRAGRANCE-FREE: Allergy Risk bonus.
UNDISCLOSED MASKING FRAGRANCE: Severe penalty.
---
ECO IMPACT
Evaluates: Biodegradability, environmental persistence, petroleum dependency, silicone persistence, ecological accumulation.
SILICONE ECO DISTINCTION:
• Higher Persistence (Cyclomethicone, Cyclopentasiloxane, D4/D5/D6) → meaningful eco penalty
• Lower Persistence (Dimethicone, Dimethiconol) → minor eco penalty
---
INGREDIENT QUALITY
Evaluates: Overnight structural balance, functional synergy, barrier-support usefulness, NMF-aware hydration architecture, overnight-active deployment, absence of decorative inflation, pH compatibility (contextual), functional antioxidant distinction, retinoid stability/packaging integrity, peptide threshold realism.
ANTIOXIDANT FUNCTION RULE:
Functional: Tocopherol ≥0.5%, CoQ10 ≥0.1%, Resveratrol ≥0.1%
Decorative: Trace antioxidant botanicals, tail-position fermented waters → no meaningful contribution.
ACTIVE STACKING RULE:
Multiple trendy actives ≠ superior formulation. Evaluate each for functional concentration, compatibility, and overnight rationale.
---
SKIN COMPATIBILITY
Evaluates: Nightly-use tolerance, long-term repeated-use stability, sensitivity compatibility, acne compatibility under overnight occlusion, barrier adaptability, cumulative irritation potential, congestion buildup tendency, microbiome interaction.
Heavy occlusive systems may retain moderate compatibility ONLY when irritation remains controlled, congestion remains controlled, and repeated-use balance remains acceptable under 7–8h exposure.
---
LAYER 8 — SPECIALIZED PERFORMANCE (1.0 TO 5.0 STARS)
SPECIALIZED DIMENSIONS AND WEIGHTS:
• Barrier Repair Strength → 0.25
• Hydration Depth → 0.18
• Moisture Retention Stability → 0.16
• Overnight Recovery Support → 0.16
• Long-Term Skin Compatibility → 0.13
• Occlusion Balance → 0.12
Total = 1.00
HYDRATION DEPTH (OVERNIGHT-AMPLIFIED)
Scoring Rules:
• Tier 1 only → max 2.5; wastes overnight hydration opportunity
• Tier 2 → max 3.5
• Tier 3 present → eligible up to 5.0; small overnight bonus
• Multi-tier systems → dominant tier + breadth bonus
NMF-OCCLUSION INTERFERENCE PENALTY:
Petrolatum/wax-heavy systems lacking Tier 3 NMF support MUST proportionally reduce Hydration Depth and Moisture Retention Stability. Overnight amplification applies.
---
BARRIER REPAIR STRENGTH [HIGHEST WEIGHT — 25%]
Scoring Rules:
• Non-Physiological Lipids Only → max 2.5
• Partial Physiological System → up to 3.5
• Full Physiological Triad → strong repair credit; 4.5+
• Full Triad + pH 4.5–5.5 → maximum repair potential + overnight amplification bonus
• Full Triad + pH >6.0 → meaningful reduction from prolonged overnight suppression
• Correctly Formulated Retinoid + Physiological Lipid Base → +0.2 active bonus
TRUE BARRIER REPAIR RULE:
Occlusion alone does NOT qualify as strong repair. Petrolatum, mineral oil, waxes, silicones alone MUST NOT produce high Barrier Repair scoring.
---
OCCLUSION BALANCE (OVERNIGHT-CALIBRATED)
Evaluates: Overnight sealing behavior, TEWL reduction, occlusive heaviness calibration, congestion tendency, suffocation risk, NMF-occlusion interaction.
OVERNIGHT OCCLUSION CALIBRATION RULE:
Night creams appropriately tolerate heavier occlusion than day creams.
Light Occlusion (primarily water-based): penalized for inadequate overnight TEWL support
Moderate Occlusion (balanced emollient/occlusive): optimal for most skin types
Heavy Occlusion (petrolatum/wax-heavy): acceptable for very dry/eczematous skin; penalized only when lacking NMF support or creating congestion risk
Extreme Occlusion ("slugging"-level): acceptable only for severely compromised barrier; penalized for general-use formulations
---
MOISTURE RETENTION STABILITY
Evaluates: 7–8h hydration longevity, water-loss prevention, formula persistence under heat/bedding pressure, repeated-use consistency, endogenous NMF support.
REBOUND DRYNESS RULE:
Temporary sealing without sustained NMF/humectant support MUST reduce score.
Overnight amplification applies due to nightly repetition.
---
LONG-TERM SKIN COMPATIBILITY
Evaluates: Nightly-use tolerance, repeated prolonged exposure stability, sensitivity compatibility, acne compatibility under overnight occlusion, barrier adaptability, cumulative irritation, retinoid tolerance progression, microbiome interaction (minor modifier).
DELAYED IRRITATION RULE:
Low-level irritation accumulates faster overnight because contact duration is longer. Must reduce compatibility even if initially unnoticed.
DAMAGE ACCUMULATION RULE:
Repeated irritation accumulates into barrier instability, sensitivity progression, congestion buildup, and chronic inflammation. Overnight amplification factor applies.
---
OVERNIGHT RECOVERY SUPPORT
Evaluates: Circadian repair compatibility, overnight-active deployment, overnight resilience support, recovery-focused lipid balance, sustained comfort without suffocation, long-duration stability, cortisol-free repair-window support.
Scoring Rules:
• Circadian-Optimized (Tier A) → up to +0.3
• Correctly Formulated Retinoid → +0.2
• Functional Peptides → +0.1
• Fragrance-Heavy Overnight (F3/F4) → up to −0.4
• High Alcohol Overnight → −0.2
• Heavy Occlusion Without NMF Support → −0.2
TRUE RECOVERY RULE:
Rich texture, artificial nourishment perception, or heavy occlusion alone do NOT qualify as meaningful recovery support.
True recovery requires: physiological lipid architecture, Tier 3 NMF support, circadian compatibility, correctly formulated actives.
Marketing language alone = 0 recovery credit.
---
SPECIALIZED SCORE FORMULA
Specialized Score = Weighted average of all Specialized dimensions using weights specified above.
---
LAYER 8.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• 7–8h nightly exposure
• Weekly accumulation
• Overnight recovery vs daytime stress cycles
• Long-term hydration sustainability
• Occlusion + sebum + body heat interaction
• Retinoid tolerance progression
• AHA cumulative exposure
• Endogenous NMF behavior
• Long-term microbiome stability
• Circadian repair support vs interference
Core Question:
Can skin realistically tolerate and benefit from the formulation long-term while exploiting — not wasting — the overnight biological recovery window?
---
SKIN TYPE COMPATIBILITY DERIVATION RULES
All scores capped at 5.0; floored at 1.0.
DRY SKIN:
Base: 40% Hydration Depth + 40% Barrier Repair Strength + 20% Moisture Retention Stability
Modifiers: −0.3 occlusion <2.5; +0.3 full lipid triad at pH 4.5–5.5; +0.2 Tier 3 NMF
OILY / ACNE-PRONE:
Base: 40% Occlusion Balance + 40% Long-Term Compatibility + 20% Safety
Modifiers: −0.5 heavy occlusion dominance; −0.3 comedogenic-risk lipid architecture; +0.2 lightweight physiological lipid architecture
COMBINATION SKIN:
Base: Average of Specialized scores
Modifiers: −0.2 occlusion extremes; −0.1 heavy fragrance; no adjustment if balanced
SENSITIVE SKIN:
Base: Safety + Allergy Risk + Long-Term Compatibility
Modifiers: −0.6 fragrance present (F2–F4); −0.3 sensitizer present; −0.3 irritating active lacking barrier co-architecture; +0.2 fragrance-free + gentle preservative system; +0.1 physiological lipid triad
BARRIER-DAMAGED SKIN:
Base: 60% Barrier Repair Strength + 40% Overnight Recovery Support
Modifiers: +0.4 full ceramide triad + pH 4.5–5.5 + Tier 3 NMF; −0.6 fragrance/alcohol dominant; −0.3 high-oleic oil dominance; −0.4 high-strength retinoid lacking barrier co-architecture
---
LONG-TERM USABILITY DERIVATION RULES
NIGHTLY USE = Final Rating
Represents standard repeated overnight performance.
TWICE-NIGHTLY LAYERING =
Final Rating − (Fragrance Penalty × 1.3) − (Occlusion Penalty × 1.2) − (Active Irritation Penalty × 1.1)
Limits: minimum = Final Rating − 1.0; maximum = Final Rating
OCCASIONAL RECOVERY USE = Final Rating + 0.2 (cap: 5.0)
Reduced exposure lowers cumulative sensitization, congestion, and irritation burden.
---
ANTI-MARKETING FILTER
Penalty REQUIRED for formulations driven mainly by: heavy overnight fragrance (F3/F4), luxury sensory engineering, decorative botanical/peptide inflation, artificial nourishment perception, texture/richness-first design, heavy occlusive masking, active inflation lacking safeguards, petroleum-occlusive dependence, herbal/natural marketing without structural performance evidence.
Luxury feel, richness, or artificial radiance ≠ structural recovery.
Marketing dominance → visible score reduction.
---
WEAKNESS AUDIT
Neutralize bias from:
• Botanical inflation bias
• Richness/nourishment illusion bias
• Luxury texture inflation
• Fancy active inflation
• Late-ingredient rescue illusion
• Decorative marketing bias
• "Natural" = safe assumption
• Essential oil = safer than synthetic fragrance assumption
• Fragrance presence = automatic major penalty assumption (corrected: F1–F4 burden tier system applies; severity scales with burden, not mere existence)
• pH = automatically good/bad assumption (corrected: pH is contextual; overnight amplification applies proportionally)
• Non-physiological lipid over-penalization
• Petrolatum/silicone safety over-penalization
---
FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Score × 0.50)
HIGH SCORE ELIGIBILITY RULE
Scores >4.0 require excellence across:
• Physiological lipid architecture
• Long-term overnight compatibility
• Tier 2 minimum hydration
• Tier 3 preferred for 4.3+
• Repeated-use tolerance
• Irritation control
• Circadian compatibility
• Functional honesty
• pH compatibility (contextually assessed)
• Correctly formulated actives
Products with meaningful F3/F4 fragrance burden, weak barrier sophistication, unstable actives, heavy occlusion without NMF support, decorative inflation, or basic occlusive dependence MUST NOT qualify for elite scoring.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
---
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🌙 NIGHT CREAM PROFILE

## Functional Classification

Short functional description of the night cream type and intended skin behavior.

Examples:
- Physiological Lipid Overnight Barrier Cream
- NMF-Tier 3 Overnight Hydration System
- Retinoid-Barrier Recovery Cream
- Non-Physiological Occlusive Night Cream
- Circadian-Optimized Recovery Cream
- Fragrance-Heavy Overnight Cream
- AHA Overnight Renewal Cream
- Peptide-Based Overnight Recovery Cream

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short evidence-based classification covering overall structural quality, barrier support strength, hydration architecture, lipid class quality, NMF-component coverage, pH compatibility, active ingredient rationale, circadian compatibility, and expected long-term overnight skin outcome.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Overnight Recovery + Barrier Analysis

### Hydration Depth — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Repair Strength — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Occlusion Balance — ⭐X.X (Overnight calibration: Light / Moderate / Heavy / Excessive)

Short structural reason in plain language explaining why it scored this way.

### Moisture Retention Stability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Long-Term Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Overnight Recovery Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Major evidence-based structural advantage
- Major evidence-based structural advantage
- Major evidence-based structural advantage

## Weaknesses

- Major structural concern
- Major structural concern
- Major structural concern

---

# 🚨 CRITICAL ALERTS

## Triggered Structural Risks

Display ONLY when structurally triggered.

- **OVERNIGHT FRAGRANCE RISK:** Heavy fragrance under 7–8 hour leave-on — highest fragrance sensitization risk in skincare
- **RETINOID FORMULATION CONCERN:** [reason — unstable packaging / incompatible pH / AHA co-formulation]
- **HIGH-pH BARRIER SUPPRESSION:** pH [X.X] suppresses ceramide synthesis for full overnight duration
- **NMF SUPPRESSION RISK:** Heavy occlusion without NMF-component humectants — potential endogenous NMF depletion with nightly use
- **ACTIVE SAFETY CONCERN:** [reason — AHA + retinoid combination / concentration without barrier co-architecture]
- **REPEATED-USE SAFETY CONCERN:** [reason]

Remove section entirely if no critical alerts triggered.

---

# 👤 SKIN TYPE COMPATIBILITY

## Population Compatibility

### Dry Skin — ⭐X.X

Short compatibility explanation.

### Oily Skin — ⭐X.X

Short compatibility explanation.

### Combination Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Acne-Prone Skin — ⭐X.X

Short compatibility explanation.

### Barrier-Damaged Skin — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Nightly Use — ⭐X.X

Short explanation.

### Twice Nightly Layering — ⭐X.X

Short explanation.

### Occasional Recovery Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (1–7 Days)

- Hydration and texture feel upon waking
- Wearability under overnight occlusion
- Active ingredient tolerance (retinoid / AHA initial response)
- Irritation or sensitization signs under prolonged exposure

## Medium-Term (2–8 Weeks)

- Barrier response and moisture stability pattern
- Active ingredient skin adaptation (retinoid tolerance progression)
- Congestion or acne trends under overnight occlusion
- Sensitivity development or improvement

## Long-Term (2–12 Months)

- Barrier resilience under cumulative overnight use
- NMF system interaction (support or suppression)
- Cumulative sensitization risk from overnight fragrance and preservative exposure
- Circadian biology benefit realization
- Microbiome stability
- Skin health trajectory under repeated overnight use

## Realistic Dermatological Outcome

One concise conclusion covering barrier-focused vs cosmetic-focused outcome, physiological lipid and NMF system summary, circadian compatibility assessment, active ingredient contribution, and long-term overnight skin trajectory.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only functionally dominant ingredients. Note lipid class, NMF tier, and active category where applicable.

- [Ingredient] — [Role: barrier / humectant / occlusive / active / sensitizer] — [Lipid class if applicable] — [NMF tier if applicable] — [Active category if applicable]

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

3–5 concise evidence-based sentences covering barrier architecture quality and lipid class, hydration system tier and NMF coverage, irritation and sensitization profile (overnight amplification noted), occlusion balance calibrated to overnight context, circadian biology compatibility, active ingredient rationale, and pH compatibility across overnight exposure duration.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Include harsh fragrances, preservatives, and colorants in output
- No marketing influence
- No luxury or sensory bias
- No branding influence
- No ingredient-count bias
- Structural weakness overrides cosmetic feel
- Overnight fragrance burden carries the highest fragrance weight of any product category
- Repeated-use behavior > first-use feel
- Long-term outcome > immediate sensation
- Temporary softness, richness, or nourishment ≠ barrier repair
- Occlusion comfort ≠ skin health or recovery
- Perceived overnight transformation ≠ structural performance
- Petrolatum and silicones are safe — penalize only for repair inflation
- Non-physiological lipids provide valid occlusion — penalize only for barrier repair credit inflation
- NMF-tier awareness is mandatory in all hydration scoring
- pH compatibility must be assessed with overnight amplification applied
- Lipid class (physiological vs non-physiological) must be identified before barrier scoring
- Circadian biology must be assessed for every night cream evaluation
- Active ingredient compatibility and formulation integrity must be assessed where actives are present
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Night Cream Evaluation Algorithm — Structured for overnight barrier recovery analysis, circadian biology realism, active ingredient compatibility assessment, and long-term repeated-use skin health evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict NIGHT CREAM structural evaluation engine."
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