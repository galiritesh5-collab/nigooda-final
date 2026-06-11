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

        haircare_type:
          "CLINICAL",

        ingredients,

        analysis,

      };

    }

    catch (error) {

      console.error(
        "HAIR STYLING ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
ALGORITHM 3 — HAIR STYLING PRODUCT EVALUATION ENGINE V2.0
════════════════════════════════════════════════════════════════════
LAYER 0 — SYSTEM OBJECTIVE
Reward styling products demonstrating: functional hold, texture, or
finish appropriate to product type · scalp and hair fiber compatibility
under repeated use · minimal residue accumulation and clean wash-out ·
barrier-considerate design (scalp-contact products) · physiological
pH compatibility · low cumulative irritation · long-term fiber
integrity · honest styling performance.
Mandatory penalties: fragrance-driven "premium/salon" positioning ·
decorative botanical loading · alcohol-dominant drying architecture as
"lightweight" · polymer overloading without plasticizer balance · hold
inflation through barrier-stripping agents · hygroscopic failure when
anti-frizz or hold is claimed (not when texture-only is intended) ·
marketing-driven sensory engineering over structural delivery.
Basic hold alone cannot achieve high scores.
PRODUCT TYPE CLASSIFICATION (MANDATORY FIRST STEP):
TYPE A — HOLD-DOMINANT: Gel · Wax/Pomade · Clay · Paste ·
Sculpting Cream · Strong-Hold Mousse
TYPE B — FINISH/TEXTURE: Serum (styling) · Hair Oil (styling) ·
Shine Spray · Anti-Frizz Serum · Smoothing Cream · Glossing Treatment
TYPE C — FLEXIBLE/LIGHTWEIGHT HOLD: Light-Hold Mousse · Volumizing
Spray · Texturizing Spray · Sea Salt Spray · Hair Mist ·
Curl Enhancing Cream/Gel
TYPE D — HEAT PROTECTION: Heat Protectant Spray · Thermal Shield
Cream · Blow-Dry Primer · Hot Tool Prep Serum
TYPE E — SCALP-CONTACT STYLING: Root Lift Spray · Scalp Volumizer ·
Hair Thickening Tonic · Dry Shampoo
Products may have dual classification. Type must be established before
any scoring begins.
OCCASIONAL-USE CONTEXT RULE: Products designed for occasional/event
use (heavy pomades, strong wax, sculpting paste) not evaluated under
daily-use assumptions. Simulate at realistic low frequency.
Cumulative Irritation Risk reduced accordingly.
SEA SALT / HYGROSCOPIC TEXTURE RULE: Sea salt sprays and glycerin-
dominant texture sprays intentionally delivering "lived-in" or wave
texture — NOT claiming anti-frizz or humidity control — are NOT
penalized for hygroscopic behavior. Humidity resistance penalty applies
only when the product explicitly claims frizz control or hold
stability under humidity.
LAYER 1 — POLYMER AND HOLD ARCHITECTURE SYSTEM
All polymers/film-formers classified before scoring.
TIER 1 — BRITTLE / HIGH-FLAKE RISK
PVP (as dominant hold polymer) · PVP/VA Copolymer (high conc.) ·
Shellac (high load) · Older acrylate homopolymers
Strong hold · High flaking · Poor flexibility · Fiber stress
→ Flaking Risk penalty · Wash-Out penalty · Fiber Integrity ceiling
reduction. Note: Appropriate for occasional strong-hold on coarse/
short hair. Penalize flaking and fiber stress — not strong hold itself.
TIER 2 — MODERATE / MIXED PERFORMANCE
Acrylates Copolymer · Polyquaternium-4/-10 · PVP/VA (blended) ·
VP/Dimethylaminoethylmethacrylate Copolymer
Moderate hold · Some conditioning · Intermediate flaking
→ Moderate Flaking Risk · Blend-dependent performance
TIER 3 — FLEXIBLE / FIBER-FRIENDLY
Acrylates/Hydroxyesters Acrylates Copolymer · Polyurethane-14 ·
Polyurethane-35 · Hydroxypropyl Guar (flexible) · Carbomer-based gels
(water-activated) · PEG/PPG-25/25 Dimethicone
Flexible hold · Good fiber compatibility · Easier wash-out
→ Eligible for strong Fiber Integrity · Low Flaking Risk
TIER 4 — CONDITIONING / MINIMAL HOLD
Low-MW Hydrolyzed Proteins · Hydroxypropyl Cellulose · Pectin /
Flaxseed Extract · Castor Oil (soft hold) · Beeswax / Candelilla Wax
(mechanical hold) · Cetyl/Stearyl Alcohol · Shea/Mango Butter
Minimal flexible hold · High conditioning · Easy wash-out
→ Maximum Fiber Integrity eligible · Cannot claim strong hold
DECORATIVE INGREDIENT NUANCE IN STYLING CONTEXT:
SUPPORTIVE: Panthenol · Low-MW hydrolyzed proteins · Glycerin ·
Polyquaternium-10/-7 → Minor but real function, partial credit.
DECORATIVE: Biotin · High-MW Collagen · Vitamin C in styling context
→ No efficacy credit. Marketing use triggers penalty.
SYSTEM CLASSIFICATION:
Tier 1 dominant → Strong hold, high flake/damage
Tier 1+Tier 3 → Strong hold, reduced flake
Tier 2 dominant → Moderate hold, moderate risk
Tier 2+Tier 3/4 → Moderate hold, lower risk
Tier 3/4 dominant → Flexible/light hold, low damage
Tier 4 dominant → Conditioning-dominant, minimal hold
LAYER 2 — ALCOHOL ARCHITECTURE RULE
DRYING ALCOHOLS (leave-on amplification applies):
Denatured Alcohol (SD Alcohol, Alcohol Denat.) · Ethanol ·
Isopropyl Alcohol · Propanol
Apply Universal Rule 8 graduated penalty:
>30% daily leave-on → Mandatory Safety + Fiber Integrity penalty
20–30% daily leave-on → Significant penalty
10–20% daily leave-on → Moderate concern
5–10% daily leave-on → Mild concern
<5% leave-on → Minor note
Occasional-use → Reduce one tier
Rinse-out styling → Reduce significantly
Heat protectants → Reduce if functional not structural vehicle
FATTY ALCOHOLS (NEVER PENALIZED): Cetyl · Stearyl · Cetearyl ·
Behenyl → Emollient, conditioning, structural emulsifier. No drying
penalty under any conditions.
OUTPUT RULE: "Alcohol-free" claims must mean drying-alcohol-free.
Fatty alcohol presence never counted as drying alcohol penalty.
LAYER 3 — pH RULE
Physiological hair/scalp pH: 4.5–5.5. Cuticle sealing: 4.5–6.0.
4.5–6.0 → Cuticle + Barrier bonus
6.0–6.5 → Acceptable
6.5–7.5 → Mild penalty
7.5–9.0 → Moderate penalty
>9.0 → Significant, elite scores disqualified
Unknown → No bonus, minor credibility reduction
pH penalties amplified for leave-on products and color-treated hair.
LAYER 4 — HEAT PROTECTION ACTIVE CLASSIFICATION (TYPE D)
CATEGORY A — VALIDATED THERMAL PROTECTION (FULL CREDIT):
Amodimethicone · Dimethicone (thermal film) · Cyclomethicone /
Cyclopentasiloxane (volatile carrier) · Polyquaternium-68 ·
Cetrimonium Chloride (film-forming cuticle protection) ·
Bis-Aminopropyl Diglycol Dimaleate (bond-building protection)
CATEGORY B — PARTIAL THERMAL SUPPORT:
Panthenol (limited thermal, humectant primary) ·
Hydrolyzed Proteins (surface coating) ·
Argan Oil (antioxidant thermal support, limited) ·
Plant Ceramides (limited substantivity under heat)
→ Partial credit — not purely decorative in thermal context.
CATEGORY C — DECORATIVE (NO HEAT CREDIT):
Generic antioxidant botanicals · "Strengthening" extracts ·
Fragrance positioned as "heat protection" · Collagen/HA in heat
protectant
→ No thermal credit. Marketing use → Formulation Honesty penalty.
THERMAL CEILING: No Category A active → Max Heat Protection 2.0.
LAYER 4.5 — SILICONE EVALUATION
Apply Universal Rule 3. WATER-SOLUBLE: PEG-modified dimethicones ·
Cyclomethicone (volatile) → minimal concern.
INSOLUBLE/BUILDUP: Dimethicone (HMW) · Amodimethicone ·
Phenyl Trimethicone → functional vs masking evaluation required.
Functional (damaged hair friction reduction) → Fiber Integrity bonus.
Masking (heavy alcohol architecture + "nourishing" claim) → penalty.
D5/D6 → Eco flag mandatory.
LAYER 4.6 — COLORANT PENALTY: Same as Shampoo. Amplified for scalp-
contact Type E products.
LAYER 4.7 — FRAGRANCE RULE
Apply Universal Rule 4 graduated penalties. Leave-on amplification
for all styling products. Scalp-contact (Type E) + heavy fragrance
+ drying alcohol → maximum concern (solvent amplifies penetration).
Photosensitizing oils → UV-exposure warning regardless of load.
LAYER 4.8 — HERBAL VALIDATION
Apply Universal Rule 6. 🌿 block required for herbal-positioned
products. Genuine herbal styling products (mild polymer or wax
architecture + H1 botanicals + low fragrance) scored fairly.
Gimmick (Tier 1 polymer + herbal marketing + essential oil overload)
→ Formulation Honesty penalty + no herbal credit.
LAYER 5 — CORE SCORING (1.0–5.0)
SAFETY [0.25]: Drying alcohol load (graduated) · irritant/sensitizer
concentration · scalp barrier disruption (Type E amplified) ·
repeated-use burden · pH stress · preservative sensitization ·
cumulative load. Occasional-use products at appropriate frequency.
EFFECTIVENESS [0.20]: Polymer tier appropriateness · finish quality ·
heat protection actives (Type D) · humidity resistance · product-type-
appropriate performance · honesty vs claim. Hold through drying agents
not polymers → partial penalty. Supportive ingredients (panthenol,
proteins) credited appropriately.
ALLERGY RISK [0.15]: Fragrance (graduated, leave-on amplified) ·
essential oil sensitizers · photosensitizing oils (UV penalty added) ·
preservative sensitizers · repeated daily styling exposure.
ECO IMPACT [0.10]: Polymer persistence (PVP, acrylates noted) ·
aerosol propellant impact · D5/D6 flagged · biodegradability.
INGREDIENT QUALITY [0.15]: Polymer coherence for claimed hold ·
alcohol type accuracy (drying vs fatty — never conflated) · active
honesty · functional synergy · decorative inflation absence per
Universal Rule 5.
SKIN COMPATIBILITY [0.15]: Scalp-contact tolerance (Type E) · fiber
compatibility under repeated use · comedogenicity of heavy waxes/
butters on scalp · microbiome stability. Occasional-use context applied.
CORE SCORE = (Safety×0.25) + (Effectiveness×0.20) +
(Allergy Risk×0.15) + (Eco Impact×0.10) +
(Ingredient Quality×0.15) + (Skin Compatibility×0.15)
LAYER 6 — SPECIALIZED STYLING PERFORMANCE (1.0–5.0)
HOLD PERFORMANCE [TYPE A/C DOMINANT]:
Polymer appropriateness for claimed hold · flexibility/stiffness ratio
· hold duration · humidity resistance · re-workability if claimed.
Hold Level: Strong/Max → Tier 1 or Tier 1+2 needed ·
Medium → Tier 2 or Tier 2+3 · Light/Flexible → Tier 3 dominant ·
No hold (finish only) → Tier 4 or film-free.
Stiffness ≠ hold quality (brittle = penalty, not strength).
FIBER INTEGRITY [DOMINANT PENALTY]:
Fiber surface disruption · cuticle lifting · drying alcohol porosity
increase · repeated heat + chemical stress amplification · brittleness.
CEILINGS:
Drying alcohol >30% daily leave-on → Max 1.8
Drying alcohol 15–30% daily leave-on → Max 2.5
Drying alcohol 10–15% daily leave-on → Max 3.2
Drying alcohol <10% daily leave-on → Max 3.8
Fatty alcohol + conditioning dominant → Max 4.5
Conditioning Tier 3/4 + pH 4.5–6.0 → Eligible for 5.0
High pH >7.5 any vehicle → Hard ceiling 2.5
Occasional-use context: ceiling increases one tier.
Functional silicone (damaged hair): eligible for Fiber Integrity bonus.
FLAKING AND RESIDUE RISK:
Polymer flake tendency · buildup accumulation · wash-out ease ·
silicone buildup · wax/heavy oil trajectory · visible residue.
Brittle Tier 1 dominant → mandatory Flaking Risk penalty.
Insoluble silicone stacking → Buildup Risk notation.
HEAT PROTECTION EFFICACY [TYPE D DOMINANT]:
CEILINGS:
No Category A → Max 2.0 · 1 Category A basic → Max 3.5 ·
1–2 Category A optimized → Max 4.5 ·
Full thermal architecture → Eligible for 5.0 ·
Category C only → Max 1.5
HUMIDITY RESISTANCE:
Hygroscopic stability · frizz re-emergence · hold collapse ·
anti-humectant presence · hydrophobic film-forming.
Humidity failure penalty ONLY when anti-frizz or humidity control
is explicitly claimed. Sea salt/texture sprays not penalized for
hygroscopicity without such claims.
WASH-OUT BEHAVIOR:
Ease of removal with mild shampoo · silicone sulfate-free compatibility
· wax/oil buildup removal · polymer residue clearance · scalp pore risk.
Water-soluble polymer systems → maximum Wash-Out.
Insoluble silicone dominant → reduced score.
SCALP COMPATIBILITY [TYPE E DOMINANT]:
Scalp barrier disruption · comedogenicity (waxes, oils, butters) ·
microbiome stability · post-application itch/flaking ·
dry shampoo starch accumulation / follicular occlusion.
Scalp-contact drying alcohol → amplified penalty vs non-scalp.
CUMULATIVE IRRITATION RISK [DOMINANT PENALTY]:
Repeated drying alcohol (graduated by concentration) · fragrance
(graduated by severity) · preservative sensitization · Type E chemical
scalp burden · daily styling frequency amplification.
FORMULATION HONESTY:
Hold level vs polymer architecture · "natural/organic" hold with
synthetic polymer dominance · heat protection without Category A actives
· "repair/strengthen" without bond chemistry · "alcohol-free" using
fatty alcohol technicality · humidity control without hydrophobic
architecture · "lightweight" with heavy polymer/silicone loading ·
herbal gimmick positioning.
SPECIALIZED SCORE = Average of relevant parameters (mark N/A for
type-inappropriate metrics).
TYPE A/C: Hold Performance dominant
TYPE D: Heat Protection Efficacy dominant
TYPE B: Fiber Integrity and Wash-Out dominant
TYPE E: Scalp Compatibility dominant
Universal dominants: Fiber Integrity · Cumulative Irritation Risk ·
Formulation Honesty
LAYER 7 — FINAL RATING
Final Rating = (Core Score × 0.50) + (Specialized Score × 0.50)
HIGH SCORE ELIGIBILITY (>4.0):
Polymer architecture appropriate to claimed hold ·
Drying alcohol <15% daily leave-on · pH ≤7.5 (preferably 4.5–6.5) ·
Fiber Integrity ≥3.5 · Cumulative Irritation Risk ≥3.0 ·
No decorative marketing for functional claims · No dominant fragrance
daily leave-on · Formulation Honesty ≥3.5 ·
No hold inflation through drying agents alone
DISQUALIFIERS: Drying alcohol >30% daily leave-on · Heat claim with
zero Category A actives · High pH >9.0 · Heavy daily leave-on fragrance
· Hold claim with zero polymer architecture
LAYER 7.5 — REAL-WORLD SIMULATION
Daily/twice-daily styling · leave-on duration · repeated fiber alcohol
exposure · polymer/silicone buildup trajectory · cuticle/fiber porosity
changes · wash-out compatibility · scalp pore-clogging · heat tool
interaction. Occasional-use products at realistic low frequency.
Core question: Can product remain functional and tolerable under long-
term real-world use at realistic frequency without progressive fiber
or scalp damage?
OILS

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 💇 STYLING PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Strong-Hold Gel — Brittle Polymer Architecture
- Flexible Lightweight Hold Mousse — Conditioning Film-Former
- Heat Protectant — Validated Thermal Architecture
- Frizz Serum — Heavy Insoluble Silicone Dominant
- Natural Wax Pomade — Conditioning Tier 4
- Anti-Frizz Cream — Balanced Humectant + Film-Former
- Sea Salt Texture Spray — Hygroscopic, No Hold Polymer

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering product type classification, polymer and hold architecture, fiber friendliness, alcohol type and load, pH compatibility, long-term fiber and scalp behavior, and overall formulation balance.

---

# 📊 CORE SCORES

## Fundamental Performance Analysis

### Safety — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Effectiveness — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Allergy Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Eco Impact — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Ingredient Quality — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Skin Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

---

# 🧪 SPECIALIZED PERFORMANCE

## Hold + Fiber Integrity Analysis

### Hold Performance — ⭐X.X / N/A

Short structural reason in plain language explaining why it scored this way.

### Fiber Integrity — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Flaking & Residue Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Heat Protection Efficacy — ⭐X.X / N/A

Short structural reason in plain language explaining why it scored this way.

### Humidity Resistance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Wash-Out Behavior — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Compatibility — ⭐X.X / N/A

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

# 👤 HAIR TYPE COMPATIBILITY

## Population Compatibility

### Fine / Thin Hair — ⭐X.X

Short compatibility explanation.

### Thick / Coarse Hair — ⭐X.X

Short compatibility explanation.

### Curly / Wavy Hair — ⭐X.X

Short compatibility explanation.

### Color-Treated Hair — ⭐X.X

Short compatibility explanation.

### Chemically Processed Hair — ⭐X.X

Short compatibility explanation.

### Dry / Damaged Hair — ⭐X.X

Short compatibility explanation.

### Oily Scalp Hair — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Daily Use — ⭐X.X

Short explanation.

### Twice Daily Use — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (First Use)

- Application feel
- Hold and finish delivery
- Drying time and stiffness
- Initial scalp or fiber reaction signals

## Medium-Term (Weeks 2–4)

- Buildup accumulation
- Fiber dryness or brittleness trajectory
- Scalp tolerance
- Hold performance consistency

## Long-Term (Month 2+)

- Fiber porosity trajectory
- Buildup and wash-out behavior
- Scalp health under regular use
- Overall fiber integrity outcome
- Formulation claim reality check

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting hold and polymer system, fiber surface behavior, alcohol type and load, silicone classification, thermal protection (if applicable), irritation risk, wash-out behavior, and fragrance and preservative risk.

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
- Mention harsh colorants, preservatives, and fragrances in output
- Product type must be classified before scoring
- Polymer and hold architecture tier must be classified before scoring
- Alcohol type (drying vs fatty) must be distinguished — never penalize fatty alcohols
- pH compatibility must be assessed for all formulations
- Heat protection actives must be classified before Effectiveness scoring
- Leave-on amplification = fragrance, irritant, and alcohol penalties are higher than rinse-off
- Repeated-use behavior > single-use feel
- Long-term fiber outcome > immediate cosmetic feel
- Post-use brittleness or flaking = structural failure signal
- Stiffness ≠ hold quality
- Fragrance freshness ≠ styling product quality
- Natural ingredients ≠ effective hold
- Fast-drying alcohol ≠ better formulation
- High-shine ≠ fiber health
- Alcohol-free claim must specify drying-alcohol-free to be credited
- Silicone solubility must be noted for wash-out and buildup scoring
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hair Styling Product Evaluation Algorithm — Structured for polymer integrity analysis, fiber science realism, and honest hold delivery evaluation. All scoring is structural and evidence-informed.
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
              "You are a strict hair styling product structural evaluation engine."
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