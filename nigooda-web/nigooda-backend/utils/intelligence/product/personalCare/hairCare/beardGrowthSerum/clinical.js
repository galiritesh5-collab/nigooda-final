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
        "CLINICAL ENGINE ERROR:",
        error.message
      );

      throw error;

    }

  }

  async generateAnalysis(
    ingredients
  ) {

    const prompt = `
beard growth serum
BEARD GROWTH SERUM EVALUATION ALGORITHM — V2.0
════════════════════════════════════════════════════════════════════
Evidence-based follicle science · honest growth claims
Barrier safety · authentic botanical validation
STRICT BUT FAIR. SCIENTIFIC BUT PRACTICAL.
════════════════════════════════════════════════════════════════════
LAYER 0 — FOUNDATION ENGINE
SYSTEM OBJECTIVE
Reward beard growth serums demonstrating: evidence-based active
ingredient architecture targeting follicle stimulation · scalp/skin
barrier compatibility under repeated dermal application · DHT
modulation or circulation support with documented mechanisms ·
physiological pH compatibility for leave-on dermal use · long-term
microbiome and skin compatibility · realistic delivery system
supporting active penetration · low cumulative irritation under daily
application.
Mandatory penalties: essential oil-first "growth" architecture with no
follicle-active mechanism · fragrance-driven "masculine" masking of
inactive formulations · decorative botanical loading without
bioavailability · cosmetic actives marketed as pharmaceutical-grade
growth inducers · delivery system inflation · anecdotal ingredient
stacking without mechanism support.
Basic moisturization alone cannot achieve high scores.
HARDNESS VS FAILURE SEPARATION RULE (NEW)
High alcohol concentration in beard growth serums often serves as a
functional delivery vehicle for follicle-reaching actives — it is not
automatically a formulation failure. A minoxidil-based hydroalcoholic
serum with appropriate emollient support may have 40–60% ethanol as
a necessary delivery vehicle. This must be evaluated in context, not
penalized as if it were an unnecessary drying agent in a styling
product. Output language: "high alcohol for active delivery — barrier
support adequacy is the key evaluation point" not "bad serum due to
alcohol content."
CONCENTRATION UNCERTAINTY RULE (NEW)
Late-position or trace ingredients must not trigger strong positive or
negative assumptions. Minor botanical extracts, trace zinc derivatives,
or late-position panthenol provide neither transformative benefit nor
significant harm at trace concentrations. Avoid over-crediting AND
over-penalizing. Apply consistently across all scoring dimensions.
Rosemary Oil and Peppermint Oil receive efficacy credit ONLY when at
or near studied concentrations (Rosemary ~0.1–1%, Peppermint ~3%) —
not when present at trace fragrance levels.
TRANSPARENCY PRIORITY RULE
Ignore: Branding/luxury positioning · "natural/organic" growth marketing
· trend-driven active loading (collagen, biotin topically) ·
ingredient-count inflation · masculine fragrance perception ·
before/after marketing imagery.
Evaluate only: Active ingredient mechanism validity · delivery system
penetration efficiency · scalp/follicle safety under repeated use ·
pH compatibility for leave-on dermal use · cumulative irritation risk ·
long-term scalp microbiome stability · structural formulation honesty.
LEAVE-ON CONTEXT RULE
Beard growth serums are leave-on with extended skin contact. This
enables meaningful active delivery but also increases cumulative
irritation and sensitization risk. Both dimensions must be weighted
accordingly — the advantage (penetration) and the burden (irritation).
LEAVE-ON ACTIVE CLASSIFICATION:
FULL CREDIT (functional mechanism at studied concentration):
Minoxidil (pharmaceutical — flag regulatory status) · Redensyl ·
Capixyl (acetyl tetrapeptide-3 + red clover extract) · Procapil
(biotinoyl tripeptide-1 + apigenin + oleanolic acid) · QRCode ·
Caffeine at ≥0.2% (adenosine receptor modulation) ·
Saw Palmetto extract (standardized liposterolic — 5α-reductase evidence)
PARTIAL CREDIT (emerging or context-dependent evidence):
Adenosine · Rosemary Oil at studied concentration (~0.1–1%) ·
Peppermint Oil at studied concentration (~3%) · Niacinamide ·
Zinc PCA / Zinc Gluconate · Biotin (only in diagnosed deficiency
context — not as general growth driver)
Note: Rosemary Oil and Peppermint Oil have legitimate emerging
evidence for follicle support at studied concentrations. They are
NOT purely decorative at functional amounts. They receive partial
credit — NOT full credit like Redensyl or Capixyl, but NOT zero
credit either. Penalizing them as completely decorative is
scientifically inaccurate.
DECORATIVE / MINIMAL CREDIT:
Topical Collagen (no follicle mechanism) · Topical Keratin (no
follicle mechanism) · Hyaluronic Acid (hydration only) ·
Generic plant extracts without documented follicle mechanism ·
Fragrance-concentration essential oils (non-studied amounts) ·
Biotin as primary growth claim driver (topical evidence insufficient
for this positioning)
Castor Oil: conditioning, limited growth evidence — partial credit
for conditioning support only, not follicle stimulation.
════════════════════════════════════════════════════════════════════
LAYER 1 — ACTIVE INGREDIENT TIER SYSTEM
All actives classified by mechanism tier before scoring.
TIER 1 — PHARMACEUTICAL / HIGH EVIDENCE
Minoxidil (2%, 5%) · Pharmaceutical-grade peptide complexes (clinical
studies with follicle endpoint)
Documented follicle vasodilation / potassium channel opening ·
clinical trial evidence in androgenetic patterns · regulatory approved
in some jurisdictions. → Maximum Follicle Stimulation credit ·
Regulatory compliance must be noted separately.
TIER 2 — HIGH COSMETIC / EVIDENCE-SUPPORTED
Redensyl (dihydroquercetin-glucoside + EGCG) ·
Capixyl (acetyl tetrapeptide-3 + red clover) ·
Procapil (biotinoyl tripeptide-1 + apigenin + oleanolic acid) ·
Caffeine at ≥0.2% · Saw Palmetto (standardized)
Published in-vitro/in-vivo studies · documented follicle stem cell or
DHT pathway activity · cosmetic regulatory status.
→ Strong Follicle Stimulation credit ·
High Formulation Honesty when correctly positioned.
TIER 3 — MODERATE / SUPPORTIVE EVIDENCE
Adenosine · Rosemary Oil at studied concentration (0.1–1%) ·
Peppermint Oil at studied concentration (~3%) · Niacinamide ·
Zinc PCA / Zinc Gluconate · QRCode · Trifolium Pratense isoflavones
Limited but emerging evidence · mechanism exists but efficacy is
concentration and context-dependent · supportive rather than primary.
→ Partial Follicle Stimulation credit ·
Barrier and microbiome support credit.
Eligible for strong synergy when paired with Tier 1–2.
TIER 4 — WEAK / CONDITIONING / DECORATIVE
Topical Biotin (without deficiency context) · Topical Collagen ·
Topical Keratin · Hyaluronic Acid (hydration only) ·
Generic plant extracts without mechanism ·
Essential oils at fragrance concentrations (non-studied amounts)
No meaningful follicle mechanism · conditioning or sensory function.
→ No Follicle Stimulation credit.
Marketing-heavy usage → Ingredient Quality + Formulation Honesty
penalty.
Note: Rosemary Oil and Peppermint Oil at fragrance-level (trace)
concentrations = Tier 4. At studied concentrations = Tier 3. This
distinction is critical — the same ingredient can be Tier 3 or Tier 4
depending on concentration. Apply concentration uncertainty rule.
ACTIVE SYSTEM CLASSIFICATION:
Tier 1 dominant → Maximum efficacy ceiling
Tier 1 + Tier 2/3 → High efficacy, synergy potential
Tier 2 dominant → Good efficacy, cosmetic ceiling
Tier 2 + Tier 3 → Moderate-Good
Tier 3 dominant → Moderate
Tier 4 dominant → Low / Decorative
Tier 4 stacking cannot simulate Tier 2 efficacy.
FOLLICLE STIMULATION CEILINGS BY TIER:
Tier 4 dominant → Max 1.5
Tier 3 dominant → Max 2.5
Tier 2 dominant → Max 3.8
Tier 1 present → Eligible for 5.0
════════════════════════════════════════════════════════════════════
LAYER 2 — DELIVERY SYSTEM EFFICIENCY
Active delivery architecture evaluated before Effectiveness scoring.
Beard follicles are located in dermis (~2–4mm depth). Topical actives
must penetrate stratum corneum and epidermis.
HIGH PENETRATION:
Hydroalcoholic base (ethanol + water, ~40–70% ethanol) ·
Liposomal encapsulation · Nanoparticle carriers ·
Minoxidil-optimized propylene glycol base
Note: High alcohol content here is a FUNCTIONAL DELIVERY VEHICLE,
not a drying-agent problem. Evaluate emollient balance to assess
whether barrier is supported, not whether alcohol is present.
MODERATE PENETRATION:
Water-based serum with penetration enhancers (propylene glycol,
butylene glycol) · Light emulsion with penetration enhancers
LOW PENETRATION:
Oil-dominant base without penetration enhancers ·
Heavy occlusives as primary vehicle ·
Aqueous base without enhancers
VERY LOW / SURFACE ONLY:
Pure conditioning oils (argan, jojoba, castor) without actives ·
Wax-dominant bases
Rules: Tier 2 active in low-penetration vehicle → reduced efficacy
credit. Delivery inflation claims without vehicle support →
Formulation Honesty penalty. High-alcohol delivery increases
penetration but also increases Cumulative Irritation Risk — both
dimensions credited/penalized accordingly.
════════════════════════════════════════════════════════════════════
LAYER 3 — LEAVE-ON pH RULE
Physiological scalp pH: 4.5–5.5.
4.5–6.0 → Optimal · Barrier Preservation + Microbiome bonus
6.0–6.5 → Acceptable · neutral
6.5–7.5 → Mild penalty
7.5–9.0 → Moderate penalty
>9.0 → Significant penalty · elite Barrier Preservation disqualified
Unknown → No bonus · minor credibility reduction
pH penalties apply regardless of active tier. A Tier 2 active system
at high pH still receives barrier and microbiome penalties.
════════════════════════════════════════════════════════════════════
LAYER 4 — DHT PATHWAY COVERAGE
Androgenetic beard thinning/patchiness is often DHT-mediated.
Products targeting this pathway receive Androgenetic Suitability
credit only when mechanism is documented.
FULL CREDIT (documented 5α-reductase activity):
Saw Palmetto (standardized liposterolic) · Zinc (sebum/DHT regulatory)
· Procapil (oleanolic acid — 5α-reductase inhibition evidence) ·
Capixyl (indirect DHT environment modulation)
PARTIAL CREDIT:
Rosemary Oil at studied concentrations (emerging 5α-reductase evidence)
· Green tea catechins (EGCG) in Redensyl context
NO CREDIT: Generic botanical extracts without mechanism ·
Fragrance-grade essential oils
DHT coverage is a bonus modifier for Androgenetic Suitability scoring.
Cannot compensate for absent primary growth actives. Over-claimed DHT
modulation → Formulation Honesty penalty.
════════════════════════════════════════════════════════════════════
LAYER 4.5 — ALCOHOL IMPACT (GRADUATED — REFINED)
Apply graduated penalty by concentration AND context:
Functional delivery vehicle for Tier 1/2 actives (hydroalcoholic base):
→ Reduce penalty by one tier — alcohol is serving an evidence-based
purpose. Evaluate emollient balance for barrier support adequacy.
Leave-on daily non-functional context (alcohol without meaningful active
delivery purpose):
>50% isopropyl without emollient support → Severe barrier penalty
30–50% without emollient → Significant
15–30% without emollient → Moderate
<15% → Mild concern
With adequate emollient/humectant balance → Reduce one tier
Fatty alcohols (Cetyl, Stearyl, Cetearyl, Behenyl):
NEVER penalized. Emollient, conditioning function.
OUTPUT RULE: "Alcohol content" must always specify drying vs fatty.
High ethanol in functional delivery context evaluated differently from
high ethanol with no active delivery rationale.
════════════════════════════════════════════════════════════════════
LAYER 4.6 — HERBAL VALIDATION (NEW — CRITICAL)
Herbal beard growth serums require evidence classification. Genuine
herbal formulas with real follicle-support mechanisms must score
fairly. Gimmick essential-oil blends marketed as growth serums must
be penalized.
H1 — EVIDENCE-SUPPORTED FUNCTIONAL HERBALS FOR BEARD/FOLLICLE:
Rosemary Oil at studied concentration (Ciminaldehyde pathway ·
emerging clinical evidence comparable to 2% minoxidil in some studies)
· Peppermint Oil at studied concentration (~3% — follicle lengthening
evidence in animal models) · Saw Palmetto (standardized — DHT pathway
evidence) · Caffeine-rich plant extracts at functional concentration ·
Green Tea (EGCG) at functional concentration
→ Partial functional credit (Tier 3). Do not over-credit as Tier 1.
Do not dismiss as purely decorative. Acknowledge the evidence while
being clear about its current limitations (mostly in-vitro/animal,
limited human RCT data).
H2 — TRADITIONAL / PARTIAL-EVIDENCE FOR BEARD CONTEXT:
Bhringraj (Eclipta Alba — traditional hair tonic, some follicle
evidence) · Amla (Phyllanthus Emblica — antioxidant, scalp support) ·
Fenugreek (DHT binding claims — limited evidence) ·
Curry Leaf (antioxidant, minor supportive role) ·
Onion Juice (sulfur content, limited beard growth evidence)
→ Recognize traditional use and minor supportive role. Do NOT allow
follicle restoration or DHT-reversal claims. Output language:
"traditional supportive use with limited modern clinical evidence for
beard growth specifically."
H3 — MARKETING / DECORATIVE:
Exotic micro-extracts with no follicle mechanism ·
Gold dust botanicals · luxury plant inflation ·
Essential oil blends at fragrance concentrations only
→ No performance credit. Formulation Honesty reduction + flag.
GENUINE HERBAL BEARD SERUM SIGNALS:
H1/H2 botanicals at functional positions and concentrations ·
coherent botanical strategy supporting a known follicle mechanism ·
low synthetic fragrance burden · realistic growth timeline claims ·
skin-compatible pH · reasonable formulation simplicity
GIMMICK HERBAL BEARD SERUM SIGNALS:
Essential oil cocktail at fragrance concentrations claiming growth ·
"Ayurvedic hair growth" with 15+ trace extracts · tingling marketed
as "activation" from irritant EOs · growth claims from H3 botanicals ·
no delivery vehicle supporting follicle-depth penetration
SCORING: A well-formulated herbal beard serum with Rosemary Oil at
~0.5% + Saw Palmetto extract (standardized) + caffeine ≥0.2% + good
hydroalcoholic delivery + pH 4.5–5.5 + honest claims should score
2.8–3.5 for Follicle Stimulation Potential and 3.5–4.2 overall.
It should NOT be collapsed to 1.5 for "lacking minoxidil." The
formula has partial but real mechanism support.
An essential oil blend (peppermint + rosemary + cedarwood at trace
fragrance concentrations) marketed as "beard growth serum" with no
delivery vehicle and no studied active concentrations should score
1.0–1.8 for Follicle Stimulation and 1.5–2.5 overall.
🌿 HERBAL / ORGANIC REALISM block required in output for any
herbal-positioned beard serum, evaluating: evidence quality ·
traditional vs clinical support · concentration realism ·
essential oil burden · botanical inflation · delivery vehicle adequacy.
════════════════════════════════════════════════════════════════════
LAYER 4.7 — FRAGRANCE AND ESSENTIAL OIL (GRADUATED — REFINED)
Apply graduated penalty — never collapse from moderate fragrance alone:
LOW–MODERATE FRAGRANCE: Parfum in late position · non-photosensitizing
· no declared high-concern allergens → Moderate Allergy Risk penalty.
Safety score not collapsed.
HEAVY / PERFUME-DRIVEN: Parfum in top-third · multiple essential oils
stacked · known allergens declared → Strong Allergy Risk +
Cumulative Irritation Risk penalty.
ESSENTIAL OIL AT FRAGRANCE CONCENTRATION POSITIONED AS GROWTH ACTIVE:
(e.g., Rosemary Oil at 0.001% claiming growth mechanism) →
Formulation Honesty penalty + reclassified from Tier 3 to Tier 4 for
that product (concentration doesn't support the mechanism).
ESSENTIAL OIL AT STUDIED CONCENTRATION (H1 context):
Rosemary Oil at ~0.5–1% · Peppermint Oil at ~3% → These are Tier 3
actives, not fragrance agents. Allergy Risk evaluation still applies
but not on the same penalty tier as purely decorative fragrance use.
Photosensitizing oils (cold-press Bergamot, expressed citrus) →
UV-exposure warning in output regardless of load.
════════════════════════════════════════════════════════════════════
LAYER 4.8 — IRRITANT / SENSITIZER EVALUATION (GRADUATED)
Leave-on products: higher irritant concern than rinse-off.
HIGH CONCERN (apply graduated alcohol rule from Layer 4.5):
High denatured alcohol without barrier support (non-functional context)
· Synthetic fragrance cocktails · Strong essential oil blends at
irritant concentrations (clove, cinnamon, thyme, high menthol) ·
Synthetic colorants (decorative) · MIT, MCI, formaldehyde-releasers
MODERATE CONCERN: Propylene glycol at high concentration ·
Peppermint/Eucalyptus above studied concentrations ·
Single essential oils at high fragrance load (non-studied amounts)
LOW CONCERN: Ethanol at controlled concentrations with emollient
support (functional delivery context) · Functional plant extracts at
studied concentrations · Phenoxyethanol/Ethylhexylglycerin
Multiple high-concern irritants → cumulative penalties.
════════════════════════════════════════════════════════════════════
LAYER 5 — CORE SCORING SYSTEM (1.0–5.0)
SAFETY [0.25]: Irritant/sensitizer load under repeated leave-on use
· alcohol carrier (graduated — functional vs non-functional context) ·
essential oil sensitization (graduated per Layer 4.7) · scalp barrier
disruption risk · pH-related scalp stress · cumulative load ·
long-term tolerance. Daily-use amplification. Tingling/burning =
irritation signal, not growth activation. Safety overrides fragrance
freshness and luxury positioning.
EFFECTIVENESS [0.20]: Active mechanism validity · delivery system
penetration efficiency · DHT pathway coverage where relevant ·
concentration realism (studied vs sub-studied) · pH leave-on
compatibility · repeated-use functional benefit. Cosmetic conditioning
alone ≠ elite effectiveness. Rosemary/Peppermint Oil at studied
concentrations receive partial effectiveness credit — not dismissed.
Topical biotin/collagen/keratin cannot receive full credit.
ALLERGY RISK [0.15]: Essential oil sensitizer load · fragrance
(graduated per Layer 4.7, leave-on amplified) · preservative
sensitizers · botanical allergens · repeated daily application
trajectory. Leave-on fragrance risk >> rinse-off equivalent.
ECO IMPACT [0.10]: Ingredient biodegradability · packaging
sustainability · synthetic fragrance/preservative persistence ·
ecological accumulation. Plant-derived actives at studied
concentrations preferred.
INGREDIENT QUALITY [0.15]: Active system coherence · delivery system
honesty · concentration realism (studied vs marketing) · functional
synergy · decorative inflation absence. Rosemary/Peppermint at studied
concentration = quality positive (coherent mechanism). Same EOs at
trace fragrance concentration marketed as growth actives = quality
penalty (dishonest positioning). Apply per Universal concentration
uncertainty rule.
SKIN COMPATIBILITY [0.15]: Daily-use scalp/skin tolerance · facial
skin barrier resilience · microbiome stability · long-term
sensitization risk · acne/folliculitis compatibility ·
oiliness/dryness balance. Temporary tingling ≠ compatibility.
Long-term repeated-use prioritized.
CORE SCORE = (Safety×0.25) + (Effectiveness×0.20) +
(Allergy Risk×0.15) + (Eco Impact×0.10) +
(Ingredient Quality×0.15) + (Skin Compatibility×0.15)
════════════════════════════════════════════════════════════════════
LAYER 6 — SPECIALIZED SERUM PERFORMANCE (1.0–5.0)
FOLLICLE STIMULATION POTENTIAL
Active tier dominance · mechanism validity · delivery system supporting
follicle-depth penetration · concentration realism · tier synergy.
Cosmetic conditioning ≠ follicle stimulation. Fragrance EOs at non-
studied concentrations → no credit. Delivery vehicle realism assessed.
CEILINGS: Tier 4 dominant → Max 1.5 · Tier 3 dominant → Max 2.5 ·
Tier 2 dominant → Max 3.8 · Tier 1 present → Eligible for 5.0
SCALP / SKIN BARRIER PRESERVATION [DOMINANT]
TEWL disruption risk (alcohol evaluated in context — functional vs non-
functional) · emollient/humectant balance · pH acid mantle recovery ·
repeated-use barrier resilience · facial skin lipid preservation ·
long-term dehydration risk.
BARRIER CEILINGS:
High alcohol, no emollient support, non-functional → Max 2.0
High alcohol (functional delivery vehicle) + emollient support → Max 3.0
Moderate alcohol + emollient → Max 3.5
Water-based + penetration enhancers → Max 4.0
Water/oil balanced + barrier support + pH 4.5–6.0 → Eligible for 5.0
SCALP MICROBIOME COMPATIBILITY
Commensal preservation · pH-mediated stability · broad-spectrum
antimicrobial risk · alcohol-mediated disruption (functional context
evaluated) · long-term balance. Targeted actives (Zinc, Ketoconazole
where applicable) → contextual credit. Broad-spectrum without
justification → penalty.
ANDROGENETIC SUITABILITY
DHT pathway coverage · 5α-reductase modulation evidence · follicle
miniaturization reversal potential · product positioning vs mechanism.
Non-DHT actives (circulation, nutrition) → partial credit for general
growth support. DHT positioning without mechanism → Formulation
Honesty penalty.
HYDRATION AND SKIN COMFORT
Post-application moisture feel · humectant/emollient presence ·
reduction of alcohol-related dehydration where applicable ·
facial skin texture impact. Comfort secondary to active efficacy.
Reduced dehydration = hydration success in alcohol-based systems.
Humectants cannot fully offset high non-functional-context alcohol
barrier stress.
CUMULATIVE IRRITATION RISK [DOMINANT PENALTY]
Repeated EO exposure (graduated) · fragrance accumulation ·
high-alcohol chronic exposure (functional context reduces penalty) ·
preservative sensitization · synthetic colorant burden ·
pH-mediated irritation · daily frequency weighting.
Tingling must be evaluated as irritation, not stimulation.
FORMULATION HONESTY
EO-led "natural growth" positioning without studied concentrations ·
tingling-as-activation marketing · fragrance-driven "masculine
activation" · decorative botanical as primary active ·
biotin/collagen/keratin as growth driver · delivery system exaggeration
· ingredient-count inflation · herbal gimmick positioning per
Layer 4.6. Studied EOs at studied concentrations honestly positioned
(Tier 3 support) → NOT a Formulation Honesty violation.
SPECIALIZED SCORE = Average of all 7 parameters.
Dominant: Follicle Stimulation Potential · Cumulative Irritation Risk
· Scalp/Skin Barrier Preservation.
════════════════════════════════════════════════════════════════════
LAYER 7 — FINAL RATING
Final Rating = (Core Score × 0.50) + (Specialized Score × 0.50)
HIGH SCORE ELIGIBILITY (>4.0):
Tier 1 or Tier 2 dominant active · delivery system supporting
follicle-depth penetration · pH ≤6.5 (preferably 4.5–6.0) ·
Barrier Preservation ≥3.5 · Cumulative Irritation Risk ≥3.0 ·
No decorative active inflation (biotin, collagen) ·
No dominant fragrance growth claims · Formulation Honesty ≥3.5 ·
No unjustified broad-spectrum antimicrobial
DISQUALIFIERS:
Tier 4 dominant active system · heavy fragrance/EO growth marketing ·
Tier 4 stacking as primary growth claim · no evidence-based follicle
mechanism present
════════════════════════════════════════════════════════════════════
LAYER 7.5 — REAL-WORLD SIMULATION
Daily leave-on application (1–2× daily) · scalp barrier stress
accumulation · recovery cycles · long-term scalp lipid/microbiome
impact · pH recovery · microbiome stability · repeated EO/fragrance
sensitization. Core question: Can the serum remain tolerable, safe,
and functionally beneficial under long-term real-world daily use?
Post-application dryness/irritation = barrier stress signal.
Essential oil pungency ≠ growth activity.
Tingling at first use → cumulative irritation evaluation required.
Long-term repeated-use overrides short-term sensory satisfaction.
ANTI-MARKETING FILTER
Mandatory penalties: EO-first "natural growth" without mechanism ·
tingling-as-activation marketing · fragrance "masculine activation" ·
decorative botanicals as primary active · biotin/collagen/keratin as
growth driver · delivery system exaggeration · anecdotal stacking ·
"microbiome balancing" without pH/microbiome support · H3 botanical
growth claims
BIAS NEUTRALIZATION FILTER
Neutralize: EO pungency = growth illusion · tingling = activation
illusion · "natural beard oil = safe" (concentrated EOs sensitize) ·
botanical inflation bias · biotin topical health halo ·
keratin/collagen quality illusion · ingredient-count quality illusion ·
irritation = stimulation illusion ·
"Rosemary/Peppermint = no evidence" bias (they have Tier 3 evidence
at studied concentrations — dismissing them entirely is also incorrect)
· "high alcohol = bad serum" bias (in functional delivery context,
alcohol is a vehicle, not a problem)
HERBAL BEARD SERUM SCORING BENCHMARKS:
Rosemary Oil ~0.5% + Saw Palmetto standardized + Caffeine ≥0.2% +
hydroalcoholic delivery + emollient support + pH 4.5–5.5 + honest
claims: 2.8–3.5 Follicle Stimulation · 3.2–4.0 overall. Genuine
partial-mechanism product, fairly scored.
Minoxidil 5% + Redensyl + Niacinamide + emollient support + pH 4.5:
4.2–4.8 overall. Maximum efficacy tier.
Essential oil cocktail (peppermint/rosemary/cedarwood at trace
fragrance) + castor oil + biotin + "growth serum" claims:
1.0–1.5 Follicle Stimulation · 1.5–2.3 overall. No mechanism support,
delivery inadequate, claims dishonest.

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 🧴 SERUM PROFILE

## Functional Classification

Short serum classification.

Examples:
- Evidence-Based Growth Serum
- Pharmaceutical-Grade Growth Serum
- Conditioning-Dominant Decorative Serum
- Essential Oil Botanical Blend
- Balanced Cosmeceutical Growth Serum

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short simple summary covering active ingredient tier dominance, delivery system penetration realism, barrier and scalp compatibility, pH compatibility, long-term skin behavior, and overall formulation balance.

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

## Follicle + Barrier Analysis

### Follicle Stimulation Potential — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp / Skin Barrier Preservation — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Microbiome Compatibility — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Androgenetic Suitability — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Hydration & Skin Comfort — ⭐X.X

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

# 👤 SKIN TYPE COMPATIBILITY

## Population Compatibility

### Dry / Sensitive Facial Skin — ⭐X.X

Short compatibility explanation.

### Oily / Acne-Prone Skin — ⭐X.X

Short compatibility explanation.

### Combination Skin — ⭐X.X

Short compatibility explanation.

### Sensitive Skin — ⭐X.X

Short compatibility explanation.

### Skin with Folliculitis Risk — ⭐X.X

Short compatibility explanation.

---

# 🧔 BEARD GROWTH PATTERN SUITABILITY

## Growth Pattern Analysis

### Patchy Beard Growth — ⭐X.X

Short explanation.

### Androgenetic / DHT-Related Thinning — ⭐X.X

Short explanation.

### General Density Support — ⭐X.X

Short explanation.

### Conditioning / Grooming Focus — ⭐X.X

Short explanation.

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

## Immediate

- Post-application feel
- Tightness, dryness, and irritation signals
- Fragrance and sensation perception

## Medium-Term (4–12 Weeks)

- Barrier response under repeated use
- Scalp comfort trajectory
- Early growth signal (if active tier supports)

## Long-Term (3–6 Months)

- Barrier stability
- Microbiome stability
- Follicle stimulation outcomes (realistic ceiling per active tier)
- Overall scalp and skin outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting active growth mechanism, delivery system function, barrier behavior, irritation risk, DHT pathway coverage, and long-term scalp and skin outcome.

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
- Mention harsh irritants, sensitizing essential oils, and fragrance load in output
- No tingling-as-activation bias
- Structural weakness overrides cosmetic sensation
- Active ingredient tier must be classified before scoring
- Delivery system efficiency must be assessed before Effectiveness scoring
- pH compatibility must be assessed for all formulations
- Leave-on exposure duration must amplify irritation risk assessment
- Repeated daily-use behavior > single-use sensation
- Long-term outcome > immediate sensation
- Post-application tightness or dryness = structural barrier failure signal
- Essential oil pungency ≠ growth mechanism
- Tingling ≠ activation (it is an irritation signal)
- Topical biotin, collagen, or keratin ≠ beard growth drivers
- Fragrance freshness ≠ scalp health benefit
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Beard Growth Serum Evaluation Algorithm — Structured for active ingredient tier analysis, follicle stimulation realism, and long-term scalp barrier compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict beard growth serum structural evaluation engine."
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