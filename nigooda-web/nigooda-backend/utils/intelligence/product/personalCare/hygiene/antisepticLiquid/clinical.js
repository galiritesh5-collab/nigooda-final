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
        "ANTISEPTICLIQUID ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ANTISEPTIC PRODUCT EVALUATION ALGORITHM — V1.0
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward antiseptic products that demonstrate:
• Genuine, evidence-based antimicrobial efficacy at declared active concentrations • Appropriate active ingredient selection for stated use context • Spectrum of activity matched to intended application (hand sanitiser vs. wound antiseptic vs. surface disinfectant) • Skin compatibility under the use frequency and conditions of intended purpose • Honest regulatory classification — cosmetic vs. OTC drug vs. medical device • Low cumulative skin toxicity risk under repeated application • Formulation architecture that supports active delivery, not just sensory experience • Honest resistance and residual activity claims
Mandatory penalties apply for:
• Antimicrobial claims without Category A actives at functional concentrations • "Kills 99.9% of germs" labelling without evidence-based active system • Regulatory misclassification — cosmetic products making drug-level claims • Fragrance-driven "fresh/clean" perception substituting for genuine antimicrobial function • Sub-lethal active concentrations that may promote resistance development • Skin compatibility claims incompatible with actual active concentration or frequency of use • Decorative botanical "antibacterial" claims without documented MIC evidence • Alcohol-free "sanitiser" claims without alternative Category A active system
Basic antimicrobial labelling alone cannot achieve high scores. Genuine spectrum-appropriate efficacy at functional concentrations is mandatory.
ANTISEPTIC CONTEXT RULE — MANDATORY PRIMARY MODIFIER
Antiseptic products differ fundamentally from cosmetic cleansers, moisturisers, and hygiene products in:
REGULATORY CLASSIFICATION: • Antiseptics occupy a regulatory grey zone across jurisdictions: — EU: May be classified as biocidal products (Regulation 528/2012), OTC medicines, or cosmetics depending on claims — USA (FDA): Antiseptics are OTC drug products regulated under monograph system; hand sanitisers fall under OTC drug rules — India, other markets: Variable — cosmetic or drug classification depending on active and claim • Products making antimicrobial kill claims are generally regulated as drugs/biocides, NOT cosmetics • "Cosmetic" products claiming antimicrobial activity are making drug-level claims — mandatory regulatory flag
PRODUCT FORMAT SCOPE: This algorithm covers: • Alcohol-based hand sanitisers (gel, liquid, foam, spray) • Non-alcohol hand sanitisers (BKC, PHMB-based) • Wound antiseptics (liquid, cream, spray, gel) • Antiseptic wipes • Antiseptic skin cleansers (chlorhexidine, povidone-iodine washes) • Topical antiseptic creams and ointments • Antiseptic throat/oral products are OUT OF SCOPE
Each format receives format-specific context modifiers within the same scoring framework.
USE CONTEXT CLASSIFICATION (MANDATORY): Before scoring, identify the primary use context:
CONTEXT 1 — HAND SANITISER (Non-clinical / General Public): • Replaces or supplements handwashing when soap/water unavailable • WHO-recommended formulation: 80% ethanol or 75% isopropanol • Primary target: transient flora (Staphylococcus aureus, E. coli, enteric pathogens, respiratory viruses) • Frequency: variable, up to 10–20× daily in high-risk situations • Skin compatibility: critical under high-frequency use
CONTEXT 2 — HEALTHCARE / SURGICAL HAND ANTISEPSIS: • Pre-surgical scrub or routine clinical hand hygiene • Active: chlorhexidine gluconate 2–4%, povidone-iodine 7.5–10%, alcohol 70%+ • Residual activity is critical — transient and resident flora • Frequency: very high in clinical setting • Skin compatibility under occupational use: mandatory assessment
CONTEXT 3 — WOUND ANTISEPTIC: • Application to broken skin — cuts, abrasions, minor wounds, post-procedure skin • Tissue toxicity is a PRIMARY concern — cytotoxicity to fibroblasts and keratinocytes at standard antiseptic concentrations • Active concentration must be balanced against wound healing impairment • Contact time: variable — wound dressings may produce prolonged contact
CONTEXT 4 — ANTISEPTIC SKIN CLEANSER (Pre-procedure, Post-procedure, Infection prevention): • Chlorhexidine wash, povidone-iodine scrub, antiseptic body wash • Targeted at specific infection-prevention applications • Skin compatibility under repeated use: critical
CONTEXT 5 — HOUSEHOLD / GENERAL USE ANTISEPTIC: • First-aid topical antiseptics, household disinfectant wipes, general surface/skin use • Variable spectrum requirements • Consumer-accessible formulation — safety and misuse risk assessment required
SCORING MANDATE: Use context MUST be identified before scoring. Efficacy, safety, and skin compatibility scores MUST be calibrated to the identified use context. A product scoring 4.5 for wound antiseptic may score 2.0 for hand sanitiser — the use context drives the entire evaluation.
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding and marketing positioning • Fragrance freshness or "clean hands" perception • Gel texture pleasantness • "Natural/botanical/herbal" antibacterial claims • "Hospital-grade" or "medical-grade" labelling without evidence • Ingredient-count inflation • Moisturiser additive claims in antiseptic context (secondary to antimicrobial function) • "Tested against X strains" claims without declared active concentration and contact time
Evaluate only:
• Active ingredient identity and concentration • Spectrum of antimicrobial activity (bacterial, viral, fungal, sporicidal) • Contact time requirement for efficacy • Evidence base for stated kill claims • Skin toxicity at functional concentration • Resistance risk profile • Regulatory honesty • Formulation architecture supporting active delivery • Long-term skin compatibility under use frequency
GLOBAL ENFORCEMENT RULES
• Active ingredient type, concentration, and spectrum are the dominant scoring determinants • "99.9% kill" claims MUST be assessed against active system and contact time before any efficacy credit • Botanical "antibacterial" claims without Category A actives = mandatory Formulation Honesty penalty • Alcohol-free sanitiser claims without validated non-alcohol active system = mandatory penalty • Regulatory misclassification (cosmetic making drug claims) = mandatory Safety and Formulation Honesty penalty • Skin compatibility MUST reflect actual active concentration — not marketed "gentle" claim • Sub-lethal concentration risk (AMR contribution) must be assessed • Contact time is mandatory for efficacy assessment — kill claims without stated contact time = penalty • Wound antiseptic context: cytotoxicity to host tissue is a primary Safety parameter • Residual activity claims must be supported by active mechanism (chlorhexidine substantivity) — not marketing • Fragrance = sensory experience, not antimicrobial contribution — no efficacy credit for fragrance components
STRUCTURE DOMINANCE RULE
Primary antiseptic architecture determines:
• Antimicrobial spectrum (bacteria, virus, fungi, spores) • Kill rate and contact time requirement • Residual activity duration • Skin toxicity and barrier disruption • Resistance contribution risk • Formulation delivery vehicle compatibility • Long-term tolerance under repeated application
Excipients, moisturisers, botanicals, and sensory agents cannot override active ingredient failures. An antiseptic is defined by its active — not its texture, fragrance, or marketing claims.
LAYER 1 — ACTIVE INGREDIENT CLASSIFICATION [DOMINANT]
MANDATORY RULE: All antiseptic actives must be classified before scoring. Active identity and concentration are the single most important factors in antiseptic evaluation.
ACTIVE INGREDIENT TIER TABLE
TIER 1 — GOLD STANDARD ANTISEPTIC ACTIVES
ETHANOL (Ethyl Alcohol): • Functional concentration: 60–80% (WHO: 80% for hand sanitiser) • Spectrum: Bacteria (gram+ and gram−), enveloped viruses (SARS-CoV-2, influenza), fungi • Limitation: Not sporicidal; limited activity against non-enveloped viruses at standard concentrations • Residual activity: None — evaporates on application • Contact time: 20–30 seconds for standard hand rub efficacy • Skin impact: Defatting, barrier disruption at high frequency (>20× daily) • Scoring impact: Full efficacy credit at 60–80%; partial below 60%; minimal below 40%
ISOPROPANOL (Isopropyl Alcohol, IPA): • Functional concentration: 60–75% • Spectrum: Similar to ethanol; slightly less effective against non-enveloped viruses • No residual activity • Contact time: 20–30 seconds • Skin impact: Similar to ethanol — defatting; slightly more drying than ethanol • Scoring impact: Full credit at 60–75%
CHLORHEXIDINE GLUCONATE (CHG): • Functional concentration: 0.5–4% (hand antisepsis 0.5–2%; surgical scrub 2–4%) • Spectrum: Gram-positive bacteria (excellent), gram-negative (good), fungi (moderate), enveloped viruses (moderate), NOT sporicidal • Residual activity: CRITICAL ADVANTAGE — substantive binding to skin; residual activity 6+ hours • Contact time: 15–30 seconds for hand antisepsis • Skin impact: Generally well-tolerated; occasional contact dermatitis; ototoxic (never use near ears/mucosae) • Scoring impact: Full efficacy credit at ≥0.5%; concentration-dependent for surgical applications
POVIDONE-IODINE (PVP-I): • Functional concentration: 0.5–10% (wound: 0.5–1%; surgical scrub: 7.5–10%) • Spectrum: Broadest spectrum — bacteria, viruses (including non-enveloped), fungi, mycobacteria, spores • Residual activity: Moderate — consumed on contact; some residual effect • Contact time: 2–3 minutes for surgical scrub; 30 seconds for hand antisepsis • Skin impact: Irritating at high concentrations; thyroid absorption risk; not for prolonged wound use • Wound context: Cytotoxic at >1% — WHO caution for wound use • Scoring impact: Full spectrum credit; concentration-appropriate application mandatory
BENZALKONIUM CHLORIDE (BKC / BAC): • Functional concentration: 0.1–0.3% for skin antisepsis • Spectrum: Gram-positive bacteria (good), gram-negative (moderate — resistant strains common), limited virucidal, NOT sporicidal • Residual activity: Moderate substantivity • Contact time: 30–60 seconds • AMR Concern: Cross-resistance with antibiotics documented; significant AMR flag • Skin impact: Generally tolerated; sensitisation risk • Scoring impact: Partial credit — spectrum gap vs. alcohol; AMR concern mandatory flag
HYDROGEN PEROXIDE (H₂O₂): • Functional concentration: 3–6% (wound antiseptic); 0.5% (accelerated H₂O₂ in some formulas) • Spectrum: Bacteria, viruses, fungi, limited sporicidal at high concentrations • Residual activity: None — degrades rapidly • Wound context: Cytotoxic to fibroblasts — impairs wound healing at standard concentrations; WHO caution • Contact time: 1–5 minutes • Scoring impact: Full spectrum credit for surface use; SIGNIFICANT safety penalty in wound context
OCTENIDINE DIHYDROCHLORIDE (OCT): • Functional concentration: 0.05–0.1% • Spectrum: Gram-positive (excellent), gram-negative (good), fungi (good), enveloped viruses (good) • Residual activity: Good skin substantivity • Wound context: Generally regarded as wound-compatible — low cytotoxicity vs. other antiseptics • No known resistance development documented • Scoring impact: Full efficacy credit; preferred for wound antiseptic context
POLYHEXAMETHYLENE BIGUANIDE (PHMB): • Functional concentration: 0.02–0.1% • Spectrum: Bacteria (good), fungi (good), limited virucidal • Residual activity: Good • Wound context: Evidence for wound use; generally low cytotoxicity • AMR concern: Lower than BKC • Scoring impact: Full credit in appropriate context
TIER 2 — MODERATE ANTISEPTIC ACTIVES
TRICLOSAN: • Functional concentration: 0.1–0.3% • Spectrum: Gram-positive (good), gram-negative (limited) • Regulatory status: FDA banned from OTC hand soap (2016); restricted in EU; permitted in some markets • AMR concern: SIGNIFICANT — linked to cross-resistance with antibiotics • Environmental concern: Persistent environmental contaminant, endocrine disruption evidence • Scoring impact: Significant AMR and Eco Impact penalties; regulatory flag mandatory
CHLOROXYLENOL (PCMX / Dettol-type): • Functional concentration: 0.5–4% • Spectrum: Gram-positive (good), gram-negative (variable), limited virucidal • Residual activity: Moderate • Household/first-aid standard active • AMR concern: Moderate • Scoring impact: Partial credit; spectrum gaps mandatory note
SILVER / COLLOIDAL SILVER: • Functional concentration: Highly variable — evidence base limited for topical antiseptic at cosmetic concentrations • Spectrum: Broad in high concentrations — limited evidence at typical cosmetic levels • AMR concern: Moderate for repeated sub-lethal exposure • Regulatory: Not an approved OTC drug active in most major markets • Scoring impact: Partial credit only at documented functional concentrations; decorative below MIC threshold
IODINE (Aqueous / Tincture): • Functional concentration: 2–7% • Spectrum: Broad — similar to povidone-iodine • Skin impact: More irritating than PVP-I; staining • Wound context: Less preferred than PVP-I or octenidine due to higher toxicity • Scoring impact: Moderate credit; skin impact and wound-toxicity penalties
TIER 3 — WEAK / MARKETING ANTISEPTIC CLAIMS
ESSENTIAL OILS AT DECORATIVE CONCENTRATIONS: • Tea Tree Oil <0.5%, Lavender, Eucalyptus, Thyme, Oregano at typical cosmetic levels • In-vitro MIC evidence exists but does not translate to clinical efficacy at cosmetic concentrations • No approved antiseptic drug status • Scoring impact: NO antimicrobial efficacy credit; Formulation Honesty penalty for antimicrobial claims
BOTANICAL EXTRACTS MARKETED AS ANTIBACTERIAL: • Neem, Tulsi, Aloe Vera, Green Tea, Honey at cosmetic concentrations • In-vitro data exists but clinical antiseptic efficacy at cosmetic concentrations is not established • Scoring impact: NO antimicrobial efficacy credit; Formulation Honesty penalty for kill claims
"NATURAL ALCOHOL ALTERNATIVES": • Ethanol from botanical sources: same efficacy as synthetic ethanol at same concentration — full credit • Plant-derived "antibacterial" claims at sub-lethal concentrations: no credit
FRAGRANCE COMPONENTS: • Zero antimicrobial efficacy credit regardless of known MIC values for individual fragrance components • In formulated product at cosmetic concentrations, fragrance provides no meaningful kill
TIER 3 MANDATORY RULE: Any product relying primarily on Tier 3 actives for antimicrobial claims receives: • Mandatory Formulation Honesty penalty • Mandatory Effectiveness penalty • Mandatory regulatory flag (cosmetic making drug claims)
LAYER 2 — ANTIMICROBIAL SPECTRUM ASSESSMENT
Before scoring Effectiveness, the spectrum of the active system must be classified.
SPECTRUM TIERS
TIER A — BROAD SPECTRUM (Full Spectrum Credit)
Covers: • Gram-positive bacteria • Gram-negative bacteria • Enveloped viruses • Non-enveloped viruses • Fungi/Yeasts • (Spores — partial)
Active systems: Povidone-iodine, Ethanol 70–80%, Octenidine, PHMB Scoring: Full spectrum effectiveness credit
TIER B — BROAD BACTERIAL + ENVELOPED VIRUS (Partial Spectrum Credit)
Covers: • Gram-positive bacteria (excellent) • Gram-negative bacteria (good) • Enveloped viruses (good) • Fungi (variable) • Non-enveloped viruses (limited)
Active systems: Chlorhexidine, Isopropanol 60–75%, BKC at functional concentrations Scoring: Strong effectiveness credit with spectrum gap noted
TIER C — BACTERIAL-DOMINANT / LIMITED VIRAL (Moderate Credit)
Covers: • Gram-positive bacteria (good) • Gram-negative bacteria (variable) • Limited viral spectrum
Active systems: PCMX/Chloroxylenol, Triclosan, low-concentration alcohol systems Scoring: Moderate effectiveness credit; spectrum limitations mandatory
TIER D — NARROW / UNVALIDATED SPECTRUM (Minimal Credit)
Covers: • Variable, unvalidated, or in-vitro-only spectrum Active systems: Essential oils at cosmetic concentrations, botanical extracts, sub-threshold actives Scoring: No efficacy credit for clinical antiseptic claims
LAYER 3 — CONTACT TIME AND KILL KINETICS RULE
Antimicrobial efficacy is time-dependent. "Kills 99.9%" claims without stated contact time are meaningless.
CONTACT TIME CLASSIFICATION
IMMEDIATE ACTION (<30 seconds — Standard Hand Rub Use): • Ethanol 70–80%: Validated 20–30 second efficacy — full credit • IPA 60–75%: Validated 20–30 second efficacy — full credit • CHG 0.5–2%: Validated 15–30 second hand rub efficacy — full credit • PVP-I 0.5%: Adequate for rapid application — partial credit
MODERATE ACTION (1–3 minutes — Surgical Scrub / Wound Application): • CHG 2–4%: Full surgical scrub credit • PVP-I 7.5–10%: Full surgical scrub credit • H₂O₂ 3%: Wound contact — cytotoxicity concern overrides efficacy credit in wound context • OCT 0.05–0.1%: Wound antisepsis — adequate contact
EXTENDED ACTION (>3 minutes — Prolonged Wound Dressing): • OCT: Wound dressing compatible — low cytotoxicity at extended contact • PHMB: Extended wound contact — generally low cytotoxicity • PVP-I at >1%: NOT recommended for prolonged wound contact (cytotoxic) • H₂O₂: NOT recommended for prolonged wound contact
CONTACT TIME PENALTY RULE: Products claiming kill efficacy without declaring required contact time receive Formulation Honesty penalty. "Instant kill" marketing requires validation — alcohol-based hand rubs at 70%+ are the only justified "rapid-action" claim.
LAYER 4 — RESIDUAL ACTIVITY RULE
Residual activity (persistent antimicrobial effect after product removal) is a clinically meaningful parameter — especially in healthcare and surgical contexts.
RESIDUAL ACTIVITY TIERS
HIGH RESIDUAL — SUBSTANTIVE (Full Credit): • Chlorhexidine Gluconate: Binds covalently to skin proteins; residual activity 6+ hours • Octenidine: Moderate-high substantivity • PHMB: Good substantivity
MODERATE RESIDUAL: • BKC: Moderate substantivity • PCMX: Moderate
NO RESIDUAL: • Ethanol: Evaporates — zero residual activity • Isopropanol: Evaporates — zero residual activity • Hydrogen Peroxide: Degrades — zero residual • Povidone-Iodine: Moderate residual only if not fully rinsed
SCORING RULE: • Residual activity receives bonus credit in healthcare and surgical contexts • For general public hand sanitiser use, lack of residual is expected and not penalised • "Long-lasting protection" claims for alcohol-based products = mandatory Formulation Honesty penalty — alcohol evaporates completely
LAYER 5 — CYTOTOXICITY AND WOUND HEALING IMPACT RULE
WOUND ANTISEPTIC CONTEXT ONLY — Mandatory for Context 3 products.
Standard antiseptic concentrations are frequently cytotoxic to the host cells needed for wound healing: • Fibroblasts • Keratinocytes • Neutrophils • Endothelial cells
CYTOTOXICITY TIER TABLE — WOUND CONTEXT
HIGH CYTOTOXICITY (Major Safety Penalty in Wound Context): • Hydrogen Peroxide >0.5%: Well-documented fibroblast/keratinocyte toxicity; impairs healing • Povidone-Iodine >1%: Cytotoxic at concentrations above 0.5–1% • Alcohol (ethanol/IPA): Highly cytotoxic to wound tissue — contraindicated on open wounds • Chlorhexidine >0.5%: Cytotoxic to fibroblasts at concentrations >0.05% • Sodium Hypochlorite >0.025%: Destroys wound tissue at standard concentrations
LOW CYTOTOXICITY (Preferred for Wound Context): • Octenidine 0.05–0.1%: Lowest cytotoxicity profile among validated antiseptics; evidence of wound compatibility • PHMB 0.02–0.1%: Generally wound-compatible; used in wound irrigation solutions • Povidone-Iodine 0.5–1% (diluted): Lower cytotoxicity than concentrated forms; some evidence for wound use • Honey (medical-grade Manuka): Wound-compatible; low cytotoxicity; osmotic and antimicrobial properties
WOUND CYTOTOXICITY SCORING RULE: In wound antiseptic context: • High cytotoxicity actives receive mandatory Safety penalty regardless of antimicrobial efficacy • "For wounds" claims with high-cytotoxicity actives at standard concentrations = mandatory Safety and Formulation Honesty penalty • Alcohol applied to open wounds = Safety score critically reduced — this is a formulation failure • Ethanol/IPA in wound spray/liquid marketed for cuts and abrasions = mandatory safety flag
IMPORTANT NOTE — FIRST AID CONTEXT: Traditional household antiseptics (Dettol, antiseptic cream) containing PCMX or low-concentration CHG on minor wounds may have acceptable benefit-risk profiles in clean superficial wounds despite some cytotoxicity data. The cytotoxicity rule applies most critically to: • Deep or large wounds • Prolonged contact applications • Repeated wound application Context calibration is mandatory.
LAYER 6 — ANTIMICROBIAL RESISTANCE (AMR) CONTRIBUTION RISK
AMR is a mandatory assessment parameter for all antiseptic products. Sub-lethal concentrations and cross-resistance potential must be scored.
AMR RISK TIER TABLE
CRITICAL AMR CONCERN: • Triclosan: Well-documented cross-resistance with antibiotics (efflux pump upregulation); FDA action • BKC/BAC: Documented cross-resistance; efflux pump-mediated; mandatory flag • Sub-lethal alcohol concentrations (<60%): May promote alcohol-adapted tolerance
MODERATE AMR CONCERN: • PCMX/Chloroxylenol: Some cross-resistance potential; lower evidence than BKC/triclosan • Silver: Sub-lethal exposure promotes silver-resistance and cross-resistance • PHMB: Lower AMR concern than BKC; some evidence emerging
LOW AMR CONCERN: • Ethanol 70–80% at functional concentrations: No known clinically relevant resistance mechanism • IPA 60–75% at functional concentrations: Same • Povidone-Iodine: Multiple simultaneous oxidative mechanisms — resistance is rare • Octenidine: No significant resistance documented to date • Chlorhexidine: Low-level resistance can develop under sub-lethal exposure; concentration-dependent
AMR SCORING RULES: • High AMR concern actives receive Eco Impact, Effectiveness, and Ingredient Quality penalties • Sub-lethal alcohol formulas (<60%) receive AMR advisory • Triclosan: Mandatory AMR flag regardless of concentration • BKC: Mandatory AMR flag with contextual note on justified use
LAYER 7 — SKIN COMPATIBILITY RULE — ANTISEPTIC SPECIFIC
Antiseptic actives are inherently more aggressive than cosmetic actives. Skin compatibility must be assessed at functional (not sub-functional) concentrations.
SKIN IMPACT TIER TABLE
ALCOHOL-BASED SYSTEMS: • Effective at 60–80% but defatting and barrier-disruptive under high-frequency use • Emollient additives (glycerin, aloe, propylene glycol) reduce dryness — partial mitigation credit • Post-application burning on broken skin = critical incompatibility signal • Under 20× daily use: significant cumulative barrier disruption without emollient support • With emollients (glycerin 1–3%): improved tolerance — partial mitigation
CHLORHEXIDINE SYSTEMS: • Generally well-tolerated at standard antiseptic concentrations (0.5–2%) • Sensitisation/contact dermatitis: 1–5% incidence; mandatory Allergy Risk flag • Ototoxicity: MUST NOT contact ear canal — mandatory labelling note • Avoid near mucosae (not for intimate use)
POVIDONE-IODINE SYSTEMS: • Irritating at high concentrations (>1%) • Thyroid iodine absorption risk with large-area or prolonged use • Staining on skin and textiles • Contact dermatitis possible
BENZALKONIUM CHLORIDE SYSTEMS: • Sensitisation and contact dermatitis: significant incidence • Paradoxical contamination risk: gram-negative bacteria can survive and proliferate in BKC solutions • Skin compatibility on repeated use: moderate concern
OCTENIDINE / PHMB SYSTEMS: • Best skin compatibility profile among non-alcohol antiseptics • Low sensitisation rates • Suitable for sensitive skin and wound applications
SKIN COMPATIBILITY SCORING RULE: • Emollient additives in alcohol-based sanitisers receive partial mitigation credit — they cannot eliminate alcohol-induced defatting but meaningfully reduce it • "Gentle on hands" claims for alcohol-based products require glycerin ≥1% or equivalent emollient at functional level • Any active causing burning on intact skin under normal use = Safety concern • Post-application burning on BROKEN skin = Safety penalty regardless of active
LAYER 8 — FRAGRANCE RULE — ANTISEPTIC CONTEXT
In antiseptic products, fragrance serves zero antimicrobial function. Fragrance load must be evaluated for: • Allergen risk under high-frequency sanitiser use (healthcare workers, frequent users) • Broken skin contact (wound antiseptics) • Contact sensitisation under repeated exposure
FRAGRANCE RISK TIERS — ANTISEPTIC
ZERO FRAGRANCE (Ideal for healthcare / wound / high-frequency use): • Full Allergy Risk eligibility • Maximum credibility for therapeutic products
LOW FRAGRANCE (<0.1%): • Minor notation for healthcare and wound contexts
MODERATE FRAGRANCE (0.1–0.5%): • Allergy Risk penalty • Healthcare compatibility reduced • Wound antiseptic context: mandatory concern flag
HIGH FRAGRANCE (>0.5%): • Significant Allergy Risk penalty • Suggests sensory-engineering-priority over therapeutic architecture • Wound antiseptic: unacceptable — mandatory penalty
NOTE: "Fresh/clean" fragrance does not substitute for or enhance antimicrobial activity — mandatory anti-marketing filter.
LAYER 9 — PRESERVATIVE RULE — ANTISEPTIC CONTEXT
Most alcohol-based sanitisers are self-preserving due to high alcohol content. Non-alcohol antiseptics and antiseptic creams/ointments require preservatives.
CONCERNS: • MI/MCI: Significant sensitisation risk in leave-on or repeated-contact antiseptic products • Formaldehyde releasers: Sensitisation risk; incompatible with wound antiseptics • Parabens at high concentration: Low-level concern
ACCEPTABLE: • Phenoxyethanol ≤1% • Ethylhexylglycerin • Sodium Benzoate/Potassium Sorbate
NOTE: High-alcohol products (>60%) do not require traditional preservatives — preservative-free is appropriate and expected for alcohol sanitisers.
LAYER 10 — REGULATORY HONESTY RULE
MANDATORY ASSESSMENT FOR ALL ANTISEPTIC PRODUCTS.
Antiseptic products frequently make drug-level claims in cosmetic packaging. This is a regulatory violation in most major markets AND a Formulation Honesty concern.
REGULATORY FLAGS — MANDATORY:
COSMETIC PRODUCT MAKING DRUG CLAIMS: • "Kills 99.9% of germs/bacteria" on a cosmetically-registered product = regulatory flag • "Antibacterial/antimicrobial" label without approved drug active at approved concentration = regulatory flag • "Clinically proven to kill [named pathogens]" on a cosmetic = regulatory flag • "Hospital grade" or "medical grade" for a non-medically-registered product = regulatory flag
OTC DRUG PRODUCT — CORRECT CLASSIFICATION: • Approved antiseptic active at approved concentration + correct drug labelling = no flag • Appropriate use claims for OTC drug status = full regulatory credit
NATURAL/COSMETIC WORKAROUNDS: • "Naturally antibacterial" or "plant-based protection" as implicit drug claims = Formulation Honesty penalty • "Protects against germs" for botanical-only formula = regulatory and honesty penalty
OUTPUT RULE: Regulatory classification must be mentioned under Why This Rating whenever a drug claim is made.
LAYER 11 — COLORANT PENALTY RULE
Colorants in antiseptic products add unnecessary sensitisation burden with zero antimicrobial benefit. Particularly concerning in wound antiseptics where colorant contact with broken skin is possible.
Scoring Impact: • Allergy Risk penalty • Ingredient Quality penalty • Formulation Honesty penalty (colorants suggest cosmetic-priority architecture)
Exception: Povidone-iodine amber colour is intrinsic to the active — not a decorative colorant.
LAYER 12 — CORE SCORING SYSTEM Score range: 1.0 → 5.0 FOR EVERY RULE
SAFETY [DOMINANT]
Evaluates: • Active ingredient skin toxicity at functional concentration • Cytotoxicity in wound context (primary wound antiseptic concern) • Barrier disruption under use frequency • Sensitisation potential (active + fragrance + preservative) • Regulatory compliance — drug claims in cosmetic format • AMR contribution risk • Misuse risk (concentration, application site, user population)
Core Rules: • Alcohol on open wounds = critical Safety penalty — contraindicated • H₂O₂ >0.5% on wounds = significant Safety penalty • CHG near ears/mucosae = mandatory safety advisory • High-frequency alcohol sanitiser without emollient support = cumulative barrier disruption • Any product claiming antiseptic function on broken skin must meet cytotoxicity standards • Sub-lethal concentrations contributing to AMR = Safety and Ingredient Quality penalty
EFFECTIVENESS
Core Question: Does the antiseptic deliver genuine, evidence-based antimicrobial kill across its stated spectrum, at its declared concentration, within its stated contact time?
Evaluates: • Active tier (Tier 1/2/3) • Spectrum coverage (Tier A/B/C/D) • Concentration adequacy • Contact time validation • Residual activity (context-dependent) • Kill claims vs. active system honesty
High effectiveness requires: • Tier 1 or Tier 2 active at validated concentration • Spectrum matched to use context • Stated contact time achievable in real-world use • Honest kill claims supported by active system
Rules: • "99.9% kill" claims require Tier 1 active at functional concentration + stated contact time • Botanical-only or Tier 3 active systems cannot achieve high Effectiveness • Sub-functional alcohol concentrations (<60%) receive significantly reduced Effectiveness credit • Residual activity is bonus credit in healthcare; expected in surgical context
ALLERGY RISK
Evaluates: • Fragrance under high-frequency sanitiser use (healthcare occupational exposure) • Chlorhexidine contact sensitisation (1–5% incidence) • BKC sensitisation potential • Essential oil allergens • Preservative sensitisers (MI/MCI mandatory flag) • Repeated-use sensitisation accumulation
Application Rules: • Healthcare workers face highest allergy risk — occupational antiseptic use is highest-frequency exposure • CHG sensitisation is a documented clinical phenomenon — mandatory Allergy Risk note • BKC sensitisation: significant documented incidence — mandatory note • Fragrance in high-frequency sanitiser = meaningful allergen accumulation risk
ECO IMPACT
Evaluates: • AMR contribution to environmental resistance pool • Environmental persistence of actives (triclosan, BKC — known aquatic concerns) • Alcohol content — rapid biodegradation (positive for ethanol) • Packaging and production burden • Unnecessary ingredient environmental load
General Rules: • Triclosan: Severe Eco Impact penalty — aquatic persistence, bioaccumulation, endocrine disruption evidence • BKC: Moderate Eco Impact penalty — aquatic toxicity documented • Ethanol: Positive biodegradability — eco credit • PVP-I: Iodine environmental load — moderate concern
INGREDIENT QUALITY
Evaluates: • Active ingredient concentration honesty relative to claimed efficacy • Spectrum integrity vs. label claims • AMR risk of active selection • Excipient coherence and functional support of active delivery • Absence of Tier 3 active marketing as antiseptic • Regulatory classification honesty
Rules: • Tier 3 botanical actives marketed as antiseptic = major quality reduction • Sub-functional alcohol (<60%) marketed as hand sanitiser = major quality reduction • Cosmetic registering with drug claims = quality and honesty penalty • Emollient excipients supporting skin compatibility = minor positive quality credit
SKIN COMPATIBILITY
Evaluates: • Tolerance at functional antiseptic concentration • Barrier resilience under use frequency • Post-application burning, dryness, or sensitisation • Emollient mitigation adequacy • Suitability for compromised skin (healthcare worker occupational dermatitis) • Wound tissue compatibility (Context 3 only)
Core Rules: • Functional antiseptic concentration MUST be used for compatibility assessment — not diluted cosmetic level • "Gentle on hands" requires glycerin or equivalent emollient at functional level (≥1%) • Healthcare occupational use = maximum frequency stress test • Any burning on intact skin under normal use = compatibility concern
CORE SCORE FORMULA
Core Score = ( Safety × 0.30 + Effectiveness × 0.25 + Allergy Risk × 0.15 + Eco Impact × 0.10 + Ingredient Quality × 0.15 + Skin Compatibility × 0.05 )
NOTE: Safety at 0.30 and Effectiveness at 0.25 reflect the dual mandate of antiseptic products. Skin Compatibility reduced to 0.05 because antiseptic actives are inherently skin-disruptive — this is expected; the question is management, not avoidance. Eco Impact raised to 0.10 due to AMR and environmental persistence concerns unique to this category.
LAYER 13 — SPECIALIZED ANTISEPTIC PERFORMANCE
Evaluates real-world antiseptic behaviour under use conditions. Score Range: 1.0 → 5.0
ANTIMICROBIAL EFFICACY [DOMINANT]
Evaluates: • Active tier (Tier 1/2/3) • Concentration adequacy • Spectrum breadth (Tier A/B/C/D) • Kill kinetics and contact time validation • Log reduction claims vs. active system evidence
Core Rules: • Only Tier 1/2 actives at validated concentrations can achieve high scores • Spectrum gaps must reduce score in spectrum-specific claims • "99.9% kill" with Tier 3 actives = score ceiling of 1.5 regardless of marketing
SPECTRUM COVERAGE
Evaluates: • Bacterial coverage (gram+, gram−) • Viral coverage (enveloped, non-enveloped) • Fungal coverage • Sporicidal activity (where claimed) • Coverage matched to stated use context
Core Rules: • No single common antiseptic is sporicidal at cosmetic concentrations — sporicidal claims require medical product validation • "Kills all germs" requires Tier A spectrum minimum at functional concentration
RESIDUAL ACTIVITY
Evaluates: • Post-application protection duration • Substantivity mechanism (CHG binding, PHMB persistence) • Clinical relevance of residual for stated use context
Core Rules: • Alcohol sanitisers: zero residual — this is expected and not penalised in general use; penalised only if "long-lasting protection" claim made • CHG: genuine residual — full credit in healthcare context • Residual claims without substantivity mechanism = mandatory Formulation Honesty penalty
SKIN TOLERANCE UNDER USE FREQUENCY
Evaluates: • Barrier disruption trajectory at stated frequency • Emollient mitigation effectiveness • Post-application dryness, tightness, or burning accumulation • Healthcare occupational tolerance (20× daily maximum stress test) • Compatibility with pre-existing dermatitis or compromised barrier
Core Rules: • Alcohol without emollient at 20× daily = significant barrier disruption — mandatory note • Glycerin ≥1% substantially mitigates but does not eliminate alcohol defatting • Antiseptic products are expected to cause some skin stress — management, not elimination, is the standard
WOUND COMPATIBILITY (Context 3 Only — Score 0 for Non-Wound Products)
Evaluates: • Cytotoxicity to fibroblasts and keratinocytes at applied concentration • Wound healing impairment potential • Pain/burning on wound application • Tissue-safe contact time at applied concentration • Active selection for wound context (OCT, PHMB preferred)
Core Rules: • Alcohol, H₂O₂ >0.5%, CHG >0.05%, PVP-I >1% on open wounds = significant wound compatibility penalties • Octenidine and PHMB = highest wound compatibility scores • Products "for cuts and wounds" containing wound-cytotoxic actives = Formulation Honesty penalty
AMR CONTRIBUTION RISK
Evaluates: • Active mechanism resistance potential • Sub-lethal concentration risk • Cross-resistance with clinical antibiotics • Environmental resistance pool contribution
Core Rules: • Triclosan: Maximum AMR penalty — no exceptions • BKC: Significant AMR penalty — no exceptions • Ethanol at functional concentrations: Low AMR concern — no known resistance mechanism • Sub-lethal sanitiser concentrations (<60% alcohol): Moderate AMR concern advisory
FORMULATION HONESTY
Evaluates: • Kill claim accuracy vs. active system • Contact time transparency • Regulatory classification honesty • "Natural antibacterial" claim accuracy • Residual activity claim accuracy • Spectrum claim accuracy • "Hospital/medical grade" claim justification
Core Rules: • "Kills 99.9%" without Tier 1 active at functional concentration = major deception • "Long-lasting protection" for alcohol-only product = deception — alcohol has zero residual • Cosmetic label with drug claims = regulatory and honesty penalty • Tea tree / botanical "antibacterial" at cosmetic concentrations = honesty penalty • "Alcohol-free but just as effective" requires validated alternative active system
SPECIALIZED CALCULATION
Specialized Performance Score = Average of all 6 applicable specialized scores (Wound Compatibility scored only for Context 3 products; replaced by N/A for other contexts)
Co-Dominant Parameters: • Antimicrobial Efficacy → primary function parameter • AMR Contribution Risk → primary systemic safety parameter • Formulation Honesty → primary consumer protection parameter
LAYER 14 — FINAL RATING FORMULA
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
Core and Specialized scores carry equal weight.
This prevents: • Fragrance-freshness perception inflation • Botanical antibacterial marketing inflation • "Gentle on hands" comfort inflation over antimicrobial efficacy • "Natural/organic" antiseptic credibility halo
HIGH SCORE ELIGIBILITY (>4.0)
Requires: • Tier 1 or Tier 2 active at validated concentration • Spectrum Tier A or B matched to use context • No regulatory misclassification • Fragrance-free or minimal fragrance (<0.1%) • No Tier 3 active marketed as primary antimicrobial • No triclosan or BKC without AMR disclosure • Formulation Honesty ≥ 3.5 • AMR Contribution Risk ≥ 3.0 (i.e., low AMR concern) • Appropriate emollient support for high-frequency use
DISQUALIFIERS: • Primary reliance on Tier 3 actives with kill claims • Alcohol <60% marketed as hand sanitiser • Alcohol applied to open wounds marketed as wound antiseptic • Triclosan as primary active (AMR + regulatory concerns in most markets) • "Kills 99.9%" without supporting Tier 1/2 active at validated concentration • MI/MCI in leave-on antiseptic cream/gel
LAYER 14.5 — REAL-WORLD USAGE SIMULATION
Simulate: • Stated use context (hand sanitiser / wound / skin cleanser / healthcare) • Realistic use frequency (general public vs. healthcare occupational) • Active concentration skin exposure under repeated use • AMR contribution over population-level use patterns • Skin barrier trajectory under sustained use frequency • Sensitisation accumulation over months of regular use • Misuse scenarios (applying hand sanitiser to open wounds, using wound antiseptic as hand rub)
Core Question: Does the antiseptic deliver genuine antimicrobial protection across its stated spectrum, at its stated concentration, within realistic contact time, without causing unacceptable skin damage, AMR contribution, or consumer deception?
Core Rules: • Genuine kill kinetics at real-world contact time > laboratory log-reduction data • Skin compatibility must be assessed at functional antiseptic concentration — not sub-functional • AMR must be assessed at population use scale — not individual single-use • "Natural" or "gentle" labelling does not reduce obligation to prove antimicrobial function • Fragrance freshness ≠ antimicrobial activity — at any concentration
ANTI-MARKETING FILTER
Mandatory penalties apply for:
• "Kills 99.9% of germs" without Tier 1/2 active system • "Hospital grade" without documented medical registration • "Natural antibacterial" via botanical/essential oil Tier 3 system • "Alcohol-free protection" without validated alternative active • "Long-lasting protection" for alcohol-only (no residual) system • "Gentle, skin-loving sanitiser" claims without emollient at functional level • "Dermatologist-tested" without cited clinical evidence • Antiviral claims without validated virucidal active at functional concentration • "Microbiome-friendly antiseptic" — most antiseptics disrupt skin microbiome; this claim requires extraordinary evidence
BIAS NEUTRALISATION FILTER
Neutralise: • Fragrance = antimicrobial efficacy illusion • "Natural/plant-based" = antiseptic safety or efficacy illusion • Tingling/cooling sensation = kill activity illusion • Gel texture = superior efficacy illusion over liquid formulas at same concentration • "Alcohol-free" = safer/gentler illusion without examining alternative active safety • "99.9% kill" = complete protection illusion (ignores spores, non-enveloped viruses, resistant strains) • "Hospital grade" label = medical-grade performance illusion without registration • Long residual fragrance = long antimicrobial protection illusion • Foam volume = antimicrobial potency illusion • High price = superior efficacy illusion — ethanol concentration and purity determine efficacy

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
## PRODUCT: Antiseptic Liquid

---

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 ANTISEPTIC PROFILE

## Functional Classification

Short antiseptic classification.

Examples:
- WHO-Standard Alcohol Hand Sanitiser
- Chlorhexidine Healthcare Hand Antiseptic
- Octenidine Wound Antiseptic (Preferred)
- Povidone-Iodine Broad-Spectrum Wound Antiseptic
- BKC Non-Alcohol Hand Sanitiser (AMR Concern)
- Botanical Antibacterial (No Functional Active)
- Sub-Standard Alcohol Sanitiser (<60%)

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering active ingredient identity and tier, concentration adequacy, spectrum coverage, use context match, skin compatibility under stated frequency, and AMR and regulatory honesty.

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

## Antimicrobial + Safety Analysis

### Antimicrobial Efficacy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Spectrum Coverage — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Residual Activity — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Tolerance Under Use Frequency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Wound Compatibility — ⭐X.X (Context 3 only; N/A for other contexts)

Short structural reason in plain language explaining why it scored this way.

### AMR Contribution Risk — ⭐X.X

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

# 👤 USE CONTEXT COMPATIBILITY

## Population Compatibility

### General Public Hand Hygiene — ⭐X.X

Short compatibility explanation.

### Healthcare / Clinical Hand Hygiene — ⭐X.X

Short compatibility explanation.

### Minor Wound / First Aid — ⭐X.X

Short compatibility explanation.

### Pre/Post-Procedure Skin Antisepsis — ⭐X.X

Short compatibility explanation.

### High-Frequency Occupational Use — ⭐X.X

Short compatibility explanation.

### Sensitive / Dermatitis-Prone Skin — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Use Frequency Compatibility

### Occasional Use (1–5× Daily) — ⭐X.X

Short explanation.

### Regular Use (5–15× Daily) — ⭐X.X

Short explanation.

### Occupational High-Frequency (15–30× Daily) — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Antimicrobial action (contact time to efficacy)
- Skin feel post-application
- Burning, stinging, and dryness signals

## Medium-Term

- Barrier response under repeated use
- Dryness and sensitization trajectory
- Sustained antimicrobial performance

## Long-Term

- Cumulative skin barrier impact
- Sensitization accumulation
- AMR contribution under sustained population use

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting antimicrobial active system (identity, concentration, tier), spectrum of activity, residual activity mechanism, skin compatibility (emollients, emulsifiers), and sensitization and AMR risk.

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
- Active ingredient must be identified and tiered before scoring
- Concentration must be assessed against functional thresholds before efficacy credit
- Spectrum must be classified before Effectiveness scoring
- Contact time must be assessed for kill claim validity
- AMR risk must be assessed for all actives — triclosan and BKC mandatory flags
- Regulatory classification must be assessed — cosmetic making drug claims = mandatory flag
- Cytotoxicity must be assessed for wound antiseptic context products
- Fragrance must be flagged in Concerns if present in healthcare or wound context
- MI/MCI must be flagged as significant concern in leave-on or repeated-contact antiseptic
- 99.9% kill claims must be validated against active system before Effectiveness credit
- Long-lasting protection claims must be validated against residual activity mechanism
- Alcohol-free antiseptics must have alternative active assessed before any efficacy credit
- Hospital or medical grade claims must be flagged if no regulatory registration evidence
- Botanical antibacterial claims at cosmetic concentrations = mandatory Formulation Honesty penalty
- Alcohol on open wounds = mandatory Safety concern flag
- CHG near mucosae or ears = mandatory advisory note
- Fragrance ≠ antimicrobial activity
- Sub-lethal active concentrations contributing to AMR = mandatory flag
- Use context must be identified before scoring
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Antiseptic Liquid Evaluation Algorithm — Structured for antimicrobial active tier analysis, AMR risk assessment, and long-term repeated-use skin compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict antiseptic liquid structural evaluation engine."
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