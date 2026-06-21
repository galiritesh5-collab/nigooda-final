import { useState, useMemo } from "react";

// ══════════════════════════════════════════════════════════════════
// DESIGN TOKENS  — warm-neutral base, rich semantic accents
// ══════════════════════════════════════════════════════════════════
const C = {
  // page
  pageBg:      "#F4F6F9",
  // surfaces
  surface:     "#FFFFFF",
  surfaceWarm: "#FAFAF8",
  surfaceAlt:  "#F0F2F7",
  glass:       "rgba(255,255,255,0.72)",
  // borders
  border:      "#E4E8F0",
  borderMid:   "#CDD3DF",
  // text
  ink:         "#0D1117",
  inkMid:      "#1C2333",
  text:        "#3A4559",
  muted:       "#5E6B82",
  faint:       "#8A96A8",
  // brand
  brand:       "#4338CA",        // deeper indigo
  brandMid:    "#6366F1",
  brandPale:   "#EEF2FF",
  brandSoft:   "#C7D2FE",
  brandGlow:   "#818CF8",
  // semantic
  green:       "#15803D",
  greenMid:    "#16A34A",
  greenSoft:   "#DCFCE7",
  greenBdr:    "#86EFAC",
  emerald:     "#059669",
  amber:       "#B45309",
  amberMid:    "#D97706",
  amberSoft:   "#FEF3C7",
  amberBdr:    "#FCD34D",
  orange:      "#C2410C",
  orangeSoft:  "#FFF7ED",
  orangeBdr:   "#FDBA74",
  red:         "#B91C1C",
  redMid:      "#DC2626",
  redSoft:     "#FEF2F2",
  redBdr:      "#FECACA",
  blue:        "#1D4ED8",
  blueMid:     "#3B82F6",
  blueSoft:    "#EFF6FF",
  blueBdr:     "#BFDBFE",
  purple:      "#7C3AED",
  purpleSoft:  "#F5F3FF",
  purpleBdr:   "#DDD6FE",
  teal:        "#0F766E",
  tealSoft:    "#F0FDFA",
  tealBdr:     "#99F6E4",
  rose:        "#BE185D",
  roseSoft:    "#FFF1F2",
  roseBdr:     "#FBCFE8",
};

// ══════════════════════════════════════════════════════════════════
// RATING TIERS
// ══════════════════════════════════════════════════════════════════
function ratingTier(score, max = 5) {
  const p = (score / max) * 100;
  if (p >= 82) return { fg: "#14532D", mid: "#15803D", soft: "#DCFCE7", bdr: "#86EFAC", grd: "linear-gradient(135deg,#052e16 0%,#14532d 60%,#166534 100%)", label: "Excellent", tier: "excellent" };
  if (p >= 66) return { fg: "#166534", mid: "#16A34A", soft: "#F0FDF4", bdr: "#A7F3D0", grd: "linear-gradient(135deg,#064e3b 0%,#065f46 60%,#047857 100%)", label: "Good",      tier: "good"      };
  if (p >= 50) return { fg: "#92400E", mid: "#B45309", soft: "#FFFBEB", bdr: "#FDE68A", grd: "linear-gradient(135deg,#3c1a00 0%,#78350f 60%,#92400e 100%)", label: "Moderate",  tier: "moderate"  };
  if (p >= 34) return { fg: "#7C2D12", mid: "#C2410C", soft: "#FFF7ED", bdr: "#FDBA74", grd: "linear-gradient(135deg,#431407 0%,#7c2d12 60%,#9a3412 100%)", label: "Weak",      tier: "weak"      };
  return              { fg: "#7F1D1D", mid: "#B91C1C", soft: "#FEF2F2", bdr: "#FECACA", grd: "linear-gradient(135deg,#3b0000 0%,#7f1d1d 60%,#991b1b 100%)", label: "Poor",      tier: "poor"      };
}

// Consistent color for score bars/numbers
function scoreColor(score, max = 5) {
  return ratingTier(score, max).mid;
}

// ══════════════════════════════════════════════════════════════════
// ATTRIBUTE CHIP CONFIG  (no pH)
// ══════════════════════════════════════════════════════════════════
const ATTR_STYLES = {
  processing:  { icon: "⚙", label: "Processing",    fg: C.purple,  soft: C.purpleSoft, bdr: C.purpleBdr },
  count:       { icon: "◈", label: "Ingredients",   fg: C.teal,    soft: C.tealSoft,   bdr: C.tealBdr   },
  base:        { icon: "◉", label: "Primary Base",  fg: C.brand,   soft: C.brandPale,  bdr: C.brandSoft },
  caffeine:    { icon: "⚡", label: "Caffeine",      fg: C.amber,   soft: C.amberSoft,  bdr: C.amberBdr  },
  carbonated:  { icon: "◎", label: "Carbonated",    fg: C.blue,    soft: C.blueSoft,   bdr: C.blueBdr   },
};

// ══════════════════════════════════════════════════════════════════
// CATEGORY SCORE COLORS  (per ingredient category type)
// ══════════════════════════════════════════════════════════════════
function catColor(label) {
  const n = label.toUpperCase();
  if (/SUGAR|SWEET/.test(n))      return { fg: C.orange,  soft: C.orangeSoft,  bdr: C.orangeBdr  };
  if (/ACID|DENTAL/.test(n))      return { fg: C.red,     soft: C.redSoft,     bdr: C.redBdr     };
  if (/FLAVOR/.test(n))           return { fg: C.purple,  soft: C.purpleSoft,  bdr: C.purpleBdr  };
  if (/PRESERV/.test(n))          return { fg: C.muted,   soft: C.surfaceAlt,  bdr: C.border     };
  if (/COLOR|COLOUR/.test(n))     return { fg: C.blue,    soft: C.blueSoft,    bdr: C.blueBdr    };
  if (/CAFFEINE|STIMUL/.test(n))  return { fg: C.brand,   soft: C.brandPale,   bdr: C.brandSoft  };
  if (/ELECTROLYTE|MINERAL/.test(n)) return { fg: C.teal, soft: C.tealSoft,    bdr: C.tealBdr    };
  if (/FUNCTIONAL|ADDITIVE/.test(n)) return { fg: C.blue, soft: C.blueSoft,    bdr: C.blueBdr    };
  if (/BOTAN|HERBAL/.test(n))     return { fg: C.green,   soft: C.greenSoft,   bdr: C.greenBdr   };
  if (/DAIRY/.test(n))            return { fg: C.blue,    soft: C.blueSoft,    bdr: C.blueBdr    };
  if (/FRUIT/.test(n))            return { fg: C.orange,  soft: C.orangeSoft,  bdr: C.orangeBdr  };
  if (/NATURAL|WHOLE/.test(n))    return { fg: C.green,   soft: C.greenSoft,   bdr: C.greenBdr   };
  return                                  { fg: C.muted,   soft: C.surfaceAlt,  bdr: C.border     };
}

// ══════════════════════════════════════════════════════════════════
// PARSERS  (unchanged logic, carried over verbatim)
// ══════════════════════════════════════════════════════════════════
function parseSections(md) {
  const lines = md.split(/\r?\n/);
  const sections = [];
  let cur = null;
  for (const raw of lines) {
    const t = raw.trim();
    if (!t || t === "---") continue;
    if (/^#\s+/.test(t)) {
      if (cur) sections.push(cur);
      cur = { title: t.replace(/^#\s+/, "").replace(/[^\w\s&·]/gu, "").trim(), lines: [] };
    } else if (cur) {
      cur.lines.push(t);
    } else {
      cur = { title: "__preamble__", lines: [t] };
    }
  }
  if (cur) sections.push(cur);
  return sections;
}

function findSection(sections, keywords) {
  const kws = keywords.map(k => k.toUpperCase());
  return sections.find(s => {
    const n = s.title.toUpperCase().replace(/[^\w\s]/g, " ");
    return kws.some(k => n.includes(k));
  }) ?? null;
}

function stripBullet(s) {
  return s.replace(/^[-*•·▸→#\s⭐]+/, "").trim();
}

function parseDrinkIdentity(sections) {
  const s = findSection(sections, ["DRINK"]);
  if (!s) return { name: "", category: "" };
  const headingLine = s.lines.find(l => /###/.test(l)) ?? s.lines[0] ?? "";
  const clean = headingLine.replace(/^#{1,4}\s*/, "").replace(/[^\w\s·&\-,]/gu, "").trim();
  const parts = clean.split(/[·•|]/).map(p => p.trim()).filter(Boolean);
  return { name: parts[0] ?? "", category: parts[1] ?? "" };
}

function parseFinalRating(sections) {
  const s = findSection(sections, ["FINAL RATING", "OVERALL RATING"]);
  if (!s) return { score: 0, max: 5, label: "", summary: "" };
  let score = 0, max = 5, label = "";
  const allLines = [s.title, ...s.lines];
  for (const raw of allLines) {
    const t = raw.trim();
    const m = t.match(/(\d+\.?\d*)\s*\/\s*(\d+)\s*[—–\-]+\s*(.+)/);
    if (m) { score = parseFloat(m[1]); max = parseInt(m[2], 10); label = stripBullet(m[3].replace(/^#{1,4}\s*/, "")).trim(); break; }
    const m2 = t.match(/(\d+\.?\d*)\s*\/\s*(\d+)/);
    if (m2 && !score) { score = parseFloat(m2[1]); max = parseInt(m2[2], 10); }
  }
  const summary = s.lines.map(l => l.trim()).filter(l => l && !/(\d+\.?\d*)\s*\//.test(l) && !/^#{1,4}/.test(l)).map(stripBullet).filter(l => l.length > 4).join(" ").trim();
  return { score, max, label, summary };
}

function parseDrinkStructure(sections) {
  const s = findSection(sections, ["DRINK STRUCTURE"]);
  if (!s) return {};
  const fields = {};
  let cur = "";
  for (const raw of s.lines) {
    const t = raw.trim();
    if (!t) continue;
    if (/^##\s*processing style/i.test(t)) { cur = "processing"; continue; }
    if (/^##\s*ingredient count/i.test(t))  { cur = "count"; continue; }
    if (/^##\s*primary base/i.test(t))      { cur = "base"; continue; }
    if (/^##\s*estimated ph/i.test(t))      { cur = "ph"; continue; }   // parsed but not rendered
    if (/^##\s*caffeine/i.test(t))          { cur = "caffeine"; continue; }
    if (/^##\s*carbonated/i.test(t))        { cur = "carbonated"; continue; }
    if (/^##\s/.test(t)) { cur = ""; continue; }
    const v = stripBullet(t);
    if (v.length > 1 && cur && !fields[cur]) fields[cur] = v;
  }
  return fields;
}

function parseScoreItems(lines) {
  const items = [];
  let cur = null;
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) continue;
    const pipeMatch  = /^#{1,4}\s+(.+?)\s*\|\s*⭐?(\d+\.?\d*)/.exec(t);
    const arrowMatch = /^#{1,4}\s*(.+?)\s*[→|]\s*⭐?\s*(\d+\.?\d*)/.exec(t);
    const dashMatch  = /^#{1,4}\s*(.+?)\s*[—–\-]\s*⭐?\s*(\d+\.?\d*)/.exec(t);
    const match = pipeMatch || arrowMatch || dashMatch;
    if (match) {
      if (cur) items.push(cur);
      const labelRaw = match[1].replace(/[^\w\s&\-]/gu, "").trim();
      const rest = pipeMatch
        ? t.slice(match[0].length).split("|").map(p => p.trim()).filter(Boolean).join(" — ")
        : t.slice(match[0].length).replace(/^[→|—:–\-\s]+/, "").trim();
      cur = { label: labelRaw, score: Math.min(5, parseFloat(match[2])), max: 5, detail: rest };
    } else if (cur && !/^#{1,4}\s/.test(t)) {
      const v = stripBullet(t);
      if (v.length > 2) cur.detail = cur.detail ? cur.detail + " " + v : v;
    }
  }
  if (cur) items.push(cur);
  return items.filter(i => i.score >= 0 && i.score <= 5 && i.label.length > 1);
}

function parseBullets(lines) {
  return lines.filter(l => !/^#{1,4}\s/.test(l.trim()) && l.trim().length > 3).map(stripBullet).filter(Boolean);
}

function parseContribSignals(lines) {
  const out = [];
  let cur = null;
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) continue;
    if (/^#{1,4}\s/.test(t)) {
      if (cur) out.push(cur);
      const body = t.replace(/^#{1,4}\s+/, "");
      const tier = /🟢/.test(body) ? "primary" : /🟡/.test(body) ? "supporting" : "trace";
      const name = body.replace(/[🟢🟡⚪→]/g, "").replace(/[^\w\s\-&]/gu, "").trim();
      cur = { name, tier, detail: "" };
    } else if (cur) {
      const v = stripBullet(t);
      if (v.length > 2) cur.detail = cur.detail ? cur.detail + " " + v : v;
    }
  }
  if (cur) out.push(cur);
  return out.filter(c => c.name.length > 1);
}

function parseMindful(lines) {
  const ICONS = { children:"🧒", dental:"🦷", blood:"🩸", heart:"❤️", pressure:"🧂", pregnancy:"🤰", weight:"⚖️", sleep:"😴", kidney:"🫘", gut:"🦠", sport:"🏃" };
  const out = [];
  let cur = null;
  for (const raw of lines) {
    const t = raw.trim();
    if (!t) continue;
    const hm = /^#{1,4}\s+(.+)/.exec(t);
    if (hm) {
      if (cur) out.push(cur);
      const body = hm[1];
      const level = /🔴/.test(body) ? "high" : "moderate";
      const label = body.replace(/[🔴🟡🟢→]/g, "").replace(/[^\w\s\-&]/gu, "").trim();
      const iconKey = Object.keys(ICONS).find(k => label.toLowerCase().includes(k)) ?? "";
      cur = { icon: ICONS[iconKey] ?? "⚠", label, level, detail: "" };
    } else if (cur) {
      const v = stripBullet(t);
      if (v.length > 2) cur.detail = cur.detail ? cur.detail + " " + v : v;
    }
  }
  if (cur) out.push(cur);
  return out.filter(g => g.label.length > 1);
}

function parseAllergens(lines) {
  const ALL = ["Milk","Soy","Gluten","Tree Nuts","Peanuts","Eggs","Sesame","Fish","Sulfites","Shellfish","Wheat"];
  const text = lines.join(" ");
  if (/no major allergen/i.test(text)) return ALL.map(a => ({ label: a, present: false }));
  return ALL.map(a => ({ label: a, present: new RegExp(a, "i").test(text) }));
}

function parseFinalVerdict(sections) {
  const s = findSection(sections, ["FINAL VERDICT"]);
  if (!s) return "";
  return s.lines.map(stripBullet).filter(l => l.length > 3).join(" ").trim();
}

function parseGuidance(section) {
  if (!section) return [];
  const out = [];
  let cur = null;
  for (const raw of section.lines) {
    const t = raw.trim();
    if (!t) continue;
    if (/^##\s/.test(t)) {
      if (cur) out.push(cur);
      cur = { label: t.replace(/^##\s+/, "").replace(/:/g, "").trim(), lines: [] };
    } else if (cur) {
      const v = stripBullet(t);
      if (v.length > 1) cur.lines.push(v);
    }
  }
  if (cur) out.push(cur);
  return out;
}

// ══════════════════════════════════════════════════════════════════
// PRIMITIVE UI COMPONENTS
// ══════════════════════════════════════════════════════════════════

// Divider with optional label
function Divider({ label, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent ?? C.border}, transparent)` }} />
      {label && <span style={{ fontSize: 10, fontWeight: 700, color: accent ?? C.faint, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${accent ?? C.border}, transparent)` }} />
    </div>
  );
}

// Section header with left accent bar
function SecHead({ icon, title, color }) {
  const col = color ?? C.brand;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 3, height: 20, borderRadius: 99, background: col, flexShrink: 0 }} />
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", color: col, textTransform: "uppercase" }}>{title}</span>
    </div>
  );
}

// Progress bar — gradient fill, rounded
function PBar({ score, max = 5, color }) {
  const pct = Math.min(100, (score / max) * 100);
  const col = color ?? scoreColor(score, max);
  return (
    <div style={{ height: 5, background: C.surfaceAlt, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(to right, ${col}99, ${col})`, borderRadius: 99, transition: "width 0.55s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

// Score badge pill
function ScorePill({ score, max = 5 }) {
  const { fg, soft, bdr, label } = ratingTier(score, max);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: fg, background: soft, border: `1px solid ${bdr}`, borderRadius: 99, padding: "2px 8px", letterSpacing: "0.04em" }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color: fg, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {score.toFixed(1)}<span style={{ fontSize: 10, fontWeight: 500, color: C.faint }}>/{max}</span>
      </span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// CORE SCORE CARD  — expandable, premium
// ══════════════════════════════════════════════════════════════════
function CoreScoreCard({ item }) {
  const [open, setOpen] = useState(false);
  const col = scoreColor(item.score, item.max);
  const { soft, bdr } = ratingTier(item.score, item.max);
  return (
    <div
      onClick={() => item.detail && setOpen(o => !o)}
      style={{
        background: open ? soft : C.surface,
        border: `1px solid ${open ? bdr : C.border}`,
        borderRadius: 12,
        padding: "13px 15px",
        cursor: item.detail ? "pointer" : "default",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.inkMid, lineHeight: 1.35, flex: 1 }}>{item.label}</span>
        <ScorePill score={item.score} max={item.max} />
      </div>
      <PBar score={item.score} max={item.max} />
      {item.detail && !open && (
        <p style={{ margin: "8px 0 0", fontSize: 11.5, color: C.muted, lineHeight: 1.55 }}>
          {item.detail.length > 90 ? item.detail.slice(0, 90) + "…" : item.detail}
        </p>
      )}
      {open && item.detail && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${bdr}` }}>
          <p style={{ margin: 0, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>{item.detail}</p>
        </div>
      )}
      {item.detail && (
        <div style={{ marginTop: 6, textAlign: "right", fontSize: 10, color: C.faint }}>
          {open ? "▲ collapse" : "▼ expand"}
        </div>
      )}
    </div>
  );
}

// Category score card — colorful, compact
function CatScoreCard({ item }) {
  const [open, setOpen] = useState(false);
  const { fg, soft, bdr } = catColor(item.label);
  const barCol = scoreColor(item.score, item.max);
  const pct = Math.min(100, (item.score / item.max) * 100);
  return (
    <div
      onClick={() => item.detail && setOpen(o => !o)}
      style={{
        background: soft,
        border: `1px solid ${bdr}`,
        borderRadius: 12,
        padding: "12px 14px",
        cursor: item.detail ? "pointer" : "default",
        transition: "opacity 0.15s",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, flex: 1, minWidth: 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: fg, flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: fg, lineHeight: 1.3, wordBreak: "break-word" }}>{item.label}</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 800, color: fg, flexShrink: 0 }}>{item.score.toFixed(1)}</span>
      </div>
      <div style={{ height: 4, background: `${fg}22`, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: fg, borderRadius: 99 }} />
      </div>
      {open && item.detail && (
        <p style={{ margin: "9px 0 0", fontSize: 11.5, color: C.text, lineHeight: 1.65, paddingTop: 9, borderTop: `1px solid ${bdr}` }}>{item.detail}</p>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ATTRIBUTE CHIPS  (hero section) — rich per-color identity
// ══════════════════════════════════════════════════════════════════
function AttrChip({ attrKey, value }) {
  const cfg = ATTR_STYLES[attrKey];
  if (!cfg) return null;
  const isBase = attrKey === "base";
  return (
    <div style={{
      background: cfg.soft,
      border: `1px solid ${cfg.bdr}`,
      borderLeft: `3px solid ${cfg.fg}`,
      borderRadius: 12,
      padding: isBase ? "13px 18px" : "10px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      flex: isBase ? "2 1 180px" : "1 1 110px",
      minWidth: isBase ? 160 : 100,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* faint tinted corner glow */}
      <div style={{
        position: "absolute", top: -18, right: -18,
        width: 56, height: 56, borderRadius: "50%",
        background: `${cfg.fg}18`, pointerEvents: "none",
      }} />
      {/* icon badge + label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 7,
          background: `${cfg.fg}22`,
          border: `1px solid ${cfg.fg}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, flexShrink: 0,
        }}>
          {cfg.icon}
        </div>
        <span style={{
          fontSize: 9.5, fontWeight: 800, color: cfg.fg,
          letterSpacing: "0.09em", textTransform: "uppercase", opacity: 0.85,
        }}>
          {cfg.label}
        </span>
      </div>
      {/* value */}
      <span style={{
        fontSize: isBase ? 14 : 13,
        fontWeight: 700,
        color: cfg.fg,
        lineHeight: 1.3,
      }}>
        {value}
      </span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// TAB BAR
// ══════════════════════════════════════════════════════════════════
function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", borderTop: `1px solid ${C.border}`, marginLeft: -24, marginRight: -24, paddingLeft: 24 }}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => onChange(i)}
          style={{
            background: "none", border: "none", outline: "none",
            borderBottom: active === i ? `2.5px solid ${C.brand}` : "2.5px solid transparent",
            padding: "11px 17px",
            fontSize: 12.5,
            fontWeight: active === i ? 700 : 500,
            color: active === i ? C.brand : C.muted,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "color 0.15s, border-color 0.15s",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// INSIGHT ROW
// ══════════════════════════════════════════════════════════════════
function InsightRow({ text, icon, fg, soft, bdr, marker }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: soft, border: `1px solid ${bdr}`, borderRadius: 10, padding: "10px 13px" }}>
      <span style={{ fontSize: 14, color: fg, flexShrink: 0, fontWeight: 800, marginTop: 1 }}>{marker ?? icon}</span>
      <span style={{ fontSize: 13, color: C.text, lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MINDFUL CARD
// ══════════════════════════════════════════════════════════════════
function MindfulCard({ group }) {
  const isHigh = group.level === "high";
  const fg  = isHigh ? C.red    : C.amber;
  const soft = isHigh ? C.redSoft  : C.amberSoft;
  const bdr  = isHigh ? C.redBdr   : C.amberBdr;
  return (
    <div style={{ background: soft, border: `1px solid ${bdr}`, borderRadius: 12, padding: "13px 15px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: group.detail ? 8 : 0 }}>
        <span style={{ fontSize: 18 }}>{group.icon}</span>
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.inkMid }}>{group.label}</span>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, color: fg, background: `${fg}18`, border: `1px solid ${bdr}`, borderRadius: 99, padding: "2px 9px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
          {isHigh ? "HIGH" : "MOD"}
        </span>
      </div>
      {group.detail && <p style={{ margin: 0, fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{group.detail}</p>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// GUIDANCE ITEM
// ══════════════════════════════════════════════════════════════════
const GUIDANCE_STYLES = {
  "Best suited for":         { fg: C.teal,   soft: C.tealSoft,   bdr: C.tealBdr,   icon: "◎" },
  "Better balance strategy": { fg: C.brand,  soft: C.brandPale,  bdr: C.brandSoft, icon: "◈" },
  "Smarter alternatives":    { fg: C.green,  soft: C.greenSoft,  bdr: C.greenBdr,  icon: "◉" },
  "Frequency that limits concern": { fg: C.amber, soft: C.amberSoft, bdr: C.amberBdr, icon: "◌" },
};

function GuidanceCard({ item }) {
  const style = Object.entries(GUIDANCE_STYLES).find(([k]) => item.label.toLowerCase().includes(k.toLowerCase()))?.[1]
    ?? { fg: C.muted, soft: C.surfaceAlt, bdr: C.border, icon: "›" };
  return (
    <div style={{ background: style.soft, border: `1px solid ${style.bdr}`, borderRadius: 12, padding: "13px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: style.fg }}>{style.icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: style.fg, letterSpacing: "0.07em", textTransform: "uppercase" }}>{item.label}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {item.lines.map((l, i) => (
          <p key={i} style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.65 }}>{l}</p>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// FINAL VERDICT BLOCK
// ══════════════════════════════════════════════════════════════════
function VerdictBlock({ text, score, max }) {
  if (!text) return null;
  const { fg, soft, bdr, grd } = ratingTier(score, max);
  return (
    <div style={{ background: soft, border: `1px solid ${bdr}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{ background: grd, padding: "10px 18px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", opacity: 0.9, letterSpacing: "0.1em", textTransform: "uppercase" }}>Final verdict</span>
      </div>
      <div style={{ padding: "14px 18px" }}>
        <p style={{ margin: 0, fontSize: 14, color: fg, lineHeight: 1.75, fontWeight: 600 }}>{text}</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
const TABS = [
  { id: "scores",      label: "Scores"        },
  { id: "ingredients", label: "Ingredients"   },
  { id: "insights",    label: "Insights"      },
  { id: "mindful",     label: "Mindful Groups"},
  { id: "allergens",   label: "Allergens"     },
  { id: "guidance",    label: "Guidance"      },
];

export default function DrinkCare({ markdown }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, textAlign: "center", fontFamily: "system-ui, sans-serif", background: C.pageBg, borderRadius: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🥤</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>No analysis provided</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Pass a valid drink analysis as the markdown prop.</div>
      </div>
    );
  }

  // ── parse ──────────────────────────────────────────
  const sections   = useMemo(() => parseSections(markdown), [markdown]);
  const identity   = useMemo(() => parseDrinkIdentity(sections), [sections]);
  const rating     = useMemo(() => parseFinalRating(sections), [sections]);
  const structure  = useMemo(() => parseDrinkStructure(sections), [sections]);
  const verdict    = useMemo(() => parseFinalVerdict(sections), [sections]);

  const coreScoreSection = useMemo(() => findSection(sections, ["KEY FORMULATION SCORES","FORMULATION SCORES"]), [sections]);
  const catScoreSection  = useMemo(() => findSection(sections, ["INGREDIENT CATEGORY SCORES","CATEGORY SCORES"]), [sections]);
  const contribSection   = useMemo(() => findSection(sections, ["FORMULATION CONTRIBUTION SIGNALS","CONTRIBUTION SIGNALS"]), [sections]);
  const insightSection   = useMemo(() => findSection(sections, ["MAIN FORMULATION INSIGHTS","FORMULATION INSIGHTS"]), [sections]);
  const positiveSection  = useMemo(() => findSection(sections, ["POSITIVE FORMULATION SIGNALS","POSITIVE"]), [sections]);
  const awareSection     = useMemo(() => findSection(sections, ["THINGS TO BE AWARE","AWARE"]), [sections]);
  const mindfulSection   = useMemo(() => findSection(sections, ["WHO SHOULD BE MINDFUL","MINDFUL"]), [sections]);
  const allergenSection  = useMemo(() => findSection(sections, ["ALLERGEN ADVISORY","ALLERGEN"]), [sections]);
  const guidanceSection  = useMemo(() => findSection(sections, ["CONSUMPTION GUIDANCE","CONSUMPTION"]), [sections]);

  const coreScores   = useMemo(() => parseScoreItems(coreScoreSection?.lines ?? []), [coreScoreSection]);
  const catScores    = useMemo(() => parseScoreItems(catScoreSection?.lines ?? []), [catScoreSection]);
  const contribs     = useMemo(() => parseContribSignals(contribSection?.lines ?? []), [contribSection]);
  const insights     = useMemo(() => parseBullets(insightSection?.lines ?? []), [insightSection]);
  const positives    = useMemo(() => parseBullets(positiveSection?.lines ?? []), [positiveSection]);
  const concerns     = useMemo(() => parseBullets(awareSection?.lines ?? []), [awareSection]);
  const mindful      = useMemo(() => parseMindful(mindfulSection?.lines ?? []), [mindfulSection]);
  const allergens    = useMemo(() => parseAllergens(allergenSection?.lines ?? []), [allergenSection]);
  const guidanceItems= useMemo(() => parseGuidance(guidanceSection), [guidanceSection]);

  // ── tabs ──────────────────────────────────────────
  const visibleTabs = useMemo(() => TABS.filter(t => {
    if (t.id === "scores")      return coreScores.length > 0 || catScores.length > 0;
    if (t.id === "ingredients") return contribs.length > 0;
    if (t.id === "insights")    return insights.length > 0 || positives.length > 0 || concerns.length > 0;
    if (t.id === "mindful")     return mindful.length > 0;
    if (t.id === "allergens")   return !!allergenSection;
    if (t.id === "guidance")    return guidanceItems.length > 0;
    return false;
  }), [coreScores, catScores, contribs, insights, positives, concerns, mindful, allergenSection, guidanceItems]);

  const safeTab  = Math.min(activeTab, Math.max(0, visibleTabs.length - 1));
  const tabId    = visibleTabs[safeTab]?.id;

  const tier     = ratingTier(rating.score, rating.max);
  const rLabel   = rating.label || tier.label;

  // structure chips (no pH)
  const structKeys = ["processing", "count", "base", "caffeine", "carbonated"];
  const structChips = structKeys.filter(k => structure[k]);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: C.pageBg, borderRadius: 20, overflow: "hidden", color: C.ink }}>

      {/* ── TOP NAV ─────────────────────────────────────────────── */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "10px 24px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11.5, fontWeight: 900, letterSpacing: "0.14em", color: C.brand }}>NIGOODA</span>
        <span style={{ color: C.border, fontSize: 16 }}>·</span>
        <span style={{ fontSize: 11.5, color: C.muted, fontWeight: 500 }}>Drink Intelligence</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: C.faint, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 99, padding: "3px 11px", letterSpacing: "0.04em" }}>
            Formulation Analysis
          </span>
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(160deg, ${C.surface} 0%, ${C.brandPale} 100%)`,
        borderBottom: `1px solid ${C.border}`,
        padding: "28px 24px 0",
      }}>

        {/* identity */}
        <div style={{ marginBottom: 22 }}>
          {identity.category && (
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.brand, background: C.brandPale, border: `1px solid ${C.brandSoft}`, borderRadius: 99, padding: "3px 12px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {identity.category}
              </span>
            </div>
          )}
          {identity.name && (
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.ink, lineHeight: 1.15, letterSpacing: "-0.5px" }}>{identity.name}</h1>
          )}
        </div>

        {/* rating row */}
        <div style={{ display: "flex", gap: 16, alignItems: "stretch", marginBottom: 22, flexWrap: "wrap" }}>

          {/* big rating card */}
          <div style={{
            background: tier.grd,
            borderRadius: 16,
            padding: "18px 22px",
            color: "#fff",
            minWidth: 140,
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: -14, right: -14, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", opacity: 0.75, marginBottom: 5, textTransform: "uppercase" }}>Final rating</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 6 }}>
              <span style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, letterSpacing: "-1.5px" }}>{rating.score.toFixed(1)}</span>
              <span style={{ fontSize: 16, opacity: 0.55, fontWeight: 400 }}>/{rating.max}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>{rLabel}</div>
          </div>

          {/* summary */}
          {rating.summary && (
            <div style={{
              flex: 1,
              minWidth: 180,
              background: C.glass,
              backdropFilter: "blur(8px)",
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
            }}>
              <p style={{ margin: 0, fontSize: 14, color: C.text, lineHeight: 1.7 }}>{rating.summary}</p>
            </div>
          )}
        </div>

        {/* attribute chips */}
        {structChips.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {structChips.map(k => <AttrChip key={k} attrKey={k} value={structure[k]} />)}
          </div>
        )}

        {/* tab bar */}
        {visibleTabs.length > 0 && (
          <TabBar tabs={visibleTabs} active={safeTab} onChange={i => setActiveTab(i)} />
        )}
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────── */}
      <div style={{ padding: "24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* SCORES */}
        {tabId === "scores" && (
          <>
            {coreScores.length > 0 && (
              <div>
                <SecHead icon="◉" title="Core Formulation Scores" color={C.brand} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
                  {coreScores.map((item, i) => <CoreScoreCard key={i} item={item} />)}
                </div>
              </div>
            )}
            {catScores.length > 0 && (
              <div style={{ marginTop: coreScores.length > 0 ? 6 : 0 }}>
                <SecHead icon="◈" title="Ingredient Category Scores" color={C.teal} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 9 }}>
                  {catScores.map((item, i) => <CatScoreCard key={i} item={item} />)}
                </div>
              </div>
            )}
          </>
        )}

        {/* INGREDIENTS */}
        {tabId === "ingredients" && contribs.length > 0 && (
          <div>
            <SecHead icon="🌿" title="Formulation Contribution Signals" color={C.green} />
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {contribs.map((c, i) => {
                const tCol = c.tier === "primary" ? C.green : c.tier === "supporting" ? C.amber : C.faint;
                const tSft = c.tier === "primary" ? C.greenSoft : c.tier === "supporting" ? C.amberSoft : C.surfaceAlt;
                const tBdr = c.tier === "primary" ? C.greenBdr  : c.tier === "supporting" ? C.amberBdr  : C.border;
                const tLbl = c.tier === "primary" ? "Primary" : c.tier === "supporting" ? "Supporting" : "Trace";
                return (
                  <div key={i} style={{ background: tSft, border: `1px solid ${tBdr}`, borderRadius: 12, padding: "12px 15px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: tCol, flexShrink: 0, marginTop: 5 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.inkMid }}>{c.name}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: tCol, background: `${tCol}18`, border: `1px solid ${tBdr}`, borderRadius: 99, padding: "2px 8px", letterSpacing: "0.04em" }}>{tLbl}</span>
                      </div>
                      {c.detail && <p style={{ margin: 0, fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>{c.detail}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* INSIGHTS */}
        {tabId === "insights" && (
          <>
            {insights.length > 0 && (
              <div>
                <SecHead icon="◎" title="Formulation Insights" color={C.blue} />
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {insights.map((s, i) => (
                    <InsightRow key={i} text={s} fg={C.blue} soft={C.blueSoft} bdr={C.blueBdr} marker="›" />
                  ))}
                </div>
              </div>
            )}

            {(positives.length > 0 || concerns.length > 0) && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
                {positives.length > 0 && (
                  <div>
                    <SecHead icon="✓" title="Positive Signals" color={C.green} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {positives.map((s, i) => (
                        <InsightRow key={i} text={s} fg={C.green} soft={C.greenSoft} bdr={C.greenBdr} marker="+" />
                      ))}
                    </div>
                  </div>
                )}
                {concerns.length > 0 && (
                  <div>
                    <SecHead icon="!" title="Be Aware Of" color={C.amber} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      {concerns.map((s, i) => (
                        <InsightRow key={i} text={s} fg={C.amber} soft={C.amberSoft} bdr={C.amberBdr} marker="!" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* MINDFUL */}
        {tabId === "mindful" && mindful.length > 0 && (
          <>
            {["high","moderate"].map(level => {
              const grp = mindful.filter(g => g.level === level);
              if (!grp.length) return null;
              return (
                <div key={level}>
                  <SecHead
                    icon={level === "high" ? "⚠" : "◌"}
                    title={level === "high" ? "High Consideration" : "Moderate Consideration"}
                    color={level === "high" ? C.red : C.amber}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 9 }}>
                    {grp.map((g, i) => <MindfulCard key={i} group={g} />)}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* ALLERGENS */}
        {tabId === "allergens" && (() => {
          const detected = allergens.filter(a => a.present);
          return (
            <div>
              <SecHead icon="◎" title="Allergen Advisory" color={detected.length ? C.red : C.green} />
              {detected.length === 0 ? (
                <div style={{ background: C.greenSoft, border: `1px solid ${C.greenBdr}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span style={{ fontSize: 20 }}>✓</span>
                  <span style={{ fontSize: 14, color: C.green, fontWeight: 600 }}>No major allergens detected in this formulation.</span>
                </div>
              ) : (
                <div style={{ background: C.redSoft, border: `1px solid ${C.redBdr}`, borderRadius: 12, padding: "14px 18px", marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 9 }}>Detected allergens</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {detected.map((a, i) => (
                      <span key={i} style={{ fontSize: 12, fontWeight: 700, color: C.red, background: `${C.red}14`, border: `1px solid ${C.redBdr}`, borderRadius: 99, padding: "4px 12px" }}>{a.label}</span>
                    ))}
                  </div>
                </div>
              )}
              <Divider label="Full panel" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                {allergens.map((a, i) => (
                  <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: a.present ? C.red : C.faint, background: a.present ? `${C.red}10` : C.surfaceAlt, border: `1px solid ${a.present ? C.redBdr : C.border}`, borderRadius: 99, padding: "3px 10px" }}>
                    {a.present ? "⚠ " : ""}{a.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}

        {/* GUIDANCE */}
        {tabId === "guidance" && guidanceItems.length > 0 && (
          <div>
            <SecHead icon="◈" title="Consumption Guidance" color={C.teal} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {guidanceItems.map((item, i) => <GuidanceCard key={i} item={item} />)}
            </div>
          </div>
        )}

        {/* FINAL VERDICT — always anchored at bottom */}
        <VerdictBlock text={verdict} score={rating.score} max={rating.max} />

      </div>
    </div>
  );
}