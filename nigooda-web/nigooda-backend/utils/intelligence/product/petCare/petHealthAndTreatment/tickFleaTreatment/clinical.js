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
        "TICKFLEATREATMENT ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
# ALGORITHM 5 — PET FLEA / TICK TREATMENT — V4.0
# FULLY SELF-CONTAINED — ALL ENGINES EMBEDDED
# ═══════════════════════════════════════════════
---
## LAYER 0 — FOUNDATION ENGINE
### SYSTEM OBJECTIVE
Reward flea/tick treatments that demonstrate:
- Genuine, evidence-supported parasite elimination and prevention
- Species-appropriate active ingredient safety at realistic exposure
- Adequate residual efficacy duration for labeled claim
- Appropriate spectrum coverage without overclaiming
- Safe handler and environmental exposure profile
- Resistance-aware formulation design
- Honest format-specific efficacy representation
- Low cumulative toxicity burden for pet and handler
Mandatory penalties apply for: Active ingredients acutely toxic to labeled or co-housed species · Permethrin in any cat-labeled or multi-species product · Efficacy claims exceeding residual duration evidence · Spectrum claims for parasites not covered by active mechanism · Format-inappropriate efficacy claims · Resistance-blind formulation with no rotation guidance · Aquatically toxic actives without environmental safety context · Organophosphate/carbamate actives · Botanical repellents presented as equivalent to regulatory-approved synthetic actives
---
### TRANSPARENCY PRIORITY RULE
**Ignore**: Branding · Fragrance freshness on treated coat · "Natural/herbal/essential oil" marketing alone · Ingredient-count inflation
**Evaluate only**: Active ingredient mechanism and spectrum · Residual efficacy duration vs labeled claim · Species toxicity profile (pet + handler + co-housed animals) · Format-appropriate exposure kinetics · Resistance status · Environmental contamination risk · Evidence quality for efficacy claims
---
### GLOBAL ENFORCEMENT RULES
- Active ingredient chemistry is the dominant treatment structure
- Species toxicity penalties override all efficacy bonuses
- Permethrin in cat products is an absolute disqualifier — no exceptions
- Residual efficacy duration must be evidence-supported, not marketing-stated
- Spectrum claims must match active mechanism
- Resistance risk of active class must be assessed
- Aquatic toxicity of pyrethroids is a mandatory eco penalty
- Human handler safety is a required dimension for all topical products
- Oral products have a different safety and efficacy profile from topical — format-matched scoring applies
- "Natural" label does not reduce toxicity or improve efficacy
---
### STRUCTURE DOMINANCE RULE
Primary active ingredient(s) determine: Parasite kill and repellent mechanism · Species safety window · Residual efficacy duration · Spectrum coverage · Resistance risk · Environmental contamination load · Handler exposure profile · Co-housed animal risk
Excipients, botanicals, fragrances, and conditioning agents cannot override a poorly designed active system.
---
### FORMAT CLASSIFICATION [MANDATORY PRE-EVALUATION]
| Format | Contact Time | Residual Mechanism | Primary Safety Concern |
|---|---|---|---|
| Spot-on (topical systemic) | Absorbed transdermally | Systemic or coat distribution | Dermal absorption; licking before dry |
| Collar | Continuous wear | Slow-release matrix | Cumulative dermal absorption; child contact |
| Oral (chewable/tablet) | Systemic, GI absorbed | Systemic bloodstream | GI tolerance; active systemic load |
| Spray (topical) | Coat surface | Surface residue | Inhalation during application; licking |
| Shampoo (rinse-off) | ~5–10 min | No residual after rinse | Short efficacy window |
| Powder | Coat surface | Surface residue | Inhalation; environmental dispersal |
| Dip | Full-body contact | Surface + mild systemic | High active concentration; handler exposure |
---
### SPECIES APPLICABILITY RULE
Every formula must be classified before scoring:
- Dog-only product
- Cat-safe product
- Multi-species (most restrictive species governs)
- Small animal/exotic (highly restrictive)
- Puppy/kitten formulation (reduced dose tolerance)
**Co-housed animal rule**: If a dog product contains permethrin, pyrethrin, or high-concentration essential oil actives, and a cat is present in the household → mandatory Risk Warning flag under Concerns, regardless of product label.
---
### EMBEDDED INGREDIENT CONCENTRATION & POSITION RULE [MANDATORY — FLEA/TICK TREATMENT]
**RULE 1 — EXPLICIT CONCENTRATION STATED**
Evaluate at exact stated concentration; do not default to worst-case assumptions.
**RULE 2 — NO CONCENTRATION STATED (POSITION-BASED EVALUATION)**
| Position in List | Estimated Concentration Range | Evaluation Approach |
|---|---|---|
| 1st–3rd ingredient | Very high (dominant active/base) | Full safety + efficacy weight applied |
| 4th–8th ingredient | Moderate-high (functional level likely) | Standard safety + moderate efficacy credit |
| 9th–15th ingredient | Low-moderate (supporting/functional) | Proportional credit; reduced penalty for moderate-concern items |
| 16th–20th ingredient | Low (trace to minor functional) | Minimal penalty for moderate-concern items; decorative credit for actives |
| 20th+ ingredient | Trace level | Monitor-only flag for moderate concerns; no penalty for low-concern items |
**RULE 3 — PENALTY PROPORTIONALITY BY POSITION**
- Position 1–5 + moderate concern → Full moderate penalty
- Position 6–12 + moderate concern → Reduced penalty (50%)
- Position 13+ + moderate concern → Monitor flag only
- Disqualifying actives → Position does not reduce penalty
**RULE 4 — WHAT POSITION CANNOT EXCUSE IN FLEA/TICK TREATMENTS**
- Permethrin at any position in cat-labeled or multi-species products — absolutely disqualifying
- Organophosphate/carbamate actives (TCVP, propoxur, chlorpyrifos, dichlorvos) at any position — absolutely disqualifying
- Pennyroyal oil at any position in any species — absolutely disqualifying
- Spectrum claims that do not match active mechanism — position of excipients cannot rescue a false efficacy claim
*V4.0 Application to flea/tick actives*: Permethrin at any position in a cat product = DISQUALIFIED (position is irrelevant). Fipronil at position 1 = full Tier 3 credit. Botanical essential oil at position 3 = Tier 5 classification; full species toxicity evaluation applies. Essential oil at position 15 in a dog spray = LOW CONCERN / MONITOR for toxicity; still Tier 5 efficacy classification (position does not upgrade efficacy tier).
*Application to flea/tick botanicals (HASE)*: Neem/azadirachtin at position 1–5 in a dog product = H1 IGR credit eligible. Neem at position 15 = H3 level effective credit only. Clove oil at any position in cat product = H4 DISQUALIFIED regardless of position.
*Application to flea/tick excipients*: Colorant/dye at position 18 in a chewable = MODERATE FLAG (Allergy Risk penalty); no escalation to HIGH CONCERN. Natural palatant (chicken flavor, yeast) at position 5–10 = ACCEPTABLE.
---
### EMBEDDED HERBAL AUTHENTICITY SCORING ENGINE (HASE) — FLEA/TICK TREATMENT [MANDATORY]
Every botanical ingredient must be classified H1–H4 before scoring. Efficacy and toxicity are evaluated independently.
**TIER H1 — EVIDENCE-BACKED BOTANICAL ACTIVES (FLEA/TICK TREATMENT CONTEXT)**
- Neem oil / azadirachtin: documented IGR-like mechanism (molt disruption, anti-feeding); partial ectoparasite evidence — H1 credit = partial Tier 5 IGR efficacy credit; dog-safe at topical concentrations; position must be 1–8 for functional credit; cat safety limited
- Lemon eucalyptus PMD (p-Menthane-3,8-diol): CDC-recognized repellent; clinical evidence for mosquito and some tick repellency — H1 repellent credit applicable; species safety check required; not equivalent to synthetic adulticide
Scoring impact: Partial efficacy credit within Tier 5 (H1 dominant Tier 5 ceiling = 3.0 vs standard Tier 5 ceiling of 2.5) · HASE bonus +0.2 Ingredient Quality · Species safety still assessed independently
**TIER H2 — FUNCTIONAL TRADITIONAL BOTANICAL (FLEA/TICK TREATMENT CONTEXT)**
- Cedarwood oil at appropriate species-safe concentrations in dog products: traditional repellent use, plausible mechanism — H2 partial Tier 5 repellent credit; cat: evaluate toxicity
- Geraniol at species-safe concentrations in dog products: some repellent evidence — H2 partial credit; cat: MODERATE FLAG
- Citronellol: traditional repellent use — H2 partial credit for dogs; cat: evaluate species safety
- Rosemary oil at low position in dog spray: traditional repellent — H2 limited credit; cat: MODERATE FLAG
Scoring impact: Partial functional credit (50%) within Tier 5 · H2 at position 15+ = monitoring-level credit only
**TIER H3 — COSMETIC BOTANICAL / NO ANTIPARASITIC FUNCTION (FLEA/TICK TREATMENT CONTEXT)**
- Lavender oil added "for calming" — no flea control mechanism
- Aloe vera in a flea shampoo — no ectoparasite activity
- Chamomile extract in a tick spray — no tick control mechanism
- "Natural botanical blend" of floral extracts without repellent activity
- Vitamin E in a spot-on
Scoring impact: No efficacy credit · No penalty if not marketed as antiparasitic · Formulation Honesty penalty if marketed as contributing to flea/tick control
**TIER H4 — GREENWASH BOTANICAL (HARMFUL + "NATURAL" FRAMING) (FLEA/TICK TREATMENT CONTEXT)**
*V4.0 Note*: H4 in flea/tick treatment at leave-on concentrations is severe because these products are applied at higher essential oil concentrations than cosmetic products and are designed to remain on the coat. H4 applies where (a) established species toxicity exists at achievable flea/tick product concentrations, (b) licking/grooming pathway is realistic, and (c) misleading natural framing is present.
- Tea tree oil in cat flea spray marketed as "natural antimicrobial flea repellent" — H4 (neurotoxic to cats; leave-on format; licking risk; any position)
- Pennyroyal in any pet flea product marketed as "natural flea repellent" — H4 ABSOLUTE DISQUALIFIER ALL SPECIES
- Clove oil / eugenol in cat flea products marketed as "natural" — H4 (hepatotoxic in cats at leave-on concentrations)
- Thyme oil in cat flea products marketed as "natural botanical flea control" — H4
- Eucalyptus oil in cat/all-pet flea spray marketed as "natural freshening flea deterrent" — H4
- High-concentration essential oil blends in "all-natural" multi-species products without species safety disclosure — H4
- Citrus oil (d-Limonene) in cat products — H4
Scoring impact: Full species toxicity penalty · HASE penalty: −0.3 Formulation Honesty · HASE penalty: −0.2 Ingredient Quality · Leave-on format amplifies H4 severity · "Natural = safe" framing explicitly called out
**TIER H5 — FLEA/TICK SPECIFIC BOTANICAL SUBCLASS**
Some botanical actives in flea/tick products have both an ectoparasite mechanism AND a species toxicity concern simultaneously:
- Neem (azadirachtin): H1 ectoparasite mechanism + ACCEPTABLE dog safety + LIMITED cat safety data → H1 with cat monitor note
- Tea tree: NO ectoparasite mechanism evidence + HIGH cat toxicity → H4 in cat products; H3/H4 in dog products at high position
- Pennyroyal: Weak repellent mechanism + HIGH toxicity all species → H4 absolute disqualifier
- Lemon eucalyptus PMD: H1 repellent mechanism + ACCEPTABLE dog safety + cat safety caution → H1 for dogs; evaluate cats separately
**HASE APPLICATION RULES — FLEA/TICK TREATMENT**
1. Every botanical classified H1–H4 before scoring
2. Species context mandatory
3. Position matters for H2 and H3
4. H4 position cannot reduce penalty for feline neurotoxic or universally toxic botanicals
5. Efficacy tier and HASE tier are independent
6. Formulation Honesty penalty always applies when H4 botanicals framed as "natural and safe"
7. V4.0: H4 requires realistic toxicity at achievable flea/tick product concentrations; theoretical-only concerns at trace positions may use H2/H3 with monitor note
**HASE OUTPUT NOTATION (FLEA/TICK TREATMENT)**
\`[H1 — Evidence-Backed Repellent/IGR]\` · \`[H2 — Traditional Repellent]\` · \`[H3 — Cosmetic/No Antiparasitic Function]\` · \`[H4 — Greenwash Risk / Species Toxic]\`
---
### EMBEDDED PENALTY LANGUAGE CALIBRATION RULE [MANDATORY — FLEA/TICK TREATMENT]
| Concern Level | When to Use | Example Output Language |
|---|---|---|
| **DISQUALIFIED** | Permethrin in cat/multi-species products; organophosphate/carbamate actives; pennyroyal at any concentration in any species; unlabeled species on systemic high-potency product | "This ingredient disqualifies the product for this use context regardless of any other formulation quality. This product must not be used as labeled." |
| **HIGH CONCERN** | Organophosphates/carbamates in any product; permethrin dog product in confirmed cat-owning household; Tier 4 actives; botanical neurotoxin in cat leave-on at functional position | "This ingredient/class raises a significant safety concern under regular use for [species/handler]. We strongly recommend avoiding this product in this household context." |
| **MODERATE FLAG** | Fipronil resistance documentation; isoxazoline neurological precaution for seizure-prone dogs; high-concentration pyrethroid with standard handler precautions; artificial colorants; moderate-risk botanical at functional position in dog product | "This characteristic warrants attention and should be discussed with a veterinarian before use in susceptible animals. It represents a manageable concern for most healthy animals under standard precautions." |
| **LOW CONCERN / MONITOR** | Isoxazoline neurological precaution for standard healthy dogs (not seizure-prone); moderate-risk essential oil excipient at trace position in dog product; standard pyrethroid handler precaution; mild palatant allergy risk | "This characteristic is worth noting but presents a low concern for most healthy animals under labeled use conditions." |
| **ACCEPTABLE** | Tier 1 isoxazoline actives in appropriate species; natural palatants/flavors in oral products; standard excipients at functional positions; H1 botanical IGR at appropriate position | State positively or neutrally. |
**V4.0 Calibration rules for flea/tick treatment:**
1. Isoxazoline neurological precaution for standard healthy dogs = LOW CONCERN / MONITOR — not MODERATE FLAG catastrophizing; MODERATE FLAG only for dogs with known seizure history
2. "Tick must attach before kill" for systemic isoxazolines = biological reality note, NOT a safety concern — state factually
3. Fipronil resistance = Effectiveness moderate ceiling note — not a safety concern; do not conflate resistance with toxicity
4. Pyrethroid aquatic toxicity = mandatory Eco penalty with MODERATE FLAG language — not HIGH CONCERN for the pet owner's safety directly
5. Organophosphate/carbamate actives = HIGH CONCERN and DISQUALIFIED language — unambiguously warranted
6. Permethrin in dog product with co-housed cat = HIGH CONCERN — co-housing risk is genuine and severe
7. Artificial colorants = MODERATE FLAG (Allergy Risk) — not HIGH CONCERN
8. Natural palatant in oral chewable = ACCEPTABLE
9. Where evidence for a concern is only theoretical or emerging: use "limited evidence" or "theoretical concern" language
---
### EMBEDDED SPECIES PHYSIOLOGY REFERENCE — FLEA/TICK TREATMENT [MANDATORY]
| Parameter | Dog | Cat | Rabbit / Small Animals | Notes for Flea/Tick Treatment |
|---|---|---|---|---|
| Skin SC layers | 3–5 | 4–6 | Very thin | Thinner than human; topical active absorption amplified |
| Glucuronidation capacity | Normal | Severely limited | Limited | Cat: topical active dermal absorption + grooming ingestion = dual exposure pathway; glucuronidation limitation = reduced systemic clearance |
| Grooming/licking frequency | Moderate | Very high | High | Cat: spot-on or spray actives are licked off coat; pre-dry spot-on licking risk very high |
| Pyrethroid sensitivity | Moderate tolerance | **Acutely and severely sensitive — potentially lethal** | Sensitive | Permethrin causes severe neurotoxicity in cats at dog-labeled doses; even small dermal transfer from treated dog coat can be lethal |
| Essential oil sensitivity (topical leave-on) | Moderate | Very high | High | Essential oil-based flea products in cats: dermal absorption + grooming ingestion + glucuronidation limitation = severe cumulative toxicity risk at functional concentrations |
| MDR1/ABCB1 mutation (herding breeds) | Relevant for macrolide actives | N/A | N/A | Collies, Australian Shepherds, Shelties, etc.: macrolide sensitivity — CNS toxicity at doses safe for non-MDR1 dogs |
| Body weight dose amplification | Significant for toy breeds | Significant | Very significant | Small body weight = higher mg/kg active dose at labeled application volume |
| Aquatic exposure after bathing | Significant | Less frequent bather | Less frequent | Pyrethroid contamination of waterways from bathing treated dogs is a major environmental vector |
**Key formulation consequences for flea/tick treatment:**
- Cat pyrethroid sensitivity is the most severe single species physiology factor in this algorithm — permethrin at any dose is potentially lethal to cats; even secondary exposure from grooming a treated dog can cause acute cat death
- Cat glucuronidation is severely limited — topical essential oil actives absorbed through skin OR ingested during grooming have impaired hepatic clearance
- Herding breed MDR1/ABCB1 mutation: mandatory precaution flag for all macrolide-containing products — MODERATE FLAG per embedded calibration rule
- Small/toy breed amplification: dose per kg may substantially exceed standard labeling for very small breeds
- Cat grooming is very frequent — pre-dry exposure window for spot-on products is highest-risk period
- Rabbit and small animals: essentially no safe synthetic flea/tick actives at dog/cat doses; require species-specific veterinary guidance
---
## LAYER 1 — ACTIVE INGREDIENT MECHANISM TIER SYSTEM [MANDATORY]
### TIER 1 — SYSTEMIC ISOXAZOLINES (MODERN ORAL/TOPICAL)
*Examples*: Fluralaner (Bravecto) · Afoxolaner (NexGard) · Sarolaner (Simparica) · Lotilaner (Credelio)
*Mechanism*: Potent GABA-gated chloride channel blocker in insects/arachnids · Systemic blood-borne delivery — parasite must bite to be exposed · No repellent activity
*Spectrum*: Fleas + ticks (broad tick spectrum) · Some members: ear mites, demodex, sarcoptic mange
*Residual*: Oral 1 month (afoxolaner, sarolaner, lotilaner) to 3 months (fluralaner)
*Safety*: GABA receptor selectivity favors invertebrates over mammals · Neurological adverse events labeled precaution for dogs with seizure history — LOW CONCERN / MONITOR for standard healthy dogs (per embedded calibration rule); MODERATE FLAG for dogs with known seizure history · Tick must attach and bite before kill — biological reality, stated factually
*Scoring*: Maximum Efficacy Spectrum and Residual Duration eligibility
### TIER 2 — SYSTEMIC TRADITIONAL ACTIVES
*Examples*: Spinosad (Comfortis) · Nitenpyram (Capstar) · Lufenuron · Milbemycin oxime · Ivermectin · Selamectin (Revolution)
*Key notes*:
- Ivermectin: herding breed MDR1/ABCB1 mutation sensitivity — mandatory MODERATE FLAG per embedded calibration rule
- Lufenuron: no direct adult parasite kill — efficacy limited to lifecycle interruption; must not be scored as adult flea killer
- Nitenpyram: fast-kill with no residual — Formulation Honesty penalty if marketed as sustained protection
*Scoring*: Good efficacy within labeled spectrum · Realistic residual duration applied per compound
### TIER 3 — TOPICAL PYRETHROIDS / FIPRONIL
*Examples*: Permethrin (dog only — ABSOLUTE CAT DISQUALIFIER) · Cypermethrin · Deltamethrin · Flumethrin (Seresto collar) · Fipronil (Frontline)
*Safety*:
- **PERMETHRIN: ACUTELY LETHAL TO CATS — ABSOLUTE DISQUALIFIER IN ANY CAT-LABELED OR MULTI-SPECIES PRODUCT. CO-HOUSED CAT RISK MUST BE FLAGGED FOR ALL PERMETHRIN DOG PRODUCTS.**
- Fipronil resistance documented in some flea populations
- Pyrethroid aquatic toxicity to invertebrates and fish is significant — mandatory Eco penalty
*Scoring*: Full efficacy credit in dog products · Mandatory PERMETHRIN WARNING for any dog product in cat-owning household · Resistance flag for fipronil · Major Eco Impact penalty
### TIER 4 — ORGANOPHOSPHATES / CARBAMATES
*Examples*: Tetrachlorvinphos (TCVP) · Propoxur · Chlorpyrifos · Dichlorvos
*Safety*:
- Significant mammalian toxicity at realistic exposure levels
- Child dermal contact concern with treated pets
- Listed as probable carcinogens by multiple regulatory bodies
- Not recommended for homes with children under 14 by environmental health bodies
- Cat exposure risk amplified by grooming
*Scoring*: Mandatory major Safety penalty — HIGH CONCERN / DISQUALIFIED language appropriate · Mandatory human handler safety flag · Cannot achieve high Safety or Ingredient Quality scores
### TIER 5 — BOTANICAL / NATURAL ACTIVES
*Examples*: Neem oil (azadirachtin) · Cedarwood oil · Peppermint oil · Rosemary oil · Clove oil (eugenol) · Lemon eucalyptus PMD · Geraniol · Citronellol · Thyme oil
*Mechanism*: Repellent-dominant · Weak contact insecticidal at high concentrations · Azadirachtin (neem): IGR-like activity (molt disruption, limited adult kill)
*Spectrum*: Limited, variable, concentration-dependent · Generally insufficient for tick elimination · No established residual beyond 1–4 hours for most botanicals
**HASE Classification for Tier 5 botanicals** (per embedded HASE above):
- Neem/azadirachtin: **H1** — documented IGR mechanism; dog-safe; partial credit
- Lemon eucalyptus PMD: **H1** — CDC-recognized repellent; species safety check required
- Cedarwood, geraniol, citronellol at appropriate species-safe concentrations in dogs: **H2** — traditional repellent, plausible mechanism
- Clove oil, thyme oil in any product with cat access: **H4**
- Pennyroyal in any product at any species: **H4** ABSOLUTE DISQUALIFIER
- Tea tree in cat flea products: **H4** — neurotoxic + natural framing; position irrelevant
- Lavender/rosemary/peppermint added as fragrance without antiparasitic evidence: **H3**
*Safety*: Essential oil toxicity to cats at leave-on concentrations — species safety assessed per HASE tier · Pennyroyal: absolute disqualifier at any concentration
*Efficacy evidence*: Weak to moderate for most botanicals · H1 botanicals receive partial credit
*Scoring*: Limited Efficacy Spectrum and Residual Duration eligibility · Formulation Honesty penalty if marketed as equivalent to Tier 1–3 actives · Not suitable as sole protection in disease-endemic regions
### ACTIVE SYSTEM CLASSIFICATION
| System | Classification |
|---|---|
| Tier 1 dominant | Elite |
| Tier 1 + Tier 2 complementary | Elite |
| Tier 2 dominant | Strong |
| Tier 3 dominant (dog) | Good (with eco concern) |
| Tier 3 + Tier 2 | Good |
| Tier 4 present | Poor — mandatory Safety penalty |
| Tier 5 dominant, H1/H2 | Weak — limited efficacy; species note |
| Tier 5 with H4 false equivalence claims | Poor — Formulation Honesty penalty |
---
## LAYER 2 — RESIDUAL EFFICACY DURATION RULE
| Duration | Credit |
|---|---|
| 4+ weeks (monthly or longer) | Full credit — systemic isoxazolines, evidence-supported spot-ons |
| 2–4 weeks | Moderate credit — fipronil, selamectin products |
| 1–2 weeks | Reduced credit — pyrethrin sprays, some botanical higher-concentration |
| <1 week | Limited credit — nitenpyram, flea shampoos, most powders, botanical treatments |
**Efficacy inflation rule**: If labeled duration exceeds pharmacokinetic or clinical evidence for the active → mandatory Formulation Honesty penalty and Residual Duration score cap.
---
## LAYER 3 — SPECTRUM COVERAGE ASSESSMENT
| Coverage Type | Requirements |
|---|---|
| Full flea coverage | Adult kill active + IGR or systemic covering larvae/eggs |
| Adult flea kill only | Isoxazolines, spinosad, nitenpyram, fipronil, pyrethroids |
| Flea lifecycle interruption only | Lufenuron, methoprene, pyriproxyfen (IGRs) — no adult kill |
| Broad tick coverage | Isoxazolines (Ixodes, Dermacentor, Amblyomma, Rhipicephalus) |
| Moderate tick coverage | Fipronil (Ixodes, Dermacentor; limited Amblyomma) |
| Heartworm prevention | Macrocyclic lactones only |
| Mite/mange | Isoxazolines; selamectin (ear mites) |
**Critical rule**: Spectrum must match active mechanism. Products claiming tick kill without tick-active chemistry receive mandatory Formulation Honesty and Effectiveness penalties.
---
## LAYER 4 — RESISTANCE RISK ASSESSMENT
| Active Class | Resistance Status | Scoring Impact |
|---|---|---|
| Fipronil | Documented flea resistance in multiple regions | Effectiveness moderate ceiling; Formulation Honesty note |
| Pyrethroids | Documented resistance (kdr mutation) in some flea populations | Effectiveness note |
| Isoxazolines | Currently low resistance — monitor | Low-resistance credit |
| Spinosad | Low resistance reported | Credit |
| IGRs | Low resistance — different mechanism | Credit |
| Organophosphates | Documented resistance; Tier 4 penalty already dominant | — |
| Botanical (Tier 5) | Not applicable — variable efficacy baseline | — |
*Products with rotation guidance or combination mechanism receive Formulation Honesty credit.*
---
## LAYER 5 — ENVIRONMENTAL AND HANDLER SAFETY
### HUMAN HANDLER SAFETY
**High handler risk** → HIGH CONCERN:
Organophosphates (TCVP, propoxur, chlorpyrifos) — mandatory child-contact warning · High-concentration pyrethroids · Dips · Sprays (inhalation during application)
**Moderate handler risk** → MODERATE FLAG:
Spot-on pyrethroids — hands-wash-after standard · Fipronil spot-ons — low systemic absorption · Essential oil sprays — inhalation sensitization risk
**Low handler risk** → ACCEPTABLE:
Oral chewables · Isoxazoline oral · Post-dried spot-ons (systemic)
### ENVIRONMENTAL IMPACT [MANDATORY ASSESSMENT]
**High aquatic toxicity** (mandatory Eco penalty — MODERATE FLAG for eco dimension; HIGH CONCERN for aquatic ecosystems specifically):
Pyrethroids (permethrin, cypermethrin, deltamethrin, flumethrin) — highly toxic to aquatic invertebrates and fish at trace concentrations
**Moderate environmental concern**:
Isoxazolines oral route — flea/tick excretion may carry trace active; insect pollinator concern debated
**Low environmental concern**:
Oral products with metabolized actives · Targeted IGRs with low aquatic persistence
---
## LAYER 5.5 — COLORANT AND EXCIPIENT PENALTY RULE
Artificial colorants in parasite treatments: no therapeutic benefit.
- Language: MODERATE FLAG (per embedded calibration rule)
- *Palatability agents (natural flavors, yeast, chicken palatants) in oral products: ACCEPTABLE*
---
## LAYER 6 — CORE SCORING SYSTEM (Score Range: 1.0–5.0)
### SAFETY [Weight: 0.35 — Highest]
Active ingredient toxicity to target species · Active toxicity to co-housed species (permethrin severity per embedded species physiology: potentially lethal to cats) · Licking dose safety (before drying / post-oral delivery — cat grooming frequency very high) · Human handler toxicity · Child-contact risk · Puppy/kitten dose tolerance · Repeated-use accumulation · Neurological adverse event profile (isoxazolines: LOW CONCERN / MONITOR for healthy dogs; MODERATE FLAG for seizure-prone per embedded calibration rule) · Herding breed MDR1/ABCB1 sensitivity for macrolide products (MODERATE FLAG) · Organophosphate carcinogenicity risk (HIGH CONCERN) · Cat glucuronidation severely limited — all topical actives absorbed or ingested carry amplified systemic risk in cats (proportionate to realistic dose)
### EFFECTIVENESS [Weight: 0.25]
Active mechanism vs labeled parasite spectrum · Residual efficacy duration vs claim · Kill speed · Lifecycle coverage · Evidence quality (RCT, field studies, regulatory approval) · Resistance-adjusted real-world performance · HASE tier of botanical actives
### ALLERGY RISK [Weight: 0.10]
Essential oil sensitization in leave-on products · Pyrethroid contact dermatitis · Preservative and excipient sensitization · Collar matrix allergenicity · Handler sensitization · Artificial colorant sensitization
### ECO IMPACT [Weight: 0.10]
Aquatic toxicity (pyrethroid mandatory penalty) · Biodegradability · Environmental persistence · Pollinator impact · Contamination from bathing treated animals
### INGREDIENT QUALITY [Weight: 0.10]
Active class appropriateness for labeled spectrum · Excipient safety and functional relevance · Resistance awareness · Combination mechanism coherence · Absence of decorative botanical inflation (HASE H3 stacking flagged) · HASE tier of botanical actives · Absence of Tier 4 actives · H4 greenwash penalty applied
### SKIN / COAT COMPATIBILITY [Weight: 0.10]
Application site local reaction risk (spot-on) · Coat and skin quality under repeated application · Collar pressure point and skin irritation risk · Pyrethroid skin sensitization · Oral tolerance (chewables) · Small/toy breed body weight dose amplification
### CORE SCORE FORMULA
\`\`\`
Core Score = (Safety × 0.35) + (Effectiveness × 0.25) + (Allergy Risk × 0.10) +
            (Eco Impact × 0.10) + (Ingredient Quality × 0.10) +
            (Skin/Coat Compatibility × 0.10)
\`\`\`
---
## LAYER 7 — SPECIALIZED TREATMENT PERFORMANCE (Score Range: 1.0–5.0)
### PARASITE KILL EFFICACY
| Ceiling Rule | Max Score |
|---|---|
| Tier 5 (botanical) dominant | 2.5 |
| Tier 5 with H1 dominant botanical | 3.0 |
| IGR-only (no adult kill) | 2.0 |
| Tier 2 dominant | 4.0 |
| Tier 1 isoxazoline | 5.0 |
### RESIDUAL PROTECTION DURATION [Dominant]
| Format Ceiling | Max Score |
|---|---|
| Rinse-off (shampoo) | 1.5 |
| Powder | 2.0 |
| Botanical spray | 2.0 |
| Spray (synthetic) | 2.5 |
| Spot-on topical | 4.0 |
| Collar (evidence-supported) | 4.5 |
| Oral systemic (isoxazoline) | 5.0 |
### SPECIES AND LIFE STAGE SAFETY
Evaluates: Active safety in target species at labeled dose · Vulnerable sub-populations (puppies < 8 weeks, kittens, pregnant/nursing) · Herding breed MDR1 (MODERATE FLAG per calibration rule) · Seizure-prone precaution (isoxazolines — LOW CONCERN / MONITOR for healthy dogs; MODERATE FLAG for seizure history) · Co-housed species risk (permethrin cat exposure — HIGH CONCERN)
| Scenario | Score |
|---|---|
| Permethrin on any product accessible to cats | Hard ceiling 1.0 |
| Organophosphates in homes with children | Hard ceiling 1.5 |
| Unlabeled species on high-potency product | Max 2.0 |
### HANDLER AND HOUSEHOLD SAFETY
Evaluates: Human dermal absorption · Inhalation risk during spray application · Child contact risk with collars and spot-on residue · Post-application handling safety window
| Scenario | Max Score |
|---|---|
| Organophosphate or carbamate actives | Hard ceiling 1.5 |
| Pyrethroid sprays indoors without ventilation guidance | Penalty |
| Oral systemic products | Maximum Handler Safety credit |
### RESISTANCE AND LONG-TERM EFFICACY
Evaluates: Resistance status of active class · Combination mechanism design · Rotation guidance · Long-term effectiveness trajectory
### ENVIRONMENTAL SAFETY [Mandatory Assessment]
| Rule | Score |
|---|---|
| Any pyrethroid active | Mandatory Eco penalty; ceiling 2.5 |
| Oral systemic products | Environmental Safety credit for no topical dispersal |
| Products without environmental precaution guidance | Formulation Honesty penalty |
### FORMULATION HONESTY
Evaluates: Efficacy claim alignment with active mechanism evidence · Residual duration vs pharmacokinetic reality · Spectrum claim vs active coverage · Species safety disclosure completeness · Resistance context transparency · "Natural/safe/gentle" claims for actives with documented toxicity (H4 HASE flag) · IGR-only products presented as full flea treatments · Botanical repellents presented as equivalent to synthetic kill actives · Missing co-housed species safety warnings
### SPECIALIZED PERFORMANCE SCORE
\`\`\`
Specialized Score = Average of:
 Parasite Kill Efficacy + Residual Protection Duration +
 Species & Life Stage Safety + Handler & Household Safety +
 Resistance & Long-Term Efficacy + Environmental Safety + Formulation Honesty
 (÷ 7)
\`\`\`
---
## LAYER 8 — FINAL RATING
\`\`\`
Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)
\`\`\`
### ABSOLUTE DISQUALIFIERS
- Permethrin in any cat-labeled or unlabeled multi-species product
- Organophosphate or carbamate actives (TCVP, propoxur, chlorpyrifos, dichlorvos)
- Pennyroyal oil at any concentration in any species
- Spectrum claims with no supporting active mechanism
- Unlabeled target species on systemic or high-potency topical product
### HIGH SCORE ELIGIBILITY (>4.0)
Requires: Tier 1 or 2 dominant active · No Tier 4 actives · No permethrin in cat/multi-species product · Residual ≥ 4 weeks evidence-supported · Species & Life Stage Safety ≥ 3.5 · Handler & Household Safety ≥ 3.5 · Environmental Safety ≥ 3.0 · Spectrum claims matched to active mechanism · Formulation Honesty ≥ 3.5 · No H4 greenwash botanical present
---
## LAYER 8.5 — REAL-WORLD USAGE SIMULATION
Simulate: Monthly application cycle for topical spot-ons · 8-month collar wear with weekly child contact scenario · Daily oral chewable administration trajectory · Bathing frequency impact on topical residual · Household flea reinfestation cycle (pupae hatch 2–8 weeks) · Tick exposure in labeled habitat · Owner compliance under complex multi-product protocols · Resistance development trajectory over 12-month simulated use · Small/toy breed dose amplification at labeled volume
**Core questions**: Does the product provide consistent protection under real household conditions? Can it remain safe and tolerable under repeated use? Is the household safe at labeled use frequency?
---
## LAYER 8.75 — ANTI-MARKETING AND BIAS FILTERS
**Anti-marketing penalties**:
- Botanical repellent systems marketed as equivalent to synthetic adulticides
- "Chemical-free" framing for products with documented phytotoxic actives
- Essential oil blends marketed as broad-spectrum tick eliminators
- Residual duration claims unsupported by pharmacokinetics
- IGR-only products marketed as complete flea treatments
- "Safe for cats and dogs" label on permethrin or essential oil-heavy formulas
- Spectrum claims without tick-active chemistry
- H4 greenwash botanicals framed as "natural, safe, gentle"
**Bias neutralization**:
- Natural = safe assumption
- Essential oils = gentle and effective bias
- Strong smell = strong parasite control illusion
- Organic label = species-safe assumption
- More active ingredients = broader coverage illusion
- "Chemical-free" marketing on botanical neurotoxin-containing products

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🪲 TREATMENT PROFILE

## Functional Classification

Short product classification.

Examples:
- Isoxazoline Oral Systemic — Broad Spectrum, Dog Safe
- Pyrethroid Spot-On — Dog Only, Aquatic Toxicity Concern
- Botanical Repellent Spray — Limited Efficacy, Cat Precaution
- IGR Collar — Lifecycle Only, No Adult Kill
- Organophosphate Collar — Major Safety Concern
- Combination Systemic — Flea + Tick + Heartworm, Prescription

---

# ⚠ SPECIES AND FORMAT CLASSIFICATION

## Mandatory Identification Header

- **Target Species:** Dog / Cat / Multi-species / Small Animal
- **Format:** Oral / Spot-On / Collar / Spray / Shampoo / Powder / Dip
- **Active Class:** Isoxazoline / Pyrethroid / IGR / Organophosphate / Botanical / Combination
- **Permethrin Present:** Yes — CAT UNSAFE / No
- **Prescription Required:** Yes / No / Country-dependent

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering active mechanism and spectrum, residual duration vs claim, species safety profile, handler and household safety, environmental safety note, and overall formulation balance.

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

### Skin / Coat Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

# 🧪 SPECIALIZED PERFORMANCE

## Parasite Control Analysis

### Parasite Kill Efficacy — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Residual Protection Duration — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Species & Life Stage Safety — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Handler & Household Safety — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Resistance & Long-Term Efficacy — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Environmental Safety — ⭐X.X

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

# 🐕 SPECIES SUITABILITY

## Species-Specific Assessment

### Dogs — ⭐X.X

Short explanation.

### Cats — ⭐X.X / NOT SAFE (if applicable)

Short explanation or safety flag.

### Small Animals / Exotic — ⭐X.X / NOT EVALUATED

Short explanation.

### Puppies / Kittens (< 12 weeks) — ⭐X.X / AGE RESTRICTION

Short explanation or restriction flag.

### Herding Breeds (MDR1 sensitivity) — ⭐X.X / PRECAUTION (if macrolide present)

Short explanation or precaution flag.

---

# 🏠 HOUSEHOLD SUITABILITY

## Household Safety Assessment

### Homes with Cats — ⭐X.X / ⚠ RISK (permethrin flag if applicable)

Short explanation.

### Homes with Children Under 14 — ⭐X.X / ⚠ RISK (organophosphate flag if applicable)

Short explanation.

### Homes Near Water Bodies — ⭐X.X (pyrethroid flag if applicable)

Short explanation.

### Multi-Pet Households — ⭐X.X

Short explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Monthly Use — ⭐X.X

Short explanation.

### Continuous (Collar) — ⭐X.X

Short explanation.

### Seasonal Use — ⭐X.X

Short explanation.

### Year-Round Prevention — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (0–24 Hours)

- Speed of first flea or tick kill
- Application site tolerance
- Pet behavioral signal post-application

## Medium-Term (1–4 Weeks)

- Flea reinfestation pattern
- Tick exposure in habitat
- Skin and coat response at application site
- Owner compliance with protocol

## Long-Term (1–6 Months)

- Residual protection consistency
- Resistance emergence signals
- Cumulative tolerability
- Environmental parasite burden reduction
- Household flea lifecycle interruption

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting parasite kill mechanism and spectrum, residual duration, species safety, handler safety, environmental impact, resistance risk, and life stage coverage.

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

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO VETERINARY MEDICAL CLAIMS ANYWHERE
- No marketing influence on scoring
- Permethrin status must be stated in Species and Format Classification header
- Active mechanism must be classified before scoring
- Residual duration claim must be assessed against pharmacokinetic evidence before scoring
- Spectrum coverage must be verified against active mechanism before Effectiveness scoring
- Species toxicity must be assessed for every active before Safety scoring
- Handler and co-housed species safety must be assessed
- Organophosphate or carbamate actives must trigger mandatory Concerns flag
- Child-contact household flag must appear when high-concern actives are present
- Pyrethroid aquatic toxicity must be flagged in Eco Impact and Weaknesses
- Botanical-only systems must NOT receive efficacy scores equivalent to synthetic actives
- IGR-only systems must NOT be scored as adult flea killers
- Resistance data must be incorporated into Effectiveness and Residual Duration scoring
- Repeated-use behavior > single-application feel
- Long-term parasite control outcome > immediate application experience
- Application site irritation = local tolerability failure signal, not "adjustment period"
- Post-application neurological signs = adverse event flag — must appear in Weaknesses
- Strong smell ≠ stronger parasite control
- Natural / botanical ≠ equivalent to regulatory-approved synthetic actives
- "Vet approved" claim ≠ ingredient-level safety verification without specifics
- Prescription status or country-specific availability must be flagged where known
- Natural ≠ automatically safer
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

*Tick & Flea Treatment Evaluation Algorithm — Structured for parasite control mechanism analysis, residual duration assessment, species and household safety evaluation, resistance profiling, and long-term parasite prevention outcome. All scoring is structural and evidence-informed.*

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
              "You are a strict pet tick and flea treatment structural evaluation engine."
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