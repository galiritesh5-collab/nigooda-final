import { useState, useMemo } from "react";

// ══════════════════════════════════════════════════════════════════
// DESIGN TOKENS — preserved exactly from previous version
// ══════════════════════════════════════════════════════════════════
const C = {
  pageBg:       "#F5F1EC",
  surface:      "#FFFFFF",
  surfaceWarm:  "#FFFDF9",
  surfaceAlt:   "#F2EDE7",
  glass:        "rgba(255,255,255,0.72)",
  border:       "#E7E2DB",
  borderMid:    "#D1C9C0",
  ink:          "#0F172A",
  inkMid:       "#1C2333",
  text:         "#334155",
  muted:        "#64748B",
  faint:        "#94A3B8",
  brand:        "#B45309",
  brandMid:     "#D97706",
  brandPale:    "#FEF3C7",
  brandSoft:    "#FDE68A",
  olive:        "#65A30D",
  oliveMid:     "#84CC16",
  oliveSoft:    "#ECFCCB",
  oliveBdr:     "#D9F99D",
  sage:         "#0F766E",
  sageSoft:     "#CCFBF1",
  sageBdr:      "#99F6E4",
  green:        "#15803D",
  greenSoft:    "#DCFCE7",
  greenBdr:     "#86EFAC",
  amber:        "#B45309",
  amberMid:     "#D97706",
  amberSoft:    "#FEF3C7",
  amberBdr:     "#FCD34D",
  clay:         "#C2410C",
  claySoft:     "#FFEDD5",
  clayBdr:      "#FED7AA",
  red:          "#B91C1C",
  redMid:       "#DC2626",
  redSoft:      "#FEF2F2",
  redBdr:       "#FECACA",
  blue:         "#1D4ED8",
  blueSoft:     "#EFF6FF",
  blueBdr:      "#BFDBFE",
  plum:         "#7C3AED",
  plumSoft:     "#EDE9FE",
  plumBdr:      "#DDD6FE",
  rose:         "#BE123C",
  roseSoft:     "#FFE4E6",
  roseBdr:      "#FBCFE8",
};

// ══════════════════════════════════════════════════════════════════
// RATING TIERS
// ══════════════════════════════════════════════════════════════════
function ratingTier(score, max = 5) {
  const p = (score / max) * 100;
  if (p >= 82) return { fg:"#14532D", mid:"#15803D", soft:"#DCFCE7", bdr:"#86EFAC", grd:"linear-gradient(135deg,#052e16 0%,#14532d 60%,#166534 100%)", label:"Excellent" };
  if (p >= 66) return { fg:"#166534", mid:"#16A34A", soft:"#F0FDF4", bdr:"#A7F3D0", grd:"linear-gradient(135deg,#064e3b 0%,#065f46 60%,#047857 100%)", label:"Good"      };
  if (p >= 50) return { fg:"#92400E", mid:"#B45309", soft:"#FFFBEB", bdr:"#FDE68A", grd:"linear-gradient(135deg,#3c1a00 0%,#78350f 60%,#92400e 100%)", label:"Moderate"  };
  if (p >= 34) return { fg:"#7C2D12", mid:"#C2410C", soft:"#FFF7ED", bdr:"#FDBA74", grd:"linear-gradient(135deg,#431407 0%,#7c2d12 60%,#9a3412 100%)", label:"Weak"      };
  return              { fg:"#7F1D1D", mid:"#B91C1C", soft:"#FEF2F2", bdr:"#FECACA", grd:"linear-gradient(135deg,#3b0000 0%,#7f1d1d 60%,#991b1b 100%)", label:"Poor"      };
}
function scoreColor(score, max = 5) { return ratingTier(score, max).mid; }

function scoreLabel(score) {
  const p = (score / 5) * 100;
  if (p >= 90) return "Exceptional";
  if (p >= 76) return "Strong";
  if (p >= 60) return "Good";
  if (p >= 44) return "Moderate";
  if (p >= 28) return "Weak";
  return "Poor";
}

// ══════════════════════════════════════════════════════════════════
// PRODUCT STRUCTURE CHIP CONFIG
// ══════════════════════════════════════════════════════════════════
const ATTR_STYLES = {
  processing: { icon: "⚙",  label: "Processing Style",  fg: C.plum,   soft: C.plumSoft,   bdr: C.plumBdr   },
  count:      { icon: "◈",  label: "Ingredient Count",  fg: C.sage,   soft: C.sageSoft,   bdr: C.sageBdr   },
  base:       { icon: "🌾", label: "Main Base",         fg: C.olive,  soft: C.oliveSoft,  bdr: C.oliveBdr  },
};

// ══════════════════════════════════════════════════════════════════
// CATEGORY SCORE COLORS — per-category color identity
// ══════════════════════════════════════════════════════════════════
function catColor(label) {
  const n = label.toUpperCase();
  if (/SUGAR|SWEET/.test(n))               return { fg: C.clay,   soft: C.claySoft,   bdr: C.clayBdr   };
  if (/OIL|FAT/.test(n))                   return { fg: C.amber,  soft: C.amberSoft,  bdr: C.amberBdr  };
  if (/FLAVOR|ENHANCER/.test(n))           return { fg: C.plum,   soft: C.plumSoft,   bdr: C.plumBdr   };
  if (/COLOR|COLOUR/.test(n))              return { fg: C.blue,   soft: C.blueSoft,   bdr: C.blueBdr   };
  if (/STABILIZ|EMULSIF/.test(n))          return { fg: C.sage,   soft: C.sageSoft,   bdr: C.sageBdr   };
  if (/PRESERV/.test(n))                   return { fg: C.muted,  soft: C.surfaceAlt, bdr: C.border    };
  if (/NATURAL|WHOLE/.test(n))             return { fg: C.olive,  soft: C.oliveSoft,  bdr: C.oliveBdr  };
  if (/ANIMAL|MEAT|DAIRY|PROTEIN/.test(n)) return { fg: C.rose,   soft: C.roseSoft,   bdr: C.roseBdr   };
  if (/ACID/.test(n))                      return { fg: C.red,    soft: C.redSoft,    bdr: C.redBdr    };
  if (/SPICE|HERB/.test(n))                return { fg: C.green,  soft: C.greenSoft,  bdr: C.greenBdr  };
  return                                           { fg: C.muted,  soft: C.surfaceAlt, bdr: C.border    };
}

// ══════════════════════════════════════════════════════════════════
// STEP 1 — RAW MARKDOWN → SECTION MAP
// ══════════════════════════════════════════════════════════════════
function splitTopSections(md) {
  const lines    = md.split(/\r?\n/);
  const sections = new Map();
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

function normKey(s) {
  return s.toUpperCase()
    .replace(/[\u{1F300}-\u{1FAFF}]|\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu, "")
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getSection(sections, keywords) {
  for (const [key, lines] of sections.entries()) {
    const n = normKey(key);
    if (keywords.some(kw => n.includes(kw.toUpperCase()))) return lines;
  }
  return [];
}

function cleanBullet(s) {
  return s.replace(/^[-*•·▸→#\s⭐]+/, "").trim();
}

function stripHeading(s) {
  return s.replace(/^#{1,4}\s*/, "").trim();
}

// ══════════════════════════════════════════════════════════════════
// STEP 2 — FIELD-LEVEL PARSERS
// ══════════════════════════════════════════════════════════════════

function parseProduct(sections) {
  const lines = getSection(sections, ["PRODUCT"]);
  for (const l of lines) {
    const t = stripHeading(l);
    if (!t) continue;
    const parts = t.split(/[·|]/);
    return { name: parts[0]?.trim() ?? "", category: parts[1]?.trim() ?? "" };
  }
  return { name: "", category: "" };
}

function parseRating(sections) {
  const lines = getSection(sections, ["FINAL RATING"]);
  let score = 0, label = "", verdict = "";
  let ratingLineIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const t = stripHeading(lines[i]);
    const m = t.match(/(\d+\.?\d*)\s*\/\s*5\s*[-–—]\s*(.+)$/) || t.match(/⭐\s*(\d+\.?\d*)\s*[-–—]\s*(.+)$/);
    const mBare = t.match(/(\d+\.?\d*)\s*\/\s*5/) || t.match(/⭐\s*(\d+\.?\d*)/);
    if (m) {
      score = Math.min(5, Math.max(0, parseFloat(m[1])));
      label = m[2].trim();
      ratingLineIdx = i;
      break;
    } else if (mBare) {
      score = Math.min(5, Math.max(0, parseFloat(mBare[1])));
      ratingLineIdx = i;
      break;
    }
  }
  if (ratingLineIdx !== -1) {
    verdict = lines
      .slice(ratingLineIdx + 1)
      .map(l => l.trim())
      .filter(l => l.length > 0 && !/^#{1,4}\s/.test(l))
      .join(" ")
      .trim();
  }
  return { score, label, verdict };
}

function parseStructure(sections) {
  const lines = getSection(sections, ["PRODUCT STRUCTURE", "STRUCTURE"]);
  let processingStyle = "", ingredientCount = "", mainBase = "";
  let curField = null;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const h = t.match(/^#{1,4}\s*(.+)/);
    if (h) {
      const label = h[1].trim();
      if (/processing style/i.test(label)) { curField = "processing"; processingStyle = label.replace(/processing style\s*:?\s*/i, "").trim(); continue; }
      if (/ingredient count/i.test(label)) { curField = "count"; ingredientCount = label.replace(/ingredient count\s*:?\s*/i, "").trim(); continue; }
      if (/main base/i.test(label))        { curField = "base"; mainBase = label.replace(/main base\s*:?\s*/i, "").trim(); continue; }
      curField = null;
      continue;
    }
    const v = cleanBullet(t);
    if (!v) continue;
    if (curField === "processing" && !processingStyle) processingStyle = v;
    else if (curField === "count" && !ingredientCount) ingredientCount = v;
    else if (curField === "base" && !mainBase) mainBase = v;
  }
  return { processingStyle, ingredientCount, mainBase };
}

function parseFormulationScores(sections) {
  const lines = getSection(sections, ["KEY FORMULATION SCORES", "FORMULATION SCORES"]);
  const items = [];
  let cur = null;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^#{1,4}\s*(.+?)\s*(?:→|—|–|-)\s*⭐\s*(\d+\.?\d*)/);
    if (m) {
      if (cur) items.push(cur);
      const rest = t.slice(m[0].length).replace(/^[→—–:\s]+/, "").trim();
      cur = { label: m[1].trim(), score: Math.min(5, Math.max(0, parseFloat(m[2]))), reason: rest };
    } else if (cur && !/^#{1,4}\s/.test(t)) {
      const v = cleanBullet(t);
      if (v.length > 2) cur.reason = cur.reason ? cur.reason + " " + v : v;
    }
  }
  if (cur) items.push(cur);
  return items;
}

function parseCategoryScores(sections) {
  const lines = getSection(sections, ["INGREDIENT CATEGORY SCORES", "CATEGORY SCORES"]);
  const items = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const p4 = t.match(/^#{1,4}\s*(.+?)\s*\|\s*⭐?\s*(\d+\.?\d*)\s*\|\s*(.+?)\s*\|\s*(.+)/);
    const p3 = t.match(/^#{1,4}\s*(.+?)\s*\|\s*⭐?\s*(\d+\.?\d*)\s*\|\s*(.+)/);
    const p2 = t.match(/^#{1,4}\s*(.+?)\s*\|\s*⭐?\s*(\d+\.?\d*)/);
    if (p4) {
      items.push({ label: p4[1].trim(), score: Math.min(5, parseFloat(p4[2])), dominant: p4[3].trim(), signal: p4[4].trim(), reason: "" });
    } else if (p3) {
      items.push({ label: p3[1].trim(), score: Math.min(5, parseFloat(p3[2])), dominant: p3[3].trim(), signal: "", reason: "" });
    } else if (p2) {
      items.push({ label: p2[1].trim(), score: Math.min(5, parseFloat(p2[2])), dominant: "", signal: "", reason: "" });
    } else if (items.length > 0 && !/^#{1,4}\s/.test(t)) {
      const v = cleanBullet(t);
      if (v.length > 2) items[items.length - 1].reason += (items[items.length - 1].reason ? " " : "") + v;
    }
  }
  return items.filter(i => i.score >= 0 && i.score <= 5 && i.label.length > 1);
}

function parseNutritionSignals(sections) {
  const lines = getSection(sections, ["NUTRITIONAL CONTRIBUTION", "NUTRITION SIGNAL"]);
  const out = [];
  let cur = null;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const pm = t.match(/^#{1,4}\s*🟢\s*(.+)/);
    const sm = t.match(/^#{1,4}\s*🟡\s*(.+)/);
    const tm = t.match(/^#{1,4}\s*⚪\s*(.+)/);
    if (pm || sm || tm) {
      if (cur) out.push(cur);
      cur = { name: (pm?.[1] ?? sm?.[1] ?? tm?.[1] ?? "").trim(), tier: pm ? "primary" : sm ? "supporting" : "trace", detail: "" };
    } else if (cur && !/^#{1,4}\s/.test(t)) {
      const v = cleanBullet(t);
      if (v.length > 2) cur.detail = cur.detail ? cur.detail + " " + v : v;
    }
  }
  if (cur) out.push(cur);
  return out.filter(c => c.name.length > 1);
}

function parseBulletList(lines) {
  return lines
    .filter(l => !/^#{1,4}\s/.test(l.trim()) && l.trim().length > 3)
    .map(cleanBullet)
    .filter(Boolean);
}

function parseInsights(sections)  { return parseBulletList(getSection(sections, ["MAIN FORMULATION INSIGHT", "FORMULATION INSIGHT"])); }
function parsePositives(sections) { return parseBulletList(getSection(sections, ["POSITIVE FORMULATION", "POSITIVE SIGNAL"])); }
function parseConcerns(sections)  { return parseBulletList(getSection(sections, ["THINGS TO BE AWARE", "AWARE OF"])); }

function parseMindfulGroups(sections) {
  const lines = getSection(sections, ["WHO SHOULD BE MINDFUL", "MINDFUL"]);
  const out = [];
  let cur = null;
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const m = t.match(/^#{1,4}\s*([\u{1F300}-\u{1FAFF}\p{Emoji_Presentation}\p{Extended_Pictographic}]+)\s*(.+?)\s*\|\s*(🔴|🟡)\s*(.+)/u);
    if (m) {
      if (cur) out.push(cur);
      cur = { emoji: m[1].trim(), label: m[2].trim(), level: m[3] === "🔴" ? "high" : "moderate", reason: "" };
    } else if (cur && !/^#{1,4}\s/.test(t)) {
      const v = cleanBullet(t);
      if (v.length > 2) cur.reason = cur.reason ? cur.reason + " " + v : v;
    }
  }
  if (cur) out.push(cur);
  return out.filter(g => g.label.length > 1);
}

function parseAllergens(sections) {
  const ALL_ALLERGENS = ["Milk","Soy","Gluten","Wheat","Tree Nuts","Peanuts","Eggs","Sesame","Fish","Sulfites","Shellfish","Mustard"];
  const lines = getSection(sections, ["ALLERGEN ADVISORY", "ALLERGEN"]);
  const text = lines.join(" ");
  if (/no major allergen/i.test(text)) return { none: true, detected: [], all: ALL_ALLERGENS };
  const brackets = text.match(/\[([^\]]+)\]/g);
  if (brackets) {
    const detected = brackets.map(b => b.replace(/[\[\]]/g, "").trim());
    return { none: false, detected, all: ALL_ALLERGENS };
  }
  for (const line of lines) {
    const t = line.trim();
    if (/detected/i.test(t) || /^#/.test(t)) continue;
    if (t.length > 2) {
      const items = t.split(/[,;]/).map(s => cleanBullet(s).trim()).filter(Boolean);
      if (items.length > 0) return { none: false, detected: items, all: ALL_ALLERGENS };
    }
  }
  return { none: false, detected: [], all: ALL_ALLERGENS };
}

function parseConsumption(sections) {
  const lines = getSection(sections, ["CONSUMPTION GUIDANCE", "CONSUMPTION"]);
  const cards = [];
  let curLabel = "";
  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;
    const hm = t.match(/^#{1,4}\s*(.+)/);
    if (hm) {
      curLabel = hm[1].replace(/:\s*$/, "").trim();
    } else if (curLabel) {
      const v = cleanBullet(t);
      if (v.length > 2) { cards.push({ label: curLabel, value: v }); curLabel = ""; }
    } else {
      const colon = t.match(/^(.+?):\s*(.+)/);
      if (colon && colon[2].length > 2) cards.push({ label: colon[1].trim(), value: colon[2].trim() });
    }
  }
  return cards;
}

function parseFinalVerdict(sections) {
  const lines = getSection(sections, ["FINAL VERDICT"]);
  for (const l of lines) {
    const t = cleanBullet(l.trim());
    if (t.length > 5 && !/^#/.test(l.trim())) return t;
  }
  return "";
}

// ══════════════════════════════════════════════════════════════════
// STEP 3 — BUILD THE NORMALIZED DATA MODEL
// ══════════════════════════════════════════════════════════════════
function buildModel(markdown) {
  const sections = splitTopSections(markdown);
  const rating = parseRating(sections);
  const standaloneVerdict = parseFinalVerdict(sections);

  return {
    product:                 parseProduct(sections),
    rating,
    structure:               parseStructure(sections),
    formulationScores:       parseFormulationScores(sections),
    ingredientCategoryScores: parseCategoryScores(sections),
    nutritionalSignals:      parseNutritionSignals(sections),
    insights:                parseInsights(sections),
    positiveSignals:         parsePositives(sections),
    awarenessSignals:        parseConcerns(sections),
    mindfulGroups:           parseMindfulGroups(sections),
    allergens:               parseAllergens(sections),
    consumption:             parseConsumption(sections),
    finalVerdict:            standaloneVerdict || rating.verdict,
  };
}

// ══════════════════════════════════════════════════════════════════
// PRIMITIVE COMPONENTS
// ══════════════════════════════════════════════════════════════════
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

function Divider({ label, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent ?? C.border}, transparent)` }} />
      {label && <span style={{ fontSize: 10, fontWeight: 700, color: accent ?? C.faint, letterSpacing: "0.1em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, ${accent ?? C.border}, transparent)` }} />
    </div>
  );
}

function PBar({ score, max = 5, color }) {
  const pct = Math.min(100, (score / max) * 100);
  const col = color ?? scoreColor(score, max);
  return (
    <div style={{ height: 5, background: C.surfaceAlt, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(to right, ${col}99, ${col})`, borderRadius: 99, transition: "width 0.55s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function ScorePill({ score, max = 5 }) {
  const { fg, soft, bdr, label } = ratingTier(score, max);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: fg, background: soft, border: `1px solid ${bdr}`, borderRadius: 99, padding: "2px 8px", letterSpacing: "0.04em" }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 800, color: fg, lineHeight: 1 }}>
        {score.toFixed(1)}<span style={{ fontSize: 10, fontWeight: 500, color: C.faint }}>/{max}</span>
      </span>
    </div>
  );
}

function AttrChip({ attrKey, value, big }) {
  const cfg = ATTR_STYLES[attrKey];
  if (!cfg || !value) return null;
  return (
    <div style={{
      background: cfg.soft, border: `1px solid ${cfg.bdr}`, borderLeft: `3px solid ${cfg.fg}`,
      borderRadius: 12, padding: big ? "13px 18px" : "10px 14px",
      display: "flex", flexDirection: "column", gap: 6,
      flex: big ? "2 1 180px" : "1 1 110px", minWidth: big ? 160 : 100,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -18, right: -18, width: 56, height: 56, borderRadius: "50%", background: `${cfg.fg}18`, pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 24, height: 24, borderRadius: 7, background: `${cfg.fg}22`, border: `1px solid ${cfg.fg}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>
          {cfg.icon}
        </div>
        <span style={{ fontSize: 9.5, fontWeight: 800, color: cfg.fg, letterSpacing: "0.09em", textTransform: "uppercase", opacity: 0.85 }}>{cfg.label}</span>
      </div>
      <span style={{ fontSize: big ? 14 : 13, fontWeight: 700, color: cfg.fg, lineHeight: 1.3 }}>{value}</span>
    </div>
  );
}

function CoreScoreCard({ item }) {
  const [open, setOpen] = useState(false);
  const { soft, bdr } = ratingTier(item.score);
  return (
    <div onClick={() => item.reason && setOpen(o => !o)} style={{ background: open ? soft : C.surface, border: `1px solid ${open ? bdr : C.border}`, borderRadius: 12, padding: "13px 15px", cursor: item.reason ? "pointer" : "default", transition: "background 0.2s, border-color 0.2s" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.inkMid, lineHeight: 1.35, flex: 1 }}>{item.label}</span>
        <ScorePill score={item.score} max={5} />
      </div>
      <PBar score={item.score} max={5} />
      {item.reason && !open && (
        <p style={{ margin: "8px 0 0", fontSize: 11.5, color: C.muted, lineHeight: 1.55 }}>
          {item.reason.length > 90 ? item.reason.slice(0, 90) + "…" : item.reason}
        </p>
      )}
      {open && item.reason && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${bdr}` }}>
          <p style={{ margin: 0, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>{item.reason}</p>
        </div>
      )}
      {item.reason && <div style={{ marginTop: 6, textAlign: "right", fontSize: 10, color: C.faint }}>{open ? "▲ collapse" : "▼ expand"}</div>}
    </div>
  );
}

function CatScoreCard({ item }) {
  const [open, setOpen] = useState(false);
  const { fg, soft, bdr } = catColor(item.label);
  const pct = Math.min(100, (item.score / 5) * 100);
  const canExpand = !!(item.reason || item.signal);
  return (
    <div onClick={() => canExpand && setOpen(o => !o)} style={{ background: soft, border: `1px solid ${bdr}`, borderRadius: 12, padding: "12px 14px", cursor: canExpand ? "pointer" : "default" }}>
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
      {item.dominant && (
        <div style={{ fontSize: 11, color: fg, opacity: 0.85, marginTop: 6 }}>
          <span style={{ fontWeight: 700 }}>Dominant: </span>{item.dominant}
        </div>
      )}
      {!open && item.signal && (
        <div style={{ fontSize: 11, color: fg, fontStyle: "italic", lineHeight: 1.4, marginTop: 4, opacity: 0.8 }}>{item.signal}</div>
      )}
      {open && (item.signal || item.reason) && (
        <div style={{ marginTop: 9, paddingTop: 9, borderTop: `1px solid ${bdr}` }}>
          {item.signal && <div style={{ fontSize: 11.5, color: fg, fontStyle: "italic", marginBottom: 5 }}>{item.signal}</div>}
          {item.reason && <div style={{ fontSize: 12, color: C.text, lineHeight: 1.65 }}>{item.reason}</div>}
        </div>
      )}
    </div>
  );
}

function NutritionCard({ signal }) {
  const tColor = signal.tier === "primary" ? C.olive : signal.tier === "supporting" ? C.brandMid : C.faint;
  const tSoft  = signal.tier === "primary" ? C.oliveSoft : signal.tier === "supporting" ? C.amberSoft : C.surfaceAlt;
  const tBdr   = signal.tier === "primary" ? C.oliveBdr  : signal.tier === "supporting" ? C.amberBdr  : C.border;
  const tLabel = signal.tier === "primary" ? "Primary Contributor" : signal.tier === "supporting" ? "Supporting Contributor" : "Trace-Level";
  return (
    <div style={{ background: tSoft, border: `1px solid ${tBdr}`, borderRadius: 12, padding: "12px 14px", display: "flex", gap: 11, alignItems: "flex-start" }}>
      <div style={{ width: signal.tier === "primary" ? 10 : signal.tier === "supporting" ? 8 : 6, height: signal.tier === "primary" ? 10 : signal.tier === "supporting" ? 8 : 6, borderRadius: "50%", background: tColor, flexShrink: 0, marginTop: 4 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.inkMid }}>{signal.name}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: tColor, background: `${tColor}18`, border: `1px solid ${tBdr}`, borderRadius: 99, padding: "2px 8px" }}>{tLabel}</span>
        </div>
        {signal.detail && <p style={{ margin: 0, fontSize: 12.5, color: C.muted, lineHeight: 1.65 }}>{signal.detail.replace(/^→\s*/, "")}</p>}
      </div>
    </div>
  );
}

function previewText(text, maxLen = 90) {
  if (!text) return "";
  const first = text.split(/[.!?]/)[0]?.trim() ?? text;
  const clean = first.slice(0, maxLen);
  return clean.length < text.length ? clean + "…" : clean;
}

function MindfulCard({ group }) {
  const [open, setOpen] = useState(false);
  const isHigh = group.level === "high";
  const fg   = isHigh ? C.red    : C.amber;
  const soft = isHigh ? C.redSoft  : C.amberSoft;
  const bdr  = isHigh ? C.redBdr   : C.amberBdr;
  return (
    <div onClick={() => group.reason && setOpen(o => !o)} style={{ background: soft, border: `1px solid ${bdr}`, borderRadius: 12, padding: "13px 15px", cursor: group.reason ? "pointer" : "default" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: group.reason && !open ? 8 : 0 }}>
        <span style={{ fontSize: 18 }}>{group.emoji}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.inkMid, flex: 1 }}>{group.label}</span>
        <span style={{ fontSize: 10, fontWeight: 700, color: fg, background: `${fg}18`, border: `1px solid ${bdr}`, borderRadius: 99, padding: "2px 9px", whiteSpace: "nowrap" }}>
          {isHigh ? "HIGH" : "MOD"}
        </span>
      </div>
      {group.reason && !open && <p style={{ margin: 0, fontSize: 12, color: C.muted, lineHeight: 1.65 }}>{previewText(group.reason, 100)}</p>}
      {open && group.reason && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${bdr}` }}>
          <p style={{ margin: 0, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>{group.reason.replace(/^→\s*/, "")}</p>
        </div>
      )}
    </div>
  );
}

const GUIDANCE_STYLES = {
  "Best suited for":               { fg: C.sage,   soft: C.sageSoft,  bdr: C.sageBdr,   icon: "◎" },
  "Better balance strategy":       { fg: C.brand,  soft: C.brandPale, bdr: C.brandSoft, icon: "◈" },
  "Smarter alternatives":          { fg: C.green,  soft: C.greenSoft, bdr: C.greenBdr,  icon: "◉" },
  "Frequency that limits concern": { fg: C.amber,  soft: C.amberSoft, bdr: C.amberBdr,  icon: "◌" },
};

function GuidanceCard({ card }) {
  const style = Object.entries(GUIDANCE_STYLES).find(([k]) => card.label.toLowerCase().includes(k.toLowerCase()))?.[1]
    ?? { fg: C.muted, soft: C.surfaceAlt, bdr: C.border, icon: "›" };
  return (
    <div style={{ background: style.soft, border: `1px solid ${style.bdr}`, borderRadius: 12, padding: "13px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
        <span style={{ fontSize: 12, color: style.fg }}>{style.icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: style.fg, letterSpacing: "0.07em", textTransform: "uppercase" }}>{card.label}</span>
      </div>
      <p style={{ margin: 0, fontSize: 13, color: C.text, lineHeight: 1.65 }}>{card.value}</p>
    </div>
  );
}

function VerdictBlock({ text, score, max }) {
  if (!text) return null;
  const { fg, soft, bdr, grd } = ratingTier(score, max);
  return (
    <div style={{ background: soft, border: `1px solid ${bdr}`, borderRadius: 14, overflow: "hidden" }}>
      <div style={{ background: grd, padding: "10px 18px" }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#fff", opacity: 0.9, letterSpacing: "0.1em", textTransform: "uppercase" }}>Overall Conclusion</span>
      </div>
      <div style={{ padding: "14px 18px" }}>
        <p style={{ margin: 0, fontSize: 14, color: fg, lineHeight: 1.75, fontWeight: 600 }}>{text}</p>
      </div>
    </div>
  );
}

function InsightRow({ text, fg, soft, bdr, marker }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", background: soft, border: `1px solid ${bdr}`, borderRadius: 10, padding: "10px 13px" }}>
      <span style={{ fontSize: 14, color: fg, flexShrink: 0, fontWeight: 800, marginTop: 1 }}>{marker}</span>
      <span style={{ fontSize: 13, color: C.text, lineHeight: 1.65 }}>{text}</span>
    </div>
  );
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", borderTop: `1px solid ${C.border}`, marginLeft: -24, marginRight: -24, paddingLeft: 24 }}>
      {tabs.map((tab, i) => (
        <button key={tab.id} onClick={() => onChange(i)} style={{
          background: "none", border: "none", outline: "none",
          borderBottom: active === i ? `2.5px solid ${C.brand}` : "2.5px solid transparent",
          padding: "11px 17px", fontSize: 12.5,
          fontWeight: active === i ? 700 : 500,
          color: active === i ? C.brand : C.muted,
          cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.15s, border-color 0.15s",
        }}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// TAB DEFINITIONS — 6 tabs (Overview removed)
// ══════════════════════════════════════════════════════════════════
const ALL_TABS = [
  { id: "scores",      label: "Scores"          },
  { id: "nutrition",   label: "Nutrition"        },
  { id: "insights",    label: "Insights"         },
  { id: "mindful",     label: "Mindful Groups"   },
  { id: "allergens",   label: "Allergens"        },
  { id: "consumption", label: "Consumption"      },
];

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function FoodCare({ markdown }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!markdown || typeof markdown !== "string") {
    return (
      <div style={{ padding: 48, textAlign: "center", fontFamily: "system-ui, sans-serif", background: C.pageBg, borderRadius: 24 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🥗</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>No analysis provided</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Pass a valid food product analysis as the markdown prop.</div>
      </div>
    );
  }

  const model = useMemo(() => buildModel(markdown), [markdown]);

  const {
    product, rating, structure,
    formulationScores, ingredientCategoryScores,
    nutritionalSignals, insights, positiveSignals, awarenessSignals,
    mindfulGroups, allergens, consumption, finalVerdict,
  } = model;

  const finalScore = rating.score;
  const rLabel     = rating.label || scoreLabel(finalScore);
  const tier       = ratingTier(finalScore);

  // visible tabs — no overview tab
  const visibleTabs = useMemo(() => ALL_TABS.filter(t => {
    if (t.id === "scores")      return formulationScores.length > 0 || ingredientCategoryScores.length > 0;
    if (t.id === "nutrition")   return nutritionalSignals.length > 0;
    if (t.id === "insights")    return insights.length > 0 || positiveSignals.length > 0 || awarenessSignals.length > 0;
    if (t.id === "mindful")     return mindfulGroups.length > 0;
    if (t.id === "allergens")   return allergens.detected.length > 0 || allergens.none;
    if (t.id === "consumption") return consumption.length > 0 || !!finalVerdict;
    return false;
  }), [formulationScores, ingredientCategoryScores, nutritionalSignals, insights, positiveSignals, awarenessSignals, mindfulGroups, allergens, consumption, finalVerdict]);

  const safeTab = Math.min(activeTab, Math.max(0, visibleTabs.length - 1));
  const tabId   = visibleTabs[safeTab]?.id;

  const structChips = [
    { key: "processing", value: structure.processingStyle },
    { key: "count",       value: structure.ingredientCount },
    { key: "base",        value: structure.mainBase },
  ].filter(c => c.value);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", background: C.pageBg, borderRadius: 20, overflow: "hidden", color: C.ink }}>

      {/* ── TOP NAV ──────────────────────────────────────────────── */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "10px 24px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 24, height: 24, background: "linear-gradient(135deg,#92400E 0%,#D97706 50%,#65A30D 100%)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>🥗</div>
        <span style={{ fontSize: 11.5, fontWeight: 900, letterSpacing: "0.14em", color: C.brand }}>NIGOODA</span>
        <span style={{ color: C.border, fontSize: 16 }}>·</span>
        <span style={{ fontSize: 11.5, color: C.muted, fontWeight: 500 }}>Food Intelligence</span>
        <div style={{ marginLeft: "auto" }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: C.faint, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 99, padding: "3px 11px", letterSpacing: "0.04em" }}>
            Formulation Analysis
          </span>
        </div>
      </div>

      {/* ── HERO — permanently visible, not a tab ───────────────── */}
      <div style={{
        background: `linear-gradient(160deg, ${C.surface} 0%, ${C.brandPale} 100%)`,
        borderBottom: `1px solid ${C.border}`,
        padding: "28px 24px 0",
      }}>
        {/* Identity */}
        <div style={{ marginBottom: 18 }}>
          {product.category && (
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.brand, background: C.brandPale, border: `1px solid ${C.brandSoft}`, borderRadius: 99, padding: "3px 12px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {product.category}
              </span>
            </div>
          )}
          {product.name && (
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.ink, lineHeight: 1.15, letterSpacing: "-0.5px" }}>{product.name}</h1>
          )}
        </div>

        {/* Rating + summary row */}
        <div style={{ display: "flex", gap: 16, alignItems: "stretch", marginBottom: 22, flexWrap: "wrap" }}>
          <div style={{ background: tier.grd, borderRadius: 16, padding: "18px 22px", color: "#fff", minWidth: 140, flexShrink: 0, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -14, right: -14, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", opacity: 0.75, marginBottom: 5, textTransform: "uppercase" }}>Final rating</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 6 }}>
              <span style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, letterSpacing: "-1.5px" }}>{finalScore.toFixed(1)}</span>
              <span style={{ fontSize: 16, opacity: 0.55, fontWeight: 400 }}>/5</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>{rLabel}</div>
          </div>

          {rating.verdict && (
            <div style={{ flex: 1, minWidth: 180, background: C.glass, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center" }}>
              <p style={{ margin: 0, fontSize: 14, color: C.text, lineHeight: 1.7 }}>{rating.verdict}</p>
            </div>
          )}
        </div>

        {/* Product structure chips */}
        {structChips.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
            {structChips.map(c => <AttrChip key={c.key} attrKey={c.key} value={c.value} big={c.key === "base"} />)}
          </div>
        )}

        {/* Tab bar */}
        {visibleTabs.length > 0 && <TabBar tabs={visibleTabs} active={safeTab} onChange={i => setActiveTab(i)} />}
      </div>

      {/* ── TAB CONTENT ──────────────────────────────────────────── */}
      <div style={{ padding: "24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* TAB 1 — SCORES */}
        {tabId === "scores" && (
          <>
            {formulationScores.length > 0 && (
              <div>
                <SecHead icon="📊" title="Key Formulation Scores" color={C.brand} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
                  {formulationScores.map((item, i) => <CoreScoreCard key={i} item={item} />)}
                </div>
              </div>
            )}
            {ingredientCategoryScores.length > 0 && (
              <div style={{ marginTop: formulationScores.length > 0 ? 6 : 0 }}>
                <SecHead icon="📊" title="Ingredient Category Scores" color={C.sage} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 9 }}>
                  {ingredientCategoryScores.map((item, i) => <CatScoreCard key={i} item={item} />)}
                </div>
                <div style={{ background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginTop: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.faint, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 7 }}>Score guide</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {[
                      { label: "≥ 3.8 · Strong",    fg: C.olive },
                      { label: "3.0–3.8 · Good",     fg: C.sage  },
                      { label: "2.0–3.0 · Moderate", fg: C.amber },
                      { label: "< 2.0 · Weak",       fg: C.clay  },
                    ].map((t, i) => (
                      <span key={i} style={{ fontSize: 11, fontWeight: 600, color: t.fg, background: `${t.fg}14`, padding: "3px 10px", borderRadius: 99 }}>{t.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 2 — NUTRITIONAL CONTRIBUTION SIGNALS */}
        {tabId === "nutrition" && (
          <div>
            <SecHead icon="🌿" title="Nutritional Contribution Signals" color={C.green} />
            {["primary","supporting","trace"].map(t => {
              const group = nutritionalSignals.filter(s => s.tier === t);
              if (!group.length) return null;
              const tMap = { primary: "Primary Contributors", supporting: "Supporting Contributors", trace: "Trace Level" };
              const cMap = { primary: C.olive, supporting: C.brandMid, trace: C.faint };
              return (
                <div key={t} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: cMap[t], letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{tMap[t]}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {group.map((s, i) => <NutritionCard key={i} signal={s} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3 — INSIGHTS */}
        {tabId === "insights" && (
          <>
            {insights.length > 0 && (
              <div>
                <SecHead icon="🔍" title="Main Formulation Insights" color={C.sage} />
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {insights.map((s, i) => <InsightRow key={i} text={s} fg={C.sage} soft={C.sageSoft} bdr={C.sageBdr} marker="›" />)}
                </div>
              </div>
            )}
            {positiveSignals.length > 0 && (
              <div>
                <SecHead icon="✅" title="Positive Formulation Signals" color={C.green} />
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {positiveSignals.map((s, i) => <InsightRow key={i} text={s} fg={C.green} soft={C.greenSoft} bdr={C.greenBdr} marker="+" />)}
                </div>
              </div>
            )}
            {awarenessSignals.length > 0 && (
              <div>
                <SecHead icon="⚠️" title="Things To Be Aware Of" color={C.clay} />
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {awarenessSignals.map((s, i) => <InsightRow key={i} text={s} fg={C.clay} soft={C.claySoft} bdr={C.clayBdr} marker="!" />)}
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB 4 — MINDFUL GROUPS */}
        {tabId === "mindful" && mindfulGroups.length > 0 && (
          <>
            {["high","moderate"].map(level => {
              const grp = mindfulGroups.filter(g => g.level === level);
              if (!grp.length) return null;
              return (
                <div key={level}>
                  <SecHead icon={level === "high" ? "⚠" : "◌"} title={level === "high" ? "High Consideration" : "Moderate Consideration"} color={level === "high" ? C.red : C.amber} />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 9 }}>
                    {grp.map((g, i) => <MindfulCard key={i} group={g} />)}
                  </div>
                </div>
              );
            })}
            <div style={{ fontSize: 11.5, color: C.muted, background: C.surfaceAlt, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 13px", lineHeight: 1.65 }}>
              These considerations are educational and formulation-based. They do not constitute medical advice. Individuals with specific health conditions should consult a qualified professional.
            </div>
          </>
        )}

        {/* TAB 5 — ALLERGENS */}
        {tabId === "allergens" && (() => {
          const { none, detected, all: allPanel } = allergens;
          return (
            <div>
              <SecHead icon="⚠️" title="Allergen Advisory" color={none || detected.length === 0 ? C.green : C.red} />
              {none || detected.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.greenSoft, border: `1px solid ${C.greenBdr}`, borderRadius: 12, padding: "14px 18px" }}>
                  <span style={{ fontSize: 20 }}>✓</span>
                  <span style={{ fontSize: 14, color: C.green, fontWeight: 600 }}>No major allergens detected in this formulation.</span>
                </div>
              ) : (
                <div style={{ background: C.redSoft, border: `1px solid ${C.redBdr}`, borderRadius: 12, padding: "14px 18px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.red, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 9 }}>Detected allergens</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {detected.map((a, i) => (
                      <span key={i} style={{ fontSize: 12, fontWeight: 700, color: C.red, background: `${C.red}14`, border: `1px solid ${C.redBdr}`, borderRadius: 99, padding: "4px 12px" }}>{a}</span>
                    ))}
                  </div>
                </div>
              )}
              {allPanel.length > 0 && !none && (
                <>
                  <div style={{ marginTop: 14 }}><Divider label="Full allergen panel" /></div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                    {allPanel.map((a, i) => {
                      const isDetected = detected.some(d => d.toLowerCase() === a.toLowerCase());
                      return (
                        <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: isDetected ? C.red : C.faint, background: isDetected ? `${C.red}10` : C.surfaceAlt, border: `1px solid ${isDetected ? C.redBdr : C.border}`, borderRadius: 99, padding: "3px 10px" }}>
                          {isDetected ? "⚠ " : ""}{a}
                        </span>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })()}

        {/* TAB 6 — CONSUMPTION + FINAL VERDICT (always last) */}
        {tabId === "consumption" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {consumption.length > 0 && (
              <div>
                <SecHead icon="🍽" title="Consumption Guidance" color={C.sage} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {consumption.map((card, i) => <GuidanceCard key={i} card={card} />)}
                </div>
              </div>
            )}
            {/* Final Verdict — always the very last element on the page */}
            <VerdictBlock text={finalVerdict} score={finalScore} max={5} />
          </div>
        )}

      </div>
    </div>
  );
}