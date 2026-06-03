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

        face_pack_type:
          "ORGANIC_HERBAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "ORGANIC FACE PACK ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `

HERBAL / ORGANIC FACE PACK & MASK EVALUATION ALGORITHM — VERSION 1.0 (OPTIMIZED)
Evidence-Based Dermatological Scoring Engine — Herbal Face Pack/Mask Edition
Built on Face Wash Algorithm v1.1 Core with extended-contact mechanics, over-drying assessment, and format-specific delivery science.
Research Base: 2010–2025 | Dermatology, Cosmetic Science, Skin Physiology
━━━━━━━━━━━━━━━━━━
CRITICAL OPENING STATEMENT — NATURAL HALO PROBLEM
━━━━━━━━━━━━━━━━━━
“Natural,” “Organic,” “Herbal,” “Ayurvedic,” “Chemical-Free,” “Detoxifying,” and “Glow” are marketing terms, NOT scientific quality proof.
Face packs differ from face washes because contact time is extended (10–30 min vs 30–90 sec), creating:
• Higher active delivery potential
• Higher sensitizer exposure
• Greater barrier disruption risk
• Greater microbiome disruption risk
• Greater over-drying risk
The algorithm neither rewards nor penalizes “herbal/organic” labeling itself.
Scoring depends on:
• Formulation structure
• Evidence quality
• Delivery realism
• Contact-time mechanics
• Safety profile
• Usage guidance
• Sensitization burden
Extended-contact exposure is the defining modifier across ALL layers.
━━━━━━━━━━━━━━━━━━
EXTENDED CONTACT ADVANTAGE RULE
━━━━━━━━━━━━━━━━━━
Face wash:
30–90 sec → minimal active delivery
Face pack/mask:
10–30 min semi-occlusion → meaningful delivery kinetics
SCORING CONSEQUENCE:
• Some rinse-off Category C actives may upgrade to partial Category B credit if:
contact ≥15 min
vehicle supports penetration
molecular size permits delivery
HOWEVER:
Extended contact amplifies BOTH:
• beneficial delivery
• irritant/sensitizer penetration
━━━━━━━━━━━━━━━━━━
LAYER 0 — FOUNDATION ENGINE
━━━━━━━━━━━━━━━━━━
SYSTEM OBJECTIVE
Evaluate what the formulation realistically does to skin over time — not what marketing claims.
TRANSPARENCY PRIORITY RULE
• Evidence overrides marketing
• Unsupported claims receive no credit
• Misleading claims receive penalties
EXTENDED CONTACT RULE
All ingredient evaluation MUST account for 10–30 minute semi-occlusive exposure.
OVER-DRYING THRESHOLD RULE
Clay/powder masks that fully crack or overdry exceed optimal use window.
→ Mandatory penalty when formulations or instructions encourage full cracking without justification.
FORMAT RULE
Formats covered:
• Wash-off clay/mud
• Wash-off cream/gel
• Powder packs
• Peel-off masks
• Overnight masks
• Sheet masks
Format MUST be identified before scoring.
PRESERVATION RULE
Water-containing masks require effective preservation.
Extended-contact occlusion increases microbial safety importance.
NATURAL HALO EFFECT PENALTY
Applies to:
• “Detox” claims without mechanism
• Turmeric staining marketed as glow
• Temporary astringency marketed as pore reduction
• “Bloodstream toxin removal” claims
• “Chemical-free” claims
• Traditional use presented as clinical evidence
━━━━━━━━━━━━━━━━━━
LAYER 1 — MASK FORMAT CLASSIFICATION
━━━━━━━━━━━━━━━━━━
FORMAT TIER 1 — CLAY/MUD MASK
Examples:
Kaolin, bentonite, multani mitti, Dead Sea mud, French green clay
Mechanism:
• Oil/sebum adsorption
• Mild physical exfoliation
Optimal contact:
10–20 min
Over-drying begins after cracking.
Delivery:
Moderate while wet; decreases as drying progresses.
Barrier impact:
• Kaolin → low
• Bentonite → moderate-high
• Multani → high
PRIMARY RISK:
Over-drying/moisture stripping.
CLAY SUBCLASSIFICATION
• Kaolin → low-moderate absorbency; sensitive-safe
• Bentonite → high absorbency; oily/acne-prone
• Multani mitti → very high absorbency; oily only
• French green → moderate-high absorbency
• Rhassoul → moderate absorbency
• Dead Sea mud → mineral-rich, lower disruption
• Kaolin+bentonite → moderate-high
━━━━━━━━
FORMAT TIER 2 — CREAM/GEL MASK
━━━━━━━━
Mechanism:
Occlusive active-holding vehicle.
Contact:
15–25 min
Delivery:
High continuous occlusion.
Barrier impact:
Low to very low.
PRIMARY RISK:
Preservation adequacy + sensitizer dwell time.
━━━━━━━━
FORMAT TIER 3 — POWDER PACK
━━━━━━━━
Mechanism:
User-mixed clay/botanical paste.
Delivery:
Moderate; depends on mixing base.
Barrier impact:
Depends on:
• clay type
• yogurt/water/additives
PRIMARY RISKS:
• contamination
• inconsistency
• phototoxic botanicals
━━━━━━━━
FORMAT TIER 4 — PEEL-OFF MASK
━━━━━━━━
Mechanism:
Film-forming adhesive removal.
Delivery:
Low.
Barrier impact:
Moderate-high mechanical trauma.
PRIMARY RISKS:
• barrier disruption
• dermatitis
• overuse
Contraindicated for:
• sensitive
• rosacea
• eczema
• dry skin
━━━━━━━━
FORMAT TIER 5 — OVERNIGHT MASK
━━━━━━━━
Mechanism:
True leave-on occlusion (6–8 hrs)
Delivery:
Very high.
Barrier impact:
Low if well-formulated; high if harsh actives.
PRIMARY RISK:
Long-duration sensitizer accumulation.
━━━━━━━━
FORMAT TIER 6 — SHEET MASK
━━━━━━━━
Mechanism:
Occlusive serum-soaked substrate.
Delivery:
High for low-MW water-soluble actives.
Barrier impact:
Very low from format itself.
PRIMARY RISK:
Leaving on too long reverses hydration effect.
━━━━━━━━━━━━━━━━━━
LAYER 2 — ACTIVE DELIVERY CLASSIFICATION
━━━━━━━━━━━━━━━━━━
CATEGORY A — FULL CREDIT
High delivery efficacy in extended-contact format.
• Niacinamide ≥2%
• Hyaluronic acid
• Glycerin
• Salicylic acid ≥0.5%
• Properly formulated lactic acid
• Tea tree oil 0.5–2%
• Zinc salts
• Sulfur
• Centella extract
• Stabilized aloe vera gel
• Bakuchiol (full in overnight; partial in wash-off)
━━━━━━━━
CATEGORY B — PARTIAL CREDIT
━━━━━━━━
• Turmeric/curcumin
• Neem extract (not oil)
• Licorice extract
• Calendula
• Kaolin/bentonite adsorption
• Green tea extract
• Panthenol
• Sandalwood extract
• Honey/Manuka
• Papaya enzyme
• Fermented plant extracts
Rules:
• Partial penetration only
• Vehicle-dependent
• Stability-dependent where relevant
━━━━━━━━
CATEGORY C — DECORATIVE / MINIMAL DELIVERY
━━━━━━━━
• Rose water
• Saffron
• Sandalwood powder
• Multani mitti marketed as detoxifier
• Collagen
• Most “brightening Ayurvedic powders”
• Rose petal powder
• Gram flour (functional only as physical exfoliant)
RULE:
Category C hero claims → inflation penalty.
━━━━━━━━━━━━━━━━━━
LAYER 3 — HERBAL EVIDENCE CLASSIFICATION
━━━━━━━━━━━━━━━━━━
All v1.1 Evidence Tiers A/B/C/D apply.
EXTENDED-CONTACT MODIFICATIONS
• Tier B rinse-off actives may upgrade to partial Tier A credit with:
≥15 min contact
supportive vehicle
• Tier C actives may receive minor plausibility acknowledgment only.
• Tier D sensitizers receive ENHANCED penalties due to prolonged exposure.
━━━━━━━━
TIER D EXTENDED-CONTACT PENALTY
━━━━━━━━
Mandatory:
• Safety reduction
• Allergy Risk reduction
• Formulation Honesty penalty
Rationale:
Extended exposure lowers sensitization threshold per use.
━━━━━━━━━━━━━━━━━━
LAYER 4 — MICROBIOME COMPATIBILITY
━━━━━━━━━━━━━━━━━━
Extended contact amplifies microbiome disruption risk.
SIGNIFICANT PENALTY
• Tea tree oil >2%
• High neem concentration
• Clove/thyme/oregano/cinnamon oils
• Sulfur >5%
POSITIVE/NEUTRAL MODIFIERS
• Fermented extracts
• Prebiotic fibers
• Honey
• Aloe vera
• pH 4.5–5.5
━━━━━━━━━━━━━━━━━━
LAYER 4.5 — OVER-DRYING ASSESSMENT
━━━━━━━━━━━━━━━━━━
OVER-DRYING SCIENCE
Once clay fully dries/cracks:
• moisture reversal begins
• TEWL increases
• NMF production decreases
• barrier disruption rises
━━━━━━━━
LOW RISK
━━━━━━━━
• Cream/gel masks
• Kaolin dominant
• Rhassoul
• Overnight masks
• Properly timed sheet masks
━━━━━━━━
MODERATE RISK
━━━━━━━━
• Kaolin+bentonite blends
• Dead Sea mud
• French green clay
━━━━━━━━
HIGH RISK
━━━━━━━━
• High bentonite
• Pure multani mitti
• Multani+b es an combinations
MANDATORY RULES
• High-risk clay without “remove before cracking” guidance
→ Honesty penalty + Post-Mask Stability reduction
• High-risk clay marketed for all skin types
→ misleading claim penalty
━━━━━━━━━━━━━━━━━━
LAYER 4.6 — PRESERVATION ADEQUACY
━━━━━━━━━━━━━━━━━━
All Face Wash v1.1 preservation rules apply.
ADDITIONAL FACE PACK RULES
Water-containing masks have elevated contamination risk because:
• warm humid occlusion
• repeated finger dipping
• repeated storage reuse
FLAGS
• Jar packaging → contamination modifier
• “Preservative-free” water-based mask → major safety concern
• Pre-mixed preservative-free cream/gel → major flag
ANHYDROUS EXEMPTION
Dry powder packs requiring fresh mixing:
• no shelf-stable water phase
• preservation exemption applies
LAYER 4.7 — COLORANT PENALTY RULE

Artificial/decorative colorants provide no cleansing, detoxifying, soothing, or long-term skin benefit in face masks/face packs and may increase unnecessary irritation burden.

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

Bright/color-heavy clay masks or gel masks receive stronger penalties when coloration is mainly sensory or marketing-driven.

Mineral pigments (Iron Oxides, Titanium Dioxide) receive minimal penalty unless heavily decorative.

OUTPUT RULE:
Colorants must be mentioned under:
• Concerns
• Why This Rating
• Key Structural Ingredients (if major)

Example:
“Contains decorative synthetic colorants adding unnecessary irritation burden.”

━━━━━━━━━━━━━━━━━━
LAYER 5 — CORE SCORING SYSTEM Score Range: 1.0–5.0 for each parameter

━━━━━━━━━━━━━━━━━━
━━━━━━━━
SAFETY
━━━━━━━━
Evaluates:
• Extended-contact sensitizers
• Phototoxic botanicals
• Over-drying risk
• Preservation adequacy
• Peel-off trauma
• Microbial risk
━━━━━━━━
EFFECTIVENESS
━━━━━━━━
Evaluates:
• Active delivery category
• Format delivery efficiency
• Occlusion quality
Efficiency hierarchy:
Overnight > Sheet > Cream/Gel > Clay > Peel-Off
━━━━━━━━
ALLERGY RISK
━━━━━━━━
EXTENDED CONTACT SENSITIZATION RULE
15–30 minute exposure approximates patch-test conditions.
Repeated exposure significantly increases cumulative sensitization risk.
ESSENTIAL OIL RULE
EOs used as fragrance = fragrances for sensitization purposes.
━━━━━━━━
INGREDIENT QUALITY
━━━━━━━━
Evaluates:
• Tier A/B active realism
• Vehicle compatibility
• Category C inflation
• Formulation cleanliness
• NSF retention notes where applicable
━━━━━━━━
SKIN COMPATIBILITY
━━━━━━━━
Evaluates:
• Over-drying risk
• Clay-skin matching
• Essential oil burden
• pH compatibility
━━━━━━━━
ECO IMPACT
━━━━━━━━
Evaluates:
• Packaging
• Ingredient sourcing
• Manufacturing water use
• Biodegradability
• Sheet substrate sustainability
CORE SCORE FORMULA
Core Score =
(Safety × 0.25) +
(Effectiveness × 0.20) +
(Allergy Risk × 0.15) +
(Eco Impact × 0.10) +
(Ingredient Quality × 0.15) +
(Skin Compatibility × 0.15)

━━━━━━━━━━━━━━━━━━
LAYER 6 — SPECIALIZED PERFORMANCE SCORING  Score Range: 1.0–5.0 for each parameter

━━━━━━━━━━━━━━━━━━
8 specialized dimensions.
━━━━━━━━
HYDRATION & MOISTURE SUPPORT
━━━━━━━━
High scores:
• HA/glycerin/Sodium PCA systems
• Tier 2/5/6 formats
• Proper humectant occlusion
Low scores:
• Drying clay without moisture support
• Botanical waters marketed as hydration
━━━━━━━━
2. BARRIER RECOVERY & PROTECTION
━━━━━━━━
High scores:
• Ceramide precursors
• Niacinamide
• Panthenol
• Centella
• Aloe + emollient systems
Low scores:
• Peel-off masks
• High-absorbency clay without barrier support
• Alcohol + clay combinations
━━━━━━━━
3. ACTIVE DELIVERY REALISM
━━━━━━━━
Formula:
Evidence Tier × Delivery Efficiency × Concentration Position
High:
Tier A + correct vehicle + functional concentration
Low:
• Category C hero claims
• Wrong vehicle chemistry
• Unrealistic penetration claims
MANDATORY PENALTIES
• Collagen “rebuilds dermal collagen”
• Turmeric overclaiming
• Permanent pore-tightening claims
━━━━━━━━
4. CLEANSING & PURIFICATION REALISM
━━━━━━━━
REAL MECHANISMS:
• Sebum adsorption
• Surface cleansing
• Mild exfoliation
NOT REAL:
• Bloodstream detox
• Organ detox
• Permanent pore reduction
Bloodstream detox claims → mandatory pseudoscience penalty.
━━━━━━━━
5. EXFOLIATION BALANCE
━━━━━━━━
Mechanisms:
• Physical
• Chemical
• Enzymatic
High scores:
• Balanced exfoliation
• Proper frequency guidance
Mandatory penalties:
• Daily exfoliating mask recommendations
• Stacked aggressive exfoliation
• Walnut/apricot shell particles
• False exfoliation claims
━━━━━━━━
6. SOOTHING & ANTI-INFLAMMATORY PERFORMANCE
━━━━━━━━
Tier A:
• Aloe vera
• Centella
• Colloidal oatmeal
Tier B:
• Licorice
• Turmeric
• Chamomile
• Neem
• Honey
• Green tea
Mandatory honesty penalty:
Anti-inflammatory claim without anti-inflammatory actives.
━━━━━━━━
7. POST-MASK SKIN STABILITY
━━━━━━━━
Evaluates:
• rebound dryness
• barrier recovery
• moisturizer guidance
• residual irritation
High scores:
Barrier-supportive masks with explicit post-mask care guidance.
Mandatory penalty:
“Leave until fully cracked” instructions.
━━━━━━━━
8. REPEATED-USE TOLERANCE
━━━━━━━━
Frequency realism required.
High:
• Gentle cream/sheet formats
• Proper clay frequency guidance
Mandatory penalties:
• Daily clay-mask recommendation
• Frequent peel-off recommendation
• High sensitizer burden without warnings
• Multani/bentonite daily-use claims
━━━━━━━━
Specialized Score =
Average of 8 dimension
━━━━━━━━━━━━━━━━━━
LAYER 7 — FINAL RATING FORMULA
━━━━━━━━━━━━━━━━━━
Final Rating =
AVERAGE OF CORE SCORE AND SPECIALIZED SCORE
━━━━━━━━━━━━━━━━━━
HIGH-SCORE ELIGIBILITY (>4.0)
━━━━━━━━━━━━━━━━━━
REQUIRES:
✅ Functional Category A/B actives
✅ No unsafe Tier D sensitizers
✅ Managed over-drying risk
✅ Adequate preservation
✅ No Category C inflation
✅ No detox/pore pseudoscience
✅ No unqualified phototoxic botanicals
✅ Formulation Honesty ≥3.5
✅ Usage frequency guidance
✅ Post-mask care guidance
✅ Appropriate sensitization burden
━━━━━━━━━━━━━━━━━━
LOW-SCORE TRIGGERS (<2.0)
━━━━━━━━━━━━━━━━━━
❌ High Tier D sensitizers
❌ Bloodstream detox claims
❌ Daily-use high-absorbency clay claims
❌ Frequent peel-off use claims
❌ Walnut/apricot shell exfoliants
❌ No preservation in water-based premix
❌ Unsafe phototoxic botanicals
❌ “Chemical-free” claims
━━━━━━━━━━━━━━━━━━



OUTPUT FORMAT
---
⭐ FINAL RATING X.X / 5 — Rating Level
---
⚖ STRUCTURAL QUALITY
Evidence-based classification covering: mask format mechanics, herbal active evidence tier, extended contact delivery realism, over-drying risk, preservation adequacy, sensitization risk profile at extended contact, and expected real-world outcome. Written in honest, accessible language.
---
🌿 HERBAL/ORGANIC PROFILE
Short functional description of the product type. Examples:
Evidence-Backed Clay Purifying Pack (Kaolin-Dominant, Balanced Oil Control)
Cream-Based Botanical Hydrating Mask (Category A Actives, Strong Delivery)
Gimmick-Grade Ubtan Pack (Tier C Active Inflation, Pseudoscientific Detox Claims)
Overnight Herbal Sleep Mask (High Delivery Potential, Sensitizer Risk)
Bentonite-Dominant Detox Pack (Effective Cleansing, Dry Skin Contraindicated)
Enzyme Exfoliation Face Pack (Papain-Based, Moderate Evidence, Stability Risk)
Peel-Off Botanical Mask (Mechanical Risk, Limited Active Delivery)
Fermented Herbal Sheet Mask (Postbiotic, High Hydration Delivery)
Multi-Clay Skin Type-Specific Pack (Appropriate Formulation Design)
---
📊 CORE SCORES(SHORT STRUCTURAL REASON FOR EVRY SCORE)
Safety — ⭐X.X
Effectiveness — ⭐X.X
Allergy Risk — ⭐X.X
Eco Impact — ⭐X.X
Ingredient Quality — ⭐X.X
Skin Compatibility — ⭐X.X
---
🧪 SPECIALIZED PERFORMANCE(SHORT STRUCTURAL REASON FOR EVRY SCORE)
Hydration & Moisture Support — ⭐X.X
Barrier Recovery & Protection — ⭐X.X
Active Delivery Realism — ⭐X.X
Cleansing & Purification Realism — ⭐X.X
Exfoliation Balance — ⭐X.X
Soothing & Anti-Inflammatory Performance — ⭐X.X
Post-Mask Skin Stability — ⭐X.X
Repeated-Use Tolerance — ⭐X.X
Environmental Impact Realism — ⭐X.X
---
🌱 HERBAL ACTIVE EVIDENCE ASSESSMENT
Hero herbal ingredient(s): [list with individual evidence tier A/B/C/D]
Extended contact delivery category: A / B / C for each
Herbal active inflation penalty: Applied / Not applicable
Overall herbal evidence quality: Strong / Moderate / Weak / Gimmick-grade

---
🌼 SENSITIZATION RISK ASSESSMENT (EXTENDED CONTACT)
Essential oils present: [list with position-weighted risk]
Phototoxic botanicals: None / [list with risk note]
Tier D ingredients: None / [list]
Extended contact sensitization burden: Low / Moderate / High / Very High
Recommended patch test: Yes / No
---
👍 STRENGTHS
[Evidence-based strength — with evidence tier noted]
[Evidence-based strength]
[Evidence-based strength]
---
⚠ CONCERNS
[Major structural concern — format-specific]
[Major structural concern — active delivery]
[Major structural concern — sensitization/safety]
---
🔍 THE TRUTH ABOUT THE "NATURAL" CLAIMS
[2–4 concise sentences separating verified claims from marketing mythology. Address detox claims, pore-tightening permanence, ingredient delivery realism, and any pseudoscientific language.]
---
👤 SKIN TYPE COMPATIBILITY
Dry Skin → ⭐X.X [reason]
Oily Skin → ⭐X.X [reason]
Combination Skin → ⭐X.X [reason]
Sensitive Skin → ⭐X.X [reason]
Acne-Prone Skin → ⭐X.X [reason]
Mature/Aging Skin → ⭐X.X [reason]
---
📅 USAGE FREQUENCY ASSESSMENT
Daily Use → ⭐X.X [appropriate or contraindicated]
3×/Week → ⭐X.X
1–2×/Week → ⭐X.X
Occasional Use → ⭐X.X
---
⏱ EXPECTED REAL-WORLD RESULTS
Immediate (First 1–3 Uses):
Sensory experience during application and removal; immediate skin feel post-mask; any staining, fragrance, or tightening sensation noted; what to watch for as early warning signals
Short-Term (2–6 Weeks, Consistent Use):
Cumulative cleansing or hydration effect; sensitization monitoring for essential oil-containing formulas; barrier trajectory with regular clay use; exfoliation pattern and skin texture change
Long-Term (2–6+ Months):
Cumulative barrier outcome with regular use; sensitization development risk for high-essential-oil formulas; realistic dermatological outcome vs. marketing claims; photosensitization risk if phototoxic botanicals present; any cumulative environmental impact
Realistic Dermatological Outcome:
One honest conclusion: What will this formula actually do for skin over months of weekly use, based on its format, active evidence tier, clay type, sensitization profile, and formulation honesty?
---
🔬 KEY STRUCTURAL INGREDIENTS
[List only functionally dominant ingredients with:]
Format delivery function noted
Herbal evidence tier (A/B/C/D) noted
Extended contact delivery category (A/B/C) noted
Sensitization risk noted for any risky ingredients
Clay type and function noted
Preservation system identified
---
🧠 WHY THIS RATING
3–5 concise evidence-based sentences covering:
Mask format delivery efficiency; herbal active evidence quality and realistic delivery at extended contact; clay/base system barrier impact; sensitization risk profile; formulation honesty vs. marketing claim gap; over-drying risk management; preservation adequacy; repeated-use outcome
---
📌 STRUCTURAL INSIGHT
Strengths
X (with evidence basis)
X
X
Weaknesses
X (with evidence basis)
X
X
--
STRICT OUTPUT RULES
DONT DO ANY MEDICAL CLAIMS
include harsh preservatives,colorants,fragrance in output
"Detoxifying" claims must be assessed against the documented mechanism of clay adsorption — surface-level only; any bloodstream detox claim triggers mandatory pseudoscience penalty
"Pore tightening" must be evaluated as temporary astringent effect — not structural pore size change; permanent pore reduction claim → Formulation Honesty penalty
Turmeric staining MUST be disclosed when turmeric is a dominant ingredient
Walnut/apricot/nut shell physical exfoliants MUST receive micro-tear risk penalty regardless of natural origin
Extended contact sensitizer risk MUST be scored at higher weight than rinse-off equivalent
Over-drying risk MUST be assessed for all clay-containing formulas
Post-mask guidance adequacy MUST be evaluated and scored
Usage frequency guidance appropriateness MUST be evaluated
The "extended contact advantage" for actives is real and MUST be credited — this algorithm does NOT dismiss all herbal actives as ineffective; it scores them honestly relative to their evidence and format delivery
Enzyme exfoliants (papain, bromelain) MUST receive formulation stability assessment — if denatured by the preservation system or high-heat manufacturing, credit is reduced
Sheet mask over-saturation risk (leaving on past 20 minutes, allowing the wet sheet to pull moisture back from skin) MUST be noted for sheet mask format


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
              "You are a strict herbal face pack structural evaluation engine."
          },

          {
            role: "user",

            content: prompt
          }

        ]

      });

    console.log(
      "ORGANIC FACE PACK TOKEN USAGE:",
      response.usage
    );

    return response.choices[0]
      .message.content;

  }

}

module.exports =
new OrganicEngine();