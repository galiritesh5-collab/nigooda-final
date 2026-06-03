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

# NIGHT CREAM EVALUATION ALGORITHM — VERSION B (OPTIMIZED LOSSLESS)

Evidence-Based Dermatological Scoring Engine — Overnight Recovery Specialist  
Preserves: ceramide ratio science, NMF mechanisms, pH-enzyme dependency, physiological lipid distinction, circadian biology, retinoid compatibility, overnight occlusion calibration, microbiome interaction, prolonged leave-on physiology.

---

# LAYER 0 — FOUNDATION ENGINE (STRICT)

## SYSTEM OBJECTIVE

Reward ONLY formulations demonstrating:
- Stable overnight hydration with genuine NMF depth
- Barrier-supportive physiological lipid architecture
- Effective use of the overnight recovery window
- Sustained 7–8h moisture retention
- Recovery support grounded in physiology, not marketing
- Repeated-use stability under prolonged occlusion
- Long-term compatibility with minimal irritation, congestion, or barrier stress

Penalty REQUIRED when formulations rely mainly on:
- Marketing hydration/recovery claims without structural support
- Temporary softness/richness illusion
- Decorative botanical/peptide inflation
- Texture-first moisturization
- Heavy occlusive masking presented as repair
- Luxury texture engineering
- Artificial nourishment perception
- Active inflation without overnight rationale
- Fragrance-heavy overnight elegance
- Petroleum-occlusive dependence without physiological lipid architecture
- Retinoid/AHA use lacking pH or stability safeguards

Basic moisturization alone CANNOT achieve high scores.  
Marketing-dominant systems MUST receive meaningful limitation.

---

## OVERNIGHT EXPOSURE RULE (MANDATORY)

All evaluation MUST simulate:
- 7–8h continuous leave-on exposure
- Bedding/pillow occlusive pressure
- Elevated sleep temperature (+0.5–1°C)
- Reduced evaporation vs daytime
- Continued sebum production under occlusion
- Repeated nightly accumulation over months
- Absence of UV/sweat/pollution stress
- Circadian repair biology context

Heavy, greasy, suffocating, unstable, or irritation-prone structures MUST lose compatibility credibility under prolonged overnight exposure.

Extended contact amplifies both:
- benefits of well-designed formulations
- harms from irritants, sensitizers, and occlusive overload

---

## TRANSPARENCY PRIORITY RULE

Ignore:
- Branding
- Luxury texture
- Natural positioning
- Trend actives
- Fancy naming
- Inflated ingredient lists
- “Morning radiance” marketing
- Decorative repair/renewal claims
- “Sleeping mask” luxury framing

Evaluate ONLY:
- NMF-tier hydration depth
- Physiological lipid quality
- Overnight occlusion calibration
- Circadian compatibility
- Repeated-use tolerance
- Long-term response
- Structural honesty
- pH compatibility
- Overnight active rationale/safety

Temporary comfort without structural support → high score prohibited.

---

## GLOBAL ENFORCEMENT RULE

Applies across ALL layers:
- Core architecture overrides additives
- Marketing-focused actives cannot override weak structure
- Late-position ingredients cannot neutralize weak systems
- Richness/softness ≠ barrier repair
- Basic sealing ≠ high score justification
- Heavy occlusion without sophistication MUST reduce credibility
- Non-physiological lipids CANNOT receive repair credit
- Safety/compatibility penalties override cosmetic bonuses
- Decorative recovery systems MUST reduce credibility
- Fragrance-heavy overnight exposure MUST face meaningful limitation
- True barrier sophistication MUST outperform basic occlusive systems
- Retinoids lacking pH/stability safeguards MUST trigger formulation integrity flag

---

## COSMETIC ELEGANCE FILTER

Rich texture, silicone softness, “nourishing” weight, or luxury feel MUST NOT be interpreted as:
- Strong hydration
- Barrier repair
- Skin recovery
- Long-term improvement
- Barrier sophistication

Artificial richness without structural support → credibility reduction.

“Morning radiance” used to describe cosmetic occlusion MUST be penalized as marketing inflation.

---

## STRUCTURE DOMINANCE RULE

Core structure determines:
- Barrier stability
- Hydration durability
- Overnight occlusion calibration
- Recovery support
- Irritation risk
- Congestion potential
- Long-term compatibility
- Functional overnight performance

Minor additives cannot override unstable structure.

Functionally useful:
- lipids
- ceramides
- cholesterol systems
- humectants
- retinoids
- peptides

MUST NOT be treated as decorative when meaningful contribution exists.

Ingredient value depends on:
- Concentration realism
- Overnight compatibility
- Positioning
- Repeated-use usefulness
- Barrier contribution
- Lipid class
- Recovery rationale

---

## BASIC MOISTURIZATION LIMIT RULE

Glycerin, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility.

Simple sealing without barrier sophistication or recovery support → moderate ceiling.

Applies equally to premium and budget systems.

---

## LATE-INGREDIENT LIMIT RULE

Late-position ingredients mainly provide:
- Surface comfort
- Temporary hydration
- Sensory elegance
- Minor soothing
- Cosmetic improvement

They CANNOT neutralize:
- Weak barrier structure
- Fragrance-heavy systems
- Occlusive imbalance
- Comedogenic overload
- Repeated irritation exposure
- Alcohol-heavy structures
- Retinoid instability
- Basic occlusive dependence

---

## REAL USEFULNESS RULE

Clear score improvement REQUIRED when formulation:
- Supports barrier resilience through physiological lipids
- Improves hydration depth (Tier 2 minimum, Tier 3 preferred)
- Exploits overnight recovery biology
- Maintains sustainable overnight hydration
- Shows repeated-use compatibility under prolonged occlusion
- Rationally balances humectants/emollients/occlusives
- Demonstrates recovery support beyond sealing
- Contains physiological lipids at pH 4.5–5.5
- Uses retinoids/AHAs/peptides appropriately with safeguards

Short-term comfort alone MUST NOT justify high scoring.

---

## MARKETING ILLUSION PENALTY

Penalty REQUIRED for formulations driven mainly by:
- Luxury sensory engineering
- Decorative botanical/peptide inflation
- Fragrance-focused overnight elegance
- Texture/richness-first moisturization
- Artificial nourishment perception
- Heavy occlusive masking
- Petroleum-occlusive dependence
- “Overnight miracle” active inflation

Traditional, herbal, minimalist, or lipid-focused systems MUST NOT be penalized when real structural usefulness is evident.

Perceived nourishment ≠ functional barrier repair.

---

# LAYER 1 — PHYSIOLOGICAL vs NON-PHYSIOLOGICAL LIPID RULE

## NON-PHYSIOLOGICAL LIPIDS

Definition:
Surface occlusives reducing TEWL without stimulating endogenous lipid synthesis.

Examples:
- Mineral oil
- Petrolatum
- Paraffin
- Vegetable oils
- Lanolin
- Beeswax
- Synthetic waxes
- Silicones
- Squalane
- Isolated fatty alcohols

Scoring:
- Receive moderate protection credit
- NOT eligible for repair credit
- No penalty merely for presence
- Penalize ONLY when dominant without physiological lipid architecture OR excessively congestive/suffocating overnight

Overnight context:
Non-physiological occlusion is acceptable as supplementary support, not as replacement for physiological repair.

---

## PHYSIOLOGICAL LIPIDS

Definition:
Lipids supporting endogenous intercellular repair.

Examples:
- Ceramides
- Cholesterol
- Free fatty acids
- Phytosphingosine
- Sphingosine

Scoring:
- Eligible for full repair credit
- Reward structural presence
- Require co-lipids for maximum benefit
- Optimal ratio approximates 3:1:1

Overnight context:
Repair activity is maximally effective during sleep due to stable temperature, reduced TEWL variability, and absence of UV degradation.

---

## OLEIC ACID CAUTION RULE

High oleic acid concentration disrupts lamellar bilayers, increases TEWL, and weakens barrier integrity.

High-oleic oils:
- olive
- sweet almond
- argan
- high-oleic sunflower

MUST NOT receive full physiological fatty-acid credit regardless of luxury positioning.

Preferred fatty-acid sources:
- linoleic acid
- palmitic acid
- stearic acid

---

## SQUALANE CLASSIFICATION

Squalane receives:
- partial occlusive credit
- minor breathability benefit
- NO barrier repair credit

Non-comedogenic advantage under overnight occlusion is a compatibility positive.

---

## LIPID RATIO BONUS RULE

Recognition tiers:
- Ceramide alone → moderate repair credit
- Ceramide + one co-lipid → good repair credit
- Full triad → strong repair credit + lipid ratio bonus

Overnight amplification:
Full physiological triad at pH 4.5–5.5 during 7–8h exposure represents maximum achievable topical barrier-repair conditions.

---

# LAYER 2 — FORMULATION pH RULE

## pH SCORING MODIFIER — OVERNIGHT AMPLIFICATION

pH importance is amplified overnight because exposure duration is maximized.

Optimal enzyme activity:
- Ceramide synthesis
- Filaggrin-to-NMF conversion
- NMF protease activity

requires acidic environment.

Skin physiological pH:
- 4.5–5.5

Night context:
Without UV/sweat perturbation, formulation pH becomes the dominant pH influence throughout exposure.

High-pH night creams suppress repair pathways for the full sleep duration.

---

## pH TIERS

| pH | Impact |
|---|---|
| 4.5–5.5 | Bonus to Barrier Repair, Hydration Depth, Overnight Recovery |
| 5.5–6.0 | Neutral |
| 6.0–7.0 | Mild-to-moderate penalty |
| >7.0 | Significant repair suppression penalty |
| Unknown | No bonus + −0.1 Ingredient Quality/Transparency |

---

## RETINOID pH INTERACTION RULE

Retinoid stability:
- optimal at pH 5.5–7.0

Ceramide enzyme function:
- optimal at pH 4.5–5.5

Best compromise:
- pH 5.5

Ceramide + retinoid systems at:
- pH 4.0
- pH 7.5+

→ formulation integrity flag.

---

# LAYER 3 — NMF COMPONENT RECOGNITION RULE

## HYDRATION DEPTH TIERING — OVERNIGHT AMPLIFICATION

Overnight is the highest-leverage window for NMF support because:
- TEWL is reduced
- temperature is stable
- enzymatic conversion is optimized
- contact time is maximized
- evaporation is minimized

---

## TIER 1 — SURFACE HYDRATION

Examples:
- Glycerin alone
- Film humectants
- Occlusion-only systems

Result:
- Temporary softness
- Wasted overnight opportunity
- No unique overnight benefit

Tier 1-only night creams fail to utilize the overnight hydration window.

---

## TIER 2 — EXTRACELLULAR HYDRATION

Examples:
- HA + glycerin
- Balanced glycerin + occlusion
- Betaine

Result:
- Better extracellular retention
- Improved overnight HA performance

---

## TIER 3 — INTRA-CORNEOCYTE HYDRATION

Examples:
- Urea
- Sodium PCA
- Amino acids
- Lactate systems
- Urocanic acid
- Multi-NMF systems

Result:
- Deep sustained hydration
- Maximum effectiveness overnight
- Optimal enzymatic/NMF support

---

## HYDRATION DEPTH SCORING

- Tier 1 only → max 2.5
- Tier 2 → max 3.5
- Tier 3 present → eligible up to 5.0
- Multi-tier systems → dominant tier + breadth bonus

---

## NMF-OCCLUSION INTERFERENCE PENALTY

Petrolatum/wax-heavy systems lacking Tier 3 NMF support MUST proportionally reduce:
- Hydration Depth
- Moisture Retention Stability

Overnight context amplifies this penalty because prolonged nightly occlusion may suppress filaggrin-to-NMF conversion and accelerate endogenous humectant depletion.

---

# LAYER 4 — CIRCADIAN BIOLOGY & OVERNIGHT PHYSIOLOGY RULE

## CIRCADIAN OPPORTUNITY MODIFIER

Nighttime skin biology creates a distinct recovery environment:
- Epidermal proliferation peaks midnight–4am
- DNA repair peaks nocturnally
- Cortisol drops
- Growth hormone peaks 11pm–1am
- Temperature rises 0.5–1°C
- TEWL follows overnight biphasic pattern

Well-designed formulations receive structural advantage when aligned with this biology.

---

## TIER A — CIRCADIAN-OPTIMIZED (+BONUS)

Characteristics:
- Fragrance-free or very low fragrance
- Physiological lipid support
- Tier 3 NMF humectants
- Functional peptides/retinoids
- pH 4.5–5.5

Supports:
- nocturnal lipid synthesis
- fibroblast activity
- enzymatic repair
- anti-inflammatory recovery window

---

## TIER B — CIRCADIAN-NEUTRAL

Structurally sound but not specifically optimized.

Examples:
- partial lipid systems
- glycerin hydration
- low fragrance

No bonus or penalty.

---

## TIER C — CIRCADIAN-ANTAGONISTIC (PENALTY)

Examples:
- Fragrance-heavy systems
- High alcohol
- Heavy occlusion without NMF support
- Irritant stacking under prolonged exposure

These waste or counteract the overnight repair window.

---

## APPLICATION RULE

Applies ONLY to:
- Overnight Recovery Support
- Long-Term Skin Compatibility

Maximum:
- +0.3 bonus
- −0.3 penalty

Does NOT independently affect:
- Safety
- Allergy Risk

---
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no barrier repair, nourishment, or long-term skin benefit in night creams and may increase unnecessary irritation burden.

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



# LAYER 5 — RETINOID & OVERNIGHT-ACTIVE COMPATIBILITY RULE

## OVERNIGHT ACTIVE INGREDIENT MODIFIER

Night creams are the primary delivery system for:
- retinoids
- functional AHAs
- peptides

Evaluation MUST determine whether actives are:
- correctly formulated for overnight use
OR
- decorative/marketing-driven
OR
- structurally destabilized

---

## CATEGORY A — OVERNIGHT-OPTIMIZED ACTIVES (REWARD)

### RETINOIDS
Examples:
- Retinol
- Retinaldehyde
- Retinyl esters
- Granactive retinoid

Evidence:
- collagen stimulation
- epidermal thickening
- pigmentation normalization

Requirements for structural credit:
- pH 5.5–7.0
- opaque/airless packaging
- no full-strength AHA combination
- ≥0.025% retinol equivalent

Retinol <0.01% equivalent:
- decorative only
- no active credit

Retinaldehyde:
- more potent than retinol
- meaningful at ≥0.05%

### RETINOID REWARDS
Correctly formulated retinoid:
- +0.2 Barrier Repair Strength
- +0.2 Overnight Recovery Support
- +0.1 Ingredient Quality

---

### FUNCTIONAL AHAs

Functional thresholds:
- Glycolic acid ≥5% at pH ≤3.8
- Lactic acid ≥5% at pH ≤3.8

Evidence:
- accelerated desquamation
- improved NMF generation
- mild ceramide synthesis stimulation

Requirements:
- functional pH
- appropriate overnight usage context
- not combined with full-strength retinoids

Retinoid + full-strength AHA:
- irritation amplification flag
- reduce Safety
- reduce Long-Term Compatibility

---

### FUNCTIONAL PEPTIDES

Examples:
- Matrixyl (palmitoyl pentapeptide-4) ≥3 ppm
- GHK-Cu ≥0.5%
- Acetyl hexapeptide-3 ≥10 ppm

Below threshold:
- decorative only
- no active credit

Correctly concentrated:
- +0.1 Overnight Recovery Support
- +0.1 Ingredient Quality

---

## CATEGORY B — INCORRECTLY DEPLOYED / DESTABILIZED ACTIVES (PENALIZE)

### RETINOL INSTABILITY
Retinol in transparent jar packaging lacking UV protection:
- −0.2 Ingredient Quality

---

### VITAMIN C AT NIGHT
Unstabilized L-ascorbic acid at night:
- no penalty
- no bonus
- lower overnight priority due to absent UV-protective role

---

### NON-FUNCTIONAL AHAs
AHAs:
- <3%
OR
- pH >4.5

→ decorative/pH-adjuster only; no active credit

---

### DECORATIVE RETINOL
“Retinol” listed late without concentration disclosure:
- assume decorative
- no credit

---

### NIACINAMIDE + VITAMIN C FLAG
Niacinamide ≥10% + Vitamin C:
- compatibility flag
- possible niacin flush risk under prolonged contact

---

## CATEGORY C — ACTIVE-RELATED SAFETY CONCERNS (PENALIZE)

### SENSITIZING ESSENTIAL OILS
Examples:
- Lavender oil
- Tea tree oil >1%
- Citrus oils

→ elevated Allergy Risk under overnight amplification

---

### HIGH ALCOHOL
SD alcohol >5% in dominant position:
- −0.2 Safety
- −0.2 Overnight Recovery Support

Disrupts barrier during peak renewal window.

---

### FORMALDEHYDE-RELEASING PRESERVATIVES
Examples:
- DMDM hydantoin
- Imidazolidinyl urea

Upper-list concentration:
- −0.3 Allergy Risk

Extended overnight exposure amplifies sensitization risk.

---

## ACTIVE MODIFIER APPLICATION

Active modifiers apply directly to relevant specialized dimensions before final averaging.

Limits:
- maximum active bonus = +0.5
- maximum active penalty = −0.6

Active bonuses CANNOT override:
- weak barrier architecture
- poor pH
- non-physiological lipid dependence

---

# LAYER 6 — MICROBIOME DISRUPTION RULE

## MICROBIOME MODIFIER — OVERNIGHT AMPLIFICATION

Minor modifier ONLY.  
Does NOT override:
- structural barrier scoring
- Safety
- Allergy Risk

Overnight context increases microbiome exposure duration to:
- preservatives
- alcohol
- antimicrobial botanicals
- pH disruption

Dysbiosis risk is therefore higher than equivalent daytime exposure.

---

## MICROBIOME DISRUPTION RISK FACTORS

- Methylisothiazolinone
- Methylchloroisothiazolinone
- DMDM hydantoin
- Formaldehyde releasers
- High alcohol concentration
- pH >6.0
- Strong antimicrobial botanicals

---

## MICROBIOME SUPPORT FACTORS

- Prebiotics
- Functional postbiotics
- Lactobacillus ferment systems
- pH 4.5–5.5

---

## APPLICATION

Applies ONLY to:
- Long-Term Skin Compatibility

Limits:
- maximum disruption = −0.3
- maximum support = +0.15

No independent effect on:
- Safety
- Allergy Risk
- Barrier Repair

---

# LAYER 7 — CORE SCORING SYSTEM
(1.0 to 5.0 stars)

## CORE SCORE FORMULA

Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)

---

# SAFETY [DOMINANT]

## Evaluates

- Irritation under prolonged overnight exposure
- Barrier destabilization during 7–8h contact
- Occlusion-related congestion/suffocation
- Repeated nightly sensitization
- Fragrance-heavy overnight exposure
- Retinoid irritation without barrier co-architecture
- Functional AHA irritation
- Preservative sensitization
- Structural suffocation
- Chronic inflammatory tendency during cortisol-free repair window

---

## OVERNIGHT FRAGRANCE SEVERITY RULE

Night cream fragrance represents the highest fragrance-risk category because:
- longest leave-on duration
- peak cell-renewal exposure
- cortisol-free anti-inflammatory window
- repeated nightly use over years

Fragrance-heavy night creams MUST receive the strongest fragrance-related penalties of any skincare category.

---

## RETINOID SAFETY RULE

Retinoid irritation is concentration + formulation dependent.

### Retinol ≥0.3% WITHOUT Barrier Co-Architecture
- irritation amplification flag
- −0.2 Safety

### Retinol ≥0.3% WITH Physiological Lipid Support
- no additional penalty

### Retinaldehyde ≥0.05% WITHOUT Barrier Support
- minor irritation flag

---

## PETROLATUM & SILICONE SAFETY CLARIFICATION

Petrolatum and silicones are NOT penalized for intrinsic safety.

Penalize ONLY for:
- barrier-repair inflation
- NMF-occlusion interference when dominant without NMF support

---

# EFFECTIVENESS

## Core Question

Can the formulation realistically support:
- hydration
- barrier recovery
- NMF generation
- long-term stability
- overnight biological recovery

under repeated overnight use?

---

## Evaluates

- Hydration depth (Layer 3)
- Barrier-support realism (Layer 1)
- Circadian compatibility (Layer 4)
- Overnight moisture retention
- Overnight-active rationale (Layer 5)
- Occlusion calibration
- Repeated-use consistency
- Long-term support
- pH compatibility (Layer 2)

---

## HIGH EFFECTIVENESS REQUIRES

- Tier 2 minimum hydration
- Tier 3 preferred
- Balanced overnight occlusion
- Stable barrier structure
- Circadian compatibility
- Physiological lipid support
- pH 4.5–6.0

Basic occlusion alone CANNOT achieve high effectiveness.

Richness/nourishment marketing MUST NOT inflate Effectiveness.

---

# ALLERGY RISK

## Evaluates

- Fragrance
- Essential oils
- Botanical sensitizers
- Preservative sensitivity
- Irritation stacking
- Retinoid-AHA irritation amplification
- Repeated nightly sensitization
- Microbiome disruption potential

---

## OVERNIGHT ALLERGY AMPLIFICATION RULE

7–8h exposure lowers effective sensitization thresholds.

Borderline daytime sensitizers may become meaningful overnight sensitizers under repeated exposure.

---

## FRAGRANCE TIERING RULE (NIGHT CREAM)

### HIGH-ALLERGEN FRAGRANCE
Examples:
- Linalool
- Limonene
- Cinnamal
- Eugenol
- Citral
- Isoeugenol

Leave-on overnight exposure:
- severe Allergy Risk penalty
- minimum −0.8

---

### LOW-ALLERGEN IFRA-COMPLIANT TRACE FRAGRANCE
- moderate penalty
- overnight amplification still applies

---

### FRAGRANCE-FREE
- Allergy Risk bonus

---

### UNDISCLOSED MASKING FRAGRANCE
- severe penalty

---

# ECO IMPACT

## Evaluates

- Biodegradability
- Environmental persistence
- Petroleum dependency
- Silicone persistence
- Ecological accumulation

---

## SILICONE ECO DISTINCTION

### Higher Persistence
- Cyclomethicone
- Cyclopentasiloxane
- D4/D5/D6

→ meaningful eco penalty

### Lower Persistence
- Dimethicone
- Dimethiconol

→ minor eco penalty

Environmental persistence MUST remain reflected in scoring.

Small eco positives cannot override structural weakness.

---

# INGREDIENT QUALITY

## Evaluates

- Overnight structural balance
- Functional synergy
- Barrier-support usefulness
- NMF-aware hydration architecture
- Overnight-active deployment
- Absence of decorative inflation
- pH compatibility
- Functional antioxidant distinction
- Retinoid stability/packaging integrity
- Peptide threshold realism

---

## ANTIOXIDANT FUNCTION RULE

### FUNCTIONAL
- Tocopherol ≥0.5%
- CoQ10 ≥0.1%
- Resveratrol ≥0.1%

→ contribute to Ingredient Quality

### DECORATIVE
- Trace antioxidant botanicals
- Trace resveratrol
- “Fermented” waters at tail position

→ no meaningful contribution

---

## ACTIVE STACKING RULE

Multiple trendy actives ≠ superior formulation.

Examples:
- retinol
- peptides
- AHAs
- vitamin C
- ceramides
- niacinamide
- bakuchiol

in same formula MAY reduce:
- Ingredient Quality
- compatibility credibility

Evaluate each active for:
- functional concentration
- compatibility
- overnight rationale

---

# SKIN COMPATIBILITY

## Evaluates

- Nightly-use tolerance
- Long-term repeated-use stability
- Sensitivity compatibility
- Acne compatibility under overnight occlusion
- Barrier adaptability
- Cumulative irritation potential
- Congestion buildup tendency
- Microbiome interaction

Heavy occlusive systems may retain moderate compatibility ONLY when:
- irritation remains controlled
- congestion remains controlled
- repeated-use balance remains acceptable

under 7–8h exposure.
# NIGHT CREAM EVALUATION ALGORITHM — VERSION B (OPTIMIZED LOSSLESS)

# LAYER 8 — SPECIALIZED PERFORMANCE

Evaluates realistic repeated-use overnight behavior.  
Score Range: 1.0–5.0

Equal weighting reflects that:
- Core safety/integrity
AND
- overnight recovery performance

are equally important in night creams.

Distinct from day creams where UV-related safety slightly dominates.

---

# SPECIALIZED DIMENSIONS

| Dimension | Weight |
|---|---|
| Barrier Repair Strength | 0.25 |
| Hydration Depth | 0.18 |
| Moisture Retention Stability | 0.16 |
| Overnight Recovery Support | 0.16 |
| Long-Term Skin Compatibility | 0.13 |
| Occlusion Balance | 0.12 |

Total = 1.00

---

# SCORE INTERPRETATION

| Score | Interpretation |
|---|---|
| 4.5–5.0 | Exceptional — elite physiological lipid architecture, Tier 3 NMF, optimized pH, circadian-compatible, correctly formulated actives |
| 4.0–4.4 | Strong — physiological lipid support, Tier 2–3 hydration, functional actives, overnight-appropriate |
| 3.5–3.9 | Good — solid structure with minor concerns |
| 3.0–3.4 | Moderate — functional but misses overnight recovery opportunity |
| 2.5–2.9 | Below Average — marketing-driven, weak architecture, or active misuse |
| 2.0–2.4 | Poor — major structural weakness, heavy overnight fragrance, or active safety concern |
| <2.0 | Avoid — critical formulation flaw or severe irritant exposure |

---

# HYDRATION DEPTH (OVERNIGHT-AMPLIFIED)

## Evaluates

- Overnight humectant performance
- Surface vs intra-corneocyte hydration
- 7–8h hydration persistence
- Tier 3 NMF support
- Filaggrin-to-NMF conversion opportunity

---

## SCORING RULES

- Tier 1 only:
  - max 2.5
  - wastes overnight hydration opportunity
- Tier 2:
  - max 3.5
- Tier 3 present:
  - eligible up to 5.0
  - small overnight bonus
- Multi-tier:
  - dominant tier + breadth bonus

---

## NMF-OCCLUSION INTERFERENCE PENALTY

Petrolatum/wax-heavy systems lacking Tier 3 NMF support MUST proportionally reduce:
- Hydration Depth
- Moisture Retention Stability

Overnight amplification applies because nightly NMF suppression is more damaging than daytime-only suppression.

---

# BARRIER REPAIR STRENGTH [HIGHEST WEIGHT — 25%]

## Evaluates

- Physiological vs non-physiological lipids
- Ceramide/cholesterol/fatty-acid balance
- Barrier resilience under prolonged exposure
- Nocturnal recovery support
- Long-term stability
- pH compatibility
- Retinoid co-architecture support

---

## SCORING RULES

### Non-Physiological Lipids Only
- max 2.5

### Partial Physiological System
- up to 3.5

### Full Physiological Triad
- strong repair credit
- 4.5+

### Full Triad + pH 4.5–5.5
- maximum repair potential
- +0.2 overnight amplification bonus

### Full Triad + pH >6.0
- meaningful reduction from prolonged overnight suppression

### Correctly Formulated Retinoid + Physiological Lipid Base
- +0.2 active bonus

---

# OCCLUSION BALANCE (OVERNIGHT-CALIBRATED)

## Evaluates

- Overnight sealing behavior
- TEWL reduction
- Occlusive heaviness calibration
- Congestion tendency
- Suffocation risk
- NMF-occlusion interaction

---

## OVERNIGHT OCCLUSION CALIBRATION RULE

Night creams appropriately tolerate heavier occlusion than day creams.

### Light Occlusion
Primarily water-based humectant systems:
- penalized for inadequate overnight TEWL support

### Moderate Occlusion
Balanced emollient/occlusive architecture:
- optimal for most skin types

### Heavy Occlusion
Petrolatum/wax-heavy systems:
- acceptable for very dry or eczematous skin
- penalized only when:
  - lacking NMF support
  - creating congestion risk

### Extreme Occlusion
“Slugging”-level occlusion:
- acceptable only for severely compromised barrier
- penalized for general-use formulations unless specialist-repair positioning is justified

---

# MOISTURE RETENTION STABILITY

## Evaluates

- 7–8h hydration longevity
- Water-loss prevention
- Formula persistence under heat/bedding pressure
- Repeated-use consistency
- Endogenous NMF support

---

## REBOUND DRYNESS RULE

Temporary sealing without sustained NMF/humectant support MUST reduce score.

Chronic heavy occlusion without NMF support may produce rebound dryness through endogenous NMF depletion.

Overnight amplification applies due to nightly repetition.

---

# LONG-TERM SKIN COMPATIBILITY

## Evaluates

- Nightly-use tolerance
- Repeated prolonged exposure stability
- Sensitivity compatibility
- Acne compatibility under overnight occlusion
- Barrier adaptability
- Cumulative irritation
- Retinoid tolerance progression
- Microbiome interaction

---

## DELAYED IRRITATION RULE

Low-level irritation accumulates faster overnight because contact duration is longer.

Must reduce compatibility even if initially unnoticed.

---

## DAMAGE ACCUMULATION RULE

Repeated irritation may accumulate into:
- barrier instability
- sensitivity progression
- congestion buildup
- chronic inflammation
- long-term tolerance reduction

Overnight amplification factor applies.

---

# OVERNIGHT RECOVERY SUPPORT

## Evaluates

- Circadian repair compatibility
- Overnight-active deployment
- Overnight resilience support
- Recovery-focused lipid balance
- Sustained comfort without suffocation
- Long-duration stability
- Cortisol-free repair-window support
- Growth-hormone-window compatibility

---

## SCORING RULES

### Circadian-Optimized (Tier A)
- up to +0.3

### Correctly Formulated Retinoid
- +0.2

### Functional Peptides
- +0.1

### Fragrance-Heavy Overnight
- up to −0.4

### High Alcohol Overnight
- −0.2

### Heavy Occlusion Without NMF Support
- −0.2

---

## TRUE RECOVERY RULE

Rich texture, artificial nourishment perception, or heavy occlusion alone do NOT qualify as meaningful recovery support.

True recovery requires:
- physiological lipid architecture
- Tier 3 NMF support
- circadian compatibility
- correctly formulated actives

Marketing language alone = 0 recovery credit.

---

## SPECIALIZED SCORE FORMULA

Specialized Score =
Average of all Specialized dimensions

---

# LAYER 8.5 — REAL-WORLD USAGE SIMULATION

Simulate:
- 7–8h nightly exposure
- Weekly accumulation
- Overnight recovery vs daytime stress cycles
- Long-term hydration sustainability
- Occlusion + sebum + body heat interaction
- Retinoid tolerance progression
- AHA cumulative exposure
- Endogenous NMF behavior
- Long-term microbiome stability
- Circadian repair support vs interference

## Core Question

Can skin realistically tolerate and benefit from the formulation long-term while exploiting — not wasting — the overnight biological recovery window?

---

# SKIN TYPE COMPATIBILITY DERIVATION RULES

All scores:
- capped at 5.0
- floored at 1.0

---

## DRY SKIN

Base:
- 40% Hydration Depth
- 40% Barrier Repair Strength
- 20% Moisture Retention Stability

Modifiers:
- −0.3 occlusion <2.5
- +0.3 full lipid triad at pH 4.5–5.5
- +0.2 Tier 3 NMF

---

## OILY / ACNE-PRONE

Base:
- 40% Occlusion Balance
- 40% Long-Term Compatibility
- 20% Safety

Modifiers:
- −0.5 heavy occlusion dominance
- −0.3 comedogenic-risk lipid architecture
- +0.2 lightweight physiological lipid architecture

---

## COMBINATION SKIN

Base:
- average Specialized scores

Modifiers:
- −0.2 occlusion extremes
- −0.1 heavy fragrance
- no adjustment if balanced

---

## SENSITIVE SKIN

Base:
- Safety
- Allergy Risk
- Long-Term Compatibility

Modifiers:
- −0.6 fragrance present
- −0.3 sensitizer present
- −0.3 irritating active lacking barrier co-architecture
- +0.2 fragrance-free + gentle preservative system
- +0.1 physiological lipid triad

---

## BARRIER-DAMAGED SKIN

Base:
- 60% Barrier Repair Strength
- 40% Overnight Recovery Support

Modifiers:
- +0.4 full ceramide triad + pH 4.5–5.5 + Tier 3 NMF
- −0.6 fragrance/alcohol dominant
- −0.3 high-oleic oil dominance
- −0.4 high-strength retinoid lacking barrier co-architecture

---

# LONG-TERM USABILITY DERIVATION RULES

## NIGHTLY USE
Nightly Use = Final Rating

Represents:
- standard repeated overnight performance

---

## TWICE-NIGHTLY LAYERING

Twice Nightly Layering =
Final Rating -
(Fragrance Penalty × 1.3) -
(Occlusion Penalty × 1.2) -
(Active Irritation Penalty × 1.1)

Represents:
- amplified cumulative overnight exposure stress

Limits:
- minimum = Final Rating − 1.0
- maximum = Final Rating

---

## OCCASIONAL RECOVERY USE

Occasional Recovery Use =
Final Rating + 0.2

Cap:
- 5.0 maximum

Reduced exposure lowers cumulative:
- sensitization
- congestion
- irritation burden

---

# ANTI-MARKETING FILTER

Penalty REQUIRED for formulations driven mainly by:
- Heavy overnight fragrance
- Luxury sensory engineering
- Decorative botanical/peptide inflation
- Artificial nourishment perception
- Texture/richness-first design
- Heavy occlusive masking
- Active inflation lacking safeguards
- Petroleum-occlusive dependence

Luxury feel, richness, or artificial radiance ≠ structural recovery.

Marketing dominance → visible score reduction.

---

# FINAL RATING FORMULA

Final Rating =
(Core Score × 0.50) +
(Specialized Score × 0.50)

---

# HIGH SCORE ELIGIBILITY RULE

Scores >4.0 require excellence across:
- Physiological lipid architecture
- Long-term overnight compatibility
- Tier 2 minimum hydration
- Tier 3 preferred for 4.3+
- Repeated-use tolerance
- Irritation control
- Circadian compatibility
- Functional honesty
- pH compatibility
- Correctly formulated actives

Products with:
- meaningful fragrance burden
- weak barrier sophistication
- unstable actives
- heavy occlusion without NMF support
- decorative inflation
- basic occlusive dependence

MUST NOT qualify for elite scoring.

---
OUTPUT FORMAT
---
⭐ FINAL RATING X.X / 5 — Rating Level
---
⚖ STRUCTURAL QUALITY
Short evidence-based classification of the formulation's overall structural quality, barrier support strength, hydration architecture, lipid class quality, NMF-component coverage, pH compatibility, active ingredient rationale, circadian compatibility, and expected long-term overnight skin outcome.
---
🌙 NIGHT CREAM PROFILE
Short functional description of the night cream type and intended skin behavior. Examples:
Physiological Lipid Overnight Barrier Cream
NMF-Tier 3 Overnight Hydration System
Retinoid-Barrier Recovery Cream
Non-Physiological Occlusive Night Cream
Circadian-Optimized Recovery Cream
Fragrance-Heavy Overnight Cream
AHA Overnight Renewal Cream
Basic Occlusive Night Moisturizer
Peptide-Based Overnight Recovery Cream
---
📊 CORE SCORES
(Include a short structural reason for every score)
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
---
🧪 SPECIALIZED PERFORMANCE
(Include a short structural reason for every score)
Hydration Depth — ⭐X.X (
Barrier Repair Strength — ⭐X.X
Occlusion Balance — ⭐X.X (Overnight calibration: Light / Moderate / Heavy / Excessive)
Moisture Retention Stability — ⭐X.X
Long-Term Skin Compatibility — ⭐X.X
Overnight Recovery Support — ⭐X.X
👍 STRUCTURAL ADVANTAGES
(Major evidence-based structural advantages only)
X
X
X
---
⚠ STRUCTURAL CONCERNS
(Major structural concerns only)
X
X
X
---
🚨 CRITICAL ALERTS
(Display ONLY when structurally triggered)
OVERNIGHT FRAGRANCE RISK: Heavy fragrance under 7–8 hour leave-on — highest fragrance sensitization risk in skincare
RETINOID FORMULATION CONCERN: [reason — unstable packaging / incompatible pH / AHA co-formulation]
HIGH-pH BARRIER SUPPRESSION: pH [X.X] suppresses ceramide synthesis for full overnight duration
NMF SUPPRESSION RISK: Heavy occlusion without NMF-component humectants — potential endogenous NMF depletion with nightly use
ACTIVE SAFETY CONCERN: [reason — AHA + retinoid combination / concentration without barrier co-architecture]
REPEATED-USE SAFETY CONCERN: [reason]
(Remove section entirely if no critical alerts triggered)
---
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X
Oily Skin → ⭐X.X
Combination Skin → ⭐X.X
Sensitive Skin → ⭐X.X
Acne-Prone Skin → ⭐X.X
Barrier-Damaged Skin → ⭐X.X
---
📅 LONG-TERM USABILITY
Nightly Use → ⭐X.X
Twice Nightly Layering → ⭐X.X
Occasional Recovery Use → ⭐X.X
---
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 Days)
Hydration and texture feel upon waking
Wearability under overnight occlusion
Active ingredient tolerance (retinoid/AHA initial response)
Irritation or sensitization signs under prolonged exposure
Medium-Term (2–8 Weeks)
Barrier response and moisture stability pattern
Active ingredient skin adaptation (retinoid tolerance progression)
Congestion or acne trends under overnight occlusion
Sensitivity development or improvement
Long-Term (2–12 Months)
Barrier resilience under cumulative overnight use
NMF system interaction (support or suppression)
Cumulative sensitization risk from overnight fragrance/preservative exposure
Circadian biology benefit realization (cell renewal support over time)
Microbiome stability
Skin health trajectory under repeated overnight use
Realistic Dermatological Outcome
One concise conclusion: barrier-focused vs cosmetic-focused outcome, physiological lipid and NMF system summary, circadian compatibility assessment, active ingredient contribution, and long-term overnight skin trajectory.
---
🔬 KEY STRUCTURAL INGREDIENTS
(Functionally dominant ingredients only — lipid class, NMF tier, active category noted)
[Ingredient] — [Role: barrier / humectant / occlusive / active / sensitizer] — [Lipid class if applicable] — [NMF tier if applicable] — [Active category if applicable]
---
🧠 WHY THIS RATING
3–5 concise evidence-based sentences focusing on:
Barrier architecture quality and lipid class
Hydration system tier and NMF coverage
Irritation / sensitization profile (overnight amplification noted)
Occlusion balance calibrated to overnight context
Circadian biology compatibility and overnight recovery opportunity
Active ingredient rationale and correct deployment
pH compatibility impact across overnight exposure duration
---
📌 STRUCTURAL INSIGHT
Strengths
X
X
X
Weaknesses
X
X
X

---
STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS
include harsh fragrances,preservatives and fragrances in output
Maintain strict dermatological evaluation principles
No marketing influence
No luxury or sensory bias
No branding influence
No ingredient-count bias
Structural weakness overrides cosmetic feel
Overnight fragrance burden carries the highest fragrance weight of any product category
Repeated-use behavior > first-use feel
Long-term outcome > immediate sensation
Temporary softness, richness, or nourishment ≠ barrier repair
Occlusion comfort ≠ skin health or recovery
Perceived overnight transformation ≠ structural performance
Petrolatum and silicones are safe — penalize for repair inflation, not existence
Non-physiological lipids provide valid occlusion — penalize only for barrier repair credit inflation
NMF-tier awareness is mandatory in all hydration scoring
pH compatibility must be assessed for all formulations with overnight amplification applied
Lipid class (physiological vs non-physiological) must be identified before barrier scoring
Circadian biology must be assessed for every night cream evaluation
Active ingredient compatibility and formulation integrity must be assessed where actives are present
All output scores must be derivable from the formulas stated in this algorithm
Do not expose internal scoring formulas or layer references in output
Output tone MUST remain analytical, clinical, realistic, and repeated overnight-use focused
-









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
              "You are a strict clinical night cream structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "CLINICAL NIGHT CREAM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();