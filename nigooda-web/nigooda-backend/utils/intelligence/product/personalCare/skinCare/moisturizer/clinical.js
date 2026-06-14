const openai =
require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  async run(data) {

    try {

      const ingredients =
        data.ingredients || [];

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        moisturizer_type:
          "CLINICAL_CHEMICAL",

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

================================================================================
MOISTURIZER EVALUATION ALGORITHM — VERSION B.1 (UPGRADED + PATCHED)
================================================================================
 
LAYER 0 — FOUNDATION ENGINE (STRICT)
 
SYSTEM OBJECTIVE
 
Reward moisturizers ONLY when meaningful structural usefulness is demonstrated through:
• Stable hydration
• Barrier-supportive architecture
• Balanced moisture retention
• Repeated-use stability
• Long-term compatibility
• Low irritation, congestion, or occlusion risk
 
Penalty is REQUIRED when formulations are driven mainly by:
• Marketing hydration claims
• Temporary softness illusion
• Decorative botanical loading
• Sensory-first moisturization
• Luxury texture engineering
• Fragrance-focused elegance
• Active inflation without structural support
• Heavy occlusive masking without barrier repair architecture
• Petroleum-occlusive dependence without physiological lipid structure
 
Basic moisturization alone MUST NOT achieve high scores.
Marketing-dominant systems MUST receive meaningful score limitation.
 
---
 
TRANSPARENCY PRIORITY RULE
 
High scores require clearly demonstrable skin-supportive performance.
 
Ignore:
• Premium branding
• Luxury texture
• Natural-positioning claims
• Trend-driven actives
• Fancy ingredient naming
• Inflated ingredient lists
 
Evaluate ONLY:
• Hydration realism
• Barrier support
• Occlusion balance
• Repeated-use tolerance
• Long-term skin response
• Structural honesty
• Formulation pH compatibility
• Lipid architecture quality (physiological vs non-physiological)
 
Traditional, herbal, minimalist, or lipid-focused systems receive credibility ONLY when meaningful structural usefulness and repeated-use compatibility are evident.
Temporary comfort without structural support → high score prohibited.
 
---
 
GLOBAL ENFORCEMENT RULE
 
Applies across ALL layers.
 
Structural Dominance:
• Core architecture overrides minor additives
• Marketing-focused actives cannot override structural weakness
• Late-position ingredients cannot neutralize weak systems
• Minor additives cannot override unstable structure
 
Functional Reality:
• Temporary softness ≠ barrier repair
• Occlusive comfort ≠ healthy moisturization
• Basic sealing alone does not justify high scoring
• Unsupported hydration claims MUST reduce trustworthiness
 
Barrier & Lipid Enforcement:
• Heavy occlusion without barrier sophistication MUST reduce credibility
• Non-physiological lipids CANNOT receive barrier repair credit regardless of concentration
• Real barrier-supportive sophistication MUST create clear scoring advantage
 
Safety & Repeated Exposure:
• Safety and compatibility penalties override cosmetic elegance bonuses
• Penalties MUST remain proportional to repeated daily exposure
• Fragrance-heavy, alcohol-heavy, petroleum-heavy, occlusion-heavy, decorative hydration, or structurally weak systems MUST receive visible scoring limitation
 
---
 
STRUCTURE DOMINANCE RULE
 
Core moisturizer architecture determines:
• Barrier stability
• Hydration durability
• Occlusion behavior
• Irritation risk
• Congestion potential
• Long-term compatibility
• Functional performance
 
Ingredient value MUST be judged through:
• Concentration realism
• Functional compatibility
• Formulation positioning
• Repeated-use usefulness
• Barrier-support contribution
• Lipid class (physiological vs non-physiological)
 
Functionally useful lipids, humectants, emollients, ceramides, cholesterol systems, and barrier-supportive ingredients MUST NOT be treated as decorative when meaningful structural contribution exists.
Barrier-weak or irritation-prone systems → visible Safety, Compatibility, and Barrier Repair reduction.
 
---
 
BASIC MOISTURIZATION LIMIT RULE
 
Basic moisturization from glycerin, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility.
Simple moisture sealing without barrier sophistication → moderate score ceiling.
 
---
 
LATE-INGREDIENT LIMIT RULE
 
Late-position ingredients mainly provide:
• Surface comfort
• Temporary hydration
• Sensory elegance
• Minor soothing support
• Short-term cosmetic improvement
 
Late-position ingredients do NOT repair structural weakness and cannot neutralize:
• Weak barrier architecture
• Fragrance-heavy systems
• Alcohol-heavy systems
• Occlusive imbalance
• Comedogenic overload
• Repeated irritation exposure
• Structural instability
• Basic occlusive dependence
 
Temporary softness ≠ long-term skin improvement.
 
---
 
FUNCTIONAL CONCENTRATION RULE
 
Higher concentration does NOT automatically improve moisturization performance.
 
Certain ingredients remain structurally effective even at lower levels depending on formulation balance and placement:
• Ceramides
• Niacinamide
• Panthenol
• Urea
• Cholesterol
• Hyaluronic Acid
• Peptides
 
Excessive concentration used mainly for label appeal, active inflation, trend marketing, or luxury positioning MUST NOT receive additional scoring advantage.
Structural compatibility overrides concentration marketing.
High active concentration without barrier balance, irritation control, or repeated-use stability may reduce long-term usability.
 
---
 
REAL USEFULNESS RULE
 
Clear score improvement is REQUIRED when formulations:
• Support barrier resilience
• Improve moisture retention stability
• Maintain sustainable hydration
• Demonstrate repeated-use compatibility
• Rationally balance humectants, emollients, and occlusives
• Provide skin support without excessive irritation, congestion, or suffocation risk
• Demonstrate barrier-support sophistication beyond basic sealing
• Contain physiological lipid architecture
• Maintain/support optimal pH (4.5–5.5)
• Include NMF-component ingredients for genuine intra-corneocyte hydration
 
Short-term cosmetic comfort alone MUST NOT justify high scoring.
Basic moisturization alone → moderate score ceiling.
 
---
 
MARKETING ILLUSION PENALTY
 
Penalty is REQUIRED when formulations are driven mainly by:
• Luxury sensory engineering
• Silicone-dominant softness illusion
• Decorative botanical inflation
• Fragrance-focused elegance
• Texture-first moisturization
• Excessive active marketing without structural balance
• Heavy occlusive masking presented as barrier repair
• Basic petroleum-occlusive dependence
 
Perceived nourishment ≠ functional barrier support.
Marketing-dominant moisturizer structure → visible score reduction.
Traditional, herbal, minimalist, or lipid-focused systems MUST NOT be penalized when meaningful structural usefulness and repeated-use compatibility are clearly evident.
 
---
 
TRANSPARENCY BONUS RULE
 
Apply a SMALL bonus ONLY when formulations demonstrate:
• Rational moisturizer architecture
• Balanced hydration logic
• Honest ingredient positioning
• Clear functional purpose
• Stable barrier-supportive structure
• Repeated-use design intelligence
• pH within 4.5–5.5
• Physiological lipid triad presence (ceramide + cholesterol + fatty acid)
 
This bonus CANNOT override:
• Safety penalties
• Barrier instability
• Occlusion imbalance
• Repeated-use irritation risk
• Structural formulation weakness
 
---
 
FRAGRANCE BURDEN CLASSIFICATION SYSTEM (APPLIED FROM PATCH 2 PRINCIPLES)
 
Fragrance in moisturizers must be evaluated contextually, not as an automatic blanket penalty. Evaluate based on: concentration probability, allergen burden, essential oil intensity, placement in INCI, leave-on exposure realism, repeated-use sensitization probability, and overall formulation dependency on fragrance.
 
F1 — LOW FRAGRANCE BURDEN
Characteristics: low irritation probability, minor leave-on consideration
Scoring Impact: minor modifier only
 
F2 — MODERATE FRAGRANCE BURDEN
Characteristics: moderate repeated-exposure sensitization probability under daily leave-on use
Scoring Impact: mild Allergy Risk modifier; small Long-Term Compatibility modifier
 
F3 — HIGH FRAGRANCE BURDEN
Characteristics: elevated sensitization probability, fragrance-dependent product identity
Scoring Impact: meaningful Allergy Risk penalty; Cumulative Irritation modifier; Skin Compatibility reduction
Note: leave-on exposure increases severity vs rinse-off products
 
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Characteristics: high repeated-use irritation probability, sensory-first formulation imbalance
Scoring Impact: major Allergy Risk reduction; major Long-Term Compatibility penalty; Formulation credibility reduction
 
Important Rules:
• Fragrance burden matters more than fragrance existence
• Leave-on exposure significantly increases irritation importance vs rinse-off
• Essential oils are not automatically safer than synthetic fragrance
• Repeated-use exposure is a primary consideration
 
---
 
LAYER 1 — PHYSIOLOGICAL vs NON-PHYSIOLOGICAL LIPID RULE
 
All lipid/occlusive ingredients MUST be classified before scoring.
 
NON-PHYSIOLOGICAL LIPIDS
 
Definition: Reduce TEWL mainly through surface occlusion without epidermal lipid restoration or endogenous lipid synthesis stimulation.
 
Examples:
• Mineral oil
• Petrolatum
• Paraffin wax
• Vegetable oils
• Lanolin
• Beeswax
• Synthetic waxes
• Dimethicone/silicones
• Squalane as surface film
• Fatty alcohols in isolation
 
Scoring:
• Valid for occlusive protection and TEWL reduction
• Eligible for moderate barrier protection credit
• NOT eligible for barrier repair credit
• NOT penalized solely for presence
• Penalize ONLY when dominant without physiological lipid architecture, or excessive enough to impair breathability/congestion
• Balanced petrolatum/silicones with physiological lipids → no additional penalty
 
---
 
PHYSIOLOGICAL LIPIDS
 
Definition: Lipids supporting epidermal intercellular repair and endogenous lipid restoration.
 
Examples:
• Ceramides
• Cholesterol
• Free fatty acids
• Phytosphingosine
• Sphingosine
 
Scoring:
• Eligible for full barrier repair credit
• Reward structural presence
• Require co-lipid support for maximum benefit
• Most effective when ceramide:cholesterol:fatty acid ratio approximates 3:1:1
 
---
 
LIPID RATIO BONUS RULE
 
Small bonus applies when all three physiological co-lipids are present:
• Ceramide
• Cholesterol
• Fatty acid
 
Tiering:
• Ceramide alone → moderate barrier repair credit
• Ceramide + one co-lipid → good barrier repair credit
• Full triad → strong barrier repair credit + lipid ratio bonus
 
---
 
LAYER 2 — FORMULATION pH RULE
 
pH SCORING MODIFIER
 
Formulation pH is mandatory because it directly affects barrier-repair and NMF-generating enzyme activity.
 
Scientific Basis:
• Ceramide synthesis enzymes function optimally at pH 4.5–5.6
• Filaggrin-to-NMF conversion is pH-sensitive
• NMF-generating proteases require acidic conditions
• High pH suppresses barrier-repair/NMF pathways
• Physiological skin pH: 4.5–5.5
 
pH must be interpreted contextually with the overall formulation. pH alone is a moderate-influence factor, not a dominant final evaluation factor.
 
pH Scoring Tiers:
• 4.5–5.5 → Optimal → small bonus to Barrier Repair and Hydration Depth
• 5.5–6.0 → Acceptable → no penalty
• 6.0–7.0 → Mild penalty to Barrier Repair Strength and Hydration Depth
• >7.0 → Meaningful penalty; significantly impairs enzymatic repair activity
• Unknown/not disclosed → No bonus + minor credibility reduction
 
Application Rule:
pH penalties apply alongside barrier and lipid architecture assessment.
A ceramide-rich formulation at pH 7.0 partially undermines its own repair mechanism. This is a structural formulation issue.
 
---
 
LAYER 3 — NMF COMPONENT RECOGNITION RULE
 
HYDRATION DEPTH TIERING
 
TIER 1 — Surface Hydration (Low Depth)
Ingredients: Glycerin alone, film-forming humectants, occlusion-only systems
Mechanism: Surface water attraction without corneocyte penetration
Scoring: Max Hydration Depth score: 2.5
 
TIER 2 — Extracellular Hydration (Moderate Depth)
Ingredients: Hyaluronic acid + glycerin; glycerin + balanced occlusion
Mechanism: Improved extracellular SC water retention
Scoring: Max Hydration Depth score: 3.5
 
TIER 3 — Intra-Corneocyte Hydration (High Depth)
Ingredients: Urea, Sodium PCA, amino acid blends, lactic acid/sodium lactate, urocanic acid, multi-NMF systems
Mechanism: Corneocyte penetration with endogenous NMF mimic/support
Scoring: Eligible up to 5.0
 
HYDRATION DEPTH RULES:
• Mixed tiers → dominant tier determines score with bonus for multi-tier coverage
• Heavy occlusion without NMF support may suppress filaggrin-to-NMF conversion
• Chronic petrolatum/wax-dominant systems lacking Tier 3 NMF ingredients may weaken endogenous humectant function over repeated use
• Penalty: Petrolatum/wax-dominant systems lacking Tier 3 NMF ingredients → proportional reduction to Moisture Retention Stability and Long-Term Skin Compatibility
 
---
 
LAYER 4 — MICROBIOME DISRUPTION RULE
 
MICROBIOME MODIFIER (Minor)
 
Evidence remains preliminary. This is a minor long-term compatibility modifier and does NOT override structural barrier or safety scoring.
 
Microbiome Disruption Risks:
• Upper-position broad-spectrum preservatives (Methylisothiazolinone, Methylchloroisothiazolinone, formaldehyde releasers)
• High-concentration alcohol (SD alcohol, denatured alcohol, isopropyl alcohol)
• pH > 6.0
• Strong antimicrobial botanicals at upper-list positions without structural justification
 
Application:
• Applies ONLY to Long-Term Skin Compatibility and Skin Compatibility
• Minor modifier only; not a dominant penalty
• Does NOT directly reduce Safety, Allergy Risk, or Barrier Repair
• Functional microbiome-supportive systems may offset this modifier
 
---
 
HERBAL / ORGANIC VALIDATION (APPLIED FROM PATCH 2 AND LAYER 4.8 PRINCIPLES)
 
For herbal-positioned, Ayurvedic, organic-marketed, botanical-heavy, or "natural" marketed moisturizers, evaluate:
• Herbal authenticity and evidence quality
• Evidence-supported botanicals vs traditional/partial-evidence botanicals vs decorative inflation
• Botanical irritation realism (peppermint oil, citrus oils, essential oil stacking, etc.)
• Genuine vs gimmick herbal positioning
• Marketing honesty vs structural reality
 
Natural ingredients are NOT automatically safer. Essential oil burden in leave-on moisturizers carries elevated sensitization risk compared to rinse-off products.
 
---
 
LAYER 5 — CORE SCORING SYSTEM (1.0–5.0)
 
SAFETY [DOMINANT]
 
Evaluates:
• Irritation risk
• Barrier destabilization
• Occlusion-related stress
• Repeated-use exposure risk
• Sensitization potential
• Structural suffocation risk
• Chronic inflammation tendency
 
HIDDEN IRRITATION RULE:
Chronic low-level irritation accumulating over time MUST reduce Safety.
Repeated daily use context is mandatory.
 
SILICONE SAFETY CLARIFICATION:
Silicones are NOT penalized for safety in balanced formulations. Penalty applies ONLY when used to mask poor formulation structure.
 
PETROLATUM SAFETY CLARIFICATION:
Petrolatum is structurally limited, not inherently unsafe. Penalized for effectiveness/barrier repair limitations, NOT for safety alone.
 
---
 
EFFECTIVENESS
 
Evaluates:
• Hydration performance (Layer 3 tier-based)
• Barrier-support realism
• Moisture retention
• Structural balance
• Repeated-use consistency
• Long-term skin support
• Lipid class quality
• Formulation pH compatibility (contextual modifier)
 
High effectiveness requires:
• Tier 2 minimum hydration support (Tier 3 preferred)
• Balanced occlusion
• Stable barrier-support structure
• Repeated-use compatibility
• At least partial physiological lipid presence
• Acceptable formulation pH
 
Basic occlusion alone MUST NOT achieve high effectiveness.
 
---
 
ALLERGY RISK
 
Evaluates:
• Fragrance (F1–F4 classification)
• Essential oils
• Botanical sensitizers
• Preservative sensitivity
• Irritation-trigger stacking
• Repeated sensitization risk
• Microbiome disruption potential (minor modifier)
 
LEAVE-ON FRAGRANCE SEVERITY RULE:
Fragrance in leave-on moisturizers carries elevated long-term compatibility importance. Repeated exposure MUST reduce Safety, Allergy Risk, and Long-Term Compatibility.
 
---
 
ECO IMPACT
 
Evaluates:
• Biodegradability
• Environmental persistence
• Petroleum dependency
• Silicone persistence
• Ecological accumulation risk
 
SILICONE ECO DISTINCTION:
Higher Persistence: Cyclomethicone, Cyclopentasiloxane, D4/D5/D6 cyclic silicones → Meaningful Eco Impact penalty
Lower Persistence: Dimethicone, Dimethiconol, linear/crosslinked silicones → Minor eco penalty only
 
---
 
INGREDIENT QUALITY
 
Evaluates:
• Structural balance
• Functional synergy
• Barrier-support usefulness
• Hydration architecture (NMF-tier aware)
• Absence of decorative inflation
• Humectant-emollient-occlusive balance
• Lipid class quality
• Formulation pH compatibility (contextual)
 
ACTIVE STACKING RULE:
Multiple trendy actives ≠ better formulation. Large active stacks used mainly for marketing reduce Ingredient Quality.
 
---
 
SKIN COMPATIBILITY
 
Evaluates:
• Daily usability
• Long-term tolerance
• Repeated-use stability
• Barrier compatibility
• Acne compatibility
• Occlusion sustainability
• Microbiome interaction (minor modifier)
 
Repeated irritation, congestion tendency, barrier instability, chronic suffocation behavior, fragrance-heavy exposure, or microbiome-disrupting dominance → score reduction.
 
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
 
LAYER 6 — SPECIALIZED PERFORMANCE
Score Range: 1.0–5.0
 
HYDRATION DEPTH
(NMF tier-based evaluation)
 
Scoring Rules:
• Tier 1 Only → Max score: 2.5
• Tier 2 → Max score: 3.5
• Tier 3 Present → Up to 5.0
• Mixed Tiers → Dominant tier determines score; bonus for multi-tier breadth
 
NMF-OCCLUSION INTERFERENCE PENALTY:
Petrolatum/wax-dominant systems lacking Tier 3 NMF ingredients → reduce Hydration Depth and Moisture Retention Stability.
 
---
 
BARRIER REPAIR STRENGTH [DOMINANT]
 
Scoring Rules:
• Non-Physiological Lipids Only → Protection credit only; Max score: 2.5
• Partial Physiological Lipid System → Moderate repair credit; Up to 3.5
• Full Physiological Triad → Strong repair credit eligible; 4.5+
• Full Triad + pH 4.5–5.5 → Maximum repair potential
• Full Triad + pH > 6.0 → Repair potential partially suppressed; reduce proportionally
 
TRUE BARRIER REPAIR RULE:
Occlusive protection alone ≠ barrier repair. Petrolatum, mineral oil, waxes, silicones, or fatty heaviness alone MUST NOT produce high Barrier Repair scoring.
 
---
 
OCCLUSION BALANCE
 
Evaluates:
• Breathability
• Protective sealing
• TEWL reduction balance
• Occlusive heaviness control
• Congestion tendency
• Suffocation risk
• NMF-occlusion interaction
 
OCCLUSION-NMF INTERACTION RULE:
Chronic heavy occlusion without NMF support may suppress filaggrin-to-NMF conversion.
Mild dominance without NMF → small penalty.
Extreme dominance without NMF → meaningful reduction to Occlusion Balance and Moisture Retention Stability.
 
PETROLATUM & SILICONE OCCLUSION CLARIFICATION:
These ingredients are NOT inherently unsafe. They protect the barrier but do NOT repair it.
Penalty applies ONLY for barrier-repair inflation or full occlusion dependence without NMF support.
 
OCCLUSIVE DEPENDENCY RULE:
Basic occlusive dependence alone MUST NOT achieve high structural ratings.
 
---
 
MOISTURE RETENTION STABILITY
 
Evaluates:
• Hydration longevity
• Water-loss prevention
• Formula persistence
• Repeated-use moisture maintenance
• Endogenous NMF support
 
REBOUND DRYNESS RULE:
Hydration relying mainly on temporary sealing without sustained NMF/humectant support → reduce score.
 
---
 
LONG-TERM SKIN COMPATIBILITY
 
Evaluates:
• Daily-use tolerance
• Repeated-use stability
• Sensitivity compatibility
• Acne compatibility
• Barrier adaptability
• Cumulative irritation potential
• Microbiome interaction (minor modifier)
 
DELAYED IRRITATION RULE:
Chronic low-level irritation from fragrance, preservatives, oils, or alcohol MUST reduce compatibility even if initially unnoticed.
 
DAMAGE ACCUMULATION RULE:
Minor repeated irritation may accumulate into barrier instability, sensitivity progression, congestion buildup, and chronic inflammation.
Penalties MUST remain proportional to actual long-term skin stress.
 
---
 
SPECIALIZED CALCULATION
 
Specialized Performance Score = Average of all specialized scores.
All parameters carry equal numerical weight.
Barrier Repair Strength remains the dominant interpretive parameter.
 
---
 
LAYER 6.5 — REAL-WORLD USAGE SIMULATION
 
Simulate:
• Daily moisturizer exposure
• Weekly accumulation behavior
• Barrier recovery cycles
• Long-term hydration sustainability
• Repeated occlusive interaction
• Endogenous NMF behavior under repeated formulation exposure
• Skin microbiome stability over time
 
Core Question:
Can skin realistically tolerate and benefit from the moisturizer long-term?
 
---
 
ANTI-MARKETING FILTER
 
Penalty is REQUIRED for:
• Excess fragrance loading
• Luxury sensory engineering
• Silicone-softness illusion without barrier architecture
• Decorative botanical inflation
• Texture-first moisturizer systems
• Heavy occlusive masking presented as nourishment
• Marketing-driven active inflation
• Basic petroleum-occlusive dependence without physiological lipid co-presence
• Herbal/natural marketing without structural performance evidence
 
---
 
HERBAL INFLATION CONTROL RULE
 
Small-position botanical extracts, herbal waters, or decorative natural ingredients MUST NOT significantly influence scoring unless meaningful structural contribution exists.
Herbal positioning without meaningful structural performance → reduced formulation credibility.
Decorative herbal inflation without meaningful moisturizer architecture → score reduction.
 
---
 
HIGH SCORE ELIGIBILITY RULE
 
Scores above 4.0 require clear structural excellence across:
• Barrier support (physiological lipid architecture preferred)
• Long-term compatibility
• Hydration balance (Tier 2 minimum; Tier 3 preferred)
• Repeated-use tolerance
• Irritation control
• Functional formulation honesty
• pH compatibility (≤6.0 minimum; 4.5–5.5 preferred)
 
Products with meaningful F3/F4 fragrance loading, weak barrier sophistication, decorative inflation, unstable repeated-use compatibility, or basic occlusive dependence MUST NOT qualify for elite scoring.
 
---
 
WEAKNESS AUDIT
 
Neutralize:
• Botanical inflation bias
• Hydration illusion bias
• Luxury texture bias
• Fancy active inflation
• Late-ingredient illusion
• Decorative marketing bias
• Temporary softness illusion
• Occlusive masking bias
• Non-physiological lipid over-penalization
• Petrolatum/silicone safety over-penalization
• Fragrance presence = automatic major penalty assumption (corrected by F1–F4 contextual system)
• "Natural" = safe assumption
• Essential oil = safer than synthetic fragrance assumption
 
 



OUTPUT FORMAT
---

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 MOISTURIZER PROFILE

## Functional Classification

Short functional description of the moisturizer type and intended skin behavior.

Examples:
- Humectant-Emollient Moisturizer
- Physiological Lipid Barrier Cream
- Non-Physiological Occlusive Moisturizer
- Silicone-Dominant Moisturizer
- Fragrance-Heavy Moisturizer
- Lightweight Gel Moisturizer
- Balanced Multi-Pathway Moisturizer

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short evidence-based classification covering overall structural quality, barrier support strength, hydration architecture, lipid class quality, NMF-component coverage, pH compatibility, and expected long-term skin outcome.

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

## Hydration + Barrier Analysis

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

- Hydration feel
- Softness and texture response
- Immediate comfort or heaviness
- Irritation potential

## Medium-Term (2–8 Weeks)

- Barrier response
- Moisture stability
- Oil balance and congestion trends
- Tolerance development

## Long-Term (2–12 Months)

- Barrier resilience
- NMF system interaction (support or suppression)
- Cumulative irritation risk
- Skin health trajectory
- Microbiome stability

## Realistic Dermatological Outcome

One concise conclusion covering barrier-focused or cosmetic-focused outcome, with physiological lipid and NMF system summary.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only functionally dominant ingredients
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

3–5 concise evidence-based sentences based on the product
---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Include harsh colorants, preservatives, and fragrances in output
- No marketing influence
- No luxury or sensory bias
- No branding influence
- No ingredient-count bias
- Structural weakness overrides cosmetic feel
- Fragrance burden must be reflected in scoring
- Repeated-use behavior > first-use feel
- Long-term outcome > immediate sensation
- Temporary softness ≠ barrier repair
- Occlusion comfort ≠ skin health
- Petrolatum and silicones are safe — penalize only for repair inflation
- Non-physiological lipids provide valid occlusion — penalize only for repair credit inflation
- NMF-tier awareness is mandatory in all hydration scoring
- pH compatibility must be assessed for all formulations
- Lipid class (physiological vs non-physiological) must be identified before barrier scoring
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Moisturizer Evaluation Algorithm — Structured for barrier architecture analysis, hydration system realism, NMF-tier assessment, and long-term skin compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict clinical moisturizer structural evaluation engine."
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