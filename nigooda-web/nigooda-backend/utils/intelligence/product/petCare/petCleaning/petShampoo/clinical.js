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
        "PETSHAMPOO ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
# ALGORITHM 3 — PET SHAMPOO EVALUATION — V4.0
# FULLY SELF-CONTAINED — ALL ENGINES EMBEDDED
# ═══════════════════════════════════════════════
---
## LAYER 0 — FOUNDATION ENGINE
### SYSTEM OBJECTIVE
Reward pet shampoos that demonstrate:
- Effective cleansing with minimal skin barrier disruption
- Appropriate surfactant architecture for animal skin physiology
- Barrier and coat preservation under repeated use
- Long-term microbiome compatibility
- Evidence-based formulation design
- Low cumulative irritation and sensitization risk
- Coat-type and species relevance
Mandatory penalties apply for: Foam-first cleansing architecture · Fragrance-driven "fresh pet" perception · Decorative botanical loading without functional relevance · Harsh surfactant systems marketed as "deep cleansing" · Rinse-off active inflation · Human cosmetic actives repurposed without species justification
---
### TRANSPARENCY PRIORITY RULE
**Ignore**: Branding · Foam richness · "Natural/herbal/organic" marketing · Trend-driven active loading · Ingredient-count inflation · Human skincare cross-marketing
**Evaluate only**: Cleansing efficiency vs barrier cost · Surfactant harshness relative to animal skin pH · pH compatibility with species acid mantle · Post-wash skin and coat impact · Repeated-use tolerance · Microbiome stability · Species safety · Structural formulation honesty
---
### GLOBAL ENFORCEMENT RULES
- Surfactant architecture is the dominant structural determinant
- Species toxicity safety overrides all functional bonuses
- Rinse-off actives cannot compensate for harsh surfactant systems
- Foam volume ≠ cleansing effectiveness
- Fragrance freshness ≠ skin or coat health
- Post-bath scratching or dryness = barrier disruption signal
---
### EMBEDDED INGREDIENT CONCENTRATION & POSITION RULE [MANDATORY — PET SHAMPOO]
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
- Position 13+ + moderate concern → Monitor flag only; no deduction unless species-critical toxicity
- Disqualifying ingredients → Position does not reduce penalty
**RULE 4 — WHAT POSITION CANNOT EXCUSE IN PET SHAMPOO**
- Feline neurotoxic essential oils in cat-labeled or all-pet products at any detectable level
- Mandatory disqualifying ingredients at any position
- Formaldehyde-releasing preservatives (mechanism applies at any concentration)
*V4.0 Application to shampoo essential oils*: Tea tree at position 5 in a dog shampoo = HIGH CONCERN (functional concentration). Tea tree at position 16 in a dog shampoo = LOW CONCERN / MONITOR (trace level, rinse-off format — realistic exposure is low). Tea tree at any position in cat shampoo = MANDATORY DISQUALIFICATION. Lavender at position 9+ in a dog shampoo = LOW CONCERN / MONITOR — do not escalate to MODERATE FLAG based on position alone.
*Application to shampoo botanicals*: Colloidal oatmeal at position 4 = H1 full credit. Aloe vera at position 3 = H2 partial credit. Exotic antioxidant extract at position 19 = H3 notation; no functional credit.
*Application to shampoo preservatives*: Phenoxyethanol at position 14 = ACCEPTABLE. DMDM Hydantoin at any position = MODERATE FLAG (formaldehyde-releasing mechanism).
---
### EMBEDDED HERBAL AUTHENTICITY SCORING ENGINE (HASE) — PET SHAMPOO [MANDATORY]
Every botanical ingredient must be classified H1–H4 before scoring. Species context is mandatory. Position must be considered for H2 and H3 in rinse-off format.
**TIER H1 — EVIDENCE-BACKED BOTANICAL ACTIVES (PET SHAMPOO CONTEXT)**
- Colloidal oatmeal: FDA-recognized skin protectant; documented soothing — Full H1 credit where position suggests functional level
- Chlorhexidine gluconate (medicated): veterinary dermatology evidence — Full credit at functional concentrations
- Salicylic acid: seborrhea/keratolytic evidence — Full credit at functional concentrations
- Sulfur: antimicrobial/antiparasitic/seborrhea evidence — Full credit at functional concentrations
- Benzoyl peroxide: follicular flushing evidence in canine dermatology — Full credit
- Ketoconazole/Miconazole: antifungal evidence — Full credit
- Phytosphingosine: ceramide precursor, barrier repair evidence — Full credit
- Neem oil (dogs): antiparasitic/antifungal topical evidence — H1 partial credit; functional at position 1–8
Scoring impact: Full botanical efficacy credit · HASE bonus +0.2 to Ingredient Quality · Species safety still assessed independently
**TIER H2 — FUNCTIONAL TRADITIONAL BOTANICAL (PET SHAMPOO CONTEXT)**
- Aloe vera: soothing, anti-inflammatory; limited rinse-off substantivity — Partial credit; position-adjusted
- Panthenol: residual conditioning plausible — Partial credit
- Calendula extract: anti-inflammatory — Partial credit
- Chamomile extract: bisabolol anti-inflammatory — Partial credit at functional position
- Lavender at trace/low position in dog shampoo (position 9+): traditional calming/mild antimicrobial — H2 partial credit; cat = H4
- Witch hazel at diluted concentration in dog shampoo: mild astringent — Functional plausibility; partial credit
Scoring impact: Partial functional credit (50%) · No HASE penalty · H2 in rinse-off at position 15+ = cosmetic-level credit only
**TIER H3 — COSMETIC BOTANICAL / MARKETING-LEVEL USE (PET SHAMPOO CONTEXT)**
- Green tea extract at trace position
- Vitamin C in rinse-off shampoo
- Retinoids in rinse-off shampoo
- Peptides in rinse-off shampoo
- Hyaluronic acid in rinse-off shampoo
- Collagen in rinse-off shampoo
- Exotic botanicals without specific rinse-off evidence
Scoring impact: No functional efficacy credit · No penalty · Mild Ingredient Quality note if stacked · Formulation Honesty minor penalty if marketed as key functional benefit
**TIER H4 — GREENWASH BOTANICAL (HARMFUL + "NATURAL" FRAMING) (PET SHAMPOO CONTEXT)**
*V4.0 Note*: H4 in shampoo requires realistic toxicity concern in rinse-off use — considering that the shampoo is diluted in water, in contact for 3–10 minutes, then rinsed. A residual remains on coat and may be licked, particularly in cats. H4 classification is appropriate where the combination of (a) established species-specific toxicity at realistic rinse-off residual concentrations, (b) leave-on residual licking risk, and (c) misleading natural framing exists. Lavender in dogs does NOT meet H4 in shampoo at trace position — it is H2 or H3 with a monitor note.
- Tea tree oil in any cat-labeled or "all pet" shampoo marketed as "natural antimicrobial" — H4 (neurotoxic to cats even at rinse-off residual; any position)
- Pennyroyal in any pet shampoo — H4 (universally toxic; any species; any position)
- Clove, cinnamon, eucalyptus in cat shampoo marketed as "natural" — H4
- Citrus oils (d-Limonene) in cat shampoo — H4
- High-concentration essential oil blends in "natural" cat or all-pet products — H4
Scoring impact: Full species toxicity penalty · HASE penalty: −0.3 Formulation Honesty · HASE penalty: −0.2 Ingredient Quality
**HASE APPLICATION RULES — PET SHAMPOO**
1. Every botanical must be classified H1–H4 before scoring
2. Species context mandatory
3. Position matters for H2 and H3 in rinse-off
4. H4 position cannot reduce penalty for feline neurotoxic botanicals
5. Rinse-off format reduces efficacy credit for most H2 and H3 botanicals
6. V4.0: H4 requires realistic toxicity concern at rinse-off residual concentrations — not theoretical or in vitro-only concern
**HASE OUTPUT NOTATION (PET SHAMPOO)**
\`[H1 — Evidence-Backed]\` · \`[H2 — Traditional Functional]\` · \`[H3 — Cosmetic/Marketing Level]\` · \`[H4 — Greenwash Risk]\`
---
### EMBEDDED PENALTY LANGUAGE CALIBRATION RULE [MANDATORY — PET SHAMPOO]
| Concern Level | When to Use | Example Output Language |
|---|---|---|
| **DISQUALIFIED** | Feline neurotoxic essential oils in cat/all-pet shampoo at any detectable position | "This ingredient disqualifies the product for this species regardless of other formulation qualities." |
| **HIGH CONCERN** | Documented significant toxicity at realistic shampoo use for labeled species; high-risk oils in dog shampoo at positions 1–8 | "This ingredient raises a significant safety concern under regular shampoo use for [species]." |
| **MODERATE FLAG** | Moderate-risk essential oils at functional positions; MIT/CMIT preservatives; harsh surfactant systems; DMDM Hydantoin | "This ingredient warrants attention at its estimated inclusion level. It represents a manageable concern at low frequency use." |
| **LOW CONCERN / MONITOR** | Moderate-risk essential oils at trace positions in appropriate species (position 9+ in dogs); CAPB sensitization potential; standard PEG levels | "This ingredient is worth noting but presents a low concern at expected concentrations in this rinse-off formula." |
| **ACCEPTABLE** | Tier 3/4 surfactants; species-appropriate pH; standard preservatives; glycerin; panthenol | State positively or neutrally. |
**V4.0 Calibration rules for pet shampoo:**
1. CAPB sensitization = LOW CONCERN language — potential sensitizer, not a toxicity concern
2. PEGs at standard shampoo levels = LOW CONCERN / MONITOR — do not catastrophize
3. Phenoxyethanol ≤1% = ACCEPTABLE
4. Tea tree in dog shampoo at position 16+ = LOW CONCERN / MONITOR — trace level, rinse-off; not HIGH CONCERN
5. Lavender in dog shampoo at position 9+ = LOW CONCERN / MONITOR — not MODERATE FLAG
6. Harsh surfactant (Tier 1) = MODERATE FLAG for general use; escalates to HIGH CONCERN for kitten/puppy or cat use
7. High-pH shampoo (>9.0) = MODERATE FLAG — not HIGH CONCERN (unless cat product)
8. Where evidence is only in vitro or emerging: use "limited evidence" or "theoretical concern" language
---
### EMBEDDED SPECIES PHYSIOLOGY REFERENCE — PET SHAMPOO [MANDATORY]
| Parameter | Dog | Cat | Rabbit / Small Pets | Notes for Pet Shampoo |
|---|---|---|---|---|
| Skin SC layers | 3–5 | 4–6 | Thin | All thinner than human (15–20); amplifies surfactant harshness |
| Skin pH | 6.5–7.5 | 6.0–7.5 | ~7.0 | Optimal shampoo pH: 6.5–7.5 |
| Glucuronidation capacity | Normal | Severely limited | Limited | Cat: rinse-off residual licking = ingestion with limited glucuronidation; concern proportionate to realistic residual dose |
| Grooming/licking frequency | Moderate | Very high | High | Cat: residual essential oils post-shampoo = near-certain oral ingestion; realistic residual dose governs penalty |
| Pyrethroid sensitivity | Moderate tolerance | Highly sensitive | Sensitive | Pyrethroid shampoos: cat = absolute disqualification |
| Essential oil sensitivity | Moderate | High | High | Essential oils in cat rinse-off products carry licking/ingestion risk post-bath; severity proportionate to realistic post-rinse residual |
| Skin barrier vulnerability | Higher than human | Highest | Very high | Tier 1 surfactants amplify barrier disruption more severely in thin-skinned species |
**Key formulation consequences for pet shampoo:**
- Animal skin is structurally thinner than human skin — surfactant harshness impacts animals more severely
- Human shampoos at pH 4.5–5.5 may over-acidify animal skin — species-appropriate pH 6.5–7.5 is mandatory
- Cat skin is very thin and most vulnerable — Tier 1 surfactants in cat shampoos are particularly damaging
- Cat grooming frequency is very high — any essential oil residual after shampooing may be ingested; cat glucuronidation is severely limited → concern is real and proportionate to realistic residual concentration
- Puppy/kitten skin is maximally vulnerable — Tier 1 triggers automatic Safety ceiling reduction
---
## LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM [MANDATORY]
### TIER 1 — HARSH
*Examples*: Sodium Lauryl Sulfate (SLS) · Sodium Laureth Sulfate (SLES as primary) · Ammonium Lauryl Sulfate · Ammonium Laureth Sulfate · Linear Alkylbenzene Sulfonate · Sodium C14–16 Olefin Sulfonate · Traditional soap systems
*Scoring*: Mandatory Safety penalties · Barrier Preservation ceiling reduction · High Cumulative Irritation Risk
### TIER 2 — MODERATE
*Examples*: Sodium Cocoyl Isethionate (SCI) · Sodium Lauroyl Methyl Isethionate · Disodium Laureth Sulfosuccinate · SLES in blended systems with Tier 3/4 modifiers
### TIER 3 — MILD
*Examples*: Cocamidopropyl Betaine (CAPB) · Lauryl Betaine · Sodium Cocoamphoacetate · Disodium Cocoamphodiacetate · Sodium Cocoyl Glycinate · Sodium Lauroyl Sarcosinate
*Note on CAPB*: Sensitization potential affects Allergy Risk only — LOW CONCERN language per embedded calibration rule.
### TIER 4 — VERY MILD
*Examples*: Decyl Glucoside · Coco Glucoside · Lauryl Glucoside · Sodium Cocoyl Glutamate · Disodium Cocoyl Glutamate · Sodium Cocoyl Alaninate · Amino acid/glucoside blends
### SURFACTANT SYSTEM CLASSIFICATION
| System | Classification |
|---|---|
| Tier 1 alone | Severe |
| Tier 1 + Tier 3/4 | Moderate-High |
| Tier 2 alone | Moderate |
| Tier 2 + Tier 3/4 | Moderate-Low |
| Tier 3/4 dominant | Low |
| Tier 4 dominant | Very Low |
---
## LAYER 2 — SPECIES-APPROPRIATE pH RULE
| pH Range | Assessment | Scoring Effect |
|---|---|---|
| 6.5–7.5 | Optimal | Barrier Preservation bonus + Microbiome bonus |
| 6.0–6.5 | Acceptable | Neutral |
| 7.5–8.0 | Mild penalty | Minor barrier concern |
| 5.0–6.0 | Mild-moderate penalty | Below species range; human formula signal |
| 8.0–9.0 | Moderate penalty | Barrier stress |
| >9.0 | Significant penalty | Elite Barrier Preservation disqualified |
| <5.0 | Moderate penalty | Human-formulation mismatch |
| Unknown | No bonus | Minor credibility note |
---
## LAYER 3 — SPECIES TOXICITY SAFETY [MANDATORY]
### ESSENTIAL OILS — SPECIES CLASSIFICATION
**DISQUALIFIED — Cats** (any position, any stated concentration):
Tea Tree (Melaleuca) [H4] · Pennyroyal [H4] · Clove [H4] · Cinnamon [H4] · Thyme [H4] · Oregano [H4] · Wintergreen/Methyl Salicylate [H4] · Eucalyptus [H4] · Pine [H4] · Citrus oils (d-Limonene) [H4]
**HIGH CONCERN — Dogs** (position-dependent):
- Tea Tree at position 1–8: HIGH CONCERN
- Tea Tree at position 9–15: MODERATE FLAG
- Tea Tree at position 16+: LOW CONCERN / MONITOR (trace, rinse-off, realistic exposure proportionate)
- Pennyroyal: HIGH CONCERN at any position in dog products
**MODERATE CONCERN** (context-dependent, position-adjusted):
- Lavender in dogs at position 1–8: MODERATE FLAG
- Lavender in dogs at position 9+: LOW CONCERN / MONITOR
- Lavender in cats (any position): MODERATE FLAG (post-rinse licking risk; glucuronidation limitation)
- Peppermint in dogs at position 1–8: MODERATE FLAG
- Peppermint in dogs at position 9+: LOW CONCERN / MONITOR
- Peppermint in cats (any position): MODERATE FLAG
### ESSENTIAL OIL SCORING RULE
| Scenario | Scoring Impact |
|---|---|
| Feline neurotoxin in cat-labeled product (any position) | MANDATORY DISQUALIFICATION — Safety ≤ 1.5 |
| High-risk oil in "all pet" / "dog and cat" product | Mandatory Safety penalty — species-unsuitable flag |
| High-risk oil in dog-only, position 1–8 | HIGH CONCERN — significant Safety penalty |
| High-risk oil in dog-only, position 9–15 | MODERATE FLAG |
| High-risk oil in dog-only, position 16+ rinse-off | LOW CONCERN / MONITOR |
| Moderate-risk oils, dog, position 1–8 | MODERATE FLAG |
| Moderate-risk oils, dog, position 9+ | LOW CONCERN / MONITOR |
| Fragrance-heavy without essential oil specification | Allergy Risk penalty; Formulation Honesty note |
| Fragrance-free | Safety bonus; Allergy Risk bonus |
### PRESERVATIVE EVALUATION
| Preservative | Assessment | Language |
|---|---|---|
| Phenoxyethanol ≤1% | ACCEPTABLE | Standard preservative |
| Sodium Benzoate | ACCEPTABLE | Standard preservative |
| Potassium Sorbate | ACCEPTABLE | Low concern |
| Methylparaben / Propylparaben | LOW CONCERN | Minor Allergy Risk note |
| DMDM Hydantoin | MODERATE FLAG | Formaldehyde-releasing; Allergy Risk penalty |
| MIT or CMIT/MIT blend | HIGH CONCERN | High sensitization — Allergy Risk penalty |
| Benzalkonium Chloride (non-medicated) | MODERATE FLAG | Microbiome disruption concern |
### COLORANT PENALTY RULE
Artificial/decorative colorants: unnecessary sensitization.
- Language: MODERATE FLAG — "Synthetic colorants add sensitization burden without functional benefit in this formula."
---
## LAYER 4 — RINSE-OFF ACTIVE EFFICACY
Contact time: ~3–10 minutes
### CATEGORY A — FULL CREDIT
Chlorhexidine Gluconate (medicated) [H1] · Benzoyl Peroxide (canine) [H1] · Salicylic Acid (seborrhea) [H1] · Sulfur [H1] · Ketoconazole/Miconazole [H1] · Phytosphingosine [H1] · Colloidal Oatmeal [H1]
### CATEGORY B — PARTIAL CREDIT
Glycerin · Panthenol [H2] · Aloe Vera [H2 — position-adjusted] · Zinc PCA · Niacinamide (limited rinse-off) · Urea at functional levels
### CATEGORY C — DECORATIVE / NO MAJOR CREDIT
Vitamin C [H3] · Retinoids [H3] · Peptides [H3] · Hyaluronic Acid [H3] · Collagen [H3] · Most antioxidant botanicals [H3]
---
## LAYER 5 — MICROBIOME IMPACT RULE
**High microbiome disruption risk**: High-pH systems (>8.0) · Broad-spectrum antimicrobials without medicated justification · Triclosan · Chlorhexidine (non-medicated) · Benzalkonium Chloride · High-concentration antimicrobial essential oils at functional positions · SLS-dominant systems · Alcohol >5%
**Low disruption risk**: Tier 3–4 surfactants at species-appropriate pH · Targeted medicated antimicrobials · Prebiotic/postbiotic support at functional levels
---
## LAYER 6 — COAT-TYPE COMPATIBILITY
| Coat Type | Primary Needs | Key Risks |
|---|---|---|
| Short/single coat | Mild cleansing, barrier support | Over-stripping, easy dryness |
| Long/double coat | Thorough cleansing, conditioner penetration | Buildup, incomplete rinsing |
| Curly/wavy coat | Gentle cleansing + strong conditioning | Frizz, moisture loss |
| Wiry coat | Texture-preserving, non-stripping | Texture loss from harsh surfactants |
| Cat coat | Ultra-gentle, minimal contact | Species toxicity risk; thin skin; post-bath licking |
| Puppy/kitten coat | Maximum mildness | Tier 1 triggers automatic Safety ceiling reduction |
---
## LAYER 7 — CORE SCORING SYSTEM (Score Range: 1.0–5.0)
### SAFETY [Weight: 0.30]
Species toxicity (HASE-classified) · Surfactant harshness relative to animal skin thinness · Barrier disruption risk · Repeated-use irritation · Sensitization potential · pH-related barrier stress · Cumulative inflammatory load · Long-term tolerance · Puppy/kitten vulnerability · Post-rinse coat residual licking risk in cats (high grooming frequency + glucuronidation limitation — proportionate to realistic residual)
### EFFECTIVENESS [Weight: 0.18]
Dirt/debris/dander removal · Sebum removal · Coat residue removal · Rinse-off active efficacy (HASE-classified) · Cleansing-to-barrier balance · pH suitability · Conditioning performance
### ALLERGY RISK [Weight: 0.17]
Fragrance exposure · Essential oil sensitizers (HASE-classified) · Preservative sensitizers (CAPB = LOW CONCERN per calibration rule) · Botanical allergens · Colorant sensitization · Licking/ingestion exposure (cat grooming and glucuronidation — proportionate)
### ECO IMPACT [Weight: 0.10]
Surfactant biodegradability · Environmental persistence · Aquatic accumulation risk · Species-toxic essential oils in wastewater
### INGREDIENT QUALITY [Weight: 0.12]
Surfactant system coherence · Rinse-off active honesty · HASE tier of botanicals · Absence of decorative inflation
### SKIN COMPATIBILITY [Weight: 0.13]
Species-appropriate formulation · Daily-use and regular-bath tolerance · Barrier resilience · Post-bath scratching signals · Coat and skin microbiome stability
### CORE SCORE FORMULA
\`\`\`
Core Score = (Safety × 0.30) + (Effectiveness × 0.18) + (Allergy Risk × 0.17) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.12) + (Skin Compatibility × 0.13)
\`\`\`
---
## LAYER 8 — SPECIALIZED PET SHAMPOO PERFORMANCE (Score Range: 1.0–5.0)
### CLEANSING EFFICIENCY
Evaluates: Dirt/debris/dander removal · Sebum removal · Odor neutralization vs masking · Pore/follicular cleansing (medicated formulas)
### BARRIER PRESERVATION [Dominant]
| System | Barrier Preservation Ceiling |
|---|---|
| Tier 1 dominant | Max 1.8 |
| Tier 1 + Tier 3/4 | Max 2.5 |
| Tier 2 dominant | Max 3.0 |
| Tier 2 + Tier 3/4 | Max 3.5 |
| Tier 3/4 dominant | Max 4.2 |
| Tier 3/4 at species pH 6.5–7.5 | Eligible 5.0 |
| Soap systems (pH >8.5) | Hard ceiling 1.8 |
| Human formula pH <5.5 on pets | Ceiling 3.2 |
### COAT QUALITY SUPPORT
Evaluates: Coat softness and manageability · Coat texture preservation · Detangling and conditioning · Reduced static and frizz
### HYDRATION SUPPORT
Evaluates: Residual humectant benefit · Post-bath moisture retention · Conditioner substantivity
### RESIDUAL DRYNESS RISK
Evaluates: Post-bath skin tightness · Coat dryness/brittleness · Lipid depletion trajectory · pH-mediated dehydration · Bathing frequency amplification
### MICROBIOME COMPATIBILITY
Evaluates: Commensal microbiome preservation · pH-mediated microbial stability · Antimicrobial selectivity · Malassezia/Staphylococcus balance
### CUMULATIVE IRRITATION RISK
Evaluates: Repeated surfactant exposure · Fragrance/essential oil accumulation (position-adjusted) · Preservative sensitization · Synthetic colorant burden · Bathing frequency-weighted exposure · Licking/ingestion amplification (cat grooming and glucuronidation — proportionate to realistic residual)
### SPECIES SAFETY SCORE
| Scenario | Score |
|---|---|
| No toxic ingredients; species-labeled accurately | 4.5–5.0 |
| No toxic ingredients; "all pet" without cat-specific concern | 3.5–4.5 |
| Moderate-risk essential oils at low/trace positions in dogs | 3.5–4.2 |
| Moderate-risk essential oils at functional positions in dogs | 2.5–3.5 |
| High-risk oils (Tea Tree) in dog product at position 1–8 | 1.5–2.5 |
| High-risk oils (Tea Tree) in dog product at position 9+ | 2.5–3.2 |
| Known feline neurotoxin in cat/all-pet product | 1.0 (floor) |
| Veterinary-validated medicated formula | 4.5–5.0 |
### FORMULATION HONESTY
Evaluates: Foam-dependent cleansing marketing · Fragrance-driven "freshness" · Decorative botanical loading (HASE H3/H4) · Human actives cross-marketed to pets · "Natural/herbal = safe for pets" false equivalence (H4 flag) · Species label accuracy
### SPECIALIZED PERFORMANCE SCORE
\`\`\`
Specialized Score = Average of:
 Cleansing Efficiency + Barrier Preservation + Coat Quality Support +
 Hydration Support + Residual Dryness Risk + Microbiome Compatibility +
 Cumulative Irritation Risk + Species Safety Score + Formulation Honesty
 (÷ 9)
\`\`\`
---
## LAYER 9 — FINAL RATING
\`\`\`
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
\`\`\`
### HIGH SCORE ELIGIBILITY (>4.0)
Requires: Tier 3 or 4 dominant surfactant · pH 6.5–7.5 · Barrier Preservation ≥ 3.5 · Cumulative Irritation Risk ≥ 3.0 · Species Safety Score ≥ 4.0 · No rinse-off active inflation · No dominant fragrance/essential oil loading · No toxic essential oils · Formulation Honesty ≥ 3.5
---
## LAYER 9.5 — REAL-WORLD USAGE SIMULATION
Simulate: Bathing frequency (every 2–4 weeks for dogs; monthly or less for cats) · High-frequency therapeutic bathing (weekly) · Barrier stress accumulation · Long-term sebum and lipid depletion · Post-bath pH recovery · Licking exposure pathway over repeated uses (cat grooming — assessed at realistic residual concentration) · Small/toy breed dermal dose amplification

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level


---

# 🐾 SHAMPOO PROFILE

## Functional Classification

Short classification.

Examples:
- Gentle Daily Dog Shampoo
- Harsh Foaming Pet Shampoo
- Medicated Veterinary Shampoo
- Cat-Safe Mild Syndet Shampoo
- Fragrance-Heavy Cosmetic Pet Shampoo

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering surfactant mildness, barrier friendliness, species-appropriate pH, species toxicity status, long-term skin and coat behavior, and overall formulation balance.

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

### Skin Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

# 🧪 SPECIALIZED PERFORMANCE

## Coat & Skin Health Analysis

### Cleansing Efficiency — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Barrier Preservation — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Coat Quality Support — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Hydration Support — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Residual Dryness Risk — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Microbiome Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Cumulative Irritation Risk — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Species Safety Score — ⭐X.X

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

# 🐶🐱 SPECIES & COAT COMPATIBILITY

## Species-Specific Assessment

### Dogs — ⭐X.X

Short explanation.

### Cats — ⭐X.X

Short explanation.

### Puppies / Kittens — ⭐X.X

Short explanation.

### Sensitive-Skin Pets — ⭐X.X

Short explanation.

### Oily / Sebaceous Coats — ⭐X.X

Short explanation.

### Long / Double Coats — ⭐X.X

Short explanation.

### Short / Single Coats — ⭐X.X

Short explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Regular Bathing (Every 2–4 Weeks) — ⭐X.X

Short explanation.

### Weekly Therapeutic Bathing — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Post-bath cleansing feel and coat finish
- Irritation or scratching signals
- Fragrance load perception

## Medium-Term

- Barrier and coat response
- Dryness or sebum changes
- Tolerance development

## Long-Term

- Barrier stability
- Coat texture stability
- Microbiome stability
- Overall skin and coat outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleansing system, barrier behavior, irritation risk, active performance, species safety status, and long-term skin and coat outcome.

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

- NO MEDICAL OR VETERINARY CLAIMS ANYWHERE
- No marketing influence on scoring
- Harsh colorants, preservatives, fragrances, and toxic essential oils must be mentioned in output
- No foam-volume bias — lather richness ≠ cleansing power
- Structural weakness overrides cosmetic feel
- Surfactant harshness must be classified before scoring
- Species-appropriate pH must be assessed for all formulations
- Species toxicity must be assessed before Safety scoring
- Rinse-off active efficacy must be classified before Effectiveness scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-bath scratching = structural failure signal, not "deep clean"
- Natural essential oil ≠ species-safe
- Natural soap ≠ safe (pH 8–10 is structurally harmful for animal skin)
- Fragrance freshness ≠ skin or coat health benefit
- Licking exposure pathway must be considered for all fragrance and essential oil risk
- Tea Tree Oil in any cat or all-pet product = mandatory Safety penalty regardless of concentration
- Natural ≠ automatically safer
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

*Pet Shampoo Evaluation Algorithm — Structured for canine and feline dermatology-informed surfactant analysis, species safety assessment, barrier compatibility evaluation, and long-term coat and skin health outcome. All scoring is structural and evidence-informed.*

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
              "You are a strict pet shampoo structural evaluation engine."
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
    console.log("\n=========== RAW AI RESPONSE ===========\n");
console.log(result);
console.log("\n=======================================\n");

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();