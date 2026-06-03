/*
=====================================================
CLINICAL FACE WASH ENGINE
=====================================================

RESPONSIBILITIES

1. Receive cleaned ingredients
2. Run clinical structural analysis
3. Generate final structured output

=====================================================
*/

const openai =
  require("../../../../../../ai/openaiClient");

class ClinicalEngine {

  /*
  =====================================================
  MAIN PIPELINE
  =====================================================
  */

  async run(data) {

    try {

      const ingredients =
        data.ingredients || [];

      /*
      ================================================
      FINAL ANALYSIS
      ================================================
      */

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      /*
      ================================================
      FINAL RESPONSE
      ================================================
      */

      return {

        cleanser_type:
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

  /*
  =====================================================
  GPT ANALYSIS
  =====================================================
  */

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
FACE WASH / CLEANSER EVALUATION ALGORITHM — V1.0

LAYER 0 — FOUNDATION ENGINE

SYSTEM OBJECTIVE

Reward cleansers that demonstrate:

• Effective cleansing with minimal barrier disruption
• Appropriate surfactant architecture
• Barrier preservation under repeated use
• Physiological pH compatibility
• Long-term microbiome compatibility
• Evidence-based formulation design
• Low cumulative irritation risk

Mandatory penalties apply for:

• Foam-first cleansing architecture
• Fragrance-driven “clean” perception
• Decorative botanical loading
• Harsh surfactant systems marketed as “deep cleansing”
• Rinse-off active inflation
• Marketing-driven sensory engineering over structural balance

Basic cleansing alone cannot achieve high scores.

---

TRANSPARENCY PRIORITY RULE

Ignore:

• Branding and luxury positioning
• Foam richness
• Fragrance freshness perception
• “Natural/organic” marketing
• Trend-driven active loading
• Ingredient-count inflation

Evaluate only:

• Cleansing efficiency vs barrier cost
• Surfactant harshness profile
• pH compatibility
• Post-wash skin impact
• Repeated-use tolerance
• Microbiome stability
• Structural formulation honesty

Any cleanser format (syndet, oil, micellar, soap, minimalist) receives credibility only when cleansing balance and barrier support are demonstrated.

---

GLOBAL ENFORCEMENT RULES

• Surfactant architecture is the dominant cleanser structure
• Safety penalties override functional bonuses
• Rinse-off actives cannot compensate for harsh surfactant systems
• Late-position ingredients cannot neutralize structural harshness
• Foam ≠ cleansing effectiveness
• Fragrance freshness ≠ skin health
• Post-wash tightness = barrier disruption signal
• Excess antimicrobial activity without barrier consideration reduces credibility
• Non-physiological pH reduces Safety and Barrier Preservation
• Rinse-off active inflation must be penalized

---

STRUCTURE DOMINANCE RULE

Primary cleanser architecture determines:

• Barrier disruption
• Lipid depletion
• Recovery speed
• Microbiome stability
• Long-term tolerance
• Repeated-use safety
• pH impact

Minor additives, decorative botanicals, and rinse-off actives cannot override a harsh surfactant backbone.

Ingredient evaluation must consider:

• Surfactant tier
• Rinse-off concentration realism
• Formulation pH
• Functional relevance
• Repeated-use exposure

---

RINSE-OFF CONTEXT RULE

Cleansers have limited contact time (~30–60 seconds). Active ingredients must be evaluated accordingly.

FULL CREDIT:
• Salicylic Acid
• Benzoyl Peroxide
• Substantive humectants

PARTIAL CREDIT:
• Glycerin
• Panthenol
• Low-level Niacinamide
• Urea
• Zinc

DECORATIVE / MINIMAL CREDIT:
• Vitamin C
• Retinoids
• Peptides
• Collagen
• Hyaluronic Acid
• Most antioxidant botanicals

Actives requiring prolonged skin contact must not receive full efficacy credit in rinse-off systems.

Decorative active marketing reduces:
• Ingredient Quality
• Formulation Honesty
LATE-INGREDIENT LIMIT RULE

Late-position ingredients may provide:
• Minor conditioning
• Mild soothing
• Sensory enhancement
• Temporary cosmetic comfort

They cannot offset:
• Harsh surfactant systems
• High-pH formulations
• Soap-dominant architecture
• Repeated SLS/SLES barrier stress
• Fragrance-heavy irritation burden

---

BASIC CLEANSING LIMIT RULE

Basic dirt removal alone cannot achieve high structural scores.

Soap-based or simplistic surfactant systems lacking:
• Barrier consideration
• pH optimization
• Microbiome compatibility

receive moderate score ceilings regardless of cleansing ability.

---

LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM

MANDATORY RULE:
All surfactants must be classified by harshness tier before scoring.

Surfactant structure is the primary determinant of:
• Barrier disruption
• TEWL increase
• Lipid depletion
• Protein denaturation
• Long-term tolerance

Anionic surfactants are generally harsher.
Amphoteric, nonionic, amino acid, and glucoside systems demonstrate superior skin compatibility.

---

SURFACTANT TIER TABLE

TIER 1 — HARSH

Examples:
• SLS
• SLES (primary surfactant)
• ALS
• LAS
• Sodium C14-16 Olefin Sulfonate
• Traditional soap systems (pH ≥9)

Characteristics:
• High TEWL increase
• Significant barrier disruption
• Protein/NMF damage
• Ceramide depletion
• High irritation potential

Scoring Impact:
• Mandatory Safety penalties
• Barrier Preservation ceiling reduction
• High Cumulative Irritation Risk

---

TIER 2 — MODERATE

Examples:
• SCI
• Sodium Lauroyl Methyl Isethionate
• Disodium Laureth Sulfosuccinate
• SLES in blended systems

Characteristics:
• Moderate barrier disruption
• Lower irritation than Tier 1
• Blend-dependent tolerance

Scoring Impact:
• Moderate Safety penalties
• Improved tolerance when combined with Tier 3–4 systems
• Moderate Barrier Preservation ceiling

---

TIER 3 — MILD

Examples:
• CAPB
• Lauryl Betaine
• Sodium Cocoamphoacetate
• Disodium Cocoamphodiacetate
• Sodium Cocoyl Glycinate
• Sodium Cocoyl Apple Amino Acids

Characteristics:
• Low TEWL disruption
• Good barrier compatibility
• Widely tolerated

Note:
CAPB sensitization risk affects Allergy Risk, not Safety.

Scoring Impact:
• Eligible for good Barrier Preservation
• Strong compatibility with Tier 4 systems

---

TIER 4 — VERY MILD

Examples:
• Decyl Glucoside
• Coco Glucoside
• Lauryl Glucoside
• Sodium Cocoyl Glutamate
• Disodium Cocoyl Glutamate
• Sodium Lauroyl Sarcosinate
• Sodium Cocoyl Alaninate
• Amino acid/glucoside blends

Characteristics:
• Minimal barrier disruption
• Lowest irritation potential
• Strongest skin compatibility

Scoring Impact:
• Eligible for maximum Barrier Preservation
• Transparency bonus eligible

---

SURFACTANT SYSTEM RULE

Primary surfactant determines system harshness.
Blending modifies but does not eliminate harshness.

SYSTEM CLASSIFICATION:

• Tier 1 alone → Severe
• Tier 1 + Tier 3/4 → Moderate-High
• Tier 2 alone → Moderate
• Tier 2 + Tier 3/4 → Moderate-Low
• Tier 3/4 dominant → Low
• Tier 4 dominant → Very Low

Additional Rules:
• High-foam Tier 1 systems cannot qualify as “gentle”
• Tier 3–4 syndet systems receive Barrier Preservation credit

---

LAYER 2 — CLEANSER pH RULE

pH is a mandatory scoring modifier affecting:
• Barrier recovery
• Microbiome stability
• Enzymatic activity
• Desquamation control
• Antimicrobial peptide function

Physiological skin pH:
4.5–5.5

High-pH cleansers increase:
• TEWL
• Protease overactivity
• Barrier disruption
• Microbiome imbalance

Soap systems (pH 9–10) receive major penalties.

---

pH SCORING TIERS

4.5–6.0
• Optimal
• Barrier Preservation bonus
• Microbiome bonus

6.0–6.5
• Acceptable
• Neutral scoring

6.5–7.5
• Mild penalty

7.5–9.0
• Moderate penalty

>9.0
• Significant penalty
• Elite Barrier Preservation disqualified

Unknown pH:
• No bonus
• Minor credibility reduction

pH penalties apply regardless of surfactant gentleness.

A mild surfactant system at high pH still receives barrier penalties.

---

LAYER 3 — RINSE-OFF ACTIVE EFFICACY

Active ingredients must be evaluated based on rinse-off exposure time.

CATEGORY A — HIGH EFFICACY (FULL CREDIT)

• Salicylic Acid
• Benzoyl Peroxide
• Sulfur
• Zinc derivatives

Characteristics:
• Functional in short-contact cleansing systems

Scoring:
• Full effectiveness credit

---

CATEGORY B — PARTIAL EFFICACY

• Glycerin
• Panthenol
• Niacinamide
• Urea
• Low-level AHAs

Characteristics:
• Limited residual/post-rinse benefit

Scoring:
• Partial effectiveness credit

---

CATEGORY C — DECORATIVE / LOW EFFICACY

• Vitamin C
• Retinoids
• Peptides
• Hyaluronic Acid
• Collagen
• Most antioxidant botanicals

Characteristics:
• Require prolonged contact time
• Minimal rinse-off functionality

Scoring:
• No major effectiveness credit
• Marketing-heavy usage triggers:
  - Ingredient Quality penalty
  - Formulation Honesty penalty

---

ACTIVE SCORING RULE

• Category A → Full functional credit
• Category B → Reduced credit
• Category C → Decorative unless strong substantivity exists
LAYER 4 — MICROBIOME IMPACT RULE

MICROBIOME COMPATIBILITY MODIFIER

The cleanser must be evaluated for long-term microbiome stability.

High microbiome disruption risk:
• High-pH systems (>7.5)
• Broad-spectrum antimicrobials
  - Triclosan
  - Chlorhexidine
  - Benzalkonium chloride
  - Strong antimicrobial essential oils
• SLS-dominant surfactant systems
• High alcohol systems (>10% denatured alcohol)

Low microbiome disruption risk:
• Tier 3–4 surfactant systems at physiological pH
• Targeted antimicrobials with justified use
• Prebiotic/postbiotic support

Application Rules:
• Primarily modifies:
  - Microbiome Compatibility
  - Long-Term Skin Compatibility
• Reinforces existing surfactant and pH penalties
• Not a standalone dominant penalty
LAYER 4.5 — COLORANT PENALTY RULE
Artificial/decorative colorants provide no cleansing, barrier, or long-term skin benefit and increase unnecessary irritation burden.
High concern examples:
• Red 40
• Yellow 5
• Yellow 6
• Blue 1
• Green 3
• Multiple synthetic dye blends
Scoring Impact:
• Allergy Risk penalty
• Ingredient Quality penalty
• Cumulative Irritation Risk penalty
• Formulation Honesty penalty
Multiple synthetic dyes increase penalties further.
Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.
OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)
Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”


---

LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 FOR EVRY RULE 


---

SAFETY [DOMINANT]

Evaluates:
• Surfactant harshness
• Barrier disruption risk
• Repeated-use irritation burden
• Sensitization potential
• pH-related barrier stress
• Cumulative inflammatory load
• Long-term tolerance trajectory

Core Rules:
• Repeated low-grade irritation reduces Safety
• Daily-use frequency magnifies irritation burden
• SLS/soap penalties reflect chronic barrier stress, not acute toxicity
• Safety overrides:
  - Foam perception
  - Fragrance freshness
  - Luxury positioning
  - Short-term cosmetic feel

---

EFFECTIVENESS

Core Question:
Can the cleanser effectively cleanse while maintaining skin stability under repeated use?

Evaluates:
• Dirt/oil/SPF removal
• Makeup cleansing performance
• Rinse-off active efficacy
• Cleansing-to-barrier balance
• pH suitability
• Repeated-use functionality
• Structural formulation honesty

High effectiveness requires:
• Adequate cleansing without excessive stripping
• Evidence-supported rinse-off actives
• Barrier-considerate surfactant design
• Functional pH range

Rules:
• Basic cleansing alone cannot achieve elite effectiveness
• Rinse-off active inflation cannot receive full credit
• Ignore:
  - Marketing claims
  - Foam perception
  - Fragrance freshness
  - Luxury positioning

---

ALLERGY RISK

Evaluates:
• Fragrance exposure
• Essential oil sensitizers
• Preservative sensitizers
• Botanical allergens
• CAPB sensitization potential
• Repeated-use trigger accumulation

Application Rules:
• Rinse-off fragrance risk is lower than leave-on products but still relevant under repeated exposure
• Fragrance-heavy cleansers receive Allergy Risk penalties
• Frequency of exposure is prioritized over short contact duration

---

ECO IMPACT

Evaluates:
• Surfactant biodegradability
• Environmental persistence
• Ecological accumulation risk
• Unnecessary formulation burden
• Direct rinse-off environmental load

General Rules:
• Glucoside and amino acid surfactants receive ecological preference
• Persistent surfactants/preservatives reduce score

---

INGREDIENT QUALITY

Evaluates:
• Surfactant system coherence
• Rinse-off active honesty
• Surfactant/pH balance
• Functional ingredient synergy
• Structural transparency
• Absence of decorative inflation

Rules:
• Decorative active stacking reduces quality credibility
• Non-functional botanical loading reduces transparency
• Rinse-off actives must justify functional relevance

---

SKIN COMPATIBILITY

Evaluates:
• Daily-use tolerance
• Barrier resilience
• Post-wash tightness/dryness
• Acne compatibility
• Microbiome stability
• Long-term tolerance development
• Cumulative sensitization risk

Core Rules:
• Temporary softness does not equal compatibility
• Foam satisfaction does not equal skin compatibility
• Long-term repeated-use behavior is prioritized over immediate cosmetic feel
CORE SCORE FORMULA
Core Score =
(
 Safety × 0.25 +
 Effectiveness × 0.20 +
 Allergy Risk × 0.15 +
 Eco Impact × 0.10 +
 Ingredient Quality × 0.15 +
 Skin Compatibility × 0.15
 )
LAYER 6 — SPECIALIZED CLEANSER PERFORMANCE

Evaluates real-world repeated-use cleanser behavior.
Score Range: 1.0 → 5.0

---

CLEANSING EFFICIENCY

Evaluates:
• Dirt/pollutant removal
• Sebum removal
• SPF/makeup cleansing
• Pore-cleansing actives (SA/BPO)

Core Rules:
• Balanced cleansing is preferred over aggressive stripping
• Foam volume does not determine cleansing quality
• Micellar and low-foam systems may outperform harsh foaming systems
• Excessive stripping reduces score

CEILING RULE:
Tier 1 surfactant systems cannot achieve maximum Cleansing Efficiency regardless of cleansing strength.

---

BARRIER PRESERVATION [DOMINANT]

Evaluates:
• TEWL disruption risk
• Lipid preservation
• Barrier recovery speed
• pH-related acid mantle recovery
• Repeated-use resilience
• Long-term lipid depletion risk

BARRIER CEILINGS

• Tier 1 dominant → Max 2.0
• Tier 1 + Tier 3/4 → Max 2.8
• Tier 2 dominant → Max 3.2
• Tier 2 + Tier 3/4 → Max 3.7
• Tier 3/4 dominant → Max 4.3
• Tier 3/4 at pH 4.5–6.0 → Eligible for 5.0
• Tier 3/4 at pH 6.0–7.5 → Reduced ceiling
• Soap systems (pH >9) → Hard ceiling 2.0

Core Rules:
• Post-wash tightness = barrier stress signal
• High scores require:
  - Mild surfactants
  - Physiological pH
  - Low repeated barrier stress
• Soap/SLS-dominant systems cannot achieve elite Barrier Preservation
• Barrier Preservation is the dominant cleanser performance parameter

---

HYDRATION SUPPORT

Evaluates:
• Residual humectant benefit
• Post-wash moisture retention
• Reduction of dehydration potential
• Avoidance of excessive lipid stripping

Core Rules:
• Hydration in cleansers is inherently limited
• Reduced dehydration is considered hydration success
• Cleansers cannot replicate moisturizer function
• Humectants cannot fully offset Tier 1 stripping

---

RESIDUAL DRYNESS RISK

Evaluates:
• Post-wash tightness
• Lipid depletion trajectory
• Long-term dryness accumulation
• pH-mediated dehydration
• NMF depletion risk

Core Rules:
• Repeated tightness indicates structural barrier stress
• Tier 1 surfactants increase long-term NMF depletion risk
• Chronic dryness progression must influence scoring

---

MICROBIOME COMPATIBILITY

Evaluates:
• Commensal microbiome preservation
• pH-mediated microbial stability
• Surfactant disruption risk
• Antimicrobial selectivity
• Long-term microbiome balance

Core Rules:
• Routine microbiome disruption reduces score
• Broad-spectrum antimicrobial systems receive penalties
• Targeted acne actives (SA/BPO) receive contextual credit when microbiome disruption is limited

---

CUMULATIVE IRRITATION RISK

Evaluates:
• Repeated surfactant exposure
• Fragrance accumulation
• Essential oil exposure
• Preservative sensitization
• Chronic inflammatory burden
• pH-mediated irritation stress
• Frequency-weighted exposure

Core Rules:
• Daily/twice-daily exposure amplifies irritation burden
• Mild irritants become clinically significant under repeated exposure
• Long-term low-grade irritation is prioritized over isolated acute reactions

---

FORMULATION HONESTY

Evaluates:
• Foam-dependent cleansing perception
• Fragrance-driven sensory positioning
• Decorative botanical loading
• Rinse-off active inflation
• Ingredient-list inflation
• Sensory-first marketing architecture
• Aggressive “deep cleansing” claims

Core Rules:
• Consumer perception cannot replace structural formulation quality
• Foam richness does not equal cleansing performance
• Dermatological outcome overrides sensory satisfaction

---

SPECIALIZED CALCULATION

Specialized Performance Score =
Average of all 7 specialized scores

Dominant Parameters:
• Barrier Preservation → primary interpretive parameter
• Cumulative Irritation Risk → primary penalty parameter

All penalties must reflect:
• Realistic contact time
• Usage frequency
• Evidence-supported dermatological relevance

---

LAYER 7 — FINAL RATING FORMULA

Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)

Core and Specialized scores carry equal weight.

This prevents:
• Marketing-driven performance inflation
• Safe-but-ineffective scoring inflation
• Effective-but-barrier-damaging inflation

---

HIGH SCORE ELIGIBILITY (>4.0)

Requires:
• Tier 3 or Tier 4 dominant surfactant system
• pH ≤ 7.5 (preferably 4.5–6.5)
• Barrier Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No rinse-off active inflation
• No dominant fragrance/essential oil loading
• Formulation Honesty ≥ 3.5
• No unjustified broad-spectrum antimicrobial dominance

DISQUALIFIERS:
• Primary SLS systems
• Soap pH systems
• Heavy fragrance loading
• Decorative Category C active marketing
LAYER 7.5 — REAL-WORLD USAGE SIMULATION

Simulate:
• Daily cleansing frequency (1–2× daily)
• Barrier stress accumulation
• Recovery cycles between washes
• Long-term lipid/NMF depletion
• Post-wash pH recovery
• Long-term microbiome stability
• Repeated fragrance/preservative sensitization

Core Question:
Can the cleanser remain tolerable and beneficial under long-term real-world use?

Core Rules:
• Post-wash tightness = barrier stress signal
• Foam perception ≠ cleansing quality
• Long-term repeated-use behavior overrides short-term sensory satisfaction

---

ANTI-MARKETING FILTER

Mandatory penalties apply for:

• Foam-first cleansing claims
• Fragrance-driven “freshness” positioning
• Decorative botanical loading
• Aggressive “deep cleansing” marketing
• Rinse-off active inflation
• Essential oil marketing without functional evidence
• Cleanser-moisturizer overstatement
• “Microbiome/balancing” claims lacking surfactant or pH support

---

BIAS NEUTRALIZATION FILTER

Neutralize:
• Foam = cleansing illusion
• Fragrance = cleanliness illusion
• “Natural soap = safe” bias
• Botanical inflation bias
• Luxury texture bias
• Antibacterial health halo
• Rinse-off active halo
• Ingredient-count quality illusion
• Tightness = cleanliness illusion
 



OUTPUT FORMAT

⭐ FINAL RATING
X.X / 5 — Rating Level

⚖ STRUCTURAL QUALITY

Short simple summary covering:
• Surfactant mildness
• Barrier friendliness
• pH compatibility
• Long-term skin behavior
• Overall formulation balance

---

🧴 CLEANSER PROFILE

Short cleanser classification.

Examples:
• Gentle Daily Cleanser
• Balanced Syndet Cleanser
• Harsh Foam Cleanser
•
---

📊 CORE SCORES ( GIVE SHORT STRUCTURAL REASON FOR EVRY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED )

Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
---

🧪 SPECIALIZED PERFORMANCE
 ( GIVE SHORT STRUCTURAL REASON FOR EVRY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED )
Cleansing Efficiency — ⭐X.X
Barrier Preservation — ⭐X.X
Hydration Support — ⭐X.X
Residual Dryness Risk — ⭐X.X
Microbiome Compatibility — ⭐X.X
Cumulative Irritation Risk — ⭐X.X
Formulation Honesty — ⭐X.X



---

👍 STRENGTHS

• Main structural advantage
• Main structural advantage
• Main structural advantage

⚠ CONCERNS

• Main structural weakness
• Main structural weakness
• Main structural weakness

---

👤 SKIN TYPE COMPATIBILITY

Dry Skin — ⭐X.X
Oily Skin — ⭐X.X
Combination Skin — ⭐X.X
Sensitive Skin — ⭐X.X
Acne-Prone Skin — ⭐X.X

---

📅 LONG-TERM USABILITY

Daily Use — ⭐X.X
Twice Daily Use — ⭐X.X
Occasional Use — ⭐X.X

---

⏱ EXPECTED RESULTS

Immediate:
• Cleansing feel
• Tightness/hydration
• Irritation signals

Medium-Term:
• Barrier response
• Dryness/oiliness changes
• Tolerance development

Long-Term:
• Barrier stability
• Dryness progression
• Microbiome stability
• Overall skin outcome

---

🔬 KEY STRUCTURAL INGREDIENTS

List only major ingredients affecting:
• Cleansing system
• Barrier behavior
• Irritation risk
• Active performance
• Long-term skin outcome

---

🧠 WHY THIS RATING

3–5 concise user-friendly evidence-based 
---



⚠ STRICT OUTPUT RULES
NO MEDICAL CLAIMS ANYWHERE 
No marketing influence on scoring
Mention harsh colorants,preservatives fragrances in output
No foam-volume bias
Structural weakness overrides cosmetic feel
Surfactant harshness tier MUST be classified before scoring
pH compatibility MUST be assessed for all formulations
Rinse-off active efficacy MUST be classified before Effectiveness scoring
Repeated-use behavior > single-use feel
Long-term outcome > immediate sensation
Post-wash tightness = structural failure signal, not "clean feeling"
Foam richness ≠ cleansing power
Natural soap ≠ safe (pH 9–10 is structurally harmful)
Fragrance freshness ≠ skin health benefit
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
              "You are a strict clinical cleanser structural evaluation engine."
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
