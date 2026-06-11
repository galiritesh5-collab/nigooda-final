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
FACE WASH / CLEANSER EVALUATION ALGORITHM — V1.1 (PATCHED)
================================================================================
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
• Fragrance-driven "clean" perception
• Decorative botanical loading
• Harsh surfactant systems marketed as "deep cleansing"
• Rinse-off active inflation
• Marketing-driven sensory engineering over structural balance
Basic cleansing alone cannot achieve high scores.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding and luxury positioning
• Foam richness
• Fragrance freshness perception
• "Natural/organic" marketing
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
• High-foam Tier 1 systems cannot qualify as "gentle"
• Tier 3–4 syndet systems receive Barrier Preservation credit
---
LAYER 2 — CLEANSER pH RULE (CONTEXTUAL MODEL — PATCH 1)
pH is a mandatory scoring modifier. It must be interpreted contextually together with surfactant harshness, surfactant blend quality, cleanser format, buffering system, rinse exposure duration, lipid depletion potential, repeated-use frequency, and overall formulation coherence.
pH is a MODERATE-INFLUENCE FACTOR. It is NOT a dominant final evaluation factor.
Surfactant architecture, repeated-use tolerance, cumulative irritation burden, and barrier behavior remain more important overall.
pH modifies:
• Probability of barrier disruption
• Microbiome stress probability
• Recovery speed expectations
Examples:
• A mildly acidic cleanser can still perform poorly if surfactant architecture is harsh.
• A slightly higher pH cleanser with exceptionally mild surfactants may still demonstrate acceptable long-term tolerance.
Low pH alone must NOT create elite scoring.
Higher pH alone must NOT automatically destroy scoring.
pH SCORING TIERS
4.5–6.0
• Optimal
• Barrier Preservation contextual bonus
• Microbiome contextual bonus
6.0–6.5
• Acceptable
• Neutral scoring
6.5–7.5
• Mild contextual modifier
7.5–9.0
• Moderate contextual modifier
>9.0
• Significant contextual modifier
• Elite Barrier Preservation disqualified when combined with harsh surfactant architecture
Unknown pH:
• No bonus
• Minor credibility reduction
pH modifiers must be weighed alongside surfactant tier. Final scoring must remain structurally balanced.
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
---
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
---
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
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)
---
LAYER 4.8 — HERBAL / ORGANIC VALIDATION (NEW LAYER)
This layer applies ONLY to:
• Herbal-positioned cleansers
• Ayurvedic cleansers
• Organic-marketed cleansers
• Botanical-heavy cleansers
• "Natural" marketed formulations
This layer evaluates:
• Herbal authenticity
• Evidence quality
• Rinse-off realism
• Botanical inflation
• Essential oil burden
• Traditional vs clinical support
• Marketing honesty
---
HERBAL EVIDENCE CLASSIFICATION
H1 — EVIDENCE-SUPPORTED BOTANICALS
Examples:
• Aloe Vera
• Colloidal Oat
• Green Tea
• Centella
• Licorice
• Fermented extracts
• Tea Tree Oil (concentration dependent)
• Neem (partial evidence)
Rules:
Provide partial functional credit ONLY when:
• Reasonable concentration appears likely
• Biological plausibility exists in rinse-off format
• Formulation architecture supports usefulness
Do NOT over-credit. Rinse-off exposure limitations still apply.
---
H2 — TRADITIONAL / PARTIAL-EVIDENCE BOTANICALS
Examples:
• Amla
• Bhringraj
• Hibiscus
• Reetha
• Shikakai
• Fenugreek
• Rosemary
• Rice Water
Rules:
Recognize:
• Traditional use
• Historical/cultural relevance
• Mild supportive role
However, do NOT allow:
• Strong clinical claims
• Exaggerated repair claims
• Unrealistic growth claims
• Miracle positioning
Required Output Language:
"Traditional supportive use with limited modern rinse-off evidence."
---
H3 — DECORATIVE / MARKETING BOTANICAL INFLATION
Examples:
• Exotic extract stacking
• Luxury botanical overload
• Decorative gold botanicals
• 20+ extract inflation systems
Characteristics:
• Label appeal dominance
• Weak functional realism
• Marketing-driven botanical complexity
Scoring Impact:
• Formulation Honesty reduction
• Botanical Inflation flag
• Ingredient Quality reduction
No major performance credit allowed.
---
GENUINE vs GIMMICK HERBAL DISTINCTION
GENUINE HERBAL SIGNALS
Examples:
• Mild surfactant architecture
• Coherent botanical strategy
• Realistic claims
• Reasonable simplicity
• Low fragrance burden
• Scalp/skin-compatible cleanser structure
• Balanced formulation logic
These increase:
• Formulation Honesty
• Herbal Authenticity credibility
---
GIMMICK HERBAL SIGNALS
Examples:
• Harsh surfactants hidden behind herbal marketing
• Perfume-heavy "Ayurvedic" systems
• Excessive extract inflation
• Fake "repair/growth" positioning
• Essential oil overload
• Sensory-first herbal branding
These reduce:
• Formulation Honesty
• Ingredient Quality
• Herbal Authenticity credibility
---
BOTANICAL IRRITATION REALISM RULE
Natural ingredients are NOT automatically safer.
The algorithm must recognize irritation/sensitization potential from:
• Peppermint oil
• Citrus oils
• Eucalyptus oil
• Clove oil
• Cinnamon oil
• Essential oil stacking
"Natural" claims must not override irritation realism.
---
OPTIONAL EXTRACTION QUALITY LOGIC
Higher credibility:
• Standardized extracts
• Fermented extracts
• Characterized actives
Lower credibility:
• Decorative botanical dusting
• Unstandardized extract inflation
• Ultra-low concentration herbal stacking
---
LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0
SAFETY [DOMINANT]
Evaluates:
• Surfactant harshness
• Barrier disruption risk
• Repeated-use irritation burden
• Sensitization potential
• pH-related barrier stress (contextual modifier)
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
• pH suitability (contextual)
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
• Fragrance burden (classified by F1–F4 tier)
• Essential oil sensitizers
• Preservative sensitizers
• Botanical allergens
• CAPB sensitization potential
• Repeated-use trigger accumulation
Application Rules:
• Fragrance must be evaluated by burden tier, not mere presence
• Rinse-off fragrance risk is lower than leave-on products but still relevant under repeated exposure
• Frequency of exposure is prioritized over short contact duration
---
FRAGRANCE BURDEN CLASSIFICATION SYSTEM (PATCH 2)
Fragrance must be evaluated contextually based on: concentration probability, allergen burden, essential oil intensity, placement in INCI, rinse-off exposure realism, repeated-use sensitization probability, and overall formulation dependency on fragrance.
F1 — LOW FRAGRANCE BURDEN
Examples: low-position parfum, minimal allergen presence, subtle rinse-off fragrance architecture
Characteristics: low irritation probability, acceptable in most rinse-off systems
Scoring Impact: little or no penalty; minor Allergy Risk consideration only if relevant
F2 — MODERATE FRAGRANCE BURDEN
Examples: noticeable fragrance presence, moderate allergen profile, sensory-enhanced cleansing systems
Characteristics: moderate repeated-exposure sensitization probability
Scoring Impact: mild Allergy Risk modifier; small Cumulative Irritation modifier
F3 — HIGH FRAGRANCE BURDEN
Examples: fragrance-forward cleansing systems, multiple fragrance allergens, perfume-heavy sensory architecture, essential oil stacking
Characteristics: elevated sensitization probability, fragrance-dependent product identity
Scoring Impact: stronger Allergy Risk penalty; stronger Cumulative Irritation Risk penalty; possible Formulation Honesty reduction
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Examples: aggressive essential oil loading, sensitizer-heavy fragrance systems, perfume-dominant "luxury freshness" positioning, fragrance architecture overriding cleanser balance
Characteristics: high repeated-use irritation probability, sensory-first formulation imbalance
Scoring Impact: major Allergy Risk reduction; major Cumulative Irritation penalty; Formulation Honesty penalty
Important Fragrance Rules:
• Fragrance burden matters more than fragrance existence
• Rinse-off exposure reduces overall risk compared to leave-on products
• Low-level fragrance in balanced systems may be acceptable
• Essential oils are not automatically safer than synthetic fragrance
• Repeated-use exposure still matters
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
• Surfactant/pH balance (contextual)
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
---
CORE SCORE FORMULA
Core Score =
(Safety × 0.25 +
Effectiveness × 0.20 +
Allergy Risk × 0.15 +
Eco Impact × 0.10 +
Ingredient Quality × 0.15 +
Skin Compatibility × 0.15)
---
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
Note on Foam (PATCH 3):
Foam itself is not inherently harmful. The algorithm must distinguish sensory foam behavior from true structural harshness. Some modern amino-acid, glucoside, and amphoteric systems may foam well while remaining structurally mild. The real concern is harsh surfactant architecture, lipid stripping, barrier disruption, and repeated-use irritation burden. Not all high-foam systems are harsh; not all low-foam systems are superior.
CEILING RULE:
Tier 1 surfactant systems cannot achieve maximum Cleansing Efficiency regardless of cleansing strength.
---
BARRIER PRESERVATION [DOMINANT]
Evaluates:
• TEWL disruption risk
• Lipid preservation
• Barrier recovery speed
• pH-related acid mantle recovery (contextual modifier)
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
 - Physiological or compatible pH (contextually assessed)
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
• pH-mediated dehydration (contextual)
• NMF depletion risk
Core Rules:
• Repeated tightness indicates structural barrier stress
• Tier 1 surfactants increase long-term NMF depletion risk
• Chronic dryness progression must influence scoring
---
MICROBIOME COMPATIBILITY
Evaluates:
• Commensal microbiome preservation
• pH-mediated microbial stability (contextual)
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
• Fragrance burden (F1–F4 tier)
• Essential oil exposure
• Preservative sensitization
• Chronic inflammatory burden
• pH-mediated irritation stress (contextual modifier)
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
• Aggressive "deep cleansing" claims
• Herbal/organic marketing vs structural reality (for applicable products)
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
---
HIGH SCORE ELIGIBILITY (>4.0)
Requires:
• Tier 3 or Tier 4 dominant surfactant system
• pH ≤ 7.5 (preferably 4.5–6.5) assessed contextually
• Barrier Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No rinse-off active inflation
• No F3 or F4 fragrance burden
• Formulation Honesty ≥ 3.5
• No unjustified broad-spectrum antimicrobial dominance
DISQUALIFIERS:
• Primary SLS systems
• Soap pH systems with harsh surfactant architecture
• F4 fragrance/essential oil loading
• Decorative Category C active marketing
---
LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Daily cleansing frequency (1–2× daily)
• Barrier stress accumulation
• Recovery cycles between washes
• Long-term lipid/NMF depletion
• Post-wash pH recovery (contextual)
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
• Fragrance-driven "freshness" positioning
• Decorative botanical loading
• Aggressive "deep cleansing" marketing
• Rinse-off active inflation
• Essential oil marketing without functional evidence
• Cleanser-moisturizer overstatement
• "Microbiome/balancing" claims lacking surfactant or pH support
• Herbal/Ayurvedic marketing hiding harsh surfactant architecture (Layer 4.8)
---
BIAS NEUTRALIZATION FILTER
Neutralize:
• Foam = cleansing illusion
• Fragrance = cleanliness illusion
• "Natural soap = safe" bias
• Botanical inflation bias
• Luxury texture bias
• Antibacterial health halo
• Rinse-off active halo
• Ingredient-count quality illusion
• Tightness = cleanliness illusion
• High foam = harsh assumption (PATCH 3 correction)
• Low foam = gentle assumption (PATCH 3 correction)
• High pH = automatically bad assumption (PATCH 1 correction)
• Low pH = automatically superior assumption (PATCH 1 correction)
• Fragrance presence = automatically harmful assumption (PATCH 2 correction)
• "Natural" = safe assumption (Layer 4.8 correction)
================================================================================
HERBAL / ORGANIC REALISM OUTPUT SECTION
(Required for herbal/organic/Ayurvedic/botanical-heavy/natural-marketed cleansers)
================================================================================
For herbal-positioned cleansers, the output must include the following section:
HERBAL / ORGANIC REALISM
Evaluate:
• Evidence quality
• Traditional support
• Rinse-off realism
• Botanical authenticity
• Essential oil burden
• Herbal marketing honesty
• Genuine vs gimmick positioning
This section must remain:
• Evidence-based
• Balanced
• Anti-hype
• Anti-fear
• Scientifically grounded
Do NOT:
• Blindly glorify herbal systems
• Blindly dismiss herbal systems
Evaluate structurally and contextually.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 CLEANSER PROFILE

## Functional Classification

Short cleanser classification.

Examples:
- Gentle Daily Cleanser
- Balanced Syndet Cleanser
- Harsh Foam Cleanser

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering surfactant mildness, barrier friendliness, pH compatibility, long-term skin behavior, and overall formulation balance.

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

## Cleanser + Barrier Analysis

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

## Immediate

- Cleansing feel
- Tightness or hydration
- Irritation signals

## Medium-Term

- Barrier response
- Dryness and oiliness changes
- Tolerance development

## Long-Term

- Barrier stability
- Dryness progression
- Microbiome stability
- Overall skin outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleansing system, barrier behavior, irritation risk, active performance, and long-term skin outcome.

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
- Structural weakness overrides cosmetic feel
- Surfactant harshness tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Rinse-off active efficacy must be classified before Effectiveness scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-wash tightness = structural failure signal
- Foam richness ≠ cleansing power
- Natural soap ≠ safe (pH 9–10 is structurally harmful)
- Fragrance freshness ≠ skin health benefit
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Face Wash Evaluation Algorithm — Structured for surfactant mildness analysis, barrier preservation realism, and long-term repeated-use skin compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict clinical face wash structural evaluation engine."
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