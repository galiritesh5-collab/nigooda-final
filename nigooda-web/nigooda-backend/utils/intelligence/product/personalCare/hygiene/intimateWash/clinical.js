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
        "INTIMATEWASH ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 3 — INTIMATE WASH / INTIMATE CLEANSER EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward intimate washes that demonstrate:
• Effective external genital cleansing with absolute minimal mucosal disruption
• Ultra-mild surfactant architecture appropriate for mucosal-adjacent tissue
• Preservation of the vulvar acid mantle and vaginal microbiome
• Strict physiological pH compatibility with vulvar and vestibular tissue
• Long-term Lactobacillus-dominant microbiome protection
• Evidence-based formulation design free from marketing-driven active inflation
• Absolute lowest possible cumulative irritation risk
• Fragrance-free or fragrance-minimal architecture
Mandatory penalties apply for:
• Any surfactant system not explicitly designed for mucosal-adjacent use
• Fragrance in any meaningful concentration — the most critical intimate wash concern
• Essential oil use near mucosal tissue
• Antibacterial actives without specific clinical justification
• Rinse-off active inflation (vitamins, peptides, collagen, AHAs in wash-off format)
• Marketing-driven "balancing," "freshness," or "odour neutralising" claims without structural support
• Harsh preservative systems (MI/MCI mandatory ban)
INTIMATE WASH CONTEXT RULE — MANDATORY PRIMARY MODIFIER
Anatomical target: External genitalia — mucosal and mucosal-adjacent skin, significantly more
permeable, more sensitive, and thinner stratum corneum than facial or body skin. NOT intended
for internal vaginal use — internal douching is contraindicated.
Microbiome context: The vaginal and vulvar microbiome is dominated by Lactobacillus species.
Lactobacillus produces lactic acid, maintaining vaginal pH ~3.8–4.5. This acid environment
actively suppresses pathogens including Gardnerella vaginalis (BV), Candida, and Trichomonas.
ANY product disrupting this pH or microbial balance risks BV and vulvovaginal candidiasis.
pH context: Vaginal pH ~3.8–4.5 (Lactobacillus-maintained). Vulvar skin pH ~4.5–5.5.
External genital pH must be maintained within this narrow physiological window. pH drift above
5.5 creates conditions for BV-associated dysbiosis.
Use context: Once or twice daily external wash. Lower mechanical barrier than facial skin.
Contact with mucosal tissue during application and rinsing. Any incomplete rinsing leaves
actives/surfactants in direct contact with sensitive tissue.
SCORING MANDATE: Every scoring decision must reflect proximity to mucosal tissue and the
fragility of the vulvovaginal microbiome. The margin for error is significantly narrower
than any other topical cleanser category.
TRANSPARENCY PRIORITY RULE
Ignore: branding, gynaecologist-endorsed marketing, foam richness, fragrance freshness,
"pH-balanced" marketing without actual pH declaration, "natural/organic/botanical/floral" claims,
"odour-neutralising" or "freshness" sensory engineering, ingredient-count inflation.
Evaluate only: surfactant mildness relative to mucosal tissue, pH physiological accuracy
(3.5–5.5 for vulvar/vestibular application), fragrance and essential oil load (zero tolerance
standard), preservative safety for mucosal-adjacent use, microbiome disruption risk, structural
formulation honesty, long-term vaginal ecosystem compatibility.
GLOBAL ENFORCEMENT RULES:
• Surfactant architecture is the dominant structural determinant — must be ultra-mild
• pH is a co-dominant parameter for intimate wash — equal weight to surfactants
• Fragrance is the single highest individual concern — mandatory penalty regardless of claimed dilution
• Safety and microbiome penalties override all functional bonuses
• "pH-balanced" claims MUST be verified against physiological target (3.5–5.5) — not generic "neutral"
• MI/MCI are absolutely contraindicated in intimate wash — mandatory disqualification-level penalty
• Internal use claims are outside cosmetic scope — any such implication receives mandatory
 Formulation Honesty penalty
---
LAYER 1 — SURFACTANT HARSHNESS TIER SYSTEM — INTIMATE-SPECIFIC
INTIMATE HARSHNESS AMPLIFICATION RULE: The same surfactant tier that receives a moderate
penalty in face wash receives a severe penalty in intimate wash. Mucosal and mucosal-adjacent
tissue is fundamentally more vulnerable than facial stratum corneum.
TIER 1 — HARSH (CONTRAINDICATED FOR INTIMATE USE)
Examples: SLS, SLES as primary surfactant, ALS, LAS, Sodium C14-16 Olefin Sulfonate,
traditional and potassium soap systems.
In intimate context: Severe mucosal tissue disruption, significant acid mantle destruction,
protein denaturation at vestibular tissue, destruction of Lactobacillus-protective environment,
direct risk of BV and VVC susceptibility increase.
Scoring: Mandatory severe Safety penalties. Barrier Preservation hard ceiling: 1.5.
Microbiome Compatibility hard ceiling: 1.5. Intimate Use Compatibility: FAIL.
TIER 2 — MODERATE (STRONGLY DISCOURAGED FOR INTIMATE USE)
Examples: SCI, Sodium Lauroyl Methyl Isethionate, Disodium Laureth Sulfosuccinate, SLES in
blended systems.
In intimate context: Moderate mucosal-adjacent disruption per wash. Still risky under daily
repeated intimate use.
Scoring: Significant Safety penalties. Barrier Preservation ceiling: 2.5. Only acceptable when
blended extensively with Tier 3–4 AND at physiological pH.
TIER 3 — MILD (ACCEPTABLE WITH CONDITIONS)
Examples: CAPB, Lauryl Betaine, Sodium Cocoamphoacetate, Disodium Cocoamphodiacetate,
Sodium Cocoyl Glycinate, Sodium Lauroamphoacetate.
In intimate context: Low mucosal disruption per wash. Acceptable for intimate use at
appropriate pH. CAPB sensitisation potential requires Allergy Risk note.
Scoring: Eligible for moderate Barrier Preservation. Compatible when pH-controlled (3.5–5.5).
TIER 4 — VERY MILD (PREFERRED FOR INTIMATE USE)
Examples: Decyl Glucoside, Coco Glucoside, Lauryl Glucoside, Sodium Cocoyl Glutamate,
Disodium Cocoyl Glutamate, Sodium Lauroyl Sarcosinate, Sodium Cocoyl Alaninate, amino
acid/glucoside blends.
In intimate context: Minimal mucosal disruption, most compatible with Lactobacillus-environment
preservation, preferred architecture for intimate wash.
Scoring: Eligible for maximum Barrier Preservation (conditional on pH). Transparency bonus eligible.
TIER 5 — ULTRA-MILD (OPTIMAL FOR INTIMATE USE)
Examples: Water-only or extremely dilute surfactant systems, micellar water architecture,
polyglyceryl-based emulsifiers, Coco-Glucoside at minimal concentration with humectant base.
In intimate context: Near-zero mucosal disruption, preserves acid mantle maximally, highest
Lactobacillus environment compatibility.
Scoring: Eligible for elite scores across all parameters.
SURFACTANT SYSTEM RULE — INTIMATE:
• Tier 1 alone → Contraindicated (severe penalties, hard ceilings)
• Tier 1 + Tier 3/4 → Still problematic — not acceptable
• Tier 2 alone → Strongly discouraged
• Tier 2 + Tier 3/4 at physiological pH → Minimally acceptable — caution required
• Tier 3/4 dominant at physiological pH → Acceptable
• Tier 4/5 dominant at physiological pH → Preferred
• Water/micellar at physiological pH → Optimal
---
LAYER 2 — INTIMATE WASH pH RULE [CO-DOMINANT]
pH is a co-dominant scoring parameter equal in importance to surfactant system. Any product
that shifts vulvovaginal pH is directly threatening the Lactobacillus ecosystem.
PHYSIOLOGICAL pH TARGETS: Vaginal pH ~3.8–4.5. Vulvar skin pH ~4.5–5.5.
Intimate wash target pH: 3.5–5.5.
NOTE: Ingredient lists alone cannot reliably confirm final formulation pH. pH scoring is
applied based on declared pH values, strong positional evidence of acidifying ingredients
(lactic acid, sodium lactate), or contextual formulation architecture assessment. Where pH
is undeclared, no bonus is assigned and a minor credibility reduction applies.
INTIMATE pH SCORING TIERS:
3.5–5.0 → Optimal — maximum Barrier Preservation and Microbiome Compatibility bonuses
5.0–5.5 → Acceptable — minor reduction in microbiome bonus
5.5–6.0 → Marginal — mild Barrier Preservation and Microbiome penalties
6.0–6.5 → Borderline — moderate penalties; "pH-balanced" marketing at this range receives
          Formulation Honesty penalty
6.5–7.5 → Problematic — significant penalties across Barrier Preservation, Microbiome
          Compatibility, Safety
7.5–9.0 → Harmful — major penalties
>9.0 → Contraindicated — hard ceiling penalties across all parameters; Intimate Use: FAIL
Unknown pH → No pH-related bonuses; "pH-balanced" marketing without declared pH → Formulation
            Honesty penalty
---
LAYER 3 — FRAGRANCE AND ESSENTIAL OIL RULE [CRITICAL INTIMATE CONCERN]
FRAGRANCE IS THE SINGLE HIGHEST RISK INGREDIENT CATEGORY IN INTIMATE WASH.
The vulvar and vestibular area is mucosal-adjacent (higher permeability), a site of frequent
contact dermatitis and sensitisation, anatomically enclosed with reduced aeration and increased
contact time, and at risk from low-level fragrance that would be tolerable elsewhere.
FRAGRANCE RISK TIERS — INTIMATE WASH:
Zero fragrance → Full Allergy Risk score eligibility, maximum Formulation Honesty credit
Trace fragrance (<0.01%) → Minor Allergy Risk notation
Low fragrance (0.01–0.1%) → Moderate Allergy Risk penalty, Cumulative Irritation Risk penalty
Moderate fragrance (0.1–0.5%) → Significant penalties, mandatory Formulation Honesty penalty
High fragrance (>0.5% or in top-10 ingredients) → Severe penalties across Allergy Risk, Safety,
Cumulative Irritation Risk; Intimate Use Compatibility critically reduced; mandatory concern flag
ESSENTIAL OIL RULE — INTIMATE WASH: All essential oils in intimate wash receive mandatory
Allergy Risk and Cumulative Irritation Risk penalties. Terpene sensitisers (limonene, linalool,
geraniol) cause contact dermatitis on mucosal tissue at lower concentrations than general skin.
"Natural antibacterial" essential oils (tea tree, lavender, eucalyptus) disrupt Lactobacillus
as well as pathogens — net negative for vaginal ecosystem. "Natural freshness" essential oil
positioning is an aggravating marketing concern, not a mitigating factor.
---
LAYER 4 — PRESERVATIVE COMPATIBILITY RULE — INTIMATE SPECIFIC
ABSOLUTELY CONTRAINDICATED IN INTIMATE WASH:
• Methylisothiazolinone (MI) — mucosal sensitiser, disqualification-level penalty
• Methylchloroisothiazolinone (MCI) — same, disqualification-level penalty
• Formaldehyde releasers (DMDM Hydantoin, Imidazolidinyl Urea, Diazolidinyl Urea,
 Quaternium-15) — mucosal irritation and sensitisation risk
• Iodopropynyl Butylcarbamate (IPBC) — contraindicated for mucosal use
ACCEPTABLE WITH MONITORING:
• Phenoxyethanol at ≤1%: generally tolerated; mucosal exposure monitoring required
• Sodium Benzoate/Potassium Sorbate at low levels: widely accepted at physiological pH
• Ethylhexylglycerin at low levels: mild, generally tolerated
PREFERRED:
• Sodium Benzoate + Potassium Sorbate combination at low levels
• Gluconolactone (self-preserving humectant): gentle, pH-compatible
• Low-level multi-active preservation systems without isothiazolinones
MI, MCI, and formaldehyde releasers MUST be flagged under Concerns and Why This Rating.
---
LAYER 5 — MICROBIOME IMPACT RULE — INTIMATE SPECIFIC
MICROBIOME COMPATIBILITY IS A CO-DOMINANT PARAMETER.
Higher microbiome disruption risk:
• Any pH >6.0 — shifts environment toward BV-associated flora
• Broad-spectrum antimicrobials at any concentration: Triclosan, Chlorhexidine, BKC,
 tea tree oil/eucalyptus/thyme essential oils at functional antimicrobial levels
• SLS-dominant surfactant systems
• High-fragrance formulations (indirect pathway via mucosal irritation)
• Deodorising agents that suppress natural Lactobacillus byproduct odours
INTIMATE ANTIMICROBIAL RULE: Antimicrobial actives in intimate wash are almost never
structurally appropriate for cosmetic use. The Lactobacillus ecosystem IS the antimicrobial
defence system. Adding antimicrobial actives risks destroying the protective flora — net
negative outcome.
Microbiome-supportive ingredients (credit-eligible):
• Lactic Acid at pH-appropriate concentrations: maintains Lactobacillus environment
• Sodium Lactate: physiological pH buffering
• Prebiotic fibres (inulin, FOS) at functional concentrations: conditional partial credit
Low disruption risk: Tier 4/5 surfactant systems at pH 3.5–5.0, fragrance-free formulations,
gentle preservative systems (benzoate/sorbate).
---
LAYER 5.5 — COLORANT PENALTY RULE
Artificial colorants in intimate wash contact mucosal-adjacent tissue — penalties are amplified.
High concern: Red 40, Yellow 5, Yellow 6, Blue 1, Green 3, multiple synthetic dye blends.
Scoring impact: Allergy Risk penalty (amplified), Ingredient Quality penalty, Cumulative
Irritation Risk penalty, Formulation Honesty penalty. Products containing them receive mandatory
concern flagging. There is no justification for synthetic colorants in intimate wash.
---
LAYER 5.6 — HERBAL AUTHENTICITY ENGINE
Applies when herbal, ayurvedic, botanical, organic, natural, or plant-based marketing is present.
H1 — Evidence-Supported (soothing context): Aloe Vera, Allantoin, Bisabolol, Calendula,
Chamomile — partial soothing credit at functional concentrations when formulation architecture
supports relevance. No credit for trace inclusion.
H2 — Traditional/Partial-Evidence: Tulsi, Rose, Lavender, Neem — minor contextual credit
only. Must not override structural mucosal safety requirements.
H3 — Decorative Herbal Inflation: Exotic botanical stacks, "herbal feminine wash complex" at
trace levels — triggers formulation honesty and inflation penalties.
Critical rule: In intimate wash, H1 soothing botanicals receive credit ONLY when the broader
formulation is already appropriate (Tier 3–5 surfactant, physiological pH, fragrance-free or
near-zero fragrance). No botanical credit can mitigate a structurally unsafe formulation.
Concentration certainty remains inferential unless disclosed.
---
LAYER 6 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0
NOTE: Safety weight is 0.30 and Allergy Risk weight is 0.20 in intimate wash — reflecting
the clinical consequences of formulation failure in this category. Eco Impact reduced to 0.05.
SAFETY (weight 0.30) [DOMINANT]
Evaluates: surfactant mucosal disruption risk, pH compatibility with vulvar/vestibular tissue,
fragrance and essential oil load (highest single concern), preservative safety (MI/MCI:
disqualifying), sensitisation risk to mucosal and perimucosal skin, repeated-use irritation
burden, microbiome-disruption-mediated indirect safety concern (BV/VVC risk).
Core rules: Fragrance overrides all cosmetic benefits. MI/MCI detection triggers maximum
Safety penalty. Broad-spectrum antimicrobials reduce Safety via microbiome disruption.
BV and VVC susceptibility increase is a clinical outcome, not just discomfort.
EFFECTIVENESS (weight 0.15)
Core question: Can the intimate wash effectively cleanse external genital tissue without
disrupting the Lactobacillus ecosystem, acid mantle, or mucosal barrier?
Evaluates: external cleansing of sebum, sweat, and smegma; maintenance of physiological pH
post-wash; absence of active ingredients that disrupt rather than support the environment;
rinse-off active honesty.
Rules: "Odour control" via antimicrobials or fragrances receives Effectiveness penalties.
Probiotic rinse-off claims receive no functional microbiome effectiveness credit.
ALLERGY RISK (weight 0.20)
Evaluates: fragrance exposure amplified for intimate use, essential oil sensitisers (terpenes,
phenols), preservative sensitisers (MI/MCI, formaldehyde releasers), botanical allergens,
CAPB sensitisation potential, colorant allergen burden.
Rules: Intimate anatomical location amplifies fragrance allergen risk. Essential oils near
mucosal tissue receive highest Allergy Risk penalties. MI/MCI triggers maximum penalty.
ECO IMPACT (weight 0.05)
Evaluates: surfactant biodegradability, environmental persistence of antimicrobials, aquatic
toxicity, unnecessary formulation burden. Amino acid and glucoside surfactants receive
ecological preference.
INGREDIENT QUALITY (weight 0.15)
Evaluates: surfactant system appropriateness for mucosal-adjacent use, pH architecture honesty
(lactic acid/sodium lactate vs. generic "pH-balanced" claim), rinse-off active honesty (probiotic,
ceramide, peptide inflation), antimicrobial honesty, structural transparency.
SKIN COMPATIBILITY (weight 0.15)
Evaluates: daily use tolerance by mucosal and mucosal-adjacent tissue, vulvar barrier resilience,
post-wash dryness/burning/itching (critical failure signals), microbiome stability and Lactobacillus
preservation, long-term sensitisation accumulation, suitability across hormonal states.
Core rules: Post-wash burning or itching = critical structural failure signal. Long-term
microbiome preservation is the primary parameter. Hormonal atrophic changes increase mucosal
vulnerability.
CORE SCORE FORMULA:
Core Score = (Safety × 0.30) + (Effectiveness × 0.15) + (Allergy Risk × 0.20) +
            (Eco Impact × 0.05) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)
---
LAYER 7 — SPECIALIZED INTIMATE WASH PERFORMANCE
Score range: 1.0 → 5.0
CLEANSING EFFICIENCY
Evaluates: removal of sebum, sweat, smegma, and external discharge residue; gentle cleansing
without mucosal stripping; rinse-off completeness.
Rules: Foam volume does not determine cleansing quality. Over-cleansing is as problematic as
under-cleansing. Micellar and very low-foam systems are preferred. Excessive cleansing disrupts
natural secretions that are protective.
Ceiling: Tier 1 and Tier 2 dominant systems cannot achieve maximum regardless of cleansing power.
BARRIER PRESERVATION [CO-DOMINANT]
Evaluates: TEWL disruption risk per wash on vulvar skin, mucosal tissue integrity preservation,
lipid preservation of labia majora and periurethral skin, vestibular epithelial integrity.
BARRIER CEILINGS — INTIMATE WASH:
• Tier 1 dominant → Hard ceiling: 1.5
• Tier 1 + Tier 3/4 → Hard ceiling: 2.0
• Tier 2 dominant → Max: 2.5
• Tier 2 + Tier 3/4 at physiological pH → Max: 3.2
• Tier 3/4 dominant at physiological pH → Max: 4.5
• Tier 3/4 at pH 3.5–5.0 → Eligible for 5.0
• Tier 4/5 at pH 3.5–5.0, fragrance-free → Eligible for 5.0
• Soap systems (empirically confirmed pH >9) → Hard ceiling: 1.0
• Any fragrance-containing system → Maximum Barrier Preservation reduced by 0.5
MICROBIOME COMPATIBILITY [CO-DOMINANT]
Evaluates: Lactobacillus ecosystem preservation per wash cycle, pH maintenance within 3.5–5.5,
absence of Lactobacillus-disrupting antimicrobials, prebiotic or microbiome-supportive
architecture (where present and substantive), long-term Lactobacillus-dominant ecosystem stability.
Rules: ANY pH elevation above 5.5 directly reduces score. Antimicrobials are microbiome
disruptors in intimate context — mandatory penalties. Lactic acid and sodium lactate at
functional concentrations receive Microbiome Compatibility bonus. "Probiotic" rinse-off claims
receive zero credit.
MICROBIOME COMPATIBILITY CEILINGS:
• Any antimicrobial active (Category A or B) → Max: 2.5
• pH >6.0 → Max: 2.5
• pH >7.5 → Max: 1.5
• Soap systems → Hard ceiling: 1.0
• Any fragrance load at moderate-high level → Max: 3.5
• Tier 4/5 + pH 3.5–5.0 + fragrance-free → Eligible for 5.0
HYDRATION SUPPORT
Evaluates: residual humectant benefit on vulvar and periurethral skin, post-wash moisture
retention, reduction of mucosal dryness, contribution to comfort in atrophic/post-menopausal
contexts.
Rules: Glycerin ≥3% and sorbitol ≥3% receive functional hydration credit. Reduced dryness is
hydration success — not active moisturisation.
RESIDUAL DRYNESS RISK
Evaluates: post-wash vulvar tightness or dryness, mucosal dehydration trajectory, long-term
mucosal comfort.
Rules: Any post-wash burning, itching, or dryness = structural failure signal. Tier 1/2
surfactants cause significant mucosal dryness. Fragrance-induced irritation contributes to
dryness.
CUMULATIVE IRRITATION RISK
Evaluates: repeated surfactant exposure at mucosal-adjacent tissue, fragrance accumulation
under daily intimate use (primary driver), essential oil sensitisation in perimucosal context,
preservative sensitisation (MI/MCI: maximum penalty), chronic inflammatory burden, pH-mediated
persistent irritation, colorant irritation.
Rules: Daily intimate use at mucosal-adjacent site creates uniquely high cumulative risk.
Fragrance is the dominant driver. MI/MCI triggers maximum penalty — no exceptions.
FORMULATION HONESTY
Evaluates: "pH-balanced" claims without declared pH in physiological range (3.5–5.5),
fragrance-driven "freshness" and "odour control" positioning, "probiotic intimate wash" claims
without evidence for rinse-off microbiome efficacy, false antibacterial claims, decorative
rinse-off active inflation, "gynaecologist-tested/recommended" marketing without published evidence,
internal use implications in an external-only cosmetic product.
Rules: "pH-balanced" at pH >5.5 for intimate use = Formulation Honesty violation. Probiotic
rinse-off microbiome claims = Formulation Honesty penalty — zero clinical evidence supports
wash-off format for microbiome restoration. "Odour-eliminating" via fragrance = deception.
SPECIALIZED CALCULATION:
Specialized Performance Score = Average of all 7 specialized scores.
Co-dominant parameters: Barrier Preservation (primary mucosal integrity), Microbiome
Compatibility (primary ecosystem protection), Cumulative Irritation Risk (primary penalty).
---
LAYER 8 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES:
• Tier 3, 4, or 5 dominant surfactant system
• pH 3.5–5.5 (declared and verifiable)
• Fragrance-free or fragrance trace only
• Barrier Preservation ≥ 3.5
• Microbiome Compatibility ≥ 3.5
• Cumulative Irritation Risk ≥ 3.5
• No MI/MCI — absolute
• No formaldehyde releasers
• No antimicrobial actives without clinical justification
• No rinse-off active inflation
• Formulation Honesty ≥ 3.5
DISQUALIFIERS:
• Primary Tier 1 or Tier 2 surfactant systems without extensive mitigation
• Soap systems (pH >7.5 empirically confirmed)
• Any MI or MCI detected
• Formaldehyde releasers
• Moderate-to-high fragrance loading
• Essential oil antimicrobial use in mucosal context
• False pH-balance claims (marketed as pH-balanced but pH >6.0 declared or architecturally indicated)
• False probiotic microbiome claims in rinse-off format marketed as microbiome-restorative
---
LAYER 8.5 — REAL-WORLD USAGE SIMULATION
Simulate: daily intimate wash cycles (once or twice daily external use), mucosal barrier stress
accumulation, acid mantle recovery between washes, long-term Lactobacillus ecosystem stability,
post-wash pH recovery, repeated fragrance and preservative sensitisation accumulation, hormonal
state variation (menstrual cycle, menopause, postpartum), long-term BV and VVC susceptibility
trajectory.
Core question: Can the intimate wash remain non-damaging and microbiome-protective under
long-term daily external use across hormonal states and life stages?
ANTI-MARKETING FILTER — mandatory penalties for:
• "pH-balanced" claims without declared pH in 3.5–5.5 range
• "Odour-controlling" or "freshness" via fragrance near mucosal tissue
• "Probiotic intimate wash" with rinse-off format
• "Kills bacteria/antibacterial" claims
• "Gynaecologist-tested" without cited clinical evidence
• "Natural/botanical freshness" via essential oils near mucosal tissue
• "Deep cleansing" language for intimate area
• Decorative rinse-off active stacking
• "Balanced feminine flora" claims without lactic acid, sodium lactate, or pH evidence
BIAS NEUTRALISATION FILTER — neutralise:
• Foam = cleansing quality illusion
• Fragrance = intimate freshness illusion (fragrance is a risk, not a benefit)
• "pH-balanced" = vaginal health illusion without declared pH in 3.5–5.5
• "Antibacterial" = intimate hygiene improvement illusion (destroys protective flora)
• Probiotic rinse-off = microbiome restoration illusion
• Essential oils = natural safety illusion (disrupt Lactobacillus, sensitise mucosal tissue)
• Tightness/dryness = "clean" illusion — in intimate wash this is a clinical failure signal
STRICT SCORING RULES: No marketing influence on scoring. Fragrance MUST always be mentioned
in Concerns if present. MI/MCI MUST be flagged as disqualifying concern if detected.
Preservative system MUST be assessed for mucosal compatibility. "pH-balanced" claim at pH >5.5
MUST receive Formulation Honesty penalty. Probiotic rinse-off claims MUST receive Formulation
Honesty penalty. Antibacterial actives MUST receive Microbiome Compatibility penalty in
intimate context. Essential oils near mucosal tissue MUST receive Allergy Risk and Cumulative
Irritation Risk penalties. Colorants MUST be flagged in Concerns if present. Surfactant tier
MUST be classified before scoring. Post-wash burning, itching, or dryness = structural failure
signal — mandatory concern flag. Fragrance "freshness" ≠ intimate health. Essential oils ≠
safe for mucosal-adjacent use regardless of natural origin.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 INTIMATE WASH PROFILE

## Functional Classification

Short intimate wash classification.

Examples:
- Optimal pH-Matched Fragrance-Free Intimate Wash
- Gentle Amino Acid Intimate Wash
- Acceptable Mild Surfactant Intimate Wash
- Fragrance-Compromised Intimate Wash
- Antibacterial Intimate Wash (Microbiome Risk)
- Soap-Based Intimate Wash (Contraindicated)
- Decorative Marketing Intimate Wash

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering surfactant mildness for mucosal-adjacent use, pH physiological accuracy, fragrance and essential oil load, microbiome compatibility, preservative safety, and long-term vulvovaginal ecosystem behavior.

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

## Mucosal Safety + Microbiome Analysis

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

# 👤 USER COMPATIBILITY

## Population Compatibility

### Healthy Vulvovaginal Ecology — ⭐X.X

Short compatibility explanation.

### BV-Prone / Recurrent Dysbiosis — ⭐X.X

Short compatibility explanation.

### VVC-Prone (Recurrent Thrush) — ⭐X.X

Short compatibility explanation.

### Sensitive / Reactive Intimate Skin — ⭐X.X

Short compatibility explanation.

### Menopausal / Atrophic Tissue — ⭐X.X

Short compatibility explanation.

### Postpartum Use — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Use Frequency Compatibility

### Once Daily (Standard) — ⭐X.X

Short explanation.

### Twice Daily — ⭐X.X

Short explanation.

### During Menstruation — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing feel
- Post-wash comfort or irritation signals
- Burning, dryness, itching (critical failure signals if present)

## Medium-Term

- Microbiome response — dysbiosis signals
- Mucosal comfort and dryness trajectory
- Sensitization development

## Long-Term

- Acid mantle stability
- BV and VVC frequency impact
- Mucosal integrity
- Overall vulvovaginal ecosystem outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting cleansing system, mucosal barrier behavior, pH architecture, microbiome impact, irritation and sensitization risk, and long-term intimate skin outcome.

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
- Fragrance must always be mentioned in Concerns if present — no exceptions
- MI/MCI must be flagged as disqualifying concern if detected
- Preservative system must be assessed for mucosal compatibility
- pH must be evaluated against 3.5–5.5 physiological window — not general neutral or balanced
- pH-balanced claim at pH >5.5 must receive Formulation Honesty penalty
- Probiotic rinse-off claims must receive Formulation Honesty penalty — no exceptions
- Antibacterial actives must receive Microbiome Compatibility penalty in intimate context
- Essential oils near mucosal tissue must receive Allergy Risk and Cumulative Irritation Risk penalties
- Colorants must be flagged in Concerns if present
- Surfactant harshness tier must be classified before scoring
- Mucosal-adjacent tissue context must amplify all surfactant and pH penalties
- Repeated-use behavior > single-use feel
- Long-term microbiome and mucosal outcome > immediate sensory comfort
- Post-wash burning, itching, or dryness = structural failure signal — mandatory concern flag
- Fragrance freshness ≠ intimate health
- Natural soap ≠ safe — pH 9–10 destroys the vulvovaginal acid mantle
- Essential oils ≠ safe for mucosal-adjacent use regardless of natural origin
- Antibacterial intimate wash ≠ improved hygiene — net microbiome disruption must be scored
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Intimate Wash Evaluation Algorithm — Structured for mucosal-adjacent pH safety analysis, microbiome compatibility realism, and long-term vulvovaginal ecosystem health evaluation. All scoring is structural and evidence-informed.
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
              "You are a strict intimate wash structural evaluation engine."
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