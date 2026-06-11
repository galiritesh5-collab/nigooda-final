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
        "PETGROOMINGSPRAY ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
PET GROOMING SPRAY EVALUATION ALGORITHM — V2.0
================================================
SPECIES COVERAGE: Dogs / Cats / Small Animals (Rabbits, Guinea Pigs, Birds)
SPRAY TYPES: Coat Care (Conditioning, Detangling) + Deodorizing / Freshening
PRIMARY FOCUS: Balanced — Safety + Efficacy + Coat Health equally
================================================
DUAL TRACK SYSTEM
This algorithm operates on two scoring tracks:
TRACK A — COAT CARE SPRAYS
Conditioning, detangling, shine, moisturizing, anti-static, leave-in treatment sprays.
Primary concern: Dermal and coat safety across species + genuine conditioning efficacy.
TRACK B — DEODORIZING / FRESHENING SPRAYS
Odor neutralizing, waterless/dry cleaning, between-bath freshening sprays.
Primary concern: Inhalation and dermal safety across species + genuine odor control vs masking.
Products may serve both functions. Dual-function products are evaluated under BOTH tracks.
Final rating reports the lower track score as Primary Rating with both disclosed.
================================================
================================================
SPECIES SAFETY HIERARCHY — MANDATORY FOUNDATION
Before any ingredient or formula evaluation, species safety must be established.
This hierarchy overrides ALL efficacy, fragrance, and conditioning considerations.
CATS — HIGHEST SENSITIVITY / STRICTEST STANDARD
Cats are obligate groomers. Any topical product applied to coat is
partially or fully ingested through self-grooming. This converts
every topical spray into a partial oral exposure product for cats.
Grooming ingestion pathway is near-certain for cats. All leave-on ingredients
in cat-applicable products must be assessed as partially ingested daily.
Cat glucuronidation capacity is severely limited — liver metabolism of orally
ingested ingredients is compromised, elevating systemic accumulation risk.
This risk is assessed proportionately to realistic ingested dose, not worst-case.
Mandatory toxic categories for cats:
- Essential oils — ALL must be treated as potentially toxic unless
  specific evidence of safety at used concentration exists:
  - Tea Tree (Melaleuca): HIGHLY TOXIC even at trace levels
  - Eucalyptus: TOXIC
  - Clove, Cinnamon, Oregano: TOXIC
  - Peppermint, Spearmint: TOXIC
  - Citrus oils (Limonene, Linalool): TOXIC
  - Pennyroyal: HIGHLY TOXIC
  - Pine, Spruce, Fir: TOXIC
  - Lavender: LOW-MODERATE concern at high concentration
  - Chamomile: LOW concern; monitor
- Phenolic compounds (Phenol, Thymol, Carvacrol): TOXIC
- Benzalkonium Chloride (quaternary ammonium): TOXIC to cats
- Benzyl Alcohol: TOXIC
- Propylene Glycol: TOXIC to cats (causes Heinz body anemia)
- Alcohol (Ethanol / Isopropanol) at significant concentrations: TOXIC
- Permethrin and ALL pyrethroids: HIGHLY TOXIC (fatal risk)
- Xylitol: TOXIC
- Artificial sweeteners in any form: flag
Mandatory output rule:
Any cat-marketed or cat-applicable product containing the above
must receive MANDATORY SAFETY WARNING as the first output section,
regardless of all other scores.
---
DOGS — MODERATE SENSITIVITY
Dogs also groom but less extensively than cats.
Dermal absorption and partial ingestion both apply.
Toxic categories for dogs:
- Tea Tree Oil >1% concentration: TOXIC
- Permethrin: TOXIC (less severe than cats but significant)
- Xylitol: HIGHLY TOXIC
- Macadamia nut oil (ingestion): toxic
- Pennyroyal: TOXIC
- High-concentration essential oils: concern, especially clove, cinnamon
- Propylene Glycol: lower concern than cats but still flag at high concentration
---
RABBITS AND GUINEA PIGS — HIGH SENSITIVITY
- Essential oils: high sensitivity — most are contraindicated
- Any aerosol spray near face or respiratory tract: MAJOR concern
- Stress from spray application itself is a real welfare concern
- Alcohol-containing sprays: toxic risk
- All synthetic fragrances: flag — respiratory sensitivity
---
BIRDS — EXTREME RESPIRATORY SENSITIVITY
- Aerosol sprays of ANY kind: MAJOR inhalation hazard
- Essential oil diffusion or spray near birds: HIGHLY TOXIC
- PTFE/Teflon off-gassing from heated products: lethal
- Non-stick coating residues: lethal
- Fragrance aerosols in same room: significant risk
- Any spray near a bird must be flagged regardless of formula
Mandatory output rule:
Bird-applicable products receive mandatory respiratory safety evaluation.
Any aerosol format near birds → mandatory MAJOR SAFETY WARNING.
---
SPECIES SAFETY APPLICABILITY TABLE
Every product must be scored for each species it claims to be safe for
or that it may realistically contact.
"For dogs and cats" claim → evaluated under both dog AND cat standards.
"For all pets" claim → evaluated under all species standards including birds.
"For dogs only" claim → evaluated under dog standard; cat warning still
  issued if essential oils or pyrethroids are present (household exposure risk).
---
SPECIES PHYSIOLOGY REFERENCE — MANDATORY CONTEXT
Parameter             | Dog         | Cat              | Rabbit / Small Animals | Notes
species range
Glucuronidation       | Normal      | Severely limited | Limited                | Cat: all leave-on ingredients carry
                      |             |                  |                        | heightened metabolic risk via grooming
                      |             |                  |                        | ingestion; proportionate to realistic dose
Grooming/licking      | Moderate    | Very high        | High                   | Cat/rabbit: treated coat areas are
frequency             |             |                  |                        | groomed and ingested; all leave-on
                      |             |                  |                        | ingredients in cat products are
                      |             |                  |                        | effectively partially ingested daily
Essential oil         | Moderate    | Very high        | High                   | All essential oils in cat leave-on
sensitivity           |             |                  |                        | carry realistic ingestion risk;
                      |             |                  |                        | glucuronidation limitation amplifies
                      |             |                  |                        | toxicity proportionately to dose
Skin SC layers        | 3–5         | 4–6              | Very thin              | Thinner than human; barrier
                      |             |                  |                        | vulnerability amplified under repeated
                      |             |                  |                        | spray application
Key formulation consequences:
- Cat grooming frequency is very high — all ingredients in a cat spray are effectively
  partially ingested at each application
- Cat glucuronidation is severely limited — liver metabolism of orally ingested
  ingredients is compromised; systemic accumulation risk elevated, assessed
  proportionately to realistic ingested dose
- - Small animals have very thin skin and high grooming frequency — evaluated
  at strictest safety standard
================================================
================================================
EMBEDDED INGREDIENT CONCENTRATION AND POSITION RULE
[MANDATORY — BOTH TRACKS]
RULE 1 — EXPLICIT CONCENTRATION STATED
Evaluate at exact stated concentration; do not default to worst-case assumptions.
RULE 2 — NO CONCENTRATION STATED (POSITION-BASED EVALUATION)
Position in List       | Estimated Concentration Range | Evaluation Approach
1st–3rd ingredient     | Very high (dominant base)     | Full safety + efficacy weight applied
4th–8th ingredient     | Moderate-high (functional)    | Standard safety + moderate efficacy credit
9th–15th ingredient    | Low-moderate (supporting)     | Proportional credit; reduced penalty for
                       |                               | moderate-concern items
16th–20th ingredient   | Low (trace to minor)          | Minimal penalty for moderate-concern items;
                       |                               | decorative credit for actives
20th+ ingredient       | Trace level                   | Monitor-only flag for moderate concerns;
                       |                               | no penalty for low-concern items
RULE 3 — PENALTY PROPORTIONALITY BY POSITION
- Position 1–5 + moderate concern → Full moderate penalty
- Position 6–12 + moderate concern → Reduced penalty (50%)
- Position 13+ + moderate concern → Monitor flag only
- Disqualifying ingredients → Position does not reduce penalty
RULE 4 — WHAT POSITION CANNOT EXCUSE IN PET GROOMING SPRAYS
- Mandatory species-toxic ingredients (feline neurotoxic essential oils) at any
  detectable level in cat/multi-species products
- Spray format means product is applied topically to coat; cat grooming ingestion
  is near-certain; no rinse-off dilution event exists for leave-on spray products
Application examples:
Tea tree at position 3 in a cat conditioning spray = DISQUALIFIED (any position;
topical application + near-certain grooming ingestion + leave-on format =
continuous toxic exposure + feline glucuronidation limitation).
Tea tree at position 3 in a dog conditioning spray = HIGH CONCERN (leave-on +
functional concentration + dog grooming exposure).
Tea tree at position 18 in a dog conditioning spray = LOW CONCERN / MONITOR
(trace level; leave-on noted; proportionate to realistic daily dose).
Lavender at position 5 in a dog spray = MODERATE FLAG.
Lavender at position 16 in a dog spray = LOW CONCERN / MONITOR.
Essential oil in a bird-applicable aerosol at any position = DISQUALIFIED
(inhalation route; extreme avian respiratory sensitivity).
Hydrolyzed keratin at position 1–3 = full Tier 1 conditioning credit.
Hydrolyzed keratin at position 15+ = reduced credit (40%); Formulation Honesty note
if marketed as primary conditioning mechanism.
Fragrance or "parfum" listed at position 4 in a deodorizing spray = Tier 4
(masking) dominant signal; Formulation Honesty penalty if marketed as odor
elimination. Fragrance at position 18 = MONITOR note; does not elevate Tier
classification if genuine Tier 1 actives present at positions 1–8.
================================================
EMBEDDED HERBAL AUTHENTICITY SCORING ENGINE (HASE)
[MANDATORY — BOTH TRACKS]
Every botanical ingredient must be classified H1–H4 before scoring.
Species context is mandatory. Spray application means coat-deposited ingredients
remain on coat between uses; cat grooming ingestion is near-certain.
TIER H1 — EVIDENCE-BACKED BOTANICAL ACTIVES (PET GROOMING SPRAY CONTEXT)
Conditioning and coat care:
- Hydrolyzed Proteins (Keratin, Silk, Wheat — low MW): coat strengthening and
  repair evidence — Full H1 credit; Tier 1 conditioning contribution
- Panthenol (Pro-Vitamin B5): moisturizing and coat softening documented —
  Full H1 credit; Tier 1 conditioning contribution
- Colloidal Oatmeal: soothing skin benefit evidence; skin compatibility credit —
  Full H1 credit
- Aloe Vera (Aloe Barbadensis Leaf Juice) at functional position: soothing,
  moisturizing — Full H1 credit for skin and coat compatibility
- Allantoin: skin soothing and healing support — Full H1 credit
Odor neutralization:
- Cyclodextrin (plant-derived): odor trapping mechanism documented —
  Full H1 credit; Tier 1 odor control contribution
- Plant-derived enzyme systems with odor neutralization evidence —
  Full H1; Tier 1 credit at functional positions
- Chitosan: mild antimicrobial + coat conditioning evidence —
  Full H1 credit; Tier 2 odor control contribution
Scoring impact: Full botanical efficacy credit.
HASE bonus: +0.2 to Ingredient Quality.
---
TIER H2 — FUNCTIONAL TRADITIONAL BOTANICAL (PET GROOMING SPRAY CONTEXT)
- Witch Hazel (Hamamelis Water) at diluted concentration (dog-only):
  mild astringent; evaluate ethanol content for cats —
  H2 partial credit; cat: evaluate ethanol content before classification
- Chamomile Extract at functional level: anti-inflammatory —
  Partial skin compatibility credit; low concern across species
- Rosemary Extract as antioxidant/preservative: antioxidant and mild
  preservative evidence — Partial credit
- Jojoba Oil, Argan Oil: emollient; low toxicity; minor detangling slip —
  Partial credit; acceptable across species
- Coconut Oil derivatives (Coco-Glucoside, Caprylic/Capric Triglyceride):
  mild conditioning; low toxicity — Partial credit
- Peppermint Oil at low position in dog-only products: some traditional
  antimicrobial use — H2 partial credit; cat = H4 in any spray format
- Vitamin E (Tocopherol): antioxidant, coat conditioning support —
  Partial credit at functional positions
Scoring impact: Partial functional credit (50%). No HASE penalty.
H2 at position 15+ = monitoring-level credit only.
---
TIER H3 — COSMETIC BOTANICAL / MARKETING-LEVEL USE
(PET GROOMING SPRAY CONTEXT)
- Lavender essential oil at trace position in a dog spray (scent only)
- Floral waters/hydrosols as primary conditioning or deodorizing agent
- Exotic botanicals without documented coat or odor control mechanism
- Chamomile extract at trace position with no functional benefit
- Vitamin E at trace position (decorative antioxidant claim)
- High-MW Collagen (no coat penetration at claimed molecular weight)
- "Botanical complex" or "herbal blend" without identifiable mechanism
- Trace botanical extracts inflating ingredient count without function
Scoring impact: No functional conditioning or odor control credit.
Tier 4 (masking) classification if used as primary conditioning or odor agent.
Formulation Honesty minor penalty if marketed as active agent.
---
TIER H4 — GREENWASH BOTANICAL (HARMFUL + "NATURAL" FRAMING)
(PET GROOMING SPRAY CONTEXT)
H4 in a spray applied to pets represents the highest-severity greenwash
classification in this algorithm because spray-on application deposits
ingredients directly onto coat, and cat grooming ingestion is near-certain.
H4 applies where:
(a) established species toxicity at realistic spray-deposited concentrations exists
(b) grooming ingestion pathway is realistic
(c) misleading "natural/safe" framing is present
This standard is appropriately strict for spray-on products used on cats.
H4 requires realistic toxicity at achievable spray-deposited + grooming-ingested
doses. Theoretical or in vitro-only concerns at trace positions use H2/H3 with
monitor note instead.
Examples:
- Tea tree oil in any cat spray marketed as "natural antimicrobial conditioner" —
  H4 (neurotoxic in cats; spray deposit + grooming = oral ingestion; continuous exposure)
- Eucalyptus in cat spray marketed as "natural freshener" —
  H4 (toxic to cats; spray-on application amplification)
- Pennyroyal in any pet spray — H4 (toxic to dogs and cats at any concentration)
- Clove, cinnamon, oregano oils in cat products marketed as "natural botanical spray" —
  H4
- Essential oil blends at functional positions in cat sprays labeled
  "calming botanical formula" or "natural conditioning spray" — H4
- Peppermint oil in cat spray at any functional position — H4
  (feline glucuronidation limitation + daily grooming ingestion)
- Permethrin or pyrethroid in cat spray marketed as "natural pest deterrent" — H4
  (fatal toxicity risk; any concentration)
Scoring impact:
Full species toxicity penalty.
HASE penalty: −0.3 Formulation Honesty.
HASE penalty: −0.2 Ingredient Quality.
"Natural = safe" framing explicitly called out in Concerns section.
HASE APPLICATION RULES — PET GROOMING SPRAYS
1. Every botanical classified H1–H4 before scoring
2. Species context mandatory — spray application means coat-deposited ingredients
   are available for grooming ingestion at each application
3. Spray format means no rinse-off dilution; treated coat areas remain active
   between grooming events
4. Position matters for H2 and H3 classifications
5. H4 in a cat-applicable spray is the most severe classification — continuous
   exposure + grooming ingestion pathway
6. H4 requires realistic toxicity at achievable spray-deposited + licking doses;
   theoretical or in vitro-only concerns at trace positions use H2/H3 with
   monitor note instead
HASE OUTPUT NOTATION:
[H1 — Evidence-Backed] · [H2 — Traditional Functional] ·
[H3 — Cosmetic/Marketing Level] · [H4 — Greenwash Risk]
================================================
EMBEDDED PENALTY LANGUAGE CALIBRATION RULE
[MANDATORY — BOTH TRACKS]
Concern Level          | When to Use                                         | Example Output Language
DISQUALIFIED           | Feline neurotoxic essential oils in cat/multi-       | "This ingredient disqualifies the product
                       | species spray products at any detectable level;      | for this species in a spray-on format.
                       | permethrin in cat products; any aerosol format       | Topical application and near-certain
                       | for birds with toxic fragrance or essential oils      | grooming ingestion make this ingredient
                       |                                                      | unacceptable for cats."
HIGH CONCERN           | Category C toxic ingredients at functional           | "This ingredient raises a significant
                       | positions in dog spray; isopropyl alcohol >2%        | safety concern in this spray format
                       | at likely licking dose in multi-species products     | under regular application for [species]."
MODERATE FLAG          | Moderate-risk essential oils at functional           | "This ingredient warrants attention at
                       | positions in dog products; alcohol systems           | its estimated inclusion level in this
                       | in cat products; synthetic colorants; unlabeled      | formula. It represents a manageable
                       | species on potent actives                            | concern but warrants monitoring under
                       |                                                      | regular use."
LOW CONCERN / MONITOR  | Moderate-risk botanicals at trace positions          | "This ingredient is worth noting but
                       | in appropriate species; standard preservatives;      | presents a low concern at concentrations
                       | PEGs at standard levels; trace cumulative-dose       | expected in this formula under normal
                       | concerns remaining sub-threshold at realistic        | use conditions."
                       | daily application                                    |
ACCEPTABLE             | Enzymatic actives; cyclodextrin; zinc ricinoleate;  | State positively or neutrally.
                       | glycerin; panthenol; aloe vera at appropriate        |
                       | concentrations; standard preservatives at            |
                       | standard levels; Tier 1 conditioning agents          |
V2.0 Calibration rules for pet grooming sprays:
1. Spray format does NOT automatically escalate all ingredients to HIGH CONCERN —
   proportionality is still required
2. Synthetic fragrance in a deodorizing spray = Tier 4 masking concern —
   MODERATE FLAG on Formulation Honesty if marketed as odor elimination;
   not a toxicity HIGH CONCERN unless species-toxic components are identified
3. Propylene glycol in dog spray at trace position = LOW CONCERN — not MODERATE FLAG
4. Standard preservatives (phenoxyethanol ≤1%) = ACCEPTABLE in dog products
5. Phenoxyethanol in cat products: MODERATE CONCERN — grooming ingestion route
6. Artificial colorants in spray = MODERATE FLAG — not HIGH CONCERN
7. Alcohol at <1% in dog-only spray at position 15+ = LOW CONCERN / MONITOR
8. Where cumulative trace-level grooming-ingested dose at 365 days remains
   sub-threshold per estimated NOAEL: retain monitor-level language
9. Where evidence is only in vitro or theoretical: use "limited evidence" language —
   not established toxicity framing
================================================
SPECIES TOXICITY CATEGORY SYSTEM
[MANDATORY — BOTH TRACKS]
CATEGORY A — SAFE FOR ALL COMMON PET SPECIES
Examples: Hydrolyzed proteins (low MW) · Panthenol · Aloe Vera inner leaf gel
(low concentration) · Glycerin · Allantoin · Colloidal oatmeal ·
Cyclodextrin · Zinc ricinoleate · Food-grade enzymatic neutralizers ·
Vitamin E (Tocopherol) · Sodium Bicarbonate
Scoring: Full safety credit. ACCEPTABLE language.
---
CATEGORY B — DOG-SAFE, CAT CAUTION
Examples: Most essential oils at functional concentration · Benzalkonium chloride
(above trace) · Propylene glycol · Witch hazel (ethanol content) ·
Phenoxyethanol (concentration-dependent cat concern) · Tea tree oil ·
Dimethicone at high concentration (cat grooming ingestion monitoring)
V2.0 Scoring: Dog-only at functional positions: MODERATE FLAG.
Dog-only at trace positions: LOW CONCERN / MONITOR.
Cat/multi-species: Mandatory Safety penalty.
Spray-deposited ingredients on cats are available for near-certain grooming
ingestion — borderline Category B ingredients at functional concentrations
carry heightened cumulative concern vs rinse-off formats; trace-level exposure
with realistic sub-threshold cumulative dose remains LOW CONCERN / MONITOR.
---
CATEGORY C — HIGH TOXICITY — CATS AND/OR SMALL ANIMALS
Examples: Tea tree (Melaleuca) at functional concentrations in cats ·
Eucalyptus (cats and small animals) · Clove, cinnamon, thyme oils (cats) ·
Pennyroyal (dogs and cats at any concentration) · Xylitol (dogs) ·
Permethrin and pyrethroids (cats — fatal risk) · Isopropyl alcohol at
licking dose in cat products · Benzyl alcohol in cat products ·
Phenolic compounds in cat or bird products ·
Benzalkonium chloride at toxic threshold for cats
Scoring: Mandatory major Safety penalty. HIGH CONCERN or DISQUALIFIED
language per calibration rule. H4 HASE classification if marketed as "natural/safe."
Spray-on application amplification acknowledged: topical deposit + grooming
ingestion = continuous exposure pathway. Severity proportionate to realistic
daily licking/grooming-ingested dose.
---
CATEGORY D — LICKING DOSE ACCUMULATION CONCERN
Examples: Synthetic fragrance compounds (phthalate concern) ·
Formaldehyde-releasing preservatives · PEGs at elevated concentration ·
Artificial dyes/colorants · Methylisothiazolinone (MIT/CMIT) —
potent sensitizer; avoid in cat products
Scoring: Cumulative Toxicity Risk penalty (proportionate to position) ·
Allergy Risk penalty · LOW CONCERN to MODERATE FLAG depending on ingredient
count, positions, and whether realistic cumulative daily grooming-ingested
dose reaches a plausible threshold.
================================================
================================================
TRACK A — COAT CARE SPRAY ALGORITHM
================================================
LAYER A0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward coat care sprays that demonstrate:
- Species-appropriate conditioning architecture
- Genuine detangling, moisturizing, or coat health benefit
- Dermal and coat safety under repeated application across all covered species
- Grooming ingestion safety for cats and self-grooming species
- Low sensitization and irritation risk under repeated topical exposure
- Fragrance burden minimization (especially for cats and small animals)
- Honest efficacy claims — detangling, shine, coat health
- pH compatibility with species skin (distinct from human skin)
- Low cumulative buildup risk on coat and skin
Mandatory penalties for:
- Essential oil-heavy conditioning marketed as "natural and safe" without
  species-specific safety disclosure
- Propylene Glycol in cat-applicable products
- Conditioning agents with high oral toxicity risk (cat grooming ingestion)
- Fragrance-driven "freshness" perception substituting for genuine conditioning
- Alcohol-dominant carriers causing coat dryness and toxicity risk
- Silicone masking without genuine conditioning benefit
- Human-grade conditioning architecture applied to pets without reformulation
TRANSPARENCY PRIORITY RULE
Ignore: Fragrance freshness perception · "Natural/botanical" marketing alone ·
Trend-driven active loading · Ingredient-count inflation
Evaluate only: Genuine conditioning architecture vs cosmetic masking ·
Species-appropriate toxicity profile · Coat and skin barrier compatibility ·
Grooming ingestion safety · Repeated-use tolerance · Buildup trajectory ·
Formulation honesty
---
================================================
LAYER A1 — CONDITIONING ARCHITECTURE TIER SYSTEM (TRACK A)
MANDATORY RULE:
All conditioning agents must be classified by tier AND by HASE notation
and evaluated for species-specific safety before scoring.
TIER 1 — IDEAL PET COAT CONDITIONING AGENTS
Examples:
- Hydrolyzed Proteins (Keratin, Silk, Wheat — low MW) [H1] — coat strengthening
- Panthenol (Pro-Vitamin B5) [H1] — moisturizing, coat softening
- Aloe Vera (Aloe Barbadensis Leaf Juice) [H1] — soothing, moisturizing
- Glycerin — humectant; safe across species at appropriate concentration [Category A]
- Colloidal Oatmeal [H1] — soothing for itchy/sensitive skin
- Allantoin [H1] — skin soothing and healing support
- Ceramides (pet-appropriate) — barrier support [Category A]
- Vitamin E (Tocopherol) [H2 at trace; H1 at functional level] —
  antioxidant, coat conditioning
- Chamomile Extract [H2] — mild soothing; low concern across species
- Coconut Oil derivatives (Coco-Glucoside, Caprylic/Capric Triglyceride) [H2] —
  mild conditioning; low toxicity
Characteristics:
- Low toxicity across dog, cat, small animal species (Category A)
- Genuine coat conditioning benefit
- Low oral toxicity risk (relevant for cat grooming ingestion)
- Low sensitization profile
- Species-appropriate hydration and coat benefit
Scoring Impact:
- Full conditioning credit
- Species safety credit (Category A)
- Eligible for maximum Coat Health scores
---
TIER 2 — ACCEPTABLE WITH SPECIES MONITORING
Examples:
- Behentrimonium Methosulfate (BTMS) at low concentration —
  conditioning agent; low oral toxicity concern; monitor for cats
- Cetyl Alcohol, Stearyl Alcohol — emollient; low concern [Category A at low levels]
- Polyquaternium-10 — low MW film-forming; low concern
- Dimethicone (water-soluble or low MW) — moderate concern;
  monitor cat grooming ingestion [Category B for cats at high concentration]
- Jojoba Oil, Argan Oil [H2] — emollient; low toxicity; acceptable
Characteristics:
- Generally acceptable at appropriate concentrations
- Some oral exposure concern for cats at high concentration
- Lower sensitization than Tier 3
Scoring Impact:
- Moderate conditioning credit
- Species safety note required for cats at high concentration
- HASE notation applied per ingredient
---
TIER 3 — USE WITH CAUTION / SPECIES-RESTRICTED
Examples:
- Essential oils at any concentration for cat products [H4 in cat products]
- Isopropyl Alcohol or Ethanol >5% in cat products [Category C]
- Propylene Glycol (any cat product — AVOID) [Category C for cats]
- Heavy synthetic fragrance complexes [Category D]
- Methylchloroisothiazolinone / MIT (preservative — sensitizer) [Category D]
- High-concentration Benzalkonium Chloride [Category C for cats]
Characteristics:
- Moderate to high species-specific toxicity risk
- Oral ingestion risk during grooming
- Sensitization potential
Scoring Impact:
- Mandatory species safety penalty
- Formulation Honesty penalty if not disclosed
- Cannot achieve high Safety or Skin Compatibility scores
---
TIER 4 — PROHIBITED / HIGHLY TOXIC
Examples:
- Permethrin or any pyrethroid in cat-applicable products [Category C; H4]
- Tea Tree Oil in cat or small animal products [Category C; H4]
- Pennyroyal Oil in any pet product [Category C; H4]
- Xylitol in any pet product [Category C]
- Propylene Glycol in cat products [Category C]
- Benzyl Alcohol in cat products [Category C]
- Phenolic compounds in cat or bird products [Category C]
Characteristics:
- Known fatal or severe toxicity in respective species
- No safe concentration threshold established for some agents
Scoring Impact:
- Mandatory MAJOR SAFETY WARNING — first output section
- Safety score: Max 1.0 for targeted species
- Product cannot achieve overall score above 2.0 for that species
- Formulation Honesty mandatory major penalty
================================================
LAYER A2 — DETANGLING AND COAT EFFICACY RULE
DETANGLING AGENT CLASSIFICATION
HIGH EFFICACY DETANGLERS:
- Dimethicone (low MW, water-soluble) — excellent slip [Tier 2; monitor cats]
- Cyclomethicone — lightweight, volatile detangler [monitor at high use]
- Polyquaternium-10, Polyquaternium-7 — film-forming, anti-static
- Behentrimonium Methosulfate — cationic conditioning, detangling
- Hydrolyzed Keratin [H1] — structural detangling for damaged coats
- Panthenol [H1] — softening, reduced tangling
MODERATE EFFICACY:
- Aloe Vera [H1] — mild detangling benefit
- Glycerin — minor slip benefit
- Light plant oils — Jojoba [H2], Argan [H2] — minor slip
LOW / DECORATIVE EFFICACY:
- Botanical extracts at trace levels [H3]
- "Vitamin-enriched" claims from decorative vitamin additions [H3]
- Collagen at high MW (no coat penetration) [H3]
- Floral waters as detangling claim [H3]
COAT TYPE RULE:
Detangling efficacy must be evaluated in context of coat type claims.
Long/double coats require stronger detangling architecture than short coats.
"For all coat types" claim requires versatile architecture — single light
conditioning agent cannot achieve full credit for this claim.
================================================
LAYER A3 — PRESERVATIVE SAFETY RULE (BOTH TRACKS)
Preservatives in pet grooming sprays require species-specific safety evaluation
because of grooming ingestion risk (cats) and skin sensitivity variation.
PREFERRED / LOW CONCERN:
- Potassium Sorbate (low concern across species) [Category A]
- Phenoxyethanol (low concentration ≤1%; low concern for dogs;
  moderate concern for cats — ingestion route) [Category B for cats]
- Benzyl Alcohol (LOW concentration in dog-only products;
  PROHIBITED in cat products) [Category C for cats]
- Natural preservative systems (Rosemary Extract [H2], Vitamin E [H2] as antioxidants)
MODERATE CONCERN:
- Methylparaben, Ethylparaben — low but present concern for cats [Category D]
- DMDM Hydantoin (formaldehyde releaser) — avoid in cat products;
  flag in dog products [Category D]
HIGH CONCERN / AVOID IN CAT AND SMALL ANIMAL PRODUCTS:
- Methylisothiazolinone (MIT) / Methylchloroisothiazolinone (CMIT) —
  potent sensitizer; avoid [Category D]
- Formaldehyde releasers (Quaternium-15, DMDM Hydantoin, Imidazolidinyl Urea) —
  toxic concern for cats [Category D]
- Benzalkonium Chloride — TOXIC to cats; flag for all species [Category C]
================================================
LAYER A4 — CORE SCORING SYSTEM (TRACK A)
Score range: 1.0 → 5.0 for every dimension
---
SAFETY [DOMINANT — Weight: 0.30]
Evaluates:
- Species-specific toxicity of every ingredient (per Category system)
- Grooming ingestion safety (cats as primary concern)
- Dermal sensitization potential under repeated application
- Aerosol inhalation risk (small animals and birds)
- Preservative species safety
- Fragrance and essential oil toxicity by species
- Alcohol carrier safety by species
- Cumulative repeated-application burden
- Daily application 30/90/365-day trajectory at realistic concentrations
Core Rules:
- Tier 4 ingredient for any claimed species → Max Safety 1.0 for that species
- Propylene Glycol in cat product → mandatory major Safety penalty
- Essential oils in cat product → mandatory Safety penalty (H4 classification)
- Aerosol format for small animal or bird product → mandatory inhalation flag
- Safety overrides conditioning efficacy, fragrance, and cosmetic texture in all cases
- Position-proportionate penalties applied per embedded Concentration and Position Rule
---
EFFECTIVENESS [Weight: 0.20]
Core Question:
Does the spray genuinely improve coat condition, manageability,
and health under repeated use across the claimed species?
Evaluates:
- Conditioning agent tier and species appropriateness
- HASE classification of all botanical conditioning claims
- Detangling architecture vs coat type claims
- Moisturizing and skin barrier support
- Coat health benefit trajectory under repeated use
- Honest efficacy claim alignment
Rules:
- Fragrance-dominant spray with no genuine conditioning agent: Max 2.0
- "Nourishing" claims from decorative botanical trace additions (H3): penalty
- Human conditioner architecture applied without species pH adjustment: reduced credit
- H1 botanical at functional position: full Tier credit
- H3 botanical marketed as primary conditioner: Formulation Honesty penalty
---
ALLERGY RISK [Weight: 0.15]
Evaluates:
- Fragrance allergen load (topical + grooming ingestion route for cats)
- Essential oil sensitizer burden across species (HASE-classified)
- Preservative sensitizer risk (species-specific)
- Repeated-application sensitization trajectory
- Cross-species sensitization (human groomer exposure also considered)
- Colorant sensitization load (see Colorant Penalty Rule)
---
ECO IMPACT [Weight: 0.05]
Evaluates:
- Biodegradability of conditioning agents
- Propellant environmental burden (aerosol format)
- Packaging sustainability
- Non-biodegradable silicone accumulation in wastewater
---
INGREDIENT QUALITY [Weight: 0.15]
Evaluates:
- Conditioning architecture coherence and species appropriateness
- HASE tier distribution across botanical and active ingredients
- Absence of species-prohibited ingredients
- Preservative system species safety
- Decorative botanical inflation without functional benefit (H3 dominance penalty)
- Honest active concentration levels
- HASE bonus: +0.2 for H1 dominant architecture
---
SKIN AND COAT COMPATIBILITY [Weight: 0.15]
Evaluates:
- Daily or frequent use tolerance across species
- Buildup risk on coat over repeated application
- Skin barrier resilience under repeated spray use
- Coat texture and health trajectory long-term
- Microbiome stability under repeated application
---
CORE SCORE FORMULA (TRACK A)
Core Score =
(
 Safety × 0.30 +
 Effectiveness × 0.20 +
 Allergy Risk × 0.15 +
 Eco Impact × 0.05 +
 Ingredient Quality × 0.15 +
 Skin and Coat Compatibility × 0.15
)
Note: Safety weighted 0.30 — grooming ingestion pathway for cats and
species-specific toxicity profiles make safety the single most critical axis.
================================================
LAYER A5 — SPECIALIZED COAT CARE PERFORMANCE (TRACK A)
Score Range: 1.0 → 5.0
---
SPECIES TOXICOLOGY SAFETY
Evaluates:
- Complete ingredient evaluation against each claimed species toxicity profile
  (per Category A/B/C/D system)
- Grooming ingestion safety for cats
- Inhalation safety for small animals and birds (aerosol format)
- Preservative safety by species
- HASE H4 classification mandatory for any species-toxic botanical
This is the primary dominant specialized parameter.
Any Tier 4 ingredient for a claimed species: Max 1.0 for that species.
Position does not reduce penalty for species-toxic ingredients.
---
COAT CONDITIONING EFFICACY
Evaluates:
- Conditioning agent tier and HASE classification
- Position-adjusted credit for all conditioning actives
- Detangling performance vs coat type claim
- Moisturizing and softening depth
- Anti-static effectiveness
- Coat shine and manageability improvement
Ceiling Rules:
- H1 dominant at functional positions: eligible for 5.0
- H2 dominant with no H1: Max 3.8
- H3 dominant (decorative botanical claims): Max 2.5
- H4 present in cat product: Tier 4 conditioning ceiling applies
---
DERMAL SAFETY UNDER REPEATED USE
Evaluates:
- Skin irritation risk under regular (daily or several times weekly) application
- Sensitization trajectory over months
- Alcohol carrier drying effect on pet skin
- Preservative accumulation sensitization
- 30/90/365-day repeated-use trajectory at realistic ingredient concentrations
---
COAT HEALTH LONG-TERM
Evaluates:
- Coat quality trajectory under sustained use
- Buildup risk from silicones or heavy conditioners
- Protein-moisture balance for coat fiber health
- Contribution to healthy shedding cycle
- Microbiome stability under sustained application
---
GROOMING INGESTION SAFETY (CATS AND SELF-GROOMING SPECIES)
Evaluates:
- Oral toxicity profile of all ingredients at realistic grooming-ingested dose
- Volume deposited on coat per application
- Cumulative ingestion under normal daily grooming behavior
- Specific cat-toxic ingredient prohibition check
- Cat glucuronidation limitation applied proportionately to realistic licking dose
- 30/90/365-day cumulative grooming-ingested dose assessment
Licking simulation scenario (cats):
"Cat grooms treated area fully post-application — all spray-deposited ingredients
are effectively partially ingested daily; glucuronidation limitation assessed
at realistic licking dose."
This dimension applies with full weight for cat products.
For dog-only products: reduced weight but retained.
For bird and small animal products: weight retained for preening exposure.
V2.0 Licking safety proportionality rule:
Not every spray ingredient in a cat product is equally concerning.
Assess each ingredient's realistic daily licking dose (estimated concentration ×
application volume × grooming fraction). Where the realistic licking dose remains
well below any established veterinary or pharmacological threshold, retain
monitor-level language. Where the realistic licking dose approaches or exceeds
thresholds for a species with glucuronidation limitation, escalate appropriately.
---
BUILDUP RISK
Evaluates:
- Silicone accumulation on coat over repeated application
- Heavy conditioning agent buildup
- Coat weight and limp appearance from buildup
- Need for clarifying wash to reset coat
---
FORMULATION HONESTY
Evaluates:
- Species safety claims vs actual ingredient toxicology
- "Natural = safe" framing without species-specific evidence (H4 HASE penalty)
- Conditioning efficacy claims vs active agent presence and position
- H3 botanical marketed as primary conditioner: mandatory penalty
- "Vet-formulated/recommended" claims — verifiable or marketing?
- "pH-balanced" claims vs species-appropriate pH evidence
- Decorative botanical inflation as primary conditioning claim
- Ingredient-count inflation via H3 trace additions
- HASE penalty: −0.3 for H4 "natural/safe" framing
- HASE penalty: −0.2 for H3 dominant architecture marketed as active benefit
---
SPECIALIZED PERFORMANCE SCORE (TRACK A)
Specialized Performance Score =
Average of all 7 specialized scores
Dominant Parameters:
- Species Toxicology Safety → mandatory primary parameter
- Coat Conditioning Efficacy → primary efficacy parameter
- Grooming Ingestion Safety → mandatory for cat and self-grooming species
- Formulation Honesty → primary credibility parameter
---
FINAL RATING FORMULA (TRACK A)
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
HIGH SCORE ELIGIBILITY >4.0 (TRACK A):
- Tier 1 conditioning agents dominant (H1 HASE classification)
- No Tier 3 or 4 ingredients for any claimed species
- Species-appropriate pH range
- Grooming ingestion safety confirmed for self-grooming species
- Fragrance load minimal or absent
- No essential oils in cat or small animal products
- Formulation Honesty ≥ 3.5
- Buildup Risk score ≥ 3.0
- Preservative species-safe
- No H4 botanical classifications in formula
DISQUALIFIERS:
- Any Tier 4 ingredient for claimed species
- Propylene Glycol in cat product
- Essential oils in cat or bird product (H4 classification applies)
- Pyrethroid in any cat product
- Aerosol format near birds without explicit safety warning
- "All pets safe" claim contradicted by ingredient toxicology
================================================
================================================
TRACK B — DEODORIZING / FRESHENING SPRAY ALGORITHM
================================================
LAYER B0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward deodorizing / freshening sprays that demonstrate:
- Genuine odor neutralization or elimination — not fragrance masking
- Species-appropriate safety under repeated topical and inhalation exposure
- Grooming ingestion safety for self-grooming species (cats)
- Minimal respiratory burden for small animals and birds
- Honest odor control efficacy — coverage, duration, mechanism
- Fragrance burden minimization
- Waterless cleansing safety where claimed
- Long-term coat and skin compatibility
Mandatory penalties for:
- Fragrance masking marketed as odor elimination
- Essential oil "natural" deodorizing in cat or bird products (H4 classification)
- Alcohol-dominant carriers without toxicity disclosure
- Aerosol format near birds without respiratory warning
- Missing grooming ingestion safety evaluation for cats
- "Neutralizes pet odors" claims from fragrance-only systems
TRANSPARENCY PRIORITY RULE
Ignore: Fragrance freshness perception · "Natural essential oil" deodorizing
marketing · Trend-driven active loading · Ingredient-count inflation
Evaluate only: Genuine odor neutralization vs fragrance-masking ratio ·
Species-appropriate toxicity profile · Coat and skin barrier compatibility ·
Grooming ingestion safety · Repeated-use tolerance · Microbiome stability
---
ODOR MECHANISM TIER SYSTEM (TRACK B — PET-SPECIFIC)
TIER 1 — GENUINE ODOR NEUTRALIZATION (PET-SAFE)
Examples:
- Zinc Ricinoleate — traps and neutralizes odor molecules; low toxicity [Category A]
- Cyclodextrins (Beta-Cyclodextrin) [H1] — encapsulates odor molecules; safe
- Enzymatic systems (Protease, Lipase) [H1 where evidenced] —
  breaks down organic odor compounds; safe and effective;
  especially relevant for pet biological odors
- Baking Soda / Sodium Bicarbonate — mild neutralizer; very safe across species
  [Category A]
- Activated Charcoal (in non-inhalable format) [Category A]
- Chlorophyll derivatives (pet-specific oral/topical odor neutralizers) [Category A]
- Chitosan-based systems [H1] — antimicrobial + odor control
Characteristics:
- Addresses odor molecules or sources directly
- Low systemic toxicity across dog, cat, small animal (Category A)
- Grooming ingestion generally safe at use concentrations
- Does not add fragrance burden
Scoring Impact:
- Full Odor Elimination credit
- Species safety credit
- Eligible for maximum Effectiveness scores
---
TIER 2 — TARGETED ANTIMICROBIAL / PARTIAL NEUTRALIZATION
Examples:
- Zinc Ricinoleate + low safe fragrance (dog-safe)
- Enzymatic base + minimal fragrance
- Baking Soda + aqueous carrier + light safe scent
- Mild microbiome-considerate antimicrobials
- Prebiotics/postbiotics supporting commensal microbiome
- Zinc acetate/gluconate
Characteristics:
- Genuine neutralizer present as dominant mechanism
- Fragrance is secondary and at low concentration
- Fragrance selected for species safety
Scoring Impact:
- Strong Odor Elimination credit
- Species safety maintained if fragrance is species-safe
- Formulation Honesty maintained
---
TIER 3 — PHYSICAL ADSORPTION / ABSORPTION + FRAGRANCE MASKING BLEND
Examples:
- Baking soda + fragrance (partial neutralizer + masking)
- Activated charcoal + fragrance
- Fragrance + water or alcohol spray (no neutralizer)
- Scented dry shampoo without odor neutralizer
Characteristics:
- Relies on fragrance to overpower pet odor perception
- Underlying odor returns when fragrance dissipates
- Adds fragrance VOC burden to existing odor
Scoring Impact:
- No full Odor Elimination credit
- Max Effectiveness: 2.5
- Mandatory Formulation Honesty penalty if marketed as odor elimination
- Species safety evaluation of masking fragrance still required
---
TIER 4 — COUNTERPRODUCTIVE / HARMFUL MASKING
Examples:
- Essential oil-dominant deodorizers for cats (H4 — fragrance = toxic masking agent)
- High-alcohol spray for cats (Category C — toxic + masking = double failure)
- Phenolic compound "disinfecting" pet spray (Category C for cats)
- Essential oil blends in bird-applicable sprays
Scoring Impact:
- Mandatory major Safety penalty
- Max Effectiveness: 1.5
- Max overall score: 2.0 for targeted species
- H4 HASE classification and mandatory penalty applied
ODOR CONTROL SYSTEM CLASSIFICATION
System                          | Classification
Tier 1 dominant                 | Excellent
Tier 1 + Tier 2                 | Excellent (microbiome note)
Tier 2 dominant                 | Good
Tier 2 + Tier 3                 | Moderate-Good
Tier 3 dominant (physical only) | Moderate
Tier 4 dominant (masking)       | Poor
Tier 4 with toxic species risk  | Very Poor — mandatory warning
================================================
LAYER B1 — WATERLESS / DRY SHAMPOO RULE
Some deodorizing sprays double as waterless cleansing products.
WATERLESS CLEANSING AGENT CLASSIFICATION
EFFECTIVE AND SAFE:
- Gentle surfactant base (Coco-Glucoside [H2], Decyl Glucoside,
  Sodium Cocoyl Glutamate) — mild cleansing; very low toxicity [Category A]
- Micellar water system — low irritation; effective light cleansing
- Aloe Vera dominant [H1] — soothing; mild surface cleansing
MODERATE CONCERN:
- Isopropyl Alcohol >5% — cleansing effective; toxicity concern for cats [Category C]
- Witch Hazel (Hamamelis Water) [H2] — mild astringent; low concern for dogs;
  moderate concern for cats (tannin + alcohol content) [Category B]
HIGH CONCERN:
- Ethanol / SD Alcohol dominant — TOXIC concern for cats; drying for all species
  [Category C for cats]
- Benzalkonium Chloride — cleansing effective; TOXIC to cats [Category C]
WATERLESS CLAIM HONESTY RULE:
- "Cleans without water" requires genuine surfactant or micellar cleansing mechanism
- Fragrance spray claiming "waterless cleaning" without cleansing agent →
  Formulation Honesty penalty + H3 classification for claimed botanical cleanser
================================================
LAYER B2 — INHALATION SAFETY RULE (BOTH TRACKS)
CRITICAL FOR SMALL ANIMALS AND BIRDS
Aerosol spray format generates fine mist particles inhaled directly during application.
All spray formats generate some inhalation exposure.
INHALATION SAFETY CLASSIFICATION BY SPECIES:
BIRDS:
- ANY aerosol spray in same room → MAJOR RESPIRATORY HAZARD
- Essential oil mist → HIGHLY TOXIC [H4; Category C]
- Fragrance mist → Significant risk [Category D]
- Rule: Bird-applicable spray must be pump spray applied away from bird,
  or product must explicitly state "do not use near birds"
- Aerosol format + bird claim → Mandatory major Safety warning;
  Safety score Max 1.5
RABBITS AND GUINEA PIGS:
- Aerosol sprays near face → significant respiratory stress
- Essential oil mist → HIGH CONCERN [H4 for functional positions]
- Rule: Spray applied away from face; minimal mist inhalation
- Products must specify application method avoiding direct face spray
CATS:
- Aerosol near face → moderate inhalation concern
- Essential oil mist → TOXIC by inhalation [H4; Category C]
- Grooming ingestion: primary toxicity route after spray deposits on coat
DOGS:
- General inhalation concern; lower than cats for most agents
- Essential oil mist: moderate concern
- Aerosol near face: irritation concern; avoid direct face spray
INHALATION SAFETY SCORING RULE:
Aerosol format products receive mandatory inhalation evaluation for all species.
Pump spray format receives reduced (but not zero) inhalation scrutiny.
================================================
LAYER B3 — CORE SCORING SYSTEM (TRACK B)
Score range: 1.0 → 5.0 for every dimension
---
SAFETY [DOMINANT — Weight: 0.30]
Evaluates:
- Odor neutralizer safety by species (per Category system)
- Fragrance/essential oil species toxicity (HASE-classified)
- Grooming ingestion safety (cats primary)
- Inhalation safety by species and format
- Alcohol and solvent carrier safety
- Preservative species safety
- Cumulative repeated-application burden
- 30/90/365-day trajectory at realistic concentrations
Core Rules:
- Essential oils in cat product → mandatory Safety penalty (H4 classification)
- Aerosol near birds → mandatory major Safety penalty
- Grooming ingestion pathway always evaluated for cat products
- Safety overrides deodorizing efficacy, scent, and cosmetic feel
- Position-proportionate penalties per embedded Concentration and Position Rule
---
EFFECTIVENESS [Weight: 0.20]
Core Question:
Does the spray genuinely neutralize or eliminate pet odor,
or only mask it with fragrance?
Evaluates:
- Odor mechanism tier (Tier 1/2/3/4)
- HASE classification of all botanical odor-control claims
- Position-adjusted credit for all odor-control actives
- Performance on pet-specific biological odors (sebaceous, anal gland, urine)
- Coverage adequacy
- Duration of genuine odor control
- Waterless cleansing efficacy where claimed
Rules:
- Tier 3 masking: Max 2.5
- Tier 4 harmful: Max 1.5
- "Eliminates pet odor" from fragrance-only → mandatory penalty
- Enzymatic systems targeting pet-specific odor compounds receive full credit
- H3 botanical marketed as primary odor eliminator: Formulation Honesty penalty
---
ALLERGY RISK [Weight: 0.15]
Evaluates:
- Fragrance allergen burden on pet skin and via grooming ingestion
- Human groomer exposure (hands, inhalation during spraying)
- Essential oil sensitizer spectrum (HASE-classified)
- Preservative sensitization trajectory
- Repeated application accumulation
- Colorant sensitization load
---
ECO IMPACT [Weight: 0.05]
Evaluates:
- Aerosol propellant environmental impact
- Biodegradability of neutralizing agents and carriers
- Packaging format sustainability
- Enzymatic system environmental compatibility
---
INGREDIENT QUALITY [Weight: 0.15]
Evaluates:
- Odor mechanism coherence and species safety
- HASE tier distribution across all botanical and active ingredients
- Neutralizer vs fragrance architecture logic
- Preservative species appropriateness
- Absence of species-prohibited agents
- Honest concentration levels of active neutralizers
- HASE bonus: +0.2 for H1 dominant architecture
- H3 dominance penalty for decorative botanical inflation
---
SKIN AND COAT COMPATIBILITY [Weight: 0.15]
Evaluates:
- - Coat compatibility under repeated deodorizing spray use
- Dryness or irritation from alcohol carriers
- Buildup from repeated fragrance or conditioning agents in formula
- Long-term coat health trajectory
- Microbiome stability under sustained application
---
CORE SCORE FORMULA (TRACK B)
Core Score =
(
 Safety × 0.30 +
 Effectiveness × 0.20 +
 Allergy Risk × 0.15 +
 Eco Impact × 0.05 +
 Ingredient Quality × 0.15 +
 Skin and Coat Compatibility × 0.15
)
================================================
LAYER B4 — SPECIALIZED DEODORIZING PERFORMANCE (TRACK B)
Score Range: 1.0 → 5.0
---
SPECIES TOXICOLOGY SAFETY
Identical to Track A — primary dominant parameter.
Grooming ingestion + inhalation + dermal routes all evaluated.
HASE H4 classification mandatory for any species-toxic botanical.
Category system applied to all ingredients.
---
ODOR ELIMINATION EFFICACY
Evaluates:
- Odor mechanism tier (Tier 1/2/3/4)
- HASE classification of all botanical odor-control actives
- Position-adjusted credit for all odor-control ingredients
- Performance on pet-specific odor types:
  - Sebaceous coat odor (oily dog smell)
  - Urine/fecal odor (between-bath use)
  - Anal gland secretion odor
  - Wet dog/cat odor
- Enzymatic vs chemical vs physical neutralization
- Duration of genuine effect
Ceiling Rules:
- Tier 4 mechanism → Max 1.5
- Tier 3 masking only → Max 2.5
- Tier 2 partial neutralizer → Max 4.0
- Tier 1 dominant neutralizer → Eligible for 5.0
- H1 botanical at functional position: eligible for full Tier credit
- H3 botanical marketed as primary odor agent: Tier 4 classification; Max 2.5
---
INHALATION SAFETY BY SPECIES
Evaluates:
- Per-species inhalation burden during spray application
- Aerosol particle size and lung deposition risk
- Essential oil vapor toxicity by species (H4 in cat/bird products)
- Fragrance VOC inhalation burden
- Format-appropriate application guidance adequacy
---
GROOMING INGESTION SAFETY
Evaluates:
- Complete oral toxicity profile of all ingredients for self-grooming species
  at realistic licking dose
- Volume deposited on coat per application
- Cumulative ingestion under normal daily grooming behavior
- Specific cat-toxic ingredient prohibition compliance
- Cat glucuronidation limitation applied at realistic licking dose
- 30/90/365-day cumulative ingestion trajectory
Licking simulation scenario (cats):
"Cat grooms treated area fully post-application — all spray-deposited ingredients
are effectively partially ingested daily."
V2.0 Licking safety proportionality rule applies — see embedded rule above.
This dimension carries maximum weight for cat products.
---
DURATION AND COVERAGE HONESTY
Evaluates:
- Claimed odor control duration vs mechanism realism
- Coverage area per application vs actual spray output
- Reapplication frequency transparency
- "Long-lasting" claims from fragrance-only systems → penalty
- H3 botanical marketed as extended odor control: Formulation Honesty penalty
---
WATERLESS CLEANSING EFFICACY (WHERE CLAIMED)
Evaluates:
- Surfactant or micellar cleansing mechanism adequacy
- Light soil and sebum removal
- Residue-free rinse-free performance
- "Dry shampoo" claims without cleansing agent → Formulation Honesty penalty + H3 flag
---
CUMULATIVE EXPOSURE RISK
Evaluates:
- Fragrance sensitization over months of repeated use
- Preservative accumulation sensitization
- Alcohol carrier drying accumulation on coat and skin
- Human groomer cumulative hand and inhalation exposure
- Frequency-weighted licking dose accumulation (cats + glucuronidation limitation —
  30/90/365-day trajectory at realistic concentration)
---
FORMULATION HONESTY
Evaluates:
- "Eliminates pet odors" vs masking mechanism
- "Natural/essential oil" deodorizer safety claims vs species toxicology
  (H4 HASE penalty applied)
- "Vet-approved" claims — verifiable?
- Coverage and duration claim accuracy
- Waterless cleansing claims without cleansing agent
- "Safe for all pets" claims vs ingredient toxicology
- H3 botanical marketed as odor control active: mandatory penalty
- Ingredient-count inflation via decorative botanical additions
- HASE penalties: −0.3 for H4 "natural/safe" framing; −0.2 for H3 dominant marketing
---
SPECIALIZED PERFORMANCE SCORE (TRACK B)
Specialized Performance Score =
Average of all 8 specialized scores
Dominant Parameters:
- Species Toxicology Safety → mandatory primary parameter
- Odor Elimination Efficacy → primary efficacy parameter
- Grooming Ingestion Safety → mandatory for self-grooming species
- Formulation Honesty → primary credibility parameter
---
FINAL RATING FORMULA (TRACK B)
Final Rating =
(Core Score × 0.50) +
(Specialized Performance Score × 0.50)
HIGH SCORE ELIGIBILITY >4.0 (TRACK B):
- Tier 1 or Tier 2 odor neutralization mechanism dominant (H1 HASE classification)
- No Tier 3 or 4 ingredients for any claimed species
- Grooming ingestion safe for self-grooming species
- Aerosol format absent or used with adequate species safety guidance
- Fragrance load minimal or absent
- No essential oils in cat or small animal products (no H4 classifications)
- Formulation Honesty ≥ 3.5
- Species Toxicology Safety ≥ 4.0
DISQUALIFIERS:
- Fragrance-masking Tier 3 mechanism claiming odor elimination
- Any Tier 4 ingredient for claimed species
- Essential oils in cat or bird product (H4 classification applies)
- Aerosol format for bird product without explicit species warning
- "Safe for all pets" claim contradicted by cat-toxic ingredient
================================================
================================================
SHARED LAYERS — BOTH TRACKS
================================================
LAYER S1 — COLORANT PENALTY RULE
Artificial colorants add no conditioning, deodorizing, or coat health benefit
and create unnecessary sensitization burden — with grooming ingestion risk
for cats adding an oral exposure component.
High concern: Red 40, Yellow 5, Yellow 6, Blue 1, Green 3
Penalty Language: MODERATE FLAG —
"Synthetic colorants in this spray-on formula add unnecessary sensitization
burden at repeated application without functional benefit."
Scoring Impact:
- Allergy Risk penalty
- Ingredient Quality penalty
- Formulation Honesty penalty
- For cat products: additional grooming ingestion toxicity flag
Must be noted under Concerns in output.
---
LAYER S2 — ANTI-MARKETING FILTER (BOTH TRACKS)
Mandatory penalties for:
- "Natural essential oils = safe for pets" framing
  [H4 HASE classification; −0.3 Formulation Honesty]
  Essential oils are among the most common causes of feline toxicity
- "Vet-formulated/recommended" without verifiable veterinary involvement
- "Safe for all pets" with ingredients toxic to cats or birds
- "Kills bacteria naturally" (essential oil antibacterial) claims without
  biocidal evidence — H3 or H4 classification depending on species context
- "Chemical-free" pet spray (impossible category)
- "Eliminates odors" from fragrance-masking Tier 3 mechanism
- "Dry cleans coat" without surfactant or micellar cleansing agent (H3 flag)
- "Waterless bath" from fragrance spray only
- Ingredient-count inflation with decorative botanical trace additions (H3 dominance)
- "Gentle formula" framing for products containing cat-toxic agents
---
LAYER S3 — BIAS NEUTRALIZATION FILTER (BOTH TRACKS)
Neutralize:
- "Natural = safe for pets" bias
  Pyrethrins are natural and highly toxic to cats.
  Essential oils are natural and highly toxic to cats and birds.
  H4 HASE classification is the correct response to this framing.
- "Essential oil = gentle" bias — opposite is true for cats
- "Human-grade ingredients = pet-safe" bias
- "Strong scent = effective deodorizer" bias
- "More ingredients = more effective grooming" bias
- "Vet-approved sticker = fully evaluated" bias
- "DEET-free / paraben-free" label = overall safe bias
  Absence of one concern does not confirm species safety
- "Organic certification = pet safe" bias
- Thick or creamy texture = deeper conditioning bias
  Coat buildup risk increases with heavy texture in pets
- "H3 botanical count = product quality" bias
  Decorative botanical inflation is a Formulation Honesty failure, not a quality signal
---
LAYER S4 — MICROBIOME COMPATIBILITY RULE (BOTH TRACKS)
Evaluates:
- Commensal skin microbiome preservation under repeated spray application
- Targeted vs broad-spectrum antimicrobial impact
- Long-term microbiome balance under daily use
High-concern agents for microbiome:
- Broad-spectrum antimicrobials at repeated daily use concentrations
- High-preservative load formulas
- Benzalkonium Chloride (additionally Category C for cats)
Scoring impact on Skin and Coat Compatibility and Cumulative Exposure Risk dimensions.
================================================
COMBINED FINAL RATING RULES (BOTH TRACKS)
Dual-function products (Track A + Track B):
- Evaluated under BOTH track algorithms
- Final overall rating = lower of the two track scores (Primary Rating)
- Both track scores disclosed in output
Score ceiling rules override all other scoring:
- Tier 4 ingredient in any claimed species: Safety Max 1.0 for that species
- H4 botanical in cat product: Product cannot achieve overall score >2.0 for cats
- Fragrance-masking Tier 3 as primary deodorizing mechanism: Effectiveness Max 2.5
- Aerosol format + bird claim + no safety guidance: Safety Max 1.5
================================================
================================================
STRICT EVALUATION RULES — BOTH TRACKS
NO MEDICAL OR VETERINARY DIAGNOSTIC CLAIMS ANYWHERE
No marketing influence on scoring
Species toxicology MUST be evaluated for every claimed species before scoring
Cat grooming ingestion pathway MUST be evaluated for all cat-applicable products
Bird inhalation safety MUST be evaluated for all bird-applicable or aerosol products
Odor mechanism tier MUST be classified before Effectiveness scoring (Track B)
Conditioning agent tier MUST be classified before Effectiveness scoring (Track A)
HASE classification MUST be applied to every botanical ingredient before scoring
Category system (A/B/C/D) MUST be applied to every ingredient before scoring
Concentration and Position Rule MUST be applied before penalty assignment
Penalty Language Calibration Rule MUST govern all output language for concerns
Preservative system MUST be evaluated for species safety
Fragrance and essential oil burden MUST be evaluated by species (HASE mandatory)
Essential oils in cat or bird products → mandatory Safety warning — H4 — no exceptions
Propylene Glycol in cat products → mandatory Safety warning — no exceptions
Permethrin or pyrethroids in cat products → mandatory Safety warning — no exceptions
Aerosol format near birds → mandatory Safety warning — no exceptions
"Natural = safe for pets" bias MUST be neutralized — H4 framing applied
"Human-grade = pet-safe" bias MUST be neutralized
"Safe for all pets" claims MUST be verified against complete species toxicology
Grooming ingestion converts topical spray exposure to partial oral exposure for cats
Species compatibility scores MUST reflect actual toxicological evaluation —
  not marketing claims
Structural weakness overrides grooming efficacy, scent, and cosmetic texture
  in all scoring dimensions
Proportionality is mandatory — not every spray ingredient is equally concerning;
  realistic daily dose, position, and cumulative trajectory govern penalty severity
H4 requires realistic toxicity at achievable spray-deposited + licking doses —
  theoretical or in vitro-only concerns at trace positions use H2/H3 with monitor note
================================================

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT (BOTH TRACKS)


# ⭐ FINAL RATING

## X.X / 5 — Rating Level

**Track:** [TRACK A: COAT CARE] / [TRACK B: DEODORIZING] / [DUAL: COAT CARE X.X / DEODORIZING X.X — Primary Rating: lower score]

---

# 🐾 GROOMING SPRAY PROFILE

## Functional Classification

Track A Examples:
- Balanced Pet Coat Conditioner (Species-Safe Architecture)
- Lightweight Detangling Spray (Dog / Cat Safe)
- Essential Oil Conditioning Spray (Cat Toxicity Risk)
- Human-Derived Conditioner Reformulation (Species pH Concern)
- Silicone Coat Coating Spray (Masking Without Genuine Conditioning)

Track B Examples:
- Enzymatic Pet Odor Eliminator (Genuine Neutralization)
- Zinc Ricinoleate Deodorizing Spray (Honest Mechanism)
- Fragrance-Masking Pet Freshener (No Genuine Odor Control)
- Essential Oil Pet Deodorizer (Cat and Bird Toxicity Risk)
- Balanced Neutralizer-Low Fragrance Deodorizer

---

# 🚨 MANDATORY WARNINGS

## Species and Format Safety Flags

*(Listed FIRST — before all other sections. Include only triggered warnings.)*

- CAT TOXICITY WARNING — essential oils, propylene glycol, benzyl alcohol, permethrin, pyrethroids, benzalkonium chloride
- BIRD INHALATION SAFETY WARNING — any aerosol format
- SMALL ANIMAL RESPIRATORY CAUTION — aerosol near rabbits or guinea pigs
- GROOMING INGESTION RISK — cat products with moderate-concern ingredients
- FLAMMABILITY WARNING — aerosol with LPG propellant

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering conditioning or deodorizing mechanism, species toxicology safety profile, grooming ingestion safety for cats, fragrance and essential oil burden, pH species appropriateness, formulation honesty, and overall coat and skin health trajectory.

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

### Skin and Coat Compatibility — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

# 🧪 SPECIALIZED PERFORMANCE

## Track A: Coat Care Analysis

### Species Toxicology Safety — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Coat Conditioning Efficacy — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Dermal Safety Under Repeated Use — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Coat Health Long-Term — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Grooming Ingestion Safety — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Buildup Risk — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Formulation Honesty — ⭐X.X

Short structural reason. Mention why it scored as it did.

---

## Track B: Deodorizing Analysis

### Species Toxicology Safety — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Odor Elimination Efficacy — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Inhalation Safety by Species — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Grooming Ingestion Safety — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Duration and Coverage Honesty — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Waterless Cleansing Efficacy (if claimed) — ⭐X.X

Short structural reason. Mention why it scored as it did.

### Cumulative Exposure Risk — ⭐X.X

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

*(Toxicity flags appear first.)*

- Main structural concern
- Main structural concern
- Main structural concern

---

# 🐕🐈🐇 SPECIES COMPATIBILITY

## Species-Specific Assessment

### Dogs — ⭐X.X

Short explanation.

### Cats — ⭐X.X

Short explanation.

### Rabbits — ⭐X.X

Short explanation.

### Guinea Pigs — ⭐X.X

Short explanation.

### Birds — ⭐X.X

Short explanation.

---

# 🐾 COAT TYPE COMPATIBILITY

## Coat-Specific Assessment (Track A)

### Short / Smooth Coats — ⭐X.X

Short explanation.

### Long / Double Coats — ⭐X.X

Short explanation.

### Curly / Wavy Coats — ⭐X.X

Short explanation.

### Fine / Silky Coats — ⭐X.X

Short explanation.

### Thick / Coarse Coats — ⭐X.X

Short explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Several Times Weekly — ⭐X.X

Short explanation.

### Occasional / Between-Bath Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Coat feel, slip, detangling (Track A)
- Odor perception change (Track B)
- Pet comfort and stress response to application
- Any immediate skin irritation signals

## Medium-Term

- Coat health trajectory
- Buildup accumulation signals
- Sensitization development in pet or human groomer
- Odor control duration reality vs claim

## Long-Term

- Species-specific chronic exposure safety trajectory
- Grooming ingestion cumulative burden for cats
- Coat quality change under sustained use
- Microbiome and skin health stability

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting conditioning or deodorizing mechanism, species toxicology (mandatory for cat-toxic agents), grooming ingestion safety, inhalation safety for aerosol formats, buildup risk, sensitization risk, and formulation honesty signals.

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

- NO MEDICAL OR VETERINARY DIAGNOSTIC CLAIMS ANYWHERE
- No marketing influence on scoring
- Species toxicology must be evaluated for every claimed species before scoring
- Cat grooming ingestion pathway must be evaluated for all cat-applicable products
- Bird inhalation safety must be evaluated for all bird-applicable or aerosol products
- Odor mechanism must be classified before Effectiveness scoring (Track B)
- Conditioning agent must be classified before Effectiveness scoring (Track A)
- Preservative system must be evaluated for species safety
- Fragrance and essential oil burden must be evaluated by species
- Essential oils in cat or bird products → mandatory Safety warning — no exceptions
- Propylene glycol in cat products → mandatory Safety warning — no exceptions
- Permethrin or pyrethroids in cat products → mandatory Safety warning — no exceptions
- Aerosol format near birds → mandatory Safety warning — no exceptions
- "Natural = safe for pets" bias must be neutralized
- "Human-grade = pet-safe" bias must be neutralized
- "Safe for all pets" claims must be verified against complete species toxicology
- Grooming ingestion converts topical exposure to partial oral exposure for cats
- Species compatibility scores must reflect actual toxicological evaluation — not marketing claims
- Structural weakness overrides grooming efficacy, scent, and cosmetic texture in all scoring dimensions
- Natural ≠ automatically safer
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

*Pet Grooming Spray Evaluation Algorithm — Structured for species toxicology safety analysis, coat conditioning or odor elimination mechanism assessment, grooming ingestion safety evaluation, and long-term coat and skin health outcome. All scoring is structural and evidence-informed.*
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
              "You are a strict pet grooming spray structural evaluation engine."
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