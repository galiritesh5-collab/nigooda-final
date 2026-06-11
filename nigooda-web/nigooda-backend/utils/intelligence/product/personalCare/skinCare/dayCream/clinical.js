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

        day_cream_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL DAY CREAM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
DAY CREAM EVALUATION ALGORITHM — VERSION B.1 (PATCHED)
Evidence-Based Dermatological Scoring Engine — Daytime Formulation Specialist
================================================================================
LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward ONLY formulations demonstrating:
• Stable daytime hydration
• Barrier-supportive architecture
• Breathable wearability
• Balanced moisture retention without occlusive suffocation
• Repeated-use stability under UV, heat, sweat, and pollution
• Long-term compatibility under realistic daytime exposure
• Minimal irritation, congestion, photosensitization, or layering instability
Penalty REQUIRED when driven mainly by:
• Marketing hydration/radiance claims
• Temporary softness/glow illusion
• Silicone-dominant sensory elegance
• Decorative botanical/antioxidant inflation
• Texture-first or glow-first moisturization
• Heavy occlusive masking without barrier repair structure
• Fragrance-focused elegance
• Active inflation without structural support
• Petroleum-occlusive dependence lacking physiological lipid architecture
• Photosensitizing botanicals/citrus oils without UV safety disclosure
Basic moisturization alone CANNOT achieve high scores.
Marketing-dominant systems MUST receive visible score limitation.
---
DAYTIME EXPOSURE RULE (MANDATORY)
All evaluation MUST simulate:
• 6–10h UV-A/UV-B exposure
• Heat/sweat-enhanced irritant penetration
• Pollution adhesion to occlusive residue
• Sunscreen layering + film stability interaction
• 8–12h wear duration
• Oxidative daytime stress
• Photoactivation of sensitizers
Heavy, greasy, unstable, phototoxic, or irritation-prone structures MUST lose compatibility credibility under realistic daytime exposure.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding
• Luxury texture
• Natural/trend positioning
• Fancy ingredient naming
• Inflated ingredient lists
• Glow/radiance/luminosity marketing
• Decorative antioxidant/botanical positioning
Evaluate ONLY:
• Hydration realism (NMF-tier based)
• Barrier support (physiological lipid quality)
• Breathable occlusion balance
• Repeated-use UV/heat tolerance
• Long-term skin response
• Structural honesty
• Daytime stability/layering compatibility
• pH compatibility (contextual)
• Photosensitizer safety
Temporary comfort/glow without structural support → high score prohibited.
---
GLOBAL ENFORCEMENT RULE
Applies across ALL layers:
• Core architecture overrides additives
• Marketing-focused actives cannot override structural weakness
• Late-position ingredients cannot neutralize weak systems
• Cosmetic softness/glow/silicone elegance ≠ repair or skin health
• Basic sealing alone ≠ high score justification
• Heavy occlusion without sophistication MUST reduce credibility
• Safety/compatibility penalties override cosmetic bonuses
• Non-physiological lipids CANNOT receive repair credit
• Decorative hydration/glow systems MUST reduce credibility
• Photosensitizers MUST trigger safety penalties
• Unsupported hydration/radiance claims MUST reduce trustworthiness
• Fragrance-heavy, alcohol-heavy, or structurally weak systems MUST face visible limitation
---
COSMETIC ELEGANCE FILTER
Smoothness, glow, velvet finish, silicone softness, reflective shine, or luxury sensory refinement MUST NOT be interpreted as strong hydration, barrier repair, nourishment, long-term improvement, or barrier sophistication.
Artificial cosmetic refinement without meaningful structural support → credibility reduction.
Glow/radiance marketing MUST NOT inflate scores.
---
STRUCTURE DOMINANCE RULE
Core architecture determines:
• Barrier stability
• Hydration durability
• Occlusion behavior
• Heat compatibility
• Layering stability
• Irritation/congestion risk
• Long-term compatibility
• Functional performance
Minor additives cannot override unstable structure.
---
BASIC MOISTURIZATION LIMIT RULE
Glycerin, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility.
Simple sealing without barrier sophistication or breathable balance → moderate score ceiling.
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients CANNOT neutralize:
• Weak barrier architecture
• Fragrance-heavy systems
• Occlusive imbalance
• Repeated irritation exposure
• Alcohol-heavy structures
• Poor daytime wearability
• Photosensitizer burden
• Basic occlusive dependence
---
FUNCTIONAL CONCENTRATION RULE
Higher concentration ≠ automatically better.
Concentration used mainly for label appeal, active inflation, trend marketing, or luxury positioning MUST NOT receive extra scoring advantage.
Structural compatibility overrides concentration marketing.
---
REAL USEFULNESS RULE
Clear score improvement REQUIRED when formulation:
• Supports barrier resilience under repeated daytime exposure
• Maintains sustainable hydration across realistic wear duration
• Demonstrates breathable wearability
• Shows UV/heat/sweat compatibility
• Rationally balances humectants/emollients/occlusives
• Maintains sunscreen layering stability
• Contains physiological lipid architecture
• Maintains pH 4.5–5.5
• Includes NMF-component ingredients
• Avoids photosensitizers under UV context
---
MARKETING ILLUSION PENALTY
Penalty REQUIRED for formulations driven mainly by: luxury sensory engineering, silicone-softness illusion, decorative botanical/antioxidant inflation, fragrance-focused elegance, glow/radiance-focused marketing, texture-first moisturization, active inflation, heavy occlusive masking, petroleum-occlusive dependence.
Traditional, herbal, minimalist, or lipid-focused systems MUST NOT be penalized when real structural usefulness and repeated-use compatibility are evident.
---
FRAGRANCE BURDEN CLASSIFICATION SYSTEM (PATCH 2 PRINCIPLES APPLIED)
Fragrance in day creams must be evaluated contextually by burden tier. UV exposure amplifies fragrance photoallergy and phototoxicity risk, making fragrance penalties in day creams approximately 1.5× stricter than equivalent non-UV skincare.
F1 — LOW FRAGRANCE BURDEN
Characteristics: low irritation probability, minor modifier under UV-context
Scoring Impact: minor penalty; minor Allergy Risk consideration
F2 — MODERATE FRAGRANCE BURDEN
Characteristics: moderate repeated-exposure sensitization probability; UV amplification applies
Scoring Impact: mild-moderate Allergy Risk modifier; Safety modifier in daytime UV context
F3 — HIGH FRAGRANCE BURDEN
Characteristics: elevated sensitization probability; fragrance-dependent product identity
Scoring Impact: meaningful Allergy Risk penalty; Safety penalty; Cumulative Irritation penalty; Skin Compatibility reduction
Note: UV exposure amplifies sensitization risk; stricter than non-UV skincare
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Characteristics: high repeated-use irritation probability; sensory-first formulation imbalance
Scoring Impact: major Allergy Risk reduction; major Safety penalty; Long-Term Compatibility penalty; Formulation credibility reduction
Important Rules:
• Fragrance burden matters more than fragrance existence
• UV-context daytime use elevates fragrance penalty severity
• Essential oils are NOT automatically safer than synthetic fragrance
• Photosensitizing oils (bergamot, cold-pressed citrus) receive mandatory strong penalty regardless of burden tier
• Repeated daily UV-context exposure is the primary consideration
---
HERBAL / BOTANICAL VALIDATION (APPLIED FROM LAYER 4.8 PRINCIPLES)
For herbal-positioned, Ayurvedic, botanical-heavy, or "natural" marketed day creams, evaluate:
• Evidence quality of botanicals (H1/H2/H3 classification)
• Leave-on UV-context exposure realism
• Essential oil burden and photosensitization risk
• Genuine vs gimmick herbal positioning
• Marketing honesty vs structural reality
Natural ingredients are NOT automatically safer. Essential oil burden under UV-context daytime use carries elevated photosensitization and sensitization risk.
---
LAYER 1 — PHYSIOLOGICAL vs NON-PHYSIOLOGICAL LIPID RULE
NON-PHYSIOLOGICAL LIPIDS
Definition: Reduce TEWL mainly via surface occlusion without stimulating endogenous lipid synthesis.
Examples: Mineral oil, petrolatum, paraffin wax, vegetable oils, lanolin, beeswax, synthetic waxes, dimethicone/silicones, squalane, isolated fatty alcohols
Scoring:
• Receive moderate occlusive/barrier protection credit
• NOT eligible for barrier repair credit
• No penalty merely for presence
• Penalize ONLY when dominant without physiological lipid architecture OR causing congestion/breathability issues
• Balanced petrolatum/silicones + physiological lipids → no extra penalty
---
PHYSIOLOGICAL LIPIDS
Definition: Penetrate epidermis and support endogenous intercellular lipid repair.
Examples: Ceramides, Cholesterol, Free fatty acids, Phytosphingosine, Sphingosine
Scoring:
• Eligible for full barrier repair credit
• Reward structural presence
• Require co-lipids for maximal benefit
• Optimal ratio approximates ceramide:cholesterol:fatty acid = 3:1:1
---
OLEIC ACID CAUTION RULE
High oleic acid concentration disrupts lamellar bilayers, increases TEWL, and weakens barrier integrity.
High-oleic oils (olive oil, high-oleic sunflower) MUST NOT receive full physiological fatty acid credit.
Linoleic and palmitic acid are preferred for barrier support.
---
SQUALANE CLASSIFICATION
Squalane receives partial occlusive credit and minor breathability credit.
Receives NO barrier repair credit.
---
LIPID RATIO BONUS RULE
Recognition tiers:
• Ceramide alone → moderate repair credit
• Ceramide + one co-lipid → good repair credit
• Full triad → strong repair credit + lipid ratio bonus
---
LAYER 2 — FORMULATION pH RULE
pH must be interpreted contextually alongside lipid architecture, barrier design, and formulation purpose. pH is a moderate-influence factor, not a dominant final evaluation factor.
Low pH alone must NOT create elite scoring.
Higher pH in a balanced emollient-heavy formulation does NOT automatically destroy scoring.
pH TIERING
4.5–5.5 → Contextual bonus to Barrier Repair + Hydration Depth
5.5–6.0 → Neutral
6.0–7.0 → Mild contextual penalty
>7.0 → Meaningful contextual repair suppression penalty
Unknown → No bonus + minor credibility reduction
pH modifiers apply alongside barrier and lipid architecture assessment. A ceramide-rich formulation at pH 7.0 partially undermines its own repair mechanism — this is a structural formulation issue, not a catastrophic failure.
---
LAYER 3 — NMF COMPONENT RECOGNITION RULE
HYDRATION DEPTH TIERING
Tier 1 — Surface Hydration (Low Depth)
Examples: Glycerin alone, film-forming humectants, occlusion-only systems
Result: Temporary softness; rapid daytime depletion; rebound dryness without occlusion support
Tier 1 only → max Hydration Depth score: 2.5
Tier 2 — Extracellular Hydration (Moderate Depth)
Examples: HA + glycerin systems, glycerin + balanced occlusion, betaine
Result: Better retention; adequate under mild daytime conditions
Tier 2 → max Hydration Depth score: 3.5
Tier 3 — Intra-Corneocyte Hydration (High Depth)
Examples: Urea, Sodium PCA, amino acid blends, lactic acid/sodium lactate, urocanic acid, multi-NMF systems
Result: Deep sustained hydration; stable under sweat/temperature cycles
Tier 3 present → eligible up to 5.0
NMF-OCCLUSION INTERFERENCE PENALTY
Petrolatum/wax-heavy systems lacking Tier 3 NMF humectants MUST proportionally reduce Hydration Depth and Moisture Retention Stability.
---
LAYER 4 — PHOTOSENSITIZER & UV-INTERACTION RULE (DAYTIME-SPECIFIC)
PHOTOSAFETY MODIFIER (MANDATORY)
Day creams undergo prolonged UV-A/UV-B exposure (6–12h). Certain ingredients become phototoxic, photoallergenic, or UV-unstable under exposure and MUST be evaluated.
CATEGORY A — PHOTOTOXIC INGREDIENTS
Direct UV-activated cellular damage; dose-dependent.
Examples: Bergapten, psoralen, isopsoralen present in bergamot oil, cold-pressed lime/lemon oils, angelica root oil, celery seed oil, grapefruit oil; coal tar derivatives; High-dose AHAs at low pH with sun exposure
Scoring Impact (confirmed meaningful phototoxic concentration):
• CRITICAL ALERT mandatory
• −0.8 Safety
• −0.5 Allergy Risk
Trace/low concentration with confirmed furocoumarin removal (FCF/rectified citrus): Minor flag only; no critical penalty
CATEGORY B — PHOTOALLERGENIC INGREDIENTS
Immune-mediated; concentration-independent.
Examples: Oxybenzone, PABA, certain cinnamates, certain musks/fragrance compounds, specific botanical phenols/coumarins
Scoring Impact:
• −0.3 Allergy Risk
• Long-Term Compatibility note
• Multiple photoallergens: cumulative penalty
CATEGORY C — UV-STABILITY INSTABILITY
Examples: Unstabilized L-ascorbic acid, retinoids under UV, benzoyl peroxide without UV-opaque packaging
Scoring Impact:
• Ingredient Quality reduction
• Effectiveness note
• Proper stabilization: no penalty
PHOTOSENSITIZER OVERRIDE RULE
Photosafety penalties override: botanical positioning, natural claims, luxury heritage, decorative antioxidant branding. Elegance does NOT neutralize photodamage risk.
---
LAYER 5 — MICROBIOME DISRUPTION RULE (MINOR MODIFIER)
Minor long-term compatibility modifier ONLY.
Does NOT override structural barrier or safety scoring.
Disruption risk factors:
• Methylisothiazolinone/Methylchloroisothiazolinone
• Formaldehyde releasers
• High alcohol concentration
• pH >6.0
• Strong antimicrobial botanicals at upper positions
Applies ONLY to Long-Term Skin Compatibility and Skin Compatibility.
Maximum modifier: −0.3 per dimension.
Clinically supported microbiome-supportive ingredients may offset: +0.1 to +0.2.
---
LAYER 6 — SUNSCREEN LAYERING CHEMISTRY RULE (DAYTIME-SPECIFIC)
LAYERING CHEMISTRY MODIFIER
Potential mechanisms for disruption: UV-filter redistribution, film destabilization, pilling, SPF dilution, emulsifier incompatibility.
LAYERING DISRUPTION RISK FACTORS
• Petrolatum/wax-heavy bases
• Dominant cyclic silicone systems (>15%) lacking polar emollient balance
• Alcohol >10%
• Cationic emulsifiers (Behentrimonium methosulfate, Cetrimonium chloride)
Scoring:
• High disruption risk → −0.4 Layering Compatibility + Structural Concern note
• Moderate risk → −0.2
• Rational layering architecture → +0.2 bonus
Affects ONLY Layering Compatibility.
Does NOT independently reduce Safety or Allergy Risk.
If SPF disruption meaningfully compromises UV protection → Critical Alert note added.
---
LAYER 7 — CORE SCORING SYSTEM (1.0 TO 5.0 STARS)
SAFETY [DOMINANT]
Evaluates: Leave-on irritation risk, barrier destabilization, heat/sweat occlusive stress, repeated-use sensitization, fragrance/alcohol amplification under heat (F1–F4 classification), congestion risk, structural suffocation, chronic inflammation, photosensitizer presence, repeated UV exposure stress.
HIDDEN IRRITATION RULE
Low-level irritation accumulating over time MUST reduce Safety. Overrides luxury positioning, sensory elegance, temporary softness, marketing claims.
PHOTOSENSITIZER SAFETY OVERRIDE
Confirmed Category A phototoxic ingredient at meaningful concentration: Safety CANNOT exceed 2.5; CRITICAL ALERT mandatory.
SILICONE SAFETY CLARIFICATION
Silicones are NOT inherently penalized for safety. Penalty ONLY when masking poor structure.
PETROLATUM SAFETY CLARIFICATION
Petrolatum is not penalized for Safety. Potential daytime suffocation/sweat retention affects wearability and effectiveness, NOT intrinsic safety.
---
EFFECTIVENESS
Core Question: Can the formulation realistically support hydration, barrier function, breathable daytime wearability, and long-term stability under repeated daytime use?
Evaluates: Hydration performance (Layer 3), barrier-support realism (Layer 1), moisture-retention durability, breathable occlusion, sunscreen layering stability, structural balance, repeated-use consistency, long-term support, pH compatibility (contextual modifier — Layer 2)
High Effectiveness Requires:
• Tier 2 hydration minimum (Tier 3 preferred)
• Breathable daytime occlusion
• Stable barrier-support structure
• Heat/UV repeated-use compatibility
• Physiological lipid presence
• Acceptable pH
• Stable sunscreen layering
Basic occlusion alone CANNOT achieve high effectiveness.
---
ALLERGY RISK
Evaluates: Fragrance type/burden (F1–F4 classification), essential oils, botanical sensitizers, preservative sensitivity, irritation stacking, repeated UV-amplified sensitization, photoallergens (Layer 4), microbiome disruption potential (minor modifier)
Multiple sensitizers increase cumulative risk. Daytime UV amplification significantly increases importance. Citrus oils, aromatic extracts, limonene, linalool, and coumarin-containing botanicals MUST receive elevated allergy-risk weighting in daytime context.
FRAGRANCE TIERING RULE (DAY CREAM)
High-Allergen Fragrance:
Examples: Linalool, Limonene, Cinnamal, Eugenol, Citral
Detectable leave-on levels → meaningful Allergy Risk penalty; elevated by UV context
Low-Allergen IFRA-Compliant Trace Fragrance:
Minor penalty; note added
Fragrance-Free: Allergy Risk bonus
Undisclosed Masking Fragrance: Penalized as undisclosed fragrance
---
ECO IMPACT
Evaluates: Biodegradability, environmental persistence, petroleum dependency, silicone persistence, ecological accumulation.
SILICONE ECO DISTINCTION:
• Higher Persistence (Cyclomethicone, Cyclopentasiloxane, D4/D5/D6) → Meaningful Eco penalty
• Lower Persistence (Dimethicone, Dimethiconol) → Minor eco penalty only
---
INGREDIENT QUALITY
Evaluates: Structural balance, functional synergy, barrier-support usefulness, NMF-aware hydration architecture, breathable daytime balance, absence of decorative inflation, absence of inappropriate photosensitizers, pH compatibility (contextual), functional vs decorative antioxidants.
ANTIOXIDANT FUNCTION RULE:
Functional (contribute to Ingredient Quality): L-ascorbic acid ≥8% with stabilization, Tocopherol ≥0.5% within antioxidant system, Niacinamide ≥4%, Ferulic acid stabilizer systems
Decorative (no meaningful contribution): Trace grape seed extract, ultra-low resveratrol, label-level botanicals below functional threshold
ACTIVE STACKING RULE:
Multiple trendy actives ≠ superior formulation. Only functional contribution matters.
---
SKIN COMPATIBILITY
Evaluates: Daily daytime usability, long-term tolerance under UV/heat, repeated-use stability, barrier compatibility, acne compatibility under increased sebum, heat/sweat interaction, breathable occlusion sustainability, microbiome interaction (minor), sunscreen layering compatibility.
---
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)
---
LAYER 8 — SPECIALIZED PERFORMANCE (1.0 TO 5.0 STARS)
HYDRATION DEPTH (NMF TIER-BASED)
Scoring Rules:
• Tier 1 only → max 2.5; rapid daytime depletion
• Tier 2 → max 3.5
• Tier 3 present → eligible up to 5.0
• Multi-tier systems → dominant tier + breadth bonus
NMF-OCCLUSION INTERFERENCE PENALTY:
Petrolatum/wax-dominant systems lacking Tier 3 NMF humectants MUST proportionally reduce Hydration Depth and Moisture Retention Stability.
---
BARRIER REPAIR STRENGTH
Scoring Rules:
• Non-Physiological Lipids Only → protection credit only; max 2.5
• Partial Physiological Lipid System → moderate repair credit; up to 3.5
• Full Physiological Triad → strong repair credit; 4.5+
• Full Triad + pH 4.5–5.5 → maximum repair potential (pH contextually assessed)
• Full Triad + pH >6.0 → repair partially suppressed; reduce accordingly
TRUE BARRIER REPAIR RULE:
Occlusion alone does NOT qualify as strong repair. Petrolatum, mineral oil, waxes, silicones alone MUST NOT produce high Barrier Repair scoring.
---
OCCLUSION BALANCE
Evaluates: Breathable daytime wearability, protective sealing, TEWL reduction without suffocation, heat compatibility, congestion risk, sebum interaction, NMF-occlusion interaction.
DAYTIME OCCLUSION CALIBRATION:
Day creams require lighter occlusion than night creams. Petrolatum/wax-heavy systems acceptable at night MUST receive stronger daytime occlusion penalties.
---
MOISTURE RETENTION STABILITY
Evaluates: 8–12h hydration longevity, UV/heat water-loss prevention, sweat/movement persistence, repeated-use moisture maintenance, endogenous NMF support.
REBOUND DRYNESS RULE:
Hydration relying mainly on temporary sealing without sustained NMF/humectant support MUST reduce score.
---
LONG-TERM SKIN COMPATIBILITY
Evaluates: Daily daytime tolerance, UV-amplified repeated-use stability, sensitivity compatibility, acne compatibility, barrier adaptability, cumulative irritation potential, microbiome interaction (minor modifier).
DELAYED IRRITATION RULE:
Chronic low-level irritation from fragrance (F3/F4), preservatives, alcohol, or photosensitizing oils MUST reduce compatibility even if initially unnoticed. UV exposure increases delayed sensitization likelihood.
DAMAGE ACCUMULATION RULE:
Penalties MUST remain proportional to cumulative skin stress.
---
DAYTIME WEARABILITY (DAY-CREAM SPECIFIC)
Evaluates: Breathable comfort across 8–12h, greasy behavior under heat, long-wear stability, sweat interaction, sebum compatibility, UV oxidative stability, cosmetic finish stability.
Silicone elegance alone does NOT qualify as strong wearability.
"Healthy glow" masking greasy wear MUST reduce credibility.
---
LAYERING COMPATIBILITY (DAY-CREAM SPECIFIC)
Evaluates: SPF compatibility, pilling tendency, film stability, product interaction behavior, residue buildup, sunscreen disruption risk.
Confirmed sunscreen disruption risk receives additional Layer 6 penalty.
---
Final Specialized Score = Average of all specialized scores.
---
ANTI-MARKETING FILTER
Penalty REQUIRED for formulations driven mainly by: heavy fragrance loading (F3/F4), luxury sensory engineering, silicone-softness illusion, decorative botanical/antioxidant inflation, glow/radiance marketing without structural support, texture-first moisturization, heavy occlusive masking, active stacking inflation, petroleum-occlusive dependence, herbal/natural marketing without structural performance evidence.
---
WEAKNESS AUDIT
Neutralize bias from:
• Botanical inflation bias
• Glow/radiance illusion bias
• Luxury texture inflation
• Antioxidant inflation bias
• Non-physiological lipid over-penalization
• Petrolatum/silicone safety over-penalization
• Fragrance presence = automatic major penalty assumption (corrected: F1–F4 burden tier system applies)
• pH = automatically good/bad assumption (corrected: pH is contextual, not dominant)
• "Natural/mineral" = automatically safer assumption
• Essential oil = safer than synthetic fragrance assumption
---
FINAL RATING FORMULA
Final Rating = Average of Core Score and Specialized Score
Products with meaningful F3/F4 fragrance loading, phototoxic ingredients, weak barrier sophistication, greasy wear behavior, unstable layering compatibility, decorative inflation, or basic occlusive dependence MUST NOT qualify for elite scoring.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 DAY CREAM PROFILE

## Functional Classification

Short functional description of the day cream type and intended skin behavior.

Examples:
- Physiological Lipid Day Barrier Cream
- Humectant-Emollient Daytime Moisturizer
- Non-Physiological Occlusive Day Cream
- Silicone-Dominant Daytime Moisturizer
- Fragrance-Heavy Day Cream
- Lightweight Gel Day Cream
- Balanced Multi-Pathway Daytime Moisturizer
- Photosensitizer-Risk Day Cream

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short evidence-based classification covering overall structural quality, barrier support strength, hydration architecture, lipid class quality, NMF-component coverage, pH compatibility, photosafety status, and expected long-term daytime skin outcome.

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

## Hydration + Barrier + Daytime Analysis

### Hydration Depth — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Repair Strength — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Occlusion Balance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Moisture Retention Stability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Long-Term Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Daytime Wearability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Layering Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Major evidence-based structural advantage
- Major evidence-based structural advantage
- Major evidence-based structural advantage

## Weaknesses

- Major structural concern
- Major structural concern
- Major structural concern

---

# 🚨 CRITICAL ALERTS

## Triggered Structural Risks

(Display ONLY when structurally triggered)

- **PHOTOTOXICITY RISK:** [ingredient] — phototoxic under UV exposure
- **PHOTOALLERGY RISK:** [ingredient] — photoallergenic; sensitization risk under repeated UV
- **SPF INTERFERENCE:** Formulation architecture likely disrupts sunscreen film integrity
- **HIGH-pH BARRIER SUPPRESSION:** pH [X.X] suppresses ceramide synthesis enzyme activity
- **REPEATED-USE SAFETY CONCERN:** [reason]

Remove section entirely if no critical alerts triggered.

---

# 👤 SKIN TYPE COMPATIBILITY

## Population Compatibility

### Dry Skin — ⭐X.X

Short compatibility explanation.

### Oily Skin — ⭐X.X

Short compatibility explanation.

### Combination Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Acne-Prone Skin — ⭐X.X

Short compatibility explanation.

### Barrier-Damaged Skin — ⭐X.X

Short compatibility explanation.

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

## Immediate (1–7 Days)

- Hydration feel and texture response
- Wearability under heat and UV
- Layering behavior with SPF
- Irritation or sensitization signs

## Medium-Term (2–8 Weeks)

- Barrier response and moisture stability
- Daytime wear consistency
- Oil balance and congestion trends
- Tolerance development or degradation

## Long-Term (2–12 Months)

- Barrier resilience under repeated UV stress
- NMF system interaction (support or suppression)
- Cumulative sensitization or photosensitization risk
- Skin health trajectory under daily daytime use
- Microbiome stability

## Realistic Dermatological Outcome

One concise conclusion covering barrier-focused or cosmetic-focused outcome, physiological lipid and NMF system summary, photosafety assessment, and long-term daytime skin trajectory.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only functionally dominant ingredients. Note lipid class and NMF tier where applicable.

- [Ingredient] — [Role: barrier / humectant / occlusive / sensitizer / photosensitizer] — [Lipid class if applicable] — [NMF tier if applicable]

---

# 🌿 HERBAL / NATURAL ASSESSMENT

## Botanical Realism + Marketing Balance

*(Include ONLY for herbal, natural, botanical, or essential-oil-focused formulations)*

Short calm explanation covering realistic herbal contribution, marketing vs formulation balance, essential oil burden, and natural-positioning realism.

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

3–5 concise evidence-based sentences covering barrier architecture quality and lipid class, hydration system tier and NMF coverage, irritation and sensitization and photosensitization profile, occlusion balance and daytime wearability, and repeated-use performance under UV and heat.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Mention harsh preservatives, colorants, and fragrances in output
- No marketing influence
- No luxury or sensory bias
- No branding influence
- No ingredient-count bias
- Structural weakness overrides cosmetic feel
- Fragrance burden must be reflected in scoring
- Photosensitizer presence triggers mandatory alerts
- Repeated-use behavior > first-use feel
- Long-term outcome > immediate sensation
- Temporary softness ≠ barrier repair
- Occlusion comfort ≠ skin health
- Glow or radiance ≠ barrier function
- Petrolatum and silicones are safe — penalize only for repair inflation
- Non-physiological lipids provide valid occlusion — penalize only for repair credit inflation
- NMF-tier awareness is mandatory in all hydration scoring
- pH compatibility must be assessed for all formulations
- Lipid class (physiological vs non-physiological) must be identified before barrier scoring
- Photosafety must be assessed before final rating
- Layering compatibility must be assessed before finalization
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Day Cream Evaluation Algorithm — Structured for hydration behavior analysis, barrier-support realism, photosafety assessment, and long-term daytime skin comfort evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict day cream structural evaluation engine."
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