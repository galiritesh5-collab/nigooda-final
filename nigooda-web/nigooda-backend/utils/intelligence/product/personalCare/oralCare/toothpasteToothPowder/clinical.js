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
        "TOOTHPASTETOOTHPOWDER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
TOOTHPASTE / TOOTH POWDER EVALUATION ALGORITHM — V2.0
================================================================================
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward toothpastes/tooth powders that demonstrate:
• Effective plaque removal with minimal enamel/dentin abrasion
• Evidence-based active ingredient delivery (fluoride, hydroxyapatite, etc.)
• Oral microbiome compatibility under repeated use
• Gum/periodontal safety under chronic exposure
• Low cumulative irritation risk for oral mucosa
• Structural formulation honesty over sensory marketing
Mandatory penalties apply for:
• Whitening-first architecture without evidence-based enamel safety
• Foaming agent (SLS) marketed as a cleansing enhancement — foam volume
 does not determine plaque removal quality and must not receive efficacy credit
• Flavour-driven "freshness" perception replacing clinical benefit
• Harsh abrasive systems marketed as "deep cleaning"
• Decorative botanical loading without clinical oral benefit
• Charcoal/bicarbonate overload without enamel safety consideration
• "Natural" marketing overriding evidence-based actives (anti-fluoride bias)
• Marketing-driven sensory engineering over structural oral benefit
Basic plaque removal alone cannot achieve high scores.
---
TRANSPARENCY PRIORITY RULE
Ignore:
• Branding and luxury positioning
• Foam richness and foaming perception
• Flavour intensity and "fresh breath" marketing
• "Natural/organic/clean" toothpaste marketing
• Trend-driven active loading (charcoal, turmeric, activated bamboo)
• Ingredient-count inflation
• Celebrity endorsement or dentist association claims without structural support
Evaluate only:
• Abrasive system safety (RDA/MHN values where determinable)
• Active ingredient delivery efficacy
• Oral microbiome impact
• Repeated-use mucosal tolerance
• SLS irritation burden
• Formulation structural honesty
Any format (gel, paste, powder, tablet, oil) receives credibility only when
enamel safety, active delivery, and oral compatibility are demonstrated.
---
STRUCTURE DOMINANCE RULE
Primary toothpaste architecture determines:
• Enamel abrasion risk
• Dentin hypersensitivity potential
• Active fluoride/hydroxyapatite delivery
• Mucosal irritation
• Oral microbiome stability
• Gum tissue tolerance
• Long-term enamel integrity
• Repeated-use safety
Minor additives, decorative botanicals, and secondary rinse-effect actives
cannot override a damaging abrasive backbone or absent evidence-based actives.
Ingredient evaluation must consider:
• Abrasive tier
• Active ingredient bioavailability and concentration
• Functional relevance in oral environment
• Repeated daily exposure (2× daily)
---
ORAL CONTACT CONTEXT RULE
Toothpastes have direct prolonged contact with enamel, dentin, and soft tissue
(~2 minutes active brushing, residual film post-rinse).
FULL CREDIT ACTIVES:
• Fluoride (Sodium Fluoride, Sodium Monofluorophosphate, Stannous Fluoride)
• Nano-hydroxyapatite (nHAp)
• Potassium Nitrate / Potassium Citrate (sensitivity relief)
• Stannous Fluoride (antimicrobial + remineralisation)
• Zinc salts (antimicrobial, tartar control)
• Xylitol (anti-cariogenic, sustained contact)
• Triclosan (antimicrobial — with microbiome penalty noted)
• Arginine (pH buffering, caries prevention)
PARTIAL CREDIT ACTIVES:
• Baking Soda / Sodium Bicarbonate (mild abrasive, pH buffering — limited standalone efficacy)
• Charcoal (abrasive, no clinical evidence for whitening, potential enamel risk)
• Aloe Vera (anti-inflammatory — limited evidence in oral application)
• Green Tea Extract (antioxidant — limited clinical oral benefit)
• Papain / Bromelain (enzymatic whitening — minimal evidence, mucosal irritation risk under repeated contact)
• Essential oil blends with antimicrobial evidence (Thymol, Eucalyptol, Menthol systems) — at functional
 concentrations may receive partial antimicrobial credit; see Layer 2.5 for full essential oil guidance
DECORATIVE / MINIMAL CREDIT ACTIVES:
• Turmeric / Curcumin
• Activated Bamboo / Volcanic Ash
• "Superfood" botanical blends
• Collagen (no oral delivery mechanism)
• Vitamin C in toothpaste (unstable, minimal oral bioavailability)
Actives without clinical evidence for oral benefit or with established enamel
risk must not receive full efficacy credit.
Decorative active marketing reduces:
• Ingredient Quality
• Formulation Honesty
---
LATE-INGREDIENT LIMIT RULE
Late-position ingredients may provide:
• Minor soothing
• Mild flavour enhancement
• Cosmetic texture improvement
• Temporary oral comfort
They cannot offset:
• High-RDA abrasive systems
• SLS irritation burden
• Missing evidence-based remineralisation actives
• Broad-spectrum antimicrobial microbiome damage
---
BASIC CLEANING LIMIT RULE
Basic plaque removal alone cannot achieve high structural scores.
Toothpastes lacking:
• Evidence-based remineralisation or caries prevention actives
• Enamel-safe abrasive architecture
• Oral microbiome consideration
receive moderate score ceilings regardless of cleaning ability.
---
LAYER 1 — ABRASIVE SYSTEM TIER (DOMINANT PHYSICAL PARAMETER)
MANDATORY RULE:
All abrasive ingredients must be classified by enamel/dentin safety tier
before scoring.
Abrasive system is the primary determinant of:
• Enamel loss risk
• Dentin hypersensitivity
• Gum recession risk (at gumline)
• Long-term enamel integrity
• Repeated-use safety
RDA (Relative Dentin Abrasivity) Reference Values:
• <70 → Low abrasion (ADA safe)
• 70–100 → Moderate
• 100–150 → High
• >150 → Very high / potentially damaging under repeated use
---
ABRASIVE TIER TABLE
TIER 1 — HARSH / HIGH ABRASION
Examples:
• Activated Charcoal (high RDA, variable — often >100)
• Calcium Carbonate (high concentration, coarse particle)
• Sodium Bicarbonate (high concentration, coarse particle)
• Pumice
• Silica in high concentrations with coarse particle sizes
• Volcanic Ash / Bentonite (high abrasion potential)
• Baking Soda-dominant systems
Characteristics:
• Significant enamel wear risk under repeated use
• Dentin exposure risk under chronic daily brushing
• Elevated sensitivity risk over time
• Potential for gingival tissue abrasion at the gumline
Scoring Impact:
• Mandatory Safety adjustment
• Enamel Preservation ceiling reduction
• High Cumulative Abrasion Risk weighting
Note: Mitigating factors (remineralisation actives, concentration context, blending with
lower-tier abrasives) are considered but cannot fully neutralise Tier 1 structural enamel risk.
---
TIER 2 — MODERATE ABRASION
Examples:
• Calcium Carbonate (low concentration, fine particle)
• Dicalcium Phosphate
• Alumina (low concentration)
• Sodium Bicarbonate (low concentration)
Characteristics:
• Moderate enamel wear
• Acceptable at low concentrations with careful formulation
• Concentration and particle size are meaningful modifiers
Scoring Impact:
• Moderate Safety adjustment
• Moderate Enamel Preservation ceiling
---
TIER 3 — MILD ABRASION
Examples:
• Hydrated Silica (low-RDA grade, fine particle)
• Calcium Pyrophosphate (low concentration)
• Dicalcium Phosphate Dihydrate (fine grade)
• Sorbitol-based mild polishing systems
Characteristics:
• Low enamel wear
• Good daily-use compatibility
• Industry-standard safe abrasive
Scoring Impact:
• Eligible for good Enamel Preservation scores
• Standard Safety profile
---
TIER 4 — MINIMAL / SAFE ABRASION
Examples:
• Low-RDA Hydrated Silica (<30 RDA)
• Nano-hydroxyapatite (remineralising, non-abrasive)
• Xylitol-only powder systems
• Enzymatic (non-abrasive) cleaning systems
• Water-based low-abrasion gel systems
Characteristics:
• Minimal enamel wear risk
• Highest daily-use safety
• Compatible with sensitivity and enamel repair contexts
Scoring Impact:
• Eligible for maximum Enamel Preservation
• Transparency bonus eligible
---
ABRASIVE SYSTEM RULE
Primary abrasive determines system harshness.
Blending modifies but does not eliminate high-abrasion risk.
SYSTEM CLASSIFICATION:
• Tier 1 alone → Severe enamel risk
• Tier 1 + Tier 3/4 → Moderate-High risk (blending reduces but does not eliminate concern)
• Tier 2 alone → Moderate risk
• Tier 2 + Tier 3/4 → Moderate-Low risk
• Tier 3/4 dominant → Low risk
• Tier 4 dominant → Very Low risk
Additional Rules:
• Charcoal-dominant systems cannot be characterised as "safe whitening" regardless of marketing
• Tier 3–4 remineralising systems receive Enamel Preservation credit
• Whitening claims without low-RDA abrasive evidence receive Formulation Honesty adjustment
---
LAYER 2 — ACTIVE INGREDIENT EFFICACY
Active ingredients must be evaluated based on evidence-based clinical oral benefit.
CATEGORY A — HIGH EFFICACY (FULL CREDIT)
Fluoride Systems:
• Sodium Fluoride (NaF) — standard caries prevention, 1000–1500 ppm
• Sodium Monofluorophosphate (MFP) — remineralisation
• Stannous Fluoride (SnF2) — antimicrobial + remineralisation + sensitivity
• Amine Fluoride — superior bioavailability
Remineralisation:
• Nano-hydroxyapatite (nHAp) — biomimetic enamel repair, strong evidence base
• Arginine bicarbonate — caries prevention evidence
Sensitivity Relief:
• Potassium Nitrate — nerve depolarisation, well-evidenced
• Potassium Citrate — sensitivity relief
• Stannous Fluoride — tubule occlusion
Antimicrobial (Evidence-Based):
• Stannous Fluoride — targeted antimicrobial
• Zinc Citrate / Zinc Chloride — tartar and antimicrobial
• Triclosan — antimicrobial (oral microbiome penalty required)
Anti-Cariogenic:
• Xylitol — mutans streptococci inhibition, well-evidenced
Scoring:
• Full effectiveness credit
---
CATEGORY B — PARTIAL EFFICACY
• Baking Soda / Sodium Bicarbonate — mild pH buffering, limited standalone caries benefit
• Calcium Phosphate technologies (NovaMin, Recaldent) — emerging evidence, formulation-dependent
• Essential Oils (Thymol, Eucalyptol, Menthol — Listerine-type formula) — moderate antimicrobial
 evidence at functional concentrations; see Layer 2.5 for concentration and context guidance
• Cetylpyridinium Chloride (CPC) — antimicrobial (microbiome penalty context)
• Aloe Vera — limited anti-inflammatory evidence in gum application
• Xylitol at low concentration — reduced efficacy below clinical threshold
Scoring:
• Partial effectiveness credit
---
CATEGORY C — DECORATIVE / LOW EFFICACY
• Charcoal / Activated Charcoal — no clinical whitening evidence, abrasion risk
• Turmeric / Curcumin — no clinical oral evidence
• Volcanic Ash, Bentonite Clay — no clinical oral evidence, abrasion risk
• Activated Bamboo — no clinical oral evidence
• Collagen — no oral delivery mechanism
• Vitamin C — unstable in oral formulations, no clinical benefit
• "Superfood" botanical blends — no clinical oral evidence
• Papain / Bromelain — minimal whitening evidence, mucosal irritation risk under prolonged contact
Scoring:
• No major effectiveness credit
• Marketing-heavy usage triggers:
 — Ingredient Quality penalty
 — Formulation Honesty penalty
---
LAYER 2.5 — ESSENTIAL OIL AND FRAGRANCE SYSTEM ASSESSMENT
Essential oil and fragrance systems in toothpastes require balanced, context-aware evaluation.
They are neither universally harmful nor universally decorative.
FUNCTIONAL EVIDENCE TIER:
TIER F1 — EVIDENCE-SUPPORTED FUNCTIONAL SYSTEMS
• Listerine-type essential oil blends (Thymol, Eucalyptol, Menthol, Methyl Salicylate)
 at functional concentrations — clinical antimicrobial evidence, plaque/gingivitis reduction
• Low-to-moderate peppermint or menthol at standard toothpaste concentrations —
 broadly tolerated, mild antimicrobial contribution, does not warrant aggressive penalty
• Eucalyptol and Thymol at functional concentrations — moderate antimicrobial evidence
These systems may receive:
• Partial antimicrobial or functional credit (Category B)
• Mild-to-moderate microbiome impact notation (not catastrophic penalty)
TIER F2 — STANDARD FLAVOUR / AROMATIC SYSTEMS
• Low-concentration mint, spearmint, menthol, peppermint oil systems used primarily
 for flavour at typical toothpaste usage levels
• Mild aromatic blends at standard cosmetic concentrations
These systems:
• Should NOT automatically trigger aggressive sensitization penalties
• Receive minor to no functional credit (flavour only)
• Receive minor allergy/sensitivity notation only if concentration context
 or known sensitizer profile warrants it
TIER F3 — HIGH-CONCERN SENSITIZING SYSTEMS
• High-concentration cinnamon / cinnamaldehyde — known oral sensitizer at elevated levels
• High-concentration clove / eugenol — sensitization potential under repeated direct contact
• Excessive aromatic fragrance loading beyond standard toothpaste levels
• Blends designed for intense sensory experience beyond functional justification
These systems:
• Receive sensitization penalty proportional to concentration and exposure duration
• May receive Cumulative Irritation Risk adjustment
• Allergy/Sensitivity Risk penalty applied under chronic repeated-use context
RULES:
• Concentration context matters — low-level aromatics are not the same risk profile
 as high-concentration sensitizing essential oil loads
• Delivery format matters — toothpaste (rinse-off after 2 min) has lower essential oil
 exposure burden than a prolonged-contact gel or direct gum serum
• Not all fragrance = harm; not all essential oils = clinical efficacy
• Evidence-supported essential oil systems may receive partial functional credit
• Penalties scale with concentration, sensitization potential, and exposure duration
---
LAYER 3 — ORAL MICROBIOME IMPACT RULE
MICROBIOME COMPATIBILITY MODIFIER
The toothpaste must be evaluated for long-term oral microbiome stability.
Higher oral microbiome disruption risk (under chronic repeated use):
• Triclosan (broad-spectrum antimicrobial — approved but microbiome-disruptive)
• Benzalkonium Chloride
• Chlorhexidine (clinical use context — significant microbiome disruption)
• High-alcohol systems (drying, mucosal disruption — higher concern at significant concentrations)
• Essential oil blends at high concentration under chronic repeated use
• SLS-dominant foaming at high concentration (mucosal disruption under repeated exposure)
• Cetylpyridinium Chloride (CPC) at high concentration
Lower oral microbiome disruption risk:
• Fluoride-only systems (targeted caries prevention)
• nHAp systems (biomimetic, microbiome-neutral)
• Xylitol (selective mutans streptococci inhibition — microbiome-friendly)
• Zinc Citrate (mild, targeted antimicrobial)
• Potassium Nitrate/Citrate systems (sensitivity-targeted, microbiome-neutral)
Application Rules:
• Primarily modifies:
 — Microbiome Compatibility score
 — Long-Term Oral Compatibility score
• Reinforces existing abrasive penalties
• Broad-spectrum antimicrobials at high concentration require clinical justification
 to avoid significant microbiome penalty
• Not a standalone dominant penalty unless antimicrobial overload is present
• Essential oil systems at standard formulation levels should not receive
 the same microbiome disruption penalty as high-concentration broad-spectrum agents
---
LAYER 3.5 — SLS IRRITATION RULE
Sodium Lauryl Sulfate (SLS) in oral products:
• Primary foaming agent in most conventional toothpastes
• May increase mucosal irritation burden under repeated exposure in susceptible individuals
• Associated with aphthous ulcer (canker sore) recurrence in susceptible individuals
• Temporarily denatures taste proteins (metallic taste post-brushing)
• Higher concern than skin-rinse SLS due to mucosa permeability
Scoring Impact:
• Allergy/Sensitivity Risk penalty (mild to moderate depending on concentration and position)
• Mucosal Tolerance adjustment
• Cumulative Irritation Risk adjustment
SLS-free formulations receive:
• Mucosal Tolerance credit
• Allergy/Sensitivity credibility note
SLS presence must be mentioned under:
• Concerns
• Key Structural Ingredients (if early position)
• Why This Rating
Foam volume generated by SLS does not indicate plaque removal effectiveness
and must not receive efficacy credit.
---
LAYER 3.6 — COLORANT AND ARTIFICIAL ADDITIVE ASSESSMENT
Artificial colorants and sweeteners in oral-contact products add
unnecessary mucosal irritation burden with no oral health benefit.
Higher concern examples:
• Red 40 / FD&C Red No. 40
• Blue 1 / FD&C Blue No. 1
• Yellow 5 / Tartrazine
• Yellow 6
• Green 3
• Multiple synthetic dye blends
Sweetener considerations:
• Saccharin — low concern but bitter aftertaste and limited long-term safety data in this context
• Aspartame — moderate concern
• Sodium Saccharin — most common; low concern at toothpaste levels
• Xylitol as sweetener — functional dual role (sweetener + anti-cariogenic)
Scoring Impact:
• Allergy/Sensitivity Risk adjustment
• Ingredient Quality adjustment
• Cumulative Irritation Risk adjustment
• Formulation Honesty adjustment
Xylitol used as sweetener receives active credit, not a sweetener penalty.
OUTPUT RULE:
Colorants and artificial additives must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)
---
LAYER 4 — HERBAL AUTHENTICITY & NATURAL CLAIM VALIDATION ENGINE
[CONDITIONAL LAYER — activates when herbal claims, botanical-heavy marketing,
Ayurvedic/natural/organic positioning, or plant-based therapeutic claims are present]
This layer scientifically distinguishes between evidence-supported botanical support
and decorative herbal marketing inflation.
HERBAL EVIDENCE ASSESSMENT
Classify all botanical and herbal claims into tiers:
---
H1 — EVIDENCE-SUPPORTED FUNCTIONAL BOTANICALS
Examples:
• Aloe Vera — anti-inflammatory, mucosal soothing; limited but acceptable oral evidence,
 particularly in gingival application contexts
• Green Tea Extract (EGCG) — antioxidant; limited clinical oral benefit but credible mechanism
• Chamomile — mild anti-inflammatory; limited clinical oral evidence
• Propolis — antimicrobial and mild anti-inflammatory; limited but credible evidence base
• Hyaluronic Acid / Sodium Hyaluronate — tissue support; emerging evidence in oral application
• Xylitol-compatible botanicals (used synergistically with xylitol)
These may receive:
• Partial support credit (anti-inflammatory, soothing, tissue-supportive)
• Microbiome-compatible support credit where relevant
RULES:
• H1 botanicals cannot override dominant architecture assessment
• Evidence quality must be proportional to the credit assigned
• "Oral evidence" is more credible than general systemic evidence applied to oral use
---
H2 — TRADITIONAL / EMERGING EVIDENCE BOTANICALS
Examples:
• Neem — traditional antimicrobial use; limited clinical evidence; concentration-dependent
• Miswak (Salvadora persica) — traditional oral hygiene; moderate evidence for antimicrobial
 activity; clinical strength not equivalent to fluoride systems
• Clove / Eugenol — antimicrobial and analgesic properties; meaningful at functional
 concentrations but sensitization concern at high levels
• Tea Tree Oil — antimicrobial properties; limited direct oral clinical evidence;
 concentration matters
• Turmeric / Curcumin — anti-inflammatory systemically; oral evidence very limited;
 abrasion potential depending on form
• Triphala — Ayurvedic formulation; some emerging antimicrobial oral evidence, low quality
• Sage — mild antimicrobial; limited oral evidence
• Eucalyptus — antimicrobial; better evidence when part of established essential oil systems
These may receive:
• Limited partial credibility credit
• Traditional use is acknowledged but does not constitute equivalence to clinical evidence
• Concentration and delivery context must be considered
RULES:
• Traditional use ≠ clinical efficacy equivalence
• Evidence quality must be explicitly acknowledged when assigning any credit
• H2 botanicals may receive minor functional credit only when concentration
 and delivery are consistent with claimed mechanism
---
H3 — DECORATIVE / MARKETING-DRIVEN BOTANICALS
Examples:
• Superfood botanical blends (wheatgrass, spirulina, moringa in oral care)
• Exotic fruit powders with no oral evidence (acai, pomegranate, dragon fruit tooth powders)
• "Fairy-dust" herbal loading — trace quantities of many botanicals for label appeal
• Botanical complexity inflation — lengthy botanical lists implying synergistic benefit
 without clinical support
• Activated charcoal marketed with botanical co-branding
• Trace herbal extracts positioned primarily for marketing narrative
These receive:
• Minimal to no functional credit
• Formulation Honesty penalty if overmarketed as therapeutic oral actives
RULES:
• Botanical count on label does not indicate efficacy
• Long botanical ingredient lists that substitute for evidence-based actives reduce credibility
• Formulation Honesty penalty scales with the degree of overmarketing
---
HERBAL CLAIM OUTPUT RULES:
• H1 botanicals at meaningful concentrations → noted as minor positive structural feature
• H2 botanicals → noted with evidence quality caveat
• H3 botanicals → noted as decorative; trigger Formulation Honesty adjustment if marketed
 as primary benefit
• "Ayurvedic", "natural gum formula", "herbal oral care" marketing without H1/H2 actives
 at functional concentrations → Formulation Honesty penalty applied
• Herbal systems are assessed in addition to — never instead of — primary
 abrasive and active ingredient architecture assessment
---
LAYER 5 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 FOR EVERY CATEGORY
---
SAFETY [DOMINANT]
Evaluates:
• Abrasive harshness and enamel risk
• SLS mucosal irritation burden
• Repeated-use soft tissue tolerance
• Sensitization potential (flavour agents, essential oils — context and concentration weighted)
• Cumulative inflammatory oral load
• Long-term enamel integrity trajectory
• Gum tissue compatibility
Core Rules:
• Repeated low-grade abrasion under twice-daily brushing magnifies enamel risk over time
• Charcoal/bicarbonate overload penalties reflect chronic enamel risk trajectory
• High-risk architectures reduce elite scoring probability and require mitigation systems
 but do not automatically cause catastrophic failure — mitigating factors are considered:
 - Remineralisation support
 - Reduced abrasive blending
 - Sensitivity mitigation actives
 - Concentration evidence
• Safety overrides:
 — Foam perception
 — Flavour freshness
 — Whitening marketing
 — Luxury positioning
 — "Natural" positioning
---
EFFECTIVENESS
Core Question:
Can the toothpaste effectively prevent caries, remove plaque, and support enamel
while maintaining oral stability under repeated use?
Evaluates:
• Plaque removal efficacy
• Caries prevention (fluoride/nHAp delivery)
• Sensitivity relief efficacy
• Whitening efficacy (evidence-based only)
• Gum health support
• Tartar/calculus control
• Repeated-use functional stability
• Structural formulation honesty
High effectiveness requires:
• Evidence-based caries prevention active (fluoride or nHAp at clinical concentration)
• Enamel-safe abrasive system
• Evidence-supported secondary actives
Rules:
• Whitening claims without evidence = Effectiveness adjustment
• Decorative active inflation cannot receive full credit
• Basic cleaning without remineralisation cannot achieve elite effectiveness
• Foam volume does not determine plaque removal quality — ignore foam perception
• Flavour freshness perception is not oral health efficacy — ignore for scoring purposes
---
ALLERGY / SENSITIVITY RISK
Evaluates:
• Flavouring agent sensitization potential (context and concentration weighted)
• Essential oil sensitization risk — calibrated to concentration and delivery format
 (see Layer 2.5 for full essential oil guidance)
• SLS mucosal irritation
• Preservative sensitization (Sodium Benzoate, Parabens)
• Artificial colorant irritation burden
• Repeated daily oral mucosal exposure accumulation
• Aphthous ulcer trigger potential (SLS, sodium benzoate)
• Low-level peppermint or menthol at standard concentrations should not trigger
 aggressive sensitivity penalties automatically
Application Rules:
• Oral mucosal contact is direct and repeated — higher sensitivity concern than skin rinse-off
• Twice-daily exposure frequency is heavily weighted in cumulative risk assessment
• Penalty is proportional to concentration, sensitization profile, and exposure duration
---
ECO IMPACT
Evaluates:
• Surfactant (SLS/SCI) biodegradability
• Packaging sustainability (plastic tubes, pumps, recyclability)
• Microplastic risk (polyethylene microbeads — now largely banned but evaluate if present)
• Synthetic colorant environmental load
• Triclosan environmental persistence (regulatory concern)
• Fluoride environmental load (low concern at product levels)
• Charcoal sourcing and environmental sustainability
General Rules:
• SLS-free formulations with biodegradable surfactants receive ecological preference
• Tablet/powder formats generally lower packaging impact than paste tubes
• Triclosan-containing products receive environmental persistence notation
---
INGREDIENT QUALITY
Evaluates:
• Abrasive system coherence and safety
• Active ingredient system honesty and concentration adequacy
• Fluoride/nHAp clinical relevance
• Functional ingredient synergy
• Structural transparency
• Absence of decorative inflation (charcoal, turmeric, volcanic ash)
• Herbal claim authenticity (H1/H2/H3 classification — see Layer 4)
Rules:
• Decorative active stacking reduces quality credibility
• Non-functional botanical loading at H3 level reduces transparency
• Whitening claims without low-RDA abrasive evidence = quality adjustment
• Anti-fluoride without nHAp alternative = formulation gap
• Fluoride at sub-clinical concentration = reduced quality credit
• H1 botanicals at meaningful concentration may contribute minor positive quality note
---
ORAL COMPATIBILITY
Evaluates:
• Daily 2× use tolerance
• Mucosal resilience
• Post-brushing sensitivity/dryness
• Aphthous ulcer compatibility (SLS concern)
• Oral microbiome stability
• Gum tissue tolerance
• Long-term enamel integrity
• Cumulative sensitization risk
Core Rules:
• Temporary freshness does not equal oral compatibility
• Foam satisfaction does not equal oral health benefit
• Long-term repeated-use behavior is prioritized over immediate cosmetic feel
• Post-brushing sensitivity warrants structural investigation — it may indicate enamel
 or dentin stress, not "deep clean" sensation
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
LAYER 6 — SPECIALIZED ORAL PERFORMANCE
Evaluates real-world repeated-use toothpaste/powder behavior.
Score Range: 1.0 → 5.0
---
PLAQUE REMOVAL EFFICIENCY
Evaluates:
• Mechanical plaque disruption via abrasive system
• Surfactant role in plaque dislodgement — note that foam volume itself
 does not determine plaque removal effectiveness; SLS may aid dislodgement
 but its contribution is not proportional to foam richness
• Antimicrobial plaque reduction
• Enzymatic cleaning (if present)
• Tongue/soft tissue cleansing
Core Rules:
• Balanced cleaning preferred over aggressive abrasion
• Excessive abrasion reduces score — removes plaque but also risks enamel
• Charcoal/bicarbonate overload may remove plaque at enamel cost
CEILING RULE:
Tier 1 abrasive systems cannot achieve maximum Plaque Removal Efficiency
regardless of mechanical cleaning strength, reflecting enamel cost of aggressive abrasion.
---
ENAMEL PRESERVATION [DOMINANT]
Evaluates:
• Abrasive RDA risk
• Remineralisation active support (fluoride/nHAp)
• Acid challenge buffering
• Repeated-use enamel integrity trajectory
• Long-term enamel loss risk
Note on acid-forming or low-pH-generating ingredient systems:
When formulation ingredients are strongly suggestive of an acid-generating mechanism
(e.g. undiluted citric acid systems, lemon-based whitening, ACV-based formulations),
this is noted as a contextual structural observation and factored into enamel risk
assessment with appropriate uncertainty acknowledgement — not as a deterministic
pH tier score.
ENAMEL PRESERVATION CEILINGS
• Tier 1 dominant abrasive → Max 2.0
• Tier 1 + Tier 3/4 abrasive blend + remineralisation active → Max 2.8
• Tier 2 dominant → Max 3.2
• Tier 2 + Tier 3/4 + remineralisation support → Max 3.7
• Tier 3/4 dominant → Max 4.3
• Tier 3/4 + Fluoride/nHAp → Eligible for 5.0
• Charcoal-dominant systems → Hard ceiling 2.0
• Fluoride-free without nHAp alternative → Max 3.5 regardless of abrasive tier
Core Rules:
• Post-brushing sensitivity warrants enamel/dentin structural investigation
• High scores require:
 — Mild/safe abrasive (Tier 3–4)
 — Evidence-based remineralisation active
 — Low repeated enamel stress
• Charcoal/high-bicarbonate dominant systems cannot achieve elite Enamel Preservation
• Enamel Preservation is the dominant oral performance parameter
---
GUM HEALTH SUPPORT
Evaluates:
• Anti-inflammatory active presence (aloe, zinc, essential oils — evidence-weighted
 and concentration-contextualised)
• Antimicrobial plaque control at gumline
• SLS gum tissue irritation burden
• Gingival tissue tolerance under repeated use
• Tartar/calculus control (Zinc, Triclosan, Pyrophosphates)
Core Rules:
• Gum irritation from SLS under repeated use is a scoring consideration
• Tartar control actives (zinc, pyrophosphates) receive moderate functional credit
• Evidence-backed anti-gingivitis claims require active support
• Essential oils at standard formulation concentrations in toothpaste context
 may receive mild gum-health antimicrobial credit (see Layer 2.5)
---
SENSITIVITY PROTECTION
Evaluates:
• Potassium Nitrate/Citrate presence and concentration
• Stannous Fluoride tubule occlusion
• Nano-hydroxyapatite tubule occlusion
• Arginine-calcium carbonate system
• Abrasive harshness impact on dentin exposure risk
• SLS sensitivity aggravation
Core Rules:
• Sensitivity claims without evidence-based actives = Formulation Honesty adjustment
• High-abrasive systems may increase dentin exposure risk, potentially worsening sensitivity
• nHAp and stannous fluoride receive dual credit (enamel + sensitivity)
---
ORAL MICROBIOME COMPATIBILITY
Evaluates:
• Commensal oral microbiome preservation
• Broad-spectrum antimicrobial disruption risk
• Selective antimicrobial benefit (xylitol, zinc, fluoride)
• Long-term oral microbiome balance
Core Rules:
• Routine oral microbiome disruption reduces score
• Broad-spectrum antimicrobial systems (triclosan, chlorhexidine) receive daily-use penalties
• Xylitol receives selective anti-cariogenic credit without major microbiome penalty
• Fluoride and nHAp systems are microbiome-compatible
• Essential oil systems at standard toothpaste concentrations present lower microbiome
 disruption risk than high-concentration broad-spectrum agents — penalty is
 proportional to concentration and chronic exposure context
---
CUMULATIVE IRRITATION RISK
Evaluates:
• Repeated SLS mucosal exposure
• Flavouring and aromatic agent accumulation — calibrated to concentration tier
 (see Layer 2.5; low-level mint systems are lower concern than high-sensitizer blends)
• Essential oil exposure at high concentration under repeated daily use
• Preservative sensitization (sodium benzoate, parabens)
• Chronic enamel abrasion burden
• Frequency-weighted exposure (2× daily = high burden)
• Aphthous ulcer trigger potential
Core Rules:
• Twice-daily exposure amplifies irritation burden significantly
• Mild irritants may become clinically significant under repeated oral exposure
 in susceptible individuals
• SLS + high-flavour + high-abrasive systems compound irritation burden
• Long-term low-grade mucosal irritation is prioritized over isolated acute reactions
• Essential oil and fragrance penalties are proportional — not triggered by all
 aromatic ingredients regardless of concentration
---
FORMULATION HONESTY
Evaluates:
• Whitening marketing without low-RDA abrasive or peroxide evidence
• Foam-dependent cleaning perception (foam ≠ plaque removal)
• Charcoal/turmeric/volcanic ash "natural whitening" positioning
• Decorative botanical loading presented as therapeutic benefit (H3 classification)
• "Natural" anti-fluoride positioning without clinical alternative
• Ingredient-list inflation with Category C actives
• Aggressive "deep cleaning" or "detoxifying" claims
• Sensitivity claims without evidence-based actives
• Herbal/Ayurvedic marketing without H1/H2 actives at functional concentrations
Core Rules:
• Consumer perception cannot replace structural formulation quality
• Foam richness does not equal plaque removal performance
• Clinical oral outcome overrides sensory satisfaction
• "Natural" ≠ safe or effective in oral care context
• Herbal complexity ≠ clinical efficacy
---
SPECIALIZED CALCULATION
Specialized Performance Score =
Average of all 7 specialized scores
Dominant Parameters:
• Enamel Preservation → primary interpretive parameter
• Cumulative Irritation Risk → primary penalty parameter
All penalties must reflect:
• Realistic contact time (2 min active + residual)
• Usage frequency (1–2× daily)
• Evidence-supported oral biology relevance
• Concentration and formulation context
• Uncertainty where ingredient-level evidence is limited
---
LAYER 7 — FINAL RATING FORMULA
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
Core and Specialized scores carry equal weight.
This prevents:
• Marketing-driven performance inflation
• Safe-but-ineffective scoring inflation
• Effective-but-enamel-damaging inflation
---
HIGH SCORE ELIGIBILITY (>4.0)
Requires:
• Tier 3 or Tier 4 dominant abrasive system
• Evidence-based remineralisation active (Fluoride ≥1000 ppm or nHAp ≥10%)
• Enamel Preservation ≥ 3.5
• Cumulative Irritation Risk ≥ 3.0
• SLS-free OR very low SLS concentration
• No whitening active inflation
• No dominant sensitizing essential oil loading beyond functional evidence
• Formulation Honesty ≥ 3.5
• No unjustified broad-spectrum antimicrobial dominance
DISQUALIFIERS:
• Primary charcoal or volcanic ash abrasive systems
• Fluoride-free AND nHAp-free without clinical alternative
• Heavy high-sensitizer essential oil overload without formulation mitigation
• Decorative Category C active marketing as primary benefit
• SLS at high concentration in aphthous-ulcer-triggering patterns
---
LAYER 7.5 — REAL-WORLD USAGE SIMULATION
Simulate:
• Twice-daily brushing (2-minute contact)
• Abrasion accumulation over months and years
• Recovery cycles for oral mucosa
• Long-term enamel mineral density
• Long-term oral microbiome stability
• Repeated flavouring/SLS/preservative sensitization trajectory
Core Question:
Can the toothpaste/powder remain safe, effective, and tolerable
under long-term real-world oral use?
Core Rules:
• Post-brushing sensitivity warrants structural investigation — enamel or dentin stress
 should not be interpreted as a "deep clean feeling"
• Foam perception does not indicate plaque removal quality
• Long-term repeated-use behavior overrides short-term sensory satisfaction
• "Whitening" results from abrasion alone are not the same as evidence-based safe whitening
---
ANTI-MARKETING FILTER
Mandatory penalties apply for:
• Foam-first cleaning claims (foam ≠ efficacy)
• Flavour-driven "freshness" = oral health positioning
• Charcoal/turmeric "natural whitening" positioning
• "Detox" oral care claims
• Decorative H3 botanical loading presented as therapeutic benefit
• Aggressive "deep cleaning" or "enamel strengthening" claims without support
• Anti-fluoride "clean" marketing
• Sensitivity claims without Potassium Nitrate/nHAp/Stannous Fluoride evidence
• "Microbiome-friendly" claims lacking antimicrobial selectivity support
• Herbal/Ayurvedic marketing positioning without H1/H2 actives at functional concentrations
---
BIAS NEUTRALIZATION FILTER
Neutralize:
• Foam = cleanliness illusion
• Flavour = oral health illusion
• "Natural/charcoal = safe" bias
• Botanical inflation bias (H3 botanical lists ≠ efficacy)
• Whitening = healthy enamel bias
• Antibacterial health halo (broad-spectrum antimicrobials are not always beneficial)
• Ingredient-count quality illusion
• Tightness/sensitivity = deep cleansing illusion
• Fluoride-free = safer bias
• Essential oils = always harmful bias (rebalanced — context and concentration matter)

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT


# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🦷 PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Gentle Remineralising Toothpaste
- Balanced Fluoride Daily Paste
- Harsh Whitening Abrasive System
- Natural Fluoride-Free Powder (Enamel Risk)
- Clinical Sensitivity Relief Paste
- Overloaded Charcoal Whitening System

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering abrasive system safety, enamel and dentin protection, evidence-based active delivery, pH compatibility, long-term oral behavior, and overall formulation balance.

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

## Enamel + Oral Health Analysis

### Plaque Removal Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Enamel Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Gum Health Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Sensitivity Protection — ⭐X.X

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

### Sensitive Teeth — ⭐X.X

Short compatibility explanation.

### Cavity-Prone — ⭐X.X

Short compatibility explanation.

### Gum Issues — ⭐X.X

Short compatibility explanation.

### Whitening Goal — ⭐X.X

Short compatibility explanation.

### Children (6+) — ⭐X.X

Short compatibility explanation.

### Aphthous Ulcer Prone — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use (1×) — ⭐X.X

Short explanation.

### Twice Daily Use (2×) — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Cleaning feel
- Sensitivity signals
- Flavour and foam experience

## Medium-Term

- Enamel response
- Sensitivity changes
- Gum tissue response

## Long-Term

- Enamel integrity
- Caries prevention outcome
- Microbiome stability
- Overall oral health outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting abrasive system, enamel and dentin behavior, irritation and sensitization risk, active (fluoride, nHAp, potassium) performance, and long-term oral outcome.

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
- Mention SLS, harsh colorants, high-abrasion ingredients, and anti-fluoride positioning in output
- No foam-volume bias
- Structural weakness overrides cosmetic feel and flavour experience
- Abrasive system tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Active ingredient efficacy category must be classified before Effectiveness scoring
- Repeated-use behavior (2× daily) > single-use feel
- Long-term oral outcome > immediate sensation
- Post-brushing sensitivity = structural failure signal
- Foam richness ≠ plaque removal power
- Charcoal or volcanic ash ≠ safe or effective whitening
- Fluoride-free ≠ safer or cleaner
- Flavour freshness ≠ oral health benefit
- Natural positioning ≠ clinical efficacy
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Toothpaste / Tooth Powder Evaluation Algorithm — Structured for abrasive safety analysis, enamel preservation realism, and long-term caries prevention and oral health evaluation. All scoring is structural and evidence-informed.

---
-================================================

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
              "You are a strict toothpaste/tooth powder structural evaluation engine."
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
const finalOutput =
  response.choices[0]
    .message.content;

console.log(
  "\n========== RAW ORAL CARE OUTPUT ==========\n"
);

console.log(finalOutput);

console.log(
  "\n========== END OUTPUT ==========\n"
);

return finalOutput;
    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();