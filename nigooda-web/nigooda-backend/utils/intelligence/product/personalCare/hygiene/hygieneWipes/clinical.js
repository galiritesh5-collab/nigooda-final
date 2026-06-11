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
        "HYGIENEWIPES ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 5 — HYGIENE WIPES EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hygiene wipes that demonstrate:
• Effective cleansing, antimicrobial action, or surface removal appropriate to stated purpose
 and target surface
• Skin barrier compatibility under the use pattern of that wipe format
• Skin and mucosal microbiome stability under repeated use
• Moisturisation or barrier support to offset surfactant or antimicrobial impact
• Low cumulative irritation and sensitization risk
• Structural formulation honesty over fragrance, softness, or "natural" marketing
Mandatory penalties apply for:
• Fragrance-driven "freshness" perception replacing structural cleansing honesty
• Disinfectant wipes marketed for mucosal/intimate use
• Baby wipes with unnecessary fragrance, alcohol, or preservative burden
• "Natural/botanical" wet wipe marketing without barrier or cleansing evidence
• High-surfactant wipes without barrier support on sensitive body areas
• Antimicrobial resistance-generating agents in chronic cosmetic daily-use wipes
• Preservative systems with high sensitization burden under repeated skin contact
• Alcohol-dominant wipes applied to compromised, infant, or mucosal skin without justification
WIPE FORMAT MANDATORY CLASSIFICATION RULE
BEFORE ANY SCORING, classify the wipe by its primary intended use:
FORMAT A — BABY / INFANT WIPE: Target: infant skin (thinner SC, immature barrier, higher
permeability). Primary function: gentle cleansing of urine/stool contact skin. Alcohol tolerance:
none. Fragrance tolerance: very low. Target pH: 5.0–6.0. Preservative concern: maximum.
FORMAT B — FACIAL CLEANSING WIPE / MAKEUP REMOVER WIPE: Target: facial skin, periorbital area.
Primary function: makeup removal, superficial cleansing. Alcohol tolerance: low. Fragrance
tolerance: low-moderate. Target pH: 4.5–6.0.
FORMAT C — INTIMATE / FEMININE HYGIENE WIPE: Target: external genital / perianal mucosal and
peri-mucosal skin. Primary function: external gentle cleansing (NOT internal). Alcohol tolerance:
none. Fragrance tolerance: very low to none. Target pH: 3.8–5.0. Preservative concern: maximum.
Any product claiming intravaginal or internal genital use = immediate disqualification.
FORMAT D — BODY / ANTIBACTERIAL HYGIENE WIPE: Target: general body skin. Primary function:
cleansing, odour control, antimicrobial skin hygiene. Alcohol tolerance: moderate if barrier
support present. Fragrance tolerance: moderate. Target pH: 4.5–6.5.
FORMAT E — MEDICAL / WOUND CARE / CLINICAL HYGIENE WIPE: Target: peri-wound, post-procedure,
clinical cleansing. Alcohol tolerance: context-dependent. Fragrance tolerance: none. Target
pH: 6.0–7.5. Preservative concern: high.
FORMAT F — SURFACE / DISINFECTANT WIPE (NON-SKIN): Not intended for direct skin use. If
marketed for body application = mandatory Safety flag.
FORMAT MISMATCH RULE: Any wipe used on a more sensitive surface than its format classification
allows receives mandatory Safety and Formulation Honesty penalties.
TRANSPARENCY PRIORITY RULE
Ignore: branding, fragrance freshness, softness/texture sensory appeal, "natural/organic/botanical"
claims, "dermatologist tested" without structural evidence, packaging sustainability claims as
quality proxy.
Evaluate only: cleansing or antimicrobial mechanism appropriate to stated purpose, surfactant/
antimicrobial agent class and skin compatibility, skin barrier impact under use pattern, barrier
support active presence and quality, pH compatibility with target surface, skin and mucosal
microbiome impact, preservative system safety, fragrance and sensitization burden, structural
formulation honesty.
GLOBAL ENFORCEMENT RULES:
• Format classification determines all pH, alcohol, fragrance, and preservative scoring thresholds
• Skin barrier compatibility is the primary safety parameter for leave-on wet wipe formats
• Safety penalties override fragrance or sensory bonuses in all formats
• Soft texture or moisturising feel cannot compensate for absent barrier support
• Preservative sensitization under repeat-use wipe contact > preservative sensitization in rinse-off
• Alcohol in baby or intimate format wipes = automatic Safety failure flag
• Fragrance in intimate wipes = major concern regardless of "natural" positioning
• Intravaginal or internal genital product claim = immediate disqualification — Final Rating 1.0/5
LEAVE-ON CONTACT CONTEXT RULE — CRITICAL DISTINCTION:
Wipes are leave-on products. Wipe residue — including surfactants, preservatives, fragrance,
and active agents — remains on skin indefinitely post-application. This fundamentally elevates
preservative sensitization risk, fragrance allergen exposure, surfactant barrier disruption risk,
and antimicrobial residue microbiome burden vs. any rinse-off product.
---
LAYER 1 — SURFACTANT / CLEANSING AGENT TIER (DOMINANT CLEANSING PARAMETER)
MANDATORY RULE: All cleansing agents in wipes must be classified by skin compatibility tier
before scoring. Wipe surfactants are leave-on — their barrier disruption impact is significantly
greater than the same surfactant in a rinse-off cleanser.
TIER 1 — HARSH / HIGH BARRIER DISRUPTION (WIPE CONTEXT)
Examples: SLS, SLES as primary surfactant, Sodium C14-16 Olefin Sulfonate, high-concentration
traditional soap systems, ALS.
In wipe context: Leave-on SLS causes dramatically higher TEWL than rinse-off. Protein disruption
accumulates without rinsing. Particularly severe in baby and intimate formats.
Scoring: Mandatory Safety penalty (amplified vs rinse-off). Barrier Preservation severely reduced.
In baby/intimate format: near-disqualifying Safety flag.
TIER 2 — MODERATE BARRIER DISRUPTION
Examples: SLES in blended systems, SCI at moderate concentration, Disodium Laureth Sulfosuccinate,
Sodium Lauroyl Methyl Isethionate.
In wipe context: Moderate barrier disruption elevated vs rinse-off due to leave-on nature.
Concerning in baby, facial, and intimate formats.
Scoring: Moderate Safety penalty (elevated vs rinse-off context). Format-adjusted scoring.
TIER 3 — MILD / WIPE-APPROPRIATE
Examples: CAPB, Sodium Cocoamphoacetate, Disodium Cocoamphodiacetate, Lauryl Betaine,
Polysorbate 20/80, PEG-based mild solubilisers at low concentration, Decyl Glucoside,
Coco Glucoside.
Scoring: Eligible for good Barrier Preservation. Standard wipe-context Safety profile.
TIER 4 — VERY MILD / IDEAL FOR WIPES
Examples: Sodium Cocoyl Glutamate, Disodium Cocoyl Glutamate, Sodium Lauroyl Sarcosinate
(low concentration), Sodium Cocoyl Alaninate, amino acid and glucoside systems, pure water-and-
humectant wipe systems (no surfactant), micellar water systems.
Scoring: Eligible for maximum Barrier Preservation. Transparency bonus eligible. Ideal for
baby and intimate wipes.
SURFACTANT SYSTEM RULE (WIPE CONTEXT):
• Tier 1 alone → Severe leave-on barrier damage — near-disqualifying in sensitive formats
• Tier 1 + Tier 3/4 blend → Moderate-High (blending reduces but does not eliminate risk)
• Tier 2 alone → Moderate leave-on barrier concern
• Tier 2 + Tier 3/4 → Moderate-Low
• Tier 3/4 dominant → Low leave-on barrier risk
• Tier 4 dominant or surfactant-free → Very low / minimal
• Tier 2 in baby/intimate format → treated as Tier 1 level concern
• Tier 1 in any sensitive format → automatic Safety flag
---
LAYER 2 — SKIN pH COMPATIBILITY BY FORMAT
pH is a mandatory scoring modifier. Target pH is format-dependent:
• Baby/Infant wipe: 5.0–6.0
• Facial wipe: 4.5–6.0
• Intimate/Feminine wipe: 3.8–5.0
• Body/Antibacterial wipe: 4.5–6.5
• Medical/Wound wipe: 6.0–7.5
NOTE: Final product pH cannot be confirmed from INCI alone. pH scoring is applied based on
declared pH values or strong positional evidence of acidifying ingredients. Where undeclared,
no bonus is assigned and a minor credibility reduction applies.
Optimal (within format target range) → Barrier Preservation and Microbiome-compatible bonuses
Acceptable (±0.5 from target range) → Neutral scoring
Mild deviation (0.5–1.0 from target) → Mild penalty
Significant deviation (>1.0 from target) → Significant penalty
Opposite extreme → Major Safety penalty; Microbiome disruption flag for intimate format
Intimate wipe with pH >5.5 → Mandatory microbiome flag.
---
LAYER 3 — ANTIMICROBIAL AGENT TIER (FOR ANTIBACTERIAL WIPES)
Applies to: Format D, Format E. Not appropriate for Format A or C; major concern if
antimicrobial present in Format C.
TIER A — VALIDATED / APPROPRIATE FOR SKIN WIPE CONTEXT
Examples: Ethanol 60–75% (Format D/E — not infant or intimate), Isopropanol 60–75% (Format E),
Benzalkonium Chloride at 0.1–0.13% (Format D — leave-on residue concern noted), Chlorhexidine
Gluconate 0.5–2% (Format E — clinical, short-term use), Zinc Oxide (Format A/C — barrier +
mild antimicrobial), PHMB at 0.1% (Format D/E).
Scoring: Full antimicrobial credit with format-appropriate context. Non-volatile residue agents
receive microbiome disruption note.
TIER B — PARTIAL EVIDENCE / MODERATE CONCERN
Examples: Tea Tree Oil at functional concentration, silver-based antimicrobials (Format E),
low-concentration essential oil blends with antimicrobial data.
Scoring: Partial antimicrobial credit. Sensitization concern for leave-on contact.
TIER C — INAPPROPRIATE / HIGH CONCERN FOR SKIN WIPE CONTEXT
Examples: Triclosan (banned in most markets), BKC at high concentration (>0.2%) in general
skin wipe, glutaraldehyde, high-concentration isopropanol (>75%) on infant or mucosal skin.
Scoring: Major Safety and regulatory concern, mandatory Formulation Honesty penalty,
disqualification flag in baby/intimate formats.
---
LAYER 4 — PRESERVATIVE SYSTEM SAFETY RULE
CRITICAL DISTINCTION: Wipes are leave-on — no rinsing removes preservative residue. Skin
contact is prolonged. Repeat-use amplifies preservative sensitization dramatically.
TIER A — LOWEST SENSITIZATION CONCERN (PREFERRED)
Examples: Phenoxyethanol ≤1%, Sodium Benzoate + Potassium Sorbate, Ethylhexylglycerin,
Caprylyl Glycol, Benzyl Alcohol ≤1%, naturally derived antimicrobial systems at validated
levels, Silver Citrate.
Scoring: Full preservative safety credit.
TIER B — MODERATE SENSITIZATION CONCERN
Examples: Methylisothiazolinone (MI) at ≤0.0015% in leave-on (high concern), MCI/MI (not
permitted in EU leave-on), Formaldehyde releasers, IPBC (not permitted in leave-on for
children under 3), Chlorphenesin.
Scoring: Moderate Allergy/Sensitization penalty. MCI/MI in leave-on EU product = regulatory
violation flag (mandatory). IPBC in baby wipe = regulatory violation flag (mandatory).
TIER C — HIGH SENSITIZATION CONCERN / REGULATORY VIOLATION RISK
Examples: MI >0.0015% in any leave-on product, MCI/MI in leave-on product, Thimerosal,
formaldehyde (free) as preservative, high-concentration quaternary ammonium preservatives.
Scoring: Major Allergy/Sensitization penalty, mandatory regulatory compliance flag,
Formulation Honesty penalty, baby/intimate product with Tier C = near-disqualifying Safety flag.
ISOTHIAZOLINONE SPECIAL RULE: MI and MCI/MI are among the most common contact allergen causes
in Europe. Their presence in any leave-on skin product including wipes must always be flagged
under Concerns and Why This Rating, and assessed for regulatory compliance by market.
---
LAYER 5 — SKIN / MUCOSAL MICROBIOME IMPACT RULE
Target surface microbiome varies by format:
• Skin microbiome (Format A/B/D): Staphylococcus, Cutibacterium, Corynebacterium — commensal
• Intimate microbiome (Format C): Lactobacillus-dominant — highly pH and antimicrobial sensitive
• Wound microbiome (Format E): clinical context — controlled disruption acceptable
Higher microbiome disruption risk: Chlorhexidine (broad-spectrum, intimate format = severe
concern), Triclosan (banned), BAC at high concentration, broad-spectrum antimicrobial wipes
applied to intimate format, high-alcohol wipes on intimate/mucosal areas, high pH intimate wipes.
Low disruption risk: Tier 4 surfactant wipes with Tier A preservatives, pH-matched format wipes,
Zinc Oxide (selective), water-dominant baby wipes.
INTIMATE FORMAT MICROBIOME SPECIAL RULE: Any product disrupting vulvar microbiome pH or
Lactobacillus populations receives maximum Microbiome Compatibility penalty. Must be explicitly
flagged under Concerns and Why This Rating.
---
LAYER 5.5 — FRAGRANCE PENALTY RULE (WIPES — ELEVATED SEVERITY)
Fragrance in leave-on skin wipes carries significantly higher sensitization burden than in
rinse-off products. Residue remains indefinitely. Baby, facial, and intimate skin have elevated
permeability.
Format-specific fragrance concern:
Baby wipe (Format A): Any synthetic fragrance → Major Allergy/Sensitization penalty +
Formulation Honesty penalty. Essential oil fragrance → Major concern. Fragrance-free → Strong
safety credibility bonus.
Intimate wipe (Format C): Any synthetic fragrance → Major Safety penalty + mandatory Concerns
flag. Essential oil fragrance → Major concern. "Feminine freshness" fragrance → Formulation
Honesty penalty + Safety flag. Fragrance-free → Strong safety credibility bonus.
Facial wipe (Format B): Heavy synthetic fragrance → Moderate-High Allergy penalty.
Fragrance-free → Allergy Risk credibility bonus.
Body/Antibacterial wipe (Format D): Heavy synthetic fragrance → Moderate Allergy penalty.
High concern fragrance components in all formats: Limonene, Linalool, Geraniol, Citronellol,
Eugenol, Isoeugenol, Cinnamal, Cinnamyl Alcohol, Benzyl Alcohol, "Parfum"/"Fragrance" blanket.
Fragrance must always be mentioned under Concerns (if present in baby, intimate, or facial
format), Key Structural Ingredients, and Why This Rating.
---
LAYER 5.6 — HERBAL AUTHENTICITY ENGINE
Applies when herbal, botanical, organic, natural, or plant-based marketing is present.
H1 — Evidence-Supported in wipe context: Aloe Vera, Panthenol, Allantoin, Bisabolol,
Calendula, Chamomile — leave-on efficacy credit at meaningful concentrations (wipes are
leave-on; full credit is appropriate when concentrations are plausible and formulation
architecture supports it).
H2 — Traditional/Partial-Evidence: Centella Asiatica, Green Tea, Rose — minor contextual
credit where format and concentration support relevance.
H3 — Decorative Herbal Inflation: Exotic extract stacks, "botanical wipe complex" at trace
levels — formulation honesty and inflation penalties.
Format-specific rule: In Format A (baby) and Format C (intimate), botanical claims receive
credit ONLY when the broader formulation is structurally appropriate (Tier 3–4 surfactant,
pH-matched, fragrance-free or near-zero fragrance, Tier A preservation). No botanical credit
can offset a structurally unsafe wipe. Concentration certainty remains inferential.
---
LAYER 5.7 — COLORANT PENALTY RULE
Artificial colorants in leave-on skin contact products increase unnecessary irritation burden.
High concern: synthetic dye blends in baby or intimate wipes, multiple artificial colorants
in facial wipes, strong artificial coloring in leave-on wipe format.
Scoring: Allergy/Sensitization Risk penalty, Ingredient Quality penalty, Cumulative Irritation
Risk penalty, Formulation Honesty penalty.
---
LAYER 6 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0
NOTE: Safety raised to 0.30 and Allergy/Sensitization Risk raised to 0.18 — leave-on skin
contact with vulnerable populations demands highest safety and sensitization weighting.
SAFETY (weight 0.30) [DOMINANT]
Evaluates: surfactant harshness tier in leave-on context, alcohol content relative to format
tolerance, antimicrobial agent format-appropriateness, preservative system safety tier, fragrance
burden relative to format sensitization risk, pH compatibility, cumulative skin or mucosal
inflammatory load, regulatory compliance, format mismatch safety concern.
Core rules: Leave-on surfactant harshness penalties are elevated vs rinse-off. Baby and intimate
formats have highest Safety sensitivity. Format mismatch = automatic mandatory Safety penalty.
Regulatory preservative violation = mandatory flag.
EFFECTIVENESS (weight 0.18)
Core question: Does the wipe achieve its stated primary function via an evidence-based mechanism,
safely, in its format?
Evaluates: cleansing mechanism for stated purpose, antimicrobial agent validated kill-rate
(if antibacterial wipe), makeup/SPF removal capability, moisture or soil removal effectiveness,
active ingredient concentration adequacy.
Rules: Facial wipes cannot claim "deep cleansing." Baby wipes evaluated for effective soil
removal without barrier compromise. Surface disinfectant wipes applied to skin = dual failure.
ALLERGY / SENSITIZATION RISK (weight 0.18)
Evaluates: fragrance allergen burden (format-adjusted), essential oil sensitizer leave-on burden,
preservative sensitization tier (leave-on amplified), isothiazolinone sensitization risk,
artificial colorant irritation, repeated daily use sensitization accumulation, mucosal
sensitization risk (intimate, baby formats).
Rules: Leave-on format amplifies all sensitization risks significantly. Baby and intimate formats
receive maximum sensitization weight. Isothiazolinones in leave-on wipes = near-mandatory major
concern flag.
ECO IMPACT (weight 0.10)
Evaluates: single-use wet wipe waste (plastic-containing wipes — major concern), flushability
claims vs actual environmental impact (certified vs non-certified), biodegradability of substrate,
preservative environmental persistence.
Flushability special rule: Wipes marketed as "flushable" without certified dispersibility receive
major Eco Impact penalty + Formulation Honesty penalty.
INGREDIENT QUALITY (weight 0.12)
Evaluates: surfactant system coherence for format, preservative system safety and regulatory
compliance, barrier support active quality, fragrance burden vs barrier support trade-off,
absence of decorative botanical inflation, structural transparency.
SKIN / MUCOSAL COMPATIBILITY (weight 0.12)
Evaluates: repeated daily-use skin tolerance, barrier resilience under leave-on surfactant
and preservative exposure, post-use dryness/tightness/irritation, mucosal tolerance (baby,
intimate formats), microbiome stability, long-term sensitization trajectory.
CORE SCORE FORMULA:
Core Score = (Safety × 0.30) + (Effectiveness × 0.18) + (Allergy/Sensitization Risk × 0.18) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.12) + (Skin/Mucosal Compatibility × 0.12)
---
LAYER 7 — SPECIALIZED WIPE PERFORMANCE
Score range: 1.0 → 5.0
CLEANSING / DISINFECTION EFFICACY
Evaluates: soil, urine, stool, or makeup removal effectiveness (format-dependent), antimicrobial
kill-rate at stated agent and concentration (if applicable), surfactant system cleansing ability
balanced against barrier cost, mechanical substrate contribution.
Rules: Baby wipe: effective soil removal without stripping. Facial wipe: makeup/SPF removal.
Antibacterial wipe: validated kill-rate required for antimicrobial credit.
Ceiling: Essential oil-only antimicrobial wipes cannot exceed 2.0 for antimicrobial claims.
SKIN BARRIER PRESERVATION [DOMINANT]
Evaluates: leave-on surfactant TEWL impact, barrier support active quality and concentration,
preservative leave-on barrier contribution/disruption, pH-mediated acid mantle support,
repeated-use barrier resilience trajectory.
SKIN BARRIER PRESERVATION CEILINGS (WIPE CONTEXT):
• Tier 1 surfactant in leave-on wipe → Max 1.8
• Tier 1 surfactant + Tier A barrier support → Max 2.3
• Tier 2 surfactant in leave-on → Max 2.8
• Tier 2 + Tier A barrier support → Max 3.3
• Tier 3 surfactant + Tier B barrier support → Max 4.0
• Tier 3/4 surfactant + Tier A barrier support at pH match → Max 4.5
• Tier 4 or surfactant-free + Tier A barrier support at optimal pH → Eligible for 5.0
• Any wipe with Tier C preservative → Ceiling reduced by 0.5
• Any wipe with heavy fragrance → Ceiling reduced by 0.3–0.5 (format-dependent)
• Alcohol in baby/intimate format → Hard cap 2.0
MUCOSAL / SENSITIVE SURFACE SAFETY (Format A, C, B periorbital only)
Evaluates: infant diaper-area skin tolerance, vulvar mucosal and peri-mucosal tissue tolerance,
periorbital and lip area tolerance, SLS/fragrance/antimicrobial impact on mucosal barrier, pH
match to target mucosal surface, preservative mucosal safety.
Rules: Fragrance in intimate format = mandatory major Mucosal Safety concern. Alcohol in baby
or intimate format = hard Mucosal Safety failure. Intimate wipes with pH >5.5 = microbiome
disruption flag + Mucosal Safety penalty.
MOISTURE AND HYDRATION BALANCE
Evaluates: residual humectant benefit post-wipe, post-wipe skin hydration vs dryness, leave-on
moisturising efficacy of humectant system, contribution of glycerin, aloe, panthenol, hyaluronic
acid at functional concentrations.
Rules: Leave-on humectants in wipes receive higher efficacy credit than in evaporative systems.
Humectant stacking at trace concentrations = decorative — no meaningful hydration credit.
MICROBIOME COMPATIBILITY
Evaluates: skin commensal microbiome preservation by format, intimate format Lactobacillus-
dominant microbiome protection (critical), antimicrobial selectivity, preservative system
residue microbiome impact, pH support for format-appropriate commensal ecosystem.
Rules: Intimate format microbiome compatibility is the most sensitive parameter. Broad-spectrum
antimicrobial intimate wipes = major Microbiome Compatibility failure.
CUMULATIVE IRRITATION RISK
Evaluates: repeated leave-on surfactant exposure accumulation, fragrance allergen accumulation
(format-amplified), preservative sensitization accumulation, pH mismatch irritation stress,
frequency-weighted exposure (baby: 6–8×/day; intimate: 1–3×/day; body: 1–2×/day).
Rules: Baby wipe frequency (6–8×/day) dramatically amplifies any irritant burden. Intimate
wipe frequency on mucosal tissue = high cumulative concern. "Hypoallergenic" or "gentle"
marketing does not override structural preservative or fragrance concern.
FORMULATION HONESTY
Evaluates: "hypoallergenic" claim with high-fragrance or isothiazolinone presence, "natural"
wipe with synthetic preservative or fragrance burden, "flushable" claim without certified
dispersibility, "deep cleansing" facial wipe claim, "pH-balanced for intimate use" with
pH >5.5, essential oil antimicrobial marketed as equivalent to validated disinfectant, baby
wipe with synthetic fragrance marketed as "gentle."
SPECIALIZED CALCULATION:
Specialized Performance Score = Average of all 7 specialized scores.
Dominant parameters: Skin Barrier Preservation (primary), Cumulative Irritation Risk (primary
penalty), Mucosal/Sensitive Surface Safety (primary for Format A and C).
---
LAYER 8 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
MANDATORY OVERRIDE RULES:
OVERRIDE 1 — FORMAT MISMATCH: If disinfectant/surface wipe is applied to skin, or product
is format-mismatched (e.g. alcohol wipe on infant skin), Safety score capped at 2.0 and
Final Rating capped at 2.5.
OVERRIDE 2 — REGULATORY VIOLATION: If regulated-banned preservative (MI/MCI in leave-on,
IPBC in baby wipe, Triclosan in consumer product) is confirmed present at violating concentration,
Safety score capped at 2.5 and must be explicitly flagged.
OVERRIDE 3 — INTIMATE INTERNAL CLAIM: Any product claiming intravaginal or internal genital
use receives Final Rating: 1.0/5. Consumer safety flag: mandatory.
HIGH SCORE ELIGIBILITY (>4.0) REQUIRES:
• Tier 3 or 4 surfactant (preferably Tier 4 or surfactant-free for baby/intimate)
• pH within optimal format target range
• Tier A preservative system
• Fragrance-free (baby/intimate) or minimal fragrance (facial/body)
• Tier A barrier support at meaningful concentration
• Skin Barrier Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No isothiazolinone in leave-on format
• No alcohol in baby/intimate format
• Formulation Honesty ≥ 3.5
DISQUALIFIERS:
• Tier 1 surfactant in baby or intimate format
• Alcohol in baby (Format A) or intimate (Format C) wipe
• Isothiazolinones (MI/MCI) in any leave-on wipe
• IPBC in baby wipe
• Fragrance in baby or intimate wipe at more than trace levels
• Format F applied to skin
• Intravaginal or internal product claim
• pH >5.5 in intimate format wipe
---
LAYER 8.5 — REAL-WORLD USAGE SIMULATION
Simulate across format-specific use patterns:
Format A — Baby Wipe (6–8× daily): Rapid barrier stress accumulation, preservative sensitization
at high leave-on contact frequency, fragrance allergen accumulation at infant skin permeability.
Format C — Intimate Wipe (1–3× daily): Vulvar microbiome stability, mucosal sensitization
accumulation, BV/candidiasis risk under microbiome-disrupting use.
Format D — Body/Antibacterial Wipe (1–2× daily): Post-exercise cleansing vs barrier disruption,
antimicrobial residue microbiome burden accumulation.
ANTI-MARKETING FILTER — mandatory penalties for:
• "Hypoallergenic" with fragrance or isothiazolinone
• "Gentle" baby wipe with synthetic fragrance
• "pH-balanced intimate wipe" with pH >5.5
• "Flushable" without certified dispersibility
• "Deep cleansing" facial wipe
• "Antibacterial" without validated kill-rate active
• "Alcohol-free = completely safe" without addressing other irritant burden
BIAS NEUTRALISATION FILTER — neutralise:
• Soft texture = skin safe bias
• Fragrance freshness = clean/hygienic bias
• "Natural" = non-sensitizing bias
• Moisturising feel = barrier support bias
• "Hypoallergenic" label = allergy safe bias
STRICT SCORING RULES: No marketing influence on scoring. FORMAT MUST BE CLASSIFIED FIRST
before any scoring. Leave-on nature, format classification, preservative tier (especially
isothiazolinones), fragrance burden by format, alcohol in sensitive format, pH mismatch, and
microbiome concerns must be mentioned where relevant. Surfactant tier MUST be classified in
leave-on context before scoring. Preservative system tier MUST be classified before scoring.
Repeated-use behavior at format-specific frequency > single-use feel. Post-use tightness or
irritation = structural leave-on failure signal. "Hypoallergenic" label ≠ low allergy risk
without structural evidence. "Flushable" label ≠ environmentally safe without certified
dispersibility. Isothiazolinones in leave-on wipe = mandatory concern flag every time. Alcohol
in baby or intimate format = mandatory Safety flag. Fragrance in baby or intimate wipe =
mandatory Concerns mention.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧻 PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Fragrance-Free Baby Wipe (Ideal Infant Format)
- Gentle Amino Acid Facial Cleansing Wipe
- Fragrance-Heavy Baby Wipe — Sensitization Concern
- Balanced Antibacterial Body Wipe with Barrier Support
- Intimate Wipe with Microbiome Disruption Risk
- MI-Containing Leave-On Wipe — Regulatory Concern
- Surface Disinfectant Wipe — Not for Skin Use

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering format classification and appropriateness, surfactant and cleansing agent tier (leave-on context), preservative system safety, fragrance and sensitization burden, barrier support quality, pH compatibility with target surface, long-term skin or mucosal behavior under use frequency, and overall formulation balance.

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

### Skin / Mucosal Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Barrier + Mucosal Safety Analysis

### Cleansing / Disinfection Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Mucosal / Sensitive Surface Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Moisture and Hydration Balance — ⭐X.X

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

# 👤 USER / SURFACE COMPATIBILITY

## Population Compatibility

### Newborn / Infant Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Atopic / Eczema-Prone Skin — ⭐X.X

Short compatibility explanation.

### Intimate / Perianal Use — ⭐X.X

Short compatibility explanation.

### Facial / Periorbital Use — ⭐X.X

Short compatibility explanation.

### Post-Exercise Body Use — ⭐X.X

Short compatibility explanation.

### Clinical / Wound-Adjacent Use — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Frequency Usability

### High Frequency (Baby: 6–8×/Day) — ⭐X.X

Short explanation.

### Moderate Frequency (1–3×/Day) — ⭐X.X

Short explanation.

### Low / Occasional Frequency — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleansing or removal effectiveness
- Skin comfort or irritation signal post-wipe
- Fragrance or residue sensation

## Medium-Term

- Skin barrier response under daily use
- Dryness, irritation, or sensitization signals
- Microbiome impact (intimate format)

## Long-Term

- Skin or mucosal barrier stability
- Contact dermatitis or sensitization trajectory
- Microbiome stability (intimate and baby format)
- Overall skin health outcome under chronic use

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting surfactant and cleansing system (leave-on tier), preservative system (tier and regulatory status), fragrance and sensitization burden, barrier support and humectant quality, antimicrobial agent (if applicable), pH and surface compatibility, and long-term skin or mucosal outcome.

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
- FORMAT MUST BE CLASSIFIED FIRST before any scoring begins
- No marketing influence on scoring
- Mention leave-on nature, format classification, preservative tier (especially isothiazolinones), fragrance burden by format, alcohol in sensitive format, pH mismatch, and microbiome concerns in output where relevant
- No hypoallergenic = safe bias
- No natural = non-sensitizing bias
- No moisturising texture = barrier support bias
- Structural weakness overrides soft texture or fragrance freshness
- Surfactant tier must be classified in leave-on context before scoring
- Preservative system tier must be classified before scoring
- pH compatibility must be assessed against format target before scoring
- Fragrance burden must be assessed against format sensitization risk before scoring
- Repeated-use behavior at format-specific frequency > single-use feel
- Long-term skin or mucosal outcome > immediate texture or scent sensation
- Post-use tightness or irritation = structural leave-on failure signal
- Soft texture ≠ barrier safe
- Hypoallergenic label ≠ low allergy risk without structural evidence
- Flushable label ≠ environmentally safe without certified dispersibility
- Isothiazolinones in leave-on wipe = mandatory concern flag every time
- Alcohol in baby or intimate format = mandatory Safety flag
- Fragrance in baby or intimate wipe = mandatory Concerns mention
- Intravaginal or internal claim = immediate disqualification and consumer safety flag
- FORMAT MISMATCH = MANDATORY SAFETY OVERRIDE
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hygiene Wipes Evaluation Algorithm — Structured for format classification safety analysis, leave-on sensitization realism, and long-term mucosal and barrier compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict hygiene wipes structural evaluation engine."
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