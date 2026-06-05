const openai =
require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

================================================
HAIR DYE & COLOR PRODUCT EVALUATION ALGORITHM — V1.0

LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hair dye and color products that demonstrate:
Effective, lasting color deposit appropriate to product type
Minimal oxidative and chemical damage to hair fiber and scalp
Low sensitization and allergen burden
Scalp barrier-considerate formulation design
Physiological pH compatibility during and after processing
Long-term fiber integrity preservation
Honest color performance without damage-inflation
Transparent developer/oxidant architecture
Mandatory penalties apply for:
PPD/PTD-dominant oxidative systems without sensitization disclosure
Ammonia-first developer architecture marketed as "gentle"
Fragrance-driven "luxury color" positioning over structural safety
Decorative botanical loading without functional color or conditioning evidence
Damage inflation through unnecessarily high developer volumes
Bleach/lift marketing without structural damage disclosure
"Natural color" claims using synthetic sensitizers
Basic color deposit alone cannot achieve high scores. Scalp safety, fiber damage trajectory, sensitization risk, and wash-out longevity must all be evaluated.

PRODUCT TYPE CLASSIFICATION (MANDATORY FIRST STEP)
Before any scoring, the product must be classified by type. Each type carries fundamentally different chemistry, damage profiles, sensitization risks, and performance expectations.
TYPE A — PERMANENT OXIDATIVE COLOR
Permanent hair dye (cream, gel, liquid)
Uses oxidative coupler chemistry (PPD, PTD, resorcinol)
Requires developer (hydrogen peroxide)
Full cuticle penetration and cortex modification
Irreversible color change
TYPE B — DEMI-PERMANENT OXIDATIVE COLOR
Demi-permanent / tone-on-tone color
Low-volume developer (3–6%)
Partial cuticle penetration
Lower sensitization than Type A but oxidative chemistry still present
Fades gradually
TYPE C — SEMI-PERMANENT / DIRECT DYE
No developer required
Direct dye deposition on fiber surface
No oxidative chemistry
Fades over washes
Examples: fashion colors, vivid direct dyes, color-depositing treatments
TYPE D — TEMPORARY COLOR
Color mousse, color spray, color rinse
Surface-only deposition
Washes out in 1–2 shampoos
No chemical penetration
TYPE E — BLEACH / LIGHTENER
Powder bleach, cream bleach, high-lift color
Oxidative destruction of melanin
Highest fiber damage and scalp chemical burden
Requires developer (often high volume 20–40)
No color deposit (lift only, or with toner follow-up)
TYPE F — HENNA & NATURAL COLORANTS
Pure henna (Lawsonia Inermis)
Indigo (Indigofera Tinctoria)
Cassia Obovata
Herbal/plant-based color systems
No synthetic oxidative chemistry
Unique deposition mechanism (keratin bonding)
TYPE G — COLOR-DEPOSITING TREATMENTS
Color-depositing shampoo
Color-depositing conditioner
Color gloss treatment
Toning mask
Semi-permanent with conditioning vehicle
CLASSIFICATION RULE: Scoring ceilings, chemistry expectations, sensitization benchmarks, and damage expectations adjust entirely by product type. A bleach scored against semi-permanent standards is invalid. Type must be established before any scoring begins.

TRANSPARENCY PRIORITY RULE
Ignore:
Fragrance freshness or "salon experience" positioning
"Ammonia-free" as automatic safety credential (replacement chemistry must be evaluated)
"Natural/organic/vegan" marketing positioning
Luxury cream texture aesthetics
Before/after marketing photography
Ingredient-count inflation
Evaluate only:
Oxidative chemistry type and sensitization burden
Developer volume and fiber damage trajectory
Alkalizing agent type (ammonia vs MEA vs ethanolamine alternatives)
Scalp chemical exposure burden
pH compatibility during and post-processing
Coupler/dye intermediate sensitization profile
Conditioning architecture integration
Long-term fiber integrity under repeated coloring
Honest color performance and longevity

GLOBAL ENFORCEMENT RULES
Oxidative chemistry architecture is the dominant color product structure
Safety penalties override color performance bonuses
"Ammonia-free" is not automatically safer — replacement alkalizer must be evaluated
Fragrance cannot compensate for high sensitization chemistry
Late-position conditioning agents cannot neutralize structurally oxidative or high-pH damage
Post-processing tightness, scalp burning, or fiber brittleness = structural damage signal
Non-physiological processing pH must be acknowledged as a damage-necessary compromise (with minimum required pH noted)
Rinse-off time is product-specific — processing time (20–45 min) is far longer than cleansers
Decorative botanical loading without functional evidence must be penalized

THE AMMONIA-FREE TRAP RULE
CRITICAL: "Ammonia-free" is one of the most abused claims in hair color marketing.
Ammonia (the alkalizing agent) is replaced in many modern formulas with:
Monoethanolamine (MEA)
Ethanolamine
AMP (Aminomethyl Propanol)
Sodium Carbonate / Sodium Hydroxide
Alkanolamines
These replacements must be evaluated independently. Some (notably MEA/ethanolamine) are associated with protein bond disruption and potentially higher long-term fiber damage than low-dose ammonia systems. The algorithm must not grant automatic safety credit for "ammonia-free" labeling.
Rule: "Ammonia-free" claim triggers mandatory alkalizing agent identification and independent evaluation. If replacement alkalizer cannot be identified or is associated with high protein disruption, no safety bonus is granted.

LAYER 1 — OXIDATIVE CHEMISTRY & DYE INTERMEDIATE SYSTEM
MANDATORY RULE: All oxidative dye intermediates and couplers must be classified by sensitization tier before scoring.
Dye intermediate chemistry is the primary determinant of:
Allergic contact dermatitis risk
Cross-sensitization potential
Repeated-use sensitization accumulation
Long-term safety trajectory

DYE INTERMEDIATE TIER TABLE
TIER 1 — HIGH SENSITIZATION RISK
Examples:
p-Phenylenediamine (PPD) — primary sensitizer
p-Toluenediamine (PTD / 2,5-Toluenediamine)
p-Aminophenol
Resorcinol (at high concentration)
4-Aminophenol
2-Nitro-p-Phenylenediamine
Characteristics:
Highest allergic contact dermatitis rate
Documented cross-sensitization (rubber, PABA, benzocaine, sulfonamides)
Cumulative sensitization under repeated coloring
Once sensitized — permanent avoidance required
Patch test mandatory before use
Scoring Impact:
Mandatory Allergy Risk penalty
Mandatory Safety modifier
Cannot achieve elite Allergy Risk scores
Sensitization disclosure required in output

TIER 2 — MODERATE SENSITIZATION RISK
Examples:
m-Aminophenol
4-Chlororesorcinol
2-Amino-4-hydroxyethylaminoanisole
HC Yellow No. 2
HC Red No. 3
Oxidative dye intermediates with lower molecular weight or concentration
Characteristics:
Moderate sensitization potential
Lower cross-sensitization than Tier 1
Still requires patch test
Cumulative risk under repeated use
Scoring Impact:
Moderate Allergy Risk penalty
Acceptable safety when Tier 1 is absent
Patch test still required

TIER 3 — LOW SENSITIZATION RISK (OXIDATIVE)
Examples:
HC Blue No. 2
HC Violet No. 1
Low-concentration resorcinol (secondary coupler role)
4-Amino-2-hydroxytoluene
Oxidative systems with reduced reactive intermediate load
Characteristics:
Lower sensitization potential
Patch test still recommended
Lower cross-sensitization burden
Scoring Impact:
Reduced Allergy Risk penalty
Moderate Safety ceiling

TIER 4 — DIRECT DYES (NON-OXIDATIVE)
Examples:
Basic Red 51, 76
HC Yellow No. 4
HC Orange No. 1
Disperse Violet 1
Acid Red 33, 52
Acid Blue 62
Lawsone (Henna — natural direct dye)
Characteristics:
No oxidative chemistry
Generally lower sensitization than oxidative intermediates
Some direct dyes (Disperse dyes) have sensitization concern at high levels
Henna (Lawsone) is low sensitizer unless adulterated with PPD
Scoring Impact:
Best Allergy Risk eligible (with patch test note)
Maximum Safety eligible for direct dye systems
Note: "Black henna" (henna + PPD) must be classified as Tier 1 regardless of natural positioning.

DYE SYSTEM RULE
Primary dye intermediate determines sensitization architecture.
SYSTEM CLASSIFICATION:
Tier 1 dominant → High sensitization, mandatory disclosure
Tier 1 + Tier 3 blend → High sensitization, Tier 1 drives risk
Tier 2 dominant → Moderate sensitization
Tier 2 + Tier 3 → Moderate-Low sensitization
Tier 3/4 dominant → Low sensitization
Tier 4 direct dye only → Lowest sensitization eligible
Additional Rules:
PPD presence at any position triggers mandatory disclosure regardless of concentration
Cross-sensitization history must be noted in output
Patch test recommendation is mandatory for all Tier 1 and Tier 2 systems

LAYER 2 — DEVELOPER / OXIDANT SYSTEM
Developer (hydrogen peroxide) volume directly determines:
Degree of cuticle lift and cortex entry
Oxidative fiber damage
Scalp chemical burden
Melanin destruction (lift)
Color molecule oxidation (deposit)
DEVELOPER VOLUME TABLE
Volume
H₂O₂ %
Primary Use
Fiber Damage Level
5 vol (1.5%)
1.5%
Tone deposit, no lift
Minimal
10 vol (3%)
3%
Deposit, 1 level lift
Low
20 vol (6%)
6%
1–2 level lift
Moderate
30 vol (9%)
9%
2–3 level lift
High
40 vol (12%)
12%
3–4 level lift, bleach
Very High
50+ vol
>12%
High-lift, bleach only
Severe

Developer Rule:
Minimum developer volume for the intended result must be used
Unnecessarily high developer volume without lift rationale = mandatory Fiber Integrity penalty
Developer volume must match the color goal; excess volume for same shade = Formulation Honesty penalty
Home color kits with fixed developer must disclose volume

LAYER 3 — ALKALIZING AGENT SYSTEM
MANDATORY RULE: All alkalizing agents must be identified and classified.
The alkalizing agent opens the cuticle to allow dye penetration. It is a damage-necessary component but must be evaluated for proportionality and fiber compatibility.
ALKALIZING AGENT TIER TABLE
HIGH CONCERN
Sodium Hydroxide (lye) — extreme alkalinity, chemical burns risk
Calcium Hydroxide (in relaxer-adjacent systems)
High-concentration Ammonium Hydroxide (>5%)
Scoring Impact: Mandatory Safety and Scalp Barrier penalty
MODERATE CONCERN
Monoethanolamine (MEA) — "ammonia-free" replacement, high protein disruption
Ethanolamine
Alkanolamines (general)
Note: MEA has lower volatility than ammonia (less fume) but may cause equal or greater fiber protein damage under repeated use. "Ammonia-free MEA" cannot automatically claim safety superiority.
Scoring Impact: Safety modifier — no automatic bonus vs ammonia
LOWER CONCERN (RELATIVE)
Low-dose Ammonia (<3% formulated)
AMP (Aminomethyl Propanol)
Sodium Carbonate (gentle alkaline systems)
Arginine (amino acid alkalizer — emerging, lower disruption evidence)
Scoring Impact: Moderate credit for proportional use
FUNCTIONAL NOTE:
All alkalizing agents require cuticle opening — some damage is inherent to permanent oxidative color. Scoring evaluates proportionality and post-processing conditioning architecture, not elimination of alkalinity (which is impossible in Type A/B).

LAYER 4 — BLEACH / LIFT CHEMISTRY (TYPE E)
MANDATORY ADDITIONAL LAYER for bleach/lightener products.
Bleach operates through persulfate oxidation and requires separate structural evaluation.
PERSULFATE CLASSIFICATION
PRIMARY PERSULFATES:
Ammonium Persulfate
Potassium Persulfate
Sodium Persulfate
Characteristics:
Primary bleaching boosters
Documented sensitization and occupational asthma risk
Respiratory sensitizer (powder formulation)
Contact dermatitis under repeated exposure
Mandatory Safety and Allergy Risk penalty
Scoring Impact:
Mandatory Allergy Risk and Safety penalty
Respiratory exposure warning required in output
Cannot achieve elite Allergy Risk scores
BLEACH FORMULATION MODIFIERS:
Conditioning agents (Cetyl Alcohol, Panthenol, Keratin) — reduce mechanical damage
Bond-building additives (Maleic Acid, Bis-Aminopropyl Diglycol Dimaleate) — fiber integrity credit
Oil conditioning bases (vs harsh powder bases) — moderate credit
Anti-breakage polymers — moderate credit
BLEACH DAMAGE CEILING: Type E products cannot achieve:
Fiber Integrity > 2.5 (inherent oxidative destruction)
Allergy Risk > 2.8 (persulfate sensitization)
Safety > 3.0 (oxidative scalp chemical burden)
These are structural ceilings, not penalties. Bleach is inherently damaging — scoring reflects realistic expectations.

LAYER 4.5 — pH PROCESSING RULE
MANDATORY MODIFIER for all oxidative color types.
Processing pH Context
Unlike cleansers or serums, oxidative hair color requires alkaline pH (8.5–11.5) to function. This is a chemistry-necessary compromise, not a formulation failure. However:
Minimum required alkalinity for the color goal must be used
Post-processing pH normalization architecture must be evaluated
Acidic post-color treatments (pH 3.5–5.0) receive credit for cuticle-closing and fiber recovery
Processing pH must be proportional to developer volume
pH SCORING MODIFIER FOR COLOR PRODUCTS
Processing Context
Scoring Rule
pH 8.5–9.5
Optimal range for permanent color — neutral score
pH 9.5–10.5
Acceptable — moderate fiber stress note
pH >10.5
High alkaline stress — Fiber Integrity penalty
Post-processing acid rinse included
Fiber Integrity bonus
No post-processing pH normalization
Fiber Integrity penalty
Direct/temporary dye at neutral-acidic pH
Full Fiber Integrity credit

Bleach (Type E) processing pH is separate: Bleach pH (9–12) is inherent and already captured in the structural ceiling.

LAYER 4.6 — HENNA & NATURAL COLORANT RULE (TYPE F)
Henna and natural colorant systems require independent evaluation.
Pure Henna Assessment
PURE HENNA (Lawsonia Inermis — pure):
Natural direct dye (Lawsone molecule)
Low sensitization potential (unless PPD-adulterated)
Cuticle-coating deposition (does not penetrate cortex)
Cannot be chemically colored over without complications
Incompatible with subsequent relaxer or permanent wave
Color range limited (red-brown spectrum)
Scoring Impact:
Maximum Fiber Integrity eligible
Maximum Scalp Safety eligible (pure form)
Mandatory note: subsequent chemical processing incompatibility
Color longevity credit appropriate to product type
COMPOUND/ADULTERATED HENNA:
"Black henna" (henna + PPD/metal salts)
Metallic salt-added "herbal" colors
Mixed synthetic/henna hybrids
Scoring Impact:
Reclassified to Tier 1 sensitization regardless of "natural" marketing
Mandatory Safety and Allergy Risk penalties
Metallic salt incompatibility with oxidative color must be flagged
METALLIC SALT RULE: Products containing metallic salts (lead acetate, silver nitrate, bismuth citrate in "progressive" color) must receive:
Mandatory Safety penalty
Subsequent chemical service incompatibility warning
Cannot achieve elite Safety or Allergy Risk scores

LAYER 4.7 — COLORANT ADDITIVE PENALTY RULE
Artificial/decorative colorants added to hair dye formulations for aesthetic "cream color" appearance provide no functional benefit and add unnecessary sensitization burden.
Synthetic dye additives (not the hair color dye itself but added for product aesthetics):
Red 40
Blue 1
Yellow 5/6
Scoring Impact:
Allergy Risk penalty
Ingredient Quality penalty
Formulation Honesty penalty

LAYER 4.8 — FRAGRANCE RULE (HAIR COLOR CONTEXT)
Hair color products (especially permanent, Type A/B) have processing times of 20–45 minutes with direct scalp contact under occlusive conditions (application cap, warmth). This dramatically amplifies fragrance sensitization risk vs brief-contact cleansers.
High fragrance concern triggers:
"Parfum" / "Fragrance" at mid-to-high list position
Multiple essential oils in oxidative color formula
Fragrance masking ammonia without reducing it (not a reformulation)
Known allergens (Limonene, Linalool, Eugenol) in processing-time scalp product
Scoring Impact:
Mandatory Allergy Risk penalty (amplified vs rinse-off)
Cumulative Irritation Risk penalty
Fragrance-heavy color products cannot achieve elite Safety or Allergy Risk scores

LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 for every rule

SAFETY [DOMINANT]
Evaluates:
Oxidative chemistry burden (dye intermediate tier)
Developer volume proportionality
Alkalizing agent type and concentration
Scalp chemical contact duration (processing time)
Sensitization and allergy risk trajectory
Repeated-use cumulative chemical exposure
Respiratory risk (bleach/persulfates)
pH-related scalp stress
Metallic salt / adulterant presence
Core Rules:
Processing time (20–45 min scalp contact) amplifies all chemical safety concerns vs rinse-off
Repeated coloring every 4–8 weeks multiplies sensitization accumulation
Safety overrides color performance, fragrance freshness, and "natural" positioning
PPD presence at any level triggers mandatory safety note

EFFECTIVENESS
Core Question: Does the product deliver accurate, lasting color performance appropriate to its type while structurally justifying its chemistry?
Evaluates:
Color accuracy and deposit quality
Gray coverage performance (Type A/B)
Color longevity (washes)
Lift performance (developer volume appropriateness)
Direct dye vibrancy and fade characteristics (Type C/D)
Henna deposition quality (Type F)
Heat processing compatibility
Post-color conditioning architecture
High effectiveness requires:
Appropriate dye chemistry for claimed result
Proportional developer volume
pH architecture supporting color deposit
Conditioning integration for fiber protection
Honest color longevity expectations
Rules:
Gray coverage claims with insufficient oxidative architecture are penalized
Lift claims without appropriate developer volume are penalized
"Vibrant color" claims from decorative direct dye systems receive appropriate (not inflated) credit

ALLERGY RISK [ELEVATED WEIGHT IN COLOR CONTEXT]
Evaluates:
Dye intermediate sensitization tier (PPD/PTD vs direct dye)
Persulfate sensitization (Type E)
Fragrance sensitizers (leave-on processing context)
Preservative sensitizers
Cross-sensitization risk profile
Patch test necessity
Repeated-use sensitization accumulation
Cross-reactivity with common allergens
Application Rules:
Allergy Risk has elevated interpretive importance in color products vs cleansers
Once sensitized to PPD — life-long avoidance required
Patch test recommendation is mandatory for Tier 1/2 products regardless of prior tolerance
"Never reacted before" does not reduce sensitization risk scoring

ECO IMPACT
Evaluates:
Oxidative byproduct environmental load
Developer (H₂O₂) rinse-off environmental impact
Persulfate environmental persistence
Plastic/packaging environmental burden (single-use kits)
Biodegradability of primary color chemistry
Synthetic dye aquatic toxicity
General Rules:
Direct dye systems (Type C/F) generally receive better eco scores than oxidative
Single-use plastic-heavy kits reduce score
Persulfate-heavy bleach formulations reduce eco score

INGREDIENT QUALITY
Evaluates:
Dye intermediate system coherence for claimed result
Developer volume proportionality honesty
Alkalizing agent selection appropriateness
Conditioning architecture integration quality
Functional vs decorative botanical balance
"Ammonia-free" claim structural honesty
Bond-building additive presence (functional vs marketing)
Rules:
"Ammonia-free" without alkalizer identification = Ingredient Quality penalty
Conditioning claims without post-processing architecture = penalty
Bond-building marketing without Maleate or equivalent chemistry = penalty

SKIN COMPATIBILITY
Evaluates:
Scalp chemical tolerance under processing
Repeated-use scalp barrier recovery
Post-color scalp dryness/flaking trajectory
Sensitization accumulation under repeated coloring
Irritation risk for sensitive or compromised scalp
Comedogenicity of post-color conditioning agents
Core Rules:
Processing-time scalp exposure > rinse-off contact in all scoring
Scalp irritation trajectory under 4–8 week repeat coloring = primary concern
Existing scalp conditions (psoriasis, eczema, seborrheic dermatitis) represent high risk — must be noted

CORE SCORE FORMULA
Core Score =
(
  Safety             × 0.30 +
  Effectiveness      × 0.15 +
  Allergy Risk       × 0.25 +
  Eco Impact         × 0.05 +
  Ingredient Quality × 0.10 +
  Skin Compatibility × 0.15
)

NOTE: Safety (0.30) and Allergy Risk (0.25) carry elevated combined weight (0.55) vs cleansers/styling products. Hair color is the highest sensitization-risk category in cosmetics. This weighting reflects that reality.

LAYER 6 — SPECIALIZED COLOR PERFORMANCE
Evaluates real-world repeated-use hair color behavior. Score Range: 1.0 → 5.0

COLOR DEPOSIT & ACCURACY [DOMINANT EFFECTIVENESS METRIC]
Evaluates:
Dye molecule penetration depth (surface vs cortex)
Color accuracy vs claimed shade
Vibrancy and depth of color
Gray/white hair coverage quality (Type A/B)
Evenness of application and result
Color-to-color consistency across product lines
COLOR DEPOSIT CEILINGS BY TYPE:
Product Type
Deposit Mechanism
Max Deposit Score
Type A Permanent
Cortex penetration, full
Eligible for 5.0
Type B Demi-permanent
Partial cortex
Max 4.5
Type C Semi-permanent
Surface deposit
Max 4.0
Type D Temporary
Cuticle surface only
Max 3.0
Type F Henna
Keratin bonding
Max 3.5 (shade limited)
Type G Depositing treatment
Surface + partial
Max 4.0


COLOR LONGEVITY
Evaluates:
Number of washes before significant fade
UV fade resistance (if claimed)
Water/sweat fade behavior
Thermal fade behavior (heat styling)
Color-to-color stability (no unwanted tonal shift)
Core Rules:
Longevity claims must be architecturally supported
Direct dyes (Type C) inherently fade faster — scoring relative to type
"Long-lasting" permanent color requires oxidative coupler evidence
LONGEVITY BENCHMARKS BY TYPE:
Product Type
Expected Longevity
Type A Permanent
Until new growth (permanent at shaft level)
Type B Demi-permanent
20–28 washes
Type C Semi-permanent
8–16 washes
Type D Temporary
1–2 washes
Type F Henna
Very long (keratin-bonded)
Type G Depositing treatment
4–8 washes


FIBER INTEGRITY [DOMINANT DAMAGE PARAMETER]
Evaluates:
Cuticle disruption and lifting risk
Cortex protein denaturation (oxidative damage)
Disulfide bond disruption
Porosity increase trajectory under repeated coloring
Developer volume damage proportionality
Post-processing fiber condition
Bond-building additive presence and functional tier
FIBER INTEGRITY CEILINGS BY TYPE:
Product Type
Maximum Score
Type A Permanent, no conditioning arch.
Max 2.5
Type A Permanent, with bond-builder
Max 3.5
Type B Demi-permanent
Max 3.8
Type C Semi-permanent
Max 4.5
Type D Temporary
Eligible for 5.0
Type E Bleach, no conditioning
Max 1.5
Type E Bleach, with bond-builder
Max 2.5
Type F Pure Henna
Eligible for 5.0
Type G Depositing treatment
Max 4.5


SCALP SAFETY DURING PROCESSING
Evaluates:
Scalp chemical contact burden (processing time × concentration)
Alkalizing agent scalp irritation potential
Developer volume scalp oxidative stress
Persulfate respiratory risk (Type E)
Post-processing scalp condition (redness, tightness, burning signals)
Sensitivity amplification under repeated use
Existing scalp condition risk amplification
Core Rules:
Processing time is the critical exposure multiplier
Scalp-adjacent hair shaft coloring has lower risk than direct scalp application
Bleach applied directly to scalp receives maximum Scalp Safety penalty
"On-scalp" vs "off-scalp" technique distinction must be noted where relevant

SENSITIZATION ACCUMULATION RISK
Evaluates:
Dye intermediate tier (Tier 1–4)
Repeated coloring frequency (4–8 week cycles)
Cumulative PPD/PTD exposure trajectory
Cross-sensitization liability (rubber, benzocaine, PABA, sulfonamides)
Once-sensitized permanence
Patch test compliance
Sensitization risk for high-frequency colorers
Core Rules:
This is distinct from single-use Allergy Risk — evaluates long-term repeated exposure trajectory
A product with borderline Allergy Risk score becomes high-risk under every-6-week coloring
Frequency multiplier must apply to sensitization scoring
"Never reacted before" offers no structural protection against future sensitization

POST-COLOR FIBER RECOVERY
Evaluates:
Presence of post-processing conditioning architecture within the system
Acidic post-color rinse inclusion (pH 3.5–5.0)
Bond-building agent integration (Maleic Acid, Glyoxylic Acid equivalents)
Protein/keratin replenishment agents
Humectant and emollient integration for porosity management
Wash-to-wash fiber condition trajectory after coloring
Core Rules:
Complete color systems (dye + post-treatment) receive integration bonus
Stand-alone color products with no post-color conditioning architecture are penalized relative to systems
Bond-building additives must be validated (Maleate chemistry, not botanical marketing)

CUMULATIVE DAMAGE RISK [DOMINANT PENALTY PARAMETER]
Evaluates:
Repeated coloring cycle structural damage accumulation
Developer volume × coloring frequency fiber load
Sensitization trajectory under repeat use
Alkalizing agent protein disruption under repeated exposure
Combined bleach + color service damage stacking
Long-term porosity, breakage, and fiber integrity decline
Core Rules:
Single-use feel cannot override cumulative damage trajectory
Products designed for frequent re-application face higher scrutiny
Bleach + toner + permanent color combinations must note cumulative damage ceiling
"Nourishing color" claims must demonstrate post-processing recovery architecture

FORMULATION HONESTY
Evaluates:
"Ammonia-free = safe/gentle" claim without alkalizer evaluation
Gray coverage claims without supporting oxidative architecture
"Bond-building" claims without Maleate or validated bond chemistry
"Natural/organic" claims with synthetic Tier 1 dye intermediates
Lift claims with insufficient developer volume
"Nourishing color" claims without functional conditioning integration
"PPD-free" claims using equally sensitizing PTD without disclosure
"Black henna natural" mislabeling
Core Rules:
"PPD-free" while containing PTD must be flagged — PTD is structurally similar and cross-reactive
"Natural" claims with Tier 1/2 oxidative intermediates trigger mandatory disclosure
Chemistry-necessary alkalinity is not a formulation failure — but excess alkalinity is
"Ammonia-free" must be accompanied by alkalizer identification to receive honesty credit

SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all 8 specialized scores

Dominant Parameters:
Fiber Integrity → primary structural damage parameter
Sensitization Accumulation Risk → primary safety trajectory parameter
Cumulative Damage Risk → primary long-term penalty parameter
Color Deposit & Accuracy → primary functional parameter
For Type E (Bleach): Fiber Integrity and Scalp Safety During Processing are dominant For Type F (Henna): Color Deposit, Longevity, and Fiber Integrity are dominant For Type G (Depositing treatments): Color Longevity and Post-Color Fiber Recovery are dominant

LAYER 7 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)

Core and Specialized scores carry equal weight.
This prevents:
Color performance inflation masking safety risk
Safe-but-ineffective color product scoring inflation
"Natural" positioning overriding honest sensitization scoring

HIGH SCORE ELIGIBILITY (>4.0)
Requires:
Dye intermediate Tier 3 or Tier 4 (no PPD/PTD dominance)
Developer volume proportional to color goal (minimum required)
Post-processing pH normalization architecture
Fiber Integrity ≥ 3.5 for product type
Cumulative Damage Risk ≥ 3.0
No decorative botanical inflation for functional claims
No dominant fragrance in processing-time scalp product
Formulation Honesty ≥ 3.5
Sensitization Accumulation Risk ≥ 3.0
ABSOLUTE DISQUALIFIERS (no score above 3.5 regardless of other factors):
PPD-dominant system with no safety disclosure
"Black henna" PPD-adulterated product marketed as natural
Metallic salt-containing product without incompatibility warning
Persulfate bleach with no respiratory safety note
pH >12 without structural justification
Ammonia-free claim with unidentified high-disruption alkalizer presented as safety feature

LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate:
Repeated coloring every 4–8 weeks for 12 months
Root touch-up vs full-color application distinction
Cumulative scalp sensitization trajectory
Fiber porosity progression under repeated oxidative processing
Developer volume fiber stress accumulation
Post-color wash fade behavior
Combined service stress (color + bleach + heat styling)
Scalp microbiome disruption under repeated chemical exposure
Core Question: Can the color product deliver consistent results under repeated real-world coloring cycles without progressive sensitization, fiber failure, or scalp damage?
Core Rules:
Single application experience cannot override long-term damage trajectory
Sensitization may appear after months or years of use — this must be reflected in scoring
"Never had a reaction" does not reduce sensitization accumulation scoring
Post-color fiber brittleness, breakage, or porosity increase = structural failure signal

ANTI-MARKETING FILTER
Mandatory penalties apply for:
"Ammonia-free = gentle" without alkalizer evaluation
"PPD-free" while containing PTD without cross-reactivity disclosure
"Natural/herbal color" with synthetic oxidative dye intermediates
"Bond-repairing" claims without Maleate or validated bond chemistry
"Nourishing" permanent color without post-processing recovery architecture
"Dermatologist tested" without sensitization disclosure
"Up to X% less damage" without developer volume or chemistry comparison evidence
"Safe for sensitive scalp" with Tier 1 dye intermediates
"Black henna" natural positioning

BIAS NEUTRALIZATION FILTER
Neutralize:
Cream texture = gentle chemistry illusion
"Ammonia-free" = automatically safer illusion
"Natural/organic" = zero sensitization illusion
Fragrance-free = allergen-free illusion (dye intermediates are the primary allergens)
No immediate reaction = no sensitization risk illusion
"Salon quality" = superior safety/formulation illusion
High price = lower chemical burden illusion
"Vegan" = lower irritation risk illusion
PPD-free = low allergy risk illusion (PTD is cross-reactive)
Dark-colored cream = "stronger/more effective" illusion

OUTPUT FORMAT

⭐ FINAL RATING X.X / 5 — Rating Level

⚖ STRUCTURAL QUALITY
Short simple summary covering:
Product type classification
Dye intermediate sensitization tier
Developer volume and damage proportionality
Alkalizing agent system
Fiber integrity architecture
Post-processing recovery integration
Overall formulation safety balance

🎨 COLOR PRODUCT PROFILE
Short product classification.
Examples:
Permanent Oxidative Color — PPD-Dominant, High Sensitization Architecture
Demi-Permanent — Moderate Sensitization, Balanced Developer Volume
Direct Fashion Color — Low Sensitization, Surface Deposit
Bleach/Lightener — High Fiber Damage, Persulfate System
Pure Henna Color — Keratin-Bonding, Minimal Sensitization
Color-Depositing Conditioner — Conditioning Vehicle, Surface Toning
Ammonia-Free Permanent — MEA-Based, Unverified Safety Claim

📊 CORE SCORES (Give short structural reason for every scoring rule in easy language and mention why it scored)
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X

🧪 SPECIALIZED PERFORMANCE (Give short structural reason for every scoring rule in easy language and mention why it scored)
Color Deposit & Accuracy — ⭐X.X
Color Longevity — ⭐X.X
Fiber Integrity — ⭐X.X
Scalp Safety During Processing — ⭐X.X
Sensitization Accumulation Risk — ⭐X.X
Post-Color Fiber Recovery — ⭐X.X
Cumulative Damage Risk — ⭐X.X
Formulation Honesty — ⭐X.X

👍 STRENGTHS
Main structural advantage
Main structural advantage
Main structural advantage
⚠ CONCERNS
Main structural weakness
Main structural weakness
Main structural weakness

⚠ MANDATORY SAFETY DISCLOSURES (Output this section for all Tier 1/2 products and Type E bleach — never omit)
Patch test requirement: Yes / Not required
PPD/PTD cross-sensitization risk: Yes / No
Persulfate respiratory risk: Yes / No (Type E only)
Metallic salt incompatibility: Yes / No
Subsequent chemical service incompatibility: Yes / No (Type F)
Recommended interval between colorings: X weeks minimum

👤 HAIR TYPE COMPATIBILITY
Fine / Thin Hair — ⭐X.X
Thick / Coarse Hair — ⭐X.X
Color-Treated / Previously Colored — ⭐X.X
Chemically Processed (relaxed, permed) — ⭐X.X
Bleached / High-Porosity Hair — ⭐X.X
Gray / White Hair — ⭐X.X
Sensitive / Reactive Scalp — ⭐X.X

📅 LONG-TERM USABILITY
Every 4 Weeks (Root Touch-Up) — ⭐X.X
Every 6–8 Weeks (Full Color) — ⭐X.X
Occasional / Seasonal Use — ⭐X.X

⏱ EXPECTED RESULTS
Immediate (First application):
Color accuracy and vibrancy
Scalp sensation during processing
Post-rinse fiber feel
Medium-Term (Applications 2–4):
Color consistency and fade behavior
Fiber condition trajectory
Sensitization early signals
Long-Term (12+ months, repeated coloring):
Fiber porosity and breakage trajectory
Sensitization accumulation status
Scalp health under repeated chemical exposure
Color performance stability
Overall structural outcome

🔬 KEY STRUCTURAL INGREDIENTS
List only major ingredients affecting:
Dye intermediate system (sensitization tier)
Developer / oxidant architecture
Alkalizing agent type
Bond-building additives (if present)
Conditioning and recovery architecture
Persulfates (if Type E)
Fragrance/preservative risk
Metallic salts (if present)

🧠 WHY THIS RATING
3–5 concise user-friendly evidence-based points explaining the final rating.

⚠ STRICT OUTPUT RULES
NO MEDICAL CLAIMS ANYWHERE
No marketing influence on scoring
Product type MUST be classified before scoring
Dye intermediate tier MUST be classified before scoring
Developer volume MUST be assessed for all oxidative types
Alkalizing agent MUST be identified — "ammonia-free" is not automatically safe
PPD presence at any level triggers mandatory disclosure
PTD must be disclosed as cross-reactive with PPD — "PPD-free" with PTD is misleading
"Black henna" must be reclassified as Tier 1 regardless of natural claims
Metallic salt presence triggers mandatory subsequent-service incompatibility warning
Persulfate presence in bleach triggers mandatory respiratory safety note
Processing time amplifies all safety/allergy concerns beyond rinse-off equivalence
Repeated coloring frequency multiplies sensitization accumulation
Post-processing pH recovery architecture must be evaluated
Single-use feel cannot override cumulative damage trajectory
"Ammonia-free" claim must trigger alkalizer identification — no automatic safety bonus
"PPD-free" + PTD present = Formulation Honesty penalty
"Natural/herbal" + synthetic Tier 1/2 dye intermediates = mandatory disclosure
Bond-building claims require Maleate or equivalent validated chemistry
Patch test recommendation is mandatory output for all Tier 1/2 products
Fiber Integrity ceilings by product type are hard limits — not adjustable by marketing

HAIR DYE & COLOR PRODUCT EVALUATION ALGORITHM — V1.0 Oxidative chemistry transparency, sensitization science, fiber damage honesty — not salon marketing.

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
              "You are a strict hair dye formulation evaluation engine. Always return professional markdown analysis."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    return response
      .choices[0]
      .message
      .content;

  }

  async run(
    ingredients
  ) {

    try {

      console.log(
        "HAIR DYE CLINICAL ANALYSIS STARTED"
      );

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        product_type:
          "CLINICAL",

        ingredients,

        analysis

      };

    }

    catch(error) {

      console.log(
        "HAIR DYE CLINICAL ERROR",
        error.message
      );

      throw error;

    }

  }

}

module.exports =
new ClinicalEngine();