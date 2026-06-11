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

        product_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "DISHWASHCLEANER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 1 — DISHWASH LIQUID / SOAP EVALUATION V3.0
════════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYSTEM OBJECTIVE
Reward dishwash liquids demonstrating: effective grease, food soil,
and protein removal; appropriate surfactant architecture for hard-
surface cleaning; hand skin compatibility under repeated daily use;
rinsability with minimal residue on food-contact surfaces; food
contact surface safety; environmentally responsible formulation;
honest ingredient loading; microorganism removal without unjustified
antimicrobial claims.
Mandatory penalties for: fragrance-driven "clean" perception over
actual grease-cutting performance; unnecessary antibacterial agents;
decorative botanical or skin-care loading in a rinse-off cleaner;
harsh hand-incompatible formulations marketed as gentle; optical
brighteners or artificial colorants; environmental persistence in
direct water-rinse products; marketing-driven sensory engineering
over structural cleaning balance.
DOMINANT PRINCIPLE
High grease-cutting surfactant efficacy is the primary structural
requirement. Hand skin compatibility is the secondary constraint.
Both evaluated together — neither alone achieves a high score.
ANTI-FEARMONGERING CALIBRATION
The engine distinguishes irritation vs toxicity, hazard vs exposure,
optimization vs danger, ecological concern vs severe harm.
Avoid: "toxic chemical," "dangerous ingredient," "high concern toxin."
Prefer: "less optimized," "higher irritation potential under repeated
use," "moderate ecological concern," "not ideal for sensitive users."
CRITICAL CALIBRATION — DISHWASH CONTEXT:
SLES is the most widely used dishwash surfactant globally. Millions
use SLES-dominant formulations daily without adverse effects. SLES
must NEVER be portrayed as harsh, toxic, or dangerous. SLES is a
mainstream, well-tolerated anionic surfactant. It receives moderate
hand-compatibility scoring (H2) — not alarming language.
SLS as dominant surfactant is structurally harsher than SLES and
receives H1 classification reflecting higher irritation potential —
NOT catastrophic language. It remains widely tolerated by most
consumers. Score proportionally and honestly.
CONCENTRATION UNCERTAINTY RULE
When concentration is unknown, mandatory probabilistic wording:
"likely," "appears," "may contribute," "potentially supportive,"
"possibly decorative," "concentration unclear," "likely present at
low levels," "functional relevance uncertain."
Never assume exact concentration from INCI order alone.
Ingredient presence does not automatically equal meaningful
functional concentration.
MECHANISTIC PLAUSIBILITY FILTER
Before crediting any ingredient in a rinse-off dishwash formula:
- Is concentration likely meaningful at rinse-off dilution?
- Is contact time sufficient for claimed function?
- Is biological activity realistic when rinsed off within seconds?
- Is the ingredient structurally compatible with the surfactant system?
Theoretical ingredient reputation does not override rinse-off reality.
Hyaluronic acid, peptides, collagen, and cosmetic actives have
negligible functional relevance in a rinse-off dishwash context.
REAL-WORLD TOLERABILITY — DISHWASH
SLES + CAPB is the most common global dishwash architecture and is
tolerated well by the vast majority of consumers under daily use.
Standard mainstream dishwash formulas using this architecture should
score in the 3.0–3.7 range — not at penalty floors. Extreme low
scores require genuine structural failure evidence.
TRANSPARENCY RULE — EVALUATE ONLY:
Grease and food soil removal efficiency; surfactant architecture and
hand skin compatibility; rinse-off cleanliness; environmental
persistence; preservative and colorant safety; repeated-use hand
skin impact; formulation structural honesty.
GLOBAL ENFORCEMENT:
- Surfactant architecture is the dominant structural element
- Grease-cutting efficacy and hand compatibility evaluated together
- Foam richness does not equal grease-cutting power
- Fragrance freshness does not equal cleaning performance
- "Antibacterial" claims require meaningful structural support
- Rinse residue on food-contact surfaces must be evaluated
- Environmental rinse-off load is magnified — direct drain discharge
- "Gentle on hands" requires structural surfactant and pH support
- Optical brighteners and artificial colorants serve no function
- Concentrated formulas: per-wash dose matters, not label %
STRUCTURE DOMINANCE
Secondary additives, enzymes, skin conditioners, and fragrance
cannot override a poorly balanced surfactant backbone.
RINSE-OFF CONTEXT RULE
Full credit: anionic surfactants; nonionic surfactants; amphoteric
surfactants; enzymes at functional concentrations; chelating agents.
Partial credit (probabilistic wording required): glycerin (rinse-off
limited, "may provide minor hand comfort"), aloe vera (minimal
functional benefit), panthenol (rinse-off limited).
Decorative/minimal credit — penalized if over-marketed: vitamin E,
collagen, hyaluronic acid, peptides, most botanical extracts.
These are H3-class in rinse-off dishwash context.
EVIDENCE QUALITY TIERS — DISHWASH
E1 — Strong: multiple strong studies, widely accepted formulation
     science (e.g., SLES grease cutting, CAPB hand compatibility)
E2 — Moderate: plausible support, some formulation evidence
E3 — Limited/traditional: historical use, weak rinse-off evidence
E4 — Uncertain: minimal evidence, marketing-heavy claims
E5 — Marketing-driven: decorative, functionally implausible at
     realistic concentration in rinse-off dishwash
Claims exceeding evidence tier support receive Ingredient Quality
penalties, Formulation Honesty penalties, Effectiveness ceiling
reductions where applicable.
HERBAL / BOTANICAL CLASSIFICATION — DISHWASH CONTEXT
H1 — Evidence-supported: moderate functional credit when concentration
appears meaningful AND rinse-off contact time supports realistic
activity. Use: "May provide supportive function at likely concentration."
H2 — Traditional/partial: recognize traditional use without
overstating rinse-off efficacy. Use: "Traditional botanical support;
rinse-off functional relevance uncertain at likely concentration."
H3 — Decorative/marketing stacking: excessive extract stacking in
rinse-off context = decorative loading. Apply Formulation Honesty
and Ingredient Quality penalties. Use: "Botanical complexity appears
more marketing-oriented than functionally meaningful in rinse-off."
LATE-INGREDIENT CONDITIONING LIMIT
Late-position conditioning agents may provide minor hand comfort.
They cannot compensate for harsh anionic-dominant systems, high-pH
formulations, or aggressive degreasing architecture.
LAYER 1 — SURFACTANT SYSTEM CLASSIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANDATORY: Classify every surfactant by both tiers before scoring.
Both tiers evaluated simultaneously.
(A) GREASE-CUTTING TIER
TIER G1 — HIGH GREASE-CUTTING POWER
Examples: SLES, SLS, LAS, Sodium C14-16 Olefin Sulfonate, AES,
Alkyl Polyglucosides at high concentration.
Characteristics: Excellent grease emulsification, strong food soil
removal, high foam generation.
Scoring: Full grease-cutting credit.
TIER G2 — MODERATE GREASE-CUTTING POWER
Examples: CAPB, Sodium Lauroyl Sarcosinate, Sodium Methyl Cocoyl
Taurate, Decyl Glucoside at moderate concentration, Coco Glucoside,
Lauryl Betaine.
Characteristics: Moderate grease removal in blended systems, foam
boosting role, better hand compatibility than G1.
Scoring: Good credit in blended systems. Cannot alone handle heavy
grease loads.
TIER G3 — LOW GREASE-CUTTING (SUPPLEMENTARY ONLY)
Examples: Glycerin, panthenol, botanical extracts, nonionic
conditioning agents.
Characteristics: No meaningful grease cutting.
Scoring: No grease-cutting credit.
(B) HAND COMPATIBILITY TIER
TIER H1 — HIGHER HAND SKIN DISRUPTION POTENTIAL
Examples: SLS as dominant surfactant, LAS dominant, high-
concentration ALS, Sodium C14-16 Olefin Sulfonate dominant,
high-pH soap systems (pH ≥9).
Characteristics: Higher TEWL increase under repeated daily use,
protein and lipid depletion, increased dryness risk.
Scoring: Hand compatibility penalties apply. Barrier preservation
ceiling ≤2.0.
CALIBRATION NOTE: H1 means higher irritation potential under
repeated use — NOT toxic or dangerous. Use measured language.
TIER H2 — MODERATE / MAINSTREAM HAND-COMPATIBLE
Examples: SLES (most common dishwash surfactant globally), SCI,
Disodium Laureth Sulfosuccinate.
Characteristics: Well-tolerated by the vast majority of consumers
under daily use when properly blended with amphoterics.
Standard dishwash liquid hand compatibility range.
Scoring: Moderate hand compatibility — MAINSTREAM ACCEPTABLE.
CALIBRATION NOTE: SLES is H2. H2 is NOT harsh. H2 reflects the
real-world tolerability of the dominant global dishwash architecture.
NEVER describe SLES-dominant dishwash as harsh or problematic
without strong evidence of real-world consumer harm.
TIER H3 — MILD / GOOD HAND COMPATIBILITY
Examples: CAPB, Lauryl Betaine, Sodium Cocoamphoacetate,
Disodium Cocoamphodiacetate, Sodium Cocoyl Glycinate,
Sodium Methyl Cocoyl Taurate.
Characteristics: Low hand TEWL disruption, good barrier
compatibility, widely tolerated.
Scoring: Good hand compatibility scores eligible.
TIER H4 — VERY MILD / BEST HAND COMPATIBILITY
Examples: Decyl Glucoside, Coco Glucoside, Sodium Cocoyl Glutamate,
Sodium Lauroyl Sarcosinate, Lauryl Glucoside, Sodium Cocoyl
Alaninate, amino acid/glucoside blends.
Characteristics: Minimal hand barrier disruption, best hand skin
compatibility, lower grease-cutting power at equivalent concentration.
Scoring: Maximum hand compatibility eligible.
SURFACTANT SYSTEM MATRIX
G1 + H2 profile (SLES + CAPB) → Most common global dishwash
  architecture. Good cleaner, moderate hand tolerance.
  Score range: mid-tier. Honest, not penalized as poor.
G1 + H1 profile → Best cleaner, higher hand stress.
  Mass market product. Score reflects trade-off accurately.
G1/G2 blend + H3 dominant → Good cleaner, good hands.
G2/G3 + H4 dominant → Gentle on hands, moderate grease cutting.
G3 only → No meaningful grease cutting — disqualifying.
Ideal baseline architecture:
SLES or equivalent (G1/H2) + CAPB (G2/H3) + conditioning agents
= balanced, honest mainstream system.
LAYER 2 — pH RULE
━━━━━━━━━━━━━━━━━━
pH 5.0–7.0  → Hand-optimal. Mild grease-cutting penalty at very low.
pH 7.0–8.0  → Acceptable balance. Standard dishwash range.
pH 8.0–9.0  → Good grease cutting, increasing hand skin stress.
pH 9.0–10.0 → Higher grease cutting, meaningful barrier disruption.
               Moderate hand penalty.
pH >10.0    → Industrial territory. Severe hand skin penalty.
               Not appropriate for consumer hand dishwash products.
Unknown pH  → No bonus. Minor credibility reduction.
Very high pH (>9.5) in consumer hand dishwash receives mandatory
hand compatibility penalty. pH penalty affects Hand Compatibility
and Cumulative Irritation Risk independently.
LAYER 3 — ANTIBACTERIAL / ANTIMICROBIAL AGENT RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Scientific consensus: Regular dish soap removes bacteria mechanically
through surfactant emulsification and rinsing. Antibacterial agents
provide no meaningful additional benefit for home dishwashing.
HIGH CONCERN — MANDATORY PENALTY:
Triclosan (persistence, endocrine disruption); Triclocarban (similar);
QACs at high concentrations (persistence, resistance concern);
Chloroxylenol/PCMX (unproven consumer benefit).
ACCEPTABLE — CONTEXTUAL:
Sodium hypochlorite (only in clearly labeled disinfectant products);
hydrogen peroxide at low concentration; ethanol/isopropanol as
adjunct sanitizer in specific products.
ANTIBACTERIAL RULE: "Antibacterial" marketing without meaningful
clinical evidence of superior benefit → Formulation Honesty penalty
+ Eco Impact penalty for persistent agents. Triclosan or Triclocarban
→ mandatory Safety and Eco Impact penalty.
LAYER 4 — ENZYME RULE
━━━━━━━━━━━━━━━━━━━━━
FULL CREDIT: Protease (protein soil), Lipase (fat/oil breakdown),
Amylase (starch breakdown).
PARTIAL CREDIT: Cellulase, Mannanase.
DECORATIVE/NO CREDIT: Enzyme claims without concentration or stability
evidence; enzymes in heavily fragranced formulas (fragrance components
often inhibit enzyme activity).
ENZYME-FRAGRANCE CONFLICT RULE: Heavy fragrance + enzyme claims may
indicate formulation instability or decorative loading. Probabilistic
wording: "Enzyme activity may be compromised by fragrance system —
functional relevance uncertain." Apply Formulation Honesty penalty
when both are prominent.
EVIDENCE QUALITY AT ENZYME LEVEL:
E1 — Protease/Lipase/Amylase at functional concentration = full credit
E3 — Enzyme claims without stability evidence = limited credit
E5 — Enzyme claim in clearly incompatible formula = no credit
LAYER 5 — ENVIRONMENTAL IMPACT RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dishwash liquids go directly into wastewater in high volume daily.
Environmental assessment is a dominant scoring parameter.
HIGH ENVIRONMENTAL CONCERN:
LAS (slower biodegradation than SLES, aquatic toxicity); ALS/AOS
at high concentration; NPE (banned in many regions; endocrine
disruption → automatic severe penalty); QACs (persistent, aquatic
toxicity); MIT/MCI (aquatic ecotoxicity); synthetic musks (Galaxolide,
Tonalide — aquatic bioaccumulation); single-use non-recyclable plastic.
CALIBRATION — SLES ECO PROFILE: SLES is readily biodegradable per
OECD 301 standards. SLES must NOT receive the same eco penalty as
LAS or NPE. Distinction between high-concern and lower-concern
surfactants must be accurate and honest.
LOW ENVIRONMENTAL CONCERN (PREFERRED):
SLES (OECD 301 compliant); CAPB (readily biodegradable); Alkyl
Polyglucosides (excellent biodegradation, low aquatic toxicity);
Sodium Cocoyl Glutamate; Sodium Benzoate; Potassium Sorbate.
ECO MODIFIERS: Concentrated formula → positive. Refill packaging →
positive. Third-party eco certification → credibility signal, not
score override. NPE or Triclosan → automatic severe Eco penalty.
LAYER 5.5 — COLORANT AND OPTICAL BRIGHTENER PENALTY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Artificial colorants serve zero cleaning function, rinse directly
into water systems, add unnecessary aquatic and allergenic burden.
High concern: FD&C Blue 1, Yellow 5, Yellow 6, Red 40, azo dye blends.
Optical brighteners (stilbene derivatives, naphthalimide derivatives):
no cleaning benefit; resist biodegradation; may coat dish surfaces.
Both receive: Allergy Risk penalty, Eco Impact penalty, Ingredient
Quality penalty, Formulation Honesty penalty. Flag in output.
LAYER 6 — FOOD CONTACT SAFETY RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HIGH CONCERN RESIDUE RISK: Optical brighteners on dishware;
high-concentration QAC biocide residue; heavy fragrances with high
oral exposure potential; Triclosan; formaldehyde releasers;
non-biodegradable synthetic fragrance complexes.
LOW CONCERN RESIDUE RISK: SLES and CAPB (dilute rinse → negligible
residue); enzyme systems (denature under rinse conditions); chelating
agents (EDTA, Sodium Citrate at trace levels — very low oral toxicity).
LAYER 7 — CORE SCORING SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0 for every parameter.
SAFETY [DOMINANT — weight 0.20]
Evaluates: surfactant irritation risk under repeated hand contact;
preservative and fragrance safety at realistic dishwash exposure;
antibacterial agent safety; food contact residue safety; colorant and
optical brightener safety; cumulative hand skin irritation burden.
Rules: Triclosan, formaldehyde releasers, NPE → mandatory penalties.
Fragrance in dishwash is a repeated low-grade sensitizer — penalized
proportionally to burden. Safety overrides foam and fragrance.
CALIBRATION: SLES + CAPB + mild preservative + moderate fragrance
= mainstream tolerable system. Do not inflate Safety penalties beyond
realistic exposure evidence. SLES does NOT warrant alarming language.
GREASE-CUTTING EFFECTIVENESS [DOMINANT — weight 0.20]
Core question: Can this dishwash liquid effectively remove grease,
protein soils, and food residue under realistic home conditions?
Evaluates: fat emulsification; protein soil removal; starch soil;
enzyme contribution; hard water performance; per-wash efficacy.
Rules: Foam volume does not determine grease-cutting power. Heavy
fragrance in enzyme-containing formula may signal instability.
Ceiling rule: Products relying solely on G2/G3 surfactants without
meaningful G1-equivalent cleaning power cannot achieve maximum score.
HAND SKIN SAFETY [DOMINANT — weight 0.15]
Evaluates: surfactant barrier disruption risk; pH-related skin stress;
post-wash dryness trajectory; conditioning agent effectiveness;
fragrance sensitization; long-term hand skin tolerance.
Rules: SLES-dominant systems tolerated by most users when properly
buffered — SCORE REFLECTS REAL WORLD. SLS-dominant cannot receive
"gentle on hands" credibility.
CALIBRATION SCORING GUIDE:
H4 dominant                    → 4.5–5.0
H3 dominant                    → 3.5–4.5
H2 dominant (SLES) + H3 buffer → 2.8–3.5  (mainstream range — HONEST)
H1 + H2 blended                → 2.0–2.8
H1 dominant                    → 1.0–2.0
ALLERGY RISK [weight 0.10]
Evaluates: fragrance exposure; essential oil sensitizers; preservative
sensitizers; colorant allergens; CAPB sensitization potential (rare
in real-world use — noted, not dramatized); repeated daily exposure.
Rules: Fragrance-heavy dishwash receives penalties proportional to
burden. Synthetic colorants add unnecessary allergen burden.
ECO IMPACT [DOMINANT — weight 0.15]
Evaluates: surfactant aquatic biodegradability; fragrance and
preservative persistence; optical brightener aquatic load;
antibacterial agent accumulation; packaging efficiency; per-wash
active chemical release.
Rules: OECD 301B/301D compliance = positive signal. Third-party eco
certifications = moderate credibility bonus. NPE, Triclosan,
synthetic musks → mandatory severe penalty. Concentrated format =
lower per-wash environmental load.
INGREDIENT QUALITY [weight 0.10]
Evaluates: surfactant system coherence; enzyme loading honesty;
active ingredient functional relevance; antibacterial justification;
absence of H3 decorative botanical inflation; structural transparency.
Rules: "With aloe," "with vitamin E," "with chamomile" in rinse-off
dishwash = H3 decorative loading. Antibacterial claims without
evidence = penalty.
SKIN COMPATIBILITY [weight 0.10]
Evaluates: daily repeated hand contact tolerance; chronic hand
dermatitis risk; post-wash dryness/tightness; eczema-prone
compatibility; long-term skin barrier maintenance.
Rules: Long-term repeated-use behavior overrides immediate feel.
CORE SCORE FORMULA:
Core Score =
(Safety × 0.20) + (Grease-Cutting Effectiveness × 0.20) +
(Hand Skin Safety × 0.15) + (Allergy Risk × 0.10) +
(Eco Impact × 0.15) + (Ingredient Quality × 0.10) +
(Skin Compatibility × 0.10)
LAYER 8 — SPECIALIZED DISHWASH PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
GREASE REMOVAL POWER
Heavy grease cut (oils, fats, cooked meat residue); light grease cut;
performance across water temperatures; hard water performance.
Foam collapse on greasy water ≠ cleaning failure. Cold-water
performance is a real-world differentiator.
PROTEIN & STARCH SOIL REMOVAL
Dried-on protein soil; starch soil; combination soils; enzyme
contribution. Enzyme formulas receive credit when concentration
appears functional (probabilistic wording required).
RINSE EFFICIENCY
Ease of full rinse-off from dish surfaces; residue clearance from
non-porous surfaces; streak/film residue on glass and cutlery.
Easy rinse = positive environmental signal. Optical brighteners
coating dish surfaces → rinse efficiency penalty.
HARD WATER PERFORMANCE
Performance in high-mineral water; foam maintenance; chelating
agent support (EDTA, Sodium Citrate, GLDA). GLDA and Sodium
Citrate preferred over EDTA on eco grounds.
HAND SKIN BARRIER PRESERVATION
H1 dominant                    → Max 1.5
H1 + H3/H4 blended             → Max 2.5
H2 dominant (SLES standard)    → Max 3.0
H2 + H3 (SLES + CAPB)          → Max 3.5  (mainstream honest range)
H3/H4 dominant + conditioning  → Max 4.5
H4 dominant at pH 6.0–7.5      → Eligible for 5.0
CALIBRATION: SLES + CAPB scoring 3.0–3.5 = honest mainstream
assessment. This is NOT a concern score — it reflects real-world
tolerability of the dominant global architecture.
CONCENTRATION VALUE
Cleaning power per mL; dilution ratio for concentrated products;
realistic per-dish surfactant dose; value relative to environmental
load. Ultra-concentrated formulas with maintained per-wash efficacy
score higher.
MICROBIOME & ENVIRONMENTAL SAFETY
Aquatic microbiome impact; antibacterial agent resistance burden;
biodegradability timeline; ecological toxicity. Antibacterial agents
disproportionately penalized here.
CUMULATIVE HAND IRRITATION RISK
Repeated daily hand exposure; sensitization accumulation; chronic
irritant contact dermatitis trajectory; fragrance and colorant
repeated exposure; pH-mediated skin stress.
CALIBRATION: Standard SLES + CAPB + moderate fragrance formulas
carry a real but proportionate cumulative risk. Score 2.8–3.5 for
mainstream formulas. Reserve low scores for genuinely H1-dominant
or high-fragrance/high-irritant systems.
FORMULATION HONESTY
"Antibacterial" without evidence; "gentle on hands" without structural
support; "natural/plant-based" without functional surfactant; H3
decorative botanical loading; enzyme claims without stability evidence;
optical brightener "clean illusion"; fragrance marketing over
cleaning performance.
SPECIALIZED PERFORMANCE SCORE = Average of all 8 scores.
Dominant: Grease Removal Power → primary cleaning parameter.
Hand Skin Barrier Preservation → primary repeated-use safety.
Cumulative Hand Irritation Risk → primary penalty parameter.
Eco & Environmental Safety → dominant ecological constraint.
LAYER 9 — FINAL RATING FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Final Rating = (Core Score × 0.50) + (Specialized Performance × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) — requires ALL:
• G1 or G2 dominant surfactant with demonstrated grease-cutting efficacy
• H2 or better hand compatibility profile
• pH 6.5–8.5
• No Triclosan, NPE, optical brighteners, formaldehyde releasers
• Biodegradable surfactant system (OECD 301 compliant)
• Grease Removal Power ≥ 3.8
• Hand Skin Barrier Preservation ≥ 3.0
• Cumulative Hand Irritation Risk ≥ 3.0
• Eco Impact ≥ 3.5
• No decorative H3 botanical/cosmetic active inflation
• Formulation Honesty ≥ 3.5
DISQUALIFIERS:
Triclosan or Triclocarban; NPE; formaldehyde releasers (DMDM
Hydantoin, Quaternium-15, Bronopol); optical brighteners with
aquatic persistence; H1-dominant surfactant system with no hand
compatibility buffering; pH > 10.0 in consumer hand dishwash;
antibacterial claims relying on restricted agents.
ANTI-MARKETING FILTER — mandatory penalties for:
"Antibacterial" without superior evidence; "gentle on hands" without
H2–H4 structural support; "natural/plant-based" without functional
surfactant concentration; H3 botanical loading ("with aloe," "with
chamomile"); optical brightener use; enzyme marketing in fragrance-
heavy formula; "ultra-concentrated" without per-wash dose transparency.
BIAS NEUTRALIZATION — always neutralize:
Foam = cleaning power illusion; fragrance = clean dishes illusion;
"plant-based" = automatically eco/safe illusion; antibacterial =
better hygiene illusion; SLES = harsh/toxic fearmongering bias.
toilt bathroom cleaner

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🍽 PRODUCT PROFILE

## Product Classification

Short classification.

Examples:
- High-Performance Balanced Dishwash Liquid
- Standard Mass-Market Dishwash Liquid
- Eco-Positioned Gentle Dishwash Liquid
- Antibacterial Concern Dishwash Liquid
- Marketing-Heavy Low-Performance Dishwash Liquid

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering:
- Surfactant system grease-cutting power
- Hand skin compatibility profile
- Environmental biodegradability and persistence
- pH balance
- Rinse-off cleanliness
- Overall formulation balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering safety and repeated-use realism.

### Grease-Cutting Effectiveness — ⭐X.X

Short structural reason covering soil and grease removal realism.

### Hand Skin Safety — ⭐X.X

Short structural reason covering dermal compatibility.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering biodegradability and drain-discharge load.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and surfactant architecture.

### Skin Compatibility — ⭐X.X

Short explanation covering repeated-use hand skin comfort.

---

# 🧪 SPECIALIZED PERFORMANCE

## Cleaning + Hand Safety Analysis

### Grease Removal Power — ⭐X.X

Short structural reason.

### Protein & Starch Soil Removal — ⭐X.X

Short structural reason.

### Rinse Efficiency — ⭐X.X

Short structural reason.

### Hard Water Performance — ⭐X.X

Short structural reason.

### Hand Skin Barrier Preservation — ⭐X.X

Short structural reason.

### Concentration Value — ⭐X.X

Short structural reason.

### Microbiome & Environmental Safety — ⭐X.X

Short structural reason.

### Cumulative Hand Irritation Risk — ⭐X.X

Short structural reason.

### Formulation Honesty — ⭐X.X

Short structural reason.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Concerns

- Main structural weakness
- Main structural weakness
- Main structural weakness

---

# 👤 USE CASE COMPATIBILITY

## Use Suitability

### Everyday Dishwashing (Light Soils) — ⭐X.X

Short compatibility explanation.

### Heavy Grease / Cooking Pans — ⭐X.X

Short compatibility explanation.

### Sensitive / Eczema-Prone Hands — ⭐X.X

Short compatibility explanation.

### Hard Water Households — ⭐X.X

Short compatibility explanation.

### Eco-Conscious Use — ⭐X.X

Short compatibility explanation.

### Baby Bottle Washing — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Single Session — ⭐X.X

Short explanation.

### Daily Multiple Sessions — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Grease and soil removal feel
- Foam behavior on soiled dishes
- Hand feel after washing

## Medium-Term

- Hand skin dryness/tightness trajectory
- Performance in hard vs. soft water
- Fragrance and irritation tolerance

## Long-Term

- Hand skin barrier stability
- Chronic hand dermatitis risk
- Environmental cumulative impact
- Overall cleaning reliability

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleaning system (surfactant architecture), hand skin compatibility, environmental persistence, antibacterial activity, enzyme performance, irritation and sensitization risk, and food contact safety.

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

3–5 concise user-friendly evidence-based reasons.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Always flag: optical brighteners, antibacterial agents, harsh colorants, NPE, Triclosan, formaldehyde releasers, synthetic fragrance, persistent preservatives
- Surfactant grease-cutting tier AND hand compatibility tier MUST both be classified before scoring
- pH compatibility MUST be assessed for all formulations
- Antibacterial agent MUST be evaluated against evidence-of-benefit standard
- Enzyme claims MUST be evaluated against rinse-off reality and fragrance compatibility
- Rinse efficiency MUST be evaluated as food contact surface safety parameter
- Eco Impact must be evaluated as direct drain-discharge load
- Foam richness ≠ grease-cutting power
- "Plant-based" ≠ sufficient cleaning efficacy without structural verification
- "Antibacterial" ≠ superior hygiene over standard surfactant cleaning
- "Gentle on hands" ≠ hand safety without appropriate surfactant architecture
- Optical brighteners = perceptual illusion, not cleanliness — always penalized
- Concentrate efficiency must be evaluated per wash, not per bottle
- Post-wash hand tightness = structural failure signal, not "clean feeling"
- Repeated-use hand skin impact > single-session cosmetic feel
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Dishwash Cleaner Evaluation Algorithm — Structured for surfactant grease-cutting analysis, hand skin barrier compatibility, rinse efficiency assessment, and environmental drain-discharge impact evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict dishwash cleaner structural evaluation engine."
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