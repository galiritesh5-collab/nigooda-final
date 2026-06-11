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
        "MOUTHWASH ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
MOUTHWASH / ORAL RINSE EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward mouthwashes that demonstrate:
• Evidence-based antimicrobial or therapeutic benefit
• Oral microbiome compatibility under repeated use
• Mucosal tolerance under chronic daily exposure
• Targeted action without broad-spectrum ecosystem disruption
• Barrier-considerate formulation (mucosal integrity preservation)
• Low cumulative irritation risk for oral mucosa, gingival tissue, and enamel
• Structural formulation honesty over sensory marketing
Mandatory penalties apply for:
• Alcohol-first "freshness" architecture without therapeutic justification —
 alcohol burn sensation does not constitute evidence of antimicrobial effectiveness
• Broad-spectrum antimicrobial overload without microbiome consideration
• Flavour-driven "clean breath" perception replacing clinical benefit
• Chlorhexidine overuse beyond indicated clinical periods
• Whitening agent inflation without evidence-based enamel safety
• Decorative botanical loading without clinical oral evidence
• "Natural" marketing overriding evidence-based actives
• Marketing-driven sensory engineering over structural oral benefit
Basic breath freshening alone cannot achieve high scores.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding and luxury positioning
• Alcohol burn intensity as "antiseptic" perception
• Flavour intensity and "fresh breath" marketing
• "Natural/organic/alcohol-free" marketing without structural support
• Trend-driven active loading (oil pulling, CBD, activated charcoal rinses)
• Ingredient-count inflation
• "Dentist recommended" association claims without structural evidence
Evaluate only:
• Antimicrobial selectivity vs microbiome disruption
• Alcohol content and mucosal impact
• Evidence-based therapeutic active delivery
• Repeated-use mucosal and microbiome tolerance
• Formulation structural honesty
Any format (liquid rinse, oil, dissolvable tablet rinse, concentrated dilution)
receives credibility only when oral compatibility, active delivery,
and microbiome consideration are demonstrated.
---
STRUCTURE DOMINANCE RULE
Primary mouthwash architecture determines:
• Mucosal integrity
• Oral microbiome stability
• Antimicrobial selectivity
• Active ingredient bioavailability
• Soft tissue and gingival tolerance
• Enamel surface compatibility
• Long-term oral tissue health
• Repeated-use safety
Minor additives, decorative botanicals, and secondary cosmetic actives
cannot override a damaging alcohol backbone or broad-spectrum antimicrobial overload.
Ingredient evaluation must consider:
• Alcohol content and mucosal drying risk
• Antimicrobial selectivity spectrum
• Active ingredient clinical evidence and concentration
• Functional relevance in liquid oral rinse delivery
• Repeated daily exposure (1–2× daily, ~30–60 seconds contact)
---
ORAL RINSE CONTACT CONTEXT RULE
Mouthwashes have direct swishing contact with all oral surfaces
(~30–60 seconds active rinse, residual film post-expectoration).
FULL CREDIT ACTIVES:
• Cetylpyridinium Chloride (CPC) — targeted antimicrobial, plaque/gingivitis
• Chlorhexidine Gluconate — gold standard antimicrobial (short-term clinical use only)
• Sodium Fluoride — remineralisation, caries prevention
• Stannous Fluoride — antimicrobial + remineralisation
• Hydrogen Peroxide (low concentration, 1–3%) — whitening, antimicrobial
• Zinc Chloride / Zinc Acetate — antimicrobial, halitosis control
• Potassium Nitrate — sensitivity relief
• Xylitol — anti-cariogenic (partial — concentration dependent)
• Essential Oil Formula (Thymol, Eucalyptol, Menthol, Methyl Salicylate) — clinical
 evidence base at functional concentrations; see Layer 2.5 for full essential oil guidance
PARTIAL CREDIT ACTIVES:
• Aloe Vera (anti-inflammatory — limited oral rinse evidence)
• Sodium Bicarbonate (pH buffering — limited standalone benefit)
• Hydrogen Peroxide at very low concentration (<1%) — minimal whitening evidence
• Low-concentration Xylitol (below clinical threshold)
• Neem / Tea Tree Oil (antimicrobial — limited clinical evidence; H2 botanical tier)
• Sodium Hyaluronate (mucosal support — emerging evidence)
DECORATIVE / MINIMAL CREDIT ACTIVES:
• Turmeric / Curcumin rinses (H3 botanical tier)
• CBD Oil rinses (H3 botanical tier)
• Activated Charcoal rinses
• Colloidal Silver rinses
• "Superfood" botanical blends (H3 botanical tier)
• Oil pulling (coconut oil, sesame oil) — insufficient clinical evidence vs conventional rinses
• Vitamin C rinses (unstable, minimal oral bioavailability)
Actives without clinical evidence for oral rinse benefit must not receive
full efficacy credit.
Decorative active marketing reduces:
• Ingredient Quality
• Formulation Honesty
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients may provide:
• Minor soothing sensation
• Mild flavour enhancement
• Temporary breath freshening
• Cosmetic mucosal comfort
They cannot offset:
• High-alcohol mucosal drying
• Broad-spectrum antimicrobial microbiome disruption
• Missing evidence-based therapeutic actives
• Chlorhexidine staining and taste disruption
---
BASIC FRESHENING LIMIT RULE
Basic breath freshening alone cannot achieve high structural scores.
Mouthwashes lacking:
• Evidence-based caries prevention, antimicrobial, or gum health actives
• Mucosal-compatible alcohol profile
• Oral microbiome consideration
receive moderate score ceilings regardless of freshening ability.
---
LAYER 1 — ALCOHOL CONTENT TIER (DOMINANT VEHICLE PARAMETER)
MANDATORY RULE:
Alcohol content must be classified by mucosal impact tier before scoring.
Alcohol is the primary vehicle determinant of:
• Mucosal drying and irritation
• Oral tissue dehydration
• Microbiome disruption potential at high concentrations
• Long-term soft tissue tolerance
• Chronic mucosal irritation risk under repeated use
• Dry mouth aggravation
---
ALCOHOL TIER TABLE
TIER 1 — HIGH ALCOHOL / HIGH MUCOSAL RISK
Alcohol content: >18%
Examples:
• Classic Listerine Original (~26.9% alcohol)
• Most traditional antiseptic mouthwashes
• Classic cosmetic alcohol rinses
Characteristics:
• High mucosal drying potential under repeated use
• May increase disruption of the oral mucosal barrier over time
• May aggravate xerostomia (dry mouth) in susceptible users
• Elevated cumulative irritation burden under chronic use
• Alcohol burn sensation does not indicate antimicrobial effectiveness —
 burn perception and therapeutic outcome must not be conflated
Scoring Impact:
• Mandatory Safety adjustment
• Mucosal Tolerance ceiling reduction
• High Cumulative Irritation Risk weighting
Note: Strong therapeutic active architecture (e.g. Listerine-type essential oil formula
with clinical evidence) partially mitigates mucosal cost and receives
evidence-based antimicrobial credit alongside vehicle risk flag.
Mitigation does not eliminate Tier 1 mucosal concern but prevents binary failure.
---
TIER 2 — MODERATE ALCOHOL
Alcohol content: 8–18%
Characteristics:
• Moderate mucosal drying
• Lower irritation potential than Tier 1
• Formulation-dependent tolerance; soothing co-actives can partially offset
Scoring Impact:
• Moderate Safety adjustment
• Moderate Mucosal Tolerance ceiling
---
TIER 3 — LOW ALCOHOL
Alcohol content: 1–8%
Characteristics:
• Low mucosal drying
• Broadly tolerated across most adult user profiles
• Suitable for most contexts including mild sensitivity
Scoring Impact:
• Eligible for good Mucosal Tolerance scores
• Compatible with sensitive user profiles
---
TIER 4 — ALCOHOL-FREE
Alcohol content: 0%
Characteristics:
• No mucosal drying from alcohol vehicle
• Highest daily-use mucosal safety profile
• Compatible with children, dry mouth, post-surgical, and pregnancy contexts
Scoring Impact:
• Eligible for maximum Mucosal Tolerance
• Transparency bonus eligible
Note:
Alcohol-free status alone does not guarantee efficacy or safety.
Active ingredient quality must still be evaluated independently.
An alcohol-free rinse with only decorative botanical actives is a cosmetic product,
not a therapeutic rinse.
---
ALCOHOL SYSTEM RULE
• Tier 1 alone → High mucosal stress
• Tier 1 + Strong Antimicrobial Evidence → Moderate-High
 (therapeutic benefit receives credit alongside mucosal concern — not binary failure)
• Tier 2 alone → Moderate mucosal stress
• Tier 2 + Evidence-Based Active → Moderate-Low
• Tier 3/4 + Strong Active → Low mucosal stress, high therapeutic value
• Tier 4 (alcohol-free) + Evidence-Based Active → Ideal profile
---
LAYER 2 — ANTIMICROBIAL SELECTIVITY TIER
MANDATORY RULE:
All antimicrobial agents must be classified by selectivity and microbiome impact
before scoring.
Selectivity is the primary determinant of:
• Commensal oral microbiome preservation
• Long-term antimicrobial benefit/risk balance
• Halitosis control mechanism quality
• Gingival health benefit
• Plaque control efficacy
---
ANTIMICROBIAL SELECTIVITY TIER TABLE
TIER A — HIGHLY SELECTIVE / MICROBIOME-FRIENDLY
Examples:
• Xylitol (selective mutans streptococci inhibition)
• Zinc Chloride / Zinc Acetate (targeted VSC control)
• Sodium Fluoride (targeted caries pathogen inhibition)
• Stannous Fluoride (targeted pathogen inhibition)
• Nano-hydroxyapatite (passive adsorption, no microbiome disruption)
Characteristics:
• Targeted pathogen inhibition
• Minimal commensal disruption
• High microbiome compatibility
• Suitable for chronic daily use
Scoring Impact:
• Maximum Microbiome Compatibility
• Eligible for elite Long-Term Compatibility
---
TIER B — MODERATELY SELECTIVE
Examples:
• Cetylpyridinium Chloride (CPC) — moderate-spectrum; strong clinical evidence
 for plaque/gingivitis reduction
• Essential Oil Formula (Thymol/Eucalyptol/Menthol/Methyl Salicylate) —
 moderate spectrum; clinical evidence base at functional concentrations;
 see Layer 2.5 for essential oil guidance
• Hydrogen Peroxide at low concentration (1–3%) — broad but short-contact
• Sodium Bicarbonate (mild pH-shift antimicrobial)
Characteristics:
• Moderate commensal disruption at functional concentrations
• Evidence-based clinical benefit
• Acceptable for daily use with appropriate monitoring
Scoring Impact:
• Moderate Microbiome Compatibility
• Eligible for good therapeutic scores
---
TIER C — BROAD-SPECTRUM / HIGH DISRUPTION
Examples:
• Chlorhexidine Gluconate — gold-standard clinical antimicrobial, but broad-spectrum
• Triclosan — broad-spectrum, environmental persistence concern
• Benzalkonium Chloride — broad-spectrum, mucosal concern
• High-concentration Hydrogen Peroxide (>3%)
• Povidone-Iodine (short-term surgical/clinical only)
Characteristics:
• High commensal microbiome disruption potential
• Staining risk (Chlorhexidine)
• Dysgeusia (taste alteration) risk
• Nitric oxide pathway disruption risk under chronic use (see Microbiome note)
• Suitable for short-term clinical indication; chronic cosmetic use is not justified
Scoring Impact:
• Microbiome Compatibility penalty for chronic cosmetic use
• Formulation Honesty penalty if marketed for daily cosmetic use
• Clinical context partially mitigates penalty
---
CHLORHEXIDINE SPECIAL RULE
Chlorhexidine Gluconate is a clinical-grade agent indicated for:
• Post-surgical oral care
• Acute gingivitis management
• Short-term periodontitis adjunct therapy
Chronic cosmetic daily use is not an appropriate indication and receives:
• Microbiome Compatibility penalty
• Formulation Honesty adjustment (if positioned as daily cosmetic rinse)
• Staining and dysgeusia concerns must be flagged under Concerns
Clinical-context use (prescribed, short-term) partially mitigates penalties.
---
LAYER 2.5 — ESSENTIAL OIL AND FRAGRANCE SYSTEM ASSESSMENT
Essential oil and fragrance systems in mouthwashes require calibrated, context-aware
evaluation. They are not uniformly harmful nor uniformly therapeutic.
TIER F1 — EVIDENCE-SUPPORTED FUNCTIONAL SYSTEMS
• Listerine-type essential oil formula (Thymol, Eucalyptol, Menthol, Methyl Salicylate)
 at clinical formulation concentrations — strong clinical antimicrobial evidence;
 receives Category B/Tier B antimicrobial credit with microbiome impact noted
• These systems represent a legitimate, evidence-based therapeutic mechanism
 and should receive this credit even within a Tier 1 alcohol vehicle — the alcohol
 vehicle cost and the antimicrobial benefit are assessed separately, not collapsed
• CPC-based essential oil combinations — evidence-based
TIER F2 — STANDARD FLAVOUR / AROMATIC SYSTEMS
• Standard peppermint, spearmint, menthol at typical rinse flavouring concentrations
• Mild aromatic blends at cosmetic usage levels
• Low-concentration peppermint or menthol should NOT automatically trigger
 aggressive mucosal sensitization penalties
TIER F3 — HIGH-CONCERN SENSITIZING SYSTEMS
• High-concentration cinnamon/cinnamaldehyde in prolonged-contact formats
• Clove/eugenol at elevated concentrations with prolonged mucosal exposure
• Excessive fragrance loading beyond functional justification
RULES:
• Listerine-type formulas receive evidence-based antimicrobial credit — this is not
 "essential oils = marketing"; it is a clinically supported formulation
• Standard flavour aromatics in a rinse context (short 30–60 second contact)
 present lower cumulative sensitization risk than prolonged-contact formats
• High-sensitizer blends under chronic rinse use are penalised proportionally
• "Essential oils = always microbiome-disrupting" is an overstatement —
 concentration, selectivity, and contact time all matter
---
LAYER 3 — ORAL MICROBIOME IMPACT RULE
MICROBIOME COMPATIBILITY MODIFIER
Higher disruption risk under repeated use:
• Chlorhexidine Gluconate (broad-spectrum, nitric oxide pathway disruption)
• Triclosan (broad-spectrum, environmental persistence)
• Benzalkonium Chloride
• High-alcohol systems (>18%) — general mucosal and microbial disruption potential
• Povidone-Iodine (clinical short-term only)
• Essential oil formulas at very high concentration under daily use
Lower disruption risk:
• Xylitol systems (selective anti-cariogenic)
• Fluoride-only systems (targeted)
• Zinc Citrate / Zinc Acetate (mild, targeted VSC control)
• nHAp systems (passive, non-antimicrobial)
• Alcohol-free formulations with Tier A/B antimicrobials
• CPC at standard concentration (moderate, acceptable for daily use)
Application Rules:
• Primarily modifies Microbiome Compatibility and Long-Term Oral Compatibility scores
• Reinforces alcohol tier assessments
• Broad-spectrum antimicrobials require short-term clinical justification
 to avoid major Formulation Honesty penalty
• Essential oil systems at standard Listerine-type concentrations present
 moderate — not catastrophic — microbiome disruption risk
NITRIC OXIDE PATHWAY NOTE:
Chlorhexidine eliminates nitrate-reducing oral bacteria responsible for
systemic nitric oxide production, which has been studied in relation to
blood pressure regulation. This structural concern must be flagged
under chronic daily use. It is a formulation concern, not a medical claim.
---
LAYER 3.5 — MUCOSAL SAFETY RULE
Oral mucosa is highly permeable and in repeated direct contact with rinse solution.
HIGHER CONCERN MUCOSAL AGENTS:
• Alcohol >18% — mucosal drying, barrier disruption potential, chronic irritation under repeated use
• SLS in rinse form — aphthous ulcer association, mucosal disruption
• Chlorhexidine chronic use — mucosal chemical irritation potential
• Benzalkonium Chloride — mucosal toxicity at higher concentrations
• High-concentration Hydrogen Peroxide (>3%) — mucosal oxidative damage
• Menthol at very high concentration — mucosal sensitization risk in susceptible users
• Artificial colorants — unnecessary mucosal irritation burden
MUCOSAL-SUPPORTIVE AGENTS (positive modifier):
• Aloe Vera (limited evidence; soothing note)
• Sodium Hyaluronate (mucosal support; emerging evidence)
• Glycerin (humectant, mucosal comfort)
• Xylitol (mucosal hydration; anti-cariogenic)
• Chamomile extract (mild anti-inflammatory)
SLS in mouthwash is less common than in toothpaste but potentially more concerning
due to longer unrinsed mucosal contact residual.
---
LAYER 3.6 — COLORANT AND ARTIFICIAL ADDITIVE ASSESSMENT
Artificial colorants and sweeteners in oral-contact products add unnecessary
mucosal irritation burden with no oral health benefit.
Higher concern examples:
• Blue 1 (FD&C Blue No. 1) — common in tinted mouthwashes
• Green 3, Yellow 5, Red 40, Yellow 6
• Multiple synthetic dye blends
Sweetener considerations:
• Saccharin / Sodium Saccharin — low concern at rinse levels
• Aspartame — moderate concern
• Xylitol as sweetener — functional dual role (sweetener + anti-cariogenic)
• Sorbitol as vehicle/sweetener — low concern, hygroscopic benefit
Scoring Impact:
• Allergy/Sensitivity Risk adjustment
• Ingredient Quality adjustment
• Cumulative Irritation Risk adjustment
• Formulation Honesty adjustment where overloaded without oral benefit
---
LAYER 4 — HERBAL AUTHENTICITY & NATURAL CLAIM VALIDATION ENGINE
[CONDITIONAL LAYER — activates when herbal claims, botanical-heavy marketing,
Ayurvedic/natural/organic positioning, or plant-based therapeutic claims are present]
This layer distinguishes between evidence-supported botanical actives
and decorative herbal marketing inflation.
H1 — EVIDENCE-SUPPORTED FUNCTIONAL BOTANICALS (oral rinse context)
• Aloe Vera — anti-inflammatory, mucosal soothing; limited but acceptable oral evidence
• Green Tea Extract — antioxidant; limited clinical oral rinse benefit but credible mechanism
• Chamomile — mild anti-inflammatory; limited clinical evidence in rinse context
• Propolis — antimicrobial and mild anti-inflammatory; limited but credible evidence
• Sodium Hyaluronate — mucosal support; emerging evidence in oral rinse application
These may receive minor positive functional credit with evidence quality acknowledged.
H1 botanicals cannot override dominant vehicle or antimicrobial architecture assessment.
---
H2 — TRADITIONAL / EMERGING EVIDENCE BOTANICALS (oral rinse context)
• Neem — traditional antimicrobial; limited clinical rinse evidence; partial credit possible
• Miswak — traditional use; moderate emerging antimicrobial evidence
• Tea Tree Oil — antimicrobial properties; limited direct oral rinse clinical evidence
• Sage — mild antimicrobial; limited oral rinse evidence
• Clove — antimicrobial; sensitization potential at high concentrations
• Eucalyptus — better evidence within established essential oil formulas
Limited partial credibility credit available.
Traditional use ≠ clinical equivalence.
Evidence quality must be acknowledged when assigning any credit.
---
H3 — DECORATIVE / MARKETING-DRIVEN BOTANICALS (oral rinse context)
• Turmeric / Curcumin rinse
• CBD oil rinse
• Superfood botanical blends
• Activated charcoal rinse with botanical co-branding
• Exotic botanical complexity inflation
• Trace botanical extracts used primarily for marketing narrative
Minimal to no functional credit.
Formulation Honesty penalty if marketed as primary therapeutic mechanism.
---
HERBAL CLAIM OUTPUT RULES:
• H1 botanicals at meaningful concentrations → noted as minor positive structural feature
• H2 botanicals → noted with evidence quality caveat
• H3 botanicals → noted as decorative; Formulation Honesty adjustment if overmarketed
• "Oil pulling = clinical rinse equivalent" positioning → mandatory Formulation Honesty penalty
• "Natural herbal rinse" without H1/H2 actives at functional concentrations
 → Formulation Honesty adjustment
---
LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 FOR EVERY CATEGORY
---
SAFETY [DOMINANT]
Evaluates:
• Alcohol content and mucosal drying risk under chronic use
• Antimicrobial spectrum and tissue burden
• Repeated-use soft tissue and mucosal tolerance
• Sensitization potential (flavour agents, essential oils — concentration-calibrated)
• Cumulative inflammatory oral load
• Long-term mucosal integrity trajectory
• Chronic dry mouth (xerostomia) aggravation risk
Core Rules:
• Repeated low-grade mucosal irritation reduces Safety
• Daily 1–2× exposure magnifies irritation burden
• High-alcohol, broad-spectrum antimicrobial architectures reduce elite scoring
 probability — but mitigating factors (therapeutic actives, soothing co-ingredients,
 short contact time, moderate concentration) are considered
• Safety overrides:
 — Alcohol burn perception
 — Flavour freshness
 — Whitening marketing
 — "Clinical strength" positioning
 — "Natural" positioning
---
EFFECTIVENESS
Core Question:
Can the mouthwash effectively deliver its claimed therapeutic benefit
while maintaining oral stability under repeated use?
Evaluates:
• Antimicrobial plaque and gingivitis control
• Caries prevention (fluoride delivery)
• Halitosis control mechanism (VSC neutralisation vs flavour masking — must distinguish)
• Sensitivity relief (if claimed)
• Whitening efficacy (evidence-based only)
• Gum health support
• Repeated-use functional stability
• Structural formulation honesty
Rules:
• Breath masking ≠ halitosis treatment — must be noted as Effectiveness limitation
• Whitening claims without evidence-based peroxide/fluoride = Effectiveness adjustment
• Decorative active inflation cannot receive full credit
• Basic freshening without therapeutic actives cannot achieve elite effectiveness
• Alcohol burn perception does not indicate antimicrobial effectiveness
---
ALLERGY / SENSITIVITY RISK
Evaluates:
• Alcohol mucosal sensitization under repeated use
• Flavouring agent sensitization — calibrated to concentration (see Layer 2.5)
• Essential oil sensitization — low-level peppermint/menthol in standard rinse context
 should not trigger aggressive penalties automatically
• SLS mucosal irritation (if present)
• Preservative sensitization (Sodium Benzoate, Parabens)
• Artificial colorant irritation burden
• Repeated daily oral mucosal exposure accumulation
• Aphthous ulcer trigger potential (SLS, Sodium Benzoate, alcohol)
• Chlorhexidine contact sensitization risk
Application Rules:
• Oral mucosal contact is direct and repeated — higher concern than skin rinse-off
• Twice-daily exposure is heavily weighted in cumulative risk assessment
• Penalty is proportional to concentration, sensitization profile, and exposure duration
---
ECO IMPACT
Evaluates:
• Triclosan environmental persistence (flag where present)
• Chlorhexidine aquatic toxicity at scale
• SLS biodegradability
• Artificial colorant environmental load
• Plastic packaging
• Fluoride environmental load (low concern at product levels)
---
INGREDIENT QUALITY
Evaluates:
• Antimicrobial system coherence and clinical evidence
• Alcohol vehicle justification vs mucosal cost
• Active ingredient system honesty and concentration adequacy
• Fluoride/nHAp clinical relevance
• Functional ingredient synergy
• Structural transparency
• Herbal claim authenticity (H1/H2/H3 classification)
• Absence of decorative inflation
Rules:
• Decorative H3 active stacking reduces quality credibility
• Oil pulling marketing as equivalent to conventional rinse = major quality adjustment
• Chlorhexidine daily cosmetic use = Formulation Honesty concern
• Essential oil systems with genuine clinical evidence (Listerine-type) contribute
 positively to ingredient quality despite being non-selective
---
ORAL COMPATIBILITY
Evaluates:
• Daily 1–2× use mucosal tolerance
• Mucosal barrier resilience
• Post-rinse dryness or burning
• Aphthous ulcer compatibility
• Oral microbiome stability
• Gum tissue tolerance
• Long-term enamel surface compatibility
• Xerostomia aggravation
• Cumulative sensitization risk
Core Rules:
• Temporary freshness does not equal oral compatibility
• Alcohol burn sensation does not equal antimicrobial effectiveness
• Long-term repeated-use behavior is prioritized over immediate sensory feel
• Post-rinse mucosal burning or dryness is a structural mucosal stress signal —
 not a sign of "deep cleansing"
CORE SCORE FORMULA
Core Score =
(
Safety × 0.25 +
Effectiveness × 0.20 +
Allergy / Sensitivity Risk × 0.15 +
Eco Impact × 0.10 +
Ingredient Quality × 0.15 +
Oral Compatibility × 0.15
)
---
LAYER 6 — SPECIALIZED ORAL RINSE PERFORMANCE
Evaluates real-world repeated-use mouthwash behavior.
Score Range: 1.0 → 5.0
---
ANTIMICROBIAL EFFICACY
Evaluates:
• Plaque formation inhibition
• Gingivitis-causing bacteria inhibition
• VSC (volatile sulphur compound) neutralisation for halitosis
• Selectivity of antimicrobial action
• Substantivity (post-rinse residual antimicrobial effect duration)
Core Rules:
• Alcohol burn does not indicate antimicrobial effectiveness
• Flavour freshness does not indicate antimicrobial effect
• Substantivity is a critical differentiator — agents with post-rinse activity receive credit
• Masking halitosis vs treating VSC source must be distinguished
• Broad-spectrum action without selectivity at standard concentrations is noted —
 but evidence-based formulas (Listerine-type) receive clinical antimicrobial credit
CEILING RULE:
Decorative-only rinses (H3 botanical/essential oil without clinical evidence) cannot achieve
maximum Antimicrobial Efficacy regardless of flavour intensity.
Chlorhexidine chronic cosmetic use cannot achieve maximum score due to microbiome disruption
and unjustified chronic indication.
---
MUCOSAL PRESERVATION [DOMINANT]
Evaluates:
• Alcohol-induced mucosal drying and irritation under repeated use
• SLS mucosal disruption
• Chlorhexidine chemical irritation risk
• Repeated-use mucosal resilience
• Long-term mucosal integrity trajectory
MUCOSAL PRESERVATION CEILINGS
• Tier 1 alcohol dominant (>18%) → Max 2.0
• Tier 1 + evidence-based active (e.g. Listerine-type essential oil formula) → Max 2.5
 [Therapeutic credit partially offsets mucosal cost; ceiling reflects vehicle risk, not product failure]
• Tier 2 alcohol (8–18%) → Max 3.2
• Tier 2 + mucosal-supportive ingredient → Max 3.7
• Tier 3 low alcohol (1–8%) → Max 4.2
• Tier 4 alcohol-free + evidence-based active at appropriate pH → Eligible for 5.0
• Any tier with SLS → ceiling reduced by 0.5
• Chlorhexidine daily cosmetic use → Max 3.0 regardless of alcohol tier
Core Rules:
• Post-rinse burning or dryness = mucosal stress signal
• High scores require:
 — Alcohol-free or low-alcohol (Tier 3–4)
 — No SLS or Chlorhexidine for daily cosmetic use
 — Low repeated mucosal stress profile
• Mucosal Preservation is the dominant mouthwash performance parameter
---
ENAMEL SAFETY
Evaluates:
• Fluoride/nHAp remineralisation active presence
• Acid-generating component risk (noted contextually when ingredient evidence is clear)
• Whitening peroxide concentration enamel impact
• Alcohol surface dehydration (transient, low concern at normal use)
Note on pH context:
When formulation ingredients strongly suggest an acid-generating environment
(e.g. undiluted citric acid rinses, lemon-based rinses, high-vinegar systems),
this is noted as a contextual structural observation with appropriate uncertainty —
not a deterministic pH tier score.
Core Rules:
• Fluoride-containing rinses receive remineralisation credit
• Whitening peroxide at >3% → enamel safety concern flag
---
HALITOSIS CONTROL
Evaluates:
• VSC neutralisation mechanism (Zinc, CPC, Chlorhexidine, essential oils)
• Genuine bacterial source control vs flavour masking
• Substantivity of anti-halitosis effect
• Post-rinse duration of effect
• Tongue/posterior-throat biofilm access
Core Rules:
• Flavour masking ≠ halitosis treatment — must not receive full halitosis credit
• Genuine VSC-targeting actives (Zinc, Stannous Fluoride, CPC) receive full credit
• Chlorhexidine receives clinical halitosis credit but with microbiome penalty
• Duration of effect is a scoring modifier
---
ORAL MICROBIOME COMPATIBILITY
Evaluates:
• Commensal oral microbiome preservation
• Broad-spectrum antimicrobial disruption risk
• Selective antimicrobial benefit (xylitol, zinc, fluoride, CPC)
• Long-term oral microbiome balance
• Nitric oxide pathway preservation
Core Rules:
• Routine oral microbiome disruption reduces score
• Broad-spectrum systems (Chlorhexidine, Triclosan) receive daily-use penalties
• Nitric oxide pathway disruption by Chlorhexidine must be flagged (structural concern)
• Xylitol receives selective anti-cariogenic credit without major microbiome penalty
• Fluoride systems are microbiome-compatible
• Essential oil systems (Listerine-type) at standard concentrations: moderate microbiome
 impact — acknowledged but not catastrophically penalized; clinical benefit is weighed
---
CUMULATIVE IRRITATION RISK
Evaluates:
• Repeated alcohol mucosal exposure under chronic use
• Flavouring agent accumulation — calibrated to concentration and sensitizer profile
• Essential oil exposure at high concentration under repeated daily use
• Preservative sensitization (Sodium Benzoate, Parabens)
• Chlorhexidine staining and dysgeusia accumulation
• Frequency-weighted exposure (1–2× daily oral rinse)
• Aphthous ulcer trigger accumulation
• Xerostomia progression under high-alcohol chronic use
Core Rules:
• Twice-daily exposure amplifies irritation burden significantly
• Mild irritants may become clinically significant under repeated oral rinse exposure
• Alcohol + high-flavour + SLS compound mucosal irritation burden
• Long-term low-grade mucosal irritation is prioritized over isolated acute reactions
• Dry mouth progression under chronic high-alcohol use must be reflected
• Standard flavour aromatics at typical rinse concentrations are lower concern —
 penalty must be proportional, not applied categorically to all essential oil presence
---
FORMULATION HONESTY
Evaluates:
• Alcohol burn marketed as clinical effectiveness
• Flavour-driven "fresh breath" = oral health positioning
• Oil pulling marketed as equivalent to clinical rinse
• CBD/charcoal/turmeric "natural" oral rinse positioning (H3 botanicals)
• Decorative H3 botanical loading without oral evidence
• Chlorhexidine marketed for daily cosmetic use beyond clinical indication
• Whitening claims without evidence-based peroxide mechanism
• Sensitivity claims without Potassium Nitrate/Stannous Fluoride evidence
• "Microbiome-friendly" claims without antimicrobial selectivity support
• "Alcohol-free = automatically safer/better" claims without active ingredient quality
• Herbal/natural marketing without H1/H2 actives at functional concentrations
Core Rules:
• Consumer perception cannot replace structural formulation quality
• Alcohol burn does not equal antiseptic performance
• Clinical outcome overrides sensory satisfaction
• "Natural" ≠ clinically effective in oral rinse context
• Alcohol-free rinse with only H3 decorative actives = cosmetic rinse, not therapeutic product
---
SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all 7 specialized scores
Dominant Parameters:
• Mucosal Preservation → primary interpretive parameter
• Cumulative Irritation Risk → primary penalty parameter
---
LAYER 7 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
---
HIGH SCORE ELIGIBILITY (>4.0)
Requires:
• Tier 3 or Tier 4 alcohol profile (preferably alcohol-free)
• Evidence-based therapeutic active at clinical concentration
 (Fluoride ≥225 ppm, CPC ≥0.05%, Zinc ≥0.2%, Xylitol ≥5%, or equivalent)
• Mucosal Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• No SLS in formulation
• No Chlorhexidine for daily cosmetic use
• No dominant high-sensitizer essential oil overload
• Formulation Honesty ≥ 3.5
• No unjustified broad-spectrum antimicrobial dominance
DISQUALIFIERS:
• Primary Tier 1 alcohol (>18%) without strong therapeutic active justification
• No evidence-based therapeutic active present
• Chlorhexidine positioned for chronic daily cosmetic use
• Heavy H3 botanical/colorant overload as primary claimed benefit
• SLS at significant concentration
• Oil pulling marketed as clinical rinse equivalent
---
LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Once or twice-daily rinsing (30–60 second contact)
• Mucosal barrier stress accumulation under vehicle
• Salivary flow interaction and recovery
• Long-term oral microbiome stability
• Enamel surface interaction over months
• Repeated flavouring/alcohol/preservative sensitization trajectory
• Xerostomia trajectory under chronic alcohol exposure
• Chlorhexidine staining accumulation if present
Core Question:
Can the mouthwash remain therapeutically effective, mucosal-safe, and
microbiome-compatible under long-term real-world oral rinse use?
Core Rules:
• Post-rinse mucosal dryness or burning = mucosal stress signal
• Alcohol burn ≠ antiseptic quality
• Substantivity of antimicrobial effect matters more than immediate sensation
• Freshness duration from flavour ≠ therapeutic duration
---
ANTI-MARKETING FILTER
Mandatory penalties apply for:
• Alcohol burn = clinical strength positioning
• Flavour-driven "fresh breath" = oral health positioning
• Oil pulling = clinical rinse equivalent claims
• CBD / charcoal / volcanic mineral "oral detox" claims
• H3 botanical loading presented as primary therapeutic mechanism
• Chlorhexidine daily cosmetic marketing beyond clinical indication
• Whitening claims without peroxide mechanism or evidence
• "Microbiome-balancing" claims lacking antimicrobial selectivity support
• "Alcohol-free = automatically superior" claims without active ingredient quality
• Sensitivity claims without Potassium Nitrate or Stannous Fluoride support
---
BIAS NEUTRALIZATION FILTER
Neutralize:
• Alcohol burn = effectiveness illusion
• Flavour = oral health illusion
• "Natural oil pulling = safe and equivalent to clinical rinse" bias
• Botanical inflation bias (H3 botanical lists ≠ therapeutic efficacy)
• Whitening = healthy enamel bias
• Chlorhexidine = always best antimicrobial bias
• "Alcohol-free = automatically better" bias (requires evidence-based actives)
• Ingredient-count quality illusion
• Burning sensation = deep cleaning illusion
• Essential oils = always harmful bias (Listerine-type formulas have clinical evidence)

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🫧 PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Gentle Alcohol-Free Fluoride Rinse
- Balanced CPC Antimicrobial Rinse
- High-Alcohol Antiseptic Rinse (Therapeutic)
- Decorative Botanical Freshening Rinse
- Clinical Chlorhexidine Rinse (Short-Term Use)
- Overloaded Essential Oil Whitening System

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering alcohol content and mucosal safety, antimicrobial selectivity and microbiome impact, evidence-based active delivery, pH compatibility, long-term oral behavior, and overall formulation balance.

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

### Oral Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Oral Health + Mucosal Safety Analysis

### Antimicrobial Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Mucosal Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Enamel Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Halitosis Control — ⭐X.X

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

### Sensitive Mucosa / Dry Mouth — ⭐X.X

Short compatibility explanation.

### Cavity-Prone — ⭐X.X

Short compatibility explanation.

### Gum / Gingivitis Issues — ⭐X.X

Short compatibility explanation.

### Halitosis — ⭐X.X

Short compatibility explanation.

### Whitening Goal — ⭐X.X

Short compatibility explanation.

### Aphthous Ulcer Prone — ⭐X.X

Short compatibility explanation.

### Children (6+) — ⭐X.X

Short compatibility explanation.

### Post-Surgical / Clinical Use — ⭐X.X

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

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Rinse feel and burn level
- Freshness sensation
- Mucosal comfort or irritation signals

## Medium-Term

- Mucosal response (dryness, comfort)
- Gum health changes
- Sensitivity changes
- Staining (Chlorhexidine)

## Long-Term

- Mucosal integrity
- Caries and gingivitis prevention outcome
- Microbiome stability
- Xerostomia trajectory
- Overall oral health outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting alcohol vehicle, antimicrobial system, mucosal safety and irritation risk, active (fluoride, CPC, zinc, xylitol) performance, enamel and tissue compatibility, and long-term oral outcome.

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
- Mention alcohol content tier, SLS, Chlorhexidine chronic use concern, harsh colorants, and broad-spectrum antimicrobial overload in output where relevant
- No alcohol-burn bias
- Structural weakness overrides cosmetic feel and flavour experience
- Alcohol tier must be classified before scoring
- Antimicrobial selectivity tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Active ingredient efficacy category must be classified before Effectiveness scoring
- Repeated-use behavior (1–2× daily) > single-use feel
- Long-term oral outcome > immediate sensation
- Post-rinse mucosal dryness or burning = structural failure signal
- Alcohol burn ≠ antimicrobial power
- Chlorhexidine daily cosmetic use ≠ justified
- Oil pulling ≠ clinical rinse equivalent
- Flavour freshness ≠ oral health benefit
- Alcohol-free alone ≠ superior without active ingredient quality
- Natural positioning ≠ clinical efficacy
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Mouthwash Evaluation Algorithm — Structured for alcohol safety analysis, antimicrobial selectivity realism, and long-term mucosal and oral microbiome health evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict mouthwash structural evaluation engine."
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