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

        moisturizer_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

MOISTURIZER EVALUATION ALGORITHM — VERSION B (UPGRADED)
Evidence-Based Dermatological Scoring Engine
Incorporating 2024–2026 research: ceramide ratio science, NMF mechanisms, pH-enzyme dependency, microbiome interaction, and physiological lipid distinction.

LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward moisturizers ONLY when meaningful structural usefulness is demonstrated through:
Stable hydration
Barrier-supportive architecture
Balanced moisture retention
Repeated-use stability
Long-term compatibility
Low irritation, congestion, or occlusion risk
Penalty is REQUIRED when formulations are driven mainly by:
Marketing hydration claims
Temporary softness illusion
Decorative botanical loading
Sensory-first moisturization
Luxury texture engineering
Fragrance-focused elegance
Active inflation without structural support
Heavy occlusive masking without barrier repair architecture
Petroleum-occlusive dependence without physiological lipid structure
Basic moisturization alone MUST NOT achieve high scores.
Marketing-dominant systems MUST receive meaningful score limitation.

TRANSPARENCY PRIORITY RULE
High scores require clearly demonstrable skin-supportive performance.
Ignore:
Premium branding
Luxury texture
Natural-positioning claims
Trend-driven actives
Fancy ingredient naming
Inflated ingredient lists
Evaluate ONLY:
Hydration realism
Barrier support
Occlusion balance
Repeated-use tolerance
Long-term skin response
Structural honesty
Formulation pH compatibility
Lipid architecture quality (physiological vs non-physiological)
Traditional, herbal, minimalist, or lipid-focused systems receive credibility ONLY when meaningful structural usefulness and repeated-use compatibility are evident.
Temporary comfort without structural support → high score prohibited.

GLOBAL ENFORCEMENT RULE
Applies across ALL layers.
Structural Dominance
Core architecture overrides minor additives
Marketing-focused actives cannot override structural weakness
Late-position ingredients cannot neutralize weak systems
Minor additives cannot override unstable structure
Functional Reality
Temporary softness ≠ barrier repair
Occlusive comfort ≠ healthy moisturization
Basic sealing alone does not justify high scoring
Unsupported hydration claims MUST reduce trustworthiness
Barrier & Lipid Enforcement
Heavy occlusion without barrier sophistication MUST reduce credibility
Non-physiological lipids CANNOT receive barrier repair credit regardless of concentration
Real barrier-supportive sophistication MUST create clear scoring advantage
Safety & Repeated Exposure
Safety and compatibility penalties override cosmetic elegance bonuses
Penalties MUST remain proportional to repeated daily exposure
Fragrance-heavy, alcohol-heavy, petroleum-heavy, occlusion-heavy, decorative hydration, or structurally weak systems MUST receive visible scoring limitation

STRUCTURE DOMINANCE RULE
Core moisturizer architecture determines:
Barrier stability
Hydration durability
Occlusion behavior
Irritation risk
Congestion potential
Long-term compatibility
Functional performance
Ingredient value MUST be judged through:
Concentration realism
Functional compatibility
Formulation positioning
Repeated-use usefulness
Barrier-support contribution
Lipid class (physiological vs non-physiological)
Functionally useful lipids, humectants, emollients, ceramides, cholesterol systems, and barrier-supportive ingredients MUST NOT be treated as decorative when meaningful structural contribution exists.
Barrier-weak or irritation-prone systems → visible Safety, Compatibility, and Barrier Repair reduction.

BASIC MOISTURIZATION LIMIT RULE
Basic moisturization from glycerin, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility.
Simple moisture sealing without barrier sophistication → moderate score ceiling.

LATE-INGREDIENT LIMIT RULE
Late-position ingredients mainly provide:
Surface comfort
Temporary hydration
Sensory elegance
Minor soothing support
Short-term cosmetic improvement
Examples:
Aloe vera
Vitamin E
Late-position panthenol
Centella extracts
Botanical waters
Low-level ceramides
Decorative peptides
Late-position ingredients do NOT repair structural weakness and cannot neutralize:
Weak barrier architecture
Fragrance-heavy systems
Alcohol-heavy systems
Occlusive imbalance
Comedogenic overload
Repeated irritation exposure
Structural instability
Basic occlusive dependence
Temporary softness ≠ long-term skin improvement.

FUNCTIONAL CONCENTRATION RULE
Higher concentration does NOT automatically improve moisturization performance.
Certain ingredients remain structurally effective even at lower levels depending on formulation balance and placement:
Ceramides
Niacinamide
Panthenol
Urea
Cholesterol
Hyaluronic Acid
Peptides
Excessive concentration used mainly for:
Label appeal
Active inflation
Trend marketing
Luxury positioning
MUST NOT receive additional scoring advantage.
Structural compatibility overrides concentration marketing.
High active concentration without barrier balance, irritation control, or repeated-use stability may reduce long-term usability.

REAL USEFULNESS RULE
Clear score improvement is REQUIRED when formulations:
Support barrier resilience
Improve moisture retention stability
Maintain sustainable hydration
Demonstrate repeated-use compatibility
Rationally balance humectants, emollients, and occlusives
Provide skin support without excessive irritation, congestion, or suffocation risk
Demonstrate barrier-support sophistication beyond basic sealing
Contain physiological lipid architecture
Maintain/support optimal pH (4.5–5.5)
Include NMF-component ingredients for genuine intra-corneocyte hydration
Short-term cosmetic comfort alone MUST NOT justify high scoring.
Basic moisturization alone → moderate score ceiling.
MARKETING ILLUSION PENALTY
Penalty is REQUIRED when formulations are driven mainly by:
Luxury sensory engineering
Silicone-dominant softness illusion
Decorative botanical inflation
Fragrance-focused elegance
Texture-first moisturization
Excessive active marketing without structural balance
Heavy occlusive masking presented as barrier repair
Basic petroleum-occlusive dependence
Perceived nourishment ≠ functional barrier support.
Marketing-dominant moisturizer structure → visible score reduction.
Traditional, herbal, minimalist, or lipid-focused systems MUST NOT be penalized when meaningful structural usefulness and repeated-use compatibility are clearly evident.

TRANSPARENCY BONUS RULE
Apply a SMALL bonus ONLY when formulations demonstrate:
Rational moisturizer architecture
Balanced hydration logic
Honest ingredient positioning
Clear functional purpose
Stable barrier-supportive structure
Repeated-use design intelligence
pH within 4.5–5.5
Physiological lipid triad presence (ceramide + cholesterol + fatty acid)
This bonus CANNOT override:
Safety penalties
Barrier instability
Occlusion imbalance
Repeated-use irritation risk
Structural formulation weakness

LAYER 1 — PHYSIOLOGICAL vs NON-PHYSIOLOGICAL LIPID RULE
(Based on Madnani 2024; Schild 2024)
All lipid/occlusive ingredients MUST be classified before scoring.
NON-PHYSIOLOGICAL LIPIDS
Definition: Reduce TEWL mainly through surface occlusion without epidermal lipid restoration or endogenous lipid synthesis stimulation.
Examples:
Mineral oil
Petrolatum
Paraffin wax
Vegetable oils
Lanolin
Beeswax
Synthetic waxes
Dimethicone/silicones
Squalane as surface film
Fatty alcohols in isolation
Scoring:
Valid for occlusive protection and TEWL reduction
Eligible for moderate barrier protection credit
NOT eligible for barrier repair credit
NOT penalized solely for presence
Penalize ONLY when:
Dominant without physiological lipid architecture
Excessive enough to impair breathability/congestion
Balanced petrolatum/silicones with physiological lipids → no additional penalty.

PHYSIOLOGICAL LIPIDS
Definition: Lipids supporting epidermal intercellular repair and endogenous lipid restoration.
Examples:
Ceramides
Cholesterol
Free fatty acids
Phytosphingosine
Sphingosine
Scoring:
Eligible for full barrier repair credit
Reward structural presence
Require co-lipid support for maximum benefit
Most effective when ceramide:cholesterol:fatty acid ratio approximates 3:1:1

LIPID RATIO BONUS RULE
(Based on Zettersten 1997; De 2026; ETFAD/AAD recommendations)
Small bonus applies when all three physiological co-lipids are present:
Ceramide
Cholesterol
Fatty acid
Tiering:
Ceramide alone → moderate barrier repair credit
Ceramide + one co-lipid → good barrier repair credit
Full triad → strong barrier repair credit + lipid ratio bonus
Rationale:
Physiological ceramide/cholesterol/fatty acid ratios improve barrier recovery, reduce TEWL, and improve hydration versus standard emollients. Approximate 3:1:1 ratios align with dermatologic recommendations.

LAYER 2 — FORMULATION pH RULE
(Based on PMC5674717; Alfa Chemistry 2026; Yong 2025)
pH SCORING MODIFIER
Formulation pH is mandatory because it directly affects barrier-repair and NMF-generating enzyme activity.
Scientific Basis
Ceramide synthesis enzymes function optimally at pH 4.5–5.6
Filaggrin-to-NMF conversion is pH-sensitive
NMF-generating proteases require acidic conditions
High pH suppresses barrier-repair/NMF pathways
Physiological skin pH: 4.5–5.5
pH Scoring Tiers
pH Range
Scoring Impact
4.5–5.5
Optimal → small bonus to Barrier Repair and Hydration Depth
5.5–6.0
Acceptable → no penalty
6.0–7.0
Mild penalty to Barrier Repair Strength and Hydration Depth
>7.0
Meaningful penalty; significantly impairs enzymatic repair activity
Unknown/not disclosed
No bonus + minor credibility reduction

Application Rule
pH penalties apply regardless of ceramide or lipid quality.
A ceramide-rich formulation at pH 7.0 partially undermines its own repair mechanism. This is a structural formulation failure, not an ingredient failure.

LAYER 3 — NMF COMPONENT RECOGNITION RULE
(Based on NIH StatPearls 2024; biorXiv 2024; Alfa Chemistry 2026)
HYDRATION DEPTH TIERING
Hydration depth MUST distinguish surface hydration from intra-corneocyte hydration.
Scientific Basis
NMF originates from filaggrin degradation within corneocytes and includes amino acids, PCA, urocanic acid, lactate, urea, and salts. These hygroscopic molecules bind water within corneocytes. Glycerin and hyaluronic acid primarily function extracellularly and cannot fully replicate intra-corneocyte hydration.

TIER 1 — Surface Hydration (Low Depth)
Ingredients:
Glycerin alone
Film-forming humectants
Occlusion-only systems
Mechanism:
Surface water attraction without corneocyte penetration.
Result:
Temporary softness with rebound dryness risk.
Scoring:
Max Hydration Depth score: 2.5

TIER 2 — Extracellular Hydration (Moderate Depth)
Ingredients:
Hyaluronic acid + glycerin
Glycerin + balanced occlusion
Mechanism:
Improved extracellular SC water retention.
Result:
Moderate moisture retention without intra-corneocyte action.
Scoring:
Max Hydration Depth score: 3.5

TIER 3 — Intra-Corneocyte Hydration (High Depth)
Ingredients:
Urea
Sodium PCA
Amino acid blends
Lactic acid/sodium lactate
Urocanic acid
Multi-NMF systems
Mechanism:
Corneocyte penetration with endogenous NMF mimic/support.
Result:
Deep sustained hydration, improved elasticity, barrier homeostasis support.
Scoring:
Eligible up to 5.0

HYDRATION DEPTH RULES
Mixed tiers → dominant tier determines score with bonus for multi-tier coverage
Heavy occlusion without NMF support may suppress filaggrin-to-NMF conversion by maintaining excessive water activity
Chronic petrolatum/wax-dominant systems lacking Tier 3 NMF ingredients may weaken endogenous humectant function over repeated use
Penalty:
Petrolatum/wax-dominant systems lacking Tier 3 NMF ingredients → proportional reduction to:
Moisture Retention Stability
Long-Term Skin Compatibility

LAYER 4 — MICROBIOME DISRUPTION RULE
(Based on Frontiers Microbiology 2025; Wiley IJCS 2026; PMC12561040 2025)
MICROBIOME MODIFIER (Minor)
Evidence remains preliminary. This is a minor long-term compatibility modifier and does NOT override structural barrier or safety scoring.
Scientific Basis
The skin microbiome supports barrier function and immune balance. Exogenous lipids and disruptive formulations may alter sebum composition, microbial balance, and inflammatory signaling.
Microbiome Disruption Risks
Upper-position broad-spectrum preservatives:
Methylisothiazolinone
Methylchloroisothiazolinone
Formaldehyde releasers
High-concentration alcohol:
SD alcohol
Denatured alcohol
Isopropyl alcohol
pH > 6.0
Strong antimicrobial botanicals at upper-list positions without structural justification
Application
Applies ONLY to:
Long-Term Skin Compatibility
Skin Compatibility
Minor modifier only; not a dominant penalty
Does NOT directly reduce:
Safety
Allergy Risk
Barrier Repair
Functional microbiome-supportive systems (prebiotics, postbiotics, lactobacillus ferments with evidence) may offset this modifier
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no moisturizing, barrier, or long-term skin benefit and increase unnecessary irritation burden.

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
• Long-Term Compatibility penalty

Multiple synthetic dyes increase penalties further.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”

LAYER 5 — CORE SCORING SYSTEM (1.0–5.0)
SAFETY [DOMINANT]
Evaluates:
Irritation risk
Barrier destabilization
Occlusion-related stress
Repeated-use exposure risk
Sensitization potential
Structural suffocation risk
Chronic inflammation tendency
Repeated irritation, chronic occlusive stress, barrier instability, or fragrance-heavy exposure → score reduction.
Evaluation MUST reflect realistic repeated daily leave-on exposure.
Luxury texture, sensory elegance, temporary softness, marketing hydration claims, or cosmetic comfort do NOT override structural safety concerns.

HIDDEN IRRITATION RULE
Chronic low-level irritation accumulating over time MUST reduce Safety.
Repeated daily use context is mandatory.
Overrides:
Luxury positioning
Sensory elegance
Temporary softness
Marketing hydration claims

SILICONE SAFETY CLARIFICATION
Silicones (dimethicone, cyclopentasiloxane, etc.) are NOT penalized for safety in balanced formulations. They are generally inert, non-sensitizing, and non-comedogenic.
Penalty applies ONLY when silicones are used to:
Mask poor formulation structure
Create illusion of repair without barrier-support architecture

PETROLATUM SAFETY CLARIFICATION
Petrolatum is structurally limited, not inherently unsafe.
Properties:
Non-sensitizing
Non-irritating
Generally non-comedogenic
Highly effective occlusive
Petrolatum-dominant systems are penalized for:
Effectiveness
Barrier repair limitations
NOT for safety alone.

EFFECTIVENESS
Core Question:
Can the moisturizer realistically support hydration, barrier function, and long-term skin stability under repeated use?
Evaluates:
Hydration performance (Layer 3 tier-based)
Barrier-support realism
Moisture retention
Structural balance
Repeated-use consistency
Long-term skin support
Lipid class quality
Formulation pH compatibility
Ignore:
Luxury branding
Premium sensory design
Ingredient hype
Trend-driven actives
Texture elegance
High effectiveness requires:
Tier 2 minimum hydration support (Tier 3 preferred)
Balanced occlusion
Stable barrier-support structure
Repeated-use compatibility
Barrier-support sophistication
At least partial physiological lipid presence
Acceptable formulation pH
Basic occlusion alone MUST NOT achieve high effectiveness.
Effectiveness reflects structural moisturization performance, not prestige.

ALLERGY RISK
Evaluates:
Fragrance
Essential oils
Botanical sensitizers
Preservative sensitivity
Irritation-trigger stacking
Repeated sensitization risk
Microbiome disruption potential (minor modifier)
Multiple sensitizers increase cumulative compatibility risk.
Leave-on exposure significantly increases irritation importance.
Multi-trigger systems → visible score reduction.
Short-term comfort cannot override sensitization risk.

LEAVE-ON FRAGRANCE SEVERITY RULE
Fragrance in leave-on moisturizers carries elevated long-term compatibility importance.
Repeated exposure MUST reduce:
Safety
Allergy Risk
Long-Term Compatibility
Barrier confidence
Fragrance-heavy moisturizers MUST receive meaningful scoring limitation under repeated-use evaluation.
Luxury fragrance elegance ≠ skin-supportive design.

ECO IMPACT
Evaluates:
Biodegradability
Environmental persistence
Petroleum dependency
Silicone persistence
Ecological accumulation risk

SILICONE ECO DISTINCTION
Higher Persistence
Cyclomethicone
Cyclopentasiloxane
D4/D5/D6 cyclic silicones
→ Meaningful Eco Impact penalty.
Lower Persistence
Dimethicone
Dimethiconol
Linear/crosslinked silicones
→ Minor eco penalty only.
Small eco advantages cannot override major structural weaknesses.

INGREDIENT QUALITY
Evaluates:
Structural balance
Functional synergy
Barrier-support usefulness
Hydration architecture (NMF-tier aware)
Absence of decorative inflation
Humectant-emollient-occlusive balance
Lipid class quality
Formulation pH compatibility
Functionally useful lipids, ceramides, humectants, fatty components, or cholesterol systems MUST NOT be treated as decorative when meaningful structural contribution exists.
Decorative-heavy, sensory-heavy, fragrance-heavy, or marketing-heavy systems → score reduction.
Ingredient complexity alone does NOT increase quality.
Luxury actives without structural support MUST NOT heavily influence scoring.

ACTIVE STACKING RULE
Multiple trendy actives ≠ better formulation.
Large active stacks used mainly for marketing:
Reduce Ingredient Quality
Reduce transparency confidence
Only functional contribution matters.

SKIN COMPATIBILITY
Evaluates:
Daily usability
Long-term tolerance
Repeated-use stability
Barrier compatibility
Acne compatibility
Occlusion sustainability
Microbiome interaction (minor modifier)
Heavy occlusive systems may retain moderate compatibility ONLY when:
Irritation control remains acceptable
Congestion control remains acceptable
Repeated-use balance remains stable
Repeated irritation, congestion tendency, barrier instability, chronic suffocation behavior, fragrance-heavy exposure, or microbiome-disrupting dominance → score reduction.
Temporary hydration comfort ≠ long-term compatibility.
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)

LAYER 6 — SPECIALIZED PERFORMANCE
Evaluates realistic repeated-use skin behavior.
Score Range: 1.0–5.0

HYDRATION DEPTH
(NMF tier-based evaluation)
Evaluates:
Humectant effectiveness
Water-binding depth
Hydration persistence
Sustainable moisture delivery
Tier 3 NMF-component presence

SCORING RULES
Tier 1 Only
(Glycerin/film humectants)
Surface hydration only
Max score: 2.5
Tier 2
(HA + glycerin)
Moderate hydration
Max score: 3.5
Tier 3 Present
(Urea, PCA, amino acids, lactate)
High-depth hydration eligible
Up to 5.0
Mixed Tiers
Dominant tier determines score
Bonus for multi-tier breadth
Temporary softness ≠ strong hydration depth.
Weak hydration → dehydration persistence risk.
Heavy hydration without balanced absorption → superficial moisturization illusion.
Basic glycerin-occlusive hydration alone MUST NOT achieve high Hydration Depth scoring.

NMF-OCCLUSION INTERFERENCE PENALTY
Petrolatum/wax-dominant systems lacking Tier 3 NMF ingredients:
Reduce Hydration Depth
Reduce Moisture Retention Stability
Rationale:
Chronic excessive occlusion may suppress filaggrin-to-NMF conversion by maintaining excessive water activity, weakening endogenous humectant function over time.

BARRIER REPAIR STRENGTH [DOMINANT]
(Lipid class and ratio aware)
Evaluates:
Barrier-supportive lipid structure
Physiological lipid completeness
Ceramide/cholesterol/fatty acid balance
Barrier resilience
Recovery support
Long-term barrier stability
pH compatibility

SCORING RULES
Non-Physiological Lipids Only
(Mineral oil, petrolatum, silicones, waxes)
Protection credit only
NO repair credit
Max score: 2.5
Partial Physiological Lipid System
(Ceramide only or ceramide + one co-lipid)
Moderate repair credit
Up to 3.5
Full Physiological Triad
(Ceramide + cholesterol + fatty acid)
Strong repair credit eligible
4.5+
Full Triad + pH 4.5–5.5
Maximum repair potential
Full Triad + pH > 6.0
Repair potential partially suppressed
Reduce score proportionally
Repeated irritation, weak lipid architecture, unstable barrier support, or fragrance-heavy exposure → score reduction.
Occlusive masking without meaningful barrier-support structure MUST NOT achieve high scoring.

TRUE BARRIER REPAIR RULE
Occlusive protection alone ≠ barrier repair.
High Barrier Repair Strength requires:
Barrier-relevant lipid balance
Ceramide/cholesterol/fatty acid support
Repeated-use resilience
Reduced irritation architecture
Long-term barrier stabilization
Petrolatum, mineral oil, waxes, silicones, or fatty heaviness alone MUST NOT produce high Barrier Repair scoring.
Temporary protection without repair architecture → score limitation.
Barrier Repair Strength remains the dominant moisturizer parameter.

OCCLUSION BALANCE
Evaluates:
Breathability
Protective sealing
TEWL reduction balance
Occlusive heaviness control
Congestion tendency
Suffocation risk
NMF-occlusion interaction
Too weak → poor retention.
Too heavy → congestion and compatibility risk.
Balanced occlusion should support retention without chronic heaviness or excessive residue.
Heavy occlusion alone ≠ nourishment or barrier repair.

OCCLUSION-NMF INTERACTION RULE
Chronic heavy occlusion without NMF support may suppress filaggrin-to-NMF conversion through excessive water activity retention.
Concern applies mainly to:
Petrolatum-dominant systems
Wax-heavy systems
Fully sealed systems
Penalty depends on:
Occlusive dominance level
Absence of NMF ingredients
Mild dominance without NMF → small penalty.
Extreme dominance without NMF → meaningful reduction to:
Occlusion Balance
Moisture Retention Stability

PETROLATUM & SILICONE OCCLUSION CLARIFICATION
These ingredients are NOT inherently unsafe.
Petrolatum
Extremely effective TEWL reduction
Protective occlusive
Silicones
Breathable occlusion
Generally non-comedogenic
Structural limitation:
They protect the barrier but do NOT repair it.
Penalty applies ONLY for:
Barrier-repair inflation
Full occlusion dependence without NMF support

OCCLUSIVE DEPENDENCY RULE
Moisturizers relying mainly on heavy occlusion for perceived effectiveness MUST receive structural limitation.
Strong sealing without:
Balanced hydration architecture
Barrier-support sophistication
Irritation control
Long-term compatibility
→ reduces formulation credibility.
Basic occlusive dependence alone MUST NOT achieve high structural ratings.
Protection without intelligent balance → moderate score ceiling.

MOISTURE RETENTION STABILITY
Evaluates:
Hydration longevity
Water-loss prevention
Formula persistence
Repeated-use moisture maintenance
Endogenous NMF support
Short-lived hydration followed by rapid dryness → score reduction.
Hydration durability is judged through repeated-use performance, not immediate feel.
Temporary plumping ≠ stable moisturization.

REBOUND DRYNESS RULE
Hydration relying mainly on temporary sealing without sustained NMF/humectant support → reduce score.
Chronic heavy occlusion without NMF support may contribute to rebound dryness through endogenous NMF depletion.

LONG-TERM SKIN COMPATIBILITY
Evaluates:
Daily-use tolerance
Repeated-use stability
Sensitivity compatibility
Acne compatibility
Barrier adaptability
Cumulative irritation potential
Microbiome interaction (minor modifier)
Repeated congestion, irritation buildup, chronic heaviness, fragrance-heavy exposure, tolerance instability, or microbiome-disrupting dominance → score reduction.
Short-term elegance ≠ long-term compatibility.
Balanced systems may retain strong compatibility ONLY when structural balance remains stable.

DELAYED IRRITATION RULE
Chronic low-level irritation from fragrance, preservatives, oils, or alcohol MUST reduce compatibility even if initially unnoticed.

DAMAGE ACCUMULATION RULE
Minor repeated irritation may accumulate into:
Barrier instability
Sensitivity progression
Congestion buildup
Chronic inflammation tendency
Long-term tolerance reduction
Moderate heaviness alone MUST NOT trigger catastrophic penalties without realistic repeated-use evidence.
Penalties MUST remain proportional to actual long-term skin stress.

SPECIALIZED CALCULATION
Specialized Performance Score = Average of all specialized scores.
All parameters carry equal numerical weight.
Barrier Repair Strength remains the dominant interpretive parameter.
Penalties MUST remain proportional to realistic leave-on exposure and repeated-use stress.
LAYER 6.5 — REAL-WORLD USAGE SIMULATION
Simulate:
Daily moisturizer exposure
Weekly accumulation behavior
Barrier recovery cycles
Long-term hydration sustainability
Repeated occlusive interaction
Endogenous NMF behavior under repeated formulation exposure
Skin microbiome stability over time
Core Question:
Can skin realistically tolerate and benefit from the moisturizer long-term?
One-time softness or temporary hydration perception is insufficient.

ANTI-MARKETING FILTER
Penalty is REQUIRED for:
Excess fragrance loading
Luxury sensory engineering
Silicone-softness illusion without barrier architecture
Decorative botanical inflation
Texture-first moisturizer systems
Heavy occlusive masking presented as nourishment
Marketing-driven active inflation
Basic petroleum-occlusive dependence without physiological lipid co-presence
Marketing dominance → visible score reduction.
Luxury feel ≠ structural skin support.

HERBAL INFLATION CONTROL RULE
Small-position botanical extracts, herbal waters, or decorative natural ingredients MUST NOT significantly influence scoring unless meaningful structural contribution exists.
Herbal positioning without meaningful structural performance → reduced formulation credibility.
Decorative herbal inflation without meaningful moisturizer architecture → score reduction.

HIGH SCORE ELIGIBILITY RULE
Scores above 4.0 require clear structural excellence across:
Barrier support (physiological lipid architecture preferred)
Long-term compatibility
Hydration balance (Tier 2 minimum; Tier 3 preferred)
Repeated-use tolerance
Irritation control
Functional formulation honesty
pH compatibility (≤6.0 minimum; 4.5–5.5 preferred)
Products with:
Meaningful fragrance loading
Weak barrier sophistication
Decorative inflation
Unstable repeated-use compatibility
Basic occlusive dependence
MUST NOT qualify for elite scoring.

WEAKNESS AUDIT
Neutralize:
Botanical inflation bias
Hydration illusion bias
Luxury texture bias
Fancy active inflation
Late-ingredient illusion
Decorative marketing bias
Temporary softness illusion
Occlusive masking bias
Non-physiological lipid over-penalization
Petrolatum/silicone safety over-penalization
Application Rules:
Non-physiological lipids are penalized for lack of repair capability, NOT for mere presence
Petrolatum and silicones are safe ingredients; penalize ONLY for structural inflation or repair illusion
Decorative or sensory influence MUST NOT affect structural scoring

OUTPUT FORMAT
---
⭐ FINAL RATING
X.X / 5 — Rating Level
⚖ STRUCTURAL QUALITY
Short evidence-based classification of the formulation's overall structural quality, barrier support strength, hydration architecture, lipid class quality, NMF-component coverage, pH compatibility, and expected long-term skin outcome.
🧴 MOISTURIZER PROFILE
Short functional description of the moisturizer type and intended skin behavior.
Examples:
Humectant-Emollient Moisturizer
Physiological Lipid Barrier Cream
Non-Physiological Occlusive Moisturizer
NMF-Tier 3 Hydration System
Silicone-Dominant Moisturizer
Fragrance-Heavy Moisturizer
Lightweight Gel Moisturizer
Balanced Multi-Pathway Moisturizer
📊 CORE SCORES (GIVE SHORT STRUCTURAL REASON FOR EVRY SCORE LIKE WHY IT SCORED LIKE THAT IN EASY LANGUAGE)

Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
🧪 SPECIALIZED PERFORMANCE (GIVE SHORT STRUCTURAL REASON FOR EVRY SCORE LIKE WHY IT SCORED LIKE THAT IN EASY LANGUAGE)

Hydration Depth — ⭐X.X 
Barrier Repair Strength — ⭐X.X
Occlusion Balance — ⭐X.X
Moisture Retention Stability — ⭐X.X
Long-Term Skin Compatibility — ⭐X.X
👍 STRENGTHS
Major evidence-based structural advantage
Major evidence-based structural advantage
Major evidence-based structural advantage
⚠ CONCERNS
Major structural concern
Major structural concern
Major structural concern
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X
Oily Skin → ⭐X.X
Combination Skin → ⭐X.X
Sensitive Skin → ⭐X.X
Acne-Prone Skin → ⭐X.X
📅 LONG-TERM USABILITY
Daily Use → ⭐X.X
Twice Daily Use → ⭐X.X
Occasional Use → ⭐X.X
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 Days)
Hydration feel
Softness / texture response
Immediate comfort or heaviness
Irritation potential
Medium-Term (2–8 Weeks)
Barrier response
Moisture stability
Oil balance / congestion trends
Tolerance development
Long-Term (2–12 Months)
Barrier resilience
NMF system interaction (support or suppression)
Cumulative irritation risk
Skin health trajectory
Sustainability of results
Microbiome stability
Realistic Dermatological Outcome
One concise conclusion covering: Barrier-focused or cosmetic-focused outcome, with physiological lipid and NMF system summary.
🔬 KEY STRUCTURAL INGREDIENTS
List only functionally dominant ingredients affecting:
Barrier architecture (lipid class noted)
Hydration system (NMF tier noted)
Occlusion behavior
Irritation risk
Long-term compatibility
pH system
🧠 WHY THIS RATING
3–5 concise evidence-based sentences focusing on:
Barrier architecture quality and lipid class
Hydration system tier and NMF coverage
Irritation / sensitization profile
Occlusion balance and NMF interaction
Repeated-use performance
pH compatibility impact
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
DONT DO MEDICAL CLAIMS
include harsh colorants,preservatives,frgrances in output
Maintain strict dermatological evaluation principles:
No marketing influence
No luxury/sensory bias
No branding influence
No ingredient-count bias
Structural weakness overrides cosmetic feel
Fragrance burden must be reflected in scoring
Repeated-use behavior > first-use feel
Long-term outcome > immediate sensation
Temporary softness ≠ barrier repair
Occlusion comfort ≠ skin health
Petrolatum and silicones are safe ingredients — penalize for repair inflation, not for existence
Non-physiological lipids provide valid occlusion — penalize only for repair credit inflation
NMF-tier awareness is mandatory in all hydration scoring
pH compatibility must be assessed for all formulations
Lipid class (physiological vs non-physiological) must be identified before barrier scoring
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
              "You are a strict clinical moisturizer structural evaluation engine."
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