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
        "INSECTSPRAY ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
## ALGORITHM 6 — INSECT SPRAY EVALUATION V3.0
## DUAL TRACK SYSTEM
**TRACK A** — Topical Repellent Sprays (applied to skin/clothing to repel insects). Primary concern: human safety under repeated dermal exposure + repellent efficacy.
**TRACK B** — Household/Room Insecticide Sprays (applied to indoor/outdoor environments to kill or repel insects). Primary concern: human and pet safety from inhalation/contact + environmental toxicity + kill efficacy.
Each track has its own layer structure, specialized performance dimensions, and final rating formula. A product is evaluated under ONE track only. Dual-use products receive BOTH evaluations and the lower score is reported as Primary Rating with both scores disclosed.
---
### TRACK A — TOPICAL REPELLENT SPRAY
#### LAYER A0 — FOUNDATION ENGINE
**System Objective**
Reward topical repellent sprays demonstrating: evidence-based repellent active at effective concentration; appropriate dermal safety under repeated application; formulation compatibility with skin barrier; realistic protection duration claims; low fragrance and solvent burden; broad-spectrum or appropriately targeted repellent coverage; regulatory compliance (EPA, WHO, EU BPR); low cumulative sensitization risk; children and sensitive-skin applicability where claimed.
Mandatory penalties for: repellent active at sub-efficacious concentration; essential oil "natural" repellent marketing without evidence-supported efficacy; fragrance-driven "freshness" masking weak active systems; alcohol-dominant formulations causing barrier disruption; misleading protection duration claims; no regulatory registration when required; broad-spectrum claims from narrow-spectrum actives.
**Dominant Principle**
Active repellent ingredient architecture is the dominant product structure. A safe vehicle with a weak active = ineffective. A potent active in a damaging vehicle = unsafe. Both must be assessed. Neither can override the other.
**Anti-Fearmongering Calibration**
CRITICAL — DEET BIAS NEUTRALIZATION: "DEET = dangerous" is a fearmongering bias that must be actively neutralized by the engine.
DEET is among the most extensively studied compounds in toxicology and entomology. Decades of data from millions of users confirm its safety at recommended concentrations. DEET at 10–30% in topical application according to label instructions is a genuinely safe, effective product for adults and children (following age guidance).
DEET must NEVER be described as: "toxic," "dangerous chemical," "high concern," "harmful."
DEET should be described as: "gold standard registered repellent with extensive safety data," "well-studied active with strong real-world safety record," "effective at recommended concentrations with standard label precautions."
Picaridin is similarly well-studied and must not receive fearmongering language.
Prefer calibrated wording: "appropriate for use following label instructions," "neurological effects documented only at very high concentrations well above recommended use," "higher sensitization potential for certain botanical actives vs synthetic registered actives."
**Concentration Uncertainty Rule**
Concentration is mandatory for scoring credibility. When concentration is NOT disclosed: "Active ingredient concentration undisclosed — protection duration cannot be reliably assessed. Formulation Honesty penalty applies. Efficacy credit reduced." Never claim full efficacy credit for undisclosed concentration.
**Mechanistic Plausibility Filter — Track A**
Before crediting any repellent mechanism:
- Does the active achieve adequate skin vapor pressure at stated concentration?
- Is vehicle compatible with active retention under perspiration?
- Is aerosol droplet size appropriate for even skin coverage?
- Is protection duration realistic for this active at this concentration under tropical high-sweat conditions?
Theoretical botanical reputation does not override published repellency trial data.
**Real-World Tolerability — Track A**
DEET and Picaridin sprays are used safely by millions of people in endemic regions daily. High safety scores are appropriate for correctly formulated Tier 1 repellent sprays.
**Evidence Quality Tiers — Track A**
- E1 — Tier 1 registered actives at validated concentration with published clinical trial data = full efficacy credit
- E2 — Tier 2 registered actives with good evidence base
- E3 — Tier 3 botanicals with inconsistent, short-duration evidence
- E4 — Sub-threshold botanical actives
- E5 — Vitamin B1, ultrasonic, homeopathic repellents — no evidence
**Herbal / Botanical Classification — Track A**
- H1 — PMD (Citriodiol) at ≥30%: CDC-approved. Full credit with mandatory age restriction flag (not for children under 3 years).
- H2 — Citronella ≥10%, Neem ≥10%: partial credit with mandatory short-duration disclosure. "May provide short-duration protection (20–60 minutes) in low-risk environments only."
- H3 — Fragrance-driven "botanical repellent" blends without validated active concentration: "No reliable repellency credit. False protection confidence risk. Not suitable for endemic region use." Formulation Honesty penalty mandatory.
**Global Enforcement Rules**
- Repellent active concentration is the dominant efficacy determinant
- Safety penalties override fragrance or sensory experience bonuses
- "Natural" does not equal safe or effective — evidence standard applies equally
- Essential oil repellents evaluated by the same efficacy evidence standard as DEET
- Protection duration claims must align with evidence-supported data at stated concentration
- Fragrance in a topical repellent increases allergenic load without efficacy contribution
- Non-registered repellents receive mandatory credibility reduction
- "DEET-free" is a marketing claim, not a safety or efficacy claim
---
#### LAYER A1 — REPELLENT ACTIVE TIER SYSTEM
**MANDATORY:** Classify all actives by evidence tier before scoring.
**TIER 1 — HIGHEST EVIDENCE / BROADEST SPECTRUM**
Examples: DEET (N,N-Diethyl-meta-toluamide) 10–30% optimal; Picaridin (Icaridin, KBR 3023) 10–20% optimal; IR3535 (Ethyl Butylacetylaminopropionate) 20% optimal.
Characteristics: Extensive clinical and field trial evidence; EPA and WHO approved; broad-spectrum (mosquitoes, ticks, flies, gnats); predictable concentration-dependent protection duration.
- DEET 30% → ~6–8 hours (mosquitoes), 4–6 hours (ticks)
- DEET 20% → ~4–6 hours; DEET 10% → ~2–3 hours
- Picaridin 20% → ~8–12 hours; Picaridin 10% → ~3–5 hours
- IR3535 20% → ~6–8 hours
Scoring: Full efficacy credit at appropriate concentration. Maximum Spectrum Coverage eligible.
CALIBRATION: Tier 1 = benchmark products with extensive safety data. NEVER apply fearmongering language to DEET or Picaridin at recommended concentrations.
**TIER 2 — MODERATE EVIDENCE / MODERATE SPECTRUM**
Examples: PMD (Oil of Lemon Eucalyptus / p-Menthane-3,8-diol) 30–40% optimal; Citriodiol (refined PMD).
Characteristics: CDC-approved for mosquito-borne disease prevention; not recommended for children under 3; good mosquito and tick efficacy; shorter effective duration than Tier 1 at equivalent concentration.
Scoring: Strong efficacy credit. Not eligible for maximum protection duration scores. Age-restriction flag mandatory in output.
**TIER 3 — LIMITED EVIDENCE / NARROW SPECTRUM**
Examples: Citronella (≥10%) ~20–40 min; Lemon Eucalyptus Oil (raw, unrefined); Neem Oil; Lavender Oil; Peppermint Oil; Geraniol; Clove Oil; Soybean Oil.
Characteristics: Inconsistent clinical evidence; short protection duration (20–60 minutes typically); narrow spectrum (mainly mosquitoes, weak against ticks); high sensitization potential from essential oils.
Scoring: Partial efficacy credit. Duration claims heavily penalized if overstated. Allergy Risk penalty for high essential oil loading. Formulation Honesty penalty if marketed as equivalent to Tier 1–2. Appropriate for low-risk environments only.
**TIER 4 — INSUFFICIENT EVIDENCE / INEFFECTIVE**
Examples: Vitamin B1 (Thiamine) patches or sprays; ultrasonic additives; homeopathic repellent blends; garlic extract; "proprietary botanical blend" without disclosed actives.
Characteristics: No credible peer-reviewed clinical evidence; repellent effect not demonstrated above placebo.
Scoring: NO efficacy credit. Hard ceiling Effectiveness 2.0. MANDATORY false protection confidence flag in ALL outputs. This flag is a public health obligation and cannot be omitted under any framing.
**Concentration Rule**
- DEET: <10% sub-optimal; 10–30% optimal full credit; >30% diminishing returns, increased toxicity concern
- Picaridin: <10% sub-optimal; 10–20% optimal full credit; >20% minimal additional benefit
- IR3535: <15% reduced; 20% optimal full credit
- PMD: <20% sub-optimal; 30–40% optimal full credit
- Tier 3 essential oils: any concentration → partial credit only; short duration mandatory
- Unknown concentration: no full efficacy credit regardless of tier; Formulation Honesty penalty
---
#### LAYER A2 — SPRAY VEHICLE SAFETY RULE
**High Concern Vehicle Components**
- Denatured Alcohol (SD Alcohol, Alcohol Denat.) >50% — barrier disruption, dehydration, irritation under repeated use; mandatory Safety and Skin Compatibility penalty; aerosol near face: inhalation concern
- Isopropyl Alcohol >30% — similar barrier stress
- Strong synthetic solvents (PEG derivatives at high concentration) — penetration enhancement increases systemic absorption
- Heavy fragrance loading (>1% fragrance complex) — adds allergenic burden without repellent benefit; mandatory Allergy Risk penalty
- Essential oil blend vehicles beyond repellent actives — compounding sensitization risk
**Moderate Concern:** Moderate alcohol (20–50%) in aqueous base; Propylene Glycol (>5%) — sensitizer in sensitive individuals.
**Low Concern / Preferred:** Water-dominant base with minimal alcohol; glycerin (humectant, barrier support); aloe vera (soothing); light emollient esters (Caprylic/Capric Triglyceride); aqueous emulsion with low alcohol; cyclomethicone.
**Aerosol Propellant Rule:** HFC/HFO → environmental concern notation. Compressed air/nitrogen → preferred, minimal penalty. Solvent-based aerosols → inhalation caution flag for enclosed spaces.
---
#### LAYER A3 — PROTECTION DURATION HONESTY RULE
| Claim vs Evidence | Scoring |
|---|---|
| Claim matches evidence at stated concentration | Full Formulation Honesty credit |
| Claim overstates by <30% | Minor penalty |
| Claim overstates by 30–100% | Significant penalty |
| "All-day protection" from Tier 3 essential oil | Major penalty |
| No duration claim stated | Neutral (no penalty, no bonus) |
| Duration claim without stated concentration | Formulation Honesty penalty |
---
#### LAYER A4 — REGULATORY STATUS RULE
- Full credit: EPA registered (US); WHO prequalified; EU BPR approved; Australian APVMA registered; equivalent national regulatory approval
- Partial credit: Registered in country of sale under national framework; exempt from registration as cosmetic repellent with appropriate claims
- Mandatory penalty: No registration when required; registration claimed but not verifiable; "natural/cosmetic" exemption used while making repellent efficacy claims
---
#### LAYER A5 — SPECTRUM COVERAGE RULE
- **Broad-spectrum (full credit):** Mosquitoes, ticks, gnats, biting flies, midges, fleas → requires Tier 1 or strong Tier 2 at optimal concentration
- **Moderate spectrum (partial credit):** Mosquitoes and some biting flies → Tier 2 at optimal or Tier 1 at sub-optimal
- **Narrow spectrum (reduced credit):** Mosquito-only → Tier 3 actives; must not claim broad-spectrum
"Repels ticks" claim requires evidence-supported tick-active at adequate concentration. Citronella, geraniol, and most Tier 3 oils have insufficient tick repellency data. Tick claim from Tier 3 → major Formulation Honesty penalty.
---
#### LAYER A6 — POPULATION SAFETY RULE
**Children:** DEET: EPA recommends ≤30%; avoid under 2 months. Picaridin: safe ≥2 months. IR3535: safe for children. PMD: NOT recommended under 3 years — mandatory flag. Tier 3 essential oils: eucalyptus, peppermint contraindicated under 2 years.
**Pregnancy:** DEET and Picaridin considered safe at recommended concentrations (EPA/WHO). Essential oil-dominant formulations: insufficient pregnancy safety data — flag required.
**Sensitive Skin:** High-alcohol vehicles, high essential oil loading, fragrance — all require flags.
---
#### LAYER A7 — CORE SCORING SYSTEM (TRACK A)
Score range: 1.0 → 5.0.
**Safety [Dominant — weight 0.25]**
Active ingredient dermal safety at stated concentration; vehicle component safety under repeated application; sensitization potential from fragrance, essential oils, preservatives; systemic absorption risk; population safety (children, pregnancy, sensitive skin); inhalation risk from aerosol; cumulative repeated-application burden.
CALIBRATION: DEET 10–30% per label = GOOD Safety profile. High safety score appropriate. Reserve Safety penalties for: DEET >50% without justification; child-marketed products with inappropriate concentration; Tier 4 actives creating false protection confidence (indirect harm via inadequate protection).
**Effectiveness [Dominant — weight 0.25]**
*(Elevated equal to Safety: ineffective repellent = increased disease exposure risk.)*
Active tier evidence base; concentration vs evidence-supported optimal range; protection duration honesty; spectrum of insects repelled; regulatory registration status; formulation vehicle impact on active delivery.
Rules: Tier 4 actives cannot exceed Effectiveness 2.0. Overstated duration claims reduce Effectiveness score. "Natural" cannot substitute for evidence standard.
**Allergy Risk [weight 0.15]**
Fragrance complex loading; essential oil sensitizer burden (even as repellent actives); preservative sensitizers; propylene glycol or other vehicle sensitizers; repeated-use accumulation; contact allergy potential.
CALIBRATION: Botanical "natural" repellents often carry HIGHER Allergy Risk than DEET/Picaridin products due to essential oil sensitization. Score honestly — do not assume natural = lower allergy.
**Eco Impact [weight 0.10]**
DEET: moderate aquatic toxicity concern. Picaridin: lower environmental persistence — better Eco score than DEET. IR3535: favorable. PMD: biodegradable, favorable. Permethrin clothing spray: high aquatic invertebrate toxicity — mandatory flag.
**Ingredient Quality [weight 0.15]**
Active tier coherence with product claims; vehicle formulation logic and barrier compatibility; concentration honesty; absence of decorative H3 botanical inflation; preservative appropriateness; formulation stability.
**Skin Compatibility [weight 0.10]**
Repeated application tolerance; barrier resilience under vehicle solvents; post-application skin comfort; sensitization trajectory under regular use season; compatibility with sunscreen co-application.
Rules: DEET reduces sunscreen SPF — must be flagged when co-application is implied. Sunscreen-repellent combinations generally not recommended — flag required. High alcohol vehicles reduce Skin Compatibility scores.
**Core Score Formula (Track A):**
Core Score = (Safety × 0.25) + (Effectiveness × 0.25) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.10)
---
#### LAYER A8 — SPECIALIZED TOPICAL REPELLENT PERFORMANCE
Score range: 1.0 → 5.0.
**Repellent Efficacy [Dominant]**
Ceiling rules:
- Tier 4 active → Max 1.5
- Tier 3 active → Max 3.0
- Tier 2 at sub-optimal concentration → Max 3.5
- Tier 2 at optimal concentration → Max 4.5
- Tier 1 at optimal concentration → Eligible for 5.0
- Band/wearable format → Max 2.5 without spatial study support
**Protection Duration Accuracy**
- Duration claim overstated by >30% → Max 2.5
- Duration claim matches evidence → Full credit
- No claim stated → Neutral (3.0 default)
**Dermal Safety Under Repeated Use**
Vehicle barrier impact across a full season of daily application; cumulative sensitization risk; systemic absorption trajectory; population safety adequacy.
**Spectrum Breadth**
Mosquito coverage (mandatory); tick coverage (required for "broad spectrum" claim); biting fly and midge coverage; evidence support for each claimed species group.
**Formulation Vehicle Quality**
Alcohol content and barrier impact; skin feel and drying behavior; compatibility with clothing and surfaces; aerosol vs pump spray format appropriateness.
**Regulatory Credibility**
Registration status; compliance with label requirements; claims alignment with registered use.
**Cumulative Irritation Risk**
Seasonal repeated-use irritation burden; fragrance accumulation risk; essential oil compounding sensitization; preservative sensitization trajectory; vehicle solvent barrier stress accumulation.
**Formulation Honesty**
Active concentration transparency; protection duration accuracy; spectrum claim accuracy; "natural = safe/effective" bias in marketing; "DEET-free" framing as safety claim without efficacy disclosure; regulatory registration claims accuracy.
**Specialized Performance Score (Track A) = Average of all 8 specialized scores**
Dominant parameters: Repellent Efficacy → primary interpretive. Dermal Safety Under Repeated Use → primary safety. Formulation Honesty → primary credibility.
**Final Rating (Track A) = (Core Score × 0.50) + (Specialized Performance Score × 0.50)**
**High Score Eligibility (>4.0) — Track A requires ALL:**
- Tier 1 or Tier 2 active at optimal concentration
- Protection duration claim aligned with evidence
- Regulatory registration confirmed
- Vehicle alcohol content ≤40% or water-dominant base
- Fragrance load minimal or absent
- No Tier 4 efficacy claims
- Formulation Honesty ≥ 3.5
- Spectrum claims supported by active evidence
**Disqualifiers:** Tier 4 repellent actives as primary claim; overstated protection duration by >50%; no regulatory registration for repellent efficacy claim; DEET >50% without clinical justification; heavy fragrance masking weak active system.
---
### TRACK B — HOUSEHOLD / ROOM INSECTICIDE SPRAY
#### LAYER B0 — FOUNDATION ENGINE
**System Objective**
Reward household insecticide sprays demonstrating: evidence-based insecticidal active at effective concentration; human and pet safety under realistic indoor exposure; appropriate target pest spectrum; residual efficacy honesty; minimal inhalation and dermal exposure burden; responsible resistance management consideration; environmental impact minimization; regulatory compliance.
Mandatory penalties for: insecticidal active at sub-efficacious concentration; "natural/botanical" marketing without evidence-supported efficacy; misleading residual protection duration claims; failure to disclose pet toxicity (especially cats and fish); aerosol solvent systems creating inhalation hazard; broad-spectrum claims from narrow-spectrum actives; no regulatory registration when required.
**NON-NEGOTIABLE MANDATORY FLAG:** Any product containing pyrethroids MUST receive a prominently placed CAT TOXICITY WARNING. This cannot be omitted under any framing, any format, any output section.
**Anti-Fearmongering Calibration — Track B**
Pyrethroid insecticides are widely used, effective, and well-characterized. Their cat toxicity is a genuine structural concern and MUST be disclosed — but for dogs and humans at labeled use concentrations, they are not acutely dangerous when used correctly with ventilation and re-entry intervals.
Moderate eco concern for pyrethroid drain discharge is real and should be scored accurately — but not catastrophized. "Moderately concerning for aquatic invertebrates — avoid use near water or drains" is calibrated language.
Cat toxicity language is appropriately strong because the risk is genuinely severe. For human users at label concentrations, use proportional language: "requires adequate ventilation after application," "follow label re-entry interval guidance."
NOT for humans at label concentrations: "toxic insecticide spray," "dangerous chemical cocktail."
**Concentration Uncertainty Rule — Track B**
Active ingredient concentration is mandatory for kill efficacy credibility. Undisclosed concentration → reduced efficacy credibility. Probabilistic wording: "Active concentration undisclosed — kill efficacy and residual duration cannot be fully verified."
**Mechanistic Plausibility Filter — Track B**
- Is active at concentration sufficient for kill at pest target?
- Is contact time/residual duration consistent with active chemistry on this surface type?
- Is spray format compatible with claimed coverage area?
- Is re-entry interval adequate for inhalation safety?
- Is the kill claim (vs repel) supported by active mechanism?
**Evidence Quality Tiers — Track B**
- E1 — Registered pyrethroid/organophosphate actives at validated concentration with documented kill efficacy = full credit
- E2 — Registered botanical actives (spinosad, nootkatone) with good evidence base
- E3 — Diatomaceous earth, insecticidal soaps, essential oils at functional threshold — partial kill credit (contact only)
- E4 — Sub-threshold essential oil blends, trace botanicals
- E5 — Ultrasonic insect repellent claims, homeopathic insecticides — no evidence, no credit
**Herbal / Botanical Classification — Track B**
- H1 — Pyrethrins (natural chrysanthemum-derived): Tier 1 for efficacy with full mandatory cat + aquatic toxicity flags. "Natural" does NOT reduce toxicity concerns here.
- H2 — Clove oil/eugenol, thyme oil/thymol at functional concentration: partial contact-kill credit.
- H3 — Trace essential oil blends marketed as insecticides: no kill credit. Formulation Honesty penalty. "Botanical complexity appears decorative in insecticide context — no functional kill efficacy credit."
**Global Enforcement Rules**
- Active ingredient architecture is the dominant structure
- Pet toxicity must be disclosed regardless of any other product quality
- "Natural = safe" is a disqualifying bias here (pyrethrins are natural and extremely toxic to cats)
- Residual duration claims must match active chemistry
- Regulatory registration mandatory for kill efficacy claims
---
#### LAYER B1 — INSECTICIDAL ACTIVE TIER SYSTEM
**MANDATORY:** Classify all actives by evidence tier and mechanism before scoring.
**TIER 1 — HIGHEST EVIDENCE / BROAD SPECTRUM KILL**
Examples: Pyrethrins (natural, from chrysanthemum); pyrethroids — Permethrin, Cypermethrin, Deltamethrin, Lambda-cyhalothrin, Bifenthrin, Cyfluthrin, Tetramethrin (knockdown agent, often combined).
Characteristics: Sodium channel disruptors; broad-spectrum (flying and crawling insects, ticks, mites); fast knockdown and/or residual kill; extensive safety and toxicology data for indoor use.
**EXTREMELY TOXIC TO CATS — MANDATORY FLAG — NO EXCEPTIONS.**
**HIGHLY TOXIC TO AQUATIC INVERTEBRATES — MANDATORY ECO FLAG.**
Resistance developing in some mosquito and cockroach populations — notation required.
Scoring: Full efficacy credit at effective concentrations. Mandatory cat toxicity flag. Mandatory aquatic toxicity Eco penalty. Resistance notation required.
**TIER 2 — MODERATE EVIDENCE / TARGETED SPECTRUM**
Examples: Neonicotinoids (Imidacloprid, Dinotefuran, Acetamiprid); Organophosphates (Malathion; DDVP/Dichlorvos — restricted); Carbamates (Propoxur; Bendiocarb); Fipronil; Spinosad; Indoxacarb.
Characteristics: Variable mechanism; organophosphates and carbamates have higher mammalian toxicity concern than pyrethroids; neonicotinoids: high bee toxicity — **MANDATORY BEE TOXICITY ECO FLAG**; fipronil: bee and aquatic toxicity concern.
Scoring: Efficacy credit dependent on target pest match. Mandatory bee toxicity eco flag for neonicotinoids. Organophosphates/carbamates: mandatory elevated human safety concern flag.
**TIER 3 — LIMITED EVIDENCE / CONTACT-ONLY / PHYSICAL ACTIVES**
Examples: Diatomaceous Earth (DE); Boric Acid; Silica Aerogel; Insecticidal Soaps (potassium salts of fatty acids); Neem Oil (Azadirachtin); Clove Oil/Eugenol; Peppermint Oil; Thyme Oil (Thymol); Rosemary Oil.
Characteristics: Physical or biochemical mechanism; generally lower mammalian toxicity; contact-kill only; minimal or no residual; inconsistent evidence base.
Scoring: Partial efficacy credit. Formulation Honesty penalty if marketed equivalent to Tier 1.
**TIER 4 — INSUFFICIENT EVIDENCE / INEFFECTIVE**
Examples: Ultrasonic repellent-insecticide combinations; homeopathic insecticide blends; "proprietary natural blend" without disclosed actives.
Characteristics: No credible peer-reviewed evidence of kill efficacy.
Scoring: No efficacy credit. Max Effectiveness: 1.5. Major Formulation Honesty penalty.
**Synergist Rule — Piperonyl Butoxide (PBO)**
Inhibits insect detoxification enzymes; increases pyrethroid and pyrethrin efficacy; enhances resistance management when used appropriately. Some mammalian enzyme inhibition at high exposure — moderate safety note required. Partial credit as efficacy enhancer.
---
#### LAYER B2 — HUMAN SAFETY EXPOSURE RULE
**Inhalation (primary concern for aerosols):**
- Stated re-entry interval ≤15 min with high active concentration → Safety penalty
- No re-entry interval stated → Formulation Honesty penalty
- Adequate ventilation instruction absent → Safety penalty
**Dermal contact (secondary):** Residual spray surfaces; children crawling on treated floors → elevated concern; pets walking on treated surfaces → elevated concern.
**Exposure burden classification:**
- Low concern: pump spray (non-aerosol); low volatility active; clear re-entry interval; well-ventilated use
- Moderate concern: aerosol with moderate active concentration; residual surface spray near food or child contact
- High concern: aerosol + high active + high volatility solvent; no ventilation/re-entry instructions; near food/pets/aquaria without explicit warnings; organophosphate or carbamate active in aerosol
---
#### LAYER B3 — PET AND ECOSYSTEM SAFETY RULE
**CATS — EXTREME SENSITIVITY — MANDATORY FLAG, NO EXCEPTIONS**
Pyrethrins and ALL pyrethroids: HIGHLY TOXIC to cats. Cats lack hepatic glucuronidation to metabolize pyrethroids. Even indirect exposure (walking on treated surfaces) can be fatal. Any pyrethroid present = MANDATORY CAT SAFETY WARNING in ALL output sections regardless of product framing.
Essential oils (Tea Tree, Clove, Cinnamon, Peppermint, Citrus): also toxic to cats — flag required.
**Dogs:** Organophosphates and carbamates: significant toxicity — flag for direct application risk.
**Birds:** Pyrethroids: moderate-high toxicity — flag. DDVP/Dichlorvos: high toxicity — flag.
**Fish and Aquatic Invertebrates:** Pyrethroids: EXTREMELY TOXIC — mandatory eco flag. "Extremely toxic to aquatic life — avoid use near water or drains." Neonicotinoids: extremely toxic to bees and aquatic invertebrates — mandatory eco flag.
---
#### LAYER B4 — RESIDUAL EFFICACY HONESTY RULE
Evidence-supported residual duration (surfaces, indoor):
- Permethrin, Bifenthrin → up to 30–90 days
- Deltamethrin → 14–30 days typical
- Cypermethrin → 14–30 days
- Pyrethrins alone → very short; <24–48 hours (degrade in light/air)
- Tetramethrin → knockdown only; minimal residual
- Fipronil (crack/crevice) → up to 90 days
- Imidacloprid → weeks to months (indoors)
- Spinosad → days to weeks
- Insecticidal soaps → contact only; no residual
- Essential oils → contact only; hours maximum
Claim honesty: Within evidence range → full credit. Overstated <30% → minor penalty. "6 months protection" from pyrethrin-only → major Formulation Honesty penalty. Residual claim without active identity or concentration → penalty.
---
#### LAYER B5 — REGULATORY STATUS RULE (TRACK B)
Household insecticides are regulated as pesticides in most jurisdictions.
- Full credit: EPA registered (FIFRA); EU BPR approved; Australian APVMA registered; equivalent national approval
- Mandatory penalty: no registration when required; "natural" exemption used while making kill efficacy claims; unverifiable registration number
---
#### LAYER B6 — RESISTANCE MANAGEMENT RULE
- High resistance risk: single pyrethroid or neonicotinoid active with no rotation recommendation; repeated sole reliance on one mode of action
- Lower resistance risk: multi-mode-of-action product (pyrethroid + synergist); label includes rotation or IPM guidance; targeted use rather than broadcast application
Resistance consideration must be mentioned in Concerns when relevant for Tier 1 or 2 actives in routine indoor use.
---
#### LAYER B7 — CORE SCORING SYSTEM (TRACK B)
Score range: 1.0 → 5.0.
**Safety [Dominant — weight 0.30]**
Acute human inhalation risk during aerosol application; dermal contact risk from residual-treated surfaces; pet toxicity risk from active and vehicle; organophosphate/carbamate elevated mammalian toxicity; re-entry interval adequacy; ventilation instruction adequacy; child contact surface risk; cumulative indoor exposure under repeated application.
Rules: Pyrethroid without cat safety warning → mandatory Safety penalty. Organophosphate/carbamate aerosol for indoor use → mandatory elevated Safety penalty. No re-entry or ventilation guidance → Safety penalty.
**Effectiveness [weight 0.20]**
Active tier evidence base; active concentration vs evidence-supported range; target pest spectrum match; residual duration honesty; knockdown speed; kill confirmation vs repellency-only.
Rules: Tier 4 actives: max Effectiveness 1.5. Tier 3: max 3.0. "Repels" vs "kills" distinction must be maintained.
**Allergy Risk [weight 0.10]**
Aerosol inhalation allergen burden; fragrance complex in indoor spray; solvent respiratory sensitizers; pyrethrin sensitization (natural pyrethrins more allergenic than synthetic pyrethroids); preservative sensitizers.
**Eco Impact [Elevated — weight 0.20]**
Aquatic invertebrate toxicity (pyrethroids — critical); bee toxicity (pyrethroids, neonicotinoids); environmental persistence; bioaccumulation potential; aerosol propellant impact; wash-off contamination into drains.
Rules: Pyrethroid active → mandatory aquatic toxicity Eco penalty. Neonicotinoid → mandatory bee toxicity Eco penalty. Mandatory flag in output regardless of formulation context.
**Ingredient Quality [weight 0.10]**
Active coherence with stated pest target; synergist use logic (PBO); vehicle formulation safety and stability; decorative fragrance loading; unnecessary solvent loading; resistance management consideration.
**Skin Compatibility [weight 0.10]**
Human skin contact safety from residual surfaces (not direct topical application); dermal irritation from residual active on treated surfaces; child skin contact risk from crawling on treated floors; recovery of safe contact after re-entry interval.
**Core Score Formula (Track B):**
Core Score = (Safety × 0.30) + (Effectiveness × 0.20) + (Allergy Risk × 0.10) + (Eco Impact × 0.20) + (Ingredient Quality × 0.10) + (Skin Compatibility × 0.10)
---
#### LAYER B8 — SPECIALIZED HOUSEHOLD INSECTICIDE PERFORMANCE
Score range: 1.0 → 5.0.
**Kill Efficacy**
Ceiling rules:
- Tier 4 active → Max 1.5
- Tier 3 contact-only → Max 3.0
- Tier 2 at effective concentration → Max 4.5
- Tier 1 at effective concentration → Eligible for 5.0
**Residual Protection Accuracy**
Residual duration claim vs evidence benchmark; active stability on surfaces (light, moisture degradation); reapplication frequency honesty; surface-type dependency disclosure.
**Human Inhalation Safety**
Aerosol particle size and lung deposition risk; active volatility during and after application; solvent inhalation burden; re-entry interval adequacy; enclosed space warning presence.
**Pet and Ecosystem Safety [Dominant — Mandatory]**
Cat toxicity warning presence and prominence; aquatic toxicity warning presence; bee safety disclosure; dog and bird toxicity disclosure; application instruction adequacy.
**Missing cat toxicity warning for pyrethroid products → MAX Pet and Ecosystem Safety: 1.0. NON-NEGOTIABLE.**
**Spectrum Coverage**
Target pest breadth vs active mechanism evidence; flying insect coverage; crawling insect coverage; tick and mite coverage; pest-specific resistance consideration.
**Resistance Risk**
Single mode-of-action dependency; rotation guidance presence; integrated pest management framing; long-term pest control sustainability.
**Cumulative Indoor Exposure Risk**
Repeated application frequency burden on indoor air quality; surface residue accumulation; child and pet floor-level contact risk; long-term household chemical burden.
**Formulation Honesty**
"Natural = safe" framing without toxicity disclosure; residual duration overstatement; spectrum breadth overstatement; pet safety claims contradicted by active ingredient; "family-safe" claims without adequate safety qualification; active concentration disclosure; registration claim accuracy.
**Specialized Performance Score (Track B) = Average of all 8 specialized scores**
Dominant parameters: Kill Efficacy → primary interpretive. Pet and Ecosystem Safety → primary mandatory safety. Cumulative Indoor Exposure Risk → primary long-term safety. Formulation Honesty → primary credibility.
**Final Rating (Track B) = (Core Score × 0.50) + (Specialized Performance Score × 0.50)**
**High Score Eligibility (>4.0) — Track B requires ALL:**
- Tier 1 or Tier 2 active at evidence-supported concentration
- Regulatory registration confirmed
- Clear re-entry interval instructions present
- Pet toxicity warnings adequate and prominent
- Aquatic and bee toxicity warnings present
- Residual duration claim within evidence range
- Formulation Honesty ≥ 3.5
- No organophosphate/carbamate as primary indoor aerosol active
**Disqualifiers:** Missing cat safety warning for pyrethroid product; Tier 4 active as primary kill claim; no regulatory registration; organophosphate aerosol indoors without extreme hazard qualification; residual claim overstated by >100%; "family-safe" claim contradicted by active toxicology.
---
### SHARED LAYERS — BOTH TRACKS
**Colorant Penalty Rule (both tracks)**
Artificial colorants provide no insecticidal, repellent, or safety benefit. High concern: Red 40, Yellow 5, Yellow 6, Blue 1, Green 3. Scoring: Allergy Risk penalty, Ingredient Quality penalty, Formulation Honesty penalty. Track B additional: Colorants may contaminate treated surfaces — minor additional penalty. Must be noted under Concerns.
**Anti-Marketing Filter (both tracks)**
Track A mandatory penalties: "DEET-free" framed as safety claim without efficacy disclosure; "all-natural" marketed as equivalent to registered actives; "all-day protection" from Tier 3 essential oils; "chemical-free" repellent (impossible category); essential oil repellent marketed for tick-borne disease prevention.
Track B mandatory penalties: "family-safe"/"pet-safe" claims for pyrethroid products without full toxicity disclosure; "natural" insecticide marketed as non-toxic without toxicity disclosure; "6 months protection" from contact-only actives; "100% natural" with no kill efficacy evidence.
Both tracks: botanical inflation bias — more botanicals ≠ more efficacy; "certified organic" = efficacy illusion; fragrance = effectiveness illusion.
**Bias Neutralization Filter (both tracks)**
Always neutralize:
- "Natural = safe" bias (pyrethrins are natural and highly toxic to cats)
- "DEET = dangerous" bias (DEET is among the best-studied repellents in existence)
- "Essential oil = effective" bias (evidence standard applies equally)
- "Chemical-free = better" bias (impossible category)
- "Organic certification = pest control efficacy" bias
- "Registered = automatically safe" bias (registration confirms testing, not zero risk)
- "Higher concentration = always better" bias (diminishing returns and increased toxicity)
air freshner

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT (BOTH TRACKS)

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

*(State track: [TRACK A: TOPICAL REPELLENT] or [TRACK B: HOUSEHOLD INSECTICIDE])*

---

# 🦟 SPRAY PROFILE

## Product Classification

Short classification.

**Track A Examples:**
- High-Efficacy Registered Repellent (DEET-Based)
- Moderate-Efficacy Plant-Based Repellent (PMD)
- Low-Efficacy Essential Oil Repellent (Unregistered)
- Evidence-Deficient Natural Repellent

**Track B Examples:**
- Fast-Knockdown Pyrethroid Household Spray
- Residual Crawling Insect Insecticide
- Contact-Kill Natural Insect Spray
- Evidence-Deficient Botanical Insecticide

---

# ⚠ MANDATORY WARNINGS

## Critical Safety Flags

*(List FIRST, before all other sections. Include ONLY warnings that apply.)*

- CAT TOXICITY WARNING (pyrethroid products — Track B)
- AQUATIC TOXICITY WARNING (pyrethroid/neonicotinoid products)
- BEE TOXICITY WARNING (neonicotinoid products)
- CHILD AGE RESTRICTION (PMD products — Track A)
- PREGNANCY CAUTION (essential oil products — Track A)

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering:
- Active ingredient identity and evidence tier
- Evidence base strength
- Key safety profile
- Efficacy vs. claim alignment
- Environmental profile
- Overall formulation balance

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason.

### Effectiveness — ⭐X.X

Short structural reason.

### Allergy Risk — ⭐X.X

Short structural reason.

### Eco Impact — ⭐X.X

Short structural reason.

### Ingredient Quality — ⭐X.X

Short structural reason.

### Skin Compatibility — ⭐X.X

Short structural reason.

---

# 🧪 SPECIALIZED PERFORMANCE

## Track A — Topical Repellent Analysis

### Repellent Efficacy — ⭐X.X

Short structural reason.

### Protection Duration Accuracy — ⭐X.X

Short structural reason.

### Dermal Safety Under Repeated Use — ⭐X.X

Short structural reason.

### Spectrum Breadth — ⭐X.X

Short structural reason.

### Formulation Vehicle Quality — ⭐X.X

Short structural reason.

### Regulatory Credibility — ⭐X.X

Short structural reason.

### Cumulative Irritation Risk — ⭐X.X

Short structural reason.

### Formulation Honesty — ⭐X.X

Short structural reason.

---

## Track B — Household Insecticide Analysis

### Kill Efficacy — ⭐X.X

Short structural reason.

### Residual Protection Accuracy — ⭐X.X

Short structural reason.

### Human Inhalation Safety — ⭐X.X

Short structural reason.

### Pet and Ecosystem Safety — ⭐X.X

Short structural reason.

### Spectrum Coverage — ⭐X.X

Short structural reason.

### Resistance Risk — ⭐X.X

Short structural reason.

### Cumulative Indoor Exposure Risk — ⭐X.X

Short structural reason.

### Formulation Honesty — ⭐X.X

Short structural reason.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Main structural advantage
- Main structural advantage
- Main structural advantage

## Concerns

- Main structural weakness (toxicity flags, pet warnings, eco concerns included here)
- Main structural weakness
- Main structural weakness

---

# 👤 USER COMPATIBILITY (Track A — Topical Repellent)

## Population Suitability

### Adults — ⭐X.X

Short compatibility explanation.

### Children (2–12 years) — ⭐X.X

Short compatibility explanation.

### Infants (<2 years) — ⭐X.X

Short compatibility explanation.

### Pregnant / Nursing — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

---

# 🏠 USE CONTEXT COMPATIBILITY (Track B — Household)

## Environment Suitability

### Indoor Enclosed Spaces — ⭐X.X

Short compatibility explanation.

### Outdoor Perimeter — ⭐X.X

Short compatibility explanation.

### Homes with Cats — ⭐X.X

Short compatibility explanation.

### Homes with Dogs — ⭐X.X

Short compatibility explanation.

### Homes with Children — ⭐X.X

Short compatibility explanation.

### Near Water / Drains — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Track A — Repeated-Use Sustainability

### Daily Seasonal Use — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

### Travel / High-Risk Area Use — ⭐X.X

Short explanation.

---

## Track B — Repeated-Use Sustainability

### Monthly Routine Application — ⭐X.X

Short explanation.

### Outbreak / Infestation Use — ⭐X.X

Short explanation.

### Preventive Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Repellent/kill onset speed
- Knockdown performance (Track B)
- Sensory experience (odor, skin feel)
- Immediate irritation signals

## Medium-Term

- Protection duration experience vs. claim
- Residual surface efficacy (Track B)
- Skin tolerance development (Track A)
- Pest return timeline

## Long-Term

- Resistance development risk
- Cumulative exposure trajectory
- Seasonal sensitization risk (Track A)
- Indoor air and surface chemical burden (Track B)

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting repellent or insecticidal mechanism, active concentration and evidence tier, vehicle safety profile, eco toxicity, pet toxicity (mandatory for pyrethroids), and human safety signals.

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
- Regulatory status MUST be disclosed
- Active ingredient and concentration MUST be classified before scoring
- Repellent/insecticide active tier MUST be determined before Effectiveness scoring
- Pet toxicity MUST be flagged for all pyrethroid Track B products — no exceptions
- Aquatic toxicity MUST be flagged for pyrethroid and neonicotinoid products
- Bee toxicity MUST be flagged for neonicotinoid products
- Protection/residual duration claims MUST be compared to evidence benchmarks
- "Natural = safe" bias MUST be neutralized — evidence standard applies equally
- "DEET-free = safer" bias MUST be neutralized
- Unvalidated actives CANNOT exceed Effectiveness or Efficacy 2.0 under any framing
- Registration status MUST be evaluated and disclosed
- Missing mandatory safety warnings = automatic major Safety penalty
- Fragrance ≠ repellent efficacy
- Botanical count ≠ repellent or insecticidal strength
- "Chemical-free" claim = automatic Formulation Honesty penalty
- Structural weakness overrides cosmetic or sensory experience in all scoring
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Insect Spray Evaluation Algorithm — Structured for active ingredient efficacy analysis, safety profiling across topical and household tracks, and realistic protection duration assessment. All scoring is structural and evidence-informed.

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
              "You are a strict insect spray structural evaluation engine."
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