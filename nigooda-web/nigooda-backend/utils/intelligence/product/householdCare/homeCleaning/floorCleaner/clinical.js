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
        "FLOORCLEANER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 3 — HOUSEHOLD FLOOR CLEANER EVALUATION V3.0
════════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━
SYSTEM OBJECTIVE
Reward floor cleaners demonstrating: effective soil and grease
removal with minimal surface damage; appropriate surfactant and
builder architecture; surface compatibility under repeated mopping;
pH compatibility with common flooring; low residue and re-soiling
tendency; long-term flooring material integrity; human and pet safety
under real-world floor contact; low VOC and inhalation/dermal exposure
burden; evidence-based formulation design.
Mandatory penalties for: fragrance-dominant "clean" perception
marketing; excessively alkaline or acidic systems on non-compatible
surfaces; unnecessary harsh solvent loading; residue-forming over-
formulation causing progressive floor dulling; undisclosed high VOC
content; antibacterial halo claims without appropriate active system;
eco-washing without genuine biodegradability.
ANTI-FEARMONGERING CALIBRATION
CRITICAL: Many mainstream floor cleaners use SLES or moderate anionic
surfactants in diluted systems. At correct use dilution, these are
well-tolerated and do not represent meaningful hazard. Never describe
a well-diluted mainstream floor cleaner as harsh, toxic, or dangerous.
Score the diluted use-concentration reality — not the undiluted raw
concentrate chemistry.
Prefer: "residue accumulation possible at higher-than-recommended
dilution," "pH not ideal for daily use on hardwood at recommended
dilution," "moderate ecological concern for aquatic environments."
NOT: "toxic," "dangerous," "harmful chemical."
CONCENTRATION UNCERTAINTY RULE
Evaluate at realistic use dilution, not concentrate chemistry alone.
When dilution ratio is stated, use that as primary assessment
concentration. When undisclosed, apply probabilistic wording:
"At typical floor cleaner dilution ratios, surfactant concentration
likely presents moderate surface contact."
MECHANISTIC PLAUSIBILITY FILTER
Before crediting any ingredient in a floor cleaner:
- Is concentration likely meaningful after dilution?
- Does claimed active reach the floor at effective level post-dilution?
- Is residue behavior realistic under rinse-free mopping conditions?
- Is antimicrobial claim supported at the diluted use concentration?
- Are botanical or enzyme claims plausible at use dilution?
Theoretical performance does not override diluted use-concentration
reality.
REAL-WORLD TOLERABILITY — FLOOR CLEANERS
Well-diluted mainstream floor cleaners (SLES/AEO-based at recommended
dilution) are used safely in hundreds of millions of homes globally
without meaningful adverse health outcomes. These products should score
in the 3.0–3.7 range unless specific structural failures are evidenced.
Extreme low scores require: documented surface damage risk at
recommended dilution; genuine pet toxicity concern from specific named
actives; confirmed high-VOC burden creating real indoor air risk.
Not just: "it contains SLES" or "it has fragrance."
TRANSPARENCY RULE — EVALUATE ONLY:
Surfactant system appropriateness; builder/chelator architecture and
pH impact on surfaces; VOC and solvent burden; residue-forming
tendency under realistic dilution; repeated-contact human and pet
safety; surface material compatibility; antimicrobial efficacy vs
overkill risk; environmental load.
GLOBAL ENFORCEMENT:
- Surfactant and builder architecture are co-dominant
- pH is a critical surface safety parameter
- Residue and film formation under repeated use must be penalized
- Foam does not equal cleaning performance (low-foam preferred)
- Disinfectant claims require validated active concentrations
- High VOC content reduces Indoor Air Quality regardless of fragrance
- "pH neutral" claims must be verified at use dilution
- Pet safety requires specific assessment for named actives
DILUTION CONTEXT RULE
Floor cleaners typically used at 1:20 to 1:100 dilution (or RTU).
RTU → direct concentration assessment. Concentrates → assess both
undiluted safety and in-use diluted performance. High fragrance in
concentrate → still elevated VOC burden at use dilution. Disinfectant
claims → active must reach validated MIC at use dilution.
EVIDENCE QUALITY TIERS — FLOOR CLEANER
E1 — Validated cleaning at use dilution (proven surfactant/builder
     architecture at relevant concentration)
E2 — Moderate (APG-based systems with partial efficacy data)
E3 — Limited (probiotic floor cleaners — soil digestion plausible,
     disinfection not validated)
E4 — Uncertain (botanical antimicrobial claims at diluted concentration)
E5 — Marketing-driven (fragrance = antibacterial; "ionized water"
     disinfection claims)
HERBAL / BOTANICAL CLASSIFICATION — FLOOR CONTEXT
H1 — Enzyme-based systems (protease, amylase at functional
     concentration): moderate credit for soil digestion.
H2 — Essential oil fragrance/antimicrobial hybrid: limited
     disinfection credit; probabilistic wording required.
H3 — Decorative botanical labeling ("with lavender extract," "with
     aloe vera") in functional floor cleaner: Formulation Honesty
     penalty. "Botanical ingredients appear decorative in this floor
     cleaning context — no functional cleaning credit."
LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM (FLOOR-SPECIFIC)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary concern for floor surfactants: surface compatibility, residue
formation, re-soiling tendency, aquatic toxicity, and human/pet floor
contact safety. Secondary: dermal exposure from bare foot, infant
crawling, pet paw licking.
TIER 1 — HIGHER SURFACE RISK (FLOORS)
Examples: SLS at high concentration (primary surfactant), ALS,
BAC at high levels (>0.3%), strong QAC at high concentration,
LAS at primary concentration.
Characteristics: Higher residue formation potential; progressive floor
dulling under repeated use; aquatic toxicity concern; higher re-soiling
tendency; risk of finish/sealant degradation on wood and laminate.
Scoring: Surface Safety penalties, Residue Formation penalties,
Eco Impact penalties.
CALIBRATION: Tier 1 means higher residue and surface risk — NOT
acutely toxic or dangerous at use dilution. Use measured language.
"Higher residue formation potential" not "toxic to floors."
TIER 2 — MODERATE
Examples: SLES as primary surfactant in floor cleaners, SCI in
mopping systems, amine oxides at elevated levels, low-level QAC
blends (BAC <0.1%).
Characteristics: Moderate residue risk at correct dilution; acceptable
performance; better aquatic profile than Tier 1.
Scoring: Moderate penalties if poorly diluted; acceptable in blended
Tier 3 systems.
CALIBRATION: SLES-based floor cleaners at correct dilution are
mainstream acceptable products globally. Moderate score — not low.
TIER 3 — MILD / PREFERRED (FLOORS)
Examples: Alcohol ethoxylates (AEO) — low foam, good soil penetration;
Decyl Glucoside; Coco Glucoside; Lauryl Glucoside; Sodium Cocoyl
Glycinate; Caprylyl/Capryl Glucoside.
Characteristics: Low residue formation; good soil emulsification;
low re-soiling; better aquatic biodegradability; preferred for wood
and delicate floor systems.
Scoring: Good Surface Compatibility scores eligible. Eco bonus.
TIER 4 — VERY MILD / OPTIMAL (FLOORS)
Examples: Alcohol ethoxylates at low HLB; Caprylyl Glucoside;
APG-dominant systems; enzymatic + APG blended systems.
Characteristics: Minimal residue; low re-soiling; optimal aquatic
profile; safest for wood, laminate, stone finishes.
Scoring: Maximum Surface Compatibility eligible. Eco bonus.
SYSTEM CLASSIFICATION:
Tier 1 alone        → Higher Residue, Higher Surface Risk
Tier 1 + Tier 3/4   → Moderate-High, dilution-dependent
Tier 2 alone        → Moderate (mainstream acceptable)
Tier 2 + Tier 3/4   → Moderate-Low
Tier 3/4 dominant   → Low Residue, Preferred
Tier 4 dominant     → Optimal
LAYER 2 — BUILDER AND CHELATOR SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER A — PREFERRED: Sodium Citrate, Citric Acid, Sodium Bicarbonate,
Sodium Carbonate (controlled), Zeolite 4A, GLDA, MGDA.
Rapidly biodegradable; low aquatic persistence. Eco bonus eligible.
Surface Compatibility bonus when pH ≤ 8.
TIER B — ACCEPTABLE: EDTA, Sodium Silicate, Polycarboxylates,
Sodium Gluconate. Moderate persistence. Neutral-to-moderate impact.
TIER C — PROBLEMATIC: STPP (aquatic eutrophication), NTA (persistent),
high-concentration Phosphonate complexes. Major Eco penalty.
BUILDER pH IMPACT ON FLOOR SURFACES (CRITICAL):
pH 5.5–7.0   → Safe for hardwood, laminate, bamboo, LVT, stone, tile.
               Surface Compatibility bonus.
pH 7.0–8.5   → Safe for tile, ceramic, porcelain, vinyl. Risk for
               unsealed hardwood, limestone, marble.
pH 8.5–10.0  → Risk for hardwood (finish degradation), marble,
               travertine. Penalty for residential daily use.
pH >10.0     → Not appropriate for repeated residential floor use.
               Major penalty.
pH <5.0      → Not appropriate for general floor use. Major penalty.
Unknown pH   → No Surface Compatibility bonus. Minor credibility
               reduction. Probabilistic wording required.
LAYER 3 — SOLVENT AND VOC SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER 1 — HIGH VOC / HIGHER CONCERN:
Ethylene Glycol (high concentration); PGBE; DGBE/Butyl Carbitol;
high-concentration 2-Butoxyethanol; d-Limonene >2%; IPA >15%;
aromatic solvents; high VOC fragrance blends.
Scoring: Major Indoor Air Quality penalty; Pet Safety penalty.
TIER 2 — MODERATE VOC / ACCEPTABLE:
IPA <10%; Propylene Glycol (low concentration); Benzyl Alcohol
(preservative concentration); d-Limonene <1%; Ethanol (low).
Scoring: Moderate IAQ adjustment.
TIER 3 — LOW VOC / PREFERRED:
Water-based systems; APG/enzyme dominant; no added solvents;
low-VOC or fragrance-free. Scoring: Indoor Air Quality bonus;
Pet Safety bonus.
LAYER 4 — ANTIMICROBIAL / DISINFECTANT SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIER A — VALIDATED: BAC 0.1–0.3%; Sodium Hypochlorite at validated
dilution; H2O2-based 3–6% RTU; Pine oil (validated concentration);
Ethanol >60% RTU; QAC at validated label concentration.
Note: Validated actives still assessed for residue, surface
compatibility, human/pet contact safety, aquatic toxicity.
TIER B — PARTIAL/QUESTIONABLE: BAC <0.05%; essential oils without
validated claim; QAC at sub-MIC; "kills 99.9%" without validated
contact time. No functional credit. Marketing inflation penalty.
TIER C — MARKETING INFLATION: Lavender/lemon/pine fragrance marketed
as "antibacterial"; trace essential oil "naturally antimicrobial"
claim. Major Formulation Honesty penalty. No antimicrobial credit.
ANTIMICROBIAL OVERUSE RULE: Even validated disinfectants receive
penalties when used daily in residential cleaning without infection-
control justification; contributing to resistance risk; causing
aquatic toxicity; masking inadequate mechanical cleaning.
CALIBRATION: A floor cleaner does NOT need to be a disinfectant to
score well. Honest cleaning without kill claims can outscore inflated
kill-claim products.
LAYER 4.5 — FRAGRANCE, COLORANT, AND PRESERVATIVE PENALTIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRAGRANCE: Floor cleaners remain on surfaces post-use. VOC burden;
floor-level inhalation (infants, pets); bare-foot sensitization.
Fragrance-free → Indoor Air Quality bonus, Pet Safety bonus.
Heavy fragrance → Indoor Air Quality penalty, Pet Safety penalty,
Formulation Honesty penalty if marketed as "natural."
COLORANT: No cleaning, surface, or safety benefit. Blue 1, Red 40,
Yellow 5, Yellow 6, Green 3 → Eco Impact penalty, Formulation Honesty.
PRESERVATIVE: MIT → Safety + Eco penalty. BIT → Eco penalty.
CMIT/MIT blends → mandatory Safety + Eco penalties. Flag under Concerns.
Sodium Benzoate at functional concentration: lower concern.
LAYER 5 — CORE SCORING SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
SAFETY [DOMINANT — weight 0.25]
Surfactant irritation at floor-contact concentration (use dilution);
builder/pH risk to human skin at bare-foot contact; solvent/VOC
inhalation risk during mopping; concentrated handling safety;
child/infant floor-level exposure; preservative and fragrance
sensitization burden; cumulative repeated-contact irritation.
CALIBRATION: A well-diluted SLES floor cleaner used weekly is low
risk in real-world terms. Score reflects realistic diluted exposure,
not concentrate chemistry. Do not inflate Safety penalties for
mainstream products without evidence of real-world harm at correct
use dilution.
CLEANING EFFECTIVENESS [weight 0.20]
Grease emulsification; particulate soil removal; greasy kitchen floor
performance; pet accident removal; hard water mineral handling; stain
removal; streak/residue-free result; dilution vs actual efficacy.
SURFACE COMPATIBILITY [weight 0.20]
pH appropriateness for claimed floor types; surface finish degradation
risk; compatibility with hardwood, laminate, LVT/vinyl, tile,
porcelain, natural stone, bamboo; long-term dulling or hazing;
residue build-up; grout compatibility.
pH is the dominant surface compatibility determinant.
ALLERGY AND SENSITIZATION RISK [weight 0.10]
Fragrance allergen load; preservative sensitization (MIT, CMIT,
isothiazolinones); essential oil sensitizers; surfactant skin
sensitization via repeated bare-foot contact.
ECO IMPACT [weight 0.10]
Surfactant biodegradability; aquatic toxicity; builder environmental
persistence; colorant aquatic load; VOC contribution; packaging
sustainability; wastewater treatment compatibility.
INGREDIENT QUALITY [weight 0.10]
Surfactant-builder-solvent architecture coherence; dilution ratio
appropriateness; disinfectant claim vs active concentration honesty;
absence of decorative fragrance or foam inflation; functional
relevance of every major ingredient.
PET SAFETY [weight 0.05]
Floor-contact toxicity for dogs, cats, birds, small animals;
paw-licking exposure; floor-level inhalation; specific high-risk actives:
Pine oil → cats: hepatotoxic → mandatory flag.
Phenols → cats: metabolic toxicity → mandatory flag.
Essential oils at high concentration → cats/birds → flag.
BAC at high levels → cats: mucosal irritation → flag.
"Pet safe" claims receive no credit unless formulation supports it.
CORE SCORE FORMULA:
Core Score =
(Safety × 0.25) + (Cleaning Effectiveness × 0.20) +
(Surface Compatibility × 0.20) + (Allergy/Sensitization × 0.10) +
(Eco Impact × 0.10) + (Ingredient Quality × 0.10) +
(Pet Safety × 0.05)
LAYER 6 — SPECIALIZED FLOOR CLEANER PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Score range: 1.0 → 5.0.
GREASE AND SOIL REMOVAL EFFICIENCY
Kitchen grease emulsification; oily soil removal; particulate dirt
suspension; food residue removal; performance at recommended dilution.
Ceiling: Tier 1 or pH >10 systems cannot achieve maximum score due
to surface damage trade-off.
RESIDUE AND STREAK FORMATION [DOMINANT]
Post-mop residue; streaking tendency; resoiling rate; long-term haze;
concentration-dependent residue behavior.
Ceilings:
Tier 1 dominant                → Max 2.5
High fragrance + Tier 1        → Max 2.0
Tier 2 at correct dilution     → Max 3.2
Tier 3/4 with correct builder  → Max 4.5
Tier 4 + optimal chelation
+ pH 6–8                       → Eligible for 5.0
FLOOR MATERIAL INTEGRITY
Surface finish degradation under repeated use; wood swelling/warping
risk; laminate joint sensitivity; natural stone etching risk; grout
long-term integrity; LVT/vinyl plasticizer compatibility.
Long-term integrity > short-term cleaning brightness.
High-pH systems cause progressive wood finish degradation over time.
Unknown pH → conservative scoring for wood and stone claims.
INDOOR AIR QUALITY IMPACT
VOC content at use dilution; fragrance emission during and post-
mopping; solvent inhalation burden; residual air quality 30–60 min
post-cleaning; asthma/allergy sensitivity.
"Fresh pine scent" = terpene VOC load — not a cleanliness signal.
MICROBIOME AND ECOSYSTEM SAFETY
Antimicrobial breadth vs necessity; drain and wastewater impact;
aquatic ecosystem toxicity; outdoor surface runoff compatibility.
Daily disinfectant use without justified infection control → penalty.
PET AND CHILD CONTACT SAFETY
Floor residue safety for crawling infants; safety for pets; essential
oil and phenol content (cat hepatotoxicity specific risk); bare skin
repeated contact burden. Residue contact safety > application-only.
LONG-TERM FLOOR APPEARANCE PRESERVATION
Prevention of progressive floor dulling; residue build-up haze over
repeated mopping; finish compatibility; pH-related finish degradation.
FORMULATION HONESTY
Antimicrobial claim vs active concentration; "pH neutral" vs actual
use dilution pH; "safe for all floors" vs surfactant/pH profile;
"natural/eco" vs biodegradability evidence; "pet safe" without
formulation support; enzyme/probiotic claims without evidence.
SPECIALIZED PERFORMANCE SCORE = Average of all 7 scores.
Dominant: Residue/Streak Formation → primary interpretive.
Indoor Air Quality → primary exposure penalty.
Floor Material Integrity → primary long-term surface parameter.
LAYER 7 — FINAL RATING FORMULA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Final Rating = (Core Score × 0.50) + (Specialized Performance × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) — requires:
Tier 3 or Tier 4 dominant surfactant system; pH 5.5–8.5 at use
dilution; Residue and Streak Formation ≥ 3.5; Indoor Air Quality ≥ 3.5;
no marketing antimicrobial inflation; Formulation Honesty ≥ 3.5;
no high-concern VOC solvents as primary components; Eco Impact ≥ 3.0.
DISQUALIFIERS: pH >10 at use dilution (non-specialty); primary SLS
or ALS system; heavy essential oil system with pet/child safety claims
AND named pet-toxic actives (pine oil, phenols); pine oil/phenol-
dominant system in pet-present home context.
moquito replellent

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT


# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧹 CLEANER PROFILE

## Product Classification

Short cleaner classification.

Examples:
- Gentle Daily Floor Cleaner
- Balanced Multi-Surface Cleaner
- Alkaline Degreaser (Tile Only)
- High-VOC Fragrance-Heavy Cleaner
- Validated Disinfectant Floor Cleaner
- Eco-Optimized APG Cleaner

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering:
- Surfactant system mildness and appropriateness for floors
- Builder/pH compatibility with claimed floor types
- VOC and fragrance burden
- Residue and streak tendency
- Pet and child contact safety
- Overall formulation balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering inhalation and contact safety realism.

### Cleaning Effectiveness — ⭐X.X

Short structural reason covering soil and grease removal realism.

### Surface Compatibility — ⭐X.X

Short structural reason covering pH and floor material realism.

### Allergy and Sensitization Risk — ⭐X.X

Short explanation covering fragrance and sensitizer burden.

### Eco Impact — ⭐X.X

Short explanation covering biodegradability and aquatic load.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and surfactant quality.

### Pet Safety — ⭐X.X

Short explanation covering post-application floor contact safety for pets.

---

# 🧪 SPECIALIZED PERFORMANCE

## Floor Cleaning + Safety Analysis

### Grease and Soil Removal Efficiency — ⭐X.X

Short structural reason.

### Residue and Streak Formation — ⭐X.X

Short structural reason.

### Floor Material Integrity — ⭐X.X

Short structural reason.

### Indoor Air Quality Impact — ⭐X.X

Short structural reason.

### Microbiome and Ecosystem Safety — ⭐X.X

Short structural reason.

### Pet and Child Contact Safety — ⭐X.X

Short structural reason.

### Long-Term Floor Appearance Preservation — ⭐X.X

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

# 🏠 FLOOR TYPE COMPATIBILITY

## Material Suitability

### Hardwood (Sealed) — ⭐X.X

Short compatibility explanation.

### Laminate — ⭐X.X

Short compatibility explanation.

### LVT / Vinyl — ⭐X.X

Short compatibility explanation.

### Porcelain / Ceramic Tile — ⭐X.X

Short compatibility explanation.

### Natural Stone (Marble, Granite) — ⭐X.X

Short compatibility explanation.

### Bamboo — ⭐X.X

Short compatibility explanation.

---

# 🐾 PET COMPATIBILITY

## Species Suitability

### Dogs — ⭐X.X

Short compatibility explanation.

### Cats — ⭐X.X

Short compatibility explanation.

### Birds / Small Animals — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Weekly Use — ⭐X.X

Short explanation.

### Occasional Use (Heavy Soil) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleaning performance feel
- Streak or residue signals
- Fragrance / VOC impression

## Medium-Term (10–20 Mop Cycles)

- Residue build-up or haze
- Floor dulling or finish change
- Resoiling rate changes
- Irritation signals (skin, respiratory)

## Long-Term

- Floor finish degradation trajectory
- Progressive residue accumulation
- Microbiome/ecosystem impact
- Overall floor appearance outcome
- Pet and household member health signal

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleaning system (surfactant, builder, solvent), surface behavior (pH, residue, finish compatibility), safety (human, pet, indoor air), environmental load, active antimicrobial system (if present), and high-concern preservatives, colorants, or fragrances.

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

3–5 concise user-friendly evidence-based statements.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL OR HEALTH CLAIMS
- No marketing influence on scoring
- Mention high-concern surfactants, builders, solvents, colorants, preservatives, and fragrances in output
- No foam-volume bias
- No fragrance-freshness bias
- No "natural = safe" bias
- Structural weakness overrides cosmetic feel or scent perception
- Surfactant harshness tier MUST be classified before scoring
- Builder system and pH at use dilution MUST be assessed for all formulations
- Solvent and VOC tier MUST be classified before scoring
- Antimicrobial/disinfectant claims MUST be assessed against active and contact time before Effectiveness scoring
- Residue behavior under repeated use > single-use shine
- Long-term surface outcome > immediate visual cleanliness
- Resoiling tendency is a dominant floor cleaner failure mode
- "Smells clean" ≠ structurally clean
- Foam ≠ cleaning performance for floors
- Natural soap ≠ surface-safe (high pH is structurally harmful to wood and stone)
- "pH neutral" claims must be independently assessed
- "Pet safe" claims must be independently assessed against phenol, pine oil, and essential oil content
- Fragrance freshness ≠ indoor air quality benefit
- Disinfectant claim ≠ superior general cleaning performance
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Floor Cleaner Evaluation Algorithm — Structured for surfactant mildness analysis, floor material compatibility assessment, pet and child safety evaluation, and long-term surface integrity realism. All scoring is structural and evidence-informed.

---
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
              "You are a strict floor cleaner structural evaluation engine."
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