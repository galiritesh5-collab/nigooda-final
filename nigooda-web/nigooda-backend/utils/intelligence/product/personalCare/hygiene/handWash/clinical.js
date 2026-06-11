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
        "HANDWASH ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 1 — HAND WASH / HAND CLEANSER EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hand washes that demonstrate:
• Effective hand cleansing with minimal skin barrier disruption
• Appropriate surfactant architecture for hand skin
• Barrier preservation under high-frequency repeated use
• Long-term microbiome compatibility
• Evidence-based formulation design
• Low cumulative irritation and dryness risk
• Honest antimicrobial functionality (where claimed)
Mandatory penalties apply for:
• Foam-first cleansing architecture substituting for real cleansing performance
• Fragrance-driven "clean" perception engineering
• Decorative botanical loading without structural function
• Harsh surfactant systems marketed as "gentle" or "moisturising"
• Rinse-off active inflation (vitamins, peptides, collagen in wash-off format)
• Antibacterial marketing without evidence-based active delivery
• Marketing-driven sensory engineering over formulation balance
Basic cleansing alone cannot achieve high scores.
HAND WASH CONTEXT RULE — MANDATORY MODIFIER
Hand wash differs fundamentally from facial cleansers in:
• Use frequency: 8–20+ washes per day in occupational, medical, and household contexts
• Skin anatomy: hand dorsum has thinner stratum corneum, lower sebum, lower NMF density than face
• Environmental exposure: soap accumulation, low-humidity drying, occupational chemical co-exposure
• User population: occupational dermatitis risk is high in healthcare, food service, cleaning industries
• Antimicrobial relevance: unlike facial cleansers, some antimicrobial function is genuinely justified
• Rinse thoroughness: hand rinsing is often more complete than face rinsing
• Cumulative dryness burden: primary real-world risk is occupational contact dermatitis and chronic dryness
Scoring MUST weight high-frequency repeated-use tolerance above single-use sensory performance.
Cumulative Irritation Risk and Barrier Preservation are the dominant performance parameters.
TRANSPARENCY PRIORITY RULE
Ignore: branding, foam richness, fragrance freshness, "natural/organic/botanical" marketing,
antibacterial halo without active evidence, ingredient-count inflation, "moisturising hand wash"
claims absent structural barrier support.
Evaluate only: cleansing efficiency vs barrier cost, surfactant harshness profile, post-wash skin
impact under repeated use, repeated-use tolerance and dryness accumulation, microbiome stability,
antimicrobial efficacy (evidence-based only), structural formulation honesty.
---
LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM
MANDATORY RULE: All surfactants must be classified by harshness tier before scoring.
Surfactant structure is the primary determinant of barrier disruption, lipid depletion,
NMF damage, and long-term occupational dryness and dermatitis risk.
High-frequency hand washing amplifies all harshness effects significantly.
TIER 1 — HARSH
Examples: SLS (Sodium Lauryl Sulfate), SLES as primary surfactant, ALS (Ammonium Lauryl
Sulfate), LAS (Linear Alkylbenzene Sulfonates), Sodium C14-16 Olefin Sulfonate, traditional
soap systems, potassium soap systems.
Characteristics: High TEWL increase per wash, significant barrier disruption, protein and NMF
damage, ceramide depletion, high occupational dermatitis contribution. Cumulative damage
magnified by high-frequency hand use.
Scoring impact: Mandatory safety penalties amplified for hand wash context. Barrier Preservation
ceiling reduction. High Cumulative Irritation Risk. Occupational use disqualification from high scores.
TIER 2 — MODERATE
Examples: SCI (Sodium Cocoyl Isethionate), Sodium Lauroyl Methyl Isethionate, Disodium Laureth
Sulfosuccinate, SLES in blended systems with Tier 3–4.
Characteristics: Moderate barrier disruption per wash, lower irritation than Tier 1,
blend-dependent tolerance, manageable under moderate use frequency.
Scoring impact: Moderate safety penalties, improved tolerance when blended with Tier 3–4,
moderate Barrier Preservation ceiling.
TIER 3 — MILD
Examples: CAPB (Cocamidopropyl Betaine), Lauryl Betaine, Sodium Cocoamphoacetate, Disodium
Cocoamphodiacetate, Sodium Cocoyl Glycinate, Sodium Cocoyl Apple Amino Acids, Sodium
Lauroamphoacetate.
Characteristics: Low TEWL disruption per wash, good barrier compatibility, widely tolerated
under moderate frequency, manageable under high-frequency occupational use.
Note: CAPB sensitisation risk affects Allergy Risk, not Safety directly.
Scoring impact: Eligible for good Barrier Preservation, strong compatibility with Tier 4 systems,
suitable for frequent hand washing contexts.
TIER 4 — VERY MILD
Examples: Decyl Glucoside, Coco Glucoside, Lauryl Glucoside, Sodium Cocoyl Glutamate, Disodium
Cocoyl Glutamate, Sodium Lauroyl Sarcosinate, Sodium Cocoyl Alaninate, amino acid/glucoside
blends, Coco-Betaine (high purity).
Characteristics: Minimal barrier disruption per wash, lowest irritation potential, strongest
skin compatibility under high-frequency use, most suitable for occupational and sensitive-skin
contexts.
Scoring impact: Eligible for maximum Barrier Preservation, transparency bonus eligible,
occupational-use compatible.
SURFACTANT SYSTEM CLASSIFICATION:
• Tier 1 alone → Severe (critically amplified in hand wash context)
• Tier 1 + Tier 3/4 → Moderate-High (still problematic at high frequency)
• Tier 2 alone → Moderate
• Tier 2 + Tier 3/4 → Moderate-Low
• Tier 3/4 dominant → Low
• Tier 4 dominant → Very Low
Additional rules: High-foam Tier 1 systems cannot qualify as "gentle" or "moisturising."
Tier 3–4 syndet systems receive Barrier Preservation credit. Any SLS-primary system in
occupational contexts requires mandatory safety advisory.
---
LAYER 2 — pH CONTEXT NOTE (EDUCATIONAL ONLY — NON-SCORING)
Ingredient lists alone cannot reliably determine final formulation pH with scientific confidence.
pH does not contribute numerically to any score, ceiling, bonus, or penalty in this algorithm.
Educational context only: Physiological hand skin pH is approximately 4.5–5.5. Highly alkaline
systems (such as traditional soap at pH 9–10) are associated with increased probability of TEWL
elevation, protease overactivity, and barrier recovery delay — effects that may be amplified under
high-frequency hand washing. Whether a formulation falls within or outside the physiological pH
range cannot be confirmed from INCI alone. "pH-balanced" claims cannot be verified from ingredient
list inspection.
---
LAYER 3 — ANTIMICROBIAL EFFICACY RULE (HAND WASH SPECIFIC)
Unlike facial cleansers, hand washes may legitimately contain antimicrobial actives.
Antimicrobial claims MUST be evaluated for active ingredient presence and concentration,
mechanism of action, evidence base, skin compatibility at functional concentration, and
regulatory context.
ANTIMICROBIAL CATEGORY A — HIGH EFFICACY (FULL CREDIT)
• Benzalkonium Chloride (BKC) at 0.1–0.3%: proven broad-spectrum activity
• Chlorhexidine Gluconate at 2–4%: healthcare-standard antimicrobial
• Triclosan (where legally permitted) at 0.1–0.3%: limited/controversial regulatory status
• Povidone-Iodine: surgical/medical grade, significant skin impact
Scoring: Full antimicrobial credit. Microbiome disruption and skin compatibility penalties
MUST also be applied independently.
ANTIMICROBIAL CATEGORY B — MODERATE EFFICACY
• BKC at sub-0.1%: limited antimicrobial efficacy
• Phenoxyethanol: limited broad-spectrum hand hygiene benefit
• Zinc derivatives: moderate targeted antimicrobial
Scoring: Partial antimicrobial credit.
ANTIMICROBIAL CATEGORY C — DECORATIVE / MARKETING
• Essential oils at decorative levels (tea tree <0.5%, lavender, eucalyptus)
• Plant extracts marketed as "antibacterial"
• Silver nanoparticles at unconfirmed concentrations
• "Natural antibacterial" claims without active concentration declaration
Scoring: No functional antimicrobial credit. Triggers Formulation Honesty penalty.
ANTIMICROBIAL HONESTY RULE: Products claiming antibacterial/antimicrobial benefit without
Category A actives at functional concentrations receive mandatory Formulation Honesty penalties.
---
LAYER 4 — RINSE-OFF ACTIVE EFFICACY
Active ingredients must be evaluated based on rinse-off exposure time.
CATEGORY A — HIGH EFFICACY (FULL CREDIT)
• Glycerin at ≥3%: functional residual humectant benefit
• Sorbitol at ≥3%: functional humectant
• Antimicrobial actives (see Layer 3)
CATEGORY B — PARTIAL EFFICACY
• Panthenol, Allantoin, Urea at low levels, Niacinamide at low levels
CATEGORY C — DECORATIVE / LOW EFFICACY
• Vitamin C, Retinoids, Peptides, Hyaluronic Acid, Ceramides (rinse-off), Collagen, most
 antioxidant botanicals, Keratin (rinse-off)
Marketing-heavy Category C usage triggers Ingredient Quality penalty and Formulation Honesty penalty.
---
LAYER 5 — MICROBIOME IMPACT RULE
MICROBIOME COMPATIBILITY MODIFIER: Hand wash must be evaluated for long-term microbiome
stability under high-frequency use.
Higher microbiome disruption risk associated with:
• Broad-spectrum antimicrobials without targeted justification (Triclosan, Chlorhexidine at high
 concentrations, BKC at high concentrations, broad-spectrum essential oil blends at functional levels)
• SLS-dominant surfactant systems
• High alcohol content (>5% denatured ethanol in non-sanitiser hand wash)
Note: Alkaline formulation architecture may increase microbiome disruption probability, though
final product pH cannot be confirmed from INCI alone.
ANTIMICROBIAL BALANCE RULE: Antimicrobial actives justified for hand hygiene receive functional
credit in Effectiveness but MUST also receive microbiome disruption penalties in Microbiome
Compatibility and Long-Term Skin Compatibility. Efficacy and disruption are both scored with
no "free pass."
Low disruption risk: Tier 3–4 surfactant systems with targeted actives. In hand wash, frequency
of use amplifies microbiome disruption penalties.
---
LAYER 5.5 — COLORANT PENALTY RULE
Artificial colorants provide no cleansing, barrier, or long-term skin benefit. In high-frequency
hand wash, cumulative colorant exposure is elevated.
High concern examples: Red 40, Yellow 5, Yellow 6, Blue 1, Green 3, multiple synthetic dye blends.
Scoring impact: Allergy Risk penalty, Ingredient Quality penalty, Cumulative Irritation Risk
penalty, Formulation Honesty penalty. Multiple synthetic dyes increase penalties further.
Colorants must be mentioned under Concerns and Why This Rating.
---
LAYER 5.6 — HERBAL AUTHENTICITY ENGINE
Applies when herbal, ayurvedic, botanical, organic, natural, plant-based, or traditional
marketing is present.
PURPOSE: Distinguish genuinely functional botanical systems from decorative herbal inflation.
HERBAL EVIDENCE CLASSIFICATION:
H1 — Evidence-Supported Botanicals
Examples: Aloe Vera, Colloidal Oatmeal, Centella Asiatica, Green Tea, Calendula, Chamomile,
Bisabolol, Licorice, Oat Extract, Tea Tree (specific contexts), Neem (limited antimicrobial
contexts), Turmeric (context-dependent).
Rules: Partial functional credit only when concentration realism supports relevance. Decorative
trace inclusion receives minimal credit. Overall architecture still governs scoring.
H2 — Traditional / Partial-Evidence Botanicals
Examples: Tulsi, Rose extracts, Lavender, Rosemary, Peppermint, Eucalyptus, fermented botanicals,
fruit extracts.
Rules: Minor contextual credit possible. Must never override structural formulation quality.
Overmarketing triggers formulation honesty penalties.
H3 — Decorative Herbal Inflation
Examples: Trace exotic extracts, long botanical stacks, "100-herb" systems, fairy-dust herbal
loading, marketing-only herbal complexes.
Rules: Triggers formulation honesty penalties and ingredient inflation penalties. No meaningful
efficacy credit.
HERBAL AUTHENTICITY ASSESSMENT (conditional section — appears only when herbal/botanical
marketing is present): evaluates whether herbal ingredients appear functionally relevant given
probable concentration, whether the formulation is genuinely herbal-driven or primarily
decorative, whether marketing exceeds formulation reality, and whether the botanical architecture
appears coherent. Concentration certainty remains inferential unless disclosed percentages or
strong positional evidence exist.
---
LAYER 6 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0
SAFETY [DOMINANT]
Evaluates: surfactant harshness amplified by hand wash frequency, barrier disruption risk per
wash cycle, repeated-use irritation burden (8–20× daily context), sensitisation potential,
occupational dermatitis contribution risk, cumulative inflammatory load.
Core rules: High-frequency hand wash use MUST amplify all irritation and barrier penalties.
Repeated low-grade irritation reduces Safety significantly. SLS/soap penalties reflect chronic
barrier stress. Safety overrides foam perception, fragrance freshness, luxury positioning,
short-term cosmetic feel.
EFFECTIVENESS
Core question: Can the hand wash effectively cleanse hands — including soil, grease, and microbial
load — while maintaining skin stability under high-frequency repeated use?
Evaluates: removal of dirt, grease, food residue, and microbial load; antimicrobial efficacy
(Category A actives only receive full credit); rinse-off active honesty; cleansing-to-barrier
balance; pH suitability; repeated-use functionality.
Rules: Basic cleansing alone cannot achieve elite effectiveness. "Antibacterial" claims without
Category A actives receive mandatory penalties. Rinse-off active inflation cannot receive full credit.
Ignore marketing claims, foam perception, fragrance freshness, luxury positioning.
ALLERGY RISK
Evaluates: fragrance exposure under high-frequency repeated use, essential oil sensitisers,
preservative sensitisers (MI, MCI, formaldehyde releasers), botanical allergens, CAPB sensitisation
potential, colorant allergen burden, repeated-use trigger accumulation.
Rules: High-frequency hand washing dramatically amplifies fragrance and sensitiser exposure.
Fragrance-heavy hand washes receive significant Allergy Risk penalties. MI/MCI are known hand wash
sensitisers — mandatory mention and penalty. Occupational allergy risk must be considered.
ECO IMPACT
Evaluates: surfactant biodegradability, environmental persistence, aquatic toxicity (hand washes
rinse directly to drainage), antimicrobial ecotoxicity, unnecessary formulation burden.
Rules: Glucoside and amino acid surfactants receive ecological preference. Triclosan receives
significant Eco Impact penalty. BKC receives moderate Eco Impact penalty. Persistent preservatives
and antimicrobials reduce score.
INGREDIENT QUALITY
Evaluates: surfactant system coherence, rinse-off active honesty, antimicrobial active honesty,
functional ingredient synergy, structural transparency, absence of decorative inflation.
Rules: Decorative active stacking reduces quality credibility. Non-functional botanical loading
reduces transparency. False antibacterial marketing is a major Ingredient Quality penalty.
SKIN COMPATIBILITY
Evaluates: high-frequency daily-use tolerance (8–20× washes), barrier resilience under repeated
exposure, post-wash tightness and dryness accumulation, microbiome stability under frequent
disruption, long-term cumulative dryness and dermatitis risk, sensitisation accumulation.
Core rules: Temporary cosmetic softness does not equal compatibility. Long-term repeated-use
behaviour is the primary parameter. Post-wash tightness = structural failure signal.
Cumulative dryness from high-frequency use MUST drive scoring down.
CORE SCORE FORMULA:
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)
---
LAYER 7 — SPECIALIZED HAND WASH PERFORMANCE
Score range: 1.0 → 5.0
CLEANSING EFFICIENCY
Evaluates: dirt, soil, and food residue removal; grease and oil removal; microbial load
reduction (Category A actives only); pore/skin fold cleansing.
Rules: Balanced cleansing preferred over aggressive stripping. Foam volume does not determine
cleansing quality. Excessive stripping reduces score even when cleansing is complete.
Ceiling rule: Tier 1 surfactant systems cannot achieve maximum Cleansing Efficiency.
BARRIER PRESERVATION [DOMINANT]
Evaluates: TEWL disruption risk per wash cycle, lipid preservation under repeated washing,
barrier recovery speed between washes, repeated-use resilience, long-term lipid and NMF
depletion risk, occupational high-frequency use compatibility.
BARRIER CEILINGS:
• Tier 1 dominant → Max 1.8
• Tier 1 + Tier 3/4 → Max 2.5
• Tier 2 dominant → Max 3.0
• Tier 2 + Tier 3/4 → Max 3.5
• Tier 3/4 dominant → Max 4.3
• Tier 3/4 with physiological-range probable pH → Eligible for 5.0
• Soap systems (empirically confirmed pH >9) → Hard ceiling 1.8
Rules: Post-wash tightness = barrier stress signal. High scores require mild surfactants and low
repeated barrier stress. Soap/SLS-dominant systems cannot achieve elite Barrier Preservation.
Frequency MUST reduce ceilings for harsher systems more aggressively.
HYDRATION SUPPORT
Evaluates: residual humectant benefit (glycerin ≥3%, sorbitol ≥3% receive meaningful credit),
post-wash moisture retention, reduction of dryness potential, contribution to occupational
dryness reduction.
Rules: Reduced dryness is considered hydration success. Glycerin at decorative levels (<2%)
receives minimal credit. "Moisturising hand wash" claims require ≥3% functional humectants
AND mild surfactant system.
RESIDUAL DRYNESS RISK
Evaluates: post-wash tightness, lipid depletion trajectory under repeated washing, long-term
dryness accumulation, NMF depletion risk, occupational dermatitis contribution.
Rules: Repeated tightness indicates structural barrier stress. Tier 1 surfactants increase
long-term NMF and lipid depletion critically at high frequency. Cumulative dryness is the
primary real-world concern.
MICROBIOME COMPATIBILITY
Evaluates: commensal microbiome preservation under repeated washing, surfactant disruption risk,
antimicrobial selectivity — targeted vs. broad-spectrum disruption, long-term microbiome balance.
Rules: Routine microbiome disruption at high frequency significantly reduces score. Broad-spectrum
antimicrobial systems receive penalties balanced against functional justification. BKC receives
contextual credit when justified — but microbiome penalties still apply.
CUMULATIVE IRRITATION RISK
Evaluates: repeated surfactant exposure at hand wash frequency (8–20× daily), fragrance
accumulation under high use, essential oil exposure, preservative sensitisation (MI/MCI critical),
chronic inflammatory burden, colorant irritation burden.
Rules: Hand wash frequency MUST be the primary amplification context. Mild irritants become
clinically significant under repeated exposure. Long-term low-grade irritation is prioritised
over isolated acute reactions. MI/MCI sensitisation is a mandatory concern.
FORMULATION HONESTY
Evaluates: foam-dependent cleansing perception marketing, fragrance-driven "freshness" and
"clean" positioning, false antimicrobial claims, decorative botanical loading, rinse-off active
inflation, "moisturising" claims without structural support, sensory-first architecture
prioritised over skin compatibility.
Rules: "Antibacterial" label without Category A actives at functional concentration = major
deception penalty. "Moisturising hand wash" requires ≥3% functional humectant AND mild
surfactant backbone.
SPECIALIZED CALCULATION:
Specialized Performance Score = Average of all 7 specialized scores.
Dominant parameters: Barrier Preservation (primary interpretive), Cumulative Irritation Risk
(primary penalty). All penalties must reflect realistic hand wash contact time (15–45 seconds),
usage frequency context, and evidence-supported dermatological relevance.
---
LAYER 8 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES:
• Tier 3 or Tier 4 dominant surfactant system
• Barrier Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No rinse-off active inflation
• No dominant fragrance/essential oil loading
• Formulation Honesty ≥ 3.5
• No unjustified broad-spectrum antimicrobial claims
• No false antibacterial marketing
DISQUALIFIERS:
• Primary SLS systems
• Empirically confirmed soap pH systems (>9.0)
• Heavy fragrance loading (fragrance in top-5 ingredients)
• False antibacterial claims (Category C actives marketed as antibacterial)
• Decorative Category C active marketing in wash-off format
---
LAYER 8.5 — REAL-WORLD USAGE SIMULATION
Simulate: high-frequency hand wash cycles (8–20× daily, occupational context), barrier stress
accumulation, recovery cycles between washes, long-term lipid and NMF depletion trajectory,
long-term microbiome stability under repeated exposure, repeated fragrance and preservative
sensitisation accumulation, occupational contact dermatitis risk trajectory.
Core question: Can the hand wash remain tolerable and non-damaging under long-term high-frequency
real-world use — including occupational healthcare, food service, or household contexts?
ANTI-MARKETING FILTER — mandatory penalties for:
• Foam-first cleansing claims
• Fragrance-driven "freshness/cleanliness" positioning
• False antibacterial claims (Category C actives marketed as antibacterial)
• "Kills 99.9% of germs" without Category A actives at functional concentrations
• Decorative botanical loading marketed as functional
• Rinse-off active inflation
• "Moisturising hand wash" claims absent structural humectant and mild surfactant support
BIAS NEUTRALISATION FILTER — neutralise:
• Foam = cleansing illusion
• Fragrance = cleanliness illusion
• Antibacterial label = protection illusion without Category A actives
• "Natural soap = safe" bias (empirically alkaline soap may increase barrier stress)
• Botanical inflation bias
• Rinse-off active halo
• Post-wash tightness = "clean" illusion
STRICT SCORING RULES: No marketing influence on scoring. Surfactant harshness tier MUST be
classified before scoring. Rinse-off active efficacy MUST be classified before Effectiveness
scoring. Antimicrobial actives MUST be classified (A/B/C) before Effectiveness scoring.
High-frequency hand use context MUST amplify all irritation, dryness, and barrier disruption
penalties. Repeated-use behaviour > single-use feel. Post-wash tightness = structural failure
signal, not "clean feeling." Fragrance freshness ≠ skin health benefit. Occupational use
context (8–20× daily) MUST be simulated. MI/MCI sensitisation MUST be flagged whenever
detected. Triclosan Eco Impact penalty MUST be applied when present.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 HAND WASH PROFILE

## Functional Classification

Short hand wash classification.

Examples:
- Gentle Everyday Hand Wash
- Balanced Amino Acid Hand Wash
- Harsh Foaming Hand Wash
- Antibacterial Hand Wash (Effective / Unsupported)
- Occupational-Compatible Hand Wash
- Decorative Moisturising Hand Wash
- Soap-Based Hand Bar

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering surfactant mildness, barrier friendliness, pH compatibility, antimicrobial honesty (where relevant), long-term hand skin behavior under repeated use, and overall formulation balance.

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

## Hand Skin + Barrier Analysis

### Cleansing Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Hydration Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Residual Dryness Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Microbiome Compatibility — ⭐X.X

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

# 👤 SKIN TYPE COMPATIBILITY

## Population Compatibility

### Dry / Dehydrated Hands — ⭐X.X

Short compatibility explanation.

### Normal Hands — ⭐X.X

Short compatibility explanation.

### Sensitive / Reactive Hands — ⭐X.X

Short compatibility explanation.

### Occupational / Frequent Washers — ⭐X.X

Short compatibility explanation.

### Eczema-Prone Hands — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Use Frequency Compatibility

### Occasional Use (1–3× Daily) — ⭐X.X

Short explanation.

### Regular Use (4–8× Daily) — ⭐X.X

Short explanation.

### High-Frequency Use (8–20× Daily / Occupational) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing feel
- Tightness or softness
- Irritation signals

## Medium-Term

- Barrier response to repeated washing
- Dryness and skin texture changes
- Tolerance development or decline

## Long-Term

- Barrier stability under sustained use
- Dryness or contact dermatitis risk
- Microbiome stability
- Overall hand skin outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleansing system, barrier behavior, antimicrobial function (where present), irritation risk, and long-term hand skin outcome.

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
- Mention harsh colorants, preservatives, and fragrances (especially MI/MCI) in output
- No foam-volume bias
- No antibacterial halo without Category A actives at functional concentration
- Structural weakness overrides cosmetic feel
- Surfactant harshness tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Rinse-off active efficacy must be classified before Effectiveness scoring
- Antimicrobial actives must be classified (Category A/B/C) before Effectiveness scoring
- High-frequency hand use context must amplify all irritation, dryness, and barrier disruption penalties
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-wash tightness = structural failure signal
- Foam richness ≠ cleansing power
- Natural soap ≠ safe (pH 9–10 is structurally harmful under repeated hand washing)
- Fragrance freshness ≠ skin health benefit
- Antibacterial label ≠ actual antimicrobial protection without Category A actives
- Occupational use context must be simulated for stress-testing
- MI/MCI sensitisation must be flagged whenever detected
- Triclosan Eco Impact penalty must be applied when present
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hand Wash Evaluation Algorithm — Structured for surfactant mildness analysis, occupational-use stress testing, and long-term repeated-use hand skin barrier evaluation. All scoring is structural and evidence-informed.
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
              "You are a strict hand wash structural evaluation engine."
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