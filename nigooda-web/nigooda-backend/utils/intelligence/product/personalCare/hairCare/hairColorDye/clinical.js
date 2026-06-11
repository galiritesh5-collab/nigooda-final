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
        "HAIR COLOR ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
HAIR DYE & COLOR PRODUCT EVALUATION ALGORITHM — V2.0
════════════════════════════════════════════════════════════════════
Oxidative chemistry transparency · sensitization science
Fiber damage honesty · natural colorant authenticity
STRICT BUT FAIR. SCIENTIFIC BUT PRACTICAL.
════════════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward hair dye and color products demonstrating: effective lasting
color deposit appropriate to product type · minimal oxidative and
chemical damage to hair fiber and scalp · low sensitization and
allergen burden · scalp barrier-considerate formulation design ·
physiological pH compatibility during and after processing · long-term
fiber integrity preservation · honest color performance · transparent
developer/oxidant architecture.
Mandatory penalties: PPD/PTD-dominant systems without sensitization
disclosure · ammonia-first architecture marketed as "gentle" ·
fragrance-driven "luxury color" over structural safety · decorative
botanical loading without functional color or conditioning evidence ·
unnecessarily high developer volumes · bleach/lift marketing without
structural damage disclosure · "natural color" claims using synthetic
sensitizers.
Basic color deposit alone cannot achieve high scores.
HARDNESS VS FAILURE SEPARATION RULE (NEW)
Chemical harshness in hair color is often chemistry-necessary, not
formulation failure. Alkalinity is required for cuticle penetration.
Oxidative chemistry is required for permanent color. Developer volume
causes inherent damage proportional to lift. Output language must
reflect this: "inherent damage for this color type" not "bad product."
Score within realistic expectations for each product type. A bleach
scored as failing because it damages fiber is scientifically incorrect.
The question is whether the damage is proportional and disclosed.
PRODUCT TYPE CLASSIFICATION (MANDATORY FIRST STEP)
TYPE A — PERMANENT OXIDATIVE COLOR
Permanent cream/gel/liquid · oxidative coupler chemistry (PPD, PTD,
resorcinol) · requires developer · full cuticle penetration and
cortex modification · irreversible.
TYPE B — DEMI-PERMANENT OXIDATIVE COLOR
Low-volume developer (3–6%) · partial cuticle penetration · lower
sensitization than Type A · fades gradually.
TYPE C — SEMI-PERMANENT / DIRECT DYE
No developer · direct dye deposition on fiber surface · no oxidative
chemistry · fades over washes. Fashion colors, vivid direct dyes,
color-depositing treatments.
TYPE D — TEMPORARY COLOR
Color mousse/spray/rinse · surface-only deposition · washes out 1–2
shampoos · no chemical penetration.
TYPE E — BLEACH / LIGHTENER
Powder/cream bleach, high-lift color · oxidative melanin destruction ·
highest fiber damage · requires developer (often 20–40 vol) · no color
deposit (lift only or with toner follow-up).
TYPE F — HENNA AND NATURAL COLORANTS
Pure henna (Lawsonia Inermis) · Indigo (Indigofera Tinctoria) ·
Cassia Obovata · herbal/plant-based color systems · no synthetic
oxidative chemistry · unique deposition mechanism (keratin bonding).
TYPE G — COLOR-DEPOSITING TREATMENTS
Color-depositing shampoo/conditioner · color gloss · toning mask ·
semi-permanent with conditioning vehicle.
CLASSIFICATION RULE: Type must be established before any scoring.
Scoring ceilings, chemistry expectations, sensitization benchmarks,
and damage expectations adjust entirely by product type.
TRANSPARENCY PRIORITY RULE
Ignore: Fragrance freshness · "ammonia-free" as automatic safety
credential · "natural/organic/vegan" marketing · luxury cream texture ·
before/after marketing imagery · ingredient-count inflation.
Evaluate only: Oxidative chemistry type and sensitization burden ·
developer volume and fiber damage trajectory · alkalizing agent type ·
scalp chemical exposure duration · pH compatibility · coupler/dye
intermediate sensitization profile · conditioning architecture ·
long-term fiber integrity under repeated coloring · honest color
performance.
THE AMMONIA-FREE TRAP RULE (CRITICAL)
"Ammonia-free" is one of the most abused claims in hair color
marketing. Ammonia is replaced by:
Monoethanolamine (MEA) · Ethanolamine · AMP (Aminomethyl Propanol) ·
Sodium Carbonate / Sodium Hydroxide · Alkanolamines
These must be evaluated independently. MEA and ethanolamine are
associated with protein bond disruption and may cause equal or greater
long-term fiber damage than low-dose ammonia systems. The algorithm
must never grant automatic safety credit for "ammonia-free" labeling.
RULE: "Ammonia-free" claim → mandatory alkalizing agent identification
and independent evaluation. If replacement cannot be identified or is
associated with high protein disruption, no safety bonus granted.
CONCENTRATION UNCERTAINTY RULE (NEW)
Late-position or trace conditioning agents, botanicals, or bond-
support ingredients must not trigger strong positive or negative
assumptions. Trace panthenol or minor keratin protein at late position
provides neither transformative benefit nor significant harm.
Avoid over-crediting AND over-penalizing trace ingredients. Apply
consistently across all scoring dimensions.
════════════════════════════════════════════════════════════════════
LAYER 1 — OXIDATIVE CHEMISTRY AND DYE INTERMEDIATE SYSTEM
All oxidative dye intermediates and couplers classified by
sensitization tier before scoring.
TIER 1 — HIGH SENSITIZATION RISK
p-Phenylenediamine (PPD) · p-Toluenediamine (PTD/2,5-Toluenediamine)
· p-Aminophenol · Resorcinol (high concentration) · 4-Aminophenol ·
2-Nitro-p-Phenylenediamine
Highest allergic contact dermatitis rate · documented cross-
sensitization (rubber, PABA, benzocaine, sulfonamides) · cumulative
sensitization under repeated coloring · once sensitized = permanent
avoidance required · patch test mandatory.
→ Mandatory Allergy Risk penalty · Mandatory Safety modifier ·
Cannot achieve elite Allergy Risk · Sensitization disclosure required.
TIER 2 — MODERATE SENSITIZATION RISK
m-Aminophenol · 4-Chlororesorcinol · 2-Amino-4-hydroxyethylaminoanisole
· HC Yellow No. 2 · HC Red No. 3 · Lower-concentration oxidative
intermediates.
Moderate sensitization · lower cross-sensitization than Tier 1 ·
patch test still required.
→ Moderate Allergy Risk penalty · Acceptable when Tier 1 absent.
TIER 3 — LOW SENSITIZATION RISK (OXIDATIVE)
HC Blue No. 2 · HC Violet No. 1 · Low-concentration resorcinol
(secondary coupler) · 4-Amino-2-hydroxytoluene.
Lower sensitization potential · patch test still recommended.
→ Reduced Allergy Risk penalty.
TIER 4 — DIRECT DYES (NON-OXIDATIVE)
Basic Red 51/76 · HC Yellow No. 4 · HC Orange No. 1 ·
Disperse Violet 1 · Acid Red 33/52 · Acid Blue 62 ·
Lawsone (Henna — natural direct dye)
No oxidative chemistry · generally lower sensitization ·
Henna (Lawsone) is low sensitizer unless PPD-adulterated.
→ Best Allergy Risk eligible · Maximum Safety eligible.
Note: "Black henna" (henna + PPD) = Tier 1, mandatory regardless of
natural positioning.
SYSTEM CLASSIFICATION:
Tier 1 dominant → High sensitization, mandatory disclosure
Tier 1 + Tier 3 blend → High sensitization, Tier 1 drives risk
Tier 2 dominant → Moderate sensitization
Tier 2 + Tier 3 → Moderate-Low
Tier 3/4 dominant → Low sensitization
Tier 4 direct dye only → Lowest sensitization eligible
Rules: PPD presence at any position → mandatory disclosure regardless
of concentration. Cross-sensitization history noted in output. Patch
test mandatory for all Tier 1 and Tier 2.
════════════════════════════════════════════════════════════════════
LAYER 2 — DEVELOPER / OXIDANT SYSTEM
Developer (hydrogen peroxide) volume determines: cuticle lift ·
oxidative fiber damage · scalp chemical burden · melanin destruction
· color molecule oxidation.
DEVELOPER VOLUME TABLE:
5 vol (1.5%) → Tone deposit, no lift → Minimal damage
10 vol (3%) → Deposit, 1-level lift → Low damage
20 vol (6%) → 1–2 level lift → Moderate damage
30 vol (9%) → 2–3 level lift → High damage
40 vol (12%) → 3–4 level lift → Very High damage
50+ vol (>12%) → High-lift/bleach only → Severe damage
Developer Rule: Minimum volume for intended result must be used.
Unnecessarily high volume without lift rationale → mandatory Fiber
Integrity penalty. Volume must match color goal — excess for same shade
= Formulation Honesty penalty. Home kits with fixed developer must
disclose volume.
════════════════════════════════════════════════════════════════════
LAYER 3 — ALKALIZING AGENT SYSTEM
All alkalizing agents identified and classified.
HIGH CONCERN: Sodium Hydroxide (chemical burns risk) · Calcium
Hydroxide · High-concentration Ammonium Hydroxide (>5%)
→ Mandatory Safety and Scalp Barrier penalty
MODERATE CONCERN: Monoethanolamine (MEA) · Ethanolamine · Alkanolamines
Note: MEA has lower volatility than ammonia (less fume) but may cause
equal or greater fiber protein damage under repeated use.
"Ammonia-free MEA" cannot claim safety superiority automatically.
→ Safety modifier — no automatic bonus vs ammonia
LOWER CONCERN (RELATIVE): Low-dose Ammonia (<3% formulated) ·
AMP (Aminomethyl Propanol) · Sodium Carbonate ·
Arginine (amino acid alkalizer — lower disruption evidence)
→ Moderate credit for proportional use
FUNCTIONAL NOTE: All alkalizing agents require cuticle opening —
some damage is inherent to permanent oxidative color. Scoring
evaluates proportionality and post-processing conditioning, not
elimination of alkalinity (which is impossible in Type A/B).
════════════════════════════════════════════════════════════════════
LAYER 4 — BLEACH / LIFT CHEMISTRY (TYPE E ONLY)
PERSULFATES (PRIMARY BLEACHING BOOSTERS):
Ammonium Persulfate · Potassium Persulfate · Sodium Persulfate
Documented sensitization and occupational asthma risk ·
respiratory sensitizer (powder formulation) · contact dermatitis
under repeated exposure.
→ Mandatory Allergy Risk + Safety penalty · Respiratory warning required
· Cannot achieve elite Allergy Risk scores
BLEACH FORMULATION MODIFIERS (partial credit):
Conditioning agents (Cetyl Alcohol, Panthenol, Keratin) →
reduce mechanical damage
Bond-building additives (Maleic Acid, Bis-Aminopropyl Diglycol
Dimaleate) → Fiber Integrity credit
Oil conditioning bases → moderate credit
Anti-breakage polymers → moderate credit
BLEACH STRUCTURAL CEILINGS (not penalties — realistic type limits):
Fiber Integrity → Max 2.5
Allergy Risk → Max 2.8
Safety → Max 3.0
These reflect chemistry-necessary damage, not formulation failure.
Bond-building additives may push Fiber Integrity toward 2.5 ceiling.
════════════════════════════════════════════════════════════════════
LAYER 4.5 — pH PROCESSING RULE
Processing pH Context: Oxidative color requires alkaline pH (8.5–11.5)
to function. This is chemistry-necessary, not formulation failure.
Minimum required alkalinity for the goal must be used.
Post-processing pH normalization receives credit.
PROCESSING pH SCORING:
pH 8.5–9.5 → Optimal for permanent color → neutral score
pH 9.5–10.5 → Acceptable → moderate fiber stress note
pH >10.5 → High alkaline stress → Fiber Integrity penalty
Post-processing acid rinse included → Fiber Integrity bonus
No post-processing pH normalization → Fiber Integrity penalty
Direct/temporary dye at neutral-acidic pH → Full Fiber Integrity credit
Bleach pH (9–12) is inherent and captured in structural ceiling.
════════════════════════════════════════════════════════════════════
LAYER 4.6 — HENNA AND NATURAL COLORANT RULE (TYPE F)
HERBAL COLOR AUTHENTICITY SYSTEM (NEW — CRITICAL)
Type F products require herbal evidence classification. Genuine herbal
color formulations must score fairly. Gimmick natural color marketing
must be penalized. The engine must not collapse a well-formulated
henna or indigo formula for lacking synthetic actives.
H1 — GENUINE FUNCTIONAL NATURAL COLORANTS:
Pure Lawsonia Inermis (Henna) · Indigofera Tinctoria · Cassia Obovata
· Bhringraj (Eclipta Alba — supportive) · Amla (Phyllanthus Emblica —
conditioning, mild scalp support)
These are evidence-supported botanical colorants with defined
deposition mechanisms. They are NOT decorative.
→ Full color mechanism credit for Type F · Maximum Fiber Integrity
eligible · Maximum Scalp Safety eligible (pure form)
H2 — TRADITIONAL / PARTIAL-EVIDENCE SUPPORT HERBALS IN COLOR:
Shikakai (mild saponin — conditioning vehicle) ·
Reetha (mild cleansing vehicle) · Curry Leaf · Hibiscus ·
Fenugreek (conditioning support)
These support the color vehicle architecture. Partial credit for
conditioning and scalp-support function in color formulas.
→ Partial credit for vehicle support role. Not eligible for primary
color mechanism credit.
H3 — MARKETING / DECORATIVE IN COLOR CONTEXT:
Exotic micro-extracts added to permanent color for label appeal ·
gold dust botanicals in oxidative color · trace herbal amounts in
primarily synthetic formulas marketed as "herbal color"
→ No performance credit. Formulation Honesty penalty.
GENUINE HERBAL COLOR SIGNALS:
Pure botanical colorants at functional positions · coherent color
deposition mechanism (Lawsone, Indigotin) · mild or no alkalizing
agents · absence of synthetic dye intermediates · honest color range
disclosure (limited palette) · appropriate processing instructions
GIMMICK HERBAL COLOR SIGNALS:
Tier 1/2 oxidative dye intermediates + "herbal/natural" marketing ·
PPD-containing "black henna" marketed as natural · trace botanical
extracts in primarily synthetic formula claiming "herbal color" ·
unlimited claimed color range from botanical-only formula
SCORING: A well-formulated pure henna (genuine Lawsonia Inermis at
functional concentration, pH-appropriate, honest color range claimed)
should score 3.8–4.5 for Fiber Integrity and Scalp Safety. It should
NOT be collapsed for "lacking PPD lift" or "limited color range." These
are properties of the natural colorant — not formulation failures.
PURE HENNA (Lawsonia Inermis — confirmed pure):
→ Maximum Fiber Integrity eligible
→ Maximum Scalp Safety eligible
→ Mandatory note: subsequent chemical processing incompatibility
→ Color longevity credit appropriate to type
COMPOUND / ADULTERATED HENNA:
"Black henna" (henna + PPD/metal salts) · mixed synthetic/henna hybrids
→ Reclassified Tier 1 sensitization regardless of "natural" marketing
→ Mandatory Safety and Allergy Risk penalties
METALLIC SALT RULE: Lead acetate, silver nitrate, bismuth citrate in
"progressive" color → Mandatory Safety penalty + subsequent chemical
service incompatibility warning + cannot achieve elite Safety or
Allergy Risk.
════════════════════════════════════════════════════════════════════
LAYER 4.7 — COLORANT ADDITIVE PENALTY
Artificial decorative colorants added for aesthetic "cream color"
appearance — NOT the actual hair dye — provide no function and add
sensitization burden. Red 40 · Blue 1 · Yellow 5/6 → Allergy Risk +
Ingredient Quality + Formulation Honesty penalties.
════════════════════════════════════════════════════════════════════
LAYER 4.8 — FRAGRANCE RULE (GRADUATED — REFINED)
Processing context: Oxidative color has 20–45 minutes direct scalp
contact under occlusive conditions, dramatically amplifying fragrance
sensitization risk vs brief-contact cleansers.
GRADUATED FRAGRANCE PENALTY (NEW — replaces binary rule):
LOW–MODERATE FRAGRANCE in color: Parfum in late position ·
non-photosensitizing · no declared high-concern allergens (Limonene,
Linalool, Eugenol, Geraniol)
→ Moderate Allergy Risk penalty only. Do not collapse Safety score.
HEAVY / PERFUME-DRIVEN in processing-time color:
Parfum in top-third · multiple essential oils stacked · known allergens
declared → Strong Allergy Risk penalty + Cumulative Irritation Risk
penalty. Processing time amplification applied.
COLOR PRODUCT + HEAVY FRAGRANCE (any type with scalp processing):
Fragrance masking ammonia without reducing it · strong fragrance in
Type E bleach (powder inhalation risk compounded) → Enhanced
contradiction penalty. Processing time + occlusion = maximum concern.
Photosensitizing oils → UV-exposure warning even in rinse-off post-
color treatments. Type F henna with heavy essential oil addition →
Allergy Risk penalty despite natural positioning.
════════════════════════════════════════════════════════════════════
LAYER 5 — CORE SCORING SYSTEM (1.0–5.0)
NOTE ON CORE SCORE WEIGHTING (UNIQUE TO HAIR COLOR):
Safety (0.30) and Allergy Risk (0.25) carry elevated combined weight
(0.55) vs cleansers/styling products. Hair color is the highest
sensitization-risk category in cosmetics. This weighting reflects
that reality.
SAFETY [DOMINANT: 0.30]
Oxidative chemistry burden (dye intermediate tier) · developer volume
proportionality · alkalizing agent type and concentration · scalp
chemical contact duration (processing time amplified) · sensitization
trajectory · repeated-use cumulative exposure · respiratory risk
(Type E persulfates) · pH-related scalp stress · metallic salt/
adulterant presence. PPD at any level → mandatory safety note.
EFFECTIVENESS [0.15]
Core question: Does the product deliver accurate lasting color
appropriate to its type while structurally justifying its chemistry?
Color accuracy and deposit quality · gray coverage (Type A/B) ·
longevity · lift performance · direct dye vibrancy (Type C/D) ·
henna deposition quality (Type F) · post-color conditioning
architecture. Gray coverage claims without supporting oxidative
architecture → penalized. "Vibrant" from decorative direct dye →
appropriate (not inflated) credit.
ALLERGY RISK [ELEVATED: 0.25]
Dye intermediate sensitization tier · persulfate sensitization
(Type E) · fragrance sensitizers (graduated per Layer 4.8, processing-
time amplified) · preservative sensitizers · cross-sensitization risk
profile · patch test necessity · repeated-use sensitization accumulation.
Once sensitized to PPD — life-long avoidance required. Patch test
mandatory for Tier 1/2 regardless of prior tolerance.
ECO IMPACT [0.05]
Oxidative byproduct environmental load · H₂O₂ rinse-off impact ·
persulfate environmental persistence · single-use plastic packaging ·
biodegradability of primary chemistry · synthetic dye aquatic toxicity.
Direct dye systems (Type C/F) generally better eco scores than
oxidative.
INGREDIENT QUALITY [0.10]
Dye intermediate system coherence for claimed result · developer volume
proportionality honesty · alkalizing agent selection appropriateness ·
conditioning architecture integration · functional vs decorative
botanical balance · "ammonia-free" structural honesty · bond-building
additive authenticity. Trace conditioning agents evaluated per
concentration uncertainty rule — not over-credited or over-penalized.
SKIN COMPATIBILITY [0.15]
Scalp chemical tolerance under processing · repeated-use barrier
recovery · post-color scalp dryness/flaking · sensitization
accumulation under repeat coloring · sensitive/compromised scalp risk.
Processing-time exposure > rinse-off in all scoring. Existing scalp
conditions (psoriasis, eczema, SD) noted as high risk.
CORE SCORE = (Safety×0.30) + (Effectiveness×0.15) +
(Allergy Risk×0.25) + (Eco Impact×0.05) +
(Ingredient Quality×0.10) + (Skin Compatibility×0.15)
════════════════════════════════════════════════════════════════════
LAYER 6 — SPECIALIZED COLOR PERFORMANCE (1.0–5.0)
COLOR DEPOSIT AND ACCURACY [DOMINANT EFFECTIVENESS METRIC]
Dye penetration depth · color accuracy vs claimed shade · vibrancy ·
gray/white coverage (Type A/B) · evenness · consistency.
DEPOSIT CEILINGS BY TYPE:
Type A Permanent → Eligible for 5.0
Type B Demi-permanent → Max 4.5
Type C Semi-permanent → Max 4.0
Type D Temporary → Max 3.0
Type F Henna → Max 3.5 (shade limited — this is NOT a penalty, it
is the nature of the colorant. Henna should be scored within this
realistic ceiling, not penalized for it)
Type G Depositing treatment → Max 4.0
COLOR LONGEVITY
Washes before significant fade · UV fade resistance · water/sweat fade
· thermal fade · color stability.
LONGEVITY BENCHMARKS BY TYPE:
Type A → Until new growth (permanent at shaft level)
Type B → 20–28 washes
Type C → 8–16 washes
Type D → 1–2 washes
Type F → Very long (keratin-bonded, naturally durable)
Type G → 4–8 washes
FIBER INTEGRITY [DOMINANT DAMAGE PARAMETER]
Cuticle disruption · cortex protein denaturation · disulfide bond
disruption · porosity increase trajectory · developer proportionality ·
post-processing condition · bond-building additive tier.
FIBER INTEGRITY CEILINGS BY TYPE (chemistry-necessary limits):
Type A Permanent, no conditioning architecture → Max 2.5
Type A Permanent, with bond-builder → Max 3.5
Type B Demi-permanent → Max 3.8
Type C Semi-permanent → Max 4.5
Type D Temporary → Eligible for 5.0
Type E Bleach, no conditioning → Max 1.5
Type E Bleach, with bond-builder → Max 2.5
Type F Pure Henna → Eligible for 5.0
Type G Depositing treatment → Max 4.5
These are structural ceilings reflecting product chemistry, not
penalties for poor formulation. A pure henna scoring 4.8 for Fiber
Integrity is scientifically correct — it does not disrupt the cortex.
SCALP SAFETY DURING PROCESSING
Scalp chemical contact burden (processing time × concentration) ·
alkalizing agent scalp irritation · developer oxidative stress ·
persulfate respiratory risk (Type E) · post-processing scalp condition.
Bleach applied directly to scalp → maximum Scalp Safety penalty.
On-scalp vs off-scalp technique distinction noted where relevant.
SENSITIZATION ACCUMULATION RISK [PRIMARY SAFETY TRAJECTORY]
Dye intermediate tier · repeated coloring frequency (4–8 week cycles)
· cumulative PPD/PTD exposure · cross-sensitization liability ·
patch test compliance. Distinct from single-use Allergy Risk.
Evaluates long-term repeated exposure trajectory. Frequency multiplier
applies. "Never reacted before" offers no structural protection.
POST-COLOR FIBER RECOVERY
Post-processing conditioning architecture within system · acidic post-
color rinse inclusion (pH 3.5–5.0) · bond-building agent integration ·
protein/keratin replenishment · humectant and emollient integration ·
wash-to-wash fiber condition trajectory.
Complete systems (dye + post-treatment) → integration bonus.
Bond-building must be validated Maleate chemistry, not botanical marketing.
Trace conditioning agents: concentration uncertainty rule applies —
minor benefit, not major structural claim.
CUMULATIVE DAMAGE RISK [DOMINANT PENALTY PARAMETER]
Repeated coloring cycle structural damage accumulation · developer
volume × frequency fiber load · sensitization trajectory · alkalizing
agent protein disruption under repeated exposure · combined service
stacking (bleach + color + heat) · long-term porosity, breakage, fiber
decline. Single-use feel cannot override cumulative trajectory.
FORMULATION HONESTY
"Ammonia-free = safe/gentle" without alkalizer evaluation ·
gray coverage claims without oxidative architecture · "bond-building"
without Maleate or validated chemistry · "natural/organic" with
synthetic Tier 1 intermediates · lift claims with insufficient developer
· "nourishing color" without functional conditioning integration ·
"PPD-free" with PTD without disclosure · "black henna natural"
mislabeling · H3 botanical claims in primarily synthetic formulas ·
herbal gimmick color marketing. "PPD-free" + PTD present = mandatory
Formulation Honesty penalty (PTD is structurally similar and cross-
reactive). Type F henna: honest limited color palette and processing
time claims receive positive Formulation Honesty credit.
SPECIALIZED SCORE = Average of all 8 parameters.
Dominant: Fiber Integrity · Sensitization Accumulation Risk ·
Cumulative Damage Risk · Color Deposit and Accuracy.
Type E dominant: Fiber Integrity + Scalp Safety During Processing.
Type F dominant: Color Deposit + Longevity + Fiber Integrity.
Type G dominant: Color Longevity + Post-Color Fiber Recovery.
════════════════════════════════════════════════════════════════════
LAYER 7 — FINAL RATING
Final Rating = (Core Score × 0.50) + (Specialized Score × 0.50)
HIGH SCORE ELIGIBILITY (>4.0):
Dye intermediate Tier 3 or Tier 4 (no PPD/PTD dominance) ·
Developer volume proportional to goal (minimum required) ·
Post-processing pH normalization architecture ·
Fiber Integrity ≥3.5 for product type ·
Cumulative Damage Risk ≥3.0 ·
No dominant fragrance in processing-time scalp product ·
Formulation Honesty ≥3.5 ·
Sensitization Accumulation Risk ≥3.0
Note: Type F pure henna products with clean H1 herbal architecture,
honest claims, and no synthetic dye intermediates should be eligible
for 3.8–4.5 overall scores. They should not be capped below 3.5
for "limited color range" — that is a feature, not a failure.
ABSOLUTE DISQUALIFIERS (no score above 3.5 regardless):
PPD-dominant system with no safety disclosure ·
"Black henna" PPD-adulterated marketed as natural ·
Metallic salt without incompatibility warning ·
Persulfate bleach with no respiratory safety note ·
pH >12 without structural justification ·
Ammonia-free claim with unidentified high-disruption alkalizer
presented as safety feature
════════════════════════════════════════════════════════════════════
LAYER 7.5 — REAL-WORLD SIMULATION
Simulate: Repeated coloring every 4–8 weeks for 12 months ·
root touch-up vs full-color distinction · cumulative scalp
sensitization trajectory · fiber porosity progression under repeated
oxidative processing · developer volume fiber stress accumulation ·
post-color wash fade · combined service stress (color + bleach + heat)
· scalp microbiome disruption under repeated chemical exposure.
Type F henna: simulate at longer intervals (4–8 weeks minimum) ·
keratin-bonded color durability · long-term scalp microbiome
compatibility (historically favorable).
Core question: Can the color product deliver consistent results under
repeated real-world coloring without progressive sensitization, fiber
failure, or scalp damage? Sensitization may appear after months or
years — must be reflected in scoring. "Never had a reaction" does not
reduce sensitization accumulation trajectory.
ANTI-MARKETING FILTER
Mandatory penalties: "Ammonia-free = gentle" without alkalizer
evaluation · "PPD-free" with PTD without cross-reactivity disclosure ·
"Natural/herbal color" with synthetic Tier 1/2 intermediates ·
"Bond-repairing" without Maleate chemistry · "Nourishing" permanent
color without post-processing recovery architecture · "Dermatologist
tested" without sensitization disclosure · "Safe for sensitive scalp"
with Tier 1 dye intermediates · "Black henna" natural positioning ·
H3 botanical claims in oxidative formula marketing
BIAS NEUTRALIZATION FILTER
Neutralize: Cream texture = gentle chemistry illusion ·
"Ammonia-free = automatically safer" illusion ·
"Natural/organic = zero sensitization" illusion ·
No immediate reaction = no sensitization risk illusion ·
"Salon quality = superior safety" illusion ·
PPD-free = low allergy risk illusion (PTD is cross-reactive) ·
"Vegan = lower irritation" illusion ·
Type F henna "limited = inferior" bias (limited palette is honest,
not a deficiency) · "Bright color range = better product" bias when
achieved through Tier 1 sensitizers
HERBAL COLOR SCORING BENCHMARKS:
Pure Lawsonia Inermis henna, clean ingredient list, pH-appropriate,
honest limited color range claim, no adulterants: 3.8–4.5 overall.
Indigo + Henna combination, well-formulated, honest claims: 3.5–4.3.
Cassia Obovata (neutral henna), conditioning function honest: 3.5–4.2.
"Herbal color" with PPD + trace botanical: 1.5–2.5 (scored on
actual architecture — penalized for dishonesty, not for being herbal).

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🎨 COLOR PRODUCT PROFILE

## Functional Classification

Short product classification.

Examples:
- Permanent Oxidative Color — PPD-Dominant, High Sensitization Architecture
- Demi-Permanent — Moderate Sensitization, Balanced Developer Volume
- Direct Fashion Color — Low Sensitization, Surface Deposit
- Bleach / Lightener — High Fiber Damage, Persulfate System
- Pure Henna Color — Keratin-Bonding, Minimal Sensitization
- Color-Depositing Conditioner — Conditioning Vehicle, Surface Toning
- Ammonia-Free Permanent — MEA-Based, Unverified Safety Claim

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering product type classification, dye intermediate sensitization tier, developer volume and damage proportionality, alkalizing agent system, fiber integrity architecture, post-processing recovery integration, and overall formulation safety balance.

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

## Color + Fiber + Safety Analysis

### Color Deposit & Accuracy — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Color Longevity — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Fiber Integrity — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Safety During Processing — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Sensitization Accumulation Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Post-Color Fiber Recovery — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Cumulative Damage Risk — ⭐X.X

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

# ⚠ MANDATORY SAFETY DISCLOSURES

## Required Disclosures (All Tier 1/2 Products and Type E Bleach)

- **Patch test requirement:** Yes / Not required
- **PPD/PTD cross-sensitization risk:** Yes / No
- **Persulfate respiratory risk:** Yes / No (Type E bleach only)
- **Metallic salt incompatibility:** Yes / No
- **Subsequent chemical service incompatibility:** Yes / No (Type F)
- **Recommended interval between colorings:** X weeks minimum

---

# 👤 HAIR TYPE COMPATIBILITY

## Population Compatibility

### Fine / Thin Hair — ⭐X.X

Short compatibility explanation.

### Thick / Coarse Hair — ⭐X.X

Short compatibility explanation.

### Color-Treated / Previously Colored — ⭐X.X

Short compatibility explanation.

### Chemically Processed (Relaxed, Permed) — ⭐X.X

Short compatibility explanation.

### Bleached / High-Porosity Hair — ⭐X.X

Short compatibility explanation.

### Gray / White Hair — ⭐X.X

Short compatibility explanation.

### Sensitive / Reactive Scalp — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Every 4 Weeks (Root Touch-Up) — ⭐X.X

Short explanation.

### Every 6–8 Weeks (Full Color) — ⭐X.X

Short explanation.

### Occasional / Seasonal Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate (First Application)

- Color accuracy and vibrancy
- Scalp sensation during processing
- Post-rinse fiber feel

## Medium-Term (Applications 2–4)

- Color consistency and fade behavior
- Fiber condition trajectory
- Sensitization early signals

## Long-Term (12+ Months, Repeated Coloring)

- Fiber porosity and breakage trajectory
- Sensitization accumulation status
- Scalp health under repeated chemical exposure
- Color performance stability
- Overall structural outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting dye intermediate system (sensitization tier), developer and oxidant architecture, alkalizing agent type, bond-building additives (if present), conditioning and recovery architecture, persulfates (if Type E bleach), fragrance and preservative risk, and metallic salts (if present).

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
- Product type must be classified before scoring
- Dye intermediate tier must be classified before scoring
- Developer volume must be assessed for all oxidative types
- Alkalizing agent must be identified — ammonia-free is not automatically safe
- PPD presence at any level triggers mandatory disclosure
- PTD must be disclosed as cross-reactive with PPD — PPD-free with PTD is misleading
- Black henna must be reclassified as Tier 1 regardless of natural claims
- Metallic salt presence triggers mandatory subsequent-service incompatibility warning
- Persulfate presence in bleach triggers mandatory respiratory safety note
- Processing time amplifies all safety and allergy concerns
- Repeated coloring frequency multiplies sensitization accumulation
- Post-processing pH recovery architecture must be evaluated
- Single-use feel cannot override cumulative damage trajectory
- Ammonia-free claim must trigger alkalizer identification — no automatic safety bonus
- PPD-free with PTD present = Formulation Honesty penalty
- Natural or herbal with synthetic Tier 1/2 dye intermediates = mandatory disclosure
- Bond-building claims require validated chemistry
- Patch test recommendation is mandatory for all Tier 1/2 products
- Fiber integrity ceilings by product type are hard limits
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hair Color / Dye Evaluation Algorithm — Structured for oxidative chemistry transparency, sensitization science assessment, fiber damage honesty, and long-term repeated-use safety evaluation. All scoring is structural and evidence-informed.

---
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
              "You are a strict hair color formulation structural evaluation engine."
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