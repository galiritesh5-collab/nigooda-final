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

        lip_balm_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL LIP BALM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

LIP BALM EVALUATION ALGORITHM — LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward lip balms ONLY when clear structural usefulness is demonstrated through:
Stable lip hydration against the unique biology of the vermillion border
Barrier-supportive architecture appropriate for the lip's thin stratum corneum
Long-term moisture retention stability
Repeated-use and reapplication compatibility
Reduced lip dryness cycling and dependency behavior
Minimal irritation, ingestion risk, or excessive occlusive suppression
Penalty is REQUIRED when formulations rely mainly on:
Temporary smoothness or gloss illusion
Flavor-driven sensory engineering
Menthol or camphor receptor stimulation presented as relief
Decorative botanical inflation
Heavy wax masking without genuine barrier architecture
Artificial nourishment perception
Luxury texture engineering
Active inflation without structural support
Basic petroleum-occlusive dependence without lip-appropriate barrier repair
Ingestion-unsafe flavor or preservative systems
Basic occlusion alone MUST NOT achieve high scores.
Marketing-dominant lip balm systems MUST receive meaningful score limitation.
---
VERMILLION BORDER PRIORITY RULE (New — Core Anatomical Correction)
ALL evaluation must account for lip-specific anatomy:
The vermillion border (lip skin) is biologically distinct from facial skin in these critical ways:
Stratum corneum depth: only 3–4 cell layers vs 15–20 on facial skin — far thinner barrier
No sebaceous glands — lips cannot self-lubricate
No sweat glands — no eccrine hydration contribution
Minimal filaggrin expression — endogenous NMF production is severely limited compared to body skin
No hair follicles — no pilosebaceous reservoir
High transepidermal water loss (TEWL) baseline — lips lose moisture faster than any other facial area
Transition to oral mucosa at inner lip — creates a mucosal exposure zone with higher permeability
UV exposure without melanin protection — among the highest-risk zones for actinic cheilitis
Scoring consequences of vermillion anatomy:
Humectants that work by drawing on NMF (urea, amino acids) have limited endogenous NMF to interact with — scores adjusted accordingly
Occlusion suppression risk is proportionally higher than on body skin because the baseline SC is thinner
Any ingredient present at the inner vermillion/mucosal zone must be evaluated for mucosal exposure, not just topical exposure
Ingredients safe on skin may have different penetration rates and mucosal irritation profiles on lips
This rule overrides any general moisturizer framework assumption applied directly to lips.
---
LIP EXPOSURE RULE
Evaluation MUST simulate realistic lip exposure:
Repeated daily application (average 4–10 times daily for frequent users)
Inadvertent ingestion — studies estimate 80–100% of lip balm applied is eventually ingested (EFSA flavor guidelines; Cosmetics 2023)
Prolonged mucosal-adjacent contact
Environmental desiccation exposure (wind, cold, low humidity)
Lip movement stress — eating, speaking, licking
Transfer and wear-off behavior
Repeated barrier interaction with food, drink, and saliva
Heavy, greasy, irritating, dependency-promoting, or ingestion-unsafe structures MUST lose compatibility credibility under repeated-use evaluation.
---
TRANSPARENCY PRIORITY RULE
High scores require clearly demonstrable lip-supportive performance.
Ignore:
Premium branding
Luxury texture
Natural-positioning claims
Trend-driven actives
Fancy ingredient naming
Long inflated ingredient lists
Gloss-focused marketing
"Repair" or "healing" claims without structural support
Evaluate ONLY:
Hydration realism for lip anatomy
Barrier support appropriate for thin SC
Occlusion balance without suppression
Repeated-use tolerance
Long-term lip response
Structural honesty
Ingestion safety of flavor and preservative systems
Dependency-cycle risk
Temporary smoothness without structural support → high score prohibited.
---
GLOBAL ENFORCEMENT RULE
Applies across ALL evaluation layers.
Core architecture overrides minor additives
Marketing-focused actives cannot override structural weakness
Late-position ingredients cannot neutralize weak lip balm systems
Temporary smoothness does not equal barrier repair
Glossy comfort does not equal healthy lip recovery
Basic sealing alone does not justify high scoring
Heavy occlusion without barrier sophistication MUST reduce credibility
Safety and ingestion-exposure penalties override cosmetic elegance bonuses
Decorative hydration systems MUST reduce credibility
Real barrier-supportive sophistication MUST create clear scoring advantage
Penalties MUST remain proportional to repeated daily exposure and reapplication cycles
Menthol, camphor, or cooling-agent dominance MUST reduce scoring through the TRPM8/TRPV1 dependency mechanism
Fragrance-heavy, flavor-heavy, menthol-heavy, camphor-heavy, or structurally weak lip balms MUST face visible scoring limitation under repeated-use evaluation
---
STRUCTURE DOMINANCE RULE
Core lip balm architecture determines:
Barrier stability at the thin lip SC
Hydration durability
Occlusive behavior and suppression risk
Irritation and mucosal sensitization risk
Dependency tendency
Long-term compatibility
Functional performance
Minor additives cannot override unstable structure. Functionally useful lipids, lanolin, ceramides, humectants, cholesterol, fatty acids, or barrier-supportive ingredients MUST NOT be treated as decorative loading when meaningful structural contribution exists.
Ingredient value MUST be judged through:
Concentration realism
Functional compatibility with lip anatomy
Formulation positioning
Repeated-use usefulness
Barrier-support contribution
Ingestion safety profile
Heavy sensory systems with weak structural support MUST reduce credibility.
Flavor-heavy, menthol-heavy, camphor-heavy, petroleum-heavy, or wax-dominant structures MUST receive meaningful scoring limitation.
---
BASIC OCCLUSION LIMIT RULE
Basic occlusion through petrolatum, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility on lips. The thin stratum corneum of the vermillion makes occlusion-only systems more dependency-prone than equivalent systems on body skin.
Simple moisture sealing without barrier sophistication → moderate score ceiling.
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients mainly provide surface comfort, temporary smoothness, and minor soothing. They do NOT repair structural weakness.
Examples: Vitamin E, Panthenol (late), Botanical oils, Aloe vera, Decorative extracts, Low-level ceramides, Decorative peptides, Token lanolin.
Late-position ingredients cannot neutralize: weak barrier architecture, flavor-heavy systems, menthol-heavy systems, occlusive imbalance, repeated irritation exposure, structurally unstable lip balm systems.
---
REAL USEFULNESS RULE
Clear score improvement is REQUIRED when the formulation:
Supports lip barrier resilience appropriate for the thin vermillion SC
Improves moisture retention stability
Maintains sustainable hydration without excessive occlusion suppression
Reduces excessive reapplication dependency
Shows realistic repeated-use compatibility
Balances occlusives, emollients, and humectants rationally for lip anatomy
Demonstrates lip support without excessive irritation, mucosal sensitization, or dependency cycling
Provides meaningful barrier-support sophistication beyond basic sealing
Uses ingestion-safe flavor and preservative systems
Short-term cosmetic comfort alone MUST NOT justify high scoring.
---
TRANSPARENCY BONUS RULE
Apply a SMALL bonus ONLY when the formulation shows:
Rational lip barrier architecture cognizant of vermillion anatomy
Balanced hydration logic
Honest ingredient positioning
Clear functional purpose
Stable barrier-supportive structure
Repeated-use design intelligence
Ingestion-safe ingredient selection
Lanolin, ceramide, or physiological lipid presence with structural intent
This bonus cannot override safety penalties, barrier instability, occlusion suppression risk, repeated-use irritation risk, or structural formulation weakness.
---
LAYER 1 — VERMILLION-SPECIFIC LIPID ARCHITECTURE RULE
(New — based on Purnamawati et al. 2017 Clin Cosmet Investig Dermatol; Rippke et al. 2002 Skin Pharmacol Appl Skin Physiol; Proksch et al. 2008 Skin Pharmacol Physiol)
LIPID CLASSIFICATION FOR LIP PRODUCTS
Due to the thin stratum corneum of the vermillion, lipid classification follows the same physiological vs non-physiological framework as the moisturizer algorithm but with lip-specific scoring adjustments.
NON-PHYSIOLOGICAL LIPIDS (Occlusion only — no barrier repair)
Definition: Lipids that reduce TEWL by forming a surface film but do not penetrate the thin lip SC or support endogenous lipid synthesis.
Examples: Petrolatum, Mineral oil, Paraffin wax, Carnauba wax, Candelilla wax, Beeswax, Microcrystalline wax, Ceresin, Ozokerite, Dimethicone, Cyclomethicone, Squalane (surface film), Synthetic waxes
Scoring impact on lips:
Valid for TEWL reduction and occlusive protection — moderate barrier protection credit
NOT eligible for barrier repair credit
NOT penalized simply for being present
Penalized when: used as the dominant system without physiological lipid co-presence, OR when excessive occlusion suppresses what little remaining SC activity exists
Petrolatum and silicones are safe occlusives — penalize for repair inflation and NMF suppression risk, not for existence
PHYSIOLOGICAL LIPIDS (Barrier support — partial repair credit on lips)
Definition: Lipids that can penetrate the thin lip SC and support intercellular lipid organization. On lips, penetration is easier due to thin SC but repair ceiling is lower due to reduced enzymatic machinery.
Examples: Ceramides (all classes), Cholesterol, Free fatty acids (linoleic, oleic, palmitic, stearic), Phytosphingosine, Sphingosine, Lanolin fatty acids
Scoring impact on lips:
Eligible for partial barrier repair credit (ceiling lower than on body skin due to reduced SC depth)
Rewarded for structural presence
Lanolin occupies a special position — see Lanolin Classification Rule below
Most effective when ceramide:cholesterol:fatty acid ratio is maintained (3:1:1 target)
LANOLIN CLASSIFICATION RULE (New — based on Lodén 2003 Am J Clin Dermatol; Mack Correa et al. 2014 J Cosmet Sci)
Lanolin deserves its own classification for lip products because:
Lanolin is chemically the most similar ingredient to human sebum among all cosmetic lipids
It contains a naturally balanced mixture of fatty acids, fatty alcohols, sterols, and hydroxy acids
It penetrates the lip SC more effectively than petrolatum while maintaining superior occlusion
It is the only cosmetic ingredient proven to both occlude AND support SC lipid organization simultaneously at typical use concentrations
Lanolin sensitivity exists (estimated 1.7–5.8% sensitization rate per CAMP studies) — this must be reflected in allergy risk scoring
Lanolin scoring tiers:
Position	Scoring impact
High-list (top 5 INCI)	Full lip barrier support credit + occlusion bonus
Mid-list	Partial barrier support credit
Low-list	Moderate occlusion credit only
Modified lanolin (acetylated, hydrogenated)	Reduced sensitization risk; retain partial barrier credit
Lanolin allergy disclosure absent	Reduce allergy risk score
WAXES CLASSIFICATION RULE (New — based on Baki & Alexander 2015 Introduction to Cosmetic Formulation)
Waxes are not equivalent. Classify before scoring:
Wax	Melting point	Breathability	Mucosal compatibility	Scoring notes
Beeswax	~62–65°C	Moderate	Good	Best-performing natural wax; structured occlusion
Carnauba	~82–86°C	Low	Moderate	High-hardness; increases balm stability; can feel waxy
Candelilla	~68–73°C	Low	Moderate	Common vegan substitute for beeswax
Microcrystalline wax	~60–93°C	Very low	Lower	Tighter occlusion; higher dependency risk
Ceresin / Ozokerite	~61–78°C	Very low	Lower	Petroleum-derived; tight occlusion; highest dependency risk of wax class
Rice bran wax	~79–82°C	Moderate	Good	Acceptable structural wax
Wear stability rule: Wax-dominant balms with low combined melting point relative to lip temperature (~34–37°C at surface) lose structural integrity rapidly, accelerating reapplication cycles. This MUST reduce Moisture Retention Stability and Reapplication Dependency Risk scores.
---
LAYER 2 — COOLING AGENT AND DEPENDENCY-INDUCING INGREDIENT RULE
(New — based on McKemy et al. 2002 Nature TRPM8; Caterina et al. 1997 Nature TRPV1; Bautista et al. 2007 Cell; Patel et al. 2010 Br J Pharmacol)
RECEPTOR PHARMACOLOGY SCORING
The vermillion border is richly innervated with thermoreceptors. Cooling and heating agents in lip balms interact with these receptors in ways that directly create dependency cycles — this is the core mechanistic basis of the "chapstick addiction" phenomenon.
TRPM8 PATHWAY (Cold receptor activation — menthol, WS-agents)
TRPM8 is a cold-activated ion channel highly expressed in lip sensory neurons. Menthol and synthetic cooling agents activate TRPM8, producing artificial cooling sensation interpreted as "relief." The mechanism creates dependency through:
Artificial cooling sensation masks TEWL-driven discomfort
Menthol increases skin permeability slightly, moderately increasing TEWL after wearing off
User applies more product when cooling sensation fades — not because lips are actually dry, but because receptor stimulation has ceased
Repeated cycles habituate the receptor, requiring higher concentrations for the same perceived relief
Menthol / Cooling agent scoring tiers:
Level	INCI position	Concentration estimate	Scoring impact
Trace (flavoring)	Late-list	<0.1%	Minor flavor note; small allergy penalty only
Moderate (functional cooling)	Mid-list	0.1–0.5%	TRPM8 activation risk; reduce Reapplication Dependency Risk and Long-Term Compatibility
Dominant	Top-half	>0.5%	Strong TRPM8 dependency pathway; meaningfully reduce Safety, Dependency Risk, Long-Term Compatibility
Primary active	Top-5	>1%	Severe dependency and barrier disruption risk; heavy penalty across all scores
Synthetic cooling agents (WS-3, WS-23, Icilin) carry equivalent or higher TRPM8 activity — scored identically to menthol by concentration tier.
TRPV1 PATHWAY (Heat/pain receptor activation — camphor, capsaicin, clove)
TRPV1 is activated by camphor, heat, capsaicin, and eugenol (clove). Camphor-containing lip balms produce:
Initial numbness (TRPV1 desensitization) masking dryness discomfort
After desensitization wears off, heightened sensitivity to dryness and irritation
Increased itch-reapplication cycle driven by sensitized TRPV1 neurons
Mucosal irritation from camphor permeation across the thin lip SC
Camphor / TRPV1 agent scoring:
Any camphor presence → reduce Safety, Allergy Risk, Reapplication Dependency Risk
Dominant camphor → strong penalty; significant barrier and mucosal irritation concern
Camphor + menthol combination → multiplicative dependency risk; compound penalty required
FLAVOR SENSITIZATION TIERS (New — based on IFRA guidelines 2023; EFSA flavor safety assessment; Bonefeld et al. 2021 Contact Dermatitis)
Flavor agents are ingested during lip balm use. They must be evaluated for both topical sensitization AND oral/mucosal safety.
High-risk flavor agents (strong penalty):
Cinnamaldehyde / cinnamon oil — potent contact sensitizer; TRPA1 activator; mucosal irritant
Peppermint oil (high menthol content) — TRPM8 activation + sensitization
Clove oil / eugenol — TRPV1 activator; dental anesthetic at concentration; sensitizer
Benzyl benzoate / benzyl alcohol — sensitizer and penetration enhancer
Balsam of Peru — cross-reactive sensitizer complex
Limonene, linalool (oxidized forms) — common sensitizers in citrus flavors
Moderate-risk flavor agents:
Vanillin — low sensitization but mucosal exposure concern at high dose
Ethyl maltol — generally safe; low sensitization
Fruit ester flavor compounds — variable; position-dependent penalty
Scoring rule: Each high-risk flavor agent in mid-list or higher position reduces Allergy Risk by a meaningful amount. Stacking multiple high-risk agents triggers cumulative sensitization penalty.
---
LAYER 3 — INGESTION EXPOSURE RULE
(New — based on Barbalova et al. Cosmetics 2023; EFSA Flavor Guidelines; FDA 21 CFR flavor safety; EWG Skin Deep methodology)
MANDATORY INGESTION SAFETY EVALUATION
Because 80–100% of lip balm applied is inadvertently ingested (primarily through lip-licking, eating, and drinking while wearing product), ALL lip balm ingredients must be assessed for oral exposure safety — not just topical safety.
Ingestion safety classification:
Category	Definition	Scoring impact
GRAS (Generally Recognized As Safe for oral use)	FDA-cleared food-safe ingredients	No ingestion penalty
Conditionally safe	Safe at typical use concentrations; concern at excessive use	Minor note only
Topical-safe but oral-concern	Safe topically but not intended for oral consumption	Moderate Allergy Risk and Safety penalty
Oral-unsafe	Not food-safe; should not be ingested	Significant Safety penalty regardless of topical safety
Oral-concern ingredients in lip products (reduce Safety and Allergy Risk):
Synthetic dyes (D&C Red 6, 7, 21, 27, 30, 33; FD&C dyes at high concentration)
Some preservatives at mid-list position (phenoxyethanol is not GRAS; EFSA recommends avoiding in lip products for infants and toddlers)
Retinyl palmitate — oral vitamin A accumulation concern at frequent use
Salicylic acid — oral concern at repeated mucosal exposure
Some essential oils at non-food-grade concentrations
Application rule: Ingredients that are topically safe but ingestion-concerning must reduce Safety and Allergy Risk scores proportionally to their INCI position. This is a lip-specific penalty not applicable to moisturizers or skin creams.
---
LAYER 4 — LIP HYDRATION TIER RULE
(New — adapted from moisturizer NMF system with lip-anatomy adjustments; based on Darlenski et al. 2014 Int J Dermatol; Berardesca et al. 2022 J Drugs Dermatol)
LIP HYDRATION DEPTH TIERING
Unlike body skin, the vermillion border produces minimal endogenous NMF due to very low filaggrin expression. This fundamentally changes how humectant depth tiers should be interpreted.
Three-tier lip hydration scale:
Tier 1 — Surface occlusive hydration (Low depth)
Ingredients: Petrolatum alone, waxes alone, mineral oil, silicones, glycerin in occlusive-only systems
Mechanism: Physical film reduces TEWL; no genuine humectant activity at lip tissue level
Result: Immediate comfort; rapid return of dryness when film wears off; highest dependency risk tier
Tier 2 — Active humectant hydration (Moderate depth)
Ingredients: Glycerin (meaningful concentration, mid-list), Hyaluronic acid, Sodium hyaluronate, Betaine, Sorbitol, Propylene glycol, Aloe vera (meaningful position)
Mechanism: Hygroscopic attraction of water from dermis and environment; extracellular water retention
Result: Better moisture retention than occlusion alone; reduced but not eliminated dependency cycle; most common effective lip balm tier
Tier 3 — Supported structural hydration (High depth — adapted for lip anatomy)
Ingredients: Panthenol (pro-vitamin B5 — converts to pantothenic acid, supports keratinocyte proliferation and SC repair), Sodium PCA (NMF-mimic humectant; relevant even with low endogenous NMF), Lactic acid / sodium lactate (NMF component; also pH-softening effect on lip SC), Urea at low concentration (≤2% — at higher concentrations, urea can irritate mucosal tissue), Glycerophosphoinositol (skin-identical moisture factor)
Note: Full Tier 3 credit is capped below moisturizer equivalents because lip NMF production is fundamentally lower. Maximum hydration depth score on lips is adjusted accordingly.
Lip hydration depth scoring:
Tier 1 only → Low ceiling (max 2.5)
Tier 2 humectants present → Moderate (max 3.5)
Tier 3 ingredients present → Higher depth eligible (up to 4.5 — capped below moisturizer 5.0 due to anatomy)
Multi-tier → Score reflects dominant tier + breadth bonus


---
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no lip repair, nourishment, or long-term lip health benefit and may increase unnecessary irritation burden.

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
• Lip Compatibility penalty

Multiple synthetic dyes increase penalties further.

Flavored/color-heavy lip balms receive additional penalty due to repeated ingestion exposure.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”

LAYER 5 — pH COMPATIBILITY RULE FOR LIP PRODUCTS
(New — based on Surber et al. 2018 Curr Probl Dermatol; Lambers et al. 2006 Int J Cosmet Sci)
LIP pH SCORING MODIFIER
Lip skin has a higher physiological pH than facial skin: approximately 5.5–6.8 (compared to 4.5–5.5 on facial skin). This is partly due to the mucosal transition and reduced acidic sebum contribution.
pH scoring tiers for lip products:
pH Range	Scoring Impact
5.0–6.5	Optimal for lip skin — small bonus to barrier and hydration scores
6.5–7.0	Acceptable — no penalty
7.0–8.0	Mild penalty — alkaline disruption of residual SC enzymatic activity
Above 8.0	Meaningful penalty — significant barrier disruption; soap/detergent territory
Below 4.5	Caution — acidic irritation on thin lip SC and mucosal tissue
Not disclosed	No bonus; minor credibility reduction
Note: This rule has less impact than in the moisturizer algorithm because lip SC enzymatic activity is inherently reduced. pH modifier is present but weighted as a secondary factor.
---
LAYER 6 — UV PROTECTION RECOGNITION RULE
(New — based on Maverakis et al. 2015 J Am Acad Dermatol actinic cheilitis; Robison & Rademaker 2015 J Dermatol Treatment)
SPF / UV PROTECTION SCORING MODIFIER
The vermillion border has among the lowest UV protection of any body site:
Minimal melanin production
No hair follicle UV shade
High reflective UV exposure from teeth and saliva
Actinic cheilitis (UV-induced precancerous lip lesion) is strongly associated with chronic UV exposure, particularly on the lower lip
SPF presence modifier (positive addition to Effectiveness and Long-Term Compatibility):
SPF level	Scoring modifier
SPF 15–20	Small positive modifier to Effectiveness and Long-Term Compatibility
SPF 30+	Moderate positive modifier — clinically meaningful UV protection
SPF 50+	Stronger modifier — maximum recommended protection
Mineral UV filters (zinc oxide, titanium dioxide)	Additional stability bonus — photostable, non-sensitizing
Chemical UV filters (oxybenzone, avobenzone)	Moderate modifier; note sensitization and ingestion exposure concern
No SPF	No bonus; note absence for outdoor or sun-exposed use context
This modifier does not override structural weakness. A chemically well-filtered lip balm with poor barrier architecture still scores low overall.
---
LAYER 7 — CORE SCORING SYSTEM (LIP BALM — STRICT)

Score range: 1.0 → 5.0

SAFETY [DOMINANT]
Evaluates:
Irritation risk at the thin vermillion SC and mucosal transition zone
Ingestion exposure safety (mandatory for lip products)
TRPM8/TRPV1 receptor stimulation risk (menthol, camphor, cooling agents)
Barrier suppression through excessive occlusion
Repeated-use sensitization risk from flavor agents
Structural suffocation and dependency-cycle risk
Chronic inflammation tendency from flavor, fragrance, or irritant accumulation
Repeated irritation, chronic dependency cycling, mucosal sensitization, ingestion-unsafe ingredients, or barrier-suppressing occlusion → score reduction.
Lip balms MUST be judged through realistic repeated application behavior, prolonged mucosal exposure, and inadvertent ingestion context.
INGESTION OVERRIDE RULE: Any ingredient that is topically safe but demonstrates meaningful oral/mucosal concern at repeated exposure concentrations MUST reduce Safety score regardless of topical safety profile. This is non-negotiable for lip products.
COOLING AGENT SAFETY RULE: Menthol, camphor, peppermint oil, and synthetic cooling agents are NOT cosmetically neutral — they activate specific sensory receptors that create dependency cycles. Their safety score reduction MUST be proportional to their list position and estimated concentration tier.
---
EFFECTIVENESS
Core question: Can the lip balm realistically support lip hydration, barrier function, and long-term lip stability under repeated use without creating dependency?
Evaluates:
Hydration performance (tier-based, see Layer 4)
Barrier-support realism for thin lip SC
Moisture retention stability
Structural balance appropriate for vermillion anatomy
Repeated-use consistency
Dependency-cycle resistance
SPF presence (Layer 6 modifier)
Basic occlusion alone MUST NOT achieve high effectiveness. Dependency-promoting systems MUST receive meaningful effectiveness reduction regardless of immediate comfort perception.
---
ALLERGY RISK
Evaluates:
Flavor agents (tiered by sensitization profile — see Layer 2)
Fragrance and essential oils
Lanolin sensitization potential (must be noted when present)
Preservative mucosal sensitivity
Cooling agent sensitization (menthol, camphor)
Botanical sensitizers at mid-list or higher positions
Ingestion-route sensitization risk (oral allergies differ from contact allergies)
Cumulative multi-trigger risk
Multiple sensitizers increase cumulative compatibility risk significantly on lip tissue due to mucosal permeability and ingestion exposure. Flavor-heavy, menthol-heavy, camphor-heavy, cinnamon-heavy, or multi-trigger systems → visible score reduction.
MUCOSAL ALLERGY AMPLIFIER: Allergic reactions from mucosal exposure can be more severe and faster-onset than equivalent skin contact reactions. This amplifies sensitization risk penalties for lip products beyond what the same ingredients would receive in a skin cream.
---
ECO IMPACT
Evaluates:
Biodegradability of wax systems (carnauba and candelilla are more biodegradable than synthetic waxes)
Petroleum dependency (petrolatum, mineral oil, paraffin, microcrystalline wax, ceresin, ozokerite)
Silicone environmental persistence
Synthetic colorant ecological impact
Glitter and shimmer additive persistence
Packaging material (small lip balm tubes generate significant plastic waste per gram of product)
---
INGREDIENT QUALITY
Evaluates:
Structural balance appropriate for lip anatomy
Functional synergy between waxes, oils, humectants, and actives
Barrier-support usefulness for thin lip SC
Hydration architecture (Tier-based)
Wax class quality (see Layer 1 wax classification)
Lanolin positioning and quality
Absence of decorative inflation
Ingestion-appropriate ingredient selection
Flavor-to-function ratio (high flavor, low structural function = quality penalty)
Decorative-heavy, flavor-heavy, menthol-heavy, or marketing-heavy systems → score reduction.
---
LIP COMPATIBILITY
Evaluates:
Daily usability
Long-term tolerance at the thin lip SC and mucosal transition
Repeated-use stability
Dependency-cycle tendency (central to lip compatibility)
Wear stability
Mucosal compatibility
Sensitivity compatibility
Occlusion sustainability without suppression
Heavy occlusive systems may retain moderate compatibility ONLY when irritation control, dependency control, and repeated-use balance remain acceptable.
Core Score Formula:
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Lip Compatibility × 0.15)

---
LAYER 8 — SPECIALIZED PERFORMANCE (LIP BALM — STRICT)
Score range: 1.0 → 5.0
HYDRATION DEPTH (Tier-based — see Layer 4)
Evaluates:
Humectant tier quality (1/2/3)
Water-binding support appropriate for lip anatomy
Hydration persistence beyond initial film
Sustainable moisture delivery
Lip dryness stability under repeated use
Tier 1 only → max 2.5
Tier 2 present → max 3.5
Tier 3 present → up to 4.5 (lip-adjusted ceiling)
Multi-tier → dominant tier + breadth bonus
Basic petrolatum-wax occlusion alone MUST NOT achieve high Hydration Depth scoring.
---
LIP BARRIER REPAIR STRENGTH [DOMINANT]
Evaluates:
Physiological lipid presence (ceramides, cholesterol, fatty acids)
Lanolin contribution (if present)
Barrier-supportive lipid balance for thin lip SC
Recovery support under repeated wear-off cycles
Long-term barrier stability
pH compatibility of formulation (Layer 5)
TRPM8/TRPV1 disruption absence
Scoring tiers:
Non-physiological lipids only (petrolatum, waxes, mineral oil, silicones): Low ceiling (max 2.5) — protection only, no repair
Partial physiological system (ceramide or cholesterol alone): Moderate (up to 3.0)
Lanolin in high-list position: Good repair credit (up to 3.5) — unique combined occlusion-repair benefit
Full physiological triad (ceramide + cholesterol + fatty acid): Strong credit (up to 4.0)
Full triad + lanolin at appropriate pH: Maximum lip barrier repair potential (up to 4.5)
Note: Maximum Lip Barrier Repair Strength ceiling is 4.5 (not 5.0 as in moisturizer) because lip SC repair capacity is anatomically limited by thin SC depth and low enzymatic machinery.
---
OCCLUSION BALANCE
Evaluates:
Protective sealing behavior appropriate for lip anatomy
TEWL reduction without full-seal suppression
Wax class balance (see Layer 1 wax classification)
Residue and buildup behavior
Lip suffocation risk
Chronic coating tendency
NMF-suppression risk from excessive occlusion (lower threshold than on body skin due to thin lip SC)
OCCLUSION-SUPPRESSION RULE (Lip-Specific):
Because the lip SC is only 3–4 cell layers thick, excessive occlusion suppresses residual SC barrier enzymatic activity more severely than on body skin. Petrolatum-dominant or full-wax-dominant systems without ANY physiological lipid or humectant co-presence must receive meaningful Occlusion Balance reduction.
Penalty is proportional to: occlusive dominance + absence of any barrier-support co-ingredient.
---
MOISTURE RETENTION STABILITY
Evaluates:
Hydration longevity after application
Wax melting point stability at lip surface temperature (~34–37°C)
Formula persistence through lip movement, eating, and speaking
Repeated-use moisture maintenance
Wear-off rate and comfort sustainability
Short-lived relief followed by rapid dryness → score reduction.
Wax-dominant balms with low melting point relative to lip temperature → reduce score proportionally.
---
REAPPLICATION DEPENDENCY RISK [Lip-Specific Dominant Parameter]
(No equivalent in moisturizer algorithm — lip-specific)
Evaluates:
TRPM8 activation risk (menthol/cooling agents — see Layer 2)
TRPV1 activation risk (camphor — see Layer 2)
Occlusion-only design without genuine humectant support
Wear-off-driven reapplication frequency
Flavor-driven repeated use behavior
Barrier suppression creating increased baseline TEWL between applications
Actual dependency cycle potential over weeks to months
Scoring tiers:
Strong dependency risk (menthol dominant + petrolatum only + flavor heavy): score 1.0–1.8
Moderate dependency risk (menthol mid-list + minimal humectants): score 1.8–2.5
Low-moderate dependency risk (petrolatum-dominant without humectants): score 2.5–3.2
Low dependency risk (balanced occlusion + humectants + no cooling agents): score 3.2–4.0
Dependency-resistant design (physiological lipids + Tier 2–3 humectants + no cooling agents): score 4.0–5.0
Reapplication Dependency Risk is equally weighted with Lip Barrier Repair Strength as the two dominant specialized parameters for lip balm evaluation.
---
LONG-TERM LIP COMPATIBILITY
Evaluates:
Daily-use tolerance over months
Repeated-use stability at mucosal transition zone
Sensitivity compatibility
Barrier adaptability under repeated wear-off cycles
Cumulative irritation potential from flavor, fragrance, cooling agents
Ingestion-route sensitization over time
TRPM8/TRPV1 receptor habituation concern
Repeated irritation, dryness cycling, chronic heaviness, flavor-heavy exposure, mucosal sensitization, or tolerance instability → score reduction.
---
SPECIALIZED SCORE CALCULATION
Specialized Performance Score = Average of all specialized scores
Final Score = (Core Score + Specialized Score) ÷ 2
Both Lip Barrier Repair Strength AND Reapplication Dependency Risk serve as dominant interpretive parameters. A high score requires excellence in both.
---
LAYER 9 — REAL-WORLD USAGE SIMULATION (STRICT)
Simulate:
Repeated daily application (4–10 applications typical for dependent users)
Weekly reapplication accumulation
Barrier recovery cycles between applications
Long-term hydration sustainability across environmental conditions
Inadvertent ingestion accumulation across daily use
Wear-off, eating, and speaking exposure
TRPM8/TRPV1 receptor habituation over months
Mucosal sensitization progression over weeks to months
Core question: Can lips realistically tolerate and benefit from the lip balm long-term without entering a dependency cycle, accumulating mucosal sensitization, or creating barrier suppression?
---
ANTI-MARKETING FILTER
Penalty is REQUIRED for:
Flavor-heavy elegance without structural function
Gloss-focused sensory engineering
Menthol/camphor comfort presented as relief or healing
Silicone-softness illusion
Decorative botanical inflation
Texture-first conditioning systems
Artificial nourishment perception
Heavy wax masking presented as repair
Marketing-driven active inflation
Basic petroleum-occlusive dependence without co-present barrier support
---
HIGH SCORE ELIGIBILITY RULE
Scores above 4.0 require clear structural excellence across:
Barrier support appropriate for thin lip SC
Long-term compatibility including mucosal zone
Hydration balance (Tier 2 minimum, Tier 3 preferred)
Repeated-use tolerance
Dependency resistance (no dominant cooling agents)
Irritation control including ingestion safety
Functional formulation honesty
pH compatibility (5.0–6.5 preferred)
Wax architecture appropriate for wear stability
Products with meaningful fragrance loading, flavor-heavy systems, dominant menthol or camphor, weak barrier sophistication, basic occlusive dependence, or ingestion-unsafe ingredient profiles MUST NOT qualify for elite scoring.
---
OUTPUT FORMAT
⭐ FINAL RATING X.X / 5 — Rating Level
⚖ STRUCTURAL QUALITY
Short evidence-based classification covering: formulation architecture, barrier support quality for thin lip SC, lipid class, hydration tier, wax system quality, dependency risk profile, and expected long-term lip outcome.
💋 LIP BALM PROFILE
Short functional type description. Examples:
Occlusive-Only Lip Balm
Physiological Lipid Lip Balm
Lanolin-Based Barrier Lip Balm
SPF-Active Lip Balm
Basic Petroleum Lip Balm
---
📊 CORE SCORES(SHORT STRUCTURAL REASON FOR EVERY SCORE)

Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Lip Compatibility — ⭐X.X
---
🧪 SPECIALIZED PERFORMANCE(SHORT STRUCTURAL REASON FOR EVERY SCORE)
Hydration Depth — ⭐X.X
Lip Barrier Repair Strength — ⭐X.X
Occlusion Balance — ⭐X.X
Moisture Retention Stability — ⭐X.X
Reapplication Dependency Risk — ⭐X.X
Long-Term Lip Compatibility — ⭐X.X
👍 STRENGTHS
Major structural advantage (evidence-based)
Major structural advantage (evidence-based)
Major structural advantage (evidence-based)
⚠ CONCERNS
Major structural concern
Major structural concern
Major structural concern
🚨 CRITICAL ALERTS
Display ONLY when structurally triggered:
TRPM8 dependency mechanism risk
Camphor/TRPV1 activation risk
Ingestion-unsafe ingredient concern
Mucosal sensitization risk
Barrier suppression through excessive occlusion
High cinnamaldehyde / cinnamon sensitization risk
---
👤 LIP CONDITION COMPATIBILITY
Severely Dry / Chapped Lips → ⭐X.X
Sensitive / Reactive Lips → ⭐X.X
Chronically Dependent Lips → ⭐X.X
Irritation-Prone / Allergy-Prone Lips → ⭐X.X
UV-Exposed / Outdoor Use → ⭐X.X
📅 LONG-TERM USABILITY
Frequent Daily Use (4+ applications) → ⭐X.X
Moderate Daily Use (1–3 applications) → ⭐X.X
Occasional / Recovery Use → ⭐X.X
---
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 Days)
Hydration feel and initial comfort
Smoothness / texture response
Flavor/cooling sensation assessment
Initial irritation potential
Wear duration estimate
Medium-Term (2–8 Weeks)
Barrier response and dependency pattern emergence
Moisture stability between applications
Flavor/cooling tolerance development
Reapplication frequency trend
Sensitization warning signs
Long-Term (2–12 Months)
Barrier resilience or suppression trajectory
TRPM8/TRPV1 habituation development
Cumulative sensitization risk
Skin health trajectory at vermillion border
Sustainability of results
Mucosal health impact
Realistic Dermatological Outcome:
One concise conclusion covering: whether the formulation supports genuine lip barrier recovery or creates cosmetic dependency, with physiological lipid and wax architecture summary, and mucosal safety assessment.
---
🔬 KEY STRUCTURAL INGREDIENTS
List only functionally dominant ingredients affecting:
Wax architecture (class noted)
Barrier system (lipid class and lanolin noted)
Hydration system (tier noted)
Cooling/dependency mechanism (receptor pathway noted)
Flavor/ingestion exposure
Irritation and sensitization risk
---
🧠 WHY THIS RATING
3–5 concise evidence-based sentences focusing on:
Barrier architecture quality and lipid class for thin lip SC
Hydration system tier and anatomy-adjusted assessment
Cooling agent and dependency mechanism risk
Flavor sensitization and ingestion exposure profile
Occlusion balance and suppression risk
Repeated-use performance and dependency cycle potential
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

⚠ STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS
include harsh fragrances,preservatives and colorants in output
No marketing influence
No luxury/sensory bias
No branding influence
No ingredient-count bias
Structural weakness overrides cosmetic feel
Flavor and cooling agent burden MUST be reflected in scoring
Repeated-use behavior > first-use feel
Long-term outcome > immediate sensation
Temporary smoothness ≠ barrier repair
Occlusion comfort ≠ lip health
Menthol/camphor receptor stimulation ≠ genuine relief
Ingestion exposure MUST be evaluated for every lip product
Wax class MUST be identified before occlusion scoring
Lanolin MUST be identified and separately classified before barrier scoring
Hydration tier MUST reflect vermillion anatomy adjustment
TRPM8/TRPV1 receptor pathway MUST be assessed for all cooling agents
Lip anatomy (thin SC, no sebaceous glands, mucosal transition) MUST inform all scores


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
              "You are a strict clinical lip balm structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "CLINICAL LIP BALM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();