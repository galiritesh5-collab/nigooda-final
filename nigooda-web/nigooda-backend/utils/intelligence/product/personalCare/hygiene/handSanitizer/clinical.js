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
        "HANDSANITIZER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 2 — HAND SANITIZER EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hand sanitizers that demonstrate:
• Effective, evidence-based pathogen elimination at validated concentrations
• Skin barrier compatibility under repeated daily use
• Skin microbiome stability — commensal preservation under antimicrobial action
• Moisturisation and barrier support to offset alcohol-induced dryness
• Low cumulative irritation and sensitization risk
• Structural formulation honesty over fragrance, foam, or "natural" marketing
Mandatory penalties apply for:
• Sub-efficacious alcohol concentrations marketed as protective
• Broad-spectrum antimicrobial overload without barrier or microbiome consideration
• Fragrance-driven sensory positioning replacing structural antimicrobial honesty
• Decorative botanical loading without skin barrier or antimicrobial evidence
• "Natural" sanitizer marketing (essential oil-only, herbal) without efficacy evidence
• High alcohol without barrier support ingredients
• Antimicrobial resistance-generating agents in cosmetic daily-use context
• Regulatory non-compliance (alcohol concentration below WHO threshold)
TRANSPARENCY PRIORITY RULE
Ignore: branding, fragrance freshness perception, foam/gel texture sensory appeal,
"natural/organic/botanical" sanitizer marketing, moisturising texture as proxy for barrier
support, colour and visual appeal.
Evaluate only: alcohol concentration and validated antimicrobial efficacy, antimicrobial agent
class and spectrum, skin barrier impact under repeated use, barrier support active presence
and quality, skin microbiome impact, repeated-use skin tolerance, structural formulation honesty.
---
LAYER 1 — ANTIMICROBIAL AGENT TIER (DOMINANT ACTIVE PARAMETER)
MANDATORY RULE: All antimicrobial agents must be classified by efficacy and skin/microbiome
safety before scoring.
TIER 1 — VALIDATED HIGH-EFFICACY / ACCEPTED
Examples: Ethanol 60–80%, Isopropanol 60–75%, n-Propanol 45–60% (in blended EU formulations),
Ethanol + Isopropanol blended systems.
Characteristics: Validated broad-spectrum kill (bacteria, enveloped viruses, fungi), rapid
evaporation with minimal residual skin burden, no antimicrobial resistance generation (physical
mechanism), global regulatory acceptance.
Primary skin impact: lipid depletion and TEWL increase under repeated use.
Scoring impact: Full antimicrobial efficacy credit. Barrier disruption risk assessed separately.
TIER 2 — MODERATE EFFICACY / CONDITIONAL ACCEPTANCE
Examples: Benzalkonium Chloride (BAC), Benzethonium Chloride, Chlorhexidine Gluconate (0.5–4%),
Povidone-Iodine (surgical context), Cetylpyridinium Chloride (CPC).
Characteristics: Moderate broad-spectrum kill, variable virus efficacy (BAC weaker vs
non-enveloped viruses), non-volatile residual skin burden, antimicrobial resistance generation
risk (BAC documented), regulatory controversy (FDA 2019 — BAC/benzethonium insufficient safety/
efficacy data for consumer hand sanitizer).
Scoring impact: Partial antimicrobial efficacy credit, antimicrobial resistance penalty,
microbiome disruption penalty (non-volatile residue), regulatory compliance flag.
TIER 3 — LOW EFFICACY / HIGH CONCERN
Examples: Triclosan, Triclocarban, high-concentration BAC blends, quaternary ammonium dominant systems.
Characteristics: Antimicrobial resistance generation (well-documented), endocrine disruption
concern (Triclosan — regulatory ban in many regions), microbiome disruption without validated
superior sanitizer efficacy, banned in US consumer hand sanitizer (FDA 2016 — Triclosan).
Scoring impact: Major efficacy credibility penalty, mandatory Safety penalty, antimicrobial
resistance flag, regulatory compliance flag (mandatory mention), major Formulation Honesty penalty.
TIER 4 — UNVALIDATED / INSUFFICIENT EVIDENCE
Examples: Essential oils as sole antimicrobial (tea tree, lavender, thyme), Colloidal Silver,
herbal extract blends (neem, tulsi, turmeric), vinegar-based systems, Hydrogen Peroxide at
low cosmetic concentration (<3%), "natural" botanical antimicrobial systems without kill-rate data.
Characteristics: No validated equivalent kill-rate to 60%+ alcohol. May have antimicrobial
properties in controlled studies but not at product concentrations. Major gap between marketing
and validated protection.
Scoring impact: Efficacy failure classification, mandatory Safety concern (inadequate protection),
major Formulation Honesty penalty, consumer protection flag.
ANTIMICROBIAL SYSTEM RULE:
• Tier 1 alone → Full efficacy, barrier cost assessed
• Tier 1 + Tier 2 (blended) → Efficacy maintained, resistance/residue concern added
• Tier 2 alone → Partial efficacy, resistance and microbiome concern
• Tier 3 alone → Regulatory/safety failure regardless of marketing
• Tier 4 alone → Efficacy failure — inadequate protection
• Tier 4 marketed as equivalent to Tier 1 → Consumer safety concern + maximum Formulation Honesty penalty
---
LAYER 2 — ALCOHOL CONCENTRATION COMPLIANCE RULE
MANDATORY RULE: Alcohol concentration must be verified against WHO/FDA/EMA thresholds before
any efficacy score is assigned.
WHO FORMULATION REFERENCE:
• Formulation I: 80% ethanol + 1.45% glycerol + 0.125% H2O2
• Formulation II: 75% isopropanol + 1.45% glycerol + 0.125% H2O2
ALCOHOL CONCENTRATION SCORING TIERS:
≥70% Ethanol or ≥70% Isopropanol → Optimal antimicrobial efficacy, full antimicrobial credit, WHO-aligned
60–70% Ethanol/Isopropanol → Acceptable efficacy range, standard credit, minor efficacy note
50–60% → Below optimal, reduced efficacy, partial credit, safety flag for healthcare setting
<50% alcohol → Significant efficacy failure, major Safety penalty, efficacy failure classification
>90% Ethanol (without water balance) → Reduced efficacy note (insufficient protein denaturation)
Unknown/Undisclosed concentration → Major Formulation Honesty penalty, cannot receive efficacy credit
---
LAYER 3 — SKIN pH COMPATIBILITY NOTE (EDUCATIONAL ONLY — NON-SCORING)
Ingredient lists alone cannot reliably determine final formulation pH. The following is
educational context only and carries no scoring weight.
Physiological skin pH is approximately 4.5–5.5. Alcohol itself is mildly acidic. Well-formulated
sanitizers are generally compatible with skin physiological pH. Highly alkaline formulation
architecture may be associated with increased acid mantle disruption probability and elevated
microbiome disruption risk, though final product pH cannot be confirmed from INCI alone.
---
LAYER 4 — BARRIER SUPPORT ACTIVE ASSESSMENT
Under repeated hand sanitizer use, TEWL increases and skin lipids deplete. Barrier support
actives are the primary mitigating factor.
EVAPORATIVE CONTACT CONTEXT: Hand sanitizers operate via rapid evaporation — active contact
time is approximately 15–30 seconds before alcohol evaporates.
TIER A — STRONG BARRIER SUPPORT (FULL CREDIT)
• Glycerin/Glycerol at ≥1%: functional humectant, standard WHO formulation component
• Aloe Vera Gel at meaningful concentration: humectant + soothing
• Panthenol (Provitamin B5): barrier repair, TEWL reduction
• Allantoin: skin healing, barrier support
• Tocopherol (Vitamin E): antioxidant barrier support (partial in evaporative system)
• Sodium PCA: humectant, NMF-supportive
Characteristics: Substantive enough to remain partially effective post-evaporation.
TIER B — MODERATE BARRIER SUPPORT (PARTIAL CREDIT)
• Hyaluronic Acid: humectant, limited substantivity in evaporative system
• Niacinamide: barrier support, limited evaporative contact
• Centella Asiatica: soothing, partial barrier support
• Ceramide (in humectant base): limited evaporative delivery
• Bisabolol: anti-inflammatory soothing, limited evaporative contact
TIER C — MINIMAL BARRIER SUPPORT (DECORATIVE)
• Botanical extracts at trace concentrations
• Collagen (no skin delivery in evaporative system)
• Peptides (no meaningful substantivity in evaporative system)
• Vitamin C (unstable in alcohol systems)
• Most antioxidant botanical blends at decorative levels
Decorative barrier marketing triggers Ingredient Quality and Formulation Honesty penalties.
BARRIER SUPPORT RULE:
• Tier A dominant at meaningful concentration → Strong barrier mitigation
• Tier A + Tier B → Good barrier support
• Tier B dominant → Moderate barrier support
• Tier C dominant → Decorative — no meaningful barrier protection
• Absent barrier support → Maximum repeated-use barrier disruption signal
High-frequency use (healthcare workers: 20–30×/day) requires Tier A barrier support at
meaningful concentrations for acceptable skin tolerance.
---
LAYER 5 — SKIN MICROBIOME IMPACT RULE
Higher microbiome disruption risk associated with:
• Triclosan, Benzalkonium Chloride, Benzethonium Chloride, quaternary ammonium compound
 dominant systems — all non-volatile with residual microbiome burden
• Very high alcohol without rapid evaporation (extended wet contact)
• High-fragrance systems with antimicrobial essential oil overload
Low microbiome disruption risk:
• Ethanol at standard concentration (rapid evaporation = limited residual microbiome disruption)
• Isopropanol (evaporative mechanism)
• Barrier-supportive humectants (glycerin, aloe): microbiome-neutral
Rules: Tier 1 alcohol systems (evaporative) have significantly lower microbiome disruption risk
than non-volatile Tier 2–3 antimicrobials because evaporation limits residual burden.
Non-volatile antimicrobials with residual skin presence = ongoing microbiome disruption.
---
LAYER 5.5 — FRAGRANCE AND COLORANT PENALTY RULE
Fragrance in hand sanitizer: provides no antimicrobial benefit, increases sensitization risk
under repeated daily use, fragrance chemicals are among the most common contact allergens,
repeated exposure at 5–30× daily amplifies sensitization risk dramatically, hand-to-face
transfer of fragrance allergens is an additional exposure pathway.
High concern fragrance components: high-dose synthetic fragrance blends, essential oil fragrance
at sensitizing concentrations (linalool, limonene, geraniol, citronellol), cinnamon/clove/eucalyptus
fragrance in repeated-use sanitizer, Parfum/Fragrance as blanket term.
Artificial colorants: no antimicrobial or barrier benefit, unnecessary irritation burden.
Scoring impact: Allergy/Sensitization Risk penalty, Ingredient Quality penalty, Cumulative
Irritation Risk penalty, Formulation Honesty penalty.
Fragrance-free formulations receive Allergy/Sensitization Risk credibility bonus and Formulation
Honesty credibility bonus.
---
LAYER 5.6 — HERBAL AUTHENTICITY ENGINE
Applies when herbal, botanical, organic, natural, or plant-based marketing is present.
H1 — Evidence-Supported Botanicals: Aloe Vera, Centella Asiatica, Allantoin (synthetic or
natural), Panthenol — partial barrier/soothing credit when concentration realism supports.
H2 — Traditional/Partial-Evidence Botanicals: Lavender, Chamomile, Rose, Calendula at
meaningful concentrations — minor contextual credit for soothing; overmarketing triggers
honesty penalties.
H3 — Decorative Herbal Inflation: Exotic extract stacks, "botanical complex" marketing at
trace levels — no meaningful efficacy credit, triggers inflation penalties.
Concentration certainty remains inferential unless disclosed percentages or strong positional
evidence exist.
---
LAYER 6 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0
SAFETY [DOMINANT] (weight 0.30)
Evaluates: alcohol concentration compliance (below threshold = safety failure), antimicrobial
agent class safety (Triclosan/BAC resistance and regulatory concern), skin barrier disruption
risk under repeated use, fragrance sensitization burden, cumulative skin inflammatory load,
regulatory compliance (Triclosan ban, BAC regulatory status), long-term skin tolerance
trajectory for high-frequency users.
Core rules: Sub-threshold alcohol = mandatory Safety penalty. Triclosan/Triclocarban = mandatory
regulatory Safety flag. BAC = resistance + regulatory concern flag. Fragrance overload under
repeated daily use = significant Safety concern. Safety overrides fragrance freshness, texture
perception, "natural/botanical" positioning.
EFFECTIVENESS (weight 0.25)
Core question: Does the sanitizer genuinely eliminate target pathogens at its stated concentration
within its format and contact time?
Evaluates: alcohol concentration vs validated kill threshold, antimicrobial agent tier efficacy,
spectrum coverage, contact time adequacy, essential oil/botanical active concentration vs
validated kill data, repeated-use functional stability.
Rules: Sub-threshold alcohol = Effectiveness failure. Essential oil-only = Effectiveness failure
unless validated equivalent data provided. "Kills 99.9% of germs" without Tier 1 alcohol =
Formulation Honesty penalty.
ALLERGY / SENSITIZATION RISK (weight 0.15)
Evaluates: fragrance and essential oil sensitization burden, repeated daily exposure amplification
(5–30× daily), preservative sensitization, artificial colorant irritation, contact dermatitis
risk from non-alcohol antimicrobial residue (BAC), alcohol contact dermatitis in atopic contexts,
hand-to-face fragrance transfer.
Rules: Fragrance-free formulations receive significant Allergy Risk improvement. BAC residue
sensitization risk must be flagged.
ECO IMPACT (weight 0.08)
Evaluates: ethanol sourcing (synthetic petroleum-derived vs fermentation-based), isopropanol
environmental persistence, Triclosan aquatic toxicity and environmental persistence, BAC aquatic
toxicity, plastic packaging, fragrance compound environmental persistence.
Rules: Fermentation-derived ethanol preferred. Triclosan environmental persistence = major eco
penalty. BAC aquatic toxicity = moderate eco penalty.
INGREDIENT QUALITY (weight 0.10)
Evaluates: alcohol concentration honesty and compliance, antimicrobial agent tier coherence,
barrier support active quality at meaningful concentrations, fragrance burden vs barrier support
trade-off, absence of decorative botanical inflation, regulatory compliance integrity.
SKIN COMPATIBILITY (weight 0.12)
Evaluates: daily repeated-use skin tolerance, skin barrier resilience under alcohol exposure,
post-use dryness or tightness signals, atopic/sensitive skin compatibility, long-term TEWL
trajectory, cumulative sensitization risk.
Core rules: Moisturising texture does not equal skin barrier compatibility. Long-term
repeated-use behavior is prioritized over immediate feel.
CORE SCORE FORMULA:
Core Score = (Safety × 0.30) + (Effectiveness × 0.25) + (Allergy/Sensitization Risk × 0.15) +
            (Eco Impact × 0.08) + (Ingredient Quality × 0.10) + (Skin Compatibility × 0.12)
---
LAYER 7 — SPECIALIZED SANITIZER PERFORMANCE
Score range: 1.0 → 5.0
PATHOGEN KILL EFFICACY
Evaluates: alcohol concentration kill spectrum, bacteria kill rate, enveloped virus kill rate,
non-enveloped virus kill rate, fungi kill rate, contact time adequacy.
Rules: Sub-threshold alcohol = mandatory low Pathogen Kill Efficacy. BAC weaker vs non-enveloped
viruses — must be noted. Essential oil primary mechanism = near-zero Pathogen Kill Efficacy score.
Ceiling rule: Tier 4 (unvalidated) products cannot exceed 1.5.
SKIN BARRIER PRESERVATION [DOMINANT]
Evaluates: alcohol-induced TEWL increase per application, lipid depletion risk under repeated
use, barrier support active quality and concentration, skin recovery speed between applications,
long-term barrier resilience trajectory.
SKIN BARRIER PRESERVATION CEILINGS:
• Alcohol-only (no barrier support) → Max 2.5
• Alcohol + Tier C barrier support (decorative) → Max 2.8
• Alcohol + Tier B barrier support → Max 3.5
• Alcohol + Tier A barrier support at meaningful concentration → Max 4.3
• Alcohol + Tier A dominant + probable physiological pH + fragrance-free → Eligible for 5.0
• Sub-threshold alcohol (safety failure) → Cap 3.0 regardless of barrier support
• Tier 3 antimicrobial (Triclosan/BAC dominant) → Max 3.0
Rules: Post-use tightness = barrier disruption signal. High scores require Tier 1 alcohol at
valid concentration, Tier A barrier support at meaningful concentration, low fragrance burden.
MOISTURISATION AND DRYNESS PREVENTION
Evaluates: Glycerin concentration and humectant efficacy, Aloe Vera concentration and soothing
humectant contribution, Panthenol TEWL reduction efficacy, residual skin hydration post-evaporation.
Rules: WHO glycerin level (1.45%) = baseline; higher concentrations receive more credit.
Decorative humectant stacking at trace levels = moisturisation penalty.
MICROBIOME COMPATIBILITY
Evaluates: skin commensal microbiome preservation, non-volatile antimicrobial residue burden,
alcohol evaporation speed vs residual microbiome impact, long-term microbiome stability.
Rules: Tier 1 alcohol systems (evaporative) = low microbiome disruption vs Tier 2–3.
Tier 2 (BAC, Chlorhexidine) = ongoing residual microbiome disruption penalty.
Tier 3 (Triclosan) = major microbiome disruption + resistance generation.
SENSITIZATION RISK UNDER REPEATED USE
Evaluates: fragrance sensitization accumulation (5–30× daily), essential oil allergen exposure,
preservative sensitization, artificial colorant irritation accumulation, BAC contact sensitization
risk, atopic skin sensitization trajectory.
Rules: Healthcare context (20–30× daily) = severe sensitization amplification. Fragrance-free =
major Sensitization Risk improvement.
CUMULATIVE SKIN IRRITATION RISK
Evaluates: repeated alcohol TEWL accumulation without barrier support, fragrance compound
irritation accumulation, non-volatile antimicrobial residue irritation, preservative irritation,
frequency-weighted exposure (general public vs healthcare).
Rules: Healthcare-frequency simulation (20–30×/day) must be assessed separately. Long-term
cumulative skin irritation trajectory overrides single-use feel.
FORMULATION HONESTY
Evaluates: sub-threshold alcohol with sanitizer claims, essential oil-only "natural sanitizer"
marketed as equivalent to alcohol, BAC marketed as equivalent to alcohol for full spectrum,
"kills 99.9% of germs" without Tier 1 alcohol, decorative botanical loading, undisclosed
alcohol concentration, regulatory non-compliant claims.
Rules: Sanitizer efficacy claim must match validated antimicrobial mechanism. "Natural" ≠
effective sanitization.
SPECIALIZED CALCULATION:
Specialized Performance Score = Average of all 7 specialized scores.
Dominant parameters: Skin Barrier Preservation (primary interpretive), Pathogen Kill Efficacy
(mandatory secondary — cannot be below 2.5 for >4.0 final rating).
---
LAYER 8 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
MANDATORY OVERRIDE RULE: If Pathogen Kill Efficacy score < 2.0 (efficacy failure),
Final Rating is capped at 2.5 regardless of all other scores.
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES:
• Tier 1 alcohol at ≥60% (preferably ≥70%)
• Tier A barrier support at meaningful concentration
• Fragrance-free or minimal fragrance
• Pathogen Kill Efficacy ≥ 3.5
• Skin Barrier Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No Triclosan/Triclocarban
• No BAC as primary antimicrobial
• Formulation Honesty ≥ 3.5
DISQUALIFIERS:
• Alcohol concentration <50%
• Essential oil-only antimicrobial system
• Triclosan/Triclocarban (regulatory violation in most markets)
• Undisclosed alcohol concentration
• Heavy fragrance overload in healthcare-context sanitizer
• BAC as sole antimicrobial with "full spectrum" claims
• Decorative Tier C active marketing as barrier or antimicrobial
---
LAYER 8.5 — REAL-WORLD USAGE SIMULATION
Simulate two distinct usage contexts:
CONTEXT A — GENERAL PUBLIC (5–10× daily): Moderate TEWL accumulation, moderate sensitization
risk, moderate barrier disruption, standard fragrance concern.
CONTEXT B — HEALTHCARE WORKER (20–30× daily): Severe TEWL accumulation without Tier A barrier
support, high sensitization risk (fragrance concern becomes severe), rapid barrier disruption
without meaningful humectants, BAC residue burden amplified dramatically, occupational skin
disease risk must be reflected.
Core question: Can the sanitizer deliver validated pathogen kill while remaining tolerable and
skin-compatible for both general public and high-frequency healthcare use?
ANTI-MARKETING FILTER — mandatory penalties for:
• "Natural/botanical/herbal sanitizer" as equivalent protection to alcohol
• Essential oil antimicrobial claim without validated kill-rate data
• Sub-threshold alcohol + "99.9% protection" claim
• "Alcohol-free" positioned as equivalent or superior sanitization without validated alternative
• Moisturising texture as proxy for barrier science
• "Microbiome-friendly" sanitizer claims without evaporative mechanism support
BIAS NEUTRALISATION FILTER — neutralise:
• Alcohol burn = better kill bias
• Fragrance freshness = clean/sanitized bias
• "Natural" = safer and equally effective bias
• Gel thickness = better skin care bias
• Alcohol-free = automatically skin-friendlier bias (only true if validated alternative exists)
• Higher alcohol (>85%) = always better bias (above 90% = reduced efficacy)
STRICT SCORING RULES: No marketing influence on scoring. Alcohol concentration tier and
compliance MUST be verified before any scoring. Antimicrobial agent tier MUST be classified
before scoring. Barrier support tier MUST be classified before scoring. Repeated-use behavior
at general AND healthcare frequency > single-use feel. Long-term skin outcome > immediate
texture sensation. Sub-threshold alcohol = efficacy failure regardless of other ingredients.
Essential oil primary antimicrobial = efficacy failure. Fragrance presence in healthcare
sanitizer = significant structural concern. Triclosan/Triclocarban = regulatory violation in
most markets — mandatory flag. BAC as primary antimicrobial = resistance concern + regulatory
flag (FDA). Higher alcohol (>90%) ≠ always more effective. IF PATHOGEN KILL EFFICACY < 2.0:
FINAL RATING CAPPED AT 2.5 — NON-NEGOTIABLE.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT


# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- WHO-Aligned Alcohol Gel with Barrier Support
- Fragrance-Free High-Efficacy Sanitizer (Healthcare Grade)
- Standard Alcohol Gel (Minimal Barrier Support)
- Sub-Threshold Alcohol — Efficacy Concern
- Natural Essential Oil Sanitizer — Efficacy Failure
- BAC-Based Alcohol-Free — Resistance and Regulatory Concern
- Fragrance-Heavy Decorative Sanitizer

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering alcohol concentration and WHO/regulatory compliance, antimicrobial agent tier, skin barrier support quality, pH compatibility, fragrance and sensitization burden, long-term skin behavior under repeated use, and overall formulation balance.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy / Sensitization Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Efficacy + Skin Barrier Analysis

### Pathogen Kill Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Moisturisation and Dryness Prevention — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Microbiome Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Sensitization Risk Under Repeated Use — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cumulative Skin Irritation Risk — ⭐X.X

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

# 👤 SKIN TYPE / USER COMPATIBILITY

## Population Compatibility

### Dry / Dehydrated Skin — ⭐X.X

Short compatibility explanation.

### Sensitive / Reactive Skin — ⭐X.X

Short compatibility explanation.

### Atopic / Eczema-Prone Skin — ⭐X.X

Short compatibility explanation.

### Oily / Normal Skin — ⭐X.X

Short compatibility explanation.

### Healthcare Worker (High-Frequency Use) — ⭐X.X

Short compatibility explanation.

### General Public (Standard Use) — ⭐X.X

Short compatibility explanation.

### Children (6+) — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Frequency Usability

### Low Frequency (1–5×/Day) — ⭐X.X

Short explanation.

### Standard Frequency (5–10×/Day) — ⭐X.X

Short explanation.

### High Frequency / Healthcare (20–30×/Day) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Sanitization confidence (concentration compliance)
- Skin feel post-application
- Dryness or tightness signal

## Medium-Term

- Skin barrier response under daily use
- Dryness and irritation accumulation
- Sensitization signals (redness, itching)

## Long-Term

- Skin barrier stability
- Contact dermatitis risk trajectory
- Microbiome stability
- Overall skin health outcome under chronic use

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting antimicrobial system (alcohol type, concentration, secondary agents), barrier support and humectant quality, fragrance and sensitization burden, pH and acid mantle compatibility, active efficacy under evaporative contact, and long-term skin outcome.

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
- Mention alcohol concentration compliance, Triclosan and BAC regulatory concerns, fragrance sensitization burden, and barrier support adequacy in output where relevant
- No fragrance-freshness bias
- No natural = safe and effective bias
- Structural antimicrobial efficacy overrides cosmetic feel and fragrance experience
- Alcohol concentration tier and compliance must be verified before any scoring
- Antimicrobial agent tier must be classified before scoring
- Barrier support tier must be classified before scoring
- pH compatibility must be assessed
- Repeated-use behavior at general and healthcare frequency > single-use feel
- Long-term skin outcome > immediate texture sensation
- Post-use tightness = structural barrier failure signal
- Sub-threshold alcohol = efficacy failure regardless of other ingredients
- Essential oil primary antimicrobial = efficacy failure
- Fragrance presence in healthcare sanitizer = significant structural concern
- Triclosan and Triclocarban = regulatory violation in most markets — mandatory flag
- BAC as primary antimicrobial = resistance concern and regulatory flag
- Alcohol-free ≠ automatically skin-friendlier without validated alternative
- Higher alcohol (>90%) ≠ always more effective
- IF PATHOGEN KILL EFFICACY < 2.0: FINAL RATING CAPPED AT 2.5 — NON-NEGOTIABLE
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hand Sanitizer Evaluation Algorithm — Structured for alcohol compliance analysis, pathogen kill efficacy realism, and long-term repeated-use skin barrier evaluation. All scoring is structural and evidence-informed.
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
              "You are a strict hand sanitizer structural evaluation engine."
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