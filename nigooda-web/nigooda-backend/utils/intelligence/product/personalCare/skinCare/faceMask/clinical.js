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

        face_pack_type:
          "CLINICAL_CHEMICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "CLINICAL FACE PACK ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
FACE MASK / FACE PACK EVALUATION ALGORITHM — PATCHED V1.1
================================================================================
LAYER 0 — FOUNDATION ENGINE (STRICT)
SYSTEM OBJECTIVE
Reward face masks ONLY when clear structural usefulness is demonstrated through:
• Mask-type-appropriate occlusion behavior
• Barrier-compatible active delivery
• Realistic post-mask skin outcome
• Repeated-use tolerance calibrated to frequency
• Honest formulation design matched to mask exposure type
• Low rebound dehydration or irritation tendency
• Structural compatibility between mask type, active concentration, and skin exposure duration
Penalty is REQUIRED when formulations are driven mainly by:
• Marketing-focused "detox" or "glow" claims without structural support
• Clay over-stripping presented as purification
• Fragrance or essential oil presence amplified by occlusion enhancement
• Active inflation unsafe under occlusive penetration conditions
• Sheet mask essence designed for sensory pleasure over structural usefulness
• Sleeping mask occlusion without barrier-supportive architecture
• Peel-off masks with aggressive adhesion stripping
• Temporary brightening masking structural dehydration
• Luxury texture engineering without functional occlusion logic
• Ingredient concentrations unsafe under mask occlusion enhancement
Marketing-dominant mask structures relying on temporary sensation or cosmetic glow MUST face credibility suppression.
TRANSPARENCY PRIORITY RULE
High scores allowed ONLY when realistic mask-type structural usefulness is clearly demonstrable.
Ignore:
• "Detox" and purification marketing
• Glow, glass skin, or instant radiance claims
• Rare mineral or clay branding
• Luxury packaging and sensory texture
• Celebrity or influencer endorsement positioning
• Clinical-style claims without peer-reviewed mask-specific evidence
• Fermentation or botanical storytelling without functional evidence
Evaluate ONLY:
• Mask type structural compatibility
• Occlusion-penetration safety of active concentrations
• Realistic post-mask skin outcome
• Rebound dehydration or barrier stress risk
• Rinse-off vs leave-on exposure calibration
• Repeated-use frequency tolerance
• Honest active delivery realism
• Substrate safety (for sheet masks)
• Clay mineral safety and dehydration risk (for clay masks)
GLOBAL ENFORCEMENT RULE
• Mask type determines exposure duration and occlusion intensity — these override ingredient face-value evaluation
• Active concentrations MUST be re-evaluated under occlusion enhancement (2–10x penetration increase)
• Clay over-stripping cannot be neutralized by late-position humectants
• Fragrance in masks is amplified by occlusion — penalty amplified accordingly
• Temporary post-mask glow does NOT equal structural skin improvement
• Rebound dehydration post-clay or post-peel MUST suppress scoring
• Rinse-off exposure reduces but does NOT eliminate sensitization risk
• Sleeping mask leave-on rules approach leave-on product strictness
• Safety penalties override ALL post-mask cosmetic appearance claims
• Repeated weekly or twice-weekly use MUST be factored into cumulative exposure scoring
FOUNDATION PHILOSOPHY
The engine MUST behave like:
• An occlusion-penetration safety auditor
• A mask-type exposure realism evaluator
• A barrier rebound and dehydration risk assessor
• A structural dermatology engine calibrated to mask exposure dynamics
• A repeated weekly-use tolerance system
NOT like:
• A post-mask glow reviewer
• A sensory texture evaluator
• A marketing-claim validator
• A single-use cosmetic result scorer
Core Question: "Does this mask deliver genuine structural skin benefit under its specific occlusion type and exposure duration — or does it create a temporary cosmetic illusion while increasing rebound dehydration, barrier stress, or sensitization risk?"
---
LAYER 1 — MASK TYPE CLASSIFICATION SYSTEM
Mask type MUST be identified before any ingredient or scoring evaluation.
TYPE 1 — CLAY / KAOLIN / MUD MASKS
Occlusion behavior: Initial mild occlusion during wet phase → transitions to active dehydration as clay dries → significant TEWL increase post-removal if over-dried
Exposure duration: Typically 10–20 minutes
Key risks: Over-drying; rebound dehydration; acid mantle disruption through alkaline mineral content (many clays pH 7–9); fragrance amplification during initial wet-occlusion phase
TYPE 2 — SHEET MASKS (Cotton, Hydrogel, Bio-cellulose, Tencel)
Occlusion behavior: Moderate to high occlusion depending on substrate — bio-cellulose highest, cotton lowest
Exposure duration: Typically 15–30 minutes
Penetration enhancement: 2–5x for cotton; up to 10x for bio-cellulose
Key risks: Fragrance amplification under occlusion; active concentration unsafe under enhanced penetration; post-mask rebound dehydration
TYPE 3 — SLEEPING MASKS / OVERNIGHT MASKS
Occlusion behavior: Sustained moderate-to-high occlusion for 6–8 hours
Exposure duration: 6–8 hours continuous
Key risks: Most leave-on-like of all mask types; fragrance and essential oil exposure over 6–8 hours; milia risk on repeated use; sustained active delivery approaching leave-on safety standards
TYPE 4 — CREAM / GEL WASH-OFF MASKS
Occlusion behavior: Mild occlusion during application period
Exposure duration: 5–15 minutes typically
Key risks: Lower penetration risk; fragrance still amplified by mild occlusion; active pH and concentration still matters
TYPE 5 — PEEL-OFF MASKS
Occlusion behavior: Film-forming occlusion during drying → physical mechanical stripping on removal
Exposure duration: 20–30 minutes
Key risks: Mechanical stripping of viable keratinocytes; TEWL increase post-peel; repeated use → cumulative barrier stripping
---
LAYER 2 — OCCLUSION-PENETRATION ENHANCEMENT RULE
MANDATORY PENETRATION RECALIBRATION
Every active ingredient concentration MUST be re-evaluated through the mask type's penetration enhancement factor before scoring safety or effectiveness.
Enhancement factors by mask type:
• Clay mask (wet phase) → 1.5–2x
• Cotton sheet mask → 2–3x
• Hydrogel sheet mask → 3–4x
• Tencel sheet mask → 2–3x
• Bio-cellulose sheet mask → 5–10x
• Cream/gel wash-off → 1.2–1.5x
• Sleeping mask (6–8hr) → 3–5x sustained
• Peel-off (film phase) → 2–3x
Specific active recalibration examples:
• AHA at 5% pH 3.5 in a bio-cellulose sheet mask → effective exposure equivalent to 25–50% AHA → mandatory severe safety penalty
• Niacinamide at 10% in a sleeping mask → sustained overnight delivery → flushing/irritation risk amplification → moderate penalty
• Retinol at 0.3% in a sleeping mask → sustained 6-hour delivery → mandatory caution
• Fragrance in ANY bio-cellulose mask → maximum sensitization penalty
---
LAYER 3 — CLAY MINERAL SCIENCE & DEHYDRATION RULE
CLAY MINERAL CLASSIFICATION
• Kaolin → Mildest; natural pH approximately 6–7; lowest irritation risk; gentleness credit
• Bentonite → High swelling and adsorption; natural pH 8–10; alkaline disruption risk; moderate dehydration penalty
• French Green Clay (Illite) → High adsorption; natural pH approximately 7.5–8.5; strong dehydration potential; dehydration penalty equivalent to bentonite
• Montmorillonite → Very high adsorption; pH typically 8–10; highest dehydration and barrier disruption risk; mandatory rebound dehydration evaluation
• Rhassoul Clay → Lower adsorption; pH approximately 7–8; milder profile; minor gentleness credit vs bentonite
Clay pH correction rule: Alkaline clay masks with no pH-adjustment system → acid mantle disruption penalty. Demonstrated pH adjustment toward 5.0–6.0 receives partial offsetting credit.
CLAY REBOUND DEHYDRATION RULE
Clay masks without meaningful humectant rebalancing systems → mandatory Moisture Retention and Barrier Recovery score reduction.
Extended-contact clay masks (over 20 minutes) → additional dehydration penalty regardless of humectant presence.
---
LAYER 4 — SHEET MASK SUBSTRATE SAFETY SYSTEM
• Bio-cellulose → Highest penetration enhancement (5–10x); strictest essence evaluation; biodegradable (eco credit)
• Hydrogel → Moderate-high enhancement (3–4x); non-biodegradable typically (eco penalty)
• Tencel (Lyocell) → Plant-derived; moderate enhancement (2–3x); biodegradable (eco credit)
• Cotton → Lowest enhancement (2–3x); lowest risk amplification; eco penalty unless organic
• Microfiber / Synthetic blends → Variable enhancement; non-biodegradable (eco penalty)
---
LAYER 5 — ACTIVE CONCENTRATION OCCLUSION SAFETY
AHA/BHA IN MASKS — STRICT RECALIBRATION
• AHA above 5% in any sheet mask → mandatory over-exfoliation and safety penalty
• AHA above 2% in bio-cellulose sheet mask → mandatory penalty
• AHA in sleeping mask above 3% → mandatory penalty
• BHA above 1% in sheet masks → occlusion-enhanced penetration risk → penalty
• BHA above 0.5% in sleeping masks → sustained overnight delivery → penalty
• Retinol above 0.05% in sleeping masks → mandatory penalty
• Niacinamide generally safe even under occlusion at 2–10%; above 10% in sleeping masks → minor penalty
• L-AA above 10% in bio-cellulose mask → mandatory penalty; stable derivatives safer under occlusion
---
LAYER 6 — FRAGRANCE BURDEN CLASSIFICATION (MASK-CALIBRATED)
Fragrance in masks must now be evaluated contextually through burden classification rather than as a blanket automatic maximum penalty. However, occlusion dramatically enhances all fragrance risks regardless of burden tier.
F1 — LOW FRAGRANCE BURDEN
Examples: Low-position parfum; subtle rinse-off fragrance note in wash-off clay masks.
Mask-Specific Characteristics: Even F1 fragrance burden is amplified by mask occlusion. Risk is higher than equivalent leave-on low-burden fragrance.
Scoring Impact: Meaningful Allergy Risk and Safety modifier proportional to mask type occlusion level. Not necessarily maximum penalty, but never zero.
F2 — MODERATE FRAGRANCE BURDEN
Examples: Noticeable fragrance presence; moderate allergen profile.
Mask-Specific Characteristics: Moderate sensitization probability amplified by occlusion exposure duration.
Scoring Impact: Stronger Allergy Risk modifier; Safety modifier; especially elevated in sheet and sleeping mask formats.
F3 — HIGH FRAGRANCE BURDEN
Examples: Fragrance-forward mask system; multiple fragrance allergens; perfume-heavy sensory architecture.
Mask-Specific Characteristics: Elevated sensitization probability; fragrance-dependent mask identity.
Scoring Impact: Stronger Allergy Risk penalty; Safety penalty; Formulation Honesty reduction; Critical Alert triggered for bio-cellulose and sleeping masks.
F4 — IRRITATION-DRIVEN FRAGRANCE SYSTEM
Examples: Aggressive essential oil loading; sensitizer-heavy systems; perfume-dominant luxury mask.
Mask-Specific Characteristics: High repeated-use sensitization and irritation probability under occlusion.
Scoring Impact: Maximum Allergy Risk reduction; maximum Safety penalty; Formulation Honesty collapse; mandatory Critical Alert regardless of mask type.
MASK FRAGRANCE AMPLIFICATION FACTORS BY TYPE:
• Clay mask (wet phase) → Moderate amplification
• Cotton sheet mask → High amplification
• Bio-cellulose sheet mask → Maximum amplification — F3 and above trigger mandatory Critical Alert
• Sleeping mask → Maximum amplification (6–8hr) — treat as leave-on product standard
• Wash-off cream mask → Moderate amplification
• Peel-off mask → High amplification (trapped under film)
IMPORTANT FRAGRANCE RULES (Mask-Specific):
• Fragrance burden matters more than fragrance existence
• Occlusion dramatically amplifies all fragrance risks regardless of burden tier
• Even F1 burden carries meaningful risk in bio-cellulose and sleeping mask formats
• Essential oils are not automatically safer than synthetic fragrance
• Sensitizer stacking under any occlusion triggers compounded cumulative penalty that cannot be offset by soothing ingredients
• Rinse-off format reduces but does NOT eliminate risk for clay and wash-off masks
Cooling agents (menthol, eucalyptus) in masks → additional sensitization and irritation penalty under occlusion at all burden levels.
---
LAYER 7 — PEEL-OFF MASK MECHANICAL STRIPPING RULE
FILM-FORMER SAFETY EVALUATION
• Polyvinyl Alcohol (PVA) → Most common; moderate stripping; non-biodegradable (eco penalty)
• Polyvinylpyrrolidone (PVP) → Lighter film; gentler stripping; minor eco penalty
• Natural film-formers (gelatin, alginate, carrageenan) → Lower adhesion; gentler stripping; biodegradable (eco credit)
• Charcoal + PVA combination → No peer-reviewed evidence for skin outcomes beyond surface adsorption; aggressive adhesion; mandatory overclaiming penalty
Stripping severity rule: Strong synthetic film-former dominant systems → mandatory Barrier Recovery and Repeated-Use Tolerance score reduction.
Peel-off masks claiming "pore shrinking" → mandatory overclaiming penalty (pores do not permanently change size from mechanical stripping).
---
LAYER 8 — HUMECTANT TIERING (MASK-CALIBRATED)
Tier 1 — Surface hydration (Low depth)
Ingredients: Glycerin alone, Butylene glycol, Propylene glycol, High-MW Sodium Hyaluronate alone
Score ceiling: Hydration Support max 2.5 in clay/peel-off masks; max 3.0 in sheet/sleeping masks
Tier 2 — Extracellular hydration (Moderate depth)
Ingredients: Multi-weight Hyaluronic Acid, Glycerin + Panthenol, Beta-glucan, Trehalose, Polyglutamic acid
Score ceiling: Hydration Support max 3.5 in any mask type
Tier 3 — Intra-corneocyte hydration (High depth)
Ingredients: Urea (2–10%), Sodium PCA, Amino acid blends, Sodium lactate, Multi-NMF component systems
Score ceiling: Hydration Support up to 5.0
Sleeping mask occlusion rule: Sleeping masks benefit most from Tier 2–3 humectants sealed under extended occlusion.
---
LAYER 9 — FORMULATION pH RULE (MASK-CALIBRATED)
pH ROLE IN FACE MASK SCORING
pH must function as a contextual barrier modifier and supporting structural parameter — NOT as a dominant isolated scoring driver across all mask types.
pH must always be interpreted together with:
• Clay mineral alkalinity and buffering system
• Active ingredient pH requirements (AHA functional range)
• Occlusion-enhanced penetration implications of acidic actives
• Rinse-off vs leave-on exposure calibration
• Overall formulation coherence
UPDATED pH IMPACT BY MASK TYPE:
Clay masks:
• Natural clay pH frequently alkaline (7–10)
• Alkaline pH suppresses ceramide synthesis enzymes and shifts acid mantle
• Clay masks without pH adjustment below 6.5 → mandatory acid mantle disruption penalty
• pH 5.0–6.0 adjusted clay masks → optimal; partial offsetting credit
• Note: High pH in clay masks is a structural concern — but must be considered together with clay quality, humectant system, and application duration rather than in isolation
Sheet mask essences:
• pH 4.5–5.5 optimal
• AHA-containing essences must be evaluated for pH-acid functional honesty (AHA inactive above pH 4.5)
• Alkaline sheet mask essences → barrier enzyme suppression penalty
Sleeping masks:
• Same as leave-on moisturizer pH rules
• pH 4.5–5.5 optimal; above 7.0 → mandatory penalty
Wash-off masks:
• Somewhat lower priority given rinse-off nature
• Extreme pH (below 3.0 or above 8.0) → mandatory safety penalty
• Moderate pH deviations less critical in rinse-off context than leave-on
IMPORTANT RULE:
pH is a moderate-influence factor in face mask scoring. It modifies barrier disruption probability and active ingredient efficacy but does NOT dominate final evaluation. Active concentration safety under occlusion, fragrance burden, clay dehydration risk, and repeated-use tolerance remain more important overall.
---
LAYER 10 — MICROBIOME INTERACTION RULE
Note: Microbiome-targeted cosmetic evidence remains preliminary. Minor modifier only.
Mask-specific microbiome considerations:
• Clay masks: Strong adsorption may temporarily disrupt surface microbiome flora. Repeated weekly use without recovery period → minor cumulative microbiome stress modifier.
• Sheet masks: Essence pH and antimicrobial preservatives may affect surface microbiome during occlusion window.
• Sleeping masks: Sustained 6–8 hour occlusion → most significant microbiome interaction window.
Microbiome-supportive credits:
• Postbiotic or probiotic ingredients with Tier 1 evidence
• pH 4.5–5.5 formulations
• Gentle preservative systems (Tier C)
Application: Modifier applies only to Skin Compatibility and Long-Term Tolerance scores. Minor influence only.
---
LAYER 10.8 — HERBAL / ORGANIC VALIDATION (MASK-CALIBRATED)
This layer applies ONLY to:
• Herbal-positioned face masks
• Ayurvedic face masks and face packs
• Organic-marketed masks
• Botanical-heavy clay or cream masks
• "Natural" marketed face mask formulations
This layer evaluates:
• Herbal authenticity
• Evidence quality
• Occlusion-enhanced realism (critical — occlusion amplifies both benefits and risks of botanicals)
• Botanical inflation
• Essential oil burden (amplified under mask occlusion)
• Traditional vs clinical support
• Marketing honesty
HERBAL EVIDENCE CLASSIFICATION (Mask-Calibrated)
H1 — EVIDENCE-SUPPORTED BOTANICALS
Examples:
• Aloe Vera — soothing; barrier-compatible; useful in rinse-off masks at meaningful concentration
• Colloidal Oat — soothing; barrier-supportive; strong evidence in wash-off context
• Green Tea (EGCG) — antioxidant; anti-inflammatory; partial credit in mask context
• Centella Asiatica components — strong soothing and barrier credit in any mask format
• Licorice / Glabridin — brightening mechanism (tyrosinase); partial credit in mask context
• Fermented extracts — functional evidence; extraction quality matters
Rules:
Provide partial functional credit ONLY when:
• Reasonable concentration appears likely
• Biological plausibility exists under mask-specific occlusion and exposure duration
• Formulation architecture supports usefulness
Occlusion enhancement means even H1 botanicals must be evaluated for sensitization potential under mask contact time — not just at normal topical exposure levels.
H2 — TRADITIONAL / PARTIAL-EVIDENCE BOTANICALS
Examples:
• Turmeric (curcumin) — anti-inflammatory traditional use; limited mask-specific clinical evidence; sensitization potential at higher concentrations under occlusion
• Sandalwood — traditional calming use; limited modern evidence; sensitization caution under occlusion
• Multani Mitti (Fuller's Earth) — traditional Ayurvedic clay; similar to bentonite in dehydration profile; pH concerns apply
• Neem — partial evidence; anti-microbial traditional use; sensitization potential under occlusion requires assessment
• Papaya enzyme (Papain) — traditional exfoliant; occlusion-enhanced penetration requires concentration caution
• Rice water, Amla, Hibiscus — traditional brightening/soothing use; limited modern mask-specific evidence
Rules:
Recognize traditional use and historical cultural relevance. Do NOT allow strong clinical claims or exaggerated repair claims. Required Output Language: "Traditional supportive use with limited modern mask-specific clinical evidence."
Critical mask-specific addition: Traditional botanicals with any sensitization potential must be re-evaluated under the mask occlusion enhancement factor for their specific mask type. An ingredient with acceptable sensitization risk at normal topical use may carry higher risk under bio-cellulose or sleeping mask occlusion.
H3 — DECORATIVE / MARKETING BOTANICAL INFLATION
Examples:
• 20+ botanical extract stacking in a clay mask with no functional mechanism
• Exotic luxury botanical inflation (gold, pearl, rare orchid, Himalayan herbs) without evidence
• Proprietary herbal blend marketing without disclosed ingredient identity
Characteristics:
• Label appeal dominance
• Weak functional realism
• Marketing-driven botanical complexity often masking a basic clay or wax base
Scoring Impact:
• Formulation Honesty reduction
• Botanical Inflation flag
• Ingredient Quality reduction
• No major performance credit allowed regardless of botanical identity
GENUINE vs GIMMICK HERBAL DISTINCTION (Mask-Specific)
GENUINE HERBAL SIGNALS:
• Mild surfactant or clay architecture appropriate for skin type
• Coherent botanical strategy with mask-type mechanism (e.g., soothing botanicals in clay masks to offset dehydration)
• Realistic claims
• Reasonable simplicity
• Low fragrance burden
• Essential oil load appropriate for mask type (low in sheet/sleeping; zero preferred in bio-cellulose/sleeping)
• Balanced formulation logic
GIMMICK HERBAL SIGNALS:
• Harsh clay system hidden behind herbal marketing
• Perfume-heavy "Ayurvedic" sheet mask or sleeping mask
• Essential oil stacking in high-occlusion mask format (bio-cellulose, sleeping)
• Excessive extract inflation masking poor mask base architecture
• Fake "detox/purification/glow" herbal positioning
• Sensory-first herbal branding
BOTANICAL IRRITATION REALISM RULE (Mask-Specific Amplification)
Natural ingredients are NOT automatically safer — and under mask occlusion, sensitization risk is meaningfully amplified.
Recognize sensitization and irritation potential from:
• Peppermint oil — TRPM8 activator; under occlusion, sensitization risk amplified
• Citrus oils — contact sensitizer and photosensitizer; under occlusion, significantly amplified
• Eucalyptus oil — sensitizer; under occlusion, amplified
• Clove oil / eugenol — TRPV1 activator and sensitizer; under occlusion, amplified
• Cinnamon oil / cinnamaldehyde — potent sensitizer and irritant; mandatory penalty under any mask occlusion
• Lavender oil — sensitizer; under sleeping mask or bio-cellulose occlusion, significant risk
• Essential oil stacking under mask occlusion — compounded sensitization risk; mandatory cumulative penalty
"Natural" or "Ayurvedic" claims must NEVER override occlusion-enhanced sensitization realism.
OPTIONAL EXTRACTION QUALITY LOGIC:
Higher credibility: standardized extracts, fermented extracts, characterized actives.
Lower credibility: decorative botanical dusting, unstandardized extract inflation, ultra-low concentration herbal stacking.
OUTPUT ADDITION:
For herbal-positioned masks, automatically include evaluation of:
• Evidence quality
• Traditional support
• Occlusion-enhanced realism (mandatory for all mask formats)
• Botanical authenticity
• Essential oil burden under mask-specific occlusion amplification
• Herbal marketing honesty
• Genuine vs gimmick positioning
This section must remain evidence-based, balanced, anti-hype, anti-fear, and scientifically grounded.
---
LAYER 11 — PRESERVATIVE SAFETY (MASK-CALIBRATED)
Rinse-off masks (clay, wash-off cream, peel-off):
• MI/MCI → unacceptable even in rinse-off — mandatory penalty
• Formaldehyde releasers → unacceptable — mandatory penalty
Sheet masks:
• Occlusion enhances preservative penetration and sensitization risk
• MI/MCI in sheet mask essence → maximum penalty
• Phenoxyethanol above 0.8% under bio-cellulose occlusion → minor penalty
Sleeping masks:
• Full leave-on preservative strictness applies
PRESERVATIVE TIERS:
• Tier A (Zero Tolerance): MI, MCI, formaldehyde releasers → mandatory penalty in any mask type
• Tier B (Caution): Phenoxyethanol above 0.8% in sheet/sleeping masks → minor modifier
• Tier C (Acceptable): Ethylhexylglycerin blend, sodium benzoate + potassium sorbate, caprylyl glycol → no penalty
---
LAYER 12 — CORE FACE MASK SCORING SYSTEM (1.0 TO 5.0 STARS)
SAFETY [DOMINANT]
Evaluates:
• Occlusion-enhanced active concentration safety (Layer 2 recalibration mandatory)
• Clay mineral dehydration and rebound risk
• Peel-off mechanical stripping severity
• Fragrance burden under mask occlusion type (classified by F1–F4 system)
• AHA/BHA occlusion-safety recalibration
• Retinol occlusion-safety calibration
• Alkaline pH acid mantle disruption risk
• Repeated weekly-use cumulative exposure burden
• Preservative safety tier under occlusion
• Sleeping mask leave-on safety equivalence
• Sensitizer compounding under occlusion
Safety overrides ALL post-mask glow, texture, or cosmetic appearance claims.
EFFECTIVENESS
Core question: Does this mask genuinely deliver structural skin benefit appropriate to its mask type and exposure duration — or is the outcome primarily cosmetic illusion?
Evaluates:
• Humectant tier quality and post-mask hydration realism (Layer 8)
• Active delivery realism under occlusion enhancement
• Barrier recovery post-mask vs barrier disruption
• Clay mineral quality and appropriate adsorption function
• Honest dark spot, brightening, or anti-aging claim evaluation (evidence-tiered)
• Post-mask skin outcome realism
• Repeated-use structural benefit accumulation
ALLERGY RISK
Evaluates:
• Fragrance burden classification and occlusion type amplification factor (F1–F4 system + Layer 6)
• Essential oil presence under occlusion
• Volatile aromatic compounds
• Sensitizer stacking under mask occlusion
• Botanical sensitization burden (including herbal/organic layer evaluation)
• Preservative sensitization tier
• Repeated weekly sensitization accumulation
• Contact duration-appropriate risk calibration
High-burden fragrance under bio-cellulose occlusion → maximum allergy risk score suppression. Multiple sensitizers under any occlusion → compounded mandatory penalty.
SKIN COMPATIBILITY
Evaluates:
• Mask-type-appropriate barrier interaction
• Clay rebound dehydration tolerance
• Post-peel barrier recovery stability
• Sheet mask post-occlusion TEWL normalization behavior
• Sleeping mask extended occlusion milia risk
• Repeated weekly-use skin tolerance
• Active-layering compatibility before and after masking
ECO IMPACT
Evaluates:
• Single-use substrate environmental burden
• Substrate biodegradability tier (Layer 4 substrate classification)
• Packaging excess and plastic use
• Synthetic polymer environmental persistence
• Preservative ecotoxicity
• Ingredient biodegradability
INGREDIENT QUALITY
Evaluates:
• Structural balance appropriate for mask type
• Functional synergy between clay, actives, humectants, and barrier ingredients
• Absence of decorative inflation and botanical overclaiming (Layer 10.8)
• Active delivery concentration honesty under occlusion recalibration
• Marketing/evidence alignment
Core Score = (Safety × 0.25) + (Effectiveness × 0.20) + (Allergy Risk × 0.15) + (Eco Impact × 0.10) + (Ingredient Quality × 0.15) + (Skin Compatibility × 0.15)
---
LAYER 13 — SPECIALIZED FACE MASK PERFORMANCE
Score Range: 1.0–5.0 for each parameter
Cap rule: If Safety scores below 2.0 → Specialized Score capped at 3.0. Critical Alert ingredients → mandatory floor of 1.5 on affected specialized scores.
HYDRATION & MOISTURE SUPPORT
• Tier 1 only in clay mask → max 2.0
• Tier 2 in clay mask → max 3.0
• Tier 3 in clay mask → up to 4.0
• Tier 2–3 in sleeping mask → up to 5.0
BARRIER RECOVERY & PROTECTION
• Physiological lipid architecture → barrier repair credit
• Non-physiological occlusion balance (milia risk in sleeping masks)
• Post-clay-mask barrier recovery support
• Post-peel-off barrier disruption extent
ACTIVE DELIVERY REALISM
• Over-concentrated actives unsafe under occlusion → dual penalty: safety AND active delivery realism
• Under-concentrated actives present only for label appeal → credibility penalty
CLEANSING & PURIFICATION REALISM (Clay/Peel Masks)
• Clay mineral adsorption quality appropriate to skin type
• "Detox" claim → mandatory credibility penalty
• "Pore shrinking" claim → mandatory overclaiming penalty
• Non-clay/non-peel masks → 2.5 neutral score
EXFOLIATION BALANCE (AHA/BHA/Enzyme Masks)
• Acid type, concentration, and pH matrix under mask-specific occlusion enhancement
• Over-exfoliation risk under occlusion
• Non-exfoliating masks → 2.5 neutral score
SOOTHING & ANTI-INFLAMMATORY PERFORMANCE
• Centella asiatica components → strong credit
• Niacinamide anti-inflammatory pathway → credit
• Allantoin, panthenol, beta-glucan → functional soothing credit
• Cooling sensation claimed as soothing → penalty (menthol under occlusion → irritation amplification)
POST-MASK SKIN STABILITY
• TEWL normalization trajectory
• Rebound dehydration tendency (clay, peel-off)
• Post-occlusion sebum normalization (sleeping mask)
• Masks producing temporary post-application improvement followed by structural rebound → score suppression
REPEATED-USE TOLERANCE
• Cumulative clay dehydration arc over repeated sessions
• Cumulative barrier stripping from repeated peel-off use
• Sensitization escalation from fragrance under repeated occlusion
• Acid overexposure accumulation from weekly exfoliating masks
• Milia development tendency from weekly sleeping mask use
ENVIRONMENTAL IMPACT REALISM
• Single-use sheet mask substrate biodegradability
• Packaging waste relative to product volume
• Synthetic polymer content environmental persistence
SPECIALIZED SCORE FORMULA
Specialized Score = Average of applicable specialized parameter scores
Cap rule: Safety core score below 2.0 → Specialized Score capped at 3.0 regardless of average.
N/A parameter rule: Cleansing & Purification Realism scores 2.5 neutral for non-clay/non-peel masks. Exfoliation Balance scores 2.5 neutral for non-exfoliating masks.
---
LAYER 14 — REAL-WORLD USAGE SIMULATION
Simulate:
• Weekly or twice-weekly masking frequency
• Cumulative exposure over 4–8 weeks of regular use
• Pre-mask skin state variation
• Post-mask routine layering (toner, serum, moisturizer applied after)
• Clay mask over-application duration risk
• Sleeping mask seasonal variation
• Peel-off mask repeated mechanical stripping accumulation
• Routine active stacking on mask days (retinol + exfoliating mask on same night → compounded risk)
Core Question: "Does this mask deliver genuine cumulative structural skin benefit under realistic weekly-use conditions — or does it create temporary cosmetic illusion while increasing rebound dehydration, barrier stress, sensitization, or environmental burden?"
---
FINAL SCORE
Final Score = (Core Score + Specialized Score) / 2
All scores on 1.0–5.0 scale.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🎭 FACE MASK PROFILE

## Functional Classification

Mask type and functional profile description.

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short structural classification covering mask-specific formulation realism.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Mask-Specific Analysis

### Hydration & Moisture Support — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Barrier Recovery & Protection — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Active Delivery Realism — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cleansing & Purification Realism — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Exfoliation Balance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Soothing & Anti-Inflammatory Performance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Post-Mask Skin Stability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Repeated-Use Tolerance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Environmental Impact Realism — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 📌 STRUCTURAL INSIGHT

## Strengths

- Only structurally validated positives listed here

## Weaknesses

- Only structurally triggered concerns listed here

---

# 🚨 CRITICAL ALERTS

## Triggered Structural Risks

Display ONLY when structurally triggered. Mandatory for zero-tolerance ingredient detection, dangerous occlusion-active combinations, or extreme pH.

Remove section entirely if no critical alerts triggered.

---

# 👤 SKIN TYPE ADVISORY

## Population Compatibility

### Dry Skin

Short compatibility explanation.

### Sensitive Skin

Short compatibility explanation.

### Oily / Acne-Prone Skin

Short compatibility explanation.

### Combination Skin

Short compatibility explanation.

### Mature / Aging Skin

Short compatibility explanation.

### Barrier-Damaged Skin

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Usage Frequency Advisory

### Weekly Use

Short explanation.

### Twice-Weekly Use

Short explanation.

### Daily Use

Short explanation.

### Occasional Use

Short explanation.

### Long-Term Repeated Use

Short explanation.

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only functionally dominant or structurally influential ingredients. Note mask-type occlusion safety tier for any active. Avoid decorative extracts, trace actives, and marketing-heavy additions without structural influence.

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

Explain only the major structural reasons affecting the final rating. Explicitly flag occlusion-penetration safety failures, rebound dehydration risks, fragrance amplification concerns, clay alkalinity issues, and active overclaiming.

---

# ⚠ STRICT OUTPUT RULES

## Mandatory Evaluation Rules

- NO MEDICAL CLAIMS
- Include harsh preservatives, fragrances, and colorants in output
- Concise but structurally intelligent
- Analytical, clinical, mask-science-focused tone
- Occlusion-enhanced active safety must be evaluated — never accept label concentration at face value
- Fragrance under occlusion must trigger amplified penalty
- Clay rebound dehydration must be explicitly evaluated
- Detox or pore-shrinking claims must trigger credibility penalty
- Temporary post-mask glow must not heavily influence scoring
- Post-mask barrier stability must matter more than immediate post-application feel
- Eco impact for single-use masks must be explicitly evaluated
- Repeated-use cumulative burden must dominate over single-use tolerance
- Marketing appearance claims must be evaluated against mechanism science
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Face Mask Evaluation Algorithm — Structured for occlusion-penetration safety analysis, active delivery realism, and long-term barrier stability evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict FACE MASK structural evaluation engine."
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