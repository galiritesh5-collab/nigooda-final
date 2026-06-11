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
        "PETDEODORANT ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
# ALGORITHM 4 — PET DEODORANT / ODOR CONTROL — V4.0
# FULLY SELF-CONTAINED — ALL ENGINES EMBEDDED
# ═══════════════════════════════════════════════
---
## LAYER 0 — FOUNDATION ENGINE
### SYSTEM OBJECTIVE
Reward pet deodorants that demonstrate:
- Genuine odor neutralization or enzymatic odor elimination
- Species-appropriate ingredient safety (oral ingestion tolerance)
- Skin and coat compatibility under repeated use
- Species-correct pH alignment
- Microbiome compatibility for target species
- Evidence-based formulation design
- Low cumulative toxicity and sensitization risk
Mandatory penalties apply for: Fragrance-masking presented as odor control · Species-toxic fragrance/essential oil systems · Decorative botanical loading with no odor-control function · Leave-on alcohol in cat-use products · Synthetic colorant loading · Marketing-driven sensory engineering over genuine odor neutralization
**Fragrance masking alone cannot achieve high scores.**
---
### TRANSPARENCY PRIORITY RULE
**Ignore**: Fragrance freshness perception · "Natural/botanical" marketing alone · Trend-driven active loading · Ingredient-count inflation
**Evaluate only**: Genuine odor neutralization vs fragrance-masking ratio · Species-appropriate toxicity profile · Skin and coat barrier compatibility · Leave-on format honesty · Repeated-use tolerance · Microbiome stability · Licking/ingestion safety
---
### GLOBAL ENFORCEMENT RULES
- Odor neutralization architecture is the dominant deodorant structure
- Species toxicity penalties override all functional bonuses
- Fragrance masking cannot compensate for lack of genuine odor control actives
- Leave-on format = 100% skin/coat contact time
- Alcohol systems on cats = mandatory safety penalty
- Licking risk assessed for every ingredient at realistic concentration
- Synthetic colorants receive mandatory penalties
- Non-species-appropriate pH reduces Safety and Skin Compatibility
---
### LEAVE-ON CONTEXT RULE
Pet deodorants are predominantly leave-on. Unlike rinse-off cleansers, there is no dilution or removal event.
**FULL EFFICACY CREDIT** (leave-on appropriate):
- Enzymatic odor neutralizers (protease/lipase/oxidase enzyme systems)
- Zinc ricinoleate
- Cyclodextrin (odor trapping)
- Baking soda/sodium bicarbonate (at appropriate pH)
- Mild targeted antimicrobials (at microbiome-safe concentrations)
- Chitosan (natural antimicrobial, coat-substantive) — H1 botanical credit eligible
- Plant-derived odor neutralizers (clinically evidenced) — H1 credit eligible
**PARTIAL EFFICACY CREDIT**:
- Witch hazel at low concentration with species check — H2 botanical; cat: evaluate ethanol content
- Aloe vera (soothing; not odor control) — H2 botanical
- Baking soda at high concentration (alkaline concern)
- Low-level essential oils in dog-only products with some evidence — H2 with species check
**DECORATIVE / MINIMAL CREDIT**:
- Synthetic fragrance blends (masking only)
- Essential oil blends without odor-neutralization evidence → HASE H3 or H4 depending on species context
- Floral waters/hydrosols as primary odor agent → HASE H3
- Botanical extracts with no odor-control mechanism → HASE H3
---
### SPECIES APPLICABILITY RULE
Every formula must be classified before scoring:
- Dog-only formula
- Cat-safe formula
- Multi-species formula (most restrictive species governs)
- Small animal/exotic formula
*If target species is unlabeled → mandatory Safety penalty and Formulation Honesty reduction*
---
### EMBEDDED INGREDIENT CONCENTRATION & POSITION RULE [MANDATORY — PET DEODORANT]
**RULE 1 — EXPLICIT CONCENTRATION STATED**
Evaluate at exact stated concentration; do not default to worst-case assumptions.
**RULE 2 — NO CONCENTRATION STATED (POSITION-BASED EVALUATION)**
| Position in List | Estimated Concentration Range | Evaluation Approach |
|---|---|---|
| 1st–3rd ingredient | Very high (dominant base/carrier) | Full safety + efficacy weight applied |
| 4th–8th ingredient | Moderate-high (functional level likely) | Standard safety + moderate efficacy credit |
| 9th–15th ingredient | Low-moderate (supporting/functional) | Proportional credit; reduced penalty for moderate-concern items |
| 16th–20th ingredient | Low (trace to minor functional) | Minimal penalty for moderate-concern items; decorative credit for actives |
| 20th+ ingredient | Trace level | Monitor-only flag for moderate concerns; no penalty for low-concern items |
**RULE 3 — PENALTY PROPORTIONALITY BY POSITION**
- Position 1–5 + moderate concern → Full moderate penalty
- Position 6–12 + moderate concern → Reduced penalty (50%)
- Position 13+ + moderate concern → Monitor flag only
- Disqualifying ingredients → Position does not reduce penalty
**RULE 4 — WHAT POSITION CANNOT EXCUSE IN PET DEODORANT**
- Mandatory species-toxic ingredients (feline neurotoxic essential oils) at any detectable level in cat/multi-species products
- Leave-on format amplifies all position concerns — no dilution or removal event exists
**V4.0 Cumulative leave-on exposure rule**: Daily leave-on use means cumulative dose of trace-position ingredients accumulates over 30/90/365-day trajectory. This amplification is real and must be acknowledged. However, it must remain proportionate — estimate realistic daily trace dose and compare against known NOAELs or veterinary thresholds before escalating penalty tier. A trace ingredient accumulating to a still-sub-threshold daily dose remains monitor-level even in leave-on format.
*Application to deodorant essential oils*: Tea tree at position 3 in a cat deodorant = DISQUALIFIED (any position; continuous leave-on exposure + near-certain grooming ingestion). Tea tree at position 3 in a dog deodorant = HIGH CONCERN (leave-on + functional concentration). Tea tree at position 18 in a dog deodorant = LOW CONCERN / MONITOR (trace level; leave-on note acknowledged; proportionate to realistic daily dose). Lavender at position 5 in a dog deodorant = MODERATE FLAG. Lavender at position 16 in a dog deodorant = LOW CONCERN / MONITOR.
*Application to deodorant enzymatic actives*: Enzyme at position 1–3 = full Tier 1 odor control credit. Enzyme at position 15+ = reduced credit (40%); Formulation Honesty note if marketed as primary odor control mechanism.
*Application to deodorant fragrance*: Fragrance or "parfum" listed at position 4 = Tier 4 (masking) dominant signal; Formulation Honesty penalty if marketed as odor elimination. Fragrance at position 18 = MONITOR note; does not elevate Tier classification if genuine Tier 1 actives present at positions 1–8.
---
### EMBEDDED HERBAL AUTHENTICITY SCORING ENGINE (HASE) — PET DEODORANT [MANDATORY]
Every botanical ingredient must be classified H1–H4 before scoring. Species context is mandatory. Leave-on context amplifies efficacy AND safety evaluations vs rinse-off.
**TIER H1 — EVIDENCE-BACKED BOTANICAL ACTIVES (PET DEODORANT CONTEXT)**
- Chitosan: mild antimicrobial + coat conditioning evidence — Full H1 credit; Tier 2 odor control contribution
- Cyclodextrin (plant-derived): odor trapping mechanism documented — Full H1 credit; Tier 1 odor control contribution
- Colloidal oatmeal in leave-on: soothing skin benefit evidence — Full H1 credit for skin compatibility
- Plant-derived enzyme systems with odor neutralization evidence — Full H1 Tier 1 credit at functional positions
Scoring impact: Full botanical efficacy credit · HASE bonus +0.2 to Ingredient Quality
**TIER H2 — FUNCTIONAL TRADITIONAL BOTANICAL (PET DEODORANT CONTEXT)**
- Witch hazel at diluted concentration (dog-only): mild astringent; evaluate ethanol content for cats — H2 partial Tier 2/3 credit
- Aloe vera inner leaf gel: soothing; no odor control credit — H2 for skin compatibility
- Chamomile extract at functional level: anti-inflammatory — Partial skin compatibility credit
- Rosemary extract as antioxidant: some preservative + antioxidant evidence — Partial credit
- Peppermint oil at low position in dog-only products: some antimicrobial traditional use — H2 partial Tier 2 credit; cat = H4 in leave-on
Scoring impact: Partial functional credit (50%) · No HASE penalty · H2 at position 15+ = monitoring-level credit only
**TIER H3 — COSMETIC BOTANICAL / MARKETING-LEVEL USE (PET DEODORANT CONTEXT)**
- Lavender essential oil at trace position in a dog deodorant (scent only)
- Floral waters/hydrosols as primary odor agent
- Exotic botanicals without odor control mechanism
- Chamomile extract at trace position
- Vitamin E at trace position
Scoring impact: No functional odor control credit · Tier 4 (masking) classification if used as primary odor agent · Formulation Honesty minor penalty if marketed as odor control
**TIER H4 — GREENWASH BOTANICAL (HARMFUL + "NATURAL" FRAMING) (PET DEODORANT CONTEXT)**
*V4.0 Note*: H4 in leave-on deodorant is the highest-severity greenwash classification in this algorithm series because leave-on + near-certain cat grooming ingestion = continuous toxicity exposure. H4 applies where (a) established species toxicity at realistic leave-on concentrations exists, (b) grooming ingestion pathway is realistic, and (c) misleading "natural/safe" framing is present. This standard is appropriately strict for leave-on products on cats.
- Tea tree oil in any cat leave-on product marketed as "natural antimicrobial deodorant" — H4 (neurotoxic in cats; leave-on = continuous exposure; grooming = oral ingestion)
- Eucalyptus in cat deodorant marketed as "natural freshener" — H4 (toxic to cats; leave-on amplification)
- Pennyroyal in any pet deodorant — H4 (toxic to dogs and cats; any concentration)
- Clove, cinnamon, oregano oils in cat products marketed as "natural botanical deodorant" — H4
- Essential oil blends at functional positions in cat leave-on products labeled "calming botanical formula" — H4
- Peppermint oil in cat leave-on products — H4 (feline glucuronidation limitation + daily grooming ingestion)
Scoring impact: Full species toxicity penalty (leave-on amplification — no rinse-off dilution) · HASE penalty: −0.3 Formulation Honesty · HASE penalty: −0.2 Ingredient Quality · "Natural = safe" framing explicitly called out
**HASE APPLICATION RULES — PET DEODORANT**
1. Every botanical classified H1–H4 before scoring
2. Species context mandatory — leave-on format means post-application licking is near-certain for cats
3. Leave-on context elevates safety scrutiny — no rinse-off dilution protection
4. Position matters for H2 and H3
5. H4 in leave-on is more severe than H4 in rinse-off — continuous exposure + grooming ingestion pathway
6. V4.0: H4 requires realistic toxicity at achievable leave-on + grooming-ingestion doses; theoretical or in vitro-only concerns at trace positions use H2/H3 with monitor note instead
**HASE OUTPUT NOTATION (PET DEODORANT)**
\`[H1 — Evidence-Backed]\` · \`[H2 — Traditional Functional]\` · \`[H3 — Cosmetic/Marketing Level]\` · \`[H4 — Greenwash Risk]\`
---
### EMBEDDED PENALTY LANGUAGE CALIBRATION RULE [MANDATORY — PET DEODORANT]
| Concern Level | When to Use | Example Output Language |
|---|---|---|
| **DISQUALIFIED** | Feline neurotoxic essential oils in cat/multi-species leave-on products | "This ingredient disqualifies the product for this species in a leave-on format. Continuous skin contact and near-certain grooming ingestion make this ingredient unacceptable for cats." |
| **HIGH CONCERN** | Category C toxic ingredients at functional positions in dog leave-on; isopropyl alcohol >2% at likely licking dose in multi-species products | "This ingredient raises a significant safety concern in this leave-on format under regular daily use for [species]." |
| **MODERATE FLAG** | Moderate-risk essential oils at functional positions in dog products; alcohol systems in cat products; synthetic colorants; unlabeled species on potent leave-on actives | "This ingredient warrants attention at its estimated inclusion level in this leave-on formula. It represents a manageable concern but warrants monitoring under daily use." |
| **LOW CONCERN / MONITOR** | Moderate-risk botanicals at trace positions in appropriate species; standard preservatives; PEGs at standard levels; trace cumulative-dose concerns that remain sub-threshold at realistic daily application | "This ingredient is worth noting but presents a low concern at the concentrations expected in this leave-on formula under normal use conditions." |
| **ACCEPTABLE** | Enzymatic actives; cyclodextrin; zinc ricinoleate; glycerin; panthenol; aloe vera at appropriate concentrations; standard preservatives at standard levels | State positively or neutrally. |
**V4.0 Calibration rules for pet deodorant:**
1. Leave-on format does NOT automatically escalate all ingredients to HIGH CONCERN — proportionality is still required
2. Synthetic fragrance in a pet deodorant = Tier 4 masking concern — MODERATE FLAG on Formulation Honesty if marketed as odor elimination; not a toxicity HIGH CONCERN unless species-toxic components identified
3. Propylene glycol in dog deodorant at trace position = LOW CONCERN — not MODERATE FLAG
4. Standard preservatives (phenoxyethanol ≤1%) in leave-on = ACCEPTABLE
5. Artificial colorants in leave-on = MODERATE FLAG — not HIGH CONCERN
6. Alcohol at <1% in dog-only leave-on at position 15+ = LOW CONCERN / MONITOR
7. Where cumulative trace-level dose at 365 days remains sub-threshold per estimated NOAEL: retain monitor-level language
8. Where evidence is only in vitro or theoretical: use "limited evidence" language — not established toxicity framing
---
### EMBEDDED SPECIES PHYSIOLOGY REFERENCE — PET DEODORANT [MANDATORY]
| Parameter | Dog | Cat | Rabbit / Small Animals | Notes for Pet Deodorant |
|---|---|---|---|---|
| Skin pH | 6.2–7.4 | 6.0–7.5 | 6.0–7.0 | Leave-on formula pH must match species range |
| Glucuronidation capacity | Normal | Severely limited | Limited | Cat: every leave-on ingredient metabolized via glucuronidation carries heightened risk; grooming = near-certain oral ingestion; severity proportionate to realistic licking dose |
| Grooming/licking frequency | Moderate | Very high | High | Cat/rabbit: treated coat areas are groomed and ingested; all leave-on ingredients in cat products are effectively partially ingested at each application |
| Essential oil sensitivity (topical + licking) | Moderate | Very high | High | All essential oils in cat leave-on carry realistic licking/ingestion risk; glucuronidation limitation amplifies toxicity proportionately |
| Skin SC layers | 3–5 | 4–6 | Very thin | Thinner than human; barrier vulnerability in leave-on amplified |
**Key formulation consequences for pet deodorant:**
- Leave-on format means 100% of applied ingredients remain on skin and coat between applications
- Cat grooming frequency is very high — all ingredients in a cat deodorant are effectively partially ingested at each application
- Cat glucuronidation is severely limited — liver metabolism of orally ingested leave-on ingredients is compromised; systemic accumulation risk elevated — assessed proportionately to realistic ingested dose
- No rinse-off event exists to dilute or remove ingredient concerns
- Daily use trajectory must consider 30, 90, and 365-day cumulative licking dose — at realistic estimated ingredient concentration, not worst-case
- Species pH: dog 6.2–7.4, cat 6.0–7.5 — leave-on pH outside this range impairs acid mantle and microbiome
- Small animals have very thin skin and high grooming frequency — evaluated at strictest safety standard
---
## LAYER 1 — ODOR CONTROL MECHANISM TIER SYSTEM
### TIER 1 — GENUINE ODOR NEUTRALIZATION
Examples: Enzymatic systems (protease, lipase, oxidase blends) · Zinc ricinoleate · Cyclodextrin · Oxidative neutralizers · Chitosan-based systems [H1 where evidenced]
*Scoring impact*: Maximum Odor Control Efficacy eligibility · Formulation Honesty bonus eligible
### TIER 2 — TARGETED ANTIMICROBIAL CONTROL
Examples: Mild microbiome-considerate antimicrobials · Prebiotics/postbiotics supporting commensal microbiome · Silver-based (with species check) · Zinc acetate/gluconate
### TIER 3 — PHYSICAL ADSORPTION / ABSORPTION
Examples: Baking soda (sodium bicarbonate) · Activated charcoal · Kaolin/bentonite clay · Silica/zeolites
*Note*: Talc in powder formats carries inhalation concern — flag in output.
### TIER 4 — MASKING ONLY
Examples: Synthetic fragrance blends · Essential oil fragrance without neutralization evidence [H3] · Floral waters as primary odor agent [H3] · Aromatic botanical extracts without mechanism [H3]
*Scoring impact*: Minimal Odor Control Efficacy credit · Formulation Honesty penalty if marketed as odor elimination
### ODOR CONTROL SYSTEM CLASSIFICATION
| System | Classification |
|---|---|
| Tier 1 dominant | Excellent |
| Tier 1 + Tier 2 | Excellent (microbiome note) |
| Tier 2 dominant | Good |
| Tier 2 + Tier 3 | Moderate-Good |
| Tier 3 dominant | Moderate |
| Tier 4 dominant | Poor (fragrance masking) |
| Tier 4 with trace Tier 3 | Very Poor |
---
## LAYER 2 — SPECIES pH COMPATIBILITY
| pH Range (Dog reference) | Assessment | Scoring |
|---|---|---|
| 6.2–7.0 | Optimal | Barrier bonus; Microbiome bonus |
| 7.0–7.5 | Acceptable | Neutral |
| 7.5–8.5 | Mild concern | Minor penalty |
| >8.5 | MODERATE FLAG | Moderate penalty |
| <5.5 | Mild-Moderate penalty | Coat protein risk |
| Unknown | No bonus | Minor credibility note |
---
## LAYER 3 — SPECIES TOXICITY SAFETY SYSTEM
### CATEGORY A — SAFE FOR ALL COMMON PET SPECIES
Examples: Food-grade enzymatic odor neutralizers · Cyclodextrin · Zinc ricinoleate · Aloe vera inner leaf gel (low concentration) · Glycerin · Panthenol
*Scoring*: Full safety credit · ACCEPTABLE language
### CATEGORY B — DOG-SAFE, CAT CAUTION
Examples: Most essential oils at functional concentration · Benzalkonium chloride (above trace) · Propylene glycol · Witch hazel (ethanol content) · Phenoxyethanol (concentration-dependent cat concern) · Tea tree oil
*V4.0 Scoring*: Dog-only at functional positions: MODERATE FLAG. Dog-only at trace positions: LOW CONCERN / MONITOR. Cat/multi-species: Mandatory Safety penalty. Leave-on amplification acknowledged but applied proportionately — leave-on daily exposure heightens cumulative concern vs rinse-off for borderline Category B ingredients at functional concentrations; trace-level exposure with realistic sub-threshold cumulative dose remains LOW CONCERN / MONITOR even in leave-on.
### CATEGORY C — HIGH TOXICITY — CATS AND/OR SMALL ANIMALS
Examples: Tea tree (Melaleuca) at functional concentrations in cats · Eucalyptus (cats and small animals) · Clove, cinnamon, thyme oils (cats) · Pennyroyal (dogs and cats at any concentration) · Xylitol (dogs) · Permethrin (cats) · Isopropyl alcohol at licking dose in cat products · Methylparaben/propylparaben at daily oral ingestion from grooming in cats
*Scoring*: Mandatory major Safety penalty · HIGH CONCERN or DISQUALIFIED language as appropriate per calibration rule · H4 HASE classification if marketed as "natural/safe" · Leave-on format amplification: severity elevated vs rinse-off because continuous skin contact + daily grooming ingestion (proportionate to realistic licking dose)
### CATEGORY D — LICKING DOSE ACCUMULATION CONCERN
Examples: Synthetic fragrance compounds (phthalate concern) · Formaldehyde-releasing preservatives · PEGs at elevated concentration · Artificial dyes/colorants
*Scoring*: Cumulative Toxicity Risk penalty (proportionate to position) · Allergy Risk penalty · LOW CONCERN to MODERATE FLAG depending on ingredient count, positions, and whether realistic 90–365 day cumulative licking dose reaches a plausible threshold
---
## LAYER 4 — COAT AND SKIN COMPATIBILITY
**Coat-damaging agents** (leave-on): High alcohol systems · High surfactant in leave-on · High-pH formulas (>8.5) · High-concentration astringents
**Coat-compatible agents**: Low-surfactant systems · Humectants (glycerin, panthenol) · Conditioning polymers (quaternary ammonium at low level) · Chitosan [H1]
**Skin-barrier-disrupting agents** (leave-on): High-concentration alcohols · High preservative load · Broad-spectrum antimicrobials at repeated daily use
**Barrier-compatible agents**: Humectants · Aloe vera [H2] · Panthenol · Chamomile extract [H2] · Colloidal oatmeal [H1]
---
## LAYER 4.5 — COLORANT PENALTY
Artificial colorants in pet deodorants: no odor control or skin benefit.
- Language: MODERATE FLAG — "Synthetic colorants in this leave-on formula add unnecessary sensitization burden at repeated daily exposure without functional benefit."
---
## LAYER 5 — CORE SCORING SYSTEM (Score Range: 1.0–5.0)
### SAFETY [Weight: 0.30]
Species toxicity (per embedded species physiology and Category system) · Licking/ingestion safety at realistic dose (cat grooming frequency = near-certain daily oral ingestion; glucuronidation limitation = amplified toxicity risk — proportionate to realistic daily licking dose) · Dermal sensitization potential · Repeated-use accumulation (daily leave-on = 365-day trajectory assessed at realistic concentrations) · Alcohol and preservative load · Essential oil/fragrance systemic toxicity (HASE-classified) · Chronic low-level irritation burden
### EFFECTIVENESS [Weight: 0.20]
Odor neutralization mechanism tier · Duration of odor control · Root-cause vs symptom masking · Coat penetration and substantivity (leave-on advantage) · Targeted actives for specific odor types · Evidence-supported claims
### ALLERGY RISK [Weight: 0.15]
Essential oil sensitization (leave-on amplification vs rinse-off) · Botanical allergen load (HASE-classified) · Preservative sensitization · Repeated daily-use accumulation · Synthetic colorant sensitization
### ECO IMPACT [Weight: 0.10]
Biodegradability · Environmental persistence · Packaging sustainability · Aquatic toxicity of fragrance/preservative compounds
### INGREDIENT QUALITY [Weight: 0.10]
Odor control mechanism coherence · Active ingredient honesty · Formulation pH appropriateness · HASE tier of botanicals · Absence of decorative inflation
### SKIN / COAT COMPATIBILITY [Weight: 0.15]
Coat cuticle integrity under repeated daily use · Skin barrier resilience · Post-application irritation risk · Microbiome stability · Long-term tolerance · Cumulative sensitization risk · Leave-on pH match to species range
### CORE SCORE FORMULA
\`\`\`
Core Score = (Safety × 0.30) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.10) +
            (Skin/Coat Compatibility × 0.15)
\`\`\`
---
## LAYER 6 — SPECIALIZED DEODORANT PERFORMANCE (Score Range: 1.0–5.0)
### ODOR CONTROL EFFICACY
| Ceiling Rule | Max Score |
|---|---|
| Tier 4 (masking) dominant | 2.5 |
| Tier 3 dominant | 3.2 |
| Tier 2 dominant | 3.8 |
| Tier 1 present at functional level | 5.0 |
### SKIN AND COAT BARRIER PRESERVATION [Dominant]
| Ceiling Rule | Max Score |
|---|---|
| High-alcohol (>5% ethanol/isopropyl) | Max 2.0 |
| Alcohol-free, balanced humectant | Max 4.5 |
| Optimally pH-matched, Tier 1 mechanism, no alcohol | Eligible 5.0 |
| Multi-species with any Category C ingredient | Hard ceiling 1.5 |
### LICKING / INGESTION SAFETY [Unique to Pet Products]
Evaluates: Oral toxicity of all ingredients at realistic licking dose · Species-specific metabolic limitations (cat glucuronidation severely limited) · Cumulative ingestion over daily use · Essential oil systemic risk · Alcohol systemic risk
**Simulation scenarios**:
- Dog product: "Dog licks treated area several times per application"
- Cat product: "Cat grooms treated area fully post-application" — all leave-on ingredients are effectively partially ingested daily; glucuronidation limitation assessed at realistic licking dose
*V4.0 licking safety proportionality rule*: Not every leave-on ingredient in a cat product is equally concerning. Assess each ingredient's realistic daily licking dose (estimated concentration × application volume × grooming fraction). Where the realistic licking dose remains well below any established veterinary or pharmacological threshold, retain monitor-level language. Where the realistic licking dose approaches or exceeds thresholds for a species with glucuronidation limitation, escalate appropriately.
### MICROBIOME COMPATIBILITY
Evaluates: Commensal skin microbiome preservation · Targeted vs broad-spectrum antimicrobial impact · pH-mediated microbial stability · Long-term microbiome balance
### CUMULATIVE TOXICITY AND IRRITATION RISK
Evaluates: Repeated leave-on exposure · Fragrance/essential oil accumulation (position-adjusted) · Preservative sensitization · Colorant irritation burden · Chronic low-grade dermal inflammation · Frequency-weighted licking dose accumulation (cat grooming + glucuronidation limitation — 30/90/365-day trajectory at realistic concentration)
### FORMULATION HONESTY
Evaluates: Fragrance "freshness" positioned as odor elimination · Decorative botanical loading (HASE-classified) · Species safety omissions · "Natural" marketing of species-toxic ingredients (H4 HASE flag) · Dilute enzyme claims at non-functional concentrations · Active concentration realism
### SPECIALIZED PERFORMANCE SCORE
\`\`\`
Specialized Score = Average of:
 Odor Control Efficacy + Skin & Coat Barrier Preservation +
 Licking/Ingestion Safety + Microbiome Compatibility +
 Cumulative Toxicity & Irritation Risk + Formulation Honesty
 (÷ 6)
\`\`\`
---
## LAYER 7 — FINAL RATING
\`\`\`
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
\`\`\`
### HIGH SCORE ELIGIBILITY (>4.0)
Requires: Tier 1 or 2 dominant odor control · No Category C toxic ingredients for target species · pH within species range · No high-concentration alcohol · Licking/Ingestion Safety ≥ 3.5 · Barrier Preservation ≥ 3.5 · Cumulative Toxicity Risk ≥ 3.0 · No fragrance-masking-only architecture · Formulation Honesty ≥ 3.5 · Species label clearly stated

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
---

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🐾 DEODORANT PROFILE

## Functional Classification

Short product classification.

Examples:
- Enzymatic Odor Neutralizer — Dog Safe
- Fragrance-Masking Spray — Species Risk
- Balanced Zinc Ricinoleate Deodorant
- Alcohol-Based Refresher — Cat Unsafe
- Gentle Multi-Mechanism Dog Deodorant

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering odor control mechanism quality, species safety profile, barrier and coat compatibility, licking safety assessment, and overall formulation balance.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in easy language. Mention why it scored as it did.

### Effectiveness — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Allergy Risk — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Eco Impact — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Ingredient Quality — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Skin / Coat Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

# 🧪 SPECIALIZED PERFORMANCE

## Odor Control + Safety Analysis

### Odor Control Efficacy — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Skin & Coat Barrier Preservation — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Licking / Ingestion Safety — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Microbiome Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Cumulative Toxicity & Irritation Risk — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Formulation Honesty — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Weaknesses

- Main structural concern
- Main structural concern
- Main structural concern

---

# 🐕 SPECIES COMPATIBILITY

## Species-Specific Assessment

### Dogs — ⭐X.X

Short explanation.

### Cats — ⭐X.X

Short explanation.

### Small Animals / Rabbits — ⭐X.X

Short explanation.

### Multi-Species Use — ⭐X.X

Short explanation.

---

# 🧴 COAT TYPE COMPATIBILITY

## Coat-Specific Assessment

### Short Coat — ⭐X.X

Short explanation.

### Long / Double Coat — ⭐X.X

Short explanation.

### Sensitive / Allergy-Prone Coat — ⭐X.X

Short explanation.

### Puppy / Kitten (< 12 months) — ⭐X.X

Short explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Twice Daily Use — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Odor masking or neutralization feel
- Post-application coat and skin response
- Licking behavior signal

## Medium-Term (2–4 Weeks)

- Odor control durability
- Coat and skin quality changes
- Sensitization emergence

## Long-Term (1–3 Months)

- Barrier and coat stability
- Microbiome stability
- Cumulative toxicity risk trajectory
- Overall skin and coat outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting odor control mechanism, species safety, licking and ingestion risk, barrier behavior, irritation risk, and long-term coat and skin outcome.

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

3–5 concise user-friendly evidence-based sentences.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO VETERINARY MEDICAL CLAIMS ANYWHERE
- No marketing influence on scoring
- Toxic essential oils, harsh preservatives, colorants, and alcohol systems must be mentioned in output
- No fragrance-freshness bias
- Structural weakness overrides cosmetic or scent appeal
- Odor control mechanism must be classified before scoring
- Species pH compatibility must be assessed
- Species toxicity must be assessed for every ingredient before Safety scoring
- Licking and ingestion dose scenario must be simulated
- Leave-on format means 100% contact time — no rinse-off adjustment applies
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate scent impression
- Scratching at application site = structural failure signal, not "adjustment period"
- Strong scent ≠ odor control effectiveness
- Natural / botanical ≠ species safe
- "Vet approved" claim ≠ ingredient-level safety verification
- Essential oil ≠ therapeutic benefit in leave-on pet product
- Alcohol freshness ≠ skin health benefit
- Natural ≠ automatically safer
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

*Pet Deodorant Evaluation Algorithm — Structured for odor control mechanism analysis, species safety profiling, licking and ingestion safety simulation, and long-term coat and skin health outcome. All scoring is structural and evidence-informed.*

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
              "You are a strict pet deodorant structural evaluation engine."
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