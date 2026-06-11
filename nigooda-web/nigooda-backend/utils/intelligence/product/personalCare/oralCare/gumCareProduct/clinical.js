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
        "GUMCAREPRODUCT ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
GUM CARE PRODUCT EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward gum care products that demonstrate:
• Evidence-based anti-gingivitis or periodontal support
• Targeted antimicrobial action without broad-spectrum microbiome disruption
• Gingival tissue compatibility under chronic repeated use
• Oral microbiome stability — commensal preservation
• Anti-inflammatory support with clinical evidence
• Low cumulative mucosal and gingival irritation risk
• Structural formulation honesty over botanical or "natural gum health" marketing
Mandatory penalties apply for:
• Broad-spectrum antimicrobial overload marketed as gum protection
• Alcohol-dominant vehicles without therapeutic justification for gingival use —
 alcohol burn does not constitute antiseptic gum protection
• Decorative botanical "gum health" loading without clinical gingivitis evidence
• Essential oil overloading beyond functional antimicrobial evidence
• Chlorhexidine chronic cosmetic gum use without clinical justification
• High-SLS gum care formulations — SLS directly irritates gingival epithelium
 and may perpetuate inflammation; this is a higher concern in gum care than
 in general toothpaste context
• "Strengthening gums" claims without evidence-based tissue repair mechanism
• Marketing-driven sensory freshness engineering over structural gingival benefit
Basic freshening or cosmetic "gum comfort" alone cannot achieve high scores.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding and luxury positioning
• "Natural gum formula" marketing
• Essential oil "gum strengthening" claims
• "Herbal / Ayurvedic gum care" marketing without clinical evidence
• Botanical complexity as a quality signal
• Flavour intensity as "antiseptic" signal
• "Dentist recommended" claims without structural support
Evaluate only:
• Antimicrobial selectivity vs microbiome disruption
• Anti-inflammatory active clinical evidence
• Alcohol content and gingival tissue impact
• SLS gingival irritation burden
• Evidence-based therapeutic active delivery for gum health
• Repeated-use gingival tolerance
• Structural formulation honesty
• Herbal authenticity (H1/H2/H3 classification when applicable)
Any format (gel, rinse, serum, toothpaste/gel with gum actives, oil, direct gum application)
receives credibility only when gingival safety, active delivery, and microbiome
consideration are demonstrated.
---
STRUCTURE DOMINANCE RULE
Primary gum care architecture determines:
• Gingival tissue tolerance
• Sulcular microenvironment compatibility
• Anti-plaque and anti-gingivitis mechanism depth
• Oral microbiome stability
• Mucosal and gingival barrier integrity
• Long-term gum tissue health
• Chronic inflammation cycle interruption or perpetuation
• Repeated-use safety
Minor additives, decorative botanicals, and cosmetic soothing agents cannot override
a gingival-irritating vehicle (alcohol, SLS) or absent evidence-based anti-gingivitis active.
Ingredient evaluation must consider:
• Alcohol and SLS content relative to gingival tissue sensitivity
• Antimicrobial selectivity and sulcular penetration
• Anti-inflammatory active evidence in oral/gingival context
• Format delivery (rinse vs gel vs serum vs direct application)
• Repeated daily exposure (1–2× daily chronic use)
---
GUM CARE CONTACT AND FORMAT CONTEXT RULE
DELIVERY FORMAT CREDIT TABLE:
Subgingival Gel / Periodontal Gel (professional) — Maximum efficacy credit
Direct Gum Gel / Serum (OTC, applied directly) — High efficacy credit
Anti-Gingivitis Toothpaste — Moderate efficacy credit
Anti-Gingivitis Mouthwash / Rinse — Moderate efficacy credit
Interdental Gel / Foam — High efficacy credit
Oil / Natural Rinse — Low-Moderate credit (mechanism-dependent)
Essential Oil Direct Application — Low credit without clinical evidence
---
LAYER 1 — VEHICLE SAFETY TIER (DOMINANT VEHICLE PARAMETER)
MANDATORY RULE:
Vehicle must be classified for gingival safety before scoring.
Gingival tissue is thin, highly vascularised, and directly in contact with the
sulcular microenvironment. Vehicle agents have heightened gingival impact
compared to general oral surfaces.
VEHICLE SAFETY TIER TABLE
TIER 1 — HIGH GINGIVAL IRRITATION RISK
Examples:
• Alcohol >15% in direct gingival-contact product
• High-SLS concentration in gum-targeted product
• Undiluted essential oils (direct application)
• High-concentration Hydrogen Peroxide on gingival tissue
• Strong alcohol-based gum serum/gel
Characteristics:
• Direct gingival mucosal barrier disruption potential
• Chemical irritation of gingival tissue under repeated use
• Sulcular microenvironment disruption
• Inflammation perpetuation risk — the vehicle may worsen the condition
 it claims to treat
Scoring Impact:
• Mandatory Safety adjustment
• Gingival Tissue Tolerance ceiling reduction
• High Cumulative Irritation Risk weighting
Note: Tier 1 vehicles are not automatic product failures — if strong clinical
therapeutic actives are present (e.g. short-term clinical Chlorhexidine context),
the therapeutic benefit is credited alongside the vehicle risk flag.
Mitigation reduces penalty severity; it does not eliminate the concern.
---
TIER 2 — MODERATE GINGIVAL IRRITATION RISK
Examples:
• Alcohol 8–15% in gum-targeted rinse
• Moderate SLS in gum-targeted toothpaste
• Moderately concentrated essential oil blends
• Sodium Benzoate (aphthous ulcer and gingival irritation concern)
Characteristics:
• Moderate gingival mucosal impact
• Frequency-dependent concern
• Well-tolerated in some users at moderate concentrations
Scoring Impact:
• Moderate Safety adjustment
• Moderate Gingival Tolerance ceiling
---
TIER 3 — LOW GINGIVAL IRRITATION RISK
Examples:
• Low-alcohol formulation (1–8%)
• SLS-free or very low SLS gum product
• Glycerin-based gel vehicles
• Aloe vera gel vehicle
• Xylitol-rich vehicle
Scoring Impact:
• Eligible for good Gingival Tissue Tolerance
• Compatible with sensitive gum profiles
---
TIER 4 — MINIMAL GINGIVAL IRRITATION RISK
Examples:
• Alcohol-free, SLS-free formulation
• Hyaluronic acid gel vehicle
• Aloe vera + glycerin base
• Water-based serum
• nHAp suspension vehicle
Scoring Impact:
• Eligible for maximum Gingival Tissue Tolerance
• Transparency bonus eligible
---
VEHICLE SYSTEM RULE
• Tier 1 alone → High gingival stress
• Tier 1 + Evidence-Based Clinical Active → Moderate-High
 (therapeutic context partially justifies vehicle; risk still flagged)
• Tier 2 alone → Moderate gingival stress
• Tier 2 + Soothing/protective active → Moderate-Low
• Tier 3/4 + Evidence-Based Active → Low gingival stress, high therapeutic value
• Tier 4 (alcohol-free, SLS-free) + Clinical Active → Ideal gingival profile
Additional Rules:
• Alcohol burn is not evidence of gum health benefit
• SLS in gum-targeted products requires strong clinical justification
• Tier 4 products are not automatically superior without evidence-based gum actives
---
LAYER 2 — SULCULAR pH CONTEXT RULE
[Contextual structural assessment — not a formal deterministic scoring tier]
Sulcular / Periodontal pocket microenvironment pH: approximately 6.5–7.5
Inflamed/diseased periodontal pockets may have elevated pH (7.5–8.5).
Optimal gum product pH: 6.5–8.0.
When formulation ingredients are strongly indicative of an acid-generating or
extreme alkaline mechanism (e.g. undiluted citric acid, very high lemon content,
strongly alkaline detergent systems), this is noted as a contextual structural observation
about gingival margin and enamel risk — not a deterministic pH score, as actual
formulation pH depends on buffering, concentration, and manufacturing variables
not visible from the ingredient list.
For standard gum products without clear acid/alkaline generating ingredients:
Specific formulation pH is not inferred from the ingredient list; this uncertainty
is acknowledged without applying a score penalty for unknown pH.
---
LAYER 3 — ANTIMICROBIAL SELECTIVITY TIER FOR GUM CARE
MANDATORY RULE:
All antimicrobial agents must be classified by selectivity and microbiome impact
before scoring.
ANTIMICROBIAL SELECTIVITY TIER TABLE
TIER A — HIGHLY SELECTIVE / GUM-TARGETED
Examples:
• Zinc Chloride / Zinc Acetate (targeted VSC and periodontal pathogen inhibition)
• Stannous Fluoride (selective periodontal pathogen inhibition + enamel support)
• Xylitol (selective mutans streptococci; commensal-sparing)
• Low-concentration CPC (0.05–0.07%) — moderate selectivity
• Hyaluronic Acid / Sodium Hyaluronate (anti-inflammatory + tissue repair; no antimicrobial burden)
• Sodium Fluoride (targeted caries pathogen; microbiome-compatible)
Scoring Impact:
• Maximum Microbiome Compatibility
• Eligible for elite Long-Term Gum Compatibility
---
TIER B — MODERATELY SELECTIVE
Examples:
• Essential Oil Formula (Thymol/Eucalyptol/Menthol/Methyl Salicylate)
 at functional concentrations — moderate antimicrobial selectivity, clinical evidence
 for gingivitis reduction; see Layer 3.5 for essential oil guidance
• CPC at moderate concentration (0.05–0.10%)
• Sodium Bicarbonate (mild pH-buffering antimicrobial)
• Triclosan in gum-targeted formulations (with microbiome penalty)
• Cetylpyridinium Chloride at moderate concentration
Scoring Impact:
• Moderate Microbiome Compatibility
• Eligible for good therapeutic scores
---
TIER C — BROAD-SPECTRUM / HIGH DISRUPTION
Examples:
• Chlorhexidine Gluconate — gold-standard for acute clinical use, but broad-spectrum
• Benzalkonium Chloride
• Povidone-Iodine (clinical only)
• High-concentration essential oil blends in direct, prolonged gingival-contact formats
Characteristics:
• High commensal microbiome disruption
• Nitric oxide pathway disruption risk
• Suitable for short-term clinical acute gingivitis management
• Chronic cosmetic gum care use receives major Formulation Honesty penalty
CHLORHEXIDINE SPECIAL RULE:
Clinical-context use (prescribed, short-term acute gingivitis) partially mitigates penalties.
Chronic cosmetic daily gum care use = full penalties apply.
Nitric oxide pathway disruption must be flagged under Concerns.
---
LAYER 3.5 — ESSENTIAL OIL AND FRAGRANCE SYSTEM ASSESSMENT (GUM CARE)
Gum care products often feature essential oil systems.
These require calibrated, context-aware evaluation — not blanket penalisation.
TIER F1 — EVIDENCE-SUPPORTED FUNCTIONAL SYSTEMS (gum care context)
• Essential Oil Formula (Thymol/Eucalyptol/Menthol/Methyl Salicylate) at functional
 concentrations — clinical evidence for plaque and gingivitis reduction;
 receives Tier B antimicrobial credit
• These systems represent legitimate therapeutic mechanism in gum care
 and should not be treated as decorative or harmful at appropriate concentrations
TIER F2 — STANDARD FLAVOUR / AROMATIC SYSTEMS
• Low-concentration mint, peppermint, spearmint at standard gum product flavour levels
• Should not automatically trigger aggressive sensitization penalties
TIER F3 — HIGH-CONCERN IN GUM CARE CONTEXT
• High-concentration cinnamon / cinnamaldehyde in direct gingival-contact products —
 gingival sensitization risk is higher here than in standard toothpaste/rinse formats
 due to potentially prolonged direct gingival contact in gel/serum formats
• Clove / eugenol at elevated concentrations in direct gingival-contact formats
• Excessive aromatic loading in prolonged-contact gum care products
RULES:
• Format matters: the same essential oil concentration in a 30-second rinse
 vs a direct application gum serum presents different risk profiles
• Evidence-supported essential oil formulas in rinse format may receive
 Tier B antimicrobial credit alongside moderate microbiome impact notation
• Direct prolonged-contact gum application formats with high-sensitizer essential oils
 receive higher concern weighting
---
LAYER 4 — ANTI-INFLAMMATORY ACTIVE ASSESSMENT
Gum disease is fundamentally an inflammatory response to dysbiotic plaque.
Anti-inflammatory actives that reduce gingival inflammation have genuine
structural functional value in gum care.
ANTI-INFLAMMATORY TIER TABLE
TIER A — STRONG CLINICAL EVIDENCE (GUM CONTEXT)
• Hyaluronic Acid (Sodium Hyaluronate) — tissue repair, anti-inflammatory, wound healing;
 strong emerging evidence in periodontal and gingival tissue support
• Zinc — anti-inflammatory + antimicrobial dual function
• Stannous Fluoride — anti-inflammatory through plaque acid suppression
• Aloe Vera — limited but acceptable evidence in gingival application context
Scoring: Full anti-inflammatory credit
---
TIER B — PARTIAL EVIDENCE (ORAL CONTEXT)
• Green Tea Extract (EGCG) — antioxidant; limited gingival evidence; credible mechanism
• Chamomile Extract — mild anti-inflammatory; limited clinical oral evidence
• Allantoin — mucosal healing support; limited gingival evidence
• Vitamin E (topical tocopherol) — antioxidant; limited direct gingival evidence
• Propolis — antimicrobial + mild anti-inflammatory; limited but credible evidence
Scoring: Partial anti-inflammatory credit
---
TIER C — DECORATIVE / INSUFFICIENT EVIDENCE
• Turmeric / Curcumin (gum application) — marketed heavily; limited gingival evidence
• Neem (limited credible gingival evidence)
• Activated Charcoal (no anti-inflammatory mechanism)
• CBD Oil (insufficient gingival evidence)
• "Herbal complex" blends without clinical gingival evidence
• Essential oils as primary anti-inflammatory claim (beyond mild antimicrobial)
Scoring: Decorative credit only
Marketing as primary gum health actives → Formulation Honesty adjustment
---
LAYER 5 — HERBAL AUTHENTICITY & NATURAL CLAIM VALIDATION ENGINE
[CONDITIONAL LAYER — activates when herbal claims, botanical-heavy marketing,
Ayurvedic/natural gum positioning, or plant-based gum health claims are present]
H1 — EVIDENCE-SUPPORTED BOTANICALS (gum care context)
• Aloe Vera — acceptable evidence for anti-inflammatory gingival support;
 particularly credible in direct gel application
• Hyaluronic Acid / Sodium Hyaluronate — strong emerging evidence for
 tissue repair in gingival application; top-tier botanical-adjacent support active
• Chamomile — mild anti-inflammatory; limited but credible in direct gingival application
• Propolis — antimicrobial + mild anti-inflammatory; limited but credible gingival evidence
H1 botanicals receive partial credit with evidence quality acknowledged.
Cannot override dominant architecture assessment.
---
H2 — TRADITIONAL / EMERGING BOTANICALS (gum care context)
• Neem — traditional antimicrobial; limited clinical gingival evidence; partial credit possible
• Miswak (Salvadora persica) — traditional use; moderate emerging evidence;
 not equivalent to clinical-grade actives
• Clove / Eugenol — antimicrobial; sensitization risk at high concentrations in direct use
• Tea Tree Oil — antimicrobial; limited direct gingival clinical evidence
• Sage — mild antimicrobial; limited gingival evidence
• Triphala — Ayurvedic; some emerging antimicrobial evidence; low evidence quality
Limited partial credit available.
Traditional use ≠ clinical efficacy equivalence.
Evidence quality acknowledged explicitly.
---
H3 — DECORATIVE / MARKETING-DRIVEN BOTANICALS (gum care context)
• Turmeric gum gel / "golden gum serum" — insufficient gingival evidence
• CBD gum care products — insufficient gingival evidence
• Activated charcoal gum formulas — no anti-inflammatory mechanism; abrasion risk
• Exotic botanical complexity blends with no clinical gingival evidence
• "Ayurvedic gum formula" with long botanical list but no H1/H2 actives at
 functional concentrations
H3 botanicals → minimal functional credit.
Formulation Honesty penalty if marketed as primary therapeutic gum actives.
---
HERBAL CLAIM OUTPUT RULES:
• H1 botanicals at meaningful concentrations → noted as positive structural feature
• H2 botanicals → noted with evidence quality caveat
• H3 botanicals → noted as decorative; Formulation Honesty adjustment if overmarketed
• "Ayurvedic gum care", "natural herbal gum formula" without H1/H2 actives
 at functional concentrations → Formulation Honesty penalty applied
• Herbal systems are assessed alongside — not instead of — vehicle safety
 and antimicrobial architecture
---
LAYER 6 — ORAL MICROBIOME IMPACT RULE
MICROBIOME COMPATIBILITY MODIFIER
Higher disruption risk:
• Chlorhexidine Gluconate (broad-spectrum, nitric oxide pathway disruption)
• Triclosan (broad-spectrum)
• Benzalkonium Chloride
• High-alcohol vehicle (>15%)
• High-concentration essential oil blends under chronic direct gum application
• SLS at high concentration in gum-targeted product
Lower disruption risk:
• Zinc-based systems (selective)
• Xylitol (selective; commensal-sparing)
• Hyaluronic Acid (non-antimicrobial; tissue-supportive)
• Fluoride systems (targeted)
• Alcohol-free, SLS-free Tier A antimicrobial systems
NITRIC OXIDE PATHWAY NOTE:
Chlorhexidine eliminates nitrate-reducing oral bacteria responsible for
systemic nitric oxide production. This has been studied in relation to
blood pressure regulation and must be flagged as a structural concern
under chronic gum care use. This is a formulation concern, not a medical claim.
---
LAYER 6.5 — SLS GUM TISSUE SPECIAL RULE
SLS is particularly concerning in gum-targeted products:
• Directly irritates gingival epithelium under repeated use
• Strips mucosal protective proteins
• Associated with aphthous ulcer recurrence at gingival margins
• May perpetuate gingival inflammation rather than reducing it —
 working against the product's stated purpose
SLS in a gum care product receives:
• Higher penalty than standard toothpaste SLS penalty
• Mandatory mention under Concerns
• Gingival Tissue Tolerance ceiling reduction
SLS-free gum products receive:
• Gingival Tissue Tolerance credit
• Structural honesty credibility note
---
LAYER 6.6 — COLORANT AND ARTIFICIAL ADDITIVE ASSESSMENT
Artificial colorants in gum-contact products increase unnecessary gingival
mucosal irritation burden with no gum health benefit.
Higher concern:
• Synthetic dye blends in direct gum application products
• Strong artificial flavouring agents in prolonged gingival contact formats
• Sodium Benzoate (aphthous ulcer and gingival irritation concern)
Scoring Impact:
• Allergy/Sensitivity Risk adjustment
• Ingredient Quality adjustment
• Cumulative Irritation Risk adjustment
• Formulation Honesty adjustment
---
LAYER 7 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 FOR EVERY CATEGORY
---
SAFETY [DOMINANT]
Evaluates:
• Vehicle gingival irritation risk (alcohol, SLS)
• Antimicrobial spectrum and gingival tissue burden
• Repeated-use gingival mucosal tolerance
• Sensitization potential (flavour, essential oils — calibrated; see Layer 3.5)
• Cumulative inflammatory burden on gingival tissue
• Chlorhexidine staining, dysgeusia, microbiome risk
• Gingival tissue thinning risk under chronic irritant vehicle exposure
Core Rules:
• Repeated low-grade gingival irritation accumulates and reduces Safety
• Daily chronic exposure magnifies gingival burden significantly
• SLS in gum care carries higher penalty than in general toothpaste context
• High-risk vehicle architectures reduce elite scoring probability —
 but strong therapeutic actives and genuine mitigation are considered
• Safety overrides:
 — Botanical complexity claims
 — Flavour freshness perception
 — "Natural herbal" positioning
 — "Clinical strength" marketing
---
EFFECTIVENESS
Core Question:
Does the product genuinely reduce plaque, gingivitis, or periodontal inflammation
via an evidence-based mechanism at effective concentration in its format?
Evaluates:
• Anti-gingivitis active clinical evidence in gum context
• Anti-plaque mechanism and selectivity
• Anti-inflammatory active clinical evidence
• Gingival tissue healing support (hyaluronic acid, zinc)
• Halitosis control (VSC targeting)
• Format delivery to gingival tissue and sulcular margin
• Repeated-use functional stability
Rules:
• Botanical complexity ≠ gum health evidence
• Flavour freshness ≠ gum treatment
• "Gum strengthening" requires collagen or tissue repair mechanism evidence
• Evidence must be gingival-context specific — not just general antimicrobial
---
ALLERGY / SENSITIVITY RISK
Evaluates:
• Essential oil sensitization on prolonged gingival contact
 (calibrated to format and concentration; see Layer 3.5)
• SLS gingival irritation
• Chlorhexidine contact sensitization
• Flavouring agent sensitization
• Preservative sensitization (Sodium Benzoate, Parabens)
• Artificial colorant irritation
• Repeated chronic gingival exposure accumulation
• Aphthous ulcer trigger potential
Application Rules:
• Gingival mucosa is more sensitive than keratinised oral surfaces
• Prolonged-contact gum formats receive higher sensitization weighting
• Standard low-concentration flavouring aromatics should not trigger
 aggressive sensitization penalties automatically
• Essential oils in direct gum gel formats receive higher concern than
 the same essential oils in a brief rinse format
---
ECO IMPACT
Evaluates:
• Triclosan / Chlorhexidine environmental persistence
• SLS biodegradability
• Packaging sustainability
• Essential oil sourcing sustainability
• Synthetic dye environmental load
---
INGREDIENT QUALITY
Evaluates:
• Antimicrobial system clinical coherence for gum health
• Anti-inflammatory active evidence quality
• Vehicle safety and gingival compatibility
• Functional ingredient synergy
• Herbal claim authenticity (H1/H2/H3 classification)
• Absence of decorative H3 botanical inflation
• Structural transparency
Rules:
• H3 botanical stacking in gum products = quality adjustment
• SLS in gum care = quality coherence concern
• Chlorhexidine daily cosmetic positioning = quality credibility concern
• Hyaluronic Acid presence in direct gum application = quality bonus
• Zinc + Fluoride combination = quality synergy bonus
• H1 botanicals at meaningful concentration may contribute minor positive quality note
---
GUM / ORAL COMPATIBILITY
Evaluates:
• Chronic daily gingival tissue tolerance
• Mucosal barrier resilience under repeated vehicle exposure
• Post-use gingival burning, bleeding, or sensitivity changes
• Aphthous ulcer compatibility
• Oral microbiome stability
• Gingival healing cycle support
• Long-term gingival tissue thinning risk
• Cumulative sensitization risk under daily use
Core Rules:
• Temporary freshness does not equal gingival compatibility
• Gingival burning sensation does not equal therapeutic effectiveness
• Long-term repeated-use behavior overrides short-term sensory comfort
• Products perpetuating gingival inflammation via irritant vehicle reduce compatibility score
CORE SCORE FORMULA
Core Score =
(
Safety × 0.30 +
Effectiveness × 0.20 +
Allergy / Sensitivity Risk × 0.15 +
Eco Impact × 0.08 +
Ingredient Quality × 0.12 +
Gum / Oral Compatibility × 0.15
)
Note: Safety weighted higher (0.30) due to chronic gingival tissue exposure risk.
---
LAYER 8 — SPECIALIZED GUM PERFORMANCE
Score Range: 1.0 → 5.0
---
ANTI-PLAQUE EFFICACY
Evaluates:
• Biofilm disruption at gingival margin
• Interproximal plaque access (format-dependent)
• Antimicrobial plaque inhibition (selective preferred)
• Substantivity of anti-plaque effect post-use
Core Rules:
• Botanical complexity without antimicrobial evidence cannot claim anti-plaque efficacy
• Format must enable access to gingival margin
• Substantivity is a scoring differentiator
CEILING RULE:
Decorative H3 botanical-only products cannot exceed 2.0 Anti-Plaque Efficacy.
---
GINGIVAL TISSUE PRESERVATION [DOMINANT]
Evaluates:
• Vehicle gingival irritation tier
• SLS gingival mucosal impact
• Alcohol gingival mucosal drying under repeated use
• Anti-inflammatory active support (Tier A/B)
• Chronic repeated-use gingival integrity trajectory
• Gingival recession risk under repeated irritant exposure
GINGIVAL TISSUE PRESERVATION CEILINGS
• Tier 1 vehicle (high alcohol / high SLS) → Max 2.0
• Tier 1 + anti-inflammatory active → Max 2.5
 [Anti-inflammatory credit partially offsets vehicle concern;
 clinical justification required for ceiling above 2.0]
• Tier 2 vehicle → Max 3.2
• Tier 2 + gingival-supportive active → Max 3.7
• Tier 3 vehicle → Max 4.2
• Tier 4 vehicle (alcohol-free, SLS-free) + Tier A anti-inflammatory → Eligible for 5.0
• Chlorhexidine daily cosmetic gum use → Max 3.0 regardless of vehicle tier
• SLS-dominant gum product → Ceiling reduced by 0.5
Core Rules:
• Post-use gingival burning = gingival mucosal stress signal — not evidence of effectiveness
• Gingival Tissue Preservation is the dominant gum care performance parameter
---
ANTI-GINGIVITIS EFFICACY
Evaluates:
• Clinical evidence for gingivitis reduction in product format
• Anti-inflammatory mechanism depth and credibility
• Plaque-mediated gingivitis interruption
• Sulcular penetration (format-dependent)
• Recovery of gingival health trajectory
Core Rules:
• Gingivitis reduction claims require evidence-based active — not botanical marketing alone
• Format must enable delivery to gingival margin
• Hyaluronic Acid, Zinc, Stannous Fluoride, CPC at clinical concentration
 receive anti-gingivitis credit
---
GINGIVAL TISSUE HEALING SUPPORT
Evaluates:
• Hyaluronic Acid tissue repair evidence (strong in direct application format)
• Zinc tissue-healing and anti-inflammatory dual function
• Allantoin mucosal healing
• Vitamin E antioxidant tissue support (partial credit)
• Format allowing residual tissue contact for healing effect
• Post-procedure or post-surgery healing support context
Core Rules:
• Healing support requires prolonged contact time (gel/serum > rinse for this metric)
• H3 decorative botanicals cannot receive tissue healing credit without evidence
• Hyaluronic Acid in direct gum application receives strongest healing credit
---
ORAL MICROBIOME COMPATIBILITY
Evaluates:
• Periodontal pathogen selectivity
• Commensal oral microbiome preservation
• Nitric oxide pathway preservation
• Long-term microbiome balance under chronic use
• Broad-spectrum antimicrobial disruption risk
Core Rules:
• Chronic microbiome disruption reduces gingival health trajectory
• Selective actives (Zinc, Xylitol, Fluoride, nHAp) receive maximum credit
• Chlorhexidine chronic use receives major penalty including nitric oxide pathway flag
• Essential oil systems (Tier B) at standard rinse concentrations: moderate microbiome
 impact noted — not catastrophically penalized; clinical benefit weighed proportionally
---
CUMULATIVE IRRITATION RISK
Evaluates:
• Repeated alcohol gingival exposure under chronic use
• SLS gingival mucosa accumulation
• Flavouring and essential oil gingival sensitization — calibrated (see Layer 3.5)
• Preservative sensitization (Sodium Benzoate, Parabens)
• Chlorhexidine staining and dysgeusia accumulation
• Frequency-weighted exposure (1–2× daily chronic gum care)
• Aphthous ulcer trigger accumulation
• Gingival inflammation perpetuation from irritant vehicle
Core Rules:
• Twice-daily exposure amplifies gingival irritation burden significantly
• Products that irritate gingival tissue while claiming to heal it receive major penalties
• SLS + alcohol + high-sensitizer essential oil combination is severely penalized
 in gum care context
• Long-term low-grade gingival irritation is prioritized over isolated acute reactions
• Standard low-concentration flavouring aromatics are lower concern —
 penalty is proportional, not categorical
---
FORMULATION HONESTY
Evaluates:
• "Gum strengthening" claims without tissue repair mechanism evidence
• Botanical complexity as proxy for gum health evidence (H3 inflation)
• Chlorhexidine daily cosmetic gum care marketing
• Essential oil overload marketed as clinical gum treatment
• "Natural herbal gum formula" without H1/H2 actives at functional concentrations
• "Sensitivity-free gum care" without vehicle safety support
• Alcohol-first vehicle marketed as "antiseptic gum protection"
• "Microbiome-balancing gum care" without antimicrobial selectivity support
Core Rules:
• Gum care claims must be supported by evidence-based active + appropriate delivery format
• Clinical-sounding language requires clinical gingival evidence
• Herbal/botanical inflation in gum products is penalized equivalently to other oral care
---
SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all 7 specialized scores
Dominant Parameters:
• Gingival Tissue Preservation → primary interpretive parameter
• Cumulative Irritation Risk → primary penalty parameter
---
LAYER 9 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
---
HIGH SCORE ELIGIBILITY (>4.0)
Requires:
• Tier 3 or 4 vehicle (preferably alcohol-free AND SLS-free)
• Evidence-based anti-gingivitis active (Zinc, CPC ≥0.05%, Hyaluronic Acid,
 Stannous Fluoride, or equivalent at clinical concentration)
• Tier A or B antimicrobial selectivity
• Gingival Tissue Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No SLS in direct gum application product
• No Chlorhexidine for daily cosmetic use
• No dominant H3 decorative botanical inflation
• Formulation Honesty ≥ 3.5
DISQUALIFIERS:
• Tier 1 vehicle (high alcohol / high SLS) in direct gum application without
 clear short-term clinical justification
• No evidence-based gum active present
• Chlorhexidine positioned for chronic daily cosmetic gum care
• Heavy H3 botanical decoration marketed as clinical gum treatment
• SLS-dominant direct gum product
• H3 anti-inflammatory marketed as clinical gum healing
---
LAYER 9.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Chronic daily 1–2× use of gum product
• Gingival tissue stress accumulation under vehicle
• Microbiome stability across weeks and months
• Anti-inflammatory benefit accumulation vs irritant burden
• Post-gingivitis maintenance scenario
• Overuse risk (excessive Chlorhexidine or high-concentration application)
• Gingival recession trajectory under repeated irritant exposure
Core Question:
Can the gum care product genuinely reduce gingival inflammation and plaque burden
while preserving gingival tissue integrity and oral microbiome stability
under long-term daily real-world use?
Core Rules:
• Post-use gingival burning = gingival mucosal stress signal
• Botanical complexity ≠ clinical gum health benefit
• Long-term gingival tissue outcome overrides immediate freshness or soothing sensation
---
ANTI-MARKETING FILTER
Mandatory penalties:
• "Gum strengthening" without tissue repair mechanism evidence
• H3 botanical complexity as primary gum health signal
• Essential oil overload as clinical gum treatment (beyond functional evidence)
• Chlorhexidine daily cosmetic gum care marketing
• "Natural herbal gum formula" without H1/H2 actives at functional concentrations
• "Microbiome-balancing gum care" without antimicrobial selectivity support
• Alcohol burn = gum health benefit claim
• "Sensitivity-free" without Tier 3–4 vehicle support
---
BIAS NEUTRALIZATION FILTER
Neutralize:
• Botanical complexity = gum health quality bias
• Alcohol/essential oil burn = antiseptic gum effectiveness bias
• "Natural herbal = safer than clinical" bias
• Chlorhexidine = always best for gums bias
• Freshness sensation = gum health benefit bias
• Ingredient count = efficacy bias
• Bleeding on brushing = not serious bias
 (bleeding on brushing IS a gingival inflammation signal and must be addressed)
• Essential oils in gum care = always harmful bias
 (calibrated: functional concentrations in evidence-based formulas differ
 from excessive sensitizing loads)

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🦷 PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Gentle Alcohol-Free Anti-Gingivitis Gel
- Clinical Hyaluronic Acid Gum Serum
- High-Alcohol Essential Oil Gum Rinse
- Decorative Herbal Gum Gel (No Clinical Active)
- Short-Term Chlorhexidine Gum Rinse
- Zinc + Fluoride Balanced Gum Toothpaste

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering vehicle gingival safety, antimicrobial selectivity and microbiome impact, anti-inflammatory evidence base, pH compatibility, long-term gingival tissue behavior, and overall formulation balance.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy / Sensitivity Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Gum / Oral Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Gingival Health Analysis

### Anti-Plaque Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Gingival Tissue Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Anti-Gingivitis Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Gingival Tissue Healing Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Oral Microbiome Compatibility — ⭐X.X

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

# 👤 USER TYPE COMPATIBILITY

## Population Compatibility

### Sensitive Gums / Gingival Irritation — ⭐X.X

Short compatibility explanation.

### Gingivitis / Active Gum Inflammation — ⭐X.X

Short compatibility explanation.

### Gum Recession — ⭐X.X

Short compatibility explanation.

### Periodontal Maintenance — ⭐X.X

Short compatibility explanation.

### Dry Mouth / Xerostomia — ⭐X.X

Short compatibility explanation.

### Aphthous Ulcer Prone — ⭐X.X

Short compatibility explanation.

### Post-Surgical Gum Care — ⭐X.X

Short compatibility explanation.

### Healthy Gum Maintenance — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use (1×) — ⭐X.X

Short explanation.

### Twice Daily Use (2×) — ⭐X.X

Short explanation.

### Short-Term Clinical Use — ⭐X.X

Short explanation.

### Occasional Maintenance Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Gingival comfort or burning signal
- Freshness or soothing sensation
- Bleeding on brushing response

## Medium-Term

- Gingival inflammation changes
- Bleeding reduction trajectory
- Mucosal tolerance or sensitivity development

## Long-Term

- Gingival tissue integrity
- Plaque and gingivitis control
- Microbiome stability
- Overall periodontal health trajectory

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting vehicle gingival safety, antimicrobial selectivity, anti-inflammatory mechanism, mucosal and gingival tissue impact, active concentration relevance, and long-term gingival health outcome.

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
- Mention vehicle tier (alcohol and SLS concern), Chlorhexidine chronic use concern, SLS in gum product, decorative botanical inflation, and broad-spectrum antimicrobial overload in output where relevant
- No botanical complexity bias
- Structural weakness overrides freshness or soothing sensation
- Vehicle safety tier must be classified before scoring
- Antimicrobial selectivity tier must be classified before scoring
- Anti-inflammatory evidence tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Repeated-use behavior (1–2× daily chronic gum care) > single-use feel
- Long-term gingival health outcome > immediate soothing sensation
- Post-use gingival burning = structural failure signal
- Alcohol burn ≠ gum health benefit
- Botanical complexity ≠ clinical gum efficacy
- Chlorhexidine chronic daily use ≠ justified in cosmetic gum care
- SLS in gum product = higher penalty than general toothpaste context
- Natural herbal gum ≠ clinical gum care
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Gum Care Product Evaluation Algorithm — Structured for gingival tissue safety analysis, antimicrobial selectivity realism, and long-term oral microbiome health evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict gum care product structural evaluation engine."
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