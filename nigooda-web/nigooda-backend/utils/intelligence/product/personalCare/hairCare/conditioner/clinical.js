
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

    /*
    =================================================
    MAIN PROMPT
    =================================================
    */

    const prompt = `

================================================
HAIR CONDITIONER EVALUATION ALGORITHM — V1.0

LAYER 0 — FOUNDATION ENGINE

SYSTEM OBJECTIVE

Reward conditioners that demonstrate:

• Effective detangling and manageability without excessive buildup
• Appropriate conditioning agent architecture
• Cuticle sealing and fiber integrity preservation
• Appropriate pH compatibility for hair shaft and scalp
• Long-term fiber and scalp microbiome compatibility
• Evidence-based formulation design
• Low cumulative irritation and sensitization risk

Mandatory penalties apply for:

• Heavy silicone loading without wash-out consideration
• Fragrance-driven "conditioning" perception
• Decorative botanical and protein loading beyond functional concentrations
• Harsh quaternary ammonium systems at high concentration
• Leave-on active inflation in rinse-off systems
• Marketing-driven sensory engineering (slip, shine) over structural fiber care

Basic conditioning alone cannot achieve high scores.

---

TRANSPARENCY PRIORITY RULE

Ignore:

• Branding and luxury positioning
• Slip and softness sensation alone
• Fragrance freshness or "clean hair" perception
• "Natural/organic" marketing
• Trend-driven active loading (keratin, collagen inflation)
• Ingredient-count inflation

Evaluate only:

• Conditioning efficiency vs fiber/scalp cost
• Conditioning agent harshness and buildup profile
• pH compatibility with hair shaft
• Post-rinse hair and scalp impact
• Repeated-use tolerance and buildup trajectory
• Scalp microbiome stability
• Structural formulation honesty

Any conditioner format (rinse-out, leave-in, co-wash, deep treatment, lightweight spray) receives credibility only when conditioning balance and fiber integrity are demonstrated.

---

GLOBAL ENFORCEMENT RULES

• Conditioning agent architecture is the dominant conditioner structure
• Safety penalties override functional bonuses
• Rinse-off actives cannot compensate for buildup-prone or scalp-irritating systems
• Late-position ingredients cannot neutralize structural problems
• Slip and softness ≠ fiber health
• Fragrance freshness ≠ scalp health
• Post-use scalp greasiness or itch = compatibility failure signal
• Excessive cationic surfactant loading without substantivity consideration reduces credibility
• Non-physiological pH reduces safety and cuticle preservation
• Protein inflation must be penalized in rinse-off systems

---

STRUCTURE DOMINANCE RULE

Primary conditioner architecture determines:

• Cuticle sealing efficacy
• Fiber lipid restoration
• Buildup trajectory
• Scalp microbiome stability
• Long-term detangling performance
• Repeated-use safety
• pH impact on hair shaft

Minor additives, decorative botanicals, and rinse-off actives cannot override a problematic conditioning backbone.

Ingredient evaluation must consider:

• Conditioning agent tier
• Rinse-off concentration realism
• Formulation pH
• Functional relevance
• Repeated-use buildup exposure

---

RINSE-OFF CONTEXT RULE

Rinse-out conditioners have limited contact time (~1–5 minutes). Active ingredients must be evaluated accordingly.

FULL CREDIT:
• Cationic conditioning agents (BTMS, Behentrimonium Chloride)
• Fatty alcohols (Cetyl, Cetearyl) as emollient/conditioner
• Dimethicone (coating function delivered during contact)
• Low-molecular-weight hydrolyzed proteins (substantivity demonstrated)

PARTIAL CREDIT:
• Panthenol
• Glycerin
• Niacinamide
• Biotin (topical relevance limited)

DECORATIVE / MINIMAL CREDIT:
• Vitamin C
• Retinoids
• Collagen (high MW, non-substantive in rinse-off)
• Hyaluronic Acid (limited substantivity to hair shaft)
• Most antioxidant botanicals
• Keratin (high MW forms rinse off before binding)

Actives requiring prolonged skin or fiber contact must not receive full efficacy credit in rinse-off systems.

Decorative active marketing reduces:
• Ingredient Quality
• Formulation Honesty

---

LATE-INGREDIENT LIMIT RULE

Late-position ingredients may provide:
• Minor conditioning
• Mild soothing (scalp)
• Sensory enhancement (slip, fragrance)
• Temporary cosmetic comfort

They cannot offset:
• Heavy silicone buildup architectures
• Scalp-clogging formulation excess
• High cationic load without rinse-out design
• Fragrance-heavy sensitization burden
• Scalp microbiome disruption from antimicrobials

---

BASIC CONDITIONING LIMIT RULE

Basic detangling alone cannot achieve high structural scores.

Simplistic fatty alcohol-only or single-quaternary systems lacking:
• Cuticle pH consideration
• Buildup management
• Scalp compatibility

receive moderate score ceilings regardless of conditioning ability.

---

LAYER 1 — CONDITIONING AGENT HARSHNESS AND BUILDUP TIER SYSTEM

MANDATORY RULE:
All conditioning agents must be classified by irritation and buildup tier before scoring.

Conditioning agent structure is the primary determinant of:
• Scalp irritation
• Fiber buildup trajectory
• Cuticle sealing effectiveness
• Scalp follicle occlusion risk
• Long-term manageability degradation

Cationic conditioning agents are generally more scalp-irritating at high concentration.
Fatty alcohol-dominant, ester-based, and lightweight quaternary systems demonstrate superior scalp compatibility.

---

CONDITIONING AGENT TIER TABLE

TIER 1 — HIGH BUILDUP / HIGH IRRITATION RISK

Examples:
• Non-water-soluble silicones at high concentration (Dimethicone >5%, Cyclopentasiloxane >5%, Dimethiconol dominant)
• BTAC (Behentrimonium Chloride) >2% (scalp-depositing)
• Mineral oil (occlusive buildup)
• Petrolatum (heavy occlusion)
• High-concentration wax systems (Carnauba, Beeswax dominant)

Characteristics:
• Significant scalp follicle buildup risk
• Requires clarifying shampoo to remove
• Long-term manageability decline
• High scalp occlusion potential

Scoring Impact:
• Mandatory Safety/Buildup penalties
• Scalp Compatibility ceiling reduction
• High Cumulative Buildup Risk

---

TIER 2 — MODERATE BUILDUP / MODERATE IRRITATION

Examples:
• Cetrimonium Chloride (high concentration)
• Water-soluble silicones (Dimethicone Copolyol) at high levels
• Stearalkonium Chloride (high concentration)
• Non-cyclomethicone silicones at moderate loading

Characteristics:
• Moderate buildup potential
• Rinse-dependent tolerance
• Blend-dependent scalp tolerance

Scoring Impact:
• Moderate Buildup penalties
• Improved tolerance when blended with Tier 3–4 systems
• Moderate Scalp Compatibility ceiling

---

TIER 3 — LOW BUILDUP / WELL-TOLERATED

Examples:
• BTMS-25 / BTMS-50 (Behentrimonium Methosulfate)
• Cetyl Alcohol (emollient conditioning)
• Cetearyl Alcohol (emollient conditioning)
• Stearyl Alcohol
• Conditioning esters (Cetearyl Ethylhexanoate, C12-15 Alkyl Benzoate)
• Low-concentration Cyclopentasiloxane (<2%, volatile)

Characteristics:
• Low buildup trajectory
• Good scalp compatibility
• Widely tolerated with repeated use

Scoring Impact:
• Eligible for good Scalp Compatibility scores
• Strong compatibility with Tier 4 systems

---

TIER 4 — MINIMAL BUILDUP / IDEAL

Examples:
• Panthenol (functional humectant conditioning)
• Hydrolyzed Proteins (low MW substantive forms)
• Cationic Guar (Guar Hydroxypropyltrimonium Chloride — low concentration)
• Polyquaternium-10, -7 (lightweight film conditioning)
• Amino acid blends (Arginine, Glutamic Acid at functional levels)
• Water-soluble conditioning polymers at low concentration

Characteristics:
• Minimal buildup
• Lowest scalp occlusion potential
• Strongest long-term compatibility

Scoring Impact:
• Eligible for maximum Scalp Compatibility scores
• Transparency bonus eligible

---

CONDITIONING AGENT SYSTEM RULE

Primary conditioning agent determines system buildup and irritation risk.
Blending modifies but does not eliminate buildup potential.

SYSTEM CLASSIFICATION:

• Tier 1 alone → Severe Buildup
• Tier 1 + Tier 3/4 → Moderate-High Buildup
• Tier 2 alone → Moderate Buildup
• Tier 2 + Tier 3/4 → Moderate-Low Buildup
• Tier 3/4 dominant → Low Buildup
• Tier 4 dominant → Minimal Buildup

Additional Rules:
• Heavy silicone-dominant systems cannot qualify as "scalp-safe" regardless of botanical additions
• Tier 3–4 systems receive Scalp Compatibility credit
• Co-wash systems require stricter scalp safety evaluation due to cleansing-conditioning dual role

---

LAYER 2 — CONDITIONER pH RULE

pH is a mandatory scoring modifier affecting:
• Hair shaft cuticle sealing
• Frizz control efficiency
• Color retention (for treated hair)
• Scalp microbiome stability
• Protein bonding efficacy

Physiological scalp pH: 4.5–5.5
Optimal hair shaft conditioning pH: 3.5–5.5

High-pH conditioners increase:
• Cuticle swelling
• Fiber damage accumulation
• Frizz and porosity
• Protein bond disruption

Alkaline conditioners (pH >7) receive major penalties.

---

pH SCORING TIERS

3.5–5.5
• Optimal for hair shaft
• Cuticle Sealing bonus
• Scalp Microbiome bonus

5.5–6.5
• Acceptable
• Neutral scoring

6.5–7.5
• Mild penalty

7.5–9.0
• Moderate penalty

>9.0
• Significant penalty
• Elite Cuticle Preservation disqualified

Unknown pH:
• No bonus
• Minor credibility reduction

pH penalties apply regardless of conditioning agent gentleness.

A mild conditioning system at alkaline pH still receives cuticle penalties.

---

LAYER 3 — RINSE-OFF ACTIVE EFFICACY

Active ingredients must be evaluated based on rinse-off exposure time and hair substantivity.

CATEGORY A — HIGH EFFICACY (FULL CREDIT)

• Behentrimonium Methosulfate (BTMS) — conditioning
• Cetyl/Cetearyl Alcohol — emollient conditioning
• Dimethicone (volatile + coating at functional levels)
• Low-MW Hydrolyzed Proteins (substantive to hair cuticle)
• Cationic Guar (substantive film deposition)
• Polyquaternium-10, -7

Characteristics:
• Functional in short-contact conditioning systems
• Demonstrate substantivity to damaged hair fiber

Scoring:
• Full effectiveness credit

---

CATEGORY B — PARTIAL EFFICACY

• Panthenol (some substantivity)
• Glycerin (limited residual)
• Niacinamide (limited hair shaft effect)
• High-MW Hydrolyzed Proteins (limited penetration)
• Biotin (limited topical evidence)

Characteristics:
• Limited post-rinse benefit demonstrated

Scoring:
• Partial effectiveness credit

---

CATEGORY C — DECORATIVE / LOW EFFICACY

• Vitamin C
• Retinoids
• Collagen (high MW)
• Hyaluronic Acid
• Most antioxidant botanicals
• Keratin (high MW — limited rinse-off penetration)
• Argan Oil, Coconut Oil (functional at high % only; decorative at <1%)

Characteristics:
• Require prolonged contact time or high concentration for benefit
• Minimal rinse-off hair shaft functionality at typical formulation levels

Scoring:
• No major effectiveness credit
• Marketing-heavy usage triggers:
  - Ingredient Quality penalty
  - Formulation Honesty penalty

---

ACTIVE SCORING RULE

• Category A → Full functional credit
• Category B → Reduced credit
• Category C → Decorative unless strong substantivity data exists

---

LAYER 4 — SCALP MICROBIOME IMPACT RULE

SCALP MICROBIOME COMPATIBILITY MODIFIER

The conditioner must be evaluated for long-term scalp microbiome stability.

High scalp microbiome disruption risk:
• Heavy silicone occlusion (follicular environment disruption)
• Broad-spectrum antimicrobials at high levels (Piroctone Olamine, Zinc Pyrithione dominant without balance)
• High cationic surfactant load (Tier 1 cationic agents)
• High alcohol systems (denatured alcohol >5% in rinse-out)
• High-pH systems disrupting scalp acid mantle

Low scalp microbiome disruption risk:
• Tier 3–4 conditioning systems at physiological pH
• Targeted anti-dandruff actives at functional concentrations
• Prebiotic/postbiotic scalp support ingredients
• Lightweight low-buildup systems

Application Rules:
• Primarily modifies:
  - Scalp Microbiome Compatibility
  - Long-Term Scalp Compatibility
• Reinforces existing conditioning agent and pH penalties
• Not a standalone dominant penalty

---

LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no conditioning, cuticle, or long-term hair/scalp benefit and increase unnecessary sensitization burden.

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
"Contains decorative synthetic colorants adding unnecessary sensitization burden."

---

LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 FOR EVERY RULE

---

SAFETY [DOMINANT]

Evaluates:
• Conditioning agent scalp irritation risk
• Follicular occlusion risk
• Repeated-use buildup burden
• Sensitization potential
• pH-related hair and scalp stress
• Cumulative inflammatory/sensitization load
• Long-term tolerance trajectory

Core Rules:
• Repeated low-grade scalp irritation reduces Safety
• Daily-use frequency magnifies sensitization and buildup burden
• Heavy silicone/cationic penalties reflect chronic follicular stress, not acute toxicity
• Safety overrides:
  - Slip and softness perception
  - Fragrance freshness
  - Luxury positioning
  - Short-term cosmetic feel

---

EFFECTIVENESS

Core Question:
Can the conditioner effectively condition while maintaining fiber integrity and scalp stability under repeated use?

Evaluates:
• Detangling performance
• Cuticle sealing
• Fiber damage repair (where substantiated)
• Rinse-off active efficacy
• Conditioning-to-buildup balance
• pH suitability
• Repeated-use functionality
• Structural formulation honesty

High effectiveness requires:
• Adequate conditioning without progressive buildup
• Evidence-supported rinse-off actives
• Buildup-considerate conditioning design
• Functional pH range

Rules:
• Basic detangling alone cannot achieve elite effectiveness
• Rinse-off active inflation cannot receive full credit
• Ignore:
  - Marketing claims
  - Slip and shine perception
  - Fragrance freshness
  - Luxury positioning

---

ALLERGY RISK

Evaluates:
• Fragrance exposure
• Essential oil sensitizers
• Preservative sensitizers
• Botanical allergens (proteins, pollens)
• Cationic surfactant scalp sensitization potential
• Repeated-use trigger accumulation

Application Rules:
• Rinse-off fragrance risk is lower than leave-on products but still relevant under repeated scalp exposure
• Fragrance-heavy conditioners receive Allergy Risk penalties
• Leave-in conditioners receive higher allergy risk weighting than rinse-out
• Frequency of scalp/skin exposure is prioritized over short contact duration

---

ECO IMPACT

Evaluates:
• Conditioning agent biodegradability
• Silicone environmental persistence
• Microplastic and synthetic polymer load
• Ecological accumulation risk
• Unnecessary formulation burden
• Direct rinse-off environmental load

General Rules:
• Natural ester and amino acid conditioning agents receive ecological preference
• Persistent silicones and synthetic polymers reduce score
• Biodegradable cationic agents preferred over persistent quaternary systems

---

INGREDIENT QUALITY

Evaluates:
• Conditioning system coherence
• Rinse-off active honesty
• Conditioning agent / pH balance
• Functional ingredient synergy
• Structural transparency
• Absence of decorative inflation

Rules:
• Decorative active stacking (collagen, keratin inflation) reduces quality credibility
• Non-functional botanical loading reduces transparency
• Rinse-off actives must justify functional relevance
• Protein/keratin inflation in rinse-off systems reduces credibility

---

SKIN AND SCALP COMPATIBILITY

Evaluates:
• Daily-use scalp tolerance
• Follicular resilience
• Post-wash scalp dryness or greasiness
• Dandruff / seborrheic dermatitis compatibility
• Scalp microbiome stability
• Long-term tolerance development
• Cumulative sensitization risk

Core Rules:
• Temporary softness does not equal scalp compatibility
• Shine and slip satisfaction does not equal fiber compatibility
• Long-term repeated-use behavior is prioritized over immediate cosmetic feel

---

CORE SCORE FORMULA

Core Score =
(
 Safety × 0.25 +
 Effectiveness × 0.20 +
 Allergy Risk × 0.15 +
 Eco Impact × 0.10 +
 Ingredient Quality × 0.15 +
 Skin and Scalp Compatibility × 0.15
)

---

LAYER 6 — SPECIALIZED CONDITIONER PERFORMANCE

Evaluates real-world repeated-use conditioner behavior.
Score Range: 1.0 → 5.0

---

DETANGLING EFFICIENCY

Evaluates:
• Wet detangling performance
• Dry manageability post-use
• Fiber alignment support
• Frizz reduction
• Styling compatibility

Core Rules:
• Slip alone does not equal conditioning quality
• Excessive conditioning leading to limp, greasy hair reduces score
• pH-optimized detangling preferred over silicone-heavy slip
• Lightweight systems may outperform heavy silicone systems in repeated-use manageability

CEILING RULE:
Tier 1 heavy-buildup systems cannot achieve maximum Detangling Efficiency regardless of initial slip performance. Buildup-related manageability decline must be factored.

---

CUTICLE PRESERVATION [DOMINANT]

Evaluates:
• Cuticle sealing effectiveness
• pH-mediated cuticle closure
• Porosity management
• Acid mantle recovery (scalp)
• Repeated-use fiber resilience
• Long-term fiber integrity

CUTICLE PRESERVATION CEILINGS

• Tier 1 dominant → Max 2.0
• Tier 1 + Tier 3/4 → Max 2.8
• Tier 2 dominant → Max 3.2
• Tier 2 + Tier 3/4 → Max 3.7
• Tier 3/4 dominant → Max 4.3
• Tier 3/4 at pH 3.5–5.5 → Eligible for 5.0
• Tier 3/4 at pH 5.5–7.5 → Reduced ceiling
• Alkaline systems (pH >7) → Hard ceiling 2.0

Core Rules:
• Post-use frizz and tangles = cuticle stress signal
• High scores require:
  - Appropriate conditioning agents
  - Acidic to neutral pH
  - Low repeated buildup stress
• Heavy silicone/cationic-dominant systems cannot achieve elite Cuticle Preservation
• Cuticle Preservation is the dominant conditioner performance parameter

---

MOISTURE AND HYDRATION SUPPORT

Evaluates:
• Residual humectant benefit to hair shaft
• Post-wash moisture retention
• Reduction of hygral fatigue risk
• Avoidance of excessive hygroscopic overload

Core Rules:
• Hydration in conditioners is inherently limited for rinse-out formats
• Reduced hygral fatigue is considered hydration success
• Conditioners cannot replicate deep treatment function in a rinse-out system
• Humectants cannot fully offset cuticle damage from Tier 1 systems

---

RESIDUAL BUILDUP RISK

Evaluates:
• Post-wash scalp heaviness and greasiness
• Follicular buildup trajectory
• Long-term manageability decline
• pH-mediated scalp dehydration
• Waxy or silicone film accumulation

Core Rules:
• Repeated buildup indicates structural scalp-compatibility stress
• Tier 1 silicone/cationic systems increase long-term residue accumulation
• Chronic buildup progression must influence scoring
• Clarifying shampoo dependence = buildup architecture failure

---

SCALP MICROBIOME COMPATIBILITY

Evaluates:
• Commensal scalp microbiome preservation
• pH-mediated microbial stability
• Conditioning agent occlusion risk
• Antimicrobial selectivity (for anti-dandruff formulas)
• Long-term scalp microbiome balance

Core Rules:
• Routine scalp microbiome disruption reduces score
• Broad-spectrum antimicrobial systems without balanced conditioning receive penalties
• Targeted anti-dandruff actives (Zinc Pyrithione, Piroctone Olamine, Selenium Sulfide) receive contextual credit when scalp microbiome disruption is limited
• Heavy follicular occluders reduce microbiome compatibility

---

CUMULATIVE IRRITATION RISK

Evaluates:
• Repeated conditioning agent scalp exposure
• Fragrance accumulation (especially in leave-in formats)
• Essential oil scalp sensitization
• Preservative sensitization
• Chronic scalp inflammatory burden
• pH-mediated scalp irritation
• Frequency-weighted exposure

Core Rules:
• Daily/every-other-day exposure amplifies scalp sensitization burden
• Mild irritants become clinically significant under repeated scalp exposure
• Long-term low-grade scalp irritation is prioritized over isolated acute reactions
• Leave-in conditioners receive higher cumulative risk weight than rinse-out

---

FORMULATION HONESTY

Evaluates:
• Slip-dependent conditioning perception
• Fragrance-driven "nourished hair" positioning
• Decorative botanical and protein loading
• Rinse-off active inflation (keratin, collagen)
• Ingredient-list inflation
• Sensory-first marketing architecture
• Aggressive "repair/restore" claims without functional evidence

Core Rules:
• Consumer slip perception cannot replace structural formulation quality
• Fragrance richness does not equal conditioning performance
• Dermatological and trichological outcome overrides sensory satisfaction

---

SPECIALIZED CALCULATION

Specialized Performance Score =
Average of all 7 specialized scores

Dominant Parameters:
• Cuticle Preservation → primary interpretive parameter
• Cumulative Irritation Risk → primary penalty parameter
• Residual Buildup Risk → secondary penalty parameter (unique to conditioners)

All penalties must reflect:
• Realistic contact time
• Usage frequency
• Evidence-supported trichological relevance

---

LAYER 7 — FINAL RATING FORMULA

Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)

Core and Specialized scores carry equal weight.

This prevents:
• Marketing-driven performance inflation
• Safe-but-ineffective scoring inflation
• Conditioning-but-scalp-damaging inflation

---

HIGH SCORE ELIGIBILITY (>4.0)

Requires:
• Tier 3 or Tier 4 dominant conditioning system
• pH ≤ 6.5 (preferably 3.5–5.5)
• Cuticle Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No rinse-off active inflation (keratin/collagen marketing)
• No dominant fragrance or essential oil loading
• Formulation Honesty ≥ 3.5
• No unjustified heavy silicone or cationic dominance

DISQUALIFIERS:
• Primary heavy non-water-soluble silicone systems (buildup-dominant)
• Alkaline pH systems (pH >7)
• Heavy cationic surfactant loading on scalp-contact products
• Decorative Category C active marketing (keratin, collagen, hyaluronic acid inflation)
• Excessive artificial fragrance or colorant loading

---

LAYER 7.5 — REAL-WORLD USAGE SIMULATION

Simulate:
• Hair wash frequency (every 1–3 days typical)
• Buildup accumulation trajectory
• Recovery cycles between washes
• Long-term fiber integrity and porosity changes
• Post-wash pH recovery (cuticle)
• Long-term scalp microbiome stability
• Repeated fragrance/preservative sensitization trajectory

Core Question:
Can the conditioner remain effective and scalp-tolerable under long-term real-world use without requiring clarifying intervention?

Core Rules:
• Post-use scalp heaviness = buildup architecture failure
• Post-use frizz recurrence = cuticle stress signal
• Slip and shine perception ≠ conditioning quality
• Long-term repeated-use behavior overrides short-term sensory satisfaction
• Clarifying shampoo dependence = formulation architecture failure

---

ANTI-MARKETING FILTER

Mandatory penalties apply for:

• Slip-first conditioning claims
• Fragrance-driven "nourished/repaired" positioning
• Decorative botanical and protein loading (keratin, collagen at sub-functional levels)
• Aggressive "repair/restore/bond" claims lacking functional evidence
• Rinse-off active inflation (hyaluronic acid, vitamin C, retinol)
• Essential oil hair treatment marketing without evidence
• "Microbiome/scalp-balancing" claims lacking pH or conditioning agent support
• "Zero silicone" claims marketed as inherently superior without addressing actual conditioning architecture

---

BIAS NEUTRALIZATION FILTER

Neutralize:
• Slip = conditioning quality illusion
• Fragrance = hair health illusion
• "Natural conditioner = safe" bias
• Botanical protein inflation bias
• Luxury texture and "rich cream" bias
• Keratin/collagen treatment halo
• Rinse-off active halo
• Ingredient-count quality illusion
• Greasy/heavy = moisturizing illusion
• "Silicone-free = better" bias (mild silicones may outperform harsh alternatives)
• Foam in co-wash = cleansing quality illusion

---

HAIR TYPE AND POROSITY ADJUSTMENT MODULE

Hair porosity and type significantly modify conditioning needs and buildup risk.

LOW POROSITY HAIR
• Highly susceptible to product buildup
• Heavy conditioning agents (Tier 1) worsen manageability faster
• Lightweight systems (Tier 4) preferred
• Deep conditioning benefit limited without heat
• Score adjustment: Buildup risk scores weighted more heavily

NORMAL / MEDIUM POROSITY HAIR
• Baseline scoring applies without adjustment
• Balanced Tier 3/4 systems optimal

HIGH POROSITY HAIR (damaged, color-treated, chemically processed)
• Greater need for cuticle-sealing conditioning
• Benefits from slightly heavier Tier 3 agents
• pH optimization critical (low pH seals open cuticle)
• Protein substantivity more clinically relevant
• Score adjustment: Cuticle Preservation weighted more heavily

FINE HAIR
• Highest buildup susceptibility
• Tier 1 heavy systems cause rapid limpness and greasiness
• Lightweight Tier 3/4 preferred
• Score adjustment: Buildup Risk penalties amplified

THICK / COARSE HAIR
• More tolerant of Tier 2–3 heavier conditioning
• May underperform with Tier 4-only lightweight systems
• Score adjustment: Moderate buildup tolerance adjustment

EVALUATOR NOTE:
Apply porosity and type adjustments to Skin/Scalp Compatibility, Residual Buildup Risk, and Detangling Efficiency only.
Core structural scoring remains architecture-based.

---

OUTPUT FORMAT

⭐ FINAL RATING
X.X / 5 — Rating Level

⚖ STRUCTURAL QUALITY

Short simple summary covering:
• Conditioning agent mildness and buildup profile
• Cuticle and fiber friendliness
• pH compatibility
• Long-term scalp and hair behavior
• Overall formulation balance

---

🧴 CONDITIONER PROFILE

Short conditioner classification.

Examples:
• Lightweight Daily Conditioner
• Balanced BTMS Rinse-Out Conditioner
• Heavy Silicone-Loaded Conditioner
• Scalp-Safe Low-Buildup Conditioner
• Deep Conditioning Treatment

---

📊 CORE SCORES (GIVE SHORT STRUCTURAL REASON FOR EVERY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED)

Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin and Scalp Compatibility — ⭐X.X

---

🧪 SPECIALIZED PERFORMANCE
(GIVE SHORT STRUCTURAL REASON FOR EVERY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED)

Detangling Efficiency — ⭐X.X
Cuticle Preservation — ⭐X.X
Moisture and Hydration Support — ⭐X.X
Residual Buildup Risk — ⭐X.X
Scalp Microbiome Compatibility — ⭐X.X
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

👤 HAIR TYPE COMPATIBILITY

Fine Hair — ⭐X.X
Thick / Coarse Hair — ⭐X.X
Curly / Textured Hair — ⭐X.X
Color-Treated Hair — ⭐X.X
Damaged / High-Porosity Hair — ⭐X.X
Low-Porosity Hair — ⭐X.X
Oily Scalp — ⭐X.X
Dry Scalp / Scalp-Sensitive — ⭐X.X

---

📅 LONG-TERM USABILITY

Daily Use — ⭐X.X
Every Other Day — ⭐X.X
Occasional / Weekly Use — ⭐X.X

---

⏱ EXPECTED RESULTS

Immediate:
• Conditioning feel
• Detangling / slip
• Scalp irritation signals

Medium-Term:
• Buildup trajectory
• Manageability changes
• Scalp tolerance development

Long-Term:
• Cuticle stability
• Buildup progression / clarifying needs
• Scalp microbiome stability
• Overall hair and scalp outcome

---

🔬 KEY STRUCTURAL INGREDIENTS

List only major ingredients affecting:
• Conditioning system
• Cuticle behavior
• Scalp irritation / buildup risk
• Active performance
• Long-term hair and scalp outcome

---

🧠 WHY THIS RATING

3–5 concise user-friendly evidence-based statements

---

⚠ STRICT OUTPUT RULES

NO MEDICAL CLAIMS ANYWHERE
No marketing influence on scoring
Mention harsh colorants, preservatives, fragrances, and buildup-risk ingredients in output
No slip-volume bias
Structural weakness overrides cosmetic feel
Conditioning agent harshness and buildup tier MUST be classified before scoring
pH compatibility MUST be assessed for all formulations
Rinse-off active efficacy MUST be classified before Effectiveness scoring
Repeated-use behavior > single-use feel
Long-term outcome > immediate sensation
Post-use scalp heaviness = buildup architecture failure, not "deep conditioning feeling"
Slip and shine ≠ fiber health
Natural conditioner ≠ safe (heavy occlusive naturals can cause significant follicular buildup)
Fragrance freshness ≠ hair health benefit
Silicone-free ≠ automatically superior (formulation architecture matters)
Keratin and collagen in rinse-off = largely decorative without strong substantivity evidence
Heavy buildup systems cannot achieve elite Cuticle Preservation scores

================================================

================================================

































================================================

INGREDIENTS

${ingredients.join(", ")}

`;

    /*
    =================================================
    OPENAI REQUEST
    =================================================
    */

    const response =
      await openai.chat.completions.create({

        model: "gpt-5.4-mini",

        temperature: 0.2,

        messages: [

          {
            role: "system",

            content:
              "You are a strict haircare formulation evaluation engine."
          },

          {
            role: "user",

            content:
              prompt
          }

        ]

      });

    /*
    =================================================
    TOKEN LOG
    =================================================
    */

    console.log(
      "CONDITIONER TOKEN USAGE:",
      response.usage
    );

    /*
    =================================================
    GET RESPONSE
    =================================================
    */

    const content =
      response
        .choices?.[0]
        ?.message?.content;

    /*
    =================================================
    EMPTY RESPONSE CHECK
    =================================================
    */

    if (!content) {

      throw new Error(
        "Empty AI response"
      );

    }

    /*
    =================================================
    RETURN MARKDOWN RESPONSE
    =================================================
    */

    return content;

  }

}

module.exports =
new ClinicalEngine();
