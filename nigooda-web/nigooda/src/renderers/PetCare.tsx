import React, { useState, useRef, useMemo } from "react";

// ─── PETCARE METADATA ────────────────────────────────────────────────────────
const PC_BRAND    = "NIGOODA";
const PC_TITLE    = "Pet Care Intelligence";
const PC_BADGE    = "Veterinary Analysis";
const PC_HERO_LBL = "⭐ PETCARE ANALYSIS";
const PC_GUIDANCE = "Check species safety and compatibility scores";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ScoreItem      { label: string; score: number; maxScore: number; reason: string; }
interface CompatItem     { label: string; score: number; compatible: boolean; reason: string; isSafe?: boolean; }
interface Ingredient     { name: string; purpose: string; group: string; riskLevel: number; color: ColorSet; }
interface TimelinePhase  { phase: string; label: string; sub: string; outcomes: string[]; }
interface ColorSet       { bg: string; dot: string; text: string; border: string; }
interface EvidenceItem   { label: string; body: string; }
interface Tab            { id: string; label: string; icon: string; }
interface WarningItem    { type: string; species: string; message: string; severity: "critical" | "high" | "moderate"; }
interface SpeciesCard    { species: string; score: number; reason: string; safe: boolean | null; icon: string; }
interface TrackData      { id: "A" | "B"; label: string; rating: number; scores: ScoreItem[]; }

// ─── PET PRODUCT TYPE DETECTION ──────────────────────────────────────────────
type PetProductType =
  | "dental_gel" | "shampoo" | "soap" | "flea_treatment"
  | "deodorant" | "grooming_spray" | "generic";

function detectPetProductType(md: string): PetProductType {
  const lower = md.toLowerCase();
  if (/dental gel|dental paste|dental foam|dental spray|oral gel|teeth gel/i.test(lower))       return "dental_gel";
  if (/tick.*flea|flea.*tick|parasite|permethrin|isoxazoline|pyrethroid|spot.on/i.test(lower))  return "flea_treatment";
  if (/grooming spray|coat spray|detangling spray|conditioning spray/i.test(lower))             return "grooming_spray";
  if (/pet soap|soap profile|saponified|syndet bar/i.test(lower))                               return "soap";
  if (/pet shampoo|shampoo profile|surfactant|bathing/i.test(lower))                            return "shampoo";
  if (/pet deodorant|deodorant profile|odor control|zinc ricinoleate/i.test(lower))             return "deodorant";
  return "generic";
}

const PRODUCT_ICONS: Record<PetProductType, string> = {
  dental_gel    : "🦷",
  shampoo       : "🐾",
  soap          : "🧼",
  flea_treatment: "🪲",
  deodorant     : "💨",
  grooming_spray: "✨",
  generic       : "🐶",
};

const PRODUCT_GRADIENT: Record<PetProductType, string> = {
  dental_gel    : "linear-gradient(135deg, #0D9488 0%, #0891B2 100%)",
  shampoo       : "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  soap          : "linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)",
  flea_treatment: "linear-gradient(135deg, #DC2626 0%, #92400E 100%)",
  deodorant     : "linear-gradient(135deg, #0891B2 0%, #059669 100%)",
  grooming_spray: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
  generic       : "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
};

// ─── WARNING TAXONOMY ─────────────────────────────────────────────────────────
interface WarningDef { type: string; species: string; severity: "critical" | "high" | "moderate"; icon: string; color: string; bgColor: string; borderColor: string; }

const WARNING_DEFS: Record<string, WarningDef> = {
  "CAT TOXICITY":          { type: "CAT TOXICITY WARNING",        species: "Cats",        severity: "critical", icon: "🐱", color: "#9B1C1C", bgColor: "#FEF2F2", borderColor: "#FECACA" },
  "BIRD INHALATION":       { type: "BIRD INHALATION WARNING",     species: "Birds",       severity: "critical", icon: "🦜", color: "#92400E", bgColor: "#FFFBEB", borderColor: "#FDE68A" },
  "PERMETHRIN":            { type: "PERMETHRIN WARNING",          species: "Cats",        severity: "critical", icon: "⚠️", color: "#9B1C1C", bgColor: "#FEF2F2", borderColor: "#FECACA" },
  "FLUORIDE DISQUALIFIC":  { type: "FLUORIDE DISQUALIFICATION",   species: "All Pets",    severity: "critical", icon: "🚫", color: "#9B1C1C", bgColor: "#FEF2F2", borderColor: "#FECACA" },
  "XYLITOL DISQUALIFIC":   { type: "XYLITOL DISQUALIFICATION",    species: "Dogs/Cats",   severity: "critical", icon: "🚫", color: "#9B1C1C", bgColor: "#FEF2F2", borderColor: "#FECACA" },
  "GROOMING INGESTION":    { type: "GROOMING INGESTION RISK",     species: "Cats",        severity: "high",     icon: "🐾", color: "#92400E", bgColor: "#FFFBEB", borderColor: "#FDE68A" },
  "SMALL ANIMAL RESPIRAT": { type: "SMALL ANIMAL RESPIRATORY",    species: "Rabbits/GP",  severity: "high",     icon: "🐇", color: "#6B21A8", bgColor: "#FAF5FF", borderColor: "#DDD6FE" },
  "FLAMMABILITY":          { type: "FLAMMABILITY WARNING",        species: "Handlers",    severity: "high",     icon: "🔥", color: "#92400E", bgColor: "#FFFBEB", borderColor: "#FDE68A" },
  "MDR1 SENSITIVITY":      { type: "MDR1 SENSITIVITY PRECAUTION", species: "Herding Breeds", severity: "moderate", icon: "🧬", color: "#1E40AF", bgColor: "#EFF6FF", borderColor: "#BFDBFE" },
  "ORGANOPHOSPHATE":       { type: "ORGANOPHOSPHATE WARNING",     species: "All Pets",    severity: "critical", icon: "☠️", color: "#9B1C1C", bgColor: "#FEF2F2", borderColor: "#FECACA" },
  "DISQUALIFICATION":      { type: "DISQUALIFICATION NOTICE",     species: "All Pets",    severity: "critical", icon: "🚫", color: "#9B1C1C", bgColor: "#FEF2F2", borderColor: "#FECACA" },
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  teal        : "#0D9488",
  tealLight   : "#CCFBF1",
  tealMid     : "#5EEAD4",
  indigo      : "#2563EB",
  indigoLight : "#1D4ED8",
  indigoPale  : "#DBEAFE",
  indigoMid   : "#BFDBFE",
  mint        : "#10B981",
  mintLight   : "#D1FAE5",
  amber       : "#F59E0B",
  amberLight  : "#FEF3C7",
  red         : "#DC2626",
  redLight    : "#FEE2E2",
  green       : "#16A34A",
  greenLight  : "#DCFCE7",
  pink        : "#EC4899",
  pinkLight   : "#FCE7F3",
  violet      : "#7C3AED",
  violetLight : "#EDE9FE",
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

function norm(s: string): string {
  return s
    .toUpperCase()
    .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]+/gu, "")
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findSection(sections: Map<string, string[]>, keywords: string[]): { key: string | null; lines: string[] } {
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) return { key, lines };
  }
  return { key: null, lines: [] };
}

function findSections(sections: Map<string, string[]>, keywords: string[]): Array<{ key: string; lines: string[] }> {
  const results: Array<{ key: string; lines: string[] }> = [];
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) results.push({ key, lines });
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
      // Detect explicit "NOT SAFE" or "AGE RESTRICTION" text
      const notSafe = /NOT\s+SAFE|UNSAFE|DISQUALIF/i.test(t);
      current = {
        label    : cleanBullet(m[1]).trim(),
        score,
        compatible: !notSafe && score >= 2.5,
        isSafe   : notSafe ? false : undefined,
        reason   : remaining || "",
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
    { phase: "longterm",  label: "Long-Term",   sub: "Months of Regular Use", outcomes: [] },
  ];
  let cur: TimelinePhase | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const isBullet  = /^[-•*]/.test(t);
    const isHeading = /^#{1,4}\s/.test(t);
    if (/immediate/i.test(t)    && (isHeading || !isBullet)) { cur = phases[0]; continue; }
    if (/medium.?term/i.test(t) && (isHeading || !isBullet)) { cur = phases[1]; continue; }
    if (/long.?term/i.test(t)   && (isHeading || !isBullet)) { cur = phases[2]; continue; }
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
      // skip
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

// Parse warnings from mandatory warning section
function parseWarnings(md: string, sections: Map<string, string[]>): WarningItem[] {
  const warnings: WarningItem[] = [];
  const seen = new Set<string>();

  // Check dedicated warning section
  const warnMatch = findSection(sections, ["MANDATORY WARNING", "SPECIES AND FORMAT", "DISQUALIFICATION"]);
  const warnText = [warnMatch.key || "", ...warnMatch.lines].join(" ").toUpperCase();

  // Also scan full markdown for warning patterns
  const fullUpper = md.toUpperCase();

  for (const [key, def] of Object.entries(WARNING_DEFS)) {
    const triggers = [
      key,
      def.type.toUpperCase(),
    ];
    const hit = triggers.some((t) => fullUpper.includes(t));
    if (hit && !seen.has(key)) {
      seen.add(key);
      // Extract context sentence
      const idx = fullUpper.indexOf(key);
      const snippet = idx > -1
        ? md.substring(Math.max(0, idx - 20), Math.min(md.length, idx + 200))
            .replace(/[#*_]/g, "").trim()
        : "";
      warnings.push({ type: def.type, species: def.species, message: snippet || def.type, severity: def.severity });
    }
  }

  return warnings;
}

// Detect track system
function parseTracks(sections: Map<string, string[]>): TrackData[] {
  const tracks: TrackData[] = [];
  const trackAMatch = findSection(sections, ["TRACK A", "COAT CARE ANALYSIS"]);
  const trackBMatch = findSection(sections, ["TRACK B", "DEODORIZING ANALYSIS"]);

  // Also check final rating for dual track
  const { lines: ratingLines, key: ratingKey } = findSection(sections, ["FINAL RATING"]);
  const ratingText = [ratingKey || "", ...ratingLines].join(" ");
  const dualM = ratingText.match(/TRACK\s+A[:\s]+([0-9.]+).*?TRACK\s+B[:\s]+([0-9.]+)/i)
    || ratingText.match(/COAT CARE[:\s]+([0-9.]+).*?DEODORI[ZS]ING[:\s]+([0-9.]+)/i);

  if (dualM) {
    if (trackAMatch.lines.length > 0)
      tracks.push({ id: "A", label: "Coat Care", rating: parseFloat(dualM[1]), scores: parseScores(trackAMatch.lines) });
    if (trackBMatch.lines.length > 0)
      tracks.push({ id: "B", label: "Deodorizing", rating: parseFloat(dualM[2]), scores: parseScores(trackBMatch.lines) });
  } else if (trackAMatch.lines.length > 0 || trackBMatch.lines.length > 0) {
    if (trackAMatch.lines.length > 0)
      tracks.push({ id: "A", label: "Coat Care", rating: 0, scores: parseScores(trackAMatch.lines) });
    if (trackBMatch.lines.length > 0)
      tracks.push({ id: "B", label: "Deodorizing", rating: 0, scores: parseScores(trackBMatch.lines) });
  }
  return tracks;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION III — INGREDIENT SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ING_GROUPS: Record<string, string[]> = {
  Enzymes         : ["lipase", "protease", "amylase", "glucose oxidase", "lactoperoxidase", "lysozyme", "papain", "bromelain"],
  Antimicrobials  : ["chlorhexidine", "cpc", "cetylpyridinium", "zinc gluconate", "zinc chloride", "triclosan", "benzalkonium", "bkc", "octenidine"],
  Actives         : ["fluoride", "xylitol", "permethrin", "pyrethrin", "isoxazoline", "imidacloprid", "fipronil", "fluralaner", "sarolaner", "sulfur", "zinc pyrithione", "selenium sulfide"],
  Humectants      : ["glycerin", "glycerol", "sorbitol", "propylene glycol", "butylene glycol"],
  Emollients      : ["dimethicone", "shea", "jojoba", "aloe vera", "squalane", "lanolin", "coconut oil", "argan"],
  Surfactants     : ["sodium lauryl", "sls", "sodium laureth", "sles", "cocamidopropyl", "coco glucoside", "decyl glucoside", "betaine", "cocoyl"],
  Fragrances      : ["fragrance", "parfum", "essential oil", "tea tree", "lavender", "eucalyptus", "peppermint", "citronella", "cedar", "neem"],
  Preservatives   : ["phenoxyethanol", "paraben", "methylisothiazolinone", "mi", "mci", "benzoate", "sorbate", "ethylhexylglycerin"],
  Conditioners    : ["panthenol", "niacinamide", "allantoin", "ceramide", "hydrolyzed protein", "silk", "vitamin e", "tocopherol", "d-panthenol"],
  FlavorsBuffers  : ["beef", "chicken", "bacon", "malt", "vanilla", "citric acid", "sodium bicarbonate", "carbopol"],
};

const ING_COLORS: Record<string, ColorSet> = {
  Enzymes        : { bg:"#F0FDF4", dot:"#22C55E", text:"#14532D", border:"#DCFCE7" },
  Antimicrobials : { bg:"#FFF7ED", dot:"#F97316", text:"#7C2D12", border:"#FED7AA" },
  Actives        : { bg:"#FEF2F2", dot:"#EF4444", text:"#7F1D1D", border:"#FECACA" },
  Humectants     : { bg:"#F0F9FF", dot:"#0EA5E9", text:"#0C4A6E", border:"#BAE6FD" },
  Emollients     : { bg:"#FDF4FF", dot:"#A855F7", text:"#581C87", border:"#E9D5FF" },
  Surfactants    : { bg:"#F0FDF4", dot:"#16A34A", text:"#14532D", border:"#DCFCE7" },
  Fragrances     : { bg:"#FFF1F2", dot:"#F43F5E", text:"#881337", border:"#FECDD3" },
  Preservatives  : { bg:"#F8FAFC", dot:"#94A3B8", text:"#334155", border:"#E2E8F0" },
  Conditioners   : { bg:"#ECFDF5", dot:"#10B981", text:"#064E3B", border:"#A7F3D0" },
  FlavorsBuffers : { bg:"#FFFBEB", dot:"#D97706", text:"#78350F", border:"#FDE68A" },
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
  if (/fluoride|xylitol|permethrin|pyrethrin|organophosphate/.test(lower)) return 5;
  if (/tea tree|methylisothiazolinone|triclosan|benzalkonium/.test(lower))  return 4;
  if (/fragrance|parfum|essential oil|propylene glycol|paraben/.test(lower)) return 3;
  if (/sls|sodium lauryl|chlorhexidine|zinc chloride/.test(lower))           return 2;
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
// SECTION IV — SCORE UTILITIES
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
// SECTION V — PET METRIC SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface PetMetric { label: string; value: string; color: string; icon: string; }

function detectPetMetrics(productType: PetProductType, scores: ScoreItem[]): PetMetric[] {
  const metrics: PetMetric[] = [];
  const findScore = (kw: string) =>
    scores.find((s) => s.label.toUpperCase().includes(kw.toUpperCase()))?.score;

  const safetyScore = findScore("SAFETY");
  if (safetyScore !== undefined)
    metrics.push({ label: "Species Safety", value: `${safetyScore.toFixed(1)}/5`, color: scoreColor(safetyScore), icon: "🛡️" });

  if (productType === "dental_gel") {
    const microScore = findScore("ORAL MICROBIOME") ?? findScore("MICROBIOME");
    if (microScore !== undefined)
      metrics.push({ label: "Oral Microbiome", value: `${microScore.toFixed(1)}/5`, color: scoreColor(microScore), icon: "🦠" });
    const ingestionScore = findScore("INGESTION");
    if (ingestionScore !== undefined)
      metrics.push({ label: "Ingestion Safety", value: `${ingestionScore.toFixed(1)}/5`, color: scoreColor(ingestionScore), icon: "🦷" });
  }

  if (productType === "flea_treatment") {
    const killScore = findScore("KILL EFFICACY") ?? findScore("PARASITE KILL");
    if (killScore !== undefined)
      metrics.push({ label: "Kill Efficacy", value: `${killScore.toFixed(1)}/5`, color: scoreColor(killScore), icon: "🪲" });
    const handlerScore = findScore("HANDLER");
    if (handlerScore !== undefined)
      metrics.push({ label: "Handler Safety", value: `${handlerScore.toFixed(1)}/5`, color: scoreColor(handlerScore), icon: "👤" });
  }

  if (productType === "shampoo" || productType === "soap") {
    const barrierScore = findScore("BARRIER");
    if (barrierScore !== undefined)
      metrics.push({ label: "Barrier Safety", value: `${barrierScore.toFixed(1)}/5`, color: scoreColor(barrierScore), icon: "🛡️" });
    const microScore = findScore("MICROBIOME");
    if (microScore !== undefined)
      metrics.push({ label: "Microbiome", value: `${microScore.toFixed(1)}/5`, color: scoreColor(microScore), icon: "🦠" });
  }

  if (productType === "deodorant" || productType === "grooming_spray") {
    const lickScore = findScore("LICKING") ?? findScore("INGESTION");
    if (lickScore !== undefined)
      metrics.push({ label: "Licking Safety", value: `${lickScore.toFixed(1)}/5`, color: scoreColor(lickScore), icon: "👅" });
    const inhalScore = findScore("INHALATION");
    if (inhalScore !== undefined)
      metrics.push({ label: "Inhalation Safety", value: `${inhalScore.toFixed(1)}/5`, color: scoreColor(inhalScore), icon: "💨" });
  }

  return metrics.slice(0, 3);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VI — PRIMITIVE COMPONENTS
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
// SECTION VII — CARD COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SectionCard({ title, icon, accent, children }: {
  title?: string; icon?: string; accent?: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${accent ? `${accent}40` : T.border}`,
      borderRadius: 18, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
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
        background: T.surface, border: `1px solid ${open ? T.indigoMid : T.border}`,
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
          {preview && !open && (
            <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>
          )}
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

function SpeciesCompatCard({ item }: { item: CompatItem }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score, 5);
  const preview = previewText(item.reason, 88);

  // Visual tone: safe = green, unsafe/critical = red, moderate = amber
  const isExplicitlyUnsafe = item.isSafe === false;
  const c = isExplicitlyUnsafe
    ? { border: T.redLight,   bg: "#FEF2F2", dot: T.red  }
    : item.compatible
      ? { border: T.greenLight, bg: "#F0FDF4", dot: T.mint }
      : { border: T.amberLight, bg: "#FFFBEB", dot: T.amber };

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background: c.bg, border: `1px solid ${open ? (item.compatible && !isExplicitlyUnsafe ? "#86EFAC" : "#FCA5A5") : c.border}`,
        borderRadius: 14, padding: "13px 15px",
        cursor: item.reason ? "pointer" : "default",
        boxShadow: open ? "0 4px 16px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.03)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: c.dot, marginTop: 5, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, wordBreak: "break-word", lineHeight: 1.4 }}>{item.label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {isExplicitlyUnsafe
            ? <span style={{ fontSize: 10, fontWeight: 800, color: T.red, background: `${T.red}15`, padding: "1px 8px", borderRadius: 99 }}>NOT SAFE</span>
            : <>
                <span style={{ fontWeight: 800, fontSize: 13, color }}>{item.score.toFixed(1)}</span>
                <span style={{ fontSize: 10, color: T.textFaint }}>/5</span>
              </>
          }
          {item.reason && (
            <span style={{ fontSize: 10, color: T.textFaint, marginLeft: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
          )}
        </div>
      </div>
      {!isExplicitlyUnsafe && <ScoreBar score={item.score} max={5} />}
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
        background: T.surface, border: `1px solid ${open ? `${accent}50` : T.border}`,
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
// SECTION VIII — WARNING SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WarningBanner({ warning }: { warning: WarningItem }) {
  const [expanded, setExpanded] = useState(false);

  // Find matching def
  const defKey = Object.keys(WARNING_DEFS).find((k) => warning.type.toUpperCase().includes(k));
  const def = defKey ? WARNING_DEFS[defKey] : {
    icon: "⚠️", color: "#92400E", bgColor: "#FFFBEB", borderColor: "#FDE68A", severity: warning.severity,
  } as WarningDef;

  const severityLabel: Record<string, string> = { critical: "CRITICAL", high: "HIGH RISK", moderate: "CAUTION" };
  const severityColor: Record<string, string> = { critical: T.red, high: "#F97316", moderate: T.amber };
  const sColor = severityColor[warning.severity] || T.amber;

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: (def as any).bgColor || "#FFFBEB",
        border: `1.5px solid ${(def as any).borderColor || "#FDE68A"}`,
        borderRadius: 14, padding: "13px 16px",
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        boxShadow: expanded ? "0 4px 16px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>{(def as any).icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 800, fontSize: 12, color: (def as any).color || T.red, letterSpacing: "0.04em" }}>{warning.type}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: sColor, background: `${sColor}18`, padding: "1px 8px", borderRadius: 99, letterSpacing: "0.06em" }}>
              {severityLabel[warning.severity] || "WARNING"}
            </span>
          </div>
          <div style={{ fontSize: 11.5, color: T.textMuted }}>
            Affects: <strong style={{ color: T.textDark }}>{warning.species}</strong>
          </div>
        </div>
        <span style={{ fontSize: 10, color: T.textFaint, flexShrink: 0, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
      </div>
      {expanded && warning.message && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${(def as any).borderColor || "#FDE68A"}`, fontSize: 12.5, color: T.textMid, lineHeight: 1.65 }}>
          {warning.message.slice(0, 400)}
        </div>
      )}
    </div>
  );
}

function WarningsPanel({ warnings }: { warnings: WarningItem[] }) {
  const critical = warnings.filter((w) => w.severity === "critical");
  const high     = warnings.filter((w) => w.severity === "high");
  const moderate = warnings.filter((w) => w.severity === "moderate");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {critical.length > 0 && (
        <SectionCard title="Critical Safety Flags" icon="🚨" accent={T.red}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {critical.map((w, i) => <WarningBanner key={i} warning={w} />)}
          </div>
        </SectionCard>
      )}
      {high.length > 0 && (
        <SectionCard title="High-Risk Alerts" icon="⚠️" accent={T.amber}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {high.map((w, i) => <WarningBanner key={i} warning={w} />)}
          </div>
        </SectionCard>
      )}
      {moderate.length > 0 && (
        <SectionCard title="Precautions" icon="🔶" accent="#F97316">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {moderate.map((w, i) => <WarningBanner key={i} warning={w} />)}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IX — TIMELINE + INGREDIENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PHASE_ICONS: Record<string, string>  = { immediate: "⚡", medium: "📈", longterm: "🔬" };
const PHASE_COLORS: Record<string, string> = { immediate: T.teal, medium: T.indigo, longterm: T.violet };

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
// SECTION X — GENERIC SECTION
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XI — HEADER COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HeaderBar({ productType }: { productType: PetProductType }) {
  const icon     = PRODUCT_ICONS[productType];
  const gradient = PRODUCT_GRADIENT[productType];
  return (
    <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "13px 22px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, background: gradient, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.08em", color: T.teal }}>{PC_BRAND}</span>
      <span style={{ fontSize: 12, color: T.borderMid, margin: "0 4px" }}>·</span>
      <span style={{ fontSize: 12, color: T.textFaint, fontWeight: 500 }}>{PC_TITLE}</span>
      <div style={{ marginLeft: "auto" }}>
        <span style={{ fontSize: 11, color: T.textFaint, background: T.surfaceAlt, padding: "4px 12px", borderRadius: 99, border: `1px solid ${T.border}` }}>{PC_BADGE}</span>
      </div>
    </div>
  );
}

function GuidanceBanner({ warnings }: { warnings: WarningItem[] }) {
  const criticalCount = warnings.filter((w) => w.severity === "critical").length;
  if (criticalCount > 0) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 22px", background: "#FEF2F2", borderBottom: `1px solid #FECACA` }}>
        <span style={{ fontSize: 13, flexShrink: 0 }}>🚨</span>
        <span style={{ fontSize: 11.5, color: T.red, fontWeight: 600, letterSpacing: "0.01em" }}>
          {criticalCount} critical species safety warning{criticalCount > 1 ? "s" : ""} detected — review Safety tab before use
        </span>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 22px", background: T.tealLight, borderBottom: `1px solid #A7F3D0` }}>
      <span style={{ fontSize: 12, color: T.teal, flexShrink: 0 }}>✦</span>
      <span style={{ fontSize: 11.5, color: T.teal, fontWeight: 500, letterSpacing: "0.01em" }}>{PC_GUIDANCE}</span>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XII — TAB BAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TabBar({ tabs, activeTab, onTabChange }: { tabs: Tab[]; activeTab: number; onTabChange: (i: number) => void }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", marginLeft: -22, marginRight: -22, paddingLeft: 22, borderTop: `1px solid ${T.border}` }}>
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
// SECTION XIII — TAB CONTENT PANELS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoresPanel({ coreScores, specScores, tracks }: { coreScores: ScoreItem[]; specScores: ScoreItem[]; tracks: TrackData[] }) {
  const [activeTrack, setActiveTrack] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {coreScores.length > 0 && (
        <SectionCard title="Core Performance Scores" icon="📊">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {coreScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      {tracks.length > 1 && (
        <SectionCard title="Dual-Track Analysis" icon="⚖️">
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {tracks.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActiveTrack(i)}
                style={{
                  padding: "7px 16px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                  border: `1.5px solid ${activeTrack === i ? T.teal : T.border}`,
                  background: activeTrack === i ? T.tealLight : T.surface,
                  color: activeTrack === i ? T.teal : T.textMuted,
                  cursor: "pointer",
                }}
              >
                Track {t.id}: {t.label} {t.rating > 0 && `(${t.rating.toFixed(1)})`}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {tracks[activeTrack]?.scores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      {specScores.length > 0 && (
        <SectionCard title="Specialized Performance" icon="🧪">
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
        <SectionCard title="Concerns" icon="−" accent={T.red}>
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

function SpeciesPanel({ speciesItems, coatItems, householdItems }: { speciesItems: CompatItem[]; coatItems: CompatItem[]; householdItems: CompatItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {speciesItems.length > 0 && (
        <SectionCard title="Species Compatibility" icon="🐾">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
            {speciesItems.map((item, i) => <SpeciesCompatCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      {coatItems.length > 0 && (
        <SectionCard title="Coat Type Compatibility" icon="✨">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
            {coatItems.map((item, i) => <SpeciesCompatCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      {householdItems.length > 0 && (
        <SectionCard title="Household Suitability" icon="🏠">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
            {householdItems.map((item, i) => <SpeciesCompatCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "12px 16px", background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12 }}>
        {[
          { dot: T.mint,  label: "Compatible (≥2.5)" },
          { dot: T.amber, label: "Use with caution" },
          { dot: T.red,   label: "Not safe / Restricted" },
        ].map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.dot }} />
            <span style={{ fontSize: 11.5, color: T.textMid }}>{l.label}</span>
          </div>
        ))}
        <span style={{ fontSize: 11.5, color: T.textFaint, marginLeft: "auto" }}>Tap any card for detail</span>
      </div>
    </div>
  );
}

function LongTermPanel({ ltUsability, timeline }: { ltUsability: CompatItem[]; timeline: TimelinePhase[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ltUsability.length > 0 && (
        <SectionCard title="Long-Term Usability" icon="📅">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 9 }}>
            {ltUsability.map((item, i) => <SpeciesCompatCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      {timeline.length > 0 && (
        <SectionCard title="Veterinary Results Timeline" icon="⏱">
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

function SciencePanel({ whyLines, finalRating, maxRating, ratingSubtitle, rLabel, gradient }: {
  whyLines: string[]; finalRating: number; maxRating: number; ratingSubtitle: string; rLabel: string; gradient: string;
}) {
  const whyText = whyLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join("\n").trim();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {whyText.length > 0 && (
        <SectionCard title="Why This Rating" icon="🧠">
          <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>
            {whyText.split("\n").map((line, i) => {
              const t = line.trim();
              if (!t) return null;
              return (
                <p key={i} style={{ margin: "0 0 8px" }}>{cleanBullet(t)}</p>
              );
            })}
          </div>
        </SectionCard>
      )}
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
          <div style={{ fontSize: 13, color: T.textFaint }}>Natural evidence data being processed.</div>
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XIV — PET METRIC CHIP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PetMetricChip({ metric }: { metric: PetMetric }) {
  return (
    <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 14 }}>{metric.icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: metric.color }}>{metric.value}</div>
        <div style={{ fontSize: 9.5, color: T.textFaint, fontWeight: 600, letterSpacing: "0.03em", marginTop: 1 }}>{metric.label.toUpperCase().slice(0, 18)}</div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XV — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface PetCareProps { markdown: string; }

export default function PetCare({ markdown }: PetCareProps) {
  const [activeTab, setActiveTab] = useState(0);

  // ── Guard ──
  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, borderRadius: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>No analysis data found</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Please provide a valid pet care product analysis result.</div>
        </div>
      </div>
    );
  }

  // ── Detect product type ──
  const productType = useMemo(() => detectPetProductType(markdown), [markdown]);
  const gradient    = PRODUCT_GRADIENT[productType];

  // ── Parse markdown ──
  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // ── Section extraction ──
  const { lines: profileLines } = findSection(sections, [
    "DENTAL GEL PROFILE", "SHAMPOO PROFILE", "SOAP PROFILE", "TREATMENT PROFILE",
    "DEODORANT PROFILE", "GROOMING SPRAY PROFILE", "PROFILE",
  ]);
  const { lines: sqLines }      = findSection(sections, ["STRUCTURAL QUALITY"]);
  const { lines: coreLines }    = findSection(sections, ["CORE SCORES"]);
  const { lines: specLines }    = findSection(sections, ["SPECIALIZED PERFORMANCE"]);
  const { lines: insightLines } = findSection(sections, ["STRUCTURAL INSIGHT", "INSIGHT"]);

  // Species / coat / household sections
  const speciesSections  = findSections(sections, ["SPECIES COMPATIBILITY", "SPECIES SUITABILITY", "SPECIES AND COAT"]);
  const coatSections     = findSections(sections, ["COAT TYPE COMPATIBILITY", "COAT-SPECIFIC"]);
  const householdSection = findSection(sections, ["HOUSEHOLD SUITABILITY", "HOUSEHOLD SAFETY"]);

  const speciesLines    = speciesSections[0]?.lines ?? [];
  const coatLines       = coatSections[0]?.lines ?? [];
  const householdLines  = householdSection.lines;

  const { lines: ltLines }      = findSection(sections, ["LONG-TERM USABILITY", "REPEATED-USE"]);
  const { lines: resultsLines } = findSection(sections, ["EXPECTED REAL-WORLD RESULTS", "EXPECTED RESULTS"]);
  const { lines: ingLines }     = findSection(sections, ["KEY STRUCTURAL INGREDIENTS", "INGREDIENTS"]);
  const { lines: whyLines }     = findSection(sections, ["WHY THIS RATING"]);

  // Natural / herbal
  const herbalMatch       = findSection(sections, ["HERBAL EVIDENCE ASSESSMENT"]);
  const naturalTruthMatch = Array.from(sections.entries()).find(([key]) =>
    norm(key).includes("NATURAL") && (norm(key).includes("CLAIM") || norm(key).includes("TRUTH"))
  );
  const truthLines  = naturalTruthMatch?.[1] ?? [];
  const herbalLines = herbalMatch.lines;
  const hasNatural  = truthLines.length > 0 || herbalLines.length > 0;

  // Tracks
  const tracks = useMemo(() => parseTracks(sections), [sections]);

  // ── Rating extraction ──
  const { key: ratingKey, lines: ratingLines } = findSection(sections, ["FINAL RATING"]);
  const ratingText = [ratingKey || "", ...ratingLines].join(" ");
  let finalRating = 0, maxRating = 5, ratingSubtitle = "";

  const rm = ratingText.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
  if (rm) { finalRating = Math.min(5, Math.max(0, parseFloat(rm[1]))); maxRating = parseInt(rm[2]); }
  const rmSub = ratingText.match(/\d+\.?\d*\s*\/\s*\d+[^—\n]*[—–\-]+\s*(.+)/);
  if (rmSub) ratingSubtitle = rmSub[1].trim().split("\n")[0].trim();

  // Also check for disqualification ceiling (1.5 max for disqualified products)
  const isDisqualified = /DISQUALIF/i.test(ratingText) || findSection(sections, ["DISQUALIFICATION NOTICE"]).key !== null;

  const rColor = scoreColor(finalRating, maxRating);
  const rLabel = scoreLabel(finalRating, maxRating);

  // ── Parse data ──
  const coreScores      = useMemo(() => parseScores(coreLines),           [coreLines]);
  const specScores      = useMemo(() => parseScores(specLines),            [specLines]);
  const speciesItems    = useMemo(() => parseCompatibility(speciesLines),  [speciesLines]);
  const coatItems       = useMemo(() => parseCompatibility(coatLines),     [coatLines]);
  const householdItems  = useMemo(() => parseCompatibility(householdLines),[householdLines]);
  const ltUsability     = useMemo(() => parseCompatibility(ltLines),       [ltLines]);
  const timeline        = useMemo(() => parseTimeline(resultsLines),       [resultsLines]);
  const ingredients     = useMemo(() => parseIngredients(ingLines),        [ingLines]);
  const { strengths, weaknesses } = useMemo(() => parseInsights(insightLines), [insightLines]);
  const truthItems      = useMemo(() => parseEvidenceItems(truthLines),    [truthLines]);
  const herbalItems     = useMemo(() => parseEvidenceItems(herbalLines),   [herbalLines]);
  const warnings        = useMemo(() => parseWarnings(markdown, sections), [markdown, sections]);

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
  const allScores   = useMemo(() => [...coreScores, ...specScores], [coreScores, specScores]);
  const profileText = linesAsText(profileLines);
  const sqText      = linesAsText(sqLines);

  // ── Pet metrics ──
  const petMetrics = useMemo(() => detectPetMetrics(productType, allScores), [productType, allScores]);

  // ── Tab definitions ──
  const TABS: Tab[] = [
    { id: "scores",    label: "Scores",          icon: "◎"  },
    { id: "safety",    label: "Safety",          icon: "🚨" },
    { id: "insights",  label: "Insights",        icon: "⚡"  },
    { id: "species",   label: "Species",         icon: "🐾" },
    { id: "longterm",  label: "Long-Term",       icon: "📅" },
    { id: "ingredients", label: "Ingredients",   icon: "🔬" },
    { id: "science",   label: "Science",         icon: "🧠" },
    { id: "natural",   label: "Natural Evidence", icon: "🌿" },
  ].filter((tab) => {
    if (tab.id === "scores")      return coreScores.length > 0 || specScores.length > 0 || tracks.length > 0;
    if (tab.id === "safety")      return warnings.length > 0;
    if (tab.id === "insights")    return strengths.length > 0 || weaknesses.length > 0;
    if (tab.id === "species")     return speciesItems.length > 0 || coatItems.length > 0 || householdItems.length > 0;
    if (tab.id === "longterm")    return ltUsability.length > 0 || timeline.length > 0;
    if (tab.id === "ingredients") return ingredients.length > 0;
    if (tab.id === "science")     return true;
    if (tab.id === "natural")     return hasNatural;
    return false;
  });

  const safeActiveTab = Math.min(activeTab, TABS.length - 1);
  const currentTabId  = TABS[safeActiveTab]?.id;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: T.bg, borderRadius: 24, overflow: "hidden", color: T.textDark }}>

      {/* ── HEADER ── */}
      <HeaderBar productType={productType} />
      <GuidanceBanner warnings={warnings} />

      {/* ── EXECUTIVE DASHBOARD ── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "22px 22px 0" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>

          {/* Disqualification notice */}
          {isDisqualified && (
            <div style={{ background: "#FEF2F2", border: `1.5px solid #FECACA`, borderRadius: 14, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🚫</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 12.5, color: T.red, marginBottom: 3 }}>DISQUALIFICATION NOTICE</div>
                <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>
                  This product contains a disqualifying ingredient. Score ceiling enforced at 1.5/5. Review Safety tab for full details.
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>

            {/* Left column */}
            <div>
              {/* Hero rating card */}
              <div style={{ background: gradient, borderRadius: 18, padding: "22px 24px", color: "#FFF", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 6 }}>{PC_HERO_LBL}</div>
                <div style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4 }}>
                  {finalRating.toFixed(1)}
                  <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.6, marginLeft: 4 }}>/ {maxRating}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: ratingSubtitle ? 4 : 0 }}>{rLabel}</div>
                {ratingSubtitle && <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginTop: 4 }}>{ratingSubtitle}</div>}
                <div style={{ marginTop: 12 }}><Stars score={finalRating} max={maxRating} /></div>
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

              {/* Warning mini-preview */}
              {warnings.filter((w) => w.severity === "critical").length > 0 && (
                <div style={{ marginBottom: 14 }}>
                  {warnings.filter((w) => w.severity === "critical").slice(0, 2).map((w, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", background: "#FEF2F2", border: `1px solid #FECACA`, borderRadius: 10, padding: "9px 12px", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>🚨</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: T.red }}>{w.type}</span>
                      <span style={{ fontSize: 11.5, color: T.textMuted, marginLeft: 4 }}>— {w.species}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Strengths / Concerns mini */}
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

            {/* Right column — ring + metrics */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
              <RatingRing score={finalRating} max={maxRating} color={rColor} />
              {petMetrics.map((m, i) => (
                <PetMetricChip key={i} metric={m} />
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
          <ScoresPanel coreScores={coreScores} specScores={specScores} tracks={tracks} />
        )}

        {currentTabId === "safety" && (
          <WarningsPanel warnings={warnings} />
        )}

        {currentTabId === "insights" && (
          <InsightsPanel strengths={strengths} weaknesses={weaknesses} />
        )}

        {currentTabId === "species" && (
          <SpeciesPanel speciesItems={speciesItems} coatItems={coatItems} householdItems={householdItems} />
        )}

        {currentTabId === "longterm" && (
          <LongTermPanel ltUsability={ltUsability} timeline={timeline} />
        )}

        {currentTabId === "ingredients" && (
          <IngredientsPanel ingGroups={ingGroups} />
        )}

        {currentTabId === "science" && (
          <SciencePanel
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