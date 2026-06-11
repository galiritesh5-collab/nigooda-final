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
        "HAIR OIL ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
HAIR OIL EVALUATION ALGORITHM — V1.0
================================================================================
CRITICAL CATEGORY NOTE — READ BEFORE SCORING ANY PRODUCT
================================================================================
Hair oils are a fundamentally different category from serums, cleansers, and
leave-on synthetic treatments. The algorithm must reflect this reality:
• Pure single oils (e.g., 100% Argan Oil, 100% Castor Oil) are complete
  products by design. They are not penalized for lacking synthetic additives,
  preservatives, or active complexes.
• Natural oil blends are evaluated on oil quality, composition harmony,
  and suitability for their stated purpose.
• Formulated hair oils (oil base + actives + additives) are evaluated with
  the same honesty standard as serums — they claim more, so they must
  deliver more.
• Mineral oil and petroleum-derived oils are evaluated on their own
  evidence base — not reflexively penalized for being synthetic, but
  assessed honestly for penetration capacity and long-term fiber behavior.
THE TRUST RULE:
If a product is honestly what it claims to be (a pure oil, a traditional
blend, a carrier oil), it must be scored on what it IS — not penalized for
what it ISN'T. Structural honesty is REWARDED, not punished.
The algorithm must never penalize a product for being "just oil." Pure oils
delivering real benefit at low risk are EXACTLY what high scores should
reward.
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hair oils that demonstrate:
• Genuine fiber or scalp benefit matched to oil molecular profile
• Honest product classification (pure oil vs blend vs formulated)
• Appropriate penetration depth for intended use
• Low follicle-loading risk relative to use pattern
• Scalp and fiber microbiome compatibility
• Transparent ingredient architecture
• Low cumulative irritation and sensitization risk under repeated use
Mandatory penalties apply for:
• Mineral oil systems marketed as "nourishing" or "penetrating" treatments
• Fragrance-heavy oil blends with sensitizing essential oil loading
• Decorative botanical or vitamin inflation in oil bases
• Follicle-clogging oils used as scalp treatments without disclosure
• Pure coating/occlusive systems sold as "repair" or "growth" treatments
• Marketing-driven claims (growth, regrowth, follicle restoration) without
  substantiated actives
Basic occlusive coating alone cannot achieve high scores.
Pure, well-matched, honestly positioned oils CAN achieve top scores.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Exotic origin marketing ("Moroccan," "Ethiopian," "100-Year-Old Recipe")
• Cold-pressed / organic / artisanal positioning (credit the quality, not the label)
• Trend-driven oil loading (adding 12 oils for marketing breadth)
• Ingredient-count inflation
• Luxury packaging
Evaluate only:
• Oil molecular profile and penetration realism
• Scalp follicle load vs intended use zone
• Comedogenic risk relative to use pattern
• Blend composition coherence
• Formulation honesty
• Sensitization risk from essential oil loading
• Long-term fiber and scalp outcome
---
GLOBAL ENFORCEMENT RULES
• Oil molecular profile is the dominant structural parameter
• Safety penalties override cosmetic bonuses
• Occlusive coating oils cannot claim penetrating treatment benefit
• Late-position ingredients cannot neutralize follicle-clogging primary oils
• Shine ≠ fiber health
• Fragrance freshness ≠ scalp health
• Heavy scalp-applied oils without penetration capacity = follicle load signal
• Non-physiological scalp pH (for formulated oils) reduces safety
• Decorative active inflation must be penalized
• Pure oils must never be penalized for lacking synthetic additives
---
STRUCTURE DOMINANCE RULE
Primary oil architecture determines:
• Fiber penetration depth
• Scalp follicle impact
• Comedogenic profile
• Cuticle interaction
• Microbiome compatibility
• Long-term fiber strength trajectory
• Buildup and residue pattern
Minor additives, decorative botanicals, and fragrance components
cannot override a comedogenic or follicle-loading primary oil base.
Ingredient evaluation must consider:
• Oil fatty acid profile (penetrating vs coating)
• Molecular weight and chain length
• Scalp vs fiber application zone
• Comedogenic score relative to use pattern
• Repeated-use exposure and accumulation
---
LAYER 1 — OIL MOLECULAR PROFILE AND PENETRATION TIER SYSTEM
MANDATORY RULE:
All oils must be classified by penetration tier before scoring.
Penetration capacity is determined by:
• Fatty acid chain length
• Degree of saturation
• Molecular weight
• Structural affinity for hair keratin
This is the most important structural parameter for hair oils.
---
OIL PENETRATION TIER TABLE
TIER 1 — PENETRATING OILS
(Reach cortex or near-cortex level; structurally integrate with hair fiber)
Primary Mechanism: Lipid integration with cortex CMC structure
Key Examples:
• Coconut Oil (Lauric Acid dominant — highest penetration evidence)
• Argan Oil (Oleic/Linoleic dominant — moderate penetration)
• Marula Oil (Oleic dominant — good penetration)
• Baobab Oil (Oleic/Linoleic/Linolenic — good penetration)
• Olive Oil (Oleic dominant — good penetration, heavier feel)
• Avocado Oil (Oleic dominant — moderate penetration)
• Sweet Almond Oil (Oleic/Linoleic — moderate penetration)
• Sunflower Oil (Linoleic dominant — lighter penetration)
• Grapeseed Oil (Linoleic dominant — light, good penetration)
Characteristics:
• Reduce protein loss from fiber
• Improve tensile strength over time
• Lower TEWL from fiber surface
• Most beneficial for dry, porous, color-treated hair
Scoring Impact:
• Eligible for maximum Fiber Integrity scores
• Full Active Delivery credit
• Formulation Honesty bonus for honest positioning
PENETRATION NOTE:
Not all Tier 1 oils penetrate equally. Coconut Oil (Lauric Acid) has the
strongest clinical penetration evidence. Oleic-dominant oils penetrate
moderately. Linoleic-dominant oils are lighter and more surface-active.
Score should reflect specific oil's penetration depth, not just Tier 1 membership.
---
TIER 2 — SEMI-PENETRATING / SURFACE-ACTIVE OILS
(Reach cuticle layer; provide surface conditioning and moisture sealing
without significant cortex integration)
Primary Mechanism: Cuticle layer interaction and surface coating
Key Examples:
• Jojoba Oil (technically a wax ester — exceptional surface compatibility,
  minimal penetration but outstanding scalp mimicry)
• Rosehip Oil (Linoleic/Linolenic — lightweight surface conditioning)
• Hemp Seed Oil (Linoleic/Alpha-Linolenic — surface conditioning)
• Sea Buckthorn Oil (highly pigmented — must flag for color transfer)
• Tamanu Oil (semi-penetrating, scalp-compatible)
Characteristics:
• Smooth cuticle surface
• Reduce frizz and static
• Seal surface moisture
• Good scalp compatibility
• Do not significantly reduce protein loss
Scoring Impact:
• Eligible for good Fiber Integrity scores (not maximum)
• Partial Active Delivery credit
• Jojoba receives special Scalp Compatibility bonus due to sebum mimicry
---
TIER 3 — COATING / OCCLUSIVE OILS
(Surface coating only; do not penetrate fiber; create gloss and slip
but do not structurally benefit fiber)
Primary Mechanism: Surface occlusion and gloss
Key Examples:
• Castor Oil (Ricinoleic Acid dominant — heavy, coating, high viscosity)
• Mineral Oil (petroleum-derived — surface coating, no penetration)
• Petroleum / Petrolatum (heavy occlusive)
• Canola Oil (moderate-heavy coating)
• Shea Butter (semi-solid, occlusive)
Characteristics:
• Strong gloss and slip
• Heavy feel
• Buildup risk under repeated use
• No fiber cortex benefit
• Castor Oil: high comedogenic risk on scalp; may occlude follicles
• Mineral Oil: inert, not harmful, but coating only — honest positioning required
Scoring Impact:
• Cannot achieve maximum Fiber Integrity scores
• Limited Active Delivery credit
• Mineral Oil receives no penetration credit
• Castor Oil on scalp receives follicle-loading flag
• Formulation Honesty penalty if marketed as "penetrating" or "nourishing"
MINERAL OIL SPECIAL RULE:
Mineral Oil is not penalized for safety risks beyond its coating limitation.
It is not carcinogenic, not harmful in hair application, and is well-tolerated.
It IS penalized only when marketed as a penetrating or nourishing treatment.
Honest use as a coating/gloss agent receives no safety penalty.
---
TIER 4 — SPECIALTY / ACTIVE OILS
(Oils with targeted bioactive profiles — evaluated individually)
Key Examples:
• Black Seed Oil (Nigella Sativa) — anti-inflammatory, scalp-targeted
• Pumpkin Seed Oil — scalp-targeted, some follicle research
• Rosemary Oil (essential oil — must be flagged separately, see Layer 4.5)
• Tea Tree Oil (essential oil — antimicrobial, sensitization risk)
• Neem Oil (strong antimicrobial — sensitization and scent flag)
• Emu Oil (Tier 1-comparable penetration — animal-derived, flag)
Scoring Impact:
• Evaluated individually on evidence quality
• Scalp-targeted actives receive full credit at appropriate concentration
• Essential oils within this tier evaluated under Layer 4.5
• Overclaiming penalized per anti-marketing filter
---
OIL SYSTEM RULE
Primary oil determines system character.
Blending modifies but does not eliminate the dominant oil's behavior.
SYSTEM CLASSIFICATION:
• Tier 1 dominant → Penetrating / Structural Benefit
• Tier 1 + Tier 2 → Penetrating + Surface Conditioning
• Tier 2 dominant → Surface Conditioning / Cuticle Smoothing
• Tier 3 dominant → Coating / Gloss
• Tier 1 + Tier 3 → Penetrating benefit diluted by coating burden
• Tier 4 → Specialty / Context-Dependent
Additional Rules:
• A blend of 8 oils where 6 are Tier 3 is classified as Tier 3 dominant
• Marketing "superfood oil blends" with low penetrating oil percentage
  receive Formulation Honesty penalty
• Single pure Tier 1 oils receive Formulation Honesty bonus
---
LAYER 2 — SCALP COMEDOGENIC ASSESSMENT
MANDATORY RULE:
All oils must be assessed for comedogenic / follicle-loading risk before
scoring scalp-applied products.
Comedogenic scoring is application-zone dependent:
• Scalp follicles are larger than facial follicles — risk is lower than
  facial comedogenic scores suggest, but still relevant at high usage
• Fiber-only application comedogenic risk is minimal
• Scalp application of high-comedogenic oils requires disclosure
COMEDOGENIC TIER FOR SCALP USE:
LOW FOLLICLE LOAD (Safe for scalp):
• Argan Oil
• Jojoba Oil
• Grapeseed Oil
• Rosehip Oil
• Hemp Seed Oil
• Sunflower Oil
• Baobab Oil
• Marula Oil
• Squalane
MODERATE FOLLICLE LOAD (Use with caution on scalp):
• Coconut Oil (paradox: high penetration, moderate comedogenic — apply
  to lengths, use carefully on scalp)
• Sweet Almond Oil
• Avocado Oil
• Olive Oil
HIGH FOLLICLE LOAD (Flag for scalp application):
• Castor Oil (very high — discourage scalp saturation)
• Mineral Oil (heavy scalp application — follicle loading risk)
• Wheat Germ Oil
• Flaxseed Oil
Application Rules:
• Scalp-targeted products with high-load oils receive follicle safety flag
• Fiber-only products with high-load oils receive no comedogenic penalty
• Products claiming scalp growth support with follicle-loading oils receive
  Formulation Honesty penalty
---
LAYER 3 — FORMULATED OIL ACTIVE CLASSIFICATION
For products beyond pure or blended oils (oils with added actives,
vitamins, extracts, or growth compounds).
FULL CREDIT (Evidence-supported, oil-compatible delivery):
• Vitamin E / Tocopherol (antioxidant stability + scalp benefit)
• Rosemary Extract / Rosmarinus Officinalis (scalp evidence supported)
• Caffeine (at relevant concentration in scalp-applied oils)
• Zinc Pyrithione, Piroctone Olamine (anti-dandruff, scalp-targeted)
• Retinyl Palmitate (oil-soluble retinoid form, some scalp evidence)
PARTIAL CREDIT (Limited or context-dependent):
• Biotin (oil-phase delivery partially supported — still limited topical evidence)
• Vitamin A derivatives (concentration-dependent)
• Beta-Sitosterol (some follicle evidence — partial credit)
• Niacinamide (limited oil-phase solubility — partial credit)
DECORATIVE / MINIMAL CREDIT:
• Water-soluble Vitamin C in oil phase (incompatible phase)
• Collagen (molecular weight — no penetration)
• Full-weight proteins (too large)
• Most antioxidant botanicals at trace concentration
• "Stem cell" extracts — no established topical delivery mechanism
Decorative active marketing reduces:
• Ingredient Quality
• Formulation Honesty
---
LAYER 4 — ESSENTIAL OIL AND FRAGRANCE IMPACT RULE
MANDATORY: Essential oils in hair oils must be evaluated separately
from carrier oils. They are leave-on, and sensitization risk is real.
WELL-EVIDENCED SCALP ACTIVES (Functional credit at appropriate %):
• Rosemary Oil (Rosmarinus Officinalis) — strongest scalp evidence
• Peppermint Oil — scalp circulation, some evidence
• Lavender Oil — mild antimicrobial, scalp-soothing at low %
• Tea Tree Oil — antimicrobial, dandruff — sensitization flag at >1%
SENSITIZATION-HIGH ESSENTIAL OILS (Flag regardless of function):
• Citrus oils (Lemon, Orange, Bergamot) — phototoxic potential
• Eugenol-containing oils (Clove, Cinnamon, Ylang Ylang)
• Geraniol-containing oils
• Limonene / Linalool — EU-flagged allergens in leave-on at threshold
APPLICATION RULES:
• Essential oils above 1% in leave-on hair oils require Allergy Risk flag
• Fragrance-only essential oil use (not functional) receives
  Formulation Honesty penalty
• Synthetic fragrance in hair oils receives Allergy Risk penalty
• Phototoxic oils without sun-avoidance disclosure reduce Safety score
PURE CARRIER OIL RULE:
• If a product contains only carrier oils and no essential oils or synthetic
  fragrance — it receives maximum Allergy Risk score by default
  (subject to individual oil allergenicity consideration)
---
LAYER 4.5 — PURITY AND PROCESSING QUALITY RULE
Oil quality is affected by extraction and processing method.
This layer evaluates quality signals, not marketing labels.
QUALITY SIGNALS (Positive):
• Cold-pressed / expeller-pressed — preserves fatty acid and micronutrient
  profile (legitimate quality signal, not just marketing)
• Unrefined — retains natural color, scent, and micronutrient content
• Refined — extends shelf life, removes allergen potential, more stable
  (neutral — not inferior, just different)
• Certified organic — reduced pesticide residue (minor positive signal)
QUALITY FLAGS (Negative):
• Solvent-extracted without disclosure — potential residue concern
• Heavily refined oils marketed as "raw" or "unrefined"
• Rancid oil indicators (off-smell description in reviews — context only)
• Extremely high fragrance masking oxidized oil base
PROCESSING RULE:
Processing signals modify Ingredient Quality score only.
They do not dramatically shift Safety or Effectiveness.
Cold-pressed ≠ automatically superior if the oil's molecular profile
does not suit the intended use.
---
LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 FOR EVERY RULE
---
SAFETY [DOMINANT]
Evaluates:
• Follicle-loading risk relative to application zone
• Sensitization potential from essential oils / fragrance
• Preservative safety (if present in formulated oils)
• Phototoxic essential oil risk
• Rancidity / oxidation stability
• Repeated-use accumulation burden
Core Rules:
• Pure, stable carrier oils score highly by default
• Safety is not reduced for being a "pure oil"
• Sensitization from leave-on essential oils is a real safety factor
• Follicle load risk is application-zone dependent
• Safety overrides cosmetic appeal
---
EFFECTIVENESS
Core Question:
Does this oil deliver meaningful and honest benefit to its intended
application zone under real-world use?
Evaluates:
• Fiber penetration depth vs intended claim
• Scalp delivery of active oils
• Coating vs treatment honesty
• Oil blend coherence for intended purpose
• Repeated-use functional benefit
High effectiveness requires:
• Oil molecular profile matched to use zone
• Honest claim architecture
• Evidence-supported actives (if claimed)
• Appropriate application guidance
Rules:
• Cosmetic coating cannot achieve elite effectiveness
• Penetrating oils at honest positioning achieve high scores
• "Growth" and "regrowth" claims require substantiated ingredients
---
ALLERGY RISK
Evaluates:
• Essential oil sensitizer loading
• Synthetic fragrance presence
• Botanical allergen potential
• Nut oil allergen disclosure requirement
• Repeated-use sensitization accumulation
Application Rules:
• Pure carrier oils with no essential oils → maximum Allergy Risk score eligible
• Nut-derived oils (Almond, Walnut, Macadamia) — flag for nut allergy disclosure
  (not penalized — just flagged for transparency)
• Essential oil-heavy blends in leave-on products receive major Allergy Risk penalty
---
ECO IMPACT
Evaluates:
• Biodegradability of oil base
• Sustainability of oil sourcing (where established)
• Environmental persistence
• Packaging sustainability (minor signal)
General Rules:
• Plant-derived oils are generally biodegradable — no eco penalty
• Mineral oil has established environmental inertness — minor eco flag
  (not biodegradable at same rate as plant oils)
• Argan, Marula — sourcing sustainability is an established concern —
  flag if relevant
• Synthetic fragrance components may persist in waterways — minor flag
---
INGREDIENT QUALITY
Evaluates:
• Oil selection coherence for intended purpose
• Processing quality signals
• Blend composition honesty (vs marketing ingredient stacking)
• Active ingredient relevance and concentration realism
• Absence of decorative inflation
Rules:
• Pure single high-quality oils score highest
• Coherent targeted blends score well
• 10-oil marketing blends where 7 are late-position decorative receive penalty
• Honest simple formulations rewarded
---
SKIN / SCALP COMPATIBILITY
Evaluates:
• Scalp follicle tolerance over repeated use
• Fiber compatibility for hair type
• Post-application scalp balance
• Long-term sensitivity development risk
• Microbiome stability
Core Rules:
• Penetrating oils on matched hair type score high
• Heavyweight oils on fine hair = compatibility mismatch
• Scalp-applied comedogenic oils reduce compatibility score
• Jojoba receives scalp compatibility bonus for sebum mimicry
---
CORE SCORE FORMULA
Core Score =
(
 Safety × 0.25 +
 Effectiveness × 0.20 +
 Allergy Risk × 0.15 +
 Eco Impact × 0.10 +
 Ingredient Quality × 0.15 +
 Skin/Scalp Compatibility × 0.15
)
---
LAYER 6 — SPECIALIZED OIL PERFORMANCE
Evaluates real-world repeated-use hair oil behavior.
Score Range: 1.0 → 5.0
---
FIBER PENETRATION EFFICACY
Evaluates:
• Evidence-supported cortex penetration
• Protein loss reduction capacity
• Structural fiber benefit under repeated use
• Oil molecular profile match to claim
Core Rules:
• Tier 1 penetrating oils at appropriate use receive full credit
• Tier 3 coating oils cannot claim fiber structural benefit
• Coconut Oil receives highest penetration credit
• "Nourishing" coating oils receive Formulation Honesty flag here
CEILING RULE:
• Tier 3 dominant systems → max Fiber Penetration score 2.5
• Tier 1/2 dominant → eligible for 4.0–5.0
---
SCALP AND FOLLICLE HEALTH [DOMINANT FOR SCALP OILS]
Evaluates:
• Follicle environment support
• Scalp sebum regulation
• Anti-inflammatory capacity
• Scalp microbiome compatibility
• Comedogenic load management
Core Rules:
• Jojoba, Argan, Baobab, Marula → high scalp scores
• Castor Oil → scalp application flag regardless of popularity
• Active specialty oils (Black Seed, Pumpkin Seed) → context credit
• High-load oils on scalp reduce this score regardless of marketing
---
CUTICLE SMOOTHING AND FRIZZ CONTROL
Evaluates:
• Cuticle surface interaction
• Frizz and flyaway reduction
• Static control
• Surface moisture sealing
• Application-appropriate viscosity
Core Rules:
• Both penetrating and coating oils can score well here
• Lightweight oils (Argan, Grapeseed) — strong frizz control without weight
• Heavy oils (Castor, Mineral Oil) — strong smoothing but heavy application burden
• Appropriate viscosity for hair type must be considered
---
BUILDUP AND RESIDUE RISK
Evaluates:
• Oil accumulation over repeated use
• Wash-out ease with standard shampoo
• Long-term fiber pore saturation
• Scalp follicle accumulation trajectory
Core Rules:
• Lightweight penetrating oils → low buildup risk
• Heavy coating oils → moderate-high buildup with repeated use
• Mineral Oil → requires sulfate shampoo for full removal — flag
• Castor Oil → very high buildup accumulation potential — flag
• Pure Argan, Marula, Jojoba → lowest buildup risk
---
OXIDATIVE STABILITY AND SHELF LIFE
Evaluates:
• Oil rancidity risk
• Antioxidant preservation (Vitamin E, Rosemary Extract)
• Storage sensitivity
• Product lifespan under real-world use
Core Rules:
• Polyunsaturated-heavy oils (Rosehip, Flaxseed, Hemp Seed) → high
  oxidation risk — must be stabilized or clearly positioned as short-use
• Oleic-dominant oils (Argan, Marula, Olive) → moderate stability
• Saturated oils (Coconut, Castor) → high stability
• Vitamin E (Tocopherol) addition → oxidative stability credit
• Unstabilized high-PUFA oils without disclosure → Safety flag
---
MICROBIOME COMPATIBILITY
Evaluates:
• Scalp commensal microbiome preservation
• Antifungal active appropriateness (Malassezia context)
• Essential oil antimicrobial selectivity
• Long-term scalp microbiome balance
Core Rules:
• Pure plant carrier oils → generally microbiome-compatible
• Broad-spectrum antimicrobial essential oil heavy blends → flag
• Tea Tree, Neem → antimicrobial benefit with sensitization trade-off
• Rosemary → scalp-compatible antimicrobial without major disruption concern
---
CUMULATIVE IRRITATION RISK
Evaluates:
• Repeated essential oil sensitization exposure
• Phototoxic oil accumulation
• Synthetic fragrance leave-on burden
• Allergen accumulation in sensitized individuals
• Frequency-weighted leave-on exposure
Core Rules:
• Pure carrier oils with no fragrance → lowest possible Cumulative Irritation
• Essential oil-heavy blends → elevated cumulative risk under daily use
• Leave-on format amplifies all sensitization signals
• Rancidity risk in unstabilized oils → low-grade chronic irritation signal
---
FORMULATION HONESTY
Evaluates:
• Coating oil marketed as "penetrating treatment"
• "Growth" claims without substantiated actives
• Mineral oil marketed as "nourishing"
• Decorative multi-oil stacking
• "Repairing" claims without penetration evidence
• Overclaiming on vitamin or botanical additions
Core Rules:
• Pure, honestly positioned oils score maximum Formulation Honesty
• "Does what it says it does" is the highest honesty standard
• Luxury origin marketing does not reduce honesty score
• Growth/regrowth claims without Minoxidil, Caffeine, or substantiated
  actives receive mandatory Formulation Honesty penalty
---
SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all 7 specialized scores
Dominant Parameters:
• Scalp and Follicle Health → primary for scalp oils
• Fiber Penetration Efficacy → primary for treatment/fiber oils
• Cumulative Irritation Risk → primary penalty parameter (leave-on)
---
LAYER 7 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
Core and Specialized scores carry equal weight.
This prevents:
• Marketing-driven performance inflation
• Penalizing honest pure oils for lacking synthetic actives
• Coating-only systems passing as treatment products
---
HIGH SCORE ELIGIBILITY (>4.0)
Requires:
• Tier 1 or Tier 2 dominant oil architecture
• Low comedogenic burden for stated application zone
• Honest product classification (pure oil / blend / formulated)
• Cumulative Irritation Risk ≥ 3.0
• No synthetic fragrance as primary scent driver
• Formulation Honesty ≥ 3.5
• No unstabilized high-PUFA oil without antioxidant support
• No follicle-loading oils in scalp-marketed products
• No growth claims without substantiated actives
PURE OIL FAST TRACK:
A single pure, cold-pressed, unstabilized Tier 1 oil with no fragrance,
no additives, and honest positioning is ELIGIBLE for scores of 4.0–5.0
on safety, allergy risk, ingredient quality, and formulation honesty
by default. Effectiveness and specialized scores reflect the specific
oil's penetration and scalp profile.
DISQUALIFIERS:
• Tier 3 dominant systems marketed as "penetrating treatment"
• Growth/regrowth claims without substantiated clinical actives
• Heavy fragrance loading in leave-on oil
• Unstabilized high-PUFA oil with known rancidity concern and no disclosure
• Phototoxic essential oils without sun exposure warning
---
LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Application frequency (daily scalp oil vs weekly treatment vs styling finish)
• Oil accumulation over repeated use on scalp and fiber
• Buildup and clarifying shampoo frequency need
• Long-term fiber porosity trajectory
• Oxidative stability under bathroom storage conditions
• Repeated essential oil sensitization trajectory (leave-on)
• Hair type mismatch signals (heavyweight oil on fine hair)
Core Question:
Can this oil remain beneficial, honest, and non-accumulative under
long-term real-world use at its intended frequency?
Core Rules:
• Long-term buildup = structural fiber stress and scalp load signal
• Shine and slip ≠ fiber health
• Rancid oil under long storage = real irritation risk
• Heavy oil on fine hair = progressive fiber weighing and scalp load
---
ANTI-MARKETING FILTER
Mandatory penalties apply for:
• "Grows hair" claims without clinically substantiated ingredients
• "Repairs damage" claims using coating-only oils
• Mineral oil marketed as "nourishing" or "moisturizing"
• Castor oil "follicle growth" marketing (evidence base very limited)
• "Activated charcoal" or trend ingredient in oil phase without mechanism
• Essential oil "miracle" positioning
• Multi-oil stacking as quality signal when primary oil is low-tier
• "Cold-pressed = maximum efficacy" overgeneralization
---
BIAS NEUTRALIZATION FILTER
Neutralize:
• Natural = safe (some natural oils are comedogenic, phototoxic, or allergenic)
• More oils in a blend = better (coherence > quantity)
• Castor Oil = hair growth (not established at topical level)
• Cold-pressed = penetrating (processing ≠ molecular penetration)
• Mineral Oil = harmful (it is not — it is simply surface-coating)
• Pure oil = less effective than formulated (pure Argan can outperform
  complex serums for honest fiber benefit)
• Exotic origin = superior efficacy (geographic origin ≠ oil quality)
• Dark color = more nutrients (pigment ≠ efficacy)
• Thick = nourishing (viscosity ≠ penetration)
---
DYE

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🫙 OIL PROFILE

## Functional Classification

Short product classification.

Examples:
- Pure Penetrating Carrier Oil
- Lightweight Scalp-Compatible Oil Blend
- Heavy Coating / Gloss Oil
- Specialty Scalp Treatment Oil
- Balanced Penetrating + Surface Oil Blend
- Formulated Hair Oil (Oil + Actives)
- Mineral Oil Finishing Oil

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering oil tier and penetration profile, scalp and fiber application match, comedogenic honesty, blend coherence (if applicable), long-term hair behavior, and overall formulation honesty.

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

### Skin / Scalp Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Penetration + Scalp Health Analysis

### Fiber Penetration Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp and Follicle Health — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cuticle Smoothing and Frizz Control — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Buildup and Residue Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Oxidative Stability and Shelf Life — ⭐X.X

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

# 👤 HAIR TYPE COMPATIBILITY

## Population Compatibility

### Dry / Damaged Hair — ⭐X.X

Short compatibility explanation.

### Oily Scalp — ⭐X.X

Short compatibility explanation.

### Fine / Low-Density Hair — ⭐X.X

Short compatibility explanation.

### Thick / Coarse Hair — ⭐X.X

Short compatibility explanation.

### Color-Treated Hair — ⭐X.X

Short compatibility explanation.

### Curly / High-Porosity Hair — ⭐X.X

Short compatibility explanation.

### Sensitive Scalp — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Scalp Application — ⭐X.X

Short explanation.

### Weekly Deep Treatment — ⭐X.X

Short explanation.

### Finishing / Styling Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Slip, gloss, and frizz control
- Scalp sensation
- Weight and texture feel

## Medium-Term

- Fiber strength and hydration response
- Buildup accumulation signals
- Scalp tolerance development

## Long-Term

- Fiber integrity trajectory
- Scalp microbiome and follicle health outcome
- Buildup and clarifying need frequency
- Overall hair health outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting oil penetration tier, scalp comedogenic profile, buildup and residue behavior, active performance (if formulated), oxidative stability, and long-term hair and scalp outcome. Flag nut allergen oils, phototoxic essential oils, high-PUFA instability, and follicle-loading primary oils.

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
- Pure oils must never be penalized for lacking synthetic additives
- Mention essential oil sensitizers, phototoxic oils, and nut allergens in output
- No shine-volume bias
- Structural weakness overrides cosmetic feel
- Oil penetration tier must be classified before scoring
- Comedogenic and follicle load must be assessed for scalp-applied products
- Oxidative stability must be assessed for polyunsaturated-heavy oils
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Buildup accumulation = structural scalp and fiber stress signal
- Shine richness ≠ fiber health
- Castor oil growth claims must be flagged — evidence not established
- Mineral oil must not be penalized for safety beyond coating limitation
- Cold-pressed ≠ automatically superior penetration
- Thick = nourishing bias must be neutralized
- Natural ≠ safe (comedogenicity, phototoxicity, and sensitization are real)
- Formulation honesty is rewarded — pure honest oils must score highly
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hair Oil Evaluation Algorithm — Structured for oil penetration tier analysis, scalp comedogenicity realism, and long-term fiber and follicle health evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict hair oil structural evaluation engine."
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