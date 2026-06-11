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

        haircare_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CONDITIONER CLINICAL ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
HAIR CONDITIONER EVALUATION ALGORITHM — V2.0
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE Reward conditioners demonstrating: effective detangling and manageability without excessive buildup · appropriate conditioning agent architecture · cuticle sealing and fiber integrity preservation · pH compatibility for hair shaft and scalp · long-term fiber and scalp microbiome compatibility · evidence-based formulation design · low cumulative irritation and sensitization risk.
Mandatory penalties apply for: heavy silicone loading without wash-out consideration · fragrance-driven "conditioning" perception engineering · decorative botanical and protein loading beyond functional concentrations · harsh quaternary ammonium systems at high concentration · leave-on active inflation in rinse-off systems · marketing-driven sensory engineering (slip, shine) over structural fiber care.
Basic conditioning alone cannot achieve high scores.
TRANSPARENCY PRIORITY RULE Ignore: branding · slip and softness sensation alone · fragrance freshness · "natural/organic" marketing · trend-driven active loading (keratin, collagen inflation) · ingredient-count inflation.
Evaluate only: conditioning efficiency vs fiber and scalp cost · conditioning agent buildup profile · pH compatibility with hair shaft · post-rinse impact · repeated-use tolerance and buildup trajectory · scalp microbiome stability · structural formulation honesty.
GLOBAL ENFORCEMENT RULES Conditioning agent architecture is the dominant structure. Safety penalties override functional bonuses. Rinse-off actives cannot compensate for buildup-prone or scalp-irritating systems. Late-position ingredients cannot neutralize structural problems. Slip and softness ≠ fiber health. Fragrance freshness ≠ scalp health. Post-use scalp greasiness or itch = compatibility failure signal. Non-physiological pH reduces safety and cuticle preservation. Protein inflation in rinse-off must be penalized.
HARDNESS VS FAILURE SEPARATION RULE (new) Structural heaviness ≠ product failure. A rich, heavy conditioner may be appropriate for coarse, high-porosity, or chemically processed hair. Output language must reflect intended context: "less suited for fine or low-porosity hair" — not "bad conditioner." Score within the product's intended use context.
RINSE-OFF CONTEXT RULE Rinse-out conditioners have ~1–5 minutes contact time. Actives must be evaluated accordingly.
Full credit: BTMS · Behentrimonium Chloride (at functional levels) · Cetyl/Cetearyl Alcohol · Dimethicone (coating delivered during contact) · Low-MW hydrolyzed proteins (substantivity demonstrated) · Cationic Guar · Polyquaternium-10/-7
Partial credit: Panthenol · Glycerin · Niacinamide · High-MW hydrolyzed proteins (limited penetration) · Biotin (limited topical relevance)
Decorative / minimal credit: Vitamin C · Retinoids · Collagen (high MW, non-substantive) · Hyaluronic Acid (limited hair shaft substantivity) · Most antioxidant botanicals · Keratin (high MW — rinses off before binding) · Argan oil/Coconut oil at <1% (decorative slip only)
Note: Panthenol and low-MW hydrolyzed proteins provide minor but real supportive conditioning function and are not equivalent to purely decorative ingredients like collagen or high-MW keratin.
Decorative active marketing reduces Ingredient Quality and Formulation Honesty.
DEEP TREATMENT CONTEXT RULE (new) Deep conditioners, hair masks, and protein treatments are designed for extended contact (5–30 minutes), often under heat. These are not judged as daily rinse-out conditioners. When a formula clearly targets: damaged hair restoration · intensive moisture replenishment · protein reconstruction · pre/post-chemical treatment support — evaluate under extended-contact simulation, not daily rinse-out assumptions. Still penalize: scalp occlusion risk · heavy irritant loading · dishonest active claims. Do not collapse scores solely because the formula is too heavy for daily use.
LATE-INGREDIENT LIMIT RULE Late-position ingredients may provide minor conditioning, mild soothing, or sensory enhancement. They cannot offset heavy silicone buildup architectures, scalp-clogging formulation excess, or fragrance-heavy sensitization burden. Avoid both over-crediting and over-penalizing trace-concentration ingredients.
BASIC CONDITIONING LIMIT RULE Basic detangling alone cannot achieve high structural scores. Simplistic fatty alcohol-only or single-quaternary systems lacking cuticle pH consideration or buildup management receive moderate score ceilings regardless of conditioning ability.
LAYER 1 — CONDITIONING AGENT BUILDUP AND IRRITATION TIER SYSTEM
All conditioning agents must be classified before scoring. Architecture determines: cuticle sealing efficacy · fiber buildup trajectory · scalp follicle occlusion risk · long-term manageability · repeated-use safety.
TIER 1 — HIGH BUILDUP / HIGH IRRITATION RISK Non-water-soluble silicones at high concentration (Dimethicone >5%, Dimethiconol dominant) · Cyclopentasiloxane >5% · BTAC (Behentrimonium Chloride) >2% (scalp-depositing) · Mineral oil (occlusive buildup) · Petrolatum (heavy occlusion) · High-concentration wax systems (Carnauba, Beeswax dominant) → Mandatory Safety/Buildup penalties · Scalp Compatibility ceiling reduction · High Cumulative Buildup Risk
TIER 2 — MODERATE BUILDUP / MODERATE IRRITATION Cetrimonium Chloride (high concentration) · Water-soluble silicones at high levels · Stearalkonium Chloride (high concentration) · Non-volatile silicones at moderate loading → Moderate Buildup penalties · Improved tolerance when blended with Tier 3–4
TIER 3 — LOW BUILDUP / WELL-TOLERATED BTMS-25/BTMS-50 · Cetyl Alcohol · Cetearyl Alcohol · Stearyl Alcohol · Conditioning esters (Cetearyl Ethylhexanoate) · Low-concentration Cyclopentasiloxane (<2%, volatile) → Eligible for good Scalp Compatibility · Strong compatibility with Tier 4
TIER 4 — MINIMAL BUILDUP / IDEAL Panthenol · Low-MW Hydrolyzed Proteins (substantive forms) · Cationic Guar at low concentration · Polyquaternium-10/-7 · Amino acid blends at functional levels · Water-soluble conditioning polymers at low concentration → Eligible for maximum Scalp Compatibility · Transparency bonus eligible
SYSTEM CLASSIFICATION: Tier 1 alone → Severe Buildup · Tier 1 + Tier 3/4 → Moderate-High · Tier 2 alone → Moderate · Tier 2 + Tier 3/4 → Moderate-Low · Tier 3/4 dominant → Low · Tier 4 dominant → Minimal
Heavy silicone-dominant systems cannot qualify as "scalp-safe" regardless of botanical additions. Co-wash systems require stricter scalp safety evaluation due to dual cleansing-conditioning role.
LAYER 2 — CONDITIONER pH RULE
pH is a mandatory scoring modifier affecting: hair shaft cuticle sealing · frizz control · color retention · scalp microbiome stability · protein bonding efficacy.
Physiological scalp pH: 4.5–5.5. Optimal hair shaft conditioning pH: 3.5–5.5. High-pH conditioners increase cuticle swelling, fiber damage, frizz, and protein bond disruption. Alkaline conditioners (pH >7) receive major penalties.
pH SCORING TIERS: 3.5–5.5 → Optimal — Cuticle Sealing bonus + Microbiome bonus 5.5–6.5 → Acceptable — neutral scoring 6.5–7.5 → Mild penalty 7.5–9.0 → Moderate penalty
9.0 → Significant penalty — elite Cuticle Preservation disqualified Unknown → No bonus, minor credibility reduction
pH penalties apply regardless of conditioning agent gentleness. A mild Tier 4 system at alkaline pH still receives cuticle penalties.
LAYER 3 — THERAPEUTIC / ANTI-DANDRUFF CONTEXT RULE (new)
If a Category A therapeutic scalp active is present at functional concentration (Zinc Pyrithione · Piroctone Olamine · Selenium Sulfide · Ketoconazole) AND the formula is clearly treatment-oriented for scalp conditions:
Buildup and harshness penalties remain active
Effectiveness ceiling increases for target scalp condition
Scalp Compatibility penalty softens slightly (intermittent use simulation)
Formulation Honesty does NOT penalize treatment-focused conditioning weight
Long-Term Usability simulates prescribed/alternating frequency, not daily use
This prevents anti-dandruff conditioners from being scored as failed cosmetic products. It does not remove structural penalties — it contextualizes them.
LAYER 4 — SCALP MICROBIOME IMPACT
High disruption risk: Heavy silicone occlusion (follicular environment disruption) · Broad-spectrum antimicrobials at high levels without conditioning balance · High cationic surfactant load (Tier 1) · Denatured alcohol >5% in rinse-out · High-pH systems disrupting scalp acid mantle
Low disruption risk: Tier 3–4 conditioning systems at physiological pH · Targeted anti-dandruff actives at functional concentrations · Prebiotic/postbiotic support ingredients · Lightweight low-buildup systems
Targeted anti-dandruff conditioning is context-credited, not penalized when scalp condition is indicated.
LAYER 4.5 — SILICONE EVALUATION (refined)
Non-buildup: PEG-modified silicones (Dimethicone Copolyol) · volatile cyclics (Cyclomethicone) → minimal concern, rinse cleanly
Buildup-potential: Dimethicone (HMW) · Amodimethicone · Dimethiconol · Cyclopentasiloxane (D5) · Phenyl Trimethicone
FUNCTIONAL vs MASKING DISTINCTION:
Functional silicone conditions: damaged/processed/high-porosity hair targeting · high friction reduction need · silicone level appears balanced · conditioning architecture not extreme → award Cuticle Preservation partial credit + Mechanical Damage Reduction bonus
Masking silicone conditions: Tier 1 heavy silicone architecture + "repair/nourish/bond" claims relying on silicone feel · multiple insoluble silicones heavily stacked without damage-hair justification → Formulation Honesty penalty activated
Silicones are not inherently dishonest. Amodimethicone in damage-targeted conditioners receives partial functional credit. The penalty is specifically for silicone masking a poor conditioning architecture while claiming restorative performance.
D5 (Cyclopentasiloxane) receives ecological penalty regardless of functional use.
LAYER 4.6 — COLORANT PENALTY
Artificial/decorative colorants provide no conditioning, cuticle, or scalp benefit and increase sensitization burden. Red 40 · Yellow 5/6 · Blue 1 · Green 3 and synthetic dye blends receive: Allergy Risk penalty · Ingredient Quality penalty · Cumulative Irritation Risk penalty · Formulation Honesty penalty. Multiple dyes increase penalties further. Mineral pigments receive minimal penalty. Colorants must appear in Concerns and Why This Rating output.
LAYER 4.7 — HERBAL / ORGANIC VALIDATION (new)
HERBAL EVIDENCE CLASSIFICATION:
H1 — Evidence-Supported: Aloe Vera · Colloidal Oat · Centella Asiatica · Licorice · Green Tea extract · Fermented plant extracts · Rice protein (low MW, substantive) → Partial functional credit if reasonable concentration is likely, biologically plausible in rinse-out or leave-in context, and formulation architecture is compatible. Do not over-credit.
H2 — Traditional / Partial Evidence: Amla · Hibiscus · Bhringraj · Fenugreek · Rosemary · Rice Water · Shikakai → Recognize traditional use and mild supportive conditioning/antioxidant role. Do NOT allow hair growth, repair, or strong clinical claims. Output: "traditional supportive use with limited modern rinse-out evidence."
H3 — Marketing / Decorative: Exotic micro-extract stacks · gold dust botanicals · luxury plant inflation with no plausible delivery mechanism → No performance credit. Triggers Formulation Honesty reduction + Botanical Inflation flag.
GENUINE vs GIMMICK HERBAL DISTINCTION:
Genuine signals: mild conditioning architecture · coherent botanical strategy · low fragrance burden · realistic claims · hair-compatible pH · reasonable simplicity
Gimmick signals: heavy silicone or cationic backbone + herbal front marketing · essential oil overload · 20+ extract inflation · perfume-heavy "Ayurvedic/botanical" claims · "hair growth/repair" positioning without functional actives
🌿 HERBAL / ORGANIC REALISM block must appear in output for herbal-positioned conditioners, evaluating: evidence quality · traditional vs clinical support · rinse-out realism · essential oil burden · botanical inflation · authenticity of herbal positioning.
LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 for every parameter.
SAFETY [DOMINANT] — conditioning agent scalp irritation risk · follicular occlusion risk · repeated-use buildup burden · sensitization potential · pH-related hair and scalp stress · cumulative inflammatory load · long-term tolerance trajectory
EFFECTIVENESS — detangling performance · cuticle sealing · fiber damage repair (where substantiated) · rinse-off active efficacy · conditioning-to-buildup balance · pH suitability · structural formulation honesty. Basic detangling alone cannot achieve elite effectiveness.
ALLERGY RISK — fragrance exposure · essential oil sensitizers · preservative sensitizers · botanical allergens · cationic scalp sensitization · repeated-use accumulation.
Fragrance calibration (graduated): Low–moderate fragrance → moderate Allergy penalty only Heavy/perfume-driven → strong penalty Sensitive-scalp targeted + heavy fragrance → enhanced contradiction penalty Leave-in conditioners receive higher allergy risk weighting than rinse-out. Do not collapse scores from moderate fragrance alone.
ECO IMPACT — conditioning agent biodegradability · silicone environmental persistence (D5 restricted in EU wash-off products) · microplastic/synthetic polymer load · ecological accumulation risk. Natural ester and amino acid systems receive ecological preference.
INGREDIENT QUALITY — conditioning system coherence · rinse-off active honesty · functional ingredient synergy · absence of decorative active inflation · structural transparency
SKIN AND SCALP COMPATIBILITY — daily-use scalp tolerance · follicular resilience · post-wash scalp dryness or greasiness · dandruff/seborrheic dermatitis compatibility · microbiome stability · long-term tolerance trajectory
CORE SCORE FORMULA: Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin and Scalp Compatibility × 0.15)
LAYER 6 — SPECIALIZED CONDITIONER PERFORMANCE
Score range: 1.0 → 5.0
DETANGLING EFFICIENCY — wet detangling · dry manageability · fiber alignment · frizz reduction · styling compatibility. Slip alone does not equal conditioning quality. Excessive conditioning causing limpness or greasiness reduces score. pH-optimized detangling preferred over silicone-heavy slip. Ceiling rule: Tier 1 heavy-buildup systems cannot achieve maximum Detangling Efficiency — buildup-related manageability decline must be factored.
CUTICLE PRESERVATION [DOMINANT] — cuticle sealing effectiveness · pH-mediated cuticle closure · porosity management · acid mantle recovery · repeated-use fiber resilience · long-term fiber integrity
Cuticle Preservation Ceilings: Tier 1 dominant → Max 2.0 · Tier 1 + Tier 3/4 → Max 2.8 · Tier 2 dominant → Max 3.2 · Tier 2 + Tier 3/4 → Max 3.7 · Tier 3/4 dominant → Max 4.3 · Tier 3/4 at pH 3.5–5.5 → Eligible for 5.0 · Alkaline systems (pH >7) → Hard ceiling 2.0
MOISTURE AND HYDRATION SUPPORT — residual humectant benefit · post-wash moisture retention · hygral fatigue risk reduction · avoidance of excessive hygroscopic overload. Hydration in rinse-out conditioners is inherently limited. Reduced hygral fatigue = hydration success.
RESIDUAL BUILDUP RISK — post-wash scalp heaviness and greasiness · follicular buildup trajectory · long-term manageability decline · waxy or silicone film accumulation. Clarifying shampoo dependence = buildup architecture failure.
SCALP MICROBIOME COMPATIBILITY — commensal microbiome preservation · pH-mediated microbial stability · conditioning agent occlusion risk · antimicrobial selectivity. Targeted anti-dandruff actives receive contextual credit when scalp microbiome disruption is the target.
CUMULATIVE IRRITATION RISK — repeated conditioning agent scalp exposure · fragrance accumulation (weighted higher for leave-in) · essential oil sensitization · preservative sensitization · chronic scalp inflammatory burden · frequency-weighted exposure. Leave-in conditioners receive higher cumulative risk weight than rinse-out.
FORMULATION HONESTY — slip-dependent conditioning perception · fragrance-driven "nourished hair" positioning · decorative botanical and protein loading (keratin, collagen at sub-functional levels) · rinse-off active inflation · "repair/restore/bond" claims without structural evidence · "microbiome/scalp-balancing" claims lacking pH or conditioning agent support · "zero silicone" marketed as inherently superior without addressing actual conditioning architecture
SPECIALIZED PERFORMANCE SCORE = Average of all 7 parameters. Dominant: Cuticle Preservation (primary) · Cumulative Irritation Risk (primary penalty) · Residual Buildup Risk (secondary penalty)
LAYER 7 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
Equal weighting prevents: marketing-driven performance inflation · safe-but-ineffective scoring inflation · conditioning-but-scalp-damaging inflation.
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES: Tier 3 or Tier 4 dominant conditioning system · pH ≤ 6.5 (preferably 3.5–5.5) · Cuticle Preservation ≥ 3.5 · Cumulative Irritation Risk ≥ 3.0 · No rinse-off active inflation · No dominant fragrance or essential oil loading · Formulation Honesty ≥ 3.5 · No unjustified heavy silicone or cationic dominance
DISQUALIFIERS: Primary heavy non-water-soluble silicone systems (buildup-dominant) · Alkaline pH (>7) · Heavy cationic loading on scalp-contact products · Decorative Category C active marketing (collagen, hyaluronic acid, high-MW keratin) · Excessive artificial fragrance or colorant loading
LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate: hair wash frequency (every 1–3 days typical) · buildup accumulation trajectory · recovery cycles between washes · long-term fiber integrity and porosity changes · post-wash pH recovery · scalp microbiome stability · repeated fragrance/preservative sensitization.
Core question: Can the conditioner remain effective and scalp-tolerable under long-term real-world use without requiring clarifying intervention?
Therapeutic / anti-dandruff conditioners simulate at prescribed/alternating frequency, not daily use. Deep treatment / hair mask formats simulate at weekly or occasional frequency, not daily use.
ANTI-MARKETING FILTER Mandatory penalties for: slip-first conditioning claims · fragrance-driven "nourished/repaired" positioning · decorative botanical and protein loading at sub-functional levels · "repair/restore/bond" claims lacking functional evidence · rinse-off active inflation (hyaluronic acid, vitamin C, retinol) · "microbiome/scalp-balancing" without pH or conditioning agent structural support · "zero silicone" marketed as inherently superior without addressing actual architecture
BIAS NEUTRALIZATION FILTER Neutralize: slip = conditioning quality illusion · fragrance = hair health illusion · "natural conditioner = safe" bias (heavy occlusive naturals cause significant follicular buildup) · botanical protein inflation bias · luxury texture and "rich cream" bias · keratin/collagen treatment halo · rinse-off active performance halo · greasy/heavy = moisturizing illusion · "silicone-free = better" bias (mild silicones may outperform harsh alternatives) · foam in co-wash = cleansing quality illusion
ENGINE CALIBRATION TARGET: Modern dermatology + cosmetic chemistry + trichology + real-world tolerability + long-term scalp and fiber physiology. Strict but fair. Scientific but practical.
HAIR TYPE AND POROSITY ADJUSTMENT MODULE
Hair porosity and type significantly modify conditioning needs and buildup risk.
LOW POROSITY HAIR — highly susceptible to product buildup · Tier 1 systems worsen manageability fastest · lightweight Tier 4 preferred · deep conditioning benefit limited without heat. Score adjustment: Buildup Risk scores weighted more heavily.
NORMAL / MEDIUM POROSITY HAIR — baseline scoring applies without adjustment · balanced Tier 3/4 systems optimal.
HIGH POROSITY HAIR (damaged, color-treated, chemically processed) — greater need for cuticle-sealing conditioning · benefits from Tier 3 agents · pH optimization critical · protein substantivity more clinically relevant. Score adjustment: Cuticle Preservation weighted more heavily.
FINE HAIR — highest buildup susceptibility · Tier 1 systems cause rapid limpness · lightweight Tier 3/4 preferred. Score adjustment: Buildup Risk penalties amplified.
THICK / COARSE HAIR — more tolerant of Tier 2–3 heavier conditioning · may underperform with Tier 4-only systems. Score adjustment: moderate buildup tolerance adjustment.
Evaluator note: Apply porosity and type adjustments to Skin/Scalp Compatibility, Residual Buildup Risk, and Detangling Efficiency only. Core structural scoring remains architecture-based.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 CONDITIONER PROFILE

## Functional Classification

Short conditioner classification.

Examples:
- Lightweight Daily Conditioner
- Balanced BTMS Rinse-Out Conditioner
- Heavy Silicone-Loaded Conditioner
- Scalp-Safe Low-Buildup Conditioner
- Deep Conditioning Treatment

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering conditioning agent mildness and buildup profile, cuticle and fiber friendliness, pH compatibility, long-term scalp and hair behavior, and overall formulation balance.

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

### Skin and Scalp Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Hair Fiber + Scalp Analysis

### Detangling Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cuticle Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Moisture and Hydration Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Residual Buildup Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Microbiome Compatibility — ⭐X.X

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

# 👤 HAIR TYPE COMPATIBILITY

## Population Compatibility

### Fine Hair — ⭐X.X

Short compatibility explanation.

### Thick / Coarse Hair — ⭐X.X

Short compatibility explanation.

### Curly / Textured Hair — ⭐X.X

Short compatibility explanation.

### Color-Treated Hair — ⭐X.X

Short compatibility explanation.

### Damaged / High-Porosity Hair — ⭐X.X

Short compatibility explanation.

### Low-Porosity Hair — ⭐X.X

Short compatibility explanation.

### Oily Scalp — ⭐X.X

Short compatibility explanation.

### Dry Scalp / Scalp-Sensitive — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Every Other Day — ⭐X.X

Short explanation.

### Occasional / Weekly Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Conditioning feel
- Detangling and slip
- Scalp irritation signals

## Medium-Term

- Buildup trajectory
- Manageability changes
- Scalp tolerance development

## Long-Term

- Cuticle stability
- Buildup progression and clarifying needs
- Scalp microbiome stability
- Overall hair and scalp outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting conditioning system, cuticle behavior, scalp irritation and buildup risk, active performance, and long-term hair and scalp outcome.

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
- Mention harsh colorants, preservatives, fragrances, and buildup-risk ingredients in output
- No slip-volume bias
- Structural weakness overrides cosmetic feel
- Conditioning agent harshness and buildup tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Rinse-off active efficacy must be classified before Effectiveness scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-use scalp heaviness = buildup architecture failure
- Slip and shine ≠ fiber health
- Natural conditioner ≠ safe (heavy occlusive naturals can cause significant follicular buildup)
- Fragrance freshness ≠ hair health benefit
- Silicone-free ≠ automatically superior
- Keratin and collagen in rinse-off = largely decorative without strong substantivity evidence
- Heavy buildup systems cannot achieve elite cuticle preservation scores
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Conditioner Evaluation Algorithm — Structured for conditioning architecture analysis, cuticle preservation realism, and long-term buildup and scalp compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict conditioner structural evaluation engine."
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