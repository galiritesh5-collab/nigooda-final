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
        "PETSOAP ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
# ALGORITHM 2 — PET SOAP EVALUATION — V4.0
# FULLY SELF-CONTAINED — ALL ENGINES EMBEDDED
# ═══════════════════════════════════════════════
---
## LAYER 0 — FOUNDATION ENGINE
### SYSTEM OBJECTIVE
Reward pet soaps that demonstrate:
- Effective cleansing with minimal barrier disruption given inherent soap-pH constraints
- Transparent acknowledgment of soap-format structural limitations
- Barrier mitigation through superfatting, conditioning oils, or co-surfactant inclusion
- Species-appropriate formulation consideration despite soap pH constraints
- Low cumulative irritation risk under realistic bathing frequency
- Evidence-based functional ingredient design
- Honest positioning relative to syndet alternatives
**Fundamental structural reality**: True soap is an inherently high-pH cleansing format. No soap, regardless of oil blend, superfatting level, or botanical addition, can fully overcome its structural pH disadvantage for animal skin. High scores are structurally limited by soap format. A soap that scores well does so by minimizing damage within its format constraints.
---
### SOAP vs SYNDET CLASSIFICATION [MANDATORY PRE-EVALUATION]
**TRUE SOAP**: Saponified oils/fats (Sodium Olivate, Sodium Cocoate, Sodium Palmate, Sodium Tallowate, etc.) · pH 8.5–10 by chemistry · Cannot achieve physiological pH without synthetic adjustment · Inherently applies Soap Format Penalty
**SYNDET BAR**: Synthetic detergent in solid bar form · Can achieve pH 6.5–7.5 · Evaluated under Pet Shampoo Algorithm with bar-format modifiers · Does NOT receive Soap Format Penalty
**HYBRID**: Contains both saponified fats AND synthetic surfactants · Partial Soap Format Penalty proportional to soap fraction
**MEDICATED SOAP**: Contains active veterinary ingredients (Sulfur, Neem, Chlorhexidine, Benzoyl Peroxide) · Evaluated under standard layers with medicated active credit · Soap Format Penalty still applies to barrier and pH scoring
*If format ambiguous: default to True Soap classification.*
---
### TRANSPARENCY PRIORITY RULE
**Ignore**: "Natural/organic/handmade/artisan" positioning · Foam richness · Exotic oil blends · "Cold process = gentle" claims · Floral/herbal scent · Ingredient-count inflation
**Evaluate only**: Soap base harshness tier · Superfatting level · pH structural reality · Species toxicity · Rinse-off active efficacy · Repeated-use tolerance · Microbiome stability · Formulation honesty
---
### GLOBAL ENFORCEMENT RULES
- Soap pH (8.5–10) is the dominant structural constraint
- "Natural" framing does not reduce barrier disruption from high pH
- Species toxicity safety overrides all functional bonuses
- Superfatting reduces harshness but cannot fully offset soap pH penalty
- Lather quality ≠ cleansing safety
- Essential oil fragrance ≠ skin or coat health
- Post-bath scratching, dryness, or coat brittleness = barrier disruption signal
- "Cold process preserves skin nutrients" = marketing claim; not a functional benefit for rinse-off contact
- Handmade soap lacks pH standardization — batch variability increases scoring uncertainty
---
### EMBEDDED INGREDIENT CONCENTRATION & POSITION RULE [MANDATORY — PET SOAP]
**RULE 1 — EXPLICIT CONCENTRATION STATED**
If a percentage or concentration is explicitly stated on the product label or in technical documentation:
- Evaluate the ingredient at that exact stated concentration
- Apply safety, efficacy, and toxicity assessments calibrated to that specific dose
- Do not default to worst-case assumptions
- Explicitly reference the stated concentration in output scoring rationale
**RULE 2 — NO CONCENTRATION STATED (POSITION-BASED EVALUATION)**
| Position in List | Estimated Concentration Range | Evaluation Approach |
|---|---|---|
| 1st–3rd ingredient | Very high (dominant base/carrier) | Full safety + efficacy weight applied |
| 4th–8th ingredient | Moderate-high (functional level likely) | Standard safety + moderate efficacy credit |
| 9th–15th ingredient | Low-moderate (supporting/functional) | Proportional credit; reduced penalty for moderate-concern items |
| 16th–20th ingredient | Low (trace to minor functional) | Minimal penalty for moderate-concern items; decorative credit for actives |
| 20th+ ingredient | Trace level | Monitor-only flag for moderate concerns; no penalty for low-concern items |
**RULE 3 — PENALTY PROPORTIONALITY BY POSITION**
- Position 1–5 + moderate concern ingredient → Full moderate penalty applied
- Position 6–12 + moderate concern ingredient → Reduced penalty (50% weight)
- Position 13+ + moderate concern ingredient → Monitor flag only; no score deduction unless species-critical toxicity
- High-concern or disqualifying ingredients → Position does not reduce penalty
**RULE 4 — WHAT POSITION CANNOT EXCUSE IN PET SOAP**
- Known species-lethal toxins (feline neurotoxic essential oils) at any detectable level in cat-labeled products
- Mandatory disqualifying ingredients at any position
**V4.0 Essential oil position penalties in soap — amplified context**:
Bar soap contact time during manual lathering (2–5 minutes) is longer than shampoo. Residual essential oil on coat after rinsing persists — licking risk remains post-bath. Essential oil position penalties in soap are therefore somewhat amplified versus shampoo algorithm. However, amplification applies proportionately — a trace-level essential oil at position 18 in a rinse-off bar soap for dogs does not become a disqualifier; it becomes a monitor-level note acknowledging the post-rinse licking residual as a low concern.
- Essential oil at position 1–3 in cat soap → Full species toxicity assessment (feline neurotoxic class = disqualification)
- Lavender at position 3 in dog soap → MODERATE FLAG (high relative concentration + lathering contact time)
- Lavender at position 15 in dog soap → LOW CONCERN / MONITOR (trace level, rinse-off, lower exposure)
- Tea tree at position 8 in dog soap → MODERATE FLAG
- Tea tree at position 18 in dog soap → LOW CONCERN / MONITOR (trace, rinse-off, proportionate to realistic residual)
*Application to soap botanicals (HASE)*: Neem at position 1–8 in a dog soap = H1 functional antiparasitic/antifungal credit applicable. Neem at position 15+ = no functional credit; MONITOR note; H3 level classification for this product.
*Application to medicated actives*: Sulfur at position 3–6 = full medicated credit. Sulfur at position 15+ = partial credit; stated concentration preferred.
---
### EMBEDDED HERBAL AUTHENTICITY SCORING ENGINE (HASE) — PET SOAP [MANDATORY]
Every botanical ingredient must be classified H1–H4 before scoring. Species context is mandatory. Position must be considered for H2 and H3 classifications.
**TIER H1 — EVIDENCE-BACKED BOTANICAL ACTIVES (PET SOAP CONTEXT)**
- Neem oil (dogs): antiparasitic/antifungal evidence at topical use concentrations — Full topical botanical efficacy credit; functional credit requires plausible concentration (position 1–8); cat: LOW CONCERN/MONITOR at low positions
- Colloidal oatmeal: FDA-recognized skin protectant; soothing evidence substantive — Full H1 credit where position suggests functional level
- Sulfur (dogs and cats, with cat ingestion caution): antimicrobial, antiparasitic, seborrhea evidence — Full H1 medicated credit at functional concentrations
- Zinc pyrithione: antifungal, antiseborrheic evidence — Full H1 credit
Scoring impact: Full botanical efficacy credit · HASE bonus +0.2 to Ingredient Quality · Species safety still assessed independently
**TIER H2 — FUNCTIONAL TRADITIONAL BOTANICAL (PET SOAP CONTEXT)**
- Aloe vera at rinse-off functional position (1–12): soothing, anti-inflammatory — Partial rinse-off credit
- Calendula extract at functional position: anti-inflammatory, wound soothing — Partial credit
- Rosemary extract as antioxidant (if at functional position): reasonable mechanism — Partial credit
- Lavender oil at trace/low position in dog products (position 9+): mild antimicrobial traditional use — H2 partial credit in dog-only soap; cat = H4 flag regardless of position
- Shea butter (unsaponified fraction): conditioning residue credit — H2 functional partial credit
Scoring impact: Partial functional credit (50%) · No HASE penalty · H2 at position 15+ in rinse-off = cosmetic-level credit only
**TIER H3 — COSMETIC BOTANICAL / MARKETING-LEVEL USE (PET SOAP CONTEXT)**
- Green tea extract at trace position (no rinse-off evidence)
- Vitamin C in rinse-off soap (rinsed before benefit achieved)
- Peptides in rinse-off soap (no substantivity)
- Hyaluronic acid in rinse-off soap
- Collagen in rinse-off soap
- Exotic botanicals (açai, turmeric, spirulina) without specific rinse-off mechanism evidence
- Activated charcoal without credible clay co-inclusion
Scoring impact: No functional efficacy credit · No penalty · Mild Ingredient Quality note if stacked · Formulation Honesty minor penalty if marketed as functional
**TIER H4 — GREENWASH BOTANICAL (HARMFUL + "NATURAL" FRAMING) (PET SOAP CONTEXT)**
*V4.0 Note*: H4 classification in rinse-off soap requires realistic toxicity concern at achievable post-rinse residual licking concentrations for the labeled species. Not all essential oils in soap achieve H4 — the combination of species neurotoxicity AND realistic licking dose from soap residual AND misleading natural framing is required for H4. For cats, the bar is lower given glucuronidation limitation and high grooming frequency.
- Tea tree oil in any cat-labeled or "all pet" soap marketed as "natural antimicrobial" — H4 (neurotoxic to cats; residual post-rinse licking risk is realistic)
- Pennyroyal in any pet soap marketed as "natural flea repellent" — H4 (toxic to dogs and cats at any concentration)
- Clove oil in cat soap marketed as "natural antibacterial" — H4 (toxic to cats at post-rinse licking doses)
- Eucalyptus in cat soap framed as "natural freshener" — H4 (toxic to cats)
- High-concentration citrus/d-Limonene in cat products marketed as "natural freshening" — H4
- Lavender in cat soap marketed as "safe botanical calming" — MODERATE FLAG (feline sensitivity; licking risk post-rinse; limited evidence of acute toxicity in cats at rinse-off residual levels — use proportionate language, not full H4 unless concentration evidence supports it)
Scoring impact: Full species toxicity penalty · HASE penalty: −0.3 Formulation Honesty · HASE penalty: −0.2 Ingredient Quality · "Natural = safe for pets" framing explicitly called out
**HASE APPLICATION RULES — PET SOAP**
1. Every botanical must be classified H1–H4 before scoring
2. Species context mandatory
3. Position matters for H2 and H3 in rinse-off soap
4. H4 in soap requires realistic licking residual toxicity concern, not just theoretical topical concern
5. Rinse-off context modifies efficacy credit — most H2 and H3 botanicals receive reduced credit
6. Essential oils with genuine antimicrobial or therapeutic rationale AND appropriate species safety = H1 or H2
**HASE OUTPUT NOTATION (PET SOAP)**
- \`[H1 — Evidence-Backed]\` · \`[H2 — Traditional Functional]\` · \`[H3 — Cosmetic/Marketing Level]\` · \`[H4 — Greenwash Risk]\`
---
### EMBEDDED PENALTY LANGUAGE CALIBRATION RULE [MANDATORY — PET SOAP]
| Concern Level | When to Use | Example Output Language |
|---|---|---|
| **DISQUALIFIED** | Feline neurotoxic essential oils in cat/all-pet soap at functional or near-functional concentrations | "This ingredient disqualifies the product for this species regardless of other formulation qualities." |
| **HIGH CONCERN** | Ingredients with documented significant toxicity at realistic soap use concentrations for the labeled species; Tier 1 soap base on cat or puppy products | "This ingredient raises a significant safety concern under regular soap use for [species]. We recommend avoiding this product." |
| **MODERATE FLAG** | High-pH soap (>9.0) barrier disruption; moderate-risk essential oils at functional positions; soap format on puppy/kitten skin; artificial colorants | "This characteristic warrants attention. At its likely inclusion level and format, it represents a manageable concern when used at appropriate frequency." |
| **LOW CONCERN / MONITOR** | Moderate-risk essential oils at trace positions in appropriate species; standard soap pH 8.5–9.0; handmade batch variability | "This characteristic is worth noting but presents a low concern under recommended bathing frequency." |
| **ACCEPTABLE** | Tier 3–4 soap bases at appropriate frequency; standard soap for dogs at low bathing frequency; medicated actives at functional concentrations | State positively or neutrally. No warning language needed. |
**V4.0 Calibration rules for pet soap:**
1. Standard soap pH 8.5–9.5 receives MODERATE FLAG language — not HIGH CONCERN catastrophizing
2. Never use DISQUALIFIED language for non-disqualifying concerns (high pH alone = MODERATE FLAG, not DISQUALIFIED)
3. Soap format structural limitations are stated factually and honestly, not as crisis language
4. Lavender in dogs at trace soap position = LOW CONCERN / MONITOR — not MODERATE FLAG
5. Superfatting described positively where genuine mitigation exists
6. "Synthetic colorants" in pet soap = MODERATE FLAG — not HIGH CONCERN
7. Propylene glycol in dog soap at position 10+ = LOW CONCERN — not MODERATE FLAG
8. Essential oil at trace/low position (15+) in a rinse-off dog soap = LOW CONCERN / MONITOR — do not escalate because of rinse-off residual alone unless realistic licking dose supports it
9. Where toxicological evidence for a soap essential oil concern is only theoretical or in vitro, document as "limited evidence" concern rather than established risk
---
### EMBEDDED SPECIES PHYSIOLOGY REFERENCE — PET SOAP [MANDATORY]
| Parameter | Dog | Cat | Rabbit / Small Pets | Notes for Pet Soap |
|---|---|---|---|---|
| Skin SC layers | 3–5 | 4–6 | Thin | All thinner than human (15–20); amplifies soap pH impact |
| Skin pH | 6.5–7.5 | 6.0–7.5 | ~7.0 | Soap at pH 8.5–10 creates 1.5–4.0 unit gap |
| Glucuronidation capacity | Normal | Severely limited | Limited | Cat: residual essential oil post-rinse = licking ingestion with poor glucuronidation; concern proportionate to realistic post-rinse licking dose |
| Grooming/licking frequency | Moderate | Very high | High | Cat/rabbit: post-soap-bath licking of coat residuals is realistic; glucuronidation limitation amplifies concern proportionately |
| Pyrethroid sensitivity | Moderate tolerance | Highly sensitive | Sensitive | Pyrethroid-containing soaps: cat and rabbit = absolute disqualification |
| Essential oil sensitivity (topical + licking) | Moderate | High | High | Essential oil residual on coat after soap rinse is licked off by cats; severity proportionate to residual concentration and oil toxicology |
| Skin SC barrier thickness | Thin | Very thin | Very thin | Soap pH amplification of barrier disruption is greater in thin-skinned species |
**Key formulation consequences for pet soap:**
- All animal skin is structurally thinner than human skin — soap pH impact is amplified
- Cat skin has very thin stratum corneum — soap pH 9+ represents significant barrier stress for cats
- Cat grooming frequency is very high — post-soap-bath licking of coat residuals is realistic; every essential oil residual with established feline toxicity is a genuine concern
- Cat glucuronidation is severely limited — essential oil licking residuals carry heightened systemic risk, proportionate to the realistic residual concentration
- Essential oil penalties in soap are amplified vs shampoo because bar soap contact time is longer (2–5 min manual lathering) and residual essential oil concentration is often higher than in diluted shampoo — but amplification remains proportionate to realistic post-rinse residual dose
---
## LAYER 1 — SOAP BASE HARSHNESS TIER SYSTEM
All soap bases must be classified by harshness tier before scoring.
### TIER 1 — HARSH SOAP BASES
*Examples*: Sodium Cocoate (high lauric acid ~48%) · Sodium Palmate · Sodium Tallowate · Sodium Laurate · Sodium Myristate · Coconut-dominant bars (>50% coconut)
*Scoring impact*: Maximum Soap Format Penalty · Barrier Preservation ceiling further reduced · HIGH CONCERN language appropriate for cat/puppy use
### TIER 2 — MODERATE SOAP BASES
*Examples*: Sodium Palmate/Palm Kernelate blends · Sodium Tallowate in balanced blends · Sodium Cocoate at low fraction (<30%)
*Scoring impact*: Standard Soap Format Penalty · Moderate Barrier Preservation ceiling
### TIER 3 — MILDER SOAP BASES
*Examples*: Sodium Olivate · Sodium Castorate · Sodium Sunflowerate · Sodium Safflowerate · Sodium Avocadate · Hemp seed oil soap · Shea butter soap (Sodium Shea Butterate)
*Scoring impact*: Reduced Soap Format Penalty (partial mitigation, not elimination) · Higher Barrier Preservation ceiling than Tier 1/2
### TIER 4 — MILDEST SOAP BASES
*Examples*: High-oleic soap at 8–20% superfat · Castor oil dominant (>30%) + olive/shea blend · Triple-butter soap with low coconut fraction (<15%) at high superfat
*Scoring impact*: Minimum Soap Format Penalty (cannot be zero for true soap) · Eligible for best Barrier Preservation within soap format ceiling
### SOAP BASE SYSTEM CLASSIFICATION TABLE
| System | Classification |
|---|---|
| Tier 1 dominant, low/no superfat | Severe |
| Tier 1 dominant, high superfat | Moderate-High |
| Tier 2 dominant | Moderate |
| Tier 2 + Tier 3, high superfat | Moderate-Low |
| Tier 3 dominant, good superfat | Low-Moderate |
| Tier 4 dominant, high superfat | Low (within soap format limits) |
*No soap system qualifies as "gentle" by syndet standards. Tier 3–4 soaps with high superfat represent the least harmful soap option, not a safe option.*
---
## LAYER 2 — SUPERFATTING EVALUATION
| Superfat Level | Assessment | Scoring Effect |
|---|---|---|
| 0–2% | Minimal | No mitigation |
| 3–5% | Low | Minor mitigation |
| 6–10% | Moderate | Meaningful conditioning residue; moderate mitigation |
| 11–20% | High | Good mitigation (within soap limits) |
| >20% | Very high | Diminishing returns; incomplete cleansing risk |
**Critical rules**:
- Superfatting reduces harshness but cannot overcome soap pH
- pH 9.0 at 15% superfat is still pH 9.0
- Superfatting improves Barrier Preservation ceiling by 0.3–0.5 maximum
- Superfatting does NOT improve Microbiome Compatibility (pH-dependent, not fat-dependent)
- Unknown superfat = no mitigation credit
---
## LAYER 3 — SOAP FORMAT PENALTY [MANDATORY]
Every true soap receives a mandatory Soap Format Penalty regardless of oil blend or superfat.
| Soap Type | Penalty Applied To |
|---|---|
| True soap (any tier) | Safety · Barrier Preservation · Microbiome Compatibility · Cumulative Irritation Risk |
| Hybrid (soap + syndet) | Partial penalty — proportional to soap fraction |
| Syndet bar | No Soap Format Penalty |
**Soap Format Penalty cannot be offset by**: Exotic oil blends · Superfat beyond defined ceiling · Botanical additives · Essential oil additions · "Cold process" methodology · Organic certification · Medicated actives (active credit applies separately; pH penalty remains)
---
## LAYER 4 — SPECIES pH IMPACT
| Species | Optimal Range | Soap pH Gap |
|---|---|---|
| Dog | 6.5–7.5 | 1.5–2.5 units above optimal |
| Cat | 6.0–7.5 | 1.5–4.0 units above optimal |
| Rabbit/small pets | ~7.0 | 1.5–3.0 units above optimal |
| pH Range | Assessment | Scoring Effect |
|---|---|---|
| 6.5–7.5 | Species-optimal (syndet only — impossible in true soap) | Maximum scores eligible |
| 7.5–8.5 | Mild barrier concern | Minor penalties |
| 8.5–9.0 | Standard soap range — meaningful disruption | MODERATE FLAG |
| 9.0–9.5 | High-range soap — significant disruption | HIGH CONCERN |
| >9.5 | Very high — maximum disruption | HIGH CONCERN; Barrier Preservation hard-capped |
| Unknown (handmade) | Assume 9.0–10.0 | Full standard soap penalty |
*Handmade/artisan soap claiming "skin-safe pH" without measurement validation → Formulation Honesty penalty*
---
## LAYER 5 — SPECIES TOXICITY SAFETY [MANDATORY]
Essential oil contact time during lathering (2–5 minutes) is longer than liquid shampoo. Residual essential oil on coat after rinsing persists — licking risk remains (cat grooming frequency very high; glucuronidation severely limited). Essential oil concerns in soap are amplified versus shampoo, but remain proportionate to realistic post-rinse residual dose.
### ESSENTIAL OILS — SPECIES CLASSIFICATION
**DISQUALIFIED in cat-labeled products** (any detectable level via position or stated %):
Tea Tree (Melaleuca) [H4] · Pennyroyal [H4] · Clove [H4] · Cinnamon [H4] · Thyme [H4] · Oregano [H4] · Wintergreen/Methyl Salicylate [H4] · Eucalyptus [H4] · Pine [H4] · Citrus oils (d-Limonene) [H4]
**HIGH CONCERN — Dogs** (position and concentration dependent):
- Tea Tree at position 1–8 in dog soap — documented canine toxicity; bar soap contact time amplification; coat residual post-rinse
- Pennyroyal at any position — HIGH CONCERN in dog products
**MODERATE FLAG — Dogs** (position-adjusted):
- Tea Tree at position 9–15 in dog soap → MODERATE FLAG (reduced vs position 1–8 but rinse-off residual factor noted)
- High-concentration essential oil blends at position 1–6
**LOW CONCERN / MONITOR — Context-dependent**:
- Tea Tree at position 16+ in dog soap → LOW CONCERN / MONITOR (trace, rinse-off, proportionate to realistic residual)
- Lavender oil at position 10+ in dog-only soap → LOW CONCERN / MONITOR; in cats = MODERATE FLAG regardless of position
- Peppermint oil in dogs at position 12+ → LOW CONCERN / MONITOR
**HASE classification applies to all essential oils**: Essential oils with genuine antimicrobial or therapeutic rationale and appropriate species safety = H1 or H2. Essential oils used purely for fragrance/marketing with species risk = H4.
---
### NEEM OIL — SPECIAL RULE
- **Dogs**: ACCEPTABLE at topical use concentrations; H1 partial antiparasitic/antifungal credit; functional credit requires plausible concentration (position 1–8)
- **Cats**: LOW CONCERN / MONITOR at low positions; limited feline safety data; H2 botanical classification
- "Neem soap" with neem at position 15+ → no functional credit; MONITOR note; H3 level effective credit
---
### SULFUR SOAP — SPECIAL RULE
Genuine medicated category with veterinary utility for seborrhea, mange adjunct therapy, bacterial folliculitis, antiparasitic support.
- Full functional credit at evidence-supported concentrations (typically 2–10%)
- Soap Format Penalty still applies — sulfur activity does not offset high-pH barrier stress
- Cat use: cats groom aggressively; sulfur ingestion risk flagged as MODERATE FLAG (high grooming frequency means sulfur ingestion is likely; cat glucuronidation limitation noted; proportionate to realistic ingestion dose)
---
### COLORANT PENALTY RULE
Artificial colorants in pet soap: no cleansing or barrier benefit; unnecessary sensitization burden.
- Scoring impact: Allergy Risk penalty · Ingredient Quality penalty · Cumulative Irritation Risk penalty · Formulation Honesty penalty
- Language: MODERATE FLAG — "Synthetic colorants in pet soap add sensitization burden without functional benefit."
---
### PRESERVATIVE EVALUATION
Bar soap is inherently self-preserving at high pH and low water activity.
| Scenario | Assessment |
|---|---|
| No preservatives in standard bar soap | Expected; ACCEPTABLE |
| Preservatives in high-water-content bar | Justified; evaluate sensitization |
| Formaldehyde-releasing preservatives | Allergy Risk penalty; HIGH CONCERN |
| MIT/CMIT blend | Allergy Risk penalty; HIGH CONCERN |
| Standard preservatives (phenoxyethanol ≤1%, potassium sorbate) | ACCEPTABLE |
---
## LAYER 6 — RINSE-OFF ACTIVE EFFICACY
Soap contact time: ~2–5 minutes lathering.
### CATEGORY A — HIGH EFFICACY (FULL CREDIT)
Sulfur [H1] · Chlorhexidine Gluconate (medicated) · Benzoyl Peroxide · Neem Oil at functional concentration [H1 partial credit] · Zinc Pyrithione [H1]
### CATEGORY B — PARTIAL EFFICACY
Colloidal Oatmeal [H1 soothing, partial substantivity] · Panthenol (residual conditioning — limited rinse-off) · Glycerin (humectant, partial residual) · Aloe Vera [H2 soothing — largely rinsed; position-adjusted] · Kaolin/Clay (mild adsorptive cleansing) · Zinc Oxide (mild antimicrobial)
### CATEGORY C — DECORATIVE / LOW EFFICACY
Vitamin C [H3] · Peptides [H3] · Hyaluronic Acid [H3] · Collagen [H3] · Most antioxidant botanical extracts [H3] · "Superfood" additions [H3]
*Activated charcoal*: With credible clay inclusion: partial credit. Charcoal-only cosmetic loading: [H3] notation.
---
## LAYER 7 — MICROBIOME IMPACT
Soap pH of 8.5–10 is the dominant microbiome disruptor. Acid mantle recovery: 0.5–8 hours post-soap. Malassezia and Staphylococcus imbalance risk elevated.
**High disruption risk**: Any true soap (baseline) · Broad-spectrum antimicrobial soap without medicated justification · Strongly fragranced soap
**Moderate disruption**: Tier 3–4 soap with high superfat · Medicated soap with targeted active
---
## LAYER 8 — COAT-TYPE COMPATIBILITY
| Coat Type | Soap Compatibility | Key Risk |
|---|---|---|
| Short/single coat | Moderate-Low | Easy over-stripping; pH-mediated dryness |
| Long/double coat | Low | Soap residue trapping; alkaline residue post-rinse |
| Curly/wavy coat | Low | Coat structure damage from high pH |
| Wiry coat | Moderate | High-pH softens wire texture |
| Cat coat | Very Low | Species toxicity risk + thin skin + high-pH amplification + high grooming/licking frequency post-bath |
| Puppy/kitten coat | Very Low | Maximum vulnerability; soap structurally inadvisable for regular puppy/kitten use |
---
## LAYER 9 — CORE SCORING SYSTEM (Score Range: 1.0–5.0)
### SAFETY [Weight: 0.32]
Evaluates: Soap base harshness tier · Soap Format Penalty · Species toxicity risk (HASE-classified) · Barrier disruption from high pH · Repeated-use irritation · Sensitization potential · Cumulative inflammatory load · Long-term tolerance · Puppy/kitten vulnerability · Licking ingestion exposure from soap residue (cat grooming frequency and glucuronidation limitation — proportionate to realistic residual) · Essential oil coat residual post-rinse licking risk
*V4.0: Standard soap pH 8.5–9.5 receives MODERATE FLAG language, not HIGH CONCERN catastrophizing. Trace-level essential oils at position 15+ in dog soaps receive LOW CONCERN / MONITOR language.*
### EFFECTIVENESS [Weight: 0.16]
Evaluates: Dirt/debris/sebum removal · Coat residue removal · Medicated active efficacy (HASE-classified) · Cleansing-to-barrier balance · Coat-type appropriate performance · Formulation honesty about limitations
### ALLERGY RISK [Weight: 0.18]
Evaluates: Essential oil load (bar soap contact time longer than shampoo; coat residual licking per embedded species physiology) · Fragrance additive burden · Botanical sensitizer load (HASE-classified) · Preservative sensitizers · Colorant sensitization · Licking ingestion pathway · Repeated-use accumulation
### ECO IMPACT [Weight: 0.10]
Evaluates: Soap base biodegradability · Palm oil sourcing · Tallow sourcing · Essential oil ecological toxicity · Packaging
### INGREDIENT QUALITY [Weight: 0.11]
Evaluates: Soap base coherence · Superfatting transparency · Medicated active honesty · Absence of decorative inflation · Species-appropriate selection · HASE tier of botanicals
### SKIN COMPATIBILITY [Weight: 0.13]
Evaluates: Species-appropriate formulation within soap constraints · Regular-bath tolerance · Barrier resilience post-soap · Coat and skin microbiome stability · Long-term tolerance
### CORE SCORE FORMULA
\`\`\`
Core Score = (Safety × 0.32) + (Effectiveness × 0.16) + (Allergy Risk × 0.18) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.11) + (Skin Compatibility × 0.13)
\`\`\`
---
## LAYER 10 — SPECIALIZED PET SOAP PERFORMANCE (Score Range: 1.0–5.0)
### CLEANSING EFFICIENCY
Evaluates: Dirt, debris, pollutant removal · Sebum and oil removal · Dander removal · Coat residue removal · Medicated active delivery · Odor removal vs masking
### BARRIER PRESERVATION [Dominant]
Evaluates: TEWL disruption from soap pH · Lipid and sebum depletion · Barrier recovery speed · Acid mantle reconstitution time · Repeated-use resilience · Superfatting mitigation credit · Species skin thickness (cat and small animal skin very thin)
**BARRIER CEILINGS (SOAP-SPECIFIC)**:
| System | Barrier Preservation Ceiling |
|---|---|
| Tier 1 soap, low/no superfat | Max 1.5 |
| Tier 1 soap, moderate superfat (6–10%) | Max 2.0 |
| Tier 2 soap, moderate superfat | Max 2.3 |
| Tier 3 soap, low superfat | Max 2.3 |
| Tier 3 soap, high superfat (11–20%) | Max 2.8 |
| Tier 4 soap, high superfat | Max 3.2 |
| Any true soap, weekly use on animal | Hard ceiling 2.5 |
| Soap pH > 9.5 (any tier) | Hard ceiling 1.8 |
| Syndet bar at species-appropriate pH | Eligible 4.5–5.0 |
### COAT QUALITY SUPPORT
Evaluates: Coat softness and manageability post-bath · Coat texture preservation · Superfatting residue conditioning · Coat-type appropriate base selection · Reduced static and frizz · Alkaline residue risk
### HYDRATION SUPPORT
Evaluates: Superfatting residue contribution · Glycerin/panthenol residual benefit · Post-bath moisture retention · Avoidance of excessive sebum stripping
### RESIDUAL DRYNESS RISK
Evaluates: Post-bath skin tightness · Coat brittleness trajectory · Lipid depletion under regular soap bathing · Alkaline residue in coat · NMF depletion risk · Bathing frequency amplification
### MICROBIOME COMPATIBILITY
Evaluates: Commensal microbiome preservation given soap pH baseline disruption · pH-mediated acid mantle recovery timeline · Malassezia and Staphylococcus balance risk · Targeted vs broad antimicrobial impact
### CUMULATIVE IRRITATION RISK
Evaluates: Repeated soap pH exposure · Essential oil and fragrance accumulation per bath (position-adjusted) · Essential oil coat residual licking in cats (proportionate to realistic residual concentration) · Colorant sensitization · Chronic inflammatory burden · Bathing frequency-weighted exposure
### SPECIES SAFETY SCORE
| Scenario | Score |
|---|---|
| No toxic ingredients; species-labeled accurately; honest soap format positioning | 3.5–4.5 |
| No toxic ingredients; "all pet" without cat-specific concern | 3.0–4.0 |
| Contains position-adjusted moderate-risk essential oils (lavender in dogs at trace) | 3.0–3.8 |
| Contains moderate-risk essential oils at functional position | 2.0–3.0 |
| Contains high-risk essential oils (Tea Tree) in dog product at functional position | 1.5–2.5 |
| Contains known feline toxin in cat/all-pet product | 1.0 (floor) |
| Medicated soap with clinical use evidence | 3.5–4.5 |
| Puppy/kitten labeling on standard soap | Max 2.5 |
*Species Safety Score ceiling for true soap is 4.5 — soap format inherently carries structural species risk from pH.*
### FORMULATION HONESTY
Evaluates: "Natural/cold process = gentle" false equivalence · "Plant-based = safe for pets" framing · Decorative active loading (HASE-classified) · "Vet-recommended" without substantiation · Superfat level transparency · Soap pH disclosure · Species label accuracy · H4 "natural safe" framing called out explicitly
### SPECIALIZED PERFORMANCE SCORE
\`\`\`
Specialized Score = Average of:
 Cleansing Efficiency + Barrier Preservation + Coat Quality Support +
 Hydration Support + Residual Dryness Risk + Microbiome Compatibility +
 Cumulative Irritation Risk + Species Safety Score + Formulation Honesty
 (÷ 9)
\`\`\`
---
## LAYER 11 — FINAL RATING
\`\`\`
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
\`\`\`
### ABSOLUTE SCORE CEILING FOR TRUE SOAP
**No true saponified soap can score above 4.2/5.0 for pet use.** This is a structural reality ceiling, not a formula penalty. A score of 3.5–4.2 represents the best achievable within soap format constraints.
### HIGH SCORE ELIGIBILITY WITHIN SOAP FORMAT (>3.5)
Requires: Tier 3 or 4 dominant soap base · Superfat ≥ 8% · No essential oils with known species toxicity at realistic post-rinse licking dose · Minimal/no synthetic fragrance · No synthetic colorants · Honest soap format positioning · No decorative rinse-off active inflation · Species labeling accuracy · Formulation Honesty ≥ 3.5
---
## LAYER 11.5 — REAL-WORLD USAGE SIMULATION
Simulate: Pet soap use frequency (every 4–8 weeks appropriate) · Therapeutic frequency (every 1–2 weeks for medicated) · Manual lathering contact time (2–5 minutes) · Barrier stress accumulation · Acid mantle reconstitution time · Long-term sebum depletion · Coat alkaline residue in dense coats · Long-term microbiome stability · Licking ingestion of essential oils and fragrance residuals post-bath — assessed at realistic post-rinse residual concentration
**Core question**: Can the soap remain structurally tolerable under realistic bathing frequency given pH constraints, coat type, and species profile?

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level
---

# 🧼 SOAP PROFILE

## Functional Classification

Short classification.

Examples:
- Gentle Superfatted Dog Soap (Tier 3 base)
- Harsh Coconut-Dominant Pet Soap
- Medicated Sulfur Pet Soap
- Essential Oil-Heavy Fragrance Soap (Species Concern)
- Honest Minimalist Pet Bar Soap
- Decorative Natural Soap (Active Inflation)

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering soap base tier, superfatting level and mitigation, species-appropriate pH status and soap format pH reality, species toxicity status, medicated active status if applicable, long-term skin and coat behavior, and an honest assessment of soap format limitations.

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

### Every 4–8 Weeks (Appropriate Soap Frequency) — ⭐X.X

Short explanation.

### Every 2–4 Weeks (Moderate Frequency) — ⭐X.X

Short explanation.

### Weekly Use (Therapeutic Protocol Only) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Post-bath cleansing feel and coat finish
- Irritation or scratching signals
- Alkaline film or residue risk
- Essential oil exposure signal

## Medium-Term

- Barrier and coat response under regular soap bathing
- Dryness or sebum changes
- Tolerance development

## Long-Term

- Barrier stability under soap pH repeated exposure
- Coat texture trajectory
- Microbiome stability
- Overall skin and coat outcome vs syndet alternative

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting soap base type and harshness, superfatting level and oils, medicated active status, barrier behavior, species safety status, irritation and allergy risk, and long-term skin and coat outcome.

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

# 📌 FORMAT COMPARISON NOTE

## Soap vs Syndet Comparison

Brief 1–2 sentence note comparing this soap's structural outcome to a comparable syndet shampoo for transparency.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL OR VETERINARY CLAIMS ANYWHERE
- No marketing influence on scoring
- Soap base tier, superfatting level, essential oil toxicity, synthetic colorants, and preservatives must be mentioned in output
- No foam or lather-volume bias — lather richness ≠ cleansing quality or safety
- No "natural = safe" bias
- Structural weakness overrides cosmetic feel
- Soap base harshness must be classified before scoring
- Soap Format Penalty must be applied to all true soaps
- Species-appropriate pH must be assessed — soap pH reality must be stated
- Species toxicity must be assessed before Safety scoring
- Rinse-off active efficacy must be classified before Effectiveness scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-bath scratching = structural failure signal
- Superfatting ≠ pH neutralization
- Natural soap ≠ species-safe
- Essential oil in soap ≠ therapeutic benefit for pets
- Cold process ≠ gentle for animal skin
- Absolute score ceiling: 4.2 / 5.0 for any true saponified pet soap — enforced without exception
- Natural ≠ automatically safer
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

*Pet Soap Evaluation Algorithm — Structured for canine and feline dermatology-informed soap base analysis, species safety assessment, pH impact evaluation, and long-term skin and coat health outcome. All scoring is structural and evidence-informed.*

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
              "You are a strict pet soap structural evaluation engine."
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