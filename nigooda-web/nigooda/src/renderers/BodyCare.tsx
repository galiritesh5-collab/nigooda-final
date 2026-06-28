import React, { useState, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";

// ─── BODYCARE METADATA ───────────────────────────────────────────────────────
const BC_BRAND    = "NIGOODA";
const BC_TITLE    = "Body Care Intelligence";
const BC_HERO_LBL = "⭐ BODY INTELLIGENCE";
const BC_SUBTITLE = "Analyze long-term body barrier compatibility and formulation behavior";

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface ScoreItem      { label: string; score: number; maxScore: number; reason: string; }
interface CompatItem     { label: string; score: number; compatible: boolean; reason: string; }
interface Ingredient     { name: string; purpose: string; group: string; riskLevel: number; color: ColorSet; }
interface TimelinePhase  { phase: string; label: string; sub: string; outcomes: string[]; }
interface ColorSet       { bg: string; dot: string; text: string; border: string; }
interface EvidenceItem   { label: string; body: string; }
interface Tab            { id: string; label: string; icon: string; }
interface SafetySignal   { label: string; icon: string; level: "critical" | "caution" | "info"; detail: string; }

// ─── PRODUCT MODE DETECTION ──────────────────────────────────────────────────
type ProductMode = "lotion" | "powder" | "scrub" | "deodorant" | "cleanser" | "generic";

function detectProductMode(md: string): ProductMode {
  const lower = md.toLowerCase();
  if (/body powder|powder profile|talc|cornstarch.*powder|inhalation risk/i.test(lower)) return "powder";
  if (/body scrub|scrub profile|exfoliation.*analysis|particle.*harsh/i.test(lower))     return "scrub";
  if (/deodorant|antiperspirant|axillary|odor control|sweat control/i.test(lower))       return "deodorant";
  if (/body wash|soap.*body|body cleanser|cleanser profile|surfactant.*harsh/i.test(lower)) return "cleanser";
  if (/body lotion|lotion profile|moisturization depth|barrier.*restor/i.test(lower))    return "lotion";
  return "generic";
}

const MODE_META: Record<ProductMode, { icon: string; gradient: string; label: string; systemLabel: string }> = {
  lotion   : { icon: "🧴", gradient: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",  label: "Body Lotion",   systemLabel: "Moisturization Architecture" },
  powder   : { icon: "✨", gradient: "linear-gradient(135deg, #D97706 0%, #B45309 100%)",  label: "Body Powder",   systemLabel: "Zone & Inhalation Safety"      },
  scrub    : { icon: "🌀", gradient: "linear-gradient(135deg, #0891B2 0%, #0D9488 100%)",  label: "Body Scrub",    systemLabel: "Exfoliation Intelligence"       },
  deodorant: { icon: "🛡️", gradient: "linear-gradient(135deg, #1D4ED8 0%, #4338CA 100%)", label: "Deodorant",     systemLabel: "Axillary Skin Analysis"         },
  cleanser : { icon: "🚿", gradient: "linear-gradient(135deg, #0D9488 0%, #0891B2 100%)",  label: "Body Wash",     systemLabel: "Body Barrier Analysis"          },
  generic  : { icon: "🧴", gradient: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",  label: "Body Care",     systemLabel: "Formulation Intelligence"       },
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  indigo      : "#2563EB",
  indigoLight : "#1D4ED8",
  indigoPale  : "#DBEAFE",
  indigoMid   : "#BFDBFE",
  teal        : "#0D9488",
  tealLight   : "#CCFBF1",
  mint        : "#10B981",
  amber       : "#F59E0B",
  amberLight  : "#FEF3C7",
  red         : "#DC2626",
  redLight    : "#FEE2E2",
  green       : "#16A34A",
  greenLight  : "#DCFCE7",
  violet      : "#7C3AED",
  violetLight : "#EDE9FE",
  blue        : "#0369A1",
  blueLight   : "#E0F2FE",
  textDark    : "#0F172A",
  textMid     : "#475569",
  textMuted   : "#64748B",
  textFaint   : "#64748B",
  surface     : "#FFFFFF",
  surfaceAlt  : "#F1F5F9",
  border      : "#E2E8F0",
  borderMid   : "#CBD5E1",
  bg          : "#F8FAFC",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION I — PARSING UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseMarkdown(md: string): Map<string, string[]> {
  const lines    = md.split(/\r?\n/);
  const sections = new Map<string, string[]>();
  let currentKey = "__intro__";
  sections.set(currentKey, []);

  for (const line of lines) {
    const t = line.trim();
    if (!t || t === "---") continue;
    if (/^#\s/.test(t)) {
      const key = t.replace(/^#\s+/, "").trim();
      currentKey = key;
      if (!sections.has(currentKey)) sections.set(currentKey, []);
    } else {
      sections.get(currentKey)?.push(t);
    }
  }
  return sections;
}

// Normalize heading for semantic matching
function norm(s: string): string {
  return s
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]+/gu, " ")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function findSection(
  sections: Map<string, string[]>,
  keywords: string[]
): { key: string | null; lines: string[] } {
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toLowerCase()))) {
      return { key, lines };
    }
  }
  return { key: null, lines: [] };
}

function findSections(
  sections: Map<string, string[]>,
  keywords: string[]
): Array<{ key: string; lines: string[] }> {
  const results: Array<{ key: string; lines: string[] }> = [];
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toLowerCase()))) {
      results.push({ key, lines });
    }
  }
  return results;
}

function cleanBullet(s: string): string {
  return s.replace(/^[-*•·▸→#\s]+/, "").trim();
}

function cleanSectionTitle(key: string): string {
  return key
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u200D\uFE0F]+\s*/gu, "")
    .trim();
}

function previewText(reason: string, maxLen = 90): string {
  if (!reason) return "";
  const first = reason.split(/[.!?]/)[0]?.trim() ?? reason;
  const clean = first.slice(0, maxLen);
  return clean.length < reason.length ? clean + "…" : clean;
}

function linesAsText(lines: string[]): string {
  return lines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join(" ").trim();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION II — DOMAIN PARSERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  let current: ScoreItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    // Strict score extraction: "Title — ⭐X.X"
    const m = t.match(/^(?:#{1,4}\s+)?(.+?)\s+—\s+⭐?\s*(\d+\.?\d*)/);
    if (m) {
      if (current) items.push(current);
      const remaining = t.slice(m[0].length).replace(/^[—:–\-\s]+/, "").trim();
      current = {
        label   : cleanBullet(m[1]).trim(),
        score   : Math.min(5, Math.max(0, parseFloat(m[2]))),
        maxScore: 5,
        reason  : remaining || "",
      };
    } else if (current && t.length > 0) {
      const clean = cleanBullet(t);
      if (clean.length > 2) {
        current.reason = current.reason ? current.reason + " " + clean : clean;
      }
    }
  }
  if (current) items.push(current);
  return items.filter((i) => i.score >= 0 && i.score <= 5);
}

function parseCompatibility(lines: string[]): CompatItem[] {
  const items: CompatItem[] = [];
  let current: CompatItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^(?:#{1,4}\s+)?(.+?)\s+—\s+⭐?\s*(\d+\.?\d*)/);
    if (m) {
      if (current) items.push(current);
      const remaining = t.slice(m[0].length).replace(/^[—:–\-\s]+/, "").trim();
      const score = Math.min(5, Math.max(0, parseFloat(m[2])));
      current = {
        label     : cleanBullet(m[1]).trim(),
        score,
        compatible: score >= 3.0,
        reason    : remaining || "",
      };
    } else if (current && t.length > 0) {
      const clean = cleanBullet(t);
      if (clean.length > 2) {
        current.reason = current.reason ? current.reason + " " + clean : clean;
      }
    }
  }
  if (current) items.push(current);
  return items.filter((i) => i.score >= 0);
}

function parseTimeline(lines: string[]): TimelinePhase[] {
  const phases: TimelinePhase[] = [
    { phase: "immediate", label: "Immediate",   sub: "First Application",   outcomes: [] },
    { phase: "medium",    label: "Medium-Term", sub: "2–4 Weeks",           outcomes: [] },
    { phase: "longterm",  label: "Long-Term",   sub: "Months & Beyond",     outcomes: [] },
  ];
  let cur: TimelinePhase | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const isBullet  = /^[-•*]/.test(t);
    const isHeading = /^#{1,4}\s/.test(t);
    if (/immediate/i.test(t)   && (isHeading || !isBullet)) { cur = phases[0]; continue; }
    if (/medium.?term/i.test(t) && (isHeading || !isBullet)) { cur = phases[1]; continue; }
    if (/long.?term/i.test(t)  && (isHeading || !isBullet)) { cur = phases[2]; continue; }
    if (cur) {
      const clean = cleanBullet(t);
      if (clean.length > 3) cur.outcomes.push(clean);
    }
  }
  return phases.filter((p) => p.outcomes.length > 0);
}

function parseInsights(lines: string[]): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[]  = [];
  const weaknesses: string[] = [];
  let inS = false, inW = false;

  for (const line of lines) {
    const t = line.trim();
    if (/^#{1,4}\s*strength/i.test(t))           { inS = true;  inW = false; continue; }
    if (/^#{1,4}\s*(weakness|concern)/i.test(t)) { inW = true;  inS = false; continue; }
    if (!t) continue;
    const clean = cleanBullet(t);
    if (!clean || clean.length < 3) continue;
    if (inS) strengths.push(clean);
    else if (inW) weaknesses.push(clean);
  }
  return { strengths, weaknesses };
}

function parseEvidenceItems(lines: string[]): EvidenceItem[] {
  const items: EvidenceItem[] = [];
  let current: EvidenceItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (/^#{2,4}\s/.test(t)) {
      if (current) items.push(current);
      current = { label: t.replace(/^#{2,4}\s+/, "").trim(), body: "" };
    } else if (/^#\s/.test(t)) {
      // top-level skip
    } else {
      const clean = cleanBullet(t);
      if (clean.length > 2) {
        if (current) current.body = current.body ? current.body + " " + clean : clean;
        else current = { label: "Overview", body: clean };
      }
    }
  }
  if (current) items.push(current);
  return items;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION III — SAFETY SIGNAL DETECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function detectSafetySignals(md: string, mode: ProductMode): SafetySignal[] {
  const signals: SafetySignal[] = [];
  const lower = md.toLowerCase();

  // Inhalation — powder specific
  if (mode === "powder") {
    if (/talc/i.test(lower))
      signals.push({ label: "Talc Detected", icon: "⚠️", level: "critical", detail: "Talc use in intimate or infant zones carries structural risk. Intimate and infant application not recommended." });
    if (/inhalation risk/i.test(lower) || /fine particle/i.test(lower))
      signals.push({ label: "Inhalation Risk", icon: "🫁", level: "caution", detail: "Fine powder particles may present chronic inhalation exposure. Apply in ventilated spaces. Avoid applying near face." });
    if (/candida|cornstarch.*intimate|candida risk/i.test(lower))
      signals.push({ label: "Candida Risk Signal", icon: "🦠", level: "caution", detail: "Cornstarch-based powders in occluded intertriginous zones may support Candida growth. Monitor with repeated intimate-zone use." });
  }

  // Deodorant-specific warnings
  if (mode === "deodorant") {
    if (/baking soda|sodium bicarbonate/i.test(lower))
      signals.push({ label: "Baking Soda — pH Risk", icon: "⚠️", level: "critical", detail: "Baking soda raises pH to ~9+. Axillary skin operates at pH 4.5–5.5. Chronic contact dermatitis risk is high with repeated daily use." });
    if (/post.shave.*sting|stinging.*post.shave|post-shave.*alcohol/i.test(lower))
      signals.push({ label: "Post-Shave Incompatibility", icon: "🔪", level: "caution", detail: "Active ingredients or alcohol content may cause post-shave barrier disruption or stinging. Allow 12–24 hours after shaving." });
    if (/fragrance sensitization|parfum.*axillary|cumulative.*fragrance/i.test(lower))
      signals.push({ label: "Fragrance Sensitization Risk", icon: "🌸", level: "caution", detail: "Repeated fragrance exposure on axillary skin may lead to contact sensitization. Monitor for persistent redness or itch." });
  }

  // Scrub-specific warnings
  if (mode === "scrub") {
    if (/walnut|apricot kernel|irregular.*particle|jagged/i.test(lower))
      signals.push({ label: "Harsh Particle Geometry", icon: "⚠️", level: "critical", detail: "Irregular or jagged particles (walnut shell, apricot kernel) create micro-tears in the barrier. Structural barrier disruption risk at any frequency." });
    if (/over.exfoliation|exfoliation.*daily.*risk|daily.*scrub.*caution/i.test(lower))
      signals.push({ label: "Over-Exfoliation Risk", icon: "🌀", level: "caution", detail: "High-frequency use of mechanical exfoliants may exceed barrier repair rate. Reduced frequency recommended for barrier-sensitive individuals." });
  }

  // Cleanser-specific warnings
  if (mode === "cleanser") {
    if (/sodium lauryl sulfate|sls.*body|body.*sls/i.test(lower))
      signals.push({ label: "High-Surfactant Load (SLS)", icon: "⚠️", level: "caution", detail: "SLS disrupts barrier lipids at full body scale. Repeated daily use may accelerate lower-leg xerosis, especially in winter or dry climates." });
    if (/triclosan/i.test(lower))
      signals.push({ label: "Triclosan Detected", icon: "⚠️", level: "critical", detail: "Triclosan carries environmental and microbiome disruption risk. Not recommended for regular body-scale use." });
    if (/ph 9|ph.*alkaline|traditional soap.*alkaline|natural soap.*ph/i.test(lower))
      signals.push({ label: "Alkaline pH — Barrier Risk", icon: "🧪", level: "caution", detail: "Traditional soaps operate at pH 9–10. Body skin prefers pH 4.5–5.5. Daily alkaline use disrupts acid mantle and microbiome at scale." });
  }

  // Universal: fragrance / parfum burden
  if (/heavy.*fragrance|high.*fragrance|fragrance.*sensitiz/i.test(lower))
    signals.push({ label: "Fragrance Burden", icon: "🌸", level: "info", detail: "Elevated fragrance load detected. Repeated leave-on exposure increases sensitization trajectory in susceptible individuals." });

  // Universal: preservative concern
  if (/methylisothiazolinone|mci|mi.*sensitiz/i.test(lower))
    signals.push({ label: "High-Concern Preservative (MI/MCI)", icon: "🧬", level: "caution", detail: "MI and MCI are common contact allergens at rinse-off and especially leave-on concentrations. Not recommended for sensitive or eczema-prone skin." });

  return signals;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IV — BODY CARE METRIC DETECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface BodyMetric { label: string; value: string; color: string; icon: string; }

function detectBodyMetrics(mode: ProductMode, scores: ScoreItem[]): BodyMetric[] {
  const metrics: BodyMetric[] = [];
  const findScore = (kw: string) =>
    scores.find((s) => norm(s.label).includes(kw.toLowerCase()))?.score;

  const barrierScore = findScore("barrier");
  if (barrierScore !== undefined)
    metrics.push({ label: "Barrier Preservation", value: `${barrierScore.toFixed(1)}/5`, color: scoreColor(barrierScore), icon: "🛡️" });

  if (mode === "lotion") {
    const moistScore = findScore("moisturization depth") ?? findScore("moisturization");
    if (moistScore !== undefined)
      metrics.push({ label: "Moisturization Depth", value: `${moistScore.toFixed(1)}/5`, color: scoreColor(moistScore), icon: "💧" });
    const comedoScore = findScore("comedogenic");
    if (comedoScore !== undefined)
      metrics.push({ label: "Comedogenicity Risk", value: `${comedoScore.toFixed(1)}/5`, color: scoreColor(comedoScore), icon: "🔬" });
  }

  if (mode === "powder") {
    const inhalScore = findScore("inhalation");
    if (inhalScore !== undefined)
      metrics.push({ label: "Inhalation Risk", value: `${inhalScore.toFixed(1)}/5`, color: scoreColor(inhalScore), icon: "🫁" });
    const candidaScore = findScore("candida");
    if (candidaScore !== undefined)
      metrics.push({ label: "Candida Safety", value: `${candidaScore.toFixed(1)}/5`, color: scoreColor(candidaScore), icon: "🦠" });
  }

  if (mode === "scrub") {
    const exfolScore = findScore("exfoliation efficiency") ?? findScore("exfoliation");
    if (exfolScore !== undefined)
      metrics.push({ label: "Exfoliation Efficiency", value: `${exfolScore.toFixed(1)}/5`, color: scoreColor(exfolScore), icon: "✨" });
    const overExfolScore = findScore("over-exfoliation") ?? findScore("over exfoliation");
    if (overExfolScore !== undefined)
      metrics.push({ label: "Over-Exfoliation Risk", value: `${overExfolScore.toFixed(1)}/5`, color: scoreColor(overExfolScore), icon: "⚠️" });
  }

  if (mode === "deodorant") {
    const odorScore = findScore("odor control");
    if (odorScore !== undefined)
      metrics.push({ label: "Odor Control", value: `${odorScore.toFixed(1)}/5`, color: scoreColor(odorScore), icon: "💨" });
    const sweatScore = findScore("sweat control");
    if (sweatScore !== undefined)
      metrics.push({ label: "Sweat Control", value: `${sweatScore.toFixed(1)}/5`, color: scoreColor(sweatScore), icon: "💧" });
  }

  if (mode === "cleanser") {
    const cleanScore = findScore("cleansing efficiency");
    if (cleanScore !== undefined)
      metrics.push({ label: "Cleansing Efficiency", value: `${cleanScore.toFixed(1)}/5`, color: scoreColor(cleanScore), icon: "🚿" });
    const dryScore = findScore("residual dryness");
    if (dryScore !== undefined)
      metrics.push({ label: "Residual Dryness Risk", value: `${dryScore.toFixed(1)}/5`, color: scoreColor(dryScore), icon: "🌵" });
  }

  const irritScore = findScore("cumulative irritation") ?? findScore("irritation");
  if (irritScore !== undefined)
    metrics.push({ label: "Irritation Risk", value: `${irritScore.toFixed(1)}/5`, color: scoreColor(irritScore), icon: "⚡" });

  const microScore = findScore("microbiome");
  if (microScore !== undefined)
    metrics.push({ label: "Microbiome Compatibility", value: `${microScore.toFixed(1)}/5`, color: scoreColor(microScore), icon: "🦠" });

  return metrics.slice(0, 4);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION V — INGREDIENT SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ING_GROUPS: Record<string, string[]> = {
  Humectants      : ["glycerin", "glycerol", "sorbitol", "propylene glycol", "butylene glycol", "hyaluronic", "urea", "sodium pca"],
  Emollients      : ["dimethicone", "cyclomethicone", "shea", "jojoba", "squalane", "lanolin", "mineral oil", "petrolatum", "cetyl alcohol", "stearyl alcohol", "cetearyl", "isopropyl myristate", "caprylic"],
  Occlusives      : ["beeswax", "carnauba", "petroleum", "paraffin", "zinc oxide", "titanium dioxide"],
  Surfactants     : ["sodium lauryl", "sls", "sodium laureth", "sles", "cocamidopropyl", "coco glucoside", "decyl glucoside", "betaine", "cocoyl", "soap", "saponified"],
  Powders         : ["talc", "cornstarch", "arrowroot", "kaolin", "silica", "magnesium", "zinc stearate"],
  Exfoliants      : ["sugar", "salt", "walnut", "apricot", "pumice", "lactic acid", "glycolic acid", "salicylic", "coffee ground", "rice bran"],
  Actives         : ["aluminum chlorohydrate", "aluminum zirconium", "alum", "potassium alum", "baking soda", "sodium bicarbonate", "triclosan", "benzalkonium", "chlorhexidine"],
  Botanicals      : ["aloe vera", "tea tree", "lavender", "eucalyptus", "centella", "calendula", "chamomile", "green tea", "turmeric", "coconut oil", "argan"],
  Preservatives   : ["phenoxyethanol", "paraben", "methylisothiazolinone", "ethylhexylglycerin", "benzoate", "sorbate"],
  FragrancesOils  : ["fragrance", "parfum", "essential oil", "limonene", "linalool", "citronellol", "geraniol"],
  BarrierFillers  : ["ceramide", "niacinamide", "panthenol", "allantoin", "bisabolol", "cholesterol", "fatty acid"],
};

const ING_COLORS: Record<string, ColorSet> = {
  Humectants     : { bg:"#F0F9FF", dot:"#0EA5E9", text:"#0C4A6E", border:"#BAE6FD" },
  Emollients     : { bg:"#FDF4FF", dot:"#A855F7", text:"#581C87", border:"#E9D5FF" },
  Occlusives     : { bg:"#FFFBEB", dot:"#D97706", text:"#78350F", border:"#FDE68A" },
  Surfactants    : { bg:"#F0FDF4", dot:"#22C55E", text:"#14532D", border:"#DCFCE7" },
  Powders        : { bg:"#FEF9C3", dot:"#CA8A04", text:"#713F12", border:"#FDE047" },
  Exfoliants     : { bg:"#FFF7ED", dot:"#F97316", text:"#7C2D12", border:"#FED7AA" },
  Actives        : { bg:"#EFF6FF", dot:"#3B82F6", text:"#1E3A8A", border:"#BFDBFE" },
  Botanicals     : { bg:"#F0FDF4", dot:"#4ADE80", text:"#14532D", border:"#BBF7D0" },
  Preservatives  : { bg:"#F8FAFC", dot:"#94A3B8", text:"#334155", border:"#E2E8F0" },
  FragrancesOils : { bg:"#FFF1F2", dot:"#F43F5E", text:"#881337", border:"#FECDD3" },
  BarrierFillers : { bg:"#F0FDFA", dot:"#14B8A6", text:"#134E4A", border:"#99F6E4" },
  Other          : { bg:"#F8FAFC", dot:"#CBD5E1", text:"#475569", border:"#E2E8F0" },
};

function inferIngredientGroup(name: string): string {
  const lower = name.toLowerCase();
  for (const [g, kws] of Object.entries(ING_GROUPS)) {
    if (kws.some((k) => lower.includes(k))) return g;
  }
  return "Other";
}

function inferIngredientRisk(name: string): number {
  const lower = name.toLowerCase();
  if (/methylisothiazolinone|triclosan|walnut shell|apricot kernel/.test(lower)) return 5;
  if (/sodium lauryl|sls|baking soda|sodium bicarbonate|talc|parfum/.test(lower)) return 4;
  if (/paraben|limonene|linalool|isopropyl myristate|lanolin/.test(lower))        return 3;
  if (/fragrance|essential oil|aluminum chlor/.test(lower))                       return 2;
  return 1;
}

function parseIngredients(lines: string[]): Ingredient[] {
  return lines
    .filter((l) => !/^#{1,4}\s/.test(l.trim()))
    .map((l) => {
      const clean = cleanBullet(l);
      if (!clean || clean.length < 2) return null;
      const parts   = clean.split(/[:—–\-]/);
      const name    = parts[0]?.trim() ?? clean;
      if (name.length < 2) return null;
      const purpose = parts[1]?.trim() ?? "Functional Ingredient";
      const group   = inferIngredientGroup(name);
      return { name, purpose, group, riskLevel: inferIngredientRisk(name), color: ING_COLORS[group] || ING_COLORS.Other };
    })
    .filter(Boolean) as Ingredient[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VI — SCORE UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function scoreColor(score: number, max = 5): string {
  const pct = (score / max) * 100;
  if (pct >= 76) return T.mint;
  if (pct >= 60) return T.teal;
  if (pct >= 44) return T.amber;
  return T.red;
}

function scoreLabel(score: number, max = 5): string {
  const pct = (score / max) * 100;
  if (pct >= 90) return "Exceptional";
  if (pct >= 76) return "Strong";
  if (pct >= 60) return "Good";
  if (pct >= 44) return "Moderate";
  if (pct >= 28) return "Weak";
  return "Poor";
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VII — PRIMITIVE COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoreBar({ score, max = 5 }: { score: number; max?: number }) {
  const pct   = Math.min(100, (score / max) * 100);
  const color = scoreColor(score, max);
  return (
    <div style={{ height: 4, background: T.border, borderRadius: 99, overflow: "hidden", flex: 1, minWidth: 48 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.7s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function RatingRing({ score, max, color }: { score: number; max: number; color: string }) {
  const r    = 38;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(1, score / max) * circ;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke={T.border} strokeWidth="7" />
      <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="7"
        strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)" }}
      />
      <text x="48" y="44" textAnchor="middle" fill={color} fontSize="18" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">{score.toFixed(1)}</text>
      <text x="48" y="60" textAnchor="middle" fill={T.textFaint} fontSize="11" fontFamily="Inter, system-ui, sans-serif">/ {max}</text>
    </svg>
  );
}

function Stars({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: max }, (_, i) => ({
        filled: i < Math.floor(score), half: i >= Math.floor(score) && i < score,
      })).map((s, i) => (
        <span key={i} style={{ fontSize: 16, color: s.filled || s.half ? "#FBBF24" : T.border }}>
          {s.filled ? "★" : s.half ? "⯨" : "☆"}
        </span>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VIII — CARD COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SectionCard({ title, icon, accent, children }: {
  title?: string; icon?: string; accent?: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${accent ? `${accent}40` : T.border}`,
      borderRadius: 18, padding: "18px 20px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      {(title || icon) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          {icon && <span style={{ fontSize: 15 }}>{icon}</span>}
          {title && <span style={{ fontWeight: 700, fontSize: 13, color: accent || T.textDark }}>{title}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function ScoreCard({ item }: { item: ScoreItem }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score, item.maxScore);
  const label   = scoreLabel(item.score, item.maxScore);
  const preview = previewText(item.reason, 88);

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background: T.surface,
        border: `1px solid ${open ? T.indigoMid : T.border}`,
        borderRadius: 14, padding: "14px 16px",
        cursor: item.reason ? "pointer" : "default",
        boxShadow: open ? "0 4px 20px rgba(79,70,229,0.09)" : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, lineHeight: 1.35, wordBreak: "break-word" }}>
              {item.label}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <span style={{ fontWeight: 800, fontSize: 14, color }}>{item.score.toFixed(1)}</span>
              <span style={{ fontSize: 10, color: T.textFaint }}>/5</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <ScoreBar score={item.score} max={item.maxScore} />
            <span style={{ fontSize: 10, fontWeight: 700, color, background: `${color}18`, padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap", letterSpacing: "0.04em" }}>{label}</span>
          </div>
          {preview && !open && <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>}
        </div>
        {item.reason && (
          <span style={{ fontSize: 10, color: T.textFaint, flexShrink: 0, marginTop: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        )}
      </div>
      {open && item.reason && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.7, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
          {item.reason}
        </div>
      )}
    </div>
  );
}

function CompatCard({ item }: { item: CompatItem }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score, 5);
  const preview = previewText(item.reason, 88);
  const c = item.compatible
    ? { border: T.greenLight, bg: "#F0FDF4", dot: T.mint }
    : { border: T.redLight,   bg: "#FFF5F5", dot: T.red  };

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background: c.bg,
        border: `1px solid ${open ? (item.compatible ? "#86EFAC" : "#FCA5A5") : c.border}`,
        borderRadius: 14, padding: "13px 15px",
        cursor: item.reason ? "pointer" : "default",
        boxShadow: open ? "0 4px 16px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.03)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, marginTop: 4, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, wordBreak: "break-word", lineHeight: 1.4 }}>{item.label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 13, color }}>{item.score.toFixed(1)}</span>
          <span style={{ fontSize: 10, color: T.textFaint }}>/5</span>
          {item.reason && (
            <span style={{ fontSize: 10, color: T.textFaint, marginLeft: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
          )}
        </div>
      </div>
      <ScoreBar score={item.score} max={5} />
      {preview && !open && <p style={{ margin: "7px 0 0", fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>}
      {open && item.reason && (
        <p style={{ margin: "10px 0 0", fontSize: 12.5, color: T.textMid, lineHeight: 1.65, paddingTop: 10, borderTop: `1px solid ${c.border}` }}>{item.reason}</p>
      )}
    </div>
  );
}

function EvidenceCard({ item, accent }: { item: EvidenceItem; accent: string }) {
  const [open, setOpen] = useState(false);
  const preview = previewText(item.body, 100);
  return (
    <div
      onClick={() => item.body && setOpen(!open)}
      style={{
        background: T.surface,
        border: `1px solid ${open ? `${accent}50` : T.border}`,
        borderRadius: 14, padding: "14px 16px",
        cursor: item.body ? "pointer" : "default",
        boxShadow: open ? `0 4px 20px ${accent}15` : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, marginTop: 5, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, lineHeight: 1.35, wordBreak: "break-word" }}>{item.label}</span>
            {item.body && (
              <span style={{ fontSize: 10, color: T.textFaint, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
            )}
          </div>
          {preview && !open && <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>}
        </div>
      </div>
      {open && item.body && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.7, paddingTop: 10, borderTop: `1px solid ${T.border}`, paddingLeft: 16 }}>
          {item.body}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IX — SAFETY SIGNAL BANNER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SIGNAL_STYLES: Record<SafetySignal["level"], { bg: string; border: string; text: string; badge: string }> = {
  critical: { bg: "#FFF5F5", border: "#FCA5A5", text: T.red,   badge: "#DC262618" },
  caution : { bg: "#FFFBEB", border: "#FDE68A", text: T.amber, badge: "#D9770618" },
  info    : { bg: "#EFF6FF", border: "#BFDBFE", text: T.blue,  badge: "#0369A118" },
};

function SafetySignalBanner({ signal }: { signal: SafetySignal }) {
  const [open, setOpen] = useState(false);
  const s = SIGNAL_STYLES[signal.level];
  return (
    <div
      onClick={() => signal.detail && setOpen(!open)}
      style={{
        background: s.bg, border: `1px solid ${s.border}`, borderRadius: 12,
        padding: "11px 14px", cursor: signal.detail ? "pointer" : "default",
        transition: "box-shadow 0.2s",
        boxShadow: open ? "0 4px 14px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ fontSize: 15, flexShrink: 0 }}>{signal.icon}</span>
        <span style={{ fontWeight: 700, fontSize: 12.5, color: s.text, flex: 1 }}>{signal.label}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: s.text, background: s.badge, padding: "2px 8px", borderRadius: 99, letterSpacing: "0.05em", flexShrink: 0 }}>
          {signal.level.toUpperCase()}
        </span>
        {signal.detail && (
          <span style={{ fontSize: 10, color: T.textFaint, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        )}
      </div>
      {open && signal.detail && (
        <p style={{ margin: "10px 0 0 24px", fontSize: 12.5, color: T.textMid, lineHeight: 1.65, borderTop: `1px solid ${s.border}`, paddingTop: 10 }}>{signal.detail}</p>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION X — TIMELINE + INGREDIENT COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PHASE_ICONS: Record<string, string>  = { immediate: "⚡", medium: "📈", longterm: "🔬" };
const PHASE_COLORS: Record<string, string> = { immediate: T.teal, medium: T.indigo, longterm: "#7C3AED" };

function TimelinePhaseCard({ phase, index, total }: { phase: TimelinePhase; index: number; total: number }) {
  const isLast = index === total - 1;
  const color  = PHASE_COLORS[phase.phase] || T.indigo;
  return (
    <div style={{ display: "flex", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
          {PHASE_ICONS[phase.phase]}
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 16, background: T.border, margin: "4px 0" }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1 }}>
        <div style={{ marginBottom: 7 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: T.textDark }}>{phase.label}</span>
          <span style={{ fontSize: 11.5, color: T.textFaint, marginLeft: 8 }}>{phase.sub}</span>
        </div>
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "11px 14px", display: "flex", flexDirection: "column", gap: 7 }}>
          {phase.outcomes.map((o, i) => (
            <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, color: T.textMid, lineHeight: 1.55 }}>
              <span style={{ color, marginTop: 2, flexShrink: 0 }}>›</span>
              <span>{o}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const RISK_LABELS = ["", "Safe", "Low Risk", "Moderate", "Caution", "High Risk"];
const RISK_COLORS = ["", T.mint, "#84CC16", T.amber, "#F97316", T.red];

function IngredientGroup({ group, items, color }: { group: string; items: Ingredient[]; color: ColorSet }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          background: color.bg, border: `1px solid ${color.border}`,
          borderRadius: 11, padding: "9px 13px", cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: color.dot }} />
          <span style={{ fontWeight: 700, fontSize: 12.5, color: color.text }}>{group}</span>
          <span style={{ fontSize: 11.5, color: T.textFaint }}>({items.length})</span>
        </div>
        <span style={{ fontSize: 10, color: T.textFaint, display: "inline-block", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </button>
      {open && (
        <div style={{ marginTop: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          {items.map((ing, i) => (
            <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9, padding: "10px 13px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, color: T.textDark, wordBreak: "break-word" }}>{ing.name}</div>
                <div style={{ fontSize: 11.5, color: T.textFaint, marginTop: 2 }}>{ing.purpose}</div>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 700, color: RISK_COLORS[ing.riskLevel], background: `${RISK_COLORS[ing.riskLevel]}18`, padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap", flexShrink: 0 }}>
                {RISK_LABELS[ing.riskLevel]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XI — EXECUTIVE METRIC CHIP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BodyMetricChip({ metric }: { metric: BodyMetric }) {
  return (
    <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 14 }}>{metric.icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: metric.color }}>{metric.value}</div>
        <div style={{ fontSize: 9.5, color: T.textFaint, fontWeight: 600, letterSpacing: "0.03em", marginTop: 1 }}>{metric.label.toUpperCase().slice(0, 20)}</div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XII — GENERIC SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GenericSection({ lines }: { lines: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return null;
        if (/^#{2,4}\s/.test(t)) return (
          <div key={i} style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, marginTop: 10, marginBottom: 2 }}>{cleanBullet(t)}</div>
        );
        const isBullet = /^[-•*]/.test(t);
        return (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, color: T.textMid, lineHeight: 1.65 }}>
            {isBullet && <span style={{ color: T.teal, flexShrink: 0, marginTop: 2 }}>›</span>}
            <span>{cleanBullet(t)}</span>
          </div>
        );
      })}
    </div>
  );
}

const mdComponents = {
  h1: ({ children }: any) => <h1 style={{ fontSize: 17, fontWeight: 800, color: T.textDark, marginBottom: 10, marginTop: 0 }}>{children}</h1>,
  h2: ({ children }: any) => <h2 style={{ fontSize: 14, fontWeight: 700, color: T.textDark, marginBottom: 6, marginTop: 14 }}>{children}</h2>,
  h3: ({ children }: any) => <h3 style={{ fontSize: 13, fontWeight: 700, color: T.teal, marginBottom: 4, marginTop: 10 }}>{children}</h3>,
  p:  ({ children }: any) => <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.78, margin: "0 0 8px" }}>{children}</p>,
  li: ({ children }: any) => <li style={{ fontSize: 13, color: T.textMid, lineHeight: 1.65, marginBottom: 4, paddingLeft: 4 }}>{children}</li>,
  ul: ({ children }: any) => <ul style={{ margin: "6px 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 2 }}>{children}</ul>,
  strong: ({ children }: any) => <strong style={{ fontWeight: 700, color: T.textDark }}>{children}</strong>,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XIII — HEADER + TABS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HeaderBar({ mode }: { mode: ProductMode }) {
  const meta = MODE_META[mode];
  return (
    <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "13px 22px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, background: meta.gradient, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
        {meta.icon}
      </div>
      <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.08em", color: T.teal }}>{BC_BRAND}</span>
      <span style={{ fontSize: 12, color: T.borderMid, margin: "0 4px" }}>·</span>
      <span style={{ fontSize: 12, color: T.textFaint, fontWeight: 500 }}>{BC_TITLE}</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: T.textFaint, background: T.surfaceAlt, padding: "4px 12px", borderRadius: 99, border: `1px solid ${T.border}` }}>
          {meta.systemLabel}
        </span>
      </div>
    </div>
  );
}

function SubtitleBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 16px", background: T.tealLight, borderBottom: `1px solid #A7F3D0` }}>
      <span style={{ fontSize: 12, color: T.teal, flexShrink: 0 }}>✦</span>
      <span style={{ fontSize: 11.5, color: T.teal, fontWeight: 500, letterSpacing: "0.01em" }}>{BC_SUBTITLE}</span>
    </div>
  );
}

function TabBar({ tabs, activeTab, onTabChange }: { tabs: Tab[]; activeTab: number; onTabChange: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", marginLeft: -22, marginRight: -22, paddingLeft: 22, borderTop: `1px solid ${T.border}` }}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(i)}
          style={{
            background: "none", border: "none",
            borderBottom: activeTab === i ? `2.5px solid ${T.teal}` : "2.5px solid transparent",
            padding: "11px 18px", fontSize: 12.5,
            fontWeight: activeTab === i ? 700 : 500,
            color: activeTab === i ? T.teal : T.textFaint,
            cursor: "pointer", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s",
          }}
        >
          <span style={{ fontSize: 12 }}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XIV — TAB CONTENT PANELS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoresPanel({ coreScores, specScores, mode }: { coreScores: ScoreItem[]; specScores: ScoreItem[]; mode: ProductMode }) {
  const meta = MODE_META[mode];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {coreScores.length > 0 && (
        <SectionCard title="Core Performance Scores" icon="📊">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {coreScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      {specScores.length > 0 && (
        <SectionCard title={meta.systemLabel} icon="🧪">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {specScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function InsightsPanel({ strengths, weaknesses }: { strengths: string[]; weaknesses: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
      {strengths.length > 0 && (
        <SectionCard title="Structural Strengths" icon="✓" accent={T.green}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {strengths.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#F0FDF4", border: `1px solid ${T.greenLight}`, borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ color: T.mint, fontWeight: 800, flexShrink: 0, marginTop: 1, fontSize: 14 }}>+</span>
                <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {weaknesses.length > 0 && (
        <SectionCard title="Structural Concerns" icon="−" accent={T.red}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {weaknesses.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "#FFF5F5", border: `1px solid ${T.redLight}`, borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ color: T.red, fontWeight: 800, flexShrink: 0, marginTop: 1, fontSize: 14 }}>−</span>
                <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function CompatibilityPanel({ skinItems, zoneItems, mode }: {
  skinItems: CompatItem[]; zoneItems: CompatItem[]; mode: ProductMode;
}) {
  const isPowder = mode === "powder";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {skinItems.length > 0 && (
        <SectionCard title="Skin Type Compatibility" icon="👤">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
            {skinItems.map((item, i) => <CompatCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      {isPowder && zoneItems.length > 0 && (
        <SectionCard title="Zone Suitability" icon="🗺️" accent={T.amber}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
            {zoneItems.map((item, i) => <CompatCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "12px 16px", background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.mint }} />
          <span style={{ fontSize: 11.5, color: T.textMid }}>Compatible (≥3.0)</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.red }} />
          <span style={{ fontSize: 11.5, color: T.textMid }}>Use with caution (&lt;3.0)</span>
        </div>
        <span style={{ fontSize: 11.5, color: T.textFaint, marginLeft: "auto" }}>Tap any card for detail</span>
      </div>
    </div>
  );
}

function LongTermPanel({ ltUsability, timeline }: { ltUsability: CompatItem[]; timeline: TimelinePhase[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ltUsability.length > 0 && (
        <SectionCard title="Repeated-Use Sustainability" icon="📅">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 9 }}>
            {ltUsability.map((item, i) => <CompatCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      {timeline.length > 0 && (
        <SectionCard title="Expected Real-World Results" icon="⏱">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {timeline.map((phase, i) => (
              <TimelinePhaseCard key={phase.phase} phase={phase} index={i} total={timeline.length} />
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function IngredientsPanel({ ingGroups }: { ingGroups: Record<string, Ingredient[]> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Key Structural Ingredients" icon="🔬">
        {Object.entries(ingGroups).map(([group, items]) => (
          <IngredientGroup key={group} group={group} items={items} color={items[0]?.color || ING_COLORS.Other} />
        ))}
      </SectionCard>
      <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 16px" }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textFaint, letterSpacing: "0.07em", marginBottom: 8 }}>RISK CLASSIFICATION</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {RISK_LABELS.slice(1).map((label, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: RISK_COLORS[i + 1], background: `${RISK_COLORS[i + 1]}18`, padding: "3px 10px", borderRadius: 99 }}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SafetyPanel({ signals, mode }: { signals: SafetySignal[]; mode: ProductMode }) {
  const meta = MODE_META[mode];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Body Care Safety Signals" icon="⚠️" accent={T.amber}>
        {signals.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {signals.map((sig, i) => <SafetySignalBanner key={i} signal={sig} />)}
          </div>
        ) : (
          <div style={{ padding: "18px 0", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 13, color: T.textFaint }}>No critical safety signals detected for this formulation type.</div>
          </div>
        )}
      </SectionCard>
      <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 16px" }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textFaint, letterSpacing: "0.07em", marginBottom: 8 }}>SIGNAL LEVELS</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(["critical", "caution", "info"] as const).map((level) => {
            const s = SIGNAL_STYLES[level];
            return <span key={level} style={{ fontSize: 11, fontWeight: 700, color: s.text, background: s.badge, padding: "3px 10px", borderRadius: 99 }}>{level.toUpperCase()}</span>;
          })}
        </div>
      </div>
    </div>
  );
}

function SciencePanel({ whyText, whyLines, finalRating, maxRating, ratingSubtitle, rLabel, gradient }: {
  whyText: string; whyLines: string[]; finalRating: number; maxRating: number; ratingSubtitle: string; rLabel: string; gradient: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {whyText ? (
        <SectionCard title="Why This Rating" icon="🧠">
          <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>
            <ReactMarkdown components={mdComponents}>{whyText}</ReactMarkdown>
          </div>
        </SectionCard>
      ) : whyLines.length > 0 ? (
        <SectionCard title="Why This Rating" icon="🧠">
          <GenericSection lines={whyLines} />
        </SectionCard>
      ) : null}
      <div style={{ background: gradient, borderRadius: 18, padding: "22px 24px", color: "#FFF", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.65, marginBottom: 5 }}>FINAL VERDICT</div>
          <div style={{ fontWeight: 900, fontSize: 48, letterSpacing: "-1.5px", lineHeight: 1 }}>{finalRating.toFixed(1)}</div>
          <div style={{ fontSize: 12, opacity: 0.65, marginTop: 3 }}>/ {maxRating} · {rLabel}</div>
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <Stars score={finalRating} max={maxRating} />
          {ratingSubtitle && <div style={{ fontSize: 12.5, opacity: 0.8, lineHeight: 1.55, marginTop: 8 }}>{ratingSubtitle}</div>}
        </div>
      </div>
    </div>
  );
}

function NaturalEvidencePanel({ truthItems, herbalItems }: { truthItems: EvidenceItem[]; herbalItems: EvidenceItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {truthItems.length > 0 && (
        <SectionCard title="Truth About Natural Claims" icon="🌿" accent={T.teal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {truthItems.map((item, i) => <EvidenceCard key={i} item={item} accent={T.teal} />)}
          </div>
        </SectionCard>
      )}
      {herbalItems.length > 0 && (
        <SectionCard title="Herbal Evidence Assessment" icon="🧬" accent={T.violet}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {herbalItems.map((item, i) => <EvidenceCard key={i} item={item} accent={T.violet} />)}
          </div>
        </SectionCard>
      )}
      {truthItems.length === 0 && herbalItems.length === 0 && (
        <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌿</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Natural evidence data not present in this analysis.</div>
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XV — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface BodyCareProps { markdown: string; }

export default function BodyCare({ markdown }: BodyCareProps) {
  const [activeTab, setActiveTab] = useState(0);

  // ── Guard ──
  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, borderRadius: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🧴</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>No analysis data found</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Please provide a valid body care product analysis.</div>
        </div>
      </div>
    );
  }

  // ── Product mode detection ──
  const mode     = useMemo(() => detectProductMode(markdown), [markdown]);
  const meta     = MODE_META[mode];
  const gradient = meta.gradient;

  // ── Parse markdown ──
  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // ── Section extraction ──
  const { key: ratingKey }      = findSection(sections, ["final rating"]);
  const { lines: profileLines } = findSection(sections, [
    "lotion profile", "powder profile", "scrub profile", "product profile",
    "body cleanser profile", "cleanser profile", "profile"
  ]);
  const { lines: sqLines }      = findSection(sections, ["structural quality"]);
  const { lines: coreLines }    = findSection(sections, ["core scores"]);
  const { lines: specLines }    = findSection(sections, ["specialized performance"]);
  const { lines: insightLines } = findSection(sections, ["structural insight", "insight"]);

  // Compatibility — skin type
  const skinCompatMatches = findSections(sections, [
    "skin type compatibility", "skin type and zone compatibility",
    "skin type condition compatibility", "population compatibility",
    "body skin type compatibility", "compatibility"
  ]);
  const skinCompatLines = skinCompatMatches[0]?.lines ?? [];

  // Zone suitability (powder)
  const zoneCompatLines = useMemo(() => {
    if (mode !== "powder") return [];
    const zoneMatch = findSection(sections, ["zone suitability"]);
    if (zoneMatch.lines.length > 0) return zoneMatch.lines;
    // Fallback: look for zone sub-section within compat lines
    const idx = skinCompatLines.findIndex((l) => /zone suitability/i.test(l));
    return idx >= 0 ? skinCompatLines.slice(idx) : [];
  }, [sections, skinCompatLines, mode]);

  const { lines: ltLines }      = findSection(sections, ["long-term usability", "usage frequency safety", "repeated-use sustainability"]);
  const { lines: resultsLines } = findSection(sections, ["expected real-world results", "expected results"]);
  const { lines: ingLines }     = findSection(sections, ["key structural ingredients", "ingredients"]);
  const { lines: whyLines }     = findSection(sections, ["why this rating"]);

  // Natural / herbal
  const herbalMatch       = findSection(sections, ["herbal evidence assessment"]);
  const naturalTruthMatch = Array.from(sections.entries()).find(([key]) => {
    const n = norm(key);
    return n.includes("natural") && (n.includes("claim") || n.includes("truth"));
  });
  const truthLines  = naturalTruthMatch?.[1] ?? [];
  const herbalLines = herbalMatch.lines;
  const hasNatural  = truthLines.length > 0 || herbalLines.length > 0;

  // ── Extract rating ──
  const ratingLines = ratingKey ? (sections.get(ratingKey) || []) : [];
  const ratingText  = ratingKey ? [ratingKey, ...ratingLines].join(" ") : "";
  let finalRating = 0, maxRating = 5, ratingSubtitle = "";
  const rm = ratingText.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
  if (rm) { finalRating = Math.min(5, Math.max(0, parseFloat(rm[1]))); maxRating = parseInt(rm[2]); }
  const rmSub = ratingText.match(/\d+\.?\d*\s*\/\s*\d+\s*[—–\-]+\s*(.+)/);
  if (rmSub) ratingSubtitle = rmSub[1].trim();

  const rColor = scoreColor(finalRating, maxRating);
  const rLabel = scoreLabel(finalRating, maxRating);

  // ── Parse data ──
  const coreScores    = useMemo(() => parseScores(coreLines),           [coreLines]);
  const specScores    = useMemo(() => parseScores(specLines),            [specLines]);
  const skinCompat    = useMemo(() => parseCompatibility(skinCompatLines.filter((l) => {
    // Exclude lines after Zone Suitability heading in same block
    return !/zone suitability/i.test(l);
  })), [skinCompatLines]);
  const zoneCompat    = useMemo(() => parseCompatibility(zoneCompatLines), [zoneCompatLines]);
  const ltUsability   = useMemo(() => parseCompatibility(ltLines),          [ltLines]);
  const timeline      = useMemo(() => parseTimeline(resultsLines),           [resultsLines]);
  const ingredients   = useMemo(() => parseIngredients(ingLines),            [ingLines]);
  const { strengths, weaknesses } = useMemo(() => parseInsights(insightLines), [insightLines]);
  const truthItems    = useMemo(() => parseEvidenceItems(truthLines),    [truthLines]);
  const herbalItems   = useMemo(() => parseEvidenceItems(herbalLines),   [herbalLines]);

  // ── Safety signals ──
  const safetySignals = useMemo(() => detectSafetySignals(markdown, mode), [markdown, mode]);

  // ── Group ingredients ──
  const ingGroups = useMemo(() => {
    const groups: Record<string, Ingredient[]> = {};
    for (const ing of ingredients) {
      if (!groups[ing.group]) groups[ing.group] = [];
      groups[ing.group].push(ing);
    }
    return groups;
  }, [ingredients]);

  // ── Text extracts ──
  const allScores   = [...coreScores, ...specScores];
  const profileText = linesAsText(profileLines);
  const sqText      = linesAsText(sqLines);
  const whyText     = whyLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join("\n").trim();

  // ── Body metrics ──
  const bodyMetrics = useMemo(() => detectBodyMetrics(mode, allScores), [mode, allScores]);

  // ── Tab definition ──
  const TABS: Tab[] = [
    { id: "scores",        label: "Scores",          icon: "◎"  },
    { id: "insights",      label: "Insights",        icon: "⚡"  },
    { id: "compatibility", label: "Compatibility",   icon: "👤" },
    { id: "longterm",      label: "Long-Term",       icon: "📅" },
    { id: "ingredients",   label: "Ingredients",     icon: "🔬" },
    { id: "safety",        label: "Safety",          icon: "⚠️" },
    { id: "science",       label: "Science",         icon: "🧠" },
    { id: "natural",       label: "Natural Evidence", icon: "🌿" },
  ].filter((tab) => {
    if (tab.id === "scores")        return coreScores.length > 0 || specScores.length > 0;
    if (tab.id === "insights")      return strengths.length > 0 || weaknesses.length > 0;
    if (tab.id === "compatibility") return skinCompat.length > 0 || zoneCompat.length > 0;
    if (tab.id === "longterm")      return ltUsability.length > 0 || timeline.length > 0;
    if (tab.id === "ingredients")   return ingredients.length > 0;
    if (tab.id === "safety")        return safetySignals.length > 0;
    if (tab.id === "science")       return true;
    if (tab.id === "natural")       return hasNatural;
    return false;
  });

  const safeActiveTab = Math.min(activeTab, TABS.length - 1);
  const currentTabId  = TABS[safeActiveTab]?.id;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: T.bg, borderRadius: 24, overflow: "hidden", color: T.textDark }}>

      {/* ── HEADER ── */}
      <HeaderBar mode={mode} />
      <SubtitleBanner />

      {/* ── EXECUTIVE DASHBOARD ── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "22px 22px 0" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>

            {/* Left column */}
            <div>
              {/* Hero rating card */}
              <div style={{ background: gradient, borderRadius: 18, padding: "22px 24px", color: "#FFF", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 6 }}>{BC_HERO_LBL}</div>
                <div style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4 }}>
                  {finalRating.toFixed(1)}
                  <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.6, marginLeft: 4 }}>/ {maxRating}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: ratingSubtitle ? 4 : 0 }}>{rLabel}</div>
                {ratingSubtitle && <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginTop: 4 }}>{ratingSubtitle}</div>}
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12, flexWrap: "wrap" }}>
                  <Stars score={finalRating} max={maxRating} />
                  <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.75, background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 99 }}>
                    {meta.label}
                  </span>
                </div>
              </div>

              {/* Profile + structural quality */}
              {(profileText || sqText) && (
                <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                  {profileText && (
                    <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.7, marginBottom: sqText ? 8 : 0, whiteSpace: "pre-wrap" }}>
                      {profileText}
                    </p>
                  )}
                  {sqText && (
                    <p style={{ margin: 0, fontSize: 12.5, color: T.textFaint, lineHeight: 1.65, borderTop: profileText ? `1px solid ${T.border}` : "none", paddingTop: profileText ? 8 : 0, whiteSpace: "pre-wrap" }}>
                      {sqText}
                    </p>
                  )}
                </div>
              )}

              {/* Safety signal preview — if critical signals exist */}
              {safetySignals.filter((s) => s.level === "critical").length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  {safetySignals.filter((s) => s.level === "critical").slice(0, 2).map((sig, i) => (
                    <SafetySignalBanner key={i} signal={sig} />
                  ))}
                </div>
              )}

              {/* Strengths / Concerns preview */}
              {(strengths.length > 0 || weaknesses.length > 0) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                  {strengths.length > 0 && (
                    <div style={{ background: "#F0FDF4", border: `1px solid ${T.greenLight}`, borderRadius: 13, padding: "12px 14px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: T.green, marginBottom: 8, letterSpacing: "0.05em" }}>✓ KEY STRENGTHS</div>
                      {strengths.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: T.textMid, marginBottom: 5, lineHeight: 1.5 }}>
                          <span style={{ color: T.mint, fontWeight: 800, flexShrink: 0 }}>+</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {weaknesses.length > 0 && (
                    <div style={{ background: "#FFF5F5", border: `1px solid ${T.redLight}`, borderRadius: 13, padding: "12px 14px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: T.red, marginBottom: 8, letterSpacing: "0.05em" }}>− CONCERNS</div>
                      {weaknesses.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: T.textMid, marginBottom: 5, lineHeight: 1.5 }}>
                          <span style={{ color: T.red, fontWeight: 800, flexShrink: 0 }}>−</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right column — ring + body metric chips */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
              <RatingRing score={finalRating} max={maxRating} color={rColor} />
              {bodyMetrics.slice(0, 3).map((m, i) => (
                <BodyMetricChip key={i} metric={m} />
              ))}
            </div>
          </div>

          {/* ── TAB BAR ── */}
          <TabBar tabs={TABS} activeTab={safeActiveTab} onTabChange={(i) => setActiveTab(i)} />
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "22px 22px" }}>

        {currentTabId === "scores" && (
          <ScoresPanel coreScores={coreScores} specScores={specScores} mode={mode} />
        )}

        {currentTabId === "insights" && (
          <InsightsPanel strengths={strengths} weaknesses={weaknesses} />
        )}

        {currentTabId === "compatibility" && (
          <CompatibilityPanel skinItems={skinCompat} zoneItems={zoneCompat} mode={mode} />
        )}

        {currentTabId === "longterm" && (
          <LongTermPanel ltUsability={ltUsability} timeline={timeline} />
        )}

        {currentTabId === "ingredients" && (
          <IngredientsPanel ingGroups={ingGroups} />
        )}

        {currentTabId === "safety" && (
          <SafetyPanel signals={safetySignals} mode={mode} />
        )}

        {currentTabId === "science" && (
          <SciencePanel
            whyText={whyText}
            whyLines={whyLines}
            finalRating={finalRating}
            maxRating={maxRating}
            ratingSubtitle={ratingSubtitle}
            rLabel={rLabel}
            gradient={gradient}
          />
        )}

        {currentTabId === "natural" && (
          <NaturalEvidencePanel truthItems={truthItems} herbalItems={herbalItems} />
        )}

      </div>
    </div>
  );
}