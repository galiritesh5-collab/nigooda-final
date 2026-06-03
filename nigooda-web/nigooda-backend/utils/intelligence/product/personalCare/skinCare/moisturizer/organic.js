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

        moisturizer_type:
          "ORGANIC_HERBAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "ORGANIC ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
HERBAL / ORGANIC MOISTURIZER EVALUATION ALGORITHM — VERSION 1.0
Evidence-Based Dermatological Scoring Engine — Herbal & Organic Moisturizer Edition
Research Base:
2010–2025 dermatology, moisturizer science, botanical evidence, barrier biology, microbiome science, humectant/emollient mechanisms, sensitization science, comedogenicity research, botanical penetration systems, and photostability literature.

⚠ CRITICAL OPENING STATEMENT — NATURAL HALO PROBLEM
“Organic”, “Natural”, “Herbal”, “Ayurvedic”, “Plant-Powered”, and “Chemical-Free” are marketing labels — NOT dermatological quality certifications.
Moisturizer quality depends on:
Hydration performance
Barrier support
Long-term skin compatibility
Safety profile
Delivery architecture
Evidence quality
Plant-derived and synthetic ingredients are judged equally by outcome and evidence.
Natural ingredients MAY:
Provide genuine hydration/barrier support
Trigger allergic dermatitis
Cause photosensitization
Disrupt microbiome balance
Increase comedogenicity risk
Compromise barrier stability over time
Leave-on moisturizer context increases:
Penetration relevance
Sensitization importance
Comedogenicity importance
Phototoxicity concern
Microbiome impact
Occlusive stress significance
Consequences of leave-on exposure:
Herbal actives may receive stronger evidence credit than rinse-off systems
Sensitizing botanicals become more clinically important
Comedogenic oils remain on skin and may trigger comedones
Phototoxic botanicals may contribute to UV-mediated damage
“Chemical-free” is scientifically impossible.
More botanicals ≠ better moisturizer.
Formulation architecture, delivery system, barrier support, and evidence quality determine outcome — NOT ingredient count or natural positioning.
This algorithm neither rewards nor penalizes “organic/herbal” labels themselves. Evaluation is based ONLY on:
Moisturization mechanism
Barrier science
Evidence quality
Safety profile
Long-term skin trajectory
Dermatological evidence

LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Evaluate herbal/organic moisturizers using peer-reviewed dermatological science to determine their ability to:
Hydrate skin
Repair/support the barrier
Reduce TEWL
Support long-term skin health
Avoid risks hidden behind natural-marketing claims

TRANSPARENCY PRIORITY RULE
Scientific evidence and user safety override consumer preference for “natural” positioning.
When evidence conflicts with marketing claims, evidence wins.

GLOBAL ENFORCEMENT RULE
All scores derive from formulation science and clinical evidence.
The following receive ZERO scoring credit without controlled evidence:
Organic certification
Ayurvedic positioning
Ancient/traditional claims
“100% natural” claims

MOISTURIZER-SPECIFIC CONTEXT RULE
This is a leave-on product. Ingredient evaluation MUST reflect prolonged exposure.
Mandatory evaluation factors:
Penetration potential
Vehicle/lipid solubility
Leave-on sensitization risk
Oil/butter comedogenicity
Daytime photostability
Microbiome impact of antimicrobial botanicals
Occlusive effects on follicular environment and oxygen exchange

NATURAL HALO EFFECT PENALTY — MANDATORY
Apply penalty when formulation value relies mainly on:
“Natural/organic” positioning without hydration/barrier evidence
“Chemical-free” claims
Traditional use presented as clinical efficacy evidence
“Deep nourishment/intense hydration” claims without humectant/emollient/occlusive mechanism
“Natural barrier repair” claims without validated barrier actives
“Detoxifying” moisturizer claims
Ayurvedic/TCM/Unani claims without leave-on RCT support

NATURAL DOES NOT MEAN SAFE RULE
Penalty applies when:
High-comedogenic oils are marketed as nourishing without disclosure
Essential oils appear at leave-on sensitization concentrations without allergy disclosure
Phototoxic botanicals appear in daytime formulas
“Preservative-free” claims appear in water-containing formulas
Strong antimicrobial botanicals are used daily in leave-on format
Highly fragrant botanicals are positioned as skin-actives rather than sensory ingredients
Examples of high comedogenicity oils:
Coconut oil (4/5)
Cocoa butter (4/5)
Wheat germ oil (5/5)
Examples of phototoxic botanicals:
Bergamot
Cold-pressed citrus oils
St. John’s Wort

LAYER 1 — MOISTURIZATION MECHANISM ARCHITECTURE
(Based on IJCS 2019; Loden 2003; Cosmetics 2021)
CRITICAL RULE
Effective moisturization requires ALL THREE functional layers.
Reliance on only one mechanism — regardless of natural positioning — is structurally incomplete.

THE THREE-LAYER MOISTURIZATION SYSTEM

LAYER A — HUMECTANTS (Water Attraction Layer)
Function
Attract and bind water into the stratum corneum.
Scientific Basis
Hygroscopic molecules create osmotic water attraction and hydrogen-bond water retention. NMF-mimicking humectants improve hydration sustainability.

EVIDENCE-BASED HERBAL HUMECTANTS
Full Credit
Vegetable-derived glycerin
Naturally fermented hyaluronic acid
Naturally sourced panthenol
(All function identically to synthetic equivalents.)
Partial Credit / Tier B
Aloe vera
Honey
Tremella mushroom extract
Tier C / Limited Evidence
Fenugreek mucilage

STRUCTURAL GAP PENALTY
Formula lacking functional humectant within top-5 ingredients → Hydration Depth ceiling reduction.

LAYER B — EMOLLIENTS (Barrier Smoothing & Lipid Replenishment)
Function
Fill intercellular gaps, smooth texture, replenish lipids, and reduce TEWL.
Scientific Basis
Fatty acid composition determines barrier compatibility, inflammation behavior, and comedogenicity profile.

EMOLLIENT QUALITY CLASSIFICATION
★★★★★ — Strong Barrier Compatibility
High linoleic acid, low comedogenicity, strong barrier compatibility.
Includes:
Rosehip oil
Sea buckthorn oil
Hemp seed oil
Prickly pear seed oil
Notes
Rosehip: strong evidence for scars/hyperpigmentation
Hemp seed: excellent barrier compatibility
Sea buckthorn: omega-7 support
Low comedogenicity overall
Special Case
Marula oil: antioxidant-rich but moderate comedogenicity (3–4/5)

★★★★☆ — Good Barrier Compatibility
Includes:
Jojoba oil
Argan oil
Sunflower oil
Notes
Jojoba mimics sebum; highly stable
Sunflower oil has documented TEWL reduction evidence
Generally low comedogenicity

★★★☆☆ — Moderate Compatibility / Watch Comedogenicity
Includes:
Sweet almond oil
Avocado oil
Olive oil
Notes
More oleic-dominant
Higher richness/heaviness
Olive oil at high concentration may disrupt lamellar structure

★★☆☆☆ — High Comedogenicity Risk
MUST be flagged.
Includes:
Coconut oil (4/5)
Cocoa butter (4/5)
Wheat germ oil (5/5)
Notes
Strong pore-clogging potential
Often aggressively marketed without disclosure
Shea Butter Clarification
Lower comedogenicity (0–2/5)
Strong evidence for emolliency and atopic support
Acceptable with skin-type disclosure
LAYER C — OCCLUSIVES (TEWL Prevention Layer)
Function
Form a physical surface film that reduces transepidermal water loss (TEWL). Occlusives seal existing water into skin but do NOT provide hydration independently.
Scientific Basis
Lipophilic films reduce TEWL through stratum corneum surface sealing, especially valuable in barrier-compromised skin.

EVIDENCE-BASED HERBAL OCCLUSIVES
Full Occlusion Credit
Beeswax
Carnauba wax
Candelilla wax
Shea butter (appropriate concentration)
Castor oil
Notes
Beeswax: strong occlusive/emulsion stabilization
Carnauba/Candelilla: effective plant occlusives
Shea butter: dual emollient-occlusive function
Castor oil: strong film-forming occlusion with low comedogenicity (1/5)

Moderate Occlusion Credit
Mango butter

Special Case — Lanolin
Superior occlusive performance
Sensitization risk must be noted
Full occlusive credit retained

STRUCTURAL COMPLETENESS RULE
Oil-only formulations are structurally incomplete moisturizers.
Pure plant oils mainly function as:
Emollients
Partial occlusives
Without:
Genuine humectant support
AND
Barrier-compatible emollient architecture
→ formula prevents water loss but does NOT provide meaningful hydration support.

LAYER 2 — BARRIER REPAIR SCIENCE
(Based on Elias 2006; J Invest Dermatol 2012; Dermatol Ther 2022; Coderch 2003)

THE SKIN BARRIER SYSTEM
Barrier integrity depends primarily on:
Ceramides (~50%)
Cholesterol (~25%)
Free fatty acids (~15%)
NMF components
Functional Roles
Ceramides → structural barrier organization
Free fatty acids → acidity + structural support
Cholesterol → membrane elasticity/fluidity
NMF → corneocyte water binding
For genuine barrier repair, formulas must support at least ONE of:
Ceramide replenishment
Essential fatty acid replenishment
NMF support

HERBAL BARRIER REPAIR INGREDIENT CLASSIFICATION
GENUINE BARRIER-ACTIVE INGREDIENTS
(Full Barrier Repair Credit)
Ceramide Sources
Rice ceramides
Wheat germ ceramides
Provide structural barrier lipid support and TEWL reduction.

Essential Fatty Acid Sources
Rosehip oil
Hemp seed oil
Sunflower oil
Linoleic acid functions as ceramide precursor and barrier-support lipid.

Clinically Relevant Barrier Botanicals
Beta-glucan (oat)
Oat kernel oil
Centella asiatica
Calendula officinalis
Notes
Oat/beta-glucan: strong atopic/barrier evidence
Centella: supports filaggrin/involucrin pathways
Calendula: anti-inflammatory with minor barrier support

PARTIAL BARRIER SUPPORT
(Partial Credit)
Includes:
Rosehip oil
Shea butter
Aloe vera
Naturally sourced niacinamide
Panthenol
Notes
Niacinamide: strong evidence for ceramide stimulation and TEWL reduction
Panthenol: indirect barrier support through lipid synthesis pathways
Aloe: minor hydration/barrier support
Shea: anti-inflammatory emollient-occlusive support

BARRIER-DISRUPTIVE INGREDIENTS
(Penalty Required)
Includes:
High-concentration denatured/SD alcohol
High-concentration citrus essential oils
High-concentration high-oleic oils
Irritating surfactant emulsifier systems
Repeated broad-spectrum antimicrobial botanicals
Mechanisms
Delipidization
Lamellar disruption
Terpene-mediated irritation
Acid mantle disruption
Commensal microbiome destabilization

BARRIER REPAIR SCORE CEILING RULES
Formula Structure
Barrier Repair Ceiling
No ceramide, EFA, or NMF support
2.5
One EFA-rich oil
3.5
EFA-rich oil + barrier-active botanical
4.5
Ceramide source + EFA + NMF-supporting humectant
5.0


CEILING INTERPRETATION RULE
High barrier scores require structural barrier architecture — NOT soothing perception, oil richness, or temporary occlusion alone.
Protection without meaningful repair support MUST NOT achieve elite Barrier Repair scoring.
LAYER 3 — HERBAL ACTIVE EVIDENCE CLASSIFICATION (Leave-On Format)
(Based on J Cosmetic Dermatology 2025; Frontiers Medicine 2025; dermatology botanical reviews)

CRITICAL DIFFERENCE FROM FACE WASH FORMAT
Leave-on moisturizers provide prolonged contact time. Penetration potential, molecular weight, lipid solubility, and vehicle stability now meaningfully affect delivery.
As a result:
Many rinse-off Category C botanicals gain functional leave-on credit
Sensitization risks become substantially more important
Phototoxicity and comedogenicity carry greater clinical significance
Evidence assessment therefore differs substantially from rinse-off scoring.

EVIDENCE TIER TABLE — LEAVE-ON MOISTURIZER FORMAT

TIER A — Strong Clinical Evidence
(RCT/meta-analysis support in leave-on topical format)
Full functional credit.
Includes
Hydration / Barrier Support
Aloe vera
Oat (colloidal oat, oat oil, beta-glucan)
Vegetable glycerin
Naturally sourced panthenol
Naturally sourced niacinamide
Shea butter
Barrier / Repair / Anti-Inflammatory
Centella asiatica
Rosehip oil
Neem (appropriate concentration)
Acne / Antimicrobial
Tea tree oil at 2–5% leave-on
Anti-Aging
Bakuchiol

Key Functional Notes
Aloe Vera
Hydration, wound healing, mild anti-inflammatory support.
Centella
Strong evidence for collagen synthesis, wound healing, and barrier protein support.
Oat/Beta-Glucan
FDA-recognized skin protectant with strong atopic/barrier evidence.
Niacinamide
Strong evidence for:
Ceramide stimulation
TEWL reduction
Pigmentation support
Sebum regulation
Effective range well documented at 2–5%.
Panthenol
Barrier conditioning and wound-healing support.
Tea Tree Oil
Evidence-supported for acne at 2–5%; sensitization risk increases above 5%.
Bakuchiol
RCT-supported retinol-like anti-aging effects with lower irritation.

TIER B — Moderate Clinical Evidence
Partial functional credit with evidence-quality acknowledgment.
Full leave-on mechanism credit retained.
Includes
Green tea (EGCG)
Turmeric/curcumin
Calendula
Licorice root
Sea buckthorn oil
Natural-source vitamin C systems
Pomegranate extract
Arnica
Hemp seed oil
Frankincense
Plant-derived squalane

Important Delivery / Stability Rules
Curcumin
Limited by penetration/stability.
Unencapsulated → Tier B partial
Encapsulated/nano-delivery → Tier B-A
Natural Vitamin C
Scoring depends heavily on:
Stability
pH
Concentration
Vehicle
L-ascorbic acid systems:
≥10%
Stable
pH <3.5
→ eligible for Tier A-level credit.
Unstable fruit extracts or weak derivatives → Tier B partial only.

Important Risk Clarification
Arnica
Tier B efficacy but Tier D sensitization risk.
Penalty applies to Allergy Risk regardless of efficacy evidence.
Squalane
Skin-identical emollient with excellent compatibility and low comedogenicity.

TIER C — Weak Evidence
Traditional use acknowledgment ONLY.
NO meaningful moisturizer-effectiveness credit.
Includes
Saffron
Sandalwood
Most Ayurvedic herb complexes
Jasmine/rose/lotus extracts
Kumkumadi oil blends

COUNTERPRODUCTIVE SPECIAL CASE
Multani Mitti (Fuller’s Earth)
Oil-absorbing and anti-humectant in moisturizer context.
→ Counterproductive in moisturizers
→ Penalty required

TIER D — Sensitization / Phototoxicity / Safety Risk
(Mandatory Penalty Regardless of Origin)
Phototoxic Botanicals
Bergamot oil
Cold-pressed citrus oils
St. John’s Wort
Mandatory penalty unless certified:
Bergapten-free (BF)
Furanocoumarin-free (FCF)

Strong Sensitizers / Irritants
Cinnamon oil
Clove oil
Thyme oil
Propolis
Oakmoss
Treemoss
Peru balsam
High-concentration ylang ylang
Mandatory penalty required.

Concentration-Dependent Sensitizers
Lavender Oil
1% leave-on → sensitization penalty.
Peppermint Oil
0.5% leave-on → irritation/sensitization penalty.
Tea Tree Oil
5% leave-on → sensitization penalty.
Arnica
Documented allergic contact dermatitis risk despite efficacy evidence.

LAYER 4 — COMEDOGENICITY ASSESSMENT
(Based on Draelos 2006; JAAD 2018 reassessment; Fulton 1989; Kligman 1979)
Comedogenicity Scale:
0 = non-comedogenic
5 = highly comedogenic
Assessment is ingredient-specific using updated clinical-evidence-adjusted ratings.

NON-COMEDOGENIC (0–1)
Full compatibility credit for acne-prone/oily skin.
Includes:
Hemp seed oil
Sunflower oil
Rosehip oil
Candelilla wax
Squalane
Castor oil
Low-risk range:
Shea butter (0–2)
Argan oil (0–2)

LOW COMEDOGENIC (2)
Generally acceptable with skin-type disclosure.
Includes:
Sweet almond oil
Jojoba
Argan oil

MODERATE COMEDOGENIC (3)
Flag for oily/acne-prone skin.
Includes:
Avocado oil
Sesame oil
Macadamia oil
Olive oil (2–3)

HIGH COMEDOGENIC (4–5)
Mandatory disclosure + scoring penalty for acne-prone compatibility.
Includes:
Coconut oil
Cocoa butter
Flaxseed oil
Wheat germ oil
Palm kernel oil

COMEDOGENICITY SCORING RULES
When high-comedogenic ingredients function as:
Primary emollient
Hero ingredient
Top-3 ingredient
Mandatory actions:
Reduce Skin Compatibility
Reduce Allergy/Occlusion Balance for oily/acne-prone profiles
Include compatibility disclosure in output
Examples:
“Coconut oil for all skin types” → mandatory acne-prone penalty
“Cocoa butter for sensitive skin” without disclosure → mandatory penalty

SHEA BUTTER CLARIFICATION
Lower risk than coconut/cocoa butter.
Requires oily-skin disclosure but NOT universal penalty.

COMEDOGENICITY EVIDENCE LIMITATION RULE
Original rabbit-ear comedogenicity models have limitations for human translation.
Algorithm uses updated human-clinical-adjusted evidence where available.
However:
Coconut oil
Cocoa butter
retain high-risk classification based on modern human clinical observation despite model limitations.
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

LAYER 5 — pH ASSESSMENT FOR MOISTURIZERS
(Based on Lambers 2006; Cork 2009; Schmid-Wendtner 2004; Ali 2013)

SKIN SURFACE pH FACTS
pH Range
Interpretation
4.5–5.5
Healthy acid mantle
<4.5
Excess acidity → irritation/enzyme disruption risk
5.5–7.0
Mild alkalinity → serine protease activation + barrier disruption begins
>7.0
Significant barrier enzyme dysfunction, microbiome disruption, barrier degradation


WHY pH MATTERS MORE IN MOISTURIZERS
Face wash exposure is brief.
Moisturizers remain on skin for hours.
Therefore prolonged alkaline exposure can continuously disrupt:
Acid mantle integrity
Serine protease/transglutaminase balance
Barrier enzyme function
Microbiome stability

MOISTURIZER pH RANGES
pH Range
Assessment
4.5–6.0
Optimal
4.0–7.0
Acceptable
>7.0 or <3.5
Problematic → penalty


HERBAL pH CONSIDERATIONS
Mandatory Penalty
Natural soap-based moisturizer-cleansers (typically pH 9–10)
Baking soda-based “natural” formulas (typically pH 8–9)
Positive / Acceptable Modifiers
Fermented herbal extracts (naturally acidic)
Aloe-vera-heavy systems (typically pH 4.5–5.5)
Apple cider vinegar systems (typically pH 3.5–5.0; irritation monitoring required)

LAYER 6 — MICROBIOME COMPATIBILITY (LEAVE-ON FORMAT)
(Based on Cell Host & Microbe 2019; JEADV 2021; Grice & Segre 2011)

SKIN MICROBIOME FACTS
Commensal microbiota support:
Barrier integrity
Antimicrobial peptide production
Immune balance
Pathogen competition
Leave-on exposure creates substantially higher microbiome disruption potential than rinse-off exposure.

BROAD-SPECTRUM ANTIMICROBIAL BOTANICALS
(Moderate–High Penalty)
Includes:
Tea tree oil >2%
Dominant neem oil
Oregano oil
Thyme EO
Clove EO
Cinnamon EO
Colloidal silver
Daily leave-on exposure may disrupt commensal balance.

MICROBIOME-SUPPORTIVE INGREDIENTS
(Positive Modifier)
Includes:
Fermented plant extracts
Lactobacillus ferment lysates
Fermented rice water
Fermented green tea
Inulin
Chicory root extract
Beta-glucan
Colloidal oat
Aloe vera
Lactobacillus acidophilus filtrate
Functional Roles
Postbiotic support
Prebiotic commensal promotion
Acid mantle support
Dysbiosis reduction

MICROBIOME-NEUTRAL INGREDIENTS
Generally neutral at standard cosmetic concentrations:
Most plant oils/butters/waxes
Vitamin C derivatives
Non-antimicrobial botanicals
Calendula
Centella
Licorice

LAYER 6.5 — PRESERVATION ADEQUACY
(Based on Formula Botanica 2025; preservation-testing standards)

CRITICAL PRESERVATION RULE
Water-containing moisturizers are high microbial-risk products due to:
Water activity
Nutrient-rich botanical extracts
Repeated fingertip contamination
Shared container exposure
“Natural = preservative-free” marketing pressure

PRESERVATION TIER EVALUATION
ADEQUATE PRESERVATION
(No penalty)
Proven Systems
Phenoxyethanol ≤1%
Ethylhexylglycerin
Sodium benzoate/potassium sorbate
Validated COSMOS/Ecocert systems
Validated challenge-test systems
Proper water-activity control

QUESTIONABLE PRESERVATION
(Minor penalty + transparency flag)
Includes:
Essential-oil-only preservation without challenge data
Single weak preservative systems
Multifunction ingredients used as unvalidated preservatives

INADEQUATE PRESERVATION
(Mandatory Safety Penalty)
Includes:
“Preservative-free” water-containing moisturizers
Antioxidants used as preservative substitutes
Vitamin E
Rosemary extract
No identifiable preservation system
“Self-preserving” claims without HPAA validation

ANHYDROUS EXEMPTION
True anhydrous systems:
Oils
Butters
Waxes only
(with no water, aloe gel, or hydrosols)
→ do NOT require preservatives.

PACKAGING CONTAMINATION RULE
Jar packaging with fingertip application carries higher contamination risk than airless pumps.
This is a packaging safety modifier and should be disclosed in output when relevant.

LAYER 7 — PHOTOSTABILITY ASSESSMENT
(Based on Photodermatol Photoimmunol Photomed 2021; IJDVL 2020)

WHY PHOTOSTABILITY MATTERS
Moisturizers remain on skin during UV exposure.
Photolabile or phototoxic ingredients may:
Generate ROS
Trigger photochemical damage
Cause PIH/photosensitization
Reduce active effectiveness

PHOTOTOXIC BOTANICALS
(Mandatory Penalty in Daytime Moisturizers)
Includes:
Bergamot oil
Cold-pressed citrus oils
St. John’s Wort
Angelica root oil
Fig leaf extract
Rue
Mandatory penalty unless:
FCF-certified
OR
Nighttime-only positioning clearly established

PHOTOLABILE ACTIVES
(Formulation Quality Concern)
Vitamin C (L-Ascorbic Acid)
Requires:
pH <3.5
Stabilization network
Opaque packaging
Without stabilization:
Reduced anti-aging effectiveness
Ingredient Quality penalty
Effectiveness penalty

Curcumin
Rapid UV degradation unless encapsulated.

Bakuchiol
More photostable than retinol.
Acceptable daytime use.

Green Tea EGCG
Minor photostability concern only.

PHOTOSTABILITY SCORING RULES
Mandatory Safety + Allergy Penalty
Phototoxic Tier D botanical in daytime moisturizer.
Quality + Effectiveness Penalty
Photolabile active lacking stabilization system.
No Phototoxicity Penalty
When:
FCF/BF-certified
OR
Restricted to nighttime-only use
Disclosure still required in output.

LAYER 8 — CORE SCORING (EVALUATED FROM 1.0 TO 5.0 STAR)

SAFETY 
Evaluates:
Preservation adequacy
Phototoxic botanicals
Primary-emollient comedogenicity
Essential-oil sensitization burden
Compositae cross-reactivity
Tier D ingredient presence
pH compatibility
Packaging contamination risk
Phototoxicity receives elevated importance in daytime moisturizers.

EFFECTIVENESS 

Evaluates:
Moisturization mechanism completeness
Herbal evidence tier
Barrier-repair actives
Active penetration capacity
Photostability
Functional concentration/INCI positioning
All three moisturization layers are required:
Humectant
Emollient
Occlusive

ALLERGY RISK 
NATURAL FRAGRANCE RULE
Essential oils in leave-on moisturizers are fragrances for sensitization purposes.
Repeated leave-on exposure significantly increases sensitization risk versus rinse-off exposure.
Multiple essential oils increase:
Cross-reactivity risk
Cumulative allergen burden
Natural fragrance ≠ safer fragrance.
Natural fragrance may produce higher sensitization risk than isolated synthetic fragrance compounds.

ECO IMPACT 
Evaluates:
Biodegradability
Botanical sourcing sustainability
Packaging sustainability
Valid third-party organic certification
Carbon footprint
Water footprint
Endangered botanical concerns
Only genuine certifications:
COSMOS
BDIH
Ecocert
USDA
receive eco credit.
Self-claimed “organic” positioning receives no eco credit.

INGREDIENT QUALITY 
Evaluates:
Tier A actives at functional concentration
Tier B actives with evidence limitations
Tier C hero-ingredient inflation
Tier D risk ingredients
Decorative botanical inflation
Moisturization mechanism completeness
Photostability integrity
Photolabile unstabilized systems → quality reduction.

SKIN COMPATIBILITY 
Evaluates:
Comedogenicity vs target skin type
Essential-oil sensitization burden
Multi-botanical cross-reactivity
Photosensitization risk
Long-term microbiome compatibility
pH compatibility
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)

LAYER 9 — SPECIALIZED MOISTURIZER PERFORMANCE SCORES(EVALUATED FROM 1.0 TO 5.0 STAR)


HYDRATION DEPTH — ⭐X.X
Definition
Measures how effectively the formula delivers and maintains hydration within the stratum corneum and corneocyte environment — not merely surface softness.
Scientific Basis
Corneometer hydration studies, NMF replenishment, osmotic humectancy, aquaporin-3 support.

SCORING CRITERIA
Score
Criteria
5.0
Strong humectant at high concentration (glycerin top-3 preferred) + film-former + validated long-duration hydration support
4.0–4.9
Strong humectant system with additional water-binding agents (HA, aloe, beta-glucan)
3.0–3.9
Moderate humectancy; incomplete hydration architecture
2.0–2.9
Primarily surface hydration through emollient/occlusive effects
1.0–1.9
No functional humectant; oil-only/TEWL-only “hydration”

Modifiers
Fermented humectant extracts → minor positive modifier
Anti-humectant ingredients in inappropriate moisturizer context (kaolin, bentonite) → ceiling reduction

BARRIER REPAIR STRENGTH — ⭐X.X
Definition
Measures the formula’s ability to restore and strengthen barrier structure through ceramide support, fatty acid balance, and barrier stabilization.
Scientific Basis
TEWL measurement, ceramide quantification, filaggrin support, Elias lipid model.

SCORING CRITERIA
Score
Criteria
5.0
Ceramide source + EFA-rich oil + NMF-supporting humectant + barrier-active botanical
4.0–4.9
Two major barrier-repair systems present
3.0–3.9
One meaningful barrier-repair element
2.0–2.9
Emollient protection only; no repair architecture
1.0–1.9
Barrier-disruptive profile; net negative barrier impact

Hard ceilings from Layer 2 remain mandatory.

OCCLUSION BALANCE — ⭐X.X
Definition
Measures whether occlusion level is appropriate for target skin type, environment, and wear context.
Scientific Basis
TEWL reduction studies, film formation science, comedogenicity interaction.

SCORING CRITERIA
Score
Criteria
5.0
Balanced occlusion appropriate for target skin type with effective moisture sealing
4.0–4.9
Good occlusion with minor heaviness/comedogenicity mismatch
3.0–3.9
Moderate mismatch between occlusion profile and stated skin type
2.0–2.9
Insufficient or excessive occlusion with meaningful compatibility concerns
1.0–1.9
Highly comedogenic primary occlusive without skin-type restriction

Interpretation Rule
High occlusion is appropriate for dry/mature skin.
Low occlusion is appropriate for oily skin.
Scoring reflects suitability to target skin type — NOT absolute occlusion intensity.

MOISTURE RETENTION STABILITY — ⭐X.X
Definition
Measures the formula’s ability to sustain hydration over hours and repeated long-term use under varying environmental conditions.
Scientific Basis
Multi-hour Corneometer studies, humidity-chamber testing, NMF trajectory, repeat-use barrier studies.

SCORING CRITERIA
Score
Criteria
5.0
Humectant + film-former + barrier-repair architecture producing durable multi-hour hydration with positive repeat-use trajectory
4.0–4.9
Strong retention system with balanced humectant/emollient/occlusive structure
3.0–3.9
Moderate short-duration hydration requiring some reapplication
2.0–2.9
Surface-level hydration with weak retention architecture
1.0–1.9
No meaningful retention mechanism; deceptive hydration claims or barrier-disruptive profile

Negative Modifier
High essential-oil terpene burden increasing TEWL → retention penalty.

LONG-TERM SKIN COMPATIBILITY — ⭐X.X
Definition
Measures expected safety and benefit trajectory during daily use over months, including sensitization, barrier stability, microbiome effects, phototoxicity, and comedogenic accumulation.
Scientific Basis
RIPT data, sensitization kinetics, cumulative irritation studies, repeat-use barrier evidence.

SCORING CRITERIA
Score
Criteria
5.0
Non-sensitizing, microbiome-compatible, non-comedogenic, photostable, barrier-supportive with positive long-term trajectory
4.0–4.9
Minimal long-term concern with no major accumulation risk
3.0–3.9
Moderate sensitization/comedogenicity/barrier-neutral concerns
2.0–2.9
Significant cumulative irritation, microbiome disruption, or compatibility concerns
1.0–1.9
High long-term risk from Tier D sensitizers or phototoxic leave-on exposure


KEY MODIFIERS
Negative
Daily essential-oil exposure → cumulative sensitization reduction
Phototoxic botanicals in daytime use → major reduction
High-comedogenic primary emollients → skin-type-specific reduction
Positive
Barrier-repair actives
Non-sensitizing architecture
Stable long-term compatibility profile

SPECIALIZED PERFORMANCE SCORE
Specialized Performance Score =averag of specilzed scores


LAYER 10 — FINAL RATING FORMULA
FINAL RATING
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)



HIGH-SCORE ELIGIBILITY CRITERIA (>4.0)
Required:
Complete moisturization architecture:
Functional humectant
Emollient
Occlusive
At least one Tier A or strong Tier B active at functional concentration/position
Barrier-repair support:
EFA-rich oil
OR
Ceramide source
OR
Oat/Centella/Niacinamide
Acid-mantle-compatible pH (≤7.0; ideally 4.5–6.0)
Adequate preservation for water-containing systems
Comedogenicity appropriate for stated skin type
Formulation Honesty ≥3.5
Low-to-moderate essential-oil sensitization burden
Genuine moisture-retention mechanism
Long-Term Skin Compatibility ≥3.5
Disqualifiers:
Tier D sensitizing botanicals
Category C actives used as primary hero claims
Uncertified phototoxic botanicals in daytime use
“Chemical-free” or pseudoscientific claims
Surface-hydration-only architecture without retention support
If elite score is denied:
→ explicitly state the structural reasons for failure.
OUTPUT FORMAT
⭐ FINAL RATING X.X / 5 — Rating Level
⚖ STRUCTURAL QUALITY
Evidence-based classification covering: moisturization mechanism completeness (humectant/emollient/occlusive balance), herbal active evidence tier (A/B/C/D) in leave-on format, pH compatibility with acid mantle, barrier repair architecture, preservation adequacy, comedogenicity profile, photostability for daytime use, sensitization risk profile from leave-on essential oils, and expected long-term skin outcome. Written in honest, accessible language without marketing bias.
🌿 HERBAL/ORGANIC PROFILE
Short functional description. Examples:
Evidence-Backed Botanical Moisturizer (Complete Architecture + Tier A Actives)
CFermented Botanical Moisturizer (Microbiome-Considerate Architecture)
Marketing-Heavy Botanical Moisturizer (Tier C Active Inflation)
Incomplete Architecture Moisturizer (Humectant-Deficient)
Phototoxic Botanical Daytime Moisturizer (Unsafe Daytime Application)
Balanced Herbal Emulsion (Evidence-Backed + Microbiome-Compatible)
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
🌱 HERBAL ACTIVE EVIDENCE ASSESSMENT (Leave-On Format)
Hero herbal ingredient(s): [list with individual evidence tier]
Evidence Tier: A / B / C / D for each
Leave-on efficacy: Full credit / Partial credit / Decorative only — for each
Herbal active inflation penalty: Applied / Not applicable
Overall herbal evidence quality: Strong / Moderate / Weak / Gimmick-grade
🌼 SENSITIZATION RISK ASSESSMENT
Essential oils present: [list with leave-on sensitization note for each]
Phototoxic botanicals: None / [list with risk note]
Tier D ingredients: None / [list]
Cumulative leave-on sensitizer burden: Low / Moderate / High / Very High
Daily use sensitization trajectory: Stable / Building Risk / High Risk
Patch test recommended: Yes / No
👍 STRENGTHS
Major evidence-supported structural advantage (with evidence tier noted)
Major evidence-supported structural advantage
Major evidence-supported structural advantage
⚠ CONCERNS
Major structural concern with brief scientific explanation
Major structural concern
Major structural concern
🔍 THE TRUTH ABOUT THE "NATURAL" CLAIMS
[2–4 concise sentences that respectfully but honestly separate verified claims from marketing mythology, specific to this product's actual claims. Address the biggest marketing claim vs. the actual science. Example: "Coconut oil is genuinely moisturizing — it is an effective occlusive and emollient — but its comedogenicity rating of 4 out of 5 makes it incompatible with oily and acne-prone skin despite aggressive 'nourishes all skin types' marketing. The turmeric extract, while a genuine anti-inflammatory in controlled studies, has poor skin penetration at its standard molecular weight — its inclusion here delivers a warm golden color and 'Ayurvedic' positioning more than a measurable skin benefit. The 'chemical-free' claim on the packaging is scientifically impossible — shea butter, aloe vera, rose water, and glycerin are all chemicals."]
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X
Oily Skin → ⭐X.X
Combination Skin → ⭐X.X
Sensitive Skin → ⭐X.X
Acne-Prone Skin → ⭐X.X
Mature/Aging Skin → ⭐X.X
Atopic/Eczema-Prone Skin → ⭐X.X
📅 LONG-TERM USABILITY
Daily AM Use → ⭐X.X
Daily PM Use → ⭐X.X
Twice Daily Use → ⭐X.X
Occasional/Seasonal Use → ⭐X.X
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (First 1–7 Applications)
Initial hydration feel — plump/dewy vs. greasy/tacky vs. dry post-application
Sensory experience of botanical/essential oil components
Skin finish — matte, satin, dewy, or greasy
Early sensitization signals to watch for (tingling, redness, contact urticaria)
Immediate comedogenicity signals (post-application congestion feeling)
Medium-Term (2–8 Weeks)
Barrier trajectory under repeated botanical exposure — improving or degrading
Comedone formation trajectory in acne-prone users
Sensitization signal monitoring with essential oil-heavy formulas
Active ingredient cumulative effects (if Tier A/B actives are present and stabilized)
Microbiome stability signals (increased breakouts, dysbiosis, or stable)
Photosensitization early signals if phototoxic botanicals present in daytime use
Long-Term (3–12+ Months)
Cumulative sensitization development risk from daily leave-on essential oils
Barrier resilience or deterioration under daily application
Comedogenic accumulation leading to enlarged pores or comedone formation
Photodamage from daily phototoxic botanical exposure (PIH, uneven tone)
NMF depletion or preservation under the formula's hydration system
Realistic dermatological outcome — stated without marketing language
Realistic Dermatological Outcome
One honest conclusion: What will this formula actually do for skin over 6–12 months of daily use, based on its moisturization architecture, herbal evidence tier, barrier repair capacity, sensitization profile, comedogenicity, and pH compatibility?
🔬 KEY STRUCTURAL INGREDIENTS
List only functionally dominant ingredients with:
Moisturization role (humectant / emollient / occlusive / barrier-active / sensory)
Herbal evidence tier (A/B/C/D) noted
Comedogenicity rating (0–5) noted for oils and butters
Leave-on efficacy category (Full / Partial / Decorative)
Sensitization risk noted for essential oils and Tier D ingredients
Photostability concern noted where relevant
Preservation system identified
🧠 WHY THIS RATING
4–6 concise evidence-based sentences covering:
Moisturization architecture completeness (humectant/emollient/occlusive balance)
Herbal active evidence quality and actual leave-on delivery realism
Barrier repair capacity assessment
pH compatibility with acid mantle
Sensitization risk profile from botanical/essential oil leave-on burden
Comedogenicity profile vs. target skin type
Photostability and daytime safety assessment
Preservation adequacy
Long-term use trajectory
📌 STRUCTURAL INSIGHT
Strengths:
Evidence-supported strength (with evidence basis)
Evidence-supported strength
Evidence-supported strength
Weaknesses:
Evidence-supported weakness (with evidence basis)
Evidence-supported weakness
Evidence-supported weakness
STRICT OUTPUT RULES
DONT DO MEDICAL CLAIMS
include harsh colorants,preservatives,frgrances in output
"Natural" label MUST NOT improve any score unless supported by evidence
"Organic" certification receives Eco Impact credit ONLY for verified third-party certification (COSMOS, BDIH, USDA) — never safety or efficacy credit
Traditional use MUST be distinguished from clinical evidence — every time
Essential oils MUST be evaluated for leave-on sensitization risk — not given automatic safety credit for being plant-derived
Comedogenicity of oils and butters MUST be assessed and disclosed — regardless of "natural nourishing" marketing
"Chemical-free" marketing claims MUST trigger Formulation Honesty penalty — mandatory
Preservation adequacy is a mandatory safety evaluation — never optional
Phototoxic botanicals MUST be flagged as daytime safety concerns regardless of concentration
The "Truth About Natural Claims" section is MANDATORY for all herbal/organic products
Formulation Honesty score MUST reflect the gap between marketing claims and evidence reality
Photostability assessment is MANDATORY for any moisturizer containing Tier D phototoxic botanicals or photolabile actives
Moisturization architecture incompleteness (missing humectant, emollient, or occlusive layer) MUST be reflected in Hydration Depth, Moisture Retention Stability, and Effectiveness scores
The output must educate and protect the user — not validate preference for organic products
Honest output that credits genuine herbal science while exposing herbal mythology is the goal
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
              "You are a strict herbal moisturizer structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "ORGANIC TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new OrganicEngine();