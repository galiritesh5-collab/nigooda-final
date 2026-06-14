import React, { useState, useRef, useMemo } from "react";

// ─── HOUSEHOLDCARE METADATA ──────────────────────────────────────────────────
const HC_BRAND    = "NIGOODA";
const HC_TITLE    = "Household Intelligence";
const HC_BADGE    = "Environmental Analysis";
const HC_HERO_LBL = "⭐ HOUSEHOLD ANALYSIS";
const HC_GUIDANCE = "Check environmental safety and compatibility scores";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION I — TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ScoreItem      { label: string; score: number; maxScore: number; reason: string; }
interface CompatItem     { label: string; score: number; compatible: boolean; reason: string; }
interface Ingredient     { name: string; purpose: string; group: string; riskLevel: number; color: ColorSet; }
interface TimelinePhase  { phase: string; label: string; sub: string; outcomes: string[]; }
interface ColorSet       { bg: string; dot: string; text: string; border: string; }
interface EvidenceItem   { label: string; body: string; }
interface Tab            { id: string; label: string; icon: string; }
interface WarningItem    { type: string; severity: "critical" | "high" | "moderate"; explanation: string; }
interface HouseholdMetric { label: string; value: string; color: string; icon: string; }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION II — PRODUCT TYPE DETECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ProductType =
  | "air_freshener" | "insect_spray" | "mosquito_repellent"
  | "bathroom_cleaner" | "toilet_cleaner" | "floor_cleaner"
  | "dishwash" | "laundry_liquid" | "laundry_powder" | "laundry_soap"
  | "generic";

function detectProductType(md: string): ProductType {
  const lower = md.toLowerCase();
  if (/freshener profile|air freshener|odor.neutrali|fragrance.*spray|plug.in|diffuser/i.test(lower)) return "air_freshener";
  if (/mosquito repellent|repellent profile|picaridin|deet|pmD.*repel/i.test(lower))                 return "mosquito_repellent";
  if (/insect spray|spray profile|pyrethroid|household insecticide|topical repellent/i.test(lower))   return "insect_spray";
  if (/toilet cleaner|toilet.*clean|bathroom.*toilet/i.test(lower))                                   return "toilet_cleaner";
  if (/bathroom cleaner|bathroom.*clean|surface.*clean.*bathroom/i.test(lower))                       return "bathroom_cleaner";
  if (/floor cleaner|floor.*clean|mop.*clean/i.test(lower))                                           return "floor_cleaner";
  if (/dishwash|dish wash|dishwashing|dishwasher liquid/i.test(lower))                                return "dishwash";
  if (/laundry.*soap|laundry soap profile/i.test(lower))                                              return "laundry_soap";
  if (/laundry.*powder|detergent.*powder|powder.*detergent/i.test(lower))                            return "laundry_powder";
  if (/laundry.*liquid|detergent.*liquid|liquid.*detergent/i.test(lower))                            return "laundry_liquid";
  return "generic";
}

const PRODUCT_ICONS: Record<ProductType, string> = {
  air_freshener     : "🌿",
  insect_spray      : "🦟",
  mosquito_repellent: "🛡️",
  bathroom_cleaner  : "🚿",
  toilet_cleaner    : "🚽",
  floor_cleaner     : "🧹",
  dishwash          : "🍽️",
  laundry_liquid    : "🧴",
  laundry_powder    : "🧺",
  laundry_soap      : "🧼",
  generic           : "🏠",
};

const PRODUCT_GRADIENT: Record<ProductType, string> = {
  air_freshener     : "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
  insect_spray      : "linear-gradient(135deg, #DC2626 0%, #B45309 100%)",
  mosquito_repellent: "linear-gradient(135deg, #0369A1 0%, #0D9488 100%)",
  bathroom_cleaner  : "linear-gradient(135deg, #0891B2 0%, #6366F1 100%)",
  toilet_cleaner    : "linear-gradient(135deg, #4F46E5 0%, #0891B2 100%)",
  floor_cleaner     : "linear-gradient(135deg, #D97706 0%, #059669 100%)",
  dishwash          : "linear-gradient(135deg, #0EA5E9 0%, #6366F1 100%)",
  laundry_liquid    : "linear-gradient(135deg, #8B5CF6 0%, #0D9488 100%)",
  laundry_powder    : "linear-gradient(135deg, #6366F1 0%, #0891B2 100%)",
  laundry_soap      : "linear-gradient(135deg, #10B981 0%, #0369A1 100%)",
  generic           : "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION III — DESIGN TOKENS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const T = {
  indigo      : "#4F46E5",
  indigoLight : "#6366F1",
  indigoPale  : "#EEF2FF",
  indigoMid   : "#C7D2FE",
  teal        : "#0D9488",
  tealLight   : "#CCFBF1",
  mint        : "#10B981",
  amber       : "#D97706",
  amberLight  : "#FEF3C7",
  red         : "#DC2626",
  redLight    : "#FEE2E2",
  orange      : "#F97316",
  orangeLight : "#FFF7ED",
  green       : "#16A34A",
  greenLight  : "#DCFCE7",
  pink        : "#EC4899",
  pinkLight   : "#FCE7F3",
  blue        : "#0369A1",
  blueLight   : "#E0F2FE",
  purple      : "#7C3AED",
  purpleLight : "#F5F3FF",
  textDark    : "#0F172A",
  textMid     : "#334155",
  textMuted   : "#64748B",
  textFaint   : "#94A3B8",
  surface     : "#FFFFFF",
  surfaceAlt  : "#F8FAFC",
  border      : "#E2E8F0",
  borderMid   : "#CBD5E1",
  bg          : "#F1F5F9",
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IV — PARSING UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseMarkdown(md: string): Map<string, string[]> {
  const lines    = md.split(/\r?\n/);
  const sections = new Map<string, string[]>();
  let currentKey = "__intro__";
  sections.set(currentKey, []);

  for (const line of lines) {
    const t = line.trim();
    if (!t || t === "---" || /^━+$/.test(t)) continue;
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

function findSection(
  sections: Map<string, string[]>,
  keywords: string[]
): { key: string | null; lines: string[] } {
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) {
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
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) {
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
// SECTION V — DOMAIN PARSERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Strict score extraction: matches "Title — ⭐X.X" only */
const SCORE_RE = /^(?:#{1,4}\s+)?(.+?)\s+—\s+⭐?\s*(\d+\.?\d*)/;

function parseScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  let current: ScoreItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(SCORE_RE);
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
    const m = t.match(SCORE_RE);
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
    { phase: "immediate", label: "Immediate",   sub: "First Use",           outcomes: [] },
    { phase: "medium",    label: "Medium-Term", sub: "Weeks to Months",     outcomes: [] },
    { phase: "longterm",  label: "Long-Term",   sub: "Months & Beyond",     outcomes: [] },
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
      // top-level heading — skip
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

/** Parse mandatory warning section into structured items */
function parseWarnings(lines: string[]): WarningItem[] {
  const warnings: WarningItem[] = [];
  const WARNING_PATTERNS: Array<{ pattern: RegExp; type: string; severity: WarningItem["severity"] }> = [
    { pattern: /ozone/i,            type: "Ozone Generation",             severity: "critical" },
    { pattern: /cat toxicity/i,     type: "Cat Toxicity",                 severity: "critical" },
    { pattern: /bird/i,             type: "Bird Inhalation Risk",         severity: "high"     },
    { pattern: /infant|child inhal/i, type: "Infant Inhalation Risk",     severity: "high"     },
    { pattern: /flammab/i,          type: "Flammability",                 severity: "high"     },
    { pattern: /terpene.*pollutant|secondary pollutant/i, type: "Secondary Pollutant Formation", severity: "high" },
    { pattern: /phthalate/i,        type: "Phthalate Carrier",            severity: "moderate" },
    { pattern: /aquatic toxicity/i, type: "Aquatic Toxicity",             severity: "high"     },
    { pattern: /bee toxicity/i,     type: "Bee Toxicity",                 severity: "high"     },
    { pattern: /pyrethroid toxicity/i, type: "Pyrethroid Toxicity",       severity: "high"     },
    { pattern: /mixing hazard/i,    type: "Mixing Hazard",                severity: "critical" },
    { pattern: /chronic inhalation/i, type: "Chronic Inhalation Risk",    severity: "moderate" },
    { pattern: /voc burden/i,       type: "VOC Burden",                   severity: "moderate" },
    { pattern: /formaldehyde/i,     type: "Formaldehyde Releaser",        severity: "high"     },
    { pattern: /pregnancy|pregnant/i, type: "Pregnancy Caution",          severity: "moderate" },
    { pattern: /child age restrict/i, type: "Child Age Restriction",      severity: "high"     },
  ];

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const clean = cleanBullet(t);
    if (clean.length < 3) continue;
    for (const wp of WARNING_PATTERNS) {
      if (wp.pattern.test(clean)) {
        if (!warnings.find((w) => w.type === wp.type)) {
          warnings.push({ type: wp.type, severity: wp.severity, explanation: clean });
        }
        break;
      }
    }
  }
  // Fallback: if no pattern matched, treat each bullet as a generic warning
  if (warnings.length === 0) {
    for (const line of lines) {
      const clean = cleanBullet(line.trim());
      if (clean.length > 8) {
        warnings.push({ type: clean.split(/[.(:]/)[0].trim(), severity: "moderate", explanation: clean });
      }
    }
  }
  return warnings;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VI — INGREDIENT SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ING_GROUPS: Record<string, string[]> = {
  Surfactants     : ["sles", "sls", "sodium laureth", "sodium lauryl", "cocamidopropyl", "betaine", "aes", "apg", "glucoside", "cocoyl", "las", "alkyl"],
  Disinfectants   : ["benzalkonium", "bkc", "quat", "bleach", "sodium hypochlorite", "hypochlorite", "pine oil", "phenol", "isopropanol", "ethanol", "alcohol"],
  Actives         : ["deet", "picaridin", "permethrin", "pyrethrin", "pyrethroid", "cypermethrin", "deltamethrin", "bifenthrin", "imiprothrin", "transfluthrin", "ir3535", "pmd", "citriodiol"],
  Solvents        : ["glycol ether", "butyl", "propanol", "isopropanol", "nmp", "solvent", "petroleum distillate"],
  Builders        : ["phosphate", "zeolite", "citrate", "silicate", "soda ash", "washing soda", "sodium carbonate", "edta", "sequestrant"],
  Enzymes         : ["protease", "lipase", "amylase", "cellulase", "mannanase", "enzyme"],
  Fragrances      : ["fragrance", "parfum", "essential oil", "limonene", "linalool", "terpene", "citral", "eugenol", "geraniol", "coumarin"],
  Preservatives   : ["methylisothiazolinone", "mit", "cmit", "benzisothiazolinone", "bit", "paraben", "phenoxyethanol", "benzoate", "sorbate", "formaldehyde"],
  Humectants      : ["glycerin", "glycerol", "sorbitol", "propylene glycol", "butylene glycol"],
  Opticals        : ["optical brightener", "fluorescent whitening", "stilbene", "tinopal", "uvitex"],
  Acids           : ["hydrochloric", "phosphoric", "citric acid", "lactic acid", "acetic", "sulfamic", "oxalic", "glycolic acid", "tartaric"],
  Propellants     : ["lpg", "propane", "butane", "isobutane", "hfc", "hfo", "compressed gas"],
  NaturalExtract  : ["aloe", "neem", "eucalyptus", "lavender", "tea tree", "citronella", "lemon grass", "botanical", "herbal", "plant"],
};

const ING_COLORS: Record<string, ColorSet> = {
  Surfactants  : { bg:"#F0F9FF", dot:"#0EA5E9", text:"#0C4A6E", border:"#BAE6FD" },
  Disinfectants: { bg:"#FFF7ED", dot:"#F97316", text:"#7C2D12", border:"#FED7AA" },
  Actives      : { bg:"#FEF2F2", dot:"#DC2626", text:"#7F1D1D", border:"#FCA5A5" },
  Solvents     : { bg:"#FFFBEB", dot:"#D97706", text:"#78350F", border:"#FDE68A" },
  Builders     : { bg:"#EFF6FF", dot:"#3B82F6", text:"#1E3A8A", border:"#BFDBFE" },
  Enzymes      : { bg:"#F0FDF4", dot:"#22C55E", text:"#14532D", border:"#DCFCE7" },
  Fragrances   : { bg:"#FFF1F2", dot:"#F43F5E", text:"#881337", border:"#FECDD3" },
  Preservatives: { bg:"#F8FAFC", dot:"#94A3B8", text:"#334155", border:"#E2E8F0" },
  Humectants   : { bg:"#F5F3FF", dot:"#A855F7", text:"#581C87", border:"#E9D5FF" },
  Opticals     : { bg:"#FEFCE8", dot:"#EAB308", text:"#713F12", border:"#FEF08A" },
  Acids        : { bg:"#ECFDF5", dot:"#10B981", text:"#064E3B", border:"#A7F3D0" },
  Propellants  : { bg:"#F3F4F6", dot:"#6B7280", text:"#1F2937", border:"#D1D5DB" },
  NaturalExtract: { bg:"#F0FDF4", dot:"#4ADE80", text:"#14532D", border:"#BBF7D0" },
  Other        : { bg:"#F8FAFC", dot:"#CBD5E1", text:"#475569", border:"#E2E8F0" },
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
  if (/sodium hypochlorite|chlorine|bleach|formaldehyde|permethrin|pyrethroid/.test(lower)) return 5;
  if (/deet|methylisothiazolinone|benzalkonium|optical brightener|phosphate/.test(lower))   return 4;
  if (/sodium lauryl|sls|fragrance|parfum|essential oil|limonene/.test(lower))              return 3;
  if (/citric|glycerin|sorbitol|enzyme/.test(lower))                                        return 1;
  return 2;
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
// SECTION VII — SCORE UTILITIES
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
// SECTION VIII — HOUSEHOLD METRIC DETECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function detectHouseholdMetrics(productType: ProductType, scores: ScoreItem[]): HouseholdMetric[] {
  const metrics: HouseholdMetric[] = [];
  const findScore = (kw: string) =>
    scores.find((s) => s.label.toUpperCase().includes(kw.toUpperCase()))?.score;

  const metricMap: Record<ProductType, Array<{ key: string; label: string; icon: string }>> = {
    air_freshener     : [
      { key: "VOC",        label: "VOC Burden",        icon: "💨" },
      { key: "INHALATION", label: "Inhalation Safety", icon: "🫁" },
      { key: "PET",        label: "Pet Safety",        icon: "🐾" },
    ],
    insect_spray      : [
      { key: "KILL",       label: "Kill Efficacy",     icon: "⚡" },
      { key: "INHALATION", label: "Inhalation Safety", icon: "🫁" },
      { key: "PET",        label: "Pet Safety",        icon: "🐾" },
    ],
    mosquito_repellent: [
      { key: "REPELLENCY", label: "Repellency",        icon: "🛡️" },
      { key: "DERMAL",     label: "Dermal Safety",     icon: "🧴" },
      { key: "DURATION",   label: "Duration",          icon: "⏱" },
    ],
    bathroom_cleaner  : [
      { key: "DISINFECT",  label: "Disinfection",      icon: "🦠" },
      { key: "LIMESCALE",  label: "Limescale Power",   icon: "⚗️" },
      { key: "INHALATION", label: "Inhalation Safety", icon: "🫁" },
    ],
    toilet_cleaner    : [
      { key: "DISINFECT",  label: "Disinfection",      icon: "🦠" },
      { key: "LIMESCALE",  label: "Descaling",         icon: "⚗️" },
      { key: "INHALATION", label: "Inhalation Safety", icon: "🫁" },
    ],
    floor_cleaner     : [
      { key: "RESIDUE",    label: "Residue Risk",      icon: "🧹" },
      { key: "PET",        label: "Pet Safety",        icon: "🐾" },
      { key: "SURFACE",    label: "Surface Safety",    icon: "🪵" },
    ],
    dishwash          : [
      { key: "GREASE",     label: "Grease Cutting",    icon: "🍳" },
      { key: "HAND",       label: "Hand Safety",       icon: "🖐️" },
      { key: "RINSE",      label: "Rinse Efficiency",  icon: "💧" },
    ],
    laundry_liquid    : [
      { key: "STAIN",      label: "Stain Removal",     icon: "👕" },
      { key: "FABRIC",     label: "Fabric Safety",     icon: "🧺" },
      { key: "RESIDUAL",   label: "Residue Risk",      icon: "⚠️" },
    ],
    laundry_powder    : [
      { key: "STAIN",      label: "Stain Removal",     icon: "👕" },
      { key: "FABRIC",     label: "Fabric Safety",     icon: "🧺" },
      { key: "ECO",        label: "Eco Impact",        icon: "🌍" },
    ],
    laundry_soap      : [
      { key: "BARRIER",    label: "Barrier Safety",    icon: "🛡️" },
      { key: "CLEANSING",  label: "Cleansing",         icon: "🧼" },
      { key: "IRRITATION", label: "Irritation Risk",   icon: "⚡" },
    ],
    generic           : [
      { key: "SAFETY",     label: "Safety",            icon: "🛡️" },
      { key: "EFFECTIVE",  label: "Effectiveness",     icon: "⚡" },
    ],
  };

  const defs = metricMap[productType] ?? metricMap.generic;
  for (const def of defs) {
    const s = findScore(def.key);
    if (s !== undefined) {
      metrics.push({ label: def.label, value: `${s.toFixed(1)}/5`, color: scoreColor(s), icon: def.icon });
    }
  }
  return metrics;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IX — PRIMITIVE COMPONENTS
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
// SECTION X — CARD COMPONENTS
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
            <span style={{
              fontSize: 10, fontWeight: 700, color, background: `${color}18`,
              padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap", letterSpacing: "0.04em",
            }}>{label}</span>
          </div>
          {preview && !open && (
            <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>
          )}
        </div>
        {item.reason && (
          <span style={{
            fontSize: 10, color: T.textFaint, flexShrink: 0, marginTop: 2,
            transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block",
          }}>▾</span>
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
        background: c.bg, border: `1px solid ${open ? (item.compatible ? "#86EFAC" : "#FCA5A5") : c.border}`,
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
// SECTION XI — WARNING INTELLIGENCE PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const WARNING_SEVERITY_CONFIG: Record<WarningItem["severity"], { bg: string; border: string; tag: string; tagBg: string; tagText: string; icon: string }> = {
  critical: { bg: "#FFF1F2", border: "#FCA5A5", tag: "CRITICAL", tagBg: "#DC2626", tagText: "#fff",     icon: "🚨" },
  high    : { bg: "#FFF7ED", border: "#FED7AA", tag: "HIGH",     tagBg: "#F97316", tagText: "#fff",     icon: "⚠️" },
  moderate: { bg: "#FFFBEB", border: "#FDE68A", tag: "MODERATE", tagBg: "#D97706", tagText: "#fff",     icon: "⚡" },
};

function WarningCard({ warning }: { warning: WarningItem }) {
  const [open, setOpen] = useState(false);
  const cfg = WARNING_SEVERITY_CONFIG[warning.severity];
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        background: cfg.bg, border: `1px solid ${cfg.border}`,
        borderRadius: 13, padding: "12px 14px", cursor: "pointer",
        boxShadow: open ? "0 4px 18px rgba(0,0,0,0.07)" : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{cfg.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: open ? 8 : 0, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, lineHeight: 1.3 }}>{warning.type}</span>
            <span style={{ fontSize: 9.5, fontWeight: 800, background: cfg.tagBg, color: cfg.tagText, padding: "2px 8px", borderRadius: 99, letterSpacing: "0.07em" }}>
              {cfg.tag}
            </span>
          </div>
          {!open && (
            <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.55 }}>
              {previewText(warning.explanation, 72)}
            </p>
          )}
        </div>
        <span style={{ fontSize: 10, color: T.textFaint, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block", marginTop: 3 }}>▾</span>
      </div>
      {open && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.7, paddingTop: 10, borderTop: `1px solid ${cfg.border}`, paddingLeft: 26 }}>
          {warning.explanation}
        </div>
      )}
    </div>
  );
}

function WarningPanel({ warnings }: { warnings: WarningItem[] }) {
  const criticals = warnings.filter((w) => w.severity === "critical");
  const highs     = warnings.filter((w) => w.severity === "high");
  const moderates = warnings.filter((w) => w.severity === "moderate");

  return (
    <div style={{
      background: "#FFF8F6", border: "1px solid #FCA5A5",
      borderRadius: 18, padding: "18px 20px",
      boxShadow: "0 2px 12px rgba(220,38,38,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 16 }}>⚠</span>
        <span style={{ fontWeight: 800, fontSize: 13, color: T.red, letterSpacing: "0.03em" }}>MANDATORY SAFETY FLAGS</span>
        <span style={{ fontSize: 10.5, fontWeight: 700, background: `${T.red}18`, color: T.red, padding: "2px 10px", borderRadius: 99, marginLeft: "auto" }}>
          {warnings.length} {warnings.length === 1 ? "Warning" : "Warnings"}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {criticals.map((w, i) => <WarningCard key={`c${i}`} warning={w} />)}
        {highs.map((w, i)     => <WarningCard key={`h${i}`} warning={w} />)}
        {moderates.map((w, i) => <WarningCard key={`m${i}`} warning={w} />)}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XII — TIMELINE + INGREDIENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PHASE_ICONS: Record<string, string>  = { immediate: "⚡", medium: "📈", longterm: "🔬" };
const PHASE_COLORS: Record<string, string> = { immediate: T.teal, medium: T.indigo, longterm: T.purple };

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
// SECTION XIII — HOUSEHOLD METRIC CHIP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HouseholdMetricChip({ metric }: { metric: HouseholdMetric }) {
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
// SECTION XIV — GENERIC SECTION
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
// SECTION XV — HEADER COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HeaderBar({ productType }: { productType: ProductType }) {
  const icon     = PRODUCT_ICONS[productType];
  const gradient = PRODUCT_GRADIENT[productType];
  return (
    <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "13px 22px", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 28, height: 28, background: gradient, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
        {icon}
      </div>
      <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.08em", color: T.teal }}>{HC_BRAND}</span>
      <span style={{ fontSize: 12, color: T.borderMid, margin: "0 4px" }}>·</span>
      <span style={{ fontSize: 12, color: T.textFaint, fontWeight: 500 }}>{HC_TITLE}</span>
      <div style={{ marginLeft: "auto" }}>
        <span style={{ fontSize: 11, color: T.textFaint, background: T.surfaceAlt, padding: "4px 12px", borderRadius: 99, border: `1px solid ${T.border}` }}>{HC_BADGE}</span>
      </div>
    </div>
  );
}

function GuidanceBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 16px", background: T.tealLight, borderBottom: `1px solid #A7F3D0` }}>
      <span style={{ fontSize: 12, color: T.teal, flexShrink: 0 }}>✦</span>
      <span style={{ fontSize: 11.5, color: T.teal, fontWeight: 500, letterSpacing: "0.01em" }}>{HC_GUIDANCE}</span>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XVI — TAB BAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
// SECTION XVII — TAB CONTENT PANELS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoresPanel({ coreScores, specScores }: { coreScores: ScoreItem[]; specScores: ScoreItem[] }) {
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
        <SectionCard title="Specialized Performance" icon="🧪">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {specScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

function SafetyPanel({ warnings, safetyScores }: { warnings: WarningItem[]; safetyScores: ScoreItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {warnings.length > 0 && <WarningPanel warnings={warnings} />}
      {safetyScores.length > 0 && (
        <SectionCard title="Safety Score Analysis" icon="🛡️" accent={T.red}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {safetyScores.map((s, i) => <ScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      {warnings.length === 0 && safetyScores.length === 0 && (
        <div style={{ background: "#F0FDF4", border: `1px solid ${T.greenLight}`, borderRadius: 14, padding: "24px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
          <div style={{ fontSize: 13, color: T.green, fontWeight: 600 }}>No mandatory safety warnings detected for this product.</div>
        </div>
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

function CompatibilityPanel({ items, title, icon }: { items: CompatItem[]; title: string; icon?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title={title} icon={icon ?? "🏠"}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
          {items.map((item, i) => <CompatCard key={i} item={item} />)}
        </div>
      </SectionCard>
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

function MultiCompatibilityPanel({ groups }: { groups: Array<{ title: string; icon: string; items: CompatItem[] }> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {groups.map((g, i) => g.items.length > 0 && (
        <SectionCard key={i} title={g.title} icon={g.icon}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 9 }}>
            {g.items.map((item, j) => <CompatCard key={j} item={item} />)}
          </div>
        </SectionCard>
      ))}
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

function LongTermPanel({ ltItems, timeline }: { ltItems: CompatItem[]; timeline: TimelinePhase[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ltItems.length > 0 && (
        <SectionCard title="Long-Term Usability" icon="📅">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 9 }}>
            {ltItems.map((item, i) => <CompatCard key={i} item={item} />)}
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

function SciencePanel({ whyLines, finalRating, maxRating, ratingSubtitle, rLabel, gradient }: {
  whyLines: string[]; finalRating: number; maxRating: number; ratingSubtitle: string; rLabel: string; gradient: string;
}) {
  const whyText = whyLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join(" ").trim();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {whyText && (
        <SectionCard title="Why This Rating" icon="🧠">
          <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>
            <GenericSection lines={whyLines} />
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
        <SectionCard title="Herbal Evidence Assessment" icon="🧬" accent={T.purple}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {herbalItems.map((item, i) => <EvidenceCard key={i} item={item} accent={T.purple} />)}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XVIII — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface HouseholdCareProps { markdown: string; }

export default function HouseholdCare({ markdown }: HouseholdCareProps) {
  const [activeTab, setActiveTab] = useState(0);

  // ── Guard ──
  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, borderRadius: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>No analysis data found</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Please provide a valid household product analysis result.</div>
        </div>
      </div>
    );
  }

  // ── Detect product type ──
  const productType = useMemo(() => detectProductType(markdown), [markdown]);
  const gradient    = PRODUCT_GRADIENT[productType];

  // ── Parse markdown ──
  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // ── Section extraction — semantic + fuzzy ──
  const { key: ratingKey }         = findSection(sections, ["FINAL RATING"]);
  const { lines: profileLines }    = findSection(sections, ["FRESHENER PROFILE", "SPRAY PROFILE", "REPELLENT PROFILE", "CLEANER PROFILE", "PRODUCT PROFILE", "DETERGENT PROFILE"]);
  const { lines: sqLines }         = findSection(sections, ["STRUCTURAL QUALITY"]);
  const { lines: coreLines }       = findSection(sections, ["CORE SCORES"]);
  const { lines: specLines }       = findSection(sections, ["SPECIALIZED PERFORMANCE"]);
  const { lines: insightLines }    = findSection(sections, ["STRUCTURAL INSIGHT", "INSIGHT"]);
  const { lines: warningLines }    = findSection(sections, ["MANDATORY WARNING", "MANDATORY SAFETY", "CRITICAL SAFETY"]);
  const { lines: whyLines }        = findSection(sections, ["WHY THIS RATING"]);
  const { lines: resultsLines }    = findSection(sections, ["EXPECTED REAL", "EXPECTED RESULTS"]);

  // Long-term / usage sections
  const ltMatch                    = findSection(sections, ["LONG-TERM USABILITY", "USAGE SUITABILITY", "LONG TERM"]);
  const ltLines                    = ltMatch.lines;

  // Compatibility — product-type aware, multi-section
  const compatKeywords = ["COMPATIBILITY", "CONTEXT COMPATIBILITY", "POPULATION COMPATIBILITY",
                          "FLOOR TYPE", "SURFACE COMPATIBILITY", "FABRIC TYPE", "SKIN TYPE",
                          "USE CASE", "USER POPULATION", "PET COMPATIBILITY", "USE CONTEXT"];
  const compatGroups = useMemo(() => findSections(sections, compatKeywords), [sections]);

  // Ingredient section
  const { lines: ingLines }        = findSection(sections, ["KEY STRUCTURAL INGREDIENTS", "STRUCTURAL INGREDIENTS", "INGREDIENTS"]);

  // Natural / herbal sections
  const herbalMatch                = findSection(sections, ["HERBAL EVIDENCE", "HERBAL ASSESSMENT"]);
  const naturalTruthMatch          = Array.from(sections.entries()).find(([key]) =>
    norm(key).includes("NATURAL") && (norm(key).includes("CLAIM") || norm(key).includes("TRUTH"))
  );
  const truthLines                 = naturalTruthMatch?.[1] ?? [];
  const herbalLines                = herbalMatch.lines;
  const hasNatural                 = truthLines.length > 0 || herbalLines.length > 0;

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
  const coreScores = useMemo(() => parseScores(coreLines),   [coreLines]);
  const specScores = useMemo(() => parseScores(specLines),   [specLines]);
  const warnings   = useMemo(() => parseWarnings(warningLines), [warningLines]);
  const timeline   = useMemo(() => parseTimeline(resultsLines), [resultsLines]);
  const ltItems    = useMemo(() => parseCompatibility(ltLines),  [ltLines]);
  const ingredients = useMemo(() => parseIngredients(ingLines),  [ingLines]);
  const { strengths, weaknesses } = useMemo(() => parseInsights(insightLines), [insightLines]);
  const truthItems = useMemo(() => parseEvidenceItems(truthLines),  [truthLines]);
  const herbalItems = useMemo(() => parseEvidenceItems(herbalLines), [herbalLines]);

  // ── Parse all compatibility groups ──
  const compatParsed = useMemo(() =>
    compatGroups.map((g) => ({
      key  : g.key,
      title: cleanSectionTitle(g.key),
      items: parseCompatibility(g.lines),
    })).filter((g) => g.items.length > 0),
  [compatGroups]);

  // Map compat groups to tab-friendly icons
  const compatIconMap: Record<string, string> = {
    "floor"   : "🪵", "surface"  : "🧪", "fabric"  : "👗",
    "skin"    : "🖐️", "pet"      : "🐾", "user"    : "👤",
    "population": "👥", "context" : "🏠", "use case": "🧪",
  };
  function compatIcon(title: string): string {
    const tl = title.toLowerCase();
    for (const [k, v] of Object.entries(compatIconMap)) {
      if (tl.includes(k)) return v;
    }
    return "🏠";
  }

  // ── Group ingredients ──
  const ingGroups = useMemo(() => {
    const groups: Record<string, Ingredient[]> = {};
    for (const ing of ingredients) {
      if (!groups[ing.group]) groups[ing.group] = [];
      groups[ing.group].push(ing);
    }
    return groups;
  }, [ingredients]);

  // ── All scores for metrics ──
  const allScores = [...coreScores, ...specScores];

  // ── Executive metrics ──
  const householdMetrics = useMemo(() => detectHouseholdMetrics(productType, allScores), [productType, allScores]);

  // ── Safety-relevant scores for Safety tab ──
  const safetyKeywords = ["INHALATION", "VOC", "PET", "CHILD", "INDOOR AIR", "CUMULATIVE", "CHRONIC", "HUMAN"];
  const safetyScores   = specScores.filter((s) => safetyKeywords.some((k) => s.label.toUpperCase().includes(k)));

  // ── Text extracts ──
  const profileText = linesAsText(profileLines);
  const sqText      = linesAsText(sqLines);

  // ── Tab definition — dynamic ──
  const TABS: Tab[] = [
  { id: "scores",      label: "Scores",       icon: "◎"  },
  { id: "safety",      label: "Safety",       icon: "🛡️" },
  { id: "insights",    label: "Insights",     icon: "⚡" },
  { id: "compat",      label: "Compatibility", icon: "🏠" },
  { id: "longterm",    label: "Long-Term",    icon: "📅" },
  { id: "ingredients", label: "Ingredients",  icon: "🔬" },
  { id: "science",     label: "Science",      icon: "🧠" },
  { id: "natural",     label: "Natural Evidence", icon: "🌿" },
].filter((tab) => {
  if (tab.id === "scores")
    return coreScores.length > 0 || specScores.length > 0;

  if (tab.id === "safety")
    return warnings.length > 0 || safetyScores.length > 0;

  if (tab.id === "insights")
    return strengths.length > 0 || weaknesses.length > 0;

  if (tab.id === "compat")
    return compatParsed.length > 0;

  if (tab.id === "longterm")
    return ltItems.length > 0 || timeline.length > 0;

  if (tab.id === "ingredients")
    return ingredients.length > 0;

  if (tab.id === "science")
    return true;

  if (tab.id === "natural")
    return hasNatural;

  return false;
});

  const safeActiveTab = Math.min(activeTab, TABS.length - 1);
  const currentTabId  = TABS[safeActiveTab]?.id;

  // ── Overview panel (executive dashboard inline) ──
  function OverviewPanel() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Profile + Structural Quality */}
        {(profileText || sqText) && (
          <SectionCard title="Product Classification" icon="🏷️">
            {profileText && (
              <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.75, marginBottom: sqText ? 10 : 0, whiteSpace: "pre-wrap" }}>
                {profileText}
              </p>
            )}
            {sqText && (
              <p style={{
                margin: 0, fontSize: 12.5, color: T.textMuted, lineHeight: 1.65,
                borderTop: profileText ? `1px solid ${T.border}` : "none",
                paddingTop: profileText ? 10 : 0, whiteSpace: "pre-wrap",
              }}>
                {sqText}
              </p>
            )}
          </SectionCard>
        )}

        {/* Warnings inline on overview if critical */}
        {warnings.filter((w) => w.severity === "critical").length > 0 && (
          <WarningPanel warnings={warnings.filter((w) => w.severity === "critical")} />
        )}

        {/* Strengths / Concerns */}
        {(strengths.length > 0 || weaknesses.length > 0) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {strengths.length > 0 && (
              <div style={{ background: "#F0FDF4", border: `1px solid ${T.greenLight}`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: T.green, marginBottom: 10, letterSpacing: "0.05em" }}>✓ KEY STRENGTHS</div>
                {strengths.slice(0, 4).map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: T.textMid, marginBottom: 6, lineHeight: 1.55 }}>
                    <span style={{ color: T.mint, fontWeight: 800, flexShrink: 0 }}>+</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
            {weaknesses.length > 0 && (
              <div style={{ background: "#FFF5F5", border: `1px solid ${T.redLight}`, borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ fontWeight: 700, fontSize: 11, color: T.red, marginBottom: 10, letterSpacing: "0.05em" }}>− CONCERNS</div>
                {weaknesses.slice(0, 4).map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: T.textMid, marginBottom: 6, lineHeight: 1.55 }}>
                    <span style={{ color: T.red, fontWeight: 800, flexShrink: 0 }}>−</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Top core scores preview */}
        {coreScores.length > 0 && (
          <SectionCard title="Core Scores at a Glance" icon="📊">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
              {coreScores.slice(0, 6).map((s, i) => <ScoreCard key={i} item={s} />)}
            </div>
          </SectionCard>
        )}

        {/* Timeline preview */}
        {timeline.length > 0 && (
          <SectionCard title="Expected Results" icon="⏱">
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

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: T.bg, borderRadius: 24, overflow: "hidden", color: T.textDark }}>

      {/* ── HEADER ── */}
      <HeaderBar productType={productType} />
      <GuidanceBanner />

      {/* ── EXECUTIVE DASHBOARD ── */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "22px 22px 0" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>

            {/* Left column */}
            <div>
              {/* Hero rating */}
              <div style={{ background: gradient, borderRadius: 18, padding: "22px 24px", color: "#FFF", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 6 }}>{HC_HERO_LBL}</div>
                <div style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4 }}>
                  {finalRating.toFixed(1)}
                  <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.6, marginLeft: 4 }}>/ {maxRating}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: ratingSubtitle ? 4 : 0 }}>{rLabel}</div>
                {ratingSubtitle && <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginTop: 4 }}>{ratingSubtitle}</div>}
                <div style={{ marginTop: 12 }}><Stars score={finalRating} max={maxRating} /></div>
              </div>

              {/* Profile text */}
              {(profileText || sqText) && (
                <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                  {profileText && (
                    <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.7, marginBottom: sqText ? 8 : 0, whiteSpace: "pre-wrap" }}>
                      {profileText}
                    </p>
                  )}
                  {sqText && (
                    <p style={{
                      margin: 0, fontSize: 12.5, color: T.textFaint, lineHeight: 1.65,
                      borderTop: profileText ? `1px solid ${T.border}` : "none",
                      paddingTop: profileText ? 8 : 0, whiteSpace: "pre-wrap",
                    }}>
                      {sqText}
                    </p>
                  )}
                </div>
              )}

              {/* Warnings mini-strip if present */}
              {warnings.length > 0 && (
                <div style={{
                  background: "#FFF8F6", border: "1px solid #FCA5A5",
                  borderRadius: 12, padding: "10px 14px", marginBottom: 14,
                  display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
                }}>
                  <span style={{ fontSize: 13 }}>⚠</span>
                  <span style={{ fontWeight: 700, fontSize: 12, color: T.red }}>Safety Flags Detected</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginLeft: 4 }}>
                    {warnings.slice(0, 3).map((w, i) => (
                      <span key={i} style={{
                        fontSize: 10, fontWeight: 700,
                        background: WARNING_SEVERITY_CONFIG[w.severity].tagBg,
                        color: "#fff", padding: "2px 8px", borderRadius: 99,
                      }}>{w.type}</span>
                    ))}
                    {warnings.length > 3 && (
                      <span style={{ fontSize: 10, color: T.textFaint, padding: "2px 8px" }}>+{warnings.length - 3} more</span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: T.textFaint, marginLeft: "auto" }}>See Safety tab</span>
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

            {/* Right column — ring + household metric chips */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
              <RatingRing score={finalRating} max={maxRating} color={rColor} />
              {householdMetrics.slice(0, 3).map((m, i) => (
                <HouseholdMetricChip key={i} metric={m} />
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
          <ScoresPanel coreScores={coreScores} specScores={specScores} />
        )}

        {currentTabId === "safety" && (
          <SafetyPanel warnings={warnings} safetyScores={safetyScores} />
        )}

        {currentTabId === "insights" && (
          <InsightsPanel strengths={strengths} weaknesses={weaknesses} />
        )}

        {currentTabId === "compat" && compatParsed.length > 0 && (
          compatParsed.length === 1
            ? <CompatibilityPanel items={compatParsed[0].items} title={compatParsed[0].title} icon={compatIcon(compatParsed[0].title)} />
            : <MultiCompatibilityPanel groups={compatParsed.map((g) => ({ title: g.title, icon: compatIcon(g.title), items: g.items }))} />
        )}

        {currentTabId === "longterm" && (
          <LongTermPanel ltItems={ltItems} timeline={timeline} />
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