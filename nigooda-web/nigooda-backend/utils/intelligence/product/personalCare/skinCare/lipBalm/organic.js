const openai =
require("../../../../../../ai/openaiClient");

class OrganicEngine {

  async run(data) {

    try {

      const ingredients =
        data.ingredients || [];

      const analysis =
        await this.generateAnalysis(
          ingredients
        );

      return {

        lip_balm_type:
          "ORGANIC_HERBAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "ORGANIC LIP BALM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

N
---
HERBAL / ORGANIC LIP BALM EVALUATION ALGORITHM v1.0
---
⚠ CRITICAL OPENING STATEMENT — THE LIP BALM PARADOX
Lip balm sits at a unique intersection of three biological facts that most herbal lip balm marketing completely ignores:
Fact 1 — Lips have no sebaceous glands and no sweat glands.
Unlike all other facial skin, the vermilion border of the lips has no hydrolipid protective film. It cannot self-moisturize. This makes it the body's most exposed and vulnerable surface to environmental drying. Barrier protection is not optional — it is the primary function of any lip product. (Lip Balm Patent Literature; JAAD Lip Barrier Study 2015)
Fact 2 — Lip balm is partially ingested with every application.
FDA research estimates approximately 24 mg of lip product ingested per day during normal use. This is not a scare statistic — it is a documented physiological reality that fundamentally changes the safety standards for ingredients. An ingredient that is safe on facial skin may be unsafe when regularly swallowed. This makes lip balm ingredient evaluation a dual-safety assessment: topical safety + oral mucosal/ingestion safety. No other cosmetic product on the face requires this.
Fact 3 — Flavors and fragrances are the leading cause of allergic contact cheilitis.
The oral mucosa is more permeable than keratinized skin. Sensitizers applied to the lips at frequent daily intervals have higher sensitization potential than the same ingredient applied to the forearm. A 2018 review in a dermatology journal identified flavoring agents, lanolin, and essential oils as the dominant causes of contact cheilitis. "Natural flavors" from essential oils carry the same sensitization risk as synthetic fragrance — often higher because they contain multiple individual sensitizing molecules.
The algorithm neither penalizes nor rewards the "natural/herbal/organic" label. It scores formulation structure, occlusive efficiency, humectant quality, active evidence, ingredient safety (topical AND oral mucosal), and sensitization risk — with the dual-safety lens applied to every ingredient.
---
LAYER 0 — FOUNDATION ENGINE
The Tripartite Function Rule
Every lip balm must be evaluated on three functional axes simultaneously:
Occlusive protection — physical barrier against TEWL (transepidermal water loss from lip surface)
Humectant delivery — attract and bind water into lip tissue
Emollient smoothing — fill microscopic surface irregularities, improve texture, reduce cracking
A lip balm that performs all three well scores high. A lip balm built on only one (typically just an occlusive) scores moderate. A lip balm that creates sensory benefits (tingling, cooling) while actually irritating and drying the lip surface scores low.
The Dual-Safety Assessment Rule (New — Unique to Lip Products)
Every ingredient in a lip balm must pass TWO safety screens:
Topical safety: irritation, sensitization, barrier compatibility
Oral/ingestion safety: Is this ingredient safe if regularly ingested in small amounts (approximately 24 mg/day total product)?
Mandatory oral safety flags:
Essential oils at significant concentrations: Most are GRAS (Generally Recognized As Safe) in trace food quantities but daily mucosal exposure at cosmetic concentrations requires assessment
Camphor: Toxic if ingested; should not be in lip balm at significant concentrations
Menthol: GRAS at food levels; concentrated application to lips = mucosal sensitization + drying cycle risk
Phenol: Toxic if ingested; not appropriate in lip balm
Synthetic colorants: Oral exposure assessment required
Preservatives: Must be assessed for mucosal and ingestion safety
The Licking Cycle Rule
Several ingredients found in herbal lip balms create or worsen a drying cycle:
Menthol, camphor, peppermint oil: Cooling sensation triggers more licking; saliva evaporates and draws moisture away from lips; cycle of dryness worsens over time
Drying astringents (high tannin herbs — witch hazel, tea tree at significant concentration): Temporary tightening perceived as "clean" but followed by dryness
Flavored/scented balms: Flavor triggers licking; licking dries lips; more balm applied; dependency cycle
The algorithm penalizes ingredients documented to perpetuate this cycle.
Preservation Rule
Most lip balms are anhydrous (wax + oil base, no free water phase). True anhydrous formulas do not require preservatives. However, some herbal lip balms include water-containing herbal extracts, aloe vera gel, or hydrosols — these introduce a water phase that requires preservation. Assessment is identical to v1.1.
---
LAYER 1 — WAX/OCCLUSIVE BASE CLASSIFICATION (Primary Structural Layer)
The wax and oil base is the most important structural element of a lip balm — analogous to the surfactant tier in face wash evaluation. It determines occlusive efficiency, texture, stability, and comedogenic potential around the perioral area.
WAX TIER TABLE
Tier W1 — Strongest occlusives (Maximum TEWL reduction)
Beeswax (Cera flava / Cera alba): Documented TEWL reduction; breathable barrier; structural backbone of most effective lip balms; mild contact sensitization risk (propolis-related; flag if propolis present)
Carnauba wax (Copernicia cerifera): Very hard, high-shine; excellent barrier; structurally stable; low sensitization risk; vegan
Candelilla wax (Euphorbia cerifera): Vegan alternative to beeswax; slightly harder; comparable occlusion; low sensitization risk
Rice bran wax: Mild, soft; lower occlusive strength than beeswax but acceptable
Hydrogenated plant oils used as waxes: Effective occlusion; low sensitization risk
Tier W2 — Moderate occlusives (Good but less efficient)
Shea butter (Butyrospermum parkii): Comedogenic rating 0–2; mild; emollient + mild occlusive; excellent in combination with harder wax; preferred for dry/sensitive lips
Cocoa butter (Theobroma cacao): Comedogenic rating 4–5; effective emollient for lips (perioral pore concern in acne-prone); melts at body temperature; avoid dominant use in products used heavily on perioral skin in acne-prone users
Mango butter: Moderate occlusion; low comedogenicity; good emollient
Kokum butter: Firm texture; good occlusion; low comedogenicity
Tier W3 — Oils as primary base (Weak occlusion alone)
When oils are the only occlusive (no wax): TEWL reduction is limited without a film-forming solid phase. Oils alone do not form a persistent barrier on the constantly-moving lip surface.
Coconut oil dominant (comedogenic rating 4): Does not provide a persistent film on moving lip surface; moderate occlusion; perioral comedogenicity concern; lauric acid antimicrobial credit
Castor oil: Excellent emollient; forms a somewhat viscous film; better than most oils at lip adherence; used as primary oil in many lip balms for this reason
Jojoba oil: Non-comedogenic; good emollient; does not polymerize; low but real film persistence
Argan, rosehip, sunflower oils: Good emollients; no occlusive film; require wax co-formulation
Critical Rule: A herbal lip balm that uses only soft plant oils (coconut, shea, argan, rosehip) without a hard wax component will have poor occlusion on the lips. Scoring in Occlusion Efficiency must reflect this regardless of how many "nourishing" oils are listed.
---
LAYER 2 — ACTIVE DELIVERY CLASSIFICATION FOR LIP PRODUCTS
Lip balm is a continuous-contact, leave-on product. Unlike a face pack (15–30 min), lip balm is reapplied throughout the day and remains in contact with lips indefinitely between applications. This gives genuine delivery opportunity for small-molecule actives.
However, the lip surface is in constant motion, subject to saliva washoff, food contact, and drinking — actual dwell time per application is variable.
Category A — Genuine functional credit in lip format:
Humectants (glycerin, hyaluronic acid, sodium PCA, honey): Full credit — absorbed into lip tissue during continuous dwell time
Vitamin E (tocopherol): Antioxidant; documented in wax/oil vehicles; full credit as stabilizer and mild skin-conditioning agent
Castor oil (ricinoleic acid): Adhesive, emollient, viscosity-enhancing; full functional credit in lip balm base
Shea butter / plant butters at appropriate tier: Emollient credit; partial occlusive credit
SPF actives (zinc oxide, titanium dioxide): Full credit when present; lips are highly vulnerable to UV damage and squamous cell carcinoma risk — SPF presence is a genuine clinical benefit
Lanolin: Highly effective emollient and humectant for lips; full credit; CONTACT SENSITIZATION flag — documented allergen in contact cheilitis literature; not suitable for lanolin-sensitive individuals
Beeswax: Full Tier W1 occlusive credit
Aloe vera (stabilized): Minor soothing credit
Category B — Partial credit:
Coconut oil: Emollient and mild antimicrobial (lauric acid) credit; comedogenic concern around perioral area; partial credit with skin-type caveat
Neem oil at trace: NSF antimicrobial credit; note strong smell; oral safety acceptable at trace
Calendula extract: Mild soothing; partial credit
Rosehip oil: Contains retinoic acid precursors and linoleic acid; mild regenerative credit; unstable — check for rancidity risk in formulation
Jojoba oil: Emollient credit; non-comedogenic; stable
Vitamin C derivatives (stable forms): Partial antioxidant credit; unstable in most lip balm vehicles unless encapsulated
Category C — Minimal functional credit (Penalize if marketed as hero claim):
Rose extract: Sensory only; negligible functional benefit
Saffron: No evidence; expensive colorant/marketing
Gold / Pearl / Diamond dust: No documented skin benefit; premium pricing ingredient only
Collagen in wax base: No lip tissue penetration; surface decoration
"Ayurvedic herbs" in trace amounts: No documented delivery through wax-oil vehicle at trace concentration
---
LAYER 3 — HERBAL EVIDENCE CLASSIFICATION (Adapted from v1.1 with Lip-Specific Modifications)
All Evidence Tiers A/B/C/D from v1.1 apply.
CRITICAL LIP-SPECIFIC TIER D ADDITIONS:
The following ingredients are in regular use in herbal lip balms and carry documented sensitization or safety concerns specifically for the lip/oral mucosal context:
Ingredient	Risk	Penalty
Peppermint oil / Menthol	Contact cheilitis (documented in Tran et al., Dermatitis 2010); drying cycle trigger; oral mucosal sensitization	Tier D in lip products
Cinnamon oil / Eugenol	Documented contact cheilitis; oral mucosal sensitizer; lichenoid reactions	Tier D — mandatory flag
Camphor	Toxic if ingested at significant doses; not appropriate for lip products	Tier D — safety concern
Phenol	Toxic; inappropriate for lip product	Tier D — contraindicated
Citrus peel oils (cold-pressed)	Phototoxic furanocoumarins; photosensitization on lips = UV-induced lip damage	Tier D — phototoxic
Clove oil	Eugenol: potent mucosal sensitizer; lichenoid oral contact reactions documented	Tier D
Propolis	Documented contact sensitizer; present in some beeswax; if listed separately, Tier D	Tier D
Tea tree oil at >0.5% in lip product	Mucosal exposure at this concentration; not GRAS; Tier D at lip contact	Tier D in lip format
Lanolin	Documented allergen in contact cheilitis; high sensitization rate in sensitized individuals	Tier D for sensitized users — flag as potential allergen
Flavoring agents (listed as "flavor" or "aroma")	As per 2018 cheilitis review: undisclosed flavor mixes are leading cause of allergic contact cheilitis	Transparency penalty; Tier D risk if undisclosed
Note on Menthol/Peppermint specifically: Multiple case reports document allergic contact cheilitis from peppermint oil in lip balm. Dermatology professor Marcia Driscoll notes aroma ingredients in lip balms specifically have potential to irritate the lip surface. Menthol and camphor can create a licking cycle that worsens chronic cheilitis. These are Tier D in the lip balm context even though peppermint at low concentration is GRAS for food use — the mucosal sensitization mechanism in repeat lip application differs from incidental food exposure.
---
LAYER 4 — PRESERVATION ADEQUACY (Inherited from v1.1 with Oral Safety Addition)
For lip balms containing a water phase (aloe vera gel, herbal hydrosols, plant extracts in water):
Full preservation assessment from v1.1 applies
ADDITIONAL oral safety screen: preservative must be acceptable for lip/oral mucosal contact and trace ingestion. Phenoxyethanol at lip contact concentrations is of concern (case report: allergic reaction to phenoxyethanol in lip balm flavoring mask, PMID 5862010). Flag preservatives that are appropriate for skin but not for lip/oral mucosal use.
True anhydrous lip balms (wax + oil only, no water phase): No preservation required. "Preservative-free" = honest.
---
━━━━━━━━━━━━━━━━━━
LAYER 5 — CORE SCORING SYSTEM
━━━━━━━━━━━━━━━━━━
ALL CORE DIMENSIONS ARE SCORED FROM:
⭐ 1.0 → 5.0
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)
Lip-product evaluation MUST account for:
• repeated licking/removal cycles
• oral-border exposure
• partial ingestion risk
• mucosal sensitization
• chronic reapplication behavior
• saliva interaction
• phototoxicity near UV-exposed vermilion skin
━━━━━━━━
SAFETY [DOMINANT]
━━━━━━━━
Evaluates:
• Topical irritation risk
• Oral/accidental ingestion safety
• Repeated licking-cycle exposure
• Mucosal irritation potential
• Phototoxic botanical presence
• Essential oil concentration safety
• Oxidative instability of oils/butters
• Preservative safety near oral tissue
• Chronic occlusive exposure effects
• Long-term lip-barrier disruption risk
LICKING-CYCLE RULE
Lip products undergo repeated partial removal and reapplication through:
• licking
• eating/drinking
• saliva contact
• speaking friction
Ingredients unsafe for repeated incidental ingestion receive mandatory Safety reduction.
PHOTOTOXICITY RULE
Phototoxic citrus oils/extracts:
• bergamot
• lime
• bitter orange
• expressed citrus oils
→ mandatory phototoxicity flag when UV exposure risk exists.
MANDATORY SAFETY RULES
• Safety overrides cosmetic claims
• Essential oils receive stricter penalty weighting on lip/mucosal exposure
• Unsafe ingestion-profile ingredients cannot achieve elite Safety scores
• Irritant stacking under repeated reapplication → compounded penalty
• Flavor oils and aromatic compounds with unclear allergen disclosure → Safety reduction
━━━━━━━━
EFFECTIVENESS
━━━━━━━━
Evaluates:
• Occlusion persistence
• TEWL reduction capability
• Humectant retention
• Barrier-repair support
• Lip-softening persistence
• Protection against dehydration/wind exposure
• Active delivery realism
• Overnight repair compatibility
• Reapplication durability
Positive modifiers:
• physiological occlusives
• stable humectant systems
• ceramide/lipid support
• evidence-supported repair actives
Negative modifiers:
• temporary shine masking dryness
• volatile aromatic dominance
• weak occlusion persistence
• flavor-heavy decorative systems
━━━━━━━━
ALLERGY RISK
━━━━━━━━
Evaluates:
• Contact cheilitis sensitizers
• Essential oil sensitization
• Flavor/fragrance allergen burden
• Oral mucosal exposure risk
• Oxidized oil sensitization
• Repeated-use allergen accumulation
• Aromatic compound stacking
• Undisclosed flavor allergen burden
CHEILITIS AMPLIFICATION RULE
Lip skin and vermilion border are more permeable and irritation-prone than standard facial skin.
Any sensitizer burden receives amplified weighting.
UNDISCLOSED FLAVOR RULE
Flavoring systems marketed only as:
• “flavor”
• “aroma”
• “natural flavor”
without allergen transparency receive credibility and Allergy Risk penalties.
━━━━━━━━
INGREDIENT QUALITY
━━━━━━━━
Evaluates:
• Occlusive tier quality
• Humectant quality
• Active evidence tier
• Formulation cleanliness
• Stability of oils/butters
• Barrier-supportive lipid structure
• Evidence-supported repair ingredients
• Decorative ingredient inflation
• Functional concentration realism
Positive modifiers:
• lanolin alternatives with strong barrier performance
• ceramides/cholesterol/fatty acids
• stable plant butters/oils
• evidence-supported actives
Negative modifiers:
• decorative botanical inflation
• flavor-heavy positioning without repair logic
• unstable fragrant oils
• excessive pigment/gloss focus without barrier support
━━━━━━━━
SKIN COMPATIBILITY
━━━━━━━━
Evaluates:
• Long-term lip-barrier compatibility
• Occlusion breathability balance
• Repeated-use tolerance
• Saliva interaction stability
• Dehydration rebound risk
• Cracking/chapping prevention
• Seasonal stability
• Sensitive-lip compatibility
Heavy wax dominance without humectant support reduces compatibility score.
━━━━━━━━
ECO IMPACT
━━━━━━━━
Evaluates:
• Packaging sustainability
• Ingredient biodegradability
• Palm/oil sourcing sustainability
• Synthetic persistence
• Beeswax/animal-derived sourcing transparency
• Environmental burden of flavor/fragrance systems
• Excessive packaging waste
Eco Impact cannot override structural formulation weakness.


---
LAYER 6 — SPECIALIZED LIP BALM PERFORMANCE (7 Dimensions)
---
DIMENSION 1: OCCLUSION EFFICIENCY
Measures how effectively the product reduces TEWL from the lip surface and maintains protective barrier throughout the wear period.
Occlusion Profile	Score
Hard wax (Tier W1) + oil blend + humectant: Complete system	4.5–5.0
Beeswax or candelilla dominant with supporting oils and glycerin	4.0–4.5
Soft butter (shea/mango) base with hard wax support	3.5–4.0
Oil-only base (no hard wax): Poor lip adhesion, low persistence	2.0–3.0
Oil-only base marketed as "long-lasting" or "superior barrier"	1.5–2.5 — misleading claim
Thin watery formula marketed as "intensive lip treatment"	1.5–2.5
---
DIMENSION 2: HUMECTANT & HYDRATION DELIVERY
Measures the quality of water-attracting ingredients that deliver actual hydration (not just surface occlusion).
Hydration Profile	Score
Glycerin + hyaluronic acid + occlusive base	4.5–5.0
Glycerin or sodium PCA in effective occlusive base	4.0–4.5
Honey at ≥3% in appropriate base	3.5–4.5 (humectant + antimicrobial credit)
Plant butters only (emollient, not humectant) — no dedicated humectant	3.0–3.5
No humectant identified — occlusive-only system	2.5–3.5 (depends on occlusion quality)
"Hydrating" claim with no humectant and no effective occlusive	1.5–2.0
---
DIMENSION 3: EMOLLIENT & TEXTURE PERFORMANCE
Measures how well the formula smooths, fills, and repairs the lip surface texture.
Emollient Profile	Score
Castor oil + shea butter + supporting emollient oils	4.5–5.0
Multi-oil emollient blend (jojoba, argan, rosehip) with wax	4.0–4.5
Single-oil emollient with hard wax	3.5–4.0
Wax-only formula with no emollient oils	2.5–3.5 — functional but lacking
Overly waxy formula with no slip or spreadability	2.0–3.0
---
DIMENSION 4: SENSITIZATION & CHEILITIS RISK
The most important safety dimension unique to lip balm. Measures cumulative allergic contact cheilitis risk.
Sensitization Profile	Score
Fragrance-free, no essential oils, no flavor, no Tier D ingredients	4.5–5.0
Mild essential oils at trace (last 3 INCI positions), no phototoxic botanicals	4.0–4.5
Essential oil fragrance blend; moderate sensitizer burden	3.0–4.0
Peppermint, menthol, or camphor present (licking cycle + sensitization)	2.0–3.0
Cinnamon/clove/eugenol present	1.5–2.5 — Tier D penalty
Undisclosed "flavor" or "aroma" (hidden allergen burden)	2.0–3.0 — transparency penalty
Multiple Tier D sensitizers + phototoxic botanicals	1.0–2.0
---
DIMENSION 5: ORAL/INGESTION SAFETY
Unique to lip products. Scores the safety of the ingredient profile for the estimated ~24 mg/day ingestion that occurs with regular lip product use.
Oral Safety Profile	Score
All ingredients food-grade safe or GRAS at trace ingestion levels	4.5–5.0
Cosmetic-grade ingredients without oral safety concerns at trace levels	4.0–4.5
Preservatives present but at concentrations below oral concern threshold	3.5–4.0
Essential oils present at concentrations that raise oral mucosal concern	2.5–3.5
Camphor at significant concentration	1.5–2.5 — ingestion safety concern
Phenol present	1.0–1.5 — contraindicated
Synthetic colorants without oral safety assessment	2.0–3.0
---
DIMENSION 6: LIP REPAIR & HEALING SUPPORT
Measures whether the formula actively supports lip healing beyond passive protection.
Repair Profile	Score
SPF-containing formula: Genuine photoprotection credit	+0.5 bonus to this dimension score
Vitamin E (tocopherol) + occlusive base: Antioxidant support	4.0–5.0
Aloe vera + calendula + healing oil (rosehip): Multi-mechanism mild repair	3.5–4.5
Honey (Manuka or raw): Antimicrobial + humectant healing support	3.5–4.5
Basic wax + oil, no active repair ingredients	3.0–3.5 (functional but no repair)
Menthol/camphor "medicated" — numbing, not healing	1.5–2.5 — misleading "healing" claim
"Herbal healing" claims with only Tier C actives	2.0–3.0
---
DIMENSION 7: LONG-TERM LIP HEALTH TRAJECTORY
Measures whether daily use of this product improves or worsens lip condition over months of use.
Long-Term Profile	Score
Non-sensitizing + good occlusion + humectant: Barrier recovery and maintenance	4.5–5.0
Occasional minor sensitizer but otherwise structurally sound	3.5–4.5
Over-reliance on silky/sensory ingredients without real moisture support	3.0–3.5
Menthol/camphor creating dependency drying cycle	2.0–3.0 — long-term negative
Flavored with hidden sensitizer burden: Chronic cheilitis risk	1.5–2.5
Strong sensitizers in a product intended for frequent daily use	1.0–2.0
FINAL SPECIALIZED SCORE = AVERAGE OF ALL SPECIALIZED SCORES
---
LAYER 7 — FINAL RATING FORMULA
Final Rating = average of core score and specialised score 
High-score eligibility (above 4.0):
✅ Tier W1 or W2 occlusive wax as primary structure
✅ Dedicated humectant ingredient present
✅ No Tier D lip-specific sensitizers (no menthol/camphor/peppermint/cinnamon)
✅ Oral safety profile adequate for daily ingestion at trace levels
✅ No undisclosed "flavor/aroma" allergen burden
✅ No phototoxic botanicals (citrus peel oils)
✅ Formulation Honesty ≥ 3.5
✅ No licking-cycle-inducing ingredients as primary sensory mechanism
---
OUTPUT FORMAT — LIP BALM
⭐ FINAL RATING X.X / 5
⚖ STRUCTURAL QUALITY
Assessment covering: occlusive tier, humectant quality, emollient blend, sensitization risk at oral/lip contact, oral safety, licking-cycle risk, and long-term lip health trajectory.
🌿 HERBAL/ORGANIC PROFILE
Examples:
Beeswax-Dominant Protective Lip Balm (Tier W1 Occlusion, Low Sensitizer Burden)
Plant-Wax Vegan Lip Balm (Candelilla Base, Adequate Barrier)
Oil-Only Herbal Lip Balm (Inadequate Occlusion, Sensory-Led)
Menthol-Heavy Herbal Balm (Licking Cycle Risk, Cheilitis Concern)
Evidence-Backed SPF Lip Balm (UV Protection + Barrier Support)
Flavored Botanical Lip Balm (Hidden Allergen Burden, Cheilitis Risk)
📊 CORE SCORES(SHORT STRUCTURAL REASON FOR EVERY SCORE)

Safety — ⭐X.X | Effectiveness — ⭐X.X | Allergy Risk — ⭐X.X | Eco Impact — ⭐X.X | Ingredient Quality — ⭐X.X | Skin Compatibility — ⭐X.X
🧪 SPECIALIZED PERFORMANCE(SHORT STRUCTURAL REASON FOR EVERY SCORE)

Occlusion Efficiency — ⭐X.X
Humectant & Hydration Delivery — ⭐X.X
Emollient & Texture Performance — ⭐X.X
Sensitization & Cheilitis Risk — ⭐X.X
Oral/Ingestion Safety — ⭐X.X
Lip Repair & Healing Support — ⭐X.X
Long-Term Lip Health Trajectory — ⭐X.X
🌼 SENSITIZATION & ORAL SAFETY ASSESSMENT
Tier D lip-specific sensitizers: None / [list]
Phototoxic botanicals: None / [list]
Oral/ingestion safety concern: None / Minor / ⚠ Concern
Licking cycle risk ingredients: None / [list]
Undisclosed flavor burden: Yes / No
Patch test recommended: Yes / No
👍 STRENGTHS / ⚠ CONCERNS / 🔍 THE TRUTH ABOUT THE "NATURAL" CLAIMS
👤 LIP TYPE COMPATIBILITY
Dry/Chronically Chapped → ⭐X.X
Normal / Occasional Dryness → ⭐X.X
Sensitive / Allergy-Prone → ⭐X.X
Acne-Prone (Perioral) → ⭐X.X
⏱ EXPECTED REAL-WORLD RESULTS
Immediate: Texture, sensory experience, moisture feel
Short-term (2–4 weeks): Dryness improvement or worsening trajectory; any sensitization signal
Long-term (months): Barrier restoration or dependency-drying cycle development; realistic outcome
🧠 WHY THIS RATING (3–5 concise evidence-based sentences ) 
📌 STRUCTURAL INSIGHT
Strengths
X
X
X
Weaknesses
X
X
X
---

⚠ STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS
include harsh preservatives,colorants,fragrance in output
No marketing influence
No luxury/sensory bias
No branding influence
No ingredient-count bias
Structural weakness overrides cosmetic feel
Flavor and cooling agent burden MUST be reflected in scoring
Repeated-use behavior > first-use feel
Long-term outcome > immediate sensation
Temporary smoothness ≠ barrier repair






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
              "You are a strict herbal lip balm structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "ORGANIC LIP BALM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new OrganicEngine();