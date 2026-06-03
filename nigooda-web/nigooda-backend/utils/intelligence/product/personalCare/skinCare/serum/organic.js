const openai =
require("../../../../../../ai/openaiClient");

class OrganicEngine {

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
          "ORGANIC_HERBAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "ORGANIC SERUM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
HERBAL / ORGANIC SERUM EVALUATION ALGORITHM — VERSION 1.0 (OPTIMIZED)
Evidence-Based Dermatological Scoring Engine — Herbal & Organic Serum Edition

CRITICAL OPENING STATEMENT — THE SERUM NATURAL HALO PROBLEM
This is the dominant interpretive rule of the herbal serum algorithm.
Serums fundamentally alter herbal risk-benefit behavior because they:
Remain on skin for prolonged periods
Use higher active concentrations
Are frequently applied to compromised skin
Are layered under occlusion, increasing penetration
This creates BOTH enhanced efficacy potential and amplified sensitization risk.

SERUM ADVANTAGE FOR HERBAL ACTIVES
Sustained contact time allows some herbal actives to become meaningfully functional in serum format even when weak in rinse-off products.
Examples:
Aloe vera
Centella asiatica
Bakuchiol
Naturally derived niacinamide systems
These may receive substantially higher efficacy credit than in cleansers due to prolonged exposure and improved delivery opportunity.

SERUM RISK AMPLIFICATION FOR HERBAL SENSITIZERS
Leave-on exposure dramatically increases sensitization risk.
Essential oils, phototoxic botanicals, and concentrated plant extracts become substantially higher-risk in serum format because exposure duration increases from seconds to many hours.
Risk escalation is cumulative and non-linear.

GLOBAL NATURAL CLAIM ENFORCEMENT
“Natural,” “organic,” “herbal,” “Ayurvedic,” “plant-based,” and “botanical” are marketing labels, NOT evidence categories.
The algorithm neither rewards nor penalizes botanical origin itself.
Evaluation is based ONLY on:
Evidence quality
Delivery science
Stability
Formulation structure
Safety profile
Long-term compatibility
Rules:
Natural ≠ safe
Natural ≠ effective
“Chemical-free” is scientifically meaningless
Traditional use ≠ clinical evidence
Absence of negative evidence ≠ proof of efficacy
Many synthetic actives possess stronger evidence than botanical alternatives
Serum markets are heavily saturated with evidence-free botanical hero claims
The user deserves evidence-grounded evaluation, not marketing mythology.

LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Provide evidence-grounded evaluation separating:
genuinely functional botanical formulations
FROM
decorative herbal inflation and natural-marketing systems
Dermatological and pharmaceutical evidence standards override traditional or marketing positioning.

TRANSPARENCY PRIORITY RULE
When evidence is weak or absent, the output MUST explicitly state this.
Traditional use history is hypothesis-generating, not proof of clinical efficacy.

GLOBAL ENFORCEMENT RULE
Scores MUST reflect:
Evidence quality
Delivery architecture
Stability
Safety
Clinical realism
NOT:
Organic labels
Ayurvedic positioning
Herbal branding
“Natural” marketing

LEAVE-ON CONTEXT RULE [CRITICAL]
This rule differentiates the serum algorithm from cleanser evaluation.
In serum format:
Actives receive prolonged delivery exposure
Penetration enhancers accumulate effects
Sensitizers accumulate repeated dermal exposure
Unstable actives degrade both in bottle and on skin
Occlusion amplifies both benefit and irritation risk
Therefore EVERY ingredient must be treated as a potential:
Active
Penetration enhancer
Sensitizer
Stability variable
NOT merely as an inert excipient.

ACTIVE POSITION RULE
INCI position still matters but is moderated relative to cleansers.
Positions 1–10:
functional concentration likely
Positions 11–15:
partial concentration likely; assess against clinical thresholds
Positions 16+:
likely sub-functional unless concentration disclosed
Important nuance:
Certain low-dose actives
(retinol, niacinamide, bakuchiol)
may still remain functional at lower concentrations and require ingredient-specific assessment.

HERBAL INFLATION RULE
8+ botanicals without meaningful evidence →
decorative botanical inflation penalty.
This includes trace exotic herb loading used mainly to create perceived complexity or luxury.

NATURAL HALO EFFECT PENALTY
Mandatory penalty when value relies primarily on:
“Natural” or “organic” positioning without evidence
“Chemical-free” claims
“100% botanical active” framing with weak evidence
Ancient/Ayurvedic heritage claims lacking controlled leave-on serum evidence
Plant origin presented as proof of safety or efficacy
Undefined “toxin-free” claims
Traditional use MAY generate hypotheses but does NOT constitute clinical validation.

NATURAL DOES NOT MEAN SAFE — SERUM AMPLIFICATION RULE
This rule is MORE critical in leave-on serums than cleansers.
High-risk scenarios:
Essential oils in leave-on systems
Phototoxic botanicals in daytime serums
High-concentration sensitizing plant extracts
Water-based “preservative-free” serums
Multiple penetration enhancers increasing unpredictable absorption
These receive elevated risk weighting due to sustained exposure conditions.

LAYER 1 — BASE VEHICLE & SOLVENT ARCHITECTURE
Serum evaluation begins with delivery vehicle architecture.

TIER 1 — ADVANCED DELIVERY VEHICLES
(Bonus modifier)
Liposomal encapsulation
Nanocapsule/nanoparticle systems
Microemulsions
Cyclodextrin complexation
Benefits:
Stability enhancement
Improved penetration
Enhanced active preservation/delivery
Nanoparticle systems additionally require safety assessment.

TIER 2 — STANDARD HIGH-PERFORMANCE VEHICLES
(Neutral-positive modifier)
Hyaluronic acid matrices
Water + glycerin humectant systems
Polymeric gel systems
Silicone-continuous serums
Functional for stable active delivery with generally acceptable compatibility.

TIER 3 — FUNCTIONAL PLANT-BASED VEHICLES
(Neutral modifier)
Aloe vera bases
Fermented plant-water systems
Rose/floral hydrosols
Plant-oil serum bases
Notes:
May provide mild humectant, anti-inflammatory, emollient, or postbiotic support
DO NOT inherently outperform Tier 2 delivery systems
Botanical origin alone does NOT confer superior penetration

TIER 4 — PROBLEMATIC VEHICLES
(Penalty modifier)
High essential-oil vehicle systems
Undiluted essential-oil “face serums”
Ethanol-dominant (>20%) leave-on systems
High-pH herbal decoction bases
Risks:
Barrier disruption
Sensitization
Microbiome disruption
Unpredictable penetration amplification
pH incompatibility

HERBAL VEHICLE ENFORCEMENT NOTE
Claims such as:
“Rose water delivers actives better”
lack clinical evidence.
Delivery superiority comes from engineered encapsulation and formulation architecture — NOT botanical branding.

LAYER 2 — pH ARCHITECTURE FOR SERUMS
pH is MORE critical in serums than cleansers because:
Exposure duration is prolonged
Acid activity is pH-dependent
Repeated mismatch causes cumulative barrier stress
Active functionality may collapse entirely outside proper pH ranges

pH SCORING TIERS
pH 3.0–3.5
Optimal for:
AHA serums
LAA vitamin C
Proteolytic enzymes
High irritation risk.
Rules:
Bonus for appropriate acid-active systems
Penalty for non-acid serums at this pH

pH 3.5–4.5
Excellent for:
AHAs
Vitamin C
BHA systems
Botanical acid systems
Bonus modifier.

pH 4.5–5.5
Optimal general serum range.
Excellent compatibility for:
Niacinamide
Bakuchiol
Peptides
Hyaluronic acid
Most botanical systems
Full bonus modifier.

pH 5.5–6.5
Generally functional.
Mild AHA efficacy reduction
Peptides and botanicals remain functional
Neutral modifier.

pH 6.5–7.0
Acceptable for barrier/hydrating serums.
Rules:
Significant acid-active efficacy reduction
Minor penalty for acid-focused serums

pH 7.0–8.0
Problematic for leave-on systems.
Minimal acid-active usefulness
Potential acid mantle disruption
Moderate penalty.

pH >8.0
Physiologically incompatible for leave-on use.
Significant penalty regardless of:
Traditional use
Ayurvedic heritage
Botanical origin

HERBAL pH ADDITIONS
Apple cider vinegar systems:
typically pH 3.0–4.0; acid-equivalent activity with irritation risk
Fermented rice water:
commonly pH 4.5–5.5; generally excellent compatibility
Ayurvedic decoctions:
must be evaluated by actual pH, not tradition
Amla-derived vitamin C:
follows identical LAA pH requirements; natural origin does NOT bypass stability or pH rules
LAYER 3 — ACTIVE DELIVERY EFFICIENCY
(Specialized Score 1)
ACTIVE DELIVERY FRAMEWORK
Evaluates whether claimed actives can:
Reach target skin compartments
Remain stable during storage/use
Exist at biologically meaningful concentration
Survive skin contact long enough to function
Three sub-components:
Delivery Architecture
Concentration Adequacy
Stability-Adjusted Bioavailability

DELIVERY ARCHITECTURE SUB-SCORE
A — ENHANCED DELIVERY
(Full credit)
Liposomal encapsulation
Encapsulated retinol/bakuchiol
Cyclodextrin-complexed actives
Penetration enhancers appropriately paired with lipophilic actives
Multi-MW hyaluronic acid systems
Microemulsions for poorly soluble actives
(curcumin, resveratrol)
Award full delivery credit when enhancement architecture is documented and mechanistically appropriate.

B — STANDARD DELIVERY
(Partial credit)
Appropriate but non-advanced solubilization systems:
Niacinamide in aqueous base
HA in water systems
Bakuchiol in oil-rich systems
Botanical extracts matched to compatible vehicle polarity
Functional but without advanced penetration/stability engineering.

C — DELIVERY ARCHITECTURE MISMATCH
(Penalty)
Examples:
Lipophilic actives in purely aqueous systems without solubilizer
Water-soluble actives in anhydrous oils without surfactant bridge
Acid-dependent actives at incompatible pH
Large polymers claimed to “penetrate” without encapsulation
Mismatch between active chemistry and vehicle architecture → delivery penalty.

CONCENTRATION ADEQUACY SUB-SCORE
MINIMUM FUNCTIONAL CONCENTRATION TABLE
Active
Evidence-Supported Functional Range
Niacinamide
2–5%; 5–10% optimal
L-Ascorbic Acid
10–20%; ~5% minimum
Botanical Vitamin C
Requires equivalent ascorbic acid evidence
Bakuchiol
0.5–1%
Retinol
0.025–0.1%
Hyaluronic Acid
0.1–2% depending on MW
Salicylic Acid / Willow Bark
0.5–2%
Tea Tree Oil
2–5%; ~0.5% minimum
Centella
1–3% extract or 0.1–0.3% isolated compounds
Azelaic Acid
5–20%
Zinc salts
1–5%
Panthenol
1–5%
Licorice extract
0.5–2%; glabridin ≥0.05%
Green Tea EGCG
1–5%
Alpha-Arbutin
1–2%
Resveratrol
0.01–1% with encapsulation


CONCENTRATION SCORING RULES
Active at evidence-supported concentration with compatible INCI position → full credit
Likely below threshold → partial credit
Decorative concentration used as hero claim → Category C + penalty
Undisclosed concentration with ambiguous positioning → conservative estimate + transparency flag

STABILITY-ADJUSTED BIOAVAILABILITY
This sub-score directly incorporates Layer 5 stability assessment.
Adequate concentration alone is insufficient.
Unstable actives in unsuitable packaging or vehicles reduce delivery efficiency because degraded actives cannot provide claimed biological effect.

LAYER 4 — BARRIER COMPATIBILITY
(Specialized Score 2)
BARRIER COMPATIBILITY FRAMEWORK
Evaluates whether repeated leave-on use maintains or supports:
Stratum corneum integrity
Acid mantle function
Ceramide-lamellar structure
NMF retention
Long-term barrier resilience

BARRIER-POSITIVE INGREDIENTS
STRONG BARRIER SUPPORT
(Full positive modifier)
Ceramides
Linoleic acid-rich fatty acid systems
Panthenol
Beta-glucan
Niacinamide ≥2%
Allantoin
Functions:
Barrier lipid replenishment
TEWL reduction
Ceramide synthesis support
Anti-inflammatory buffering
Barrier recovery support

MODERATE BARRIER SUPPORT
(Partial modifier)
Centella asiatica
Aloe vera
Squalane
Glycerin
Hyaluronic acid
Calendula
Provide varying levels of:
Humectancy
Mild anti-inflammatory effect
Emollient support
Partial repair assistance

BARRIER-NEUTRAL
(No modifier)
Decorative antioxidant botanicals
Very low-level fragrance/EO below sensitization threshold
Non-penetrating emollients

BARRIER-NEGATIVE FACTORS
MILD PENALTY
High-volatility essential oils
Ethanol >5%
High AHA concentration without repair support
MODERATE PENALTY
Combined physical + chemical exfoliation without repair architecture
Essential-oil dominant systems (>3%)
SIGNIFICANT PENALTY
pH >8 leave-on systems
Multiple penetration enhancers without repair support
Risks include:
TEWL increase
SC lipid disruption
Acid mantle disruption
Sensitizer penetration amplification
Chronic barrier instability

BARRIER-HERBAL ENFORCEMENT RULE
“Soothing botanicals” do NOT neutralize barrier disruption from aggressive oils or sensitizers.
Barrier compatibility is determined by NET formulation effect — not isolated soothing ingredients.

LAYER 5 — ACTIVE STABILITY
(Specialized Score 3)
ACTIVE STABILITY FRAMEWORK
Serum value depends heavily on active stability.
If actives degrade before or during use, the formulation’s primary functional claim collapses regardless of label concentration.

INSTABILITY RISK CLASSIFICATION
VERY HIGH INSTABILITY RISK
(Maximum scrutiny)
L-Ascorbic Acid
Rapid oxidation in aqueous systems
Instability worsens above pH 3.5
Natural sources provide NO stability advantage
Requires:
airtight opaque packaging
low pH
chelating support
preferably anhydrous or derivative systems
Ascorbyl derivatives:
More stable
Lower direct efficacy than LAA
Require conversion
Clear bottles or jars → automatic stability penalty.

Retinol / Retinal
UV and oxidation sensitive
Require opaque airtight packaging
Important:
Bakuchiol is NOT retinol.
It is a retinoid functional equivalent with different stability behavior.

Resveratrol
UV unstable
Oxidizes rapidly
Requires encapsulation for meaningful serum stability
Natural origin provides NO stability advantage.

Curcumin
Photo-unstable
Poor aqueous solubility
Requires encapsulation or oil-delivery support
Aqueous non-encapsulated systems → severe stability + delivery failure risk.

HIGH INSTABILITY RISK
Bakuchiol
More stable than retinol
Genuine serum-format advantage
Still benefits from antioxidant support + opaque packaging
Niacinamide
Relatively stable
Heat conversion to nicotinic acid possible
Potential incompatibility with high-concentration LAA systems
Retinaldehyde
More unstable than retinol
Strong oxidation/photosensitivity concern

MODERATE INSTABILITY RISK
AHAs
Peptides
EGCG
Alpha-arbutin
Require generally competent formulation and packaging.

LOW INSTABILITY RISK
Glycerin
Panthenol
Aloe vera
HA
Stable centella systems
Zinc salts
Sulfur
Licorice extract
Standard packaging generally acceptable.

PACKAGING ASSESSMENT
Packaging Type
Stability Protection
Airless opaque UV-protective
Excellent
Dark airtight glass
Very good
Opaque sealed pump
Good
Clear airtight glass
Moderate
Clear plastic
Poor
Jar/open-top
Very poor


JAR PACKAGING RULE
Any serum using:
Vitamin C
Retinol
Bakuchiol
Resveratrol
Curcumin
as hero actives in jar packaging receives mandatory Active Stability penalty that CANNOT be offset elsewhere.
Repeated air/light exposure destroys meaningful active integrity after opening.
This applies equally to natural and synthetic actives.

LAYER 4.5 — HERBAL EVIDENCE CLASSIFICATION SYSTEM
CENTRAL PURPOSE
Separate:
evidence-based botanical actives
FROM
mythology-driven botanical inflation
Serum format gives herbal actives genuine opportunity for efficacy because prolonged contact allows real delivery.
Therefore evidence-tier distinctions become MORE important than in rinse-off products.

TIER A — STRONG CLINICAL EVIDENCE
(RCT/meta-analysis leave-on evidence)
Eligible for FULL functional credit.
Includes:
Bakuchiol
Niacinamide
Aloe vera
Tea tree oil
Salicylic acid from willow bark
Zinc systems
EGCG/green tea
Neem
Centella asiatica
Licorice root
Rules:
Full credit only for evidence-supported claims
Mechanism equivalence applies regardless of natural/synthetic origin
Bakuchiol is a retinoid functional equivalent, NOT “natural retinol”

TIER B — MODERATE EVIDENCE
Partial functional credit with evidence-quality notation.
Includes:
Curcumin
Resveratrol
Botanical vitamin C systems
Papaya enzymes
Witch hazel
Calendula
Chamomile
Critical rule:
If delivery/stability architecture fails,
Tier B actives downgrade toward decorative status.
Examples:
Curcumin without encapsulation
Resveratrol without stabilization
Vitamin C without pH disclosure

TIER C — WEAK / TRADITIONAL EVIDENCE ONLY
Traditional acknowledgment ONLY.
NO meaningful clinical-performance credit.
Includes:
Saffron
Sandalwood
Rose extract
Most exotic Ayurvedic herb systems
Multani mitti in serum
Shikakai/reetha in serum
Rules:
Primarily decorative/traditional
May contribute sensory or marketing value
Cannot function as major evidence-based performance actives
Misleading claims (example:
“100% natural retinol” for bakuchiol)
→ Formulation Honesty penalty.

TIER D — PROBLEMATIC / HIGH-RISK
Mandatory Safety and Allergy Risk penalties.
Risk is amplified in leave-on serum format.
Includes:
Tea tree oil >5%
Bergamot oil
Cold-pressed citrus oils
Cinnamon oil
Clove oil
St. John’s Wort
Arnica
Propolis
Oregano oil
Thyme oil
High-concentration peppermint oil
Phototoxic botanical oils
Major risks:
Sensitization
Phototoxicity
PIH
Barrier disruption
Microbiome disruption
Repeated exposure accumulation
Rules:
FCF certification required to avoid phototoxic penalties for citrus oils
Undisclosed EO concentrations default conservatively
“Cooling” sensation does NOT equal soothing effect
LAYER 4.6 — PRESERVATION ADEQUACY RULE
(Serum Format)
PRESERVATION FRAMEWORK
Water-containing herbal serums REQUIRE effective antimicrobial preservation.
This is especially critical for:
Periorbital application
Acne-compromised or post-procedure skin
High-botanical-complexity formulas
“Preservative-free” or “100% natural” marketing
Preservation is a microbial safety requirement, not a marketing preference.

PRESERVATION TIERS
ADEQUATE PRESERVATION
(No penalty)
Validated systems include:
Phenoxyethanol + ethylhexylglycerin
Sodium benzoate + potassium sorbate at pH ≤5.5
Gluconolactone + sodium benzoate
Cosgard/Geogard systems
Properly dosed Leuconostoc/radish-root ferment systems
1,2-Hexanediol + caprylyl glycol systems
Approved parabens at regulated concentrations
Rules:
“Paraben-free” marketing provides no proven safety advantage at approved concentrations
COSMOS/natural approval does NOT replace antimicrobial efficacy requirements

QUESTIONABLE PRESERVATION
(Minor penalty + transparency flag)
Examples:
Essential oils used as primary preservative system
Vitamin E + rosemary extract used as sole preservation
Single-preservative systems without broad-spectrum validation
Glycerin-heavy systems falsely claimed as self-preserving
Critical rule:
Antioxidants prevent oxidation — NOT bacterial, fungal, or yeast contamination.

INADEQUATE PRESERVATION
(Safety penalty)
Examples:
“Preservative-free” aqueous serum
No identifiable preservation system
“Antimicrobial botanical complex” without validation/challenge testing

ANHYDROUS EXEMPTION
True anhydrous oil serums do NOT require antimicrobial preservation.
In these systems:
Vitamin E
Rosemary extract
Other antioxidants
are appropriate for oxidation prevention and are NOT deceptive “preservative-free” claims.
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


LAYER 6 — CORE SCORING SYSTEM
CORE SCORE FORMULA
EVALUATED FROM 1.0 STARS TO 5.0 STARS

SAFETY — SERUM ADDITIONS
Additional serum-specific safety factors:
Essential-oil sensitization burden
Phototoxic botanical exposure
Preservation adequacy
Penetration-enhancer safety
Packaging-active degradation interactions
Oxidized active sensitization risk
Rules:
Leave-on exposure amplifies all sensitization pathways
Oxidized vitamin C and oxidized essential oils increase irritation/sensitization risk
Phototoxic botanicals in day serums require mandatory reduction

EFFECTIVENESS — SERUM ADDITIONS
Integrates:
Active Delivery Efficiency
Active Stability
Clinical concentration thresholds
Herbal Evidence Tiers
Leave-on contact-time advantages for Tier A/B actives
Rules:
Delivery, concentration, and stability determine effectiveness realism
Prolonged contact time may legitimately upgrade evidence-backed herbal performance

ALLERGY RISK — SERUM AMPLIFICATION RULE
All allergy-risk scoring operates at HIGHER strictness than cleansers because:
Leave-on exposure lasts 8–16 hours
Sensitization accumulates daily
Occlusion increases penetration
Periorbital application increases vulnerability

NATURAL FRAGRANCE RULE
(Amplified for serums)
Essential oils used as fragrance ARE fragrances for sensitization assessment.
In leave-on serum format:
Natural fragrance often carries HIGHER sensitization risk than rinse-off systems
Major sensitizers include:
Limonene
Linalool
Geraniol
Eugenol
Cinnamaldehyde
Citral
Farnesol
Coumarin
Rules:
IFRA/RIFM leave-on thresholds apply
Oxidized essential oils increase sensitization risk further
“Natural fragrance” does NOT reduce allergenic potential
ECO IMPACT 
Evaluates:
Reef/aquatic toxicity
Biodegradability
Persistence/bioaccumulation
Aquatic wash-off burden
Regulatory compliance
Eco penalties MUST remain evidence-based.
“Reef-safe” marketing alone NEVER increases scor

INGREDIENT QUALITY — SERUM ADDITIONS
Scoring adjustments:
Tier A herbal actives → full quality credit
Tier B → partial credit with evidence notation
Tier C hero claims → quality penalty
Tier D ingredients → mandatory penalty
Decorative botanical inflation → quality reduction
Stability failure → quality reduction because effective concentration collapses during use

SKIN COMPATIBILITY — SERUM ADDITIONS
Evaluates:
Daily sensitizer accumulation
Essential-oil exposure frequency
Cross-reactivity risk
Phototoxicity risk
Barrier compatibility trajectory
Long-term pH compatibility
Repeated leave-on exposure substantially increases compatibility importance versus rinse-off formats.
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)

LAYER 7 — SPECIALIZED SERUM PERFORMANCE SCORES
SPECIALIZED SCORE 1 — ACTIVE DELIVERY EFFICIENCY
Evaluates:
Whether actives realistically reach target skin layers at biologically meaningful concentrations considering:
Delivery architecture
Concentration adequacy
Stability-adjusted bioavailability
Scoring:
5.0 = functional concentrations + evidence-supported delivery + stable packaging/vehicle
1.0 = severe delivery failure

SPECIALIZED SCORE 2 — BARRIER COMPATIBILITY
Evaluates:
Net barrier impact under repeated use:
Barrier-supportive ingredients
Barrier-disruptive ingredients
Exfoliation vs repair balance
Scoring:
5.0 = net barrier-positive
1.0 = major barrier disruption without repair architecture

SPECIALIZED SCORE 3 — ACTIVE STABILITY
Evaluates:
Whether hero actives survive:
Formulation
Shelf life
Packaging
Consumer use conditions
Scoring:
5.0 = stable protected system
1.0 = unstable actives effectively destroyed during normal use

SPECIALIZED SCORE 4 — IRRITATION ACCUMULATION RISK
Evaluates:
Long-term sensitization and chronic inflammation potential under repeated leave-on use.
Key inputs:
Essential-oil burden
SCCS sensitizer count
Phototoxicity
Exposure frequency × contact duration
Cross-reactivity burden
Threshold proximity for leave-on exposure
Scoring:
5.0 = low sensitization burden
1.0 = high-risk Tier D sensitizer system
Important:
This differs from immediate allergy risk by modeling long-term cumulative exposure.

SPECIALIZED SCORE 5 — LONG-TERM TOLERANCE
Evaluates:
6–12 month sustainability of daily use.
Key inputs:
NMF depletion trajectory
Sensitization accumulation
Active degradation over time
Microbiome impact
pH cumulative effects
Barrier trajectory
Scoring:
5.0 = sustained compatibility with stable benefit
1.0 = progressive irritation/sensitization/barrier deterioration predicted

SPECIALIZED PERFORMANCE FORMULA
Specialized Performance Score =AVERAGE OF ALL SPECIALIZED SCORES

LAYER 8 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)

HIGH-SCORE ELIGIBILITY CRITERIA
(Herbal / Organic Serums)
REQUIREMENTS FOR SCORES >4.0
ALL conditions MUST be satisfied:
≥1 Tier A herbal active at functional concentration/position
Appropriate packaging for unstable actives
Correct pH architecture
No unjustified Tier D sensitizers
Adequate preservation
No unsupported Tier C hero claims
No unqualified phototoxic botanicals in day serum
Essential-oil burden below high-risk threshold
Formulation Honesty ≥3.5
Barrier Compatibility ≥3.0
Active Delivery Efficiency ≥3.5
Positive Long-Term Tolerance prediction

REQUIREMENTS FOR SCORES >4.5
ALL above criteria PLUS:
Delivery optimization for Tier A actives
(encapsulation or vehicle-matched architecture)
Active Stability ≥4.0
Irritation Accumulation Risk ≤ Low
Formulation Honesty ≥4.0
OUTPUT FORMAT
---
⭐ FINAL RATING X.X / 5 — Rating Level
---
⚖ STRUCTURAL QUALITY
Evidence-based classification covering: herbal active evidence tier (A/B/C/D), active delivery architecture, pH compatibility with claimed actives, active stability in current packaging, barrier compatibility net assessment, preservation adequacy, sensitization risk profile, and expected long-term skin outcome. Written in honest, accessible language that genuinely informs users without marketing bias.
---
🌿 HERBAL/ORGANIC SERUM PROFILE
Short functional descriptor of the serum type. Examples:
Evidence-Backed Botanical Retinoid-Equivalent Serum (Bakuchiol Tier A + Encapsulated Delivery)
Marketing-Heavy Ayurvedic Botanical Serum (Tier C Active Inflation + Poor Stability)
Unstable Vitamin C Serum (Natural Source, Jar Packaging — Active Effectively Void)
Fermented Herbal Postbiotic Serum (Microbiome-Considerate, Tier B Evidence)
Essential Oil-Dominant Sensitization Risk Serum (Leave-On Safety Concern)
Centella Asiatica Barrier Repair Serum (Tier A Active, Delivery-Appropriate Vehicle)
Phototoxic Botanical Day Serum (Bergamot / Lime Oil — Mandatory Day Use Contraindication)
Decorative Botanical Wellness Serum (10+ Herbs, Zero Functional Active Architecture)
Hybrid Botanical-Synthetic Serum (Niacinamide + Bakuchiol + Herbal Support Actives)
---
📊 CORE SCORES(Short structural reason for every score)
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
---
🧪 SPECIALIZED PERFORMANCE(Short structural reason for every score)
Active Delivery Efficiency — ⭐X.X
Barrier Compatibility — ⭐X.X
Active Stability — ⭐X.X
Irritation Accumulation Risk — ⭐X.X
Long-Term Tolerance — ⭐X.X
---
🌱 HERBAL ACTIVE EVIDENCE ASSESSMENT
Hero herbal ingredient(s): [list with individual evidence tier]
Evidence Tier: A / B / C / D for each
Leave-on serum efficacy: Full / Partial / Decorative for each
Herbal active inflation penalty: Applied / Not applicable
Stability classification for each active: Stable / Moderate Risk / High Risk / Very High Risk
Overall herbal evidence quality: Strong / Moderate / Weak / Gimmick-grade
🌼 SENSITIZATION RISK ASSESSMENT
Essential oils present in leave-on serum: [list with concentration estimates]
Known sensitizing molecules from SCCS priority list: [list — limonene, linalool, geraniol, eugenol, citral etc.]
Phototoxic botanicals: None / [list with day-use warning]
Tier D ingredients: None / [list with risk note]
Cumulative botanical sensitizer burden (leave-on × daily × months): Low / Moderate / High / Very High
SCCS leave-on threshold concern: None / Moderate / ⚠ Likely Exceedance
Recommended patch test: Yes / No
---
👍 STRENGTHS
(Evidence-supported structural advantages with evidence tier noted)
[Major strength — evidence basis noted]
[Major strength]
[Major strength]
---
⚠ CONCERNS
(Clear, user-friendly language. Informing without alarm.)
[Major concern with brief scientific explanation]
[Major concern]
[Major concern]
---
🔍 THE TRUTH ABOUT THE "NATURAL/ORGANIC" CLAIMS
(This section is mandatory. 2–4 concise sentences that respectfully but honestly separate verified claims from marketing mythology, specific to this formula's actual ingredients and claims.)
Example format:
"[Active X] in this formula has [genuine Tier A/B evidence] for [claimed benefit] — this is a legitimate botanical active with clinical support in serum format. However, [Active Y], despite its prominent position on the label, has no controlled clinical evidence for [claimed benefit] in leave-on serum format — it contributes traditional appeal and sensory quality, not documented skin function. The '[specific marketing claim]' on the packaging [is misleading/overstates the evidence/is accurate] because [brief scientific explanation]. Consumers who choose this serum for [X benefit] are getting evidence-based value; those choosing it for [Y claim] are paying for marketing mythology."
---
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X
Oily Skin → ⭐X.X
Combination Skin → ⭐X.X
Sensitive Skin → ⭐X.X
Acne-Prone Skin → ⭐X.X
Post-Procedure / Compromised Barrier → ⭐X.X
---
📅 LONG-TERM USABILITY
Daily Use → ⭐X.X
Twice Daily Use → ⭐X.X
Occasional Use → ⭐X.X
Day Use (phototoxicity assessment) → ⭐X.X
Night Use → ⭐X.X
---
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (1–7 Uses)
Skin feel post-application: texture, absorption, residue
Sensory experience of botanical/essential oil components
Initial irritation signals to monitor (particularly with AHA/BHA, high EO load, or active acids)
Any immediate allergy response triggers to watch for
Medium-Term (2–8 Weeks)
Evidence-based active ingredient trajectory (Tier A/B actives: expected timeline for visible effect)
Sensitization signal development monitoring (essential oil-heavy formulas)
pH-mediated skin adaptation signals
Barrier impact trajectory under daily use
Active degradation in-use (unstable actives in poor packaging — diminishing returns noted here)
Long-Term (2–6+ Months)
Cumulative sensitization development probability (based on EO burden and sensitizer load)
Barrier resilience or deterioration under daily sustained application
Photosensitization risk from phototoxic botanicals with UV exposure
Realistic efficacy plateau for each Tier A/B active
Active stability depletion in use: When hero claims become effectively void
Microbiome equilibrium or disruption under sustained antimicrobial botanical exposure
Realistic Dermatological Outcome
One honest conclusion: What will this serum actually do over months of daily use, based on its active evidence tier, delivery architecture, stability profile, and sensitization risk? Not the marketing promise — the evidence-based prediction.
---
🔬 KEY STRUCTURAL INGREDIENTS
(List only functionally dominant ingredients)
[Ingredient name] — Role — Evidence Tier (A/B/C/D) — Stability Risk — Sensitization risk if applicable — Concentration assessment
[Surfactant/emulsifier if present] — Function noted
[Preservation system] — Identified/Adequate/Questionable
[Key vehicle/base components]
---
🧠 WHY THIS RATING
3–5 concise evidence-based sentences covering:
Active evidence quality and delivery architecture assessment
Active stability and packaging adequacy
Sensitization and irritation accumulation risk profile
Barrier compatibility net assessment
Formulation honesty vs. marketing claim gap and long-term use trajectory
---
📌 STRUCTURAL INSIGHT
Strengths
[With evidence basis]
[With evidence basis]
[With evidence basis]
Weaknesses
[With evidence basis]
[With evidence basis]
[With evidence basis]
STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS
harsh fragrances,preservatives and colorants should ve visiible in output
All rules from the Herbal/Organic Face Wash Algorithm apply, with serum-specific additions:
"Natural" label MUST NOT improve any score unless supported by evidence
"Organic" certification does not equal improved performance — organic sourcing is an ethical and purity consideration, not a clinical efficacy guarantee
Traditional use of an ingredient MUST be distinguished from controlled clinical evidence
Essential oils in leave-on serum MUST be evaluated at HIGHER stringency than in rinse-off products
Phototoxic botanicals in leave-on day serums MUST be flagged with explicit day-use risk warning
"Chemical-free" marketing claims MUST trigger Formulation Honesty penalty
Preservation adequacy is a mandatory safety evaluation — not optional
"Preservative-free" on water-based serum MUST trigger safety flag
Unstable actives in jar packaging MUST receive Active Stability penalty regardless of concentration claim
The Serum Leave-On Amplification Rule MUST be applied to all sensitization and phototoxicity assessments — leave-on context elevates all risks vs. cleanser context
The "Truth About Natural Claims" section is MANDATORY
Jar packaging for unstable actives is NEVER excused by "natural" or "artisanal" framing
The output must educate and protect the user — not validate their preference for natural products


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
              "You are a strict herbal serum structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "ORGANIC SERUM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new OrganicEngine();