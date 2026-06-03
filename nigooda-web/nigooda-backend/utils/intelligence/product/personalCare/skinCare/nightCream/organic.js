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

        night_cream_type:
          "ORGANIC_HERBAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "ORGANIC NIGHT CREAM ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

HERBAL / ORGANIC NIGHT CREAM EVALUATION ALGORITHM ---
⚠ CRITICAL OPENING STATEMENT — THE NOCTURNAL ADVANTAGE AND ITS ABUSERS
Night cream is the product category in cosmetic dermatology where science and marketing are most sharply in conflict — in both directions. The science is genuinely compelling; the marketing often overstates it catastrophically.
What the science actually supports:
Skin cell proliferation is 30% higher at night than during the day, documented in the Journal of Investigative Dermatology. Keratinocytes divide more rapidly at night; fibroblasts ramp up collagen production. This is circadian biology, not marketing.
Nighttime is when transepidermal water loss peaks, meaning the skin loses more moisture — richer moisturizers and barrier-repairing ingredients like ceramides or niacinamide can help lock hydration in while sleeping.
Skin permeability is measurably higher at night, making active ingredient delivery more efficient (J Investig Dermatol chronobiology reference)
Retinoids, peptides, and photosensitive actives genuinely belong in night products — they are either photodegradable, photosensitizing, or both
Disruption of the skin's endogenous circadian balance, even by a consistently late bedtime, has deleterious effects on multiple measurements of skin health, including hydration, skin barrier protection, microbiome counts, and skin regeneration.
What the marketing abuses:
"Regenerates cells overnight" — the cells regenerate regardless of what you put on your face; the night cream supports the process, it does not initiate it
"Reverses aging" — no topical product reverses intrinsic aging; the honest claim is "reduces visible signs" or "slows visible progression"
"Detoxifies skin while you sleep" — meaningless; detoxification is a liver function, not a dermal function
"Repairs DNA damage overnight" — DNA repair occurs; a cream cannot meaningfully accelerate it beyond what the skin does naturally
"Anti-aging herbs used for centuries" — traditional use without clinical evidence in leave-on overnight format = Tier C at best
"Collagen-boosting" from topical collagen molecules — topical collagen peptides may temporarily hydrate; they cannot penetrate to the dermis to "boost" collagen synthesis (unless nano-encapsulated — assess accordingly)
The algorithm evaluates the genuine nocturnal delivery advantage while penalizing the pseudoscientific exaggerations that exploit it.
---
LAYER 0 — FOUNDATION ENGINE
The Nocturnal Delivery Advantage Rule
Night creams receive a positive delivery modifier relative to daytime products because:
Skin permeability is higher at night
No competing UV degradation (photosensitive actives fully functional)
6–8 hour continuous contact enables sustained delivery of appropriate actives
Occlusive environment (pillow contact, reduced air movement) enhances penetration of humectants and some actives
This modifier applies to evidence-based actives that can utilize extended delivery time. It does NOT apply to Tier C actives that lack penetration capability regardless of contact time.
The Comedogenicity Rule (Critical for Night Cream)
A night cream is applied to the face in the heaviest concentration of the skincare routine and left on for 6–8 hours. The comedogenic potential of the formula is therefore highest in the night cream format compared to any other leave-on product:
Occlusives that trap sebum overnight create ideal conditions for comedone formation in acne-prone and oily skin
Natural oils with high comedogenic ratings (coconut oil rated 4, cocoa butter rated 4–5) are especially problematic in a rich overnight formula
The algorithm mandates skin-type-stratified comedogenicity assessment for every night cream, regardless of "natural" or "organic" positioning
"Natural = non-comedogenic" is NOT a valid inference. Coconut oil and cocoa butter are among the most comedogenic ingredients in cosmetic dermatology.
The Circadian-Alignment Rule
A well-formulated herbal night cream should contain at least one ingredient whose function aligns with the skin's documented nocturnal biology:
Barrier-repairing ingredients (ceramide precursors, plant sterols, linoleic acid) → support the lipid synthesis that occurs at night
Humectants → address the peak TEWL that occurs during sleep
Cell turnover support (bakuchiol, retinol from natural sources) → align with keratinocyte division cycle
Anti-inflammatory ingredients → modulate cortisol-low state, support repair without defensive responses
Night creams that contain ONLY emollients without any circadian-aligned active represent basic moisturizers, not true night creams, and must be scored accordingly.
The Photosensitivity Advantage Rule
Night application is the correct format for:
Bakuchiol (photostable, but works best in no-UV environment for collagen benefit)
Vitamin A derivatives (retinol, retinaldehyde, retinyl palmitate from natural sources)
AHA exfoliants at higher concentration
Niacinamide at higher concentration
Certain polyphenol antioxidants that degrade under UV
These ingredients receive CREDIT for nighttime positioning — it reflects genuine formulation intelligence, not a marketing gimmick.
---
LAYER 1 — EMOLLIENT/OCCLUSIVE BASE CLASSIFICATION
The base vehicle of a night cream determines its comedogenicity profile, moisture-locking ability, and active ingredient delivery platform.
NIGHT CREAM BASE TIER TABLE
Tier N1 — Optimal Night Cream Base (Non-comedogenic to Low-comedogenic, barrier-supportive):
Shea butter (rating 0–2) + jojoba oil + squalane + emulsifiers
Ceramide precursors (phytosphingosine, sphinganine) from plant sources as base component
Non-comedogenic oil blend (squalane, jojoba, sea buckthorn, argan, rosehip) with plant wax emulsifier
Characteristics: Barrier-supportive, non-pore-blocking, appropriate for most skin types
Tier N2 — Moderate Night Cream Base (Good for dry skin, caution for oily/acne-prone):
Shea butter dominant (rating 0–2) with plant oils
Avocado + almond oil blend
Cocoa butter (rating 4–5) in limited concentration as part of blend — must be disclosed for acne-prone skin
Characteristics: Rich texture appropriate for dry/mature skin; requires comedogenicity disclosure
Tier N3 — High Comedogenic Risk Base (Problematic for most users except severely dry):
Coconut oil dominant (rating 4)
Cocoa butter dominant (rating 4–5)
Heavy wheat germ oil at high concentration (rating 5)
Characteristics: Risk of acne cosmetica with nightly use; appropriate ONLY for severely dry, non-acne-prone skin; requires skin-type contraindication
Scoring rule: Comedogenic potential of the base must be explicitly scored and reflected in skin type compatibility scores. Marketing "suitable for all skin types" on a Tier N3 base → mandatory misleading claim penalty.
---
LAYER 2 — HERBAL ACTIVE DELIVERY CLASSIFICATION (Night Cream Format)
Night cream represents the highest active delivery opportunity of any leave-on product: 6–8 hours continuous contact, peak skin permeability, no UV degradation. This dramatically changes active scoring.
Category A — Full nocturnal delivery credit:
Bakuchiol (Psoralea corylifolia): RCT evidence (British Journal of Dermatology); comparable efficacy to retinol with better tolerability; photostable; collagen I + VII + fibronectin stimulation documented (PMC 2022, PMID 9328396); full Tier A credit in night cream; also safe in pregnancy unlike retinol
Retinol from natural sources (retinyl palmitate, retinaldehyde in plant-derived form): Mechanism identical to synthetic retinol; cell turnover; full Tier A credit at effective concentration in night cream
Niacinamide (any source): Barrier strengthening, sebum regulation, anti-inflammatory, brightening; full Tier A credit at ≥2% in night cream
Centella asiatica extract (standardized): Wound healing, collagen support, anti-inflammatory; strong leave-on evidence; full Tier A in night cream
Glycerin / Hyaluronic acid: Full humectant credit in 6–8 hour contact
Plant ceramide precursors (phytosphingosine from sphinganine-rich plants): Barrier lipid support; full credit
Panthenol (any source): Barrier conditioning, wound healing; full Tier A
Rosehip oil (Rosa canina): Contains retinoic acid (tretinoin) precursors, linoleic acid, and tocopherols; documented in controlled studies for photoaging and scar reduction; Tier A credit when stable (oxidation-prone — check for rancidity stabilization)
Sea buckthorn oil: Rich in omega-7 (palmitoleic acid), carotenoids, tocopherols; documented barrier and anti-inflammatory properties; Tier A
Category B — Partial nocturnal credit (with evidence notation):
Turmeric/curcumin in lipophilic vehicle: Anti-inflammatory; 6–8 hours = genuine partial delivery of curcuminoids; upgraded from Category C; B-level with staining disclosure
Licorice extract (Glycyrrhiza glabra): Glabridin; anti-inflammatory and brightening; B-level in leave-on night cream
Aloe vera (stabilized, ≥50%): Anti-inflammatory, soothing; B-level in night cream vehicle
Sandalwood extract (alpha-santalol): Anti-inflammatory; B-level; sensitization flag
Green tea extract (EGCG): Antioxidant, mild anti-inflammatory; B-level (delivery limited by molecular weight and vehicle polarity)
Ferulic acid (from rice bran, wheat bran): Antioxidant; B-level in leave-on
Squalane (plant-derived from olives, amaranth): Skin-identical lipid; non-comedogenic; barrier support; B-level emollient credit
Argan oil: Contains tocopherols, sterols, linoleic acid; barrier support; B-level
Moringa oil: Oleic acid and behenic acid dominant; emollient; B-level
Fermented plant extracts (fermented rice water, fermented yeast extract): Postbiotic; barrier and microbiome support; B-level
Category C — Minimal nocturnal delivery (Penalize if marketed as hero claim):
Collagen (plant-derived, topical): Cannot penetrate to dermis even in 8-hour contact; surface humectant only; Category C despite premium marketing
Saffron: No controlled evidence for anti-aging in leave-on format despite extended contact; primarily colorant and marketing
Gold particles / Pearl powder: No documented skin function at any contact time; premium pricing ingredient
Stem cells (plant-derived): Plant stem cells do not interact with human skin cell biology in a functionally meaningful way; Category C regardless of how compelling the marketing sounds
Rose extract / Jasmine extract at trace: Sensory only; negligible active delivery
"Anti-aging Ayurvedic herbs" (brahmi, ashwagandha in topical night cream): No controlled clinical evidence for documented anti-aging activity in leave-on topical format; traditional use ≠ evidence
---
LAYER 3 — HERBAL EVIDENCE CLASSIFICATION (Full v1.1 system with Night Cream Additions)
All Evidence Tiers A/B/C/D from v1.1 apply.
Night cream-specific Tier D concerns:
Bergamot oil without furanocoumarin removal: Photosensitization risk reduced overnight but residue may persist to daytime; flag
High-concentration AHA (>5% glycolic/lactic) without pH verification: Extended overnight contact at low pH = significant irritation risk; mandatory concentration and pH disclosure
Sensitizing essential oils at dominant positions in a 6–8 hour leave-on product: Sensitization risk per application is HIGHEST in this format — longer than a face pack, repeated nightly
Extended Leave-On Sensitization Rule
Essential oil and botanical sensitizer risk in a night cream exceeds that of a face pack. Sensitizer exposure occurs for 6–8 hours every night, continuously. Cumulative sensitization development over months of nightly use must be reflected in scoring.
---
LAYER 4 — MICROBIOME COMPATIBILITY
Overnight leave-on creates a semi-occlusive environment on facial skin for hours. Broad-spectrum antimicrobial botanicals in night cream:
At HIGH concentration: Real commensal disruption risk over months of nightly use
Tea tree oil at >0.5% in a daily-use night cream: Microbiome disruption risk — penalty
Antimicrobial-heavy herbal blend: Assess cumulative nightly commensal exposure
Microbiome-supportive in night cream:
Prebiotics (inulin, fructooligosaccharides from plant sources)
Postbiotic fermented extracts
Low-pH formulation (4.5–5.5) — supports commensal bacterial balance
Ceramide + barrier support — reduces skin dysbiosis from compromised barrier
---
LAYER 4.5 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no barrier repair, nourishment, or long-term skin benefit in night creams and may increase unnecessary irritation burden.

High concern examples:
• Red 40
• Yellow 5
• Yellow 6
• Blue 1
• Green 3
• Multiple synthetic dye blends

Scoring Impact:
• Allergy Risk penalty
• Ingredient Quality penalty
• Skin Compatibility penalty

Multiple synthetic dyes increase penalties further.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”


# LAYER 5 — CORE SCORING SYSTEM
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
Night-cream scoring MUST evaluate overnight occlusion behavior, nocturnal skin physiology, repeated nightly exposure, pillow-transfer migration, and cumulative barrier effects.
━━━━━━━━
SAFETY [DOMINANT]
━━━━━━━━
Evaluates:
• Overnight occlusion comedogenicity risk
• Pore congestion accumulation under 6–8 hour exposure
• Essential oil/fragrance sensitization during prolonged nightly contact
• Retinoid/AHA/BHA concentration safety under overnight exposure
• Barrier disruption risk in compromised or dehydrated skin
• Occlusive trapping of irritants
• Preservative safety in prolonged leave-on exposure
• Pillow-transfer migration toward eye/periorbital area
• Chronic overnight irritation accumulation
• Long-term barrier depletion risk
MANDATORY SAFETY RULES
• Safety overrides cosmetic performance claims
• Overnight exposure amplifies irritation and sensitization relative to short-contact products
• Fragrance in overnight leave-on products receives stricter penalty weighting
• High-comedogenic occlusive systems reduce both Safety and Skin Compatibility
• Retinoid/AHA concentration exceeding realistic nightly tolerance thresholds → mandatory Safety reduction
• Irritant stacking under occlusion → compounded penalty
━━━━━━━━
EFFECTIVENESS
━━━━━━━━
Evaluates:
• Nocturnal delivery efficiency
• Active stability during overnight exposure
• Occlusive-assisted penetration realism
• Evidence quality of primary actives
• Delivery vehicle compatibility
• Overnight hydration persistence
• Barrier recovery support during nocturnal TEWL cycle
• Circadian-alignment with documented nighttime skin biology
NOCTURNAL DELIVERY ADVANTAGE RULE
Category A/B actives receive delivery advantage credit when:
• overnight contact time is sufficient
• formulation vehicle supports penetration
• active stability remains intact during extended exposure
CIRCADIAN ALIGNMENT ASSESSMENT
Positive modifier when formulation supports:
• nighttime barrier repair
• TEWL compensation
• nocturnal lipid synthesis
• overnight hydration retention
• anti-inflammatory recovery pathways
Negative modifier when formulation structure conflicts with nighttime skin physiology through:
• excessive astringency
• high-irritation exfoliation
• destabilizing alcohol systems
• unnecessary stimulant loading
━━━━━━━━
ALLERGY RISK
━━━━━━━━
Evaluates:
• Fragrance burden
• Essential oil sensitization
• Oxidizing aromatic compounds
• Repeated nightly allergen exposure
• Botanical sensitizer stacking
• Preservative sensitization profile
• Pillow-transfer eye exposure risk
• Cumulative threshold sensitization over chronic use
OVERNIGHT SENSITIZATION RULE
Repeated 6–8 hour exposure significantly increases sensitization probability versus rinse-off or short-contact formats.
Essential oils used primarily for fragrance purposes MUST be treated as fragrance allergens regardless of “natural” positioning.
━━━━━━━━
INGREDIENT QUALITY
━━━━━━━━
Evaluates:
• Functional active realism
• Concentration plausibility
• Vehicle appropriateness
• Overnight compatibility of actives
• Formulation cleanliness
• Structural balance between occlusion and breathability
• Absence of decorative ingredient inflation
• Evidence-supported overnight repair logic
NSF CREDIT RULE
Relevant botanical oils retaining meaningful unsaponifiable fractions (NSF) receive positive quality modifiers when:
• concentration is functionally meaningful
• oxidation risk is controlled
• comedogenicity remains acceptable
Decorative botanical loading without functional evidence → credibility reduction.
━━━━━━━━
SKIN COMPATIBILITY
━━━━━━━━
Evaluates:
• Overnight pore congestion tendency
• Long-term comedogenic accumulation
• Barrier compatibility under occlusion
• Overnight TEWL management
• Breathability vs heavy occlusion balance
• Repeated-use tolerance
• Compatibility with sensitive/acne-prone skin
• Seasonal tolerance stability
Heavy occlusive systems without balancing humectant/barrier support reduce compatibility score.
━━━━━━━━
ECO IMPACT
━━━━━━━━
Evaluates:
• Packaging sustainability
• Ingredient biodegradability
• Synthetic persistence
• Palm/oil sourcing sustainability
• Environmental burden of silicone-heavy systems
• Preservation-system ecotoxicity
• Unnecessary formulation excess
Eco Impact cannot override structural dermatological weakness.


LAYER 6 — SPECIALIZED NIGHT CREAM PERFORMANCE (8 Dimensions)
ALL SPECIALISED  DIMENSIONS ARE SCORED FROM:
⭐ 1.0 → 5.0

---
DIMENSION 1: NOCTURNAL ACTIVE DELIVERY EFFICACY
Measures the quality and evidence base of actives specifically positioned for overnight delivery.
Active Profile	Score
Bakuchiol at ≥0.5% + supporting actives (niacinamide, centella, peptides)	4.5–5.0
Retinol (natural source) at effective concentration + barrier support	4.5–5.0
Multiple Tier B actives in appropriate vehicle	3.5–4.5
Single Tier B active	3.0–3.5
Tier A actives present but at concentrations too low to be functional (late INCI position)	2.0–3.0 — concentration penalty
Tier C actives only as hero claims	1.5–2.5
"Plant stem cells" or "gold" as primary anti-aging claims	1.0–2.0 — pseudoscience penalty
---
DIMENSION 2: BARRIER REPAIR & LIPID REPLENISHMENT
Measures how well the formula supports the lipid synthesis and barrier repair that occurs predominantly at night.
Barrier Profile	Score
Ceramide precursors + linoleic acid-rich oils + panthenol	4.5–5.0
Shea butter + plant sterols + squalane: Barrier lipid support	4.0–4.5
Rosehip + argan + sea buckthorn: Rich in barrier-relevant fatty acids	4.0–4.5
Basic emollient base without barrier-specific actives	3.0–3.5
Comedogenic base (coconut, cocoa butter dominant): Blocks rather than rebuilds	2.0–3.0
Barrier disruptive elements (high alcohol, high AHA without buffering)	1.5–2.5
---
DIMENSION 3: HYDRATION DEPTH & RETENTION
Measures the humectant and moisture-retention capacity for the 6–8 hour overnight window.
Hydration Profile	Score
HA (multi-molecular weight) + glycerin + occlusive seal	4.5–5.0
Glycerin + plant butter occlusive layer	4.0–4.5
Single humectant with adequate occlusion	3.5–4.0
Emollient-only, no dedicated humectant	2.5–3.5
Heavy occlusive without humectant (locks in nothing)	2.5–3.0
---
DIMENSION 4: ANTI-AGING & REGENERATION SUPPORT
Measures evidence-based support for the skin's nocturnal cell turnover and repair processes.
Anti-Aging Profile	Score
Bakuchiol ≥0.5% (RCT evidence; retinol-comparable)	4.5–5.0
Retinol (natural source) at functional concentration	4.5–5.0
Centella asiatica (standardized) + peptide blend	4.0–4.5
Rosehip oil (stabilized) + niacinamide	3.5–4.5
Single Tier B active (licorice, ferulic acid, green tea)	3.0–4.0
Tier C actives (collagen, saffron, gold) as primary anti-aging	1.5–2.5
"Reverses aging" / "Undoes wrinkles" claims with no Tier A active	1.0–2.0 — mandatory penalty
---
DIMENSION 5: COMEDOGENICITY MANAGEMENT
Measures how well the formula manages overnight pore-blocking risk. Higher weight for oily/acne-prone skin.
Comedogenicity Profile	Score
Non-comedogenic oils (squalane, jojoba, rosehip, argan) as base	4.5–5.0
Low-comedogenic base (shea butter, sea buckthorn) appropriately disclosed	4.0–4.5
Mixed base with high-comedogenic oil at <10% + disclosure	3.5–4.0
Coconut oil at dominant concentration without acne-prone contraindication	2.0–3.0 — penalty
Cocoa butter dominant (rating 4–5) without contraindication	1.5–2.5 — penalty
"All skin types" claim on Tier N3 base	1.0–2.0 — mandatory misleading claim penalty
---
DIMENSION 6: SOOTHING & ANTI-INFLAMMATORY PERFORMANCE
Measures anti-inflammatory activity appropriate for the cortisol-low, repair-dominant nocturnal state.
Anti-Inflammatory Profile	Score
Centella asiatica + aloe vera + calendula: Multi-mechanism soothing	4.5–5.0
Niacinamide dominant + supporting soothing botanicals	4.0–4.5
Single Tier A/B anti-inflammatory active	3.5–4.0
Basic emollient with no anti-inflammatory active	3.0–3.5
Sensitizing botanicals (essential oils at high concentration) in an anti-inflammatory claim	1.5–2.5 — contradiction penalty
---
DIMENSION 7: SKIN TEXTURE & MORNING APPEARANCE
Measures the realistic next-morning skin outcome after one application.
Morning Skin Profile	Score
Multi-humectant + barrier support + active: Measurable morning plumpness and hydration	4.5–5.0
Good humectant + emollient: Improved softness, reduced tightness	4.0–4.5
Emollient-only: Softer feel, no barrier benefit	3.0–4.0
Heavy occlusive (greasy residue): Clogged texture in morning	2.5–3.5
Sensitizer-induced barrier disruption: Potential morning redness/irritation	1.5–2.5
---
DIMENSION 8: REPEATED NIGHTLY TOLERANCE
Measures whether nightly use for months is safe and increasingly beneficial, or progressively problematic.
Long-Term Tolerance	Score
Low-sensitizer + non-comedogenic + barrier-building: Cumulative barrier improvement	4.5–5.0
Mild essential oil fragrance, otherwise clean: Low sensitization risk at nightly use	3.5–4.5
AHA at appropriate concentration (≤5%) with pH 3.5–4.5: Tolerable with gradual introduction	3.5–4.0
High essential oil burden at nightly use: Sensitization risk increases over months	2.0–3.0
Comedogenic base: Acne cosmetica development over weeks–months	2.0–3.0
High AHA (>8%) without pH disclosure: Barrier disruption risk	1.5–2.5
Retinol without guidance on gradual introduction: Retinization irritation risk	2.5–3.5 (penalize if no guidance; credit if guidance present)

SPECIALIZED SCORE = AVERAGE OF ALL SPECIALIZED SCORES
---
LAYER 7 — FINAL RATING FORMULA
Final Rating = average of core score and specialized score
High-score eligibility (above 4.0):
✅ At least one Tier A herbal active at functional position and concentration
✅ Non-comedogenic or appropriately disclosed base
✅ Nocturnal delivery advantage genuinely utilized (circadian-aligned actives)
✅ No Tier D sensitizers at 6–8 hour leave-on concentration
✅ Adequate preservation system
✅ No Category C active inflation as anti-aging hero claim
✅ No pseudoscientific "collagen reversal", "DNA repair", "detox" claims
✅ Formulation Honesty ≥ 3.5
✅ Skin-type-stratified comedogenicity assessment present
✅ No SPF in night cream (presence of SPF in night cream = formulation intelligence failure)
---
OUTPUT FORMAT — NIGHT CREAM
⭐ FINAL RATING X.X / 5
⚖ STRUCTURAL QUALITY
Covering: nocturnal active delivery quality, base comedogenicity, circadian alignment, herbal evidence tier, sensitization risk at 6–8 hour leave-on, preservation adequacy, and realistic long-term outcome.
🌿 HERBAL/ORGANIC PROFILE
Examples:
Evidence-Backed Bakuchiol Night Cream (Tier A Anti-Aging, Non-Comedogenic Base)
Barrier-Repair Herbal Night Cream (Ceramide + Centella, Low Sensitizer Burden)
Anti-Aging Herbal Night Cream (Tier B Actives, Circadian-Appropriate)
Comedogenic Herbal Night Cream (Coconut-Dominant, Acne Risk)
Gimmick-Grade "Luxury" Night Cream (Tier C Actives, Pseudoscientific Claims)
Over-Fragranced Herbal Night Cream (High Nightly Sensitization Burden)
Rich Dry-Skin Night Cream (Good Barrier Support, Limited Anti-Aging Evidence)
📊 CORE SCORES
Safety — ⭐X.X | Effectiveness — ⭐X.X | Allergy Risk — ⭐X.X | Eco Impact — ⭐X.X | Ingredient Quality — ⭐X.X | Skin Compatibility — ⭐X.X
🧪 SPECIALIZED PERFORMANCE
Nocturnal Active Delivery Efficacy — ⭐X.X
Barrier Repair & Lipid Replenishment — ⭐X.X
Hydration Depth & Retention — ⭐X.X
Anti-Aging & Regeneration Support — ⭐X.X
Comedogenicity Management — ⭐X.X
Soothing & Anti-Inflammatory Performance — ⭐X.X
Skin Texture & Morning Appearance — ⭐X.X
Repeated Nightly Tolerance — ⭐X.X
🌼 SENSITIZATION RISK (NIGHTLY LEAVE-ON)
Essential oil burden at 6–8 hr contact: Low / Moderate / High / Very High
Tier D sensitizers: None / [list]
Recommended patch test: Yes / No
Fragrance in leave-on (pillow transfer, eye area exposure): Note if present
👍 STRENGTHS / ⚠ CONCERNS / 🔍 THE TRUTH ABOUT THE "NATURAL" CLAIMS
👤 SKIN TYPE COMPATIBILITY
Dry / Mature Skin → ⭐X.X
Normal Skin → ⭐X.X
Combination Skin → ⭐X.X
Oily Skin → ⭐X.X
Sensitive Skin → ⭐X.X
Acne-Prone Skin → ⭐X.X
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (First week): Texture, morning skin feel, any initial irritation from retinoids/AHAs
Short-term (4–8 weeks): Hydration trend; active ingredient cumulative effect; barrier trajectory
Long-term (3–6+ months): Anti-aging visible effect (if Tier A actives present); comedone development risk; sensitization risk; realistic dermatological outcome stated honestly
🧠 WHY THIS RATING 3–5 concise evidence-based sentences |
| 📌 STRUCTURAL INSIGHT | 
Strengths
X
X
X
Weaknesses
X
X
X

STRICT OUTPUT RULES : 
DONT DO ANY MEDICAL CLAIMS
include harsh fragrances,preservatives and colorants in output
Maintain strict dermatological evaluation principles
No marketing influence
No luxury or sensory bias
No branding influence
No ingredient-count bias
Structural weakness overrides cosmetic feel
Overnight fragrance burden carries the highest fragrance weight of any product category
Repeated-use behavior > first-use feel
Long-term outcome > immediate sensation
Temporary softness, richness, or nourishment ≠ barrier repair
Occlusion comfort ≠ skin health or recovery
Perceived overnight transformation ≠ structural performance


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
              "You are a strict herbal night cream structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "ORGANIC NIGHT CREAM TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new OrganicEngine();