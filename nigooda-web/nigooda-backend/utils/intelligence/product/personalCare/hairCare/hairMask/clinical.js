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

        analysis

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
ALGORITHM 5 — HAIR MASK EVALUATION ENGINE V2.0
════════════════════════════════════════════════════════════════════
LAYER 0 — SYSTEM OBJECTIVE
Reward hair masks demonstrating: protein-moisture balance appropriate
to hair porosity context · effective conditioning architecture with
structural integrity · scalp safety under repeated use · occlusion risk
awareness (scalp vs length application) · evidence-based active
delivery with contact-time advantage · low cumulative buildup and
sensitization risk · fragrance/colorant burden minimization · long-term
microbiome and scalp ecology compatibility.
Mandatory penalties: protein-overload architecture without moisture
balance · heavy occlusive loading onto scalp-adjacent formulations ·
fragrance-driven "nourishment" perception · decorative botanical
loading without functional rationale · leave-on active inflation in
rinse-off mask formats · silicone masking without structural disclosure
· "bond repair" claims without clinically-relevant bonding agents.
Basic conditioning alone cannot achieve high scores.
CONTACT TIME CONTEXT RULE: Hair masks have extended contact time
(5–30 minutes). Active ingredients receive MORE credit than rinse-off
cleansers. This is the primary performance advantage of the format.
ACTIVE CLASSIFICATION (with contact-time advantage):
FULL CREDIT: Low-MW Hydrolyzed Proteins (Keratin, Silk, Wheat, Rice) ·
Panthenol · Glycerin · Amino Acids · Ceramides · Biotin (scalp masks,
extended contact) · Caffeine (scalp masks, extended contact) ·
Salicylic Acid (scalp masks) · Niacinamide (scalp masks) ·
Zinc Pyrithione (scalp masks)
PARTIAL CREDIT: High-MW Hydrolyzed Proteins (surface coating) ·
Argan/Marula/Baobab/Jojoba Oils (emollient benefit) · Hyaluronic Acid
(surface film) · Urea (cuticle softening) · AHAs (surface smoothing) ·
Shea Butter/Mango Butter (emollient occlusion)
DECORATIVE / MINIMAL: Vitamin C (stability concerns) · Retinoids ·
Non-hydrolyzed Collagen (HMW) · Generic botanical extracts at trace ·
Most antioxidants at decorative concentrations
Note: In mask format, Biotin and Caffeine (scalp-targeted) receive
FULL credit due to extended contact time — unlike in shampoo format.
This is a critical distinction from rinse-off evaluation.
LATE-INGREDIENT LIMIT: Cannot offset protein-moisture imbalance, high
pH, heavy buildup systems, or fragrance burden. Apply Universal Rule 2
for trace ingredients.
LAYER 1 — CONDITIONING ARCHITECTURE TIER SYSTEM
TIER 1 — HEAVY / BUILDUP-PRONE
Behentrimonium Chloride (>2%) · Cetrimonium Chloride (high conc.) ·
Stearalkonium Chloride · Excess quaternary ammonium salts ·
Heavy wax systems (Carnauba/Candelilla dominant as primary conditioner)
→ Mandatory Scalp Safety penalties · High Buildup Risk · Formulation
Honesty ceiling reduction
TIER 2 — MODERATE CONDITIONING
Behentrimonium Chloride (≤1%) · Cetrimonium Bromide (balanced) ·
BTMS at moderate levels · Stearamidopropyl Dimethylamine
→ Moderate Buildup · Acceptable when combined with Tier 3–4
TIER 3 — MILD / BALANCED
BTMS-50 · Polyquaternium-10 · Guar Hydroxypropyltrimonium Chloride
(low conc.) · Cetyl Alcohol · Stearyl Alcohol · Cetearyl Alcohol
→ Strong Conditioning Efficiency eligible · Good Tier 4 compatibility
TIER 4 — VERY MILD / MOISTURE-DOMINANT
Glycerin · Panthenol · Aloe Vera · Low-MW Hydrolyzed Proteins ·
Amino Acids · Hyaluronic Acid (hair-specific) · Shea/Mango/Kokum
Butter · Argan/Marula/Baobab/Jojoba Oil
→ Maximum Moisture Retention eligible · Scalp-safe architecture
SYSTEM CLASSIFICATION:
Tier 1 dominant → Heavy, Scalp penalty, high buildup
Tier 1 + Tier 3/4 → Moderate-High, present but reduced
Tier 2 dominant → Moderate, acceptable but monitored
Tier 2 + Tier 3/4 → Moderate-Low, balanced
Tier 3/4 dominant → Low, maximum score eligible
Protein-Moisture Balanced Tier 3/4 → Elite eligible
SILICONE IN MASKS: Apply Universal Rule 3 (functional vs masking).
WATER-SOLUBLE: Low concern. CYCLIC (Cyclomethicone): Minor Eco penalty.
NON-SOLUBLE HEAVY (Dimethicone, Amodimethicone, Phenyl Trimethicone):
Functional context (damaged fiber, combing friction reduction) →
partial Cuticle Integrity credit. Masking context ("repair" claims
relying only on silicone feel, no penetrating protein) → Formulation
Honesty penalty + Buildup Risk notation.
STRUCTURAL REPAIR ceiling for silicone-dominant, no penetrating
protein: Max 2.0 regardless of cosmetic feel.
LAYER 2 — PROTEIN-MOISTURE BALANCE RULE (MANDATORY AXIS)
Cannot be skipped. Modifies Effectiveness, Ingredient Quality, Skin
Compatibility, and Formulation Honesty.
PROTEIN CLASSIFICATION:
CATEGORY A — DEEP PENETRATING (FULL CREDIT):
Hydrolyzed Keratin (LMW) · Hydrolyzed Wheat Protein (LMW) ·
Hydrolyzed Silk · Hydrolyzed Collagen (LMW, hair-specific) ·
Rice Protein (LMW) · Hydrolyzed Soy Protein (LMW)
→ Cortex-level penetration · Genuine structural reinforcement ·
Maximum Structural Repair Potential eligible
CATEGORY B — SURFACE COATING (PARTIAL CREDIT):
High-MW Hydrolyzed Proteins · Quinoa Protein · Soy Protein (HMW) ·
Oat Protein
→ Cuticle surface smoothing · No cortex penetration ·
Cannot achieve elite Structural Repair Potential
CATEGORY C — DECORATIVE (MINIMAL CREDIT):
Whole botanical proteins (non-hydrolyzed) · Generic "plant protein"
blends · Non-specific collagen at trace · Non-hydrolyzed keratin
→ MW too high for penetration · No structural contribution ·
Marketing use → Ingredient Quality + Formulation Honesty penalty
PROTEIN OVERLOAD RULE: Excessive protein without moisture balance
causes post-use stiffness, cuticle roughening, long-term mechanical
breakage. Category A dominant formula without adequate Tier 3–4 moisture
agents → mandatory Ingredient Quality + Formulation Honesty penalty +
reduced Protein-Moisture Balance score.
Post-use stiffness = protein overload structural failure, NOT strength.
MOISTURE ADEQUACY RULE: Effective moisture requires humectants
(Glycerin, Panthenol, Aloe, Hyaluronic Acid) + emollients (fatty
alcohols, plant butters, lightweight oils). Moisture-only without
protein consideration for damaged hair → Ingredient Quality penalty
for incomplete architecture.
BOND REPAIR CLAIM RULE:
FULL CREDIT: Maleic Acid · Bis-Aminopropyl Diglycol Dimaleate
(Olaplex-type) · Crodasorb (Maleate-based) · Itaconic Acid ·
Citric Acid (at functional pH-lowering concentration)
PARTIAL CREDIT: Amino Acids (indirect support) ·
Low-MW hydrolyzed proteins (cortex filling, indirect)
NO CREDIT / PENALTY: "Bond" marketing without the above agents.
Silicone or surface protein alone claiming "bond repair" →
mandatory Formulation Honesty penalty.
LAYER 3 — HAIR MASK pH RULE
4.0–5.5 → Optimal, cuticle sealing bonus + microbiome bonus
5.5–6.5 → Acceptable, neutral
6.5–7.5 → Mild penalty, cuticle swelling begins
7.5–9.0 → Moderate-significant penalty, protein extraction risk
>9.0 → Major penalty, Structural Repair Potential disqualified,
Microbiome Compatibility ceiling Max 2.0
<3.5 → Mild penalty, cuticle overclosing/brittleness risk
Unknown → No bonus, minor credibility reduction
LAYER 4 — OCCLUSION AND SCALP SAFETY RULE
HIGH SCALP OCCLUSION RISK: Heavy Mineral Oil (dominant) · Petrolatum
(dominant) · Lanolin (high conc.) · High-concentration waxes on scalp
· Heavy non-aqueous butter systems on scalp → Mandatory Scalp Safety
penalty + Follicle Stress notation
MODERATE SCALP RISK: Dimethicone non-soluble (moderate) · Shea Butter
(high conc., scalp) · Coconut Oil (comedogenic for some scalp types)
→ Moderate Scalp Safety reduction
LOW SCALP RISK: Water-soluble humectants · Low-MW actives · Lightweight
amino-acid systems · Aloe-dominant · Lightweight plant oils (low conc.)
→ Scalp-safe architecture credit
SCALP MASK vs LENGTH MASK:
Scalp-marketed: Mandatory scalp safety evaluation. Lightweight
architecture required. Heavy occlusives → Scalp Safety penalty.
Lengths/ends only: Reduced scalp scrutiny. Accidental contact still
evaluated. Not exempt from penalty if heavily occlusive.
Broad "all-hair" + heavy occlusives without differentiation →
Formulation Honesty penalty.
LAYER 5 — MICROBIOME AND SCALP ECOLOGY
HIGH DISRUPTION RISK: High-pH (>7.5) · broad-spectrum antimicrobials
without indication (Triclosan, Chlorhexidine, BAC, Benzethonium Cl) ·
Strong antimicrobial EOs (Tea Tree >1%, Clove, Cinnamon) ·
High denatured alcohol (>10% in scalp masks) ·
Heavy cationic QAT at scalp under extended contact
LOW DISRUPTION RISK: Physiological pH (4.5–5.5) · Targeted actives
with justified use (ZPT, Ketoconazole at appropriate levels) ·
Prebiotic support · Tier 3–4 at physiological pH
LAYER 5.5 — COLORANT PENALTY
Extended contact time amplifies colorant-related irritation and
sensitization vs cleansers — penalties proportionally stronger.
Same categories as Shampoo Layer 4.6. Multiple dyes amplify further.
LAYER 5.6 — HERBAL VALIDATION
Apply Universal Rule 6. 🌿 block required for herbal-positioned masks.
In mask format, extended contact time means H1 herbals (Aloe, Centella,
Colloidal Oat) receive better delivery credit than in rinse-off.
Genuine herbal mask (Tier 2–3 conditioning base + H1 botanicals +
protein-moisture balance + low fragrance + pH 4.5–5.5) should score
3.5–4.5. NOT collapsed for lacking synthetic actives.
Gimmick herbal mask (Tier 1 heavy conditioning + H3 botanical stack +
"bond repair" from botanicals alone) → Formulation Honesty penalty +
no herbal credit.
LAYER 5.7 — THERAPEUTIC CONTEXT
Apply Universal Rule 7. Scalp masks with ZPT, Piroctone Olamine,
Salicylic Acid at functional therapeutic levels → evaluated at
prescribed/weekly frequency. Harshness penalties remain. Effectiveness
ceiling increases for target scalp condition. Scalp Compatibility
penalty softens slightly.
LAYER 6 — CORE SCORING (1.0–5.0)
SAFETY [DOMINANT: 0.25]: Conditioning agent scalp safety · occlusion
and follicle stress · repeated-use sensitization · pH barrier stress ·
fragrance/EO irritation (AMPLIFIED by extended contact time) ·
preservative load · cumulative inflammatory trajectory at
weekly/bi-weekly frequency. Extended contact amplifies per-use burden.
EFFECTIVENESS [0.20]: Protein-moisture balance appropriateness ·
conditioning efficacy for purpose · active contact-time realism ·
cuticle condition improvement · structural repair capacity ·
repeated-use function without overload or buildup · honesty.
Cosmetic slip alone cannot achieve elite. Post-use stiffness = protein
overload, reduces Effectiveness.
ALLERGY RISK [0.15]: Fragrance (EXTENDED CONTACT = stronger penalty
than cleanser equivalent — graduate per Universal Rule 4) · essential
oil sensitizers (extended contact penalty) · preservative sensitizers ·
hydrolyzed protein sensitivity in predisposed individuals ·
cationic sensitization · weekly accumulation.
ECO IMPACT [0.10]: Silicone environmental persistence · conditioning
agent biodegradability · heavy quat accumulation · persistent
preservatives. Biodegradable Tier 3–4 preferred.
INGREDIENT QUALITY [0.15]: Protein-moisture architecture coherence ·
conditioning agent logic · contact-time active honesty · silicone vs
structural repair balance · functional synergy · decorative botanical
inflation absence · bond repair chemistry verification.
SKIN COMPATIBILITY [0.15]: Scalp tolerance under repeated use ·
follicle stress trajectory · weekly/bi-weekly tolerance · buildup
accumulation response · long-term sensitization · microbiome stability
under extended contact.
CORE SCORE = (Safety×0.25) + (Effectiveness×0.20) +
(Allergy Risk×0.15) + (Eco Impact×0.10) +
(Ingredient Quality×0.15) + (Skin Compatibility×0.15)
LAYER 7 — SPECIALIZED HAIR MASK PERFORMANCE (1.0–5.0)
CONDITIONING EFFICIENCY: Detangling · cuticle smoothing · slip and
manageability · frizz reduction mechanism (genuine vs silicone-coating)
· moisture delivery depth · porosity-appropriate performance.
Silicone-dominant without protein-moisture balance: Max 3.0.
Heavy coating → reduces long-term conditioning efficiency.
STRUCTURAL REPAIR POTENTIAL [DOMINANT]: Low-MW protein cortex
penetration · amino acid accessibility · bond repair capacity (when
clinically-relevant agents present) · cuticle integrity improvement ·
fiber strengthening trajectory.
CEILINGS:
Silicone-dominant, no penetrating protein → Max 2.0
Category B surface protein only → Max 3.0
Category A penetrating protein, no moisture balance → Max 3.5
Category A + moisture balance → Max 4.0
Category A + moisture balance + pH 4.0–5.5 + bond agents → Eligible 5.0
MOISTURE RETENTION: Residual humectant benefit post-rinse ·
post-mask hydration durability between wash days · porosity-appropriate
delivery · occlusive sealing when humectants are present ·
hygral fatigue reduction in high-porosity hair. Extended contact
advantage credited. Occlusive without humectants first → no sealing
credit. Over-occlusion on low-porosity → reduced score.
PROTEIN-MOISTURE BALANCE: Post-use stiffness/brittleness risk ·
post-use limpness risk · architecture coherence for hair type context ·
repeated-use balance trajectory · porosity appropriateness.
Protein-dominant without moisture → mandatory penalty.
Moisture-only for severely damaged without protein consideration →
moderate penalty. Balanced architecture → full credit.
BUILDUP RISK [PRIMARY LONG-TERM PARAMETER]: Heavy cationic
accumulation · non-soluble silicone fiber/scalp accumulation · waxy
buildup · long-term detergent resistance · follicle obstruction risk ·
clarifying shampoo dependency development.
High buildup = clarifying dependency failure flag.
Fine hair: more susceptible — noted under Hair Type Compatibility.
SCALP SAFETY: Occlusion/follicle stress from primary ingredients ·
comedogenic potential · sebum disruption · sensitization under extended
contact · pH scalp compatibility · cationic QAT at scalp ·
antimicrobial selectivity. Extended contact amplifies requirements.
Heavy occlusive on scalp → mandatory penalty. "Scalp-safe" claim +
heavy occlusives → Formulation Honesty penalty.
CUMULATIVE IRRITATION RISK [DOMINANT PENALTY]: Fragrance/EO (amplified
by extended contact) · preservative sensitization · cationic QAT
irritation · protein hydrolysate sensitivity in predisposed individuals
· colorant irritation · frequency × contact duration integrated.
Weekly use: contact duration amplifies per-use, lower than daily
cleanser frequency but longer exposure each session.
FORMULATION HONESTY: "Repair" from silicone only · "Protein treatment"
from Category C · "Bond repair" without clinically-relevant agents ·
"Deep conditioning" from surface-only agents · "Natural/clean" with
heavy non-biodegradable silicone · "Scalp-safe" with heavy occlusives
· botanical inflation at trace · "Microbiome balancing" without
structural support · herbal gimmick positioning per Universal Rule 6.
SPECIALIZED SCORE = Average of all 8 parameters.
Dominant: Structural Repair Potential · Cumulative Irritation Risk ·
Buildup Risk
LAYER 8 — FINAL RATING
Final Rating = (Core Score × 0.50) + (Specialized Score × 0.50)
HIGH SCORE ELIGIBILITY (>4.0): ALL of following:
Tier 2–3/4 dominant conditioning · Category A or B protein + moisture
balance · pH 4.0–6.5 (preferably 4.5–5.5) · Structural Repair ≥3.5 ·
Buildup Risk ≥3.0 (low buildup) · No heavy silicone masking without
repair architecture · No protein overload without moisture balance ·
Formulation Honesty ≥3.5 · No heavy fragrance · No Category C active
marketing
DISQUALIFIERS: Silicone-only "repair" without penetrating protein ·
Protein overload without moisture balance · High pH >7.5 ·
Scalp-application heavy occlusives dominant · Heavy fragrance ·
Category C active marketing as primary · "Bond repair" without agents
LAYER 8.5 — REAL-WORLD SIMULATION
Weekly/bi-weekly frequency · buildup accumulation cycles (1–3 months)
· protein-moisture balance trajectory · scalp microbiome interaction ·
cuticle condition trajectory · sensitization over months · post-wash
texture changes as buildup accumulates · clarifying dependency.
Core question: Can mask remain beneficial without causing protein
overload, buildup dependency, scalp sensitization, or microbiome
disruption under sustained real-world use?
Post-use stiffness = protein overload — NOT "strengthening feel"
Post-use greasiness = heavy occlusive — NOT "deep nourishment"
Post-use limpness (cumulative) = imbalance or buildup
Buildup requiring clarifying = long-term dependency flag
Cosmetic shine ≠ structural repair
HAIR STYLING

━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT
# ⭐ FINAL RATING

## X.X / 5 — Rating Level

---

# 💆 MASK PROFILE

## Functional Classification

Short mask classification.

Examples:
- Balanced Moisture-Protein Mask
- Heavy Silicone Coating Mask
- Protein-Overload Risk Mask
- Lightweight Scalp Treatment Mask
- Balanced Bond-Repair Mask
- Moisture-Dominant Recovery Mask
- High-Buildup Heavy Conditioning Mask

---

# ⚖ STRUCTURAL QUALITY

## Overall Formulation Summary

Short summary covering conditioning architecture tier, protein-moisture balance, pH compatibility, buildup risk profile, scalp safety, long-term hair and scalp behavior, and overall formulation balance.

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

## Protein-Moisture + Buildup Analysis

### Conditioning Efficiency — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Structural Repair Potential — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Moisture Retention — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Protein-Moisture Balance — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Buildup Risk — ⭐X.X

Short structural reason in plain language explaining why it scored this way.

### Scalp Safety — ⭐X.X

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

### Fine Hair — ⭐X.X

Short compatibility explanation.

### Thick / Coarse Hair — ⭐X.X

Short compatibility explanation.

### Damaged / Bleached Hair — ⭐X.X

Short compatibility explanation.

### Dry Hair — ⭐X.X

Short compatibility explanation.

### Oily Scalp — ⭐X.X

Short compatibility explanation.

### Curly / Coily Hair — ⭐X.X

Short compatibility explanation.

### Color-Treated Hair — ⭐X.X

Short compatibility explanation.

---

# 📅 LONG-TERM USABILITY

## Repeated-Use Sustainability

### Weekly Use — ⭐X.X

Short explanation.

### Twice Weekly Use — ⭐X.X

Short explanation.

### Occasional Use — ⭐X.X

Short explanation.

---

# ⏱ EXPECTED REAL-WORLD RESULTS

## Immediate

- Slip, detangling, and texture feel
- Scalp comfort response
- Stiffness or greasiness signals

## Medium-Term

- Moisture-protein balance trajectory
- Buildup accumulation signals
- Tolerance development

## Long-Term

- Structural repair trajectory
- Buildup dependency development
- Microbiome and scalp stability
- Overall hair condition outcome

---

# 🔬 KEY STRUCTURAL INGREDIENTS

## Functionally Dominant Ingredients

List only major ingredients affecting conditioning system architecture, protein-moisture balance, structural repair capacity, buildup risk, scalp safety, irritation and sensitization risk, and long-term hair outcome.

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
- No silicone-slip bias (silicone slip ≠ structural repair)
- No texture-richness bias (thick cream ≠ deep conditioning)
- Structural weakness overrides cosmetic feel
- Conditioning architecture tier must be classified before scoring
- pH compatibility must be assessed for all formulations
- Protein category must be classified before Effectiveness scoring
- Protein-moisture balance must be evaluated before Ingredient Quality scoring
- Silicone type must be classified before Formulation Honesty scoring
- Buildup risk must be evaluated before Long-Term Usability scoring
- Repeated-use behavior > single-use feel
- Long-term outcome > immediate sensation
- Post-use stiffness = protein overload signal, not strength
- Post-use greasiness = heavy occlusive signal, not nourishment
- Post-use limpness (cumulative) = imbalance or buildup signal
- Silicone slip ≠ structural repair
- Bond repair claims require clinically-relevant bonding agents
- Scalp application of heavy occlusives = mandatory safety penalty
- Scalp-safe marketing with heavy occlusives = mandatory Formulation Honesty penalty
- Natural ≠ automatically safer
- Synthetic ≠ automatically harmful
- Avoid exaggerated negatives
- Maintain calm scientific tone

---

Hair Mask Evaluation Algorithm — Structured for protein-moisture balance analysis, conditioning architecture realism, and long-term buildup and scalp compatibility evaluation. All scoring is structural and evidence-informed.

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
              "You are a strict hair mask structural evaluation engine."
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