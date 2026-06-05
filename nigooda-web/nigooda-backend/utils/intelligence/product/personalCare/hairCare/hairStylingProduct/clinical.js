const openai =
require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

================================================
HAIR STYLING PRODUCT EVALUATION ALGORITHM — V1.0

LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hair styling products that demonstrate:
Functional hold, texture, or finish appropriate to product type
Scalp and hair fiber compatibility under repeated use
Minimal residue accumulation and clean wash-out behavior
Barrier-considerate formulation design (scalp contact products)
Physiological pH compatibility
Low cumulative irritation and sensitization risk
Long-term hair fiber integrity preservation
Honest styling performance without structural damage inflation
Mandatory penalties apply for:
Fragrance-driven "premium" or "salon" positioning
Decorative botanical loading without functional evidence
Alcohol-dominant drying architecture marketed as "lightweight"
Film-forming polymer overloading without plasticizer balance
Hold inflation through barrier-stripping drying agents
Hygroscopic failure under humidity (not disclosed)
Marketing-driven sensory engineering over structural hold delivery
Basic hold alone cannot achieve high scores. Structural damage risk, wash-out behavior, and long-term fiber compatibility must all be evaluated.

PRODUCT TYPE CLASSIFICATION (MANDATORY FIRST STEP)
Before any scoring, the product must be classified by type. Each type carries different structural expectations, hold requirements, and risk profiles.
TYPE A — HOLD-DOMINANT PRODUCTS
Hair gel
Hair wax / pomade
Hair clay
Hair paste
Sculpting cream
Strong-hold mousse
TYPE B — FINISH / TEXTURE PRODUCTS
Hair serum (styling, not growth)
Hair oil (styling)
Shine spray
Anti-frizz serum
Smoothing cream
Glossing treatment
TYPE C — FLEXIBLE / LIGHTWEIGHT HOLD PRODUCTS
Light-hold mousse
Volumizing spray
Texturizing spray
Sea salt spray
Hair mist
Curl enhancing cream/gel
TYPE D — HEAT PROTECTION PRODUCTS
Heat protectant spray
Thermal shield cream
Blow-dry primer
Hot tool prep serum
TYPE E — SCALP-CONTACT STYLING PRODUCTS
Root lift spray
Scalp volumizer
Hair thickening tonic (styling)
Dry shampoo (included here as scalp-contact styling)
Products may have dual classification (e.g., heat protectant + shine serum = Type B + D).
CLASSIFICATION RULE: Scoring ceilings, performance expectations, and specialized metrics adjust based on product type. A hair oil scored against gel hold standards is invalid. Type must be established before scoring.

TRANSPARENCY PRIORITY RULE
Ignore:
Fragrance perception of "clean" or "fresh"
Foam richness or lather (not applicable to most styling products)
"Organic/natural/vegan" marketing positioning
Trend-driven botanical loading without functional evidence
Luxury texture aesthetics
Ingredient-count inflation
Evaluate only:
Hold polymer architecture (type, strength, flexibility)
Film-forming balance (hold vs brittleness vs wash-out)
Alcohol load and drying risk
Scalp contact safety (where applicable)
pH compatibility
Residue accumulation behavior
Hygroscopic performance
Long-term fiber integrity

GLOBAL ENFORCEMENT RULES
Polymer/hold architecture is the dominant styling product structure
Safety penalties override functional hold bonuses
Fragrance cannot compensate for damaging alcohol or polymer systems
Late-position conditioning agents cannot neutralize structurally drying formulations
Foam/lather = not applicable
Fragrance freshness ≠ hair health
Post-style brittleness/flaking = structural formulation failure signal
Excess drying alcohol in leave-on products = cumulative fiber and scalp damage
Non-physiological pH reduces Safety and fiber integrity scores
Decorative active inflation must be penalized

STRUCTURE DOMINANCE RULE
Primary polymer and solvent architecture determines:
Hold strength and flexibility
Fiber surface disruption
Flaking and residue behavior
Scalp barrier stress
Wash-out difficulty
Hygroscopic performance
Long-term fiber integrity
Minor conditioning agents and decorative botanicals cannot override a damaging drying or polymer architecture.
Ingredient evaluation must consider:
Polymer tier (flexible film-former vs brittle vs hybrid)
Alcohol type and concentration (drying vs fatty)
Solvent load
Formulation pH
Wash-out realism
Repeated-use exposure

LAYER 1 — POLYMER & HOLD ARCHITECTURE SYSTEM
MANDATORY RULE: All hold-contributing polymers and film-formers must be classified before scoring.
Polymer architecture is the primary determinant of:
Hold strength and flexibility
Fiber surface feel
Flaking tendency
Wash-out ease
Humidity resistance
Long-term fiber stress

POLYMER TIER TABLE
TIER 1 — BRITTLE / HIGH-FLAKE RISK
Examples:
PVP (Polyvinylpyrrolidone) as dominant hold polymer
PVP/VA Copolymer at high concentration
Shellac (high load)
Older acrylate homopolymers
Characteristics:
Strong hold
High flaking/crumbling tendency
Poor flexibility
Difficult to remove in humidity
Fiber surface stress under repeated use
Scoring Impact:
Flaking Risk penalty
Wash-Out penalty
Fiber Integrity ceiling reduction

TIER 2 — MODERATE / MIXED PERFORMANCE
Examples:
Acrylates Copolymer
Polyquaternium-4
Polyquaternium-10
VP/Dimethylaminoethylmethacrylate Copolymer
PVP/VA Copolymer in blended systems
Characteristics:
Moderate hold
Some conditioning benefit
Intermediate flaking tendency
Moderate humidity resistance
Scoring Impact:
Moderate Flaking Risk
Acceptable Wash-Out behavior
Blend-dependent performance

TIER 3 — FLEXIBLE / FIBER-FRIENDLY
Examples:
Acrylates/Hydroxyesters Acrylates Copolymer
Polyurethane-14 (and AMP-Acrylates Copolymer systems)
Polyurethane-35
PEG/PPG-25/25 Dimethicone
Hydroxypropyl Guar (flexible hold)
Carbomer-based gels (water-activated, flexible)
Characteristics:
Flexible hold
Good fiber compatibility
Lower flaking tendency
Good humidity handling (polyurethane systems)
Easier wash-out
Scoring Impact:
Eligible for strong Fiber Integrity scores
Lower Flaking Risk
Good Wash-Out behavior

TIER 4 — CONDITIONING / MINIMAL HOLD
Examples:
Hydrolyzed proteins (wheat, keratin, silk)
Hydroxypropyl Cellulose
Pectin / Flaxseed Extract (natural film-formers)
Castor Oil (soft hold in waxes)
Beeswax / Candelilla Wax (mechanical hold, waxes)
Cetyl/Stearyl alcohol (emollient structure)
Butters (Shea, Mango — flexible conditioning hold)
Characteristics:
Minimal flexible hold
High conditioning
Natural film-forming
Easy wash-out (most)
Low fiber stress
Scoring Impact:
Eligible for maximum Fiber Integrity
Maximum Scalp Compatibility (for scalp-contact products)
Minimal hold ceiling (cannot claim strong hold)

POLYMER SYSTEM RULE
Primary polymer determines system performance and damage risk.
SYSTEM CLASSIFICATION:
Tier 1 dominant → Strong hold, High flake/damage risk
Tier 1 + Tier 3 → Strong hold, Reduced flake risk
Tier 2 dominant → Moderate hold, Moderate risk
Tier 2 + Tier 3/4 → Moderate hold, Lower risk
Tier 3/4 dominant → Flexible/light hold, Low damage risk
Tier 4 dominant → Conditioning-dominant, minimal structural hold
Additional Rules:
High-flake Tier 1 systems cannot qualify as "flexible hold" or "natural finish"
Tier 3/4 conditioning systems receive Fiber Integrity bonus

LAYER 2 — ALCOHOL ARCHITECTURE RULE
CRITICAL DISTINCTION: Hair styling products use two fundamentally different alcohol types with opposite effects.

ALCOHOL TYPE TABLE
DRYING ALCOHOLS (DAMAGING IN LEAVE-ON CONTEXT)
Denatured Alcohol (SD Alcohol, Alcohol Denat.)
Ethanol
Isopropyl Alcohol
Propanol
Characteristics:
Fast-evaporation = quick dry
Strip natural oils from hair fiber and scalp
Increase hair porosity under repeated use
Cause scalp irritation at high levels
Create brittle fiber surface
Scoring Impact (leave-on or sustained-contact):
Safety penalty at high concentrations (>10–15%)
Fiber Integrity penalty
Scalp Barrier penalty (if scalp-contact product)
Cumulative Irritation Risk penalty
Context Rule:
In rinse-out styling treatments: moderate concern
In leave-on styling products: high concern
In heat protectants: penalty reduced if concentration is functional rather than structural

FATTY ALCOHOLS (CONDITIONING)
Cetyl Alcohol
Stearyl Alcohol
Cetearyl Alcohol
Behenyl Alcohol
Lauryl Alcohol
Characteristics:
Emollient and conditioning
Soften and smooth hair fiber
No drying effect
Structural emulsifiers
Scoring Impact:
No drying penalty
Conditioning credit
Eligible for Fiber Integrity bonus

ALCOHOL LOAD RULE:
Drying alcohol as primary solvent (>20%) → Mandatory Safety and Fiber Integrity penalty
Drying alcohol as secondary component (5–20%) → Moderate concern, frequency-dependent
Trace drying alcohol (<5%) → Minor concern
Fatty alcohols in any amount → Neutral to positive scoring

LAYER 3 — STYLING PRODUCT pH RULE
pH is a mandatory scoring modifier affecting:
Hair cuticle state (open vs closed)
Fiber surface integrity
Scalp acid mantle preservation (scalp-contact products)
Active ingredient stability
Color-treated hair compatibility
Physiological hair/scalp pH: 4.5–5.5 Cuticle sealing pH: 4.5–6.0
High-pH products:
Open cuticle = increased porosity
Increased fiber brittleness
Loss of color/chemical treatment integrity
Scalp microbiome disruption (scalp-contact products)
Alkaline styling products (pH >7.5) receive mandatory fiber integrity and safety penalties.

pH SCORING TIERS
pH Range
Classification
Scoring Impact
4.5–6.0
Optimal
Cuticle + Barrier bonus
6.0–6.5
Acceptable
Neutral
6.5–7.5
Mild penalty
—
7.5–9.0
Moderate penalty
Cuticle damage signal
>9.0
Significant penalty
Elite scores disqualified
Unknown
No bonus
Minor credibility reduction

pH penalties are amplified for leave-on products and color-treated hair contexts.

LAYER 4 — HEAT PROTECTION ACTIVE CLASSIFICATION (TYPE D PRODUCTS)
For Type D (heat protection) products, thermal actives must be classified separately.
CATEGORY A — VALIDATED THERMAL PROTECTION
Amodimethicone (heat-bonding silicone)
Dimethicone (film-forming thermal barrier)
Cyclomethicone / Cyclopentasiloxane (volatile carrier, limited residue)
Polyquaternium-68 (thermal conditioning)
Cetrimonium Chloride (film-forming cuticle protection)
Bis-Aminopropyl Diglycol Dimaleate (bond-building protection)
Scoring: Full thermal protection credit
CATEGORY B — PARTIAL THERMAL SUPPORT
Panthenol (limited thermal support, humectant primary)
Hydrolyzed Proteins (surface coating, limited thermal barrier)
Argan Oil (antioxidant thermal support, limited)
Plant Ceramides (limited substantivity under heat)
Scoring: Partial credit
CATEGORY C — DECORATIVE (NO HEAT PROTECTION)
Most antioxidant botanicals
Generic "strengthening" plant extracts
Fragrance ingredients positioned as "heat protection"
Collagen / HA in heat protectant context
Scoring: No thermal credit. Marketing use triggers Formulation Honesty penalty.
THERMAL CEILING RULE: No validated Category A thermal active → Maximum Heat Protection score: 2.0

LAYER 4.5 — SILICONE CLASSIFICATION RULE
Silicones are critical in styling products and must be classified by behavior.
WATER-SOLUBLE / EASY REMOVAL:
PEG-modified dimethicones (e.g., PEG-8 Dimethicone)
Cyclomethicone (volatile, self-removing)
Cyclopentasiloxane (volatile)
Scoring: Minimal residue concern. Low buildup risk.
WATER-INSOLUBLE / BUILDUP RISK:
Dimethicone (high MW)
Amodimethicone (substantive, bonding)
Phenyl Trimethicone
Cyclopentasiloxane in heavy formulations
Scoring:
Functional credit for smoothing/protection
Residue Accumulation penalty if dominant
Buildup note required in output
Sulfate-free wash-out difficulty must be flagged
SILICONE RULE: Heavy insoluble silicone systems cannot achieve elite Wash-Out or Fiber Integrity scores unless use frequency and cleansing compatibility are considered.

LAYER 4.6 — COLORANT PENALTY RULE
Artificial/decorative colorants provide no styling, hold, or hair health benefit and increase unnecessary irritation burden — especially in scalp-contact styling products.
High concern examples:
Red 40
Yellow 5 / Yellow 6
Blue 1
Green 3
Multiple synthetic dye blends
Scoring Impact:
Allergy Risk penalty
Ingredient Quality penalty
Cumulative Irritation Risk penalty
Formulation Honesty penalty
OUTPUT RULE: Colorants must be mentioned under: Concerns, Why This Rating, Key Structural Ingredients.

LAYER 4.7 — FRAGRANCE / ESSENTIAL OIL RULE
Leave-On Amplification applies to most styling products.
Hair oils, serums, creams, and sprays are leave-on for hours. Even lighter products like texturizing sprays have sustained hair-fiber and sometimes scalp contact.
High fragrance concern triggers:
"Parfum" / "Fragrance" as mid-to-high list ingredient
Photosensitizing oils (Bergamot, citrus cold-press)
Known allergens (Limonene, Linalool, Eugenol, Geraniol)
Multiple essential oils in a single formula
Drying alcohol + fragrance (solvent amplifies penetration to scalp)
Scoring Impact:
Allergy Risk mandatory penalty
Cumulative Irritation Risk penalty
Heavy fragrance cannot achieve elite Safety or Allergy Risk scores

LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 for every rule

SAFETY [DOMINANT]
Evaluates:
Drying alcohol load (leave-on scalp and fiber context)
Irritant or sensitizer concentration
Scalp barrier disruption risk (scalp-contact products)
Repeated-use irritation burden
pH-related fiber or scalp stress
Preservative sensitization risk
Cumulative inflammatory load
Core Rules:
Drying alcohol as primary solvent triggers Safety penalty
Daily-use frequency magnifies irritation burden
Safety overrides fragrance freshness, luxury texture, salon positioning

EFFECTIVENESS
Core Question: Does the product deliver its claimed styling function — hold, finish, heat protection, frizz control — with structural integrity?
Evaluates:
Polymer hold tier and flexibility
Finish quality (shine, texture, definition)
Heat protection actives (Type D)
Humidity resistance
Product-type-appropriate functional performance
Formulation honesty vs claimed performance
High effectiveness requires:
Appropriate polymer or film-forming architecture for claimed hold
Validated actives for specific claims (heat protection, frizz control)
pH suitability for cuticle performance
No inflation through damaging drying agents
Rules:
Hold achieved through aggressive drying cannot receive full credit
Decorative Category C active inflation cannot receive full credit
Marketing claims (fragrance, luxury, botanical) are ignored

ALLERGY RISK
Evaluates:
Fragrance/parfum exposure (leave-on severity)
Essential oil sensitizers
Preservative sensitizers
Botanical allergens
Quaternary ammonium sensitizers (repeat exposure)
Cumulative sensitization under repeated styling use
Application Rules:
Leave-on fragrance = higher concern than rinse-off
Photosensitizing oils receive additional UV-exposure penalty
Frequency of daily styling use is dominant factor

ECO IMPACT
Evaluates:
Microplastic-associated polymer persistence (acrylate polymers, PVP)
Aerosol propellant impact (spray products)
Silicone environmental persistence
Packaging sustainability consideration
Biodegradability of core film-formers
General Rules:
PVP and acrylate-dominant products receive environmental note
Aerosol propellant systems reduce score
Natural wax and plant-based film-former systems receive ecological preference

INGREDIENT QUALITY
Evaluates:
Polymer system coherence for claimed hold
Alcohol type accuracy (drying vs fatty)
Active honesty (heat protection, repair, strengthening claims)
Functional ingredient synergy
Absence of decorative inflation
Structural formulation transparency
Rules:
Decorative active stacking reduces quality credibility
Non-functional botanical loading reduces transparency
Mismatch between claimed hold level and polymer architecture triggers penalty

SKIN COMPATIBILITY
Evaluates:
Scalp-contact tolerance (root spray, dry shampoo, thickening tonic)
Hair fiber compatibility under repeated use
Post-use scalp flaking or irritation
Acne-prone scalp compatibility (comedogenicity of heavy waxes/butters)
Microbiome stability for scalp-contact products
Long-term use tolerance
Core Rules:
Scalp-contact heavy waxes/pomades receive comedogenicity note
Temporary smoothness does not equal compatibility
Long-term repeated-use behavior prioritized

CORE SCORE FORMULA
Core Score =
(
  Safety             × 0.25 +
  Effectiveness      × 0.20 +
  Allergy Risk       × 0.15 +
  Eco Impact         × 0.10 +
  Ingredient Quality × 0.15 +
  Skin Compatibility × 0.15
)


LAYER 6 — SPECIALIZED STYLING PERFORMANCE
Evaluates real-world repeated-use styling product behavior. Score Range: 1.0 → 5.0

HOLD PERFORMANCE [TYPE A/C DOMINANT METRIC]
Evaluates:
Polymer architecture appropriateness for claimed hold level
Flexibility vs stiffness ratio
Hold duration under real-world conditions
Humidity resistance
Re-workability (if claimed)
Hold Level Classification:
Claimed Level
Minimum Polymer Requirement
Strong/Max hold
Tier 1 or Tier 1+2 combination
Medium hold
Tier 2 or Tier 2+3 combination
Light/Flexible hold
Tier 3 dominant
No hold (finish only)
Tier 4 or film-free

Core Rules:
Hold achieved primarily through drying alcohols (not polymer architecture) receives penalty
Claimed hold level must be supported by polymer tier
Hygroscopic failure under humidity must be noted

FIBER INTEGRITY [DOMINANT PENALTY PARAMETER]
Evaluates:
Hair fiber surface disruption risk
Cuticle lifting potential
Drying alcohol long-term fiber porosity increase
Repeated heat + chemical stress amplification
Protein/keratin disruption risk
Brittleness from brittle film-forming systems
FIBER INTEGRITY CEILINGS:
Architecture
Maximum Score
Drying alcohol >30% leave-on
Max 1.8
Drying alcohol 15–30% leave-on
Max 2.5
Drying alcohol <15% leave-on
Max 3.2
Fatty alcohol + conditioning dominant
Max 4.5
Conditioning Tier 3/4 + pH 4.5–6.0
Eligible for 5.0
High pH (>7.5) any vehicle
Hard ceiling 2.5


FLAKING & RESIDUE RISK
Evaluates:
Film-forming polymer flake tendency
Buildup accumulation under repeated use
Wash-out ease (sulfate-free compatibility)
Silicone buildup risk
Wax/heavy oil buildup trajectory
White cast or visible residue
Core Rules:
Brittle Tier 1 polymer dominance receives mandatory Flaking Risk penalty
Heavy insoluble silicone stacking triggers Buildup Risk note
Products marketed as "invisible" or "no residue" must be evaluated structurally
Wash-out difficulty with sulfate-free shampoo must be flagged

HEAT PROTECTION EFFICACY [TYPE D DOMINANT METRIC]
Evaluates:
Presence and tier of thermal protection actives
Validated temperature range claimed vs active evidence
Film-forming continuity under heat
Bond-protecting additives
Re-application requirement
HEAT PROTECTION CEILINGS:
Active System
Maximum Score
No validated Category A thermal active
Max 2.0
1 Category A active, basic vehicle
Max 3.5
1–2 Category A actives, optimized delivery
Max 4.5
Full thermal architecture (silicone + bond builder + humectant)
Eligible for 5.0
Category C only, marketing-driven "heat protection"
Max 1.5


HUMIDITY RESISTANCE
Evaluates:
Film-forming hygroscopic stability
Frizz re-emergence under humidity
Hold collapse in moisture
Anti-humectant ingredient presence (if anti-frizz claimed)
Hydrophobic film-former presence
Core Rules:
Products claiming "anti-frizz" or "humidity control" must have structural support
Hygroscopic polymers without humectant control receive humidity resistance penalty
Sea salt / glycerin-dominant products without film-forming structure fail humidity resistance

WASH-OUT BEHAVIOR
Evaluates:
Ease of removal with mild shampoo
Silicone compatibility with sulfate-free systems
Wax/oil buildup removal requirement
Polymer solubility and residue clearance
Scalp pore-clogging risk from heavy pomades/waxes
Core Rules:
Water-soluble polymer systems receive maximum Wash-Out scores
Insoluble silicone dominance reduces score
Heavy wax/pomade systems that require clarifying shampoo must be flagged
"Water-soluble" claimed products must be structurally verified

SCALP COMPATIBILITY [SCALP-CONTACT PRODUCTS — TYPE E]
Evaluates:
Scalp barrier disruption risk
Comedogenicity of waxes, oils, butters (pore-clogging risk)
Scalp microbiome stability
Post-application itching/flaking/irritation
Dry shampoo starch accumulation and follicular occlusion
Long-term scalp health under regular product use
Core Rules:
Mandatory for Type E products (dry shampoo, root spray, scalp volumizer)
Heavy oils/butters applied to scalp receive comedogenicity flag
Dry shampoo talc/starch accumulation requires wash frequency guidance note
Scalp-contact drying alcohol receives amplified penalty vs non-scalp products

CUMULATIVE IRRITATION RISK [DOMINANT PENALTY PARAMETER]
Evaluates:
Repeated drying alcohol exposure (leave-on)
Fragrance accumulation (daily styling)
Preservative sensitization trajectory
Scalp-contact chemical burden (Type E)
Chronic inflammatory load under daily styling routine
Frequency-weighted exposure
Core Rules:
Daily styling frequency amplifies irritation burden significantly
Leave-on products with fragrance + drying alcohol receive compounded penalty
Long-term low-grade irritation prioritized over isolated acute reactions
Dry shampoo overuse scalp occlusion must be flagged

FORMULATION HONESTY
Evaluates:
Hold level claim vs polymer architecture
"Natural/organic" hold claims with synthetic polymer dominance
Heat protection claims without Category A thermal actives
"Repair/strengthen" claims from styling products without bond-building evidence
Decorative botanical loading for "nourishing" styling claims
"Alcohol-free" claims — must specify drying alcohol, not fatty alcohol
Humidity control claims without anti-humectant architecture
"Lightweight" claims with heavy polymer or silicone loading
Core Rules:
Consumer perception cannot replace structural formulation quality
"Alcohol-free" must mean drying-alcohol-free, not fatty-alcohol-free
Styling claims must be supported by polymer/active tier evidence
"Nourishing" or "strengthening" styling product claims require structural support

SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all 8 specialized scores
(Adjust to relevant subset if product type does not use all 8)

For Type A/C products: Hold Performance is dominant For Type D products: Heat Protection Efficacy is dominant For Type B products: Fiber Integrity and Wash-Out are dominant For Type E products: Scalp Compatibility is dominant
Dominant Parameters (universal):
Fiber Integrity → primary damage parameter
Cumulative Irritation Risk → primary penalty parameter
Formulation Honesty → primary transparency parameter

LAYER 7 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)

Core and Specialized scores carry equal weight.
This prevents:
Marketing-driven hold inflation
Safe-but-non-functional scoring inflation
Effective-but-damaging-to-fiber inflation

HIGH SCORE ELIGIBILITY (>4.0)
Requires:
Polymer architecture appropriate to claimed hold
Drying alcohol <15% (leave-on context)
pH ≤ 7.5 (preferably 4.5–6.5)
Fiber Integrity ≥ 3.5
Cumulative Irritation Risk ≥ 3.0
No decorative active marketing for functional claims (heat, repair, hold)
No dominant fragrance/essential oil in leave-on daily styling product
Formulation Honesty ≥ 3.5
No unjustified hold-inflation through drying agents
DISQUALIFIERS:
Drying alcohol >30% in leave-on daily styling product
Heat protection claim with zero Category A thermal actives
High pH (>9.0)
Heavy fragrance dominant in daily leave-on product
Hold claim with zero polymer architecture (drying-only hold)

LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate:
Daily/twice-daily styling application
Leave-on duration (hours to overnight for some products)
Repeated fiber drying alcohol exposure over weeks/months
Polymer and silicone buildup accumulation trajectory
Long-term cuticle and fiber porosity changes
Wash-out cycle compatibility
Scalp pore-clogging accumulation (heavy waxes/dry shampoos)
Heat tool interaction (heat protectant daily use)
Core Question: Can the styling product remain functional and tolerable under long-term real-world daily use without progressive fiber or scalp damage?
Core Rules:
Post-use brittleness, flaking, or buildup = structural failure signal
Fragrance freshness ≠ styling product quality
Long-term fiber trajectory overrides single-use feel
Tingling or cooling sensation ≠ "product working" (often irritant signal)
"Salon quality" positioning cannot override structural scoring

ANTI-MARKETING FILTER
Mandatory penalties apply for:
"Heat protection up to 450°F" claims without validated thermal architecture
"Repairs bonds" claims from standard styling products without Maleate chemistry
"Nourishing hold" claims with Tier 1 brittle polymer dominance
"Alcohol-free" claims using fatty alcohol technicality
Fragrance-driven "revitalizing" or "strengthening" positioning
Decorative botanical loading for functional hold claims
"100% natural hold" when synthetic polymers are present
Humidity control claims without hydrophobic film-forming architecture
"Lightweight" claims with heavy silicone or polymer loading

BIAS NEUTRALIZATION FILTER
Neutralize:
Stiffness = strong hold illusion (stiffness often = brittle polymer)
Scent freshness = hair health illusion
Natural ingredients = safe styling illusion
More ingredients = more effective illusion
Luxury texture = professional quality illusion
Fast-drying = better hold illusion (often drying alcohol masking weak polymer)
Tingling = "working" illusion (often irritation)
"Salon-grade" = superior formulation illusion
High-shine = fiber health illusion (often silicone masking damage)

OUTPUT FORMAT

⭐ FINAL RATING X.X / 5 — Rating Level

⚖ STRUCTURAL QUALITY
Short simple summary covering:
Product type classification
Polymer/hold architecture
Fiber friendliness
Alcohol type and load
pH compatibility
Long-term fiber and scalp behavior
Overall formulation balance

💇 STYLING PRODUCT PROFILE
Short product classification.
Examples:
Strong-Hold Gel — Brittle Polymer Architecture
Flexible Lightweight Hold Mousse — Conditioning Film-Former
Heat Protectant — Validated Thermal Architecture
Frizz Serum — Heavy Insoluble Silicone Dominant
Natural Wax Pomade — Conditioning Tier 4
Marketing-Driven Growth Styling Serum
Anti-Frizz Cream — Balanced Humectant + Film-Former
Sea Salt Texture Spray — Hygroscopic, No Hold Polymer

📊 CORE SCORES (Give short structural reason for every scoring rule in easy language and mention why it scored)
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X

🧪 SPECIALIZED PERFORMANCE (Give short structural reason for every scoring rule in easy language and mention why it scored. Score only metrics relevant to the product type. Mark N/A for non-applicable metrics.)
Hold Performance — ⭐X.X / N/A
Fiber Integrity — ⭐X.X
Flaking & Residue Risk — ⭐X.X
Heat Protection Efficacy — ⭐X.X / N/A
Humidity Resistance — ⭐X.X
Wash-Out Behavior — ⭐X.X
Scalp Compatibility — ⭐X.X / N/A
Cumulative Irritation Risk — ⭐X.X
Formulation Honesty — ⭐X.X

👍 STRENGTHS
Main structural advantage
Main structural advantage
Main structural advantage
⚠ CONCERNS
Main structural weakness
Main structural weakness
Main structural weakness

👤 HAIR TYPE COMPATIBILITY
Fine / Thin Hair — ⭐X.X
Thick / Coarse Hair — ⭐X.X
Curly / Wavy Hair — ⭐X.X
Color-Treated Hair — ⭐X.X
Chemically Processed Hair — ⭐X.X
Dry / Damaged Hair — ⭐X.X
Oily Scalp Hair — ⭐X.X

📅 LONG-TERM USABILITY
Daily Use — ⭐X.X
Twice Daily Use — ⭐X.X
Occasional Use — ⭐X.X

⏱ EXPECTED RESULTS
Immediate (First use):
Application feel
Hold/finish delivery
Drying time and stiffness
Initial scalp or fiber reaction signals
Medium-Term (Week 2–4):
Buildup accumulation
Fiber dryness or brittleness trajectory
Scalp tolerance
Hold performance consistency
Long-Term (Month 2+):
Fiber porosity trajectory
Buildup and wash-out behavior
Scalp health under regular use
Overall fiber integrity outcome
Formulation claim reality check

🔬 KEY STRUCTURAL INGREDIENTS
List only major ingredients affecting:
Hold/polymer system
Fiber surface behavior
Alcohol type and load
Silicone classification
Thermal protection (if applicable)
Irritation risk
Wash-out behavior
Fragrance/preservative risk

🧠 WHY THIS RATING
3–5 concise user-friendly evidence-based points explaining the final rating.

⚠ STRICT OUTPUT RULES
NO MEDICAL CLAIMS ANYWHERE
No marketing influence on scoring
Mention harsh colorants, preservatives, fragrances in output
Product type MUST be classified before scoring
Polymer/hold architecture tier MUST be classified before scoring
Alcohol type (drying vs fatty) MUST be distinguished — never penalize fatty alcohols
pH compatibility MUST be assessed for all formulations
Heat protection actives MUST be classified before Effectiveness scoring (Type D)
Leave-on amplification = fragrance/irritant/alcohol penalties are higher than rinse-off
Repeated-use behavior > single-use feel
Long-term fiber outcome > immediate cosmetic feel
Post-use brittleness/flaking = structural failure signal, not "strong hold"
Stiffness ≠ hold quality
Fragrance freshness ≠ styling product quality
Natural ingredients ≠ effective hold
Fast-drying alcohol ≠ better formulation
High-shine ≠ fiber health (evaluate silicone type)
"Alcohol-free" claim must specify drying-alcohol-free to be credited
Silicone solubility MUST be noted for wash-out and buildup scoring

HAIR STYLING PRODUCT EVALUATION ALGORITHM — V1.0 Structural polymer integrity, fiber science, honest hold delivery — not salon marketing.


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
              "You are a strict hair styling product formulation evaluation engine. Always return professional markdown analysis."
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
        "HAIR STYLING PRODUCT CLINICAL ANALYSIS STARTED"
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
        "HAIR STYLING PRODUCT CLINICAL ERROR",
        error.message
      );

      throw error;

    }

  }

}

module.exports =
new ClinicalEngine();