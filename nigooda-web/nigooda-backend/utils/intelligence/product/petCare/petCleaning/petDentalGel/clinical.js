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
        "PETDENTALGEL ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
# ALGORITHM 1 — PET DENTAL GEL EVALUATION — V.0
# FULLY SELF-CONTAINED — ALL ENGINES EMBEDDED
# ═══════════════════════════════════════════════
---
## LAYER 0 — FOUNDATION ENGINE
### SYSTEM OBJECTIVE
Reward pet dental gels that demonstrate:
- Effective plaque and tartar biofilm disruption with minimal oral tissue irritation
- Antimicrobial selectivity — targeting pathogenic bacteria while preserving beneficial oral flora
- Oral mucosa safety under repeated daily application
- Mandatory ingestion safety — every ingredient must be safe for swallowing at application dose
- Species-appropriate oral pH compatibility
- Evidence-based active ingredient concentrations
- Honest functional claims supported by active architecture
- Long-term oral microbiome stability
- Low cumulative toxicity burden under daily use
Mandatory penalties apply for:
- Ingredient inclusion without ingestion safety verification
- Broad-spectrum antimicrobials causing oral dysbiosis
- Fluoride inclusion in any pet dental product
- Xylitol inclusion in any dog dental product
- Flavor-first palatability engineering over antimicrobial function
- Decorative botanical loading without oral biofilm evidence (see HASE system embedded in Layer 2)
- Human dental formula repurposing without species safety review
- "Cleans without brushing" overclaiming
- Essential oil use without species ingestion safety clearance
- Marketing-driven enzyme or probiotic inflation without functional concentration evidence
**Fundamental structural reality**: Pet dental gels are leave-on or semi-leave-on oral products. Pets cannot and do not rinse or spit. Every ingredient applied to the oral cavity is effectively ingested at full application dose. Ingestion safety is the primary safety filter governing every ingredient decision.
---
### FORMAT CLASSIFICATION [MANDATORY PRE-EVALUATION]
**DENTAL GEL** (true leave-on): Applied to gums/teeth/mucosa; no rinsing; full ingestion; maximum mucosa contact; highest active efficacy AND highest ingestion safety demand.
**DENTAL PASTE / TOOTHPASTE** (with brushing): Applied via brush; mechanical action is primary; still fully ingested; brushing mechanism reduces dependence on chemistry alone. Brushing mechanical credit applied in scoring.
**DENTAL FOAM / SPRAY**: Applied as foam/spray; shorter mucosa contact; diluted by saliva; active concentration at mucosa lower than gel. Active credit reduced accordingly.
**FINGERBRUSH GEL**: Applied via silicone finger brush; combines mechanical and chemical action. Treated as dental paste for scoring.
**DENTAL WATER ADDITIVE**: Highly diluted; active credit substantially reduced. Referenced only when product bridges gel and additive claims.
If format is ambiguous: default to dental gel classification. Full ingestion safety demand applies.
---
### TRANSPARENCY PRIORITY RULE
**Ignore**: Flavor palatability claims · Foam texture · "Natural/herbal/organic" positioning alone · Exotic botanical inclusion without evidence · Probiotic/enzyme count inflation · "Vet-recommended" without substantiation · Ingredient-count inflation
**Evaluate only**: Plaque biofilm disruption · Antimicrobial selectivity · Ingredient ingestion safety · Species toxicity · Active concentration functional relevance · Oral mucosa compatibility · Long-term oral and systemic safety · Formulation honesty
---
### GLOBAL ENFORCEMENT RULES
- Ingestion safety is the dominant constraint — overrides all functional benefits
- Fluoride at any concentration, any form = mandatory disqualification
- Xylitol in any dog dental product = mandatory disqualification
- Leave-on format = full ingredient efficacy credit AND full ingestion toxicity burden
- Broad-spectrum antimicrobials causing dysbiosis reduce score regardless of plaque efficacy
- Flavor engineering cannot substitute for antimicrobial architecture
- Enzyme claims require concentration or activity evidence for full credit
- Daily application frequency amplifies all cumulative toxicity signals
---
### EMBEDDED INGREDIENT CONCENTRATION & POSITION RULE [MANDATORY — DENTAL GEL]
This rule governs how every ingredient in this dental gel evaluation is assessed when explicit concentration data is unavailable.
**RULE 1 — EXPLICIT CONCENTRATION STATED**
If a percentage or concentration (e.g., "0.5% chlorhexidine", "0.1% neem extract") is explicitly stated on the product label or in technical documentation:
- Evaluate the ingredient at that exact stated concentration
- Apply safety, efficacy, and toxicity assessments calibrated to that specific dose
- Do not default to worst-case assumptions
- Explicitly reference the stated concentration in output scoring rationale
**RULE 2 — NO CONCENTRATION STATED (POSITION-BASED EVALUATION)**
If no concentration is stated, evaluate by ingredient list position:
| Position in List | Estimated Concentration Range | Evaluation Approach |
|---|---|---|
| 1st–3rd ingredient | Very high (dominant base/carrier) | Full safety + efficacy weight applied |
| 4th–8th ingredient | Moderate-high (functional level likely) | Standard safety + moderate efficacy credit |
| 9th–15th ingredient | Low-moderate (supporting/functional) | Proportional credit; reduced penalty for moderate-concern items |
| 16th–20th ingredient | Low (trace to minor functional) | Minimal penalty for moderate-concern items; decorative credit for actives |
| 20th+ ingredient | Trace level | Monitor-only flag for moderate concerns; no penalty for low-concern items |
**RULE 3 — PENALTY PROPORTIONALITY BY POSITION**
A "moderate concern" ingredient (e.g., a mild essential oil, a standard preservative) listed in position 18+ shall NOT receive the same penalty weight as the same ingredient in position 3.
- Position 1–5 + moderate concern ingredient → Full moderate penalty applied
- Position 6–12 + moderate concern ingredient → Reduced penalty (50% weight)
- Position 13+ + moderate concern ingredient → Monitor flag only; no score deduction unless species-critical toxicity
- High-concern or disqualifying ingredients → Position does not reduce penalty. Disqualifiers are disqualifiers at any position.
**RULE 4 — WHAT POSITION CANNOT EXCUSE IN DENTAL GEL**
Ingredient position does NOT reduce penalties for:
- Fluoride (any form) — disqualifier at any position
- Xylitol in dog products — disqualifier at any position
- Tea Tree Oil in cat oral products — disqualifier at any position
- Chlorhexidine >0.2% in leave-on oral — disqualifier at any position
- Known species-lethal oral toxins at any detectable level
- Ingredients whose harm mechanism is cumulative at trace doses (daily ingestion amplifies all trace exposures)
*Application to dental gel actives*: Chlorhexidine concentration position rule — if listed position 1–5 in a leave-on gel without stated concentration, evaluate as potentially functional and apply full safety scrutiny. If listed position 15+, apply proportional credit reduction and monitor-level penalty for moderate concerns only.
*Application to dental gel essential oils*: Thymol at position 3 in a dog dental gel = full moderate flag applied. Thymol at position 18 = monitor-only flag.
*Application to dental gel enzyme systems*: Enzyme listed in first 50% of ingredient list = functional concentration plausible, full-to-partial efficacy credit. Enzyme listed in second 50% = reduced credit. Enzyme at position 20+ = decorative classification.
---
### EMBEDDED HERBAL AUTHENTICITY SCORING ENGINE (HASE) — DENTAL GEL [MANDATORY]
Every botanical ingredient in this dental gel evaluation must be classified into one of the following four tiers before scoring. Species context is mandatory — H1 status for dogs does not automatically apply to cats.
**TIER H1 — EVIDENCE-BACKED BOTANICAL ACTIVES (DENTAL GEL CONTEXT)**
Definition: Botanical ingredient with published peer-reviewed evidence specifically supporting the claimed mechanism in oral/dental use for pets.
Dental gel H1 examples:
- Neem extract: antimicrobial plaque evidence in dog oral context; dog-safe at oral application doses — Full oral antimicrobial credit; HASE bonus +0.2 to Ingredient Quality
- Green tea EGCG: oral biofilm inhibition studies at functional concentrations — Full H1 credit if position 1–12
- Cranberry extract: anti-adhesion mechanism (prevents plaque adherence); peer-reviewed evidence — Partial H1 credit; emerging evidence tier
- Thymol at functional concentrations in dog oral products: documented antimicrobial MIC data — H1 credit with ingestion safety note (position-adjusted)
Scoring impact for H1 in dental gel:
- Full botanical efficacy credit in relevant dimension
- HASE bonus: +0.2 to Ingredient Quality
- Formulation Honesty credit if concentration is disclosed or position suggests functional level
- Species ingestion safety still assessed independently — H1 efficacy does not override oral ingestion toxicity concern
**TIER H2 — FUNCTIONAL TRADITIONAL BOTANICAL (DENTAL GEL CONTEXT)**
Definition: Botanical with history of use in animal oral/general care with plausible mechanism but limited modern peer-reviewed evidence specifically in pet dental gel context.
Dental gel H2 examples:
- Aloe vera (oral-grade): mild anti-inflammatory; limited direct oral biofilm antimicrobial evidence — Partial credit; position-adjusted
- Calendula extract: anti-inflammatory, tissue soothing — Traditional + some modern evidence; partial gingival support credit
- Peppermint at low position in dog oral products: breath/mild antimicrobial — Traditional use, limited evidence; partial credit; cat ingestion flag
- Chamomile extract: bisabolol anti-inflammatory — some evidence; partial gingival credit
Scoring impact for H2 in dental gel:
- Partial functional credit (50%) in relevant dimension
- No HASE penalty
- Species ingestion safety still assessed — peppermint in cat products carries a separate flag regardless of H2 tier
- If ingredient is in position 15+ → cosmetic credit level only
**TIER H3 — COSMETIC BOTANICAL / MARKETING-LEVEL USE (DENTAL GEL CONTEXT)**
Definition: Botanical included primarily for label appeal or consumer perception. Low or no functional concentration for oral biofilm purposes, but not harmful.
Dental gel H3 examples:
- Aloe vera at position 18 in a dental gel (well below functional level)
- Turmeric/curcumin (staining risk; limited oral biofilm evidence at gel concentrations)
- "Supergreen" additions (spirulina, chlorophyll) without specific oral biofilm research
- Vitamin E in oral gel (limited oral biofilm evidence)
- Collagen in oral gel (no oral structural benefit)
- Hyaluronic acid in oral gel (limited mucosa evidence at gel concentrations)
- Exotic botanicals (açai, matcha) without specific oral mechanism evidence
Scoring impact for H3 in dental gel:
- No functional efficacy credit
- No penalty (ingredient is harmless)
- Mild Ingredient Quality note if multiple H3 ingredients are stacked (formulation inflation signal)
- If marketed prominently as a key functional oral health benefit → Formulation Honesty minor penalty
**TIER H4 — GREENWASH BOTANICAL (HARMFUL + "NATURAL" FRAMING) (DENTAL GEL CONTEXT)**
Definition: Botanical that carries documented oral ingestion safety concern for the target species AND/OR is marketed as an oral health benefit using "natural" framing to obscure risk or inefficacy.
Dental gel H4 examples:
- Tea tree oil in any cat oral product marketed as "natural antimicrobial" — neurotoxic at oral ingestion doses in cats
- Clove oil / eugenol in cat dental products marketed as "natural antibacterial" — hepatotoxic at daily ingestion doses in cats
- Pennyroyal in any oral product marketed as "natural freshener" — toxic to dogs and cats
- High-concentration essential oil blends in cat dental gels labeled "calming botanical blend"
- Eucalyptus in any cat oral product framed as "natural freshener"
Scoring impact for H4 in dental gel:
- Full species toxicity penalty (same as non-botanical toxic ingredient)
- HASE penalty: −0.3 to Formulation Honesty
- HASE penalty: −0.2 to Ingredient Quality
- "Natural = safe to swallow" framing must be explicitly called out in output under Concerns
- Position does not reduce H4 penalty — daily oral ingestion amplifies all cumulative exposures
**HASE APPLICATION RULES — DENTAL GEL**
1. Every botanical must be classified H1–H4 before scoring
2. Species context is mandatory — H1 in dogs ≠ H1 in cats for oral ingestion safety
3. Position matters for H2 and H3 — H2 at position 3 receives functional consideration; H2 at position 19 receives cosmetic-level credit only
4. H4 is species and context dependent — tea tree is H4 for cats (oral toxic + natural framing); H2 for dogs at trace/low position with monitor note; H4 for dogs at functional position in oral products
5. Explicit concentration overrides position — "0.1% neem extract" allows precise evaluation
6. Evidence quality matters for H1 — in vitro only = lower H1 confidence; in vivo or clinical = full H1 confidence
7. Multiple H1 botanicals at functional positions = Ingredient Quality bonus signal
**HASE OUTPUT NOTATION (DENTAL GEL)**
When HASE applies, include in Key Structural Ingredients:
- \`[H1 — Evidence-Backed]\` next to qualifying botanicals
- \`[H2 — Traditional Functional]\` next to qualifying botanicals
- \`[H3 — Cosmetic/Marketing Level]\` next to trace botanicals
- \`[H4 — Greenwash Risk]\` next to harmful botanicals marketed as natural/safe
---
### EMBEDDED PENALTY LANGUAGE CALIBRATION RULE [MANDATORY — DENTAL GEL]
This rule governs the language used in all output sections of this dental gel evaluation. It prevents catastrophizing moderate ingredients and ensures proportionate, accurate communication.
| Concern Level | When to Use | Example Output Language |
|---|---|---|
| **DISQUALIFIED** | Fluoride any form; Xylitol in dogs; Tea Tree in cat oral products; Chlorhexidine >0.2% leave-on; Ethanol >5% leave-on | "This ingredient disqualifies the product for this species regardless of concentration or other formulation qualities." |
| **HIGH CONCERN** | Ingredients with documented significant toxicity at realistic oral ingestion concentrations for the labeled species | "This ingredient raises a significant safety concern under regular oral use for [species]. We recommend avoiding this product." |
| **MODERATE FLAG** | Ingredients with known risks that are concentration and context dependent; manageable at low positions or low doses; concern proportionate to estimated position | "This ingredient warrants attention at higher concentrations. At its likely inclusion level in this formula, it represents a manageable concern rather than a disqualifier." |
| **LOW CONCERN / MONITOR** | Ingredients with minor or theoretical concerns under normal daily oral use; trace-level moderately flagged ingredients | "This ingredient is worth noting but presents a low concern at the concentrations expected in this formula." |
| **ACCEPTABLE** | Ingredients safe and functional for the labeled species at expected inclusion level and daily ingestion dose | State positively or neutrally. No warning language needed. |
**Calibration rules for dental gel:**
1. Never use DISQUALIFIED language for non-disqualifying ingredients
2. Never use HIGH CONCERN language for ingredients that are only moderate concern at detected/estimated position
3. Always pair a concern with its context: species, estimated concentration, and leave-on oral ingestion format
4. For position 15+ moderate ingredients: use MONITOR language maximum — never HIGH CONCERN
5. Standard preservatives at standard oral levels (potassium sorbate, sodium benzoate at position 10+): ACCEPTABLE language
6. Glycerin, sorbitol, carboxymethylcellulose: ACCEPTABLE language always
7. Propylene glycol in dogs at position 6+: ACCEPTABLE language — not a HIGH CONCERN for dogs at trace humectant levels
8. Zinc gluconate / zinc citrate at dental function concentrations: ACCEPTABLE language
9. Chlorhexidine ≤0.1%: LOW CONCERN safety note — not a moderate or high concern at this level
10. Daily ingestion format amplifies cumulative toxicity signals — factor this into severity calibration while maintaining proportionality
---
### EMBEDDED SPECIES PHYSIOLOGY REFERENCE — DENTAL GEL [MANDATORY]
| Parameter | Dog | Cat | Notes for Dental Gel |
|---|---|---|---|
| Oral pH (resting) | 7.5–8.5 | 7.5–8.0 | Species-appropriate gel pH: 7.0–8.5 |
| Salivary amylase | Absent/trace | Absent | Human-formula caries logic does not apply |
| Primary plaque bacteria | Gram-positive aerobes; anaerobes | Similar + Pasteurella | Target pathogen selection guided by species flora |
| Calculus formation rate | Very high | High | Calculus prevention = primary clinical target |
| Primary periodontal risk | Periodontal disease | Periodontal disease | Not caries — human toothpaste targets wrong pathology |
| Glucuronidation capacity | Normal | Severely limited | Cat oral products: heightened toxicity caution for all metabolized ingredients |
| Grooming/licking frequency | Moderate | Very high | Cat products: every applied ingredient is fully ingested; glucuronidation limitation amplifies all toxicity signals |
| Essential oil sensitivity (oral ingestion) | Moderate | Very high | Essential oils in cat dental products require individual species-specific ingestion safety clearance |
| Oral mucosa thickness | Standard | Thinner, more sensitive | Essential oil and antimicrobial penalties amplified in cat oral products |
| Small/toy breed dose amplification | Significant | N/A | Toy dog (2–5kg) receiving 1mL daily receives ~10× the mg/kg dose of large breed |
**Key formulation consequences for dental gel:**
- Species-appropriate oral gel pH: 7.0–8.5 (near-neutral to mildly alkaline) — reverse of skin algorithm pH
- Human toothpaste formulation logic (acid-caries prevention) is irrelevant for pets
- Calculus formation is the primary target, not caries
- Cat oral mucosa is thinner and more sensitive — all antimicrobial and essential oil penalties are amplified
- Cat glucuronidation limitation means ALL daily-ingested ingredients must be evaluated for glucuronidation-dependent metabolism risk
- Daily application × 365 days requires chronic toxicity consideration for every ingredient
- Small/toy breed amplification: ingredient safety must account for ~2–5kg body weight at daily oral ingestion dose
---
### INGESTION DOSE REALITY RULE
Typical application dose: 0.5–2 mL per application · Frequency: 1× daily · Annual cumulative: ~180–730 mL/year
Every ingredient must be evaluated for:
- Acute toxicity at 0.5–2 mL single dose
- Chronic toxicity under daily repeated ingestion
- Cumulative organ burden (liver, kidney, nervous system)
- Interaction effects between co-ingested ingredients
**Small/toy breed amplification**: A toy dog receiving 1 mL daily receives ~10× the mg/kg dose of a large breed dog. Ingredient safety must account for small-breed dose amplification at the scoring level.
---
## LAYER 1 — MANDATORY TOXICITY SCREEN [HIGHEST PRIORITY]
Fires before all other scoring. Any disqualifying ingredient results in Safety score ≤ 1.0 and Final Rating ceiling ≤ 1.5/5.0.
### CATEGORY I — MANDATORY DISQUALIFICATION (ANY SPECIES)
**Fluoride** (Sodium Fluoride, Stannous Fluoride, Sodium Monofluorophosphate):
- Canine LD50 significantly lower than human
- Acute toxicity risk at human toothpaste concentrations in daily pet oral use
- No justifiable benefit in species without caries risk
- **DISQUALIFIED in any pet dental product — no exceptions — no position or concentration mitigation**
**Xylitol** (in dog products):
- Causes severe hypoglycemia and acute hepatotoxicity in dogs
- Dose-dependent — any concentration is potentially lethal
- **DISQUALIFIED in any dog dental product — no exceptions**
- *Cat data*: Limited; precautionary avoidance warranted; flagged but not auto-disqualified for cats
**Chlorhexidine Gluconate >0.2%** in leave-on oral applications:
- Oral mucosal ulceration risk at sustained high concentration
- Significant staining and systemic risk at daily ingestion above 0.2%
- **DISQUALIFIED above 0.2% in leave-on dental gel format**
- At ≤0.1%: functional antimicrobial with LOW CONCERN safety note (not a disqualifier)
- At 0.1–0.2%: MODERATE FLAG — reduced score but not disqualified
**Alcohol (Ethanol >5%)** in leave-on oral products:
- Oral mucosa desiccation + systemic ethanol absorption
- **DISQUALIFIED above 5%**
- MODERATE FLAG at any level above 1% in leave-on format (not HIGH CONCERN below 3% — apply calibration rule)
**Sodium Lauryl Sulfate (SLS)** in leave-on oral products:
- Oral mucosal irritation; disrupts oral mucus layer; no cleansing benefit in leave-on
- Not auto-disqualified but mandatory Safety penalty
- Language: MODERATE FLAG — "SLS in leave-on dental gel represents a structural formulation concern for oral mucosal health under daily use."
---
### CATEGORY II — HIGH CONCERN (SPECIES-SPECIFIC)
**Tea Tree Oil** in any oral/dental application:
- Neurotoxic to cats at any ingestion dose → **DISQUALIFIED for cats in oral products** (H4 HASE classification — any position)
- Documented toxicity in dogs at sufficient ingestion dose
- In dog products at **position 1–10**: HIGH CONCERN — antimicrobial credit does not offset ingestion toxicity risk; daily ingestion amplifies exposure
- In dog products at **position 11+**: MODERATE FLAG — note the risk proportionate to likely dose; monitor-level concern at position 15+
**Hydrogen Peroxide** in leave-on pet dental products:
- At **≤0.5%** or **position 15+**: LOW CONCERN — low oral mucosal impact at this level
- At **0.5–1.5%** or **position 6–14**: MODERATE FLAG — noted concern for daily leave-on exposure
- **Above 1.5%** or **position 1–5**: HIGH CONCERN — mandatory Safety penalty; leave-on format inappropriate
**Thymol / Thyme Oil**:
- H1/H2 antimicrobial botanical but ingestion concern at higher concentrations
- In dog products at **position 1–8**: MODERATE FLAG — proportionate to likely dose; daily ingestion noted
- In dog products at **position 9+**: LOW CONCERN / MONITOR
- In cat products at **any position**: MODERATE FLAG — cats have limited metabolic capacity for thymol (glucuronidation limitation); daily ingestion amplifies concern
**Menthol / Peppermint Oil** in cat dental products:
- Feline sensitivity to menthol and peppermint via oral route; glucuronidation limitation relevant
- **Position 1–10 in cat products**: MODERATE FLAG — recommend avoidance
- **Position 11+ in cat products**: LOW CONCERN / MONITOR — trace level flagged proportionately
- In dog dental products: LOW CONCERN at diluted concentrations / trace positions
**Clove Oil / Eugenol**:
- Hepatotoxic at ingestion doses achievable with daily dental application in cats; glucuronidation limitation amplifies risk
- **DISQUALIFIED in cat oral products** (any position — cumulative daily ingestion concern; H4 HASE classification)
- In dog products at **position 1–8**: MODERATE FLAG
- In dog products at **position 9+**: LOW CONCERN / MONITOR
**Propylene Glycol**:
- **DISQUALIFIED in cat dental products** (Heinz body anemia risk under repeated oral ingestion; cat glucuronidation and metabolic limitation)
- In dog dental products at **position 1–5**: LOW CONCERN — generally tolerated; note inclusion
- In dog dental products at **position 6+**: ACCEPTABLE — standard humectant at expected trace levels
**Sodium Benzoate**:
- Cats have limited glucuronidation → reduced benzoate metabolism → risk under daily oral ingestion
- In cat products at **position 1–8**: MODERATE FLAG
- In cat products at **position 9+**: LOW CONCERN / MONITOR
- In dog products: ACCEPTABLE at standard concentrations
---
### CATEGORY III — MONITOR (CONCENTRATION-DEPENDENT)
- **Chlorhexidine ≤0.1%**: Functional with LOW CONCERN safety note — not a penalty at this level
- **Zinc Gluconate / Zinc Citrate**: Functional plaque inhibition; ACCEPTABLE at standard dental concentrations; daily ingestion monitoring appropriate for long-term use
- **Potassium Sorbate**: ACCEPTABLE at standard oral levels — standard preservative
- **Natural flavor extracts (species-cleared)**: ACCEPTABLE at palatability levels
- **Glycerin**: ACCEPTABLE and safe at all standard dental application doses
---
## LAYER 2 — ACTIVE INGREDIENT EFFICACY SYSTEM
### LEAVE-ON ACTIVE CREDIT RULE
Pet dental gel is leave-on. Active ingredients receive **FULL efficacy credit** — not the partial rinse-off credit applied in shampoo/soap algorithms. Contact time is sustained until cleared by food, water, or natural saliva clearance. This is the strongest active delivery format in this algorithm series.
---
### CATEGORY A — HIGH EFFICACY (FULL CREDIT)
**Enzymatic Actives**:
- Glucose Oxidase — generates H₂O₂ from glucose; antimicrobial mechanism
- Lactoperoxidase — activates thiocyanate antimicrobial cascade (LPOS system)
- Lysozyme — enzymatic bacterial cell wall disruption
- Lactoferrin — iron chelation; inhibits bacterial growth
- Mutanase — specific plaque glucan polysaccharide disruption
*Note*: LPOS system (Lactoperoxidase + Glucose Oxidase + Thiocyanate) has strongest veterinary evidence base. Enzyme systems require **functional concentration** for full credit — see Enzyme Concentration Integrity Rule below.
**Chemical Antimicrobials** (at safe concentrations):
- Chlorhexidine Gluconate ≤0.1%: targeted gram+/gram− antimicrobial; full credit
- Zinc Gluconate / Zinc Citrate: plaque inhibition + calculus reduction evidence; full credit
- Cetylpyridinium Chloride (CPC): substantive oral antimicrobial with veterinary context evidence
- Sodium Hexametaphosphate: calculus prevention via calcium chelation; full credit
- Triclosan: functional antimicrobial — **microbiome disruption concern noted; moderate selectivity penalty applied**
**Mechanical-Assist Actives**:
- Hydrated Silica (mild abrasive levels): mechanical plaque disruption via brushing — credit only where brushing is part of application
- Calcium Carbonate (mild abrasive): mechanical plaque removal — same brushing credit rule
---
### CATEGORY B — PARTIAL EFFICACY
- **Aloe Vera** (oral-grade, H2 botanical): mild anti-inflammatory; limited direct oral biofilm antimicrobial evidence → partial credit; position-adjusted per embedded position rule
- **Neem Extract** (oral-grade, dogs, H1 botanical): partial antimicrobial + anti-inflammatory credit; cat ingestion caution flag; full H1 credit if position 1–12 at plausibly functional level
- **Coenzyme Q10 (Ubiquinol)**: gum health support; some periodontal tissue evidence → partial credit
- **Green Tea Extract (EGCG)** (H1 botanical at functional levels): limited oral antimicrobial evidence at functional concentrations; full H1 credit only if position 1–12 and concentration plausibly functional; H3 credit at position 16+
- **Vitamin C (Sodium Ascorbate)**: gingival tissue support; partial anti-inflammatory credit
- **Baking Soda (Sodium Bicarbonate)**: mild abrasive + pH buffering; partial plaque disruption
- **Thymol ≤0.05%, dog-only** (H2 botanical): mild antimicrobial; ingestion concern limits credit to partial; position-adjusted per embedded position rule
- **Cranberry Extract** (H1 botanical): anti-adhesion mechanism (prevents plaque adherence); emerging evidence; partial credit
---
### CATEGORY C — DECORATIVE / LOW EFFICACY
- Vitamin E (topical oral — limited oral biofilm evidence) → H3 HASE notation
- Most herbal extracts without specific oral biofilm research → classify via embedded HASE above
- "Supergreen" additions (spirulina, chlorophyll) → H3 HASE notation
- Collagen (no oral structural benefit in gel format) → H3 HASE notation
- Hyaluronic Acid (limited oral mucosa evidence in gel) → H3 HASE notation
- Probiotics — emerging; no full credit without species-specific oral strain evidence and functional concentration
- Turmeric/Curcumin (H3 botanical: staining risk; limited oral biofilm evidence at gel concentrations)
*Marketing-heavy use of Category C ingredients triggers Ingredient Quality and Formulation Honesty penalties*
---
### ENZYME CONCENTRATION INTEGRITY RULE
| Scenario | Credit Applied |
|---|---|
| Enzyme listed in first 50% of ingredient list + manufacturer provides activity units (FIP, FCCL, etc.) | Full enzyme efficacy credit |
| Enzyme listed in first 50% without activity data | Partial credit (70%) |
| Enzyme listed in second 50% without activity data | Partial credit (40%) |
| "Enzyme blend" without individual enzyme identification | Minimal credit; Formulation Honesty penalty |
| Multiple enzymes at trace positions with no activity data | Decorative classification; Formulation Honesty penalty |
---
## LAYER 3 — ORAL pH COMPATIBILITY
Species-appropriate oral gel pH target: **7.0–8.5** (near-neutral to mildly alkaline)
| pH Range | Assessment | Scoring Effect |
|---|---|---|
| 7.0–8.5 | Species-optimal | Barrier Preservation bonus; Microbiome bonus |
| 6.5–7.0 | Acceptable — mildly sub-optimal | Neutral scoring |
| 6.0–6.5 | Mildly acidic — human formulation signal | Minor penalty |
| 5.5–6.0 | Acidic — oral mucosa concern | MODERATE FLAG |
| <5.5 | Highly acidic — oral mucosal disruption risk | HIGH CONCERN; disqualified for cat oral use |
| >8.5 | Over-alkaline | Minor penalty; monitor |
| Unknown | No bonus | Minor credibility note |
**Note**: This is the reverse of skin algorithm pH. Human dental pH standards do not apply to pet oral products.
---
## LAYER 4 — ANTIMICROBIAL SELECTIVITY RULE
### CORE PRINCIPLE
Effective pet dental gels target oral pathogens while preserving beneficial commensal oral bacteria. Broad-spectrum systems that eliminate the entire oral microbiome are penalized.
**Primary oral pathogens to target**: Porphyromonas gulae · Tannerella forsythia · Treponema denticola · Fusobacterium nucleatum · Prevotella intermedia
**Beneficial commensals to preserve**: Streptococcus salivarius · Veillonella spp. · Actinomyces spp. (low-pathogenic forms) · Nitrate-reducing bacteria
| Antimicrobial System | Selectivity | Scoring |
|---|---|---|
| LPOS enzyme system | High selectivity — works with oral microbiome chemistry | Full credit |
| Zinc-based system | Moderate selectivity | Good credit |
| Chlorhexidine ≤0.1% | Moderate-low — broad but low dose | Credit with note |
| CPC | Moderate spectrum | Credit with note |
| Triclosan | Low selectivity | Microbiome penalty |
| Essential oil antimicrobials at high position | Low + species toxicity concern | Dual penalty |
| No antimicrobial active | No selectivity penalty; Effectiveness penalty | — |
---
## LAYER 5 — HUMECTANT AND BASE SYSTEM
| Ingredient | Safety Profile | Role | Score |
|---|---|---|---|
| Glycerin (Glycerol) | ACCEPTABLE — all species | Humectant, base, palatability | Full credit |
| Sorbitol | ACCEPTABLE — all species | Humectant, mild sweetener | Full credit |
| Propylene Glycol (dogs only) | LOW CONCERN in dogs at position 6+ | Humectant | Partial credit; cat-disqualified |
| Xylitol | DISQUALIFIED for dogs | — | Disqualification |
| PEG (standard levels) | LOW CONCERN | Base/humectant | Partial credit; LOW CONCERN note |
| Carboxymethylcellulose | ACCEPTABLE | Gelling agent | Full credit |
| Hydroxyethylcellulose | ACCEPTABLE | Gelling agent | Full credit |
| Carbomer | ACCEPTABLE at standard oral levels | Gelling agent | Full credit |
### FLAVORING SYSTEM
Flavor is a legitimate functional component — compliance depends on palatability.
- Natural meat/poultry flavors: ACCEPTABLE
- Sorbitol sweetening: ACCEPTABLE
- Artificial sweeteners (except Sorbitol): evaluated individually; xylitol disqualified
- Essential oil-based flavors: species safety applies (cat products flagged per embedded species physiology rule; position-adjusted per embedded position rule)
- "Natural flavors" without specification: LOW CONCERN note — minor transparency reduction
- **Flavor-first formulation with inadequate antimicrobial architecture**: Formulation Honesty penalty
---
## LAYER 6 — MICROBIOME IMPACT RULE (ORAL-SPECIFIC)
**High oral microbiome disruption risk**:
- Chlorhexidine >0.2% (disqualified anyway)
- Triclosan (broad-spectrum, persistent)
- High-concentration essential oil antimicrobials at position 1–8
- Highly acidic formulas (pH <6.0)
- Daily broad-spectrum antimicrobials without selectivity
**Low oral microbiome disruption risk**:
- LPOS enzyme systems (works *with* oral microbiome chemistry)
- Zinc-based systems at functional concentrations
- Near-neutral pH formulation
- Targeted narrow-spectrum antimicrobials
- Prebiotic/probiotic additions with species-appropriate oral strains
**Clinical weight note**: Oral microbiome disruption carries more clinical weight than skin microbiome disruption because periodontal bacteria entering the bloodstream have direct cardiovascular and renal implications in pets.
---
## LAYER 7 — CORE SCORING SYSTEM (Score Range: 1.0–5.0)
### SAFETY [Weight: 0.35 — Dominant]
Evaluates: Mandatory toxicity screen outcomes · Ingestion safety at daily application dose · Oral mucosal irritation potential · Systemic toxicity under chronic daily ingestion · Antimicrobial selectivity · pH oral mucosal compatibility · Essential oil oral ingestion safety (species physiology rule applied — cat glucuronidation limitation amplifies all toxicity signals) · Preservative safety under daily oral ingestion · Cumulative organ burden · Species metabolic pathway limitations · Small/toy breed dose amplification
**Rules**:
- Fluoride any concentration = Safety floor 1.0; Final Rating ceiling 1.5
- Xylitol in dog = Safety floor 1.0; Final Rating ceiling 1.5
- Safety overrides all efficacy, palatability, and marketing positioning
- Cat products evaluated at higher Safety scrutiny (glucuronidation, high grooming/ingestion frequency, oral mucosa sensitivity — per embedded species physiology)
- Penalty language calibration rule applies (embedded above)
### EFFECTIVENESS [Weight: 0.22]
Core question: Does the dental gel demonstrably reduce plaque biofilm, inhibit calculus formation, and support periodontal tissue health under daily use?
Evaluates: Antimicrobial active architecture · Enzyme system functional integrity (per Enzyme Concentration Integrity Rule) · Mechanical active contribution · Plaque adhesion inhibition · Calculus prevention · Gingival tissue support · Leave-on contact time delivery · Evidence quality for specific actives in pet oral health context · HASE tier applied to all botanical actives
### ALLERGY RISK [Weight: 0.15]
Evaluates: Flavor sensitization potential · Essential oil sensitization via daily oral mucosa exposure (position-adjusted per embedded position rule) · Preservative sensitizer load · Botanical allergen exposure via daily ingestion (HASE-classified) · Colorant sensitization · Repeated-use accumulation under daily oral application
### ECO IMPACT [Weight: 0.08]
Evaluates: Synthetic ingredient persistence · Triclosan environmental accumulation · Packaging sustainability · Ingredient sourcing (animal-derived enzymes) · Preservative ecological load
### INGREDIENT QUALITY [Weight: 0.10]
Evaluates: Antimicrobial system coherence · Enzyme activity evidence (per Enzyme Concentration Integrity Rule) · Active-to-base ratio · Absence of decorative active inflation · Species-appropriate selection · Transparency about active concentrations · HASE tier of botanical ingredients (H1 bonus; H3 stacking note; H4 penalty)
### ORAL COMFORT & MUCOSAL COMPATIBILITY [Weight: 0.10]
Evaluates: Oral mucosa tolerance under daily application · Gingival tissue compatibility (cat mucosa thinner — amplified sensitivity per embedded species physiology) · Post-application oral comfort · Salivary stimulation vs suppression · Long-term oral tissue tolerance · Mucosal hydration support · Species-appropriate flavoring supporting compliance
### CORE SCORE FORMULA
\`\`\`
Core Score = (Safety × 0.35) + (Effectiveness × 0.22) + (Allergy Risk × 0.15) +
             (Eco Impact × 0.08) + (Ingredient Quality × 0.10) +
             (Oral Comfort & Mucosal Compatibility × 0.10)
\`\`\`
---
## LAYER 8 — SPECIALIZED DENTAL GEL PERFORMANCE (Score Range: 1.0–5.0)
### PLAQUE BIOFILM DISRUPTION
Evaluates: Active ingredient mechanism against plaque biofilm · Enzyme disruption of biofilm polysaccharide matrix · Antimicrobial biofilm penetration · Anti-adhesion activity (cranberry H1 botanical credited) · Leave-on contact time utilization · Evidence quality for specific actives · HASE tier of botanical actives contributing to biofilm disruption · Position-adjusted efficacy credit per embedded position rule
**Rules**: Surface-only fragrance/flavoring provides no biofilm disruption. Mechanical abrasive credit applies only where brushing is part of application method.
### CALCULUS INHIBITION
Evaluates: Calcium-chelating agents (Sodium Hexametaphosphate, polyphosphates) · Crystal growth inhibitors · Zinc salts (inhibit calculus mineralization) · pH influence on salivary calcium precipitation · Evidence for calculus rate reduction in pet dental gel format
**Rules**: Calculus formation is the primary oral health threat in dogs and cats — this dimension is highly weighted. Antimicrobial actives alone do not prevent calculus without chelating/inhibiting agents. "Reduces tartar" claims require Category A calculus-active for full credit.
### GINGIVAL TISSUE SUPPORT
Evaluates: Anti-inflammatory actives (CoQ10, Vitamin C, Aloe — at functional concentrations per embedded position rule) · Tissue repair support · Reduction of gingival inflammation · Antimicrobial gingivitis prevention · Leave-on contact time maximizing gingival benefit
**HASE note**: H1 anti-inflammatory botanicals at functional positions receive full gingival credit. H2 anti-inflammatory botanicals receive partial gingival credit. Cat oral mucosa thinner — gingival ingredient safety amplified per embedded species physiology.
### ANTIMICROBIAL EFFICACY
Evaluates: Spectrum of antimicrobial coverage · Targeted pathogen reduction · Duration of antimicrobial activity post-application · Resistance development risk · Biofilm penetration depth · Evidence quality (in vitro vs in vivo vs clinical pet trial) · HASE classification of all botanical antimicrobials
**Rules**: Enzyme-based systems (LPOS) have strongest evidence in veterinary context. "Natural antimicrobials" require evidence specific to oral bacterial species — general antimicrobial activity insufficient for full credit. H1 botanical antimicrobials at functional positions receive full credit equivalent to synthetic counterparts where species safety profile allows.
### ORAL MICROBIOME COMPATIBILITY
Evaluates: Commensal oral bacteria preservation · Pathogen-selective vs broad-spectrum impact · pH-mediated microbial stability · Long-term microbiome recovery between applications · Systemic microbiome consequences of daily oral antimicrobial ingestion (GI flora impact) · Cat-specific microbiome considerations under repeated daily antimicrobial ingestion
### BREATH ODOR REDUCTION
Evaluates: Antimicrobial mechanism reducing VSC-producing bacteria · Zinc-based VSC binding chemistry · Sodium Bicarbonate pH buffering of volatile sulfur compounds · Active mechanism vs fragrance masking · Evidence for sustained odor reduction
**Rules**: True halitosis reduction requires targeting VSC-producing anaerobes — antimicrobial architecture, not fragrance. Fragrance/mint masking = cosmetic note only, no antimicrobial credit.
### SAFETY UNDER DAILY INGESTION [Primary Safety Override]
Evaluates: Cumulative daily dose toxicity · Organ burden trajectory under 365-day exposure · Species-specific metabolic capacity (cat glucuronidation limitation mandatory factor per embedded species physiology) · GI tolerance · Ingredient interaction effects · Puppy/kitten heightened vulnerability · Body-weight-adjusted dose (small breed amplification per embedded species physiology — toy breeds at ~10× mg/kg dose vs large breeds)
| Scenario | Score |
|---|---|
| All ingredients confirmed safe at oral ingestion dose for species | 4.5–5.0 |
| Minor ingredients with low-level daily concern flagged | 3.5–4.5 |
| Propylene Glycol in dog product (low concern acceptable range) | 3.5–4.0 |
| Moderate-risk essential oils at trace/low position in dog products | 3.0–3.8 |
| Chlorhexidine 0.1–0.2% daily ingestion | 2.5–3.2 |
| Moderate essential oils at functional position in cat products | 2.0–2.8 |
| Xylitol in cat product (precautionary concern) | 1.5–2.0 |
| Any disqualifying ingredient present | 1.0 (floor) |
### FORMULATION HONESTY
Evaluates: "Cleans without brushing" overstatement · Enzyme marketing without functional concentration evidence · "Natural = safe for pets to swallow" false framing in oral context (H4 HASE classification applied per embedded HASE) · Decorative active loading marketed as functional · "Vet-recommended" without substantiation · Probiotic marketing without species-specific oral strain evidence · Proprietary blend concealment · Flavor marketed as oral health mechanism · "Whitening" without abrasive or bleaching active · VOHC claims · H4 "natural/botanical" framing of species-toxic ingredients must be explicitly called out
**VOHC Rule**:
- Current VOHC seal = Formulation Honesty bonus (verified by independent standard)
- Expired or uncertified VOHC claim = Formulation Honesty penalty
- No VOHC seal = neutral (not penalized unless product makes clinical claims without it)
### SPECIALIZED PERFORMANCE SCORE
\`\`\`
Specialized Score = Average of:
  Plaque Biofilm Disruption + Calculus Inhibition + Gingival Tissue Support +
  Antimicrobial Efficacy + Oral Microbiome Compatibility + Breath Odor Reduction +
  Safety Under Daily Ingestion + Formulation Honesty
  (÷ 8)
\`\`\`
---
## LAYER 9 — FINAL RATING
\`\`\`
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
\`\`\`
### DISQUALIFICATION CEILING
Products with disqualifying ingredients: **Final Rating maximum 1.5/5.0**
Disqualifying ingredients:
- Fluoride (any form, any concentration, any species)
- Xylitol (in dog products)
- Tea Tree Oil (in cat oral products)
- Chlorhexidine >0.2% (leave-on oral)
- Ethanol >5% (leave-on oral)
### HIGH SCORE ELIGIBILITY (>4.0)
Requires: No disqualifying ingredients · All ingredients safe for daily oral ingestion per embedded species physiology · Category A antimicrobial at functional concentration · pH 7.0–8.5 · No broad-spectrum oral dysbiosis risk · Enzyme system with activity evidence (if enzyme-based) · Formulation Honesty ≥ 3.5 · Species labeling accurate · No H4 botanical greenwash present
---
## LAYER 9.5 — REAL-WORLD USAGE SIMULATION
Simulate: Daily application × 365 days · Long-term oral microbiome stability under daily antimicrobial exposure · Gingival tissue response to sustained contact · Calculus inhibition progression over 3–6 months · Behavioral compliance (palatability affects long-term consistency) · Small breed vs large breed dose amplification (per embedded species physiology — toy breed receives ~10× mg/kg dose) · GI tolerance of daily gel ingestion · Cat glucuronidation burden under 365-day daily ingestion of metabolized ingredients
**Core question**: Can this dental gel remain safe and effective under daily lifelong oral application without cumulative toxicity, oral dysbiosis, or GI burden?
---
## LAYER 10 — ANTI-MARKETING AND BIAS FILTERS
**Anti-marketing penalties**:
- "Cleans without brushing" overstatement
- "Natural ingredients = safe to swallow" ignoring species toxicity
- Enzyme marketing without concentration evidence
- "Probiotic dental gel" without species-specific oral strain evidence
- "Freshens breath" marketed as antimicrobial efficacy
- VOHC-adjacent claims without certification
**Bias neutralization**:
- Palatability ≠ efficacy
- "Natural = ingestion-safe" illusion — H4 HASE classification applies to harmful natural ingredients
- Enzyme presence ≠ enzyme function
- Green/herbal ≠ gentle for oral use
- No-brushing ≠ equivalent to brushing
- Foam = cleaning action illusion

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

# 🦷 DENTAL GEL PROFILE

## Functional Classification

Short classification.

Examples:
- Enzyme-Based Veterinary Dental Gel (LPOS System)
- Chlorhexidine Medicated Dental Gel
- Zinc-Based Plaque Inhibiting Gel
- Flavor-First Low-Active Dental Gel
- Disqualified — Fluoride-Containing Pet Dental Product
- Botanical Dental Gel (Moderate Active Evidence)

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering primary antimicrobial mechanism and active category, ingestion safety status for target species, oral pH compatibility, enzyme system integrity if applicable, long-term oral and systemic safety behavior, and overall formulation balance.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in easy language. Mention why it scored as it did.

### Effectiveness — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Allergy Risk — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Eco Impact — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Ingredient Quality — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Oral Comfort & Mucosal Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

# 🧪 SPECIALIZED PERFORMANCE

## Oral Health Performance Analysis

### Plaque Biofilm Disruption — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Calculus Inhibition — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Gingival Tissue Support — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Antimicrobial Efficacy — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Oral Microbiome Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Breath Odor Reduction — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Safety Under Daily Ingestion — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Formulation Honesty — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Weaknesses

- Main structural concern
- Main structural concern
- Main structural concern

---

# 🐶🐱 SPECIES COMPATIBILITY

## Species-Specific Assessment

### Dogs — ⭐X.X

Short explanation.

### Cats — ⭐X.X

Short explanation.

### Puppies / Kittens — ⭐X.X

Short explanation.

### Small / Toy Breeds — ⭐X.X

Short explanation.

### Senior Pets — ⭐X.X

Short explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use (Recommended Protocol) — ⭐X.X

Short explanation.

### Every Other Day — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Palatability and compliance
- Oral comfort signals
- Breath odor change

## Medium-Term (4–8 Weeks)

- Plaque reduction trajectory
- Gingival tissue response
- Calculus formation rate change
- GI tolerance signals

## Long-Term (3–12 Months)

- Periodontal disease progression or prevention
- Oral microbiome stability
- Systemic safety signals under daily ingestion
- Calculus buildup rate vs gel-free baseline

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting antimicrobial mechanism, plaque and calculus inhibition, oral mucosa safety and comfort, ingestion safety (disqualifying or high-concern ingredients flagged), flavor and compliance system, and long-term oral and systemic outcome.

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

3–5 concise user-friendly evidence-based sentences.

---

# 🚨 DISQUALIFICATION NOTICE

## Species Safety Disqualification

*(Include ONLY when a disqualifying ingredient is present.)*

Clear statement identifying the disqualifying ingredient, why it is disqualified for this species, and that the product should not be used regardless of other formulation qualities.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL OR VETERINARY CLAIMS ANYWHERE
- No marketing influence on scoring
- Disqualifying ingredients must be stated prominently — not buried in ingredient lists
- Fluoride and xylitol presence must trigger visible warning regardless of concentration
- No flavor or palatability bias in efficacy scoring
- No "natural = safe to ingest" assumption
- Enzyme system must be evaluated for concentration integrity, not just presence
- Species-appropriate oral pH must be assessed — human dental pH standards do not apply
- Daily ingestion cumulative burden must be evaluated — not single-dose only
- Antimicrobial selectivity must be assessed — broad-spectrum is not a virtue in oral microbiome context
- Leave-on format means full active efficacy credit AND full ingestion safety demand — both enforced
- Small breed dose amplification must be noted when relevant
- VOHC certification status must be stated if determinable
- Brushing mechanical credit only applies where brushing is part of the application method
- Breath freshening via fragrance ≠ antimicrobial efficacy — always scored separately
- Absolute disqualification ceiling: 1.5 / 5.0 enforced without exception for disqualifying ingredient products
- Natural ≠ automatically safer
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

*Pet Dental Gel Evaluation Algorithm — Structured for canine and feline oral health ingredient analysis, antimicrobial mechanism assessment, ingestion safety evaluation, and long-term periodontal outcome behavior. All scoring is structural and evidence-informed.*

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
              "You are a strict pet dental gel structural evaluation engine."
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
    console.log("\n=========== RAW AI RESPONSE ===========\n");
console.log(result);
console.log("\n=======================================\n");

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new ClinicalEngine();