import React, { useState, useRef, useMemo } from "react";

// ─── FOODCARE METADATA ────────────────────────────────────────────────────────
const FC_BRAND    = "NIGOODA";
const FC_TITLE    = "Food Intelligence";
const FC_SUBTITLE = "Decode ingredient quality and formulation balance";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const F = {
  // Warm premium palette
  saffron      : "#D97706",
  saffronLight : "#FEF3C7",
  saffronMid   : "#FDE68A",
  olive        : "#65A30D",
  oliveLight   : "#ECFCCB",
  oliveMid     : "#D9F99D",
  clay         : "#C2410C",
  clayLight    : "#FFEDD5",
  sage         : "#0F766E",
  sageLight    : "#CCFBF1",
  amber        : "#B45309",
  amberLight   : "#FEF3C7",
  rose         : "#BE123C",
  roseLight    : "#FFE4E6",
  plum         : "#7C3AED",
  plumLight    : "#EDE9FE",
  slate        : "#475569",
  sky          : "#0369A1",
  skyLight     : "#E0F2FE",

  // Semantic
  success      : "#16A34A",
  successLight : "#DCFCE7",
  warn         : "#D97706",
  warnLight    : "#FEF3C7",
  danger       : "#DC2626",
  dangerLight  : "#FEE2E2",

  // Text
  textDark     : "#0F172A",
  textMid      : "#334155",
  textMuted    : "#64748B",
  textFaint    : "#94A3B8",

  // Surface
  surface      : "#FFFFFF",
  surfaceWarm  : "#FFFDF9",
  surfaceAlt   : "#F9F7F4",
  border       : "#E7E2DB",
  borderMid    : "#D1C9C0",
  bg           : "#F5F1EC",
};

// ─── FOOD GRADIENTS ──────────────────────────────────────────────────────────
const HERO_GRADIENT = "linear-gradient(135deg, #92400E 0%, #D97706 50%, #65A30D 100%)";
const HIGH_SCORE_GRADIENT = "linear-gradient(135deg, #065F46 0%, #059669 100%)";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION I — TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface ScoreItem          { label: string; score: number; reason: string; }
interface CategoryScoreItem  { label: string; score: number; dominant: string; signal: string; reason: string; }
interface NutritionSignal    { name: string; tier: "primary" | "supporting" | "trace"; detail: string; }
interface MindfulGroup       { emoji: string; label: string; level: "high" | "moderate"; reason: string; }
interface AllergenItem       { name: string; }
interface InsightItem        { text: string; }
interface HighScoreItem      { type: "pass" | "warn" | "fail"; text: string; }
interface ConsumptionCard    { label: string; value: string; }
interface Tab                { id: string; label: string; icon: string; }
interface ProductMeta        { name: string; category: string; processStyle: string; ingredientCount: string; mainBase: string; verdict: string; }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION II — PARSING UTILITIES
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
      currentKey = t.replace(/^#\s+/, "").trim();
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

function findSection(sections: Map<string, string[]>, keywords: string[]): string[] {
  for (const [key, lines] of sections.entries()) {
    const n = norm(key);
    if (keywords.some((kw) => n.includes(kw.toUpperCase()))) return lines;
  }
  return [];
}

function findAllSections(sections: Map<string, string[]>, keywords: string[]): Array<{ key: string; lines: string[] }> {
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

function previewText(text: string, maxLen = 90): string {
  if (!text) return "";
  const first = text.split(/[.!?]/)[0]?.trim() ?? text;
  const clean = first.slice(0, maxLen);
  return clean.length < text.length ? clean + "…" : clean;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION III — FOOD-SPECIFIC PARSERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Extract final rating score strictly from "⭐X.X" or "X.X / 5" patterns */
function parseFinalScore(sections: Map<string, string[]>): { score: number; label: string; verdict: string } {
  let score = 0, label = "", verdict = "";
  for (const [key, lines] of sections.entries()) {
    const nk = norm(key);
    if (nk.includes("FINAL RATING") || nk.includes("RATING")) {
      // Try key line itself
      const full = [key, ...lines].join(" ");
      const m = full.match(/⭐\s*(\d+\.?\d*)/);
      if (m) score = Math.min(5, Math.max(0, parseFloat(m[1])));
      else {
        const m2 = full.match(/(\d+\.?\d*)\s*\/\s*5/);
        if (m2) score = Math.min(5, Math.max(0, parseFloat(m2[1])));
      }
      // Label after dash
      const lm = full.match(/\d+\.?\d*\s*[\/\s]*\s*5?\s*[—–\-]+\s*([A-Za-z ]+)/);
      if (lm) label = lm[1].trim();
      // Verdict: first non-heading, non-score line
      for (const l of lines) {
        const t = l.trim();
        if (!t || /^#/.test(t) || /⭐|\d+\.?\d*\s*\//.test(t)) continue;
        verdict = cleanBullet(t);
        break;
      }
      if (score > 0) break;
    }
  }
  return { score, label, verdict };
}

/** Parse product meta from PRODUCT STRUCTURE / PRODUCT sections */
function parseProductMeta(sections: Map<string, string[]>): ProductMeta {
  let name = "", category = "", processStyle = "", ingredientCount = "", mainBase = "", verdict = "";

  // Product name from PRODUCT heading
  for (const [key] of sections.entries()) {
    const nk = norm(key);
    if (nk.includes("PRODUCT") && !nk.includes("STRUCTURE") && !nk.includes("SCORE")) {
      const cleaned = key.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s*/gu, "").trim();
      // "Product Name · Category"
      const parts = cleaned.replace(/^PRODUCT\s*/i, "").split(/[·|]/);
      name     = parts[0]?.trim() ?? "";
      category = parts[1]?.trim() ?? "";
      break;
    }
  }

  // Structure section
  const structLines = findSection(sections, ["PRODUCT STRUCTURE", "STRUCTURE"]);
  for (const line of structLines) {
    const t = line.trim();
    if (/processing style/i.test(t)) processStyle    = t.replace(/.*:\s*/, "").replace(/^#{1,4}\s+/, "").replace(/Processing Style/i, "").replace(/^[:\s]+/, "").trim();
    if (/ingredient count/i.test(t)) ingredientCount = t.replace(/.*:\s*/, "").replace(/^#{1,4}\s+/, "").replace(/Ingredient Count/i, "").replace(/^[:\s]+/, "").trim();
    if (/main base/i.test(t))        mainBase        = t.replace(/.*:\s*/, "").replace(/^#{1,4}\s+/, "").replace(/Main Base/i, "").replace(/^[:\s]+/, "").trim();
  }

  // Verdict from final verdict section
  const verdictLines = findSection(sections, ["FINAL VERDICT", "VERDICT"]);
  for (const l of verdictLines) {
    const t = cleanBullet(l.trim());
    if (t.length > 5 && !/^#/.test(l.trim())) { verdict = t; break; }
  }

  return { name, category, processStyle, ingredientCount, mainBase, verdict };
}

/** Parse KEY FORMULATION SCORES — lines like "## Ingredient Quality → ⭐4.2" */
function parseFormulationScores(lines: string[]): ScoreItem[] {
  const items: ScoreItem[] = [];
  let cur: ScoreItem | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    // Match heading lines with score: ## Label → ⭐X.X or ## Label — ⭐X.X
    const m = t.match(/^#{1,4}\s*(.+?)\s*(?:→|—|–)\s*⭐\s*(\d+\.?\d*)/);
    if (m) {
      if (cur) items.push(cur);
      const rest = t.slice(m[0].length).replace(/^[→—–:\s]+/, "").trim();
      cur = { label: m[1].trim(), score: Math.min(5, Math.max(0, parseFloat(m[2]))), reason: rest };
    } else if (cur) {
      const clean = cleanBullet(t);
      if (clean.length > 2 && !/^#{1,4}\s/.test(t)) {
        cur.reason = cur.reason ? cur.reason + " " + clean : clean;
      }
    }
  }
  if (cur) items.push(cur);
  return items;
}

/** Parse INGREDIENT CATEGORY SCORES — ## Category | ⭐X.X | Dominant | Signal */
function parseCategoryScores(lines: string[]): CategoryScoreItem[] {
  const items: CategoryScoreItem[] = [];

  for (const line of lines) {
    const t = line.trim();
    if (!t || /^###/.test(t)) continue; // skip sub-notes

    // Try pipe-separated format first: ## Label | ⭐X.X | Dominant | Signal
    const pipem = t.match(/^#{1,4}\s*(.+?)\s*\|\s*⭐?\s*(\d+\.?\d*)\s*\|\s*(.+?)\s*\|\s*(.+)/);
    if (pipem) {
      items.push({
        label   : pipem[1].trim(),
        score   : Math.min(5, Math.max(0, parseFloat(pipem[2]))),
        dominant: pipem[3].trim(),
        signal  : pipem[4].trim(),
        reason  : "",
      });
      continue;
    }

    // Fallback: ## Label | ⭐X.X | Dominant (no signal)
    const pipe2 = t.match(/^#{1,4}\s*(.+?)\s*\|\s*⭐?\s*(\d+\.?\d*)\s*\|\s*(.+)/);
    if (pipe2) {
      items.push({
        label   : pipe2[1].trim(),
        score   : Math.min(5, Math.max(0, parseFloat(pipe2[2]))),
        dominant: pipe2[3].trim(),
        signal  : "",
        reason  : "",
      });
      continue;
    }

    // Append reasoning to last item
    if (items.length > 0) {
      const clean = cleanBullet(t);
      if (clean.length > 2 && !/^#{1,4}/.test(t)) {
        items[items.length - 1].reason += (items[items.length - 1].reason ? " " : "") + clean;
      }
    }
  }
  return items;
}

/** Parse NUTRITIONAL CONTRIBUTION SIGNALS — ## 🟢/🟡/⚪ Ingredient */
function parseNutritionSignals(lines: string[]): NutritionSignal[] {
  const signals: NutritionSignal[] = [];
  let cur: NutritionSignal | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t || /^###/.test(t)) continue;

    const primaryM  = t.match(/^#{1,4}\s*🟢\s*(.+)/);
    const supportM  = t.match(/^#{1,4}\s*🟡\s*(.+)/);
    const traceM    = t.match(/^#{1,4}\s*⚪\s*(.+)/);

    if (primaryM || supportM || traceM) {
      if (cur) signals.push(cur);
      const tier: NutritionSignal["tier"] = primaryM ? "primary" : supportM ? "supporting" : "trace";
      const name = (primaryM?.[1] ?? supportM?.[1] ?? traceM?.[1] ?? "").trim();
      cur = { name, tier, detail: "" };
    } else if (cur) {
      const clean = cleanBullet(t);
      if (clean.length > 2) cur.detail = cur.detail ? cur.detail + " " + clean : clean;
    }
  }
  if (cur) signals.push(cur);
  return signals;
}

/** Parse WHO SHOULD BE MINDFUL */
function parseMindfulGroups(lines: string[]): MindfulGroup[] {
  const groups: MindfulGroup[] = [];
  let cur: MindfulGroup | null = null;

  for (const line of lines) {
    const t = line.trim();
    if (!t || /^###/.test(t)) continue;

    // ## 🧒 Children | 🔴 High consideration
    const m = t.match(/^#{1,4}\s*([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)\s*(.+?)\s*\|\s*(🔴|🟡)\s*(.+)/u);
    if (m) {
      if (cur) groups.push(cur);
      const level: MindfulGroup["level"] = m[3] === "🔴" ? "high" : "moderate";
      cur = { emoji: m[1].trim(), label: m[2].trim(), level, reason: "" };
    } else if (cur) {
      const clean = cleanBullet(t);
      if (clean.length > 2 && !/^#/.test(t)) cur.reason = cur.reason ? cur.reason + " " + clean : clean;
    }
  }
  if (cur) groups.push(cur);
  return groups;
}

/** Parse ALLERGEN section */
function parseAllergens(lines: string[]): AllergenItem[] {
  for (const line of lines) {
    const t = line.trim();
    if (/no major allergen/i.test(t)) return [];
    // "Detected" heading or bracket-style [Milk] [Soy]
    if (/detected/i.test(t)) continue;
    const brackets = t.match(/\[([^\]]+)\]/g);
    if (brackets) return brackets.map((b) => ({ name: b.replace(/[\[\]]/g, "").trim() }));
    // Fallback: comma-separated
    if (t.length > 2 && !/^#/.test(t)) {
      return t.split(/[,;]/).map((s) => ({ name: cleanBullet(s).trim() })).filter((a) => a.name.length > 0);
    }
  }
  return [];
}

/** Parse HIGH-SCORE ELIGIBILITY */
function parseHighScore(lines: string[]): HighScoreItem[] {
  const items: HighScoreItem[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || /^###/.test(t)) continue;
    const passM = t.match(/^(?:##\s*)?✅\s*(.+)/);
    const warnM = t.match(/^(?:##\s*)?⚠️?\s*(.+)/);
    const failM = t.match(/^(?:##\s*)?❌\s*(.+)/);
    if (passM) items.push({ type: "pass", text: passM[1].trim() });
    else if (warnM) items.push({ type: "warn", text: warnM[1].trim() });
    else if (failM) items.push({ type: "fail", text: failM[1].trim() });
  }
  return items;
}

/** Parse bullet list sections (insights, positives, concerns, etc.) */
function parseBulletList(lines: string[]): string[] {
  const items: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t || /^#{1,4}\s/.test(t)) continue;
    const clean = cleanBullet(t);
    if (clean.length > 3) items.push(clean);
  }
  return items;
}

/** Parse CONSUMPTION GUIDANCE */
function parseConsumption(lines: string[]): ConsumptionCard[] {
  const cards: ConsumptionCard[] = [];
  let curLabel = "";

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const headM = t.match(/^#{1,4}\s*(.+)/);
    if (headM) {
      curLabel = headM[1].replace(/^#+\s*/, "").trim();
    } else if (curLabel) {
      const clean = cleanBullet(t);
      if (clean.length > 2) {
        cards.push({ label: curLabel, value: clean });
        curLabel = "";
      }
    } else {
      // Could be inline "## Label:\n value"
      const colon = t.match(/^(.+?):\s*(.+)/);
      if (colon && colon[2].length > 2) cards.push({ label: colon[1].trim(), value: colon[2].trim() });
    }
  }
  return cards;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IV — SCORE UTILITIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function scoreColor(score: number): string {
  const pct = (score / 5) * 100;
  if (pct >= 76) return F.olive;
  if (pct >= 60) return F.sage;
  if (pct >= 44) return F.saffron;
  if (pct >= 28) return F.clay;
  return F.danger;
}

function scoreLabel(score: number): string {
  const pct = (score / 5) * 100;
  if (pct >= 90) return "Exceptional";
  if (pct >= 76) return "Strong";
  if (pct >= 60) return "Good";
  if (pct >= 44) return "Moderate";
  if (pct >= 28) return "Weak";
  return "Poor";
}

function categoryScoreColor(score: number): { bg: string; text: string; border: string } {
  if (score >= 3.8) return { bg: F.oliveLight, text: F.olive, border: F.oliveMid };
  if (score >= 3.0) return { bg: F.sageLight,  text: F.sage,  border: "#99F6E4" };
  if (score >= 2.0) return { bg: F.saffronLight, text: F.saffron, border: F.saffronMid };
  return { bg: F.clayLight, text: F.clay, border: "#FED7AA" };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION V — PRIMITIVE COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoreBar({ score }: { score: number }) {
  const pct   = Math.min(100, (score / 5) * 100);
  const color = scoreColor(score);
  return (
    <div style={{ height: 5, background: F.border, borderRadius: 99, overflow: "hidden", flex: 1 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.7s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function FormulationRing({ score }: { score: number }) {
  const r    = 40;
  const circ = 2 * Math.PI * r;
  const dash = Math.min(1, score / 5) * circ;
  const color = scoreColor(score);
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke={F.border} strokeWidth="8" />
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ / 4}
        style={{ transition: "stroke-dasharray 0.9s cubic-bezier(.4,0,.2,1)" }}
      />
      <text x="50" y="46" textAnchor="middle" fill={color} fontSize="19" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">{score.toFixed(1)}</text>
      <text x="50" y="62" textAnchor="middle" fill={F.textFaint} fontSize="11" fontFamily="Inter, system-ui, sans-serif">/ 5</text>
    </svg>
  );
}

function NutritionTierDot({ tier }: { tier: NutritionSignal["tier"] }) {
  const color = tier === "primary" ? F.olive : tier === "supporting" ? F.saffron : F.textFaint;
  const size  = tier === "primary" ? 10 : tier === "supporting" ? 8 : 6;
  return <div style={{ width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 4 }} />;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VI — CARD COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SectionCard({ title, icon, accent, children }: {
  title?: string; icon?: string; accent?: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: F.surface,
      border: `1px solid ${accent ? `${accent}40` : F.border}`,
      borderRadius: 18,
      padding: "18px 20px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      {(title || icon) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
          {title && <span style={{ fontWeight: 700, fontSize: 12.5, color: accent || F.textDark, letterSpacing: "0.01em" }}>{title}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function FormulationScoreCard({ item }: { item: ScoreItem }) {
  const [open, setOpen] = useState(false);
  const color   = scoreColor(item.score);
  const label   = scoreLabel(item.score);
  const preview = previewText(item.reason, 90);

  return (
    <div
      onClick={() => item.reason && setOpen(!open)}
      style={{
        background: F.surfaceWarm,
        border: `1px solid ${open ? F.borderMid : F.border}`,
        borderRadius: 14,
        padding: "14px 16px",
        cursor: item.reason ? "pointer" : "default",
        boxShadow: open ? "0 4px 20px rgba(217,119,6,0.10)" : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: F.textDark, lineHeight: 1.35 }}>{item.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
              <span style={{ fontWeight: 800, fontSize: 14, color }}>{item.score.toFixed(1)}</span>
              <span style={{ fontSize: 10, color: F.textFaint }}>/5</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: preview && !open ? 8 : 0 }}>
            <ScoreBar score={item.score} />
            <span style={{
              fontSize: 10, fontWeight: 700, color,
              background: `${color}18`,
              padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap", letterSpacing: "0.04em",
            }}>{label}</span>
          </div>
          {preview && !open && (
            <p style={{ margin: "8px 0 0", fontSize: 11.5, color: F.textMuted, lineHeight: 1.6 }}>{preview}</p>
          )}
        </div>
        {item.reason && (
          <span style={{ fontSize: 10, color: F.textFaint, flexShrink: 0, marginTop: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        )}
      </div>
      {open && item.reason && (
        <div style={{ marginTop: 10, fontSize: 12.5, color: F.textMid, lineHeight: 1.7, paddingTop: 10, borderTop: `1px solid ${F.border}` }}>{item.reason}</div>
      )}
    </div>
  );
}

function CategoryScoreCard({ item }: { item: CategoryScoreItem }) {
  const [open, setOpen] = useState(false);
  const c = categoryScoreColor(item.score);
  const label = scoreLabel(item.score);

  return (
    <div
      onClick={() => (item.reason || item.signal) && setOpen(!open)}
      style={{
        background: open ? c.bg : F.surface,
        border: `1.5px solid ${open ? c.border : F.border}`,
        borderRadius: 14,
        padding: "14px 15px",
        cursor: (item.reason || item.signal) ? "pointer" : "default",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
        boxShadow: open ? `0 4px 18px ${c.text}15` : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: F.textDark, lineHeight: 1.35, flex: 1 }}>{item.label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: c.text }}>{item.score.toFixed(1)}</span>
          <span style={{ fontSize: 9.5, color: F.textFaint }}>/5</span>
          {(item.reason || item.signal) && (
            <span style={{ fontSize: 10, color: F.textFaint, marginLeft: 2, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
          )}
        </div>
      </div>

      {/* Score bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <ScoreBar score={item.score} />
        <span style={{ fontSize: 10, fontWeight: 700, color: c.text, background: c.bg, border: `1px solid ${c.border}`, padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap" }}>{label}</span>
      </div>

      {/* Dominant ingredients */}
      {item.dominant && (
        <div style={{ fontSize: 11.5, color: F.textMuted, lineHeight: 1.5, marginBottom: item.signal ? 5 : 0 }}>
          <span style={{ fontWeight: 600, color: F.textDark, fontSize: 10.5, letterSpacing: "0.04em" }}>DOMINANT: </span>
          {item.dominant}
        </div>
      )}
      {item.signal && !open && (
        <div style={{ fontSize: 11, color: c.text, fontStyle: "italic", lineHeight: 1.4 }}>{item.signal}</div>
      )}

      {/* Expanded detail */}
      {open && (item.reason || item.signal) && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${c.border}` }}>
          {item.signal && <div style={{ fontSize: 12, color: c.text, fontStyle: "italic", marginBottom: 6 }}>{item.signal}</div>}
          {item.reason && <div style={{ fontSize: 12.5, color: F.textMid, lineHeight: 1.7 }}>{item.reason}</div>}
        </div>
      )}
    </div>
  );
}

function NutritionSignalCard({ signal }: { signal: NutritionSignal }) {
  const tierConfig = {
    primary:    { label: "Primary Contributor",   color: F.olive,    bg: F.oliveLight,    border: F.oliveMid,    glyph: "🟢" },
    supporting: { label: "Supporting Contributor", color: F.saffron,  bg: F.saffronLight,  border: F.saffronMid,  glyph: "🟡" },
    trace:      { label: "Trace-Level",            color: F.textFaint, bg: F.surfaceAlt,  border: F.border,      glyph: "⚪" },
  };
  const cfg = tierConfig[signal.tier];

  return (
    <div style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: 12,
      padding: "12px 14px",
      display: "flex",
      alignItems: "flex-start",
      gap: 10,
    }}>
      <NutritionTierDot tier={signal.tier} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 12.5, color: F.textDark }}>{signal.name}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{cfg.label}</span>
        </div>
        {signal.detail && (
          <p style={{ margin: 0, fontSize: 12, color: F.textMuted, lineHeight: 1.6 }}>{signal.detail.replace(/^→\s*/, "")}</p>
        )}
      </div>
    </div>
  );
}

function MindfulGroupCard({ group }: { group: MindfulGroup }) {
  const [open, setOpen] = useState(false);
  const cfg = group.level === "high"
    ? { bg: "#FFF5F5", border: "#FCA5A5", text: F.danger, label: "High Consideration", dot: F.danger }
    : { bg: F.saffronLight, border: F.saffronMid, text: F.amber, label: "Moderate Consideration", dot: F.saffron };

  return (
    <div
      onClick={() => group.reason && setOpen(!open)}
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 12,
        padding: "12px 14px",
        cursor: group.reason ? "pointer" : "default",
        transition: "box-shadow 0.2s",
        boxShadow: open ? `0 4px 16px ${cfg.dot}18` : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>{group.emoji}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 12.5, color: F.textDark }}>{group.label}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: cfg.text, background: `${cfg.dot}15`, padding: "2px 8px", borderRadius: 99, whiteSpace: "nowrap" }}>{cfg.label}</span>
          </div>
          {!open && group.reason && (
            <p style={{ margin: 0, fontSize: 12, color: F.textMuted, lineHeight: 1.55 }}>{previewText(group.reason, 80)}</p>
          )}
        </div>
        {group.reason && (
          <span style={{ fontSize: 10, color: F.textFaint, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        )}
      </div>
      {open && group.reason && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${cfg.border}`, fontSize: 12.5, color: F.textMid, lineHeight: 1.7, paddingLeft: 28 }}>
          {group.reason.replace(/^→\s*/, "")}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION VII — TAB BAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TabBar({ tabs, activeTab, onTabChange }: { tabs: Tab[]; activeTab: number; onTabChange: (i: number) => void }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", marginLeft: -22, marginRight: -22, paddingLeft: 22, borderTop: `1px solid ${F.border}` }}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(i)}
          style={{
            background: "none", border: "none",
            borderBottom: activeTab === i ? `2.5px solid ${F.saffron}` : "2.5px solid transparent",
            padding: "11px 18px", fontSize: 12.5,
            fontWeight: activeTab === i ? 700 : 500,
            color: activeTab === i ? F.saffron : F.textFaint,
            cursor: "pointer", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 5,
            transition: "color 0.15s",
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
// SECTION VIII — TAB PANELS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ScoresPanel({ formulationScores }: { formulationScores: ScoreItem[] }) {
  return (
    <SectionCard title="Key Formulation Scores" icon="📊" accent={F.saffron}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
        {formulationScores.map((s, i) => <FormulationScoreCard key={i} item={s} />)}
      </div>
    </SectionCard>
  );
}

function IngredientsPanel({ categoryScores }: { categoryScores: CategoryScoreItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Ingredient Category Analysis" icon="🧬" accent={F.olive}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
          {categoryScores.map((c, i) => <CategoryScoreCard key={i} item={c} />)}
        </div>
      </SectionCard>
      <div style={{ background: F.surfaceAlt, border: `1px solid ${F.border}`, borderRadius: 12, padding: "12px 16px" }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: F.textFaint, letterSpacing: "0.07em", marginBottom: 8 }}>SCORE INTERPRETATION</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { label: "≥ 3.8 · Strong", color: F.olive, bg: F.oliveLight },
            { label: "3.0–3.8 · Good",  color: F.sage,  bg: F.sageLight  },
            { label: "2.0–3.0 · Moderate", color: F.saffron, bg: F.saffronLight },
            { label: "< 2.0 · Weak", color: F.clay, bg: F.clayLight },
          ].map((t, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: t.color, background: t.bg, padding: "3px 10px", borderRadius: 99 }}>{t.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NutritionPanel({ signals }: { signals: NutritionSignal[] }) {
  const primary   = signals.filter((s) => s.tier === "primary");
  const supporting = signals.filter((s) => s.tier === "supporting");
  const trace      = signals.filter((s) => s.tier === "trace");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {primary.length > 0 && (
        <SectionCard title="Primary Nutritional Contributors" icon="🟢" accent={F.olive}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {primary.map((s, i) => <NutritionSignalCard key={i} signal={s} />)}
          </div>
        </SectionCard>
      )}
      {supporting.length > 0 && (
        <SectionCard title="Supporting Contributors" icon="🟡" accent={F.saffron}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {supporting.map((s, i) => <NutritionSignalCard key={i} signal={s} />)}
          </div>
        </SectionCard>
      )}
      {trace.length > 0 && (
        <SectionCard title="Trace-Level Presence" icon="⚪">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {trace.map((s, i) => <NutritionSignalCard key={i} signal={s} />)}
          </div>
        </SectionCard>
      )}
      <div style={{ padding: "10px 16px", background: F.surfaceAlt, border: `1px solid ${F.border}`, borderRadius: 12, fontSize: 11.5, color: F.textMuted, lineHeight: 1.6 }}>
        Nutritional signals reflect ingredient position in the formulation. Ingredients listed earlier contribute proportionally more to the final product.
      </div>
    </div>
  );
}

function InsightsPanel({ insights, positives, concerns }: { insights: string[]; positives: string[]; concerns: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {insights.length > 0 && (
        <SectionCard title="Formulation Intelligence" icon="🔍" accent={F.sage}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {insights.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: F.sageLight, border: `1px solid #99F6E4`, borderRadius: 11, padding: "11px 13px" }}>
                <span style={{ color: F.sage, fontWeight: 800, flexShrink: 0, fontSize: 13, marginTop: 1 }}>›</span>
                <span style={{ fontSize: 12.5, color: F.textMid, lineHeight: 1.65 }}>{s}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
        {positives.length > 0 && (
          <SectionCard title="Positive Formulation Signals" icon="✅" accent={F.success}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {positives.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: F.successLight, border: `1px solid #BBF7D0`, borderRadius: 10, padding: "10px 12px" }}>
                  <span style={{ color: F.success, fontWeight: 800, flexShrink: 0, fontSize: 13 }}>+</span>
                  <span style={{ fontSize: 12, color: F.textMid, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
        {concerns.length > 0 && (
          <SectionCard title="Things to Be Aware Of" icon="⚠️" accent={F.clay}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {concerns.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", background: F.clayLight, border: `1px solid #FED7AA`, borderRadius: 10, padding: "10px 12px" }}>
                  <span style={{ color: F.clay, fontWeight: 800, flexShrink: 0, fontSize: 13 }}>!</span>
                  <span style={{ fontSize: 12, color: F.textMid, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
}

function MindfulPanel({ groups }: { groups: MindfulGroup[] }) {
  const high     = groups.filter((g) => g.level === "high");
  const moderate = groups.filter((g) => g.level === "moderate");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {high.length > 0 && (
        <SectionCard title="High Consideration Groups" icon="🔴" accent={F.danger}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {high.map((g, i) => <MindfulGroupCard key={i} group={g} />)}
          </div>
        </SectionCard>
      )}
      {moderate.length > 0 && (
        <SectionCard title="Moderate Consideration Groups" icon="🟡" accent={F.saffron}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {moderate.map((g, i) => <MindfulGroupCard key={i} group={g} />)}
          </div>
        </SectionCard>
      )}
      <div style={{ fontSize: 11.5, color: F.textMuted, background: F.surfaceAlt, border: `1px solid ${F.border}`, borderRadius: 12, padding: "11px 14px", lineHeight: 1.65 }}>
        These considerations are educational and formulation-based. They do not constitute medical advice. Individuals with specific health conditions should consult a qualified professional.
      </div>
    </div>
  );
}

function AllergenPanel({ allergens }: { allergens: AllergenItem[] }) {
  return (
    <SectionCard title="Allergen Advisory" icon="🛡️" accent={F.plum}>
      {allergens.length === 0 ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: F.oliveLight, border: `1px solid ${F.oliveMid}`, borderRadius: 12, padding: "14px 16px" }}>
          <span style={{ fontSize: 20 }}>✅</span>
          <span style={{ fontSize: 13, color: F.olive, fontWeight: 600 }}>No major allergens detected in formulation.</span>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 11.5, color: F.textMuted, marginBottom: 12, lineHeight: 1.6 }}>The following allergens were detected or may be present in this product:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allergens.map((a, i) => (
              <span key={i} style={{
                background: F.plumLight,
                color: F.plum,
                border: `1px solid #DDD6FE`,
                borderRadius: 99,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}>{a.name}</span>
            ))}
          </div>
        </div>
      )}
    </SectionCard>
  );
}

function ConsumptionPanel({ cards, verdict }: { cards: ConsumptionCard[]; verdict: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {cards.length > 0 && (
        <SectionCard title="Consumption Guidance" icon="🍽️" accent={F.sage}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
            {cards.map((c, i) => (
              <div key={i} style={{ background: F.surfaceWarm, border: `1px solid ${F.border}`, borderRadius: 13, padding: "14px 15px" }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: F.textFaint, letterSpacing: "0.06em", marginBottom: 7, textTransform: "uppercase" }}>{c.label}</div>
                <div style={{ fontSize: 13, color: F.textMid, lineHeight: 1.65, fontWeight: 500 }}>{c.value}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {verdict && (
        <div style={{ background: F.surfaceWarm, border: `1.5px solid ${F.borderMid}`, borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: F.textFaint, letterSpacing: "0.08em", marginBottom: 8 }}>FINAL VERDICT</div>
          <p style={{ margin: 0, fontSize: 13.5, color: F.textDark, lineHeight: 1.75, fontWeight: 500 }}>{verdict}</p>
        </div>
      )}
    </div>
  );
}

function HighScorePanel({ items, score }: { items: HighScoreItem[]; score: number }) {
  const qualifies = score >= 4.0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: qualifies ? HIGH_SCORE_GRADIENT : "linear-gradient(135deg, #334155, #475569)", borderRadius: 18, padding: "22px 24px", color: "#FFF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontSize: 28 }}>{qualifies ? "🏆" : "❌"}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 3 }}>{qualifies ? "High-Score Qualification" : "Does Not Qualify"}</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>{qualifies ? `Score ${score.toFixed(1)}/5 — Eligible for premium formulation status` : "Score below 4.0 threshold"}</div>
          </div>
        </div>
      </div>
      {items.length > 0 && (
        <SectionCard title="Qualification Assessment" icon="📋">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {items.map((item, i) => {
              const cfg = item.type === "pass"
                ? { icon: "✅", bg: F.oliveLight,  border: F.oliveMid,    text: F.olive   }
                : item.type === "warn"
                ? { icon: "⚠️",  bg: F.saffronLight, border: F.saffronMid, text: F.amber   }
                : { icon: "❌", bg: F.dangerLight, border: "#FCA5A5",     text: F.danger  };
              return (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 11, padding: "11px 14px" }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{cfg.icon}</span>
                  <span style={{ fontSize: 12.5, color: F.textMid, lineHeight: 1.6 }}>{item.text}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION IX — EXECUTIVE OVERVIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MetaChip({ label, value, icon }: { label: string; value: string; icon: string }) {
  if (!value) return null;
  return (
    <div style={{ background: F.surfaceAlt, border: `1px solid ${F.border}`, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "flex-start", gap: 8 }}>
      <span style={{ fontSize: 14, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: F.textFaint, letterSpacing: "0.06em", marginBottom: 2 }}>{label.toUpperCase()}</div>
        <div style={{ fontSize: 12, color: F.textDark, fontWeight: 600, lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SECTION X — MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface FoodCareProps { markdown: string; }

export default function FoodCare({ markdown }: FoodCareProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", background: F.bg, borderRadius: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🥗</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: F.textDark, marginBottom: 8 }}>No analysis data found</div>
          <div style={{ fontSize: 13, color: F.textFaint }}>Please provide a valid food product analysis result.</div>
        </div>
      </div>
    );
  }

  // ── Parse ──
  const sections = useMemo(() => parseMarkdown(markdown), [markdown]);

  // ── Extract sections ──
  const formulationLines  = findSection(sections, ["KEY FORMULATION SCORES", "FORMULATION SCORES"]);
  const categoryLines     = findSection(sections, ["INGREDIENT CATEGORY SCORES", "CATEGORY SCORES"]);
  const nutritionLines    = findSection(sections, ["NUTRITIONAL CONTRIBUTION", "NUTRITION SIGNAL"]);
  const insightLines      = findSection(sections, ["MAIN FORMULATION INSIGHT", "FORMULATION INSIGHT"]);
  const positiveLines     = findSection(sections, ["POSITIVE FORMULATION", "POSITIVE SIGNAL"]);
  const concernLines      = findSection(sections, ["THINGS TO BE AWARE", "CONCERNS", "AWARE"]);
  const mindfulLines      = findSection(sections, ["WHO SHOULD BE MINDFUL", "MINDFUL", "HEALTH CONSIDERATION"]);
  const allergenLines     = findSection(sections, ["ALLERGEN"]);
  const consumptionLines  = findSection(sections, ["CONSUMPTION GUIDANCE", "CONSUMPTION"]);
  const highScoreLines    = findSection(sections, ["HIGH-SCORE ELIGIBILITY", "HIGH SCORE"]);

  // ── Parse all data ──
  const { score: finalScore, label: ratingLabel, verdict } = useMemo(() => parseFinalScore(sections), [sections]);
  const meta             = useMemo(() => parseProductMeta(sections), [sections]);
  const formulationScores = useMemo(() => parseFormulationScores(formulationLines), [formulationLines]);
  const categoryScores   = useMemo(() => parseCategoryScores(categoryLines), [categoryLines]);
  const nutritionSignals = useMemo(() => parseNutritionSignals(nutritionLines), [nutritionLines]);
  const insights         = useMemo(() => parseBulletList(insightLines), [insightLines]);
  const positives        = useMemo(() => parseBulletList(positiveLines), [positiveLines]);
  const concerns         = useMemo(() => parseBulletList(concernLines), [concernLines]);
  const mindfulGroups    = useMemo(() => parseMindfulGroups(mindfulLines), [mindfulLines]);
  const allergens        = useMemo(() => parseAllergens(allergenLines), [allergenLines]);
  const consumptionCards = useMemo(() => parseConsumption(consumptionLines), [consumptionLines]);
  const highScoreItems   = useMemo(() => parseHighScore(highScoreLines), [highScoreLines]);

  const rColor = scoreColor(finalScore);
  const rLabel = ratingLabel || scoreLabel(finalScore);

  // ── Tabs ──
  const TABS: Tab[] = [
    { id: "scores",      label: "Scores",           icon: "◎"  },
    { id: "ingredients", label: "Ingredients",      icon: "🧬" },
    { id: "nutrition",   label: "Nutrition Signals", icon: "🌿" },
    { id: "insights",    label: "Insights",         icon: "🔍" },
    { id: "mindful",     label: "Mindful Groups",   icon: "🧭" },
    { id: "allergens",   label: "Allergens",        icon: "🛡️" },
    { id: "consumption", label: "Consumption",      icon: "🍽️" },
    { id: "highscore",   label: "Eligibility",      icon: "🏆" },
  ].filter((tab) => {
    if (tab.id === "scores")      return formulationScores.length > 0;
    if (tab.id === "ingredients") return categoryScores.length > 0;
    if (tab.id === "nutrition")   return nutritionSignals.length > 0;
    if (tab.id === "insights")    return insights.length > 0 || positives.length > 0 || concerns.length > 0;
    if (tab.id === "mindful")     return mindfulGroups.length > 0;
    if (tab.id === "allergens")   return allergenLines.length > 0;
    if (tab.id === "consumption") return consumptionCards.length > 0 || verdict.length > 0;
    if (tab.id === "highscore")   return finalScore >= 4.0 || highScoreItems.length > 0;
    return false;
  });

  const safeTab      = Math.min(activeTab, TABS.length - 1);
  const currentTabId = TABS[safeTab]?.id;

  // ── Quick overview stats from formulation scores ──
  const additiveSc  = formulationScores.find((s) => /additive/i.test(s.label));
  const honestySc   = formulationScores.find((s) => /honesty/i.test(s.label));
  const processingSc = formulationScores.find((s) => /processing/i.test(s.label));

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: F.bg, borderRadius: 24, overflow: "hidden", color: F.textDark }}>

      {/* ── HEADER BAR ── */}
      <div style={{ background: F.surface, borderBottom: `1px solid ${F.border}`, padding: "13px 22px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, background: HERO_GRADIENT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🥗</div>
        <span style={{ fontWeight: 800, fontSize: 12.5, letterSpacing: "0.08em", color: F.saffron }}>{FC_BRAND}</span>
        <span style={{ fontSize: 12, color: F.borderMid, margin: "0 4px" }}>·</span>
        <span style={{ fontSize: 12, color: F.textFaint, fontWeight: 500 }}>{FC_TITLE}</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 11, color: F.textFaint, background: F.surfaceAlt, padding: "4px 12px", borderRadius: 99, border: `1px solid ${F.border}` }}>Food Intelligence</span>
        </div>
      </div>

      {/* ── GUIDANCE BANNER ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 16px", background: F.saffronLight, borderBottom: `1px solid ${F.saffronMid}` }}>
        <span style={{ fontSize: 12, color: F.saffron, flexShrink: 0 }}>✦</span>
        <span style={{ fontSize: 11.5, color: F.amber, fontWeight: 500, letterSpacing: "0.01em" }}>{FC_SUBTITLE}</span>
      </div>

      {/* ── EXECUTIVE OVERVIEW ── */}
      <div style={{ background: F.surface, borderBottom: `1px solid ${F.border}`, padding: "22px 22px 0" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 20, alignItems: "start" }}>

            {/* Left column */}
            <div>
              {/* Hero gradient card */}
              <div style={{ background: HERO_GRADIENT, borderRadius: 18, padding: "22px 24px", color: "#FFF", marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", opacity: 0.7, marginBottom: 6 }}>NIGOODA · FOOD INTELLIGENCE</div>
                {(meta.name || meta.category) && (
                  <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>
                    {meta.name && <span style={{ fontWeight: 700 }}>{meta.name}</span>}
                    {meta.name && meta.category && <span style={{ opacity: 0.6 }}> · </span>}
                    {meta.category && <span>{meta.category}</span>}
                  </div>
                )}
                <div style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: "-1.5px", marginBottom: 4 }}>
                  {finalScore.toFixed(1)}
                  <span style={{ fontSize: 18, fontWeight: 500, opacity: 0.6, marginLeft: 4 }}>/ 5</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.9, marginBottom: verdict ? 6 : 0 }}>{rLabel}</div>
                {verdict && <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.55, marginTop: 2 }}>{verdict}</div>}
              </div>

              {/* Meta chips */}
              {(meta.processStyle || meta.ingredientCount || meta.mainBase) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8, marginBottom: 14 }}>
                  <MetaChip label="Processing"       value={meta.processStyle}    icon="⚙️"  />
                  <MetaChip label="Ingredient Count" value={meta.ingredientCount} icon="📋" />
                  <MetaChip label="Main Base"        value={meta.mainBase}        icon="🌾" />
                  {additiveSc  && <MetaChip label="Additive Load"  value={`${additiveSc.score.toFixed(1)}/5`}  icon="🧪" />}
                  {honestySc   && <MetaChip label="Formulation Honesty" value={`${honestySc.score.toFixed(1)}/5`} icon="🔎" />}
                  {processingSc && <MetaChip label="Processing Score" value={`${processingSc.score.toFixed(1)}/5`} icon="⚗️" />}
                </div>
              )}

              {/* Strengths / Concerns preview */}
              {(positives.length > 0 || concerns.length > 0) && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
                  {positives.length > 0 && (
                    <div style={{ background: F.oliveLight, border: `1px solid ${F.oliveMid}`, borderRadius: 13, padding: "12px 14px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: F.olive, marginBottom: 8, letterSpacing: "0.05em" }}>✓ FORMULATION STRENGTHS</div>
                      {positives.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: F.textMid, marginBottom: 5, lineHeight: 1.5 }}>
                          <span style={{ color: F.olive, fontWeight: 800, flexShrink: 0 }}>+</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {concerns.length > 0 && (
                    <div style={{ background: F.saffronLight, border: `1px solid ${F.saffronMid}`, borderRadius: 13, padding: "12px 14px" }}>
                      <div style={{ fontWeight: 700, fontSize: 11, color: F.amber, marginBottom: 8, letterSpacing: "0.05em" }}>⚠ BE AWARE OF</div>
                      {concerns.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: F.textMid, marginBottom: 5, lineHeight: 1.5 }}>
                          <span style={{ color: F.clay, fontWeight: 800, flexShrink: 0 }}>!</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right — ring */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, paddingTop: 4 }}>
              <FormulationRing score={finalScore} />
              {/* Category score mini-chips */}
              {categoryScores.slice(0, 3).map((c, i) => {
                const cfg = categoryScoreColor(c.score);
                return (
                  <div key={i} style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: "7px 11px", minWidth: 100 }}>
                    <div style={{ fontSize: 10, color: F.textFaint, fontWeight: 600, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.label.slice(0, 18)}</div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: cfg.text }}>{c.score.toFixed(1)}<span style={{ fontSize: 9, color: F.textFaint, fontWeight: 400 }}>/5</span></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── TABS ── */}
          <TabBar tabs={TABS} activeTab={safeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "22px 22px" }}>

        {currentTabId === "scores" && (
          <ScoresPanel formulationScores={formulationScores} />
        )}

        {currentTabId === "ingredients" && (
          <IngredientsPanel categoryScores={categoryScores} />
        )}

        {currentTabId === "nutrition" && (
          <NutritionPanel signals={nutritionSignals} />
        )}

        {currentTabId === "insights" && (
          <InsightsPanel insights={insights} positives={positives} concerns={concerns} />
        )}

        {currentTabId === "mindful" && (
          <MindfulPanel groups={mindfulGroups} />
        )}

        {currentTabId === "allergens" && (
          <AllergenPanel allergens={allergens} />
        )}

        {currentTabId === "consumption" && (
          <ConsumptionPanel cards={consumptionCards} verdict={verdict} />
        )}

        {currentTabId === "highscore" && (
          <HighScorePanel items={highScoreItems} score={finalScore} />
        )}

      </div>
    </div>
  );
}