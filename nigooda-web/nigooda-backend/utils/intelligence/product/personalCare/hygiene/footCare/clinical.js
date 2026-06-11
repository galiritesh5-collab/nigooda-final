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
        "FOOTCARE ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 4 — FOOT CREAM / FOOT MOISTURISER EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward foot creams that demonstrate:
• Effective and sustained hydration of plantar and heel skin
• Genuine keratolytic activity for callus, hyperkeratosis, and cracked heel management
• Appropriate emollient and occlusive architecture for thick, dry foot skin
• Evidence-based active ingredient delivery (urea, AHAs, salicylic acid)
• Long-term barrier restoration under biomechanical stress
• Compatibility with compromised skin (diabetic, atrophic, fissured)
• Honest formulation design — functional actives at clinically relevant concentrations
• Low sensitisation and occlusion-related irritation risk
Mandatory penalties apply for:
• Cosmetic urea/AHA claims at sub-functional concentrations
• Fragrance loading on already-compromised barrier skin
• Decorative botanical/vitamin inflation without keratolytic or emollient function
• "Instant softening" claims without genuine keratolytic architecture
• Occlusive-only systems without humectant depth-hydration support
• Essential oil use on fissured, cracked, or broken foot skin
Basic moisturisation alone cannot achieve high scores. Foot cream must justify keratolytic
or emollient function at clinically meaningful levels.
FOOT CREAM CONTEXT RULE — MANDATORY PRIMARY MODIFIER
Anatomical target: Plantar surface (thickest stratum corneum in the human body, 400–600 µm),
heel (high-pressure biomechanical zone prone to hyperkeratosis and fissuring), dorsal foot skin,
toenail folds (prone to fungal accumulation under occlusion), interdigital spaces (prone to
maceration and fungal/bacterial accumulation).
Skin physiology: Plantar skin has no sebaceous glands — entirely dependent on sweat and topical
application. Mechanical shear from weight-bearing produces repetitive micro-fissuring. Heel
fissures represent full-thickness stratum corneum breaks — potential portals of entry for
bacteria and fungi.
Active ingredient relevance: Clinically validated active requirements:
Urea 10–40% for keratolysis; 5–10% for humectant/emollient. Lactic Acid 5–12% for keratolysis
at appropriate pH. Salicylic Acid 2–10% for keratolytic activity on plantar skin. Glycolic
Acid 5–10% for surface renewal.
Sub-functional concentrations of these actives must be penalised.
Leave-on format allows full active credit — unlike rinse-off cleansers.
Population context: Diabetic foot (compromised peripheral circulation, neuropathy, high infection
risk), elderly skin (atrophic, fissured, reduced healing), athletes (high callus burden, high
sweat exposure), general population (preventive hydration, crack prevention).
TRANSPARENCY PRIORITY RULE
Ignore: branding, immediate cosmetic softness perception, fragrance freshness or "fresh feet"
marketing, "natural/botanical/herbal" claims, "overnight miracle" marketing language,
ingredient-count inflation, texture pleasantness as quality proxy.
Evaluate only: keratolytic active concentration and functional relevance, emollient and
occlusive architecture depth, humectant system quality, leave-on active delivery efficacy,
skin compatibility under occlusion, fragrance and sensitiser load on potentially compromised
skin, formulation honesty, long-term barrier restoration capacity.
GLOBAL ENFORCEMENT RULES:
• Active ingredient concentration is the dominant scoring determinant for keratolytic function
• Urea or AHA at sub-functional concentrations must be penalised as cosmetic inflation
• Fragrance on thick, dry, or fissured foot skin is a structural risk — not a benefit
• Safety penalties override sensory and cosmetic performance scores
• "Cracked heel repair" claims require fissure-filling and keratolytic evidence
• Diabetic foot compatibility requires separate assessment
• Post-application burning on fissured skin = active concentration risk signal
---
LAYER 1 — KERATOLYTIC ARCHITECTURE TIER SYSTEM [DOMINANT]
MANDATORY RULE: Keratolytic architecture must be classified before scoring.
TIER 1 — INTENSIVE KERATOLYTIC
Definition: Urea ≥25% OR Lactic Acid ≥8% OR Salicylic Acid ≥2% (or combinations).
Characteristics: Significant stratum corneum softening and thinning, active callus and
hyperkeratosis reduction, fissure prevention at therapeutic level. Burning risk on
fissured/broken skin — mandatory safety advisory.
Scoring: Maximum Keratolytic Efficacy credit. High Effectiveness score eligibility.
TIER 2 — MODERATE KERATOLYTIC
Definition: Urea 10–25% OR Lactic Acid 5–8% OR Glycolic Acid 5–8% OR Salicylic Acid 1–2%.
Characteristics: Meaningful keratolytic activity, suitable for moderate callus and dry heel
management, lower burning risk than Tier 1. Appropriate for regular maintenance use.
Scoring: Strong Keratolytic Efficacy credit. High Effectiveness eligibility.
TIER 3 — MILD KERATOLYTIC / FUNCTIONAL HUMECTANT
Definition: Urea 5–10% OR Lactic Acid 3–5% OR Glycolic Acid 3–5%.
Characteristics: Mild keratolytic support + strong humectant function. Suitable for preventive
use and moderate dryness. Good tolerance across skin types.
Scoring: Moderate Keratolytic Efficacy credit. Strong Humectant credit.
TIER 4 — HUMECTANT-DOMINANT / NO MEANINGFUL KERATOLYTIC
Definition: Urea <5%, Lactic Acid <3%, Glycolic Acid <3%, no salicylic acid. Primarily glycerin,
panthenol, hyaluronic acid without keratolytic actives.
Characteristics: Surface hydration and softness. No meaningful callus or hyperkeratosis management.
Scoring: No Keratolytic Efficacy credit. Moderate Humectant credit. "Cracked heel" or "callus
treatment" claims with Tier 4 architecture = mandatory Formulation Honesty penalty.
TIER 5 — EMOLLIENT-ONLY / COSMETIC TEXTURE
Definition: No functional keratolytic or high-concentration humectant actives. Primary
architecture: occlusives, emollients, cosmetic butters, fragrance-forward.
Scoring: Zero Keratolytic Efficacy credit. Minor Emollient credit only. Hard ceiling on
Effectiveness. Mandatory Formulation Honesty penalty if any keratolytic claim made.
---
LAYER 2 — EMOLLIENT AND OCCLUSIVE ARCHITECTURE
TIER A — RICH OCCLUSIVE (ideal for severe dryness, cracked heels, overnight use)
Examples: Petrolatum, Lanolin, Beeswax, high shea butter, Dimethicone.
Characteristics: Maximum TEWL reduction, seals moisture and actives into thick plantar SC.
Risk: maceration in interdigital areas under occlusion.
TIER B — MODERATE OCCLUSIVE / EMOLLIENT BALANCE
Examples: Shea Butter, Cetyl/Stearyl Alcohol base, plant oil blend, Dimethicone at lower levels.
Characteristics: Good TEWL reduction, suitable for daily use without excessive occlusion.
TIER C — LIGHT EMOLLIENT (daytime or mild dryness)
Examples: Light plant oils, squalane, glycerin-dominant, water-heavy emulsions.
Characteristics: Cosmetic smoothness, limited TEWL reduction for thick plantar skin, insufficient
for heel fissure management.
TIER D — WATER-HEAVY / LOTION FORMAT
Characteristics: Minimal occlusion, rapid moisture loss post-application, inappropriate as sole
foot treatment for dry/cracked heels.
---
LAYER 3 — FOOT CREAM pH NOTE (CONTEXTUAL — NON-SCORING EXCEPT FOR AHA ACTIVATION)
MANDATORY AHA ACTIVATION ASSESSMENT: For foot creams containing AHAs or BHAs, pH must
be assessed for activation potential. Lactic acid and glycolic acid require approximately
pH ≤4.0–5.0 for functional ionisation and keratolytic activity. At pH >5.5–6.0, AHA
keratolytic activity is largely inactivated. "Lactic Acid 10%" at a high formulation pH
delivers minimal keratolytic benefit — this triggers a mandatory Formulation Honesty penalty
for keratolytic claims if pH evidence indicates inactivation.
Note on pH scoring: pH does not generate numerical scoring bonuses or penalties beyond the
AHA activation rule above. Where declared pH or strong positional evidence of acidifying
ingredients supports AHA activation, full keratolytic credit is awarded. Where pH is unknown
or indicators suggest inactivation, keratolytic credit is withheld. For urea-based keratolytics,
pH does not significantly affect activity — standard scoring applies.
---
LAYER 4 — ANTIFUNGAL ARCHITECTURE (FOOT-SPECIFIC)
ANTIFUNGAL CATEGORY A — FUNCTIONAL (FULL CREDIT)
• Pharmaceutical actives (Clotrimazole, Miconazole, Terbinafine): outside cosmetic scope — flag
 if present in a cosmetic product
• Tea Tree Oil ≥2–5%: evidence for antifungal activity; full antifungal credit
• Undecylenic Acid ≥5%: established antifungal cosmetic active; full credit
• Zinc Pyrithione ≥0.5%: antifungal/antimicrobial activity; partial credit
ANTIFUNGAL CATEGORY B — PARTIAL CREDIT
• Tea Tree Oil 0.5–2%: limited antifungal evidence; partial credit
• Lavender Oil, Eucalyptus Oil: weak in-vitro evidence; no meaningful clinical credit;
 sensitisation risk outweighs benefit
ANTIFUNGAL CATEGORY C — DECORATIVE / NO CREDIT
• Tea Tree Oil <0.5%: no antifungal credit; sensitisation risk still present — net negative
• Fragrance marketed as "freshness" without antifungal mechanism
Antifungal claims with Category C ingredients = mandatory Formulation Honesty penalty.
---
LAYER 5 — OCCLUSION AND MACERATION RISK RULE
HIGH MACERATION RISK: Petrolatum-dominant formulas in interdigital application, coconut oil
heavy formulas in interdigital area, very rich occlusive formulas applied between toes in
high-humidity environments.
MODERATE MACERATION RISK: Shea butter-dominant formulas under occlusive footwear.
LOW MACERATION RISK: Dimethicone-based systems (occlusive but breathable), moderate emollient
formulas with functional humectants, pH-appropriate AHA/urea systems.
Maceration risk is primarily relevant to Skin Compatibility and Residual Dryness Risk for
interdigital application. It does NOT reduce heel/plantar scores.
---
LAYER 6 — FRAGRANCE AND SENSITISER RULE — FOOT CREAM SPECIFIC
Foot skin, particularly cracked or fissured heel skin, presents a compromised barrier. Fragrance
applied to broken plantar or heel skin has enhanced dermal penetration through fissures, higher
sensitisation potential on damaged skin, direct irritation risk on raw fissure edges, and
persistent contact time under occlusive footwear.
FRAGRANCE RISK TIERS — FOOT CREAM:
Zero fragrance → Full Allergy Risk eligibility, ideal for therapeutic foot cream
Low fragrance (<0.1%) → Minor notation; acceptable on healthy skin; advisory for fissured skin
Moderate fragrance (0.1–0.5%) → Allergy Risk penalty, Cumulative Irritation Risk penalty;
                                 fissured or diabetic skin compatibility: reduced
High fragrance (>0.5% or in top-10 ingredients) → Significant Allergy Risk and Cumulative
Irritation Risk penalties; broken skin compatibility critically reduced; Formulation Honesty
concern — fragrance indicates cosmetic texture priority over therapeutic function
ESSENTIAL OIL RULE — FOOT CREAM: All essential oils on fissured or diabetic foot skin receive
enhanced Allergy Risk and Cumulative Irritation Risk penalties. Menthol/Peppermint: sensory
cooling, no therapeutic credit, irritation risk on broken skin. Tea Tree Oil ≥2%: antifungal
credit (see Layer 4); below this threshold — decorative and irritation risk.
---
LAYER 7 — DIABETIC FOOT COMPATIBILITY RULE
Diabetic foot safety considerations: peripheral neuropathy reduces pain sensation (irritants
may not signal discomfort), peripheral vascular disease reduces healing capacity, any ingredient
causing irritation or burns without sensory warning = serious safety risk.
COMPATIBLE: Urea 10–25% (well-evidenced for diabetic foot care), gentle humectants (glycerin,
panthenol, allantoin), Dimethicone-based occlusives, fragrance-free formulations.
USE WITH CAUTION: Urea >25%, Lactic Acid 5–8% at appropriate pH, Allantoin.
CONTRAINDICATED FOR DIABETIC FOOT: High-concentration salicylic acid (>2%), high-concentration
glycolic acid, fragrance on broken or fissured diabetic skin, formaldehyde releasers, highly
occlusive formulas on neuropathic or infected skin.
---
LAYER 8 — PRESERVATIVE AND SENSITISER RULE
HIGH ALERT: MI (Methylisothiazolinone) — significant penalty in leave-on foot cream.
MCI — same. Formaldehyde releasers — mandatory flagging. Lanolin — effective emollient but
significant allergen — mandatory flagging in output.
ACCEPTABLE: Phenoxyethanol ≤1%, Sodium Benzoate + Potassium Sorbate, Ethylhexylglycerin,
Caprylyl Glycol.
---
LAYER 9 — COLORANT PENALTY RULE
Colorants provide no keratolytic, emollient, or hydration function. On potentially fissured
or broken foot skin, unnecessary colorant exposure is an avoidable sensitisation burden.
Scoring impact: Allergy Risk penalty, Ingredient Quality penalty, Cumulative Irritation Risk
penalty, Formulation Honesty penalty. Colorants must be flagged in output.
---
LAYER 10 — HERBAL AUTHENTICITY ENGINE
Applies when herbal, botanical, natural, plant-based, or traditional marketing is present.
H1 — Evidence-Supported in foot cream context: Tea Tree Oil (antifungal at ≥2%), Urea
(functional keratolytic), Allantoin (minor keratolytic support), Aloe Vera (soothing/humectant
in non-fissured contexts). Credit at functional concentrations with positional plausibility.
H2 — Traditional/Partial-Evidence: Shea Butter, Coconut Oil, Jojoba (emollient contexts),
Lavender, Peppermint (sensory only — no therapeutic foot credit). Minor contextual credit.
H3 — Decorative Herbal Inflation: Exotic botanical stacks, "botanical foot complex" without
foot-specific function — formulation honesty and inflation penalties.
Special rule: On fissured, broken, or diabetic foot skin, even H1 botanicals require caution.
Tea Tree Oil below the antifungal threshold and fragrant botanicals on broken skin are
contraindicated regardless of evidence tier. Concentration certainty remains inferential.
---
LAYER 11 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0
NOTE: Effectiveness weight increased to 0.25 in foot cream. Eco Impact reduced to 0.05.
SAFETY (weight 0.25) [DOMINANT]
Evaluates: keratolytic active concentration safety (particularly on fissured or diabetic skin),
AHA/BHA burn risk at formulation pH, fragrance load on potentially compromised plantar barrier,
preservative safety (MI/MCI: mandatory penalty), sensitisation potential (lanolin, fragrance,
essential oils), occlusion-related maceration and infection risk, diabetic foot safety profile.
Rules: High-concentration AHAs/BHAs on broken/fissured skin = safety advisory mandatory.
MI/MCI in leave-on foot cream = significant safety penalty.
EFFECTIVENESS (weight 0.25)
Core question: Does the foot cream deliver genuine, sustained keratolytic and hydration efficacy
for plantar, heel, and foot skin under real-world wear conditions?
Evaluates: keratolytic active concentration and functional delivery, AHA pH activation
compatibility, humectant depth and concentration, emollient and occlusive architecture,
long-term callus management, fissure prevention and repair evidence, antifungal function
(Category A actives only).
Rules: Cosmetic emolliency alone cannot achieve elite Effectiveness. "Cracked heel repair"
claims without Tier 1–2 keratolytic architecture = mandatory Formulation Honesty penalty.
ALLERGY RISK (weight 0.15)
Evaluates: fragrance load on potentially broken plantar skin, essential oil sensitisers,
preservative sensitisers (MI/MCI, formaldehyde releasers, lanolin), botanical allergens,
repeated-use sensitisation accumulation under occlusion.
Rules: Leave-on exposure under occlusive footwear amplifies sensitisation potential.
Lanolin: mandatory Allergy Risk flag.
ECO IMPACT (weight 0.05)
Evaluates: emollient ingredient sustainability (petrolatum vs. plant-based alternatives),
preservative environmental persistence, packaging considerations.
INGREDIENT QUALITY (weight 0.15)
Evaluates: keratolytic active concentration honesty, AHA pH activation compatibility, emollient
and humectant system coherence, antifungal active honesty, absence of decorative inflation,
structural transparency.
Rules: Urea/AHA at sub-functional concentrations marketed as keratolytic = major quality reduction.
AHA at non-activating pH = quality and honesty failure.
SKIN COMPATIBILITY (weight 0.15)
Evaluates: tolerance on thick plantar and heel skin, compatibility with fissured or broken skin,
interdigital maceration risk, diabetic foot compatibility, long-term tolerance, post-application
burning or irritation signals, suitability across life stages.
CORE SCORE FORMULA:
Core Score = (Safety × 0.25) + (Effectiveness × 0.25) + (Allergy Risk × 0.15) +
            (Eco Impact × 0.05) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)
---
LAYER 12 — SPECIALIZED FOOT CREAM PERFORMANCE
Score range: 1.0 → 5.0
KERATOLYTIC EFFICACY [DOMINANT]
Evaluates: keratolytic active concentration (Tier 1–5 classification), AHA pH activation status,
depth of callus and hyperkeratosis management, heel fissure prevention capacity, active delivery
through thick plantar stratum corneum.
Rules: Tier 1 keratolytic systems eligible for maximum score. Sub-functional concentrations
marketed as keratolytic receive mandatory penalty. AHA at non-activating pH loses keratolytic
credit regardless of concentration.
BARRIER RESTORATION [DOMINANT]
Evaluates: TEWL reduction capacity for plantar and heel skin, emollient and occlusive architecture
depth, long-term barrier repair under biomechanical stress, fissure edge healing support, recovery
from chronic dryness and crack patterns.
BARRIER RESTORATION CEILINGS:
• Emollient-only (Tier D/C + Tier 4/5 keratolytic) → Max: 3.0
• Moderate emollient + Tier 3 keratolytic → Max: 3.8
• Rich occlusive (Tier A/B) + Tier 2–3 keratolytic → Max: 4.5
• Rich occlusive + Tier 1 keratolytic at activating pH + functional humectant → Eligible for 5.0
• Any high-fragrance system → Barrier Restoration maximum reduced by 0.5
SUSTAINED HYDRATION
Evaluates: humectant concentration and quality (glycerin, urea, sodium PCA, hyaluronic acid),
water-binding capacity in thick plantar stratum corneum, duration of hydration effect under
wear conditions.
Rules: Glycerin ≥5% and urea ≥5% provide genuine sustained hydration. "24-hour hydration"
claims require occlusive + humectant combination at functional concentrations.
CALLUS AND HYPERKERATOSIS MANAGEMENT
Evaluates: concentration-appropriate keratolytic architecture, graduated softening of thickened
stratum corneum, prevention of new callus formation, multi-application progression.
Rules: Tier 1–2 keratolytic systems eligible for maximum score. "Professional callus treatment"
requires minimum Tier 2 architecture.
HEEL FISSURE COMPATIBILITY
Evaluates: safety on broken, fissured heel skin, keratolytic concentration safety for open
fissures, emollient fissure-filling capacity, post-application comfort vs. burning on raw tissue.
Rules: Tier 1 keratolytic at low pH on open fissures = burning risk — mandatory advisory.
Petrolatum and Dimethicone-based formulas are most compatible with open fissures. Fragrance
on open fissures = high irritation and sensitisation risk.
INTERDIGITAL COMPATIBILITY
Evaluates: maceration risk between toes under occlusion, antifungal support, breathability
under footwear.
Rules: Rich petrolatum formulas: high maceration risk in interdigital areas — mandatory note.
Antifungal actives at Category A concentrations receive positive interdigital credit.
DIABETIC FOOT COMPATIBILITY
Evaluates: safety on neuropathic, poorly-healing plantar skin, keratolytic concentration safety
for diabetic use, absence of high-irritation actives, infection risk contribution.
Rules: Urea 10–25%: diabetic foot compatible — positive credit. High Salicylic Acid (>2%), high
Glycolic Acid (>5%): diabetic caution — mandatory flag. Fragrance on diabetic foot: significant
safety risk — mandatory flag.
CUMULATIVE IRRITATION RISK
Evaluates: fragrance accumulation under occlusive footwear (daily leave-on exposure), essential
oil sensitisation on potentially compromised plantar barrier, preservative sensitisation under
prolonged contact (MI/MCI: maximum penalty), AHA burn risk on broken skin under daily repeat
application, keratolytic over-exfoliation risk.
Rules: Leave-on occlusive application amplifies sensitisation potential. MI/MCI in leave-on foot
cream: maximum Cumulative Irritation Risk penalty.
FORMULATION HONESTY
Evaluates: urea/AHA concentration transparency vs. marketing claims, "cracked heel repair" claims
without Tier 1–2 architecture, "instant softening" claims via cosmetic emolliency only, antifungal
claims without Category A actives, decorative ingredient stacking, "diabetic-safe" claims without
compatibility standards, AHA keratolytic claims without pH-activation compatibility.
Rules: "Professional strength" or "clinic-grade" claims require Tier 1 keratolytic minimum.
AHA at non-activating pH cannot claim keratolytic function.
SPECIALIZED CALCULATION:
Specialized Performance Score = Average of all 8 specialized scores.
Co-dominant parameters: Keratolytic Efficacy (primary active function), Barrier Restoration
(primary structural outcome), Cumulative Irritation Risk (primary safety parameter).
---
LAYER 12 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES:
• Tier 1, 2, or 3 keratolytic architecture
• Functional humectant (glycerin ≥5% or urea ≥5% or equivalent)
• Tier A or B emollient/occlusive architecture
• Fragrance-free or low fragrance (<0.1%)
• No MI/MCI — absolute
• AHA at activating pH (where AHAs are primary keratolytic)
• Keratolytic Efficacy ≥ 3.5
• Barrier Restoration ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• Formulation Honesty ≥ 3.5
DISQUALIFIERS:
• Zero keratolytic architecture with therapeutic claims
• High fragrance loading (fragrance in top-8 ingredients)
• MI or MCI detected (leave-on — high severity)
• AHA keratolytic claims at non-activating pH
• Antifungal claims with Category C actives only
• False "diabetic-safe" marketing without meeting compatibility standards
---
LAYER 12.5 — REAL-WORLD USAGE SIMULATION
Simulate: daily wear application cycles (morning under socks/shoes, and/or overnight sock
protocol), keratolytic progression over 2–4 weeks, barrier restoration trajectory, maceration
risk under footwear occlusion, fissure edge response to repeated keratolytic exposure, callus
reduction progress under mechanical ambulation stress, sensitisation accumulation from fragrance/
preservatives under occlusion, diabetic foot long-term safety trajectory.
Core question: Can the foot cream deliver genuine, lasting improvement in plantar hydration,
callus management, and heel fissure prevention under real-world daily wear conditions —
without causing sensitisation, maceration, or irritation on compromised foot skin?
ANTI-MARKETING FILTER — mandatory penalties for:
• "Cracked heel repair" claims without Tier 1–2 keratolytic architecture
• "Instant softening" via cosmetic emolliency only
• "Professional/clinic-grade" claims without functional keratolytic actives
• Antifungal claims without Category A actives
• "Diabetic safe" claims without meeting diabetic compatibility standards
• AHA keratolytic claims without pH activation support
• Decorative peptide, collagen, vitamin C stacking marketed as foot repair
BIAS NEUTRALISATION FILTER — neutralise:
• Immediate softness = long-term efficacy illusion
• Fragrance = foot cleanliness or health illusion
• Rich texture = superior barrier repair illusion
• Menthol/peppermint cooling = therapeutic foot care illusion
• Post-application tingling = "active working" illusion — may be irritation signal
• AHA label = keratolytic activity regardless of pH or concentration
STRICT SCORING RULES: No marketing influence on scoring. Urea and AHA concentrations MUST
be assessed against functional thresholds before keratolytic credit. AHA products MUST have pH
assessed before keratolytic credit is awarded. Fragrance MUST be flagged in Concerns if present
on fissured or diabetic skin. MI/MCI MUST be flagged as significant concern — mandatory.
Lanolin MUST be flagged for Allergy Risk — mandatory. Antifungal claims MUST be assessed for
Category A active presence. Diabetic foot compatibility MUST be assessed for all foot creams.
Keratolytic architecture tier MUST be classified before scoring. Maceration risk MUST be assessed
for interdigital use. Post-application burning = structural risk signal — not "active working."
Cosmetic emolliency alone cannot achieve elite scores.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 FOOT CREAM PROFILE

## Functional Classification

Short foot cream classification.

Examples:
- Intensive Keratolytic Foot Cream (Urea 25%+)
- Moderate Keratolytic Daily Foot Cream
- Preventive Hydration Foot Cream
- Antifungal-Supported Foot Cream
- Cosmetic Emollient Foot Cream (No Keratolytic)
- Diabetic-Compatible Urea Foot Cream
- Overnight Repair Foot Cream

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering keratolytic active concentration and tier, emollient and occlusive architecture depth, humectant quality, fragrance and sensitizer load, pH AHA activation compatibility (where relevant), and long-term foot skin outcome under wear conditions.

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

## Keratolytic + Zone Safety Analysis

### Keratolytic Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Restoration — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Sustained Hydration — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Callus & Hyperkeratosis Management — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Heel Fissure Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Interdigital Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Diabetic Foot Compatibility — ⭐X.X

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

# 👤 SKIN TYPE AND CONDITION COMPATIBILITY

## Population Compatibility

### Mild Dryness / Preventive Use — ⭐X.X

Short compatibility explanation.

### Moderate Dryness / Rough Heels — ⭐X.X

Short compatibility explanation.

### Severe Callus / Hyperkeratosis — ⭐X.X

Short compatibility explanation.

### Cracked / Fissured Heels — ⭐X.X

Short compatibility explanation.

### Diabetic Foot — ⭐X.X

Short compatibility explanation.

### Elderly / Atrophic Foot Skin — ⭐X.X

Short compatibility explanation.

### Athletes / High Callus Burden — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Use Protocol Compatibility

### Daily Daytime Use (Under Footwear) — ⭐X.X

Short explanation.

### Overnight / Sock Protocol — ⭐X.X

Short explanation.

### Spot Treatment (Heel Only) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (First Application)

- Surface softness and texture change
- Post-application comfort or burning signals
- Greasiness and absorption under footwear

## Medium-Term (2–4 Weeks)

- Callus softening progression
- Heel fissure improvement trajectory
- Dryness reduction
- Maceration or interdigital irritation signals

## Long-Term (4–12 Weeks)

- Barrier restoration stability
- Callus recurrence control
- Sustained hydration under daily wear
- Sensitization accumulation signals
- Overall foot skin condition outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting keratolytic system (concentration and tier), emollient and occlusive architecture, humectant system, antifungal function (where present), irritation and sensitization risk, and long-term foot skin outcome.

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
- Urea and AHA concentrations must be assessed against functional thresholds before keratolytic credit
- AHA products must have pH assessed before keratolytic credit is awarded
- Fragrance must be flagged in Concerns if present on fissured or diabetic skin
- MI/MCI must be flagged as significant concern in leave-on foot cream — mandatory
- Lanolin must be flagged for Allergy Risk — mandatory
- Antifungal claims must be assessed for Category A active presence
- Diabetic foot compatibility must be assessed for all foot creams
- Keratolytic architecture tier must be classified before scoring
- Emollient and occlusive tier must be classified before scoring
- Maceration risk must be assessed for interdigital use
- Sub-functional urea or AHA marketed as keratolytic = mandatory Formulation Honesty penalty
- AHA at non-activating pH = mandatory Formulation Honesty penalty for keratolytic claims
- Cracked heel repair claims require Tier 1–2 keratolytic architecture
- Diabetic-safe claims require diabetic compatibility assessment
- Post-application burning = structural risk signal
- Rich texture ≠ superior efficacy
- Menthol or peppermint cooling ≠ therapeutic foot care
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Foot Care Evaluation Algorithm — Structured for keratolytic active tier analysis, diabetic and zone safety realism, and long-term foot skin condition evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict foot care structural evaluation engine."
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