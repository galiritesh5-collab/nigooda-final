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

        day_cream_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL DAY CREAM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

DAY CREAM EVALUATION ALGORITHM — VERSION B (OPTIMIZED LOSSLESS)
Evidence-Based Dermatological Scoring Engine — Daytime Formulation Specialist
 Preserves: ceramide ratio science, NMF mechanisms, pH-enzyme dependency, physiological lipid distinction, sunscreen-layering chemistry, microbiome interaction, photosensitizer-UV interaction, daytime physiology logic.

LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward ONLY formulations demonstrating:
Stable daytime hydration
Barrier-supportive architecture
Breathable wearability
Balanced moisture retention without occlusive suffocation
Repeated-use stability under UV, heat, sweat, and pollution
Long-term compatibility under realistic daytime exposure
Minimal irritation, congestion, photosensitization, or layering instability
Penalty REQUIRED when driven mainly by:
Marketing hydration/radiance claims
Temporary softness/glow illusion
Silicone-dominant sensory elegance
Decorative botanical/antioxidant inflation
Texture-first or glow-first moisturization
Heavy occlusive masking without barrier repair structure
Fragrance-focused elegance
Active inflation without structural support
Petroleum-occlusive dependence lacking physiological lipid architecture
Photosensitizing botanicals/citrus oils without UV safety disclosure
Basic moisturization alone CANNOT achieve high scores.
 Marketing-dominant systems MUST receive visible score limitation.

DAYTIME EXPOSURE RULE (MANDATORY)
All evaluation MUST simulate:
6–10h UV-A/UV-B exposure
Heat/sweat-enhanced irritant penetration
Pollution adhesion to occlusive residue
Sunscreen layering + film stability interaction
8–12h wear duration
Oxidative daytime stress
Photoactivation of sensitizers
Heavy, greasy, unstable, phototoxic, or irritation-prone structures MUST lose compatibility credibility under realistic daytime exposure.

TRANSPARENCY PRIORITY RULE
Ignore:
Branding
Luxury texture
Natural/trend positioning
Fancy ingredient naming
Inflated ingredient lists
Glow/radiance/luminosity marketing
Decorative antioxidant/botanical positioning
Evaluate ONLY:
Hydration realism (NMF-tier based)
Barrier support (physiological lipid quality)
Breathable occlusion balance
Repeated-use UV/heat tolerance
Long-term skin response
Structural honesty
Daytime stability/layering compatibility
pH compatibility
Photosensitizer safety
Temporary comfort/glow without structural support → high score prohibited.

GLOBAL ENFORCEMENT RULE
Applies across ALL layers:
Core architecture overrides additives
Marketing-focused actives cannot override structural weakness
Late-position ingredients cannot neutralize weak systems
Cosmetic softness/glow/silicone elegance ≠ repair or skin health
Basic sealing alone ≠ high score justification
Heavy occlusion without sophistication MUST reduce credibility
Safety/compatibility penalties override cosmetic bonuses
Non-physiological lipids CANNOT receive repair credit
Decorative hydration/glow systems MUST reduce credibility
Photosensitizers MUST trigger safety penalties
Unsupported hydration/radiance claims MUST reduce trustworthiness
Fragrance-heavy, alcohol-heavy, or structurally weak systems MUST face visible limitation under repeated-use evaluation

COSMETIC ELEGANCE FILTER
Smoothness, glow, velvet finish, silicone softness, reflective shine, or luxury sensory refinement MUST NOT be interpreted as:
Strong hydration
Barrier repair
Nourishment
Long-term improvement
Barrier sophistication
Artificial cosmetic refinement without meaningful structural support → credibility reduction.
 Glow/radiance marketing MUST NOT inflate scores.

STRUCTURE DOMINANCE RULE
Core architecture determines:
Barrier stability
Hydration durability
Occlusion behavior
Heat compatibility
Layering stability
Irritation/congestion risk
Long-term compatibility
Functional performance
Minor additives cannot override unstable structure.
Functionally useful ceramides, lipids, cholesterol systems, humectants, emollients, or barrier-supportive ingredients MUST NOT be treated as decorative when meaningful contribution exists.
Ingredient value depends on:
Concentration realism
Functional compatibility
Positioning
Repeated-use usefulness
Barrier contribution
Lipid class
Daytime wearability
Photosafety
Heavy sensory systems with weak structure MUST reduce credibility.

BASIC MOISTURIZATION LIMIT RULE
Glycerin, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility.
Simple sealing without barrier sophistication or breathable balance → moderate score ceiling.

LATE-INGREDIENT LIMIT RULE
Late-position soothing, botanical, antioxidant, peptide, or decorative ingredients mainly provide:
Surface comfort
Temporary hydration
Sensory elegance
Minor soothing
Cosmetic improvement
They CANNOT neutralize:
Weak barrier architecture
Fragrance-heavy systems
Occlusive imbalance
Repeated irritation exposure
Alcohol-heavy structures
Poor daytime wearability
Photosensitizer burden
Basic occlusive dependence
Temporary softness ≠ long-term improvement.

FUNCTIONAL CONCENTRATION RULE
Higher concentration ≠ automatically better.
Ingredients such as:
Ceramides
Niacinamide
Panthenol
Urea
Cholesterol
Hyaluronic acid
Vitamin C
Peptides
may remain effective at lower concentrations depending on formulation balance/positioning.
Concentration used mainly for:
Label appeal
Active inflation
Trend marketing
Luxury positioning
MUST NOT receive extra scoring advantage.
Structural compatibility overrides concentration marketing.
 High actives without barrier balance, irritation control, breathable wearability, or repeated-use stability may reduce usability.

REAL USEFULNESS RULE
Clear score improvement REQUIRED when formulation:
Supports barrier resilience under repeated daytime exposure
Maintains sustainable hydration across realistic wear duration
Demonstrates breathable wearability
Shows UV/heat/sweat compatibility
Rationally balances humectants/emollients/occlusives
Maintains sunscreen layering stability
Contains physiological lipid architecture
Maintains pH 4.5–5.5
Includes NMF-component ingredients
Avoids photosensitizers under UV context
Short-term comfort/glow/softness alone MUST NOT justify high scoring.
 Basic moisturization alone → moderate ceiling.

MARKETING ILLUSION PENALTY
Penalty REQUIRED for formulations driven mainly by:
Luxury sensory engineering
Silicone-softness/velvet-skin illusion
Decorative botanical/antioxidant inflation
Fragrance-focused elegance
Glow/radiance-focused marketing
Texture-first moisturization
Active inflation without structural balance
Heavy occlusive masking presented as nourishment
Petroleum-occlusive dependence
Traditional, herbal, minimalist, or lipid-focused systems MUST NOT be penalized when real structural usefulness and repeated-use compatibility are evident.
Perceived radiance ≠ functional barrier support.
 Marketing-dominant structure → visible score reduction.

TRANSPARENCY BONUS RULE
Apply SMALL bonus ONLY when formulation demonstrates:
Rational daytime architecture
Balanced hydration logic (Tier 2 minimum)
Breathable occlusion balance
Honest ingredient positioning
Clear functional purpose
Stable barrier-supportive structure
Repeated-use design intelligence
pH 4.5–5.5
Physiological lipid triad
Photosafe ingredient selection
Cannot override:
Safety penalties
Barrier instability
Occlusion imbalance
Irritation risk
Structural weakness

LAYER 1 — PHYSIOLOGICAL vs NON-PHYSIOLOGICAL LIPID RULE
NON-PHYSIOLOGICAL LIPIDS
Definition: Reduce TEWL mainly via surface occlusion without stimulating endogenous lipid synthesis.
Examples:
Mineral oil
Petrolatum
Paraffin wax
Vegetable oils
Lanolin
Beeswax
Synthetic waxes
Dimethicone/silicones
Squalane
Isolated fatty alcohols
Scoring:
Receive moderate occlusive/barrier protection credit
NOT eligible for barrier repair credit
No penalty merely for presence
Penalize ONLY when dominant without physiological lipid architecture OR when causing congestion/breathability issues
Balanced petrolatum/silicones + physiological lipids → no extra penalty.

PHYSIOLOGICAL LIPIDS
Definition: Penetrate epidermis and support endogenous intercellular lipid repair.
Examples:
Ceramides (all classes)
Cholesterol
Free fatty acids
Phytosphingosine
Sphingosine
Scoring:
Eligible for full barrier repair credit
Reward structural presence
Require co-lipids for maximal benefit
Optimal ratio approximates ceramide:cholesterol:fatty acid = 3:1:1

OLEIC ACID CAUTION RULE
High oleic acid concentration disrupts lamellar bilayers, increases TEWL, and weakens barrier integrity.
High-oleic oils (olive oil, high-oleic sunflower) MUST NOT receive full physiological fatty acid credit.
Linoleic and palmitic acid are preferred for barrier support.

SQUALANE CLASSIFICATION
Squalane is classified as non-physiological for scoring because primary action is surface emollience/TEWL reduction.
Receives:
Partial occlusive credit
Minor breathability credit
NO barrier repair credit

LIPID RATIO BONUS RULE
Small bonus when formulation demonstrates:
Ceramide + cholesterol + fatty acid co-presence
Recognition tiers:
Ceramide alone → moderate repair credit
Ceramide + one co-lipid → good repair credit
Full triad → strong repair credit + lipid ratio bonus
3:1:1 physiological ratio strongly supports barrier recovery, TEWL reduction, and hydration improvement.

LAYER 2 — FORMULATION pH RULE
pH SCORING MODIFIER
Formulation pH is mandatory because it directly affects:
Ceramide synthesis enzymes
Filaggrin-to-NMF conversion
Barrier repair pathways
Hydration depth
Optimal skin pH: 4.5–5.5
 Sweat exposure may temporarily elevate pH, amplifying baseline pH sensitivity.
pH Tiering
pH
Impact
4.5–5.5
Small bonus to Barrier Repair + Hydration Depth
5.5–6.0
Neutral
6.0–7.0
Mild penalty
>7.0
Meaningful penalty
Unknown
No bonus + −0.1 Transparency/Ingredient Quality

pH penalties apply regardless of ceramide quality.
 High-pH ceramide systems partially undermine their own repair mechanism.

LAYER 3 — NMF COMPONENT RECOGNITION RULE
HYDRATION DEPTH TIERING
Tier 1 — Surface Hydration (Low Depth)
Examples:
Glycerin alone
Film-forming humectants
Occlusion-only systems
Mechanism:
Surface water attraction without corneocyte penetration
Result:
Temporary softness
Rapid daytime depletion
Rebound dryness without occlusion support
Heat/low humidity further reduce effectiveness.
Tier 2 — Extracellular Hydration (Moderate Depth)
Examples:
HA + glycerin systems
Glycerin + balanced occlusion
Betaine
Mechanism:
Improved extracellular SC water retention
Result:
Better retention
No intra-corneocyte hydration
Adequate under mild daytime conditions
Tier 3 — Intra-Corneocyte Hydration (High Depth)
Examples:
Urea
Sodium PCA
Amino acid blends
Lactic acid/sodium lactate
Urocanic acid
Multi-NMF systems
Mechanism:
Mimic/supplement endogenous NMF within corneocyte keratin matrix
Result:
Deep sustained hydration
Better elasticity
Barrier homeostasis support
Stable hydration under sweat/temperature cycles

HYDRATION DEPTH SCORING
Tier 1 only → max 2.5
Tier 2 → max 3.5
Tier 3 present → eligible up to 5.0
Mixed tiers → dominant tier + multi-tier bonus

NMF-OCCLUSION INTERACTION RULE
Heavy occlusion without NMF support may suppress filaggrin-to-NMF conversion by maintaining excessive water activity.
Petrolatum/wax-dominant systems lacking Tier 3 NMF ingredients MUST reduce:
Moisture Retention Stability
Long-Term Skin Compatibility
proportionally.
LAYER 4 — PHOTOSENSITIZER & UV-INTERACTION RULE (DAYTIME-SPECIFIC)
PHOTOSAFETY MODIFIER (MANDATORY)
Day creams undergo prolonged UV-A/UV-B exposure (6–12h). Certain ingredients become phototoxic, photoallergenic, or UV-unstable under exposure and MUST be evaluated separately from standard irritation risk.

CATEGORY A — PHOTOTOXIC INGREDIENTS
Direct UV-activated cellular damage; dose-dependent.
Examples:
Furocoumarins/psoralens:
Bergapten
Psoralen
Isopsoralen
Present in:
Bergamot oil
Cold-pressed lime/lemon oils
Angelica root oil
Celery seed oil
Grapefruit oil
Coal tar derivatives
High-dose AHAs at low pH:
Glycolic/lactic acid >10% at pH <3.5 with sun exposure
Scoring Impact
Confirmed meaningful phototoxic concentration:
CRITICAL ALERT mandatory
−0.8 Safety
−0.5 Allergy Risk
Trace/low concentration with confirmed furocoumarin removal (FCF/rectified citrus):
Minor flag only
No critical penalty

CATEGORY B — PHOTOALLERGENIC INGREDIENTS
Immune-mediated; concentration-independent.
Examples:
Oxybenzone
PABA
Certain cinnamates
Certain musks/fragrance compounds
Specific botanical phenols/coumarins
Scoring Impact
Known photoallergenic ingredient:
−0.3 Allergy Risk
Long-Term Compatibility note
Multiple photoallergens:
cumulative penalty

CATEGORY C — UV-STABILITY INSTABILITY
Photolabile ingredients degrading under UV.
Examples:
Unstabilized L-ascorbic acid
Retinoids under UV
Benzoyl peroxide without UV-opaque packaging
Scoring Impact
Unstabilized photolabile actives:
Ingredient Quality reduction
Effectiveness note
Proper stabilization:
no penalty
Examples of stabilization:
Vitamin C + Vitamin E + Ferulic Acid
Airless/opaque packaging

PHOTOSENSITIZER OVERRIDE RULE
Photosafety penalties override:
Botanical positioning
Natural claims
Luxury heritage
Decorative antioxidant branding
Luxury phototoxic formulations receive identical penalties as cheap ones.
Elegance does NOT neutralize photodamage risk.

LAYER 5 — MICROBIOME DISRUPTION RULE (MINOR MODIFIER)
MICROBIOME MODIFIER
Minor long-term compatibility modifier ONLY.
 Does NOT override structural barrier or safety scoring.
Daytime UV, heat, and sweat already stress microbiome balance. Certain preservatives, alcohol systems, antimicrobial botanicals, and high-pH structures may promote dysbiosis.

MICROBIOME DISRUPTION RISK FACTORS
Methylisothiazolinone
Methylchloroisothiazolinone
Formaldehyde releasers
High alcohol concentration
pH >6.0
Strong antimicrobial botanicals at upper positions

APPLICATION
Applies ONLY to:
Long-Term Skin Compatibility
Skin Compatibility
Maximum modifier:
−0.3 per dimension
Clinically supported microbiome-supportive ingredients:
Prebiotics
Postbiotics
Lactobacillus ferments
may offset:
+0.1 to +0.2
Microbiome modifier remains minor and non-dominant.

LAYER 6 — SUNSCREEN LAYERING CHEMISTRY RULE (DAYTIME-SPECIFIC)
LAYERING CHEMISTRY MODIFIER
Day creams are routinely layered beneath SPF. Certain structures reduce sunscreen film integrity and UV protection reliability.
Potential mechanisms:
UV-filter redistribution
Film destabilization
Pilling
SPF dilution
Emulsifier incompatibility

LAYERING DISRUPTION RISK FACTORS
Petrolatum/wax-heavy bases
Dominant cyclic silicone systems (>15%) lacking polar emollient balance
Alcohol >10%
Cationic emulsifiers:
Behentrimonium methosulfate
Cetrimonium chloride
Potential consequences:
Uneven SPF spreading
Film disruption
Pilling
UV-filter redistribution

LAYERING COMPATIBILITY SCORING
High disruption risk:
−0.4 Layering Compatibility
Structural Concern note
Moderate risk:
−0.2
Rational layering architecture:
lightweight balanced emollients
stable film formation
neutral emulsifier systems
→ +0.2 bonus

APPLICATION RULE
Affects ONLY:
Layering Compatibility
Does NOT independently reduce:
Safety
Allergy Risk
If SPF disruption meaningfully compromises UV protection:
Critical Alert note added
LAYER 6.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no barrier repair, hydration, or long-term skin benefit in day creams and may increase unnecessary irritation burden.

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
• Skin Compatibility penalty\

Multiple synthetic dyes increase penalties further.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”


LAYER 7 — CORE SCORING SYSTEM
EVALUATED FROM 1.0 STAR TO 5.0 STAR
SAFETY [DOMINANT]
Evaluates
Leave-on irritation risk
Barrier destabilization
Heat/sweat occlusive stress
Repeated-use sensitization
Fragrance/alcohol amplification under heat
Congestion risk
Structural suffocation
Chronic inflammation potential
Photosensitizer presence
Repeated UV exposure stress
Repeated irritation, instability, fragrance-heavy exposure, phototoxicity, or chronic occlusive stress MUST reduce Safety.
Evaluation MUST simulate realistic daytime wear:
UV
Heat
Sweat
Sunscreen layering

HIDDEN IRRITATION RULE
Low-level irritation accumulating over time MUST reduce Safety.
Overrides:
Luxury positioning
Sensory elegance
Temporary softness
Marketing claims
Repeated daytime use context is mandatory.

PHOTOSENSITIZER SAFETY OVERRIDE
Confirmed Category A phototoxic ingredient at meaningful concentration:
Safety CANNOT exceed 2.5
CRITICAL ALERT mandatory

SILICONE SAFETY CLARIFICATION
Silicones are NOT inherently penalized for safety:
inert
low-sensitizing
usually non-comedogenic
Penalty ONLY when:
masking poor structure
excessive cyclic silicone eco concerns

PETROLATUM SAFETY CLARIFICATION
Petrolatum:
non-sensitizing
non-irritating
generally non-comedogenic
Not penalized for Safety.
Potential daytime suffocation/sweat retention affects:
wearability
effectiveness
 NOT intrinsic safety.

EFFECTIVENESS
Core Question
Can the formulation realistically support:
hydration
barrier function
breathable daytime wearability
long-term stability
 under repeated daytime use?

Evaluates
Hydration performance (Layer 3)
Barrier-support realism (Layer 1)
Moisture-retention durability
Breathable occlusion
Sunscreen layering stability
Structural balance
Repeated-use consistency
Long-term support
pH compatibility (Layer 2)
Ignore:
Branding
Sensory elegance
Ingredient hype
Trend actives
Glow marketing

High Effectiveness Requires
Tier 2 hydration minimum (Tier 3 preferred)
Breathable daytime occlusion
Stable barrier-support structure
Heat/UV repeated-use compatibility
Physiological lipid presence
Acceptable pH
Stable sunscreen layering
Basic occlusion alone CANNOT achieve high effectiveness.
Silicone elegance, cosmetic smoothness, or glow MUST NOT inflate Effectiveness.

ALLERGY RISK
Evaluates
Fragrance type/concentration
Essential oils
Botanical sensitizers
Preservative sensitivity
Irritation stacking
Repeated UV-amplified sensitization
Photoallergens (Layer 4)
Microbiome disruption potential (minor modifier)
Multiple sensitizers increase cumulative risk.
Daytime UV amplification significantly increases importance.
Citrus oils, aromatic extracts, limonene, linalool, and coumarin-containing botanicals MUST receive elevated allergy-risk weighting in daytime context.

FRAGRANCE TIERING RULE
High-Allergen Fragrance
Examples:
Linalool
Limonene
Cinnamal
Eugenol
Citral
Detectable leave-on levels:
meaningful Allergy Risk penalty
Low-Allergen IFRA-Compliant Trace Fragrance
minor penalty
note added
Fragrance-Free
Allergy Risk bonus
Undisclosed Masking Fragrance
penalized as undisclosed fragrance

ECO IMPACT
Evaluates
Biodegradability
Environmental persistence
Petroleum dependency
Silicone persistence
Ecological accumulation
Packaging sustainability:
informational only
not scored

SILICONE ECO DISTINCTION
Higher Persistence (Meaningful Penalty)
Cyclomethicone
Cyclopentasiloxane
D4/D5/D6
Lower Persistence (Minor Penalty)
Dimethicone
Dimethiconol
Environmental persistence MUST remain reflected in scoring.
Small eco advantages cannot override structural weakness.

INGREDIENT QUALITY
Evaluates
Structural balance
Functional synergy
Barrier-support usefulness
NMF-aware hydration architecture
Breathable daytime balance
Absence of decorative inflation
Absence of inappropriate photosensitizers
pH compatibility
Functional vs decorative antioxidants

ANTIOXIDANT FUNCTION RULE
Functional Antioxidants
Contribute to Ingredient Quality:
L-ascorbic acid ≥8% with stabilization
Tocopherol ≥0.5% within antioxidant system
Niacinamide ≥4%
Ferulic acid stabilizer systems
Decorative Antioxidants
Do NOT meaningfully contribute:
Trace grape seed extract
Ultra-low resveratrol
Low-level pomegranate
Label-level antioxidant botanicals below functional threshold

ACTIVE STACKING RULE
Multiple trendy actives ≠ superior formulation.
Marketing-driven active overload MUST reduce:
Ingredient Quality
Transparency confidence
Only functional contribution matters.

SKIN COMPATIBILITY
Evaluates
Daily daytime usability
Long-term tolerance under UV/heat
Repeated-use stability
Barrier compatibility
Acne compatibility under increased sebum
Heat/sweat interaction
Breathable occlusion sustainability
Microbiome interaction
Sunscreen layering compatibility
Heavy occlusive systems may retain moderate compatibility ONLY if:
irritation remains controlled
congestion remains acceptable
breathability remains adequate
repeated-use stability remains acceptable
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)

LAYER 8 — SPECIALIZED PERFORMANCE
Evaluates realistic repeated-use daytime skin behavior.
 Score Range: 1.0–5.0



SCORE INTERPRETATION
Score
Interpretation
4.5–5.0
Exceptional — elite physiological lipid architecture, Tier 3 hydration, optimized pH, photosafe
4.0–4.4
Strong — physiological lipid support, Tier 2–3 hydration, breathable, photosafe
3.5–3.9
Good — solid structure with minor concerns
3.0–3.4
Moderate — functional but structurally limited
2.5–2.9
Below Average — marketing-driven, weak architecture, or photosafety concerns
2.0–2.4
Poor — major structural weakness, fragrance burden, or photosensitizer risk
<2.0
Avoid — critical safety concern, phototoxicity, or fundamentally flawed structure


HYDRATION DEPTH (NMF TIER-BASED)
Evaluates
Humectant performance under daytime evaporation
Surface vs intra-corneocyte hydration
Hydration persistence under UV/heat
Sustainable moisture delivery
Tier 3 NMF support

SCORING RULES
Tier 1 only:
max 2.5
rapid daytime depletion
Tier 2:
max 3.5
Tier 3 present:
eligible up to 5.0
Multi-tier systems:
dominant tier + breadth bonus

NMF-OCCLUSION INTERFERENCE PENALTY
Petrolatum/wax-dominant systems lacking Tier 3 NMF humectants MUST proportionally reduce:
Hydration Depth
Moisture Retention Stability

BARRIER REPAIR STRENGTH 
Evaluates
Physiological vs non-physiological lipid quality
Ceramide/cholesterol/fatty-acid balance
Barrier resilience under UV/environmental stress
Recovery support
Long-term stability
pH compatibility for enzymatic repair

SCORING RULES
Non-Physiological Lipids Only
Examples:
Mineral oil
Petrolatum
Silicones
Waxes
Result:
protection credit only
NO repair credit
max 2.5
Partial Physiological Lipid System
Examples:
Ceramide alone
Ceramide + one co-lipid
Result:
moderate repair credit
up to 3.5
Full Physiological Triad
Ceramide + cholesterol + fatty acid
Result:
strong repair eligibility
4.5+
Full Triad + pH 4.5–5.5
maximum repair potential
Full Triad + pH >6.0
repair partially suppressed
reduce accordingly

TRUE BARRIER REPAIR RULE
Occlusion alone does NOT qualify as strong repair.
High Barrier Repair requires:
physiological lipid balance
ceramide/cholesterol/fatty acid support
repeated-use resilience
low-irritation structure
long-term stabilization

OCCLUSION BALANCE
Evaluates
Breathable daytime wearability
Protective sealing
TEWL reduction without suffocation
Heat compatibility
Congestion risk
Sebum interaction
NMF-occlusion interaction

SCORING RULES
Optimal
lightweight-to-moderate breathable occlusion
adequate retention without heaviness
Too Weak
rapid evaporation
poor retention
Too Heavy
congestion
sweat retention
pore stress
sebum incompatibility

DAYTIME OCCLUSION CALIBRATION
Day creams require lighter occlusion than night creams.
Petrolatum/wax-heavy systems acceptable at night MUST receive stronger daytime occlusion penalties.

MOISTURE RETENTION STABILITY
Evaluates
8–12h hydration longevity
UV/heat water-loss prevention
Sweat/movement persistence
Repeated-use moisture maintenance
Endogenous NMF support
Short-lived hydration followed by midday dryness MUST reduce score.
Hydration durability is judged through realistic repeated daytime wear, not immediate feel.

REBOUND DRYNESS RULE
Hydration relying mainly on temporary sealing without sustained NMF/humectant support MUST reduce score.
Chronic heavy occlusion without NMF support may contribute to endogenous NMF depletion and rebound dryness over time.

LONG-TERM SKIN COMPATIBILITY
Evaluates
Daily daytime tolerance
UV-amplified repeated-use stability
Sensitivity compatibility
Acne compatibility
Barrier adaptability
Cumulative irritation potential
Microbiome interaction

DELAYED IRRITATION RULE
Chronic low-level irritation from:
fragrance
preservatives
alcohol
photosensitizing oils
MUST reduce compatibility even if initially unnoticed.
UV exposure increases delayed sensitization likelihood.

DAMAGE ACCUMULATION RULE
Repeated minor irritation may accumulate into:
barrier instability
sensitivity progression
photoallergic sensitization
congestion buildup
chronic inflammation
long-term tolerance reduction
Penalties MUST remain proportional to cumulative skin stress.

DAYTIME WEARABILITY (DAY-CREAM SPECIFIC)
Evaluates
Breathable comfort across 8–12h
Greasy behavior under heat
Long-wear stability
Sweat interaction
Sebum compatibility
UV oxidative stability
Cosmetic finish stability

SCORING RULES
Optimal
lightweight-to-medium texture
stable 8+ hour wear
breathable moisture delivery
non-greasy residue
Negative Factors
heaviness
greasy buildup
pore stress
unstable finish
Silicone elegance alone does NOT qualify as strong wearability.
“Healthy glow” masking greasy wear MUST reduce credibility.

LAYERING COMPATIBILITY (DAY-CREAM SPECIFIC)
Evaluates
SPF compatibility
Pilling tendency
Film stability
Product interaction behavior
Residue buildup
Sunscreen disruption risk

SCORING RULES
Optimal
lightweight stable base
clean SPF integration
no pilling
no filter destabilization
Negative Factors
heavy residue
unstable films
excessive silicones
greasy layering
pilling tendency
Confirmed sunscreen disruption risk receives additional Layer 6 penalty.

Final specialised score = average of all specialised scores 
ANTI-MARKETING FILTER
Penalty REQUIRED for formulations driven mainly by:
Heavy fragrance loading
Luxury sensory engineering
Silicone-softness illusion
Decorative botanical/antioxidant inflation
Glow/radiance marketing without structural support
Texture-first moisturization
Heavy occlusive masking
Active stacking inflation
Petroleum-occlusive dependence
Luxury feel, cosmetic smoothness, or glow ≠ structural support.
Marketing dominance → visible score reduction
.
FINAL RATING FORMULA
Final Rating =average of core score and specialised score

Products with meaningful fragrance loading, phototoxic ingredients, weak barrier sophistication, greasy wear behavior, unstable layering compatibility, decorative inflation, or basic occlusive dependence MUST NOT qualify for elite scoring.
---
OUTPUT FORMAT
---
⭐ FINAL RATING X.X / 5 — Rating Level
(Core Score: X.X | Specialized Score: X.X)
---
⚖ STRUCTURAL QUALITY
Short evidence-based classification of the formulation's overall structural quality, barrier support strength, hydration architecture, lipid class quality, NMF-component coverage, pH compatibility, photosafety status, and expected long-term daytime skin outcome.
---
🧴 DAY CREAM PROFILE
Short functional description of the day cream type and intended skin behavior. Examples:
Physiological Lipid Day Barrier Cream
Humectant-Emollient Daytime Moisturizer
Non-Physiological Occlusive Day Cream
NMF-Tier 3 Daytime Hydration System
Silicone-Dominant Daytime Moisturizer
Fragrance-Heavy Day Cream
Lightweight Gel Day Cream
Balanced Multi-Pathway Daytime Moisturizer
Photosensitizer-Risk Day Cream
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
Hydration Depth — ⭐X.X (Tier: 1 / 2 / 3)
Barrier Repair Strength — ⭐X.X
Occlusion Balance — ⭐X.X
Moisture Retention Stability — ⭐X.X
Long-Term Skin Compatibility — ⭐X.X
Daytime Wearability — ⭐X.X
Layering Compatibility — ⭐X.X
---
---
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
PHOTOTOXICITY RISK: [ingredient] — Category A phototoxic under UV exposure
PHOTOALLERGY RISK: [ingredient] — Category B photoallergenic; sensitization risk under repeated UV
SPF INTERFERENCE: Formulation architecture likely disrupts sunscreen film integrity
HIGH-pH BARRIER SUPPRESSION: pH [X.X] suppresses ceramide synthesis enzyme activity
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
Daily Use → ⭐X.X
Twice Daily Use → ⭐X.X
Occasional Use → ⭐X.X
---
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 Days)
Hydration feel and texture response
Wearability under heat and UV
Layering behavior with SPF
Irritation or sensitization signs
Medium-Term (2–8 Weeks)
Barrier response and moisture stability
Daytime wear consistency
Oil balance and congestion trends
Tolerance development or degradation
Long-Term (2–12 Months)
Barrier resilience under repeated UV stress
NMF system interaction (support or suppression)
Cumulative sensitization or photosensitization risk
Skin health trajectory under daily daytime use
Microbiome stability
Realistic Dermatological Outcome
One concise conclusion: barrier-focused or cosmetic-focused outcome, with physiological lipid and NMF system summary, photosafety assessment, and long-term daytime skin trajectory.
---
🔬 KEY STRUCTURAL INGREDIENTS
(Functionally dominant ingredients only — lipid class and NMF tier noted)
[Ingredient] — [Role: barrier/humectant/occlusive/sensitizer/photosensitizer] — [Lipid class if applicable] — [NMF tier if applicable]
---
🧠 WHY THIS RATING
3–5 concise evidence-based sentences focusing on:
Barrier architecture quality and lipid class
Hydration system tier and NMF coverage
Irritation / sensitization / photosensitization profile
Occlusion balance and daytime wearability
Repeated-use performance under UV and heat
pH compatibility impact
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
give harsh preservtives,colorants ,fragrances in output
Maintain strict dermatological evaluation principles
No marketing influence
No luxury or sensory bias
No branding influence
No ingredient-count bias
Structural weakness overrides cosmetic feel
Fragrance burden must be reflected in scoring
Photosensitizer presence triggers mandatory alerts
Repeated-use behavior > first-use feel
Long-term outcome > immediate sensation
Temporary softness ≠ barrier repair
Occlusion comfort ≠ skin health
Glow or radiance ≠ barrier function
Petrolatum and silicones are safe ingredients — penalize for repair inflation, not for existence
Non-physiological lipids provide valid occlusion — penalize only for repair credit inflation
NMF-tier awareness is mandatory in all hydration scoring
pH compatibility must be assessed for all formulations
Lipid class (physiological vs non-physiological) must be identified before barrier scoring
Photosafety must be assessed before final rating
Layering compatibility must be assessed before finalization
All output scores must be derivable from the formulas stated in this algorithm






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
              "You are a strict clinical day cream structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "DAY CREAM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();