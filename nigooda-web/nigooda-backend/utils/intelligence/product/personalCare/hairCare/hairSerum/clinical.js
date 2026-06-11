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
HAIR SERUM EVALUATION ALGORITHM — V2.0
════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hair serums that demonstrate:
• Evidence-based active delivery to scalp or fiber
• Cuticle integrity preservation under repeated use
• Scalp barrier and microbiome compatibility
• Physiological scalp pH compatibility
• Long-term fiber and follicle health support
• Structural formulation honesty
• Low cumulative irritation and sensitization risk
Mandatory penalties apply for:
• Silicone-first gloss architecture marketed as "treatment"
• Fragrance-driven "healthy hair" perception engineering
• Decorative botanical or protein loading without structural function
• Penetration-claimed actives that cannot reach cortex or follicle
• Leave-on active inflation without bioavailability evidence
• Marketing-driven sensory engineering over structural benefit
Cosmetic coating alone cannot achieve high scores.
---
HARDNESS VS FAILURE SEPARATION RULE (NEW)
Structural weight, alcohol content, or silicone presence does not automatically
equal product failure. A moderate-alcohol scalp serum may appropriately deliver
actives to follicles. A silicone-containing fiber serum may legitimately reduce
combing breakage on bleached hair. Output language must reflect intended context:
"less suited for daily heavy buildup on fine hair" — not "bad serum."
Score within the product's intended use zone and frequency.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding and luxury positioning
• Instant shine or slip perception
• Fragrance "clean hair" perception
• "Natural/organic/plant-powered" marketing
• Trend-driven active loading (ceramides, peptides, biotin)
• Ingredient-count inflation
Evaluate only:
• Active delivery realism vs fiber/scalp target zone
• Silicone grade and occlusion burden
• Scalp pH compatibility
• Repeated-use fiber and scalp impact
• Penetration vs surface-only architecture
• Structural formulation honesty
• Long-term cumulative buildup and sensitization risk
---
GLOBAL ENFORCEMENT RULES
• Silicone architecture is the dominant serum structure for silicone-containing formulas
• Safety penalties override sensory bonuses
• Surface coating actives cannot compensate for scalp barrier disruption
• Late-position ingredients cannot neutralize structural buildup risk
• Shine ≠ hair health
• Fragrance freshness ≠ scalp health
• Heavy silicone buildup = long-term fiber weakening signal
• Scalp alcohol loading without barrier consideration reduces credibility
• Non-physiological scalp pH reduces Safety and Microbiome compatibility
• Decorative active inflation must be penalized
STRUCTURE DOMINANCE RULE
Primary serum architecture determines: fiber penetration depth · scalp barrier interaction
· buildup potential · cuticle integrity · microbiome stability · long-term fiber strength
trajectory · repeated-use tolerance.
Minor additives, decorative botanicals, and surface-only actives cannot override a
silicone-heavy or alcohol-heavy backbone.
Ingredient evaluation must consider: silicone tier · penetrating vs coating architecture
· formulation pH · scalp vs fiber targeting · repeated-use exposure and buildup ·
realistic active concentration.
CONCENTRATION UNCERTAINTY RULE (NEW)
Late-position or trace ingredients must not trigger strong positive or negative assumptions.
Low-level caffeine, trace panthenol, minor botanical extracts in late position — provide
neither transformative benefit nor significant harm at trace concentrations.
Avoid over-crediting AND over-penalizing. This applies to all scoring dimensions.
Caffeine and niacinamide receive full credit only when present at functional concentrations
(not trace late-position amounts). Trace-level actives receive partial or minimal credit.
---
LEAVE-ON CONTEXT RULE
Hair serums are leave-on or semi-leave-on systems. Unlike rinse-off products, they retain
full scalp and fiber contact. Active evaluation must reflect this.
FULL CREDIT (Leave-On Penetrating Actives at Functional Concentration):
• Minoxidil — clinically regulated, must be noted separately
• Caffeine — scalp-targeted, substantiated follicle delivery at ≥0.2% functional range
• Niacinamide — scalp delivery supported at functional concentration
• Salicylic Acid — scalp keratolytic at appropriate concentrations
• Proven humectants: Glycerin, Panthenol, Betaine
• Low-weight penetrating oils: Argan, Marula, Baobab, Squalane
PARTIAL CREDIT (Limited or Context-Dependent):
• Keratin hydrolysates (low MW — surface film, some cuticle adsorption — real but limited)
• Collagen hydrolysates (low MW — surface conditioning, not structural)
• Zinc derivatives / Zinc PCA (scalp-targeted, partial sebum regulation efficacy)
• Biotin (topical evidence weak — leave-on partial credit only, not full)
• Medium-weight carrier oils
• Panthenol at trace concentration (minor humectant benefit, below full credit threshold)
DECORATIVE / MINIMAL CREDIT:
• Full-weight proteins (too large to penetrate fiber or follicle)
• Vitamin C / Ascorbic Acid (unstable in most serum bases without specialized delivery)
• Most antioxidant botanicals at trace levels
• Collagen (high MW forms — no follicle or cortex penetration)
• Peptides marketed for "hair growth" without clinical substantiation
• Biotin as a primary growth claim driver — marketing inflation
Note: Keratin hydrolysates (low MW), zinc PCA, and panthenol at functional concentration
are NOT equivalent to biotin or high-MW collagen. They provide minor but real supportive
function and should receive partial credit, not be dismissed as decorative.
Decorative active marketing reduces: Ingredient Quality · Formulation Honesty.
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients may provide: minor scalp conditioning · mild soothing · sensory
enhancement · temporary cosmetic slip. They cannot offset: heavy silicone accumulation ·
high-alcohol scalp barrier disruption · synthetic fragrance sensitization burden ·
repeated irritation from scalp-sensitizing preservatives. Apply concentration uncertainty
rule — avoid over-penalizing trace-level ingredients.
BASIC COATING LIMIT RULE
Cosmetic gloss and slip alone cannot achieve high structural scores. Silicone-dominant
or oil-only systems lacking active ingredient delivery, scalp barrier consideration, or
pH optimization receive moderate score ceilings regardless of cosmetic finish.
---
════════════════════════════════════════════════════════════
LAYER 1 — SILICONE TIER SYSTEM
MANDATORY RULE: All silicones must be classified by buildup and occlusion tier before
scoring. Silicone architecture is the primary structural determinant of:
fiber buildup potential · cuticle occlusion · scalp pore loading risk
· long-term fiber porosity disruption · wash-out requirement frequency.
Non-silicone systems (penetrating oil-dominant, water-based humectant systems) must also
be classified for structural impact.
SILICONE TIER TABLE
TIER 1 — HEAVY / OCCLUSIVE
Examples:
Dimethicone (high molecular weight) · Amodimethicone (high build)
Cyclopentasiloxane + Dimethicone blend (heavy systems) · Phenyl Trimethicone
Characteristics:
Significant cuticle occlusion · Long-term fiber buildup · Scalp pore loading risk
Requires clarifying shampoo · May disrupt moisture exchange in cortex over time
Scoring Impact:
Mandatory Buildup Risk penalties · Ingredient Quality ceiling reduction
High Cumulative Buildup Risk
FUNCTIONAL vs MASKING DISTINCTION (NEW):
FUNCTIONAL Tier 1 conditions: damaged/bleached/high-porosity fiber targeting ·
amodimethicone at balanced concentration reducing combing breakage ·
not masking an otherwise dishonest formulation
→ Award Fiber Integrity partial credit + Mechanical Damage Reduction bonus
→ Flag buildup risk while acknowledging functional benefit
MASKING Tier 1 conditions: heavy silicone dominant system + "nourishing treatment"
or "repairing" claims relying on silicone feel · no meaningful penetrating actives
alongside the silicone · multiple heavy silicones stacked without damage-hair justification
→ Formulation Honesty penalty + Buildup Risk penalty activated
Silicones are not inherently dishonest. The penalty is for silicone masking a
non-therapeutic formulation while claiming restorative or treatment performance.
TIER 2 — MODERATE SILICONE
Examples:
Cyclopentasiloxane (light-medium) · Cyclomethicone · Dimethicone (low MW) · Dimethiconol
Characteristics:
Moderate buildup potential · Some evaporation (cyclic silicones) · Blend-dependent
accumulation risk
Scoring Impact:
Moderate Buildup penalties · Improved tolerance with Tier 3–4 systems
TIER 3 — LIGHTWEIGHT / SEMI-PENETRATING
Examples:
Caprylyl Methicone · Bis-PEG/PPG-14/14 Dimethicone (water-soluble) · Water-soluble
silicone derivatives · Silicone Quaterniums in leave-on use
Characteristics:
Low buildup vs Tier 1–2 · Some conditioning without heavy occlusion
More easily rinsed with regular shampoo
Scoring Impact:
Eligible for moderate Barrier Preservation · Reduced cumulative burden vs Tier 1–2
TIER 4 — SILICONE-FREE / PENETRATING ALTERNATIVES
Examples:
Argan Oil · Marula Oil · Squalane · Baobab Oil · Glycerin/Panthenol/Betaine systems
Lightweight fatty acid esters
Characteristics:
No synthetic silicone buildup · Variable penetration depth by molecular weight
Cleanest long-term scalp compatibility
Heavy oils (Castor, Coconut in excess on scalp) — flag separately for follicle
loading risk even though silicone-free.
Scoring Impact:
Eligible for maximum Buildup Safety · Penetrating oils receive Formulation Honesty bonus
SILICONE SYSTEM CLASSIFICATION:
Tier 1 alone → Heavy Occlusion
Tier 1 + Tier 3/4 → Moderate-High Occlusion
Tier 2 alone → Moderate Occlusion
Tier 2 + Tier 3/4 → Moderate-Low Occlusion
Tier 3/4 dominant → Low Occlusion
Silicone-free → Minimal Occlusion
D5/D6 (Cyclopentasiloxane/Cyclohexasiloxane): EU-restricted in leave-on products —
ecological and safety flag required regardless of tier position.
---
════════════════════════════════════════════════════════════
LAYER 2 — SCALP pH RULE
pH is a mandatory scoring modifier for scalp-targeted serums, affecting:
• Scalp barrier recovery · Microbiome stability · Follicle enzymatic activity
• Scalp desquamation control · Antimicrobial peptide function
Physiological scalp pH: 4.5–5.5
High-pH serums increase: cuticle swelling · scalp barrier disruption
· microbiome imbalance · follicle sensitivity
Alcohol-heavy scalp serums raise effective dryness burden regardless of pH.
pH SCORING TIERS (SCALP SERUMS):
4.5–6.0 → Optimal — Barrier Preservation bonus + Microbiome bonus
6.0–6.5 → Acceptable — neutral scoring
6.5–7.5 → Mild penalty
7.5–9.0 → Moderate penalty
>9.0 → Significant penalty — elite Barrier Preservation disqualified
Unknown pH (fiber/styling serum) → No bonus, minor credibility reduction
Unknown pH (scalp-targeted serum) → Stronger credibility reduction
pH penalties apply regardless of silicone gentleness.
A silicone-free system at high pH still receives scalp barrier penalties.
---
════════════════════════════════════════════════════════════
LAYER 3 — SERUM TARGET ZONE CLASSIFICATION
MANDATORY: Every serum must be classified by its intended delivery zone before scoring.
ZONE A — SCALP-TARGETED
Focus: Follicle environment, scalp microbiome, sebum regulation, anti-dandruff, growth support
Active priority: Caffeine (at functional concentration), Niacinamide, Salicylic Acid,
Zinc/Zinc PCA, Minoxidil (clinical — flag separately), scalp humectants
Key risks: Alcohol barrier disruption, antimicrobial overloading, clogging agents
pH relevance: High
Scoring modifier: Scalp safety and microbiome scores are dominant
ZONE B — FIBER-TARGETED
Focus: Cuticle integrity, cortex hydration, porosity management, breakage reduction, frizz control
Active priority: Keratin hydrolysates (low MW), penetrating oils, panthenol, humectants
Key risks: Heavy silicone buildup, occlusive coating without penetration, protein overload
pH relevance: Moderate (cuticle smoothing)
Scoring modifier: Buildup Risk and Fiber Integrity are dominant
ZONE C — DUAL / SCALP-TO-ENDS
Combined risks from both zones must be evaluated.
Penalize if scalp-problematic ingredients (high alcohol, occlusive silicones) dominate.
ZONE D — STYLING / FINISHING SERUM
Focus: Gloss, frizz control, heat protection finish
Active priority: Silicones, lightweight oils, thermal protectants
Not evaluated for biological delivery — evaluated on buildup, safety, and fiber integrity only
Scoring modifier: Formulation Honesty critical — must not be marketed as "treatment"
Occasional-use finishing serums evaluated under realistic application frequency, not daily.
---
════════════════════════════════════════════════════════════
LAYER 3.5 — THERAPEUTIC CONTEXT RULE (NEW)
If a scalp serum contains a Category A therapeutic active at functional concentration:
Salicylic Acid (keratolytic) · Piroctone Olamine · Zinc Pyrithione · Ketoconazole
· Ciclopirox · Niacinamide at therapeutic concentration
AND the formula is clearly treatment-oriented for a scalp condition
(seborrheic dermatitis, dandruff, scalp inflammation, folliculitis):
THEN:
• Harshness and structural penalties remain active
• Effectiveness ceiling increases for target scalp condition
• Scalp Compatibility penalty softens slightly (intermittent use simulation)
• Formulation Honesty does NOT penalize treatment-focused formulation weight
• Long-Term Usability simulates prescribed/alternating frequency, not daily cosmetic use
This prevents anti-dandruff or medicated scalp serums from being scored as failed
cosmetic products. It does not remove structural penalties — it contextualizes them.
Targeted therapeutic actives in the correct zone receive context credit, not penalty.
---
════════════════════════════════════════════════════════════
LAYER 4 — ALCOHOL IMPACT RULE (GRADUATED — REFINED)
MANDATORY: Alcohol type and concentration must be assessed for all serums.
HIGH CONCERN (Drying / Barrier Disrupting):
Alcohol Denat · Ethanol / SD Alcohol · Isopropyl Alcohol (at dominant concentration)
LOW CONCERN (Fatty / Non-Drying — never penalized):
Cetyl Alcohol · Stearyl Alcohol · Behenyl Alcohol · Cetearyl Alcohol
GRADUATED DRYING ALCOHOL PENALTY (NEW — replaces binary rule):
>25% scalp leave-on daily → Mandatory Safety + Barrier penalty (severe)
15–25% scalp leave-on daily → Significant penalty
8–15% scalp leave-on daily → Moderate concern, frequency-dependent
3–8% scalp leave-on → Mild concern — noted, not dominant penalty
<3% scalp leave-on → Minor concern, trace level
Therapeutic scalp serum context → Penalty reduced one tier if alcohol is a functional
delivery vehicle for a validated active (not merely a drying agent)
Fiber serum (non-scalp) → Reduced concern relative to scalp serums
Occasional-use finishing/styling serum → Further reduced concern
APPLICATION RULES:
• Drying alcohols in scalp serums increase: scalp barrier disruption · microbiome
  disruption risk · Cumulative Irritation Risk
• Fatty alcohols provide conditioning — no penalty under any conditions
• High-alcohol scalp formulations reduce Safety and Scalp Compatibility regardless
  of active quality, unless therapeutic context modifier applies
OUTPUT RULE: Fatty alcohol presence must never be counted as a drying alcohol penalty.
---
════════════════════════════════════════════════════════════
LAYER 4.5 — PENETRATION ARCHITECTURE RULE
Active ingredients must be evaluated for realistic follicle and fiber delivery.
Concentration uncertainty rule applies — trace-level actives receive reduced credit.
FIBER PENETRATING (Cortex-reaching at functional levels):
Low molecular weight oils (Argan, Marula, Baobab, Squalane) · Glycerin · Panthenol
Betaine · Low molecular weight keratin hydrolysates
CUTICLE-SURFACE ONLY:
High molecular weight proteins · Most silicones · Heavy waxes
FOLLICLE-REACHING (Scalp serums — functional concentration required):
Caffeine (≥0.2% functional range — substantiated)
Minoxidil (clinical — flag)
Niacinamide (at functional concentration)
Salicylic Acid (at appropriate concentration)
Glycerin / Panthenol
DECORATIVE / MARKETING CLAIMS:
"Biotin for growth" — topical delivery not substantiated for follicle benefit
Collagen — molecular weight too high
Full-weight proteins — fiber penetration not supported
Most antioxidant botanicals at trace concentration
---
════════════════════════════════════════════════════════════
LAYER 4.6 — COLORANT PENALTY RULE
Artificial/decorative colorants provide no hair, fiber, or scalp benefit and increase
sensitization burden — particularly concerning in leave-on scalp serums.
HIGH CONCERN: FD&C dyes (Red 40, Yellow 5, Blue 1, etc.) · Synthetic dye blends
Scoring Impact: Allergy Risk penalty · Ingredient Quality penalty · Formulation Honesty penalty
Colorants must appear under Concerns, Why This Rating, and Key Structural Ingredients.
---
════════════════════════════════════════════════════════════
LAYER 4.7 — FRAGRANCE AND ESSENTIAL OIL RULE (GRADUATED — REFINED)
Leave-on fragrance exposure is significantly higher than rinse-off — weight heavily.
However, not all fragrance levels are equal.
GRADUATED FRAGRANCE PENALTY (NEW):
LOW–MODERATE FRAGRANCE:
Fragrance/Parfum in late-to-mid position · Non-photosensitizing
No high-concern allergens declared
→ Moderate Allergy Risk penalty only. Do not collapse Safety or overall score.
HEAVY / PERFUME-DRIVEN FRAGRANCE:
Fragrance/Parfum in top-third of ingredient list · Multiple essential oils stacked
Known allergens declared (Limonene, Linalool, Eugenol, Geraniol, Citral)
→ Strong Allergy Risk penalty + Cumulative Irritation Risk penalty
→ Cannot achieve elite Safety or Allergy Risk scores
SCALP-TARGETED SERUM + HEAVY FRAGRANCE:
Any Zone A scalp serum + heavy fragrance loading
High drying alcohol + heavy fragrance (solvent amplifies scalp penetration)
→ Enhanced contradiction penalty — structural dishonesty flagged
→ The combination of alcohol vehicle + fragrance + daily scalp leave-on = maximum concern
PHOTOSENSITIZING OILS (Bergamot cold-press, expressed citrus):
→ Additional UV-exposure warning required in output regardless of load level
PRESERVATIVE CONCERN:
Methylisothiazolinone (MIT) — known scalp sensitizer, high penalty in leave-on serums
Formaldehyde-releasing preservatives — flag and penalize
Parabens — moderate concern, flag under Allergy Risk
Phenoxyethanol — generally acceptable, minor note
Do not collapse overall scores from moderate fragrance alone.
---
════════════════════════════════════════════════════════════
LAYER 4.8 — HERBAL / ORGANIC VALIDATION (NEW)
HERBAL EVIDENCE CLASSIFICATION:
H1 — EVIDENCE-SUPPORTED FUNCTIONAL HERBALS
Examples: Aloe Vera · Centella Asiatica · Green Tea extract (EGCG) · Niacinamide-adjacent
botanicals · Licorice root (scalp anti-inflammatory) · Fermented plant extracts
Tea Tree Oil (concentration-dependent, scalp antimicrobial)
Rule: Partial functional credit if: reasonable concentration likely · biologically
plausible in leave-on scalp or fiber delivery context · formulation architecture compatible.
Do not over-credit. Acknowledge minor but real supportive function.
H2 — TRADITIONAL / PARTIAL-EVIDENCE HERBALS
Examples: Bhringraj · Amla · Rosemary (oil) · Fenugreek · Rice Water · Hibiscus
Rule: Recognize traditional use and mild supportive role. Do NOT allow hair growth,
follicle restoration, or strong clinical claims.
Output: "traditional supportive use with limited modern leave-on clinical evidence."
H3 — MARKETING / DECORATIVE HERBALS
Examples: Gold dust botanicals · Exotic micro-extract luxury stacks
20+ botanical inflation with no plausible delivery mechanism
Rule: No performance credit. Triggers Formulation Honesty reduction + Botanical Inflation flag.
GENUINE vs GIMMICK HERBAL DISTINCTION:
Genuine signals: mild silicone or oil architecture · coherent botanical strategy
low fragrance burden · realistic claims · scalp-compatible pH · reasonable simplicity
Gimmick signals: heavy silicone or alcohol backbone + herbal front marketing
essential oil overload · 20+ extract inflation · perfume-heavy "Ayurvedic" serum claims
"hair growth" or "follicle restoration" positioning without validated actives
🌿 HERBAL / ORGANIC REALISM block must appear in output for herbal-positioned serums,
evaluating: evidence quality · traditional vs clinical support · leave-on delivery realism
· essential oil burden · botanical inflation · authenticity of herbal positioning.
---
════════════════════════════════════════════════════════════
LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 for every parameter.
SAFETY [DOMINANT]
Evaluates:
• Silicone occlusion risk (Tier 1 weighted most heavily)
• Scalp barrier disruption risk (graduated alcohol penalty)
• Repeated-use irritation burden
• Sensitization potential (fragrance, preservative, essential oil — graduated)
• pH-related scalp stress
• Cumulative inflammatory load
• Follicle clogging risk
Core Rules:
• Repeated low-grade irritation reduces Safety
• Daily-use leave-on frequency magnifies irritation burden significantly
• Therapeutic context modifier applies when scalp condition is the target
• Safety overrides: shine perception · slip and texture · luxury positioning
EFFECTIVENESS
Core Question: Can the serum deliver meaningful and lasting benefit to scalp
or fiber under repeated use?
Evaluates:
• Active ingredient delivery realism to target zone
• Fiber penetration depth (molecular weight supported)
• Scalp target zone efficacy (functional concentration required)
• Coating vs treatment architecture
• pH suitability for target zone
• Repeated-use functional benefit
• Structural formulation honesty
High effectiveness requires:
• Deliverable actives at substantiated concentrations reaching target zone
• Barrier-considerate design
• Honest serum zone classification
Rules:
• Cosmetic coating alone cannot achieve elite effectiveness
• Decorative active inflation (biotin as primary driver, high-MW collagen) cannot receive full credit
• Supportive actives (low-MW keratin, zinc PCA, panthenol) receive appropriate partial credit
• Ignore: marketing claims · shine perception · instant slip · luxury positioning
ALLERGY RISK
Evaluates:
• Fragrance exposure (leave-on — graduated by severity per Layer 4.7)
• Essential oil sensitizers and photosensitizing oils
• Preservative sensitizers (MIT weighted highest)
• Botanical allergens
• Repeated-use trigger accumulation under daily leave-on conditions
Application Rules:
• Leave-on fragrance risk is significantly higher than rinse-off — always
• Graduated penalty by fragrance load and ingredient position
• Do not collapse scores from moderate fragrance alone
• Photosensitizing oils flagged regardless of load level
ECO IMPACT
Evaluates:
• Silicone biodegradability
• D5/D6 environmental persistence (EU-restricted — flag)
• Ecological accumulation risk of core ingredients
• Unnecessary formulation burden
General Rules:
• D5 (Cyclopentasiloxane) and D6 (Cyclohexasiloxane): EU-restricted in leave-on — flag
• Penetrating oil and water-based humectant systems receive ecological preference
• Persistent synthetic preservatives reduce score
INGREDIENT QUALITY
Evaluates:
• Silicone system coherence for zone classification
• Active ingredient delivery honesty (concentration realism)
• Scalp/fiber architecture balance
• Functional ingredient synergy
• Structural transparency
• Absence of decorative inflation
Rules:
• Decorative active stacking (biotin + collagen + peptide inflation) reduces credibility
• Non-functional botanical loading reduces transparency
• Leave-on actives must justify realistic delivery, zone, and concentration
• Supportive ingredients credited appropriately — not treated as decoratives
SKIN / SCALP COMPATIBILITY
Evaluates:
• Daily-use scalp tolerance
• Follicle environment integrity
• Scalp dryness/oiliness trajectory
• Microbiome stability
• Long-term sensitization risk
• Cuticle integrity maintenance
Core Rules:
• Temporary shine does not equal compatibility
• Long-term repeated-use behavior prioritized over immediate cosmetic feel
• Therapeutic context modifier applies when scalp condition is the treatment target
CORE SCORE FORMULA:
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin/Scalp Compatibility × 0.15)
---
════════════════════════════════════════════════════════════
LAYER 6 — SPECIALIZED SERUM PERFORMANCE
Score Range: 1.0 → 5.0
ACTIVE DELIVERY EFFICACY
Evaluates:
• Follicle-reaching active performance (scalp serums — Zone A)
• Fiber-reaching active performance (treatment serums — Zone B)
• Decorative vs functional active ratio
• Penetration architecture support for active delivery
• Concentration realism (trace vs functional)
Core Rules:
• Cosmetic coating cannot substitute for active delivery
• Biotin, full-weight peptides, high-MW collagen — decorative unless compelling
  substantiation provided
• Caffeine at ≥0.2%, Niacinamide at functional concentration, Salicylic Acid,
  Zinc PCA — full credit in correct zone at realistic concentration
• Low-MW keratin hydrolysates, panthenol — partial credit
• Trace-level actives receive reduced credit (concentration uncertainty rule applies)
CEILING RULE:
Tier 1 silicone-dominant systems without meaningful penetrating actives cannot achieve
maximum Active Delivery scores — coating ≠ delivery.
CUTICLE AND FIBER INTEGRITY [DOMINANT]
Evaluates:
• Cuticle smoothing without occlusion
• Fiber porosity management
• Breakage risk reduction
• Penetrating vs coating architecture
• Long-term fiber strength trajectory
INTEGRITY CEILINGS:
Tier 1 silicone dominant (no functional context) → Max 2.0
Tier 1 silicone (functional damaged-hair context) → Max 2.8 (functional modifier applied)
Tier 1 + Tier 3/4 → Max 2.8
Tier 2 dominant → Max 3.2
Tier 2 + penetrating actives → Max 3.7
Tier 3/4 / penetrating oil dominant → Max 4.3
Tier 4 at physiological pH + proven actives → Eligible for 5.0
Heavy alcohol scalp systems (>15%) → Ceiling 2.5
Heavy alcohol scalp systems (therapeutic context, 8–15%) → Ceiling 3.0
Core Rules:
• Temporary shine = cosmetic gloss, not fiber integrity
• Heavy silicone systems without functional justification cannot achieve elite scores
• Functional silicone (amodimethicone reducing combing breakage on damaged fiber)
  receives partial Integrity credit + Mechanical Damage Reduction bonus per Layer 1
SCALP HEALTH SUPPORT
Evaluates:
• Scalp barrier preservation
• Sebum regulation support
• Follicle environment support (pH-mediated)
• Absence of follicle-clogging agents
• Active delivery to follicle environment
Core Rules:
• Scalp health requires active delivery, not just carrier oils or silicones
• Reduced scalp disruption counts as scalp health success
• Silicone-heavy or high-alcohol systems cannot score highly here unless
  therapeutic context modifier applies
• Heavy natural oils (Castor, high-concentration Coconut) on scalp require
  follicle-clogging flag even when silicone-free
BUILDUP AND RESIDUE RISK
Evaluates:
• Silicone accumulation over repeated use
• Fiber coating saturation trajectory
• Scalp pore clogging potential
• Wash-out difficulty and clarifying requirement frequency
• Long-term porosity disruption
Core Rules:
• Repeated buildup signals structural fiber stress
• Tier 1 silicones increase long-term buildup risk
• Functional silicone use (damaged hair) — flag buildup risk while crediting function
• Heavy natural oil buildup on scalp requires same evaluation rigor as silicone
MICROBIOME COMPATIBILITY
Evaluates:
• Scalp commensal microbiome preservation
• pH-mediated microbial stability
• Broad-spectrum antimicrobial risk
• Alcohol-mediated microbiome disruption (graduated by concentration)
• Long-term scalp microbiome balance
Core Rules:
• Routine scalp microbiome disruption reduces score
• Targeted anti-dandruff actives (Zinc PCA, Piroctone Olamine, Ketoconazole, SA)
  receive contextual credit under therapeutic context rule (Layer 3.5)
• High-alcohol scalp serums reduce microbiome compatibility (graduated by concentration)
• Broad-spectrum antimicrobials without scalp condition indication receive penalties
CUMULATIVE IRRITATION RISK
Evaluates:
• Repeated fragrance exposure — leave-on amplified, graduated by load
• Sensitizing preservative accumulation (MIT highest concern)
• Essential oil sensitizer accumulation
• Alcohol scalp barrier stress (graduated by concentration)
• Chronic inflammatory burden
• Frequency-weighted daily leave-on exposure
Core Rules:
• Leave-on daily/twice-daily exposure amplifies irritation burden significantly
• Mild sensitizers become clinically relevant under chronic leave-on exposure
• Long-term low-grade sensitization prioritized over isolated acute reactions
• Therapeutic serums simulate at prescribed frequency, not daily cosmetic use
• Do not collapse scores from moderate fragrance alone (graduated penalty applies)
FORMULATION HONESTY
Evaluates:
• Coating-first architecture marketed as "treatment"
• Fragrance-driven sensory positioning
• Decorative botanical or protein loading
• Growth-claim active inflation (biotin, collagen, peptides as primary drivers)
• Ingredient-list inflation
• "Nourishing/repairing" claims without penetrating architecture
• "Microbiome-balancing" claims lacking pH or antimicrobial structural support
• Herbal gimmick positioning (per Layer 4.8)
Core Rules:
• Glossy finish does not equal hair treatment
• Clinical claims (growth, follicle restoration) require substantiated actives — flag all others
• Supportive actives (low-MW keratin, zinc PCA, panthenol) may be honestly referenced
  — not equivalent to empty biotin or collagen marketing
• Functional silicone honestly communicated (Zone D finishing serum) receives no penalty
• Silicone-dominant formula claiming "restorative treatment" without penetrating actives = dishonest
SPECIALIZED PERFORMANCE SCORE =
Average of all 7 specialized scores.
Dominant Parameters:
• Cuticle and Fiber Integrity → primary interpretive parameter
• Cumulative Irritation Risk → primary penalty parameter (leave-on amplified)
• Formulation Honesty → primary transparency parameter
---
════════════════════════════════════════════════════════════
LAYER 7 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) + (Specialized Performance Score × 0.50)
Core and Specialized scores carry equal weight.
This prevents: marketing-driven performance inflation · safe-but-ineffective inflation
· glossy-coating architecture passing as treatment scoring.
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES:
• Tier 3 or Tier 4 silicone system OR silicone-free architecture
• pH ≤ 7.5 for scalp serums (preferably 4.5–6.5)
• Cuticle and Fiber Integrity ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No decorative active inflation as primary claim drivers
• No dominant heavy fragrance in daily leave-on scalp serum
• Formulation Honesty ≥ 3.5
• No unjustified broad-spectrum antimicrobial dominance
• No D5/D6 at primary position (EU-flagged)
DISQUALIFIERS:
• Primary Tier 1 heavy silicone marketed as "treatment" without functional context
• High drying alcohol (>20%) scalp daily leave-on without therapeutic justification
• Heavy fragrance dominant in daily leave-on scalp serum
• Decorative Category C active marketing (biotin, high-MW collagen) as primary claim
• MIT or formaldehyde-releasing preservatives in leave-on scalp serum
---
════════════════════════════════════════════════════════════
LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Daily serum application at realistic frequency for zone type
• Buildup accumulation over repeated use
• Scalp barrier stress recovery cycles
• Long-term fiber porosity trajectory
• Post-application scalp pH recovery
• Long-term microbiome stability
• Repeated fragrance/preservative sensitization (leave-on amplified)
• Therapeutic serums simulated at prescribed/alternating frequency
• Finishing/styling serums simulated at realistic occasional-to-daily frequency
Core Question:
Can the serum remain tolerable, beneficial, and non-accumulative under long-term
real-world use at its realistic application frequency?
Core Rules:
• Leave-on buildup = cumulative fiber stress signal
• Shine perception ≠ fiber health
• Long-term repeated-use behavior overrides short-term cosmetic feel
• Therapeutic serum: do not simulate at daily cosmetic frequency
ANTI-MARKETING FILTER
Mandatory penalties apply for:
• Shine-first "treatment" claims from silicone coating architecture
• Fragrance-driven "healthy hair" positioning
• Growth claim active inflation (biotin, high-MW collagen, generic peptides)
• "Strengthening" claims without penetrating architecture
• Silicone-dominant formulas marketed as "nourishing treatments" without functional context
• Essential oil marketing without follicle delivery evidence
• "Microbiome-balancing" claims lacking pH or antimicrobial structural support
• Herbal gimmick positioning on heavy silicone or alcohol backbone (Layer 4.8)
BIAS NEUTRALIZATION FILTER
Neutralize:
• Shine = health illusion
• Slip = nourishment illusion
• "Natural oil = penetrating treatment" bias (molecular weight must support claim)
• Botanical inflation bias
• Luxury texture bias
• Biotin topical health halo
• Protein/collagen treatment halo
• Ingredient-count quality illusion
• Heavy silicone = frizz control = hair health illusion
• "Silicone-free = always better" bias (functional silicone may reduce breakage on
  processed hair — evaluate contextually)
• "Natural scalp oil = non-clogging" bias (heavy natural oils can occlude follicles)
ENGINE CALIBRATION TARGET:
Modern dermatology + cosmetic chemistry + trichology +
real-world tolerability + long-term scalp and fiber physiology.
STRICT BUT FAIR. SCIENTIFIC BUT PRACTICAL.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 💇 SERUM PROFILE

## Functional Classification

Short serum classification.

Examples:
- Scalp Treatment Serum
- Penetrating Fiber Serum
- Silicone Finishing Serum
- Lightweight Nourishing Serum
- Growth Support Serum (Substantiated / Unsubstantiated)
- Dual Scalp-to-Ends Serum

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering silicone tier and architecture, active delivery realism, scalp and fiber compatibility, pH compatibility (if scalp-targeted), long-term hair behavior, and overall formulation balance.

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

## Active Delivery + Scalp Health Analysis

### Active Delivery Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cuticle and Fiber Integrity — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Health Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Buildup and Residue Risk — ⭐X.X

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

### Sensitive Scalp — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Every Other Day — ⭐X.X

Short explanation.

### Occasional / Styling Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Slip, gloss, and frizz control
- Scalp sensation
- Irritation signals

## Medium-Term

- Fiber strength and porosity response
- Buildup accumulation signals
- Scalp tolerance development

## Long-Term

- Fiber integrity trajectory
- Buildup and clarifying frequency need
- Scalp microbiome stability
- Overall hair health outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting silicone architecture, scalp and fiber delivery, buildup and occlusion behavior, active performance, and long-term hair and scalp outcome.

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
- Mention harsh fragrance (leave-on amplified), preservatives, and sensitizing essential oils in output
- No shine-volume bias
- Structural weakness overrides cosmetic feel
- Silicone tier must be classified before scoring
- pH compatibility must be assessed for all scalp-targeted serums
- Leave-on active delivery must be classified before Effectiveness scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-application buildup = structural failure signal
- Shine richness ≠ hair health
- Natural oil ≠ penetrating treatment (molecular weight must support claim)
- Fragrance freshness ≠ scalp or fiber health benefit
- Biotin topical halo must be neutralized
- Growth claims require substantiated actives — flag all others
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hair Serum Evaluation Algorithm — Structured for silicone architecture analysis, active delivery realism, and long-term scalp and fiber health evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict hair serum structural evaluation engine."
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