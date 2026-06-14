import React, { useState, useRef, useMemo } from "react";
import ReactMarkdown from "react-markdown";

// ─── HYGIENECARE METADATA ────────────────────────────────────────────────────
const HC_BRAND    = "NIGOODA";
const HC_TITLE    = "Hygiene Intelligence";
const HC_BADGE    = "Scientific Analysis";
const HC_HERO_LBL = "⭐ HYGIENE ANALYSIS";
const HC_GUIDANCE = "Check compatibility scores for your skin and hygiene needs";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface ScoreItem      { label: string; score: number; maxScore: number; reason: string; }
interface CompatItem     { label: string; score: number; compatible: boolean; reason: string; }
interface Ingredient     { name: string; purpose: string; group: string; riskLevel: number; color: ColorSet; }
interface TimelinePhase  { phase: string; label: string; sub: string; outcomes: string[]; }
interface ColorSet       { bg: string; dot: string; text: string; border: string; }
interface EvidenceItem   { label: string; body: string; }
interface Tab            { id: string; label: string; icon: string; }

// ─── PRODUCT TYPE DETECTION ──────────────────────────────────────────────────
type ProductType =
  | "hand_wash" | "body_wash" | "intimate_wash" | "sanitizer" | "deodorant"
  | "antiperspirant" | "foot_care" | "antiseptic" | "wipes" | "hygiene_powder"
  | "antibacterial" | "generic";

function detectProductType(md: string): ProductType {
  const lower = md.toLowerCase();
  if (/antiseptic liquid|antiseptic profile/i.test(lower))          return "antiseptic";
  if (/foot care|foot cream|keratolytic/i.test(lower))              return "foot_care";
  if (/hand sanitizer|sanitiser|alcohol gel|alcohol.based/i.test(lower)) return "sanitizer";
  if (/hand wash|hand wash profile/i.test(lower))                   return "hand_wash";
  if (/body wash/i.test(lower))                                     return "body_wash";
  if (/intimate wash|intimate.wash profile|vulvovaginal|mucosal/i.test(lower)) return "intimate_wash";
  if (/hygiene wipes|wet wipes|baby wipe/i.test(lower))            return "wipes";
  if (/deodorant/i.test(lower) && !/antiperspirant/i.test(lower))  return "deodorant";
  if (/antiperspirant/i.test(lower))                                return "antiperspirant";
  if (/hygiene powder|foot powder/i.test(lower))                   return "hygiene_powder";
  if (/antibacterial wash/i.test(lower))                            return "antibacterial";
  return "generic";
}

const PRODUCT_ICONS: Record<ProductType, string> = {
  hand_wash     : "🧼",
  body_wash     : "🚿",
  intimate_wash : "🌸",
  sanitizer     : "🧴",
  deodorant     : "💨",
  antiperspirant: "🛡️",
  foot_care     : "🦶",
  antiseptic    : "⚕️",
  wipes         : "🧻",
  hygiene_powder: "🌿",
  antibacterial : "🦠",
  generic       : "🧴",
};

const PRODUCT_GRADIENT: Record<ProductType, string> = {
  hand_wash     : "linear-gradient(135deg, #0D9488 0%, #0891B2 100%)",
  body_wash     : "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
  intimate_wash : "linear-gradient(135deg, #EC4899 0%, #A855F7 100%)",
  sanitizer     : "linear-gradient(135deg, #0369A1 0%, #0D9488 100%)",
  deodorant     : "linear-gradient(135deg, #0891B2 0%, #6366F1 100%)",
  antiperspirant: "linear-gradient(135deg, #1D4ED8 0%, #0891B2 100%)",
  foot_care     : "linear-gradient(135deg, #7C3AED 0%, #0D9488 100%)",
  antiseptic    : "linear-gradient(135deg, #DC2626 0%, #7C3AED 100%)",
  wipes         : "linear-gradient(135deg, #10B981 0%, #0D9488 100%)",
  hygiene_powder: "linear-gradient(135deg, #92400E 0%, #059669 100%)",
  antibacterial : "linear-gradient(135deg, #DC2626 0%, #0D9488 100%)",
  generic       : "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
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
  pink        : "#EC4899",
  pinkLight   : "#FCE7F3",
  blue        : "#0369A1",
  blueLight   : "#E0F2FE",
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
// SECTION II — DOMAIN PARSERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  let current: ScoreItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(
  /^(?:#{1,4}\s+)?(.+?)\s+—\s+⭐?\s*(\d+\.?\d*)/
);
    if (m) {
      if (current) items.push(current);
      const remaining = t.slice(m[0].length).replace(/^[—:–\-\s]+/, "").trim();
      current = {
        label   : cleanBullet(m[1]).trim(),
score: Math.min(5, Math.max(0, parseFloat(m[2]))),
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
const m = t.match(
  /^(?:#{1,4}\s+)?(.+?)\s+—\s+⭐?\s*(\d+\.?\d*)/
);    if (m) {
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
    { phase: "immediate", label: "Immediate",   sub: "First Application",  outcomes: [] },
    { phase: "medium",    label: "Medium-Term", sub: "2–4 Weeks",          outcomes: [] },
    { phase: "longterm",  label: "Long-Term",   sub: "4–12 Weeks & Beyond", outcomes: [] },
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
      // top-level — skip
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
// SECTION III — INGREDIENT SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ING_GROUPS: Record<string, string[]> = {
  Alcohols        : ["ethanol", "isopropanol", "alcohol denat", "ethyl alcohol"],
  Antimicrobials  : ["chlorhexidine", "cpc", "cetylpyridinium", "triclosan", "benzalkonium", "bkc", "octenidine", "povidone", "iodine", "biguanide"],
  Humectants      : ["glycerin", "glycerol", "sorbitol", "propylene glycol", "butylene glycol", "polyethylene glycol"],
  Emollients      : ["dimethicone", "cyclomethicone", "shea", "jojoba", "aloe vera", "squalane", "lanolin", "mineral oil", "petrolatum"],
  Surfactants     : ["sodium lauryl", "sls", "sodium laureth", "sles", "cocamidopropyl", "coco glucoside", "decyl glucoside", "betaine", "cocoyl"],
  Keratolytics    : ["urea", "lactic acid", "salicylic acid", "glycolic acid", "aha", "bha"],
  Preservatives   : ["phenoxyethanol", "paraben", "methylisothiazolinone", "mi", "mci", "benzoate", "sorbate", "ethylhexylglycerin"],
  FragrancesOils  : ["fragrance", "parfum", "essential oil", "tea tree", "lavender", "eucalyptus", "peppermint", "limonene", "linalool"],
  Occlusives      : ["beeswax", "carnauba", "petrolatum", "zinc oxide", "titanium dioxide"],
  ActiveFillers   : ["niacinamide", "panthenol", "allantoin", "bisabolol", "hyaluronic", "ceramide", "centella"],
};

const ING_COLORS: Record<string, ColorSet> = {
  Alcohols       : { bg:"#EFF6FF", dot:"#3B82F6", text:"#1E3A8A", border:"#BFDBFE" },
  Antimicrobials : { bg:"#FFF7ED", dot:"#F97316", text:"#7C2D12", border:"#FED7AA" },
  Humectants     : { bg:"#F0F9FF", dot:"#0EA5E9", text:"#0C4A6E", border:"#BAE6FD" },
  Emollients     : { bg:"#FDF4FF", dot:"#A855F7", text:"#581C87", border:"#E9D5FF" },
  Surfactants    : { bg:"#F0FDF4", dot:"#22C55E", text:"#14532D", border:"#DCFCE7" },
  Keratolytics   : { bg:"#ECFDF5", dot:"#10B981", text:"#064E3B", border:"#A7F3D0" },
  Preservatives  : { bg:"#F8FAFC", dot:"#94A3B8", text:"#334155", border:"#E2E8F0" },
  FragrancesOils : { bg:"#FFF1F2", dot:"#F43F5E", text:"#881337", border:"#FECDD3" },
  Occlusives     : { bg:"#FFFBEB", dot:"#D97706", text:"#78350F", border:"#FDE68A" },
  ActiveFillers  : { bg:"#F0FDF4", dot:"#4ADE80", text:"#14532D", border:"#BBF7D0" },
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
  if (/methylisothiazolinone|mci|chlorhexidine near|triclosan|benzalkonium/.test(lower)) return 5;
  if (/sodium lauryl|sls|fragrance|parfum|essential oil/.test(lower))                     return 4;
  if (/paraben|limonene|linalool|lanolin/.test(lower))                                    return 3;
  if (/alcohol denat|isopropanol|salicylic|glycolic/.test(lower))                         return 2;
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
// SECTION V — PRIMITIVE COMPONENTS
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
// SECTION VI — CARD COMPONENTS
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
// SECTION VII — TIMELINE + INGREDIENTS
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
// SECTION VIII — SPECIALIZED HYGIENE METRICS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface HygieneMetric { label: string; value: string; color: string; icon: string; }

function detectHygieneMetrics(productType: ProductType, scores: ScoreItem[]): HygieneMetric[] {
  const metrics: HygieneMetric[] = [];
  const findScore = (kw: string) =>
    scores.find((s) => s.label.toUpperCase().includes(kw.toUpperCase()))?.score;

  const microbiomeScore = findScore("MICROBIOME");
  if (microbiomeScore !== undefined) {
    metrics.push({ label: "Microbiome Safety", value: `${microbiomeScore.toFixed(1)}/5`, color: scoreColor(microbiomeScore), icon: "🦠" });
  }

  if (productType === "intimate_wash") {
    const phScore = findScore("BARRIER") ?? findScore("MUCOSAL");
    if (phScore !== undefined)
      metrics.push({ label: "Mucosal Safety", value: `${phScore.toFixed(1)}/5`, color: scoreColor(phScore), icon: "🌸" });
  }

  if (productType === "sanitizer" || productType === "antiseptic") {
    const killScore = findScore("PATHOGEN") ?? findScore("ANTIMICROBIAL EFFICACY");
    if (killScore !== undefined)
      metrics.push({ label: "Kill Efficacy", value: `${killScore.toFixed(1)}/5`, color: scoreColor(killScore), icon: "⚕️" });
    const amrScore = findScore("AMR");
    if (amrScore !== undefined)
      metrics.push({ label: "AMR Risk", value: `${amrScore.toFixed(1)}/5`, color: scoreColor(amrScore), icon: "⚠️" });
  }

  if (productType === "foot_care") {
    const kerScore = findScore("KERATOLYTIC");
    if (kerScore !== undefined)
      metrics.push({ label: "Keratolytic Power", value: `${kerScore.toFixed(1)}/5`, color: scoreColor(kerScore), icon: "🦶" });
  }

  const barrierScore = findScore("BARRIER");
  if (barrierScore !== undefined && productType !== "intimate_wash")
    metrics.push({ label: "Barrier Preservation", value: `${barrierScore.toFixed(1)}/5`, color: scoreColor(barrierScore), icon: "🛡️" });

  const irritScore = findScore("CUMULATIVE IRRITATION") ?? findScore("IRRITATION");
  if (irritScore !== undefined)
    metrics.push({ label: "Irritation Risk", value: `${irritScore.toFixed(1)}/5`, color: scoreColor(irritScore), icon: "⚡" });

  return metrics;
}

function HygieneMetricChip({ metric }: { metric: HygieneMetric }) {
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
// SECTION IX — GENERIC SECTION + MARKDOWN
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
        const isBullet = /^[-•*]/.test(t) || /^[-•*]/.test(line.trim());
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
// SECTION X — HEADER COMPONENTS
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
// SECTION XI — TAB BAR
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
// SECTION XII — TAB CONTENT PANELS
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

function CompatibilityPanel({ items, title }: { items: CompatItem[]; title: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title={title} icon="👤">
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

function LongTermPanel({ ltUsability, timeline }: { ltUsability: CompatItem[]; timeline: TimelinePhase[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ltUsability.length > 0 && (
        <SectionCard title="Long-Term Usability" icon="📅">
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
        <SectionCard title="Herbal Evidence Assessment" icon="🧬" accent="#7C3AED">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {herbalItems.map((item, i) => <EvidenceCard key={i} item={item} accent="#7C3AED" />)}
          </div>
        </SectionCard>
      )}
      {truthItems.length === 0 && herbalItems.length === 0 && (
        <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 14, padding: "28px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌿</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Natural evidence data is being processed.</div>
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XIII — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface HygieneCareProps { markdown: string; }

export default function HygieneCare({ markdown }: HygieneCareProps) {
  const [activeTab, setActiveTab] = useState(0);

  // ── Guard ──
  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, borderRadius: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🧴</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>No analysis data found</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Please provide a valid hygiene product analysis result.</div>
        </div>
      </div>
    );
  }

  // ── Detect product type ──
  const productType = useMemo(() => detectProductType(markdown), [markdown]);
  const gradient    = PRODUCT_GRADIENT[productType];

  // ── Parse markdown ──
  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // ── Section extraction ──
  const { key: ratingKey }      = findSection(sections, ["FINAL RATING"]);
  const { lines: profileLines } = findSection(sections, ["PRODUCT PROFILE", "PROFILE", "FOOT CREAM PROFILE", "ANTISEPTIC PROFILE", "INTIMATE WASH PROFILE", "HAND WASH PROFILE"]);
  const { lines: sqLines }      = findSection(sections, ["STRUCTURAL QUALITY"]);
  const { lines: coreLines }    = findSection(sections, ["CORE SCORES"]);
  const { lines: specLines }    = findSection(sections, ["SPECIALIZED PERFORMANCE"]);
  const { lines: insightLines } = findSection(sections, ["STRUCTURAL INSIGHT", "INSIGHT"]);

  // Compatibility — may be titled differently per product
  const compatMatch             = findSections(sections, ["COMPATIBILITY", "USER COMPATIBILITY", "SKIN TYPE", "POPULATION COMPATIBILITY"]);
  const compatLines             = compatMatch[0]?.lines ?? [];
  const compatKey               = compatMatch[0]?.key ?? null;

  const { lines: ltLines }      = findSection(sections, ["LONG-TERM USABILITY", "USE FREQUENCY", "USE PROTOCOL"]);
  const { lines: resultsLines } = findSection(sections, ["EXPECTED REAL-WORLD RESULTS", "EXPECTED RESULTS"]);
  const { lines: ingLines }     = findSection(sections, ["KEY STRUCTURAL INGREDIENTS", "INGREDIENTS"]);
  const { lines: whyLines }     = findSection(sections, ["WHY THIS RATING"]);

  // Natural / herbal sections
  const herbalMatch      = findSection(sections, ["HERBAL EVIDENCE ASSESSMENT"]);
  const naturalTruthMatch = Array.from(sections.entries()).find(([key]) =>
    norm(key).includes("NATURAL") && (norm(key).includes("CLAIM") || norm(key).includes("TRUTH"))
  );
  const truthLines  = naturalTruthMatch?.[1] ?? [];
  const herbalLines = herbalMatch.lines;
  const hasNatural  = truthLines.length > 0 || herbalLines.length > 0;

  // ── Extract rating ──
  const ratingLines = ratingKey ? (sections.get(ratingKey) || []) : [];
  const ratingText  = ratingKey ? [ratingKey, ...ratingLines].join(" ") : "";
  let finalRating = 0, maxRating = 5, ratingSubtitle = "";
  const rm = ratingText.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
  if (rm) { finalRating = parseFloat(rm[1]); maxRating = parseInt(rm[2]); }
  const rmSub = ratingText.match(/\d+\.?\d*\s*\/\s*\d+\s*[—–\-]+\s*(.+)/);
  if (rmSub) ratingSubtitle = rmSub[1].trim();

  const rColor = scoreColor(finalRating, maxRating);
  const rLabel = scoreLabel(finalRating, maxRating);

  // ── Parse data ──
  const coreScores    = useMemo(() => parseScores(coreLines),           [coreLines]);
  const specScores    = useMemo(() => parseScores(specLines),            [specLines]);
  const compatibility = useMemo(() => parseCompatibility(compatLines),   [compatLines]);
  const ltUsability   = useMemo(() => parseCompatibility(ltLines),       [ltLines]);
  const timeline      = useMemo(() => parseTimeline(resultsLines),       [resultsLines]);
  const ingredients   = useMemo(() => parseIngredients(ingLines),        [ingLines]);
  const { strengths, weaknesses } = useMemo(() => parseInsights(insightLines), [insightLines]);
  const truthItems    = useMemo(() => parseEvidenceItems(truthLines),    [truthLines]);
  const herbalItems   = useMemo(() => parseEvidenceItems(herbalLines),   [herbalLines]);

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
  const allScores    = [...coreScores, ...specScores];
  const profileText  = linesAsText(profileLines);
  const sqText       = linesAsText(sqLines);
  const whyText      = whyLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join("\n").trim();

  // ── Hygiene metrics for executive panel ──
  const hygieneMetrics = useMemo(() => detectHygieneMetrics(productType, allScores), [productType, allScores]);

  // ── Compatibility tab label ──
  const compatTabLabel = compatKey
    ? cleanSectionTitle(compatKey)
        .replace(/SKIN TYPE AND CONDITION/i, "")
        .replace(/POPULATION/i, "")
        .replace(/COMPATIBILITY/i, "")
        .replace(/USER/i, "")
        .trim() || "User"
    : "User";

  // ── Tab definition ──
  const TABS: Tab[] = [
    { id: "scores",        label: "Scores",          icon: "◎"  },
    { id: "insights",      label: "Insights",        icon: "⚡"  },
    { id: "compatibility", label: "Compatibility",   icon: "👤" },
    { id: "longterm",      label: "Long-Term",       icon: "📅" },
    { id: "ingredients",   label: "Ingredients",     icon: "🔬" },
    { id: "science",       label: "Science",         icon: "🧠" },
    { id: "natural",       label: "Natural Evidence", icon: "🌿" },
  ].filter((tab) => {
    if (tab.id === "scores")        return coreScores.length > 0 || specScores.length > 0;
    if (tab.id === "insights")      return strengths.length > 0 || weaknesses.length > 0;
    if (tab.id === "compatibility") return compatibility.length > 0;
    if (tab.id === "longterm")      return ltUsability.length > 0 || timeline.length > 0;
    if (tab.id === "ingredients")   return ingredients.length > 0;
    if (tab.id === "science")       return true;
    if (tab.id === "natural")       return hasNatural;
    return false;
  });

  const safeActiveTab = Math.min(activeTab, TABS.length - 1);
  const currentTabId  = TABS[safeActiveTab]?.id;

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
              {/* Hero rating card */}
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

              {/* Profile + structural quality */}
              {(profileText || sqText) && (
                <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                  {profileText && (
  <p style={{
    margin: 0,
    fontSize: 13,
    color: T.textMid,
    lineHeight: 1.7,
    marginBottom: sqText ? 8 : 0,
    whiteSpace: "pre-wrap",
  }}>
    {profileText}
  </p>
)}

{sqText && (
  <p style={{
    margin: 0,
    fontSize: 12.5,
    color: T.textFaint,
    lineHeight: 1.65,
    borderTop: profileText ? `1px solid ${T.border}` : "none",
    paddingTop: profileText ? 8 : 0,
    whiteSpace: "pre-wrap",
  }}>
    {sqText}
  </p>
)}
                </div>
              )}

              {/* Strengths / Concerns mini preview */}
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

            {/* Right column — ring + hygiene metric chips */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
              <RatingRing score={finalRating} max={maxRating} color={rColor} />
              {hygieneMetrics.slice(0, 3).map((m, i) => (
                <HygieneMetricChip key={i} metric={m} />
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

        {currentTabId === "insights" && (
          <InsightsPanel strengths={strengths} weaknesses={weaknesses} />
        )}

        {currentTabId === "compatibility" && (
          <CompatibilityPanel
            items={compatibility}
            title={`${compatTabLabel} Compatibility`.trim()}
          />
        )}

        {currentTabId === "longterm" && (
          <LongTermPanel ltUsability={ltUsability} timeline={timeline} />
        )}

        {currentTabId === "ingredients" && (
          <IngredientsPanel ingGroups={ingGroups} />
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