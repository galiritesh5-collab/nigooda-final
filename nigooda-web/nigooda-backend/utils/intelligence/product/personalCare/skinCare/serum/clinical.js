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

        serum_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL SERUM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
SERUM EVALUATION ALGORITHM — VERSION 1.1 (PATCHED)
================================================================================
LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward ONLY when structural usefulness is realistically demonstrated through:
• Stable active system with credible delivery architecture
• Barrier-compatible formulation design
• Repeated-use tolerance sustainability
• Low chronic irritation burden
• Evidence-based active balance
• Long-term skin compatibility
• Structurally honest formulation
• Stable solvent/vehicle system
• Realistic dermatological outcome potential
Core evaluation question:
"Can skin realistically tolerate and benefit from this serum long-term?"
Penalty REQUIRED when formulation is primarily driven by:
• Marketing-heavy active loading
• Ingredient illusion systems
• Decorative botanical loading
• Sensory-first engineering
• Cosmetic-only glow systems
• Unstable active systems
• Excessive active stacking without tolerance architecture
• Irritation-driven brightening
• Silicone masking systems
• Fragrance-supported experience
• Alcohol-heavy penetration systems
• Hype-focused formulation design
---
TRANSPARENCY PRIORITY RULE
High scores allowed ONLY when structural usefulness is realistically demonstrable.
Ignore:
• Branding/luxury positioning
• Ingredient hype/trend positioning
• Long INCI lists used for label appeal
• "Clinical strength" marketing
• Peptide inflation claims
• Niacinamide percentage marketing
• Vitamin C concentration hype
• Decorative botanical extracts
• Clean beauty positioning
Evaluate ONLY:
• Structural honesty
• Stability and delivery realism
• Repeated-use tolerance
• Barrier interaction behavior
• Realistic skin outcome potential
• Chronic irritation burden
• pH compatibility
• Long-term compatibility architecture
---
GLOBAL ENFORCEMENT RULE
• Core structure overrides minor additives
• Effectiveness cannot override instability, irritation burden, sensitization risk, or barrier stress
• Late-position ingredients cannot neutralize fragrance-heavy, alcohol-heavy, acid-overloaded, or unstable systems
• Hydration ≠ repair
• Glow ≠ skin health
• Comfort ≠ long-term compatibility
• Decorative systems MUST reduce credibility
• Repeated-use realism overrides short-term cosmetic performance
• Concentration alone does NOT prove effectiveness
• pH incompatibility between actives = structural formulation failure
---
STRUCTURE DOMINANCE RULE
Core architecture determines:
• Irritation/sensitization risk
• Barrier interaction behavior
• Penetration profile
• Active stability
• Repeated-use tolerance
• Long-term compatibility
• Functional usefulness
Minor additives cannot override unstable or irritation-heavy core systems.
Functional support ingredients genuinely improving stability, buffering, tolerance, or barrier resilience MUST NOT be treated as decorative.
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients cannot neutralize:
• Alcohol-heavy systems
• Fragrance exposure
• Essential oil burden
• Acid overloading
• Unstable actives
• Chronic barrier stress
---
FUNCTIONAL CONCENTRATION RULE
Evidence-supported functional ranges:
• Niacinamide: 2–5%; 10%+ = diminishing returns/flush risk
• Salicylic acid: 0.5–2%; >2% leave-on increases irritation
• Glycolic acid: effectiveness depends on pH, not percentage alone
• Retinol: 0.025–1%; tolerance-gated, not concentration-gated
• L-Ascorbic acid: 10–20% at pH ≤3.5 optimal; >20% increases instability/reactivity
• Ceramides: effective at low concentration
• Peptides: concentration irrelevant if peptide lacks evidence
Excessive concentration used mainly for marketing visibility MUST NOT receive extra scoring advantage.
Aggressive concentration without tolerance balance MUST reduce compatibility confidence.
---
REPEATED-USE REALISM RULE
Serums MUST be evaluated through cumulative exposure behavior.
Simulate:
• Irritation accumulation
• Barrier fatigue
• Delayed sensitization
• Chronic penetration stress
• Inflammation buildup from stacking
• Rebound irritation
• Long-term tolerance sustainability
• Active stacking burden
Short-term glow may still receive major penalties when long-term irritation risk is elevated.
---
FRAGRANCE BURDEN CLASSIFICATION SYSTEM (APPLIED FROM PATCH 2 PRINCIPLES)
Fragrance in serums must be evaluated contextually by burden tier.
F1 — LOW FRAGRANCE BURDEN
Scoring Impact: minor modifier; leave-on context elevates concern above rinse-off
F2 — MODERATE FRAGRANCE BURDEN
Scoring Impact: mild-moderate Allergy Risk modifier; Long-Term Tolerance modifier
F3 — HIGH FRAGRANCE BURDEN
Scoring Impact: meaningful Allergy Risk penalty; Safety penalty; Irritation Accumulation Risk penalty; Long-Term Tolerance reduction
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Scoring Impact: major Allergy Risk reduction; major Safety penalty; Barrier Compatibility penalty; Formulation credibility reduction
Fragrance + penetration enhancers = amplified sensitization delivery → mandatory additional penalty.
Essential oils are not automatically safer than synthetic fragrance.
Repeated leave-on exposure is the primary consideration.
---
HERBAL / BOTANICAL VALIDATION (APPLIED FROM PATCH 2 AND LAYER 4.8 PRINCIPLES)
For herbal-positioned, Ayurvedic, botanical-heavy, or "natural" marketed serums, evaluate:
• Evidence quality of botanicals (H1/H2/H3 classification)
• Rinse-off/leave-on exposure realism
• Essential oil burden
• Genuine vs gimmick herbal positioning
• Marketing honesty vs structural reality
Natural ingredients are NOT automatically safer. Essential oil and botanical sensitizer burden in leave-on serums carries elevated repeated-use sensitization risk.
---
LAYER 1 — VITAMIN C STABILITY CLASSIFICATION RULE
All vitamin C forms MUST be classified before effectiveness/stability scoring.
CLASS 1 — L-Ascorbic Acid (LAA)
• Optimal pH: 2.5–3.5; above pH 4.0 absorption declines; above pH 5.0 oxidation accelerates
• Optimal concentration: 10–20%
• Preferred: anhydrous/water-minimized + opaque/airless packaging
• Scoring: High effectiveness credit ONLY when pH ≤3.5 AND packaging is stability-appropriate
• pH >4.0 or open/clear packaging → major Active Stability reduction
• Compatibility: pH 2.5–3.5 increases acidity burden; sensitive/barrier-damaged skin requires Safety and Barrier Compatibility reduction
CLASS 2 — Ascorbyl Glucoside (AA2G)
• pH stability: 5.0–7.0; moderate conversion efficiency
• Scoring: Moderate effectiveness; strong stability credit; sensitive-skin compatible
CLASS 3 — Sodium Ascorbyl Phosphate (SAP)
• pH stability: 5.5–7.0; antimicrobial/acne-supportive properties
• Scoring: Moderate effectiveness; strong stability; acne-prone compatibility bonus
CLASS 4 — ATIP / THDC
• Oil-soluble; excellent anhydrous stability; good penetration and conversion efficiency
• Scoring: Good effectiveness; strong stability; dry/mature skin compatibility
CLASS 5 — Magnesium Ascorbyl Phosphate (MAP)
• pH stability: 6.0–7.0; gentle/stable; effective around 10%
• Scoring: Moderate effectiveness; sensitive-skin compatible; lower irritation than LAA
OXIDATION PENALTY RULE:
Open-jar packaging, LAA pH >4.5, or orange/brown discoloration → reduce Active Stability by 1.0–1.5 points.
---
LAYER 2 — RETINOID CLASSIFICATION & CONVERSION HIERARCHY
All retinoid serums MUST classify retinoid form before effectiveness and irritation scoring.
Conversion hierarchy:
• Retinoic acid → 0 conversions; Highest irritation; Fastest speed; Gold standard effectiveness
• Retinaldehyde → 1 conversion; High irritation; Fast speed; Near-prescription effectiveness
• Retinol → 2 conversions; Moderate irritation; Moderate speed; Established effectiveness
• HPR → Direct agonist; Low irritation; Moderate speed; Strong cosmetic effectiveness
• Retinyl esters → 3+ conversions; Lowest irritation; Slowest speed; Weakest effectiveness
RETINOID SCORING RULES:
• Retinaldehyde → high effectiveness credit; elevated irritation burden; mandatory tolerance architecture required
• Retinol → good effectiveness at ≥0.1%; <0.025% = marginal; moderate irritation; oxidation-sensitive; optimal stability pH: 5.0–6.0
• HPR → good effectiveness; lower irritation than retinol; Barrier Compatibility credit; sensitive-skin suitable with support architecture
• Retinyl Esters → low effectiveness; suitable mainly for maintenance use; marketing inflation penalty if positioned equivalent to retinol
RETINOID STACKING PENALTY:
Multiple retinoids in one formulation → reduce Ingredient Quality.
RETINOID-ACID INTERACTION PENALTY:
Retinoid + active AHA/BHA in same formulation → mandatory Safety and Barrier Compatibility reduction.
---
LAYER 3 — ACID EXFOLIANT pH-DOSE FRAMEWORK
ACID CLASSES:
• AHAs: Glycolic acid (deepest penetration/highest irritation), Lactic acid (gentler + NMF component), Mandelic acid (slow penetration/lowest irritation), Malic/tartaric/citric (supportive weaker exfoliants)
• BHAs: Salicylic acid (lipophilic, comedolytic, anti-inflammatory; optimal 0.5–2% at pH 3.0–4.0)
• PHAs: Gluconolactone, lactobionic acid (large molecules, slow penetration, gentle, humectant, antioxidant)
pH-DOSE SAFETY TIERS:
• pH <3.0 → Very high irritation risk → Safety + Barrier penalty
• pH 3.0–3.5 → High but validated → tolerance support required
• pH 3.5–4.0 → Moderate → acceptable; sensitive-skin caution
• pH 4.0–4.5 → Low-moderate → well tolerated
• pH >4.5 → Minimal exfoliation → reduce Effectiveness
ACID STACKING RULE:
• PHA + low BHA → acceptable
• AHA + low BHA → repeated-use risk
• High AHA + high BHA at pH <3.5 → mandatory Safety and Barrier Compatibility reduction
ACID-RETINOID COMBINATION PENALTY:
Active acid + active retinoid in same product → reduce Safety and Long-Term Tolerance.
NMF-AHA BONUS:
Lactic acid in formulation-dominant position receives small dual-function bonus due to exfoliation + NMF humectant role.
---
LAYER 4 — PENETRATION ENHANCER & SOLVENT CLASSIFICATION
PENETRATION ENHANCER CLASSES
CLASS A — Alcohol Solvents (SD alcohol, denatured alcohol, ethanol dominant >5%)
Effects: Rapid delivery; rapid evaporation; barrier disruption; dryness; microbiome stress; irritation accumulation
Scoring: Reduce Safety, Barrier Compatibility, and Long-Term Tolerance proportionally to dominance
CLASS B — Glycol Solvents (propylene glycol, butylene glycol, pentylene glycol, propanediol, caprylyl glycol)
Profile: Generally well tolerated; low-moderate barrier interaction
Scoring: Minor safety concern only when dominant
CLASS C — Fatty Acid Enhancers (oleic, linoleic, lauric acid)
Scoring: Oleic dominant → barrier disruption concern; Linoleic dominant → barrier-supportive credit
CLASS D — Surfactant Enhancers (SLES, polysorbates in leave-on systems)
Scoring: Penalize Safety if dominant
CLASS E — Terpenes & Essential Oils (menthol, limonene, linalool, eugenol)
Dual risk: penetration enhancement + sensitization
Scoring: Mandatory Safety and Allergy Risk reduction when dominant
SOLVENT SYSTEM SCORING RULE:
• Water-dominant + glycol support → baseline
• Glycol-dominant → moderate penetration/good tolerance
• Alcohol-dominant → elevated barrier disruption penalty
• Oil-dominant → assess comedogenicity + fatty acid behavior
• Silicone-dominant → low penetration/low irritation; assess eco impact
---
LAYER 5 — PEPTIDE EVIDENCE TIERING RULE
EVIDENCE TIERS
TIER 1 — Strong Clinical Evidence
Examples: Palmitoyl pentapeptide-4 (Matrixyl), Copper tripeptide-1 (GHK-Cu), Matrixyl 3000, Acetyl hexapeptide-3/8 (Argireline)
Scoring: Tier 1 peptides in formulation-dominant position → moderate effectiveness credit
TIER 2 — Moderate Evidence
Examples: Palmitoyl tetrapeptide-7, Tripeptide-1, mixed palmitoyl oligopeptide systems
Scoring: Minor-moderate credit with potential marketing inflation flag
TIER 3 — Weak / In Vitro / Unverified Evidence
Includes: Proprietary peptides lacking independent peer-reviewed evidence; peptides listed mainly for label appeal; Tier 1 peptides heavily underdosed or positioned after 20+ ingredients
Scoring: Negligible effectiveness credit; Ingredient Quality reduction when used primarily for marketing inflation
Multiple Tier 3/unverifiable peptides → active stacking inflation penalty
---
LAYER 6 — NIACINAMIDE SCIENCE RULE
EVIDENCE-SUPPORTED CONCENTRATION RANGES:
• 2% → measurable melanin-transfer inhibition + barrier support
• 4–5% → optimal evidence-supported range
• 10% → some supporting evidence but increased flush/redness risk with diminishing returns
• >10% → no meaningful additional evidence-supported benefit; likely marketing-driven
pH COMPATIBILITY:
• Stable across pH 4.0–7.0
• At pH <3.0, niacinamide may convert to niacin → flushing risk
• Niacinamide + high-concentration LAA at low pH → compatibility reduction
FORMULATION POSITION RULE:
• Top-5 placement at functional concentration → functional concentration credit
• High-percentage claims with ingredient listed after 15+ ingredients → label-inflation signal; reduce Ingredient Quality
---
LAYER 7 — ACTIVE INTERACTION & STACKING FRAMEWORK
SYNERGISTIC COMBINATIONS (Positive modifier):
• Niacinamide + retinol: irritation buffering + compatible pH synergy
• Lactic acid + hyaluronic acid: exfoliation + hydration replenishment
• LAA + vitamin E + ferulic acid: established antioxidant synergy
• Salicylic acid + niacinamide: anti-inflammatory + comedolytic complementarity
• Ceramides + peptides: barrier support + collagen support
NEUTRAL COMBINATIONS (No modifier):
• Hyaluronic acid + glycerin
• PHA + panthenol
• Most peptide combinations lacking documented interaction evidence
CONFLICTING / STRESS-AMPLIFYING COMBINATIONS (Negative modifier):
• LAA + niacinamide at pH <3.5 → nicotinic acid conversion risk
• Active AHA/BHA + retinoid → cumulative desquamation overload
• Multiple low-pH AHAs → additive acid burden
• Fragrance + alcohol-heavy base → amplified sensitization pathway
• Essential oil enhancers + active acids → increased irritant penetration
STACKING PENALTY SCALE:
• 2 conflicting actives → moderate Safety + Long-Term Tolerance penalty
• 3+ conflicting actives → significant penalty + Critical Alert flag
• High active density without tolerance-buffering support → reduce Barrier Compatibility and Long-Term Tolerance
---
LAYER 8 — MICROBIOME INTERACTION MODIFIER
NOTE: Microbiome evidence remains preliminary.
This layer is a MINOR modifier ONLY and cannot independently override Safety, Allergy Risk, or Barrier Compatibility.
Microbiome Disruption Risks:
• High-position MI/MCI or formaldehyde-releasing preservatives
• Dominant SD alcohol/denatured alcohol systems
• Strong antimicrobial botanicals in dominant positions
• Repeated leave-on exposure below pH 3.5
Microbiome-Supportive Factors:
• Clinically supported fermented ingredients
• Prebiotic saccharides supporting commensals
• Postbiotic bacterial lysates
Application: Minor positive/negative modifier to Long-Term Skin Compatibility ONLY.
---
LAYER 9 — CORE SCORING SYSTEM
(Evaluated 1.0 star to 5.0 star)
SAFETY [DOMINANT]
Evaluates:
• Irritation burden from acids, retinoids, alcohol, and enhancers
• Barrier disruption risk
• Sensitization risk
• Penetration-enhanced irritant delivery
• Instability/degradation exposure
• Chronic inflammation risk
• Repeated-use barrier stress
• Interaction-driven irritation amplification
Rules:
• Hidden low-level cumulative irritation MUST reduce Safety
• Penetration enhancers amplify BOTH active and irritant delivery
• Fragrance/essential oils + penetration enhancers = multiplied irritation risk
• Safety overrides: Cosmetic elegance, sensory appeal, luxury positioning, ingredient hype, marketing claims, short-term glow
---
EFFECTIVENESS
Core question: Can the serum realistically provide sustainable long-term functional benefit?
Evaluates:
• Active stability and delivery realism
• Vitamin C/retinoid/acid classification quality
• pH-active compatibility
• Evidence-supported concentration realism
• Synergy vs conflict
• Vehicle compatibility
• Repeated-use consistency
• Realistic functional contribution
Unstable, oxidized, poorly formulated, or hype-driven systems MUST receive effectiveness suppression.
---
ALLERGY RISK
Evaluates:
• Fragrance allergens (F1–F4 classification)
• Sensitizing essential oils
• Penetration-enhanced sensitizer delivery
• Botanical sensitizer loading
• Preservative sensitization risk
• Repeated-exposure sensitization accumulation
• Eye-area migration risk
Multiple sensitizers + penetration enhancement → mandatory strong reduction.
Leave-on exposure substantially increases sensitization importance.
---
ECO IMPACT
Evaluates:
• Biodegradability
• Silicone persistence
• Microplastic potential
• Petroleum dependency
• Ecological accumulation
Moderate strictness: Minor eco advantages cannot override major structural weaknesses.
---
INGREDIENT QUALITY
Evaluates:
• Structural honesty
• Synergy vs stacking inflation
• Stability architecture
• Absence of decorative loading
• Rational concentration logic
• Vehicle-active compatibility
• Preservative quality
• pH-active compatibility
ACTIVE STACKING QUALITY RULE:
Multiple trendy actives stacked mainly for label appeal reduce Ingredient Quality.
Only documented synergy or neutral coexistence receives full credit.
---
SKIN COMPATIBILITY
Evaluates:
• Daily usability
• Long-term tolerance
• Barrier compatibility
• Sensitive-skin usability
• Acne-prone suitability
• Chronic irritation sustainability
• Tolerance resilience
• Microbiome modifier (Layer 8)
Aggressive active systems CANNOT achieve elite compatibility without strong tolerance-buffering architecture.
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
LAYER 10 — SPECIALIZED PERFORMANCE
Score Range: 1.0 → 5.0
ACTIVE DELIVERY EFFICIENCY
Evaluates:
• Vehicle-dependent delivery realism
• Penetration system effectiveness
• pH-dependent bioavailability
• Free-acid availability for exfoliants
• Vitamin C class delivery realism
• Retinoid conversion efficiency
• Delivery stability over product lifespan
• Penetration enhancement vs irritation tradeoff
Rules:
• Underpowered delivery → reduced functional usefulness
• Excessively aggressive delivery → increased irritation burden
• Aggressive penetration systems MUST reduce tolerance confidence even when effectiveness is high
Vitamin C delivery hierarchy:
LAA > stable water-soluble derivatives > oil-soluble derivatives (applied relative to target skin context)
---
BARRIER COMPATIBILITY [DOMINANT]
Evaluates:
• Barrier resilience during repeated active exposure
• Penetration enhancer/barrier interaction
• Irritation-buffering architecture
• Acid stress proportional to pH + free acid level
• Retinoid irritation proportional to conversion hierarchy
• Long-term resilience maintenance
• Inflammation-control architecture
Relevant tolerance-support ingredients:
Ceramides, niacinamide, panthenol, allantoin, bisabolol in meaningful positions.
Rules:
• Repeated barrier stress or cumulative irritation → mandatory reduction
• Short-term glow cannot override chronic barrier burden
• Barrier Compatibility remains the dominant serum parameter
Tolerance Architecture Bonus:
Active exfoliant/retinoid systems containing meaningful barrier-supportive co-ingredients in non-late positions receive a small Barrier Compatibility bonus.
---
ACTIVE STABILITY
Evaluates:
• Vitamin C class-specific stability
• Retinoid oxidation resistance
• Acid stability across pH range
• Packaging suitability
• Real-world open-container stability
• pH maintenance across lifespan
Packaging Rules:
• Airless/opaque preferred for LAA and retinol
• Standard packaging acceptable for stable derivatives
OXIDATION RISK PENALTY:
• LAA in transparent/open-jar packaging → major stability reduction
• Retinol in transparent pump/jar → moderate stability reduction
• Brown/orange discoloration, separation, rancidity → maximum stability reduction
Unstable active systems MUST:
• Reduce Effectiveness confidence
• Trigger Critical Alert
---
IRRITATION ACCUMULATION RISK
Evaluates:
• Chronic acid exposure burden
• Retinoid irritation trajectory
• Alcohol/penetration-enhancer stress
• Sensitizer accumulation
• Preservative irritation burden
• Interaction-amplified irritation
• Long-term inflammatory accumulation
CUMULATIVE BURDEN CALCULATION
Burden weights accumulate additively:
• High burden: Alcohol-dominant systems; MI/MCI preservatives
• Significant burden: Fragrance in leave-on products; essential oils in functional positions
• Moderate-high burden: Active pH below 3.0
• Moderate burden: Multiple stacked acids; retinaldehyde/high-concentration retinol
Final irritation risk reflects cumulative burden sum.
---
LONG-TERM TOLERANCE
Evaluates:
• Daily usability sustainability
• Realistic adaptation trajectory
• 6–12 month compatibility
• Repeated-use comfort stability
• Tolerance-instability risk
• Long-term microbiome compatibility
Rules:
• Short-term elegance ≠ long-term tolerance
• Retinoid/acid adaptation is clinically real and should not be scored as permanent intolerance
• Fragrance sensitization is NOT adaptive and worsens with repeated exposure
• These scenarios MUST be distinguished
---
SPECIALIZED CALCULATION
Specialized Performance Score = Average of all specialized parameters.
All parameters carry equal numerical weight.
Interpretive dominance: Barrier Compatibility remains the dominant specialized parameter.
---
LAYER 10.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Daily serum exposure
• Weekly irritation accumulation
• Oxidation progression during open-container use
• Barrier recovery vs active stress cycles
• Long-term tolerance adaptation or sensitization
• Endogenous response to repeated exposure
• Long-term microbiome stability
Core question:
Can skin realistically tolerate and benefit from this serum long-term?
---
LAYER 11 — ANTI-MARKETING FILTER
Penalty REQUIRED for:
• Excess fragrance loading
• Luxury sensory masking of structural weakness
• Decorative botanical inflation
• Texture-first engineering over delivery quality
• Active marketing without stability architecture
• "Glass skin" / "barrier repair" claims lacking repair architecture
• Unstable vitamin C without stability disclosure
• Retinyl esters marketed equivalent to retinol
• Tier 3 peptide inflation
• Niacinamide percentage marketing beyond evidence-supported usefulness
• Active stacking mainly for label appeal
• Influencer-focused design lacking structural rationale
• Herbal/natural marketing without structural performance evidence
---
HIGH SCORE ELIGIBILITY RULE
Scores >4.0 require structural excellence across:
• Stable active system with correct pH + packaging architecture
• Low chronic irritation burden
• Evidence-supported active concentrations
• Strong Barrier Compatibility with tolerance architecture
• Rational active combinations
• Long-term tolerance sustainability
• Honest formulation design
• Structurally justified vehicle system
The following MUST disqualify elite scoring:
• F3/F4 fragrance loading
• Unstable active systems
• Conflicting active combinations
• Alcohol-dominant systems without tolerance support
• Excessive active stacking
---
WEAKNESS AUDIT
Neutralize:
• Botanical inflation bias
• Glow = health illusion
• Luxury texture inflation
• Fancy active inflation
• Concentration marketing bias
• Late-ingredient rescue illusion
• Decorative marketing bias
• "Natural" = safe assumption
• Essential oil = safer than synthetic fragrance assumption
• Fragrance presence = automatic major penalty assumption (corrected by F1–F4 contextual system)
• High-foam = harsh assumption (not applicable to serums but foam bias removed)
• Ingredient count = quality illusion

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 SERUM PROFILE

## Functional Classification

Short functional serum classification.

Examples:
- Stable Antioxidant Serum (LAA class, appropriate pH)
- Unstable Vitamin C Marketing Serum
- Retinoid Tolerance Serum (HPR-based, low irritation)
- Aggressive Acid Exfoliant Serum
- Balanced Niacinamide Barrier Serum
- Peptide-Supported Barrier Serum (Tier 1 evidence)
- Decorative Botanical Serum (marketing-dominant)
- Fragrance-Heavy Luxury Serum

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short evidence-based classification covering overall active architecture quality, stability profile, vehicle system, irritation burden, and expected long-term skin outcome.

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

## Active Delivery + Stability Analysis

### Active Delivery Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Active Stability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Irritation Accumulation Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Long-Term Tolerance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Major evidence-based structural advantage
- Major evidence-based structural advantage
- Major evidence-based structural advantage

## Weaknesses

- Major structural concern (with evidence basis)
- Major structural concern (with evidence basis)
- Major structural concern (with evidence basis)

---

# 🚨 CRITICAL ALERTS

## Triggered Structural Risks

Display ONLY when structurally triggered.

Examples:
- Oxidized / unstable vitamin C system — reduced efficacy and free radical risk
- Active acid + retinoid combination — over-exfoliation risk under daily use
- High-concentration alcohol base — repeated barrier disruption risk
- MI/MCI preservative in leave-on — documented sensitizer; EU restricted
- Fragrance + penetration enhancer — amplified sensitization delivery
- Multiple conflicting actives — chronic irritation accumulation risk

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

### Long-Term Use (6–12 Months) — ⭐X.X

Short explanation.

### Sensitive Skin Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (1–7 Days)

- Active delivery and absorption feel
- Initial skin response (irritation, brightness, tightening)
- Tolerance indicators

## Medium-Term (2–8 Weeks)

- Visible active outcome (pigmentation, texture, firmness, acne)
- Barrier response and adaptation
- Oil balance and congestion trends
- Tolerance development trajectory

## Long-Term (2–12 Months)

- Barrier resilience or stress accumulation
- Active system stability under real-world use
- Sensitization risk trajectory
- Cumulative irritation or skin health improvement
- Microbiome stability

## Realistic Dermatological Outcome

One concise conclusion covering active system effectiveness, irritation burden under repeated use, expected long-term skin trajectory, and whether outcome is cosmetic-driven or structurally beneficial.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only functionally dominant ingredients affecting active delivery system (class and stability noted), barrier compatibility architecture, irritation and penetration behavior, sensitization risk, long-term tolerance factors, and vehicle and solvent system.

- Ingredient — Role — Active class and stability if applicable

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

3–5 concise evidence-based sentences covering active system quality and stability architecture, irritation and barrier burden assessment, active combination assessment (synergy or conflict), vehicle and penetration system evaluation, and long-term tolerance realism.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Mention harsh fragrances, preservatives, and colorants in output
- No marketing influence
- No luxury or sensory bias
- No branding influence
- No ingredient-count bias
- Structural weakness overrides cosmetic feel
- Fragrance burden must be reflected in scoring
- Repeated-use behavior > first-use feel
- Long-term outcome > immediate sensation
- Short-term glow ≠ structural improvement
- Stability-compromised actives ≠ effective actives
- Vitamin C class and stability architecture must be assessed before effectiveness scoring
- Retinoid conversion hierarchy must be applied before irritation and effectiveness scoring
- Acid free-acid bioavailability must be evaluated with pH context, not concentration alone
- Active interaction assessment is mandatory for any multi-active formulation
- Vehicle system must be classified before barrier compatibility scoring
- Peptide tier classification must be applied before any peptide effectiveness credit
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Serum Evaluation Algorithm — Structured for active architecture analysis, stability realism, irritation accumulation assessment, and long-term skin compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict SERUM structural evaluation engine."
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