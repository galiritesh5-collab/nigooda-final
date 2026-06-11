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

        bodycare_type:
          "CLINICAL",

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
ALGORITHM 1 — BODY WASH & SOAP EVALUATION ENGINE  |  Version 3.0
================================================================================
Scientific Anchors: Fluhr et al. (2001), Ananthapadmanabhan et al. (2004),
Draelos (2010), Corazza et al. (2010), Schmid-Wendtner & Korting (2006),
Grice & Segre (2011), Elias (2012).
────────────────────────────────────────────────────────────────────────────────
ALGORITHM 1 — MANDATORY SCORING & EVALUATION RULES
(Self-contained; no external global rules section required)
────────────────────────────────────────────────────────────────────────────────
Universal Scoring Principles
- NO MEDICAL CLAIMS anywhere in output — describe structural characteristics and
  evidence-based functional properties only
- No marketing influence on scoring — brand reputation, price, luxury positioning,
  and packaging claims are excluded from all calculations
- Structural and safety weakness overrides cosmetic elegance and sensory satisfaction
- Repeated chronic-use behavior takes priority over single-application feel
- Long-term skin outcome takes priority over immediate sensation
- Post-application burning, stinging, or persistent irritation = structural failure
  signal — never interpret as "tingle = working"
- Fragrance freshness does not equal cleansing performance
- Natural/botanical/organic positioning does not automatically confer safety —
  evaluate structural chemistry regardless of sourcing narrative
- Ingredient count does not indicate quality — evaluate architecture coherence
Algorithm-Specific Mandatory Rules — Body Wash & Soap
- Surfactant harshness tier MUST be classified before scoring begins
- Rinse-off active efficacy MUST be classified — no full credit for vitamin C,
  collagen, or peptides in rinse-off context
- Microbiome disruption selectivity MUST be assessed for any antimicrobial claims
- "Natural soap" ≠ pH-neutral — traditional soap systems receive full barrier
  disruption and irritation penalties through harshness and repeated-use evidence,
  not pH language
- Microbiome-balancing claims require: Tier 3 or 4 primary surfactant, absence of
  broad-spectrum antimicrobials, and controlled fragrance load — all required or
  Formulation Honesty penalty applies
Bias Neutralisation — Body Wash & Soap
- Fragrance = cleanliness illusion — actively neutralise
- "Natural" = safe automatic assumption — evaluate structural chemistry regardless
- Tightness/dryness after washing = effective deep cleansing illusion — it is barrier
  disruption
- Foam richness = cleansing power illusion — foam correlates with surfactant type,
  not cleansing efficacy
- Botanical richness = formulation quality illusion
- Ingredient-count quality illusion — more ingredients ≠ better formulation
- "Dermatologist-tested" = clinical strength illusion without structural merit
- Stinging = product working illusion — it is irritation
Fragrance Concentration Confidence Logic (R3)
- INCI order alone cannot reliably determine exact allergen concentration
- Heavy fragrance penalties require multiple convergent indicators: top-5 INCI
  placement, multiple listed allergens, parfum-heavy architecture, fragrance-forward
  positioning, leave-on exposure, IFRA-sensitive zones, sensory-dominant architecture
- When concentration certainty is low: apply moderate or contextual penalties; use
  "Potential sensitization concern" language
- Rinse-off context mitigates (but does not eliminate) sensitization risk
- IFRA Category 6 limits are the reference for rinse-off body products
Essential Oil Risk Calibration (R2)
- Presence of an essential oil alone does not automatically indicate clinically
  significant sensitization risk in rinse-off context
- Trace-level essential oils in rinse-off systems: mild or contextual concern only,
  unless additional sensitization indicators exist
- Strong penalties require high-position loading, multiple sensitizers stacked, or
  phototoxic oils at meaningful concentration
- Phototoxicity flags mandatory for furocoumarin-rich oils (bergamot, lime peel,
  angelica) regardless of rinse-off status
- Oxidation-prone essential oil blends without stabilisation evidence: maintained
  concern flag; not automatically worst-case
Colorant Hazard Language (R1)
- Azo dye penalties are retained but classified as "mechanistic and precautionary
  toxicology concern" — not as established high-risk cosmetic dermal toxicity
- Mechanistic plausibility alone does not justify maximum penalties without exposure
  realism and concentration plausibility
────────────────────────────────────────────────────────────────────────────────
LAYER 0 — FOUNDATION ENGINE & SYSTEM OBJECTIVE
────────────────────────────────────────────────────────────────────────────────
Reward body washes and soaps that demonstrate:
- Effective cleansing with minimal stratum corneum lipid depletion and protein
  denaturation
- Surfactant architecture calibrated to maintain physiological skin barrier function
  (TEWL ≤ baseline + 20% post-wash)
- Microbiome-compatible cleansing that does not cause broad-spectrum commensal
  disruption
- Evidence-based active and botanical deployment with realistic rinse-off
  concentration credit
- Low cumulative irritation and sensitization risk under repeated daily or
  twice-daily use
- Transparent ingredient architecture free from marketing-driven active inflation
Mandatory penalties apply for:
- SLS-first or soap-base formulations without significant barrier mitigation
- Traditional soap and high-alkalinity cleansing architectures creating prolonged
  barrier disruption (expressed through harshness and irritation evidence, not pH
  language)
- Heavy fragrance loading as primary sensory architecture — sensitization without
  cleansing benefit
- Decorative botanical loading (low-evidence) presented as functional actives
- Antimicrobial claims using broad-spectrum agents (triclosan, chlorhexidine) without
  clinical justification
- Active inflation: rinse-off vitamin C, collagen, peptides marketed as therapeutic
- Microbiome-balancing claims without supporting surfactant or prebiotic architecture
▸ Basic foam and lather alone cannot achieve high scores.
▸ Sensory cleansing experience does not override structural barrier chemistry.
TRANSPARENCY PRIORITY RULE
Evaluate only:
- Surfactant architecture and harshness classification (primary structural determinant)
- Rinse-off active ingredient efficacy realism
- Fragrance and sensitizer burden relative to IFRA Category 6 thresholds
- Preservative safety in rinse-off context
- Microbiome disruption selectivity
- Structural formulation honesty
Ignore: Brand positioning, foam perception, "natural/organic" labelling, luxury
fragrance experience, ingredient-count inflation, dermatologist-tested claims without
structural merit.
────────────────────────────────────────────────────────────────────────────────
LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM
────────────────────────────────────────────────────────────────────────────────
MANDATORY: All primary surfactants must be classified by harshness tier before any
scoring begins. The primary surfactant is the dominant structural determinant of all
core and specialized scores.
Scientific Basis for Tier Classification
Tier classification is anchored to: zein solubilisation index (ZSI) quantifying
protein denaturation potential; TEWL increase data from controlled wash studies;
corneometry (skin hydration) loss data; and erythema/irritation index from
repeated-insult patch tests (RIPT). SLS is the reference standard at ZSI = 100 and
maximum TEWL increase of ~8-12 g/m2/h post-wash (Ananthapadmanabhan et al. 2004).
TIER 1 — HARSH SURFACTANTS (ZSI > 50; TEWL increase > 6 g/m2/h)
Examples: Sodium Lauryl Sulfate (SLS), Ammonium Lauryl Sulfate (ALS), Sodium C14-16
Olefin Sulfonate, TEA-Lauryl Sulfate. Also: traditional soap systems (saponified
fatty acid anion systems) — classified harsh via barrier disruption and irritation
trajectory evidence.
Mechanism: Monomer penetration into stratum corneum intercellular lipid bilayers;
protein denaturation of filaggrin and keratin; disruption of ceramide-fatty
acid-cholesterol trilayer organisation; barrier enzyme suppression impairing barrier
recovery (Elias 2012). Traditional soap architecture: repeated-use barrier disruption
and irritation potential well-documented independent of any pH consideration.
Scoring Impact:
- Mandatory Safety penalty — floor at 2.0
- Barrier Preservation ceiling: 2.0
- Microbiome Compatibility ceiling: 2.5
- Elevated Cumulative Irritation Risk — cannot achieve ≥ 4.0
- Any "gentle" or "sensitive skin" marketing claim triggers Formulation Honesty
  penalty
TIER 2 — MODERATE SURFACTANTS (ZSI 15-50; TEWL increase 3-6 g/m2/h)
Examples: Sodium Laureth Sulfate (SLES) at standard concentrations (10-15%), Sodium
Lauroyl Methyl Isethionate (SLMI), Sodium Lauroyl Isethionate (SLI), Disodium
Laureth Sulfosuccinate. Also: SLES in high-concentration primary positions (>15%).
Mechanism: Lower monomer activity than SLS; ether sulfate group reduces protein
binding; still causes measurable lipid depletion under daily repeated use. SLES-only
formulations can achieve acceptable barrier outcomes when combined with Tier 3/4
co-surfactants (Rhein et al. 1994).
Scoring Impact:
- Moderate Safety penalty — floor at 2.8
- Barrier Preservation ceiling: 3.0 (sole Tier 2); can rise to 3.5 with Tier 3/4
  secondary co-surfactants
- Eligible for moderate Microbiome Compatibility scores
- No high-score eligibility without significant blending upgrade
TIER 3 — MILD SURFACTANTS (ZSI 5-15; TEWL increase 1-3 g/m2/h)
Examples: Cocamidopropyl Betaine (CAPB), Sodium Cocoamphoacetate, Disodium
Cocoamphodiacetate, Sodium Lauroyl Sarcosinate, Sodium Cocoyl Glycinate. Blended
SLES + CAPB systems.
Mechanism: Zwitterionic or anionic-mild chemistry with reduced monomer activity;
demonstrated lower TEWL in comparison wash studies; substantive deposition on skin
surface reduces net lipid loss (Fluhr et al. 2001).
Scoring Impact:
- Eligible for good Safety scores (up to 4.0)
- Barrier Preservation ceiling: 4.0
- Eligible for Microbiome Compatibility scores up to 3.8
- High score eligibility possible with Tier 4 co-surfactant blending
TIER 4 — VERY MILD SURFACTANTS (ZSI < 5; TEWL increase < 1 g/m2/h)
Examples: Decyl Glucoside, Coco Glucoside, Lauryl Glucoside, Sodium Cocoyl
Glutamate, Sodium Lauroyl Glutamate, Sodium Cocoyl Apple Amino Acids, Sodium
Cocoyl Alaninate, Potassium Cocoyl Glycinate.
Mechanism: Non-ionic glucoside and anionic amino acid surfactants demonstrate minimal
protein denaturation; glucosides derived from glucose and fatty alcohols are fully
biodegradable; amino acid-based surfactants mimic NMF components for surface
compatibility. TEWL data confirms minimal disruption even under repeated wash models
(Draelos 2010).
Scoring Impact:
- Eligible for maximum Safety scores (4.5-5.0)
- Barrier Preservation ceiling: 4.5-5.0 depending on formulation completeness
- Eligible for maximum Microbiome Compatibility scores
- Transparency bonus eligible
Surfactant System Classification Rules
System Composition                                    Classification        Barrier Ceiling
Harsh primary surfactant alone                        Harsh                 2.0
Harsh primary + mild/very mild co-surfactant          Moderate-Harsh        2.5
Traditional soap architecture                         Harsh                 2.0
Moderate primary surfactant alone                     Moderate              3.0
Moderate + mild co-surfactant (>=30% of load)         Moderate-Mild         3.5
Mild primary alone                                    Mild                  4.0
Mild + very mild co-surfactant                        Mild-Very Mild        4.2
Very mild dominant                                    Very Mild             4.5-5.0
OUTPUT NOTE: Do not use tier number labels (Tier 1, Tier 2, etc.) in consumer-
facing output. Translate as: "harsh surfactant blend," "moderate surfactant system,"
"mild surfactant blend," "very mild amino acid or glucoside surfactant system," etc.
────────────────────────────────────────────────────────────────────────────────
LAYER 2 — HERBAL & BOTANICAL EVALUATION SYSTEM
────────────────────────────────────────────────────────────────────────────────
Herbal and botanical ingredients must be evaluated against a four-tier evidence
hierarchy. Botanical complexity without structural relevance is penalised.
Scientifically coherent herbal systems within appropriate formulation architecture
receive contextual credit.
CATEGORY H1 — Evidence-Supported Functional Botanicals (Evidence Tier I-II)
Examples: Colloidal Oatmeal (FDA monograph Category I skin protectant; RCT evidence
in atopic dermatitis — Reynertson et al. 2015), Centella Asiatica (controlled clinical
studies for wound healing and barrier support — Bylka et al. 2014), Aloe Vera
(controlled clinical evidence for wound and skin soothing — Surjushe et al. 2008),
Green Tea Polyphenols (EGCG; in-vitro and clinical anti-inflammatory evidence —
Katiyar 2011), Bisabolol (anti-inflammatory; clinical studies in irritant contact
dermatitis), Calendula (RCT evidence in radiodermatitis — Pommier et al. 2004).
Evaluation Logic in Rinse-off Context:
- Concentration must appear meaningful relative to known effective concentrations —
  colloidal oatmeal ≥1% for skin protectant function; aloe vera ≥10% for meaningful
  anti-inflammatory activity
- Surfactant architecture must be compatible — harsh surfactants negate H1 benefit
- Rinse-off exposure limits achievable benefit — anti-inflammatory support and mild
  barrier buffering are plausible; regenerative or medicinal claims are not
CATEGORY H2 — Traditional / Partial-Evidence Botanicals (Evidence Tier II-III)
Examples: Turmeric/Curcumin, Neem, Tulsi/Holy Basil, Reetha, Shikakai, Hibiscus,
Rice Water, Fenugreek, Sandalwood, Vetiver.
Credit Rules:
- Traditional cleansing history and mild soothing plausibility receive contextual
  credit
- No strong clinical assumption for rinse-off therapeutic activity
- No detoxifying, antibacterial, or disease-treatment claims
- Cultural and traditional relevance acknowledged without scientific overstating
CATEGORY H3 — Marketing/Decorative Botanical Loading (Evidence Tier IV)
Trigger Conditions: 10+ botanical extracts stacked in late INCI positions; exotic
superfood ingredients without body-wash evidence; collagen, vitamin C, stem cell
extract, or peptide active claims in rinse-off cleansers.
Apply: Formulation Honesty penalty (-0.3 to -0.5), Ingredient Quality reduction.
Essential Oil Realism Rule — Calibrated (R2 Applied)
Natural fragrance does not automatically mean safe. Essential oils must be evaluated
for sensitization potential, phototoxicity, oxidation risk, and concentration realism.
- Sensitization potential: linalool, limonene, geraniol, eugenol, citral are EU 26
  listed contact allergens; concern requires context (concentration, exposure, stacking)
- Phototoxicity: bergapten in bergamot, psoralens in lime peel, angelicin in angelica —
  mandatory phototoxicity flag for leave-on or body use in sunlight exposure contexts
  regardless of concentration confidence
- Oxidation: air-exposed essential oils containing linalool and limonene generate
  hydroperoxide sensitizers — concern noted when storage conditions are undisclosed
- Concentration realism (R2): trace-level essential oils in rinse-off receive mild or
  contextual concern only; strong sensitization penalties require high-position loading,
  stacked sensitizers, or compounding factors
- IFRA Category 6 compliant dilutions in rinse-off context receive moderate or
  contextual concern weighting, not maximum-risk penalty
▸ Natural fragrance ≠ safe. Essential oils are among the leading causes of contact
  dermatitis in body care products. Calibrated concern — not dismissed concern.
────────────────────────────────────────────────────────────────────────────────
LAYER 3 — MICROBIOME COMPATIBILITY RULE
────────────────────────────────────────────────────────────────────────────────
Skin microbiome disruption from body cleansing must be assessed on four axes:
spectrum breadth, concentration-dependence, mechanism (bacteriostatic vs
bactericidal), and recovery kinetics.
The body skin microbiome (Staphylococcus epidermidis, Cutibacterium acnes,
Corynebacterium spp., Malassezia) provides colonisation resistance, barrier support,
and immune modulation. Disruption creates ecological vacuums that opportunistic
pathogens exploit.
Microbiome Disruption Risk Classification
- HIGH DISRUPTION: Triclosan (pan-antibacterial; FDA OTC monograph withdrawn 2016),
  Chlorhexidine (broad-spectrum cationic; recovery ≥48h), Benzalkonium Chloride,
  Strong antimicrobial essential oils at high concentrations (tea tree >1%
  leave-on equivalent)
- MODERATE DISRUPTION: Harsh anionic surfactants (indirect via barrier disruption);
  High-alcohol systems (>20%); Traditional soap architecture (barrier disruption and
  microbiome destabilisation through repeated-use irritation pathway)
- LOW DISRUPTION: Mild/very mild surfactants; Targeted low-level zinc
  (bacteriostatic for Malassezia only); Prebiotic/postbiotic ingredients
Microbiome Claim Validation Rule
Products claiming "microbiome-balancing," "microbiome-safe," "prebiotic," or
"probiotic" cleansing MUST demonstrate ALL of the following or receive Formulation
Honesty penalty:
- Mild or very mild primary surfactant architecture
- Absence of broad-spectrum antimicrobials
- Fragrance load within moderate bounds (not top-5 INCI position)
────────────────────────────────────────────────────────────────────────────────
LAYER 4 — FRAGRANCE, PRESERVATIVE & SENSITIZER RISK
────────────────────────────────────────────────────────────────────────────────
Fragrance Risk — IFRA Calibration with Concentration Confidence Logic (R3 Applied)
Fragrance sensitization in body wash is assessed relative to IFRA Category 6 limits
(rinse-off, body). Fragrance burden must be assessed with concentration confidence
weighting — INCI position alone cannot confirm allergen concentration.
Key Allergens and IFRA Category 6 Reference Limits:
Allergen              IFRA Cat.6 Limit    Sensitization Risk
Linalool              ~80%                MODERATE-HIGH when oxidised; contextual
                                          concern when trace-level rinse-off
Limonene              ~80%                MODERATE-HIGH when oxidised; contextual
                                          concern when trace-level rinse-off
Geraniol              ~80%                MODERATE; concentration-dependent
Eugenol               ~0.5%              HIGH — low threshold; stronger concern
Isoeugenol            ~0.02%             VERY HIGH — IFRA restricted
Cinnamal              ~0.01%             VERY HIGH — IFRA restricted
Citral                ~0.8%              HIGH
Oakmoss extract       ~0.001%            CRITICAL — IFRA restricted
Confidence-weighted interpretation rule: When INCI positioning suggests moderate
fragrance loading and no additional sensitization indicators are present, use
"Potential sensitization concern" language rather than maximum-risk certainty language.
Heavy penalties require convergent multiple indicators as described above.
Preservative Risk in Body Wash Context
Rinse-off context provides partial mitigation relative to leave-on — but repeated
daily exposure must still be assessed.
- AVOID in any format: MCI/MI blend (Kathon CG) in leave-on derivatives. MCI at
  >0.0015% is EU-banned in leave-on products
- CAUTION in rinse-off: DMDM Hydantoin, Imidazolidinyl Urea, Diazolidinyl Urea
  (formaldehyde-releasers) — moderate concern
- PREFERRED: Phenoxyethanol + ethylhexylglycerin blends, sodium benzoate + potassium
  sorbate, caprylyl glycol systems
────────────────────────────────────────────────────────────────────────────────
LAYER 5 — CORE SCORING SYSTEM  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
SAFETY [Weight: 0.25]
Evaluates: Surfactant harshness under repeated daily use; sensitization potential from
fragrance, preservatives, antimicrobials; cumulative barrier disruption load;
microbiome safety; barrier disruption trajectory of soap architectures and harsh
surfactant systems; rinse-off vs leave-on exposure distinction.
▸ Safety score is the single most influential core score. Marketing and sensory
  attributes cannot compensate for structural safety deficits.
EFFECTIVENESS [Weight: 0.20]
Core Question: Can the cleanser remove sebum, sweat, environmental particulate, and
odour-producing bacteria without causing cumulative barrier damage?
Evaluates: Surfactant cleansing power relative to its harshness cost; antimicrobial
efficacy where claimed; rinse-off active realism; long-term tolerable cleansing
trajectory.
▸ Harshest cleanser is not the most effective. Effectiveness = optimal
  cleansing-to-barrier cost ratio, not raw degreasing power.
ALLERGY RISK [Weight: 0.15]
Evaluates: Fragrance allergen load (IFRA Category 6 calibration, confidence-weighted);
essential oil sensitization stack (concentration-context calibrated); preservative
sensitizer burden; botanical allergen exposure; colorant sensitization risk
(precautionary toxicology concern — R1 applied); CAPB sensitization at high
concentrations; repeated daily exposure amplification.
ECO IMPACT [Weight: 0.10]
Evaluates: Surfactant biodegradability; fragrance synthetic musk bioaccumulation
(polycyclic musks — galaxolide, tonalide — EU PBT substances); preservative aquatic
toxicity; packaging format.
INGREDIENT QUALITY [Weight: 0.15]
Evaluates: Surfactant system coherence; botanical evidence tier alignment; rinse-off
active honesty; absence of decorative inflation; formulation synergy.
SKIN COMPATIBILITY [Weight: 0.15]
Evaluates: Repeated-use tolerance across common skin types; post-wash tightness or
rebound oiliness signals; sensitivity zone compatibility; acne-related consideration;
eczema-compatible architecture; microbiome stability.
Core Score Formula:
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) +
             (Eco Impact × 0.10) + (Ingredient Quality × 0.15) +
             (Skin Compatibility × 0.15)
────────────────────────────────────────────────────────────────────────────────
LAYER 6 — SPECIALIZED PERFORMANCE SCORES  (Score Range 1.0 – 5.0)
────────────────────────────────────────────────────────────────────────────────
CLEANSING EFFICACY
Evaluates: Effective removal of sebum (~95% at 1% SLS in-vitro reference; glucoside
systems ~70-80% — sufficient for daily hygiene without over-degreasing), sweat
components, environmental pollutants, and odour-causing bacteria. Optimal range:
70-85% sebum removal.
BARRIER PRESERVATION [DOMINANT — Weight 1.5x in Specialized Average]
Evaluates: Post-wash TEWL recovery trajectory; stratum corneum protein integrity;
ceramide-fatty acid-cholesterol architecture preservation; long-term repeat-wash
barrier resilience. Traditional soap architecture receives ceiling classification
through documented repeated-use barrier disruption and irritation potential.
Barrier Preservation Ceilings by Surfactant Architecture:
Harsh surfactant dominant                              Max 2.0
Harsh primary + mild/very mild co-surfactant           Max 2.5
Traditional soap architecture                          Max 2.0
Moderate surfactant dominant                           Max 3.0
Moderate + mild blend (significant co-surfactant)      Max 3.5
Mild surfactant dominant                               Max 4.0
Mild + very mild blend                                 Max 4.2
Very mild dominant                                     Max 4.5-5.0
Any architecture + fragrance top-5 INCI position       -0.5 from ceiling
MICROBIOME COMPATIBILITY
Evaluates: Selectivity of antimicrobial effect; commensal recovery time post-wash;
pre/probiotic ingredient functional evidence; disruption from harsh surfactant or
antimicrobial architecture.
Ceiling for broad-spectrum antimicrobial systems: 2.0.
Ceiling for mild/very mild systems without antimicrobials: 4.5.
SCALP / BODY SKIN FLEXIBILITY
Evaluates: Whether the formulation is suitable across diverse skin zones without
selective harshness. Harsh and moderate surfactant systems at high alkalinity score
poorly here.
LATHER AND RINSEABILITY
Evaluates: Surfactant complete rinse-off; absence of occlusive post-wash film;
sensory acceptability within clinical constraint.
Note: High foam ≠ high cleansing efficacy. Glucosides produce low foam but excellent
cleansing.
CUMULATIVE IRRITATION RISK
Evaluates: Long-term repeat-wash skin outcome under daily or twice-daily use;
seasonal sensitivity amplification; post-shower application interactions with
disrupted barrier; overall inflammatory trajectory.
FORMULATION HONESTY
Evaluates: Claims vs architecture alignment; rinse-off active inflation penalty;
"natural" claims with synthetic harsh architecture; "sensitive skin" claims with harsh
surfactant backbone; microbiome claims without supporting architecture; decorative
botanical loading presented as clinical actives.
Specialized Score Calculation:
Specialized Performance Score = Average of all 7 specialized scores.
Barrier Preservation is weighted 1.5x in conceptual interpretation but calculated
within the standard average for formula simplicity.
Any single specialized score below 2.0 triggers a red-flag notation in output
regardless of average.
────────────────────────────────────────────────────────────────────────────────
LAYER 7 — FINAL RATING FORMULA & HIGH SCORE CRITERIA
────────────────────────────────────────────────────────────────────────────────
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
Score Range: 1.0 – 5.0
High Score Eligibility (> 4.0):
- Mild or very mild dominant primary surfactant system
- Barrier Preservation ≥ 3.5
- Cumulative Irritation Risk ≥ 3.0
- No broad-spectrum antimicrobial dominance (triclosan, chlorhexidine)
- Fragrance load within IFRA Category 6 calibrated moderate bounds
- Formulation Honesty ≥ 3.5
- No high-concern preservative in leave-on derivatives (MI/MCI)
Hard Disqualifiers for Elite Scores (≥ 4.5):
- Harsh dominant surfactant claiming gentle or sensitive-skin suitability
- Triclosan or chlorhexidine as primary antimicrobial active
- Heavy fragrance loading as primary architecture (top-3 INCI, undisclosed allergen
  blend) with convergent multiple indicators confirmed
- Collagen, peptide, vitamin C, or hyaluronic acid as primary efficacy actives in
  rinse-off

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
════════════════════════════════════════════════════
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 BODY CLEANSER PROFILE

## Functional Classification

Short body cleanser classification.

Examples:
- Gentle Daily Body Wash
- Harsh Traditional Soap Bar
- Balanced Syndet Bar
- Fragrance-Heavy Commercial Body Wash
- Antibacterial Deodorant Body Wash
- Sensitive Skin Body Wash

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering surfactant mildness, barrier friendliness across body zones, pH compatibility, long-term body skin behavior, fragrance and antimicrobial load, and overall formulation balance.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Body Skin + Barrier Analysis

### Cleansing Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Body Skin Hydration Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Residual Dryness Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Body Microbiome Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cumulative Irritation Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Formulation Honesty — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Weaknesses

- Main structural weakness
- Main structural weakness
- Main structural weakness

---

# 👤 BODY SKIN TYPE COMPATIBILITY

## Population Compatibility

### Dry Skin — ⭐X.X

Short compatibility explanation.

### Oily / Normal Skin — ⭐X.X

Short compatibility explanation.

### Combination Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Acne-Prone / Folliculitis-Prone — ⭐X.X

Short compatibility explanation.

### Eczema / Atopic Skin — ⭐X.X

Short compatibility explanation.

---

# 🗺 BODY ZONE COMPATIBILITY

## Zone-by-Zone Assessment

### Lower Legs / Shins (Highest Xerosis Risk) — ⭐X.X

Short zone explanation.

### Trunk / Back / Chest — ⭐X.X

Short zone explanation.

### Axilla / Groin / Flexural Zones — ⭐X.X

Short zone explanation.

### Arms / General Body — ⭐X.X

Short zone explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Twice Daily Use — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

### Winter / Dry Climate Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing feel across body
- Post-wash tightness or comfort
- Fragrance perception
- Skin feel immediately after drying

## Medium-Term

- Barrier response across lower legs and arms
- Dryness progression or stability
- Tolerance development across body zones
- Microbiome stability signals

## Long-Term

- Barrier stability at scale
- Xerosis progression (especially lower legs and shins)
- Microbiome stability across all body zones
- Eczema aggravation or stability
- Overall body skin outcome under daily use

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleansing system and surfactant architecture, barrier behavior at body scale, irritation risk and fragrance load, active performance (antifungal, antibacterial, acne, exfoliant), long-term body skin outcome, and microbiome impact.

- Ingredient — Role
- Ingredient — Role

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

3–5 concise user-friendly evidence-based statements explaining the final rating.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Mention harsh colorants, preservatives, fragrances, and antimicrobials in output
- No foam-volume bias
- No moisturizing claim bias on harsh surfactant bases
- Structural weakness overrides cosmetic feel
- Surfactant harshness tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Format type must be identified before scoring
- Body surface area amplification must be applied to irritation and barrier assessments
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-wash leg tightness = structural failure signal specific to body wash
- Foam richness ≠ cleansing power
- Natural soap ≠ safe (pH 9–10 is structurally harmful at full body scale)
- Fragrance freshness ≠ skin health benefit
- Moisturizing on SLS base = formulation dishonesty
- Antibacterial ≠ healthier skin without functional justification
- Triclosan must receive safety, microbiome, and eco penalties regardless of concentration
- Body zone compatibility section is mandatory in every output
- Winter and dry climate usability must be addressed
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Soap / Body Wash Evaluation Algorithm — Structured for surfactant mildness analysis, body-zone barrier compatibility, and long-term skin health assessment under repeated use. All scoring is structural and evidence-informed.

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
              "You are a strict soap and body wash structural evaluation engine."
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