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
        "AIRFRESHENER ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
## ALGORITHM 7 — AIR FRESHENER EVALUATION V3.0
### LAYER 0 — FOUNDATION ENGINE
**System Objective**
Reward air fresheners demonstrating: genuine odor neutralization or elimination — not masking; minimal VOC burden on indoor air quality; low sensitization and respiratory irritation risk under chronic indoor exposure; formulation transparency; regulatory compliance for indoor air product safety; environmental responsibility in propellant and carrier systems; honest efficacy claims — duration, coverage, neutralization vs masking; low cumulative inhalation burden under real-world continuous exposure; pet and child safety adequacy.
Mandatory penalties for: odor masking marketed as odor elimination; high VOC loading in enclosed indoor environments; fragrance complexity marketed as "freshness" without neutralization evidence; aerosol propellant systems with unnecessary environmental burden; "natural/essential oil" freshener marketed as non-toxic without inhalation disclosure; missing pet safety warnings where relevant; phthalate or formaldehyde-releasing preservative presence without disclosure; misleading coverage area or duration claims; "antibacterial air" claims without registered biocidal evidence.
**Dominant Principle**
Indoor air quality impact is the dominant evaluation axis. Inhalation safety overrides all fragrance, scent, or aesthetic considerations. Chronic continuous exposure is the correct exposure model — not single-use.
**Anti-Fearmongering Calibration**
CRITICAL: A moderate-fragrance aerosol air freshener used occasionally in a ventilated bathroom is NOT the same inhalation risk as a continuous plug-in diffuser running 24/7 in an enclosed bedroom. Format and frequency drive the risk model.
A conventional aerosol spray freshener (Tier 3 masking) is a mainstream product. It should be scored honestly:
- It masks odors, not eliminates them (Effectiveness ceiling 2.5)
- It adds VOC burden to indoor air
- It is tolerated by most adults in occasional use in ventilated spaces
NEVER use alarmist language for a standard aerosol air freshener used occasionally. Reserve high Safety penalties for:
- Ozone-generating devices
- Continuous plug-in systems in enclosed spaces with no ventilation guidance
- Products with phthalate carriers in continuous format
- Essential oil diffusers with pet-toxic actives in enclosed spaces with pets
Prefer calibrated wording: "adds fragrance VOC load to indoor air without neutralizing the underlying odor source," "continuous exposure format amplifies sensitization potential vs occasional aerosol use," "not recommended for enclosed spaces with cats — essential oils potentially toxic to cats."
**Concentration Uncertainty Rule**
Fragrance composition is rarely fully disclosed. Apply probabilistic wording: "fragrance load appears moderate/heavy based on ingredient positioning — exact VOC contribution uncertain." "Likely contains terpene components that may react with indoor ozone to form secondary pollutants under continuous use." Never claim exact VOC output without disclosed fragrance data.
**Mechanistic Plausibility Filter — Air Fresheners**
Before crediting any odor control mechanism:
- Is the neutralizer (zinc ricinoleate, cyclodextrin, activated charcoal) present at a likely functional concentration?
- Is the format compatible with reaching airborne odor molecules at room scale?
- Is contact time between neutralizer and odor molecule realistic in the delivery format?
- Or is fragrance the sole active mechanism (masking only)?
Masking is a real and legitimate product function — it scores as Tier 3 with honest ceilings. It cannot receive odor elimination credit.
**Real-World Tolerability — Air Fresheners**
Conventional aerosol air fresheners are used safely by billions globally in occasional use. These products do not represent meaningful acute health risk for most adults in standard ventilated use. Moderate fragrance exposure from occasional aerosol use = low chronic burden. Do not inflate Safety penalties for mainstream products beyond realistic exposure. Continuous plug-in diffusers in poorly ventilated spaces with pets or infants = legitimate higher concern. Score proportionally by format and frequency.
**Transparency Rule — Evaluate Only:**
Odor neutralization mechanism vs masking; VOC burden and indoor air quality impact; inhalation safety under chronic continuous exposure; fragrance allergen load; propellant and carrier safety; regulatory compliance; pet and child safety; honest efficacy claims; environmental persistence and impact.
**Global Enforcement Rules**
- Indoor air quality impact is the dominant evaluation axis
- Masking odors with fragrance is NOT odor elimination
- "Natural" essential oils are VOCs — identical evidence standard to synthetic fragrance
- Fragrance complexity = higher allergen burden, not higher quality
- Aerosol format increases inhalation risk vs passive formats
- Pet and child inhalation safety must be evaluated independently
- Phthalates in fragrance carriers are a mandatory disclosure concern
- "Antibacterial air" claims require registered biocidal evidence
- VOC emissions data overrides marketing positioning in scoring
**Evidence Quality Tiers — Air Fresheners**
- E1 — Zinc ricinoleate, beta-cyclodextrin, activated charcoal, enzymatic neutralizers: genuine odor elimination evidence = Tier 1 mechanism credit
- E2 — Zinc ricinoleate + fragrance blend at credible ratio: Tier 2 partial neutralization credit
- E3 — Conventional fragrance masking (most standard air fresheners): Tier 3 — real product, honest Effectiveness cap at 2.5
- E4 — "Natural essential oil" disinfection claims, "purifying" crystal claims without mechanism
- E5 — Ozone generator marketed as "fresh air," homeopathic air freshener claims
**Herbal / Botanical Classification — Air Fresheners**
- H1 — Activated charcoal, enzymatic systems: evidence-supported genuine odor capture/elimination = full neutralization credit.
- H2 — Essential oils with partial deodorizing evidence (tea tree at functional concentration in contact-zone application): limited credit with probabilistic wording. "May provide minor antimicrobial support in direct contact application — ambient air disinfection not supported."
- H3 — Decorative botanical fragrance blends in standard air fresheners: masking only. "Botanical fragrance system functions as odor masking agent — no genuine odor elimination mechanism present." Formulation Honesty penalty if marketed as elimination.
---
### FORMAT CLASSIFICATION — MANDATORY FIRST STEP
Before any scoring, the air freshener format must be classified. Format determines exposure pathway, inhalation intensity, and relevant safety modifiers.
**Format 1 — Continuous Passive Exposure**
Examples: plug-in electric diffusers; gel fresheners (open container); reed diffusers; hanging car fresheners; solid block fresheners; wax melts (heated); automatic timed-release sprays (low-output).
Characteristics: continuous low-level VOC release; chronic inhalation exposure model applies; greatest cumulative indoor air burden over time; enclosed spaces amplify exposure significantly.
Scoring: highest chronic inhalation safety scrutiny; VOC load evaluation mandatory; pet and child continuous exposure mandatory evaluation; no short-contact-time relief — every ingredient is a chronic exposure.
**Format 2 — Intermittent Aerosol / Spray**
Examples: manual pump aerosol sprays; pressurized aerosol cans (spray and walk away); trigger pump sprays; manual mist sprays.
Characteristics: acute high-concentration inhalation burst at application; rapid dilution and settling after; propellant evaluation mandatory.
Scoring: acute inhalation safety evaluated at application peak; lower chronic burden than Format 1 if used infrequently; frequent use converts to chronic exposure model.
CALIBRATION: Format 2 used occasionally in a ventilated room = lower chronic safety concern than Format 1 continuous. Score reflects realistic exposure model.
**Format 3 — Targeted / Localized**
Examples: odor-eliminating sprays (enzymatic, activated charcoal, zinc ricinoleate-based); fabric refresher sprays; shoe/gym bag deodorizer sprays; toilet/pre-poo drops.
Characteristics: targeted application to odor source; limited ambient air impact; lower ambient VOC burden.
Scoring: lower ambient inhalation scrutiny; surface safety and close-proximity inhalation evaluated; odor neutralization mechanism is the most important score driver.
**Format 4 — Air Purification Hybrid**
Examples: HEPA + fragrance combination units; ionizer + scent units; activated charcoal + fragrance products; ozone generator + scent products.
Characteristics: dual mechanism — physical air cleaning + fragrance.
OZONE GENERATORS: MANDATORY safety flag. Ozone is a genuine lung irritant. Any ozone generation = mandatory major Safety penalty regardless of scent quality or other features.
Activated charcoal: credible odor neutralization credit. HEPA filtration: full odor removal credit for particulate odors.
---
### LAYER 1 — ODOR MECHANISM TIER SYSTEM
**MANDATORY:** Odor control mechanism must be classified before scoring.
**Tier 1 — Genuine Odor Neutralization / Elimination**
Examples: Zinc Ricinoleate (traps and neutralizes odor molecules); Cyclodextrins / beta-cyclodextrin (encapsulates odor molecules); Activated Charcoal / Activated Carbon (absorbs VOCs); enzymatic odor eliminators (break down odor-causing organic compounds); baking soda / sodium bicarbonate (acid odor neutralization); ClO2 (chlorine dioxide — oxidative elimination, concentration-dependent safety); hydrogen peroxide-based oxidative systems at safe concentrations; HEPA + carbon filtration.
Characteristics: chemically or physically eliminates odor molecules; does not rely on fragrance to cover residual odor; measurable reduction in odor-causing compounds.
Scoring: full Odor Elimination credit; eligible for maximum Effectiveness scores.
**Tier 2 — Partial Neutralization + Masking Blend**
Examples: Zinc Ricinoleate + fragrance blend; Cyclodextrin + fragrance; enzymatic base + added fragrance; activated charcoal + light fragrance; baking soda spray + fragrance.
Characteristics: genuine neutralization component present; fragrance augments residual perception; honest architecture when fragrance load is low.
Scoring: partial Odor Elimination credit; Effectiveness credibility maintained when fragrance load is low; high fragrance loading in Tier 2 shifts classification toward Tier 3.
**Tier 3 — Masking Dominant**
Examples: fragrance-in-water or alcohol spray (no neutralizing agent); essential oil diffuser without neutralizing agent; standard plug-in fragrance units; reed diffusers (fragrance oil only); scented gels; most conventional aerosol air fresheners.
Characteristics: no genuine odor elimination mechanism; relies entirely on fragrance to overwhelm odor perception; underlying odor returns when fragrance dissipates; adds VOC burden.
Scoring: no Odor Elimination credit; Effectiveness ceiling Max 2.5; Formulation Honesty mandatory penalty; indoor air quality burden from added VOCs must be scored.
CALIBRATION: Tier 3 is the most common air freshener category and is a mainstream consumer product. Score it honestly at its ceiling with measured language. "This product masks odors rather than eliminating them" is sufficient and accurate. NOT: "dangerous chemical masking agent."
**Tier 4 — Counterproductive / Harmful Mechanism**
Examples: ozone generators marketed as "air purifiers/fresheners"; high-concentration formaldehyde-releasing "sanitizing" fresheners; chlorine-based aerosol at excessive concentration; ionizers producing excessive ozone.
Characteristics: active mechanism creates indoor air quality hazard. Ozone: lung irritant, triggers asthma, damages respiratory tissue. Formaldehyde: carcinogen, severe respiratory irritant.
Scoring: MANDATORY major Safety penalty regardless of scent quality. Effectiveness cannot exceed 2.0. Mandatory ozone/formaldehyde warning in output — first section. Not eligible for scores above 2.5 in any safety-adjacent dimension.
---
### LAYER 2 — VOC BURDEN RULE
**MANDATORY EVALUATION AXIS** for all formats, with particular weight for Format 1 (continuous exposure).
**High VOC Burden:**
- Complex fragrance blends (>20 undisclosed aromatic compounds)
- Terpene-heavy essential oil systems (limonene, linalool, alpha-pinene — react with ozone to form secondary pollutants including formaldehyde)
- Alcohol-dominant spray carriers as primary vehicle
- Benzene-containing fragrance impurities
- Phthalate plasticizers in fragrance carriers (DBP, DEP, DEHP)
- High-concentration aerosol solvent systems
Scoring: major Indoor Air Quality penalty; Allergy Risk penalty; Safety penalty for chronic exposure formats (Format 1 higher penalty than Format 2).
**Moderate VOC Burden:** moderate fragrance complexity (10–20 compounds); moderate essential oil concentrations; aqueous spray with moderate alcohol.
**Low VOC Burden (preferred):** fragrance-free odor neutralization systems; low-fragrance Tier 1 neutralizer base; water-dominant carrier; single or minimal disclosed fragrance components.
**Zero VOC (maximum credit):** physical odor capture only (activated charcoal, HEPA, cyclodextrin); no added fragrance; no alcohol carrier.
**Secondary Pollutant Formation Rule**
Terpene-containing products (limonene, linalool, alpha-terpinene, alpha-pinene) react with indoor ozone to form formaldehyde, acetaldehyde, ultrafine particles, and secondary organic aerosols.
Mandatory output notation for terpene-heavy products in Format 1 (continuous) and Format 2 (frequent use):
"Contains terpene compounds that may react with indoor ozone to form secondary pollutants including formaldehyde and ultrafine particles. Ensure adequate ventilation."
CALIBRATION: This reaction is scientifically documented. Its significance depends on indoor ozone levels, ventilation, and frequency. For Format 1 in poorly ventilated spaces = genuine concern. For Format 2 occasional use in ventilated spaces = lower concern. Apply notation proportionally by format.
---
### LAYER 3 — FRAGRANCE ALLERGEN BURDEN RULE
Fragrance in air fresheners is a chronic inhalation allergen — not a brief topical exposure. EU fragrance allergen disclosure list (26 declared allergens) applies as reference standard.
**High Concern Fragrance Allergens (inhalation):** Cinnamal; Cinnamyl Alcohol; Eugenol; Isoeugenol; Limonene; Linalool; Citral; Citronellol; Geraniol; Hydroxycitronellal; Oak Moss / Tree Moss; Alpha-isomethyl ionone; Benzyl Alcohol; Benzyl Benzoate.
**Fragrance Allergen Scoring Rule:**
- Fully disclosed fragrance with no high-concern allergens → Allergy Risk credit
- Partially disclosed fragrance → Moderate Allergy Risk penalty
- Undisclosed complex fragrance blend → Major Allergy Risk penalty
- "Parfum" / "Fragrance" as sole ingredient descriptor → Mandatory Formulation Honesty penalty
- Multiple high-concern allergens confirmed or likely → Major Allergy Risk penalty
- Genuinely fragrance-free products (odor control only) → Maximum Allergy Risk credit
- "Unscented" products that still contain masking fragrance → Formulation Honesty penalty
---
### LAYER 4 — PROPELLANT AND CARRIER SAFETY RULE (FORMAT 2 — AEROSOL)
**Propellant Classification:**
- Low concern: compressed air; compressed nitrogen; compressed CO2; HFO propellants (low GWP)
- Moderate concern: HFC propellants (high GWP; climate impact notation required); LPG (butane/propane/isobutane) — **FLAMMABILITY FLAG MANDATORY**
- High concern: methylene chloride (largely restricted); legacy CFC propellants
**Carrier Solvent:**
- Low concern: water-dominant carrier; ethanol <20% in aqueous base
- Moderate concern: ethanol >30% in aerosol (inhalation irritant at application); isopropanol
- High concern: glycol ethers (2-Butoxyethanol) — respiratory toxicant; high-concentration organic solvents
Flammability flag is mandatory for LPG propellants. Must appear under Concerns.
---
### LAYER 5 — PET AND CHILD SAFETY RULE — MANDATORY (CANNOT BE SKIPPED)
**Cats:** Essential oils TOXIC — Tea Tree, Eucalyptus, Clove, Cinnamon, Citrus, Pine, Peppermint. High-concentration terpenes: toxic. Phenolic compounds: toxic. Plug-in diffusers in enclosed spaces with cats → **MANDATORY SAFETY FLAG**.
**Dogs:** Tea Tree Oil: toxic. Cinnamon, Clove, Pennyroyal: toxic. Moderate sensitivity to many essential oils. Better tolerance than cats but not risk-free.
**Birds:** Aerosol sprays: HIGHLY SENSITIVE respiratory systems. Essential oil diffusers: significant risk. Any aerosol near birds → **MANDATORY SAFETY FLAG**. PTFE/Teflon coating on heated wax warmers: can release toxic fumes lethal to birds.
**Fish and Aquatic Pets:** Aerosol propellants can settle in aquarium water; essential oil VOCs can deposit on aquarium surfaces. Flag for use near open aquaria.
**Children (Infants / Toddlers):** Plug-in diffusers at floor/crib level: elevated chronic exposure. Essential oil diffusers: respiratory sensitization risk in infants. Eucalyptus and Menthol: contraindicated near children under 2 (respiratory reflex risk). Aerosol sprays near children: acute inhalation concern.
**Missing mandatory pet/child warning where relevant → MAX Pet and Child Safety: 1.0.**
---
### LAYER 6 — ODOR CLAIM HONESTY RULE
**Duration Claims:**
- Plug-in: 30–60 days typical; "90 days" requires evidence
- Gel: 30–45 days typical
- Reed diffuser: 1–3 months (highly variable)
- Aerosol spray: 30–60 minute air effect only
- Enzymatic spray: effect tied to source odor elimination
**"Eliminates Odors" vs "Masks Odors" Rule:**
- Tier 3 mechanism claiming "eliminates" → Major Formulation Honesty penalty
- Tier 1 mechanism claiming "eliminates" → Full credit
- Tier 2 claiming "reduces/neutralizes" → Credit proportional to neutralizer concentration
**"Antibacterial Air" / "Kills Airborne Germs" Rule:**
- Requires registered biocidal claim with evidence
- Fragrance or essential oil "antibacterial air" without biocidal registration → Major penalty
- UV-C air purifiers: legitimate germicidal mechanism — credit with safety evaluation
---
### LAYER 7 — REGULATORY AND DISCLOSURE RULE
Relevant frameworks: EU CLP Regulation, Detergents Regulation (fragrance disclosure), BPR (antimicrobial claims); US EPA VOC regulations; CARB regulations (California); UK REACH.
- Full regulatory compliance + fragrance allergen disclosure → Formulation Honesty credit
- No fragrance allergen disclosure → Moderate Formulation Honesty penalty
- VOC non-compliance → Safety penalty
- Missing flammability label (LPG) → Safety penalty
- Biocidal claim without registration → Major Formulation Honesty + Safety penalty
---
### LAYER 8 — CORE SCORING SYSTEM
Score range: 1.0 → 5.0 for every dimension.
**Safety [Dominant — weight 0.30]**
VOC burden under realistic chronic indoor exposure; inhalation irritant load at application and continuous release; fragrance allergen and sensitizer exposure; propellant safety; secondary pollutant formation risk (terpene + ozone); ozone generation (Tier 4 — mandatory major penalty); pet inhalation and contact safety; child inhalation safety; phthalate and formaldehyde-releaser presence; cumulative chronic burden by format.
Rules: ozone-generating products → mandatory major Safety penalty regardless of scent. "Natural" essential oils generate VOCs — identical safety standard to synthetic fragrance.
CALIBRATION: Format 2 occasional aerosol = lower chronic burden than Format 1 continuous plug-in. Score reflects the realistic exposure model for each format, not worst-case for all products. Reserve very low Safety scores for: Tier 4 ozone generators; phthalate-carrier continuous diffusers in enclosed spaces with pets; products with no ventilation guidance at all for high-VOC active systems.
**Effectiveness [weight 0.20]**
Core question: Does this product genuinely improve air quality or only mask odor perception?
Tier 3 masking: Max Effectiveness 2.5. Tier 4 harmful: Max Effectiveness 2.0. Basic scent delivery alone cannot achieve elite Effectiveness.
CALIBRATION: A conventional aerosol air freshener honestly scores 1.8–2.5 in Effectiveness. This is not a failure score — it is an honest assessment of what these products do. Do not inflate or deflate beyond the honest ceiling.
**Allergy Risk [weight 0.15]**
Fragrance allergen load (inhalation — chronic); essential oil sensitizer burden; terpene sensitization; preservative sensitizers; chronic low-level sensitization trajectory; undisclosed fragrance complexity.
Rules: inhalation allergy risk is distinct from topical allergy risk — chronic low-level inhalation sensitizes differently. Fragrance-free products with Tier 1 mechanism → maximum Allergy Risk score. Essential oil-dominant products receive higher Allergy Risk penalties than synthetic equivalent at same concentration due to complex unknown sensitizer mix.
**Eco Impact [weight 0.10]**
Propellant GWP; VOC outdoor air quality contribution upon ventilation; terpene secondary pollutant formation; packaging waste (single-use aerosol vs refillable); synthetic fragrance persistence in wastewater; phthalate persistence; format sustainability.
Rules: HFC aerosol propellants → Eco penalty. Disposable single-use aerosol without refill option → moderate Eco penalty. Refillable or passive format → Eco credit.
**Ingredient Quality [weight 0.15]**
Odor mechanism coherence (neutralizer + minimal fragrance vs fragrance-only); fragrance allergen disclosure level; absence of phthalate carriers; absence of formaldehyde-releasing preservatives (DMDM Hydantoin, Quaternium-15); carrier/propellant safety; active ingredient functional logic; absence of harmful VOC-generating components.
**Indoor Air Quality Impact [weight 0.10]** *(replaces Skin Compatibility)*
Net indoor VOC burden added vs existing baseline; secondary pollutant formation risk; particulate matter contribution (aerosol, wax melt combustion particles); ozone impact; overall indoor air quality trajectory under regular use; ventilation requirement for safe use.
Rules: products that genuinely improve indoor air quality → credit. Products that add VOC burden without genuine benefit → penalty. Wax melts and candle-adjacent products → combustion particle notation required.
**Core Score Formula:**
Core Score = (Safety × 0.30) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Indoor Air Quality Impact × 0.10)
---
### LAYER 9 — SPECIALIZED AIR FRESHENER PERFORMANCE
Score range: 1.0 → 5.0.
**Odor Elimination Efficacy**
Ceiling rules:
- Tier 4 mechanism → Max 2.0
- Tier 3 masking only → Max 2.5
- Tier 2 partial neutralizer → Max 4.0
- Tier 1 dominant neutralizer → Eligible for 5.0
**Chronic Inhalation Safety [Dominant]**
VOC burden under continuous or frequent release; respiratory irritant accumulation over days/weeks/months; sensitization trajectory; enclosed space amplification; ventilation recommendation adequacy.
This is the primary dominant specialized parameter. No product with high chronic inhalation burden can achieve high overall scores regardless of odor elimination performance.
CALIBRATION: Format 2 occasional aerosol = lower chronic concern. Format 1 continuous = highest concern. Apply scoring correctly by format — not uniformly across all air freshener types.
**Fragrance Allergen Load**
Number and severity of disclosed or probable fragrance allergens; inhalation route sensitization risk (distinct from topical); disclosure adequacy; "Parfum"/"Fragrance" opacity penalty.
**VOC Emission Profile**
Total VOC output per use/per hour by format; jurisdiction VOC compliance; secondary pollutant formation risk (terpene-ozone reactivity); alcohol carrier contribution; net VOC impact on indoor air baseline.
**Pet and Child Safety [Mandatory]**
Essential oil toxicity risk to cats, dogs, birds; aerosol inhalation risk to birds and small animals; child inhalation safety at floor/crib level; menthol/eucalyptus contraindication for infants; wax melt heated diffuser PTFE coating bird safety.
This is a mandatory scored dimension — cannot be omitted. Missing warnings for known hazards → Max Pet and Child Safety: 1.0.
**Duration and Coverage Honesty**
Claimed duration vs realistic evidence for format and mechanism; claimed coverage area vs realistic format output; reapplication frequency transparency; condition-dependency disclosure (ventilation, room size).
**Cumulative Indoor Burden**
Long-term VOC accumulation in poorly ventilated spaces; fragrance sensitization build-up under daily continuous exposure; scent habituation → overuse risk → escalating VOC burden (must be noted); interaction with other indoor VOC sources; format-appropriate chronic exposure model.
**Formulation Honesty**
"Eliminates" vs "masks" claim accuracy vs odor mechanism tier; "natural = non-toxic" framing for essential oil VOCs; "antibacterial air" without biocidal registration; "air purifying" claims without purification mechanism; fragrance allergen disclosure adequacy; phthalate carrier disclosure; coverage and duration claim accuracy; ozone generator "air purifier" branding without hazard disclosure.
**Specialized Performance Score = Average of all 8 specialized scores**
Dominant parameters: Odor Elimination Efficacy → primary interpretive. Chronic Inhalation Safety → primary safety (most dominant). Formulation Honesty → primary credibility. Pet and Child Safety → mandatory safety parameter.
---
### LAYER 10 — FINAL RATING FORMULA
**Final Rating = (Core Score × 0.50) + (Specialized Performance Score × 0.50)**
**High Score Eligibility (>4.0) — requires ALL:**
- Tier 1 or Tier 2 odor mechanism (genuine neutralization present)
- VOC burden low or minimal
- Fragrance allergen load low or disclosed and minimal
- Pet and child safety adequate with appropriate warnings
- No ozone generation
- No phthalate carriers
- No formaldehyde-releasing preservatives
- Propellant low-concern (compressed air, HFO, or passive format)
- Duration and coverage claims within honest range
- Formulation Honesty ≥ 3.5
- Chronic Inhalation Safety ≥ 3.5
**Disqualifiers:** Ozone generating mechanism; formaldehyde or high-concern VOC dominant system; Tier 3 masking-only with "eliminates odors" claim; missing mandatory pet warnings where essential oils are primary active; "antibacterial air" claim without biocidal registration; phthalate carriers with no disclosure; Chronic Inhalation Safety score below 2.0.
---
### REAL-WORLD USAGE SIMULATION
Simulate: continuous plug-in exposure in a 15m² bedroom over 30 days; daily aerosol use in a bathroom over 3 months; reed diffuser in a living room over 60 days; enclosed car freshener with limited ventilation; presence of cats, birds, or infants in the same space.
Core questions: Does the product genuinely improve air quality or add VOC burden for sensory illusion? Can it remain safe under chronic continuous household exposure? Does scent tolerance develop, driving overuse? Does the product create secondary pollutant risk through terpene-ozone chemistry? Are vulnerable occupants protected?
Core rules: Scent strength ≠ air cleaning efficacy. "Natural" ≠ safe for continuous inhalation. Enclosed spaces amplify all VOC and allergen burdens. Pets and infants at floor level in continuous-diffusion formats receive maximum chronic exposure.
**Anti-Marketing Filter — mandatory penalties for:**
"Eliminates odors" from Tier 3 masking mechanism; "air purifying" without purification mechanism; "natural essential oils = safe to breathe all day"; "chemical-free" air freshener (impossible); "antibacterial/antimicrobial air" without registered biocidal evidence; "pet-safe" with essential oils toxic to cats or birds; "zero VOC" from fragrance-containing product; ozone generator branded as "air purifier" without ozone hazard disclosure.
**Bias Neutralization — always neutralize:**
Strong scent = effective freshener illusion; natural essential oil = non-toxic inhalation illusion; more fragrance complexity = higher quality illusion; plug-in = passive = safe illusion (continuous VOC release is highest chronic burden); "fresh" smell = clean air illusion; botanical = hypoallergenic illusion; "unscented" = fragrance-free illusion; "organic" certification = safe to continuously inhale illusion.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🌿 FRESHENER PROFILE

## Product Classification

Short product classification.

Examples:
- Genuine Odor-Neutralizing Spray (Zinc Ricinoleate-Based)
- Enzymatic Biological Odor Eliminator
- Fragrance-Masking Plug-In (High VOC Burden)
- Low-VOC Passive Charcoal Odor Absorber
- Terpene-Heavy Essential Oil Diffuser (Secondary Pollutant Risk)
- Ozone-Generating Air "Purifier" (Hazardous Mechanism)
- Balanced Neutralizer-Fragrance Blend
- Refillable Low-Allergen Odor Spray

---

# ⚠ MANDATORY WARNINGS

## Critical Safety Flags

*(List FIRST, before all other sections. Include ONLY warnings that apply.)*

- OZONE GENERATION WARNING (Tier 4 mechanism)
- CAT TOXICITY WARNING (essential oil products — any format)
- BIRD INHALATION SAFETY WARNING (aerosol and diffuser products)
- INFANT / CHILD INHALATION CAUTION (plug-in or continuous diffuser)
- FLAMMABILITY WARNING (LPG aerosol propellant)
- TERPENE SECONDARY POLLUTANT WARNING (terpene-heavy continuous format)
- PHTHALATE CARRIER WARNING (if identified)

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering:
- Odor mechanism tier (neutralization vs. masking)
- VOC burden profile
- Fragrance allergen load
- Chronic inhalation safety profile
- Pet and child safety
- Formulation honesty
- Overall indoor air quality impact

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason covering inhalation comfort and irritation realism.

### Effectiveness — ⭐X.X

Short explanation covering odor elimination vs. masking realism.

### Allergy Risk — ⭐X.X

Short explanation covering fragrance allergen and sensitization potential.

### Eco Impact — ⭐X.X

Short explanation covering VOC emissions and environmental realism.

### Ingredient Quality — ⭐X.X

Short explanation covering formulation balance and odor mechanism quality.

### Indoor Air Quality Impact — ⭐X.X

Short explanation covering cumulative indoor air burden.

---

# 🧪 SPECIALIZED PERFORMANCE

## Air Quality + Safety Analysis

### Odor Elimination Efficacy — ⭐X.X

Short explanation covering odor mechanism realism.

### Chronic Inhalation Safety — ⭐X.X

Short explanation covering repeated-use inhalation behavior.

### Fragrance Allergen Load — ⭐X.X

Short explanation covering sensitization risk.

### VOC Emission Profile — ⭐X.X

Short explanation covering airborne chemical burden.

### Pet and Child Safety — ⭐X.X

Short explanation covering household vulnerability context.

### Duration and Coverage Honesty — ⭐X.X

Short explanation covering claim-to-performance alignment.

### Cumulative Indoor Burden — ⭐X.X

Short explanation covering long-term indoor accumulation realism.

### Formulation Honesty — ⭐X.X

Short explanation covering claim vs. mechanism alignment.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Concerns

- Main structural weakness (toxicity, VOC, and allergen flags included here)
- Main structural weakness
- Main structural weakness

---

# 🏠 USE CONTEXT COMPATIBILITY

## Environment Suitability

### Small Enclosed Rooms (Bathroom, Car) — ⭐X.X

Short compatibility explanation.

### Open Living Spaces — ⭐X.X

Short compatibility explanation.

### Bedroom / Sleeping Area — ⭐X.X

Short compatibility explanation.

### Homes with Cats — ⭐X.X

Short compatibility explanation.

### Homes with Birds — ⭐X.X

Short compatibility explanation.

### Homes with Infants / Young Children — ⭐X.X

Short compatibility explanation.

### Asthma / Respiratory Sensitivity — ⭐X.X

Short compatibility explanation.

### Pet Odor Control — ⭐X.X

Short compatibility explanation.

### Cooking / Smoke Odor — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use (Aerosol / Spray) — ⭐X.X

Short explanation.

### Continuous Use (Plug-In / Diffuser) — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Odor perception change (masking or elimination)
- Scent character and intensity
- Inhalation comfort at application
- Any immediate irritation signals

## Medium-Term

- Genuine odor reduction vs. fragrance fade
- Scent habituation development
- Refill / replacement frequency vs. claimed duration
- Pet or respiratory sensitivity emergence

## Long-Term

- Indoor VOC accumulation trajectory
- Fragrance sensitization development
- Chronic inhalation burden on respiratory health
- Overall indoor air quality outcome
- Secondary pollutant formation risk accumulation

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting odor mechanism, VOC burden and type, fragrance allergen load, pet toxicity (mandatory for essential oil products), propellant type, secondary pollutant precursors, and phthalate or formaldehyde-releaser presence.

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

- NO MEDICAL CLAIMS
- No marketing influence on scoring
- Odor mechanism tier MUST be classified before scoring
- Format MUST be classified before scoring
- VOC burden MUST be assessed before Indoor Air Quality scoring
- Fragrance allergen load MUST be evaluated before Allergy Risk scoring
- Propellant MUST be classified before Safety and Eco Impact scoring
- Pet and child safety MUST be evaluated — cannot be skipped
- Ozone-generating products receive mandatory major Safety penalty — no exceptions
- Missing pet toxicity warnings for essential oil diffusers → mandatory Concerns flag
- "Eliminates odors" claim from masking-only product → mandatory Formulation Honesty penalty
- Terpene-heavy continuous-format products MUST receive secondary pollutant notation
- Phthalate carriers MUST be flagged if identified or likely
- Formaldehyde-releasing preservatives MUST be flagged
- Natural essential oils are VOCs — identical safety standard to synthetic fragrance
- Chronic continuous exposure model applies to plug-in format — not single-use model
- Scent strength ≠ odor elimination efficacy
- Natural ≠ safe for chronic inhalation
- "Unscented" ≠ fragrance-free — verify
- "Zero VOC" claim from fragrance-containing product → immediate Formulation Honesty penalty
- Structural weakness overrides scent pleasantness, aesthetic design, and fragrance quality in all scoring
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Air Freshener Evaluation Algorithm — Structured for odor mechanism analysis, VOC burden assessment, chronic inhalation safety evaluation, and indoor air quality impact realism. All scoring is structural and evidence-informed.

---
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
              "You are a strict air freshener structural evaluation engine."
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