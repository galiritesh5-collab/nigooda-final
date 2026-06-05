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

================================================
SHAMPOO / HAIR CLEANSER EVALUATION ALGORITHM — V1.0

════════════════════════════════════════════════════════════

LAYER 0 — FOUNDATION ENGINE

SYSTEM OBJECTIVE

Reward shampoos that demonstrate:

• Effective scalp and hair cleansing with minimal scalp barrier disruption
• Appropriate surfactant architecture for scalp and fiber contact
• Scalp barrier preservation under repeated use
• Physiological scalp pH compatibility (4.5–5.5)
• Long-term scalp microbiome compatibility
• Evidence-based formulation design
• Low cumulative irritation and sensitization risk
• Hair fiber integrity preservation
• Honest active ingredient use (anti-dandruff, scalp actives)

Mandatory penalties apply for:

• Foam-first cleansing architecture marketed as performance
• Fragrance-driven "clean hair" perception engineering
• Decorative botanical loading
• Harsh surfactant systems marketed as "deep cleansing" or "clarifying"
• Leave-on active inflation in rinse-off systems
• Silicone buildup systems masking underlying damage
• Marketing-driven sensory engineering over structural balance
• Aggressive antimicrobial systems without scalp justification

Basic hair cleansing alone cannot achieve high scores.

---

TRANSPARENCY PRIORITY RULE

Ignore:

• Branding and luxury positioning
• Foam lather richness
• Fragrance freshness and "clean hair" perception
• "Natural/organic/botanical" marketing
• Trend-driven active loading (keratin, biotin, caffeine, collagen)
• Ingredient-count inflation
• Salon/professional positioning
• Silicone-driven slip and cosmetic feel

Evaluate only:

• Cleansing efficiency vs scalp barrier cost
• Surfactant harshness profile (scalp and fiber contact)
• pH compatibility with scalp acid mantle
• Post-wash scalp and hair impact
• Repeated-use tolerance
• Scalp microbiome stability
• Hair fiber cuticle integrity
• Structural formulation honesty

Any shampoo format (syndet bar, liquid, co-wash, micellar, clarifying) receives credibility only when cleansing balance, scalp health, and fiber integrity are demonstrated.

---

GLOBAL ENFORCEMENT RULES

• Surfactant architecture is the dominant shampoo structure
• Safety penalties override functional bonuses
• Rinse-off actives cannot compensate for harsh surfactant systems
• Late-position ingredients cannot neutralize structural harshness
• Foam ≠ cleansing effectiveness
• Fragrance freshness ≠ scalp health
• Post-wash scalp tightness / dryness = barrier disruption signal
• Post-wash hair squeakiness = cuticle damage signal
• Silicone masking of underlying damage must be identified and penalized
• Excess antimicrobial activity without scalp condition justification reduces credibility
• Non-physiological pH reduces Safety and Barrier Preservation
• Rinse-off active inflation must be penalized
• Protein overload risk in certain hair types must be evaluated contextually

---

STRUCTURE DOMINANCE RULE

Primary shampoo surfactant architecture determines:

• Scalp barrier disruption
• Scalp lipid depletion
• Scalp recovery speed
• Scalp microbiome stability
• Hair cuticle swelling and protein loss
• Long-term tolerance
• Repeated-use safety
• pH impact on scalp acid mantle

Minor additives, decorative botanicals, and rinse-off actives cannot override a harsh surfactant backbone.

Ingredient evaluation must consider:

• Surfactant tier
• Rinse-off concentration realism
• Formulation pH
• Functional relevance to scalp vs hair fiber
• Repeated-use scalp exposure
• Silicone type and buildup potential

---

RINSE-OFF CONTEXT RULE

Shampoos have limited scalp contact time (~60–120 seconds). Active ingredients must be evaluated accordingly.

FULL CREDIT (Scalp Actives):
• Zinc Pyrithione
• Ketoconazole
• Selenium Sulfide
• Piroctone Olamine
• Salicylic Acid (scalp exfoliation)
• Ciclopirox
• Coal Tar

PARTIAL CREDIT:
• Glycerin
• Panthenol
• Niacinamide
• Zinc derivatives (non-dandruff)
• Urea

DECORATIVE / MINIMAL CREDIT:
• Biotin
• Caffeine (topical)
• Keratin (rinse-off)
• Collagen
• Hyaluronic Acid
• Vitamin C
• Retinoids
• Most antioxidant botanicals
• Peptides

Actives requiring prolonged scalp or fiber contact cannot receive full efficacy credit in rinse-off systems.

Decorative active marketing reduces:
• Ingredient Quality
• Formulation Honesty

---

LATE-INGREDIENT LIMIT RULE

Late-position ingredients may provide:
• Minor conditioning
• Mild scalp soothing
• Sensory enhancement
• Temporary cosmetic fiber feel

They cannot offset:
• Harsh surfactant systems
• High-pH formulations
• Soap-dominant architecture
• Repeated SLS/SLES scalp barrier stress
• Fragrance-heavy irritation burden

---

BASIC CLEANSING LIMIT RULE

Basic dirt and sebum removal alone cannot achieve high structural scores.

Soap-based or simplistic surfactant systems lacking:
• Scalp barrier consideration
• pH optimization
• Microbiome compatibility
• Hair fiber integrity consideration

receive moderate score ceilings regardless of cleansing ability.

---

════════════════════════════════════════════════════════════

LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM

MANDATORY RULE:
All surfactants must be classified by harshness tier before scoring.

Shampoo surfactant structure is the primary determinant of:
• Scalp barrier disruption
• Scalp TEWL increase
• Scalp lipid depletion
• Scalp protein denaturation
• Hair cuticle swelling
• Hair protein loss (especially from chemically treated or porous hair)
• Long-term scalp and fiber tolerance

Note: Shampoo surfactants affect BOTH scalp skin AND hair fiber simultaneously. Harshness tier must account for both surfaces.

Anionic surfactants are generally harsher on both scalp and fiber.
Amphoteric, nonionic, amino acid, and glucoside systems demonstrate superior scalp and fiber compatibility.

---

SURFACTANT TIER TABLE

TIER 1 — HARSH

Examples:
• SLS (Sodium Lauryl Sulfate)
• SLES (primary surfactant — Sodium Laureth Sulfate)
• ALS (Ammonium Lauryl Sulfate)
• ALES (Ammonium Laureth Sulfate) — primary use
• Sodium C14-16 Olefin Sulfonate
• Traditional soap/saponified oil systems (pH ≥9)
• TEA-Lauryl Sulfate

Characteristics:
• High TEWL increase on scalp
• Significant scalp barrier disruption
• Scalp lipid and NMF depletion
• High hair cuticle swelling
• High protein loss from chemically treated/porous hair
• Irritation potential on sensitive scalps
• Microbiome disruption at repeated use

Scoring Impact:
• Mandatory Safety penalties
• Barrier Preservation ceiling reduction
• High Cumulative Irritation Risk
• Hair Fiber Integrity penalties

---

TIER 2 — MODERATE

Examples:
• SCI (Sodium Cocoyl Isethionate)
• Sodium Lauroyl Methyl Isethionate
• Disodium Laureth Sulfosuccinate
• SLES in blended systems with Tier 3/4 support
• Sodium Lauryl Sulfoacetate (SLSA — note: less harsh than SLS)

Characteristics:
• Moderate scalp barrier disruption
• Lower cuticle swelling than Tier 1
• Blend-dependent tolerance
• Improved scalp compatibility vs. Tier 1

Scoring Impact:
• Moderate Safety penalties
• Improved tolerance when combined with Tier 3–4 systems
• Moderate Barrier Preservation ceiling

---

TIER 3 — MILD

Examples:
• CAPB (Cocamidopropyl Betaine)
• Lauryl Betaine
• Sodium Cocoamphoacetate
• Disodium Cocoamphodiacetate
• Sodium Cocoyl Glycinate
• Sodium Cocoyl Apple Amino Acids
• Sodium Lauroamphoacetate

Characteristics:
• Low TEWL disruption on scalp
• Good scalp barrier compatibility
• Minimal cuticle swelling
• Widely tolerated on diverse hair types

Note:
CAPB sensitization risk affects Allergy Risk, not Safety tier.

Scoring Impact:
• Eligible for good Barrier Preservation
• Strong compatibility with Tier 4 systems
• Preferred secondary/co-surfactant in gentle formulations

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
• Sodium Cocoyl Methyl Alaninate (Amisoft)
• Sodium Cocoyl Taurate
• Amino acid/glucoside blends

Characteristics:
• Minimal scalp barrier disruption
• Lowest cuticle swelling
• Lowest protein extraction from hair fiber
• Strongest scalp and hair compatibility
• Biodegradability advantage

Scoring Impact:
• Eligible for maximum Barrier Preservation
• Transparency bonus eligible
• Preferred primary surfactant in gentle/scalp-sensitive shampoos

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
• High-foam Tier 1 systems cannot qualify as "gentle" or "scalp-safe"
• Tier 3–4 syndet systems receive Scalp Barrier Preservation credit
• Co-wash systems (conditioner-only washing) must be evaluated separately for cleansing adequacy
• Clarifying shampoos with Tier 1 architecture receive explicit high-frequency use penalties

---

════════════════════════════════════════════════════════════

LAYER 2 — SHAMPOO pH RULE

pH is a mandatory scoring modifier affecting:
• Scalp acid mantle integrity
• Scalp microbiome stability
• Scalp enzymatic balance (serine proteases)
• Hair cuticle swelling and porosity
• Antimicrobial peptide function
• Seborrheic dermatitis / dandruff risk modulation

Physiological scalp pH: 4.5–5.5

HAIR FIBER NOTE:
Hair cuticle swells significantly above pH 6.5. High-pH shampoos open the cuticle, increasing protein loss, frizz, tangling, and mechanical damage risk during wet combing.

High-pH shampoos increase:
• Scalp TEWL
• Scalp protease overactivity
• Cuticle lifting and protein leaching
• Scalp microbiome imbalance
• Dandruff / irritant dermatitis risk

Soap systems (pH 9–10) receive major penalties on both scalp and fiber dimensions.

---

pH SCORING TIERS

4.5–5.5
• Optimal for scalp and hair cuticle
• Full Barrier Preservation bonus
• Microbiome bonus
• Hair Fiber Integrity bonus

5.5–6.5
• Acceptable
• Minor cuticle impact
• Neutral-to-slight scoring reduction

6.5–7.5
• Mild scalp penalty
• Moderate cuticle swelling risk
• Hair Fiber Integrity reduced

7.5–9.0
• Moderate scalp penalty
• High cuticle damage risk
• Significant Hair Fiber Integrity reduction

>9.0
• Significant scalp and fiber penalty
• Elite Barrier Preservation disqualified
• Soap-range: structural failure for repeated use

Unknown pH:
• No bonus
• Minor credibility reduction

pH penalties apply regardless of surfactant gentleness.
A mild Tier 4 surfactant system at pH 8.0 still receives barrier and fiber penalties.

---

════════════════════════════════════════════════════════════

LAYER 3 — RINSE-OFF ACTIVE EFFICACY (SHAMPOO)

Active ingredients must be evaluated based on rinse-off scalp exposure time and evidence base.

CATEGORY A — HIGH EFFICACY (FULL CREDIT)

Anti-dandruff / scalp condition actives:
• Zinc Pyrithione (ZPT) — antifungal / antibacterial, substantive to scalp
• Ketoconazole — potent antifungal, dose-dependent efficacy
• Selenium Sulfide — antifungal + antiseborrheic
• Piroctone Olamine — antifungal, good scalp substantivity
• Ciclopirox Olamine — broad-spectrum antifungal
• Coal Tar — anti-proliferative, anti-inflammatory
• Salicylic Acid — keratolytic / scalp exfoliation

Characteristics:
• Substantive to scalp or scalp surface during rinse-off
• Evidence base for scalp conditions
• Functional at realistic shampoo concentrations

Scoring:
• Full effectiveness credit for target scalp conditions

---

CATEGORY B — PARTIAL EFFICACY

• Glycerin — minor humectant benefit
• Panthenol — minor scalp soothing, minor fiber coating
• Niacinamide — partial scalp barrier support
• Urea — mild keratolytic at sufficient concentration
• Tea Tree Oil — mild antimicrobial (concentration-dependent; allergy risk noted)
• Piroctone Olamine at low concentration — reduced category B
• Zinc (non-ZPT forms) — sebum regulation support

Scoring:
• Partial effectiveness credit

---

CATEGORY C — DECORATIVE / LOW EFFICACY

• Biotin — no evidence for topical rinse-off hair growth benefit
• Caffeine — insufficient rinse-off contact for follicular benefit
• Keratin (hydrolyzed, rinse-off) — minimal fiber penetration in shampoo; partial credit only in conditioner leave-on
• Collagen — decorative
• Hyaluronic Acid — decorative in rinse-off
• Vitamin C — decorative
• Retinoids — decorative in rinse-off
• Peptides — decorative in rinse-off
• Most antioxidant botanicals — decorative
• Argan oil, coconut oil (rinse-off, shampoo concentration) — cosmetic slip only

Scoring:
• No major effectiveness credit
• Marketing-heavy Category C stacking triggers:
  - Ingredient Quality penalty
  - Formulation Honesty penalty

---

ACTIVE SCORING RULE

• Category A → Full functional credit for target condition
• Category B → Reduced credit
• Category C → Decorative unless strong substantivity evidence exists
• Misrepresenting Category C actives as performance drivers is penalized under Formulation Honesty

---

════════════════════════════════════════════════════════════

LAYER 4 — SCALP MICROBIOME IMPACT RULE

MICROBIOME COMPATIBILITY MODIFIER

The shampoo must be evaluated for long-term scalp microbiome stability.

Scalp microbiome context:
The scalp hosts a specific lipophilic microbiome (Malassezia-dominant, Staphylococcus epidermidis, Cutibacterium acnes) in a sebum-rich environment. Disruption of this balance drives dandruff, seborrheic dermatitis, scalp inflammation, and secondary infection risk.

High microbiome disruption risk:
• High-pH systems (>7.5)
• Broad-spectrum antimicrobials without scalp condition indication
  - Triclosan
  - Chlorhexidine
  - Benzalkonium chloride
• SLS-dominant surfactant systems
• High alcohol systems (>5% denatured alcohol)
• Aggressive essential oil antimicrobial stacking without evidence

Low microbiome disruption risk:
• Tier 3–4 surfactant systems at physiological pH
• Targeted antifungals (ZPT, ketoconazole, piroctone) — disruption is justified for dandruff/seborrheic dermatitis
• Prebiotic / postbiotic support ingredients at functional concentrations

Application Rules:
• Primarily modifies:
  - Microbiome Compatibility
  - Long-Term Scalp Compatibility
• Reinforces existing surfactant and pH penalties
• Targeted antifungal use is context-credited, not penalized when scalp condition is indicated

---

════════════════════════════════════════════════════════════

LAYER 4.5 — SILICONE EVALUATION RULE

Silicones are widely used in shampoos for slip, detangling, shine, and fiber coating. Evaluation must distinguish between functional and problematic silicone use.

SILICONE TYPE CLASSIFICATION

WATER-SOLUBLE / NON-BUILDUP:
• PEG-modified silicones (Dimethicone Copolyol, PEG-7 Dimethicone)
• Low molecular weight cyclics (Cyclomethicone) — largely rinse-off

Characteristics:
• Rinse-off cleanly
• Minimal buildup potential
• Lower concern in shampoo systems

INSOLUBLE / BUILDUP-POTENTIAL:
• Dimethicone (high molecular weight)
• Amodimethicone (cationic, substantive — functional for damaged hair; moderate buildup)
• Bis-Aminopropyl Dimethicone
• Cyclopentasiloxane (D5 — environmental concern)
• Phenyl Trimethicone

Characteristics:
• Progressive buildup on hair fiber with repeated use
• May mask underlying damage rather than addressing it
• Requires chelating/clarifying shampoo to remove fully

SCORING RULES:

• Insoluble silicone in primary shampoo (non-clarifying) → moderate Formulation Honesty concern
• Silicone stacking (multiple insoluble types) → Ingredient Quality penalty
• Silicone masking of harsh surfactant system → Formulation Honesty penalty
• Amodimethicone in damage-targeted shampoo → partial credit (functional justification)
• Water-soluble silicones → neutral to minor positive scoring

CONTEXTUAL RULE:
Silicone use in a harsh (Tier 1) surfactant shampoo that claims "nourishing" or "moisturizing" positioning = structural dishonesty. The silicone is masking the stripping behavior of the surfactant system, not repairing it.

---

════════════════════════════════════════════════════════════

LAYER 4.6 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no cleansing, scalp, or hair benefit and increase unnecessary irritation burden.

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

---

════════════════════════════════════════════════════════════

LAYER 4.7 — HAIR FIBER INTEGRITY RULE

Shampoos contact hair fiber during lathering and rinsing. Fiber impact must be evaluated independently from scalp impact.

FIBER DAMAGE MECHANISMS:

• Surfactant cuticle swelling → mechanical damage during wet combing
• Protein extraction → weakening of cortex (especially in chemically treated hair)
• High pH → cuticle lifting, static, frizz, porosity increase
• Repeated stripping → cumulative protein loss
• Chelating agents (EDTA) at high concentration → mineral stripping (minor)

HAIR TYPE VULNERABILITY RANKING (HIGHEST RISK FIRST):

1. Chemically bleached / highlighted hair — highest protein loss risk
2. Relaxed / permed / chemically processed hair — compromised cuticle
3. Coily / Type 4 hair — high natural porosity, prone to moisture/protein loss
4. Curly / Type 3 hair — elevated porosity vs. straight hair
5. Fine/thin hair — minimal fiber mass, damage accumulates faster
6. Color-treated (non-bleached) — moderate vulnerability
7. Normal/healthy straight hair — lowest vulnerability

FIBER INTEGRITY SCORING MODIFIERS:

• Tier 1 surfactant → Hair Fiber Integrity penalized
• pH >6.5 → Hair Fiber Integrity penalized
• Mild surfactant + physiological pH → Hair Fiber Integrity credited
• Hydrolyzed protein (leave-on or long-contact) → partial fiber credit
• Cationic conditioning agents (quaternium, guar) → minor cuticle smoothing credit in rinse-off

---

════════════════════════════════════════════════════════════

LAYER 5 — CORE SCORING SYSTEM

Score range: 1.0 → 5.0 FOR EVERY RULE

---

SAFETY [DOMINANT]

Evaluates:
• Surfactant harshness on scalp and fiber
• Scalp barrier disruption risk
• Repeated-use irritation burden
• Sensitization potential (fragrance, CAPB, preservatives)
• pH-related scalp barrier stress
• Cumulative inflammatory load
• Long-term scalp tolerance trajectory
• Anti-dandruff active safety profile (where applicable)

Core Rules:
• Repeated low-grade scalp irritation reduces Safety
• Daily-use frequency magnifies irritation burden
• SLS/soap penalties reflect chronic scalp barrier stress, not acute toxicity
• Safety overrides:
  - Foam perception
  - Fragrance freshness
  - Luxury/salon positioning
  - Short-term cosmetic feel

---

EFFECTIVENESS

Core Question:
Can the shampoo effectively cleanse scalp and hair while maintaining scalp stability and fiber integrity under repeated use?

Evaluates:
• Sebum/dirt/product buildup removal
• Scalp cleansing vs scalp stripping balance
• Anti-dandruff active efficacy (where present)
• Rinse-off active real-world functional credit
• Cleansing-to-barrier balance
• pH suitability for scalp and fiber
• Repeated-use scalp functionality
• Structural formulation honesty

High effectiveness requires:
• Adequate cleansing without excessive scalp stripping
• Evidence-supported actives where targeted claims exist
• Barrier-considerate surfactant design
• Functional pH range for scalp
• Honest anti-dandruff active concentrations

Rules:
• Basic sebum removal alone cannot achieve elite effectiveness
• Rinse-off active inflation (biotin, caffeine, keratin) cannot receive full credit
• Silicone masking of cleansing performance is penalized
• Ignore:
  - Marketing claims
  - Foam perception
  - Fragrance freshness
  - Luxury/salon positioning

---

ALLERGY RISK

Evaluates:
• Fragrance exposure (scalp is more absorptive than hair fiber)
• Essential oil sensitizers
• Preservative sensitizers (methylisothiazolinone, DMDM hydantoin, parabens)
• CAPB sensitization potential (contact dermatitis risk)
• Botanical allergens
• Repeated-use trigger accumulation on scalp
• Anti-dandruff active tolerance (rare sensitization to ZPT, ketoconazole)

Application Rules:
• Scalp has higher absorption potential than hair shaft — scalp contact allergy risk is elevated vs body wash
• Fragrance-heavy shampoos receive Allergy Risk penalties
• Frequency of exposure (daily/alternate day) is prioritized
• Preservative systems must be evaluated for scalp sensitization potential

---

ECO IMPACT

Evaluates:
• Surfactant biodegradability
• Silicone environmental persistence (D5 Cyclopentasiloxane — restricted in EU wash-off products)
• Microplastics / synthetic polymer particles
• Environmental persistence of antimicrobial actives (ZPT aquatic toxicity)
• Unnecessary formulation burden
• Direct rinse-off environmental load

General Rules:
• Glucoside and amino acid surfactants receive ecological preference
• D5 silicone (Cyclopentasiloxane) receives specific eco penalty
• ZPT aquatic toxicity must be noted under anti-dandruff shampoos
• Persistent preservatives/antimicrobials reduce score

---

INGREDIENT QUALITY

Evaluates:
• Surfactant system coherence for scalp and fiber
• Rinse-off active honesty (biotin, caffeine, keratin claims)
• Surfactant/pH balance logic
• Functional ingredient synergy
• Silicone type appropriateness
• Absence of decorative active inflation
• Structural transparency

Rules:
• Decorative active stacking (biotin + caffeine + keratin + collagen) reduces quality credibility
• Non-functional botanical loading reduces transparency
• Rinse-off actives must justify functional relevance
• Silicone masking of harsh surfactant = quality penalty

---

SKIN COMPATIBILITY (SCALP COMPATIBILITY)

Evaluates:
• Daily-use scalp tolerance
• Scalp barrier resilience
• Post-wash scalp tightness/dryness/itch
• Dandruff/seborrheic dermatitis compatibility
• Scalp microbiome stability
• Long-term scalp tolerance development
• Cumulative sensitization risk
• Sensitive scalp suitability

Core Rules:
• Temporary cosmetic hair feel does not equal scalp compatibility
• Foam satisfaction does not equal scalp health
• Long-term repeated-use scalp behavior is prioritized over immediate cosmetic feel
• Post-wash scalp tightness = barrier stress signal, not "clean scalp" feeling

---

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

---

════════════════════════════════════════════════════════════

LAYER 6 — SPECIALIZED SHAMPOO PERFORMANCE

Evaluates real-world repeated-use shampoo behavior on scalp and hair fiber.
Score Range: 1.0 → 5.0

---

CLEANSING EFFICIENCY

Evaluates:
• Sebum and scalp oil removal
• Dirt and pollutant removal
• Product buildup removal (dry shampoo, styling product residue, silicone buildup)
• Scalp cell debris and flake removal
• Anti-dandruff efficacy (where applicable)

Core Rules:
• Balanced scalp cleansing is preferred over aggressive stripping
• Foam volume does not determine cleansing quality
• Micellar and low-foam systems may outperform harsh foaming systems
• Excessive scalp stripping (sebum over-removal) reduces score — drives rebound oiliness
• Clarifying shampoos receive cleansing credit but frequency penalties

CEILING RULE:
Tier 1 surfactant systems cannot achieve maximum Cleansing Efficiency regardless of raw cleansing power. Overstripping ≠ clean scalp.

---

SCALP BARRIER PRESERVATION [DOMINANT]

Evaluates:
• Scalp TEWL disruption risk
• Scalp lipid (ceramide, fatty acid) preservation
• Scalp barrier recovery speed post-wash
• pH-related acid mantle recovery
• Repeated-use scalp resilience
• Long-term scalp lipid depletion risk
• Sebum rebound (over-stripping drives excess sebum production)

BARRIER CEILINGS

• Tier 1 dominant → Max 2.0
• Tier 1 + Tier 3/4 → Max 2.8
• Tier 2 dominant → Max 3.2
• Tier 2 + Tier 3/4 → Max 3.7
• Tier 3/4 dominant → Max 4.3
• Tier 3/4 at pH 4.5–5.5 → Eligible for 5.0
• Tier 3/4 at pH 5.5–7.5 → Reduced ceiling
• Soap systems (pH >9) → Hard ceiling 2.0

Core Rules:
• Post-wash scalp tightness = scalp barrier stress
• High scores require:
  - Mild surfactants
  - Physiological pH (4.5–5.5)
  - Low repeated scalp barrier stress
• Soap/SLS-dominant systems cannot achieve elite Scalp Barrier Preservation
• Scalp Barrier Preservation is the dominant shampoo performance parameter

---

HAIR FIBER INTEGRITY

Evaluates:
• Cuticle lifting and swelling risk
• Protein loss potential (especially in chemically treated or porous hair)
• Wet combing damage risk
• Frizz / static generation potential
• Post-wash hair breakage risk
• Fiber structural preservation under repeated washing
• Shine preservation vs surfactant stripping

Core Rules:
• Squeaky post-wash hair feel = cuticle disruption signal
• Harsh surfactants + high pH = compounding fiber damage
• Conditioning agents in shampoo provide partial but limited protection
• Silicone masking cannot substitute for genuine fiber protection
• Chemically treated hair requires higher fiber integrity consideration

HAIR FIBER CEILINGS:
• Tier 1 dominant at pH >6.5 → Max 2.0
• Tier 1 + Tier 3/4 at moderate pH → Max 2.8
• Tier 2 + Tier 3/4 at pH 4.5–6.5 → Max 3.7
• Tier 3/4 at pH 4.5–5.5 → Eligible for 5.0

---

SCALP HYDRATION SUPPORT

Evaluates:
• Residual humectant benefit on scalp skin
• Post-wash scalp moisture retention
• Reduction of scalp dehydration potential
• Avoidance of excessive scalp lipid stripping

Core Rules:
• Hydration in shampoos is inherently limited (rinse-off contact)
• Reduced scalp dehydration is considered hydration success
• Shampoos cannot replicate scalp moisturizer / scalp serum function
• Humectants (glycerin, panthenol) cannot fully offset Tier 1 scalp stripping

---

RESIDUAL DRYNESS RISK

Evaluates:
• Post-wash scalp tightness and dryness
• Hair fiber post-wash dryness (moisture stripped from cortex)
• Scalp lipid depletion trajectory
• Long-term scalp and hair dryness accumulation
• pH-mediated scalp dehydration
• NMF depletion risk on scalp
• Sebum rebound potential

Core Rules:
• Repeated scalp tightness indicates structural barrier stress
• Tier 1 surfactants increase long-term scalp NMF depletion risk
• Chronic dryness progression must influence scoring
• Over-cleansed scalp drives compensatory sebum rebound — creating a cycle of oiliness that worsens with frequent washing

---

SCALP MICROBIOME COMPATIBILITY

Evaluates:
• Malassezia / commensal yeast balance preservation
• pH-mediated scalp microbial stability
• Surfactant disruption of scalp microbiome
• Antimicrobial selectivity vs broad-spectrum disruption
• Long-term scalp microbiome balance

Core Rules:
• Routine scalp microbiome disruption reduces score
• Broad-spectrum antimicrobial systems without scalp condition indication receive penalties
• Targeted antifungals (ZPT, ketoconazole, piroctone) receive contextual credit when microbiome imbalance is the target condition
• High-pH systems promote Malassezia overgrowth risk (alkaline shift favors pathogenic organisms)

---

CUMULATIVE IRRITATION RISK

Evaluates:
• Repeated surfactant scalp exposure
• Fragrance accumulation on scalp skin
• Essential oil scalp exposure
• Preservative sensitization potential
• Chronic scalp inflammatory burden
• pH-mediated scalp irritation stress
• Frequency-weighted scalp exposure

Core Rules:
• Daily / alternate-day exposure amplifies scalp irritation burden
• Mild scalp irritants become clinically significant under repeated use
• Long-term low-grade scalp inflammation is prioritized over isolated acute reactions
• Scalp has higher absorption than hair fiber — cumulative scalp exposure is more concerning than equivalent body wash use

---

FORMULATION HONESTY

Evaluates:
• Foam-dependent cleansing perception
• Fragrance-driven "salon fresh" sensory positioning
• Decorative botanical and active loading (biotin, caffeine, keratin, collagen)
• Rinse-off active inflation (Category C actives marketed as primary benefits)
• Silicone cosmetic masking of underlying surfactant harshness
• Ingredient-list inflation
• Aggressive "strengthening / repairing / growth-boosting" marketing
• "Microbiome / scalp balancing" claims lacking surfactant or pH structural support

Core Rules:
• Consumer perception cannot replace structural formulation quality
• Foam richness does not equal cleansing performance
• Dermatological and trichological outcome overrides sensory satisfaction
• Silicone-generated cosmetic feel is not fiber repair

---

SPECIALIZED CALCULATION

Specialized Performance Score =
Average of all 7 specialized scores:

1. Cleansing Efficiency
2. Scalp Barrier Preservation
3. Hair Fiber Integrity
4. Scalp Hydration Support
5. Residual Dryness Risk
6. Scalp Microbiome Compatibility
7. Cumulative Irritation Risk
8. Formulation Honesty

(8 parameters — average of all 8)

Dominant Parameters:
• Scalp Barrier Preservation → primary interpretive parameter
• Cumulative Irritation Risk → primary penalty parameter
• Hair Fiber Integrity → secondary interpretive parameter

All penalties must reflect:
• Realistic scalp contact time
• Scalp vs hair fiber distinction
• Usage frequency
• Evidence-supported trichological and dermatological relevance

---

════════════════════════════════════════════════════════════

LAYER 7 — FINAL RATING FORMULA

Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)

Core and Specialized scores carry equal weight.

This prevents:
• Marketing-driven performance inflation
• Safe-but-ineffective scoring inflation
• Effective-but-scalp-damaging inflation
• Silicone-masked cosmetic feel inflation

---

HIGH SCORE ELIGIBILITY (>4.0)

Requires:
• Tier 3 or Tier 4 dominant surfactant system
• pH ≤ 6.5 (preferably 4.5–5.5)
• Scalp Barrier Preservation ≥ 3.5
• Hair Fiber Integrity ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No rinse-off active inflation (no biotin/caffeine/keratin primary claims)
• No dominant fragrance/essential oil loading
• Formulation Honesty ≥ 3.5
• No unjustified broad-spectrum antimicrobial dominance
• No insoluble silicone masking of harsh surfactant system

DISQUALIFIERS:
• Primary SLS/ALS systems
• Soap pH systems (>9.0)
• Heavy fragrance loading
• Decorative Category C active marketing as primary benefit
• Cyclopentasiloxane (D5) dominant silicone system

---

════════════════════════════════════════════════════════════

LAYER 7.5 — REAL-WORLD USAGE SIMULATION

Simulate:
• Daily or alternate-day shampooing frequency
• Scalp barrier stress accumulation
• Scalp recovery cycles between washes
• Long-term scalp lipid / NMF depletion
• Sebum rebound cycle under over-washing
• Post-wash scalp pH recovery time
• Long-term scalp microbiome stability
• Repeated fragrance / preservative scalp sensitization
• Hair fiber cumulative protein loss
• Silicone buildup progression (where applicable)

Core Question:
Can the shampoo remain tolerable and genuinely beneficial for scalp and hair under long-term real-world use?

Core Rules:
• Post-wash scalp tightness = scalp barrier stress signal
• Post-wash hair squeakiness = cuticle damage signal
• Foam perception ≠ cleansing quality
• Silicone-generated cosmetic feel ≠ fiber health
• Long-term repeated-use behavior overrides short-term sensory satisfaction
• Sebum rebound from over-stripping = formulation failure signal

---

ANTI-MARKETING FILTER

Mandatory penalties apply for:

• Foam-first cleansing claims
• Fragrance-driven "freshness" or "salon" positioning
• Biotin, caffeine, keratin, collagen as primary performance claims
• Aggressive "hair growth / anti-hair loss" claims without substantiated actives
• "Deep cleansing" claims based on harsh surfactant architecture
• Rinse-off active inflation
• Essential oil marketing without functional scalp evidence
• "Microbiome / scalp balancing" claims lacking pH or surfactant structural support
• "Strengthening / repairing" claims relying on silicone masking
• Anti-dandruff claims without Category A active presence

---

BIAS NEUTRALIZATION FILTER

Neutralize:
• Foam = cleansing illusion
• Fragrance = clean hair illusion
• "Natural soap = safe" bias (pH 9–10 is structurally harmful to scalp and fiber)
• Botanical inflation bias
• Silicone slip = healthy hair bias
• Luxury texture bias
• Antibacterial scalp health halo
• Rinse-off active (biotin, caffeine) performance halo
• Ingredient-count quality illusion
• Squeaky-clean = healthy scalp illusion (squeaky = cuticle disruption)
• Salon/professional positioning = efficacy bias

---

════════════════════════════════════════════════════════════

OUTPUT FORMAT

⭐ FINAL RATING
X.X / 5 — Rating Level

⚖ STRUCTURAL QUALITY

Short simple summary covering:
• Surfactant mildness
• Scalp barrier friendliness
• Hair fiber integrity
• pH compatibility
• Long-term scalp and hair behavior
• Overall formulation balance

---

🧴 SHAMPOO PROFILE

Short shampoo classification.

Examples:
• Gentle Daily Scalp Shampoo
• Balanced Anti-Dandruff Shampoo
• Harsh High-Foam Clarifying Shampoo
• Moderate Syndet Shampoo
• Silicone-Masked Damage Shampoo
• Co-Wash / Low-Poo System
• Targeted Scalp Treatment Shampoo

---

📊 CORE SCORES
(GIVE SHORT STRUCTURAL REASON FOR EVERY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED)

Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X

---

🧪 SPECIALIZED PERFORMANCE
(GIVE SHORT STRUCTURAL REASON FOR EVERY SCORING RULE IN EASY LANGUAGE AND MENTION WHY IT SCORED)

Cleansing Efficiency — ⭐X.X
Scalp Barrier Preservation — ⭐X.X
Hair Fiber Integrity — ⭐X.X
Scalp Hydration Support — ⭐X.X
Residual Dryness Risk — ⭐X.X
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

Fine / Thin Hair — ⭐X.X
Thick / Coarse Hair — ⭐X.X
Curly / Coily Hair — ⭐X.X
Color-Treated Hair — ⭐X.X
Chemically Processed Hair — ⭐X.X
Oily Scalp — ⭐X.X
Dry / Sensitive Scalp — ⭐X.X
Dandruff / Seborrheic Dermatitis Scalp — ⭐X.X
Normal Hair / Scalp — ⭐X.X

---

📅 LONG-TERM USABILITY

Daily Use — ⭐X.X
Alternate-Day Use — ⭐X.X
2–3× Weekly Use — ⭐X.X
Occasional / Clarifying Use — ⭐X.X

---

⏱ EXPECTED RESULTS

Immediate:
• Cleansing feel (scalp and hair)
• Scalp tightness / comfort post-wash
• Hair feel post-wash (smooth vs squeaky)
• Lather and rinse behavior

Medium-Term:
• Scalp barrier response
• Scalp oiliness / dryness changes
• Sebum rebound (if over-stripping)
• Hair fiber condition change
• Dandruff/scalp condition response (if applicable)

Long-Term:
• Scalp barrier stability
• Chronic dryness or oiliness progression
• Scalp microbiome stability
• Hair fiber integrity under repeated washing
• Overall scalp and hair outcome

---

🔬 KEY STRUCTURAL INGREDIENTS

List only major ingredients affecting:
• Cleansing system (surfactants)
• Scalp barrier behavior
• Hair fiber integrity
• Irritation risk
• Active performance (anti-dandruff, scalp exfoliation)
• Silicone type and buildup potential
• Long-term scalp and hair outcome

---

🧠 WHY THIS RATING

3–5 concise user-friendly evidence-based reasons explaining the final score.

---

════════════════════════════════════════════════════════════

⚠ STRICT OUTPUT RULES

NO MEDICAL CLAIMS ANYWHERE
No marketing influence on scoring
Mention harsh colorants, preservatives, fragrances in output
No foam-volume bias
Surfactant harshness tier MUST be classified before scoring
pH compatibility MUST be assessed for both scalp AND hair fiber
Rinse-off active efficacy MUST be classified before Effectiveness scoring
Silicone type MUST be classified before Ingredient Quality scoring
Repeated-use behavior > single-use feel
Long-term outcome > immediate sensation
Post-wash scalp tightness = structural failure signal, not "clean feeling"
Post-wash hair squeakiness = cuticle damage signal, not "clean hair"
Foam richness ≠ cleansing power
Natural soap ≠ safe (pH 9–10 is structurally harmful to both scalp and fiber)
Fragrance freshness ≠ scalp health benefit
Silicone slip ≠ hair fiber health
Sebum rebound = over-stripping signal
Biotin / caffeine / keratin in rinse-off = decorative unless proven otherwise
Anti-dandruff claims require Category A active confirmation

================================================
END OF ALGORITHM — V1.0
================================================
















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
              "You are a strict haircare formulation evaluation engine."
          },

          {
            role: "user",

            content:
              prompt
          }

        ]

      });

    console.log(
      "HAIRCARE TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();