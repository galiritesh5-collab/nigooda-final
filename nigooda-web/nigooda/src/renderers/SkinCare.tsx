import React, { useState, useMemo } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION I — BRAND + DESIGN TOKENS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BRAND = "NIGOODA";
const TITLE = "Skin Care Intelligence";
const SUBTITLE = "Analyze long-term skin compatibility and formulation architecture";

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
  violet      : "#7C3AED",
  violetLight : "#EDE9FE",
  blue        : "#0369A1",
  blueLight   : "#E0F2FE",
  orange      : "#EA580C",
  orangeLight : "#FFF7ED",
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
// SECTION II — PRODUCT MODE DETECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type ProductMode =
  | "moisturizer" | "daycream" | "nightcream" | "serum"
  | "sunscreen" | "toner" | "cleanser" | "eyecream"
  | "facemask" | "lipbalm" | "generic";

const PRODUCT_META: Record<ProductMode, { icon: string; label: string; gradient: string; accent: string }> = {
  moisturizer : { icon: "🧴", label: "Moisturizer",    gradient: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)", accent: T.indigo },
  daycream    : { icon: "☀️", label: "Day Cream",      gradient: "linear-gradient(135deg,#0D9488 0%,#0369A1 100%)", accent: T.teal },
  nightcream  : { icon: "🌙", label: "Night Cream",    gradient: "linear-gradient(135deg,#1E1B4B 0%,#4F46E5 100%)", accent: "#312E81" },
  serum       : { icon: "💧", label: "Serum",          gradient: "linear-gradient(135deg,#0891B2 0%,#6366F1 100%)", accent: "#0891B2" },
  sunscreen   : { icon: "🌞", label: "Sunscreen",      gradient: "linear-gradient(135deg,#D97706 0%,#DC2626 100%)", accent: T.amber },
  toner       : { icon: "🫧", label: "Toner",          gradient: "linear-gradient(135deg,#10B981 0%,#0D9488 100%)", accent: T.mint },
  cleanser    : { icon: "🫧", label: "Face Cleanser",  gradient: "linear-gradient(135deg,#06B6D4 0%,#10B981 100%)", accent: "#06B6D4" },
  eyecream    : { icon: "👁️", label: "Eye Cream",      gradient: "linear-gradient(135deg,#7C3AED 0%,#EC4899 100%)", accent: T.violet },
  facemask    : { icon: "🎭", label: "Face Mask",      gradient: "linear-gradient(135deg,#059669 0%,#0D9488 100%)", accent: "#059669" },
  lipbalm     : { icon: "💋", label: "Lip Balm",       gradient: "linear-gradient(135deg,#E11D48 0%,#D97706 100%)", accent: "#E11D48" },
  generic     : { icon: "🧴", label: "Skincare",       gradient: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 100%)", accent: T.indigo },
};

function detectProductMode(md: string): ProductMode {
  const l = md.toLowerCase();
  if (/eye cream|periorbital|ocular tolerance/i.test(l))                             return "eyecream";
  if (/lip balm|lip barrier|trpm8|vermillion/i.test(l))                              return "lipbalm";
  if (/face mask|facial mask|clay mask|occlusion.*active/i.test(l))                  return "facemask";
  if (/sunscreen|spf|photostability|uva tier|uv protection/i.test(l))               return "sunscreen";
  if (/night cream|overnight.*cream|circadian|overnight recovery/i.test(l))          return "nightcream";
  if (/day cream|daytime.*cream|spf.*layer|layering.*spf/i.test(l))                  return "daycream";
  if (/serum|active delivery|retinoid|vitamin c|niacinamide serum/i.test(l))         return "serum";
  if (/toner|exfoliating toner|microbiome.*compat|layering.*compat.*toner/i.test(l)) return "toner";
  if (/face wash|face cleaner|cleanser|surfactant|syndet|cleansing efficiency/i.test(l)) return "cleanser";
  if (/moisturizer|moisturiser|humectant.*emollient/i.test(l))                       return "moisturizer";
  return "generic";
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION III — TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ScoreItem     { label: string; score: number; reason: string; badge?: string; }
interface CompatItem    { label: string; score: number; reason: string; }
interface TimelinePhase { phase: string; label: string; sub: string; outcomes: string[]; }
interface Ingredient    { name: string; role: string; group: string; risk: number; }
interface Warning       { title: string; detail: string; severity: "critical" | "moderate"; }
interface EvidenceItem  { label: string; body: string; }
interface Tab           { id: string; label: string; icon: string; }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IV — MARKDOWN PARSING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseMarkdown(md: string): Map<string, string[]> {
  const lines    = md.split(/\r?\n/);
  const sections = new Map<string, string[]>();
  let current    = "__intro__";
  sections.set(current, []);

  for (const line of lines) {
    const t = line.trim();
    if (!t || t === "---") continue;
    if (/^#\s/.test(t)) {
      current = t.replace(/^#\s+/, "").trim();
      if (!sections.has(current)) sections.set(current, []);
    } else {
      sections.get(current)?.push(t);
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
): string[] {
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) return lines;
  }
  return [];
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

function linesAsText(lines: string[]): string {
  return lines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join(" ").trim();
}

function previewText(s: string, max = 90): string {
  if (!s) return "";
  const first = s.split(/[.!?]/)[0]?.trim() ?? s;
  const cut = first.slice(0, max);
  return cut.length < s.length ? cut + "…" : cut;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION V — DOMAIN PARSERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function parseScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  let current: ScoreItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    // Strict score extraction — only match "Title — ⭐X.X" pattern
    const m = t.match(/^(?:#{1,4}\s+)?(.+?)\s+—\s+⭐?\s*(\d+\.?\d*)/);
    if (m) {
      if (current) items.push(current);
      const remaining = t.slice(m[0].length).replace(/^[—:–\-\s]+/, "").trim();
      // Check for inline badge like (UVA Tier: 1) or (Class: 3)
      const badgeM = m[1].match(/\(([^)]+)\)\s*$/);
      const label  = badgeM ? m[1].replace(badgeM[0], "").trim() : m[1].trim();
      current = {
        label  : cleanBullet(label),
        score  : Math.min(5, Math.max(0, parseFloat(m[2]))),
        reason : remaining || "",
        badge  : badgeM ? badgeM[1] : undefined,
      };
    } else if (current) {
      const clean = cleanBullet(t);
      if (clean.length > 2 && !/^#{1,4}\s/.test(t)) {
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
      current = {
        label  : cleanBullet(m[1]).trim(),
        score  : Math.min(5, Math.max(0, parseFloat(m[2]))),
        reason : remaining || "",
      };
    } else if (current) {
      const clean = cleanBullet(t);
      if (clean.length > 2 && !/^#{1,4}\s/.test(t)) {
        current.reason = current.reason ? current.reason + " " + clean : clean;
      }
    }
  }
  if (current) items.push(current);
  return items.filter((i) => i.score >= 0);
}

// For compat sections without scores (Eye Cream, Toner advisory)
function parseCompatAdvisory(lines: string[]): CompatItem[] {
  const items: CompatItem[] = [];
  let currentLabel = "";
  let currentBody  = "";

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const isH = /^#{2,4}\s/.test(t);
    if (isH) {
      if (currentLabel) {
        items.push({ label: currentLabel, score: 3.5, reason: currentBody.trim() });
      }
      currentLabel = t.replace(/^#{2,4}\s+/, "").trim();
      currentBody  = "";
    } else {
      const clean = cleanBullet(t);
      if (clean.length > 2) currentBody += " " + clean;
    }
  }
  if (currentLabel) items.push({ label: currentLabel, score: 3.5, reason: currentBody.trim() });

  // If items have scores from score-parse, prefer those
  const scored = parseCompatibility(lines);
  return scored.length > 0 ? scored : items;
}

function parseTimeline(lines: string[]): TimelinePhase[] {
  const phases: TimelinePhase[] = [
    { phase: "immediate", label: "Immediate",    sub: "1–7 Days",           outcomes: [] },
    { phase: "medium",    label: "Medium-Term",  sub: "2–8 Weeks",          outcomes: [] },
    { phase: "longterm",  label: "Long-Term",    sub: "2–12 Months",        outcomes: [] },
    { phase: "outcome",   label: "Outcome",      sub: "Dermatological Conclusion", outcomes: [] },
  ];
  let cur: TimelinePhase | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const isH  = /^#{1,4}\s/.test(t);
    const isB  = /^[-•*]/.test(t);
    if (/immediate|1.?7 day/i.test(t) && (isH || !isB))            { cur = phases[0]; continue; }
    if (/medium.?term|2.?8 week/i.test(t) && (isH || !isB))        { cur = phases[1]; continue; }
    if (/long.?term|2.?12 month/i.test(t) && (isH || !isB))        { cur = phases[2]; continue; }
    if (/realistic derm|outcome|conclusion/i.test(t) && (isH || !isB)) { cur = phases[3]; continue; }
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
    if (/^#{1,4}\s*strength/i.test(t))                                { inS = true;  inW = false; continue; }
    if (/^#{1,4}\s*(weakness|concern|weaknesses|concerns)/i.test(t))  { inW = true;  inS = false; continue; }
    const clean = cleanBullet(t);
    if (!clean || clean.length < 3) continue;
    if (inS) strengths.push(clean);
    else if (inW) weaknesses.push(clean);
  }
  return { strengths, weaknesses };
}

function parseWarnings(lines: string[]): Warning[] {
  const warnings: Warning[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || /^#{1,4}\s/.test(t)) continue;
    const clean = cleanBullet(t);
    if (clean.length < 3) continue;
    const isCritical = /PHOTOTOXIC|PHOTOALLERGY|FRAGRANCE.*RISK|HIGH.PH|RETINOID.*CONCERN|NMF SUPPRESSION|TRPM8|OCULAR.*RISK|ACTIVE.*SAFETY|AMR|BENZOPHENONE/i.test(clean);
    const colonIdx  = clean.indexOf(":");
    const title     = colonIdx > -1 ? clean.slice(0, colonIdx).replace(/^\*+|\*+$/g, "").trim() : clean.slice(0, 40);
    const detail    = colonIdx > -1 ? clean.slice(colonIdx + 1).trim() : clean;
    warnings.push({ title, detail, severity: isCritical ? "critical" : "moderate" });
  }
  return warnings;
}

const ING_GROUPS: Record<string, string[]> = {
  "Physiological Lipids" : ["ceramide", "cholesterol", "fatty acid", "sphingolipid", "phytosphingosine"],
  "Humectants"           : ["glycerin", "glycerol", "hyaluronic", "sodium pca", "urea", "sorbitol", "propylene glycol", "butylene glycol", "panthenol"],
  "Occlusives"           : ["petrolatum", "dimethicone", "beeswax", "carnauba", "lanolin", "mineral oil", "squalane", "shea"],
  "Actives"              : ["retinol", "retinal", "hpr", "hydroxypinacolone", "niacinamide", "vitamin c", "ascorbic", "l-aa", "laa", "glycolic", "lactic", "salicylic", "aha", "bha", "peptide", "bakuchiol"],
  "UV Filters"           : ["avobenzone", "octinoxate", "oxybenzone", "octocrylene", "tinosorb", "uvinul", "mexoryl", "titanium dioxide", "zinc oxide", "bisoctrizole", "iscotrizinol"],
  "Emollients"           : ["caprylic", "capric", "isononyl", "jojoba", "argan", "rosehip", "marula", "squalane", "cyclomethicone"],
  "Surfactants"          : ["sodium lauryl", "sls", "sodium laureth", "sles", "cocamidopropyl", "coco glucoside", "decyl glucoside"],
  "Preservatives"        : ["phenoxyethanol", "paraben", "methylisothiazolinone", "mi ", "mci", "ethylhexylglycerin", "benzoate", "sorbate"],
  "Fragrance / EOs"      : ["fragrance", "parfum", "essential oil", "limonene", "linalool", "citronellol", "geraniol", "eugenol"],
  "Antioxidants"         : ["tocopherol", "vitamin e", "resveratrol", "ferulic", "coq10", "ubiquinone"],
};

const ING_RISK: Record<string, number> = {
  "Fragrance / EOs"      : 5,
  "Preservatives"        : 3,
  "Surfactants"          : 3,
  "UV Filters"           : 2,
  "Actives"              : 2,
  "Humectants"           : 1,
  "Physiological Lipids" : 1,
  "Occlusives"           : 1,
  "Emollients"           : 1,
  "Antioxidants"         : 1,
};

function inferIngredientGroup(name: string): string {
  const l = name.toLowerCase();
  for (const [g, kws] of Object.entries(ING_GROUPS)) {
    if (kws.some((k) => l.includes(k))) return g;
  }
  return "Other";
}

function parseIngredients(lines: string[]): Ingredient[] {
  return lines
    .filter((l) => !/^#{1,4}\s/.test(l.trim()))
    .map((l) => {
      const clean = cleanBullet(l);
      if (!clean || clean.length < 2) return null;
      const parts = clean.split(/[:—–\-]/);
      const name  = parts[0]?.trim() ?? clean;
      if (name.length < 2) return null;
      const role  = parts.slice(1).join(" — ").trim() || "Functional ingredient";
      const group = inferIngredientGroup(name);
      return { name, role, group, risk: ING_RISK[group] ?? 2 };
    })
    .filter(Boolean) as Ingredient[];
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
    } else if (!/^#\s/.test(t)) {
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
// SECTION VI — SCORE UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function scoreColor(score: number): string {
  if (score >= 4.5) return "#059669";
  if (score >= 3.8) return T.mint;
  if (score >= 3.0) return T.teal;
  if (score >= 2.2) return T.amber;
  return T.red;
}

function scoreLabel(score: number): string {
  if (score >= 4.5) return "Excellent";
  if (score >= 3.8) return "Strong";
  if (score >= 3.0) return "Good";
  if (score >= 2.2) return "Moderate";
  if (score >= 1.5) return "Weak";
  return "Poor";
}

function pct(score: number): number {
  return Math.min(100, Math.max(0, score * 20));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VII — PRIMITIVE COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoreBar({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <div style={{ height: 4, background: T.border, borderRadius: 99, overflow: "hidden", flex: 1, minWidth: 48 }}>
      <div
        style={{
          height: "100%",
          width: `${pct(score)}%`,
          background: color,
          borderRadius: 99,
          transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

function RatingRing({ score, max, color }: { score: number; max: number; color: string }) {
  const r    = 38;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(1, score / max) * circ;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" aria-label={`Rating: ${score} out of ${max}`}>
      <circle cx="48" cy="48" r={r} fill="none" stroke={T.border} strokeWidth="7" />
      <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)" }}
      />
      <text x="48" y="44" textAnchor="middle" fill={color} fontSize="18" fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif">{score.toFixed(1)}</text>
      <text x="48" y="60" textAnchor="middle" fill={T.textFaint} fontSize="11"
        fontFamily="Inter, system-ui, sans-serif">/ {max}</text>
    </svg>
  );
}

function Stars({ score, max = 5 }: { score: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: max }, (_, i) => ({
        filled: i < Math.floor(score),
        half  : i >= Math.floor(score) && i < score,
      })).map((s, i) => (
        <span key={i} style={{ fontSize: 16, color: s.filled || s.half ? "#FBBF24" : T.border }}>
          {s.filled ? "★" : s.half ? "⯨" : "☆"}
        </span>
      ))}
    </div>
  );
}

function SectionCard({ title, icon, accent, children }: {
  title?: string; icon?: string; accent?: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: T.surface,
      border    : `1px solid ${accent ? `${accent}40` : T.border}`,
      borderRadius: 18,
      padding   : "18px 20px",
      boxShadow : "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      {(title || icon) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          {icon && <span style={{ fontSize: 15 }}>{icon}</span>}
          {title && (
            <span style={{ fontWeight: 700, fontSize: 13, color: accent || T.textDark }}>
              {title}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VIII — EXPANDABLE SCORE CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ExpandableScoreCard({ item }: { item: ScoreItem }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score);
  const label   = scoreLabel(item.score);
  const preview = previewText(item.reason, 90);

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background  : T.surface,
        border      : `1px solid ${open ? T.indigoMid : T.border}`,
        borderRadius: 14,
        padding     : "14px 16px",
        cursor      : item.reason ? "pointer" : "default",
        boxShadow   : open ? "0 4px 20px rgba(79,70,229,0.09)" : "0 1px 3px rgba(0,0,0,0.04)",
        transition  : "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, lineHeight: 1.35, wordBreak: "break-word" }}>
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: 6, fontSize: 10, fontWeight: 600,
                  color: T.textFaint, background: T.surfaceAlt,
                  padding: "1px 6px", borderRadius: 99, border: `1px solid ${T.border}`,
                }}>
                  {item.badge}
                </span>
              )}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <span style={{ fontWeight: 800, fontSize: 14, color }}>{item.score.toFixed(1)}</span>
              <span style={{ fontSize: 10, color: T.textFaint }}>/5</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: preview && !open ? 8 : 0 }}>
            <ScoreBar score={item.score} />
            <span style={{
              fontSize: 10, fontWeight: 700, color,
              background: `${color}18`, padding: "1px 7px",
              borderRadius: 99, whiteSpace: "nowrap", letterSpacing: "0.04em",
            }}>{label}</span>
          </div>
          {preview && !open && (
            <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>
          )}
        </div>
        {item.reason && (
          <span style={{
            fontSize: 10, color: T.textFaint, flexShrink: 0, marginTop: 2,
            display: "inline-block",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}>▾</span>
        )}
      </div>
      {open && item.reason && (
        <div style={{
          marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.75,
          paddingTop: 10, borderTop: `1px solid ${T.border}`,
        }}>
          {item.reason}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IX — COMPATIBILITY CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CompatibilityCard({ item }: { item: CompatItem }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score);
  const good    = item.score >= 3.0;
  const preview = previewText(item.reason, 88);
  const bg      = good ? "#F0FDF4" : "#FFF5F5";
  const border  = good ? T.greenLight : T.redLight;
  const dot     = good ? T.mint : T.red;

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background  : bg,
        border      : `1px solid ${open ? (good ? "#86EFAC" : "#FCA5A5") : border}`,
        borderRadius: 14,
        padding     : "13px 15px",
        cursor      : item.reason ? "pointer" : "default",
        boxShadow   : open ? "0 4px 16px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.03)",
        transition  : "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1, minWidth: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot, marginTop: 4, flexShrink: 0 }} />
          <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, wordBreak: "break-word", lineHeight: 1.4 }}>
            {item.label}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 13, color }}>{item.score.toFixed(1)}</span>
          <span style={{ fontSize: 10, color: T.textFaint }}>/5</span>
          {item.reason && (
            <span style={{
              fontSize: 10, color: T.textFaint, marginLeft: 2,
              display: "inline-block",
              transform: open ? "rotate(180deg)" : "none",
              transition: "transform 0.2s",
            }}>▾</span>
          )}
        </div>
      </div>
      <ScoreBar score={item.score} />
      {preview && !open && (
        <p style={{ margin: "7px 0 0", fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>
      )}
      {open && item.reason && (
        <p style={{
          margin: "10px 0 0", fontSize: 12.5, color: T.textMid, lineHeight: 1.65,
          paddingTop: 10, borderTop: `1px solid ${border}`,
        }}>{item.reason}</p>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION X — WARNING BANNER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScientificWarningBanner({ warnings }: { warnings: Warning[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  if (!warnings.length) return null;

  return (
    <div style={{
      background  : "#FFF5F5",
      border      : `1.5px solid ${T.redLight}`,
      borderRadius: 16,
      overflow    : "hidden",
    }}>
      <div style={{
        background: `${T.red}12`,
        padding   : "10px 16px",
        display   : "flex",
        alignItems: "center",
        gap       : 10,
        borderBottom: `1px solid ${T.redLight}`,
      }}>
        <span style={{ fontSize: 16 }}>🚨</span>
        <span style={{ fontWeight: 700, fontSize: 12.5, color: T.red }}>
          Critical Structural Alerts — {warnings.length} triggered
        </span>
      </div>
      {warnings.map((w, i) => (
        <div
          key={i}
          onClick={() => setOpenIdx(openIdx === i ? null : i)}
          style={{
            padding     : "12px 16px",
            borderBottom: i < warnings.length - 1 ? `1px solid ${T.redLight}` : "none",
            cursor      : "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: w.severity === "critical" ? T.red : T.amber,
                flexShrink: 0,
              }} />
              <span style={{ fontWeight: 700, fontSize: 12, color: w.severity === "critical" ? T.red : T.amber }}>
                {w.title}
              </span>
            </div>
            <span style={{ fontSize: 10, color: T.textFaint, display: "inline-block", transform: openIdx === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
          </div>
          {openIdx === i && w.detail && (
            <p style={{ margin: "8px 0 0 14px", fontSize: 12, color: T.textMid, lineHeight: 1.65 }}>{w.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XI — TIMELINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PHASE_COLORS: Record<string, string> = {
  immediate: T.teal,
  medium   : T.indigo,
  longterm : T.violet,
  outcome  : "#059669",
};
const PHASE_ICONS: Record<string, string> = {
  immediate: "⚡",
  medium   : "📈",
  longterm : "🔬",
  outcome  : "✦",
};

function ExpectedResultsTimeline({ phases }: { phases: TimelinePhase[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {phases.map((phase, i) => {
        const isLast = i === phases.length - 1;
        const color  = PHASE_COLORS[phase.phase] || T.indigo;
        return (
          <div key={phase.phase} style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%", background: color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0,
              }}>
                {PHASE_ICONS[phase.phase]}
              </div>
              {!isLast && (
                <div style={{ width: 2, flex: 1, minHeight: 16, background: T.border, margin: "4px 0" }} />
              )}
            </div>
            <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1 }}>
              <div style={{ marginBottom: 7 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: T.textDark }}>{phase.label}</span>
                <span style={{ fontSize: 11.5, color: T.textFaint, marginLeft: 8 }}>{phase.sub}</span>
              </div>
              <div style={{
                background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 12, padding: "11px 14px",
                display: "flex", flexDirection: "column", gap: 7,
              }}>
                {phase.outcomes.map((o, j) => (
                  <div key={j} style={{ display: "flex", gap: 8, fontSize: 12.5, color: T.textMid, lineHeight: 1.55 }}>
                    <span style={{ color, marginTop: 2, flexShrink: 0 }}>›</span>
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XII — INGREDIENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ING_GROUP_COLORS: Record<string, { bg: string; dot: string; text: string; border: string }> = {
  "Physiological Lipids": { bg:"#F0FDF4", dot:"#10B981", text:"#064E3B", border:"#A7F3D0" },
  "Humectants"          : { bg:"#F0F9FF", dot:"#0EA5E9", text:"#0C4A6E", border:"#BAE6FD" },
  "Occlusives"          : { bg:"#FFFBEB", dot:"#D97706", text:"#78350F", border:"#FDE68A" },
  "Actives"             : { bg:"#EEF2FF", dot:"#6366F1", text:"#312E81", border:"#C7D2FE" },
  "UV Filters"          : { bg:"#FFF7ED", dot:"#F97316", text:"#7C2D12", border:"#FED7AA" },
  "Emollients"          : { bg:"#FDF4FF", dot:"#A855F7", text:"#581C87", border:"#E9D5FF" },
  "Surfactants"         : { bg:"#F0FDF4", dot:"#22C55E", text:"#14532D", border:"#DCFCE7" },
  "Preservatives"       : { bg:"#F8FAFC", dot:"#94A3B8", text:"#334155", border:"#E2E8F0" },
  "Fragrance / EOs"     : { bg:"#FFF1F2", dot:"#F43F5E", text:"#881337", border:"#FECDD3" },
  "Antioxidants"        : { bg:"#ECFDF5", dot:"#10B981", text:"#064E3B", border:"#A7F3D0" },
  "Other"               : { bg:"#F8FAFC", dot:"#CBD5E1", text:"#475569", border:"#E2E8F0" },
};

const RISK_LABELS = ["", "Safe", "Low", "Moderate", "Caution", "High Risk"];
const RISK_COLORS = ["", "#059669", T.mint, T.amber, "#F97316", T.red];

function IngredientArchitectureCard({ groups }: { groups: Record<string, Ingredient[]> }) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {Object.entries(groups).map(([group, items]) => {
        const isOpen = openGroups[group] !== false; // default open
        const colors = ING_GROUP_COLORS[group] || ING_GROUP_COLORS["Other"];
        return (
          <div key={group} style={{ marginBottom: 2 }}>
            <button
              onClick={() => setOpenGroups((p) => ({ ...p, [group]: !isOpen }))}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                background: colors.bg, border: `1px solid ${colors.border}`,
                borderRadius: 11, padding: "9px 13px", cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: colors.dot }} />
                <span style={{ fontWeight: 700, fontSize: 12.5, color: colors.text }}>{group}</span>
                <span style={{ fontSize: 11.5, color: T.textFaint }}>({items.length})</span>
              </div>
              <span style={{
                fontSize: 10, color: T.textFaint, display: "inline-block",
                transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s",
              }}>▾</span>
            </button>
            {isOpen && (
              <div style={{ marginTop: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                {items.map((ing, i) => (
                  <div key={i} style={{
                    background: T.surface, border: `1px solid ${T.border}`,
                    borderRadius: 9, padding: "10px 13px",
                    display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10,
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 12.5, color: T.textDark, wordBreak: "break-word" }}>{ing.name}</div>
                      <div style={{ fontSize: 11.5, color: T.textFaint, marginTop: 2 }}>{ing.role}</div>
                    </div>
                    <span style={{
                      fontSize: 10.5, fontWeight: 700,
                      color: RISK_COLORS[ing.risk],
                      background: `${RISK_COLORS[ing.risk]}18`,
                      padding: "2px 8px", borderRadius: 99,
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      {RISK_LABELS[ing.risk]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XIII — EVIDENCE CARD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function EvidenceCard({ item, accent }: { item: EvidenceItem; accent: string }) {
  const [open, setOpen] = useState(false);
  const preview = previewText(item.body, 100);

  return (
    <div
      onClick={() => item.body && setOpen(!open)}
      style={{
        background  : T.surface,
        border      : `1px solid ${open ? `${accent}50` : T.border}`,
        borderRadius: 14,
        padding     : "14px 16px",
        cursor      : item.body ? "pointer" : "default",
        boxShadow   : open ? `0 4px 20px ${accent}15` : "0 1px 3px rgba(0,0,0,0.04)",
        transition  : "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, marginTop: 5, flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: T.textDark, lineHeight: 1.35, wordBreak: "break-word" }}>
              {item.label}
            </span>
            {item.body && (
              <span style={{
                fontSize: 10, color: T.textFaint, flexShrink: 0,
                display: "inline-block",
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}>▾</span>
            )}
          </div>
          {preview && !open && <p style={{ margin: 0, fontSize: 11.5, color: T.textMuted, lineHeight: 1.6 }}>{preview}</p>}
        </div>
      </div>
      {open && item.body && (
        <div style={{
          marginTop: 10, fontSize: 12.5, color: T.textMid, lineHeight: 1.7,
          paddingTop: 10, borderTop: `1px solid ${T.border}`, paddingLeft: 16,
        }}>
          {item.body}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XIV — SPECIALIZED METRIC CHIPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SkincareMetric { label: string; value: string; color: string; icon: string; }

function detectSkincareMetrics(mode: ProductMode, scores: ScoreItem[]): SkincareMetric[] {
  const metrics: SkincareMetric[] = [];
  const find = (kw: string) =>
    scores.find((s) => norm(s.label).includes(kw.toUpperCase()))?.score;

  const barrierS = find("BARRIER");
  if (barrierS !== undefined)
    metrics.push({ label: "Barrier Score", value: `${barrierS.toFixed(1)}/5`, color: scoreColor(barrierS), icon: "🛡️" });

  if (mode === "sunscreen") {
    const uvS = find("UV PROTECTION") ?? find("PROTECTION RELIAB");
    if (uvS !== undefined)
      metrics.push({ label: "UV Protection", value: `${uvS.toFixed(1)}/5`, color: scoreColor(uvS), icon: "🌞" });
    const photoS = find("PHOTOSTABILITY");
    if (photoS !== undefined)
      metrics.push({ label: "Photostability", value: `${photoS.toFixed(1)}/5`, color: scoreColor(photoS), icon: "📸" });
  }

  if (mode === "serum") {
    const activeS = find("ACTIVE DELIVERY");
    if (activeS !== undefined)
      metrics.push({ label: "Active Delivery", value: `${activeS.toFixed(1)}/5`, color: scoreColor(activeS), icon: "💧" });
    const stabilS = find("ACTIVE STABILITY") ?? find("STABILITY");
    if (stabilS !== undefined)
      metrics.push({ label: "Active Stability", value: `${stabilS.toFixed(1)}/5`, color: scoreColor(stabilS), icon: "⚗️" });
  }

  if (mode === "eyecream") {
    const ocularS = find("OCULAR");
    if (ocularS !== undefined)
      metrics.push({ label: "Ocular Safety", value: `${ocularS.toFixed(1)}/5`, color: scoreColor(ocularS), icon: "👁️" });
    const miliaS = find("MILIA");
    if (miliaS !== undefined)
      metrics.push({ label: "Milia Risk", value: `${miliaS.toFixed(1)}/5`, color: scoreColor(miliaS), icon: "⚠️" });
  }

  if (mode === "lipbalm") {
    const depS = find("DEPENDENCY");
    if (depS !== undefined)
      metrics.push({ label: "Dependency Risk", value: `${depS.toFixed(1)}/5`, color: scoreColor(depS), icon: "🔄" });
  }

  if (mode === "cleanser") {
    const microS = find("MICROBIOME");
    if (microS !== undefined)
      metrics.push({ label: "Microbiome Safety", value: `${microS.toFixed(1)}/5`, color: scoreColor(microS), icon: "🦠" });
  }

  const irritS = find("IRRITATION") ?? find("CUMULATIVE IRRITATION");
  if (irritS !== undefined && metrics.length < 4)
    metrics.push({ label: "Irritation Risk", value: `${irritS.toFixed(1)}/5`, color: scoreColor(irritS), icon: "⚡" });

  return metrics.slice(0, 4);
}

function MetricChip({ metric }: { metric: SkincareMetric }) {
  return (
    <div style={{
      background: T.surfaceAlt, border: `1px solid ${T.border}`,
      borderRadius: 10, padding: "8px 12px",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: 14 }}>{metric.icon}</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 800, color: metric.color }}>{metric.value}</div>
        <div style={{
          fontSize: 9.5, color: T.textFaint, fontWeight: 600,
          letterSpacing: "0.03em", marginTop: 1,
        }}>{metric.label.toUpperCase().slice(0, 18)}</div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XV — TAB BAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TabBar({ tabs, activeTab, onTabChange }: {
  tabs: Tab[]; activeTab: number; onTabChange: (i: number) => void;
}) {
  return (
    <div style={{
      display: "flex", overflowX: "auto", scrollbarWidth: "none",
      marginLeft: -22, marginRight: -22, paddingLeft: 22,
      borderTop: `1px solid ${T.border}`,
    }}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(i)}
          style={{
            background  : "none", border: "none",
            borderBottom: activeTab === i ? `2.5px solid ${T.teal}` : "2.5px solid transparent",
            padding     : "11px 18px", fontSize: 12.5,
            fontWeight  : activeTab === i ? 700 : 500,
            color       : activeTab === i ? T.teal : T.textFaint,
            cursor      : "pointer", whiteSpace: "nowrap",
            display     : "flex", alignItems: "center", gap: 5,
            transition  : "color 0.15s",
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
// SECTION XVI — PANEL COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScientificScoreGrid({ coreScores, specScores, specTitle }: {
  coreScores: ScoreItem[]; specScores: ScoreItem[]; specTitle?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {coreScores.length > 0 && (
        <SectionCard title="Core Performance" icon="📊">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {coreScores.map((s, i) => <ExpandableScoreCard key={i} item={s} />)}
          </div>
        </SectionCard>
      )}
      {specScores.length > 0 && (
        <SectionCard title={specTitle || "Specialized Performance"} icon="🧪">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
            {specScores.map((s, i) => <ExpandableScoreCard key={i} item={s} />)}
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
        <SectionCard title="Concerns" icon="−" accent={T.red}>
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
  );
}

function CompatibilityDashboard({ items, title }: { items: CompatItem[]; title: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title={title} icon="👤">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 9 }}>
          {items.map((item, i) => <CompatibilityCard key={i} item={item} />)}
        </div>
      </SectionCard>
      <div style={{
        display: "flex", gap: 16, flexWrap: "wrap",
        padding: "12px 16px",
        background: T.surfaceAlt, border: `1px solid ${T.border}`,
        borderRadius: 12,
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
  );
}

function LongTermUsabilityGrid({ ltUsability, timeline }: {
  ltUsability: CompatItem[]; timeline: TimelinePhase[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {ltUsability.length > 0 && (
        <SectionCard title="Long-Term Usability" icon="📅">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 9 }}>
            {ltUsability.map((item, i) => <CompatibilityCard key={i} item={item} />)}
          </div>
        </SectionCard>
      )}
      {timeline.length > 0 && (
        <SectionCard title="Expected Real-World Results" icon="⏱">
          <ExpectedResultsTimeline phases={timeline} />
        </SectionCard>
      )}
    </div>
  );
}

function NaturalEvidencePanel({ truthItems, herbalItems }: {
  truthItems: EvidenceItem[]; herbalItems: EvidenceItem[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {herbalItems.length > 0 && (
        <SectionCard title="Herbal Evidence Assessment" icon="🧬" accent={T.violet}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {herbalItems.map((item, i) => <EvidenceCard key={i} item={item} accent={T.violet} />)}
          </div>
        </SectionCard>
      )}
      {truthItems.length > 0 && (
        <SectionCard title="Truth About Natural Claims" icon="🌿" accent={T.teal}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {truthItems.map((item, i) => <EvidenceCard key={i} item={item} accent={T.teal} />)}
          </div>
        </SectionCard>
      )}
      {truthItems.length === 0 && herbalItems.length === 0 && (
        <div style={{
          background: T.surfaceAlt, border: `1px solid ${T.border}`,
          borderRadius: 14, padding: "28px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🌿</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>No herbal evidence data in this analysis.</div>
        </div>
      )}
    </div>
  );
}

function SciencePanel({ whyLines, finalRating, maxRating, ratingSubtitle, rLabel, gradient }: {
  whyLines: string[]; finalRating: number; maxRating: number;
  ratingSubtitle: string; rLabel: string; gradient: string;
}) {
  const whyText = whyLines.filter((l) => !/^#{1,4}\s/.test(l.trim())).join(" ").trim();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {whyText && (
        <SectionCard title="Why This Rating" icon="🧠">
          <p style={{ margin: 0, fontSize: 13, color: T.textMid, lineHeight: 1.8 }}>{whyText}</p>
        </SectionCard>
      )}
      <div style={{
        background: gradient, borderRadius: 18, padding: "22px 24px",
        color: "#FFF", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
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
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XVII — EXECUTIVE HERO
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ExecutiveHero({
  finalRating, maxRating, ratingSubtitle, rLabel, rColor, gradient,
  profileText, sqText, strengths, weaknesses, metrics,
}: {
  finalRating: number; maxRating: number; ratingSubtitle: string;
  rLabel: string; rColor: string; gradient: string;
  profileText: string; sqText: string;
  strengths: string[]; weaknesses: string[];
  metrics: SkincareMetric[];
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>
      {/* Left column */}
      <div>
        {/* Hero rating card */}
        <div style={{ background: gradient, borderRadius: 18, padding: "22px 24px", color: "#FFF", marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 6 }}>
            ⭐ SKIN ANALYSIS
          </div>
          <div style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4 }}>
            {finalRating.toFixed(1)}
            <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.6, marginLeft: 4 }}>/ {maxRating}</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.85 }}>{rLabel}</div>
          {ratingSubtitle && (
            <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, marginTop: 4 }}>{ratingSubtitle}</div>
          )}
          <div style={{ marginTop: 12 }}><Stars score={finalRating} max={maxRating} /></div>
        </div>

        {/* Profile + structural quality */}
        {(profileText || sqText) && (
          <div style={{
            background: T.surfaceAlt, border: `1px solid ${T.border}`,
            borderRadius: 14, padding: "14px 16px", marginBottom: 14,
          }}>
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

        {/* Strengths / Weaknesses mini preview */}
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
        {metrics.map((m, i) => <MetricChip key={i} metric={m} />)}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION XVIII — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SkinCareProps { markdown: string; }

export default function SkinCare({ markdown }: SkinCareProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Guard
  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{
        padding: 48, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif", background: T.bg, borderRadius: 24,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🧴</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.textDark, marginBottom: 8 }}>No analysis data found</div>
          <div style={{ fontSize: 13, color: T.textFaint }}>Please provide a valid skincare product analysis result.</div>
        </div>
      </div>
    );
  }

  // ── Detect product mode ──
  const mode    = useMemo(() => detectProductMode(markdown), [markdown]);
  const meta    = PRODUCT_META[mode];
  const gradient = meta.gradient;

  // ── Parse sections ──
  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // Rating
  let finalRating = 0, maxRating = 5, ratingSubtitle = "";
  for (const [key, lines] of sections.entries()) {
    if (norm(key).includes("FINAL RATING")) {
      const text = [key, ...lines].join(" ");
      const rm   = text.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
      if (rm) { finalRating = Math.min(5, Math.max(0, parseFloat(rm[1]))); maxRating = parseInt(rm[2]); }
      const rmSub = text.match(/\d+\.?\d*\s*\/\s*\d+\s*[—–\-]+\s*(.+)/);
      if (rmSub) ratingSubtitle = rmSub[1].trim();
      break;
    }
  }
  const rColor = scoreColor(finalRating);
  const rLabel = scoreLabel(finalRating);

  // Section extraction
  const profileLines  = findSection(sections, ["PROFILE"]);
  const sqLines       = findSection(sections, ["STRUCTURAL QUALITY"]);
  const coreLines     = findSection(sections, ["CORE SCORES"]);
  const insightLines  = findSection(sections, ["STRUCTURAL INSIGHT", "INSIGHT"]);

  // Specialized — collect ALL specialized score sections and merge them
  const specMatches = findSections(sections, [
    "SPECIALIZED PERFORMANCE", "HYDRATION", "UV ARCHITECTURE", "UV SCIENCE",
    "ACTIVE DELIVERY", "PERIORBITAL", "LIP BARRIER", "CLEANSING SYSTEMS",
    "OVERNIGHT RECOVERY", "MASK.SPECIFIC", "TONER.SPECIFIC", "ACTIVE SYSTEMS",
    "REPAIR", "DAYTIME", "CLEANSING", "UV FILTER",
  ]);

  // Merge all specialized lines into one array
  const specLines = specMatches.flatMap((m) => m.lines);
  
  // Build a descriptive title from product mode
  const SPEC_TITLE_BY_MODE: Record<ProductMode, string> = {
    moisturizer: "Hydration Systems",
    daycream   : "Daytime Systems",
    nightcream : "Repair & Recovery",
    serum      : "Active Delivery Systems",
    sunscreen  : "UV Science",
    toner      : "Toner Analysis",
    cleanser   : "Cleansing Systems",
    eyecream   : "Periorbital Systems",
    facemask   : "Mask Analysis",
    lipbalm    : "Lip Barrier",
    generic    : "Specialized Performance",
  };
  const specTitle = SPEC_TITLE_BY_MODE[mode];

  // Compatibility
  const compatMatches = findSections(sections, ["COMPATIBILITY", "SKIN TYPE", "POPULATION COMPAT", "LIP CONDITION", "SKIN TYPE ADVISORY"]);
  const compatLines   = compatMatches[0]?.lines ?? [];
  const compatTitle   = compatMatches[0]
    ? compatMatches[0].key
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]+/gu, "")
        .replace(/POPULATION|USER/gi, "")
        .trim() || "Skin Type Compatibility"
    : "Skin Type Compatibility";

  // Long-term
  const ltLines      = findSection(sections, ["LONG-TERM USABILITY", "USE FREQUENCY", "USE PROTOCOL", "REPEATED-USE"]);
  const resultsLines = findSection(sections, ["EXPECTED REAL-WORLD RESULTS", "EXPECTED RESULTS"]);
  const ingLines     = findSection(sections, ["KEY STRUCTURAL INGREDIENTS", "INGREDIENTS"]);
  const whyLines     = findSection(sections, ["WHY THIS RATING"]);

  // Warnings
  const warnLines = findSection(sections, ["CRITICAL ALERTS", "TRIGGERED STRUCTURAL RISKS"]);

  // Natural
  const herbalLines = findSection(sections, ["HERBAL EVIDENCE ASSESSMENT"]);
  const truthMatch  = Array.from(sections.entries()).find(([key]) => {
    const n = norm(key);
    return n.includes("NATURAL") && (n.includes("CLAIM") || n.includes("TRUTH"));
  });
  const truthLines  = truthMatch?.[1] ?? [];
  const hasNatural  = herbalLines.length > 0 || truthLines.length > 0;

  // ── Parse data ──
  const coreScores   = useMemo(() => parseScores(coreLines),            [coreLines]);
  const specScores   = useMemo(() => parseScores(specLines),             [specLines]);
  const compatibility = useMemo(() => parseCompatAdvisory(compatLines),  [compatLines]);
  const ltUsability  = useMemo(() => parseCompatibility(ltLines),        [ltLines]);
  const timeline     = useMemo(() => parseTimeline(resultsLines),        [resultsLines]);
  const ingredients  = useMemo(() => parseIngredients(ingLines),         [ingLines]);
  const { strengths, weaknesses } = useMemo(() => parseInsights(insightLines), [insightLines]);
  const warnings     = useMemo(() => parseWarnings(warnLines),           [warnLines]);
  const truthItems   = useMemo(() => parseEvidenceItems(truthLines),     [truthLines]);
  const herbalItems  = useMemo(() => parseEvidenceItems(herbalLines),    [herbalLines]);

  const allScores = useMemo(() => [...coreScores, ...specScores], [coreScores, specScores]);

  const ingGroups = useMemo(() => {
    const groups: Record<string, Ingredient[]> = {};
    for (const ing of ingredients) {
      if (!groups[ing.group]) groups[ing.group] = [];
      groups[ing.group].push(ing);
    }
    return groups;
  }, [ingredients]);

  const profileText = linesAsText(profileLines);
  const sqText      = linesAsText(sqLines);
  const metrics     = useMemo(() => detectSkincareMetrics(mode, allScores), [mode, allScores]);

  // ── Compatibility tab label ──
  const compatTabLabel = compatTitle
    .replace(/COMPATIBILITY/gi, "").trim() || "Compatibility";

  // ── Build FIXED tabs — EXECUTIVE DOMAIN DRIVEN ──
  const ALL_TABS: Tab[] = [
    { id: "scores",       label: "Scores",           icon: "◎"  },
    { id: "insights",     label: "Insights",         icon: "⚡" },
    { id: "compatibility",label: "Compatibility",    icon: "👤" },
    { id: "longterm",     label: "Long-Term",        icon: "📅" },
    { id: "warnings",     label: "Warnings",         icon: "🚨" },
    { id: "ingredients",  label: "Ingredients",      icon: "🔬" },
    { id: "science",      label: "Science",          icon: "🧠" },
    { id: "natural",      label: "Natural Evidence", icon: "🌿" },
  ];

  const TABS = ALL_TABS.filter((tab) => {
    if (tab.id === "scores")        return coreScores.length > 0 || specScores.length > 0;
    if (tab.id === "insights")      return strengths.length > 0 || weaknesses.length > 0;
    if (tab.id === "compatibility") return compatibility.length > 0;
    if (tab.id === "longterm")      return ltUsability.length > 0 || timeline.length > 0;
    if (tab.id === "warnings")      return warnings.length > 0;
    if (tab.id === "ingredients")   return ingredients.length > 0;
    if (tab.id === "science")       return true;
    if (tab.id === "natural")       return hasNatural;
    return false;
  });

  const safeActive  = Math.min(activeTab, Math.max(0, TABS.length - 1));
  const currentTab  = TABS[safeActive]?.id;

  return (
    <div style={{
      fontFamily : "'Inter', system-ui, -apple-system, sans-serif",
      background : T.bg,
      borderRadius: 24,
      overflow   : "hidden",
      color      : T.textDark,
    }}>
      {/* ── HEADER BAR ── */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: "13px 22px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, background: gradient,
          borderRadius: 8, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 14, flexShrink: 0,
        }}>
          {meta.icon}
        </div>
        <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.08em", color: T.teal }}>
          {BRAND}
        </span>
        <span style={{ fontSize: 12, color: T.borderMid, margin: "0 4px" }}>·</span>
        <span style={{ fontSize: 12, color: T.textFaint, fontWeight: 500 }}>{TITLE}</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{
            fontSize: 11, color: T.textFaint, background: T.surfaceAlt,
            padding: "4px 12px", borderRadius: 99, border: `1px solid ${T.border}`,
          }}>
            {meta.label}
          </span>
        </div>
      </div>

      {/* ── GUIDANCE BANNER ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 9,
        padding: "8px 16px", background: T.tealLight,
        borderBottom: `1px solid #A7F3D0`,
      }}>
        <span style={{ fontSize: 12, color: T.teal, flexShrink: 0 }}>✦</span>
        <span style={{ fontSize: 11.5, color: T.teal, fontWeight: 500, letterSpacing: "0.01em" }}>
          {SUBTITLE}
        </span>
      </div>

      {/* ── EXECUTIVE DASHBOARD ── */}
      <div style={{
        background: T.surface, borderBottom: `1px solid ${T.border}`,
        padding: "22px 22px 0",
      }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <ExecutiveHero
            finalRating={finalRating} maxRating={maxRating}
            ratingSubtitle={ratingSubtitle} rLabel={rLabel}
            rColor={rColor} gradient={gradient}
            profileText={profileText} sqText={sqText}
            strengths={strengths} weaknesses={weaknesses}
            metrics={metrics}
          />

          {/* ── WARNINGS inside header (compact) ── */}
          {warnings.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <ScientificWarningBanner warnings={warnings} />
            </div>
          )}

          {/* ── TAB BAR ── */}
          <TabBar tabs={TABS} activeTab={safeActive} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "22px 22px" }}>
        {currentTab === "scores" && (
          <ScientificScoreGrid
            coreScores={coreScores}
            specScores={specScores}
            specTitle={specTitle}
          />
        )}

        {currentTab === "insights" && (
          <InsightsPanel strengths={strengths} weaknesses={weaknesses} />
        )}

        {currentTab === "compatibility" && (
          <CompatibilityDashboard
            items={compatibility}
            title={compatTabLabel + " Compatibility"}
          />
        )}

        {currentTab === "longterm" && (
          <LongTermUsabilityGrid ltUsability={ltUsability} timeline={timeline} />
        )}

        {currentTab === "warnings" && (
          <SectionCard title="Critical Structural Alerts" icon="🚨" accent={T.red}>
            <ScientificWarningBanner warnings={warnings} />
          </SectionCard>
        )}

        {currentTab === "ingredients" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <SectionCard title="Ingredient Architecture" icon="🔬">
              <IngredientArchitectureCard groups={ingGroups} />
            </SectionCard>
            <div style={{
              background: T.surfaceAlt, border: `1px solid ${T.border}`,
              borderRadius: 12, padding: "12px 16px",
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: T.textFaint, letterSpacing: "0.07em", marginBottom: 8 }}>
                RISK CLASSIFICATION
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {RISK_LABELS.slice(1).map((label, i) => (
                  <span key={i} style={{
                    fontSize: 11, fontWeight: 600,
                    color: RISK_COLORS[i + 1],
                    background: `${RISK_COLORS[i + 1]}18`,
                    padding: "3px 10px", borderRadius: 99,
                  }}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === "science" && (
          <SciencePanel
            whyLines={whyLines}
            finalRating={finalRating}
            maxRating={maxRating}
            ratingSubtitle={ratingSubtitle}
            rLabel={rLabel}
            gradient={gradient}
          />
        )}

        {currentTab === "natural" && (
          <NaturalEvidencePanel truthItems={truthItems} herbalItems={herbalItems} />
        )}
      </div>
    </div>
  );
}