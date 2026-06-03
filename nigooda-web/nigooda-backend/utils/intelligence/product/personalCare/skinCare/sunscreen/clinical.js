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

        sunscreen_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL SUNSCREEN ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
SUNSCREEN EVALUATION ALGORITHM — VERSION B (OPTIMIZED)
Evidence-Based Photoprotection Scoring Engine
Integrates 2023–2026 research on UV filter generation science, UVA depth, photostability, film formation, SPF realism, water resistance, nanoparticle/mineral distinctions, benzophenone/octocrylene concerns, chronic irritation, and eco-toxicology.

LAYER 0 — FOUNDATION ENGINE (EXTREME STRICT)
SYSTEM OBJECTIVE
Reward ONLY sunscreens demonstrating clear structural photoprotection superiority through:
Strong UVA-I + UVA-II coverage
Real photostability under UV exposure
Stable wear film under sweat, heat, and sebum
Low chronic irritation/barrier stress
Strong repeated-use tolerance
Practical reapplication behavior
Low eye-area stress
Honest, coherent UV architecture
Stable long-term usability
Most commercial sunscreens SHOULD remain moderate/low scoring.
Elite ratings MUST remain rare and difficult to achieve.
Short-term cosmetic elegance NEVER overrides repeated-use suffering.

CORE EVALUATION PRIORITY
Evaluate ONLY:
UVA depth and coverage quality
Photostability quality/mechanism
Film uniformity and wear stability
Reapplication realism
Repeated-use tolerance
Irritation/barrier stress
Eye-area compatibility
Filter generation and safety profile
Long-term chronic exposure tolerance
Ignore:
SPF number alone
PA++++ alone
Dermatologist-tested claims
Influencer popularity
“Clean”, “reef-safe”, “mineral/natural” marketing
Luxury texture claims
Decorative antioxidants
Fancy filter reputation without structural proof
Unverifiable protection quality MUST suppress rating.

GLOBAL ENFORCEMENT RULES
Apply across ALL layers:
UVA depth + photostability dominate scoring
Repeated-use tolerance dominates cosmetic elegance
Chronic irritation accumulation outweighs first-use feel
Film instability suppresses protection quality
Heavy alcohol, fragrance, and menthol suppress long-term usability
Eye discomfort suppresses repeated-use scoring
Sensory-first engineering MUST reduce score
Old-generation filters with known safety concerns reduce credibility
Decorative antioxidants/botanicals NEVER compensate for:
weak UVA coverage
photostability failure
unstable UV systems
irritation burden
poor film formation
Minor additives CANNOT override core UV architecture weaknesses.

STRUCTURE DOMINANCE RULE
Core UV architecture determines:
UVA depth
Photostability durability
Wear stability
Irritation burden
Barrier stress
Eye sting risk
Reapplication comfort
Long-term usability
Ingredient value depends on:
UV contribution
stability support
repeated-use realism
irritation burden
NOT ingredient-list aesthetics.

PROTECTION LIMIT RULES
The following MUST trigger structural ceilings/moderation:
SPF-focused systems without meaningful UVA architecture
UVB-dominant protection lacking UVA depth
Old-generation filter systems lacking photostability support
Basic UVB protection alone

LATE-INGREDIENT LIMIT RULE
Late-position ingredients may provide:
temporary soothing
hydration
cosmetic smoothing
minor comfort support
They CANNOT repair:
weak UVA coverage
unstable filter systems
heavy alcohol stress
fragrance/menthol burden
eye sting behavior
poor wear film
structural photostability failure
Examples:
Tocopherol/Vitamin E
Aloe vera
Panthenol
Centella asiatica
Green tea/EGCG
Hyaluronic acid
Decorative antioxidants
Low-level ceramides
Non-functional niacinamide dosing

MARKETING ILLUSION PENALTY
Penalty REQUIRED when formulation structure is driven mainly by:
SPF inflation
PA++++ inflation without UVA depth
Fragrance elegance
Alcohol-heavy thinning
Menthol/cooling sensation
Decorative antioxidant inflation
Botanical distraction loading
Luxury texture engineering
Silicone-heavy matte engineering without strong UV structure
“Clean/reef-safe/mineral” marketing without protection proof
Influencer-oriented formulation design
“Skincare sunscreen” hybrid inflation
Sensory-first engineering
Marketing-dominant structure MUST visibly reduce score.

TRANSPARENCY BONUS RULE
Apply ONLY a SMALL bonus for:
Rational UVA/UVB architecture
Strong filter synergy/pairing
Real photostabilization mechanisms
Repeated-use realism
Low irritation burden
Stable/coherent film-forming systems
Modern Gen 3/4 filters
Water-resistance certification
This bonus CANNOT override:
safety penalties
chronic irritation
filter instability
weak UVA architecture
structural photoprotection failure
LAYER 1 — UV FILTER GENERATION CLASSIFICATION RULE
(Based on FDA GRASE 2019–2021; Matta et al. JAMA Derm 2023; González & Fernández-Lorente Photochem Photobiol 2024; Wang et al. JAAD 2025)
All UV filters MUST be classified by generation before scoring. Generation directly affects Safety, Ingredient Quality, Effectiveness, photostability credibility, and long-term usability.

GENERATION 1 — OUTDATED / HIGH-CONCERN FILTERS
Definition: First-generation filters with major safety, photostability, allergy, or eco-toxicity concerns.
Examples:
PABA — discontinued; strong photoallergy
Padimate-O — photoallergy concern; declining use
Oxybenzone (BP-3) — FDA Not GRASE; systemic absorption concern; endocrine disruption concern; reef toxicity concern; strong photoallergy potential
Sulisobenzone (BP-4) — photoallergy concern
Scoring impact:
Meaningful Safety + Allergy Risk penalty
Eco penalty for reef toxicity concern
Gen 1 dominant systems → significant structural ceiling
PABA presence → automatic major penalty regardless of formulation quality

GENERATION 2 — LEGACY / PARTIAL-CONCERN FILTERS
Definition: Widely used but associated with instability, endocrine, allergen, or environmental concerns.
Examples:
Octinoxate — rapid photodegradation; photoallergy; reef concern
Octocrylene — photoallergy risk; degrades into benzophenone during storage
Homosalate — potential endocrine concern at high concentrations
Octisalate — relatively safe UVB booster; weak UVA depth
Scoring impact:
Octocrylene → moderate repeated-use Safety concern; benzophenone concern noted in output
Octinoxate as primary UVA support → Effectiveness penalty
High homosalate → minor Safety penalty
Gen 2 dominant systems → moderate structural credibility limitation

GENERATION 3 — MODERN STANDARD FILTERS
Definition: Improved safety and/or stabilized modern systems.
Examples:
Avobenzone — strong UVA-I but unstable alone
Mexoryl XL — broad UVA; photostable
DHHB/Uvinul A Plus — strong UVA-I specialist; stabilizes avobenzone
Benzophenone-4 at low UVB-boosting levels
Scoring impact:
Avobenzone alone → moderate photostability penalty
Avobenzone + proper stabilizer → strong UVA credit
Mexoryl XL / DHHB → strong UVA credit
Gen 3 systems → good structural credibility

GENERATION 4 — ELITE / MODERN PHOTOSTABLE FILTERS
Definition: Intrinsically or structurally photostable filters with superior UVA depth and safety profiles.
Examples:
Tinosorb S (BEMT)
Tinosorb M (MBBT)
Mexoryl SX
Mexoryl SX + XL combination
Uvinul T150
Bemotrizinol / Tinosorb A2B
Iscotrizinol / Uvasorb HEB
Scoring impact:
Strong UVA + photostability credit
Tinosorb S/M or Mexoryl SX+XL pairings → maximum photostability credit
Gen 4 systems justify high Effectiveness + Ingredient Quality scores
Gen 4 filters STILL CANNOT override severe alcohol, fragrance, menthol, or irritation burdens

FILTER GENERATION SCORING TIERS
System
UV Credit
Photostability
Safety Standing
Gen 1 dominant
Low
Poor
High concern
Gen 2 dominant
Moderate
Moderate-risk
Moderate concern
Gen 3 avobenzone alone
Good UVA
Poor
Acceptable
Gen 3 stabilized
Good UVA
Moderate-good
Acceptable
Gen 4 dominant
Strong UVA+UVB
Strong
Favorable
Gen 3+4 mix
Strong
Strong
Favorable
ZnO dominant
Strong UVA+UVB
Excellent
Strong
TiO2 only
Moderate UVA
Excellent
Strong
ZnO + TiO2
Strong
Excellent
Strong


LAYER 2 — UVA DEPTH TIERING RULE
(Based on ISO 24443 UVAPF method; Diffey 2023; Moyal 2024; EU 2006/647/EC)
UVA depth MUST be evaluated before scoring. Broad-spectrum claims alone are insufficient; wavelength depth determines real-world anti-aging and melanoma protection quality.

UVA DEPTH TIERS
Tier 1 — UVA-II Only (320–340nm)
Examples:
Octisalate
Low-dose octinoxate
Some benzophenone systems
Characteristics:
Weak/no deep UVA-I coverage
Inadequate for meaningful photoaging prevention
Scoring:
UV Protection Reliability max 2.5
High-score eligibility prohibited

Tier 2 — Partial UVA-I + UVA-II (320–380nm)
Examples:
Avobenzone alone
Older moderate-UVA systems
Characteristics:
Partial UVA-I depth
Incomplete deep-UVA protection
Scoring:
UV Protection Reliability max 3.5

Tier 3 — Full Broad-Spectrum UVA (320–400nm)
Examples:
Tinosorb S/M
Mexoryl SX+XL
ZnO
DHHB/Uvinul A Plus
Stabilized avobenzone systems
Characteristics:
Full UVA-I + UVA-II protection
Meets EU UVAPF ≥ SPF/3 standard
Scoring:
Eligible up to 5.0

UVA:UVB RATIO RULE
UVAPF ≥ SPF/3 → no penalty
Ratio <1:3 → mild Effectiveness penalty
Ratio <1:5 → strong Effectiveness penalty
Mixed systems:
Score reflects dominant tier
Bonus allowed for broader wavelength depth

LAYER 3 — PHOTOSTABILITY MECHANISM RULE
(Based on Diffey 2023; Chatelain & Gabard 2001; Schwack & Schulle 2024; COLIPA photostability testing)
Photostability is mandatory. Filters losing UV efficacy under exposure MUST receive structural penalties.

PHOTOSTABILITY CLASSES
Class 1 — Inherently Unstable
Examples:
Avobenzone alone
Octinoxate alone
Padimate-O
Characteristics:
Rapid UV degradation
ROS/photoproduct generation risk
Scoring:
Photostability max 2.0
Strong Effectiveness suppression

Class 2 — Partially Stabilized
Examples:
Avobenzone + octocrylene
Avobenzone + octisalate
Avobenzone + homosalate
Characteristics:
Partial stabilization only
Octocrylene benefit offset by benzophenone concern
Scoring:
Max 3.0

Class 3 — Well Stabilized
Examples:
Avobenzone + DHHB
Avobenzone + Tinosorb M
Mexoryl SX + XL systems
Stabilized multi-filter systems
Scoring:
Good photostability credit
Max 4.0

Class 4 — Inherently Photostable
Examples:
Tinosorb S
Tinosorb M
ZnO
TiO2
Uvinul T150
Bemotrizinol
Iscotrizinol
Characteristics:
Intrinsic or engineered stability
No meaningful photodegradation
Scoring:
Eligible up to 5.0
No stability penalty

pH STABILITY NOTE
Aqueous systems should generally maintain pH 5.5–7.0 for optimal chemical filter stability. Extreme pH may accelerate hydrolysis (notably Mexoryl SX below pH 4).

LAYER 4 — MINERAL FILTER SCIENCE RULE
(Based on Pinnell 2000; Wang SQ 2011; Serpone 2021; Burnett & Wang 2011; Smijs & Pavel 2011)
ZnO and TiO2 MUST be evaluated separately.

ZINC OXIDE (ZnO)
Characteristics:
Broad UVA-I + UVA-II + UVB coverage
Excellent deep UVA-I protection
Inherently photostable
Strong safety profile
Nano ZnO:
Improved cosmetic elegance
Minimal penetration concern
Potential ROS concern largely reduced by coatings
Scoring:
Strong UVA + photostability credit
White cast may reduce Reapplication Practicality

TITANIUM DIOXIDE (TiO2)
Characteristics:
Strong UVB + UVA-II
Weak UVA-I depth
Not sufficient alone for elite UVA protection
Inherently photostable
Nano TiO2:
Better aesthetics
Uncoated forms may generate ROS
Coatings substantially reduce risk
Scoring:
Moderate UVA credit only
TiO2-alone systems retain UVA-I weakness

MINERAL COMBINATION RULE
ZnO + TiO2 → strongest mineral broad-spectrum architecture
ZnO ≥15% → Tier 3 UVA eligible
TiO2 alone → Tier 2 only
Mineral + deep UVA chemical filter → excellent hybrid architecture

NANOPARTICLE SCORING RULE
Non-nano minerals → no major safety concern; white cast practicality issue
Coated nano ZnO/TiO2 → acceptable; minor safety concern flag
Uncoated nano TiO2 → minor-moderate Safety penalty

“MINERAL/NATURAL HYPE” RULE
Mineral filters are NOT automatically superior.
TiO2-only mineral systems → UVA-I weakness; not elite eligible
Adequate ZnO systems → genuine broad-spectrum superiority
Mineral marketing without meaningful ZnO support → marketing illusion penalty
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no UV protection, barrier support, or long-term skin benefit and may increase unnecessary irritation burden.

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
• Residual Irritation Risk penalty

Multiple synthetic dyes increase penalties further.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”


LAYER 5 — FILM FORMATION & SPF REALISM RULE
(Based on Stokes & Diffey 1997; Osterwalder & Herzog 2010; Schalka & Reis 2011)
Film quality directly determines real-world protection reliability.

SPF REALISM RULE
SPF testing uses 2mg/cm². Real-world application is typically 0.5–1mg/cm², drastically lowering actual protection.
SPF realism worsens with:
Alcohol-heavy thinning
Extremely watery consistency without film former
Silicone-heavy systems lacking durable binders
SPF realism improves with:
Film-forming polymers
Water-resistance agents
Adequate spreading viscosity
Even-application formats (sprays/sticks)

WATER-RESISTANCE CERTIFICATION RULE
FDA/ISO 40 min → moderate durability credit
FDA/ISO 80 min → strong durability credit
No claim → neutral
Unverified “water resistant” claims → no credit
Water resistance affects sweat/water durability ONLY, not photostability.

FILM-FORMER RECOGNITION
Positive film-formers include:
Acrylates crosspolymers
Polyester-8
Dimethicone crosspolymer
Polyurethane-33
Acrylates copolymer
Film-formers improve Wear Stability + SPF realism scoring.

LAYER 6 — IRRITATION & BARRIER BURDEN RULE
(Based on Heurung 2014; Andersen 2023; Dittmar 2019; Gonçalo 2022)

ALCOHOL BURDEN RULE
Alcohol rapidly evaporates, increasing TEWL, barrier stress, eye migration risk, and repeated-use irritation.
Scoring:
Top 3 ingredients → strong Safety + Barrier penalty
Top 5 → moderate penalty
Positions 6–10 → minor penalty
Trace/late solvent use → negligible concern

FRAGRANCE BURDEN RULE
UV exposure amplifies fragrance photoallergy and phototoxicity risk.
Scoring:
Any fragrance/parfum in leave-on sunscreen → minimum moderate Safety + Allergy penalty
Named allergens → additional penalty
Photosensitizing oils (bergamot, citrus, St. John’s Wort) → strong penalty
Fragrance penalties in sunscreen are MORE severe than moisturizers due to UV interaction.

MENTHOL RULE
Menthol activates TRPM8 and may increase repeated-use irritation/barrier stress.
Scoring:
≥0.5% → strong penalty
0.1–0.5% → mild penalty
<0.1% → negligible concern
Cooling-sensation-driven sunscreens → repeated-use penalty.

OCTOCRYLENE SPECIAL CONCERN RULE
Octocrylene degrades into benzophenone during storage.
Scoring:
<5% stabilizer role → minor Safety flag; note in output
5% or dominant use → meaningful Safety penalty
Octocrylene-free systems → minor Safety bonus

UV FILTER IRRITATION STACKING RULE
Sensitizing filters:
Oxybenzone
Octinoxate
Benzophenone-4
PABA
Padimate-O
Low-sensitization filters:
Tinosorb S/M
Mexoryl SX
ZnO
TiO2
Multiple sensitizing filters → cumulative Allergy Risk penalty.

LAYER 7 — ECO-TOXICOLOGY RULE
(Based on Downs 2016; Fel 2022; Tsui 2017; Raffa 2019; EU 2023 review)

ECO IMPACT FILTER SCORING
High Concern
Oxybenzone
Octinoxate
Impact:
Coral toxicity
Aquatic endocrine disruption
Reef-area bans
Scoring:
Strong Eco penalty

Moderate Concern
Octocrylene
Homosalate
Scoring:
Moderate or minor-moderate Eco penalty

Lower Concern
Non-nano ZnO
Tinosorb S/M
Mexoryl SX/XL
Non-nano TiO2
Uvinul T150
DHHB
Scoring:
Minimal/no significant Eco penalty

ECO SCORING RULE
Oxybenzone/octinoxate dominant systems → up to -1.5 Eco penalty
Multiple high-concern filters → stacking Eco penalty
Explicit avoidance of high-concern filters → minor Eco bonus
LAYER 8 — CORE SCORING SYSTEM (EXTREME STRICT)
(EVALUATED FROM 1.0 TO 5.0 STARS)

SAFETY [DOMINANT]
Evaluates:
Chronic irritation/barrier stress
Alcohol burden
Fragrance photoallergy amplification
UV filter safety classification
Octocrylene benzophenone concern
Systemic absorption concerns
Eye sting/migration risk
Menthol burden
Long-wear occlusive stress
Reapplication cumulative burden
Repeated irritation, eye sting, photosensitization, unstable filter chemistry, or barrier stress MUST suppress score.
Safety overrides:
cosmetic elegance
luxury texture
SPF marketing
antioxidant loading
short-term comfort
PHOTOSENSITIZATION RULE
UV exposure amplifies fragrance/filter sensitization risk.
Any fragrance, citrus essential oil, or sensitizing botanical in a leave-on UV product receives ~2× stricter Safety + Allergy penalties versus equivalent non-UV skincare.

EFFECTIVENESS
Core question:
Can the sunscreen reliably maintain UVA/UVB protection under realistic sweat, outdoor, and repeated-use conditions?
Evaluates:
UVA depth tier
UVB reliability
Photostability class
Mineral filter UVA quality
Filter generation
Film stability/SPF realism
Water resistance
Long-wear consistency
Filter synergy/concentration adequacy
High Effectiveness REQUIRES:
Tier 3 UVA minimum
Photostability Class 3–4 minimum
Adequate filter concentration
Stable film under sweat/sebum
Weak UVA or instability MUST heavily suppress score regardless of SPF value.
SPF alone NEVER determines effectiveness.

ALLERGY RISK
Evaluates:
Fragrance/allergens
Photosensitizing oils
UV filter sensitization potential
Alcohol sensitization burden
Menthol irritation stacking
Preservative sensitivity
Multiple trigger stacking
Photocontact allergen filters
Multiple triggers MUST aggressively suppress score.
UV-context leave-on products receive stricter sensitization penalties than non-UV cosmetics.

ECO IMPACT
Evaluates:
Reef/aquatic toxicity
Biodegradability
Persistence/bioaccumulation
Aquatic wash-off burden
Regulatory compliance
Eco penalties MUST remain evidence-based.
“Reef-safe” marketing alone NEVER increases score.

INGREDIENT QUALITY
Evaluates:
Filter generation quality
UVA architecture quality
Photostabilization logic
Mineral filter appropriateness
Film-former quality
Structural UV-system balance
Functional filter synergy
SPF concentration adequacy
Absence of decorative overload
Decorative-heavy systems MUST lose credibility.
Antioxidant-heavy “skincare sunscreen” marketing MUST NOT heavily inflate score.
UV architecture quality — NOT ingredient count — determines this category.

SKIN COMPATIBILITY
Evaluates:
Repeated-use tolerance
Barrier compatibility
Eye-area compatibility
Reapplication comfort/buildup
Long-wear irritation accumulation
Acne/rosacea/sensitive-skin concerns
White cast compliance
Heat/sweat tolerance
WHITE CAST COMPLIANCE RULE
White cast is a real-world compliance barrier.
For medium/deep skin tones:
Severe white cast → reduced reapplication compliance → lower Skin Compatibility + Reapplication Practicality
Nano/tinted/no-cast systems → no penalty
Tinted mineral systems → partial penalty reduction
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)

LAYER 9 — SPECIALIZED SUNSCREEN PERFORMANCE (EXTREME STRICT)
Score Range: 1.0–5.0


UV PROTECTION RELIABILITY [DOMINANT]
Evaluates:
UVA depth tier
UVB reliability
Long-wear consistency
Filter synergy/completeness
Sweat/oil degradation resistance
Repeated-use stability
Environmental durability
Weak UVA or poor UVA:UVB ratio MUST aggressively suppress score.
Insufficient filter concentration relative to SPF claim → Effectiveness penalty.
Scoring ceilings:
Tier 1 UVA only → max 2.5
Tier 3 full UVA → eligible for maximum score

PHOTOSTABILITY PERFORMANCE [DOMINANT]
Evaluates:
Photostability class
UV degradation resistance
Stabilization mechanisms
Long-wear sunlight durability
Protection persistence
Scoring:
Class 1 instability → max 2.0
Class 4 stability → maximum credit
Antioxidants, soothing agents, or elegant texture CANNOT compensate for instability.

BARRIER COMPATIBILITY [DOMINANT]
Evaluates:
Repeated-use UV-context tolerance
Chronic irritation accumulation
Alcohol burden
Fragrance photoallergy risk
Menthol irritation
Eye migration/sting
Long-wear comfort
Dryness/barrier stress
Heat/sweat tolerance
Reapplication stress
Repeated irritation, eye sting, alcohol dryness, or fragrance-driven photoallergy MUST aggressively suppress score.
Heavy alcohol/fragrance/menthol systems MUST receive strong penalties.
First-use elegance ≠ long-term barrier compatibility.

FILM FORMATION & WEAR STABILITY
Evaluates:
Film uniformity
Sweat/sebum migration resistance
Patchiness risk
Water resistance
Film-former support
Reapplication layering stability
Heat/humidity durability
Weak/uneven films MUST reduce protection reliability.
Elegant finish NEVER guarantees stable protection.
Alcohol-thinned systems → proportional film-uniformity penalty.

REAPPLICATION PRACTICALITY
Evaluates:
Multi-layering behavior
Buildup risk
Greasiness accumulation
Pilling over skincare/makeup
Eye migration
Cosmetic fatigue
White cast under reapplication
Greasy, pilling, migrating, or exhausting reapplication behavior MUST lose score.
Poor reapplication strongly suppresses long-term usability.

RESIDUAL IRRITATION RISK
Evaluates:
Chronic dryness
Persistent eye/facial discomfort
Alcohol evaporation stress
Octocrylene benzophenone concern
Systemic absorption concerns
Occlusive heat discomfort
Long-term irritation accumulation
Cumulative irritation MUST suppress score even when immediate feel appears elegant.
Short-term comfort NEVER overrides chronic irritation burden.
SPECIALIZED SCORE = AVERAGE OF ALL SPECIALIZED SCORES 
LAYER 10 — REAL-WORLD USAGE SIMULATION
Simulate:
Daily UV wear cycles
Outdoor exposure
Sweat/heat conditions
Reapplication cycles
Weekly cumulative irritant exposure
Eye migration during perspiration
Barrier recovery behavior
8–12 hour wear stress
Core question:
Can the sunscreen remain BOTH reliably protective AND tolerable during realistic long-term use?
One-time elegance NEVER guarantees long-term usability.

ANTI-MARKETING FILTER
Penalty REQUIRED for:
SPF inflation vs realistic application thickness
PA++++ inflation without deep UVA structure
Fragrance-heavy “lifestyle sunscreen” engineering
Alcohol-heavy elegance thinning
Decorative antioxidant/botanical stacking
Luxury texture engineering without UV improvement
Silicone-heavy matte systems without film stability
“Clean sunscreen” marketing without structural superiority
“Reef-safe” marketing without verified eco profile
“Mineral” marketing using TiO2-only UVA-weak systems
Influencer-oriented formulation design
“Skincare sunscreen” hybrid inflation

WEAKNESS AUDIT
Neutralize:
SPF inflation bias
PA++++ inflation bias
Mineral hype bias
Antioxidant inflation bias
Luxury texture inflation
Fancy-filter reputation bias
Late-ingredient rescue illusion
Decorative botanical bias
Influencer perception bias
“Dermatologist-tested” inflation
“Skincare sunscreen” hybrid inflation
Late soothing ingredients NEVER repair weak UV structure.

FINAL SCORE RULE
Final Score =
Average(Core Score, Specialized Score)

HIGH SCORE ELIGIBILITY RULE
Scores >4.0 REQUIRE:
Tier 3 full-spectrum UVA
Photostability Class 3–4 minimum
Low chronic irritation burden
Practical reapplication behavior
Strong barrier compatibility
Low fragrance/alcohol burden
Minimum Gen 3+ architecture (Gen 4 preferred)
No Gen 1 dominant UV system
Stable realistic film formation
The following MUST disqualify elite scoring:
Meaningful fragrance loading
Heavy alcohol burden
Severe white cast in realistic reapplication context
Weak UVA coverage
Unstable filters
Gen 1 dominant systems
OUTPUT FORMAT
⭐ FINAL RATING X.X / 5 — Rating Level
⚖ STRUCTURAL QUALITY
Short evidence-based classification of the sunscreen's overall structural quality, UV architecture tier, filter generation, photostability class, UVA depth, and expected long-term use outcome.
🧴 SUNSCREEN PROFILE
Short functional description. Examples:
Photostable modern broad-spectrum UV system
Alcohol-heavy chemical sunscreen with moderate UVA
Elite mineral-chemical hybrid sunscreen
Fragrance-heavy daily sunscreen with weak UVA
Outdated unstable filter system
Lightweight photostable daily UV fluid
Gen 4 filter system with strong reapplication tolerance
📊 CORE SCORES( GIVE SHORT STRUCTURAL REASON FOR EVRY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED )
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
🧪 SPECIALIZED SUNSCREEN PERFORMANCE( GIVE SHORT STRUCTURAL REASON FOR EVRY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED )
UV Protection Reliability — ⭐X.X (UVA tier: 1 / 2 / 3)
Photostability Performance — ⭐X.X (Class: 1 / 2 / 3 / 4)
Barrier Compatibility — ⭐X.X
Film Formation & Wear Stability — ⭐X.X
Reapplication Practicality — ⭐X.X
Residual Irritation Risk — ⭐X.X
👍 STRUCTURAL ADVANTAGES
(Major evidence-based structural advantages only)
⚠ STRUCTURAL CONCERNS
(Major evidence-based structural concerns only)
🚨 CRITICAL ALERTS
(Display ONLY when structurally triggered)
Examples:
Oxybenzone or octinoxate as dominant filter — Gen 1 safety concern
Octocrylene at high concentration — benzophenone degradation concern
Class 1 photostability — significant protection degradation under UV
Tier 1 UVA only — inadequate long-wavelength UVA protection
Heavy alcohol + fragrance in UV-exposure context — high photoallergy risk
Uncoated nano TiO2 — photocatalytic ROS concern
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X
Oily / Acne-Prone Skin → ⭐X.X
Sensitive / Rosacea-Prone Skin → ⭐X.X
Barrier-Damaged Skin → ⭐X.X
Deep / Medium Skin Tones (white cast realism) → ⭐X.X
Post-Procedure / Reactive Skin → ⭐X.X
Eye-Sensitive Users → ⭐X.X
High Outdoor Exposure Users → ⭐X.X
📅 LONG-TERM USABILITY
Daily Urban Use → ⭐X.X
Repeated Outdoor Reapplication → ⭐X.X
High Sweat / Sport Use → ⭐X.X
Humid / Hot Climate Use → ⭐X.X
Sensitive Skin Long-Term Use → ⭐X.X
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 days)
UV protection experience
Texture and wear feel
Eye comfort or irritation
Skin compatibility first impression
Medium-Term (2–8 weeks)
Photostability and protection consistency over daily use
Cumulative irritation or tolerance development
Barrier response and dryness/oiliness behavior
Reapplication comfort and cosmetic fatigue
Long-Term (2–12 months)
Chronic barrier stress and sensitivity progression
Photoallergy or fragrance sensitization risk
Cumulative UV-filter skin exposure outcome
Real-world protection compliance (reapplication frequency, amount applied)
Skin health trajectory under repeated UV-context exposure
Realistic Dermatological Outcome
One concise conclusion covering: UV protection reliability, photostability durability, barrier stress trajectory, and long-term compliance realism.
🔬 KEY STRUCTURAL INGREDIENTS
List only structurally dominant ingredients affecting:
UV filter architecture (generation and tier noted)
Photostabilization system
Film formation and wear
Major irritation triggers
Eco concern filters
Barrier-supportive or barrier-disrupting systems
🧠 WHY THIS RATING
3–5 concise evidence-based sentences focusing on:
UV architecture quality (filter generation and UVA depth tier)
Photostability class and mechanism
Irritation and sensitization burden (alcohol, fragrance, octocrylene concern)
Film stability and reapplication realism
Eco-toxicology standing
Repeated-use compatibility
Filter safety profile (GRASE status, known concerns)
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
DONT DO MEDICAL CLAIMS
include harsh fragrances,preservatives and colorants in output
No marketing influence on tone or scoring
No SPF-number inflation — SPF alone does not determine quality
No mineral hype — TiO2-only products will not receive elite UVA credit
No luxury/texture bias
No antioxidant or botanical inflation
UV architecture, photostability, and barrier compatibility dominate scoring
Structural negatives override cosmetic elegance — always
Photostability weakness MUST visibly affect tone and scoring
Barrier instability MUST visibly affect tone and scoring
Weak UVA architecture MUST visibly affect tone and scoring
Octocrylene benzophenone concern MUST be flagged when structurally relevant
Gen 1 filter dominance MUST be flagged and penalized
Output tone: analytical, formulation-aware, clinically realistic, structurally intelligent, anti-marketing, repeated-use focused, photoprotection-depth-aware



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
              "You are a strict clinical sunscreen structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "CLINICAL SUNSCREEN TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();