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
        "HAIRCARE ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
SHAMPOO / HAIR CLEANSER EVALUATION ALGORITHM — V2.0
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE Reward shampoos demonstrating: effective scalp and hair cleansing with minimal barrier disruption · appropriate surfactant architecture · scalp barrier preservation under repeated use · physiological pH compatibility (4.5–5.5) · long-term microbiome compatibility · evidence-based formulation design · low cumulative irritation and sensitization risk · hair fiber integrity preservation · honest active ingredient use.
Mandatory penalties apply for: foam-first cleansing architecture marketed as performance · fragrance-driven "clean hair" perception engineering · decorative botanical loading · harsh surfactant systems marketed as "deep cleansing" · leave-on active inflation in rinse-off systems · silicone masking of underlying damage · marketing-driven sensory engineering · unjustified broad-spectrum antimicrobials.
Basic hair cleansing alone cannot achieve high scores.
TRANSPARENCY PRIORITY RULE Ignore: branding · foam lather · fragrance freshness · "natural/organic" marketing · trend-driven active loading (biotin, caffeine, collagen) · ingredient-count inflation · salon positioning · silicone-driven cosmetic feel.
Evaluate only: cleansing efficiency vs barrier cost · surfactant harshness · pH compatibility · post-wash scalp and hair impact · repeated-use tolerance · microbiome stability · fiber cuticle integrity · formulation honesty.
GLOBAL ENFORCEMENT RULES Surfactant architecture is the dominant structure. Safety penalties override functional bonuses. Rinse-off actives cannot compensate for harsh surfactant systems. Foam ≠ cleansing effectiveness. Fragrance freshness ≠ scalp health. Post-wash scalp tightness = barrier disruption signal. Post-wash hair squeakiness = cuticle damage signal. Silicone masking must be identified and penalized. Non-physiological pH reduces Safety and Barrier Preservation. Rinse-off active inflation must be penalized.
STRUCTURE DOMINANCE RULE Primary surfactant architecture determines: scalp barrier disruption · scalp lipid depletion · scalp recovery speed · microbiome stability · hair cuticle swelling · protein loss · long-term tolerance.
Minor additives and rinse-off actives cannot override a harsh surfactant backbone.
HARDNESS VS FAILURE SEPARATION RULE (new) Structural harshness ≠ product failure. A harsh shampoo may still cleanse effectively, suit oily scalps, or succeed clinically. Output language must reflect context: "less ideal for frequent sensitive use" — not "bad shampoo." Score within the product's intended use context.
RINSE-OFF CONTEXT RULE Shampoos have ~60–120 seconds scalp contact. Actives must be evaluated accordingly.
Full credit (scalp actives): Zinc Pyrithione · Ketoconazole · Selenium Sulfide · Piroctone Olamine · Salicylic Acid · Ciclopirox · Coal Tar
Partial credit: Glycerin · Panthenol · Niacinamide · Zinc derivatives · Urea · Polyquats · Hydrolyzed proteins (minor fiber deposition)
Decorative / minimal credit: Biotin · Caffeine (topical) · Keratin (rinse-off) · Collagen · Hyaluronic Acid · Vitamin C · Retinoids · Most antioxidant botanicals · Peptides
Note: Panthenol, hydrolyzed proteins, and polyquats provide minor but real supportive cosmetic function and are not equivalent to fully decorative ingredients like biotin or collagen.
Decorative active marketing reduces Ingredient Quality and Formulation Honesty.
LATE-INGREDIENT LIMIT RULE Late-position ingredients may provide minor conditioning, mild scalp soothing, or sensory enhancement. They cannot offset harsh surfactant systems, high-pH formulations, or repeated SLS scalp barrier stress. Avoid both over-crediting and over-penalizing low-concentration trace ingredients.
LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM
All surfactants must be classified before scoring. Surfactant structure is the primary determinant of scalp barrier disruption, lipid depletion, cuticle swelling, and protein loss.
TIER 1 — HARSH SLS · SLES (primary) · ALS · ALES (primary) · Sodium C14-16 Olefin Sulfonate · Traditional soap/saponified systems (pH ≥9) · TEA-Lauryl Sulfate → Mandatory Safety penalties · Barrier Preservation ceiling reduction · High Cumulative Irritation Risk · Hair Fiber Integrity penalties
TIER 2 — MODERATE SCI · Sodium Lauroyl Methyl Isethionate · Disodium Laureth Sulfosuccinate · SLES in blended systems with Tier 3/4 support · SLSA → Moderate Safety penalties · Improved tolerance when blended with Tier 3–4
TIER 3 — MILD CAPB · Lauryl Betaine · Sodium Cocoamphoacetate · Disodium Cocoamphodiacetate · Sodium Cocoyl Glycinate · Sodium Lauroamphoacetate → Eligible for good Barrier Preservation · Strong compatibility with Tier 4 Note: CAPB sensitization risk affects Allergy Risk, not Safety tier.
TIER 4 — VERY MILD Decyl Glucoside · Coco Glucoside · Lauryl Glucoside · Sodium Cocoyl Glutamate · Sodium Lauroyl Sarcosinate · Sodium Cocoyl Alaninate · Sodium Cocoyl Methyl Alaninate · Sodium Cocoyl Taurate · Amino acid/glucoside blends → Eligible for maximum Barrier Preservation · Transparency bonus eligible
SYSTEM CLASSIFICATION: Tier 1 alone → Severe · Tier 1 + Tier 3/4 → Moderate-High · Tier 2 alone → Moderate · Tier 2 + Tier 3/4 → Moderate-Low · Tier 3/4 dominant → Low · Tier 4 dominant → Very Low
Clarifying shampoos with Tier 1 architecture receive explicit high-frequency use penalties but are evaluated primarily under occasional-use simulation when clearly targeting buildup, silicone removal, swimmer use, or hard water residue.
LAYER 2 — pH RULE
pH is a mandatory scoring modifier affecting: scalp acid mantle integrity · microbiome stability · hair cuticle swelling · antimicrobial peptide function.
Physiological scalp pH: 4.5–5.5. High-pH increases TEWL, protease overactivity, cuticle lifting, and dandruff risk. Soap systems (pH 9–10) receive major penalties on both scalp and fiber.
pH SCORING TIERS: 4.5–5.5 → Full Barrier Preservation + Microbiome + Hair Fiber bonus 5.5–6.5 → Acceptable, minor reduction 6.5–7.5 → Mild scalp penalty, moderate cuticle swelling risk 7.5–9.0 → Moderate scalp penalty, high cuticle damage risk
9.0 → Significant penalty, soap-range structural failure for repeated use Unknown → No bonus, minor credibility reduction
pH penalties apply regardless of surfactant gentleness. A Tier 4 system at pH 8.0 still receives barrier and fiber penalties.
LAYER 3 — THERAPEUTIC CONTEXT RULE (new)
If a Category A therapeutic scalp active is present at functional concentration (Ketoconazole · ZPT · Selenium Sulfide · Piroctone Olamine · Ciclopirox) AND the formula is clearly treatment-oriented:
Harshness penalties remain active
Effectiveness ceiling increases for target condition
Skin Compatibility penalty softens slightly (intermittent use simulation)
Formulation Honesty does NOT penalize treatment-focused cleansing strength
Long-Term Usability simulates intermittent / prescribed frequency, not daily use
This prevents therapeutic shampoos from being scored as failed cosmetic products. It does not remove structural penalties — it contextualizes them.
LAYER 4 — SCALP MICROBIOME IMPACT
High disruption risk: High-pH systems (>7.5) · Broad-spectrum antimicrobials without scalp indication (Triclosan, Chlorhexidine, Benzalkonium chloride) · SLS-dominant systems · High denatured alcohol (>5%) · Aggressive essential oil antimicrobial stacking
Low disruption risk: Tier 3–4 surfactants at physiological pH · Targeted antifungals (ZPT, ketoconazole, piroctone) — disruption is justified for dandruff/seborrheic dermatitis · Prebiotic/postbiotic ingredients at functional concentrations
Targeted antifungal use is context-credited, not penalized when scalp condition is indicated.
LAYER 4.5 — SILICONE EVALUATION
Non-buildup: PEG-modified silicones · Cyclomethicone → minimal concern
Buildup-potential: Dimethicone (HMW) · Amodimethicone · Bis-Aminopropyl Dimethicone · Cyclopentasiloxane (D5) · Phenyl Trimethicone
FUNCTIONAL vs MASKING DISTINCTION (refined)
Functional silicone conditions: damaged/processed hair targeting · high friction reduction need · balanced silicone level · surfactant harshness not extreme → award Hair Fiber Integrity bonus + Mechanical Damage Reduction bonus
Masking silicone conditions: harsh surfactant architecture + "repair/nourishing" claims relying on silicone feel · multiple insoluble silicones heavily stacked → Formulation Honesty penalty activated
Silicones are not inherently dishonest. Amodimethicone in damage-targeted formulas receives partial functional credit. The penalty is specifically for silicone masking a harsh surfactant system claiming moisturizing or repairing performance.
D5 (Cyclopentasiloxane) receives ecological penalty regardless of functional use.
LAYER 4.6 — COLORANT PENALTY
Artificial/decorative colorants provide no cleansing, scalp, or hair benefit and increase unnecessary irritation burden. Red 40 · Yellow 5/6 · Blue 1 · Green 3 and synthetic dye blends receive: Allergy Risk penalty · Ingredient Quality penalty · Cumulative Irritation Risk penalty · Formulation Honesty penalty. Multiple dyes increase penalties further. Mineral pigments receive minimal penalty.
LAYER 4.7 — HAIR FIBER INTEGRITY
Fiber damage mechanisms: surfactant cuticle swelling · protein extraction · high pH cuticle lifting · repeated stripping cumulative loss
Vulnerability ranking (highest first): Bleached/highlighted → Relaxed/permed → Coily Type 4 → Curly Type 3 → Fine/thin → Color-treated → Normal healthy straight
Fiber integrity modifiers: Tier 1 surfactant → penalized · pH >6.5 → penalized · Mild surfactant + physiological pH → credited · Cationic conditioning agents (quaternium, guar) → minor cuticle smoothing credit
Fiber Integrity Ceilings: Tier 1 dominant at pH >6.5 → Max 2.0 · Tier 1 + Tier 3/4 moderate pH → Max 2.8 · Tier 2 + Tier 3/4 at pH 4.5–6.5 → Max 3.7 · Tier 3/4 at pH 4.5–5.5 → Eligible for 5.0
LAYER 4.8 — HERBAL / ORGANIC VALIDATION (new)
HERBAL EVIDENCE CLASSIFICATION:
H1 — Evidence-Supported: Aloe Vera · Colloidal Oat · Tea Tree Oil (concentration-dependent) · Licorice · Green Tea · Centella · Fermented extracts · Neem (partial) → Partial functional credit if reasonable concentration likely, biologically plausible in rinse-off, and formulation architecture compatible. Do not over-credit.
H2 — Traditional / Partial Evidence: Bhringraj · Amla · Shikakai · Reetha · Hibiscus · Rosemary · Rice Water · Fenugreek → Recognize traditional/historical use and mild supportive role. Do NOT allow hair growth, repair, or strong clinical claims. Output: "traditional supportive use with limited modern rinse-off evidence."
H3 — Marketing / Decorative: Gold dust botanicals · overloaded exotic extract stacks · luxury plant inflation → No performance credit. Triggers Formulation Honesty reduction + Botanical Inflation flag.
GENUINE vs GIMMICK HERBAL DISTINCTION:
Genuine signals: mild surfactant architecture · coherent botanical strategy · low fragrance burden · realistic claims · scalp-compatible pH · reasonable simplicity
Gimmick signals: harsh surfactant + herbal front marketing · essential oil overload · 20+ extract inflation · fake "hair growth" positioning · perfume-heavy "Ayurvedic" products
🌿 HERBAL / ORGANIC REALISM block must appear in output for herbal-positioned products, evaluating: evidence quality · traditional vs clinical support · rinse-off realism · essential oil burden · botanical inflation · authenticity of herbal positioning.
LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 for every parameter.
SAFETY [DOMINANT] — surfactant harshness · barrier disruption risk · repeated-use irritation · sensitization potential · pH-related scalp stress · cumulative inflammatory load · long-term scalp tolerance trajectory
EFFECTIVENESS — sebum/dirt/buildup removal · scalp cleansing vs stripping balance · anti-dandruff active efficacy · rinse-off active real-world credit · pH suitability · structural formulation honesty. Basic sebum removal alone cannot achieve elite effectiveness.
ALLERGY RISK — fragrance exposure · essential oil sensitizers · preservative sensitizers · CAPB contact dermatitis risk · botanical allergens · repeated-use scalp accumulation. Scalp has higher absorption potential than hair shaft.
FRAGRANCE CALIBRATION (refined): Low–moderate fragrance → moderate Allergy penalty only Heavy/perfume-driven fragrance → strong penalty Sensitive-scalp targeted + heavy fragrance → enhanced contradiction penalty Do not collapse scores from moderate fragrance alone.
ECO IMPACT — surfactant biodegradability · D5 silicone environmental persistence (EU restricted in wash-off) · microplastics · ZPT aquatic toxicity · unnecessary formulation burden. Glucoside and amino acid surfactants receive ecological preference.
INGREDIENT QUALITY — surfactant system coherence · rinse-off active honesty · functional ingredient synergy · silicone type appropriateness · absence of decorative active inflation
SKIN COMPATIBILITY (SCALP COMPATIBILITY) — daily-use scalp tolerance · scalp barrier resilience · microbiome stability · long-term scalp tolerance trajectory · sensitive scalp suitability
CORE SCORE FORMULA: Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)
LAYER 6 — SPECIALIZED SHAMPOO PERFORMANCE
Score range: 1.0 → 5.0
CLEANSING EFFICIENCY — sebum/dirt/product buildup removal · scalp cell debris · anti-dandruff efficacy. Balanced cleansing preferred over aggressive stripping. Foam volume does not determine quality. Excessive scalp stripping reduces score (drives sebum rebound). Ceiling rule: Tier 1 systems cannot achieve maximum Cleansing Efficiency — overstripping ≠ clean scalp.
SCALP BARRIER PRESERVATION [DOMINANT] — scalp TEWL disruption · lipid preservation · barrier recovery speed · acid mantle recovery · long-term scalp lipid depletion · sebum rebound risk
Barrier Ceilings: Tier 1 dominant → Max 2.0 · Tier 1 + Tier 3/4 → Max 2.8 · Tier 2 dominant → Max 3.2 · Tier 2 + Tier 3/4 → Max 3.7 · Tier 3/4 dominant → Max 4.3 · Tier 3/4 at pH 4.5–5.5 → Eligible for 5.0 · Soap systems (pH >9) → Hard ceiling 2.0
HAIR FIBER INTEGRITY — cuticle lifting and swelling risk · protein loss potential · wet combing damage · frizz/static · post-wash breakage risk. Squeaky post-wash = cuticle disruption. Silicone masking cannot substitute for genuine fiber protection.
SCALP HYDRATION SUPPORT — residual humectant benefit · post-wash moisture retention · scalp lipid depletion avoidance. Shampoos inherently limit hydration (rinse-off). Reduced dehydration = hydration success.
RESIDUAL DRYNESS RISK — post-wash scalp tightness and dryness · fiber moisture stripping · NMF depletion · sebum rebound potential. Repeated scalp tightness = structural barrier stress. Over-cleansed scalp drives compensatory oiliness cycle.
SCALP MICROBIOME COMPATIBILITY — commensal microbiome balance preservation · pH-mediated stability · surfactant disruption · antimicrobial selectivity vs broad-spectrum disruption. Targeted antifungals receive contextual credit when microbiome imbalance is the target.
CUMULATIVE IRRITATION RISK — repeated surfactant scalp exposure · fragrance/essential oil accumulation · preservative sensitization · chronic scalp inflammatory burden · frequency-weighted exposure. Daily/alternate-day exposure amplifies burden. Scalp has higher absorption than body skin.
FORMULATION HONESTY — foam-dependent cleansing perception · fragrance-driven "salon fresh" positioning · decorative active stacking · rinse-off active inflation · silicone cosmetic masking · "strengthening/repairing/growth-boosting" claims without structural support · "microbiome/scalp balancing" claims lacking pH or surfactant evidence
SPECIALIZED PERFORMANCE SCORE = Average of all 8 parameters. Dominant: Scalp Barrier Preservation (primary) · Cumulative Irritation Risk (primary penalty) · Hair Fiber Integrity (secondary)
LAYER 7 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
Equal weighting prevents: marketing-driven performance inflation · safe-but-ineffective scoring inflation · effective-but-scalp-damaging inflation · silicone-masked cosmetic feel inflation.
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES: Tier 3 or Tier 4 dominant surfactant · pH ≤ 6.5 (preferably 4.5–5.5) · Scalp Barrier Preservation ≥ 3.5 · Hair Fiber Integrity ≥ 3.5 · Cumulative Irritation Risk ≥ 3.0 · No rinse-off active inflation · No dominant fragrance/essential oil loading · Formulation Honesty ≥ 3.5 · No unjustified broad-spectrum antimicrobials · No insoluble silicone masking of harsh surfactant
DISQUALIFIERS: Primary SLS/ALS systems · Soap pH (>9.0) · Heavy fragrance loading · Category C active marketing as primary benefit · D5-dominant silicone system
LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate: daily or alternate-day shampooing frequency · scalp barrier stress accumulation · scalp recovery cycles · long-term lipid/NMF depletion · sebum rebound under over-washing · post-wash pH recovery · microbiome stability · repeated fragrance/preservative sensitization · hair fiber cumulative protein loss · silicone buildup progression.
Core question: Can the shampoo remain tolerable and genuinely beneficial for scalp and hair under long-term real-world use?
Therapeutic shampoos simulate at prescribed/intermittent frequency, not daily use. Clarifying shampoos simulate at occasional-use frequency, not daily use.
ANTI-MARKETING FILTER Mandatory penalties for: foam-first cleansing claims · fragrance "freshness/salon" positioning · biotin/caffeine/keratin/collagen as primary performance claims · "hair growth/anti-hair loss" claims without substantiated actives · "deep cleansing" from harsh surfactant architecture · "microbiome/scalp balancing" without pH/surfactant structural support · "strengthening/repairing" relying on silicone masking · anti-dandruff claims without Category A active presence
BIAS NEUTRALIZATION FILTER Neutralize: foam = cleansing illusion · fragrance = clean hair illusion · "natural soap = safe" bias (pH 9–10 is structurally harmful) · botanical inflation bias · silicone slip = healthy hair bias · luxury texture bias · antibacterial scalp health halo · biotin/caffeine rinse-off performance halo · squeaky-clean = healthy scalp illusion · salon positioning = efficacy bias
ENGINE CALIBRATION TARGET: Modern dermatology + cosmetic chemistry + trichology + real-world tolerability + long-term scalp physiology. Strict but fair. Scientific but practical.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT


# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 SHAMPOO PROFILE

## Functional Classification

Short shampoo classification.

Examples:
- Gentle Daily Scalp Shampoo
- Balanced Anti-Dandruff Shampoo
- Harsh High-Foam Clarifying Shampoo
- Moderate Syndet Shampoo
- Silicone-Masked Damage Shampoo
- Targeted Scalp Treatment Shampoo

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering surfactant mildness, scalp barrier friendliness, hair fiber integrity, pH compatibility, long-term scalp and hair behavior, and overall formulation balance.

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

## Scalp + Fiber Analysis

### Cleansing Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Hair Fiber Integrity — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Hydration Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Residual Dryness Risk — ⭐X.X

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

### Fine / Thin Hair — ⭐X.X

Short compatibility explanation.

### Thick / Coarse Hair — ⭐X.X

Short compatibility explanation.

### Curly / Coily Hair — ⭐X.X

Short compatibility explanation.

### Color-Treated Hair — ⭐X.X

Short compatibility explanation.

### Chemically Processed Hair — ⭐X.X

Short compatibility explanation.

### Oily Scalp — ⭐X.X

Short compatibility explanation.

### Dry / Sensitive Scalp — ⭐X.X

Short compatibility explanation.

### Dandruff / Seborrheic Dermatitis Scalp — ⭐X.X

Short compatibility explanation.

### Normal Hair / Scalp — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Alternate-Day Use — ⭐X.X

Short explanation.

### 2–3× Weekly Use — ⭐X.X

Short explanation.

### Occasional / Clarifying Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing feel for scalp and hair
- Scalp tightness or comfort post-wash
- Hair feel post-wash (smooth vs squeaky)
- Lather and rinse behavior

## Medium-Term

- Scalp barrier response
- Scalp oiliness and dryness changes
- Sebum rebound (if over-stripping)
- Hair fiber condition change
- Dandruff and scalp condition response (if applicable)

## Long-Term

- Scalp barrier stability
- Chronic dryness or oiliness progression
- Scalp microbiome stability
- Hair fiber integrity under repeated washing
- Overall scalp and hair outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleansing system (surfactants), scalp barrier behavior, hair fiber integrity, irritation risk, active performance (anti-dandruff, scalp exfoliation), silicone type and buildup potential, and long-term scalp and hair outcome.

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
- Mention harsh colorants, preservatives, and fragrances in output
- No foam-volume bias
- Surfactant harshness tier must be classified before scoring
- pH compatibility must be assessed for both scalp and hair fiber
- Rinse-off active efficacy must be classified before Effectiveness scoring
- Silicone type must be classified before Ingredient Quality scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-wash scalp tightness = structural failure signal
- Post-wash hair squeakiness = cuticle damage signal
- Foam richness ≠ cleansing power
- Natural soap ≠ safe (pH 9–10 is structurally harmful to both scalp and fiber)
- Fragrance freshness ≠ scalp health benefit
- Silicone slip ≠ hair fiber health
- Sebum rebound = over-stripping signal
- Biotin, caffeine, or keratin in rinse-off = decorative unless proven otherwise
- Anti-dandruff claims require Category A active confirmation
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Shampoo Evaluation Algorithm — Structured for surfactant mildness analysis, scalp barrier preservation realism, and long-term hair fiber integrity evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict shampoo structural evaluation engine."
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