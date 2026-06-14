import React, { useState, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ScoreItem     { label: string; score: number; maxScore: number; reason: string; }
interface CompatItem    { label: string; score: number; compatible: boolean; reason: string; }
interface Ingredient    { name: string; purpose: string; group: string; riskLevel: number; color: ColorSet; }
interface TimelinePhase { phase: string; label: string; sub: string; outcomes: string[]; }
interface ColorSet      { bg: string; dot: string; text: string; border: string; }
interface NaturalEvidenceItem { label: string; body: string; }
interface SafetyDisclosure { label: string; value: string; flagged: boolean; }
interface Tab           { id: string; label: string; icon: string; enabled: boolean; }

// ─── PRODUCT ARCHETYPE ────────────────────────────────────────────────────────
type ProductArchetype =
  | "shampoo"
  | "conditioner"
  | "hair_oil"
  | "hair_serum"
  | "hair_mask"
  | "hair_color"
  | "styling"
  | "beard_serum"
  | "generic";

interface ArchetypeProfile {
  label     : string;
  icon      : string;
  accent    : string;
  gradient  : string;
  badgeColor: string;
}

const ARCHETYPE_PROFILES: Record<ProductArchetype, ArchetypeProfile> = {
  shampoo: {
    label      : "Shampoo Analysis",
    icon       : "🧴",
    accent     : "#2563EB",
    gradient   : "linear-gradient(135deg, #1D4ED8 0%, #4F46E5 55%, #0EA5E9 100%)",
    badgeColor : "#DBEAFE",
  },
  conditioner: {
    label      : "Conditioner Analysis",
    icon       : "💧",
    accent     : "#0891B2",
    gradient   : "linear-gradient(135deg, #0E7490 0%, #0891B2 50%, #6366F1 100%)",
    badgeColor : "#CFFAFE",
  },
  hair_oil: {
    label      : "Hair Oil Analysis",
    icon       : "🫙",
    accent     : "#D97706",
    gradient   : "linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%)",
    badgeColor : "#FEF3C7",
  },
  hair_serum: {
    label      : "Hair Serum Analysis",
    icon       : "💇",
    accent     : "#7C3AED",
    gradient   : "linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #4F46E5 100%)",
    badgeColor : "#EDE9FE",
  },
  hair_mask: {
    label      : "Hair Mask Analysis",
    icon       : "💆",
    accent     : "#059669",
    gradient   : "linear-gradient(135deg, #065F46 0%, #059669 50%, #10B981 100%)",
    badgeColor : "#DCFCE7",
  },
  hair_color: {
    label      : "Hair Color / Dye Analysis",
    icon       : "🎨",
    accent     : "#DC2626",
    gradient   : "linear-gradient(135deg, #991B1B 0%, #DC2626 45%, #D97706 100%)",
    badgeColor : "#FEE2E2",
  },
  styling: {
    label      : "Hair Styling Analysis",
    icon       : "✂️",
    accent     : "#0D9488",
    gradient   : "linear-gradient(135deg, #0D9488 0%, #0891B2 50%, #6366F1 100%)",
    badgeColor : "#CCFBF1",
  },
  beard_serum: {
    label      : "Beard Growth Serum Analysis",
    icon       : "🧔",
    accent     : "#1D4ED8",
    gradient   : "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #6366F1 100%)",
    badgeColor : "#DBEAFE",
  },
  generic: {
    label      : "Hair Care Analysis",
    icon       : "💈",
    accent     : "#4F46E5",
    gradient   : "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #0D9488 100%)",
    badgeColor : "#EEF2FF",
  },
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
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
  green       : "#16A34A",
  greenLight  : "#DCFCE7",
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

// ─── MARKDOWN PARSER ──────────────────────────────────────────────────────────
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

function findSection(
  sections: Map<string, string[]>,
  keywords: string[]
): { key: string | null; lines: string[] } {
  for (const [key, lines] of sections.entries()) {
    const upper = key.toUpperCase();
    if (keywords.some((kw) => upper.includes(kw.toUpperCase()))) {
      return { key, lines };
    }
  }
  return { key: null, lines: [] };
}

function cleanBullet(s: string): string {
  return s.replace(/^[-*•·▸→#\s]+/, "").trim();
}

function cleanSectionTitle(key: string): string {
  return key
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}\u200D\uFE0F]+\s*/gu, "")
    .trim();
}

function previewText(reason: string, maxLen = 90): string {
  if (!reason) return "";
  const first = reason.split(/[.!?]/)[0]?.trim() ?? reason;
  const clean = first.slice(0, maxLen);
  return clean.length < reason.length ? clean + "…" : clean;
}

// ─── PRODUCT ARCHETYPE DETECTION ─────────────────────────────────────────────
function detectArchetype(sections: Map<string, string[]>, markdown: string): ProductArchetype {
  const lower = markdown.toLowerCase();

  // Check for explicit product section headings
  for (const key of sections.keys()) {
    const k = key.toLowerCase();
    if (k.includes("beard") && (k.includes("serum") || k.includes("growth"))) return "beard_serum";
    if (k.includes("color") || k.includes("dye") || k.includes("colour")) return "hair_color";
    if (k.includes("mask") && k.includes("profile")) return "hair_mask";
    if (k.includes("styling") && k.includes("profile")) return "styling";
    if (k.includes("shampoo") && k.includes("profile")) return "shampoo";
    if (k.includes("conditioner") && k.includes("profile")) return "conditioner";
    if (k.includes("oil") && k.includes("profile")) return "hair_oil";
    if (k.includes("serum") && k.includes("profile")) return "hair_serum";
  }

  // Fallback: content heuristics
  if (lower.includes("beard growth") || lower.includes("beard serum") || lower.includes("follicle stimulation")) return "beard_serum";
  if (lower.includes("hair color") || lower.includes("hair dye") || lower.includes("ppd") || lower.includes("sensitization") || lower.includes("oxidative color")) return "hair_color";
  if (lower.includes("hair mask") || lower.includes("protein-moisture balance") || lower.includes("mask profile")) return "hair_mask";
  if (lower.includes("hold performance") || lower.includes("polymer") || lower.includes("heat protection") || lower.includes("styling")) return "styling";
  if (lower.includes("surfactant") || lower.includes("cleansing efficiency") || lower.includes("scalp barrier preservation") || lower.includes("shampoo")) return "shampoo";
  if (lower.includes("conditioner") || lower.includes("detangling efficiency") || lower.includes("cuticle preservation") || lower.includes("btms")) return "conditioner";
  if (lower.includes("fiber penetration") || lower.includes("oil profile") || lower.includes("hair oil") || lower.includes("comedogenic")) return "hair_oil";
  if (lower.includes("serum") || lower.includes("silicone finishing") || lower.includes("active delivery")) return "hair_serum";

  return "generic";
}

// ─── SCORE PARSER ─────────────────────────────────────────────────────────────
function parseScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  let current: ScoreItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const headerMatch = t.match(
      /^(?:#{1,4}\s+)?(.+?)\s*[—–\-]+\s*⭐?\s*(\d+\.?\d*)\s*(?:\/\s*\d+)?(?:\s*\/\s*N\/A)?/
    );
    if (headerMatch) {
      if (current) items.push(current);
      const remaining = t.slice(headerMatch[0].length).replace(/^[—:–\-\s]+/, "").trim();
      current = {
        label   : cleanBullet(headerMatch[1]).trim(),
        score   : parseFloat(headerMatch[2]),
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
  return items.filter((i) => !isNaN(i.score) && i.score >= 0 && i.score <= 10);
}

// ─── COMPATIBILITY PARSER ─────────────────────────────────────────────────────
function parseCompatibility(lines: string[]): CompatItem[] {
  const items: CompatItem[] = [];
  let current: CompatItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^(?:#{1,4}\s+)?(.+?)\s*[—–\-→]+\s*⭐?\s*(\d+\.?\d*)/);
    if (m) {
      if (current) items.push(current);
      const remaining = t.slice(m[0].length).replace(/^[—:–\-\s]+/, "").trim();
      const score = parseFloat(m[2]);
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
  return items.filter((i) => !isNaN(i.score) && i.score >= 0);
}

// ─── TIMELINE PARSER ──────────────────────────────────────────────────────────
function parseTimeline(lines: string[]): TimelinePhase[] {
  const phases: TimelinePhase[] = [
    { phase: "immediate", label: "Immediate",    sub: "First Application",   outcomes: [] },
    { phase: "medium",    label: "Medium-Term",  sub: "Weeks to Months",     outcomes: [] },
    { phase: "longterm",  label: "Long-Term",    sub: "3–6+ Months",         outcomes: [] },
  ];
  let cur: TimelinePhase | null = null;

  for (const line of lines) {
    const t       = line.trim();
    if (!t) continue;
    const isBullet  = /^[-•*]/.test(t);
    const isHeading = /^#{1,4}\s/.test(t);

    if (/immediate/i.test(t) && (isHeading || !isBullet)) { cur = phases[0]; continue; }
    if (/medium.?term/i.test(t) && (isHeading || !isBullet)) { cur = phases[1]; continue; }
    if (/long.?term/i.test(t) && (isHeading || !isBullet)) { cur = phases[2]; continue; }

    if (cur) {
      const clean = cleanBullet(t);
      if (clean.length > 3 && !/^#{1,4}\s/.test(t)) cur.outcomes.push(clean);
    }
  }
  return phases.filter((p) => p.outcomes.length > 0);
}

// ─── INSIGHTS PARSER ──────────────────────────────────────────────────────────
function parseInsights(lines: string[]): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[]  = [];
  const weaknesses: string[] = [];
  let inS = false, inW = false;

  for (const line of lines) {
    const t = line.trim();
    if (/^#{1,4}\s*strength/i.test(t))                        { inS = true; inW = false; continue; }
    if (/^#{1,4}\s*(weakness|concern|limitation)/i.test(t))   { inW = true; inS = false; continue; }
    if (!t) continue;
    const clean = cleanBullet(t);
    if (!clean || clean.length < 3) continue;
    if (inS) strengths.push(clean);
    else if (inW) weaknesses.push(clean);
  }
  return { strengths, weaknesses };
}

// ─── NATURAL EVIDENCE PARSER ──────────────────────────────────────────────────
function parseNaturalEvidence(lines: string[]): NaturalEvidenceItem[] {
  const items: NaturalEvidenceItem[] = [];
  let current: NaturalEvidenceItem | null = null;

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
        if (current) {
          current.body = current.body ? current.body + " " + clean : clean;
        } else {
          current = { label: "Overview", body: clean };
        }
      }
    }
  }
  if (current) items.push(current);
  return items;
}

// ─── SAFETY DISCLOSURES PARSER ────────────────────────────────────────────────
function parseSafetyDisclosures(lines: string[]): SafetyDisclosure[] {
  const items: SafetyDisclosure[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || /^#{1,4}\s/.test(t)) continue;
    const clean = cleanBullet(t);
    if (!clean || clean.length < 3) continue;
    // Match "Label: value" or bold-label patterns
    const m = clean.match(/^\*{0,2}(.+?)\*{0,2}[:\s]+(.+)/);
    if (m) {
      const value   = m[2].trim();
      const flagged = /yes|required|present|incompatible/i.test(value);
      items.push({ label: m[1].trim(), value, flagged });
    } else {
      items.push({ label: clean, value: "", flagged: false });
    }
  }
  return items;
}

// ─── HAIR-SPECIFIC INGREDIENT GROUPS ─────────────────────────────────────────
const ING_GROUPS: Record<string, string[]> = {
  Surfactants      : ["lauryl", "laureth", "coco", "sulfate", "betaine", "amphoacetate", "glucoside", "sarcosinate", "syndet"],
  Conditioners     : ["btms", "behentrimonium", "cetrimonium", "quaternium", "polyquaternium", "guar hydroxy"],
  Oils             : ["argan", "coconut", "jojoba", "castor", "rosehip", "avocado", "marula", "almond", "oil", "butter", "shea", "mango"],
  Silicones        : ["silicone", "dimethicone", "cyclomethicone", "amodimethicone", "phenyl trimethicone", "siloxane"],
  Actives          : ["minoxidil", "caffeine", "biotin", "peptide", "niacinamide", "zinc", "ketoconazole", "piroctone", "selenium", "saw palmetto", "procapil", "capixyl", "redensyl"],
  Proteins         : ["keratin", "collagen", "silk", "wheat protein", "hydrolyzed", "amino acid", "bonding agent", "olaplex"],
  Humectants       : ["glycerin", "glycerol", "panthenol", "hyaluronic", "sorbitol", "polyethylene glycol", "betaine"],
  Preservatives    : ["phenoxyethanol", "paraben", "methylisothiazolinone", "benzyl alcohol", "benzoate"],
  DyeIntermediates : ["ppd", "p-phenylenediamine", "ptd", "resorcinol", "aminophenol", "developer", "peroxide", "ammonia"],
  Polymers         : ["pvp", "pva", "carbomer", "acrylate", "polyester", "film-form", "hold polymer"],
  Fragrances       : ["fragrance", "parfum", "linalool", "limonene", "geraniol", "essential oil", "citronellol"],
  Sensitizers      : ["sls", "sodium lauryl sulfate", "methylchloroisothiazolinone", "iodopropynyl"],
};

const ING_COLORS: Record<string, ColorSet> = {
  Surfactants      : { bg: "#EFF6FF", dot: "#3B82F6", text: "#1E3A8A", border: "#BFDBFE" },
  Conditioners     : { bg: "#F0FDFA", dot: "#14B8A6", text: "#134E4A", border: "#99F6E4" },
  Oils             : { bg: "#FFFBEB", dot: "#F59E0B", text: "#78350F", border: "#FDE68A" },
  Silicones        : { bg: "#F5F3FF", dot: "#8B5CF6", text: "#4C1D95", border: "#DDD6FE" },
  Actives          : { bg: "#FFF7ED", dot: "#F97316", text: "#7C2D12", border: "#FED7AA" },
  Proteins         : { bg: "#F0FDF4", dot: "#22C55E", text: "#14532D", border: "#DCFCE7" },
  Humectants       : { bg: "#F0F9FF", dot: "#0EA5E9", text: "#0C4A6E", border: "#BAE6FD" },
  Preservatives    : { bg: "#F8FAFC", dot: "#94A3B8", text: "#334155", border: "#E2E8F0" },
  DyeIntermediates : { bg: "#FFF1F2", dot: "#F43F5E", text: "#881337", border: "#FECDD3" },
  Polymers         : { bg: "#EEF2FF", dot: "#6366F1", text: "#3730A3", border: "#C7D2FE" },
  Fragrances       : { bg: "#FDF4FF", dot: "#A855F7", text: "#581C87", border: "#E9D5FF" },
  Sensitizers      : { bg: "#FFF1F2", dot: "#DC2626", text: "#7F1D1D", border: "#FCA5A5" },
  Other            : { bg: "#F8FAFC", dot: "#CBD5E1", text: "#475569", border: "#E2E8F0" },
};

function inferGroup(name: string): string {
  const lower = name.toLowerCase();
  for (const [g, kws] of Object.entries(ING_GROUPS)) {
    if (kws.some((k) => lower.includes(k))) return g;
  }
  return "Other";
}

function inferRisk(name: string): number {
  const lower = name.toLowerCase();
  if (lower.includes("ppd") || lower.includes("p-phenylenediamine") || lower.includes("methylchloroisothiazolinone")) return 5;
  if (lower.includes("sodium lauryl sulfate") || lower.includes("sls") || lower.includes("fragrance") || lower.includes("parfum")) return 4;
  if (lower.includes("paraben") || lower.includes("resorcinol") || lower.includes("ammonia")) return 3;
  if (lower.includes("peroxide") || lower.includes("alcohol") || lower.includes("preservative")) return 2;
  return 1;
}

function parseIngredients(lines: string[]): Ingredient[] {
  const items: Ingredient[] = [];
  for (const line of lines) {
    if (/^#{1,4}\s/.test(line.trim())) continue;
    const clean = cleanBullet(line);
    if (!clean || clean.length < 2) continue;
    const parts   = clean.split(/[:—–\-]/);
    const name    = parts[0]?.trim() ?? clean;
    if (name.length < 2) continue;
    const purpose = parts[1]?.trim() ?? "Active Component";
    const group   = inferGroup(name);
    items.push({ name, purpose, group, riskLevel: inferRisk(name), color: ING_COLORS[group] || ING_COLORS.Other });
  }
  return items;
}

// ─── SCORE COLOUR + LABEL ─────────────────────────────────────────────────────
function scoreColor(score: number, max = 5): string {
  const pct = (score / max) * 100;
  if (pct >= 76) return T.mint;
  if (pct >= 60) return T.indigo;
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

// ─── SCORE BAR ────────────────────────────────────────────────────────────────
function ScoreBar({ score, max = 5, color: overrideColor }: { score: number; max?: number; color?: string }) {
  const pct   = Math.min(100, (score / max) * 100);
  const color = overrideColor || scoreColor(score, max);
  return (
    <div style={{ height: 4, background: T.border, borderRadius: 99, overflow: "hidden", flex: 1, minWidth: 48 }}>
      <div style={{
        height: "100%", width: `${pct}%`, background: color,
        borderRadius: 99, transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

// ─── SCORE CARD ───────────────────────────────────────────────────────────────
function ScoreCard({ item, accentColor }: { item: ScoreItem; accentColor?: string }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score, item.maxScore);
  const label   = scoreLabel(item.score, item.maxScore);
  const preview = previewText(item.reason, 88);

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background  : T.surface,
        border      : `1px solid ${open ? (accentColor ? `${accentColor}60` : T.indigoMid) : T.border}`,
        borderRadius: 14,
        padding     : "14px 16px",
        cursor      : item.reason ? "pointer" : "default",
        boxShadow   : open ? `0 4px 20px ${accentColor ? `${accentColor}18` : "rgba(79,70,229,0.09)"}` : "0 1px 3px rgba(0,0,0,0.04)",
        transition  : "box-shadow 0.2s, border-color 0.2s",
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
              fontSize: 10, fontWeight: 700, color,
              background: `${color}18`, padding: "1px 7px", borderRadius: 99,
              whiteSpace: "nowrap", letterSpacing: "0.04em",
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
        <div style={{
          marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.7,
          paddingTop: 10, borderTop: `1px solid ${T.border}`,
        }}>{item.reason}</div>
      )}
    </div>
  );
}

// ─── COMPAT CARD ──────────────────────────────────────────────────────────────
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
        background  : c.bg,
        border      : `1px solid ${open ? (item.compatible ? "#86EFAC" : "#FCA5A5") : c.border}`,
        borderRadius: 14, padding: "13px 15px",
        cursor      : item.reason ? "pointer" : "default",
        boxShadow   : open ? "0 4px 16px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.03)",
        transition  : "box-shadow 0.2s, border-color 0.2s",
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
            <span style={{
              fontSize: 10, color: T.textFaint, marginLeft: 2,
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s", display: "inline-block",
            }}>▾</span>
          )}
        </div>
      </div>
      <ScoreBar score={item.score} max={5} />
      {preview && !open && (
        <p style={{ margin: "7px 0 0", fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>
      )}
      {open && item.reason && (
        <p style={{
          margin: "10px 0 0", fontSize: 12.5, color: T.textMid, lineHeight: 1.65,
          paddingTop: 10, borderTop: `1px solid ${c.border}`,
        }}>{item.reason}</p>
      )}
    </div>
  );
}

// ─── NATURAL EVIDENCE CARD ────────────────────────────────────────────────────
function NaturalEvidenceCard({ item, accent }: { item: NaturalEvidenceItem; accent: string }) {
  const [open, setOpen] = useState(false);
  const preview = previewText(item.body, 100);

  return (
    <div
      onClick={() => item.body && setOpen(!open)}
      style={{
        background  : T.surface,
        border      : `1px solid ${open ? `${accent}50` : T.border}`,
        borderRadius: 14, padding: "14px 16px",
        cursor      : item.body ? "pointer" : "default",
        boxShadow   : open ? `0 4px 20px ${accent}15` : "0 1px 3px rgba(0,0,0,0.04)",
        transition  : "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, marginTop: 5, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, lineHeight: 1.35, wordBreak: "break-word" }}>{item.label}</span>
            {item.body && (
              <span style={{
                fontSize: 10, color: T.textFaint, flexShrink: 0,
                transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block",
              }}>▾</span>
            )}
          </div>
          {preview && !open && (
            <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>
          )}
        </div>
      </div>
      {open && item.body && (
        <div style={{
          marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.7,
          paddingTop: 10, borderTop: `1px solid ${T.border}`, paddingLeft: 16,
        }}>{item.body}</div>
      )}
    </div>
  );
}

// ─── SAFETY DISCLOSURE CARD ───────────────────────────────────────────────────
function SafetyDisclosureCard({ item }: { item: SafetyDisclosure }) {
  const flagColor = item.flagged ? T.red : T.mint;
  const flagBg    = item.flagged ? "#FFF5F5" : "#F0FDF4";
  const flagBord  = item.flagged ? T.redLight : T.greenLight;

  return (
    <div style={{
      background: flagBg, border: `1px solid ${flagBord}`,
      borderRadius: 11, padding: "11px 14px",
      display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 12, color: T.textDark, wordBreak: "break-word", lineHeight: 1.4 }}>
          {item.label}
        </div>
        {item.value && (
          <div style={{ fontSize: 11.5, color: T.textMid, marginTop: 3 }}>{item.value}</div>
        )}
      </div>
      <span style={{
        fontSize: 10.5, fontWeight: 700, color: flagColor,
        background: `${flagColor}18`, padding: "2px 9px", borderRadius: 99,
        whiteSpace: "nowrap", flexShrink: 0,
      }}>
        {item.flagged ? "⚠ Required" : "✓ Clear"}
      </span>
    </div>
  );
}

// ─── TIMELINE PHASE CARD ──────────────────────────────────────────────────────
const PHASE_ICONS: Record<string, string>  = { immediate: "⚡", medium: "📈", longterm: "🔬" };
const PHASE_COLORS: Record<string, string> = { immediate: T.indigo, medium: T.teal, longterm: "#7C3AED" };

function TimelinePhaseCard({ phase, index, total }: { phase: TimelinePhase; index: number; total: number }) {
  const isLast = index === total - 1;
  const color  = PHASE_COLORS[phase.phase] || T.indigo;

  return (
    <div style={{ display: "flex", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", background: color,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0,
        }}>
          {PHASE_ICONS[phase.phase]}
        </div>
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 16, background: T.border, margin: "4px 0" }} />}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1 }}>
        <div style={{ marginBottom: 7 }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: T.textDark }}>{phase.label}</span>
          <span style={{ fontSize: 11.5, color: T.textFaint, marginLeft: 8 }}>{phase.sub}</span>
        </div>
        <div style={{
          background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12,
          padding: "11px 14px", display: "flex", flexDirection: "column", gap: 7,
        }}>
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

// ─── INGREDIENT GROUP ─────────────────────────────────────────────────────────
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
        <span style={{
          fontSize: 10, color: T.textFaint, display: "inline-block",
          transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s",
        }}>▾</span>
      </button>
      {open && (
        <div style={{ marginTop: 3, display: "flex", flexDirection: "column", gap: 3 }}>
          {items.map((ing, i) => (
            <div key={i} style={{
              background: T.surface, border: `1px solid ${T.border}`, borderRadius: 9,
              padding: "10px 13px", display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: 10,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 12.5, color: T.textDark, wordBreak: "break-word" }}>{ing.name}</div>
                <div style={{ fontSize: 11.5, color: T.textFaint, marginTop: 2 }}>{ing.purpose}</div>
              </div>
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: RISK_COLORS[ing.riskLevel],
                background: `${RISK_COLORS[ing.riskLevel]}18`, padding: "2px 8px",
                borderRadius: 99, whiteSpace: "nowrap", flexShrink: 0,
              }}>{RISK_LABELS[ing.riskLevel]}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SECTION CARD ─────────────────────────────────────────────────────────────
function SectionCard({ title, icon, accent, children }: {
  title: string; icon?: string; accent?: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${accent ? `${accent}40` : T.border}`,
      borderRadius: 18, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      {(title || icon) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          {icon && <span style={{ fontSize: 15 }}>{icon}</span>}
          <span style={{ fontWeight: 700, fontSize: 13, color: accent || T.textDark }}>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

// ─── HERO RATING RING ─────────────────────────────────────────────────────────
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
      <text x="48" y="44" textAnchor="middle" fill={color} fontSize="18" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
        {score.toFixed(1)}
      </text>
      <text x="48" y="60" textAnchor="middle" fill={T.textFaint} fontSize="11" fontFamily="Inter, system-ui, sans-serif">
        / {max}
      </text>
    </svg>
  );
}

// ─── STARS ────────────────────────────────────────────────────────────────────
function Stars({ score, max = 5 }: { score: number; max?: number }) {
  const stars = Array.from({ length: max }, (_, i) => ({
    filled: i < Math.floor(score),
    half  : i >= Math.floor(score) && i < score,
  }));
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {stars.map((s, i) => (
        <span key={i} style={{ fontSize: 16, color: s.filled || s.half ? "#FBBF24" : T.border }}>
          {s.filled ? "★" : s.half ? "⯨" : "☆"}
        </span>
      ))}
    </div>
  );
}

// ─── SMART GUIDANCE BANNER ────────────────────────────────────────────────────
function SmartGuidanceBanner({ message }: { message: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 9,
      padding: "8px 16px",
      background: T.indigoPale,
      borderBottom: `1px solid ${T.indigoMid}`,
    }}>
      <span style={{ fontSize: 12, color: T.indigoLight, flexShrink: 0 }}>✦</span>
      <span style={{ fontSize: 11.5, color: T.indigo, fontWeight: 500, letterSpacing: "0.01em" }}>
        {message}
      </span>
    </div>
  );
}

// ─── GENERIC SECTION ──────────────────────────────────────────────────────────
function GenericSection({ lines, accentColor }: { lines: string[]; accentColor?: string }) {
  const accent = accentColor || T.indigoLight;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return null;
        const isSubheading = /^#{2,4}\s/.test(t);
        const clean        = cleanBullet(t);
        if (isSubheading) return (
          <div key={i} style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, marginTop: 10, marginBottom: 2 }}>{clean}</div>
        );
        const isBullet = /^[-•*]/.test(t) || /^[-•*]/.test(line.trim());
        return (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, color: T.textMid, lineHeight: 1.65 }}>
            {isBullet && <span style={{ color: accent, flexShrink: 0, marginTop: 2 }}>›</span>}
            <span>{clean}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── REACTMARKDOWN COMPONENTS ─────────────────────────────────────────────────
const mdComponents = {
  h1: ({ children }: any) => (
    <h1 style={{ fontSize: 17, fontWeight: 800, color: T.textDark, marginBottom: 10, marginTop: 0 }}>{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 style={{ fontSize: 14, fontWeight: 700, color: T.textDark, marginBottom: 6, marginTop: 14 }}>{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 style={{ fontSize: 13, fontWeight: 700, color: T.indigo, marginBottom: 4, marginTop: 10 }}>{children}</h3>
  ),
  p: ({ children }: any) => (
    <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.78, margin: "0 0 8px" }}>{children}</p>
  ),
  li: ({ children }: any) => (
    <li style={{ fontSize: 13, color: T.textMid, lineHeight: 1.65, marginBottom: 4, paddingLeft: 4 }}>{children}</li>
  ),
  ul: ({ children }: any) => (
    <ul style={{ margin: "6px 0", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 2 }}>{children}</ul>
  ),
  strong: ({ children }: any) => (
    <strong style={{ fontWeight: 700, color: T.textDark }}>{children}</strong>
  ),
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
interface HairCareProps {
  markdown: string;
}

export default function HairCare({ markdown }: HairCareProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabBarRef = useRef<HTMLDivElement>(null);

  // ── Empty guard ──
  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{
        padding: 48, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, borderRadius: 24,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💈</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>No analysis data found</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Please provide a valid hair care analysis result.</div>
        </div>
      </div>
    );
  }

  // ── Parse ──
  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // ── Detect archetype ──
  const archetype = useMemo(() => detectArchetype(sections, markdown), [sections, markdown]);
  const profile   = ARCHETYPE_PROFILES[archetype];
  const accent    = profile.accent;

  // ── Extract sections ──
  const { key: ratingKey }       = findSection(sections, ["FINAL RATING"]);
  const { lines: profileLines }  = findSection(sections, ["PROFILE"]);
  const { lines: sqLines }       = findSection(sections, ["STRUCTURAL QUALITY"]);
  const { lines: coreLines }     = findSection(sections, ["CORE SCORES"]);
  const { lines: specLines }     = findSection(sections, ["SPECIALIZED PERFORMANCE"]);
  const { lines: insightLines }  = findSection(sections, ["STRUCTURAL INSIGHT", "INSIGHT"]);
  const { lines: ltLines }       = findSection(sections, ["LONG-TERM USABILITY"]);
  const { lines: resultsLines }  = findSection(sections, ["EXPECTED REAL-WORLD RESULTS", "EXPECTED RESULTS"]);
  const { lines: ingLines }      = findSection(sections, ["KEY STRUCTURAL INGREDIENTS", "INGREDIENTS"]);
  const { lines: whyLines }      = findSection(sections, ["WHY THIS RATING"]);

  // Hair-type and specialized compat sections
  const { lines: compatLines, key: compatKey } = findSection(sections, [
    "HAIR TYPE COMPATIBILITY",
    "SKIN TYPE COMPATIBILITY",
    "BEARD GROWTH PATTERN",
    "POPULATION COMPATIBILITY",
    "COMPATIBILITY",
  ]);

  // Safety disclosures (hair color only)
  const { lines: safetyDiscLines } = findSection(sections, ["MANDATORY SAFETY DISCLOSURES", "SAFETY DISCLOSURES"]);

  // Natural evidence
  const naturalTruthMatch = Array.from(sections.entries()).find(([key]) => {
    const u = key.toUpperCase();
    return u.includes("NATURAL") && u.includes("CLAIM");
  });
  const truthKey   = naturalTruthMatch?.[0] || "";
  const truthLines = naturalTruthMatch?.[1] || [];
  const { lines: herbalLines, key: herbalKey } = findSection(sections, ["HERBAL EVIDENCE ASSESSMENT"]);
  const hasNaturalEvidence = !!(truthKey || herbalKey);

  // ── Rating ──
  const ratingLines    = ratingKey ? (sections.get(ratingKey) || []) : [];
  const ratingText     = ratingKey ? [ratingKey, ...ratingLines].join(" ") : "";
  let finalRating = 0, maxRating = 5, ratingSubtitle = "";
  const rm = ratingText.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
  if (rm) { finalRating = parseFloat(rm[1]); maxRating = parseInt(rm[2]); }
  const rmSub = ratingText.match(/\d+\.?\d*\s*\/\s*\d+\s*[—–\-]+\s*(.+)/);
  if (rmSub) ratingSubtitle = rmSub[1].trim();

  const rColor = scoreColor(finalRating, maxRating);
  const rLabel = scoreLabel(finalRating, maxRating);

  // ── Parsed data ──
  const coreScores       = useMemo(() => parseScores(coreLines),         [coreLines]);
  const specScores       = useMemo(() => parseScores(specLines),         [specLines]);
  const compatibility    = useMemo(() => parseCompatibility(compatLines), [compatLines]);
  const ltUsability      = useMemo(() => parseCompatibility(ltLines),    [ltLines]);
  const timeline         = useMemo(() => parseTimeline(resultsLines),    [resultsLines]);
  const ingredients      = useMemo(() => parseIngredients(ingLines),     [ingLines]);
  const safetyDisc       = useMemo(() => parseSafetyDisclosures(safetyDiscLines), [safetyDiscLines]);
  const { strengths, weaknesses } = useMemo(() => parseInsights(insightLines), [insightLines]);

  const truthItems  = useMemo(() => truthLines.length  > 0 ? parseNaturalEvidence(truthLines)  : [], [truthLines]);
  const herbalItems = useMemo(() => herbalLines.length > 0 ? parseNaturalEvidence(herbalLines) : [], [herbalLines]);

  // ── Ingredient groups ──
  const ingGroups = useMemo(() => {
    const groups: Record<string, Ingredient[]> = {};
    for (const ing of ingredients) {
      if (!groups[ing.group]) groups[ing.group] = [];
      groups[ing.group].push(ing);
    }
    return groups;
  }, [ingredients]);

  // ── Text extracts ──
  const profileText = profileLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join(" ").trim();
  const sqText      = sqLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join(" ").trim();
  const whyText     = whyLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join("\n").trim();

  // ── Compat tab label ──
  const compatTabLabel = (() => {
    if (archetype === "beard_serum") return "Skin";
    if (archetype === "hair_color")  return "Hair";
    return "Hair Type";
  })();

  // ── Safety tab label ──
  const hasSafetyDisclosures = safetyDisc.length > 0;

  // ── Tabs ──
  const TABS: Tab[] = [
    { id: "scores",          label: "Scores",           icon: "◎",  enabled: coreScores.length > 0 || specScores.length > 0 },
    { id: "insights",        label: "Insights",         icon: "⚡", enabled: strengths.length > 0 || weaknesses.length > 0 },
    { id: "compatibility",   label: compatTabLabel,     icon: "👤", enabled: compatibility.length > 0 },
    { id: "longterm",        label: "Long-Term",        icon: "📅", enabled: ltUsability.length > 0 || timeline.length > 0 },
    { id: "ingredients",     label: "Ingredients",      icon: "🔬", enabled: ingredients.length > 0 },
    { id: "science",         label: "Science",          icon: "🧠", enabled: true },
    { id: "safety",          label: "Safety",           icon: "⚠️", enabled: hasSafetyDisclosures },
    { id: "naturalevidence", label: "Natural Evidence", icon: "🌿", enabled: hasNaturalEvidence },
  ].filter((t) => t.enabled);

  const currentTab = TABS[Math.min(activeTab, TABS.length - 1)]?.id;

  return (
    <div style={{
      fontFamily  : "'Inter', system-ui, -apple-system, sans-serif",
      background  : T.bg,
      borderRadius: 24,
      overflow    : "hidden",
      color       : T.textDark,
    }}>

      {/* ══ HEADER BAR ══ */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: "13px 22px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, background: `linear-gradient(135deg, ${T.indigo}, #7C3AED)`,
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, flexShrink: 0,
        }}>
          💈
        </div>
        <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.08em", color: T.indigo }}>NIGOODA</span>
        <span style={{ fontSize: 12, color: T.borderMid, margin: "0 4px" }}>·</span>
        <span style={{ fontSize: 12, color: T.textFaint, fontWeight: 500 }}>Hair Care Intelligence</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{
            fontSize: 11, color: accent, background: profile.badgeColor,
            padding: "4px 12px", borderRadius: 99, border: `1px solid ${accent}30`,
            fontWeight: 600,
          }}>{cleanSectionTitle(profile.label).replace(" Analysis", "")}</span>
        </div>
      </div>

      {/* ══ SMART GUIDANCE ══ */}
      <SmartGuidanceBanner message="Check compatibility scores for your hair type" />

      {/* ══ EXECUTIVE DASHBOARD ══ */}
      <div style={{ background: T.surface, borderBottom: `1px solid ${T.border}`, padding: "22px 22px 0" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 16, marginBottom: 20, alignItems: "start",
          }}>
            {/* Left column */}
            <div>
              {/* Hero rating card */}
              <div style={{
                background: profile.gradient,
                borderRadius: 18, padding: "22px 24px", color: "#FFF", marginBottom: 14,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 6 }}>
                  ⭐ HAIR CARE ANALYSIS
                </div>
                <div style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4 }}>
                  {finalRating.toFixed(1)}
                  <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.6, marginLeft: 4 }}>/ {maxRating}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: ratingSubtitle ? 4 : 0 }}>
                  {rLabel}
                </div>
                {ratingSubtitle && (
                  <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginTop: 4 }}>{ratingSubtitle}</div>
                )}
                <div style={{ marginTop: 12 }}>
                  <Stars score={finalRating} max={maxRating} />
                </div>
              </div>

              {/* Profile + structural quality */}
              {(profileText || sqText) && (
                <div style={{
                  background: T.surfaceAlt, border: `1px solid ${T.border}`,
                  borderRadius: 14, padding: "14px 16px", marginBottom: 14,
                }}>
                  {profileText && (
                    <p style={{
                      margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.7,
                      marginBottom: sqText ? 8 : 0,
                    }}>
                      {profileText.slice(0, 220)}{profileText.length > 220 ? "…" : ""}
                    </p>
                  )}
                  {sqText && (
                    <p style={{
                      margin: 0, fontSize: 12.5, color: T.textFaint, lineHeight: 1.65,
                      borderTop: profileText ? `1px solid ${T.border}` : "none",
                      paddingTop: profileText ? 8 : 0,
                    }}>
                      {sqText.slice(0, 200)}{sqText.length > 200 ? "…" : ""}
                    </p>
                  )}
                </div>
              )}

              {/* Strengths / Concerns mini preview */}
              {(strengths.length > 0 || weaknesses.length > 0) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                  {strengths.length > 0 && (
                    <div style={{
                      background: "#F0FDF4", border: `1px solid ${T.greenLight}`,
                      borderRadius: 13, padding: "12px 14px",
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: T.green, marginBottom: 8, letterSpacing: "0.05em" }}>
                        ✓ KEY STRENGTHS
                      </div>
                      {strengths.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: T.textMid, marginBottom: 5, lineHeight: 1.5 }}>
                          <span style={{ color: T.mint, fontWeight: 800, flexShrink: 0 }}>+</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {weaknesses.length > 0 && (
                    <div style={{
                      background: "#FFF5F5", border: `1px solid ${T.redLight}`,
                      borderRadius: 13, padding: "12px 14px",
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: T.red, marginBottom: 8, letterSpacing: "0.05em" }}>
                        − CONCERNS
                      </div>
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

            {/* Right column — ring + metric chips */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
              <RatingRing score={finalRating} max={maxRating} color={rColor} />
              {coreScores.slice(0, 3).map((s, i) => (
                <div key={i} style={{
                  background: T.surfaceAlt, border: `1px solid ${T.border}`,
                  borderRadius: 10, padding: "6px 10px", width: 96, textAlign: "center",
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: scoreColor(s.score, s.maxScore) }}>
                    {s.score.toFixed(1)}
                  </div>
                  <div style={{ fontSize: 9.5, color: T.textFaint, fontWeight: 600, letterSpacing: "0.03em", marginTop: 1 }}>
                    {s.label.toUpperCase().slice(0, 14)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── TAB BAR ── */}
          <div
            ref={tabBarRef}
            style={{
              display: "flex", overflowX: "auto", scrollbarWidth: "none",
              marginLeft: -22, marginRight: -22, paddingLeft: 22,
              borderTop: `1px solid ${T.border}`,
            }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(i)}
                style={{
                  background  : "none",
                  border      : "none",
                  borderBottom: activeTab === i ? `2.5px solid ${accent}` : "2.5px solid transparent",
                  padding     : "11px 18px",
                  fontSize    : 12.5,
                  fontWeight  : activeTab === i ? 700 : 500,
                  color       : activeTab === i ? accent : T.textFaint,
                  cursor      : "pointer",
                  whiteSpace  : "nowrap",
                  display     : "flex",
                  alignItems  : "center",
                  gap         : 5,
                  transition  : "color 0.15s",
                }}
              >
                <span style={{ fontSize: 12 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══ TAB CONTENT ══ */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "22px 22px" }}>

        {/* ════ SCORES ════ */}
        {currentTab === "scores" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {coreScores.length > 0 && (
              <SectionCard title="Core Performance Scores" icon="📊" accent={accent}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
                  {coreScores.map((s, i) => <ScoreCard key={i} item={s} accentColor={accent} />)}
                </div>
              </SectionCard>
            )}
            {specScores.length > 0 && (
              <SectionCard title="Specialized Performance" icon="🧪" accent={accent}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
                  {specScores.map((s, i) => <ScoreCard key={i} item={s} accentColor={accent} />)}
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ════ INSIGHTS ════ */}
        {currentTab === "insights" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
            {strengths.length > 0 && (
              <SectionCard title="Structural Strengths" icon="✓" accent={T.green}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {strengths.map((s, i) => (
                    <div key={i} style={{
                      display: "flex", gap: 10, alignItems: "flex-start",
                      background: "#F0FDF4", border: `1px solid ${T.greenLight}`,
                      borderRadius: 10, padding: "10px 12px",
                    }}>
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
                    <div key={i} style={{
                      display: "flex", gap: 10, alignItems: "flex-start",
                      background: "#FFF5F5", border: `1px solid ${T.redLight}`,
                      borderRadius: 10, padding: "10px 12px",
                    }}>
                      <span style={{ color: T.red, fontWeight: 800, flexShrink: 0, marginTop: 1, fontSize: 14 }}>−</span>
                      <span style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ════ COMPATIBILITY ════ */}
        {currentTab === "compatibility" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <SectionCard
              title={compatKey ? cleanSectionTitle(compatKey) : `${compatTabLabel} Type Compatibility`}
              icon="👤"
              accent={accent}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
                {compatibility.map((item, i) => <CompatCard key={i} item={item} />)}
              </div>
            </SectionCard>
            <div style={{
              display: "flex", gap: 16, flexWrap: "wrap", padding: "12px 16px",
              background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12,
            }}>
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
        )}

        {/* ════ LONG-TERM ════ */}
        {currentTab === "longterm" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ltUsability.length > 0 && (
              <SectionCard title="Long-Term Usability" icon="📅" accent={accent}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 9 }}>
                  {ltUsability.map((item, i) => <CompatCard key={i} item={item} />)}
                </div>
              </SectionCard>
            )}
            {timeline.length > 0 && (
              <SectionCard title="Expected Real-World Results" icon="⏱" accent={accent}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {timeline.map((phase, i) => (
                    <TimelinePhaseCard key={phase.phase} phase={phase} index={i} total={timeline.length} />
                  ))}
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ════ INGREDIENTS ════ */}
        {currentTab === "ingredients" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <SectionCard title="Key Structural Ingredients" icon="🔬" accent={accent}>
              {Object.entries(ingGroups).map(([group, items]) => (
                <IngredientGroup key={group} group={group} items={items} color={items[0]?.color || ING_COLORS.Other} />
              ))}
            </SectionCard>
            <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 12, padding: "12px 16px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textFaint, letterSpacing: "0.07em", marginBottom: 8 }}>
                RISK CLASSIFICATION
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {RISK_LABELS.slice(1).map((label, i) => (
                  <span key={i} style={{
                    fontSize: 11, fontWeight: 600, color: RISK_COLORS[i + 1],
                    background: `${RISK_COLORS[i + 1]}18`, padding: "3px 10px", borderRadius: 99,
                  }}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ SCIENCE ════ */}
        {currentTab === "science" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {whyText ? (
              <SectionCard title="Why This Rating" icon="🧠" accent={accent}>
                <div style={{ fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>
                  <ReactMarkdown components={mdComponents}>{whyText}</ReactMarkdown>
                </div>
              </SectionCard>
            ) : whyLines.length > 0 ? (
              <SectionCard title="Why This Rating" icon="🧠" accent={accent}>
                <GenericSection lines={whyLines} accentColor={accent} />
              </SectionCard>
            ) : null}

            <div style={{
              background  : profile.gradient,
              borderRadius: 18, padding: "22px 24px", color: "#FFF",
              display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
            }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.65, marginBottom: 5 }}>
                  FINAL VERDICT
                </div>
                <div style={{ fontWeight: 900, fontSize: 48, letterSpacing: "-1.5px", lineHeight: 1 }}>
                  {finalRating.toFixed(1)}
                </div>
                <div style={{ fontSize: 12, opacity: 0.65, marginTop: 3 }}>/ {maxRating} · {rLabel}</div>
              </div>
              <div style={{ flex: 1, minWidth: 120 }}>
                <Stars score={finalRating} max={maxRating} />
                {ratingSubtitle && (
                  <div style={{ fontSize: 12.5, opacity: 0.8, lineHeight: 1.55, marginTop: 8 }}>{ratingSubtitle}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ════ SAFETY (Hair Color / Dye) ════ */}
        {currentTab === "safety" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <SectionCard title="Mandatory Safety Disclosures" icon="⚠️" accent={T.red}>
              <div style={{
                background: "#FFF5F5", border: `1px solid ${T.redLight}`,
                borderRadius: 12, padding: "12px 14px", marginBottom: 12,
                fontSize: 12, color: T.red, lineHeight: 1.6,
              }}>
                These disclosures are structurally required based on product chemistry. Review all flagged items before use.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {safetyDisc.map((item, i) => (
                  <SafetyDisclosureCard key={i} item={item} />
                ))}
              </div>
            </SectionCard>
          </div>
        )}

        {/* ════ NATURAL EVIDENCE ════ */}
        {currentTab === "naturalevidence" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {truthItems.length > 0 && (
              <SectionCard title="Truth About Natural Claims" icon="🌿" accent={T.teal}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {truthItems.map((item, i) => (
                    <NaturalEvidenceCard key={i} item={item} accent={T.teal} />
                  ))}
                </div>
              </SectionCard>
            )}
            {herbalItems.length > 0 && (
              <SectionCard title="Herbal Evidence Assessment" icon="🧬" accent="#7C3AED">
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {herbalItems.map((item, i) => (
                    <NaturalEvidenceCard key={i} item={item} accent="#7C3AED" />
                  ))}
                </div>
              </SectionCard>
            )}
            {truthItems.length === 0 && herbalItems.length === 0 && (
              <div style={{
                background: T.surfaceAlt, border: `1px solid ${T.border}`,
                borderRadius: 14, padding: "28px 24px", textAlign: "center",
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>🌿</div>
                <div style={{ fontSize: 13, color: T.textFaint }}>Natural evidence data is being processed.</div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}