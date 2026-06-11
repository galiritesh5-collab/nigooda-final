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

        lip_balm_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL LIP BALM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
LIP BALM EVALUATION ALGORITHM — PATCHED V1.1
================================================================================
LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward lip balms ONLY when clear structural usefulness is demonstrated through:
• Stable lip hydration against the unique biology of the vermillion border
• Barrier-supportive architecture appropriate for the lip's thin stratum corneum
• Long-term moisture retention stability
• Repeated-use and reapplication compatibility
• Reduced lip dryness cycling and dependency behavior
• Minimal irritation, ingestion risk, or excessive occlusive suppression
Penalty is REQUIRED when formulations rely mainly on:
• Temporary smoothness or gloss illusion
• Flavor-driven sensory engineering
• Menthol or camphor receptor stimulation presented as relief
• Decorative botanical inflation
• Heavy wax masking without genuine barrier architecture
• Artificial nourishment perception
• Luxury texture engineering
• Active inflation without structural support
• Basic petroleum-occlusive dependence without lip-appropriate barrier repair
• Ingestion-unsafe flavor or preservative systems
Basic occlusion alone MUST NOT achieve high scores.
Marketing-dominant lip balm systems MUST receive meaningful score limitation.
---
VERMILLION BORDER PRIORITY RULE
ALL evaluation must account for lip-specific anatomy:
• Stratum corneum depth: only 3–4 cell layers vs 15–20 on facial skin
• No sebaceous glands — lips cannot self-lubricate
• No sweat glands — no eccrine hydration contribution
• Minimal filaggrin expression — endogenous NMF production severely limited
• No hair follicles — no pilosebaceous reservoir
• High transepidermal water loss (TEWL) baseline
• Transition to oral mucosa at inner lip — higher permeability
• UV exposure without melanin protection
Scoring consequences of vermillion anatomy:
• Humectants that draw on NMF have limited endogenous NMF to interact with — scores adjusted accordingly
• Occlusion suppression risk is proportionally higher than on body skin
• Any ingredient at the inner vermillion/mucosal zone must be evaluated for mucosal exposure
• Ingredients safe on skin may have different penetration and mucosal irritation profiles on lips
This rule overrides any general moisturizer framework assumption applied directly to lips.
---
LIP EXPOSURE RULE
Evaluation MUST simulate:
• Repeated daily application (average 4–10 times daily for frequent users)
• Inadvertent ingestion (estimated 80–100% of lip balm applied is eventually ingested)
• Prolonged mucosal-adjacent contact
• Environmental desiccation exposure (wind, cold, low humidity)
• Lip movement stress — eating, speaking, licking
• Transfer and wear-off behavior
• Repeated barrier interaction with food, drink, and saliva
Heavy, greasy, irritating, dependency-promoting, or ingestion-unsafe structures MUST lose compatibility credibility under repeated-use evaluation.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Premium branding
• Luxury texture
• Natural-positioning claims
• Trend-driven actives
• Fancy ingredient naming
• Long inflated ingredient lists
• Gloss-focused marketing
• "Repair" or "healing" claims without structural support
Evaluate ONLY:
• Hydration realism for lip anatomy
• Barrier support appropriate for thin SC
• Occlusion balance without suppression
• Repeated-use tolerance
• Long-term lip response
• Structural honesty
• Ingestion safety of flavor and preservative systems
• Dependency-cycle risk
---
GLOBAL ENFORCEMENT RULE
Applies across ALL evaluation layers.
• Core architecture overrides minor additives
• Marketing-focused actives cannot override structural weakness
• Late-position ingredients cannot neutralize weak lip balm systems
• Temporary smoothness does not equal barrier repair
• Glossy comfort does not equal healthy lip recovery
• Basic sealing alone does not justify high scoring
• Heavy occlusion without barrier sophistication MUST reduce credibility
• Safety and ingestion-exposure penalties override cosmetic elegance bonuses
• Decorative hydration systems MUST reduce credibility
• Real barrier-supportive sophistication MUST create clear scoring advantage
• Penalties MUST remain proportional to repeated daily exposure and reapplication cycles
• Menthol, camphor, or cooling-agent dominance MUST reduce scoring through the TRPM8/TRPV1 dependency mechanism
• Fragrance-heavy, flavor-heavy, menthol-heavy, camphor-heavy, or structurally weak lip balms MUST face visible scoring limitation under repeated-use evaluation
---
STRUCTURE DOMINANCE RULE
Minor additives cannot override unstable structure. Functionally useful lipids, lanolin, ceramides, humectants, cholesterol, fatty acids, or barrier-supportive ingredients MUST NOT be treated as decorative loading when meaningful structural contribution exists.
Ingredient value MUST be judged through:
• Concentration realism
• Functional compatibility with lip anatomy
• Formulation positioning
• Repeated-use usefulness
• Barrier-support contribution
• Ingestion safety profile
---
BASIC OCCLUSION LIMIT RULE
Basic occlusion through petrolatum, mineral oil, waxes, silicones, or fatty occlusion alone MUST NOT achieve high structural credibility on lips. Simple moisture sealing without barrier sophistication → moderate score ceiling.
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients mainly provide surface comfort, temporary smoothness, and minor soothing. They do NOT repair structural weakness. Late-position ingredients cannot neutralize weak barrier architecture, flavor-heavy systems, menthol-heavy systems, occlusive imbalance, or repeated irritation exposure.
---
REAL USEFULNESS RULE
Clear score improvement is REQUIRED when the formulation:
• Supports lip barrier resilience appropriate for the thin vermillion SC
• Improves moisture retention stability
• Maintains sustainable hydration without excessive occlusion suppression
• Reduces excessive reapplication dependency
• Shows realistic repeated-use compatibility
• Balances occlusives, emollients, and humectants rationally for lip anatomy
• Demonstrates lip support without excessive irritation, mucosal sensitization, or dependency cycling
• Uses ingestion-safe flavor and preservative systems
---
TRANSPARENCY BONUS RULE
Apply a SMALL bonus ONLY when the formulation shows:
• Rational lip barrier architecture cognizant of vermillion anatomy
• Balanced hydration logic
• Honest ingredient positioning
• Clear functional purpose
• Stable barrier-supportive structure
• Repeated-use design intelligence
• Ingestion-safe ingredient selection
• Lanolin, ceramide, or physiological lipid presence with structural intent
This bonus cannot override safety penalties, barrier instability, occlusion suppression risk, repeated-use irritation risk, or structural formulation weakness.
---
LAYER 1 — VERMILLION-SPECIFIC LIPID ARCHITECTURE RULE
LIPID CLASSIFICATION FOR LIP PRODUCTS
NON-PHYSIOLOGICAL LIPIDS (Occlusion only — no barrier repair)
Examples: Petrolatum, Mineral oil, Paraffin wax, Carnauba wax, Candelilla wax, Beeswax, Microcrystalline wax, Ceresin, Ozokerite, Dimethicone, Cyclomethicone, Squalane (surface film), Synthetic waxes
Scoring impact on lips:
• Valid for TEWL reduction and occlusive protection — moderate barrier protection credit
• NOT eligible for barrier repair credit
• Penalized when used as dominant system without physiological lipid co-presence, or when excessive occlusion suppresses remaining SC activity
PHYSIOLOGICAL LIPIDS (Barrier support — partial repair credit on lips)
Examples: Ceramides (all classes), Cholesterol, Free fatty acids, Phytosphingosine, Sphingosine, Lanolin fatty acids
Scoring impact on lips:
• Eligible for partial barrier repair credit (ceiling lower than body skin due to reduced SC depth)
• Most effective when ceramide:cholesterol:fatty acid ratio is maintained (3:1:1 target)
LANOLIN CLASSIFICATION RULE
Lanolin is chemically the most similar ingredient to human sebum among all cosmetic lipids. It penetrates the lip SC more effectively than petrolatum while maintaining superior occlusion. Lanolin sensitivity exists (estimated 1.7–5.8% sensitization rate) — reflected in allergy risk scoring.
Lanolin scoring tiers:
• High-list (top 5 INCI) → Full lip barrier support credit + occlusion bonus
• Mid-list → Partial barrier support credit
• Low-list → Moderate occlusion credit only
• Modified lanolin (acetylated, hydrogenated) → Reduced sensitization risk; retain partial barrier credit
• Lanolin allergy disclosure absent → Reduce allergy risk score
WAXES CLASSIFICATION RULE
Waxes are not equivalent. Classify before scoring:
• Beeswax → Best-performing natural wax; structured occlusion
• Carnauba → High-hardness; can feel waxy; increases stability
• Candelilla → Common vegan substitute for beeswax
• Microcrystalline wax → Tighter occlusion; higher dependency risk
• Ceresin / Ozokerite → Petroleum-derived; tightest occlusion; highest dependency risk of wax class
• Rice bran wax → Acceptable structural wax
Wear stability rule: Wax-dominant balms with low combined melting point relative to lip temperature (~34–37°C) lose structural integrity rapidly, accelerating reapplication cycles. MUST reduce Moisture Retention Stability and Reapplication Dependency Risk scores.
---
LAYER 2 — COOLING AGENT AND DEPENDENCY-INDUCING INGREDIENT RULE
TRPM8 PATHWAY (Cold receptor activation — menthol, WS-agents)
Menthol and synthetic cooling agents activate TRPM8, producing artificial cooling sensation. Creates dependency through artificial cooling masking TEWL-driven discomfort and increased TEWL after wearing off.
Menthol / Cooling agent scoring tiers:
• Trace (late-list, below 0.1%) → Minor flavor note; small allergy penalty only
• Moderate (mid-list, 0.1–0.5%) → TRPM8 activation risk; reduce Reapplication Dependency Risk and Long-Term Compatibility
• Dominant (top-half, above 0.5%) → Strong TRPM8 dependency pathway; meaningfully reduce Safety, Dependency Risk, Long-Term Compatibility
• Primary active (top-5, above 1%) → Severe dependency and barrier disruption risk; heavy penalty across all scores
Synthetic cooling agents (WS-3, WS-23, Icilin) carry equivalent or higher TRPM8 activity — scored identically to menthol by concentration tier.
TRPV1 PATHWAY (Heat/pain receptor activation — camphor, capsaicin, clove)
Any camphor presence → reduce Safety, Allergy Risk, Reapplication Dependency Risk.
Camphor + menthol combination → multiplicative dependency risk; compound penalty required.
FRAGRANCE BURDEN CLASSIFICATION FOR LIP BALMS
Fragrance in lip balms must now be evaluated contextually rather than treated as a uniform automatic major penalty.
F1 — LOW FRAGRANCE BURDEN
Examples: Low-position parfum, minimal allergen presence, subtle flavor-adjacent fragrance note.
Characteristics: Low irritation probability; low sensitization risk; mucosal exposure concern minor.
Scoring Impact: Small Allergy Risk and Safety consideration. Small ingestion exposure note. No major penalty unless mucosal or ingestion concern is triggered.
F2 — MODERATE FRAGRANCE BURDEN
Examples: Noticeable fragrance presence, moderate allergen profile, sensory-enhanced lip balm.
Characteristics: Moderate repeated-exposure sensitization probability; mucosal and ingestion exposure concern.
Scoring Impact: Mild Allergy Risk modifier; small Safety modifier.
F3 — HIGH FRAGRANCE BURDEN
Examples: Fragrance-forward lip balm, multiple fragrance allergens, perfume-heavy architecture.
Characteristics: Elevated sensitization probability via topical contact and ingestion route.
Scoring Impact: Stronger Allergy Risk penalty; stronger Safety penalty; Formulation Honesty reduction.
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Examples: Aggressive essential oil loading, sensitizer-heavy systems, perfume-dominant identity.
Characteristics: High repeated-use mucosal irritation probability; high ingestion sensitization risk.
Scoring Impact: Major Allergy Risk reduction; major Safety penalty; Formulation Honesty penalty.
IMPORTANT FRAGRANCE RULES (Lip-Specific):
• Fragrance burden matters more than fragrance existence
• Mucosal exposure and ingestion routes amplify all fragrance risks beyond skin-contact risk
• Low-level fragrance in balanced, ingestion-safe systems may be acceptable
• Essential oils are not automatically safer than synthetic fragrance
• Repeated-use and ingestion exposure still matter even for trace fragrance levels
• Flavor agents are evaluated separately under the Flavor Sensitization Tier system
FLAVOR SENSITIZATION TIERS
High-risk flavor agents (strong penalty):
• Cinnamaldehyde / cinnamon oil — potent contact sensitizer; TRPA1 activator; mucosal irritant
• Peppermint oil (high menthol content) — TRPM8 activation + sensitization
• Clove oil / eugenol — TRPV1 activator; sensitizer
• Benzyl benzoate / benzyl alcohol — sensitizer and penetration enhancer
• Balsam of Peru — cross-reactive sensitizer complex
• Limonene, linalool (oxidized forms) — common sensitizers in citrus flavors
Moderate-risk flavor agents:
• Vanillin — low sensitization but mucosal exposure concern at high dose
• Ethyl maltol — generally safe; low sensitization
• Fruit ester flavor compounds — variable; position-dependent penalty
Scoring rule: Each high-risk flavor agent in mid-list or higher position reduces Allergy Risk meaningfully. Multiple high-risk agents trigger cumulative sensitization penalty.
---
LAYER 3 — INGESTION EXPOSURE RULE
MANDATORY INGESTION SAFETY EVALUATION
Because 80–100% of lip balm applied is inadvertently ingested, ALL lip balm ingredients must be assessed for oral exposure safety — not just topical safety.
Ingestion safety classification:
• GRAS (Generally Recognized As Safe for oral use) → No ingestion penalty
• Conditionally safe → Minor note only
• Topical-safe but oral-concern → Moderate Allergy Risk and Safety penalty
• Oral-unsafe → Significant Safety penalty regardless of topical safety
Oral-concern ingredients in lip products (reduce Safety and Allergy Risk):
• Synthetic dyes (D&C Red 6, 7, 21, 27, 30, 33; FD&C dyes at high concentration)
• Some preservatives at mid-list position (phenoxyethanol is not GRAS)
• Retinyl palmitate — oral vitamin A accumulation concern at frequent use
• Salicylic acid — oral concern at repeated mucosal exposure
• Some essential oils at non-food-grade concentrations
---
LAYER 4 — LIP HYDRATION TIER RULE
THREE-TIER LIP HYDRATION SCALE
Tier 1 — Surface occlusive hydration (Low depth)
Ingredients: Petrolatum alone, waxes alone, mineral oil, silicones, glycerin in occlusive-only systems
Result: Immediate comfort; rapid return of dryness; highest dependency risk tier
Tier 2 — Active humectant hydration (Moderate depth)
Ingredients: Glycerin (meaningful concentration, mid-list), Hyaluronic acid, Sodium hyaluronate, Betaine, Sorbitol, Propylene glycol, Aloe vera (meaningful position)
Result: Better moisture retention than occlusion alone; reduced but not eliminated dependency cycle
Tier 3 — Supported structural hydration (High depth — adapted for lip anatomy)
Ingredients: Panthenol, Sodium PCA, Lactic acid / sodium lactate, Urea at low concentration (at or below 2%), Glycerophosphoinositol
Note: Full Tier 3 credit is capped below moisturizer equivalents because lip NMF production is fundamentally lower.
Lip hydration depth scoring:
• Tier 1 only → Low ceiling (max 2.5)
• Tier 2 humectants present → Moderate (max 3.5)
• Tier 3 ingredients present → Higher depth eligible (up to 4.5 — capped below moisturizer 5.0 due to anatomy)
• Multi-tier → Score reflects dominant tier + breadth bonus
---
LAYER 5 — pH COMPATIBILITY RULE FOR LIP PRODUCTS
LIP pH SCORING MODIFIER
Lip skin has a higher physiological pH than facial skin: approximately 5.5–6.8.
pH scoring tiers for lip products:
• 5.0–6.5 → Optimal for lip skin — small bonus to barrier and hydration scores
• 6.5–7.0 → Acceptable — no penalty
• 7.0–8.0 → Mild penalty
• Above 8.0 → Meaningful penalty
• Below 4.5 → Caution — acidic irritation on thin lip SC and mucosal tissue
• Not disclosed → No bonus; minor credibility reduction
pH ROLE IN LIP BALM SCORING:
pH functions as a contextual modifier — not a dominant scoring driver. It adjusts probability of barrier disruption and mucosal compatibility but is weighted as a secondary factor given that lip SC enzymatic activity is inherently reduced. Surfactant architecture, occlusion balance, and dependency-cycle risk remain more important overall.
---
LAYER 6 — UV PROTECTION RECOGNITION RULE
SPF presence modifier:
• SPF 15–20 → Small positive modifier to Effectiveness and Long-Term Compatibility
• SPF 30+ → Moderate positive modifier
• SPF 50+ → Stronger modifier
• Mineral UV filters → Additional stability bonus
• Chemical UV filters → Moderate modifier; note sensitization and ingestion exposure concern
• No SPF → No bonus; note absence for outdoor/sun-exposed use
This modifier does not override structural weakness.
---
LAYER 7 — CORE SCORING SYSTEM (LIP BALM — STRICT)
Score range: 1.0 to 5.0
SAFETY [DOMINANT]
Evaluates:
• Irritation risk at the thin vermillion SC and mucosal transition zone
• Ingestion exposure safety (mandatory for lip products)
• TRPM8/TRPV1 receptor stimulation risk
• Barrier suppression through excessive occlusion
• Repeated-use sensitization risk from flavor agents
• Structural suffocation and dependency-cycle risk
• Chronic inflammation tendency from flavor, fragrance, or irritant accumulation
INGESTION OVERRIDE RULE: Any ingredient that is topically safe but demonstrates meaningful oral/mucosal concern at repeated exposure concentrations MUST reduce Safety score regardless of topical safety profile.
COOLING AGENT SAFETY RULE: Menthol, camphor, peppermint oil, and synthetic cooling agents activate specific sensory receptors that create dependency cycles. Their safety score reduction MUST be proportional to their list position and estimated concentration tier.
EFFECTIVENESS
Core question: Can the lip balm realistically support lip hydration, barrier function, and long-term lip stability under repeated use without creating dependency?
Evaluates:
• Hydration performance (tier-based, Layer 4)
• Barrier-support realism for thin lip SC
• Moisture retention stability
• Structural balance appropriate for vermillion anatomy
• Repeated-use consistency
• Dependency-cycle resistance
• SPF presence (Layer 6 modifier)
ALLERGY RISK
Evaluates:
• Flavor agents (tiered by sensitization profile — Layer 2)
• Fragrance and essential oils (classified by burden tier — F1 through F4)
• Lanolin sensitization potential
• Preservative mucosal sensitivity
• Cooling agent sensitization
• Botanical sensitizers at mid-list or higher positions
• Ingestion-route sensitization risk
• Cumulative multi-trigger risk
MUCOSAL ALLERGY AMPLIFIER: Allergic reactions from mucosal exposure can be more severe and faster-onset than equivalent skin contact reactions. This amplifies sensitization risk penalties for lip products.
ECO IMPACT
Evaluates:
• Biodegradability of wax systems
• Petroleum dependency
• Silicone environmental persistence
• Synthetic colorant ecological impact
• Packaging material (small lip balm tubes generate significant plastic waste per gram of product)
INGREDIENT QUALITY
Evaluates:
• Structural balance appropriate for lip anatomy
• Functional synergy between waxes, oils, humectants, and actives
• Barrier-support usefulness for thin lip SC
• Hydration architecture (tier-based)
• Wax class quality
• Lanolin positioning and quality
• Absence of decorative inflation
• Ingestion-appropriate ingredient selection
• Flavor-to-function ratio
LIP COMPATIBILITY
Evaluates:
• Daily usability
• Long-term tolerance at the thin lip SC and mucosal transition
• Repeated-use stability
• Dependency-cycle tendency
• Wear stability
• Mucosal compatibility
• Sensitivity compatibility
• Occlusion sustainability without suppression
Core Score Formula:
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Lip Compatibility × 0.15)
---
LAYER 7.5 — HERBAL / ORGANIC VALIDATION (LIP-CALIBRATED)
This layer applies ONLY to:
• Herbal-positioned lip balms
• Ayurvedic lip care products
• Organic-marketed lip balms
• Botanical-heavy lip balms
• "Natural" marketed lip formulations
This layer evaluates:
• Herbal authenticity
• Evidence quality
• Ingestion and mucosal realism (critical for lip products)
• Botanical inflation
• Essential oil burden (including TRPM8/TRPV1 risk)
• Traditional vs clinical support
• Marketing honesty
HERBAL EVIDENCE CLASSIFICATION (Lip-Calibrated)
H1 — EVIDENCE-SUPPORTED BOTANICALS (Lip-Context)
Examples:
• Aloe Vera — soothing; mucosal-compatible
• Shea butter — physiological lipid-adjacent; partial barrier credit
• Castor oil — emollient; film-former; functional in lip context
• Coconut oil — emollient; mucosal-compatible; partial barrier credit
• Vitamin E (Tocopherol) — antioxidant; minor lip-care functional credit when mid-list
Rules:
Provide partial functional credit ONLY when:
• Reasonable concentration appears likely
• Ingredient is ingestion-safe (mandatory for lip products)
• Biological plausibility exists in lip care context
• Not used to inflate label appeal without structural contribution
H2 — TRADITIONAL / PARTIAL-EVIDENCE BOTANICALS (Lip-Context)
Examples:
• Kokum butter
• Mango butter
• Rosehip extract (when present at meaningful concentration)
• Calendula extract
Rules:
Recognize traditional moisturizing and soothing use. Do NOT allow exaggerated "repair" or "healing" claims.
Ingestion safety must still be confirmed.
Required Output Language: "Traditional supportive use with limited modern lip-specific clinical evidence."
H3 — DECORATIVE / MARKETING BOTANICAL INFLATION
Examples:
• Luxury oil stacking (argan, marula, rosehip, jojoba all simultaneously in late positions)
• Exotic botanical extract inflation with no mucosal safety assessment
• 10+ botanical ingredient systems with no structural purpose
Characteristics:
• Label appeal dominance
• Weak functional realism
• Potential ingestion safety gaps from unfamiliar botanical extracts
Scoring Impact:
• Formulation Honesty reduction
• Botanical Inflation flag
• Ingredient Quality reduction
GENUINE vs GIMMICK HERBAL DISTINCTION (Lip-Specific)
GENUINE HERBAL SIGNALS:
• Mild, ingestion-compatible formulation architecture
• Coherent botanical strategy with lip-care mechanism
• Realistic claims
• Botanicals confirmed or reasonably inferred as food-safe
• Low or absent TRPM8/TRPV1-active ingredients
• Balanced formulation logic appropriate for vermillion anatomy
GIMMICK HERBAL SIGNALS:
• Irritating essential oils (peppermint, citrus, cinnamon, clove) hidden behind "natural" marketing
• Perfume-heavy "herbal" lip balm systems
• Excessive extract inflation with no ingestion safety consideration
• Fake "repair/nourishment" herbal positioning
• Essential oil overload creating TRPV1/TRPM8 dependency risk
BOTANICAL IRRITATION REALISM RULE (Lip-Specific)
Natural ingredients are NOT automatically safer on lips — and the ingestion route adds a second dimension.
Recognize sensitization and irritation potential from:
• Peppermint oil — TRPM8 activator + contact sensitizer + ingestion concern
• Citrus oils — contact sensitizer + photosensitizer + ingestion concern
• Clove oil / eugenol — TRPV1 activator + sensitizer + oral irritant at concentration
• Cinnamon oil / cinnamaldehyde — potent sensitizer and mucosal irritant
• Spearmint / eucalyptus — TRPM8 activity; ingestion caution
"Natural" or "herbal" claims must NEVER override TRPM8/TRPV1 dependency risk, ingestion safety requirements, or mucosal sensitization evaluation.
OUTPUT ADDITION:
For herbal-positioned lip balms, automatically include evaluation of:
• Evidence quality
• Traditional support
• Ingestion and mucosal realism (mandatory for lip products)
• Botanical authenticity
• Essential oil burden (TRPM8/TRPV1 risk + ingestion safety assessed)
• Herbal marketing honesty
• Genuine vs gimmick positioning
---
LAYER 8 — SPECIALIZED PERFORMANCE (LIP BALM — STRICT)
Score range: 1.0 to 5.0
HYDRATION DEPTH (Tier-based — Layer 4)
Tier 1 only → max 2.5
Tier 2 present → max 3.5
Tier 3 present → up to 4.5 (lip-adjusted ceiling)
Multi-tier → dominant tier + breadth bonus
LIP BARRIER REPAIR STRENGTH [DOMINANT]
Scoring tiers:
• Non-physiological lipids only → max 2.5
• Partial physiological system (ceramide or cholesterol alone) → up to 3.0
• Lanolin in high-list position → up to 3.5
• Full physiological triad (ceramide + cholesterol + fatty acid) → up to 4.0
• Full triad + lanolin at appropriate pH → up to 4.5
Note: Maximum Lip Barrier Repair Strength ceiling is 4.5 due to anatomically limited repair capacity.
OCCLUSION BALANCE
OCCLUSION-SUPPRESSION RULE (Lip-Specific): Petrolatum-dominant or full-wax-dominant systems without ANY physiological lipid or humectant co-presence must receive meaningful Occlusion Balance reduction.
MOISTURE RETENTION STABILITY
Wax-dominant balms with low melting point relative to lip temperature → reduce score proportionally.
REAPPLICATION DEPENDENCY RISK [Lip-Specific Dominant Parameter]
Scoring tiers:
• Strong dependency risk (menthol dominant + petrolatum only + flavor heavy) → 1.0–1.8
• Moderate dependency risk (menthol mid-list + minimal humectants) → 1.8–2.5
• Low-moderate dependency risk (petrolatum-dominant without humectants) → 2.5–3.2
• Low dependency risk (balanced occlusion + humectants + no cooling agents) → 3.2–4.0
• Dependency-resistant design (physiological lipids + Tier 2–3 humectants + no cooling agents) → 4.0–5.0
LONG-TERM LIP COMPATIBILITY
Chronic irritation, dryness cycling, flavor-heavy exposure, mucosal sensitization, or tolerance instability → score reduction.
SPECIALIZED SCORE CALCULATION
Specialized Performance Score = Average of all specialized scores
Final Score = (Core Score + Specialized Score) / 2
Both Lip Barrier Repair Strength AND Reapplication Dependency Risk serve as dominant interpretive parameters.
---
LAYER 9 — REAL-WORLD USAGE SIMULATION (STRICT)
Simulate:
• Repeated daily application (4–10 applications typical for dependent users)
• Weekly reapplication accumulation
• Barrier recovery cycles between applications
• Long-term hydration sustainability across environmental conditions
• Inadvertent ingestion accumulation across daily use
• Wear-off, eating, and speaking exposure
• TRPM8/TRPV1 receptor habituation over months
• Mucosal sensitization progression over weeks to months
Core question: Can lips realistically tolerate and benefit from the lip balm long-term without entering a dependency cycle, accumulating mucosal sensitization, or creating barrier suppression?
---
ANTI-MARKETING FILTER
Penalty is REQUIRED for:
• Flavor-heavy elegance without structural function
• Gloss-focused sensory engineering
• Menthol/camphor comfort presented as relief or healing
• Silicone-softness illusion
• Decorative botanical inflation
• Texture-first conditioning systems
• Artificial nourishment perception
• Heavy wax masking presented as repair
• Marketing-driven active inflation
---
HIGH SCORE ELIGIBILITY RULE
Scores above 4.0 require clear structural excellence across:
• Barrier support appropriate for thin lip SC
• Long-term compatibility including mucosal zone
• Hydration balance (Tier 2 minimum, Tier 3 preferred)
• Repeated-use tolerance
• Dependency resistance (no dominant cooling agents)
• Irritation control including ingestion safety
• Functional formulation honesty
• pH compatibility (5.0–6.5 preferred)
• Wax architecture appropriate for wear stability

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 💋 LIP BALM PROFILE

## Functional Classification

Short functional type description.

Examples:
- Occlusive-Only Lip Balm
- Physiological Lipid Lip Balm
- Lanolin-Based Barrier Lip Balm
- SPF-Active Lip Balm
- Basic Petroleum Lip Balm

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short evidence-based classification covering formulation architecture, barrier support quality for thin lip SC, lipid class, hydration tier, wax system quality, dependency risk profile, and expected long-term lip outcome.

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

### Lip Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Lip Barrier + Dependency Analysis

### Hydration Depth — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Lip Barrier Repair Strength — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Occlusion Balance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Moisture Retention Stability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Reapplication Dependency Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Long-Term Lip Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Major structural advantage (evidence-based)
- Major structural advantage (evidence-based)
- Major structural advantage (evidence-based)

## Weaknesses

- Major structural concern
- Major structural concern
- Major structural concern

---

# 🚨 CRITICAL ALERTS

## Triggered Structural Risks

Display ONLY when structurally triggered.

- TRPM8 dependency mechanism risk
- Camphor/TRPV1 activation risk
- Ingestion-unsafe ingredient concern
- Mucosal sensitization risk
- Barrier suppression through excessive occlusion
- High cinnamaldehyde / cinnamon sensitization risk

Remove section entirely if no critical alerts triggered.

---

# 👤 LIP CONDITION COMPATIBILITY

## Population Compatibility

### Severely Dry / Chapped Lips — ⭐X.X

Short compatibility explanation.

### Sensitive / Reactive Lips — ⭐X.X

Short compatibility explanation.

### Chronically Dependent Lips — ⭐X.X

Short compatibility explanation.

### Irritation-Prone / Allergy-Prone Lips — ⭐X.X

Short compatibility explanation.

### UV-Exposed / Outdoor Use — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Frequent Daily Use (4+ Applications) — ⭐X.X

Short explanation.

### Moderate Daily Use (1–3 Applications) — ⭐X.X

Short explanation.

### Occasional / Recovery Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (1–7 Days)

- Hydration feel and initial comfort
- Smoothness and texture response
- Flavor and cooling sensation assessment
- Initial irritation potential
- Wear duration estimate

## Medium-Term (2–8 Weeks)

- Barrier response and dependency pattern emergence
- Moisture stability between applications
- Flavor and cooling tolerance development
- Reapplication frequency trend
- Sensitization warning signs

## Long-Term (2–12 Months)

- Barrier resilience or suppression trajectory
- TRPM8 and TRPV1 habituation development
- Cumulative sensitization risk
- Skin health trajectory at vermillion border
- Mucosal health impact

## Realistic Dermatological Outcome

One concise conclusion covering whether the formulation supports genuine lip barrier recovery or creates cosmetic dependency, with physiological lipid and wax architecture summary, and mucosal safety assessment.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only functionally dominant ingredients affecting wax architecture (class noted), barrier system (lipid class and lanolin noted), hydration system (tier noted), cooling and dependency mechanism (receptor pathway noted), flavor and ingestion exposure, and irritation and sensitization risk.

- Ingredient — Role — Wax/Lipid class if applicable — Receptor pathway if applicable

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

3–5 concise evidence-based sentences covering barrier architecture quality and lipid class for thin lip SC, hydration system tier, cooling agent and dependency mechanism risk, flavor sensitization and ingestion exposure profile, and occlusion balance and suppression risk.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Include harsh fragrances, preservatives, and colorants in output
- No marketing influence
- No luxury or sensory bias
- No ingredient-count bias
- Structural weakness overrides cosmetic feel
- Flavor and cooling agent burden must be reflected in scoring
- Repeated-use behavior > first-use feel
- Long-term outcome > immediate sensation
- Temporary smoothness ≠ barrier repair
- Menthol and camphor receptor stimulation ≠ genuine relief
- Ingestion exposure must be evaluated for every lip product
- Wax class must be identified before occlusion scoring
- Lanolin must be identified and separately classified before barrier scoring
- Hydration tier must reflect vermillion anatomy adjustment
- TRPM8 and TRPV1 receptor pathway must be assessed for all cooling agents
- Lip anatomy (thin SC, no sebaceous glands, mucosal transition) must inform all scores
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Lip Balm Evaluation Algorithm — Structured for lip barrier anatomy analysis, cooling-agent dependency risk assessment, and long-term mucosal and repeated-use compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict LIP BALM structural evaluation engine."
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