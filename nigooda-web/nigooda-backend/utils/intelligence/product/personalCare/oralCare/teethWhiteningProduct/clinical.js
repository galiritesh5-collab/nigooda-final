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
        "TEETHWHITENINGPRODUCT ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
TEETH WHITENING PRODUCT EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward teeth whitening products that demonstrate:
• Evidence-based whitening mechanism (genuine chromophore oxidation or physical removal)
• Enamel safety under repeated whitening exposure
• Dentin and pulp protection under active concentration
• Oral microbiome and mucosal compatibility
• Sensitivity-considerate formulation design
• Low cumulative irritation and enamel dissolution risk
• Structural formulation honesty over aesthetic marketing
Mandatory penalties apply for:
• Whitening claims without evidence-based oxidative or abrasive mechanism
• High-peroxide systems without sensitivity mitigation
• Charcoal/bicarbonate "natural whitening" positioning without enamel safety evidence
• Acid-containing whitening systems — when clearly formulated as acid-generating systems
 (e.g. lemon, ACV, undiluted citric acid), contextual enamel risk observation is mandatory
• LED/light device marketing as primary whitening mechanism without peroxide support
• Decorative botanical loading as whitening agents
• Enamel-damaging abrasive whitening marketed as "safe"
• Marketing-driven sensory engineering over structural enamel safety
Surface stain removal alone at enamel cost cannot achieve high scores.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding and luxury positioning
• Colour/shade chart marketing comparisons
• "Clinic-grade" / "professional strength" marketing language
• Before/after photography marketing
• "Natural whitening" positioning (charcoal, turmeric, lemon)
• LED light "activation" marketing without peroxide evidence
• Influencer or celebrity endorsement
• Ingredient-count inflation
Evaluate only:
• Whitening mechanism (oxidative vs physical vs abrasive)
• Peroxide concentration and enamel safety at that concentration
• Abrasive system safety (RDA equivalent for whitening products)
• Sensitivity mitigation active presence
• Contact time and delivery format efficacy
• Oral microbiome and mucosal impact
• Structural formulation honesty
Any format (strips, gel trays, paint-on, toothpaste, powder, LED kit, rinse)
receives credibility only when genuine whitening mechanism and enamel safety
are both demonstrated.
---
STRUCTURE DOMINANCE RULE
Primary whitening architecture determines:
• Enamel integrity under treatment
• Dentin exposure and sensitivity risk
• Pulp irritation potential
• Genuine chromophore oxidation depth
• Surface stain vs intrinsic stain reach
• Mucosal and gingival irritation
• Long-term enamel stability
• Repeated-use safety
Minor additives, sensitivity agents, and decorative botanicals cannot override
a structurally enamel-damaging mechanism or absent genuine whitening active.
Ingredient evaluation must consider:
• Whitening mechanism class
• Active concentration and contact time
• Delivery format efficacy
• Sensitivity mitigation active presence
• Repeated-use and treatment-cycle exposure
---
WHITENING CONTACT AND DELIVERY CONTEXT RULE
Whitening products vary enormously in active contact time.
This fundamentally determines both efficacy credit and risk profile.
DELIVERY FORMAT CREDIT TABLE:
Custom Tray (dentist-fitted) — Maximum efficacy credit
 Full peroxide/nHAp contact, controlled exposure, highest clinical evidence
OTC Whitening Strips (well-fitted) — High efficacy credit
 Good enamel contact, evidence-based for OTC peroxide/PAP concentration
Paint-On Gel (brush-on) — Moderate efficacy credit
 Variable contact, saliva dilution risk, shorter substantivity
Whitening Toothpaste — Low-Moderate credit
 ~2 min contact, abrasive-dominant mechanism, limited oxidative contact
Whitening Mouthwash Rinse — Low credit
 30–60 sec contact, high dilution, minimal oxidative depth
Whitening Powder — Abrasive credit only unless peroxide component present
LED/Light Kit without peroxide — No whitening mechanism credit
 Light alone has no clinical whitening evidence independent of peroxide activation
---
LAYER 1 — WHITENING MECHANISM CLASS (DOMINANT ACTIVE PARAMETER)
MANDATORY RULE:
All whitening products must be classified by mechanism before scoring.
---
MECHANISM CLASS TABLE
CLASS A — OXIDATIVE (PEROXIDE-BASED) — HIGHEST EFFICACY
Agents:
• Hydrogen Peroxide (H2O2) — direct oxidation, strongest evidence
• Carbamide Peroxide (CP) — breaks down to H2O2 + urea, slower release
• Sodium Percarbonate — releases H2O2 on contact
Concentration Safety Thresholds:
• H2O2 ≤6% (EU OTC limit) / ≤10% clinical — generally accepted OTC safe range
• H2O2 >6% OTC → mandatory Safety adjustment (EU regulatory breach flag)
• Carbamide Peroxide ≤16% → general OTC safe range
• CP >16% → clinical-grade; Safety adjustment in OTC context
Note: Peroxide systems with strong sensitivity mitigation (Potassium Nitrate,
nHAp, Stannous Fluoride) should score meaningfully better than the same
peroxide concentration without mitigation — context and mitigation matter.
Scoring:
• Full whitening efficacy credit at safe concentrations
• Concentration-adjusted Safety adjustment for excess
---
CLASS B — NON-PEROXIDE OXIDATIVE — MODERATE EFFICACY
Agents:
• PAP (Phthalimidoperoxycaproic Acid) — emerging alternative oxidiser
• Sodium Chlorite — oxidative, limited evidence
• Sodium Perborate — releases oxidative species
Characteristics:
• PAP: growing clinical evidence, lower sensitivity profile than peroxide systems;
 this lower sensitivity advantage is a genuine formulation benefit
• Generally lower whitening depth than Class A at equivalent contact time
• "Sensitivity-advantaged" PAP positioning is credible where supported by evidence
Scoring:
• PAP → strong partial efficacy credit (evidence growing, not yet equivalent to peroxide)
• Sodium Chlorite → limited credit
---
CLASS C — BIOMIMETIC / REMINERALISING WHITENING — LOW-MODERATE EFFICACY
Agents:
• Nano-hydroxyapatite (nHAp) — surface optical improvement, remineralising
• Hydroxyapatite coating systems
Characteristics:
• Surface optical improvement via enamel microcrystalline filling
• Genuine enamel structural benefit — a real advantage
• Not a chromophore oxidiser
• Cannot reach intrinsic stain
Scoring:
• Whitening efficacy credit limited to optical improvement and surface polish
• Enamel safety bonus applied — this is a structural positive
• Cannot claim intrinsic stain removal
---
CLASS D — PHYSICAL / ABRASIVE — LOW EFFICACY
Agents:
• Hydrated Silica (high-RDA whitening grade)
• Calcium Carbonate (coarse)
• Activated Charcoal
• Baking Soda (high concentration)
• Volcanic Ash / Pumice
Scoring:
• Very limited whitening efficacy credit
• Charcoal → near-zero whitening efficacy credit + enamel safety adjustment
• High-RDA systems → Safety adjustment
---
CLASS E — ENZYME-BASED — MINIMAL EFFICACY
Agents:
• Papain (papaya enzyme)
• Bromelain (pineapple enzyme)
• Protease-based whitening claims
Characteristics:
• No clinical evidence for significant whitening
• Mucosal sensitization risk under prolonged contact
Scoring:
• Minimal whitening efficacy credit
• Decorative marketing penalty applied
---
CLASS F — OPTICAL / PIGMENT-BASED — ZERO WHITENING MECHANISM
Agents:
• Titanium Dioxide (temporary optical blue-tint)
• Kaolin (optical coverage)
• Blue covarine toothpastes (temporary optical illusion)
Characteristics:
• No genuine chromophore oxidation
• Temporary visual illusion only; washed away post-use
Scoring:
• Zero structural whitening credit
• Mandatory Formulation Honesty penalty if marketed as "whitening"
• Minor credit only if explicitly marketed as "instant optical brightness" without
 structural whitening claims
---
LAYER 2 — ENAMEL SAFETY UNDER WHITENING EXPOSURE
MANDATORY RULE:
All whitening products must be classified for enamel risk before scoring.
ENAMEL SAFETY TIER TABLE
TIER 1 — HIGH ENAMEL RISK
Examples:
• H2O2 >6% OTC (EU), >10% without supervision
• High-RDA charcoal whitening systems
• High-acid whitening gels
• Lemon/citric acid "natural" whitening systems — contextual structural observation:
 these formulations are strongly suggestive of enamel demineralisation risk;
 specific product pH cannot be confirmed from ingredients alone but structural
 acid-generating mechanism is a valid concern
• Apple Cider Vinegar whitening — similarly, acid-generating mechanism is
 a well-established structural concern warranting mandatory enamel risk notation
• Pumice/volcanic ash powders
Scoring Impact:
• Mandatory Safety adjustment
• Enamel Preservation ceiling reduction
• High Cumulative Enamel Risk
---
TIER 2 — MODERATE ENAMEL RISK
Examples:
• H2O2 3–6% (OTC range, well-buffered)
• CP 10–16% (tray system, standard OTC)
• Moderate-RDA silica whitening toothpastes (RDA 70–100)
• Sodium Bicarbonate at moderate concentration
Scoring Impact:
• Moderate Safety adjustment
• Moderate Enamel Preservation ceiling
Note: Tier 2 systems with strong sensitivity mitigation and remineralisation
support should receive meaningfully better scores than Tier 2 without mitigation —
mitigation is a genuine formulation quality differentiator.
---
TIER 3 — LOW ENAMEL RISK
Examples:
• H2O2 ≤3% (low-concentration OTC)
• PAP-based systems at standard concentration
• Low-RDA hydrated silica whitening toothpastes (RDA <70)
• nHAp-based optical whitening systems
Scoring Impact:
• Eligible for good Enamel Preservation scores
• Standard Safety profile
---
TIER 4 — MINIMAL / NO ENAMEL RISK
Examples:
• Nano-hydroxyapatite-dominant systems
• Ultra-low-RDA polishing whitening toothpastes
• PAP at very low concentration in enamel-buffered system
• Xylitol + nHAp optical whitening systems
Scoring Impact:
• Eligible for maximum Enamel Preservation
• Enamel safety bonus eligible
---
LAYER 3 — ACID-RISK CONTEXTUAL OBSERVATION
[Replaces formal pH scoring tier — applied as contextual structural assessment]
When formulation ingredients are strongly indicative of an acid-generating whitening
mechanism, this must be noted as a contextual structural enamel risk observation.
CLEAR ACID-RISK SYSTEMS — mandatory structural concern flag:
• Lemon juice / lemon extract whitening formulas
• Apple Cider Vinegar (ACV) whitening systems
• Citric acid at high / undiluted concentration as primary whitening agent
• Vinegar-based whitening rinses
• High-acid fruit enzyme whitening systems
These systems present enamel demineralisation risk through acid-generating mechanism.
This is noted as a structural formulation observation, not a deterministic pH score,
because exact formulation pH cannot be reliably inferred from ingredient lists alone.
Wording approach:
"This formulation relies on [ingredient], which is strongly associated with
acid-generating mechanisms. Enamel demineralisation risk under repeated use
is a structural concern for this product category, though specific formulation
pH depends on buffering, concentration, and manufacturing variables not
visible from the ingredient list."
For all other whitening systems:
• Acid risk context is noted only when ingredient evidence clearly warrants it
• Unknown formulation pH does not receive automatic score penalty — uncertainty
 is acknowledged without penalising the product score directly
---
LAYER 4 — SENSITIVITY MITIGATION ASSESSMENT
Whitening products must be evaluated for sensitivity management.
SENSITIVITY MITIGATION AGENTS (genuinely reduce risk and improve scores):
• Potassium Nitrate — nerve desensitisation, well-evidenced
• Potassium Citrate — sensitivity relief
• Nano-hydroxyapatite — tubule occlusion, enamel repair
• Stannous Fluoride — tubule occlusion + remineralisation
• Fluoride (NaF) — enamel remineralisation support
• Arginine — tubule occlusion
HIGH SENSITIVITY RISK FACTORS:
• H2O2 >6% without sensitivity agent
• Extended contact time (overnight trays) without sensitivity mitigation
• High-frequency use cycles without recovery period
• High-RDA abrasive whitening without sensitivity protection
Scoring Application:
• Sensitivity agents present → Sensitivity Protection credit (meaningful score improvement)
• Sensitivity risk factors without mitigation → Safety adjustment
• Post-treatment sensitivity = enamel/dentin/pulp stress signal
---
LAYER 5 — ORAL MICROBIOME AND MUCOSAL IMPACT
Higher disruption risk:
• H2O2 >6% on gingival tissue — chemical irritation risk
• High-alcohol whitening rinse vehicles
• Chlorhexidine in whitening systems (microbiome disruption)
• SLS in whitening toothpastes
• Clear acid-generating systems (mucosal pH stress)
Lower disruption risk:
• PAP-based systems (limited microbiome impact)
• nHAp systems (biomimetic, microbiome-neutral)
• Fluoride-based systems (targeted)
• Low-concentration H2O2 with short contact (minimal residual disruption)
---
LAYER 5.5 — ESSENTIAL OIL AND FRAGRANCE IN WHITENING PRODUCTS
Whitening products often contain flavour or aromatic systems in gels, strips, or trays.
These must be assessed in context of contact duration and concentration.
STRIP / TRAY FORMAT (prolonged contact 30 min to several hours):
• High-sensitizer aromatics (cinnamon, clove, high-concentration essential oils)
 in prolonged-contact whitening formats receive higher sensitization concern
 due to extended direct enamel and mucosal contact
• Standard peppermint/menthol flavouring at typical concentrations should not
 trigger aggressive penalties
TOOTHPASTE / RINSE FORMAT (short contact):
• Standard flavour aromatics at typical cosmetic concentrations are lower concern
• Apply same essential oil calibration principles as toothpaste/mouthwash algorithms
---
LAYER 5.6 — COLORANT AND ARTIFICIAL ADDITIVE ASSESSMENT
Artificial colorants in whitening gels/strips add unnecessary irritation burden.
High concern:
• Artificial colorants in direct enamel-contact whitening gels
• Strong flavouring agents in prolonged-contact tray/strip formats
• SLS in whitening strip adhesive systems
Scoring Impact:
• Allergy/Sensitivity Risk adjustment
• Ingredient Quality adjustment
• Cumulative Irritation Risk adjustment
• Formulation Honesty adjustment
---
LAYER 6 — HERBAL AUTHENTICITY & NATURAL CLAIM VALIDATION ENGINE
[CONDITIONAL LAYER — activates when herbal claims, "natural whitening" marketing,
botanical whitening agents, or plant-based whitening positioning are present]
H1 — EVIDENCE-SUPPORTED BOTANICALS (whitening context)
• nHAp alongside botanical systems — optical brightness + remineralisation; credible
• Aloe Vera in whitening gel — mucosal soothing in prolonged-contact format; partial credit
• Chamomile — mild anti-inflammatory; minor positive note in direct-contact format
H2 — TRADITIONAL / EMERGING BOTANICALS (whitening context)
• Miswak — some evidence for plaque reduction; limited whitening evidence
• Activated silica from plant sources — efficacy depends on RDA, not botanical origin
H3 — DECORATIVE BOTANICAL WHITENING CLAIMS
• Turmeric "whitening" — no clinical whitening evidence; yellow pigment is abrasion risk
• Charcoal "natural whitening" — no oxidative mechanism; abrasion risk; H3 classification
• Lemon "natural whitening" — acid-generating mechanism; enamel risk; H3 classification
• ACV whitening — acid-generating mechanism; enamel risk; H3 classification
• "Superfood whitening blend" — decorative; no clinical whitening evidence
• Papaya enzyme / papain whitening — minimal evidence; H3 classification
• "Plant-based whitening" marketing for systems relying solely on H3 mechanisms
H3 botanical whitening claims receive mandatory Formulation Honesty penalty.
---
LAYER 7 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 FOR EVERY CATEGORY
---
SAFETY [DOMINANT]
Evaluates:
• Peroxide/oxidant concentration vs enamel and pulp safety
• Abrasive enamel wear risk
• Acid-generating ingredient mechanism risk (contextual observation)
• Gingival and mucosal chemical irritation risk
• Sensitivity potential without mitigation
• Cumulative enamel stress across treatment cycle
• Regulatory concentration compliance
Core Rules:
• Enamel risk overrides whitening efficacy bonus
• Sensitivity without mitigation is a structural formulation gap
• Acid-based whitening systems (lemon, ACV, undiluted citric acid) receive
 mandatory contextual enamel risk notation
• High-risk whitening architectures reduce elite scoring probability but
 mitigation systems (sensitivity agents, remineralisation actives, buffering)
 meaningfully improve scores — context matters, not binary failure
• Safety overrides whitening result impressiveness
---
EFFECTIVENESS
Core Question:
Does the product genuinely whiten via an evidence-based mechanism,
at an effective concentration, in its stated format?
Evaluates:
• Whitening mechanism class (A–F)
• Active concentration adequacy for stated format
• Contact time and delivery efficacy
• Extrinsic vs intrinsic stain reach
• Evidence base for mechanism
• Realistic shade improvement potential
• Repeated-cycle result durability
Rules:
• LED alone → near-zero efficacy credit
• Charcoal → near-zero efficacy credit + enamel risk adjustment
• Optical pigment systems → zero structural whitening credit
• PAP → strong partial credit (growing evidence; sensitivity advantage acknowledged)
• Peroxide at safe OTC concentration → full efficacy credit
---
ALLERGY / SENSITIVITY RISK
Evaluates:
• Peroxide-induced pulp/dentin sensitivity (mitigated by sensitivity actives)
• Gingival tissue chemical irritation (peroxide overflow)
• Flavour sensitization in prolonged-contact formats
 (calibrated to concentration — standard peppermint ≠ high-sensitizer blend)
• SLS mucosal irritation in whitening toothpastes
• Preservative sensitization
• Enzyme (papain/bromelain) mucosal sensitization
• Artificial colorant irritation burden
• Extended-contact tray irritation accumulation
Application Rules:
• Prolonged-contact whitening formats receive higher sensitivity weighting
• Sensitivity mitigation agent presence genuinely reduces penalty
• Gingival peroxide overflow = mandatory concern flag
---
ECO IMPACT
Evaluates:
• Single-use plastic strip waste
• Disposable tray packaging
• Peroxide environmental load
• Charcoal sourcing sustainability
• LED battery waste (device kits)
• SLS/surfactant environmental load
---
INGREDIENT QUALITY
Evaluates:
• Whitening mechanism class coherence
• Active concentration adequacy and honesty
• Sensitivity mitigation quality (presence of mitigation agents is a positive quality signal)
• Enamel remineralisation active presence (fluoride/nHAp)
• Herbal claim authenticity (H1/H2/H3 classification)
• Absence of decorative whitening inflation
Rules:
• Charcoal marketed as whitening agent = major quality adjustment
• Lemon/ACV/acid marketed as whitening = major quality + safety adjustment
• LED as sole mechanism = major quality adjustment
• nHAp presence alongside peroxide = quality bonus (dual benefit)
• PAP with sensitivity advantage = quality positive note
---
ORAL COMPATIBILITY
Evaluates:
• Enamel surface tolerance through treatment cycle
• Gingival tissue response
• Mucosal comfort in tray/strip format
• Post-treatment enamel remineralisation recovery
• Sensitivity trajectory through treatment
Core Rules:
• Post-treatment sensitivity trajectory overrides immediate whitening satisfaction
• Remineralisation window post-treatment must be respected in usage guidance
• Products encouraging excessive frequency reduce oral compatibility score
CORE SCORE FORMULA
Core Score =
(
Safety × 0.30 +
Effectiveness × 0.20 +
Allergy / Sensitivity Risk × 0.15 +
Eco Impact × 0.08 +
Ingredient Quality × 0.12 +
Oral Compatibility × 0.15
)
Note: Safety weighted higher (0.30) due to elevated enamel risk in whitening products.
---
LAYER 8 — SPECIALIZED WHITENING PERFORMANCE
Score Range: 1.0 → 5.0
---
WHITENING EFFICACY
Evaluates:
• Mechanism class capability (A best → F worst)
• Concentration adequacy for format
• Extrinsic vs intrinsic stain reach
• Realistic shade improvement potential
• Evidence base for claimed whitening depth
Core Rules:
• Mechanism must match claim
• LED-only → near-zero efficacy
• Charcoal → near-zero efficacy
• Optical pigment → zero structural efficacy
• CEILING RULE: Decorative mechanism products (Class D/E/F) cannot exceed 2.0 Whitening Efficacy
---
ENAMEL PRESERVATION [DOMINANT]
Evaluates:
• Peroxide concentration enamel interaction
• RDA-equivalent abrasion during treatment
• Acid-generating ingredient system risk (contextual observation)
• Remineralisation active support
• Post-treatment enamel recovery window support
• Repeated treatment cycle enamel stability
ENAMEL PRESERVATION CEILINGS
• Tier 1 enamel risk → Max 2.0
• Tier 1 + remineralisation active → Max 2.5
 [Mitigation genuinely matters and improves ceiling]
• Tier 2 enamel risk → Max 3.2
• Tier 2 + sensitivity/remineralisation active → Max 3.7
• Tier 3 low enamel risk → Max 4.3
• Tier 3/4 + Fluoride/nHAp → Eligible for 5.0
• Acid-based systems (lemon/ACV/undiluted citric acid — contextual concern) → ceiling adjusted toward 2.0
• Charcoal-dominant → Hard ceiling 1.8
• LED-only (no enamel interaction) → Neutral 3.5 (no risk, no benefit)
Core Rules:
• Post-treatment sensitivity warrants enamel/dentin/pulp structural assessment
• Enamel Preservation is the dominant whitening performance parameter
---
SENSITIVITY PROTECTION
Evaluates:
• Potassium Nitrate/Citrate presence
• nHAp tubule occlusion support
• Stannous Fluoride support
• Peroxide concentration sensitivity management
• Recovery interval between treatment sessions
Core Rules:
• High-peroxide systems without sensitivity agent = mandatory Safety adjustment
• nHAp and fluoride receive dual functional credit (enamel + sensitivity)
• Products with strong sensitivity mitigation at moderate-high peroxide levels
 should score meaningfully better than unmitighed equivalents
---
GINGIVAL / MUCOSAL SAFETY
Evaluates:
• Peroxide overflow onto gingival tissue (strip/tray fit quality)
• Chemical irritation risk from high-concentration peroxide at gumline
• Flavour agent mucosal irritation during extended contact
 (calibrated to concentration and sensitizer profile)
• SLS gingival irritation
• Tray or strip fit quality impact on gingival exposure
Core Rules:
• Poor-fitting OTC trays increase gingival peroxide exposure — safety flag
• High-concentration peroxide with poor tray containment = mandatory safety concern
---
ORAL MICROBIOME COMPATIBILITY
Evaluates:
• Peroxide-mediated microbiome impact (short-duration, lower concern at standard OTC)
• Alcohol vehicle in whitening rinse/gel (microbiome disruption if present)
• Treatment frequency impact on microbiome recovery
• Fluoride or xylitol microbiome-neutral active presence
Core Rules:
• Short-contact peroxide at standard OTC concentration = low microbiome concern
• High-alcohol whitening vehicles = microbiome adjustment
• Anti-bacterial whitening additives require clinical justification
---
CUMULATIVE TREATMENT RISK
Evaluates:
• Total enamel stress across full treatment cycle (e.g. 14-day strip course)
• Sensitivity accumulation through treatment
• Overuse or repeated back-to-back treatment cycle risk
• Acid-mediated cumulative enamel loss
• High-frequency whitening toothpaste RDA accumulation over months
• Gingival chemical irritation accumulation
Core Rules:
• Products designed for continuous daily use assessed for long-term enamel stress
• Short-cycle products (14-day strips) assessed at single-cycle and repeated-cycle level
• Charcoal/acid whitening daily use = severe cumulative enamel risk
• Products with effective sensitivity mitigation and remineralisation support
 show lower cumulative risk trajectory — this is reflected in scoring
---
FORMULATION HONESTY
Evaluates:
• LED as primary whitening mechanism claim
• Charcoal/turmeric/lemon "natural whitening" claims (H3 botanical positioning)
• Optical pigment marketed as structural whitening
• Shade chart claims without peroxide mechanism
• "Enamel-safe" claims for Tier 1–2 enamel risk products
• "Sensitivity-free" whitening without sensitivity active
• "Professional strength" OTC at concentrations exceeding safe OTC range
• Before/after marketing without structural mechanism evidence
Core Rules:
• Whitening claim must be supported by mechanism class
• "Enamel-safe" requires Tier 3–4 enamel safety profile to be valid
• LED/charcoal/optical-only marketing triggers mandatory Formulation Honesty adjustment
---
SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all 7 specialized scores
Dominant Parameters:
• Enamel Preservation → primary interpretive parameter
• Cumulative Treatment Risk → primary penalty parameter
---
LAYER 9 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
---
HIGH SCORE ELIGIBILITY (>4.0)
Requires:
• Class A (peroxide at safe OTC concentration) or Class B (PAP) mechanism
• Tier 3 or 4 enamel safety profile
• Sensitivity mitigation active present (KNO3, nHAp, fluoride)
• Enamel Preservation ≥ 3.5
• Cumulative Treatment Risk ≥ 3.0
• No high-RDA charcoal or acid system
• No LED-primary mechanism claim
• Formulation Honesty ≥ 3.5
DISQUALIFIERS:
• Acid-based whitening systems (lemon, ACV, undiluted citric acid as primary agents)
• Charcoal as primary whitening mechanism
• LED as sole whitening mechanism
• H2O2 >6% OTC without clinical supervision context
• Optical-only pigment whitening marketed as structural
---
LAYER 9.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Full treatment cycle (e.g. 14-day strip / 4-week tray)
• Enamel mineral density through treatment
• Sensitivity progression through treatment
• Post-treatment remineralisation recovery
• Repeated cycle risk (user completes 2–3 cycles per year)
• Overuse risk
• Gingival tissue response across cycle
Core Question:
Can the whitening product deliver genuine, visible whitening while maintaining
enamel integrity, sensitivity tolerance, and gingival safety across
a realistic treatment cycle and beyond?
---
ANTI-MARKETING FILTER
Mandatory penalties:
• LED = clinical whitening mechanism claim
• Charcoal = safe natural whitening claim
• Lemon/ACV/citric acid = whitening agent claim (acid-generating enamel risk flag)
• Optical pigment = structural whitening claim
• "Enamel-safe" at Tier 1–2 enamel risk
• "Sensitivity-free" without sensitivity mitigation active
• Shade chart improvement claims without peroxide mechanism
• Before/after imagery without mechanism evidence
---
BIAS NEUTRALIZATION FILTER
Neutralize:
• Whiter = healthier teeth bias
• Higher peroxide = better whitening (beyond safe OTC range) bias
• Charcoal = natural safe whitening bias
• LED = advanced technology = better results bias
• "Professional strength" OTC = clinical equivalent bias
• Foam/fizz = whitening activity bias
• Pain/sensitivity = "it's working" bias
• "Natural" whitening ingredients = safe for enamel bias

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

## PRODUCT: Teeth Whitening Product

---

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🦷 PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Safe OTC Peroxide Strip System
- PAP Non-Peroxide Whitening Strip
- Optical-Only Whitening Toothpaste
- Enamel-Damaging Charcoal Whitening Powder
- High-Peroxide Clinical-Grade Tray System
- nHAp Optical Brightening Toothpaste (No Stain Removal)

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering whitening mechanism class, enamel safety tier, sensitivity protection, pH compatibility, realistic whitening expectation, and overall formulation balance.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy / Sensitivity Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Oral Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Whitening + Enamel Safety Analysis

### Whitening Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Enamel Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Sensitivity Protection — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Gingival / Mucosal Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Oral Microbiome Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cumulative Treatment Risk — ⭐X.X

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

# 👤 USER TYPE COMPATIBILITY

## Population Compatibility

### Sensitive Teeth — ⭐X.X

Short compatibility explanation.

### Enamel-Compromised — ⭐X.X

Short compatibility explanation.

### Gum / Gingivitis Issues — ⭐X.X

Short compatibility explanation.

### Intrinsic Stain (Coffee, Tea, Tobacco) — ⭐X.X

Short compatibility explanation.

### Extrinsic Stain Only — ⭐X.X

Short compatibility explanation.

### Maintenance Whitening — ⭐X.X

Short compatibility explanation.

### Children / Adolescents — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Treatment Usability

### Single Treatment Cycle — ⭐X.X

Short explanation.

### Repeated Cycle Use (2–3×/Year) — ⭐X.X

Short explanation.

### Daily Maintenance Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Whitening sensation or visual change
- Sensitivity signals
- Gingival comfort

## Medium-Term (Across Treatment Cycle)

- Shade improvement realism
- Sensitivity accumulation
- Enamel response

## Long-Term (Repeated Cycles)

- Enamel integrity
- Sensitivity trajectory
- Gingival health
- Shade durability

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting whitening mechanism, enamel safety, sensitivity mitigation, mucosal and gingival impact, active concentration relevance, and long-term oral outcome.

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
- Mention peroxide concentration tier, enamel risk, sensitivity concerns, LED-only mechanism failures, charcoal enamel risk, and acid-based whitening risk in output
- No whiter = healthier bias
- Structural enamel safety overrides whitening result
- Whitening mechanism class must be classified before scoring
- Enamel safety tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Sensitivity mitigation assessment must occur before Allergy and Sensitivity scoring
- Repeated-treatment behavior > single-use result
- Long-term enamel outcome > immediate shade improvement
- Post-treatment sensitivity = structural failure signal
- Charcoal ≠ safe natural whitening
- LED alone ≠ whitening mechanism
- Optical pigment ≠ structural whitening
- Higher peroxide ≠ better (beyond safe OTC range)
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Teeth Whitening Product Evaluation Algorithm — Structured for whitening mechanism analysis, enamel safety realism, and long-term repeated-treatment oral health evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict teeth whitening product structural evaluation engine."
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